import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { revertAll } from "@/redux/features/constant";
import { ErrorCode } from "@/shared/constant/models";
import { RootState } from "../store";
import { setToken } from "../features/auth/authSlice";

const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

const errorNotifier = (message?: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

interface IAxiosBaseQuery {
    baseUrl?: string;
    headers?: (
        headers: { [key: string]: string },
        store: { getState: any; signal: any }
    ) => { [key: string]: string };
}

interface IBaseQuery {
    url: string;
    params?: AxiosRequestConfig["params"];
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    responseType?: string;
    error?: {
        status: number;
        data: any;
    };
}


export const axiosBaseQuery = ({
    baseUrl = "",
    headers,
}: IAxiosBaseQuery): BaseQueryFn<
    IBaseQuery,
    unknown,
    {
        status?: number;
        data?: any;
        error?: {
            status: number | string;
            data: any;
        };
    }
> => {
    return async (
        { url, params, method, data, responseType },
        { signal, getState }
    ) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method: method ? method : "GET",
                ...(params && { params: params }),
                ...(headers && { headers: headers({}, { getState, signal }) }),
                ...(data && { data: data }),
                responseType: responseType ? responseType : "json",
            });
            return {
                data: result.data,
            };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: { status: err.response?.status, data: err.response?.data },
            };
        }
    };
};

export const APIBaseQueryInterceptor = axiosBaseQuery({
    baseUrl: baseURL,
    headers: (headers, { getState }) => {
        const {
            auth: { token },
        } = getState();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        headers["x-requestid"] = uuid();
        return headers;
    },
});

export const APIBaseQuery: BaseQueryFn<IBaseQuery, unknown, unknown> = async (
    args,
    api,
    extraOptions
) => {
    let result = await APIBaseQueryInterceptor(args, api, extraOptions);

    if (
        result.error &&
        result.error.status === ErrorCode.UNAUTHORIZED
    ) {
        const state: any = api;
        const userState: any = state.getState() as RootState;
        const { auth } = userState;
        const { refreshToken } = auth;

        const refreshResult = await APIBaseQueryInterceptor(
            { url: "auth/refreshToken", method: "POST", data: { refreshToken } },
            api,
            extraOptions
        );
        if (refreshResult?.data) {
            const data: any = refreshResult?.data;
            const { token, refreshToken, expiresAt } = data;
            await state.dispatch(setToken({ token, refreshToken, expiresAt }));
            result = await APIBaseQueryInterceptor(args, api, extraOptions);
        } else {
            errorNotifier("401 UNAUTHORIZED");

            state.dispatch(revertAll());
        }
    }
    else if (result.error && result.error.status === ErrorCode.FORBIDDEN) {
        errorNotifier('403 FORBIDDEN');
        api.dispatch(revertAll());
    }
    else if (result.error) {
        errorNotifier(
            result.error?.data?.message ||
            result.error?.data?.error ||
            "Xəta baş verdi"
        );

    }
    return result;
};

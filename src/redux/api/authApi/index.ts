import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { ILogin } from "@/redux/features/auth/type";
import { ISendData } from "./type";
import { setToken, setUser } from "@/redux/features/auth/authSlice";

export const authApi: any = createApi({
  reducerPath: "authApi",
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      Pick<ILogin, "expiresAt" | "refreshToken" | "token">,
      ISendData
    >({
      query(data) {
        return {
          url: "auth/admin/token",
          method: "POST",
          data,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          dispatch(authApi.endpoints.getMe.initiate(null));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    getMe: builder.query({
      query() {
        return {
          method: "GET",
          url: "auth/profile",
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;

// import { createApi } from "@reduxjs/toolkit/query/react";
// import {APIBaseQuery} from '../axiosBase';
// import { ISendData } from "./type";
// import { ILogin, IUser } from "@/redux/features/user/type";
// import { setToken } from "@/redux/features/user";

// export const authApi= createApi({
//     reducerPath: 'auth',
//     baseQuery: APIBaseQuery,
//     endpoints: (builder) => ({
//         loginUser: builder.mutation<Pick<ILogin, "expiresAt"|"refreshToken"|"token">,ISendData>({
//             query(data){
//                 return {
//                     url: 'auth/admin/token',
//                     method: 'POST',
//                     data

//                 }
//             },

//             async onQueryStarted(_arg, {dispatch, queryFulfilled}){
//                 try{
//                     const {data} = await queryFulfilled;
//                     dispatch(setToken(data));
//                     dispatch(authApi.endpoints.getUser.initiate());
//                 }catch(err){
//                     console.log(err)
//                 }
//             }
//         }),
//         getUser: builder.query<IUser,void>({
//             query(){
//                 return {
//                     url: 'auth/profile',
//                     method: 'GET'
//                 }
//             }
//         })
//     })
// })

// export const {useLoginUserMutation} = authApi;

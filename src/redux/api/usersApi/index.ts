import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { IFilter, IStatusParams, IUsers, IUser } from "./type";

const VALIDATOR: string[] = ["User"];

export const usersApi: any = createApi({
  reducerPath: "users",
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getUsers: builder.query<IUsers, IFilter>({
      query(data) {
        console.log(data);
        const { skip, orderBy, sortField, take } = data;
        return {
          method: "GET",
          url: "user",
          params: {
            Skip: skip,
            OrderBy: orderBy,
            SortField: sortField,
            Take: take,
          },
        };
      },
      providesTags: VALIDATOR,
      // async onQueryStarted(_arg, { queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
    }),
    changeStatus: builder.mutation<void, IStatusParams>({
      query({ id, isActive }) {
        return {
          method: "PATCH",
          url: "user/active",
          data: { id, isActive },
        };
      },
      invalidatesTags: VALIDATOR,
    }),
    updateUser: builder.mutation<any, any>({
      query(data) {
        const { id, firstName, lastName, phone, email } = data;
        return {
          url: "user",
          method: "PUT",
          data: { id, firstName, lastName, phone, email },
        };
      },
      invalidatesTags: VALIDATOR,
      // async onQueryStarted(
      //   { skip, sortField, take, orderBy },
      //   { dispatch, queryFulfilled }
      // ) {
      //   try {
      //     await queryFulfilled;
      //     dispatch(
      //       usersApi.endpoints.getUsers.initiate({
      //         skip,
      //         sortField,
      //         orderBy,
      //         take,
      //       })
      //     );
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
    }),
    getUserById: builder.query<IUser, number>({
      query(id) {
        return {
          method: "GET",
          url: `user/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useChangeStatusMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = usersApi;

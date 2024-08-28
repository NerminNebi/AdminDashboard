import { createApi } from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";

import { APIBaseQuery } from "../axiosBase";
import {
  IFilter,
  IStatusParams,
  IUsers,
  IUser,
  IDeleteUser,
  IAddUser,
} from "./type";

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
    }),
    addUser: builder.mutation<void, IAddUser>({
      query(data) {
        const { email, firstName, lastName, password, phone } = data;
        return {
          url: "user/register",
          method: "POST",
          data: { email, firstName, lastName, password, phone },
        };
      },
      invalidatesTags: VALIDATOR,
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
    }),
    getUserById: builder.query<IUser, number>({
      query(id) {
        return {
          method: "GET",
          url: `user/${id}`,
        };
      },
    }),
    deleteUser: builder.mutation<void, IDeleteUser>({
      query(data) {
        console.log(data, "delete");
        return {
          url: "user",
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: VALIDATOR,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useChangeStatusMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = usersApi;

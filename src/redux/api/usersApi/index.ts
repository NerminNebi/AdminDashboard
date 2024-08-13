import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { IUsers } from "@/pages/Users/userList/type";
import { IFilter } from "./type";

export const usersApi: any= createApi({
    reducerPath: 'users',
    baseQuery: APIBaseQuery,
    endpoints: (builder) => ({
        getUsers: builder.query<IUsers, IFilter>({
            query(data){
                console.log("query", data)
                const {Skip, OrderBy, SortField, Take} = data
                return{
                    method: 'GET',
                    url: 'user',
                    params: {Skip, OrderBy, SortField, Take}
                }
            }
        })
    })

})

export const {useGetUsersQuery} = usersApi;
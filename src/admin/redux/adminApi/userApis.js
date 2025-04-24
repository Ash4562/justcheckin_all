import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}/admin/`,
        credentials: "include"
    }),

    tagTypes: ["users"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/get-bookings",
                        method: "GET"
                    }
                },
                providesTags: ["users"]
            }),
            DeleteUser: builder.mutation({
                query: (id) => {
                    return {
                        url: `/booking-delete/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["users"]
            }),
            updateUsers: builder.mutation({
                query: (data) => {
                    return {
                        url: `/booking-update/${data.id}`,
                        method: "PUT",
                        body: data
                    }
                },
                invalidatesTags: ["users"],
            }),

        }
    }
})

export const { useGetUsersQuery, useDeleteUserMutation, useUpdateUsersMutation } = userApi

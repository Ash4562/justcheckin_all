import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authAdminApi = createApi({
    reducerPath: "authAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}/admin/`,
        credentials: "include"

    }),
    tagTypes: ["authAdmin"],
    endpoints: (builder) => {
        return {
            Adminlogin: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["authAdmin"]
            }),

            VerifyOtp: builder.mutation({
                query: userData => {
                    return {
                        url: "/login/verify",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["authAdmin"]
            }),
            Adminlogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["authAdmin"]
            }),

        }
    }
})

export const { useAdminloginMutation, useVerifyOtpMutation, useAdminlogoutMutation } = authAdminApi

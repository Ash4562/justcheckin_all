import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const GovtAdminApi = createApi({
    reducerPath: "GovtAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/v1/goverement/`,
        credentials: "include"

    }),
    tagTypes: ["GovtAdmin"],
    endpoints: (builder) => {
        return {
            Govtlogin: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["GovtAdmin"]
            }),
            GovtHotel: builder.query({
                query: (userData) => {
                    return {
                        url: "/get-hotels",
                        method: "GET",
                        body: userData
                    }
                },
                providesTags: ["GovtAdmin"]
            }),
            GovtUser: builder.query({
                query: (userData) => {
                    return {
                        url: "/get-bookings",
                        method: "GET",
                        body: userData
                    }
                },
                providesTags: ["GovtAdmin"]
            }),




        }
    }
})

export const { useGovtloginMutation, useGovtHotelQuery, useGovtUserQuery } = GovtAdminApi

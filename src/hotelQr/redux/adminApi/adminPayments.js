import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const PaymentApi = createApi({
    reducerPath: "PaymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}`,
        credentials: "include"
    }),
    tagTypes: ["Payments"],
    endpoints: (builder) => {
        return {
            getPayments: builder.query({
                query: (userData) => {
                    return {
                        url: "/get-payments",
                        method: "GET",
                        body: userData
                    }
                },
                providesTags: ["Payments"]
            }),


        }
    }
})

export const { useGetPaymentsQuery } = PaymentApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const GovrtApi = createApi({
    reducerPath: "GovrtApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}`,
        credentials: "include"
    }),
    tagTypes: ["government"],
    endpoints: (builder) => {
        return {
            createuser: builder.mutation({
                query: (userData) => {
                    return {
                        // https://just-checkin-backend-1.onrender.com/api/v1/admin/goverement/create-credential

                        url: "goverement/create-credential",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["government"]
            }),

            // https://just-checkin-backend-1.onrender.com/api/v1/admin/goverement-credential
            getGovetusers: builder.query({
                query: (userData) => {
                    return {
                        url: "/goverement-credential",
                        method: "GET",
                        body: userData
                    }
                },
                providesTags: ["government"]
            }),


        }
    }
})

export const { useCreateuserMutation, useGetGovetusersQuery } = GovrtApi

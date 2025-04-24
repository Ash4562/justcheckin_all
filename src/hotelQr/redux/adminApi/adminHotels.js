import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}`,
        credentials: "include"
    }),
    tagTypes: ["hotels"],
    endpoints: (builder) => {
        return {
            getHotels: builder.query({
                query: (userData) => {
                    return {
                        url: "/get-hotels",
                        method: "GET",
                        body: userData
                    }
                },
                invalidatesTags: ["hotels"]
            }),
            deleteHotels: builder.mutation({
                query: (id) => {
                    return {
                        url: `/hotel-delete/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["hotels"],
            }),
            updateHotels: builder.mutation({
                query: (hotelData) => {
                    return {
                        url: `/hotel-update/${hotelData.id}`,
                        method: "PUT",
                        body: hotelData
                    }
                },
                invalidatesTags: ["hotels"],
            }),

        }
    }
})

export const { useGetHotelsQuery, useDeleteHotelsMutation, useUpdateHotelsMutation } = hotelApi

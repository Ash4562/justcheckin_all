import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookingHotelQrAPI = createApi({
  reducerPath: "BookingHotelQrAPI",
  baseQuery: fetchBaseQuery({ 
    // baseUrl: `https://back-qr-fuj7.onrender.com/api/v1/user`,
    baseUrl: `http://localhost:5000/api/v1/user`,
// 
    credentials: "include", 
  }),
  tagTypes: ["Bookings"], 
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/getbookings",
        method: "GET",
      }),
      providesTags: ["Bookings"], 
    }),

    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: "/create-booking", 
        method: "POST",
        body: newBooking, 
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const { useGetBookingsQuery, useCreateBookingMutation } = BookingHotelQrAPI;

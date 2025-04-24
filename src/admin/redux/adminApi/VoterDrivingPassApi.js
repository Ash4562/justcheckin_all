import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const Voterdrivingpass = createApi({
    reducerPath: "Voterdrivingpass",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_ADMIN_API}`,

        credentials: "include"

    }),
    tagTypes: ["Allinone"],
    endpoints: (builder) => {

        return {
        
            getBookings: builder.query({
                query: (data) => ({
                  url: "/user/fetchAllData",
                  method: "GET",
                  body: data,
                }),
                providesTags: ["Allinone"], 
              }),

            getAllhoteUser: builder.query({
                query: () => ({
                  url: "/user/AllhotelUser",
                  method: "GET",
                }),
                providesTags: ["Allinone"], 
              }),

              updateVoter: builder.mutation({
                query: ({ id, data }) => ({
                  url: `/voter/update/${id}`,
                  method: 'PUT',
                  body: data,
                }),
                invalidatesTags: ['Allinone'],
              }),

              deleteVoter: builder.mutation({
                query: (id) => ({
                  url: `/voter/delete/${id}`,
                  method: 'DELETE',
                }),
                invalidatesTags: ['Allinone'],
              }),

              updateDravingLic: builder.mutation({
                query: ({ id, data }) => ({
                  url: `/driving-license/update/${id}`,
                  method: 'PUT',
                  body: data,
                }),
                invalidatesTags: ['Allinone'],
              }),

              deleteDravingLic: builder.mutation({
                query: (id) => ({
                  url: `/driving-license/delete/${id}`,
                  method: 'DELETE',
                }),
                invalidatesTags: ['Allinone'],
              }),
              updatePassport: builder.mutation({
                query: ({ id, data }) => ({
                  url: `/passport/update/${id}`,
                  method: 'PUT',
                  body: data,
                }),
                invalidatesTags: ['Allinone'],
              }),

              deletePassport: builder.mutation({
                query: (id) => ({
                  url: `/api/v1/passport/delete/${id}`,
                  method: 'DELETE',
                }),
                invalidatesTags: ['Allinone'],
              }),

        }
    }
})

export const {useGetBookingsQuery ,useUpdatePassportMutation,useDeletePassportMutation, useGetAllhoteUserQuery, useDeleteVoterMutation,useUpdateVoterMutation,useDeleteDravingLicMutation,useUpdateDravingLicMutation} = Voterdrivingpass

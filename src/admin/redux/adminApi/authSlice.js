// import { createSlice } from "@reduxjs/toolkit";
// import { HotelAuthAPI } from "../../../hotel/redux/api/AuthAPI";


// const authSlice= createSlice({
//     name: "authSlice",
//     initialState: {},
//     reducers: {
//         invalidate: (state, { payload }) => {
//             payload.forEach(item => {
//                 state[item] = false
//             })
//         }
//     },
//     extraReducers: builder => builder
//         .addMatcher(HotelAuthAPI.endpoints.Login.matchFulfilled, (state, { payload }) => {
//             state.hotel = payload
//         })
       
       
// })

// export const { invalidate } = authSlice.actions
// export default authSlice.reducer


import { createSlice } from "@reduxjs/toolkit";
import { HotelAuthAPI } from "../../../hotel/redux/api/AuthAPI";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    selectedHotel: null,
    hotel: null,
  },
  reducers: {
    invalidate: (state, { payload }) => {
      payload.forEach(item => {
        state[item] = false;
      });
    },
    setSelectedHotel: (state, { payload }) => {
      state.selectedHotel = payload;
    }
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      HotelAuthAPI.endpoints.Login.matchFulfilled,
      (state, { payload }) => {
        state.hotel = payload;
      }
    ),
});

export const { invalidate, setSelectedHotel } = authSlice.actions;
export default authSlice.reducer;

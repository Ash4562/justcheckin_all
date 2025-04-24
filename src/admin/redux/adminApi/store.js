import { configureStore } from "@reduxjs/toolkit";
import { authAdminApi } from "./authApi";
import { hotelApi } from "./adminHotels";
import authReducer from './authSlice';
import { userApi } from "./userApis";
import { PaymentApi } from "./adminPayments";
import { GovrtApi } from "./govtApi";
import { Voterdrivingpass } from "./VoterDrivingPassApi";
import { GovtAdminApi } from "../../../Govt/redux/authGovt";
import { userHotelQrApi } from "../../../hotelQr/redux/hotelUserApi.jsx/userApi";
import { BookingHotelQrAPI } from "../../../hotelQr/redux/hotelUserApi.jsx/BookingAPI";
import { HotelAuthAPI } from "../../../hotel/redux/api/AuthAPI";
import { hotelProfileApi } from "../../../hotel/redux/api/hotelProfileApi";





const reduxStore = configureStore({
    reducer: {
        authSlice: authReducer, 
        [authAdminApi.reducerPath]: authAdminApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [PaymentApi.reducerPath]: PaymentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [GovrtApi.reducerPath]: GovrtApi.reducer,
        [Voterdrivingpass.reducerPath]: Voterdrivingpass.reducer,
        [GovtAdminApi.reducerPath]: GovtAdminApi.reducer,
        [userHotelQrApi.reducerPath]: userHotelQrApi.reducer,
        [BookingHotelQrAPI.reducerPath]: BookingHotelQrAPI.reducer,
        [HotelAuthAPI.reducerPath]: HotelAuthAPI.reducer,
        [hotelProfileApi.reducerPath]: hotelProfileApi.reducer,


    },
    middleware: def => [...def(),hotelProfileApi.middleware, HotelAuthAPI.middleware,BookingHotelQrAPI.middleware,   userHotelQrApi.middleware, authAdminApi.middleware, GovtAdminApi.middleware,hotelApi.middleware, PaymentApi.middleware, userApi.middleware, GovrtApi.middleware,Voterdrivingpass.middleware]
})

export default reduxStore
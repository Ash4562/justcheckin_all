import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../hotelUserApi.jsx/userApi";
import { BookingAPI } from "../hotelUserApi.jsx/BookingAPI";
import { Voterdrivingpass } from "../hotelUserApi.jsx/VoterDrivingPassApi";

// import { authAdminApi } from "./authApi";
// import { hotelApi } from "./adminHotels";

// import { userApi } from "./userApis";
// import { PaymentApi } from "./adminPayments";
// import { GovrtApi } from "./govtApi";



const reduxStore = configureStore({
    reducer: {
        // [authAdminApi.reducerPath]: authAdminApi.reducer,
        // [hotelApi.reducerPath]: hotelApi.reducer,
        // [PaymentApi.reducerPath]: PaymentApi.reducer,
        // [userApi.reducerPath]: userApi.reducer,
        // [GovrtApi.reducerPath]: GovrtApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [BookingAPI.reducerPath]: BookingAPI.reducer,
        [Voterdrivingpass.reducerPath]: Voterdrivingpass.reducer,
    },
    // middleware: def => [...def(), authAdminApi.middleware, hotelApi.middleware, PaymentApi.middleware, userApi.middleware, GovrtApi.middleware]
    middleware: def => [...def(), userApi.middleware,BookingAPI.middleware,Voterdrivingpass.middleware]
})

export default reduxStore
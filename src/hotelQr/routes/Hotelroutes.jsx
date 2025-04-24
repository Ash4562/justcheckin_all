import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Page imports
import UserHotelRegister from "../pages/user/UserHotelRegister";
import GenerateHotelsQr from "../pages/user/GenerateHotelsQr";
import AadhaarOTPForm from "../pages/user/AadhaarOTPForm";
import SubmitOtp from "../pages/user/SumitOtp";
import UserDetailForm from "../pages/user/UserDetailForm";
import NumberOfUsers from "../pages/user/NumberOfUsers";
import DrivingLicniesVerify from "../pages/user/DrivingLicniesVerify";
import DrivingLicenseUserDetails from "../pages/user/DrivingLicenseUserDetails";
import VotingIdVerifying from "../pages/user/VotingIdVerifying";
import VotingIdUserDetail from "../pages/user/VotingIdUserDetail";
import Passportverify from "../pages/user/Passportverify";
import PassportVerifyUser from "../pages/user/PassportVerifyUser";

const Hotelroutes = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Hotel QR Flow - nested under /hotelqr */}
        <Route path="/hotelqr">
          <Route index element={<UserHotelRegister />} />
          <Route path="GenerateHotelsQr" element={<GenerateHotelsQr />} />
          <Route path="AadhaarOTP" element={<AadhaarOTPForm />} />
          <Route path="SubmitOtp" element={<SubmitOtp />} />
          <Route path="UserDetailForm" element={<UserDetailForm />} />
          <Route path="NumberOfUsers/:hotelId" element={<NumberOfUsers />} />
          <Route path="driving" element={<DrivingLicniesVerify />} />
          <Route path="DLUserDetails" element={<DrivingLicenseUserDetails />} />
          <Route path="VotingIdVerifying" element={<VotingIdVerifying />} />
          <Route path="VotingIdUserDetail" element={<VotingIdUserDetail />} />
          <Route path="Passportverify" element={<Passportverify />} />
          <Route path="PassportVerifyUser" element={<PassportVerifyUser />} />
        </Route>

        {/* 404 Fallback */}
        {/* <Route path="*" element={<h1> HotelQr Page Not Found</h1>} /> */}
      </Routes>
    </>
  );
};

export default Hotelroutes;

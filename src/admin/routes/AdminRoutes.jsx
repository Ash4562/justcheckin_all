
import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin Pages
import AdminLogin from "../components/pages/AdminLogin";
import AdminVerify from "../components/pages/AdminVerify";
import ProtectedRoute from "../components/ProtectedRoute";
import UserTabsLayout from "../components/UserTabsLayout";

import AdminDashboard from "../components/pages/AdminDashboard";
import AdminHotels from "../components/pages/AdminHotels";
import AdminHotelDetails from "../components/pages/AdminHotelDetails";
import AdminCreateUser from "../components/pages/AdminCreateUser";
import UserDetails from "../components/pages/UserDetails";
import AdminPayments from "../components/pages/AdminPayments";
import AdminPendingApprovals from "../components/pages/AdminPendingApprovals";
import HotelPenApoDetails from "../components/pages/HotelPenApoDetails";
import SelectedHotelUsers from "../components/pages/SelectedHotelUsers";
import AllHotelUsers from "../components/pages/AllHotelUsers";
import AdminUserDetails from "../components/pages/AdminUserDetails";
import AdminUserDetailsCard from "../components/pages/AdminUserDetailsCard";
import AdminHotelDetailsCard from "../components/pages/AdminHotelDetailsCard";
import AllUserHotels from "../components/pages/AllUserHotels";
// import AdhharUserDetails from "../components/pages/AdhharUserDetails";
import UserDrivngLicencesDetals from "../components/pages/UserDrivngLicencesDetals";
import PassportUserDetails from "../components/pages/PassportUserDetails";
import UserVoterDetails from "../components/pages/UserVoterDetails";

// Separated Views
import OurHotelVoterUser from "../components/pages/seletedUsersOfHotels/OurHotelVoterUser";
import OurHotelAadharUser from "../components/pages/seletedUsersOfHotels/OurHotelAadharUser";
import OurUserDrivngLicencesDetals from "../components/pages/seletedUsersOfHotels/OurUserDrivngLicencesDetals";
import UserDetailsPassport from "../components/pages/userDetailsCart/UserDetailsPassport";
// import EditPassportUser from "../components/pages/userDetailsCart/EditPassportUser";
import EditPassportUser from "../components/pages/userDetailsCart/EditPassportUser ";
import UserDravingLicdetails from "../components/pages/userDetailsCart/UserDravingLicdetails";
import EditDravingLicDetials from "../components/pages/userDetailsCart/EditDravingLicDetials";
import UserVoterDetail from "../components/pages/userDetailsCart/UserVoterDetail";
import EditVoterDetails from "../components/pages/userDetailsCart/EditVoterDetails";
import AdhharUserDetails from "../components/pages/AdhharUserDetails";
import AdminUserTabLayout from "../components/UserTabsLayout";


const AdminRoutes = () => {
  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/AdminVerify" element={<AdminVerify />} />

    {/* Protected Admin Routes */}
    <Route path="/admin" element={<ProtectedRoute />}>
      <Route index element={<AdminDashboard />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="AdminHotels" element={<AdminHotels />} />
      <Route path="AdminHotelDetails" element={<AdminHotelDetails />} />
      <Route path="AdminCreateUser" element={<AdminCreateUser />} />
      <Route path="UserDetails" element={<UserDetails />} />
      <Route path="AdminPayments" element={<AdminPayments />} />
      <Route path="AdminPendingApprovals" element={<AdminPendingApprovals />} />
      <Route path="HotelPenApoDetails" element={<HotelPenApoDetails />} />
      <Route path="SelectedHotelUsers/:hotelId" element={<SelectedHotelUsers />} />
      <Route path="AllHotelUsers" element={<AllHotelUsers />} />
      <Route path="AdminUserDetails" element={<AdminUserDetails />} />
      <Route path="AdminUserDetailsCard" element={<AdminUserDetailsCard />} />
      <Route path="AdminHotelDetailsCard" element={<AdminHotelDetailsCard />} />
      <Route path="AllUserHotels" element={<AllUserHotels />} />
        <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
        <Route element={<AdminUserTabLayout />}>
    <Route path="AllUserHotels" element={<AllUserHotels />} />
    <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
    <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
    <Route path="PassportUserDetails" element={<PassportUserDetails />} />
    <Route path="UserVoterDetails" element={<UserVoterDetails />} />
  </Route>
      {/* ✅ Tab Layout Routes Nested Correctly */}
      {/* <Route path="tabs" element={<UserTabsLayout />}> */}

        {/* <Route path="AllUserHotels" element={<AllUserHotels />} />
        <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
        <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
        <Route path="PassportUserDetails" element={<PassportUserDetails />} />
        <Route path="UserVoterDetails" element={<UserVoterDetails />} /> */}
      {/* </Route> */}
    </Route>


    {/* Separate Views (Not Protected) */}
    <Route path="/Adhhar" element={<OurHotelAadharUser />} />
    <Route path="/voter" element={<OurHotelVoterUser />} />
    <Route path="/driving" element={<OurUserDrivngLicencesDetals />} />
    <Route path="/UserDetailsPassport" element={<UserDetailsPassport />} />
    <Route path="/EditPassportUser" element={<EditPassportUser />} />
    <Route path="/UserDravingLicdetails" element={<UserDravingLicdetails />} />
    <Route path="/EditDravingLicDetials" element={<EditDravingLicDetials />} />
    <Route path="/UserVoterDetail" element={<UserVoterDetail />} />
    <Route path="/EditVoterDetails" element={<EditVoterDetails />} />

    <Route path="/admin" element={<AdminUserTabLayout />}>
        <Route element={<AdminUserTabLayout />}>
          <Route path="AllUserHotels" element={<AllUserHotels />} />
          <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
          <Route path="PassportUserDetails" element={<PassportUserDetails />} />
          <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
          <Route path="UserVoterDetails" element={<UserVoterDetails />} />
        </Route>
      </Route>

    {/* 404 Route */}

  </Routes>
  );
};

export default AdminRoutes;










































// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";


// // Admin Pages
// import AdminLogin from "../components/pages/AdminLogin";
// import AdminVerify from "../components/pages/AdminVerify";
// import ProtectedRoute from "../components/ProtectedRoute";
// import UserTabsLayout from "../components/UserTabsLayout";

// // Admin Pages
// import AdminDashboard from "../components/pages/AdminDashboard";
// import AdminHotels from "../components/pages/AdminHotels";
// import AdminHotelDetails from "../components/pages/AdminHotelDetails";
// import AdminCreateUser from "../components/pages/AdminCreateUser";
// import UserDetails from "../components/pages/UserDetails";
// import AdminPayments from "../components/pages/AdminPayments";
// import AdminPendingApprovals from "../components/pages/AdminPendingApprovals";
// import HotelPenApoDetails from "../components/pages/HotelPenApoDetails";
// import SelectedHotelUsers from "../components/pages/SelectedHotelUsers";
// import AllHotelUsers from "../components/pages/AllHotelUsers";
// import AdminUserDetails from "../components/pages/AdminUserDetails";
// import AdminUserDetailsCard from "../components/pages/AdminUserDetailsCard";
// import AdminHotelDetailsCard from "../components/pages/AdminHotelDetailsCard";
// import AllUserHotels from "../components/pages/AllUserHotels";
// import AdhharUserDetails from "../components/pages/AdhharUserDetails";
// import UserDrivngLicencesDetals from "../components/pages/UserDrivngLicencesDetals";
// import PassportUserDetails from "../components/pages/PassportUserDetails";
// import UserVoterDetails from "../components/pages/UserVoterDetails";


// // Separated Views
// import OurHotelVoterUser from "../components/pages/seletedUsersOfHotels/OurHotelVoterUser";
// import OurHotelAadharUser from "../components/pages/seletedUsersOfHotels/OurHotelAadharUser";
// import OurUserDrivngLicencesDetals from "../components/pages/seletedUsersOfHotels/OurUserDrivngLicencesDetals";
// import UserDetailsPassport from "../components/pages/userDetailsCart/UserDetailsPassport";
// // import EditPassportUser from "../components/pages/userDetailsCart/EditPassportUser";
// import EditPassportUser from "../components/pages/userDetailsCart/EditPassportUser ";
// import UserDravingLicdetails from "../components/pages/userDetailsCart/UserDravingLicdetails";
// import EditDravingLicDetials from "../components/pages/userDetailsCart/editDravingLicDetials";
// import UserVoterDetail from "../components/pages/userDetailsCart/UserVoterDetail";
// import EditVoterDetails from "../components/pages/userDetailsCart/EditVoterDetails";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<AdminLogin />} />
//         <Route path="/AdminVerify" element={<AdminVerify />} />

//         {/* Protected Admin Routes */}
//         <Route path="/admin" element={<ProtectedRoute />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="AdminHotels" element={<AdminHotels />} />
//           <Route path="AdminHotelDetails" element={<AdminHotelDetails />} />
//           <Route path="AdminCreateUser" element={<AdminCreateUser />} />
//           <Route path="UserDetails" element={<UserDetails />} />
//           <Route path="AdminPayments" element={<AdminPayments />} />
//           <Route path="AdminPendingApprovals" element={<AdminPendingApprovals />} />
//           <Route path="HotelPenApoDetails" element={<HotelPenApoDetails />} />
//           <Route path="SelectedHotelUsers/:hotelId" element={<SelectedHotelUsers />} />
//           <Route path="AllHotelUsers" element={<AllHotelUsers />} />
//           <Route path="AdminUserDetails" element={<AdminUserDetails />} />
//           <Route path="AdminUserDetailsCard" element={<AdminUserDetailsCard />} />
//           <Route path="AdminHotelDetailsCard" element={<AdminHotelDetailsCard />} />
//           <Route path="AllUserHotels" element={<AllUserHotels />} />

//           {/* Tab Layout Routes */}
//           <Route path="tabs" element={<UserTabsLayout />}>
//             <Route path="AllUserHotels" element={<AllUserHotels />} />
//             <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
//             <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
//             <Route path="PassportUserDetails" element={<PassportUserDetails />} />
//             <Route path="UserVoterDetails" element={<UserVoterDetails />} />
//           </Route>
//         </Route>

//         {/* Separate Views Outside Admin Layout */}
//         <Route path="/Adhhar" element={<OurHotelAadharUser />} />
//         <Route path="/voter" element={<OurHotelVoterUser />} />
//         <Route path="/driving" element={<OurUserDrivngLicencesDetals />} />
//         <Route path="/UserDetailsPassport" element={<UserDetailsPassport />} />
//         <Route path="/EditPassportUser" element={<EditPassportUser />} />
//         <Route path="/UserDravingLicdetails" element={<UserDravingLicdetails />} />
//         <Route path="/EditDravingLicDetials" element={<EditDravingLicDetials />} />
//         <Route path="/UserVoterDetail" element={<UserVoterDetail />} />
//         <Route path="/EditVoterDetails" element={<EditVoterDetails />} />

//         {/* 404 Route */}
//         <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;











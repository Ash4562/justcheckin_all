// import React, { Suspense, lazy } from 'react';
// import { HashRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import VerificationCards from '../../hotelQr/pages/user/NumberOfUsers';
// import DrivingLicenseForm from '../../hotelQr/pages/user/DrivingLicenseUserDetails';
// import DrivingLicenseVerify from '../../hotelQr/pages/user/DrivingLicniesVerify';
// import VotingIdVerifying from '../../hotelQr/pages/user/VotingIdVerifying';
// import VoterIdForm from '../../hotelQr/pages/user/VotingIdUserDetail';
// import PassportVerify from '../../hotelQr/pages/user/Passportverify';
// import PassportVerifyUser from '../../hotelQr/pages/user/PassportVerifyUser';

// import AadharVerify from '../../hotelQr/pages/user/AadhaarOTPForm';
// import Wallet from '../public/pages/Wallet';
// import ProtectedRoute from '../../admin/components/ProtectedRoute';
// import ForgotPassword from '../public/pages/ForgotPassword';
// import About from '../public/pages/About';
// import UserDrivngLicencesDetals from '../public/pages/UserDrivngLicencesDetals';
// import PassportUserDetails from '../public/pages/PassportUserDetails';
// import UserVoterDetails from '../public/pages/UserVoterDetails';
// import AdhharUserDetails from '../public/pages/AdhharUserDetails';

// const PublicLayout = lazy(() => import('../public/PublicLayout'));
// const Login = lazy(() => import('../public/pages/Login'));
// const Home = lazy(() => import('../public/component/Home'));
// const DashboardHome = lazy(() => import('../public/pages/DashboardHome'));
// const Profile = lazy(() => import('../public/pages/Profile'));
// const UserDetails = lazy(() => import('../public/pages/UserDetails'));
// const Register = lazy(() => import('../public/pages/Register'));
// const DashboardFirst = lazy(() => import('../public/pages/DashboardFirst'));

// const OnlyHotelRoutes = () => {
//   return (
//     <>
  
//       <Toaster position="top-right" />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route element={<PublicLayout />}>
//             {/* <Route path="/" element={<Home />} /> */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/forgotPass" element={<ForgotPassword />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/" element={<VerificationCards />} />
//               <Route path="/AadharVerify" element={<AadharVerify />} />
//               <Route path="/DashboardHome" element={<DashboardHome />} />
//               <Route path="/driving" element={<DrivingLicenseVerify />} />
//               <Route path="/DLUserDetails" element={<DrivingLicenseForm />} />
//               <Route path="/VotingIdVerifying" element={<VotingIdVerifying />} />
//               <Route path="/VotingIdUserDetail" element={<VoterIdForm />} />
//               <Route path="/Passportverify" element={<PassportVerify />} />
//               <Route path="/PassportVerifyUser" element={<PassportVerifyUser />} />
//             <Route
//               path="/dashboard/*"
//               element={
//                 <ProtectedRoute>
//                   <UserDetails/>
//                 <Routes>
//                   <Route path="DashboardHome" element={<DashboardHome />} />  


//                   <Route path="profile" element={<Profile />} />
          
//                   <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
//                   <Route path="PassportUserDetails" element={<PassportUserDetails />} />
//                   <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
//                   <Route path="UserVoterDetails" element={<UserVoterDetails />} />
//                   <Route path="DashboardFirst" element={<DashboardFirst />} />
//                   <Route path="wallet" element={<Wallet />} />
//                 </Routes>
//                   </ProtectedRoute>
//               }
//             />
//           </Route>
//           <Route path="*" element={<h1>Hotel  404  Page Not Found</h1>} />
//         </Routes>
//       </Suspense>
 
//     </>
//   );
// };

// export default OnlyHotelRoutes;


import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy Imports
const PublicLayout = lazy(() => import('../public/PublicLayout'));
const Login = lazy(() => import('../public/pages/Login'));
const Register = lazy(() => import('../public/pages/Register'));
const ForgotPassword = lazy(() => import('../public/pages/ForgotPassword'));
const About = lazy(() => import('../public/pages/About'));
const DashboardHome = lazy(() => import('../public/pages/DashboardHome'));
const Profile = lazy(() => import('../public/pages/Profile'));
const UserDetails = lazy(() => import('../public/pages/UserDetails'));
const DashboardFirst = lazy(() => import('../public/pages/DashboardFirst'));
const Wallet = lazy(() => import('../public/pages/Wallet'));
const AdhharUserDetails = lazy(() => import('../public/pages/AdhharUserDetails'));
const PassportUserDetails = lazy(() => import('../public/pages/PassportUserDetails'));
const UserDrivngLicencesDetals = lazy(() => import('../public/pages/UserDrivngLicencesDetals'));
const UserVoterDetails = lazy(() => import('../public/pages/UserVoterDetails'));

// QR Pages
// import VerificationCards from '../../hotelQr/pages/user/NumberOfUsers';
// import DrivingLicenseForm from '../../hotel/public';
import DrivingLicenseVerify from '../public/pages/DrivingLicniesVerify';
import VotingIdVerifying from '../public/pages/VotingIdVerifying';
import VoterIdForm from '../public/pages/VotingIdUserDetail';
import PassportVerify from '../public/pages/Passportverify';
import PassportVerifyUser from '../public/pages/PassportVerifyUser';
import AadharVerify from '../public/pages/AadharVerify';

import ProtectedRoute from '../../hotel/public/pages/ProtectedRoute';
import DrivingLicenseForm from '../public/pages/DrivingLicenseUserDetails';
import VerificationCards from '../public/pages/NumberOfUsers';
import DashboardLayout from '../public/component/DashboardLayout';

const OnlyHotelRoutes = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Redirect root to /hotel */}
          {/* <Route path="/" element={<Navigate to="/hotel" replace />} /> */}

          {/* All routes under /hotel */}
          <Route path="/hotel" element={<PublicLayout />}>
            {/* Public Routes */}
            <Route index element={<VerificationCards />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPass" element={<ForgotPassword />} />
            <Route path="about" element={<About />} />

            {/* Protected Routes under /hotel/dashboard/* */}
            <Route path="dashboard">
  {/* Routes that should show DashboardLayout */}
  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="userdetails" element={<UserDetails />} />
    <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
    <Route path="PassportUserDetails" element={<PassportUserDetails />} />
    <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
    <Route path="UserVoterDetails" element={<UserVoterDetails />} />
  </Route>

  {/* Other protected routes without DashboardLayout */}
  <Route
    element={
      <ProtectedRoute>
        {/* No DashboardLayout here */}
        <Outlet />
      </ProtectedRoute>
    }
  >
      <Route path="profile" element={<Profile />} />
    <Route path="AadharVerify" element={<AadharVerify />} />
    <Route path="driving" element={<DrivingLicenseVerify />} />
    <Route path="DLUserDetails" element={<DrivingLicenseForm />} />
    <Route path="VotingIdVerifying" element={<VotingIdVerifying />} />
    <Route path="VotingIdUserDetail" element={<VoterIdForm />} />
    <Route path="Passportverify" element={<PassportVerify />} />
    <Route path="PassportVerifyUser" element={<PassportVerifyUser />} />
    <Route path="DashboardHome" element={<DashboardHome />} />
    <Route path="NumberOfUsers" element={<VerificationCards />} />
    <Route path="DashboardFirst" element={<DashboardFirst />} />
    <Route path="wallet" element={<Wallet />} />
  </Route>
</Route>

</Route>
      


          {/* Catch All */}
          {/* <Route path="*" element={<h1>Hotel 404 Page Not Found</h1>} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default OnlyHotelRoutes;

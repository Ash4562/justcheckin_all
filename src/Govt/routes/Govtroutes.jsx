import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import GovtSidebar from '../Components/GovtSidebar';
// import SearchLogout from '../Components/SearchLogout';

import HotelUsers from '../pages/hotelUsers';
import HoteluserCrad from '../pages/hoteluserCrad';
import AllUser from '../pages/AllUser';
import UserCardDeatils from '../pages/UserCardDeatils';
import SelectedHotelUsersGov from '../pages/SelectedHotelUsersGov';

// Tab Layout + Nested
import UserTabsLayout from '../Components/UserTabsLayout';
import AllUserHotels from '../pages/AllUserHotels';
import UserDrivngLicencesDetals from '../pages/UserDrivngLicencesDetals';
import PassportUserDetails from '../pages/PassportUserDetails';
import UserVoterDetails from '../pages/UserVoterDetails';
import AdhharUserDetails from '../pages/AdhharUserDetails';

// Individual Card Views
import UserDetailsPassport from '../pages/userDetailsCart/UserDetailsPassport';
import UserDravingLicdetails from '../pages/userDetailsCart/UserDravingLicdetails';
import UserVoterDetail from '../pages/userDetailsCart/UserVoterDetail';
import LoginGovt from '../pages/LoginGovt';
import Protected from '../Components/Protected';
import GovtDashborad from '../pages/GovtDashborad';
import SearchLogout from '../Components/SearchLogout';
import AdminUserDetailsCard from '../pages/AdminUserDetailsCard';


const GovtRoutes = () => {
  const isAuthenticated = true; // 🔒 Replace this with real logic or Redux state

  return (

      <Routes>
        {/* Public Login Route */}
        <Route path="/govtlogin" element={<LoginGovt />} />

        {/* Protected /govt routes */}
        <Route path="/govt" element={<Protected isAuthenticated={isAuthenticated} />}>
          <Route index element={<GovtDashborad />} />
          <Route path="dashboard" element={<GovtDashborad />} />
          <Route path="GovtSidebar" element={<GovtSidebar />} />
          <Route path="SearchLogout" element={<SearchLogout />} />

          <Route path="hotelUsers" element={<HotelUsers />} />
          <Route path="HoteluserCrad" element={<HoteluserCrad />} />
          <Route path="AllUser" element={<AllUser />} />
          <Route path="UserCardDeatils" element={<UserCardDeatils />} />
 
          <Route path="SelectedHotelUsersGov/:hotelId" element={<SelectedHotelUsersGov />} />

          {/* Tab Layout */}
          <Route element={<UserTabsLayout />}>
          <Route path="AllUserHotels" element={<AllUserHotels />} />
          <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
          <Route path="PassportUserDetails" element={<PassportUserDetails />} />
          <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
          <Route path="UserVoterDetails" element={<UserVoterDetails />} />
     
        </Route>
            {/* <Route path="AllUserHotels" element={<AllUserHotels />} />
            <Route path="AdhharUserDetails" element={<AdhharUserDetails />} />
            <Route path="UserDrivngLicencesDetals" element={<UserDrivngLicencesDetals />} />
            <Route path="PassportUserDetails" element={<PassportUserDetails />} />
            <Route path="UserVoterDetails" element={<UserVoterDetails />} /> */}

          {/* Card Views */}
          <Route path="UserDetailsPassport" element={<UserDetailsPassport />} />
          <Route path="UserDravingLicdetails" element={<UserDravingLicdetails />} />
          <Route path="UserVoterDetail" element={<UserVoterDetail />} />
          <Route path="AdminUserDetailsCard" element={<AdminUserDetailsCard />} />
        </Route>

        {/* 404 fallback */}
        {/* <Route path="*" element={<h1>Govt  404  Page Not Found</h1>} /> */}
      </Routes>

  );
};

export default GovtRoutes;

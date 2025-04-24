// import React from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import AdminSideBar from "./pages/AdminSideBar";
// // import AdminSideBar from "../pages/Admin/AdminSideBar";
// // import AdminSideBar from "./AdminSideBar";

// const UserTabsLayout = ({ searchTerm, setSearchTerm }) => {
//   const location = useLocation();
//   console.log("location",location);

//   return (
//     <div className="flex flex-col lg:flex-row ">
//       <AdminSideBar  className='w-20'/>

//       <div className="flex-1   bg-white overflow-y-auto">
//         <div className="flex flex-row gap-6  pl-6 justify-center items-center sticky top-0 bg-white z-10">
//        <div className="w-1/2  flex gap-6">
//        {[
//             { to: "/AllUserHotels", label: "All Users" },
//             { to: "/AdhharUserDetails", label: "Aadhaar" },
//             { to: "/PassportUserDetails", label: "Passport" },
//             { to: "/UserDrivngLicencesDetals", label: "Driving License" },
//             { to: "/UserVoterDetails", label: "Voter ID" },
//           ].map(({ to, label }) => (
//             <Link
//               key={to}
//               to={to}
//               className={`border-b-2 ${
//                 location.pathname === to
//                   ? "border-blue-500 text-blue-600 font-semibold"
//                   : "border-transparent"
//               } hover:border-blue-500 pb-1 transition duration-200`}
//             >
//               {label}
//             </Link>
//           ))}

//        </div>
//         <div className="w-1/2  z-10 bg-white p-2">
//           <input
//             type="text"
//             placeholder="Search by name, Aadhaar, or address..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         </div>

//         {/* Search bar */}

//         {/* Render child routes */}
//         <div className="mt-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTabsLayout;
// components/layouts/AdminUserTabLayout.jsx// src/layouts/AdminUserTabLayout.jsx

import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import AdminSideBar from './pages/AdminSideBar';
// import AdminSideBar from '../components/AdminSideBar';

function AdminUserTabLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex">
      <AdminSideBar />

      <div className="w-full h-screen overflow-y-auto">
        {/* Tabs + Search */}
        <div className="flex justify-between items-center sticky top-0 bg-white px-4 py-2 z-10">
          <div className="flex gap-4">
            <NavLink to="/admin/AllUserHotels" className="hover:text-blue-600">All Users</NavLink>
            <NavLink
  to="/admin/AdhharUserDetails"
  className={({ isActive }) =>
    `hover:text-blue-600 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
  }
>
  Adhaar
</NavLink>
            <NavLink to="/admin/PassportUserDetails" className="hover:text-blue-600">Passport</NavLink>
            <NavLink to="/admin/UserDrivngLicencesDetals" className="hover:text-blue-600">Driving Licenses</NavLink>
            <NavLink to="/admin/UserVoterDetails" className="hover:text-blue-600">Voter ID</NavLink>
          </div>

          <div className="w-1/2 sticky top-0 bg-white p-4">
                    <input
                        type="text"
                        placeholder="Search by name, Aadhar, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                </div>
        </div>

        {/* Provide searchTerm as context */}
        <Outlet context={{ searchTerm }} />
      </div>
    </div>
  );
}

export default AdminUserTabLayout;

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import GovtSidebar from "./GovtSidebar";
// import AdminSideBar from "./AdminSideBar";

const UserTabsLayout = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row overflow-y-auto ">
      <GovtSidebar className='w-20'/>

      <div className="flex-1   bg-white overflow-y-auto">
        <div className="flex flex-row gap-6 overflow-y-auto pl-6 justify-center items-center sticky top-0 bg-white z-10">
       <div className="w-1/2 overflow-y-auto  flex gap-6">
       {[
            // { to: "/govt/AllUserHotels", label: "All Users" },
            { to: "/govt/AdhharUserDetails", label: "Aadhaar" },
            { to: "/govt/PassportUserDetails", label: "Passport" },
            { to: "/govt/UserDrivngLicencesDetals", label: "Driving License" },
            { to: "/govt/UserVoterDetails", label: "Voter ID" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`border-b-2 ${
                location.pathname === to
                  ? "border-blue-500 text-blue-600 font-semibold"
                  : "border-transparent"
              } hover:border-blue-500 pb-1 transition duration-200`}
            >
              {label}
            </Link>
          ))}

       </div>
        <div className="w-1/2  z-10 bg-white p-2">
          <input
            type="text"
            placeholder="Search by name, Aadhaar, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        </div>

        {/* Search bar */}

        {/* Render child routes */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserTabsLayout;

import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  return (
    <div className="bg-white p-4 z-10">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 sticky top-0 bg-white p-4 mx-6 flex gap-10">
          <Link to="/hotel/dashboard/userdetails"   className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/userdetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}>All Users</Link>
          <Link to="/hotel/dashboard/AdhharUserDetails"  className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/AdhharUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}>Adhaar</Link>
          <Link to="/hotel/dashboard/PassportUserDetails"  className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/PassportUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}>Passport</Link>
          <Link to="/hotel/dashboard/UserDrivngLicencesDetals"  className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/UserDrivngLicencesDetals'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}> Drivng Licences</Link>
          <Link to="/hotel/dashboard/UserVoterDetails"  className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/UserVoterDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}>Voter</Link>
        </div>
        <div className="w-1/2 sticky top-0 bg-white p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-4 rounded-full border"
          />
        </div>
      </div>

      {/* Nested components will appear here */}
      <Outlet context={{ searchTerm }} />
    </div>
  );
};

export default DashboardLayout;

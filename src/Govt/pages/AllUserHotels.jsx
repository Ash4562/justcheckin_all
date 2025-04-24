

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';



// import { useGetAllhoteUserQuery, useGetBookingsQuery } from '../../redux/adminApi/VoterDrivingPassApi';
// import AdhharUserDetails from './AdhharUserDetails';
// import UserDrivngLicencesDetals from './UserDrivngLicencesDetals';
// import PassportUserDetails from './PassportUserDetails';
// import UserVoterDetails from './UserVoterDetails';
// import AdminSideBar from './AdminSideBar';
// import { useGetAllhoteUserQuery } from '../redux/VoterDrivingPassApi';
import GovtSidebar from '../Components/GovtSidebar';
import AdhharUserDetails from './AdhharUserDetails';
import UserDrivngLicencesDetals from './UserDrivngLicencesDetals';
import PassportUserDetails from './PassportUserDetails';
import UserVoterDetails from './UserVoterDetails';
import { useGetAllhoteUserQuery } from '../../admin/redux/adminApi/VoterDrivingPassApi';

function AllUserHotels() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetAllhoteUserQuery();
    const location = useLocation();

    const bookings = data?.BookingData || [];
    const voters = data?.VoterData || [];
    const dl = data?.DLData || [];
    const passports = data?.PassportData || [];

    // Combine customers from all sources
    const extractCustomers = (list) => list.flatMap(item => item.customers || []);

    const allCustomers = [
        ...extractCustomers(bookings),
        ...extractCustomers(voters),
        ...extractCustomers(dl),
        ...extractCustomers(passports),
    ];

    const  filteredCustomers = allCustomers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.customer_name && user.customer_name.toLowerCase().includes(term)) ||
            (user.aadhar_number && user.aadhar_number.toLowerCase().includes(term)) ||
            (user.address && user.address.toLowerCase().includes(term))
        );
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl font-semibold">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">
                {error?.data?.message || 'Error fetching users'}
            </div>
        );
    }

    return (
      <div className="flex ">
          <GovtSidebar className="hidden md:flex md:flex-col md:w-1/4 md:min-h-screen  bg-[#0060EC] p-4 shadow-md"/>
            <div className="w-full overflow-y-auto h-screen flex-col justify-center items-center   sm:mt-20 lg:mt-0 ">
         <div className='flex justify-center sticky top-0  bg-white items-center'>
         <div className="w-1/2  bg-white  mx-6 flex lg:gap-6">
                    <Link
                        to="/govt/AllUserHotels"
                        className={`border-b-2 ${
                            location.pathname === '/govt/AllUserHotels'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        All Users
                    </Link>

                    <Link
                        to="/govt/AdhharUserDetails"
                        className={`border-b-2 ${
                            location.pathname === '/govt/AdhharUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Adhaar
                    </Link>

                    <Link
                        to="/govt/PassportUserDetails"
                        className={`border-b-2 ${
                            location.pathname === '/govt/PassportUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Passport
                    </Link>

                    <Link
                        to="/govt/UserDrivngLicencesDetals"
                        className={`border-b-2 ${
                            location.pathname === '/govt/UserDrivngLicencesDetals'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Drivng Licences Detals
                    </Link>

                    <Link
                        to="/govt/UserVoterDetails"
                        className={`border-b-2 ${
                            location.pathname === '/govt/UserVoterDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Voter ID
                    </Link>
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
            {/* Conditionally render only if path matches */}
                        {location.pathname === '/govt/AllUserHotels' && (
                            <div className="bg-[#F3FFDF] overflow-y-auto p-4 m-4 rounded-2xl">
                                <AdhharUserDetails customers={filteredCustomers} />
                                <UserDrivngLicencesDetals customers={filteredCustomers} />
                                <PassportUserDetails customers={filteredCustomers} />
                                <UserVoterDetails customers={filteredCustomers} />
                            </div>
                        )}
            </div>

        </div>
    );
}

export default AllUserHotels;

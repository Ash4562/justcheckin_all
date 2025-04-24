// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
// import UserDrivngLicencesDetals from './UserDrivngLicencesDetals';
// import PassportUserDetails from './PassportUserDetails';
// import UserVoterDetails from './UserVoterDetails';
// import AdhharUserDetails from './AdhharUserDetails';

// function UserDetails() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data, error, isLoading } = useGetBookingsQuery();
//     const location = useLocation(); // ✅ Correctly getting current path

//     console.log("bokking pre muj adadd",data);
//     const bookings = data?.BookingData || [];

//     // Combine and filter customers
//     const allCustomers = bookings.flatMap((booking) => booking.customers);
//     const filteredCustomers = allCustomers.filter((user) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             (user.customer_name && user.customer_name.toLowerCase().includes(term)) ||
//             (user.aadhar_number && user.aadhar_number.toLowerCase().includes(term)) ||
//             (user.address && user.address.toLowerCase().includes(term))
//         );
//     });

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen text-xl font-semibold">
//                 Loading...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">
//                 {error?.data?.message || 'Error fetching users'}
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white p-4 z-10">
//             <div className="w-full flex justify-center items-center bg-white">
//                 <div className="w-1/2 sticky top-0 bg-white p-4 mx-6 flex gap-10">
//                     <Link
//                         to="/dashboard/userdetails"
//                         className={`border-b-2 ${
//                             location.pathname === '/dashboard/userdetails'
//                                 ? 'border-blue-500 text-blue-600 font-semibold'
//                                 : 'border-transparent'
//                         } hover:border-blue-500 pb-1 transition duration-200`}
//                     >
//                         All Users
//                     </Link>

//                     <Link
//                         to="/dashboard/AdhharUserDetails"
//                         className={`border-b-2 ${
//                             location.pathname === '/dashboard/AdhharUserDetails'
//                                 ? 'border-blue-500 text-blue-600 font-semibold'
//                                 : 'border-transparent'
//                         } hover:border-blue-500 pb-1 transition duration-200`}
//                     >
//                         Adhaar
//                     </Link>

//                     <Link
//                         to="/dashboard/PassportUserDetails"
//                         className={`border-b-2 ${
//                             location.pathname === '/dashboard/PassportUserDetails'
//                                 ? 'border-blue-500 text-blue-600 font-semibold'
//                                 : 'border-transparent'
//                         } hover:border-blue-500 pb-1 transition duration-200`}
//                     >
//                         Passport
//                     </Link>

//                     <Link
//                         to="/dashboard/UserDrivngLicencesDetals"
//                         className={`border-b-2 ${
//                             location.pathname === '/dashboard/UserDrivngLicencesDetals'
//                                 ? 'border-blue-500 text-blue-600 font-semibold'
//                                 : 'border-transparent'
//                         } hover:border-blue-500 pb-1 transition duration-200`}
//                     >
//                         Drivng Licences Detals
//                     </Link>

//                     <Link
//                         to="/dashboard/UserVoterDetails"
//                         className={`border-b-2 ${
//                             location.pathname === '/dashboard/UserVoterDetails'
//                                 ? 'border-blue-500 text-blue-600 font-semibold'
//                                 : 'border-transparent'
//                         } hover:border-blue-500 pb-1 transition duration-200`}
//                     >
//                         Voter ID
//                     </Link>
//                 </div>

//                 <div className="w-1/2 sticky top-0 bg-white p-4">
//                     <input
//                         type="text"
//                         placeholder="Search by name, Aadhar, or address..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full p-3 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//             </div>

//             {/* ✅ Conditionally show content only on /dashboard/userdetails */}
//             {location.pathname === '/dashboard/userdetails' && (
//                 <div className="">
//                     <AdhharUserDetails />
//                     <UserDrivngLicencesDetals />
//                     <PassportUserDetails />
//                     <UserVoterDetails />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UserDetails;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
import UserDrivngLicencesDetals from './UserDrivngLicencesDetals';
import PassportUserDetails from './PassportUserDetails';
import UserVoterDetails from './UserVoterDetails';
import AdhharUserDetails from './AdhharUserDetails';

function UserDetails() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetBookingsQuery();
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

    const filteredCustomers = allCustomers.filter((user) => {
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
        <div className="bg-white p-4 z-10">
            {/* <div className="w-full flex justify-center items-center  ">
                <div className="w-1/2 sticky top-0 bg-white p-4 mx-6 flex gap-10">
                    <Link
                        to="/hotel/dashboard/userdetails"
                        className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/userdetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        All Users
                    </Link>

                    <Link
                        to="/hotel/dashboard/AdhharUserDetails"
                        className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/AdhharUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Adhaar
                    </Link>

                    <Link
                        to="/hotel/dashboard/PassportUserDetails"
                        className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/PassportUserDetails'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Passport
                    </Link>

                    <Link
                        to="/hotel/dashboard/UserDrivngLicencesDetals"
                        className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/UserDrivngLicencesDetals'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent'
                        } hover:border-blue-500 pb-1 transition duration-200`}
                    >
                        Drivng Licences Detals
                    </Link>

                    <Link
                        to="/hotel/dashboard/UserVoterDetails"
                        className={`border-b-2 ${
                            location.pathname === '/hotel/dashboard/UserVoterDetails'
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
            </div> */}

            {/* Conditionally render only if path matches */}
            {location.pathname === '/hotel/dashboard/userdetails' && (
                <div className="bg-[#F3FFDF]rounded-2xl">
                    <AdhharUserDetails customers={filteredCustomers} />
                    <UserDrivngLicencesDetals customers={filteredCustomers} />
                    <PassportUserDetails customers={filteredCustomers} />
                    <UserVoterDetails customers={filteredCustomers} />
                </div>
            )}
        </div>
    );
}

export default UserDetails;

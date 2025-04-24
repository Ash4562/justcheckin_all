
// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// // import { useGetDrivingLicenseQuery } from '../../redux/api/VoterDrivingPassApi';
// import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
// import { Link } from 'react-router-dom';
// // import UserDetails from './UserDetails';

// function UserDrivngLicencesDetals() {
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data, error, isLoading } = useGetBookingsQuery();
//     console.log("Driving License Data:", data);
//     const drivingLicenses = data?.drivingLicenseData || [];
// console.log("fsdgfdhghggdhgdhhdggdhgddgh",drivingLicenses[0].createdAt
// );
//     // Combine all customers from driving licenses
//     const allCustomers = drivingLicenses.flatMap((license) => license.customers);

//     // Filter customers by name, document ID, or address (case-insensitive)
//     const filteredCustomers = allCustomers.filter((user) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             (user.name && user.name.toLowerCase().includes(term)) ||
//             (user.document_id && user.document_id.toLowerCase().includes(term)) ||
//             (user.address && user.address.toLowerCase().includes(term))
//         );
//     });

//     useEffect(() => {
//         console.log('Fetched Driving Licenses:', drivingLicenses.createdAt);
//     }, [drivingLicenses]);

//     // Prevent background scrolling when modal is open
//     useEffect(() => {
//         document.body.style.overflow = selectedUser ? 'hidden' : 'auto';
//     }, [selectedUser]);

//     if (isLoading) {
//         return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
//     }

//     if (error) {
//         return <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">{error?.data?.message || 'Error fetching data'}</div>;
//     }

//     return (
//         < >
//             {/* Search Bar */}
//    {/* <UserDetails/> */}
            

//             {/* User Cards Grid */}
//             <div className="p-4 rounded-2xl  m-4 bg-[#F3FFDF] ">

//                 {/* <strong className='flex  my-6 rounded-2xl p-4  text-3xl'>Driving License Details</strong> */}
//                 {filteredCustomers.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
//                         {filteredCustomers.map((user) => (
//                             <div
//                                 key={user.document_id}
//                                 onClick={() => setSelectedUser(user)}
//                                 className="p-4  m-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
//                             >
//                                 <img
//                                     src={
//                                         user.photo_base64
//                                             ? `data:image/jpeg;base64,${user.photo_base64}`
//                                             : '/GroupPhoto.png'
//                                     }
//                                     alt="User"
//                                     className="w-24 h-24 object-cover rounded-full mx-auto"
//                                 />
//                                 <h1 className="text-center mt-2 font-semibold text-lg">{user.name}</h1>
//                                 <p className="text-center text-gray-500 text-sm">License ID: {user.document_id}</p>
//                                 <p className="mt-2 text-center text-gray-700 text-sm break-words">{user.address}</p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center text-gray-600 mt-10">No users match your search.</div>
//                 )}
//             </div>

//             {/* Responsive Modal */}
//             {selectedUser && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
//                         <button
//                             onClick={() => setSelectedUser(null)}
//                             className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none"
//                             aria-label="Close"
//                         >
//                             X
//                         </button>

//                         <div className="text-center mb-6">
//                             <img
//                                 src={
//                                     selectedUser.photo_base64
//                                         ? `data:image/jpeg;base64,${selectedUser.photo_base64}`
//                                         : '/Vector.svg'
//                                 }
//                                 alt="User Profile"
//                                 className="w-24 h-24 object-cover rounded-full mx-auto"
//                             />
//                             <h3 className="text-2xl font-bold mt-4">{selectedUser.name}</h3>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">License ID:</span>
//                                 <span className="text-gray-600">{selectedUser.document_id}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Phone:</span>
//                                 <span className="text-gray-600">{selectedUser.phone_number}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800"> Room Number:</span>
//                                 <span className="text-gray-600">{selectedUser.room_number}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Authority:</span>
//                                 <span className="text-gray-600">{selectedUser.rto_details?.authority}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span className="font-semibold text-gray-800">State:</span>
//                                 <span className="text-gray-600">{selectedUser.rto_details?.state}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800"> Checkout Date Time :</span>
//                                 <span className="text-gray-600">{format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800"> CheckIn Date Time :</span>
//                                 <span className="text-gray-600">{format(new Date(drivingLicenses[length].createdAt), 'dd MMM yyyy, hh:mm a')}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default UserDrivngLicencesDetals;


import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
import { Link } from 'react-router-dom';

function UserDrivngLicencesDetals() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetBookingsQuery();

    const drivingLicenses = data?.drivingLicenseData || [];

    // Reverse customers list to show latest entries first
    const allCustomers = drivingLicenses
        .flatMap((license) => license.customers)
        .reverse();

    // Filter customers by name, document ID, or address (case-insensitive)
    const filteredCustomers = allCustomers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.name && user.name.toLowerCase().includes(term)) ||
            (user.document_id && user.document_id.toLowerCase().includes(term)) ||
            (user.address && user.address.toLowerCase().includes(term))
        );
    });

    useEffect(() => {
        document.body.style.overflow = selectedUser ? 'hidden' : 'auto';
    }, [selectedUser]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">{error?.data?.message || 'Error fetching data'}</div>;
    }

    return (
        <>
            {/* Search Bar */}
            {/* <UserDetails/> */}

            {/* User Cards Grid */}
            <div className="p-4 rounded-2xl m-4 bg-[#F3FFDF]">
                {filteredCustomers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCustomers.map((user) => (
                            <div
                                key={user.document_id}
                                onClick={() => setSelectedUser(user)}
                                className="p-4 m-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
                            >
                                <img
                                    src={
                                        user.photo_base64
                                            ? `data:image/jpeg;base64,${user.photo_base64}`
                                            : '/GroupPhoto.png'
                                    }
                                    alt="User"
                                    className="w-24 h-24 object-cover rounded-full mx-auto"
                                />
                                <h1 className="text-center mt-2 font-semibold text-lg">{user.name}</h1>
                                <p className="text-center text-gray-500 text-sm">
  License ID: {user.document_id ? `XXXX XXXX ${user.document_id.slice(-4)}` : ''}
</p>

                                <p className="mt-2 text-center text-gray-700 text-sm break-words">{user.address}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-10">No users match your search.</div>
                )}
            </div>

            {/* Responsive Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none"
                            aria-label="Close"
                        >
                            X
                        </button>

                        <div className="text-center mb-6">
                            <img
                                src={
                                    selectedUser.photo_base64
                                        ? `data:image/jpeg;base64,${selectedUser.photo_base64}`
                                        : '/Vector.svg'
                                }
                                alt="User Profile"
                                className="w-24 h-24 object-cover rounded-full mx-auto"
                            />
                            <h3 className="text-2xl font-bold mt-4">{selectedUser.name}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">License ID:</span>
                                <span className="text-gray-600">
  {selectedUser.document_id
    ? `XXXX XXXX ${selectedUser.document_id.slice(-4)}`
    : ""}
</span>

                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Phone:</span>
                                <span className="text-gray-600">{selectedUser.phone_number}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Room Number:</span>
                                <span className="text-gray-600">{selectedUser.room_number}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Authority:</span>
                                <span className="text-gray-600">{selectedUser.rto_details?.authority}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">State:</span>
                                <span className="text-gray-600">{selectedUser.rto_details?.state}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Checkout Date Time:</span>
                                <span className="text-gray-600">
                                    {format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">CheckIn Date Time:</span>
                                <span className="text-gray-600">
                                    {format(
                                        new Date(drivingLicenses[drivingLicenses.length - 1]?.createdAt),
                                        'dd MMM yyyy, hh:mm a'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserDrivngLicencesDetals;

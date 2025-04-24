// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
// import { IoPersonCircleSharp } from "react-icons/io5";

// function UserVoterDetails() {
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data, error, isLoading } = useGetBookingsQuery();
//     console.log("Voter Data:", data);
    
//     const voterData = data?.voterData || [];
    
//     // Combine all customers from voter data
//     const allCustomers = voterData.flatMap((voter) => voter.customers);

//     // Filter customers by name, document ID, or address (case-insensitive)
//     const filteredCustomers = allCustomers.filter((user) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             (user.name && user.name.toLowerCase().includes(term)) ||
//             (user.serial_number && user.serial_number.toLowerCase().includes(term)) ||
//             (user.address && user.address.toLowerCase().includes(term))
//         );
//     });

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
//         <div className=''>
//             <div className=" bg-[#F3FFDF] m-4 overflow-y-auto rounded-2xl p-4">
                
//             {/* <strong className='flex  my-6 rounded-2xl p-4 text-3xl'>Users Voter Details</strong> */}
//                 {/* <strong className='flex justify-center p-4 bg-neutral-400 text-8xl mt-6'>Voter Details</strong> */}
//                 {filteredCustomers.length > 0 ? (
//                     <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {filteredCustomers.map((user) => (
//                             <div
//                                 key={user._id}
//                                 onClick={() => setSelectedUser(user)}
//                                 className="p-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
//                             >
//                                  <h1 className='flex justify-center '> <IoPersonCircleSharp className=' text-9xl' /></h1>
//                                 <h1 className="text-center mt-2 font-semibold text-lg">{user.name}</h1>
//                                 <p className="text-center text-gray-500 text-sm">Voter ID: {user.serial_number}</p>
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
//                         <h1 className='flex justify-center '> <IoPersonCircleSharp className=' text-9xl' /></h1>
//                             <h3 className="text-2xl font-bold mt-4">{selectedUser.name}</h3>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Voter ID:</span>
//                                 <span className="text-gray-600">{selectedUser.serial_number}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Phone:</span>
//                                 <span className="text-gray-600">{selectedUser.phone_number}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Room Number:</span>
//                                 <span className="text-gray-600">{selectedUser.room_number}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">State:</span>
//                                 <span className="text-gray-600">{selectedUser.state}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">District:</span>
//                                 <span className="text-gray-600">{selectedUser.district}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Parliamentary Constituency:</span>
//                                 <span className="text-gray-600">{selectedUser.parliamentary_constituency_name}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Polling Station:</span>
//                                 <span className="text-gray-600">{selectedUser.polling_station}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800">Check-Out Date Time:</span>
//                                 <span className="text-gray-600">{format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')}</span>
//                             </div>
//                             <div className="flex justify-between border-b border-gray-200 pb-2">
//                                 <span className="font-semibold text-gray-800"> CheckIn Date Time :</span>
//                                 <span className="text-gray-600">{format(new Date(voterData[length].createdAt), 'dd MMM yyyy, hh:mm a')}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UserVoterDetails;




import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useGetBookingsQuery } from '../../redux/api/VoterDrivingPassApi';
import { IoPersonCircleSharp } from "react-icons/io5";

function UserVoterDetails() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetBookingsQuery();

    const voterData = data?.voterData || [];
    console.log("voterData",voterData);

    // Combine all customers and reverse to show latest entries first
    const allCustomers = voterData.flatMap((voter) => voter.customers).reverse();

    const filteredCustomers = allCustomers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.name && user.name.toLowerCase().includes(term)) ||
            (user.serial_number && user.serial_number.toLowerCase().includes(term)) ||
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
        <div className=''>
            <div className="bg-[#F3FFDF] m-4 overflow-y-auto rounded-2xl p-4">
                {filteredCustomers.length > 0 ? (
                    <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCustomers.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className="p-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
                            >
                                <h1 className='flex justify-center'>
                                    <IoPersonCircleSharp className='text-9xl' />
                                </h1>
                                <h1 className="text-center mt-2 font-semibold text-lg">{user.name}</h1>
                                <p className="text-center text-gray-500 text-sm">
  Voter ID: {user.serial_number ? `XXXX XXXX ${user.serial_number.slice(-4)}` : ''}
</p>

                                <p className="mt-2 text-center text-gray-700 text-sm break-words">{user.address}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-10">No users match your search.</div>
                )}
            </div>

            {/* Modal */}
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
                            <h1 className='flex justify-center'>
                                <IoPersonCircleSharp className='text-9xl' />
                            </h1>
                            <h3 className="text-2xl font-bold mt-4">{selectedUser.name}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Voter ID:</span>
                                <span className="text-gray-600">
  {selectedUser.serial_number
    ? `XXXX XXXX ${selectedUser.serial_number.slice(-4)}`
    : ''}
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
                                <span className="font-semibold text-gray-800">State:</span>
                                <span className="text-gray-600">{selectedUser.state}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">District:</span>
                                <span className="text-gray-600">{selectedUser.district}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Parliamentary Constituency:</span>
                                <span className="text-gray-600">{selectedUser.parliamentary_constituency_name}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Polling Station:</span>
                                <span className="text-gray-600">{selectedUser.polling_station}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Check-Out Date Time:</span>
                                <span className="text-gray-600">
                                    {selectedUser.check_out_time
                                        ? format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">CheckIn Date Time:</span>
                                <span className="text-gray-600">
                                    {voterData?.[voterData.length - 1]?.createdAt
                                        ? format(new Date(voterData[voterData.length - 1].createdAt), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserVoterDetails;

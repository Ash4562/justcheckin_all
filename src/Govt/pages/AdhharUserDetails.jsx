
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetAllhoteUserQuery } from '../../admin/redux/adminApi/VoterDrivingPassApi';


// import { useGetAllhoteUserQuery } from '../../redux/adminApi/VoterDrivingPassApi';

// import { useGetAllhoteUserQuery } from '../redux/VoterDrivingPassApi';

function AdhharUserDetails() {
    const navigate = useNavigate();
   
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetAllhoteUserQuery();

    const bookings = data?.BookingData || [];

    // ✅ Reverse bookings and customers to show latest first
    const allCustomers = bookings
        .slice() // avoid mutation
        .reverse()
        .flatMap((booking) => [...booking.customers].reverse());

    // ✅ Filter by name, Aadhar number, or address
    const filteredCustomers = allCustomers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.customer_name && user.customer_name.toLowerCase().includes(term)) ||
            (user.aadhar_number && user.aadhar_number.toLowerCase().includes(term)) ||
            (user.address && user.address.toLowerCase().includes(term))
        );
    });

    useEffect(() => {
        document.body.style.overflow = selectedUser ? 'hidden' : 'auto';
    }, [selectedUser]);

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
        <div className="">
             
            <div className="bg-[#F3FFDF] p-4 ">
                
                <div className="overflow-y-auto ">
                    {filteredCustomers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {filteredCustomers.map((user) => (
                                <div
                                    key={user._id}
                                  
                onClick={() =>
                    navigate("/govt/UserCardDeatils", { state: user._id })
                  }
                                    className="p-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
                                >
                                    <img
                                        src={
                                            user.aadhar_image
                                                ? `data:image/jpeg;base64,${user.aadhar_image}`
                                                : '/GroupPhoto.png'
                                        }
                                        alt="User"
                                        className="w-24 h-24 object-cover rounded-full mx-auto"
                                    />
                                    <h1 className="text-center mt-2 font-semibold text-lg">
                                        {user.customer_name}
                                    </h1>
                                    <p className="text-center text-gray-500 text-sm">
  Aadhar: {user.aadhar_number }
</p>

                                    <p className="mt-2 text-center text-gray-700 text-sm break-words">
                                        {user.address}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 mt-10">
                            No users match your search.
                        </div>
                    )}
                </div>

                {selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="text-center mb-6">
                                <img
                                    src={
                                        selectedUser.aadhar_image
                                            ? `data:image/jpeg;base64,${selectedUser.aadhar_image}`
                                            : '/Vector.svg'
                                    }
                                    alt="User Profile"
                                    className="w-24 h-24 object-cover rounded-full mx-auto"
                                />
                                <h3 className="text-2xl font-bold mt-4">
                                    {selectedUser.customer_name}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Aadhar:</span>
                                    <span className="text-gray-600">
  {selectedUser.aadhar_number
    ? `XXXX XXXX ${selectedUser.aadhar_number.slice(-4)}`
    : ''}
</span>

                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Phone:</span>
                                    <span className="text-gray-600">{selectedUser.phone_number}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Address:</span>
                                    <span className="text-gray-600 text-sm text-right w-8/12 break-words">
                                        {selectedUser.address}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Gender:</span>
                                    <span className="text-gray-600">{selectedUser.gender}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Room No:</span>
                                    <span className="text-gray-600">{selectedUser.room_number}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold text-gray-800">Check-In:</span>
                                    <span className="text-gray-600">
                                        {selectedUser.check_in_time
                                            ? format(new Date(selectedUser.check_in_time), 'dd MMM yyyy, hh:mm a')
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">Check-Out:</span>
                                    <span className="text-gray-600">
                                        {selectedUser.check_out_time
                                            ? format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdhharUserDetails;

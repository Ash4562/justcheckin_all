
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useGetAllhoteUserQuery } from '../../admin/redux/adminApi/VoterDrivingPassApi';
// import { useGetAllhoteUserQuery } from '../redux/VoterDrivingPassApi';
// import { useGetAllhoteUserQuery } from '../../redux/adminApi/VoterDrivingPassApi';

function PassportUserDetails() {

    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetAllhoteUserQuery();
    const navigate = useNavigate();

    const passportData = data?.passportData || [];

    // Reverse all customer entries to show latest first
    const allCustomers = passportData
        .flatMap((entry) => entry.customers)
        .reverse();

    const filteredCustomers = allCustomers.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.first_name && user.first_name.toLowerCase().includes(term)) ||
            (user.last_name && user.last_name.toLowerCase().includes(term)) ||
            (user.document_id && user.document_id.toLowerCase().includes(term))
        );
    });
    const handleClick = (user) => {
        navigate('/govt/UserDetailsPassport', {
          state: { userData: user }
        });
      };
    useEffect(() => {
        document.body.style.overflow = selectedUser ? 'hidden' : 'auto';
    }, [selectedUser]);

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error loading data</div>;

    return (
        <div className=" rounded-2xl p-4 bg-[#F3FFDF]">
            {/* <input
                type="text"
                placeholder="Search by name or passport number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border rounded-lg shadow mb-4"
            /> */}

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((user) => (
                        <div
                            key={user.document_id}
                            className="p-4 shadow-md text-center bg-[#ECF8F9] rounded-lg cursor-pointer"
                            onClick={() => handleClick(user)}
                        >
                            <h1 className="flex justify-center">
                                <IoPersonCircleSharp className="text-9xl text-blue-600" />
                            </h1>
                            <h2 className="text-lg font-semibold mt-2">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p>
                                Passport No: {user.file_number }
                            </p>

                            <p>Phone: {user.phone_number}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">No matching records found.</p>
                )}
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-6 mt-20 rounded-lg shadow-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
                        >
                            X
                        </button>

                        <h1 className="flex justify-center">
                            <IoPersonCircleSharp className="text-9xl text-blue-600" />
                        </h1>
                        <h3 className="text-2xl font-bold text-center mt-4">
                            {selectedUser.first_name} {selectedUser.last_name}
                        </h3>

                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Passport No:</span>
                                <span className="text-gray-600">
                                    {selectedUser.file_number }
                                </span>

                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">File Number:</span>
                                <span className="text-gray-600">{selectedUser.document_id}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Phone Number:</span>
                                <span className="text-gray-600">{selectedUser.phone_number}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Issue Date:</span>
                                <span className="text-gray-600">
                                    {format(new Date(selectedUser.issue_date), 'dd MMM yyyy')}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-800">Check-Out Date:</span>
                                <span className="text-gray-600">
                                    {format(new Date(selectedUser.check_out_time), 'dd MMM yyyy, hh:mm a')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Check-In Date:</span>
                                <span className="text-gray-600">
                                    {format(new Date(), 'dd MMM yyyy, hh:mm a')}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PassportUserDetails;

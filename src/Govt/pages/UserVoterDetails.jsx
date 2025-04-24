

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { IoPersonCircleSharp } from "react-icons/io5";
// import { useGetAllhoteUserQuery } from '../../redux/adminApi/VoterDrivingPassApi';
import { useNavigate } from 'react-router-dom';
import { useGetAllhoteUserQuery } from '../../admin/redux/adminApi/VoterDrivingPassApi';
// import { useGetAllhoteUserQuery } from '../redux/VoterDrivingPassApi';
function UserVoterDetails() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetAllhoteUserQuery();
    const navigate = useNavigate();

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
    const handleClick = (user) => {
        navigate('/govt/UserVoterDetail', {
          state: { userData: user }
        });
      }
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
            <div className="bg-[#F3FFDF] p-4 overflow-y-auto rounded-2xl ">
                {filteredCustomers.length > 0 ? (
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredCustomers.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => handleClick(user)}
                                className="p-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
                            >
                                <h1 className='flex justify-center'>
                                    <IoPersonCircleSharp className='text-9xl' />
                                </h1>
                                <h1 className="text-center mt-2 font-semibold text-lg">{user.name}</h1>
                                <p className="text-center text-gray-500 text-sm">
  Voter ID: {user.serial_number }
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
           
        </div>
    );
}

export default UserVoterDetails;

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const OurHotelVoterUser = ({ customers }) => {
    const navigate = useNavigate();
    if (!customers?.length) return null;



const handleClick = (user) => {
    navigate('/UserVoterDetail', {
      state: { userData: user }
    });
  }

  return (
    <div className="mb-6">
      {/* <h2 className="text-2xl font-semibold mb-4 text-green-700">Voter Users</h2> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((user, index) => (
          <div key={index} className="p-4 rounded-xl shadow bg-white">
            <p><strong>Name:</strong> {user.customer_name}</p>
            <p><strong>Aadhaar:</strong> {user.aadhar_number}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        ))}
      </div> */}


      <div className="bg-[#F3FFDF] p-4 overflow-y-auto rounded-2xl ">
                {customers.length > 0 ? (
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {customers.map((user) => (
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
                                {user.serial_number}
  {/* Voter ID: {user.serial_number ? `XXXX XXXX ${user.serial_number.slice(-4)}` : ''} */}
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
};

export default OurHotelVoterUser;

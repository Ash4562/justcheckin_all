import React, { useState } from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';

const OurPassportUserDetails = ({customers }) => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    if (!customers?.length) return null;
    const handleClick = (user) => {
        navigate('/UserDetailsPassport', {
          state: { userData: user }
        });
      };
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
        {customers.length > 0 ? (
            customers.map((user) => (
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
                        Passport No: {user.file_number}
                    </p>

                    <p>Phone: {user.phone_number}</p>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-600 col-span-full">No matching records found.</p>
        )}
    </div>

    {/* Modal */}

</div>
  )
}

export default OurPassportUserDetails

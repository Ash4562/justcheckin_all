import React from 'react';
import { useNavigate } from 'react-router-dom';

const OurHotelAadharUser = ({ customers }) => {
    const navigate = useNavigate();
  if (!customers?.length) return null;

  return (
    <div className="mb-6 overflow-y-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-green-700">Aadhaar </h2> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((user, index) => (
          <div key={index} className="p-4 rounded-xl shadow bg-white">
            <p><strong>Name:</strong> {user.customer_name}</p>
            <p><strong>Aadhaar:</strong> {user.aadhar_number}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        ))}
      </div> */}
      <div className="overflow-y-auto ">
                    {customers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {customers.map((user,index) => (
                                <div
                                    key={user._id}
                                  
                onClick={() =>
                    navigate("/admin/AdminUserDetailsCard", { state: user._id })
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
                                    {user.aadhar_number}
  {/* Aadhar: {user.aadhar_number ? `XXXX XXXX ${user.aadhar_number.slice(-4)}` : ''} */}
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
    </div>
  );
};

export default OurHotelAadharUser;

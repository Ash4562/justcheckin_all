import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useDeleteDravingLicMutation, useGetAllhoteUserQuery } from '../../../redux/adminApi/VoterDrivingPassApi';
import { format } from 'date-fns';
import { useGetAllhoteUserQuery } from '../../../admin/redux/adminApi/VoterDrivingPassApi';
// import { useGetAllhoteUserQuery } from '../../redux/VoterDrivingPassApi';
// import { useGetAllhoteUserQuery } from '../../redux/VoterDrivingPassApi';

const OurUserDrivngLicencesDetals = ({ customers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetAllhoteUserQuery();




    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [message, setMessage] = useState("");

  // const [deleteUser] = useDeleteDravingLicMutation();

    const navigate = useNavigate();
    if (!customers?.length) return null;
    const handleEdit = (id) => {
      navigate("/AdminUserDetails", { state: customers });
    };
  
    const handleClick = (user) => {
      navigate('/govt/UserDravingLicdetails', {
        state: { userData: user }
      });
    };
  console.log(customers);
    // useEffect(() => {
    //   document.body.style.overflow = selectedUser ? 'hidden' : 'auto';
    // }, [selectedUser]);
  return (
    <div>
     
     <div className=" rounded-2xl p-4 bg-[#F3FFDF]">
        {customers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {customers.map((user) => (
              <div
                key={user.document_id}
                onClick={() => handleClick(user)}
                
                className=" p-4 rounded-lg shadow-md bg-[#ECF8F9] cursor-pointer transition duration-300 hover:shadow-xl"
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
                  License ID: {user.document_id }
                </p>

                <p className="mt-2 text-center text-gray-700 text-sm break-words">{user.address}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-10">No users match your search.</div>
        )}
      </div>

      
    </div>
  )
}

export default OurUserDrivngLicencesDetals

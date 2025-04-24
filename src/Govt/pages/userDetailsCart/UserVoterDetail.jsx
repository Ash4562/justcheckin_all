import React, { useState } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';

import img from "/Group 40.png"; 
import GovtSidebar from '../../Components/GovtSidebar';
import SearchLogout from '../../Components/SearchLogout';
import { useSelector } from 'react-redux';

// import { useDeleteVoterMutation } from '../../../redux/adminApi/VoterDrivingPassApi';

const UserVoterDetail = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [message, setMessage] = useState("");
  console.log(userData);
  // const [deleteUser] = useDeleteVoterMutation();
  const selectedHotel = useSelector((state) => state.authSlice.selectedHotel);
  console.log("Selected Hotel Globally:", selectedHotel);
  const hotelNameToShow = selectedHotel?.hotelName || "Voter user ";
  const handleDelete = async () => {
    try {
      await deleteUser(userData._id);
      //   setMessage(`${customer?.customer_name} has been deleted successfully.`);

      setIsModalVisible(false);
      setUserToDelete(null);

      setTimeout(() => {
        navigate("/driving");
      }, 500);
    } catch (error) {
      setMessage("Error deleting user. Please try again.");
      console.error("Delete error:", error);
    }
  };
  const handleEdit = (id) => {
    navigate("/EditVoterDetails", { state: userData });
  };

  if (!userData) {
    return <div>No user data found!</div>;
  }

  return (
    <div className="flex">
      <GovtSidebar />
      <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
         <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 mt-2 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-md p-4 border border-[#0060EC]">

            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center overflow-hidden">
                <img src={img} alt="Profile" className="w-15 h-15 object-cover" />
              </div>
              <h2 className="mt-2 text-xl text-center">{userData.name}</h2>
              <p className="text-gray-500 text-center">{hotelNameToShow}</p>
            </div>

            {/* Profile Info */}
            <div className="flex  px-24 w-full mt-6">
              <table className="w-3/4 text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="text-gray-500">Voter Name:</td>
                    <td className="pl-16">{userData.name }</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Voter No:</td>
                    <td className="pl-16">{userData.serial_number }</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Gender:</td>
                    <td className="pl-16">{userData.gender}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Room Number</td>
                    <td className="pl-16 w-48" >{userData.room_number}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Phone Number</td>
                    <td className="pl-16 w-48" >{userData.phone_number}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Address</td>
                    <td className="pl-16 w-48" >{userData.address}</td>
                  </tr>
                  {/* <tr>
                    <td className="text-gray-500">Gender:</td>
                    <td className="pl-16">{userData.gender}</td>
                  </tr> */}
                  {/* <tr>
                    <td className="text-gray-500">Nationality:</td>
                    <td className="pl-16">{userData.nationality}</td>
                  </tr> */}
                  <tr>
                    <td className="text-gray-500">Check-In:</td>
                    <td className="pl-16">{new Date(userData.check_in_time).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Check-Out:</td>
                    <td className="pl-16">{userData.check_out_time ? new Date(userData.check_out_time).toLocaleString() : 'Still Checked-in'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
 {/* Action Buttons */}
 {/* <div className="mt-6 flex justify-center gap-4 space-x-4">
            <button
              onClick={e => setIsModalVisible(true)}
              className="bg-red-500  w-36 text-white px-4 py-1 rounded-full">
              Delete
            </button>
            <button
              className="bg-[#85D200] w-36 text-white px-4 py-1 rounded-full"
              onClick={() => handleEdit(userData._id)}
            >
              Edit
            </button>
          </div> */}
          </div>
        </div>

      </div>
      {isModalVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{userData?.first_name
}</span>?
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
              onClick={e => setIsModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Confirmation Message */}
    {message && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-lg text-gray-800">{message}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setMessage("")}
          >
            OK
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default UserVoterDetail;

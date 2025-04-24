import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDeleteDravingLicMutation } from "../../../redux/adminApi/VoterDrivingPassApi";
import { format } from "date-fns";
import AdminSideBar from "../AdminSideBar";
import SearchLogout from "../../../components/SearchLogout";
import { useSelector } from "react-redux";

const UserDravingLicdetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteUser] = useDeleteDravingLicMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  const selectedHotel = useSelector((state) => state.authSlice.selectedHotel);
  console.log("Selected Hotel Globally:", selectedHotel);
  const hotelNameToShow = selectedHotel?.hotelName || "Driving Licence";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };
  const handleDelete = async () => {
    try {
      await deleteUser(userData._id).unwrap();
      setIsModalVisible(false);
      setMessage("User deleted successfully.");
      navigate(-1);
    } catch (err) {
      setIsModalVisible(false);
      setMessage("Failed to delete user.");
    }
  };

  const handleEdit = () => {
    navigate("/EditDravingLicDetials", { state: userData });
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 mt-2 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-md p-4 border border-[#0060EC]">

            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${userData.photo_base64}`}
                  alt="Profile"
                  className="w-20 h-20 object-cover"
                />
              </div>
              <h2 className="mt-2 text-xl text-center">{userData.name}</h2>
              
<p className="text-gray-500 text-center capitalize">{hotelNameToShow}</p>

            </div>

            {/* Profile Info */}
            <div className="flex justify-center px-10 w-full mt-6">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="text-gray-500">License Number:</td>
                    <td className="pl-10">{userData.document_id}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Phone Number:</td>
                    <td className="pl-10">{userData.phone_number}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Room Number:</td>
                    <td className="pl-10">{userData.room_number}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Date of Birth:</td>
                    <td className="pl-10">{format(new Date(userData.date_of_birth), "dd/MM/yyyy")}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Blood Group:</td>
                    <td className="pl-10">{userData.blood_group}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Dependent Name:</td>
                    <td className="pl-10">{userData.dependent_name}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Address:</td>
                    <td className="pl-10">{userData.address}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Check-In:</td>
                    <td className="pl-10">{format(new Date(userData.check_in_time), "dd/MM/yyyy hh:mm a")}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Check-Out:</td>
                    <td className="pl-10">{userData.check_out_time ? format(new Date(userData.check_out_time), "dd/MM/yyyy hh:mm a") : "Still Checked-in"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4 space-x-4">
              <button
                onClick={() => setIsModalVisible(true)}
                className="bg-red-500 w-36 text-white px-4 py-1 rounded-full"
              >
                Delete
              </button>
              <button
                className="bg-[#85D200] w-36 text-white px-4 py-1 rounded-full"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
              <h1 className="text-xl font-semibold text-gray-800 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold">{userData?.name}</span>?
              </h1>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                  onClick={() => setIsModalVisible(false)}
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
    </div>
  );
};

export default UserDravingLicdetails;

import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { CiSearch, CiEdit } from "react-icons/ci";
import hotelImg from "/public/hotelIMG.png";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteHotelsMutation, useGetHotelsQuery } from "../../redux/adminApi/adminHotels";
import SearchLogout from "../../components/SearchLogout";

const AdminHotels = () => {
  const { data } = useGetHotelsQuery();
  console.log(data);

  const navigate = useNavigate();
  const [deleteHotels] = useDeleteHotelsMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [message, setMessage] = useState("");



  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleDeleteClick = (hotel) => {
    setUserToDelete(hotel); // Pass the entire hotel object
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      if (!userToDelete?._id) {
        setMessage("Invalid hotel ID. Please try again.");
        setIsModalVisible(false);
        return;
      }

      // Ensure the _id is sanitized
      const hotelId = userToDelete._id.trim();
      console.log(hotelId); // Log for debugging

      await deleteHotels(hotelId).unwrap();
      setMessage(`${userToDelete?.hotelName} has been deleted successfully.`);

      // Reset modal and user
      setIsModalVisible(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting hotel:", error);
      setMessage("Failed to delete hotel. Please try again.");
      setIsModalVisible(false);
    }
  };
  const approvedHotels = data?.hotel?.filter((hotel) => hotel.status === "approve");
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg mt-10 sm:mt-20 xs:mt-20 md:mt-0 h-screen">
        {/* Top Section */}
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20 lg:-mt-10 " />

        {/* Hotel Cards */}
        <div className="flex-col justify-center items-center bg-[#ECF8F9] mt-2 overflow-y-scroll h-full">
          {approvedHotels && approvedHotels?.map((hotelData) => (
            <div
              key={hotelData._id}
              className="mx-4 my-4 p-4 bg-white border border-gray-300 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                {/* Hotel Icon */}
                <button
                  onClick={() =>
                    navigate("/admin/AdminHotelDetailsCard", { state: hotelData._id })
                  }
                  className="flex justify-center items-center w-24 h-24 bg-white rounded-full"
                >
                  <img
                    src={hotelImg}
                    alt="Hotel Icon"
                    className="text-6xl text-blue-600"
                  />
                </button>

                {/* Hotel Details */}
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{hotelData.hotelName}</h1>
                  <p className="text-gray-600">
                    {hotelData.city}, {hotelData.state || "India"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() =>
                      navigate("/admin/AdminHotelDetails", { state: hotelData })
                    }
                    className="btn p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                  >
                    <CiEdit size={20} />
                  </button>
                  <button
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                    onClick={() => handleDeleteClick(hotelData)}
                  >
                    <MdOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{userToDelete?.hotelName}</span>?
            </h1>
            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={handleCancelDelete}
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

export default AdminHotels;

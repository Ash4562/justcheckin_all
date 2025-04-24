import img from "/Group 40.png";
import AdminSideBar from "./AdminSideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDeleteHotelsMutation, useGetHotelsQuery } from "../../redux/adminApi/adminHotels";
import { useEffect, useState } from "react";
import SearchLogout from "../../components/SearchLogout";
import { useDispatch } from "react-redux";
import { setSelectedHotel } from "../../redux/adminApi/authSlice";

const AdminHotelDetailsCard = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate()
  // Get the state passed via useLocation
  const { data, isLoading, isError, error } = useGetHotelsQuery();
  const [deleteHotels] = useDeleteHotelsMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };
  
  const hotel = data?.hotel?.find((hotel) => hotel._id === state);
  console.log("hotel data 2",hotel);
  const handleDeleteClick = (hotel) => {
    setUserToDelete(hotel); // Pass the entire hotel object
    setIsModalVisible(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (hotel) {
      console.log("Dispatching selectedHotel:", hotel); // ✅ Add this
      dispatch(setSelectedHotel(hotel));
    }
  }, [hotel, dispatch]);
  
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

  if (isLoading) {
    return <p className="text-center text-blue-500 mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error fetching data!</p>
        <p>{error?.data?.message || "Something went wrong. Please try again."}</p>
      </div>
    );
  }

  // Filter the hotel data using the state.id

  if (!hotel) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>Hotel not found!</p>
        <Link
          to="/admin/AdminHotels"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Go back to the hotel list
        </Link>
      </div>
    );
  }
console.log("hotel id ",hotel._id);
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full px-3 mt-2">
        {/* Search Bar & Logout */}
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        {/* Hotel Details */}
        <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 mt-2 flex justify-center items-center">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-md p-2 border-1 border-[#0060EC]">
            {/* Profile Header */}
            <div className="flex flex-col items-center my-4">
              <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center">
                <img src={img} alt="Profile" className="w-15 h-15 object-cover" />
              </div>
              <h2 className="mt-2 text-xl font-semibold">{hotel.hotelName}</h2>
              <button
                onClick={() =>
                  navigate("/admin/AdminHotelDetails", { state: hotel })
                }
                className=" bg-[#00255C] text-white text-sm mt-1 mb-2 px-4 py-1 rounded-full"
              >
                Edit Profile
              </button>
            </div>

            {/* Hotel Details Table */}
            <div className="mt-2 flex justify-center w-full">
              <table className="w-3/9 text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="text-gray-500">Owner Name:</td>
                    <td className="pl-16">{hotel.hotelOwnerName}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Email Address:</td>
                    <td className="pl-16">{hotel.email}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Mobile Number:</td>
                    <td className="pl-16">{hotel.phone}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Hotel Reg Number:</td>
                    <td className="pl-16">{hotel.registrationNumber}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">GSTIN Number:</td>
                    <td className="pl-16">{hotel.gstNo}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Documents:</td>
                    <td className="pl-16">
                      <a
                        href={hotel.hotelDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Document
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Registration Date:</td>
                    <td className="pl-16">{new Date(hotel.createdAt).toLocaleDateString()}</td>
                  </tr>
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
                  )}      <tr>
                    <td className="text-gray-500">Amount Paid:</td>
                    <td className="pl-16">{hotel.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex justify-center space-x-4 gap-4 mb-3">
              <Link
                to={`/admin/SelectedHotelUsers/${hotel._id}`}
                state={{ hotel }}
                className="bg-blue-600 text-white px-4 py-1 rounded-full"
              >
                All Users
              </Link>
              <button onClick={() => handleDeleteClick(hotel)} className="bg-[#85D200] text-white px-4 py-1 rounded-full">
                Delete
              </button>
            </div>
            {/* Delete Confirmation Modal */}

          </div>
        </div>
      </div>
    </div >
  );
};

export default AdminHotelDetailsCard;

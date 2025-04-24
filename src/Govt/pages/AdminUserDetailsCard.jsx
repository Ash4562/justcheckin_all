import img from "../../assets/Group 40.png";

import { CiSearch } from "react-icons/ci";
// import { useDeleteUserMutation, useGetUsersQuery } from "../../redux/adminApi/userApis";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import GovtSidebar from "../Components/GovtSidebar";
import { useDeleteUserMutation, useGetUsersQuery } from "../../admin/redux/adminApi/userApis";
import SearchLogout from "../Components/SearchLogout";

const AdminUserDetailsCard = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [message, setMessage] = useState("");
  
  const [deleteUser] = useDeleteUserMutation();
  
  const customer = useMemo(() => {
    if (state && data?.customers) {
      return data.customers.find((customer) => customer.c_id === state);
    }
    return null;
  }, [data, state]);
  
  const handleEdit = (id) => {
    navigate("/AdminUserDetails", { state: customer });
  };
  
  
  const handleDelete = async () => {
    try {
      await deleteUser(customer.c_id);
      setMessage(`${customer?.customer_name} has been deleted successfully.`);

      setIsModalVisible(false);
      setUserToDelete(null);

      setTimeout(() => {
        navigate("/AllUserHotels");
      }, 500);
    } catch (error) {
      setMessage("Error deleting user. Please try again.");
      console.error("Delete error:", error);
    }
  };
  console.log("satatedssdfdssggs",customer);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data!</div>;
  }

  if (!customer) {
    return <div>Customer not found!</div>;
  }
  console.log(customer.c_id);

  return <>
    <div className="flex">
      <GovtSidebar />
      {/* Main Content */}
      <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
        {/* Header with Search and Logout */}
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        {/* User Profile Details */}
        <div className="bg-[#ECF8F9] w-full rounded-3xl
         mt-8 py-8 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-md p-4 border border-[#0060EC]">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center overflow-hidden">
              <img src={img} alt="Profile" className="w-15 h-15 object-cover" />
            </div>

            {/* User Name and Hotel */}
            <h2 className="mt-2 text-xl text-center">{customer.customer_name}</h2>
            <p className="text-gray-500 text-center">{customer.hotel_id.hotelName || "Hotel Name Not Available"}</p>
          </div>

          {/* Profile Details Table - Centered */}
          <div className=" flex justify-center px-24 w-full">
            <table className="w-3/9 text-left border-collapse">
              <tbody>
                <tr>
                  <td className="text-gray-500">Adhaar Number :</td>
                  <td className="pl-16">{customer.aadhar_number}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Phone Number:</td> 
                  <td className="pl-16">{customer.phone_number}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Address:</td>
                  <td className="pl-16 w-8/12 ">{customer.address}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Gender:</td>
                  <td className="pl-16">{customer.gender}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Room Number:</td>
                  <td className="pl-16">{customer.room_number}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Check-In Time & Date:</td>
                  <td className="pl-16">
                    {new Date(customer.check_in_time).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>

                </tr>
                <tr>
                  <td className="text-gray-500">Check-Out Time & Date:</td>
                  <td className="pl-16">
                    {new Date(customer.check_out_time).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Verified:</td>
                  <td className="pl-16">{customer.aadhar_verified ? 'Yes' : 'No'}</td>
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
              onClick={() => handleEdit(customer.c_id)}
            >
              Edit
            </button>
          </div> */}
        </div>
        </div>
      </div>
    </div>


    {isModalVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{customer?.customer_name}</span>?
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


  </> 
};

export default AdminUserDetailsCard;

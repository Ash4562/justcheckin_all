
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useUserHotelRegisterMutation } from "../../redux/hotelUserApi.jsx/userApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserHotelRegisterMutation } from "../../redux/hotelUserApi.jsx/userApi";


const UserHotelRegister = () => {
  const navigate = useNavigate();
  const [registerHotel, { data, isSuccess, isError, error,isLoading }] = useUserHotelRegisterMutation();

  const [userData, setUserData] = useState({
    hotelName: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userData.hotelName || !userData.registrationNumber) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      await registerHotel(userData).unwrap();
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  
    registerHotel(userData);
  };

  useEffect(() => {
    if (isSuccess && data?.hotelId) {
      toast.success("Hotel registered successfully!");
      navigate("/hotelqr/GenerateHotelsQr", { state: { hotel_id: data.hotelId } });
    }

    if (isError) {
      toast.error(error?.data?.message || "Registration failed");
    }
  }, [isSuccess, isError, data, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        {isLoading ? (
          <Skeleton circle width={80} height={80} />
        ) : (
          <img src="/justChink.jpeg" alt="Company Logo" className="w-20 sm:w-24 h-auto" />
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
        {isLoading ? <Skeleton width={200} height={24} /> : "Register Your Hotel"}
      </h2>

      {/* Form */}
      <form className="mt-6 space-y-4">
        {isLoading ? (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={50} />
          </>
        ) : (
          <>
            <input
              placeholder="Hotel Name"
              type="text"
              name="hotelName"
              value={userData.hotelName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              placeholder="Registration Number"
              type="text"
              name="registrationNumber"
              value={userData.registrationNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
            >
              Register Hotel
            </button>
          </>
        )}
      </form>
    </div>
  </div>
  );
};

export default UserHotelRegister;

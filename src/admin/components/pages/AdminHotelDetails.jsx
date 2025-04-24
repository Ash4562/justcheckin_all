import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { BsPersonFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useUpdateHotelsMutation } from "../../redux/adminApi/adminHotels";
import SearchLogout from "../../components/SearchLogout";

const AdminHotelDetails = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const state = location.state; // Get hotel data from location state
  const [updateHotel, { isSuccess, isError, error }] = useUpdateHotelsMutation();
  // console.log(state);
  console.log(state);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset();  // Get timezone offset in minutes
    const localDate = new Date(d.getTime() - offset * 60000);  // Adjust for timezone
    return localDate.toISOString().slice(0, 16);  // Format as 'YYYY-MM-DDTHH:MM'
  };

  // Initialize formData with state data to keep track of form changes
  const [formData, setFormData] = useState({
    hotelOwnerName: state.hotelOwnerName || "",
    email: state.email || "",
    hotelName: state.hotelName || "",
    phone: state.phone || "",
    registrationNumber: state.registrationNumber || "",
    gstNo: state.gstNo || "",
    createdAt: state.createdAt || "",
  });

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (updating the hotel data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the update hotel mutation with the form data
      await updateHotel({ id: state._id, ...formData }).unwrap();
      if (isSuccess) {
        alert("Hotel updated successfully!");
        navigate("/AdminHotels")
      }
    } catch (err) {
      console.error("Failed to update hotel:", err);
      alert("Error updating hotel.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <AdminSideBar />
        <div className="h-screen flex flex-col w-full px-6 py-8 shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border rounded-lg mt-20 sm:mt-20 md:mt-0">
          <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
          <div className="overflow-y-scroll flex m-8 px-4 py-8 flex-col justify-center items-center bg-[#ECF8F9] rounded-2xl">
            <div className="w-full h-full rounded-3xl px-8 py-8 bg-white overflow-y-scroll">
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-[#85D200] rounded-full flex justify-center items-center">
                  <BsPersonFill className="text-6xl text-blue-500" />
                </div>
                {/* <h1 className="text-2xl font-semibold mt-4">{state.hotelName || "Hotel Name"}</h1> */}
              </div>

              <form>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}

                  className="text-2xl -mt-16 w-full text-center outline-none  font-semibold "

                />
                <div className="w-full space-y-6">
                  <div className="flex mt-4 flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      Owner Name:
                    </label>
                    <input
                      type="text"
                      name="hotelOwnerName"
                      value={formData.hotelOwnerName}
                      onChange={handleChange}
                      placeholder="Enter Owner Name"
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      Mobile:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      Hotel Reg Number:
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Enter Hotel Reg Number"
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />

                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      GSTIN Number:
                    </label>
                    <input
                      type="text"
                      name="gstNo"
                      value={formData.gstNo}
                      onChange={handleChange}
                      placeholder="Enter GSTIN Number"
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"

                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      Registration Date:
                    </label>
                    {/* <input
                      type="date"
                      name="createdAt"
                      value={formData.createdAt}
                      onChange={handleChange}
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    /> */}
                    <input
                      type="datetime-local"
                      name="createdAt"
                      value={formData.createdAt ? formatDateForInput(formData.createdAt) : ""}
                      onChange={handleChange}
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />

                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-3xl hover:bg-blue-600"
                  >
                    Update Hotel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHotelDetails;

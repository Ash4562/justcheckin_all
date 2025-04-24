import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { BsPersonFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Sure from "./Sure";
import { useUpdateUsersMutation } from "../../redux/adminApi/userApis";

const AdminUserDetails = () => {
  const [updateUser] = useUpdateUsersMutation()
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customer_name: '',
    // hotel_id.hotelName :"",
    gender: '',
    room_number: '',
    phone_number: '',
    address: '',
    aadhar_number: '',
    aadhar_verified: false,
    aadhar_image:"",
    check_in_time: '',
    check_out_time: '',
    number_of_people: 0,
  });
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset();  // Get timezone offset in minutes
    const localDate = new Date(d.getTime() - offset * 60000);  // Adjust for timezone
    return localDate.toISOString().slice(0, 16);  // Format as 'YYYY-MM-DDTHH:MM'
  };
  useEffect(() => {
    if (state) {
      setFormData({
        customer_name: state.customer_name,
        gender: state.gender,
        room_number: state.room_number,
        phone_number: state.phone_number,
        address: state.address,
        aadhar_number: state.aadhar_number,
        aadhar_image: state.aadhar_image,
        aadhar_verified: state.aadhar_verified,
        check_in_time: state.check_in_time,
        check_out_time: state.check_out_time,
        number_of_people: state.number_of_people,
      });
    }
  }, [state]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [poppup, setPoppup] = useState(false);
  const handleDeleteClick = () => {
    setPoppup(true);
  };


  const handleUpdate = async () => {
    if (!state.c_id) {
      alert("User ID is missing.");
      return;
    }

    try {
      const response = await updateUser({
        id: state.c_id,
        ...formData,
      }).unwrap();

      alert("User updated successfully!");
      navigate("/AllUserHotels")
      console.log("Updated User:", response);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user. Please try again.");
    }
  };
  console.log(`bob:{}` );

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main Content */}
        <div className="flex flex-col w-full px-6 py-4 bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] border rounded-lg mt-20 sm:mt-20 md:mt-0">
         

          {/* Card Container */}
          <div className="flex  flex-col justify-center items-center bg-[#ECF8F9] ">
            <div className="w-full max-w-4xl m-4 bg-white border border-gray-300 rounded-3xl shadow-lg p-8 overflow-y-auto" style={{ maxHeight: '85vh' }}>
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-[#85D200] rounded-full flex justify-center items-center">
                  <BsPersonFill className="text-6xl text-blue-500" />
                </div>
              
                <input
                  type="text"
                  name="aadhar_number"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  // placeholder="Enter Adhaar Number"
                  className="text-2xl  text-center outline-none font-semibold mt-4"
                />
                {/* <p className="text-xl font-semibold">{state.hotel_id.hotelName}</p> */}

              </div>

              {/* Profile Details */}
              <div className="w-full space-y-6">
                {/* Adhaar Number */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Adhaar Number :
                  </label>
                  <input
                    type="number"
                    name="aadhar_number"
                    value={formData.aadhar_number}
                    onChange={handleInputChange}
                    placeholder="Enter Adhaar Number"
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Phone Number :
                  </label>
                  <input
                    type="number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Date of Registration */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Date of Registration :
                  </label>
                  <input
                    type="datetime-local"
                    name="check_in_time"
                    value={formData.check_in_time ? formatDateForInput(formData.check_in_time) : ""}
                    onChange={handleInputChange}
                    placeholder="Enter Date and Time of Registration"
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                 
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Address :
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Gender :
                  </label>
                  <div className="flex border-b border-gray-300 gap-6 w-full sm:w-3/4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                </div>

                {/* Room Number */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Room Number :
                  </label>
                  <input
                    type="number"
                    name="room_number"
                    value={formData.room_number}
                    onChange={handleInputChange}
                    placeholder="Enter Room Number"
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Adhaar */}
             {/* Adhaar Image Upload and Preview */}
  <div className="flex flex-col sm:flex-row items-center gap-8">
    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
      Aadhar Image:
    </label>
    <div className="flex border-b border-gray-300 items-center w-full sm:w-3/4">
      {/* Upload Aadhar */}
     {/* Preview Aadhar Image */}
  {formData.aadhar_image && (
  <div className=" flex justify-center mb-4">
    <img
      src={`data:image/jpeg;base64,${formData.aadhar_image}`}
      alt="Aadhar Preview"
      className="w-42 h-42 border border-gray-300 shadow-md rounded-md"
    />
  </div>
)}
      
  
    </div>
  </div>

 


                {/* Check In Time & Date */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Check In Date & Time :
                  </label>
                  <input
                    type="datetime-local"
                    name="check_in_time"
                    value={formData.check_in_time ? formatDateForInput(formData.check_in_time) : ""}
                    onChange={handleInputChange}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Check Out Time & Date */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Check Out Date & Time  :
                  </label>
                  <input
                    type="datetime-local"
                    name="check_out_time"
                    value={formData.check_out_time ? formatDateForInput(formData.check_out_time) : ""}
                    onChange={handleInputChange}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Verified */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Verified :
                  </label>
                  <div className="flex gap-6 w-full sm:w-3/4 border-b border-gray-300">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="aadhar_verified"
                        value="yes"
                        checked={formData.aadhar_verified === true}
                        onChange={() => setFormData({ ...formData, aadhar_verified: true })}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="aadhar_verified"
                        value="no"
                        checked={formData.aadhar_verified === false}
                        onChange={() => setFormData({ ...formData, aadhar_verified: false })}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center gap-10 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-600"
                  >
                    Update
                  </button>

                  {/*   */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {poppup ? <Sure /> : ""}
    </>
  );
};

export default AdminUserDetails;
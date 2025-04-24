import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import AdminSideBar from '../AdminSideBar';
import img from "/Group 40.png";
import { useUpdateDravingLicMutation } from '../../../redux/adminApi/VoterDrivingPassApi'; // Replace with your actual update hook
import AdminSideBar from '../AdminSideBar';

const EditDrivingUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state || {};

  const [updateUser] = useUpdateDravingLicMutation(); // ✅ make sure this is correct

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    license_id: '',
    phone_number: '',
    check_in_time: '',
    check_out_time: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.name || '',
        last_name: userData.dependent_name || '',
        license_id: userData.document_id || '',
        phone_number: userData.phone_number || '',
        room_number: userData.room_number || '',
        check_in_time: userData.check_in_time?.slice(0, 16) || '',
        check_out_time: userData.check_out_time?.slice(0, 16) || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.first_name,
        dependent_name: formData.last_name,
        document_id: formData.license_id,
        phone_number: formData.phone_number,
        ...(formData.check_in_time && {
          check_in_time: new Date(formData.check_in_time).toISOString(),
        }),
        ...(formData.check_out_time && {
          check_out_time: new Date(formData.check_out_time).toISOString(),
        }),
      };

      const response = await updateUser({ id: userData._id, data: payload }).unwrap();
      console.log("Update response:", response);
      alert("User data updated successfully");
      navigate(-2);
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
        <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 mt-2 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-md p-4 border border-[#0060EC]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center overflow-hidden">
                <img src={img} alt="Profile" className="w-15 h-15 object-cover" />
              </div>
              <h2 className="mt-2 text-xl text-center"> Driving License User</h2>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col space-y-4 mt-6 px-6">
              <div className="w-full space-y-6">
                {['first_name', 'last_name', 'license_id',  'phone_number','room_number'].map((field) => (
                  <div className="flex flex-col sm:flex-row items-center gap-4" key={field}>
                    <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                      {field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                      className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                    />
                  </div>
                ))}

                {/* Check-In Time */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Check-In Time:
                  </label>
                  <input
                    type="datetime-local"
                    name="check_in_time"
                    value={formData.check_in_time}
                    onChange={handleChange}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Check-Out Time */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    Check-Out Time:
                  </label>
                  <input
                    type="datetime-local"
                    name="check_out_time"
                    value={formData.check_out_time}
                    onChange={handleChange}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-4">
                <button type="submit" className="bg-[#0060EC] text-white px-6 py-2 rounded-full">Update</button>
                <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white px-6 py-2 rounded-full">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDrivingUser;

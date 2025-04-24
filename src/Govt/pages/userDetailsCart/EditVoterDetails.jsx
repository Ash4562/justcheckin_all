import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar';
import img from "../../../assets/Group 40.png";
import { useUpdateVoterMutation } from '../../../redux/adminApi/VoterDrivingPassApi';

const EditVoterDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state || {};

  const [updateUser] = useUpdateVoterMutation();

  const [formData, setFormData] = useState({
    name: '',
    father_name: '',
    age: '',
    gender: '',
    phone_number: '',
    address: '',
    room_number: '',
    serial_number: '',
    district: '',
    // state: '',
    // polling_station: '',
    // part_name: '',
    // part_number: '',
    // assembly_constituency_name: '',
    // assembly_constituency_number: '',
    // parliamentary_constituency_name: '',
    check_in_time: '',
    check_out_time: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        father_name: userData.father_name || '',
        age: userData.age || '',
        gender: userData.gender || '',
        phone_number: userData.phone_number || '',
        address: userData.address || '',
        room_number: userData.room_number || '',
        serial_number: userData.serial_number || '',
        district: userData.district || '',
        // state: userData.state || '',
        // polling_station: userData.polling_station || '',
        // part_name: userData.part_name || '',
        // part_number: userData.part_number || '',
        // assembly_constituency_name: userData.assembly_constituency_name || '',
        // assembly_constituency_number: userData.assembly_constituency_number || '',
        // parliamentary_constituency_name: userData.parliamentary_constituency_name || '',
        check_in_time: userData.check_in_time?.slice(0, 16) || '',
        check_out_time: userData.check_out_time?.slice(0, 16) || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        check_in_time: formData.check_in_time ? new Date(formData.check_in_time).toISOString() : null,
        check_out_time: formData.check_out_time ? new Date(formData.check_out_time).toISOString() : null,
      };

      await updateUser({ id: userData._id, data: payload }).unwrap();
      alert('User data updated successfully');
      navigate(-2);
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Something went wrong!');
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
              <h2 className="mt-2 text-xl text-center"> Voter User</h2>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col space-y-4 mt-6 px-6">
              {[
                { label: 'Full Name', name: 'name' },
                { label: "Father's Name", name: 'father_name' },
                { label: 'Age', name: 'age' },
                { label: 'Gender', name: 'gender' },
                { label: 'Phone Number', name: 'phone_number' },
                { label: 'Address', name: 'address' },
                { label: 'Room Number', name: 'room_number' },
                { label: 'Voter Serial Number', name: 'serial_number' },
                // { label: 'District', name: 'district' },
                // { label: 'State', name: 'state' },
                // { label: 'Polling Station', name: 'polling_station' },
                // { label: 'Part Name', name: 'part_name' },
                // { label: 'Part Number', name: 'part_number' },
                // { label: 'Assembly Constituency Name', name: 'assembly_constituency_name' },
                // { label: 'Assembly Constituency Number', name: 'assembly_constituency_number' },
                // { label: 'Parliamentary Constituency', name: 'parliamentary_constituency_name' },
              ].map((field, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    {field.label}:
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>
              ))}

              {/* Check-in & Check-out */}
              {['check_in_time', 'check_out_time'].map((field, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 text-gray-700 text-sm font-medium">
                    {field === 'check_in_time' ? 'Check-In Time' : 'Check-Out Time'}:
                  </label>
                  <input
                    type="datetime-local"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="border-b border-gray-300 w-full sm:w-3/4 px-4 py-2 focus:outline-none"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <button type="submit" className="bg-[#0060EC] text-white px-6 py-2 rounded-full">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVoterDetails;

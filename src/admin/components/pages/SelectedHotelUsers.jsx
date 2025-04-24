import img from "../../../assets/Group 40.png";
import img1 from "../../../assets/ProfileIcon.png";
// import hotelsImg from "../../assets/hotels.svg";
import hotelsImg from "../../../assets/hotels.svg";
import AdminSideBar from "./AdminSideBar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SearchLogout from "../../components/SearchLogout";
import { useGetUsersQuery } from "../../redux/adminApi/userApis";
import { useGetAllhoteUserQuery } from "../../redux/adminApi/VoterDrivingPassApi";
import { useEffect, useState } from "react";
import OurHotelAadharUser from './seletedUsersOfHotels/OurHotelAadharUser';
import OurHotelVoterUser from './seletedUsersOfHotels/OurHotelVoterUser';
import OurUserDrivngLicencesDetals from "./seletedUsersOfHotels/OurUserDrivngLicencesDetals";
import OurPassportUserDetails from "./seletedUsersOfHotels/OurPassportUserDetails";

const SelectedHotelUsers = () => {
  const [activeTab, setActiveTab] = useState('all');

  const [filteredUsers, setFilteredUsers] = useState({
    booking: [],
    driving: [],
    passport: [],
    voter: [],
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { hotelId  } = useParams(); // hotelId from URL
  const { data, isLoading, isError, error } = useGetAllhoteUserQuery(); // Get all hotel user data
  console.log("location",location.state.hotel.hotelAddress);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (data) {
      setFilteredUsers({
        booking: data?.BookingData?.filter(
          (u) => u.hotel_id === hotelId || u.hotel_id?._id === hotelId
        ) || [],
        driving: data?.drivingLicenseData?.filter(
          (u) => u.hotel_id === hotelId || u.hotel_id?._id === hotelId
        ) || [],
        passport: data?.passportData?.filter(
          (u) => u.hotel_id === hotelId || u.hotel_id?._id === hotelId
        ) || [],
        voter: data?.voterData?.filter(
          (u) => u.hotel_id === hotelId || u.hotel_id?._id === hotelId
        ) || [],
      });
    }
  }, [data, hotelId]);
  
  console.log("Filtered Users for hotel", filteredUsers.booking);
  
  // );

  if (isLoading) {
    return <p className="text-center text-blue-500 mt-10">Loading users...</p>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error fetching users!</p>
        <p>{error?.data?.message || "Something went wrong. Please try again."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" /> */}

        {/* Content */}
        <main className="flex-1 m-4 overflow-y-auto bg-[#ecf8f9] rounded-2xl">
          {/* Hotel Info */}
          <div className="bg-[#ecf8f9] p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center">
              <div className=" w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold sm:mb-0 sm:mr-4">
                <img src={hotelsImg} alt="Icon" className="w-20 h-20" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl text-start text-black font-bold">
                  {location.state.hotel.hotelName || "Hotel Name Not Available"}
                </h2>
                <p className="text-start text-gray-500">
                  {location.state.hotel.hotelAddress || "Address Not Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Cards */}
          <div className="p-4">
      {/* Tabs */}
      <div className=" mx-6 flex lg:gap-6 mb-4 border-b">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-1 border-b-2 ${
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600 font-semibold'
              : 'border-transparent'
          } hover:border-blue-500 transition duration-200`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab('aadhar')}
          className={`pb-1 border-b-2 ${
            activeTab === 'aadhar'
              ? 'border-blue-500 text-blue-600 font-semibold'
              : 'border-transparent'
          } hover:border-blue-500 transition duration-200`}
        >
          Aadhaar
        </button>
        <button
          onClick={() => setActiveTab('passport')}
          className={`pb-1 border-b-2 ${
            activeTab === 'passport'
              ? 'border-blue-500 text-blue-600 font-semibold'
              : 'border-transparent'
          } hover:border-blue-500 transition duration-200`}
        >
          Passport
        </button>
        <button
          onClick={() => setActiveTab('driving')}
          className={`pb-1 border-b-2 ${
            activeTab === 'driving'
              ? 'border-blue-500 text-blue-600 font-semibold'
              : 'border-transparent'
          } hover:border-blue-500 transition duration-200`}
        >
          Driving License
        </button>
        <button
          onClick={() => setActiveTab('voter')}
          className={`pb-1 border-b-2 ${
            activeTab === 'voter'
              ? 'border-blue-500 text-blue-600 font-semibold'
              : 'border-transparent'
          } hover:border-blue-500 transition duration-200`}
        >
          Voter ID
        </button>
      </div>

      {/* Conditionally render the components */}
      <div className="bg-[#F3FFDF] overflow-y-auto p-4 m-4 rounded-2xl">
        {activeTab === 'all' && (
          <>
            <OurHotelAadharUser customers={filteredUsers.booking.flatMap(b => b.customers)} />
            <OurUserDrivngLicencesDetals customers={filteredUsers.driving.flatMap(d => d.customers)} />
            <OurPassportUserDetails customers={filteredUsers.passport.flatMap(p => p.customers)} />
            <OurHotelVoterUser customers={filteredUsers.voter.flatMap(v => v.customers)} />
          </>
        )}
        {activeTab === 'aadhar' && (
          <OurHotelAadharUser customers={filteredUsers.booking.flatMap(b => b.customers)} />
        )}
        {activeTab === 'passport' && (
          <OurPassportUserDetails customers={filteredUsers.passport.flatMap(p => p.customers)} />
        )}
        {activeTab === 'driving' && (
          <OurUserDrivngLicencesDetals customers={filteredUsers.driving.flatMap(d => d.customers)} />
        )}
        {activeTab === 'voter' && (
          <OurHotelVoterUser customers={filteredUsers.voter.flatMap(v => v.customers)} />
        )}
      </div>
    </div>
        </main>
      </div >
    </div >
  );
};

export default SelectedHotelUsers;


import React, { useState } from "react";

import SearchIcon from "/Search.svg";
import hotelsImg from "/hotels.svg";
import users from "/usersSvg.svg";
import PaymentsHand from "/paymentsHand.svg";
import PendingApprovals from "/pendingApprovals.svg";
import { Link, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import { CiSearch } from "react-icons/ci";
import { useAdminlogoutMutation } from "../../redux/adminApi/authApi";
import { toast } from "react-toastify";
import { useGetHotelsQuery } from "../../redux/adminApi/adminHotels";
import SearchLogout from "../../components/SearchLogout";
import { useGetAllhoteUserQuery } from "../../redux/adminApi/VoterDrivingPassApi";
// import { useGetUsersQuery } from "../../redux/adminApi/userApis";


const AdminDashboard = () => {

  const { data, isLoading, error } = useGetHotelsQuery();
  const { data: alluser } = useGetAllhoteUserQuery();
  const { data: penApuHotels } = useGetHotelsQuery();
  const pendingHotels = penApuHotels?.hotel?.filter((hotel) => hotel.status === "pending");
  const count = pendingHotels?.length
  const bookingCount = alluser?.BookingData?.length || 0;
  const drivingCount = alluser?.drivingLicenseData?.length || 0;
  const passportCount = alluser?.passportData?.length || 0;
  const voterCount = alluser?.voterData?.length || 0;
  const totalUsers =
  bookingCount + drivingCount + passportCount + voterCount;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels!</p>;
  }

  // Ensure the data is an array
  const hotels = data?.hotel || []; // Adjust this to match your API response structure

  // Calculate count of hotels with status "approve"
  const approvedCount = hotels.filter((hotel) => hotel.status === "approve").length;


  return (
    <div className="flex ">
      <AdminSideBar />
      {/* Main Content */}
      <div className="flex flex-col w-full px-6 bg-white shadow-md border rounded-lg sm:mt-20 md:mt-0 h-screen">
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
        <div className="w-full h-full rounded-lg bg-[#ECF8F9] px-3 pt-3 overflow-y-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/admin/AdminHotels"
              className="bg-white text-center rounded-lg p-4 flex flex-col items-center shadow"
            >
              <img className="" src={hotelsImg} alt="Hotels" />
              <p className="text-[#0060EC] font-poppins font-semibold text-xl leading-8 py-2">
                Hotels
              </p>
              <p className="text-black font-poppins font-semibold text-4xl leading-[55px]">
                {approvedCount}
              </p>
            </Link>
            <Link
              to="/admin/AllUserHotels"
              className="bg-white text-center rounded-lg p-4 flex flex-col items-center shadow"
            >
              <img className="" src={users} alt="Users" />
              <p className="text-[#0060EC] font-poppins font-semibold text-xl leading-8 py-2">
                Users
              </p>
              <p className="text-black font-poppins font-semibold text-4xl leading-[55px]">
                {totalUsers || 0}
              </p>
            </Link>
            <Link
              to="/admin/AdminPayments"
              className="bg-white text-center rounded-lg p-4 flex flex-col items-center shadow"
            >
              <img className="" src={PaymentsHand} alt="Payments" />
              <p className="text-[#0060EC] font-poppins font-semibold text-xl leading-8 py-2">
                Payments
              </p>
              <p className="text-black font-poppins font-semibold text-4xl leading-[55px]">
                1000
              </p>
            </Link>
            <Link
              to="/admin/AdminPendingApprovals"
              className="bg-white text-center rounded-lg p-4 flex flex-col items-center shadow"
            >
              <img
                className=""
                src={PendingApprovals}
                alt="Pending Approvals"
              />
              <p className="text-[#0060EC] font-poppins font-semibold text-xl leading-8 py-2">
                Pending Approvals
              </p>
              <p className="text-black font-poppins font-semibold text-4xl ">
                {count}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

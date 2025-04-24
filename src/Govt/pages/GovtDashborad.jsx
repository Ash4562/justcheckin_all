import React, { useState } from "react";

// import SearchIcon from "../../src/assets/Search.svg";
import hotelsImg from "/hotels.svg";
import users from "/usersSvg.svg";
// import PaymentsHand from "../../src/assets/paymentsHand.svg";
// import PendingApprovals from "../../src/assets/pendingApprovals.svg";
import { Link, useNavigate } from "react-router-dom";
// import AdminSideBar from "./AdminSideBar";
import { CiSearch } from "react-icons/ci";
// import { useAdminlogoutMutation } from "../../redux/adminApi/authApi";
import { toast } from "react-toastify";

import GovtSidebar from "../Components/GovtSidebar";
import SearchLogout from "../Components/SearchLogout";
import { useGovtHotelQuery} from "../redux/authGovt";
import { useGetAllhoteUserQuery } from "../../admin/redux/adminApi/VoterDrivingPassApi";
// import { useGetAllhoteUserQuery } from "../redux/VoterDrivingPassApi";



const GovtDashborad = () => {
    const { data: userHotel } = useGovtHotelQuery();
    const { data: alluser } = useGetAllhoteUserQuery();
    
const bookingCount = alluser?.BookingData?.length || 0;
const drivingCount = alluser?.drivingLicenseData?.length || 0;
const passportCount = alluser?.passportData?.length || 0;
const voterCount = alluser?.voterData?.length || 0;

const totalUsers =
  bookingCount + drivingCount + passportCount + voterCount;

    // console.log(userHotel);
    console.log(totalUsers);

    // Calculate the count of hotels with "approve" status
    const approvedCount = userHotel?.hotel?.filter((hotel) => hotel.status === "approve").length || 0;

    return (
        <div className="flex">
            <GovtSidebar />
            {/* Main Content */}
            <div className="flex flex-col w-full px-6 mt-4 py-4 bg-white shadow-md border rounded-lg sm:mt-20 md:mt-0 h-screen">

                <SearchLogout className="w-full xs:mt-6 flex flex-row items-center justify-between hotelUsers sm:py-20" />

                <div className="w-full h-full rounded-lg bg-[#ECF8F9] px-3 pt-3 overflow-y-scroll">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link
                            to="/govt/hotelUsers"
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
                            to="/govt/AdhharUserDetails"
                            className="bg-white text-center rounded-lg p-4 flex flex-col items-center shadow"
                        >
                            <img className="" src={users} alt="Users" />
                            <p className="text-[#0060EC] font-poppins font-semibold text-xl leading-8 py-2">
                                Users
                            </p>
                            <p className="text-black font-poppins font-semibold text-4xl leading-[55px]">
                                {totalUsers|| 0}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovtDashborad;


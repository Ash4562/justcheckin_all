import React from "react";
import img from "/Group 40.png";
import img1 from "/ProfileIcon.png";
import { FaSearch } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import { useGetUsersQuery } from "../../redux/adminApi/userApis";
import SearchLogout from "../../components/SearchLogout";
const AllHotelUsers = () => {
  const navigate = useNavigate();
  const { data } = useGetUsersQuery()
  console.log("user", data);

  return (
    <div className="flex flex-col lg:flex-row  h-screen">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg  sm:mt-20 md:mt-0 h-screen">
        {/* Header */}
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        {/* Content */}
        <main className="flex-1  p-6 bg-white rounded-2xl overflow-y-scroll  ">
          {/* Hotel Info */}

          {/* Customer Cards */}
          <div className=" grid grid-cols-1 bg-[#f3ffdf] sm:grid-cols-2 lg:grid-cols-3 rounded-xl  p-4 gap-6">
            {data && data.customers.map((customer, index) => (
              <button
     
                onClick={() =>
                  navigate("/AdminUserDetailsCard", { state: customer.c_id })
                }
                key={index}
                className="bg-white shadow-sm p-4 text-center rounded-xl"
              >
                <div className="flex justify-center items-center mb-4">
                  <img
                    // src={img1}
                    src={`data:image/jpeg;base64,${customer.aadhar_image}`}
                    alt="Profile Icon"
                    className="w-28 h-28 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold">
                  {customer.hotel_id?.hotelName || "Hotel Name Not Available"}
                </h3>

                <h3 className="text-lg font-bold">{customer.customer_name
                }</h3>
                <p>{customer.
                  aadhar_number}</p>
                {/* <p>{customer.phone_number}</p> */}
                <p>XXXXXXXXX</p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllHotelUsers;

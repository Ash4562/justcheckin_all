import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GovtSidebar from "../Components/GovtSidebar";
// import { useGovtUserQuery } from "../redux/authGovt";
import SearchLogout from "../Components/SearchLogout";
import { useGovtUserQuery } from "../redux/authGovt";

const AllUser = () => {
    const { data } = useGovtUserQuery()
    const navigate = useNavigate();
    console.log(data);
    return (
        <div className="flex flex-col lg:flex-row  h-screen">
            {/* Sidebar */}
            <GovtSidebar />

            {/* Main Content */}
            <div className="flex flex-col w-full px-6  py-4 bg-white shadow-md border rounded-lg  sm:mt-20 md:mt-0 h-screen">
                {/* Header */}
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20  xs:mt-14 " />

                {/* Content */}
                <main className="flex-1  p-6 bg-white rounded-2xl overflow-y-scroll  ">
                    {/* Hotel Info */}

                    {/* Customer Cards */}
                    <div className=" grid grid-cols-1 bg-[#f3ffdf] sm:grid-cols-2 lg:grid-cols-3 rounded-xl  p-4 gap-6">
                        {data && data.customers.map((customer, index) => (
                            <button
                                // to="/AdminUserDetails"
                                // to="/UserCardDeatils"
                                onClick={() =>
                                    navigate("/UserCardDeatils", { state: customer.c_id })
                                }
                                key={index}
                                className="bg-white shadow-sm rounded-lg p-4 text-center"
                            >
                                <div className="flex justify-center items-center mb-4">
                                    <img
                                      src={`data:image/jpeg;base64,${customer.aadhar_image}`}
                                        alt="Profile Icon"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                </div>
                                {/* <h3 className="text-lg font-bold">{customer.hotel_id.hotelName
                                }</h3> */}

                                <h3 className="text-lg font-bold">{customer.customer_name
                                }</h3>
                                <p>{customer.
                                    aadhar_number}</p>
                                {/* <p>{customer.phone_number}</p> */}
                                <p>XXXXXXXXXXX</p>
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllUser;

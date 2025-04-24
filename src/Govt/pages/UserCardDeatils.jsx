import React, { useMemo } from "react";
import img from "/Group 40.png";
import { useLocation } from "react-router-dom";
import GovtSidebar from "../Components/GovtSidebar";
import SearchLogout from "../Components/SearchLogout";
import { useGovtUserQuery } from "../redux/authGovt";

const UserCardDeatils = () => {
    const { data, isLoading, isError } = useGovtUserQuery();
    const location = useLocation();
    const state = location.state;

    const customer = useMemo(() => {
        return data?.customers?.find((customer) => customer.c_id === state);
    }, [data, state]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !customer) {
        return (
            <div className="flex">
                <GovtSidebar />
                <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
                    <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
                    <p>No customer found for the provided ID or error fetching data.</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="flex">
            <GovtSidebar />
            <div className="flex flex-col items-center w-full md:w-3/4 mx-8">
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
                <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 flex justify-center items-center">
                    <div className="w-full max-w-xl bg-white rounded-3xl shadow-md p-2 border border-[#0060EC]">
                <div className="w-full max-w-3xl bg-white rounded-lg my-6">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center overflow-hidden">
                            <img
                               src={`data:image/jpeg;base64,${customer.aadhar_image}`}
                                alt="Profile"
                                className="w-15 h-15 object-cover"
                            />
                        </div>
                        <h2 className="mt-2 text-xl text-center">{customer.customer_name}</h2>
                        <p className="text-gray-500 text-center">{customer.hotel_id?.hotelName}</p>
                    </div>
                    <div className="mt-4 flex justify-center w-full">
                        <table className="w-3/9 text-left border-collapse">
                            <tbody>
                                <tr>
                                    <td className="text-gray-500">Aadhar Number:</td>
                                    <td className="pl-16">{customer.aadhar_number}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-500">Phone Number:</td>
                                    <td className="pl-16">{customer.phone_number}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-500">Address:</td>
                                    <td className="pl-16">{customer.address}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-500">Gender:</td>
                                    <td className="pl-16">{customer.gender}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-500">Room Number:</td>
                                    <td className="pl-16">{customer.room_number}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-500">Check-In Time & Date:</td>
                                    <td className="pl-16">
                                        {new Date(customer.check_out_time).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}</td>

                                </tr>
                                <td className="text-gray-500">Check-out Time & Date:</td>
                                    <td className="pl-16">{formatDate(customer.check_in_time)}</td>
                                <tr>
                                    <td className="text-gray-500">Aadhar Verified:</td>
                                    <td className="pl-16">{customer.aadhar_verified ? "Yes" : "No"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UserCardDeatils;

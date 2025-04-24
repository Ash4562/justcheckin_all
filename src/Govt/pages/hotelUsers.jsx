import React, { useMemo } from "react";
import hotelImg from "/hotelIMG.png";
import { useNavigate } from "react-router-dom";
import GovtSidebar from "../Components/GovtSidebar";
import SearchLogout from "../Components/SearchLogout";
import { useGovtHotelQuery } from "../redux/authGovt";

const HotelUsers = () => {
    const { data } = useGovtHotelQuery();
    const navigate = useNavigate();

    const approvedHotels = useMemo(() => {
        return data?.hotel?.filter((hotel) => hotel.status === "approve");
    }, [data]);

    if (!approvedHotels || approvedHotels.length === 0) {
        return (
            <div className="flex flex-col md:flex-row">
                <GovtSidebar />
                <div className="flex flex-col w-full px-6 py-4 bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
                    <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
                    <p>No approved hotels found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row">
            <GovtSidebar />
            <div className="flex flex-col w-full px-6 py-4 bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />
                <div className="flex-col justify-center items-center bg-[#ECF8F9] mt-2 overflow-y-scroll h-full">
                    {approvedHotels.map((hotelData) => (
                        <div
                            key={hotelData._id}
                            className="mx-4 my-4 p-4 bg-white border border-gray-300 rounded-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() =>
                                        navigate("/govt/HoteluserCrad", { state: hotelData._id })
                                    }
                                    className="flex justify-center items-center w-24 h-24 bg-white rounded-full"
                                >
                                    <img
                                        src={hotelImg}
                                        alt="Hotel Icon"
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                <div className="flex-1">
                                    <h1 className="text-lg font-bold">{hotelData.hotelName}</h1>
                                    <p className="text-gray-600">
                                        {hotelData.city}, {hotelData.state || "India"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelUsers;

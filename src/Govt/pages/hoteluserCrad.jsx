import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGovtHotelQuery } from "../redux/authGovt";
import GovtSidebar from "../Components/GovtSidebar";
import SearchLogout from "../Components/SearchLogout";
import hotelsImg from "/hotels.svg";

const img = React.lazy(() => import("/Group 40.png"));

const HoteluserCrad = () => {
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useGovtHotelQuery();

    const hotel = useMemo(() => {
        return data?.hotel?.find((hotel) => hotel._id === state);
    }, [data, state]);
    console.log(state);

    if (isLoading) {
        return <p className="text-center text-blue-500 mt-10">Loading...</p>;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 mt-10">
                <p>Error fetching data!</p>
                <p>{error?.data?.message || "Something went wrong. Please try again."}</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="text-center text-gray-500 mt-10">
                <p>Hotel not found!</p>
                <Link
                    to="/govt/HoteluserCrad"
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    Go back to the hotel list
                </Link>
            </div>
        );
    }

    return (
        <div className="flex">
            <GovtSidebar />

            <div className="flex flex-col items-center w-full px-3 mt-2">
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

                <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 flex justify-center items-center">
                    <div className="w-full max-w-xl bg-white rounded-3xl shadow-md p-2 border border-[#0060EC]">
                        <div className="flex flex-col items-center my-4">
                            <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center">
                                <React.Suspense fallback={<div>Loading Image...</div>}>
                                    <img src={hotelsImg} alt="Profile" className="w-15 h-15 object-cover" />
                                </React.Suspense>
                            </div>
                            <h2 className="mt-2 text-xl font-semibold">{hotel.hotelName}</h2>
                        </div>

                        <div className="mt-2 flex justify-self-end w-full px-10">
                            <table className="w-full text-left border-collapse ">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500">Owner Name:</td>
                                        <td className="pl-16">{hotel.hotelOwnerName}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Email Address:</td>
                                        <td className="pl-16">{hotel.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Mobile Number:</td>
                                        <td className="pl-16">{hotel.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Hotel Reg Number:</td>
                                        <td className="pl-16">{hotel.registrationNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">GSTIN Number:</td>
                                        <td className="pl-16">{hotel.gstNo}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Documents:</td>
                                        <td className="pl-16">
                                            <a
                                                href={hotel.hotelDocument}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Document
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-2 flex justify-center space-x-4 gap-4 mb-3">
                        <Link
                to={`/govt/SelectedHotelUsersGov/${state}`}
                state={{ hotel }}
                className="bg-blue-600 text-white px-4 py-1 rounded-full"
              >
                All Users
              </Link>
                            {/* <button
                               onClick={() =>
                                // `/SelectedHotelUsers/${hotel._id}`
                                navigate(`/SelectedHotelUsersGov/${state}`)}
                                className="bg-blue-600 text-white px-4 py-1 rounded-full"
                            >
                                All Users
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoteluserCrad;

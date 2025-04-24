


import AdminSideBar from "./AdminSideBar";
import hotelImg from "/hotelIMG.png";
import { Link, useNavigate } from "react-router-dom";
import { useGetHotelsQuery } from "../../redux/adminApi/adminHotels";
import SearchLogout from "../../components/SearchLogout";

const AdminPendingApprovals = () => {
  const { data } = useGetHotelsQuery();
  const navigate = useNavigate();

  const handleNavigate = (hotel) => {
    navigate("/HotelPenApoDetails", { state: hotel });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
        {/* Top Section: Search Input and Logout Button */}
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        {/* Hotel Cards */}
        <div className="p-2 z-20 flex flex-col justify-center items-center bg-[#ECF8F9] overflow-y-scroll">
          {data &&
            data.hotel
              .filter((hotel) => hotel.status === "pending")
              .map((hotel) => (
                <div
                  key={hotel._id}
                  className="w-full p-3 my-2 bg-white border border-gray-300 rounded-2xl shadow"
                >
                  <div className="flex  items-center justify-center gap-4">
                    {/* Hotel Icon (Click to navigate) */}
                    <div
                      className="flex justify-center items-center w-24 h-24 bg-white rounded-full cursor-pointer"
                      onClick={() => handleNavigate(hotel)}
                    >
                      <img src={hotelImg} alt="Hotel" className="w-20 h-20 object-cover" />
                    </div>

                    {/* Hotel Details */}
                    <div className="flex-1">
                      <h1 className="text-lg font-bold">{hotel.hotelName}</h1>
                      <p className="text-gray-600">{hotel.hotelAddress}</p>
                    </div>

                    {/* Approve Button Only */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleNavigate(hotel)}
                        className="py-2 px-4 text-white rounded-[40px] bg-[#18930D] font-poppins text-base leading-8"
                      >
                        View & Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

      </div>
    </div>
  );
};

export default AdminPendingApprovals;

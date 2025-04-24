import img from "/Group 40.png";
import AdminSideBar from "./AdminSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import SearchLogout from "../../components/SearchLogout";
import { useUpdateHotelsMutation } from "../../redux/adminApi/adminHotels";

const HotelPenApoDetails = () => {
    const location = useLocation();
    const hotel = location.state;
    const navigate = useNavigate();
    const [updateHoteldata] = useUpdateHotelsMutation();

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateHoteldata({ id, status: newStatus });
            alert(`Hotel status updated to ${newStatus}`);
            navigate("/AdminPendingApprovals");``
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Error updating status. Please try again.");
        }
    };

    if (!hotel) {
        return <div className="flex justify-center items-center h-screen">No hotel data available.</div>;
    }

    return (
        <div className="flex">

            <AdminSideBar />


            <div className="flex flex-col items-center w-full px-3 mt-2">

                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />


                <div className="bg-[#ECF8F9] w-full rounded-3xl p-4 mt-2 flex justify-center items-center">
                    <div className="w-full max-w-xl bg-white rounded-3xl shadow-md p-4 border-2 border-[#0060EC]">

                        <div className="flex flex-col items-center my-4">
                            <div className="w-20 h-20 bg-[#85D200] rounded-full flex items-center justify-center">
                                <img src={img} alt="Hotel Profile" className="w-16 h-16 object-cover" />
                            </div>
                            <h2 className="mt-2 text-xl font-semibold">{hotel.hotelName}</h2>
                        </div>

                        <div className="mt-2 flex justify-center w-full">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500">Owner Name:</td>
                                        <td className="pl-8">{hotel.hotelOwnerName}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Email Address:</td>
                                        <td className="pl-8">{hotel.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Mobile Number:</td>
                                        <td className="pl-8">{hotel.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Hotel Reg Number:</td>
                                        <td className="pl-8">{hotel.registrationNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">GSTIN Number:</td>
                                        <td className="pl-8">{hotel.gstNo}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Documents:</td>
                                        <td className="pl-8">
                                            <a href={hotel.hotelDocument} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                View Document
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Registration Date:</td>
                                        <td className="pl-8">{new Date(hotel.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Amount Paid:</td>
                                        <td className="pl-8">{hotel.amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="flex gap-4 justify-center mt-4">
                            <button
                                onClick={() => handleStatusUpdate(hotel._id, "approve")}
                                className="py-2 px-6 text-white rounded-[40px] bg-[#18930D] font-poppins text-base"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(hotel._id, "reject")}
                                className="py-2 px-6 text-white rounded-[40px] bg-[#D20000] font-poppins text-base"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPenApoDetails;

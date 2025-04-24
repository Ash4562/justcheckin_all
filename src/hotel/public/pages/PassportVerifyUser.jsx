
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useSubmitPassportMutation } from "../../redux/hotelUserApi.jsx/VoterDrivingPassApi";
import passport from "/passportbgupdate1.png";
import { IoPerson } from "react-icons/io5";
import { useSubmitPassportMutation } from "../../redux/api/VoterDrivingPassApi";
import { useGetSingleHotelQuery } from "../../redux/api/hotelProfileApi";

const PassportVerifyUser = () => {
    const { data :getHotelId } = useGetSingleHotelQuery();
    const hotel_id = getHotelId?._id || "Not Available";
    console.log("HOTEL DFDA",hotel_id);
    const location = useLocation();
    const { hotel, passportData } = location.state || {};
    const navigate = useNavigate();
    console.log("🚀 Location State:", location.state);

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        console.log("🚀 Passport Data Received:", passportData);

        if (Array.isArray(passportData) && passportData.length > 0) {
            const updatedFormData = passportData.map((data) => {
                if (!data.passport_data) {
                    console.error("❌ passport_data missing in entry:", data);
                    return null;
                }

                return {
                    hotel_id:hotel_id ||  "",
                    room_number: "",
                    phone_number: "",
                    check_out_time: "", // Default value
                    first_name: data.passport_data.first_name || "",
                    last_name: data.passport_data.last_name || "",
                    document_id: data.passport_data.document_id || "",
                    date_of_birth: data.passport_data.date_of_birth || "",
                    issue_date: data.passport_data.issue_date || "",
                    document_type: data.passport_data.document_type || "PASSPORT",
                    file_number: data.passport_data.file_number || "",
                };
            }).filter(Boolean); // Removes any null entries if `passport_data` is missing

            console.log("✅ Form Data Set:", updatedFormData);
            setFormData(updatedFormData);
        } else {
            console.error("❌ No valid passportData found!");
        }
    }, [passportData, hotel]);





    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            )
        );
    };

    const [submitPassport, { isLoading, isSuccess, isError, error }] = useSubmitPassportMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hotel) {
            toast.error("❌ Hotel ID is missing!");
            return;
        }

        if (formData.some(item => !item.document_id || !item.first_name || !item.last_name || !item.date_of_birth || !item.phone_number)) {
            toast.error("❌ Missing required fields: document_id, first_name, last_name, date_of_birth, or phone_number.");
            return;
        }

        const requestData = {
            hotel_id:hotel_id ||  "",
            data: {
                passport_data: formData.map(data => ({
                    document_type: data.document_type || "PASSPORT",
                    document_id: data.document_id,
                    file_number: data.file_number || "",
                    first_name: data.first_name,
                    last_name: data.last_name,
                    date_of_birth: data.date_of_birth,
                    issue_date: data.issue_date || "",
                    phone_number: data.phone_number,  // Ensure phone_number is included
                    room_number: data.room_number || "",
                    check_out_time: data.check_out_time || ""

                }))
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };


        console.log("🚀 Final Payload Before Sending:", JSON.stringify(requestData, null, 2));

        try {
            const response = await submitPassport(requestData);
            if (response?.error) {
                toast.error(`❌ Error submitting: ${response.error.data?.message || "Unknown error"}`);
            } else {
                toast.success("✅ Passport Data Submitted Successfully!");
                setTimeout(() => {
                    navigate(`/`);
                }, 2000);
            }
        } catch (err) {
            console.error("❌ Submission Error:", err);
            toast.error("❌ Submission Error. Please try again.");
        }
    };




    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Passport Verification Form</h2>
            <form onSubmit={handleSubmit}>
                {formData.map((data, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md" >
                        <h3 className="font-bold">User {index + 1}</h3>

                        <label className="block mb-2">First Name:</label>
                        <input type="text" name="first_name" value={data.first_name} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Last Name:</label>
                        <input type="text" name="last_name" value={data.last_name} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Passport Number:</label>
                        <input type="text" name="document_id" value={data.file_number} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Date of Birth:</label>
                        <input type="text" name="date_of_birth" value={data.date_of_birth} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Issue Date:</label>
                        <input type="text" name="issue_date" value={data.issue_date} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Room Number:</label>
                        <input type="text" name="room_number" value={data.room_number} onChange={(e) => handleChange(index, e)} className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Phone Number:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) => handleChange(index, e)}
                            className="border p-2 w-full mb-4"
                            required
                        />
                        <label className="block mb-2 font-bold">Check-out Time </label>
                        <input
                            type="datetime-local"
                            name="check_out_time"
                            value={data.check_out_time || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border p-2 w-full mb-4"
                        />
                        <div
                            className="w-full min-h-[200px]  sm:h-64 md:h-80 lg:h-96 bg-contain bg-no-repeat bg-center relative flex items-center justify-center"
                            style={{ backgroundImage: `url(${passport})` }}
                        >
                            <h1 className=" text-white text-sm  sm:text-xs absolute xs:left-2  sm:left-28 sm:top-28 lg:left-12 lg:top-44 md:text-xs md:left-24  lg:text-xs   font-bold  p-2 rounded-md">
                                {data.first_name} {data.last_name}
                            </h1>
                            <h1 className=" text-white xs: -text-2xl sm:left-40 sm:bottom-16 text-xl sm:text-xs absolute xs:bottom-2   xs:left-2  lg:left-28 lg:bottom-28  md:text-sm md:bottom-24  md:left-36   lg:text-xs   font-bold  p-2 rounded-md">
                                {data.date_of_birth}
                            </h1>
                            <h1 className=" text-white text-sm sm:text-xs sm:right-28 sm:top-10 absolute xs:top-6  xs:right-2 lg:right-20 lg:top-20 md:top-12  md:right-24  md:text-lg lg:text-xs   font-bold p-2 rounded-md">
                                Passport Number
                            </h1>
                            <h1 className=" text-white -text-2xl text-sm sm:text-xs sm:right-28 sm:top-16 absolute xs:top-10  xs:right-2   lg:right-20 lg:top-28 md:top-20  md:right-24  md:text-xl  lg:text-xs   font-bold p-2 rounded-md">
                                {data.file_number}
                            </h1>
                            <h1 className=" text-white  sm:text-xs absolute xs:bottom-12   xs:right-5  lg:right-16 lg:bottom-28  md:top-36 md:right-24 md:text-3xl lg:text-xs   font-bold  p-2 rounded-md">
                                <IoPerson className="lg:text-8xl md:text-8xl xs:text-6xl sm:" />
                            </h1>
                        </div>




                    </div>

                ))}

                <button
                    type="submit"
                    className={`bg-blue-500 text-white p-2 rounded w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>

        </div>
    );
};

export default PassportVerifyUser;

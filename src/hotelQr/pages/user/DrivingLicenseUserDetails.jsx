
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useSubmitDrivingMutation } from "../../redux/hotelUserApi.jsx/VoterDrivingPassApi";
import driving from "/driving.png";
import { IoPerson } from "react-icons/io5";
import { useSubmitDrivingMutation } from "../../redux/hotelUserApi.jsx/VoterDrivingPassApi";

const DrivingLicenseForm = () => {
    const location = useLocation();
    const { hotel, licenseData } = location.state || {}; 
    const navigate = useNavigate();
    console.log("🚀 Location State:", location.state); // Debugging

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        console.log("\u{1F680} License Data Received:", licenseData);

        if (Array.isArray(licenseData) && licenseData.length > 0) {
            setFormData(
                licenseData.map((data) => ({
                    hotel_id: hotel || "", // Ensure hotel_id is assigned
                    room_number: "",
                    phone_number: "",
                    check_out_time: "",
                    customer_name: data?.name?.trim() || "",   
                    address: data?.address?.trim() || "",
                    license_image: data?.photo_base64 || "",
                    license_number: data?.document_id?.trim() || "",
                    date_of_birth: data?.date_of_birth?.trim() || "",
                    validity: data?.validity || {},
                    vehicle_class_details: Array.isArray(data?.vehicle_class_details) 
                        ? data.vehicle_class_details.map(vc => ({ category: vc.category })) 
                        : [] // Ensure correct format
                }))
            );
        } else {
            console.error("\u274C No valid licenseData found!");
        }
    }, [licenseData, hotel]);
    

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            )
        );
    };

    const [submitDriving, { isLoading, isSuccess, isError, error }] = useSubmitDrivingMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!hotel) {
            toast.error("❌ Hotel ID is missing!");
            return;
        }
    
        if (formData.some(item => !item.license_number || !item.customer_name || !item.date_of_birth || !item.address)) {
            toast.error("❌ Missing required fields: document_id, name, date_of_birth, or address.");
            return;
        }
    
        const requestData = {
         
            hotel_id: hotel, 
            customers: formData.map((data, index) => ({
                document_id: data.license_number || "",
                name: data.customer_name || "",
                date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString() : "",
                dependent_name: location.state?.licenseData?.[index]?.dependent_name || "N/A",
                address: data.address || "",
                pincode: location.state?.licenseData?.[index]?.pincode || "000000",
                validity: {
                    non_transport: {
                        issue_date: location.state?.licenseData?.[index]?.validity?.non_transport?.issue_date || null,
                        expiry_date: location.state?.licenseData?.[index]?.validity?.non_transport?.expiry_date || null
                    },
                    transport: {
                        issue_date: location.state?.licenseData?.[index]?.validity?.transport?.issue_date || null,
                        expiry_date: location.state?.licenseData?.[index]?.validity?.transport?.expiry_date || null
                    }
                },
                rto_details: {
                    state: location.state?.licenseData?.[index]?.rto_details?.state || "",
                    authority: location.state?.licenseData?.[index]?.rto_details?.authority || ""
                },
                vehicle_class_details: Array.isArray(location.state?.licenseData?.[index]?.vehicle_class_details)
                    ? location.state.licenseData[index].vehicle_class_details.map(vc => ({
                        category: vc.category,
                        authority: location.state?.licenseData?.[index]?.rto_details?.authority || ""
                    }))
                    : [],
                blood_group: "Unknown",
                photo_base64: data.license_image || "",
                phone_number: data.phone_number || "",
                room_number: data.room_number || "",
                check_out_time: data.check_out_time|| "", // Default value, update if needed
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    
        console.log("🚀 Final Payload Before Sending:", JSON.stringify(requestData, null, 2));
    
        try {
            const response = await submitDriving(requestData);
            if (response?.error) {
                toast.error(`❌ Error submitting: ${response.error.data?.message || "Unknown error"}`);
            } else {
                toast.success("✅ Driving License Submitted Successfully!");
                setTimeout(() => {
                    navigate(`/hotelqr/NumberOfUsers/${hotel}`);
                }, 2000);
            }
        } catch (err) {
            console.error("❌ Submission Error:", err);
            toast.error("❌ Submission Error. Please try again.");
        }
    };
    
    
    
    
    
    
    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Driving License Form</h2>
            <form onSubmit={handleSubmit}>
                {formData.map((data, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h3 className="font-bold">User {index + 1}</h3>

                        <label className="block mb-2">Customer Name:</label>
                        <input type="text" name="customer_name" value={data.customer_name} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Address:</label>
                        <input type="text" name="address" value={data.address} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">License Number:</label>
                        <input type="text" name="license_number" value={data.license_number} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Date of Birth:</label>
                        <input type="text" name="date_of_birth" value={data.date_of_birth} readOnly className="border p-2 w-full mb-4" />

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
{/* 
                        {data.license_image && (
                            <div className="mt-4">
                                <h4 className="font-bold">License Image:</h4>
                                <img src={`data:image/jpeg;base64,${data.license_image}`} alt="License" style={{ width: "200px", height: "auto" }} />
                            </div>
                        )} */}
                         <div
                         className="w-full min-h-[200px]  sm:h-64 md:h-80 lg:h-96 bg-contain bg-no-repeat bg-center relative flex items-center justify-center"
                         style={{ backgroundImage: `url(${driving})` }}
                     >
                         <h1 className=" text-black text-sm xs:text-xs xs:top-32 xs:left-8  sm:text-xs absolute   sm:left-28 sm:top-28  md:text-xs md:left-24  lg:left-36 lg:top-64 lg:text-lg     font-bold  p-2 rounded-md">
                         {data.customer_name}
                         </h1>
                         <h1 className=" text-black xs: -text-2xl sm:left-40 xs:text-xs xs:top-28 xs:left-28 sm:bottom-16 text-xl sm:text-xs absolute xs:bottom-2      md:text-sm md:bottom-24  md:left-36 lg:left-64 lg:bottom-32  lg:text-xl   font-bold  p-2 rounded-md">
                         {data.date_of_birth}
                         </h1>
                        
                       
                       
                         {data.license_image && (
                            <div className="mt-4">
                                
                                <img src={`data:image/jpeg;base64,${data.license_image}`} alt="License" className="  absolute xs:w-10 xs:h-16 xs:top-16 xs:right-1 md:w-20  md:h-28 md:bottom-28 md:right-24 lg:w-24  lg:h-36 lg:right-10 lg:bottom-32" />
                            </div>
                        )}
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

                {isError && <p className="text-red-500 mt-2">Error: {error?.data?.error || "Submission failed"}</p>}
                {isSuccess && <p className="text-green-500 mt-2">✅ Submitted Successfully!</p>}
            </form>
        </div>
    );
};

export default DrivingLicenseForm;






















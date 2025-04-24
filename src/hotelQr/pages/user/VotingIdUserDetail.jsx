import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSubmitvoterIdMutation } from "../../redux/hotelUserApi.jsx/VoterDrivingPassApi";


const VoterIdForm = () => {
    const location = useLocation();
    const { hotel, verifiedData } = location.state || {}; 
    const navigate = useNavigate();
    const [submitVoter, { isLoading, isSuccess, isError, error }] = useSubmitvoterIdMutation();
    console.log("🚀 Location State:", location.state); // Debugging
    
    const [formData, setFormData] = useState([]);
    
    useEffect(() => {
        if (Array.isArray(verifiedData)) {
            setFormData(
                verifiedData.map(({ voter_data }) => ({
                    hotel_id: hotel || "",
                    room_number: "",
                    phone_number: "",
                    check_out_time: "",
                    customer_name: voter_data?.name || "",
                    voter_id: voter_data?.document_id || "",
                    father_name: voter_data?.father_name || "",

            
                    gender: voter_data?.gender ? 
                        voter_data.gender.charAt(0).toUpperCase() + voter_data.gender.slice(1).toLowerCase() 
                        : "Unknown", // ✅ Fix: Prevent error on undefined gender
                    age: voter_data?.age || 0,
                    address:`${voter_data.polling_station},${voter_data.district}, ${voter_data.state}, ${voter_data.part_name}, `.trim(),
                    district: voter_data?.district || "",
                    state: voter_data?.state || "",
                    assembly_constituency_number: voter_data?.assembly_constituency_number || "",
                    assembly_constituency_name: voter_data?.assembly_constituency_name || "",
                    parliamentary_constituency_name: voter_data?.parliamentary_constituency_name || "",
                    part_number: voter_data?.part_number || "",
                    part_name: voter_data?.part_name || "",
                    serial_number: voter_data?.serial_number || "",
                    polling_station: voter_data?.polling_station || "",
                    voter_image: "" // ✅ Placeholder for voter image if needed
                }))
            );
        }
    }, [verifiedData]);
    
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            )
        );
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.some(item => !item.phone_number.trim())) {
            alert("❌ Please enter a valid phone number for all users.");
            return;
        }
    
        console.log("🚀 Sending Data to Backend (Before Formatting):", formData);
    
        const requestData = {
            hotel_id: hotel || "",
            voter_data: formData.map((data) => ({
                name: data.customer_name || "",
                father_name: data.father_name || "",
                gender: data.gender || "Unknown",
                age: data.age || 0,
                district: data.district || "",

               
                state: data.state || "",
                assembly_constituency_number: data.assembly_constituency_number || "",
                assembly_constituency_name: data.assembly_constituency_name || "",
                parliamentary_constituency_name: data.parliamentary_constituency_name || "",
                part_number: data.part_number || "",
                part_name: data.part_name || "",
                serial_number: data.serial_number || "",
                polling_station: data.polling_station || "",
                phone_number: data.phone_number || "",
                room_number: data.room_number || "",
                address: data.district && data.state && data.part_name && data.polling_station 
                ? `${data.district}, ${data.state}, ${data.part_name}, ${data.polling_station}`.trim()
                : "Unknown Address",  // ✅ Fix: Ensure address is always present
            check_out_time: "" // 
            }))
        };
    
        console.log("🚀 Final Payload:", JSON.stringify(requestData, null, 2)); // Debugging
    
        try {
            const response = await submitVoter(requestData);
            if (response?.error) {
                toast.error(`❌ Error: ${response.error.data?.error || "Unknown error"}`);
            } else {
                toast.success("✅ Voter ID Submitted Successfully!");
                setTimeout(() => navigate(`/hotelqr/NumberOfUsers/${hotel}`), 2000);
            }
        } catch (err) {
            console.error("❌ Submission Error:", err);
            toast.error("❌ Submission Error. Please try again.");
        }
    };
    
    
     

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Voter ID Form</h2>
            <form onSubmit={handleSubmit}>
                {formData.map((data, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h3 className="font-bold">User {index + 1}</h3>

                        <label className="block mb-2">Customer Name:</label>
                        <input type="text" name="customer_name" value={data.customer_name} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Father's Name:</label>
                        <input type="text" name="father_name" value={data.father_name} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Address:</label>
                        <input type="text" name="address" value={data.address} readOnly className="border p-2 w-full mb-4" />

                        <label className="block mb-2">Voter ID:</label>
                        <input type="text" name="voter_id" value={data.voter_id} readOnly className="border p-2 w-full mb-4" />

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

                        <label className="block mb-2 font-bold">Check-out Time:</label>
                        <input
                            type="datetime-local"
                            name="check_out_time"
                            value={data.check_out_time || ""}
                            onChange={(e) => handleChange(index, e)}
                            className="border p-2 w-full mb-4"
                        />
{/* 
                        {data.voter_image && (
                            <div className="mt-4">
                                <h4 className="font-bold">Voter ID Image:</h4>
                                <img src={`data:image/jpeg;base64,${data.voter_image}`} alt="Voter ID" style={{ width: "200px", height: "auto" }} />
                            </div>
                        )} */}
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

export default VoterIdForm;

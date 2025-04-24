// import React, { useState } from "react";
// import { useLocation } from "react-router-dom"; // ✅ Import useLocation
// import { toast } from "react-toastify";
// import { useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const SubmitOtp = () => {
//   const location = useLocation();
//   const { hotel_id   , transactionId } = location.state || {}; // ✅ Get hotel_id    & transactionId

//   console.log("Hotel ID in SubmitOtp:", hotel_id );
//   console.log("Transaction ID in SubmitOtp:", transactionId);

//   const [otp, setOtp] = useState("");
//   const [submitOtp, { isLoading, error }] = useSubmitAadhaarOTPMutation();

//   const handleSubmitOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       const response = await submitOtp({ otp, hotel_id   , transactionId }).unwrap();
//       toast.success("OTP Verified Successfully!");
//       console.log("Verification Response:", response);
//     } catch (err) {
//       toast.error("OTP Verification Failed");
//     }
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url('/loginBG.jpeg')` }}
//     >
//       <div className="text-white flex items-center justify-center h-screen">
//         <div className="p-6 sm:py-8 md:p-10 bg-white rounded-[30px] md:rounded-[50px] w-full max-w-lg">
//           <div className="rounded-[15px] sm:py-4 xs:py-4 md:rounded-[20px] shadow-xl shadow-[#FFFFFF7A] flex flex-col w-full bg-gradient-to-t from-[#004FC2] to-[#00255C] px-4 md:p-20">
//             <h2 className="text-xl font-bold mb-2">Submit Aadhaar OTP</h2>
//             <p className="text-sm">Hotel ID: {hotel_id   }</p>
//             <p className="text-sm mb-2">Transaction ID: {transactionId}</p>

//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
//             />
//             <button
//               onClick={handleSubmitOtp}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Verifying OTP..." : "Submit OTP"}
//             </button>

//             {error && <p className="text-red-500 mt-2">Error verifying OTP</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitOtp;








// import React, { useState } from "react";
// import { useLocation } from "react-router-dom"; // ✅ Import useLocation
// import { toast } from "react-toastify";
// import { useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const SubmitOtp = () => {
//   const location = useLocation();
//   const { hotel_id  , transactionId } = location.state || {}; // ✅ Get hotel_id   & transactionId

//   console.log("Hotel ID in SubmitOtp:", hotel_id    );
//   console.log("Transaction ID in SubmitOtp:", transactionId);

//   const [otp, setOtp] = useState("");
//   const [room_number, setRoomNumber] = useState(""); // ✅ State to hold room number
//   const [submitOtp, { isLoading, error }] = useSubmitAadhaarOTPMutation();

//   const handleSubmitOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }
//     if (!room_number) {
//       toast.error("Enter a valid room number");
//       return;
//     }

//     try {
//       const response = await submitOtp({ otp, hotel_id  , transactionId, room_number }).unwrap(); // ✅ Send roomNumber along with OTP
//       toast.success("OTP Verified Successfully!");
//       console.log("Verification Response:", response);
//     } catch (err) {
//       toast.error("OTP Verification Failed");
    
//     }
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url('/loginBG.jpeg')` }}
//     >
//       <div className="text-white flex items-center justify-center h-screen">
//         <div className="p-6 sm:py-8 md:p-10 bg-white rounded-[30px] md:rounded-[50px] w-full max-w-lg">
//           <div className="rounded-[15px] sm:py-4 xs:py-4 md:rounded-[20px] shadow-xl shadow-[#FFFFFF7A] flex flex-col w-full bg-gradient-to-t from-[#004FC2] to-[#00255C] px-4 md:p-20">
//             <h2 className="text-xl font-bold mb-2">Submit Aadhaar OTP</h2>
//             <p className="text-sm">Hotel ID: {hotel_id  }</p>
//             <p className="text-sm">Transaction ID: {transactionId}</p>

//             {/* Input for Room Number */}
//             <input
//               type="text"
//               placeholder="Enter Room Number"
//               value={room_number}
//               onChange={(e) => setRoomNumber(e.target.value)}
//               className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
//             />

//             {/* OTP Input Field */}
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9] mt-4"
//             />
            
//             <button
//               onClick={handleSubmitOtp}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Verifying OTP..." : "Submit OTP"}
//             </button>

//             {error && <p className="text-red-500 mt-2">Error verifying OTP</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitOtp;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const SubmitOtp = () => {
//   const location = useLocation();
//   const { hotel_id, transactionId } = location.state || {};

//   console.log("Hotel ID in SubmitOtp:", hotel_id);
//   console.log("Transaction ID in SubmitOtp:", transactionId);

//   const [formData, setFormData] = useState({
//     otp: "",
//     room_number: "",
//     check_in_time: "",
//     check_out_time: "",
//   });

//   const [submitOtp, { isLoading, error }] = useSubmitAadhaarOTPMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitOtp = async () => {
//     try {
//       const response = await submitOtp({
//         otp: formData.otp,
//         hotel_id,
//         transactionId,
//         room_number: formData.room_number,
//         check_in_time: new Date(formData.check_in_time).toISOString(),  // ✅ Convert to ISO format
//         check_out_time: new Date(formData.check_out_time).toISOString()  // ✅ Convert to ISO format
//       }).unwrap();
  
//       toast.success("OTP Verified Successfully!");
//       console.log("Verification Response:", response);
//     } catch (err) {
//       toast.error("OTP Verification Failed");
//     }
//   };
  
//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url('/loginBG.jpeg')` }}
//     >
//       <div className="text-white flex items-center justify-center h-screen">
//         <div className="p-6 sm:py-8 md:p-10 bg-white rounded-[30px] md:rounded-[50px] w-full max-w-lg">
//           <div className="rounded-[15px] sm:py-4 xs:py-4 md:rounded-[20px] shadow-xl shadow-[#FFFFFF7A] flex flex-col w-full bg-gradient-to-t from-[#004FC2] to-[#00255C] px-4 md:p-20">
//             <h2 className="text-xl font-bold mb-2">Submit Aadhaar OTP</h2>
//             <p className="text-sm">Hotel ID: {hotel_id}</p>
//             <p className="text-sm">Transaction ID: {transactionId}</p>

//             <input
//               type="text"
//               name="room_number"
//               placeholder="Enter Room Number"
//               value={formData.room_number}
//               onChange={handleChange}
//               className="w-full py-2 border-b border-opacity-60 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
//             />
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               value={formData.otp}
//               onChange={handleChange}
//               className="w-full py-2 border-b border-opacity-60 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9] mt-4"
//             />
//             <input
//               type="datetime-local"
//               name="check_in_time"
//               value={formData.check_in_time}
//               onChange={handleChange}
//               className="w-full py-2 border-b border-opacity-60 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9] mt-4"
//             />
//             <input
//               type="datetime-local"
//               name="check_out_time"
//               value={formData.check_out_time}
//               onChange={handleChange}
//               className="w-full py-2 border-b border-opacity-60 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9] mt-4"
//             />
//             <button
//               onClick={handleSubmitOtp}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Verifying OTP..." : "Submit OTP"}
//             </button>
//             {error && <p className="text-red-500 mt-2">Error verifying OTP</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitOtp;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; 
// import { toast } from "react-toastify";
// import { useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const SubmitOtp = () => {
//   const location = useLocation();
//   const { hotel_id, transactionId,aadhaarNumber } = location.state || {}; 
//   const navigate = useNavigate();
// console.log(location);
//   console.log("Hotel ID in SubmitOtp:", hotel_id);
//   console.log("Transaction ID in SubmitOtp:", transactionId);

//   const [formData, setFormData] = useState({
//     otp: "",
//   });

//   const [submitOtp, { isLoading, error }] = useSubmitAadhaarOTPMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitOtp = async () => {
//     const { otp } = formData;

//     // Validate OTP
//     if (!otp || otp.length !== 6 || isNaN(otp)) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       const payload = {
//         otp,
//         hotel_id,
//         transactionId,
//       };

//       const response = await submitOtp(payload).unwrap();
//       toast.success("OTP Verified Successfully!");
//       navigate("/UserDetailForm", {
//         state: { hotel_id, transactionId,aadhaarNumber, response }
//       });
//       console.log("Verification Response:", response);
//     } catch (err) {
//       toast.error(err?.message || "OTP Verification Failed"); // Display specific error message if available
//     }
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url('/loginBG.jpeg')` }}
//     >
//       <div className="text-white flex items-center justify-center h-screen">
//         <div className="p-6 sm:py-8 md:p-10 bg-white rounded-[30px] md:rounded-[50px] w-full max-w-lg">
//           <div className="rounded-[15px] sm:py-4 xs:py-4 md:rounded-[20px] shadow-xl shadow-[#FFFFFF7A] flex flex-col w-full bg-gradient-to-t from-[#004FC2] to-[#00255C] px-4 md:p-20">
//             <h2 className="text-xl font-bold mb-2">Submit Aadhaar OTP</h2>
//             <p className="text-sm">Hotel ID: {hotel_id}</p>
//             <p className="text-sm">Transaction ID: {transactionId}</p>

//             {/* OTP Input Field */}
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               value={formData.otp}
//               onChange={handleChange}
//               className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9] mt-4"
//             />

//             <button
//               onClick={handleSubmitOtp}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Verifying OTP..." : "Submit OTP"}
//             </button>

//             {error && <p className="text-red-500 mt-2">Error verifying OTP</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitOtp;

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";
import { useState } from "react";

const SubmitOtp = () => {
  const location = useLocation();
  const { hotel_id, transactionId, aadhaarNumber } = location.state || {};
  const navigate = useNavigate();

  console.log("Hotel ID in SubmitOtp:", hotel_id);
  console.log("Transaction ID in SubmitOtp:", transactionId);

  const [otp, setOtp] = useState("");
  const [submitOtp, { isLoading, error }] = useSubmitAadhaarOTPMutation();

  const handleSubmitOtp = async () => {
    if (!otp || otp.length !== 6 || isNaN(otp)) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await submitOtp({ otp, hotel_id, transactionId }).unwrap();
      toast.success("OTP Verified Successfully!");
      navigate("/UserDetailForm", {
        state: { hotel_id, transactionId, aadhaarNumber, response },
      });
      console.log("Verification Response:", response);
    } catch (err) {
      toast.error(err?.message || "OTP Verification Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card Container with Small Screen Fixes */}
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm mr-8 md:max-w-md">
        {/* Title */}
        <div className="flex justify-center">
          <img
            src="/justChink.jpeg" // Replace with your company logo path
            alt="Company Logo"
            className="w-32 h-auto"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
          Submit Aadhaar OTP
        </h2>

        {/* Hotel & Transaction ID Info */}
        {/* <p className="text-sm text-gray-600 mt-2 text-center">
          <span className="font-medium">Hotel ID:</span> {hotel_id}
        </p>
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium">Transaction ID:</span> {transactionId}
        </p> */}

        {/* OTP Input Field */}
        <div className="mt-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitOtp}
          className="w-full mt-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Verifying OTP..." : "Submit OTP"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">Error verifying OTP</p>}
      </div>
    </div>
  );
};

export default SubmitOtp;

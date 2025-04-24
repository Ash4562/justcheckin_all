
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useGenerateAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const AadhaarOTPForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   console.log(location);

//   // Extracting hotel_id from pathname
//   const pathParts = location.pathname.split("/");
//   const hotel_id = pathParts.length > 2 ? pathParts[2] : "No Hotel ID Found";
//   console.log("Location Pathname:", location.pathname);
//   console.log("Split Path:", location.pathname.split("/"));
  
//   console.log("Hotel ID in AadhaarOTP:", hotel_id); // Debugging

//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [generateOTP, { data, isLoading, error }] = useGenerateAadhaarOTPMutation();

//   const handleGenerateOTP = async () => {
//     if (!aadhaarNumber || aadhaarNumber.length !== 12) {
//       toast.error("Enter a valid 12-digit Aadhaar number");
//       return;
//     }

//     try {
//       const response = await generateOTP({ aadhaarNumber, hotel_id }).unwrap();
//       const transactionId = response.transactionId;

//       toast.success("OTP Sent Successfully!");
//       navigate("/SubmitOtp", {
//         state: { hotel_id, transactionId, aadhaarNumber },
//       });
//     } catch (err) {
//       toast.error("Failed to send OTP. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
//       {/* Card Container */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
//         <div className="flex justify-center mb-6">
//           <img src="/justChink.jpeg" alt="Company Logo" className="w-20 sm:w-24 h-auto" />
//         </div>

//         <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
//           Generate Aadhaar OTP
//         </h2>

//         {/* Input Field */}
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Enter Aadhaar Number"
//             value={aadhaarNumber}
//             onChange={(e) => setAadhaarNumber(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleGenerateOTP}
//           className="w-full mt-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
//           disabled={isLoading}
//         >
//           {isLoading ? "Generating OTP..." : "Generate OTP"}
//         </button>

//         {/* Error & Success Messages */}
//         {error && <p className="text-red-500 text-sm mt-2">Error generating OTP</p>}
//         {data && (
//           <p className="text-green-500 text-sm mt-2">
//             OTP Sent! Transaction ID: {data.transactionId}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AadhaarOTPForm;

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useGenerateAadhaarOTPMutation, useSubmitAadhaarOTPMutation } from "../../redux/hotelUserApi.jsx/userApi";
// import { FaTrashAlt } from "react-icons/fa";



// const AadharVerify = () => {
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialNumberOfPeople = location.state?.numberOfPeople || 0;
//   const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
//   const [aadharNumbers, setAadharNumbers] = useState([]);
//   const [verified, setVerified] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [transactionIds, setTransactionIds] = useState([]);
//   const [responseData, setResponseData] = useState([]);
//   const [loadingIndex, setLoadingIndex] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(null);
  
//   const [generateOtp] = useGenerateAadhaarOTPMutation();
//   const [submitOtp] = useSubmitAadhaarOTPMutation();

//   useEffect(() => {
//     if (numberOfPeople > 0) {
//       setAadharNumbers(new Array(numberOfPeople).fill(""));
//       setVerified(new Array(numberOfPeople).fill(false));
//     }
//   }, [numberOfPeople]);

//   const handleInputChange = (index, value) => {
//     const formattedValue = value.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
//     setAadharNumbers((prev) => {
//       const updatedNumbers = [...prev];
//       updatedNumbers[index] = formattedValue.slice(0, 14);
//       return updatedNumbers;
//     });
//   };

//   const handleVerify = async (index) => {
//     const aadharNumber = aadharNumbers[index].replace(/\s/g, "");
//     if (aadharNumber.length !== 12) {
//       toast.error("Invalid Aadhaar number!");
//       return;
//     }
  
//     setLoadingIndex(index);
//     try {
//       const response = await generateOtp({
//         aadhaar_number: aadharNumber,
//         consent: "Y", // Ensure consent is explicitly sent
//       }).unwrap();
  
//       setTransactionIds((prev) => {
//         const updatedTransactionIds = [...prev];
//         updatedTransactionIds[index] = response.data.transaction_id;
//         return updatedTransactionIds;
//       });
  
//       setOtp("");
//       setShowModal(true);
//       setSelectedIndex(index);
//       toast.success(response.data.message || "OTP successfully sent!");
//     } catch (error) {
//       console.error("Generate OTP Error:", error);
//       toast.error(error.data?.error?.message || "Something went wrong.");
//     } finally {
//       setLoadingIndex(null);
//     }
//   };

//   const handleSubmitOtp = async () => {
//     if (selectedIndex === null) {
//       toast.error("Please select a valid Aadhaar entry.");
//       return;
//     }

//     const transactionId = transactionIds[selectedIndex];
//     if (!transactionId) {
//       toast.error("Transaction ID missing. Please generate OTP again.");
//       return;
//     }

//     if (!otp || otp.length !== 6) {
//       toast.error("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await submitOtp({
//         otp: parseInt(otp, 10),
//         share_code: "1234",
//         include_xml: true,
//         transaction_id: transactionId,
//       }).unwrap();
      
//       if (response.data.code === "1002") {
//         setResponseData((prevData) => {
//           const updatedData = [...prevData];
//           updatedData[selectedIndex] = response.data.aadhaar_data;
//           return updatedData;
//         });
//         setVerified((prev) => {
//           const updatedVerified = [...prev];
//           updatedVerified[selectedIndex] = true;
//           return updatedVerified;
//         });
//         toast.success("OTP verified successfully!");
//         setShowModal(false);
//       } else {
//         toast.error("OTP verification failed, please try again.");
//       }
//     } catch (error) {
//       toast.error(error.data?.error?.message || "Something went wrong. Please try again.");
//     }
//   };

//   const handleContinue = () => {
//     if (!responseData) {
//       alert("Please verify the OTP first.");
//       return;
//     }
//     navigate("/dashboard", {
//       state: { numberOfPeople, aadhaarData: responseData, aadharNumbers },
//     });
//   };
//   return (
//     <>

//       <div className="relative flex flex-col items-center justify-start min-h-screen pt-10 ">
//         <div className="absolute top-2 right-4 flex">
//           <button
//             onClick={() => handleChangePeople("increase")}
//             className="border border-black text-blue-500 px-3 py-1 rounded-l-full hover:bg-blue-500 hover:text-white transition duration-300 text-sm"
//           >
//             +
//           </button>
//           <button
//             onClick={() => handleChangePeople("decrease")}
//             className="border border-black text-blue-500 px-3 py-1 rounded-r-full hover:bg-blue-500 hover:text-white transition duration-300 text-sm"
//           >
//             -
//           </button>
//         </div>

//         {aadharNumbers.map((aadhar, index) => (
//           <div key={index} className="flex items-center gap-4 w-full max-w-3xl mb-4">
//             <div className="relative border-2 border-blue-500 rounded-full p-2 w-full shadow-md">
//               <div className="flex items-center gap-4">
//                 <input
//                   type="text"
//                   placeholder={`Enter Aadhar Number for Person ${index + 1}`}
//                   value={aadhar}
//                   onChange={(e) => handleInputChange(index, e.target.value)}
//                   maxLength={14}
//                   className="flex-1 md:ml-6 p-3 rounded-full outline-none placeholder:text-gray-400 duration-300 border-0"
//                 />
//                 <button
//                   onClick={() => handleVerify(index)}
//                   className={`px-8 py-2 flex items-center justify-center rounded-full ${aadhar.replace(/\s/g, "").length === 12 && !verified[index]
//                     ? "bg-[#85D200] text-white cursor-pointer"
//                     : "bg-gray-300 cursor-not-allowed"
//                     } transition duration-300`}
//                   disabled={aadhar.replace(/\s/g, "").length !== 12 || verified[index]}
//                 >
//                   {loadingIndex === index ? "Verifying..." : verified[index] ? "Verified" : "Verify"}
//                 </button>
//               </div>
//             </div>
//             <button
//               onClick={() => handleDelete(index)}
//               className="text-red-500 hover:text-red-700 transition duration-200"
//             >
//               <FaTrashAlt size={20} />
//             </button>
//           </div>
//         ))}

//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-fadeIn">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Please enter the OTP sent to your registered mobile number.
//               </p>
//               <input
//                 type="number"
//                 value={otp}
//                 onChange={(e) => {
//                   const value = e.target.value.slice(0, 6);
//                   setOtp(value);
//                 }}
//                 placeholder="Enter OTP"
//                 maxLength={6}
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isSubmitting}
//               />
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => handleSubmitOtp()}
//                   className={`px-4 py-2 rounded-md transition ${isSubmitting
//                     ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                     }`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Verifying..." : "Submit OTP"}
//                 </button>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
//                   disabled={isSubmitting}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center w-full max-w-3xl mt-5">
//           <button
//             onClick={handleContinue}
//             className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300"
//             disabled={verified.filter((v) => v).length !== numberOfPeople}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AadharVerify;



import { motion } from "framer-motion";
import logo from "/justChink.jpeg";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import backgroundImage from "/HomePage.jpeg";
import axios from "axios";
// import { useAddVerifiedDataMutation } from "../../redux/api/AuthAPI";
import toast from "react-hot-toast"
import { useAddVerifiedDataMutation } from "../../redux/hotelUserApi.jsx/userApi";

const AadharVerify = () => {
  const location = useLocation();
  console.log('dafssadfsa',location);
  const navigate = useNavigate();

  const initialNumberOfPeople = location.state?.numberOfPeople || 0;
  const hotel = location.state?.hotel_id || 0;
  console.log(hotel);

  const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
  const [aadharNumbers, setAadharNumbers] = useState([]);
  const [verified, setVerified] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionIds, setTransactionIds] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [addVerifiedData] = useAddVerifiedDataMutation();

  useEffect(() => {
    if (numberOfPeople > 0) {
      setAadharNumbers((prev) => {
        const updatedAadharNumbers = [...prev];
        while (updatedAadharNumbers.length < numberOfPeople) {
          updatedAadharNumbers.push("");
        }
        updatedAadharNumbers.length = numberOfPeople;
        return updatedAadharNumbers;
      });
      setVerified((prev) => {
        const updatedVerified = [...prev];
        while (updatedVerified.length < numberOfPeople) {
          updatedVerified.push(false);
        }
        updatedVerified.length = numberOfPeople;
        return updatedVerified;
      });
    }
  }, [numberOfPeople]);

  const handleInputChange = (index, value) => {
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    const updatedNumbers = [...aadharNumbers];
    updatedNumbers[index] = formattedValue.slice(0, 14);
    setAadharNumbers(updatedNumbers);
  };

  const handleVerify = async (index) => {
    const aadharNumber = aadharNumbers[index].replace(/\s/g, "");

    if (aadharNumber.length !== 12) {
      toast.error("Invalid Aadhaar number!");
      return;
    }

    try {
      setLoadingIndex(index);
      console.log("vvvvv");
      const response = await axios.post(
        "https://api.gridlines.io/aadhaar-api/boson/generate-otp",
        { aadhaar_number: aadharNumber, consent: "Y" },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "nZxozjbCqLfHpwyUAmsTEbZ7QWpHFbW1",
            "X-Auth-Type": "API-Key",
          },
        }
      );
      if (response.data.status === 200 && response.data.data.code === "1001") {
        console.log("OTP Sent:", response.data.data.message);
console.log("fffff");
        setTransactionIds((prev) => {
          const updatedTransactionIds = [...prev];
          updatedTransactionIds[index] = response.data.data.transaction_id;
          return updatedTransactionIds;
        });
        setOtp("");
        setShowModal(true);
        setSelectedIndex(index);

        toast.success(response.data.data.message || "OTP successfully sent!");

        await addVerifiedData({ number: aadharNumber, type: "Aadhar" }).unwrap();
      } else {
        toast.error("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying Aadhaar:", error);

      const errorCode = error.response?.data?.error?.code;

      if (errorCode === "OTP_ALREADY_SENT") {
        toast("OTP already sent. Opening modal...", { icon: "ℹ️" });
        setShowModal(true);
        setSelectedIndex(index);
      } else if (errorCode === "UPSTREAM_INTERNAL_SERVER_ERROR") {
        toast.error(
          "Upstream source/Government source internal server error. Please start the process again"
        );
        return;
      } else {
        toast.error(
          error.response?.data?.error?.message || "Something went wrong."
        );
        console.log(error.response?.data?.error?.message);
      }

      if (error.response?.status !== 500) {
        await addVerifiedData({ number: aadharNumber, type: "Aadhar" }).unwrap();
      }
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleSubmitOtp = async () => {
    if (selectedIndex === null) {
      toast.error("Please select a valid Aadhaar entry.");
      return;
    }

    const transactionId = transactionIds[selectedIndex];
    if (!transactionId) {
      toast.error("Transaction ID missing. Please generate OTP again.");
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    const otpData = { otp: parseInt(otp, 10), share_code: "1234", include_xml: true };

    try {
      const response = await axios.post(
        "https://api.gridlines.io/aadhaar-api/boson/submit-otp",
        otpData,
        {
          headers: {
            "X-Auth-Type": "API-Key",
            "X-Transaction-ID": transactionId,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-API-Key": "nZxozjbCqLfHpwyUAmsTEbZ7QWpHFbW1",
          },
        }
      );

      if (response.data.data.code === "1003" && response.status === 200) {
        toast.error("Session Expired. Please start the process again."); // Use react-hot-toast
        setShowModal(false);
        return;
      }
      console.log("OTP Verified", response);

      if (response.status === 200 && response.data.data.code === "1002") {
        console.log("OTP Verified Successfully!");

        setResponseData((prevData) => {
          const updatedData = [...prevData];
          updatedData[selectedIndex] = response.data.data.aadhaar_data;
          return updatedData;
        });

        setVerified((prev) => {
          const updatedVerified = [...prev];
          updatedVerified[selectedIndex] = true;
          return updatedVerified;
        });

        toast.success("OTP verified successfully!");
        setShowModal(false);
      } else {
        toast.error("OTP verification failed, please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      const errorCode = error.response?.data?.error?.code;
      if (
        errorCode === "TRANSACTION_ALREADY_COMPLETED" ||
        errorCode === "UPSTREAM_INTERNAL_SERVER_ERROR"
      ) {
        setShowModal(false);
      }
      toast.error(
        error.response?.data?.error?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (!responseData) {
      alert("Please verify the OTP first.");
      return;
    }
    const verifiedCount = verified.filter((v) => v).length;
    navigate("/hotelqr/UserDetailForm", {
      state: {hotel,
        verifiedCount, numberOfPeople, aadhaarData: responseData, aadharNumbers },
    });
  };
console.log("hotel",hotel);
  const handleChangePeople = (action) => {
    setNumberOfPeople((prev) => {
      const newCount = action === "increase" ? prev + 1 : Math.max(0, prev - 1);
      return newCount;
    });
  };

  const handleDelete = (index) => {
    console.log("Deleting index: ", index);
    const updatedAadharNumbers = [...aadharNumbers];
    const updatedVerified = [...verified];

    updatedAadharNumbers.splice(index, 1);
    updatedVerified.splice(index, 1);

    setAadharNumbers(updatedAadharNumbers);
    setVerified(updatedVerified);
    setNumberOfPeople((prev) => prev - 1);
  };


  return (
<>
<h2 className="text-2xl text-center font-bold mt-2 mb-4">Aadhar Verification Form</h2>
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className=" flex justify-center  mt-5 "
    >
      <img src={logo} alt="Logo" className="w-34 h-14 sm:w-16 sm:h-16 rounded-full " />
    </motion.div>
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className=" flex justify-center  mt-5 "
    >
      <img src='/verify.gif' alt="Logo" className="w-52 h-auto sm:w-16 sm:h-16 rounded-full " />
    </motion.div>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative flex flex-col items-center justify-start min-h-screen pt-10 bg-cover bg-center px-4 sm:px-6 md:px-8"
  >
    {/* Logo */}

    {/* Increment & Decrement Buttons */}
    <motion.div 
      className="absolute top-16 flex flex-wrap items-center gap-2 sm:gap-4"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <strong className="text-sm sm:text-base">Add OR Remove User</strong>
      <div className="flex">
        <button
          onClick={() => handleChangePeople("increase")}
          className="border border-black text-blue-500 px-3 py-1 rounded-l-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
        >
          +
        </button>
        <button
          onClick={() => handleChangePeople("decrease")}
          className="border border-black text-blue-500 px-3 py-1 rounded-r-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
        >
          -
        </button>
      </div>
    </motion.div>

    {/* Aadhar Input Fields */}
    <div className="w-full max-w-3xl mt-20   items-center">
  
      {aadharNumbers.map((aadhar, index) => (
        <motion.div
          key={index}
          className="flex  sm:flex-row items-center gap-2 sm:gap-4 w-full max-w-md mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className=" border-2 border-blue-500 rounded-full p-2 w-full shadow-md">
            <div className="flex  sm:flex-row items-center gap-2 sm:gap-4">
              <input
                type="text"
                placeholder={`Enter Aadhar Number for Person ${index + 1}`}
                value={aadhar}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={14}
                className="flex-1 p-2 sm:p-3 rounded-full outline-none placeholder:text-gray-400 border-0 text-sm sm:text-base w-full"
              />
              <button
                onClick={() => handleVerify(index)}
                className={`px-4 sm:px-8 py-2 flex items-center justify-center rounded-full transition duration-300 text-sm sm:text-base ${
                  aadhar.replace(/\s/g, "").length === 12 && !verified[index]
                    ? "bg-[#85D200] text-white cursor-pointer hover:scale-105"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={aadhar.replace(/\s/g, "").length !== 12 || verified[index]}
              >
                {loadingIndex === index ? "Verifying..." : verified[index] ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
          <button
            onClick={() => handleDelete(index)}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <FaTrashAlt size={18} />
          </button>
        </motion.div>
      ))}
    </div>

    {/* OTP Modal */}
    {showModal && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md animate-fadeIn">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
          <p className="text-gray-600 text-xs sm:text-sm mb-4">Please enter the OTP sent to your registered mobile number.</p>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            disabled={isSubmitting}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmitOtp}
              className={`px-4 py-2 rounded-md transition text-sm sm:text-base ${
                isSubmitting ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Submit OTP"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition text-sm sm:text-base"
              disabled={isSubmitting}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    )}

    {/* Continue Button */}
    <motion.div className="flex justify-center w-full max-w-3xl mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button
        onClick={handleContinue}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300 text-sm sm:text-base hover:scale-105"
        disabled={verified.filter((v) => v).length !== numberOfPeople}
      >
        Continue
      </button>
    </motion.div>
  </motion.div>
</>

  );
};

export default AadharVerify;

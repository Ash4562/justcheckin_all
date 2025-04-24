

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { MdDeleteForever } from "react-icons/md";
const DrivingLicenseVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialNumberOfPeople = location.state?.numberOfPeople || 0;
  console.log(initialNumberOfPeople);
  const hotel = location.state?.hotel_id || 0;
  const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
  const [licenseNumbers, setLicenseNumbers] = useState([]);
  const [dob, setDob] = useState([]);
  const [consent, setConsent] = useState([]);
  const [verified, setVerified] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [licenseData, setLicenseData] = useState([]);



  useEffect(() => {
    if (numberOfPeople > 0) {
      setLicenseNumbers(Array(numberOfPeople).fill(""));
      setDob(Array(numberOfPeople).fill(""));
      setConsent(Array(numberOfPeople).fill(false));
      setVerified(Array(numberOfPeople).fill(false));
    }
  }, [numberOfPeople]);

  const handleInputChange = (index, value) => {
    const updatedNumbers = [...licenseNumbers];
    updatedNumbers[index] = value.toUpperCase().slice(0, 16);
    setLicenseNumbers(updatedNumbers);
  };

  const handleDobChange = (index, value) => {
    const updatedDob = [...dob];
    updatedDob[index] = value;
    setDob(updatedDob);
  };

  const handleConsentChange = (index) => {
    const updatedConsent = [...consent];
    updatedConsent[index] = !updatedConsent[index];
    setConsent(updatedConsent);
  };


  const handleVerify = async (index) => {
    console.log("Verifying index:", index);

    if (verified[index]) {
        toast.info("License already verified.");
        return;
    }

    const licenseNumber = licenseNumbers[index];
    const dateOfBirth = dob[index];

    if (!licenseNumber || !dateOfBirth || !consent[index]) {
        toast.error("Please enter all required details and give consent.");
        return;
    }

    try {
        setLoadingIndex(index);

        const response = await axios.post(
            `https://api.gridlines.io/dl-api/fetch`,
            {
                driving_license_number: licenseNumber,
                date_of_birth: dateOfBirth,
                source: 1,
                consent: "Y",
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-API-Key": "nZxozjbCqLfHpwyUAmsTEbZ7QWpHFbW1",
                    "X-Auth-Type": "API-Key",
                },
            }
        );

        console.log("Full API Response:", response);

        const licenseInfo = response.data?.data?.driving_license_data;

        if (response.status === 200 && response.data?.status === 200 && licenseInfo) {
            console.log("Verified Data:", licenseInfo);
            setLicenseData((prevData) => [...prevData, licenseInfo]); // ✅ Store multiple verified users
        } else {
            console.log("Invalid response structure:", response.data);
            toast.error("Failed to verify Driving License. Please try again.");
        }
    } catch (error) {
        console.error("Error verifying Driving License:", error);
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoadingIndex(null);
    }
};


const handleDelete = (index) => {
  setLicenseNumbers((prev) => prev.filter((_, i) => i !== index));
  setDob((prev) => prev.filter((_, i) => i !== index));
  setConsent((prev) => prev.filter((_, i) => i !== index));
};

  
  // Log when state updates
  useEffect(() => {
    console.log("Updated License Data:", licenseData);
  }, [licenseData]);
  
  
  const handleChangePeople = (action) => {
    setNumberOfPeople((prev) =>
      action === "increase" ? prev + 1 : Math.max(0, prev - 1)
    );
  };

  return (
    <>
        <h1 className="text-2xl text-center mt-4  font-bold mb-4">Driving Licnies  Verification</h1>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center  mt-5 "
      >
        <img
          src="/justChink.jpeg"
          alt="Company Logo"
          className=" xs:w-36 xs:h-16 sm:w-16 sm:h-16 lg:h-20 lg:w-80 md:h-20 md:w-80 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center mt-5"
      >
        <img
          src="/verify.gif"
          alt="Verification"
          className="w-52 h-auto xs:w-48 xs:h-16 sm:w-16 sm:h-16 lg:h-20 lg:w-40 md:h-auto md:w- rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative  flex flex-col items-center min-h-screen  bottom-11 pt-16 px-4 sm:px-6  md:px-8"
      >
        <motion.div
          className="absolute top-16 flex flex-wrap items-center  gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
         <div className="flex gap-24">
         <strong className="text-sm sm:text-base mx-2">Add OR Remove User</strong>
          <div className="flex   ">
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
         </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
  {licenseNumbers.map((license, index) => (
    <div
      key={index}
      className="w-full sm:w-96 border-2 mt-5 border-[#0060EC] bg-white rounded-2xl p-6 "
    >
      <h1 className="text-xl w-32 font-bold -mt-12  text-center bg-white p-2 rounded-md">
        User {index + 1}
      </h1>

      <div className="flex flex-col gap-4">
        {/* License Input */}
        <input
          type="text"
          placeholder="Enter Driving License"
          value={license}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 w-full transition-all"
        />

        {/* DOB Input */}
        <input
          type="date"
          value={dob[index] || ""}
          onChange={(e) => handleDobChange(index, e.target.value)}
          className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 w-full transition-all"
        />

        {/* Consent Checkbox */}
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={consent[index] || false}
            onChange={() => handleConsentChange(index)}
            className="accent-blue-500"
          />
          Verification.
        </label>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleVerify(index)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-all"
          >
            {loadingIndex === index ? "Verifying..." : "Verify"}
          </button>

          <button
            onClick={() => handleDelete(index)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>




        <motion.div
          className="flex justify-center w-full max-w-3xl mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => navigate("/hotelqr/DLUserDetails", { state: { licenseData,hotel ,initialNumberOfPeople} })}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            View Full Details
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default DrivingLicenseVerify;











// import { motion } from "framer-motion";
// import logo from "/justChink.jpeg";
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import axios from "axios";

// import toast from "react-hot-toast"
// import { useAddVerifiedDataMutation } from "../../redux/hotelUserApi.jsx/userApi";

// const DrivingLicniesVerify = () => {
//   const location = useLocation();
//   console.log('dafssadfsa',location);
//   const navigate = useNavigate();

//   const initialNumberOfPeople = location.state?.numberOfPeople || 0;
//   const hotel = location.state?.hotel_id || 0;
//   console.log(hotel);

//   const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);

// const [licenseNumbers, setLicenseNumbers] = useState([]);
// const [dob, setDob] = useState([]);
// const [consent, setConsent] = useState([]);
//   const [verified, setVerified] = useState([]);




//   const [loadingIndex, setLoadingIndex] = useState(null);

//   const [addVerifiedData] = useAddVerifiedDataMutation();

//   useEffect(() => {
//     if (numberOfPeople > 0) {
//       setLicenseNumbers((prev) => {
//         const updatedLicenseNumbers = [...prev];
//         while (updatedLicenseNumbers.length < numberOfPeople) {
//           updatedLicenseNumbers.push("");
//         }
//         updatedLicenseNumbers.length = numberOfPeople;
//         return updatedLicenseNumbers;
//       });
  
//       setDob((prev) => {
//         const updatedDob = [...prev];
//         while (updatedDob.length < numberOfPeople) {
//           updatedDob.push("");
//         }
//         updatedDob.length = numberOfPeople;
//         return updatedDob;
//       });
  
//       setVerified((prev) => {
//         const updatedVerified = [...prev];
//         while (updatedVerified.length < numberOfPeople) {
//           updatedVerified.push(false);
//         }
//         updatedVerified.length = numberOfPeople;
//         return updatedVerified;
//       });
//     }
//   }, [numberOfPeople]);
  
//   const handleInputChange = (index, value) => {
//     const updatedNumbers = [...licenseNumbers];
//     updatedNumbers[index] = value.toUpperCase().slice(0, 16); // DL number format
//     setLicenseNumbers(updatedNumbers);
//   };
  
//   const handleDobChange = (index, value) => {
//     const updatedDob = [...dob];
//     updatedDob[index] = value;
//     setDob(updatedDob);
//   };
  
//   const handleConsentChange = (index) => {
//     const updatedConsent = [...consent];
//     updatedConsent[index] = !updatedConsent[index];
//     setConsent(updatedConsent);
//   };
  
//   const handleVerify = async (index) => {
//     const licenseNumber = licenseNumbers[index];
//     const dateOfBirth = dob[index];
  
//     if (!licenseNumber || !dateOfBirth || !consent[index]) {
//       toast.error("Please enter all required details and give consent.");
//       return;
//     }
  
//     try {
//       setLoadingIndex(index);
  
//       const response = await axios.post(
//         "https://api.gridlines.io/dl-api/fetch",
//         {
//           driving_license_number: licenseNumber,
//           date_of_birth: dateOfBirth,
//           source: 1,
//           consent: "Y"
//         },
//         {
//           headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             "X-API-Key": "nZxozjbCqLfHpwyUAmsTEbZ7QWpHFbW1",
//             "X-Auth-Type": "API-Key",
//           },
//         }
//       );
  
//       if (response.status === 200 && response.data.success) {
//         toast.success("Driving License Verified Successfully!");
  
//         setVerified((prev) => {
//           const updatedVerified = [...prev];
//           updatedVerified[index] = true;
//           return updatedVerified;
//         });
  
//         await addVerifiedData({ number: licenseNumber, type: "DrivingLicense" }).unwrap();
//       } else {
//         toast.error("Failed to verify Driving License. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error verifying Driving License:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoadingIndex(null);
//     }
//   };
  
  

  

//   const handleChangePeople = (action) => {
//     setNumberOfPeople((prev) => {
//       const newCount = action === "increase" ? prev + 1 : Math.max(0, prev - 1);
//       return newCount;
//     });
//   };




//   return (
// <>
//     <motion.div
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 1 }}
//       className=" flex justify-center  mt-5 "
//     >
//       <img src={logo} alt="Logo" className="w-34 h-14 sm:w-16 sm:h-16 rounded-full " />
//     </motion.div>
//     <motion.div
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 1 }}
//       className=" flex justify-center  mt-5 "
//     >
//       <img src='/verify.gif' alt="Logo" className="w-52 h-auto sm:w-16 sm:h-16 rounded-full " />
//     </motion.div>
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1 }}
//     className="relative flex flex-col items-center justify-start min-h-screen pt-10 bg-cover bg-center px-4 sm:px-6 md:px-8"
//   >
//     {/* Logo */}

//     {/* Increment & Decrement Buttons */}
//     <motion.div 
//       className="absolute top-16 flex flex-wrap items-center gap-2 sm:gap-4"
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }}
//     >
//       <strong className="text-sm sm:text-base">Add OR Remove User</strong>
//       <div className="flex">
//         <button
//           onClick={() => handleChangePeople("increase")}
//           className="border border-black text-blue-500 px-3 py-1 rounded-l-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
//         >
//           +
//         </button>
//         <button
//           onClick={() => handleChangePeople("decrease")}
//           className="border border-black text-blue-500 px-3 py-1 rounded-r-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
//         >
//           -
//         </button>
//       </div>
//     </motion.div>

//     {/* Aadhar Input Fields */}
//     <div className="w-full max-w-3xl mt-20   items-center">
//     {licenseNumbers.map((license, index) => (
//   <div key={index} className="flex flex-col gap-2">
//     {/* Driving License Number Input */}
//     <input
//       type="text"
//       placeholder="Enter Driving License Number"
//       value={license}
//       onChange={(e) => handleInputChange(index, e.target.value)}
//       className="border p-2 rounded-md w-full"
//     />

//     {/* Date of Birth Input */}
//     <input
//       type="date"
//       placeholder="Enter Date of Birth"
//       value={dob[index] || ""}
//       onChange={(e) => handleDobChange(index, e.target.value)}
//       className="border p-2 rounded-md w-full"
//     />

//     {/* Consent Checkbox */}
//     <label className="flex items-center gap-2">
//       <input
//         type="checkbox"
//         checked={consent[index] || false}
//         onChange={() => handleConsentChange(index)}
//       />
//       I give my consent for verification.
//     </label>

//     {/* Verify Button */}
//     <button
//       onClick={() => handleVerify(index)}
//       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//     >
//       {loadingIndex === index ? "Verifying..." : "Verify License"}
//     </button>
//   </div>
// ))}

//     </div>



//     {/* Continue Button */}
//     <motion.div className="flex justify-center w-full max-w-3xl mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <button
//         // onClick={handleContinue}
//         className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300 text-sm sm:text-base hover:scale-105"
//         disabled={verified.filter((v) => v).length !== numberOfPeople}
//       >
//         Continue
//       </button>
//     </motion.div>
//   </motion.div>
// </>

//   );
// };

// export default DrivingLicniesVerify;

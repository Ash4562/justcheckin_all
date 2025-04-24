// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import backgroundImage from "/HomePage.jpeg";
// import toast from "react-hot-toast";

// const NumberOfUsers = () => {
//     const [numberOfPeople, setNumberOfPeople] = useState(''); 
//     const [isValid, setIsValid] = useState(false); 
//     const [isVerified, setIsVerified] = useState(false);
//     const [verificationMessage, setVerificationMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const location = useLocation();

//     const pathParts = location.pathname.split("/");
//     const hotel_id = pathParts.length > 2 ? pathParts[2] : "No Hotel ID Found";

//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         if (!isLoggedIn) {
//             toast.error('Please login first');
//             return;
//         }
//         const value = e.target.value.replace(/\D/g, ''); 
//         setNumberOfPeople(value);
//         setIsValid(value.length > 0); 
//     };

//     const handleVerify = () => {
//         if (isValid) {
//             setLoading(true);
//             setTimeout(() => {
//                 setLoading(false);
//                 setVerificationMessage('Verified');
//                 setIsVerified(true);
//             }, 2000);
//         }
//     };

//     const handleContinue = () => {
//         navigate('/AadhaarOTP', { state: { hotel_id, numberOfPeople: parseInt(numberOfPeople, 10) } });
//     };

//     return (
//         <div    style={{ backgroundImage: `url(${backgroundImage})` }} className="w-full h-screen p-3 relative flex flex-col items-center overflow-hidden">
//             <div
//                 className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
//                 style={{ backgroundImage: `url(${backgroundImage})` }}
//             ></div>

//             <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 overflow-hidden">
//                 <div className="bg-white rounded-full shadow-xl shadow-blue-700 text-center w-full max-w-lg p-3">
//                     <div className="flex items-center gap-2 sm:gap-4">
//                         <input
//                             type="text"
//                             placeholder="Enter Number Of People"
//                             className="flex-1 ml-2 sm:ml-6 p-2 rounded-full border-gray-300 outline-none text-sm sm:text-base"
//                             value={numberOfPeople}
//                             onChange={handleInputChange}
//                             disabled={!isLoggedIn} 
//                         />
//                         <button
//                             className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${isValid && isLoggedIn ? 'hover:bg-[#85D200] bg-[#85D200] text-white' : 'bg-gray-300 cursor-not-allowed'} transition duration-300`}
//                             onClick={handleVerify}
//                             disabled={!isValid || !isLoggedIn}
//                         >
//                             <i className="fas fa-arrow-right text-white text-lg sm:text-2xl">next</i>
//                         </button>
//                     </div>
//                 </div>

//                 {loading && (
//                     <div className="mt-4 flex items-center justify-center gap-2">
//                         <div className="spinner w-8 h-8 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                         <span className="text-sm sm:text-lg text-gray-700">Verifying...</span>
//                     </div>
//                 )}

//                 {numberOfPeople && !loading && !isVerified && (
//                     <p className="text-black font-bold mt-4 text-sm sm:text-lg">
//                         Number of people: <span className="font-semibold">{numberOfPeople}</span> entered successfully.
//                     </p>
//                 )}

//                 {verificationMessage && !loading && (
//                     <p className="text-black mt-4 text-sm sm:text-lg">
//                         {verificationMessage} <span className="font-semibold">Proceed to next step!</span>
//                     </p>
//                 )}

//                 {isVerified && !loading && (
//                     <button
//                         onClick={handleContinue}
//                         className="px-6 sm:px-8 py-2 mt-6 sm:mt-10 rounded-full hover:bg-[#85D200] bg-blue-600 text-white hover:text-white transition duration-300 text-sm sm:text-base flex items-center gap-2"
//                     >
//                         Continue <i className="fas fa-arrow-right"></i>
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NumberOfUsers;



// ye adhhaar k baise pre iya hai


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // Import animation
// import backgroundImage from "/bg-hotel.png";
// import logo from "/justChink.jpeg";
// import toast from "react-hot-toast";

// const NumberOfUsers = () => {
//   const [numberOfPeople, setNumberOfPeople] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathParts = location.pathname.split("/");
//   const hotel_id = pathParts.length > 2 ? pathParts[2] : "No Hotel ID Found";

//   const titleText = "Enter Number of People"; // Typing text

//   useEffect(() => {
//     if (numberOfPeople.length > 0) {
//       setTimeout(() => {
//         navigate("/AadhaarOTP", { state: { hotel_id, numberOfPeople: parseInt(numberOfPeople, 10) } });
//       }, 1000);
//     }
//   }, [numberOfPeople, navigate, hotel_id]);

//   const handleInputChange = (e) => {
//     if (!isLoggedIn) {
//       toast.error("Please login first");
//       return;
//     }
//     const value = e.target.value.replace(/\D/g, "");
//     setNumberOfPeople(value);
//   };

//   return (
//     <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
//       {/* Background with Zoom & Opacity Effect */}
//       <motion.div
//   className="absolute inset-0 bg-cover bg-center"
//   style={{ backgroundImage: `url(${backgroundImage})` }}
//   initial={{ opacity: 0.7, scale: 1 }}
//   animate={{ opacity: 1, scale: 1.05 }}
//   transition={{ duration: 1.5 }}
//   whileHover={{ opacity: 0.9, scale: 1.1 }} // 👈 Hover Effect
// ></motion.div>

//       {/* Overlay */}


//       {/* Main Card */}
//       <motion.div
//         className="relative bg-white/10 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md sm:max-w-lg text-center"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//          whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }} 
//   whileTap={{ scale: 0.95 }} // 
//       >
//         {/* Logo */}
//         <motion.div
//           className="flex justify-center mb-14"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <img src={logo} alt="Company Logo" className="w-48 h-auto sm:w-20  rounded-full shadow-md" />
//         </motion.div>


//         {/* Typing Animation Title */}
//         <motion.h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
//           {titleText.split("").map((char, index) => (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               {char}
//             </motion.span>
//           ))}
//         </motion.h2>

//         {/* Input Field */}
//         <motion.div
//           className="flex items-center gap-2 sm:gap-4 mt-6 bg-gray-100 p-2 rounded-full shadow-inner"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <input
//             type="text"
//             placeholder="Typing..."
//             className="flex-1 bg-transparent p-2 text-gray-700 outline-none text-sm sm:text-base animate-pulse"
//             value={numberOfPeople}
//             onChange={handleInputChange}
//             disabled={!isLoggedIn}
//           />
//         </motion.div>

//         {/* Redirect Message */}
//         {numberOfPeople && (
//           <motion.p
//             className="text-blue-600 font-medium mt-4 text-sm sm:text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             Redirecting...
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default NumberOfUsers;




import { FaArrowRight } from "react-icons/fa6";
import backgroundImage from "/bg-hotel.png";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const VerificationCards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const hotel_id = pathParts.length > 3 ? pathParts[3] : "No Hotel ID Found";
  console.log("hotel id",hotel_id);

  const [selectedCard, setSelectedCard] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const cards = [
    { id: 1, title: "Aadhaar", image: "/aadhaar.png", path: "/hotelqr/AadhaarOTP" },
    { id: 2, title: "Driving License", image: "/license.png", path: "/hotelqr/driving" },
    { id: 3, title: "Passport", image: "/passport.png", path: "/hotelqr/Passportverify" },
    { id: 4, title: "Voter ID", image: "/badge.png", path: "/hotelqr/VotingIdVerifying" },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setNumberOfPeople(""); // Reset input when selecting a new card
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    setNumberOfPeople(value); // Update state with filtered value
  };

  const handleNavigate = () => {
    if (selectedCard && numberOfPeople) {
      navigate(selectedCard.path, {
        state: {
          hotel_id,
          numberOfPeople: parseInt(numberOfPeople, 10),
        },
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-100 p-4">
   <img
            src="/justChink.jpeg" // Replace with your company logo path
            alt="Company Logo"
            className="w-48 h-auto mt-4 rounded-3xl  mx-auto"
          />
    {/* Grid Container with Equal-Sized Cards */}
   <div className="  text-2xl  my-9 mb-24">
   <strong className="text-white py-10 ">Select One Document To Verified</strong>
   </div>
   <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10 w-full max-w-5xl">
  {cards.map((card) => (
    <motion.div
      key={card.id}
      className={`h-full flex flex-col justify-between items-center rounded-2xl shadow-lg bg-white p-4 text-center cursor-pointer min-h-[180px] ${
        selectedCard?.id === card.id ? 'border-4 border-blue-500' : ''
      }`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: card.id * 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
      onClick={() => handleCardClick(card)}
    >
      {/* Image with fixed size */}
      <img className="w-20 h-20 object-contain rounded-2xl aspect-square" src={card.image} alt={card.title} />

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>
    </motion.div>
  ))}
</div>
  
    {/* Input Section */}
    {selectedCard && (
      <div className="mt-6  bg-white border-0 border-e-white p-2 flex shadow-lg rounded-full text-center w-full max-w-md">
       <input
  type="text"
  placeholder="Enter number of people"
  className="w-full p-2 bg-white border-none outline-none"
  value={numberOfPeople}
  onChange={handleInputChange}
/>

        <button className=" p-3 rounded-full bg-green-500 text-white hover:bg-green-600" onClick={handleNavigate}>
          <FaArrowRight className="text-white" />
        </button>
      </div>
    )}
  </div>
  
  );
};

export default VerificationCards;

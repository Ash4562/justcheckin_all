
import { FaArrowRight } from "react-icons/fa6";
import backgroundImage from "/bg-hotel.png";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const VerificationCards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const hotel_id = pathParts.length > 2 ? pathParts[2] : "No Hotel ID Found";

  const [selectedCard, setSelectedCard] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const cards = [
    { id: 1, title: "Aadhaar", image: "/aadhaar.png", path: "/hotel/dashboard/AadharVerify" },
    { id: 2, title: "Driving License", image: "/license.png", path: "/hotel/dashboard/driving" },
    { id: 3, title: "Passport", image: "/passport.png", path: "/hotel/dashboard/Passportverify" },
    { id: 4, title: "Voter ID", image: "/badge.png", path: "/hotel/dashboard/VotingIdVerifying" },
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
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-100 ">
  
    {/* Grid Container with Equal-Sized Cards */}
   <div className="  text-2xl   mb-24">
   <strong className="text-white  ">Select One Document To Verified</strong>
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

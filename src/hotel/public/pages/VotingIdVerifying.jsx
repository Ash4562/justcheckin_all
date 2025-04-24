import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import backgroundImage from "/bg-hotel.png";

const VotingIdVerifying = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const initialNumberOfPeople = location.state?.numberOfPeople || 0;
  const hotel = location.state?.hotel_id || 0;

  const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
  const [voterIds, setVoterIds] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [verifiedData, setVerifiedData] = useState([]);

  useEffect(() => {
    if (numberOfPeople > 0) {
      setVoterIds(Array(numberOfPeople).fill(""));
    }
  }, [numberOfPeople]);

  const handleVoterIdChange = (index, value) => {
    const updatedVoterIds = [...voterIds];
    updatedVoterIds[index] = value.toUpperCase();
    setVoterIds(updatedVoterIds);
  };

  const handleDelete = (index) => {
    setVoterIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVerify = async (index) => {
    console.log("Verifying index:", index);

    const voterId = voterIds[index];

    if (!voterId) {
      toast.error("❌ Please enter a valid Voter ID.");
      return;
    }

    try {
      setLoadingIndex(index);

      const response = await axios.post(
        `https://api.gridlines.io/voter-api/boson/fetch`,
        {
          voter_id: voterId,
          consent: "Y", // Consent is no longer required from user input
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

      const voterInfo = response.data?.data;

      if (response.status === 200 && response.data?.status === 200 && voterInfo) {
        console.log("Verified Data:", voterInfo);
        setVerifiedData((prevData) => [...prevData, voterInfo]);
        toast.success("✅ Voter ID verified successfully!");
      } else {
        console.log("Invalid response structure:", response.data);
        toast.error("❌ Failed to verify Voter ID. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error verifying Voter ID:", error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };
  const handleChangePeople = (action) => {
    setNumberOfPeople((prev) =>
      action === "increase" ? prev + 1 : Math.max(0, prev - 1)
    );
  };
  return (
    <motion.div
    style={{ backgroundImage: `url(${backgroundImage})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center min-h-screen pt-10 text-white px-4"
    >
      <h1 className="text-xl font-bold">Voter ID Verification</h1>
      {/* <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center mt-5"
      >
        <img
          src="/justChink.jpeg"
          alt="Company Logo"
          className="w-34 h-14 sm:w-16 sm:h-16 rounded-full"
        />
      </motion.div> */}

      <motion.div
  
  
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center mt-5"
      >
        <img
          src="/verify.gif"
          alt="Verification"
          className="w-52 h-auto sm:w-16 sm:h-16 lg:w-36 lg:h-36 "
        />
      </motion.div>
      <div className="flex gap-24">
         <strong className="text-sm sm:text-base mx-2 text-white">Add OR Remove User</strong>
          <div className="flex text-white  ">
            <button
              onClick={() => handleChangePeople("increase")}
              className="border border-white text-white px-3 py-1 rounded-l-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
            >
              +
            </button>
            <button
              onClick={() => handleChangePeople("decrease")}
              className="border border-white text-white px-3 py-1 rounded-r-full hover:bg-blue-500 hover:text-white transition duration-300 text-xs sm:text-sm"
            >
              -
            </button>
          </div>
         </div>
      <div className="w-full max-w-3xl mt-5 items-center">
        {voterIds.map((voterId, index) => (
          <div key={index} className="flex flex-row border-4 border-blue-300 rounded-full  p-2 mt-2  gap-2">
            <input
              type="text"
              placeholder="Enter Voter ID"
              value={voterId}
              onChange={(e) => handleVoterIdChange(index, e.target.value)}
              className=" p-2 rounded-2xl text-black w-full border-none outline-none"
            />

            <button
              onClick={() => handleVerify(index)}
              className="bg-green-500 text-white px-4 py-2 rounded-full"
            >
              {loadingIndex === index ? "Verifying..." : "Verify"}
            </button>

            <button onClick={() => handleDelete(index)} className=" rounded-full text-red-500">
              <MdDeleteForever size={24} />
            </button>
          </div>
        ))}
      </div>

      <motion.div
        className="flex justify-center w-full max-w-3xl mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => navigate("/VotingIdUserDetail", { state: { verifiedData,voterIds, hotel, initialNumberOfPeople } })}
          className="bg-blue-300 text-white px-4 py-2 rounded-md"
        >
          View Full Details
        </button>
      </motion.div>
    </motion.div>
  );
};

export default VotingIdVerifying;

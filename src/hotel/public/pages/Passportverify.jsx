import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import backgroundImage from "/bg-hotel.png";

const PassportVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialNumberOfPeople = location.state?.numberOfPeople || 0;
  const hotel = location.state?.hotel_id || "";
  const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
  const [fileNumbers, setFileNumbers] = useState([]);
  const [dob, setDob] = useState([]);
  const [consent, setConsent] = useState([]);
  const [verified, setVerified] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [passportData, setPassportData] = useState([]);
  console.log(passportData);

  useEffect(() => {
    if (numberOfPeople > 0) {
      setFileNumbers(Array(numberOfPeople).fill(""));
      setDob(Array(numberOfPeople).fill(""));
      setConsent(Array(numberOfPeople).fill(false));
      setVerified(Array(numberOfPeople).fill(false));
    }
  }, [numberOfPeople]);

  const handleInputChange = (index, value) => {
    const updatedNumbers = [...fileNumbers];
    updatedNumbers[index] = value.toUpperCase().slice(0, 15);
    setFileNumbers(updatedNumbers);
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
    if (verified[index]) {
      toast.info("Passport already verified.");
      return;
    }

    const fileNumber = fileNumbers[index];
    const dateOfBirth = dob[index];

    if (!fileNumber || !dateOfBirth || !consent[index]) {
      toast.error("Please enter all required details and give consent.");
      return;
    }

    try {
      setLoadingIndex(index);
      const response = await axios.post(
        "https://api.gridlines.io/passport-api/fetch",
        {
          file_number: fileNumber,
          date_of_birth: dateOfBirth,
          consent: "Y",
        },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Key': "nZxozjbCqLfHpwyUAmsTEbZ7QWpHFbW1",
                'X-Auth-Type': 'API-Key',
              }
        }
      );

      const passportInfo = response.data?.data;
      if (response.status === 200 && response.data?.status === 200 && passportInfo) {
        setPassportData((prevData) => [...prevData, passportInfo]);
        toast.success("Passport verified successfully.");
      } else {
        toast.error("Failed to verify Passport. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleDelete = (index) => {
    setFileNumbers((prev) => prev.filter((_, i) => i !== index));
    setDob((prev) => prev.filter((_, i) => i !== index));
    setConsent((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div style={{ backgroundImage: `url(${backgroundImage})` }} className="flex flex-col items-center min-h-screen py-16">
      <h1 className="text-2xl font-bold mb-4">Passport Verification</h1>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center "
      >
        <img
          src="/justChink.jpeg"
          alt="Company Logo"
          className="w-34 h-14 sm:w-16 sm:h-16 rounded-full"
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
          className="w-52 h-auto sm:w-16 sm:h-16 rounded-full"
        />
      </motion.div>
      <div className="flex gap-24 mb-4">
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
      <div className="flex flex-wrap justify-center gap-6">
        {fileNumbers.map((fileNumber, index) => (
          <div key={index} className="w-full sm:w-96 border-2 border-blue-500 bg-white rounded-2xl p-6">
            <h1 className="text-xl font-bold text-center">User {index + 1}</h1>

            <input
              type="text"
              placeholder="Enter Passport File Number"
              value={fileNumber}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="border p-2 rounded w-full mt-3"
            />

            <input
              type="date"
              value={dob[index] || ""}
              onChange={(e) => handleDobChange(index, e.target.value)}
              className="border p-2 rounded w-full mt-3"
            />

            <label className="flex items-center gap-2 text-gray-700 mt-3">
              <input
                type="checkbox"
                checked={consent[index] || false}
                onChange={() => handleConsentChange(index)}
                className="accent-blue-500"
              />
              Verification Consent
            </label>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleVerify(index)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {loadingIndex === index ? "Verifying..." : "Verify"}
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                <MdDeleteForever size={18} />
              </button>
            </div>
          </div>
        ))}
        
      </div>
      <button
            onClick={() => navigate("/PassportVerifyUser", { state: { passportData,hotel ,initialNumberOfPeople} })}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
          >
            Submit
          </button>
    </motion.div>
    

  );
};

export default PassportVerify;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TS from '/TS.png';
import axios from 'axios';

function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {   
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEDN_URL}/api`, formData); 
      console.log(response.data);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div id="contact" className="font-sans px-6 sm:px-1 py-10">
      <div className="grid grid-cols-1 gap-x-7 sm:grid-cols-2">
        <div>
          <img className="h-48 mx-auto sm:mx-0 sm:ml-10" src="/c.png" alt="JustCheckIn Logo" />
          <h1 className="font-semibold text-3xl sm:text-4xl sm:ml-24 text-blue-600 my-5 text-center sm:text-left">
            Join JustCheckIn Today
          </h1>
          <p className="text-gray-700 tracking-wide text-lg sm:text-xl sm:ml-24 text-center sm:text-left px-4 sm:px-0">
            Revolutionize your hotel’s check-in process with secure and seamless authentication.
          </p>
        </div>

        <div className="pt-12 sm:mt-0">
          <h2 className="text-2xl sm:text-3xl xl:pl-24 font-medium text-center sm:text-left mb-4">Contact Us</h2>

          <form onSubmit={handleSubmit} className="flex flex-col items-center xl:pl-20 sm:items-start">
            <input
              className="h-14 pl-4 border w-full max-w-[380px] sm:max-w-[500px] xl:max-w-[580px] rounded-lg text-lg font-medium"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="h-14 w-full max-w-[380px] sm:max-w-[500px] xl:max-w-[580px] pl-4 border mt-4 rounded-lg text-lg font-medium"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-[380px] sm:max-w-[590px]">
              <button
                className="bg-blue-600 text-white w-full xl:w-[280px] sm:w-60 text-lg font-medium h-14 rounded-lg"
                type="submit"
              >
                Enquire
              </button>
              <button className="bg-customGreen text-white w-full xl:w-[290px] sm:w-[250px] text-lg font-medium h-14 rounded-lg">
                Download App
              </button>
            </div>

            {status && <p className="mt-4 text-blue-700">{status}</p>}
          </form>
        </div>
      </div>

      <div className="border-b border-blue-500 mx-6 sm:mx-12 my-8"></div>

      <div className="flex flex-col sm:flex-row justify-between sm:pl-16 items-center sm:text-sm text-center sm:text-left w-full">
        <p className="text-lg sm:text-base font-normal ">&copy; All rights reserved.</p>
      
        <Link to="/privacy-policy">
          <button className="pb-0 sm:pb-6 pt-5 sm:ml-28 hover:text-blue-700 text-[18px] font-normal">
            Privacy Policy | Terms & Conditions
          </button>
        </Link>
        <div className="flex items-center sm:px-12 mt-4 sm:mt-0">
          <p className="text-lg sm:text-base mr-3 pl-10">Developed By</p>
          <a href="https://techsuryaitsolution.com/" target="_blank" rel="noopener noreferrer">
            <img className="h-14 sm:h-12 mt-2" src={TS} alt="Tech Surya Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

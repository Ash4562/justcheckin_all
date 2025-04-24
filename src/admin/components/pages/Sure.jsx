import React, { useState } from "react";

function Sure() {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    setMessage("Profile Deleted Successfully !!");
    setIsVisible(false); // Hide the initial modal

    // Show the confirmation message for 3 seconds and then hide it
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000); // Close the confirmation message after 3 seconds
  };

  const handleCancel = () => {
    setIsVisible(false); // Hide the modal when Cancel is clicked
  };

  if (!isVisible && !showConfirmation) {
    return null; // Don't render anything if both modals are hidden
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        {/* Message Popup */}
        <div className="w-96 p-8 rounded-full bg-white shadow-lg text-center">
          {/* Message */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            {message}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      {/* White Card */}
      <div className="w-96 p-8 rounded-full bg-white shadow-lg text-center">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Are you sure you want to delete this profile?
        </h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-1 bg-[#85d200] text-white rounded-full hover:bg-green-600 transition duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="px-6 py-1 bg-[#0060ec] text-white rounded-full hover:bg-blue-400 transition duration-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sure;

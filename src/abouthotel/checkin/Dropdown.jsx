import React, { useState } from 'react';

function Dropdown() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      question: "What is JustCheckIn and why is it important for hotels?",
      answer: "JustCheckIn is a smart guest verification system designed to enhance hotel security and streamline check-ins. By using government-issued IDs like Aadhaar, Passport, PAN, or Driving License, hotels can ensure compliance and improve guest trust.",
    },
    {
      question: "How does guest verification work in JustCheckIn?",
      answer: "Guests can verify their identity by uploading valid documents like Aadhaar, Passport, PAN, Voter ID, or Driving License. Our system validates these instantly, saving time and ensuring authenticity.",
    },
    {
      question: "Is JustCheckIn compliant with local hotel regulations?",
      answer: "Yes, JustCheckIn helps hotels meet KYC and regulatory requirements by storing and verifying guest data securely and efficiently.",
    },
    {
      question: "What are the benefits of using JustCheckIn for hotels and guests?",
      answer: "Hotels benefit from faster check-ins, reduced fraud, and better compliance. Guests enjoy a smoother experience with quicker room access and digital documentation.",
    }
  ];

  return (
    <div id="faq" className='bg-customGreen font-sans xl:pt-5 xl:pb-10 pb-20 pt-7 px-4 flex flex-col items-center'>
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-[18px] mt-6 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[715px] p-4 sm:p-5 cursor-pointer transition-all ${openIndex === index ? 'bg-white text-[#170F49]' : 'bg-white'}`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className='flex justify-between items-center'>
            <h1 className='text-[24px]  sm:text-[16px] md:text-[18px] lg:text-[22px] font'>{item.question}</h1>
            <img
              src={openIndex === index ? '/blue.png' : '/white.png'}
              alt='Arrow'
              className='h-6 w-6 sm:h-9 sm:w-9 md:h-12 md:w-12 transition-transform'
            />

          </div>
          {openIndex === index && <p className='mt-3 text-[#6F6C90] text-2xl sm:text-sm md:text-base'>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 items-center sm:h-screen py-">

      <div className="flex justify-center">
        <img
          className="h-[370px] sm:h-[500px] p md:h-[450px] max-w-full object-contain"
          src="/iphone2.png"
          alt="About Us"
        />
      </div>


      <div className="sm:pt-2 px-5 sm:px-10">
        <h2 className="font-semibold text-[25px] md:text-3xl pt-10 text-center sm:text-left">
          About Us
        </h2>
        <p style={{ lineHeight: '37px' }} className=" text-[18px] sm:text-[18px] md:text-[15px] sm:tracking-[2px] xl:mr-[13px] leading-10  text-center sm:text-left sm:mt-2">
          JustCheckIn is a modern solution for hotels to enhance security and efficiency.
          By allowing <br /> guests to verify their identity through Aadhaar, PAN, Passport, or
          Driving License, hotels can <br /> ensure authenticity and compliance with regulations
          while improving guest experience.
        </p>

      </div>
    </div>
  )
}

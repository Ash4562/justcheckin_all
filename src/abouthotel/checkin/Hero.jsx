import React from "react";

function Hero() {
  return (
    <div id="home" className="font-sans sm:pt-16 h-screen  bg-gradient-to-r from-blue-500 via-blue-700 to-blue-950 flex flex-col justify-center px-6 sm:ps-16">
      <h1 className="text-[28px] text-[#87D100] text-left xl:pt-0  sm:mt-10 xl:text-5xl sm:text-4xl pt-10 md:text-[40px] font-semibold text-new  md:text-left">
        JustCheckIn: The Future of Hotel Check-ins
      </h1>

      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div className="text-center md:text-left">
          <h2 className="xl:pt-2 text-2xl xl:text-4xl text-left  sm:text-2xl text-white xl:leading-[55px] leading-[45px] sm:leading-[40px]">
            Secure, Fast, and Hassle-Free Authentication
          </h2>

          <p className="text-[#FFFFFFB5] text-lg sm:text-lg text-left xl:text-[25px] pt-3 sm:tracking-wide sm:leading-[32px] sm:px-0">
            JustCheckIn allows hotels to streamline their check-in process with
            instant identity verification, ensuring secure and seamless guest
            management.
          </p>

          <div className="hidden xl:pb-10 sm:block  relative right-48 mt-4">
            <div className="flex items-center w-full  lg:mt-3 sm:max-w-[230px] mx-auto md:mx-0 mb-7 border border-white h-[120px] rounded-md p-3">
              <img
                className="h-24 sm:h-20 pl-2"
                src="/qr.png"
                alt="QR Code"
              />
              <h2 className="text-white text-lg sm:text-xl font-normal py-5 pl-5">
                Download <br /> App
              </h2>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex sm:justify-end relative w-full">
          <img
            className="max-w-[90%]  sm:max-w-[70%] md:max-w-[80%] xl:h-[450px] h-auto object-contain"
            src="/iphone.png"
            alt="iPhone"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;

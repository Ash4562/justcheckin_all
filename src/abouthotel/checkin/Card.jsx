import React from 'react';

function Card() {
  return (
    <div className='sm:py-20 font-sans  px-6 sm:px-16  xl:pt-8'>
     
      <div className='sm:pt-1 m text-center'>
        <h1 className='text-blue-700 text-3xl xl:pt-5 pt-8 font-medium'>Why Choose JustCheckIn?</h1>
        <p className='pt-4 text-new font-normal xl:pb-4 pb-6 xl:text-xl leading-8 tracking-wide text-2xl sm:text-xl px-4 sm:px-44'>
          With advanced authentication and real-time hotel management, JustCheckIn ensures a fast, secure, and reliable guest experience.
        </p>
      </div>
      <div className='grid grid-cols-1 xl:gap-28   xl:text-4xl sm:grid-cols-3 lg:grid-cols-3 gap-6 justify-center px- pt-'>
        
   
        <div className='min-h-[350px] drop-shadow-lg bg-blue-200 rounded-lg p-6 max-w-96 sm:max-w-sm mx-'>
          <img className='h-20 sm:h-24 mx-auto' src="/i1.png" alt="Secure Identity Verification" />
          <h1 className='pt-4 text-center text-2xl font-semibold'>Secure Identity Verification</h1>
          <p className='text-pcolor pt-2 text-2xl sm:text-lg text-center px-4'>
            Government-approved ID authentication ensures a trustworthy check-in process.
          </p>
        </div>
        
        <div className='min-h-[350px] drop-shadow-lg bg-blue-200 rounded-lg p-6 max-w-96 sm:max-w-sm mx-'>
          <img className='h-20 sm:h-24 mx-auto' src="/i2.png" alt="Global Compliance" />
          <h1 className='pt-4 text-center  text-2xl font-semibold'>Global Compliance</h1>
          <p className='text-pcolor pt-2 text-2xl sm:text-lg text-center px-4'>
            Follows regulations to meet industry security and privacy standards.
          </p>
        </div>
        <div className='min-h-[350px] sm:mb-0 mb-10 drop-shadow-lg bg-blue-200  rounded-lg p-6 max-w-96 sm:max-w-sm mx-'>
          <img className='h-20 sm:h-24 mx-auto' src="/i3.png" alt="Mobile & Web Support" />
          <h1 className='pt-4 text-center text-2xl font-semibold'>Mobile & Web Support</h1>
          <p className='text-pcolor pt-2 text-xl sm:text-lg text-center px-'>
            Access JustCheckIn from any device, ensuring convenience for both guests and hotel managers.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Card;

import React from 'react';
import { motion } from 'framer-motion';

function Div() {
  // Enhanced animation variants with more noticeable stagger
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
      scale: 0.9
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  // Increased stagger delay for more noticeable sequence
  const staggerDelay = 0.4; // Increased from 0.2 to 0.4 for more visible delay

  return (
    <>
      <div className='bg-[#8CBBFF52] font-sans px-4 sm:px-16 pt-6 md:pt-0 pb-4 md:pb-12 flex flex-col items-center'>
        <div className='flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-5 sm:gap-4 xl:gap-8'>
          {/* Card 1 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: 0 * staggerDelay }}
            className='h-auto mt-5 sm:mt-28 xl:mt-40 drop-shadow-lg bg-white w-full max-w-[280px] pt-9 rounded-lg'
          >
            <img className='h-14 mx-auto' src="/g1.jpg.png" alt="" />
            <h1 className='text-center text-2xl sm:text-lg pt-2 font-medium'>User Enters Hotel</h1>
            <p className='text-center text-[#00000069] text-lg sm:text-sm pt-2 px-6 sm:px-4'>Guest arrives at the hotel and requests a room at the reception.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: 1 * staggerDelay }}
            className='h-auto mt-5 sm:mt-32 xl:mt-44 sm:mb-2 drop-shadow-lg bg-white w-full max-w-[280px] pt-5 rounded-lg'
          >
            <img className='h-14 -mt-5 mx-auto' src="/g2.jpg.png" alt="" />
            <h1 className='text-center text-2xl sm:text-lg pt-2 font-medium'>Identity Verification</h1>
            <p className='text-center text-[#00000069] text-lg  sm:text-sm pt-2 px-6 sm:px-4'>User verifies identity using Aadhaar, PAN, Passport, or Driving License for authentication.</p>
          </motion.div>

          {/* Card 3 */}    
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: 2 * staggerDelay }}
            className='h-auto mt-5 sm:mt-36 xl:mt-48 sm:mb-4 drop-shadow-lg bg-white w-full max-w-[280px] pt-6 rounded-lg'
          >
            <img className='h-14 mx-auto' src="/g3.jpg.png" alt="" />
            <h1 className='text-center text-2xl sm:text-lg pt-2 px-2 font-medium'>Hotel Manager Access</h1>
            <p className='text-center text-[#00000069] text-lg sm:text-sm pt-2 px-6 sm:px-4'>Hotel manager views verified guest details and completes the check-in process.</p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: 3 * staggerDelay }}
            className='h-auto mt-5 sm:mt-40 xl:mt-52 mb-10 drop-shadow-lg bg-white w-full max-w-[280px] pt-6 pb-4 rounded-lg'
          >
            <img className='h-14 mx-auto' src="/g4.jpg.png" alt="" />
            <h1 className='text-center text-2xl sm:text-lg pt-2 font-medium'>Seamless Stay</h1>
            <p className='text-center text-[#00000069] text-lg sm:text-sm pt-2 px-6 sm:px-4'>Guest enjoys a smooth and secure stay with verified check-in details.</p>
          </motion.div>
        </div>

        {/* Price Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 1 * staggerDelay, duration: 0.8 }}
          className='mt-1 sm:mt4 xl:mt-16 pt-0 text-center'
        >
          <h1 className='font-semibold mb-3 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-sans'>₹9999</h1>
          <button className='bg-blue-600 text-white px-8 rounded-lg py-2 text-sm sm:text-base md:text-lg hover:bg-blue-700 transition-colors duration-300'>
            Buy Now
          </button>
        </motion.div>
      </div>
    </>
  )
}

export default Div;
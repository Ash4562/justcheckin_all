import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Nav from './checkin/Nav'
import Hero from '../checkin/Hero'
import About from '../checkin/About'
import Div from '../checkin/Div'
import Card from '../checkin/Card'
import Dropdown from '../checkin/Dropdown'
import Footer from '../checkin/Footer'
import DriveVideo from '../checkin/DriveVideo'
import PrivacyPolicy from '../checkin/PrivacyPolicy'
import Nav from '../checkin/Nav'

function AboutHotelroutes() {
  return (

    <div className="font-sans">
      <Nav />
      <div id="home">
        <Hero />
        <DriveVideo />
      </div>

      <div id="about">
        <About />
        <Div />
        <Card />
      </div>

      <div id="faq">
        <Dropdown />
      </div>

      <div id="contact">
        <Footer />
      </div>
    </div>
  )
}

export default AboutHotelroutes



// // import React from 'react';
// // import { Routes, Route } from 'react-router-dom';

// // import PrivacyPolicy from '../checkin/PrivacyPolicy';
// // import All from '../checkin/All'; // This should include your full single-page layout

// // function AboutHotelroutes() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<All />} />
// //       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// //       <Route path="*" element={<h1 className="text-center text-2xl mt-10 text-red-500">404 - Page Not Found</h1>} />
// //     </Routes>
// //   );
// // }

// // export default AboutHotelroutes;
// import React from 'react'
// import Nav from '../checkin/Nav';
// import Hero from '../checkin/Hero';
// import About from '../checkin/About';
// import Div from '../checkin/Div';
// import Card from '../checkin/Card';
// import Dropdown from '../checkin/Dropdown';
// import Footer from '../checkin/Footer';
// import DriveVideo from '../checkin/DriveVideo';
// import Contactus from '../pages/Contactus'; // Or replace with your own Contact section
// import PrivacyPolicy from '../checkin/PrivacyPolicy';

// const AboutHotelroutes = () => {
//   return (
//     <div className="font-sans">
//     <Nav />
//     <div id="home">
//       <Hero />
//       <DriveVideo />
//     </div>

//     <div id="about">
//       <About />
//       <Div />
//       <Card />
//     </div>

//     <div id="faq">
//       <Dropdown />
//     </div>

//     <div id="contact">
   
//       <Footer />
//     </div>
//   </div>
//   )
// }

// export default AboutHotelroutes

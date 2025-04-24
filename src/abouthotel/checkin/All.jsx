import React from 'react'
import Nav from '../checkin/Nav';
import Hero from '../checkin/Hero';
import About from '../checkin/About';
import Div from '../checkin/Div';
import Card from '../checkin/Card';
import Dropdown from '../checkin/Dropdown';
import Footer from '../checkin/Footer';
import DriveVideo from '../checkin/DriveVideo';
import Contactus from '../pages/Contactus'; // Or replace with your own Contact section
import PrivacyPolicy from '../checkin/PrivacyPolicy';

const All = () => {
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

export default All

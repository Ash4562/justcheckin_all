import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="font-sans sm:fixed z-50 w-full">
      <div className="w-full bg-gradient-to-r from-blue-500 via-blue-700 to-blue-950">
        <nav className="flex justify-between items-center px-3 bg-white sm:px-16">
      <Link to="/">
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="h-16" />
          </div>
      </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-14 text-[18px] font-medium cursor-pointer">
          <li><HashLink smooth to="#home">Home</HashLink></li>
      <li><HashLink smooth to="#about">About</HashLink></li>
      <li><HashLink smooth to="#faq">FAQ's</HashLink></li>
      <li><HashLink smooth to="#contact">Contact</HashLink></li>
      {/* <li><HashLink to="/privacy-policy">Privacy Policy</HashLink></li> */}
            <li><Link to="/privacy-policy"></Link></li>
          
          </ul>

          {/* Mobile Menu Button */}
          <button className="sm:hidden z-50 relative" onClick={toggleMenu}>
            {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out z-40 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >

            <ul className="hidden sm:flex gap-14 text-[18px] font-medium cursor-pointer">
          <li><HashLink smooth to="#home">Home</HashLink></li>
      <li><HashLink smooth to="#about">About</HashLink></li>
      <li><HashLink smooth to="#faq">FAQ's</HashLink></li>
      <li><HashLink smooth to="#contact">Contact</HashLink></li>
      {/* <li><HashLink to="/privacy-policy">Privacy Policy</HashLink></li> */}
            <li><Link to="/privacy-policy"></Link></li>
          
          </ul>
          <ul className="text-lg font-medium space-y-6">
          <li><HashLink smooth to="#home" onClick={closeMenu}>Home</HashLink></li>
      <li><HashLink smooth to="#about" onClick={closeMenu}>About</HashLink></li>
      <li><HashLink smooth to="#faq" onClick={closeMenu}>FAQ's</HashLink></li>
      <li><HashLink smooth to="#contact" onClick={closeMenu}>Contact</HashLink></li>
           
            <li><Link to="/privacy-policy onClick={closeMenu}"></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;

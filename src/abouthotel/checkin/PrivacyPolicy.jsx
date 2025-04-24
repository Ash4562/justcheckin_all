import React, { useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return <>
  {/* <Nav/> */}
<div className="w-full fixed top-0 bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-4 sm:px-16 py-3">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>
          <Link
            to="/"
            className="text-[18px] font-medium text-black broder-none mr-10 hover:underline"
          >
            Home
          </Link>
        </div>
      </div>
    <div className="text-[20px] font-normal font-poppins leading-[40px] text-[#333] mt-28">


      {/* Privacy Policy */}
      <div className="mb-12 mx-10 mt-10">
        <h1 className="text-[#016133] text-[40px] font-semibold mb-4">Privacy Policy</h1>

        <p>1. Introduction</p>
        <p>
          Welcome to <strong>JustCheckIn</strong>, a digital guest verification solution for hotel check-ins. Your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
        </p>

        <p className="mt-4">2. Information We Collect</p>
        <p>
          We may collect the following details for the purpose of identity verification and user management: <br />
          • Full Name, Mobile Number, Email Address<br />
          • Government-issued ID details: Aadhar, Driving License, Passport, Voter ID<br />
          • Hotel check-in details including timestamp and hotel name<br />
          • Device and usage information
        </p>

        <p className="mt-4">3. How We Use Your Information</p>
        <p>
          • To verify your identity for secure hotel check-ins<br />
          • To comply with regulatory and legal obligations<br />
          • To improve user experience and system reliability<br />
          • To respond to customer support queries
        </p>

        <p className="mt-4">4. Sharing Your Information</p>
        <p>
          We do not sell or trade your data. We may share your information with:<br />
          • Hotel authorities as part of the verification process<br />
          • Legal or government authorities when legally obligated<br />
          • Technology partners under strict confidentiality for operational purposes
        </p>

        <p className="mt-4">5. Security Measures</p>
        <p>
          We use end-to-end encryption, secure cloud infrastructure, and regular audits to protect your data. While we strive for complete security, no system can be 100% immune to threats.
        </p>

        <p className="mt-4">6. User Rights</p>
        <p>
          • Access and review your data<br />
          • Request correction or deletion of your information<br />
          • Withdraw consent or request account deletion by contacting us at <span className="text-blue-700">support@justcheckin.com</span>
        </p>

        <p className="mt-4">7. Refund Policy</p>
        <p>
        • We charge a fee per verification. If a user is incorrectly charged or if a verification fails due to technical reasons, they may request a refund. <br />
          <strong>Approved Refunds:</strong> If any refunds are approved, the refund will be credited to your original payment method within <strong>14 business days</strong>.
        </p>

        <p className="mt-4">8. Changes to this Policy</p>
        <p>
        • We may update this policy periodically. Updates will be communicated through the app and on our website.
        </p>

        <p className="mt-4">9. Contact Us</p>
        <p>
        • For any queries or concerns, email us at <span className="text-blue-700">support@justcheckin.com</span>
        </p>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-12 sm:mx-10 mx-10 mt-10">
        <h1 className="text-[#016133] text-[35px] font-semibold mb-4">Terms & Conditions</h1>

        <p>1. Acceptance of Terms</p>
        <p>
          By using the JustCheckIn app, you agree to comply with these terms and conditions.
        </p>

        <p className="mt-4">2. User Responsibilities</p>
        <p>
          • Users must provide accurate ID information for verification.<br />
          • Users are responsible for maintaining confidentiality of their account credentials.<br />
          • Any attempt to use forged or unauthorized documents will result in immediate account suspension.
        </p>

        <p className="mt-4">3. Payments</p>
        <p>
          • Users are charged on a <strong>per-verification basis</strong>.<br />
          • All payments are securely processed via our integrated payment gateway (PhonePe).<br />
          • Prices may vary based on the verification type.
        </p>

        <p className="mt-4">4. Refund Policy</p>
        <p>
          • If a user is wrongly charged or if the verification fails due to system error, a refund may be requested.<br />
          • <strong>Approved refunds will be credited to your original payment method within 14 business days.</strong>
        </p>

        <p className="mt-4">5. Prohibited Use</p>
        <p>
        • Do not misuse the app for fraudulent check-ins.<br />
        • Do not attempt to hack or tamper with the app’s functionality.<br />
        • Do not impersonate others or use forged IDs.
        </p>

        <p className="mt-4">6. Data Usage</p>
        <p>
        • We collect identity data strictly for verification purposes and comply with all legal data protection norms in India.
        </p>

        <p className="mt-4">7. Termination of Access</p>
        <p>
        • We reserve the right to suspend or terminate access to users who violate our policies or misuse the platform.
        </p>

        <p className="mt-4">8. Governing Law</p>
        <p>
        • These terms are governed by the laws of India. Disputes, if any, shall be subject to jurisdiction of courts in your city.
        </p>

        <p className="mt-4">9. Contact</p>
        <p>
        • For more information or legal queries, email us at <span className="text-blue-700">support@justcheckin.com</span>
        </p>
      </div>
    </div>
    </>
}

export default PrivacyPolicy;

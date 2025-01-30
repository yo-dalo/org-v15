import React from "react";
import Nav2 from "../Part/Nav2"
const PrivacyPolicy = () => {
  return (
    <div>
    <Nav2 />
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        
        <p className="text-lg mb-4">
          At Ladli Lakshmi Yojana, we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and protect your personal
          information when you visit and use our website.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4">1. Information We Collect</h2>
        <p className="text-lg mb-4">
          We may collect personal information such as your name, email address, 
          and contact details when you register, make an inquiry, or use our services. 
          This information is collected only with your consent.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p className="text-lg mb-4">
          The information we collect is used to process your registration, communicate 
          with you about your application, and improve our services. We may also use 
          your information to send you updates related to the services offered by 
          Ladli Lakshmi Yojana.
        </p>

        <h2 className="text-2xl font-semibold mt-4">3. Data Protection</h2>
        <p className="text-lg mb-4">
          We use appropriate security measures to protect your personal information 
          from unauthorized access, disclosure, alteration, or destruction. 
          However, no method of transmission over the internet is completely secure.
        </p>

        <h2 className="text-2xl font-semibold mt-4">4. Sharing Your Information</h2>
        <p className="text-lg mb-4">
          We will not sell, rent, or trade your personal information to third parties. 
          We may share your information with trusted partners to assist in providing 
          our services, but they will be obligated to keep your information secure.
        </p>

        <h2 className="text-2xl font-semibold mt-4">5. Your Rights</h2>
        <p className="text-lg mb-4">
          You have the right to access, correct, or delete your personal information 
          that we hold. If you would like to exercise these rights, please contact us 
          at our provided contact details.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Changes to This Policy</h2>
        <p className="text-lg mb-4">
          We may update this Privacy Policy from time to time. Any changes will be 
          posted on this page, and the "Last Updated" date at the bottom will be 
          updated accordingly.
        </p>

        <h2 className="text-2xl font-semibold mt-4">7. Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions about this Privacy Policy or need assistance 
          with your personal data, please contact us at <strong>contact@ladlilakshmiyojana.com</strong>.
        </p>

        <p className="text-sm text-center text-gray-500 mt-8">
          Last Updated: January 2025
        </p>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <p className="text-3xl font-bold text-gray-800">
          CONTACT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-100 p-8 rounded-lg shadow-lg">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Contact Info */}
        <div className="w-full md:w-1/2 space-y-4 text-gray-700">
          <p className="text-xl font-semibold text-gray-900">OUR OFFICE</p>
          <p>Kathmandu, Nepal</p>
          <p>📞+977-9803824865</p>
          <p>📧 docmeet@gmail.com</p>
          <p className="font-medium">Careers</p>
          <button className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-300 transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          CONTACT <span className="text-blue-500">US</span>
        </h2>
        <p className="mt-2 text-gray-300">We’d love to hear from you</p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
          />
        </div>

        {/* Right Side: Contact Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold text-white">OUR OFFICE</h3>
          <p>Kathmandu, Nepal</p>
          <p>📞 +977-980000000000</p>
          <p>📧 docmeet@gmail.com</p>
          <h4 className="mt-4 font-medium text-white">Careers</h4>
          <button className="mt-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
            Explore Jobs
          </button>
        </div>

      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold">
          About <span className="text-blue-500">Us</span>
        </h2>
        <p className="mt-2 text-gray-300">Learn more about docMeet</p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img 
            src={assets.about_image} 
            alt="About Us" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-700"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-gray-300 leading-relaxed">
            docMeet is a user-friendly doctor appointment booking app designed to make healthcare access simple and efficient. Users can easily search for doctors, check their availability, and schedule appointments with just a few taps. Whether for in-person visits or telemedicine consultations, docMeet ensures a seamless booking experience.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Beyond scheduling, docMeet offers helpful features like appointment reminders, digital prescriptions, and secure health record management. By streamlining the process, it saves time and reduces the hassle of traditional appointment booking, making quality healthcare more accessible to everyone.
          </p>

          {/* Vision Section */}
          <b className="text-xl text-white">Our Vision</b>
          <p className="text-gray-300 leading-relaxed">
            To revolutionize healthcare access by making doctor appointments seamless, efficient, and accessible for everyone. We strive to bridge the gap between patients and healthcare providers through technology, ensuring timely and hassle-free medical consultations.
          </p>
        </div>
      </div>

      {/* WHY US Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white">WHY US</h3>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Efficiency */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
            <b className="text-lg font-semibold text-white">Efficiency</b>
            <p className="mt-2 text-gray-300">
              docMeet streamlines the appointment booking process, reducing wait times and eliminating unnecessary hassles. With quick scheduling, instant confirmations, and timely reminders, healthcare access is faster and more organized.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
            <b className="text-lg font-semibold text-white">Convenience</b>
            <p className="mt-2 text-gray-300">
              docMeet makes healthcare easy by allowing you to book appointments anytime, anywhere. With telemedicine options, digital prescriptions, and automated reminders, managing your health has never been more hassle-free.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
            <b className="text-lg font-semibold text-white">Personalization</b>
            <p className="mt-2 text-gray-300">
              docMeet offers a tailored healthcare experience by allowing you to choose your preferred doctors, set appointment preferences, and access personalized health records. Enjoy a seamless and customized journey to better health.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;

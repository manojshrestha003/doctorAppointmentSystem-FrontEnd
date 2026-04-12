import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="w-full py-12 sm:py-20 px-4 transition-all duration-300 flex justify-center">
      <div className="w-full max-w-6xl">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Us</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Learn more about docMeet</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center sm:items-stretch gap-10 bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 overflow-hidden mb-20">
          
          {/* Left Side - Image */}
          <div className="w-full lg:w-5/12 shrink-0">
            <img 
              src={assets.about_image} 
              alt="About Us" 
              className="w-full h-full object-cover lg:rounded-l-3xl"
            />
          </div>

          {/* Right Side - Text */}
          <div className="w-full lg:w-7/12 p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              <span className="font-bold text-gray-900 dark:text-white">docMeet</span> is a user-friendly doctor appointment booking app designed to make healthcare access simple and efficient. Users can easily search for doctors, check their availability, and schedule appointments with just a few taps. Whether for in-person visits or telemedicine consultations, docMeet ensures a seamless booking experience.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              Beyond scheduling, docMeet offers helpful features like appointment reminders, digital prescriptions, and secure health record management. By streamlining the process, it saves time and reduces the hassle of traditional appointment booking, making quality healthcare more accessible to everyone.
            </p>

            {/* Vision Section */}
            <div className="pt-6 mt-2 border-t border-gray-100 dark:border-slate-700/50">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To revolutionize healthcare access by making doctor appointments seamless, efficient, and accessible for everyone. We strive to bridge the gap between patients and healthcare providers through technology, ensuring timely and hassle-free medical consultations.
              </p>
            </div>
          </div>
        </div>

        {/* WHY US Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="mb-10 text-center sm:text-left border-b border-gray-200 dark:border-slate-700 pb-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">Why <span className="text-emerald-500">Choose Us</span></h3>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Efficiency */}
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-slate-700/50 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Efficiency</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                docMeet streamlines the appointment booking process, reducing wait times and eliminating unnecessary hassles. With quick scheduling, instant confirmations, and timely reminders, healthcare access is faster and more organized.
              </p>
            </div>

            {/* Convenience */}
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-slate-700/50 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Convenience</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                docMeet makes healthcare easy by allowing you to book appointments anytime, anywhere. With telemedicine options, digital prescriptions, and automated reminders, managing your health has never been more hassle-free.
              </p>
            </div>

            {/* Personalization */}
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-slate-700/50 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Personalization</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                docMeet offers a tailored healthcare experience by allowing you to choose your preferred doctors, set appointment preferences, and access personalized health records. Enjoy a seamless and customized journey to better health.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="w-full py-12 sm:py-20 px-4 transition-all duration-300 flex justify-center">
      <div className="w-full max-w-5xl">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Us</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">We’d love to hear from you</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center sm:items-stretch gap-10 bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 overflow-hidden">
          
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 md:max-w-md shrink-0">
            <img
              src={assets.contact_image}
              alt="Contact Us"
              className="w-full h-full object-cover sm:rounded-l-3xl"
            />
          </div>

          {/* Right Side: Contact Info */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center space-y-8">
            
            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 mb-4 uppercase">Our Office</h3>
              <div className="space-y-3">
                <p className="flex items-start gap-4 text-gray-700 dark:text-gray-300">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">Kathmandu, Nepal <br /> 44600</span>
                </p>
                <p className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+977-980000000000</span>
                </p>
                <p className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>docmeet@gmail.com</span>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-slate-700/50">
              <h3 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 mb-4 uppercase">Careers at DocMeet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Learn more about our teams and job openings. Join us in making healthcare accessible and seamless.
              </p>
              <button className="px-8 py-3 w-fit bg-transparent text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border-2 border-emerald-600 dark:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors">
                Explore Jobs
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row items-center md:items-center justify-between bg-gradient-to-br from-green-500 via-green-400 to-green-600 dark:from-gray-900 dark:via-green-900 dark:to-gray-800 rounded-2xl px-6 sm:px-12 py-10 text-white gap-10 shadow-lg">
      {/* Left Content */}
      <div className="flex flex-col gap-5 max-w-md text-center md:text-left flex-1">
        <p className="text-lg font-medium">Book Appointment</p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-snug tracking-tight">
          With  Trusted Doctors
        </h1>
        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-fit mx-auto md:mx-0 bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-100 hover:scale-105 transition-transform duration-200"
        >
          Create Account
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src={assets.docMeet2}
          alt="Doctor Appointment"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default Banner;

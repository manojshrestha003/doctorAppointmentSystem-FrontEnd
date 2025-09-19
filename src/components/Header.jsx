import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <header className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-green-500 via-green-400 to-green-600 dark:from-gray-900 dark:via-green-900 dark:to-gray-800 rounded-2xl px-6 md:px-12 lg:px-20 py-12 overflow-hidden shadow-xl transition-colors">
      {/* Decorative Shapes */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/20 rounded-full blur-2xl dark:bg-green-900/40"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl dark:bg-green-800/40"></div>

      {/* Left Side */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-start gap-5 text-white dark:text-gray-100 py-6 md:py-12">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight animate-fade-in-up drop-shadow-md">
          Book Appointments <br /> with Trusted Doctors
        </h1>
        <p className="text-base md:text-lg font-medium opacity-90 dark:opacity-80">
          Your health, our priority. Access the best healthcare professionals
          with ease and confidence.
        </p>
        <img
          className="w-28 md:w-40 drop-shadow-md"
          src={assets.group_profiles}
          alt="Group Profiles"
        />
        <p className="text-lg opacity-85 dark:opacity-75">
          Simply browse through our extensive list of trusted doctors and
          specialists.
        </p>

        {/* CTA Button */}
        <a
          href="#speciality"
          className="flex items-center gap-3 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-100 hover:scale-105 transition-all duration-300 dark:bg-gray-800 dark:text-green-300 dark:hover:bg-gray-700"
        >
          Book Appointment
          <img className="w-5" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right Side */}
      <div className="relative z-10 md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          className="w-full max-w-md md:max-w-lg rounded-3xl shadow-2xl border-4 border-white/40 dark:border-gray-700"
          src={assets.docMeetImg}
          alt="Doctor Consultation"
        />

        {/* Floating Card for extra depth */}
        <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          <img
            src={assets.group_profiles}
            alt="Profiles"
            className="w-10 rounded-full border"
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            500+ Doctors Available
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

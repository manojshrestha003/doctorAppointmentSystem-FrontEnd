import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-green-800 text-gray-200 py-12 px-6 md:px-12 mt-10 rounded-t-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <img
            src={assets.docMeet}
            alt="DocMeet Logo"
            className="w-32 rounded-lg shadow-md"
          />
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            We simplify doctor appointment booking with an easy-to-use interface,
            quick scheduling, and telemedicine access. Manage health records, get
            reminders, and enjoy hassle-free healthcare anytime.
          </p>
        </div>

        {/* Center section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-lg font-semibold mb-3 text-white">COMPANY</p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-lg font-semibold mb-3 text-white">GET IN TOUCH</p>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white transition">📞  +977-980000000000</li>
            <li className="hover:text-white transition">✉️ docmeet@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs sm:text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-white">docMeet</span> — All Rights Reserved
        </p>
        <p className="mt-1">Made with  by <span className="font-semibold">Manoj Shrestha</span></p>
      </div>
    </footer>
  );
};

export default Footer;

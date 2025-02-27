import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='w-full md:mx-10 bg-white text-gray-900 py-10 px-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {/* Left section */}
        <div className='flex flex-col itemssss-center md:items-start text-center md:text-left gap-4'>
          <img src={assets.docMeet} alt='Logo' className='w-32  border-r-4 rounded-lg' />
          <p className='text-gray-600 text-sm max-w-sm'>
          We simplify doctor appointment booking with an easy-to-use interface, quick scheduling, and telemedicine access. Manage health records, get reminders, and enjoy hassle-free healthcare anytime.
          </p>
        </div>

        {/* Center section */}
        <div className='text-center md:text-left'>
          <p className='text-lg font-semibold cursor-pointer'>COMPANY</p>
          <ul className='mt-2 space-y-2 text-gray-600 text-sm'>
            <li className='hover:text-gray-900 transition cursor-pointer'>Home</li>
            <li className='hover:text-gray-900 transition cursor-pointer'>About us</li>
            <li className='hover:text-gray-900 transition cursor-pointer'>Contact us</li>
            <li className='hover:text-gray-900 transition cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Right section */}
        <div className='text-center md:text-left'>
          <p className='text-lg font-semibold'>GET IN TOUCH</p>
          <ul className='mt-2 space-y-2 text-gray-600 text-sm'>
            <li className='hover:text-gray-900 transition'>9564644666</li>
            <li className='hover:text-gray-900 transition'>mcn@gmail.com</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright text */}
      <div className='mt-10 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm'>
        <p>Copyright 2025@docMeet - All Rights Reserved  -Manoj Shrestha</p>
      </div>
    </div>
  );
};

export default Footer;
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row bg-green-500 rounded-lg px-6 sm:px-10 py-10 text-white gap-10 items-center md:items-stretch'>
      {/* Left side */}
      <div className='flex flex-col gap-4 max-w-md text-center md:text-left justify-center flex-1'>
        <p className='text-lg font-medium'>Book appointment</p>
        <p className='text-3xl font-bold leading-tight'>with 100+ Trusted Doctors</p>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-primary font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition'>
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className='flex-1 flex items-end'>
        <img src={assets.docMeet2} alt='Appointment' className='w-full max-w-xs md:max-w-sm  rounded-3xl' />
      </div>
    </div>
  );
};

export default Banner;

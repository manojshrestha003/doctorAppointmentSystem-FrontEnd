import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContex } from '../Context/AppContext';

const TopDoctors = () => {
  const {doctors} = useContext(AppContex);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-6 my-10 px-4 text-gray-900 md:mx-10">
  {/* Title */}
  <h1 className="w-full sm:w-1/2 text-center text-xl sm:text-2xl font-semibold">
    Top Doctors
  </h1>

  {/* Subtitle */}
  <p className="text-gray-600 text-center text-sm sm:text-base">
    Browse through our extensive list of trusted doctors.
  </p>

  {/* Doctors Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
    {doctors.slice(0, 10).map((doctor, index) => (
      <div 
        onClick={() => navigate(`/appointments/${doctor._id}`)} 
        key={index} 
        className="border rounded-xl shadow-md p-4 flex flex-col items-center text-center transition hover:shadow-lg"
      >
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.name}`} 
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-4" 
        />
        <div className="flex flex-col items-center">
          <p className="text-green-600 font-semibold text-sm sm:text-base">Available</p>
          <p className="text-lg sm:text-xl font-bold">{doctor.name}</p>
          <p className="text-gray-500 text-sm sm:text-base">{doctor.speciality}</p>
        </div>
      </div>
    ))}
  </div>

  {/* More Button */}
  <button 
    onClick={() => { navigate('/doctors'); scrollTo(0,0); }} 
    className="mt-6 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-300 transition"
  >
    More
  </button>
</div>

  )
}

export default TopDoctors

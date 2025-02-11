import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContex } from '../Context/AppContext';

const TopDoctors = () => {
  const {doctors} = useContext(AppContex);
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>
      <h1 className="sm:w-1/3 text-center text-lg font-semibold">Top Doctors</h1>
      <p className="text-gray-600 text-center">Browse through our extensive list of trusted doctors.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {doctors.slice(0, 10).map((doctor, index) => (
          <div onClick={()=>{navigate(`/appointments/${doctor._id}`)}} key={index} className="border rounded-xl shadow-md p-4 flex flex-col items-center text-center">
            <img 
              src={doctor.image} 
              alt={`Dr. ${doctor.name}`} 
              className="w-32 h-32 object-cover rounded-full mb-4" 
            />
            <div className="flex flex-col items-center">
              <p className="text-green-600 font-semibold">Available</p>
              <p className="text-lg font-bold">{doctor.name}</p>
              <p className="text-gray-500">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        More
      </button>
    </div>
  )
}

export default TopDoctors

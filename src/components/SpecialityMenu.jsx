import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16 text-gray-800 px-4">
    {/* Title */}
    <h1 className="text-2xl sm:text-3xl font-medium text-center">Find By Speciality</h1>
  
    {/* Description */}
    <p className="w-full sm:w-1/3 text-center text-sm sm:text-base">
      Simply browse through our extensive list of trusted doctors.
    </p>
  
    {/* Scrollable Specialities */}
    <div className="flex sm:justify-center gap-6 pt-5 overflow-x-auto scrollbar-hide w-full max-w-5xl">
      {specialityData.map((item, index) => (
        <Link 
          onClick={() => scrollTo(0, 0)} 
          className="flex flex-col items-center text-xs sm:text-sm cursor-pointer flex-shrink-0 hover:translate-y-[5px] sm:hover:translate-y-[10px] transition-all duration-300"
          key={index} 
          to={`/doctors/${item.speciality}`}
        >
          <img className="w-14 sm:w-20 md:w-24 mb-2" src={item.image} alt={item.speciality} />
          <p className="text-center">{item.speciality}</p>
        </Link>
      ))}
    </div>
  </div>
  
  )
}

export default SpecialityMenu

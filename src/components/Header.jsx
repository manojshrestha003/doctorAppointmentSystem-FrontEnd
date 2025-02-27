import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-green-500 rounded-lg px-6 md:px-10 lg:px-20 py-10">
      {/* Left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 text-white py-6 md:py-16">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          Book Appointments <br /> with Trusted Doctors
        </h1>
        <img className="w-32 md:w-40" src={assets.group_profiles} alt="Group Profiles" />
        <p className="text-lg opacity-80">
          Simply browse through our extensive list of trusted doctors.
        </p>

        {/* CTA Button */}
        <a href="#speciality" className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition">
          Book Appointment 
          <img className="w-4" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 flex justify-center">
        <img className="w-full max-w-md md:max-w-lg  rounded-3xl" src={assets.docMeetImg} alt="Header Image" />
      </div>
    </div>
  )
}

export default Header

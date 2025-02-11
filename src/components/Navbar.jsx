import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu , setShowMenu]= useState(false);
    const [token, setToken]= useState(true);
    
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-6'>
      <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to="/" className="flex flex-col items-center">
          <li className='py-1'>HOME</li>
         
        </NavLink>
        <NavLink to="/doctors" className="flex flex-col items-center">
          <li className='py-1'>ALL DOCTORS</li>
          
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center">
          <li className='py-1'>ABOUT</li>
         
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center">
          <li className='py-1'>CONTACT</li>
        
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
            token?<div className="flex items-center gap-2 cursor-pointer relative group">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
          
            {/* Dropdown */}
            <div className="absolute top-full mt-2 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-[12rem] bg-stone-100 rounded-md flex flex-col gap-4 p-4 shadow-md">
                <p onClick={()=>{navigate('/my-profile')}} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>{navigate('/my-appointments')}} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={()=>{setToken(false)}} className="hover:text-red-500 cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
          :
            <button onClick={()=>{navigate('/login')}} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
            Create Account
          </button>
        }
      
      </div>
    </div>
  )
}

export default Navbar

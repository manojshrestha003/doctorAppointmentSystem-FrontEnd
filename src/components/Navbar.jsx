import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'

import { NavLink, useNavigate } from 'react-router-dom'

import { AppContex } from '../Context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu , setShowMenu]= useState(false);
    const {token, setToken, userData} = useContext(AppContex)

    const logOut = ()=>{
      setToken(false)
      localStorage.removeItem('token')
    }
    
    
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b  border-gray-400 px-6'>
    <img onClick={() => navigate('/')} className="w-44 cursor-pointer border-r-4 rounded-lg"src={assets.docMeet} alt="Logo"
/>


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
          
            token && userData?
            <div className="flex items-center gap-2 cursor-pointer relative group">
            <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
          
            {/* Dropdown */}
            <div className="absolute top-full mt-2 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-[12rem] bg-stone-100 rounded-md flex flex-col gap-4 p-4 shadow-md">
                <p onClick={()=>{navigate('/my-profile')}} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>{navigate('/my-appointments')}} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logOut} className="hover:text-red-500 cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
          :
            <button onClick={()=>{navigate('/login')}} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-primary-dark ">
            Create Account
          </button>
        }
       <img 
  onClick={() => setShowMenu(true)} 
  className="w-6 md:hidden cursor-pointer" 
  src={assets.menu_icon} 
  alt="menu icon" 
/>

{/* Mobile Menu */}
<div className={`${showMenu ? 'fixed w-full h-screen' : 'w-0 h-0'} md:hidden right-0 top-0 z-20 bg-white transition-all duration-300 overflow-hidden`}>
  <div className="flex justify-between items-center p-4 border-b">
    <img src={assets.logo} alt="logo" className="w-32" />
    <img 
      onClick={() => setShowMenu(false)} 
      src={assets.cross_icon} 
      alt="close menu" 
      className="w-6 cursor-pointer" 
    />
  </div>
  
  <ul className="flex flex-col items-center space-y-4 mt-6">
    <NavLink onClick={()=>{setShowMenu(false)}} to={'/'} className="text-lg font-semibold hover:text-blue-500 transition">HOME</NavLink>
    <NavLink onClick={()=>{setShowMenu(false)}} to={'/doctors'} className="text-lg font-semibold hover:text-blue-500 transition">ALL DOCTORS</NavLink>
    <NavLink onClick={()=>{setShowMenu(false)}} to={'/about'} className="text-lg font-semibold hover:text-blue-500 transition">ABOUT</NavLink>
    <NavLink onClick={()=>{setShowMenu(false)}} to={'/contact'} className="text-lg font-semibold hover:text-blue-500 transition">CONTACT</NavLink>
  </ul>
</div>

      </div>
    </div>
  )
}

export default Navbar

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContex } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { token, setToken, userData } = useContext(AppContex);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowMenu(false);
  };

  // Toggle dark mode
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // NavLink active style
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-40 cursor-pointer"
          src={assets.docMeet}
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            ALL DOCTORS
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
         

          {/* Auth Section */}
          {token && userData ? (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              <img
                className="w-9 h-9 rounded-full border object-cover"
                src={userData.image}
                alt="Profile"
              />
              <span className="hidden md:inline font-semibold">
                {userData.name}
              </span>
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown Icon"
              />
              {/* Dropdown */}
              <div className="absolute top-full mt-2 right-0 text-base font-medium text-gray-600 dark:text-gray-300 z-20 hidden group-hover:block">
                <div className="min-w-[12rem] bg-white dark:bg-gray-800 rounded-md shadow-md p-4 flex flex-col gap-3">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="cursor-pointer hover:text-blue-500 dark:hover:text-white"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="cursor-pointer hover:text-blue-500 dark:hover:text-white"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logOut}
                    className="cursor-pointer text-red-500 hover:text-red-600"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="menu icon"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          showMenu ? "fixed w-full h-screen" : "w-0 h-0"
        } md:hidden top-0 right-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <img src={assets.docMeet} alt="logo" className="w-32" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close menu"
            className="w-6 cursor-pointer"
          />
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-6">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="text-lg font-semibold hover:text-blue-500 transition"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/doctors"
            className="text-lg font-semibold hover:text-blue-500 transition"
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="text-lg font-semibold hover:text-blue-500 transition"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="text-lg font-semibold hover:text-blue-500 transition"
          >
            CONTACT
          </NavLink>

          <div className="w-full border-t my-4"></div>

          {token && userData ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  className="w-9 h-9 rounded-full border object-cover"
                  src={userData.image}
                  alt="Profile"
                />
                <span className="font-semibold">{userData.name}</span>
              </div>
              <button
                onClick={() => {
                  navigate("/my-profile");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/my-appointments");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                My Appointments
              </button>
              <button
                onClick={logOut}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Create Account
            </button>
          )}

          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

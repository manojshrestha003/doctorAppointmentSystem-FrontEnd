import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContex } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContex);

  // Track scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowMenu(false);
  };

  // NavLink active style
  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${isActive
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    }`;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "All Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-white/5"
        : "bg-white/0 dark:bg-transparent border-b border-transparent"
        }`}
    >
      <div className="flex items-center justify-between px-2 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            className="w-28 sm:w-32 rounded-lg transition-transform duration-300 group-hover:scale-105"
            src={assets.docMeet}
            alt="DocMeet Logo"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative px-3 py-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors duration-200">
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-emerald-500 rounded-full" />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Auth Section */}
          {token && userData ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer">
                <div className="relative">
                  <img
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-slate-700"
                    src={userData.image}
                    alt="Profile"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-950" />
                </div>
                <span className="hidden md:inline text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {userData.name}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full mt-2 right-0 z-20 hidden group-hover:block pt-1">
                <div className="w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-gray-100 dark:border-slate-700/50 p-2 backdrop-blur-xl">
                  {/* User info header */}
                  <div className="px-3 py-2.5 mb-1 border-b border-gray-100 dark:border-slate-700/50">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{userData.email}</p>
                  </div>

                  <button
                    onClick={() => navigate("/my-profile")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/my-appointments")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    My Appointments
                  </button>

                  <div className="my-1 border-t border-gray-100 dark:border-slate-700/50" />

                  <button
                    onClick={logOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex group items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Create Account
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setShowMenu(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-950 z-50 md:hidden shadow-2xl shadow-black/20 transition-transform duration-300 ease-out ${showMenu ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <img src={assets.docMeet} alt="logo" className="w-24" />
          <button
            onClick={() => setShowMenu(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              onClick={() => setShowMenu(false)}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mx-4 border-t border-gray-100 dark:border-white/5" />

        {/* User section */}
        <div className="px-4 py-4">
          {token && userData ? (
            <div className="space-y-1">
              {/* User info */}
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <img
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-slate-700"
                  src={userData.image}
                  alt="Profile"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData.name}</p>
                  <p className="text-xs text-gray-400">View profile</p>
                </div>
              </div>

              <button
                onClick={() => { navigate("/my-profile"); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </button>
              <button
                onClick={() => { navigate("/my-appointments"); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Appointments
              </button>

              <div className="mx-2 my-2 border-t border-gray-100 dark:border-white/5" />

              <button
                onClick={logOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate("/login"); setShowMenu(false); }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-300"
            >
              Create Account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

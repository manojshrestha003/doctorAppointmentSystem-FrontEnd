import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative flex flex-col md:flex-row items-center justify-between rounded-3xl overflow-hidden shadow-2xl min-h-[480px] md:min-h-[520px]">
      {/* === Animated Gradient Background === */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-800" />

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.25) 0%, transparent 50%)
          `
        }}
      />

      {/* Decorative floating orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-emerald-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* ===== Left Content ===== */}
      <div
        className={`relative z-10 md:w-[55%] flex flex-col items-start gap-6 px-8 md:px-14 lg:px-20 py-12 md:py-16 text-white transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/15 dark:bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
            Trusted Healthcare Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
          Book Appointments
          <br />
          <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent">
            with Trusted Doctors
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-white/80 dark:text-white/70 max-w-lg leading-relaxed font-light">
          Your health, our priority. Access the best healthcare professionals
          with ease, confidence, and care — anytime, anywhere.
        </p>

        {/* Trust indicators */}
        <div className="flex items-center gap-4 mt-1">
          <img
            className="w-28 md:w-36 drop-shadow-lg"
            src={assets.group_profiles}
            alt="Trusted by many patients"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white/90">
              500+ Happy Patients
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-300 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-white/70 ml-1">4.9/5</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <a
            href="#speciality"
            className="group flex items-center gap-3 bg-white text-emerald-700 px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-emerald-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 dark:bg-white dark:text-emerald-700"
          >
            Book Appointment
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#speciality"
            className="flex items-center gap-2 text-white/90 hover:text-white px-5 py-3.5 rounded-2xl font-semibold border border-white/25 hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Doctors
          </a>
        </div>
      </div>

      {/* ===== Right Side - Image & Floating Cards ===== */}
      <div
        className={`relative z-10 md:w-[45%] flex justify-center items-end px-6 md:px-8 pb-0 md:pb-0 mt-6 md:mt-0 transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        {/* Image glow effect */}
        <div className="absolute bottom-8 w-[80%] h-32 bg-cyan-400/20 rounded-full blur-3xl" />

        <img
          className="relative w-full max-w-sm md:max-w-md rounded-t-3xl object-cover"
          src={assets.headerImage}
          alt="Doctor Consultation"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          }}
        />

        {/* Floating card - Doctors Available */}
        <div
          className={`absolute bottom-16 left-2 md:left-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-xl shadow-black/10 border border-white/50 dark:border-slate-700/50 flex items-center gap-3 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
        >
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-white">50+ Doctors</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Available now</p>
          </div>
        </div>





      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative flex flex-col md:flex-row items-center justify-between rounded-3xl overflow-hidden my-12 min-h-[280px] md:min-h-[320px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-800" />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 30%, rgba(6,182,212,0.25) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left Content */}
      <div
        className={`relative z-10 flex-1 flex flex-col gap-5 px-8 sm:px-12 lg:px-16 py-12 md:py-14 text-center md:text-left text-white transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Subtitle badge */}
        <div className="flex items-center gap-2 mx-auto md:mx-0 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 w-fit">
          <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
            Book Appointment
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
          With{" "}
          <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent">
            Trusted Doctors
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-white/75 max-w-md mx-auto md:mx-0 leading-relaxed font-light">
          Join thousands of patients who trust us for quality healthcare. Create your account and book your first appointment today.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mx-auto md:mx-0 mt-1">
          <button
            onClick={() => {
              navigate('/login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 bg-white text-emerald-700 px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-emerald-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            Create Account
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div
        className={`relative z-10 flex-1 flex justify-center md:justify-end items-end pr-0 md:pr-8 lg:pr-12 transition-all duration-700 ease-out delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
      >
        {/* Glow behind image */}
        <div className="absolute bottom-4 w-[70%] h-24 bg-cyan-400/20 rounded-full blur-3xl" />
        <img
          src={assets.appointment_img}
          alt="Doctor Appointment"
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-t-3xl object-cover drop-shadow-2xl"
          style={{
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          }}
        />
      </div>
    </section>
  );
};

export default Banner;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContex } from '../Context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContex);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-center gap-10 pt-6 pb-16 px-4 w-full">
      {/* Section Header */}
      <div className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Label badge */}
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-800/40">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-700 dark:text-blue-400">
            Top Rated
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
          Our Top{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Doctors
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-xl text-center text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Browse through our extensive list of trusted and highly-rated doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {doctors.slice(0, 9).map((doctor, index) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointments/${doctor._id}`)}
            className={`group relative cursor-pointer bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: isVisible ? `${150 + index * 60}ms` : "0ms" }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-4 p-5">
              {/* Doctor Image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-gray-100 dark:ring-slate-700 group-hover:ring-emerald-200 dark:group-hover:ring-emerald-800 transition-all duration-300">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-white dark:border-slate-800 shadow-sm" />
              </div>

              {/* Doctor Info */}
              <div className="flex flex-col gap-1.5 min-w-0">
                {/* Availability */}
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Available
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                  {doctor.name}
                </h3>

                {/* Speciality */}
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-0.5 rounded-lg w-fit">
                  {doctor.speciality}
                </span>

                {/* Experience & Fee */}
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {doctor.experience}
                  </span>
                  <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Rs{doctor.fees}
                  </span>
                </div>
              </div>

              {/* Arrow on hover */}
              <div className="ml-auto flex-shrink-0 w-9 h-9 rounded-xl bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
      >
        View All Doctors
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </section>
  );
};

export default TopDoctors;

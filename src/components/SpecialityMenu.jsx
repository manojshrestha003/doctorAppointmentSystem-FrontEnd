import React, { useEffect, useRef, useState } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

// Curated accent colors for each speciality card
const cardAccents = [
  { bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200/60 dark:border-emerald-800/40", hover: "hover:border-emerald-400 dark:hover:border-emerald-500", iconBg: "bg-emerald-100 dark:bg-emerald-900/60", ring: "ring-emerald-400/30" },
  { bg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200/60 dark:border-rose-800/40", hover: "hover:border-rose-400 dark:hover:border-rose-500", iconBg: "bg-rose-100 dark:bg-rose-900/60", ring: "ring-rose-400/30" },
  { bg: "bg-violet-50 dark:bg-violet-950/40", border: "border-violet-200/60 dark:border-violet-800/40", hover: "hover:border-violet-400 dark:hover:border-violet-500", iconBg: "bg-violet-100 dark:bg-violet-900/60", ring: "ring-violet-400/30" },
  { bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200/60 dark:border-amber-800/40", hover: "hover:border-amber-400 dark:hover:border-amber-500", iconBg: "bg-amber-100 dark:bg-amber-900/60", ring: "ring-amber-400/30" },
  { bg: "bg-cyan-50 dark:bg-cyan-950/40", border: "border-cyan-200/60 dark:border-cyan-800/40", hover: "hover:border-cyan-400 dark:hover:border-cyan-500", iconBg: "bg-cyan-100 dark:bg-cyan-900/60", ring: "ring-cyan-400/30" },
  { bg: "bg-teal-50 dark:bg-teal-950/40", border: "border-teal-200/60 dark:border-teal-800/40", hover: "hover:border-teal-400 dark:hover:border-teal-500", iconBg: "bg-teal-100 dark:bg-teal-900/60", ring: "ring-teal-400/30" },
];

const SpecialityMenu = () => {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speciality"
      className="relative flex flex-col items-center gap-10 pt-16 pb-6 px-4 w-full"
    >
      {/* Section Header */}
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* Label badge */}
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Specialities
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
          Find By{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Speciality
          </span>
        </h2>


        {/* Description */}
        <p className="max-w-xl text-center text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
          Explore our extensive list of trusted doctors and easily find
          specialists tailored to your health needs.
        </p>
      </div>

      {/* Specialities Grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
        {specialityData.map((item, index) => {
          const accent = cardAccents[index % cardAccents.length];
          return (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className={`group relative flex flex-col items-center justify-center gap-4 px-4 py-8 rounded-2xl border ${accent.border} ${accent.hover} bg-white dark:bg-slate-800/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-2 active:translate-y-0 transition-all duration-300 ease-out cursor-pointer overflow-hidden ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
              style={{
                transitionDelay: isVisible ? `${200 + index * 80}ms` : "0ms",
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon container */}
              <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 ${accent.iconBg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:ring-4 ${accent.ring} transition-all duration-300`}>
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src={item.image}
                  alt={item.speciality}
                />
              </div>

              {/* Label */}
              <p className="relative z-10 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 leading-tight">
                {item.speciality}
              </p>

              {/* Arrow indicator on hover */}
              <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SpecialityMenu;

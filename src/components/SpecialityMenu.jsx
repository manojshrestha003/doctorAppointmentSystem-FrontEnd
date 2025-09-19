import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-8 py-16 px-4 w-full bg-gradient-to-b from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg mx-2 md:mx-10 my-12"
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 dark:text-green-300 tracking-tight drop-shadow-sm">
        Find By Speciality
      </h1>

      {/* Description */}
      <p className="w-full sm:w-2/3 md:w-1/2 text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 opacity-90">
        Explore our extensive list of trusted doctors and easily find specialists
        tailored to your health needs.
      </p>

      {/* Specialities Grid */}
      <div
        className="
          w-full max-w-6xl
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8
          py-6
        "
      >
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="
              flex flex-col items-center justify-center
              bg-white/80 dark:bg-gray-800/70
              backdrop-blur-lg
              rounded-2xl
              shadow-md
              border border-green-100 dark:border-gray-700
              hover:shadow-2xl hover:-translate-y-2 hover:border-green-400 dark:hover:border-green-300
              transition-all duration-300 ease-in-out
              cursor-pointer
              px-6 py-8
              group
            "
            style={{ minWidth: 150 }}
          >
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 rounded-full border-4 border-green-200 dark:border-green-700 shadow-md group-hover:scale-110 transition-transform duration-300"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-center text-green-700 dark:text-green-200 font-semibold text-base sm:text-lg mt-1 group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;

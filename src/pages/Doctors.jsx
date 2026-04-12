import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContex } from '../Context/AppContext';

const Doctors = () => {
  const { spaciality } = useParams();  
  const { doctors } = useContext(AppContex)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false);
  
  const navigate = useNavigate();  

  const applyFilter = () => {
    if (spaciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === spaciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, spaciality])

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  return (
    <div className="w-full flex justify-center py-8 sm:py-12 px-4 transition-all duration-300">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Browse Specialist <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Doctors</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Find and book appointments with top-rated professionals.
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm active:scale-95 transition-all"
          >
            Filters
            <svg className={`w-4 h-4 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar - Filters */}
          <div className={`w-full md:w-64 flex-shrink-0 flex flex-col gap-3 transition-all duration-500 ease-in-out ${showFilter ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100 overflow-hidden md:overflow-visible'}`}>
            <button
                onClick={() => navigate('/doctors')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  !spaciality 
                    ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-semibold border-l-4 border-emerald-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                }`}
              >
                All Specialists
            </button>
            {specialities.map((spec) => (
              <button
                key={spec}
                onClick={() => navigate(spaciality === spec ? '/doctors' : `/doctors/${spec}`)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  spaciality === spec 
                    ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-semibold border-l-4 border-emerald-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Right Content - Doctors Grid */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterDoc.map((doctor, index) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="group cursor-pointer bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col animate-[fadeInUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Section */}
                <div className="relative pt-[80%] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-slate-700/30 overflow-hidden flex items-end justify-center">
                  <div className="absolute inset-x-4 bottom-0 h-[85%]">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-bottom rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow bg-white dark:bg-slate-800/60 z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Available
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-0.5 rounded-lg w-fit mt-1 mb-4">
                    {doctor.speciality}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {doctor.experience}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1.5 rounded-md">
                      Rs {doctor.fees}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {filterDoc.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white/40 dark:bg-slate-800/20 rounded-3xl border border-gray-100 dark:border-slate-700/50 border-dashed animate-pulse">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center ring-1 ring-gray-100 dark:ring-slate-700">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Doctors Found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">There are currently no doctors available for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors;

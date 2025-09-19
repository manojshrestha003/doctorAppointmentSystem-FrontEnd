import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContex } from '../Context/AppContext';

const Doctors = () => {
  const { spaciality } = useParams();  
  const { doctors } = useContext(AppContex)
  const [filterDoc, setFilterDoc] = useState([])

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-12" style={{ background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
        Browse Doctor Specialists
      </h1>

      {/* Filter by Speciality */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {specialities.map((spec) => (
          <button
            key={spec}
            onClick={() => navigate(spaciality === spec ? '/doctors' : `/doctors/${spec}`)}
            className={`px-5 py-2 rounded-full font-medium transition duration-300
              ${spaciality === spec 
                ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                : 'bg-gray-700 text-gray-300 hover:bg-indigo-600 hover:text-white shadow-sm'}
            `}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filterDoc.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointments/${doctor._id}`)}
            className="bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-1 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <div className="relative">
              <img
                src={doctor.image}
                alt={`Dr. ${doctor.name}`}
                className="w-32 h-32 object-cover rounded-full mx-auto mt-6 border-4 border-indigo-600 shadow-md"
              />
              <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                Available
              </span>
            </div>
            <div className="text-center p-4">
              <h2 className="text-xl font-semibold text-white hover:text-indigo-400 transition">{doctor.name}</h2>
              <p className="text-sm text-gray-300 mt-1">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors;

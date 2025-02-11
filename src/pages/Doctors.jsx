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

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center text-indigo-600 mb-8">Browse through the Doctor Specialists</p>

      {/* Find By Speciality */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <p onClick={()=> spaciality  === 'General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">General Physician</p>
        <p onClick={()=> spaciality  === 'Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">Gynecologist</p>
        <p  onClick={()=> spaciality  === 'Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')}  className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">Dermatologist</p>
        <p  onClick={()=> spaciality  === 'Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')}  className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">Pediatricians</p>
        <p  onClick={()=> spaciality  === 'Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')}  className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">Neurologist</p>
        <p  onClick={()=> spaciality  === 'Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}  className="text-lg text-gray-800 text-center cursor-pointer hover:text-indigo-600">Gastroenterologist</p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          filterDoc.map((doctor) => (
            <div 
              onClick={() => { navigate(`/appointments/${doctor._id}`) }} 
              key={doctor._id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              <img 
                src={doctor.image} 
                alt={`Dr. ${doctor.name}`}  
                className="w-32 h-32 object-cover rounded-full mx-auto mt-6 mb-4 border-4 border-indigo-600"
              />
              <div className="text-center mb-4">
                <p className="text-green-600 font-semibold text-lg">Available</p>
                <p className="text-xl font-semibold text-gray-800">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Doctors

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContex } from '../Context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContex);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 my-10 px-4 text-gray-900 md:px-10">
      {/* Title */}
      <h1 className="text-left text-xl sm:text-2xl font-semibold">
        Top Doctors
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-left text-sm sm:text-base max-w-2xl">
        Browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {doctors.slice(0, 9).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointments/${doctor._id}`)}
            className="cursor-pointer border rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={`Dr. ${doctor.name}`}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mb-4 border border-gray-200"
            />

            {/* Doctor Info */}
            <div className="flex flex-col items-center">
              <span className="text-green-600 font-semibold text-xs sm:text-sm">
                Available
              </span>
              <h2 className="text-lg sm:text-xl font-bold">{doctor.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base">
                {doctor.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          View All Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;

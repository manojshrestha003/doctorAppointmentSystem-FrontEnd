import React, { useContext } from 'react';
import { AppContex } from '../Context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContex);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Appointments</h2>
      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-24 h-24 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full border border-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <p className="mt-2 font-medium">Address:</p>
              <p className="text-sm text-gray-600">{item.address.line1}</p>
              <p className="text-sm text-gray-600">{item.address.line2}</p>
              <p className="mt-2 text-sm font-medium"><span className="font-semibold">Date & Time:</span> 12, March, 2024 - 1 PM</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Pay Online</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

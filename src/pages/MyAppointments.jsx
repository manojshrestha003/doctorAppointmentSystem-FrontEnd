import React, { useContext, useEffect, useState } from 'react';
import { AppContex } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContex);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">My Appointments</h2>

        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-5 flex flex-col md:flex-row items-center md:items-start gap-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-400"
                />
              </div>

              <div className="flex-1 text-white space-y-1">
                <p className="text-lg font-semibold">{item.docData.name}</p>
                <p className="text-sm text-gray-300">{item.docData.speciality}</p>
                <div className="mt-2">
                  <p className="font-medium">Address:</p>
                  <p className="text-sm text-gray-300">{item.docData.address.line1}</p>
                  <p className="text-sm text-gray-300">{item.docData.address.line2}</p>
                </div>
                <p className="mt-2 text-sm font-medium">
                  <span className="font-semibold">Date & Time:</span> {item.slotDate} {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-4 md:mt-0">
                {!item.cancelled && (
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition shadow">
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-not-allowed opacity-70">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;

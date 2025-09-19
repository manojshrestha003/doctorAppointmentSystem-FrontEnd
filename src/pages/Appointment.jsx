import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContex } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContex);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (doctors?.length) {
      const foundDoctor = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoctor || null);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const handleSlotClick = (index, time) => {
    setSelectedSlot(index === selectedSlot ? null : index);
    setSlotTime(time);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10), 0, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  if (!docInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <p className="text-lg font-semibold text-gray-300">Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 shadow-lg rounded-2xl p-6">
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-40 h-40 overflow-hidden rounded-full border-2 border-indigo-500 shadow-lg">
            <img src={docInfo?.image || assets.defaultDoctorImage} alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-2xl font-bold flex items-center gap-2">
              {docInfo?.name} 
              <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
            </p>
            <p className="text-gray-300 mt-1">{docInfo?.degree} - {docInfo?.speciality}</p>
            <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
              {docInfo?.experience} years of experience
            </button>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-gray-700">
          <p className="text-lg font-semibold flex items-center gap-2">
            About <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
          </p>
          <p className="text-gray-200 mt-2">{docInfo?.about}</p>
        </div>

        {/* Booking Slots */}
        <div className="mt-6">
          <p className="text-xl font-semibold mb-3 text-white">Booking Slots</p>
          <div className="flex flex-wrap gap-3">
            {docSlots.length > 0 ? (
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 ${
                    slotIndex === index 
                      ? 'bg-indigo-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-700 text-gray-200 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {item[0] && `${daysOfWeek[item[0].datetime.getDay()]} ${item[0].datetime.getDate()}`}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No available slots</p>
            )}
          </div>

          {/* Time Slots */}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSlotClick(index, item.time)}
                className={`cursor-pointer text-center py-2 rounded-lg transition-all duration-300 ${
                  selectedSlot === index 
                    ? 'bg-green-500 text-white shadow-lg scale-105' 
                    : 'bg-gray-700 text-gray-200 hover:bg-green-500 hover:text-white'
                }`}
              >
                {item.time.toLowerCase()}
              </div>
            ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all font-semibold"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;

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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-40 h-40 overflow-hidden rounded-full border-2 border-gray-300">
          <img src={docInfo?.image || assets.defaultDoctorImage} alt="Doctor" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-700 flex items-center">
            {docInfo?.name} <img src={assets.verified_icon} alt="Verified" className="w-5 h-5 ml-2" />
          </p>
          <p className="text-gray-600">{docInfo?.degree} - {docInfo?.speciality}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            {docInfo?.experience} years of experience
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold flex items-center">
          About <img src={assets.info_icon} alt="Info" className="w-5 h-5 ml-2" />
        </p>
        <p className="text-gray-600 mt-2">{docInfo?.about}</p>
      </div>

      <div className="mt-4 font-medium text-gray-600">
        <p className="text-xl font-semibold text-gray-800">Booking Slots</p>
        <div className="flex flex-wrap gap-4">
          {docSlots.length > 0 ? (
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`cursor-pointer p-3 rounded-md ${slotIndex === index ? 'bg-blue-300' : 'bg-blue-100'}`}
              >
                {item[0] && `${daysOfWeek[item[0].datetime.getDay()]} ${item[0].datetime.getDate()}`}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available slots</p>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
        {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
          <p
            key={index}
            onClick={() => handleSlotClick(index, item.time)}
            className={`cursor-pointer p-3 rounded-md ${selectedSlot === index ? 'bg-blue-300' : 'bg-blue-50'}`}
          >
            {item.time.toLowerCase()}
          </p>
        ))}
      </div>

      <button onClick={bookAppointment} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
        Book Appointment
      </button>
    </div>
  );
};

export default Appointment;

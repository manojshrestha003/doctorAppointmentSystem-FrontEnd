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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (doctors?.length) {
      const foundDoctor = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoctor || null);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const getDoctorReviews = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}/reviews`);
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getDoctorReviews();
  }, [docId]);

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
      <div className="w-full flex items-center justify-center min-h-[60vh] transition-all">
        <div className="flex flex-col items-center gap-4 animate-pulse">
           <svg className="animate-spin h-10 w-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Appointment Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 px-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Doctor Details & Reviews */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Doctor Info Card */}
          <div className="bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-gray-50 dark:ring-slate-700 shadow-lg">
                <img src={docInfo?.image || assets.defaultDoctorImage} alt={docInfo?.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left mt-2 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 w-full justify-center sm:justify-start">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {docInfo?.name}
                  </h1>
                  <img src={assets.verified_icon} alt="Verified" className="w-5 h-5 flex-shrink-0 mx-auto sm:mx-0" />
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full w-fit mx-auto sm:mx-0">
                  <span>{docInfo?.degree}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{docInfo?.speciality}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 rounded-xl font-bold text-sm border border-yellow-100 dark:border-yellow-800/30">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                     {docInfo?.averageRating || 0} <span className="text-yellow-600/60 dark:text-yellow-500/60 font-medium">({docInfo?.totalReviews || 0} reviews)</span>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl font-semibold text-sm border border-blue-100 dark:border-blue-800/30">
                    {docInfo?.experience} Exp.
                  </div>
                </div>

                <div className="w-full bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/50">
                   <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2 mb-2">
                     About <img src={assets.info_icon} alt="Info" className="w-4 h-4 opacity-50 dark:invert" />
                   </p>
                   <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify sm:text-left">
                     {docInfo?.about}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Reviews Section */}
          <div className="bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-slate-700/60 pb-4">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Patient Reviews
              </h2>
              <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                {reviews.length} Reviews
              </span>
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review, index) => (
                  <div key={index} className="p-5 bg-gray-50 dark:bg-slate-700/30 rounded-2xl border border-gray-100 dark:border-slate-700/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img src={assets.verified_icon} alt="Verified" className="w-4 h-4" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">Verified Patient</span>
                      </div>
                      <div className="flex items-center text-yellow-400 text-sm tracking-widest">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-3">
                      "{review.reviewText || "No additional comments provided."}"
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                      {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center bg-gray-50 dark:bg-slate-700/30 rounded-2xl border border-dashed border-gray-200 dark:border-slate-600">
                <p className="text-gray-500 dark:text-gray-400 font-medium">No reviews yet.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Be the first to book and share your experience!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Booking Widget */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 sticky top-24">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              Book Appointment
            </h2>

            {/* Price Banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-4 flex justify-between items-center mb-8">
               <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Consultation Fee</span>
               <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Rs {docInfo?.fees}</span>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span>Select Date</span>
              </div>
              <div className="flex overflow-x-auto gap-3 pb-3 custom-scrollbar snap-x">
                {docSlots.length > 0 ? (
                  docSlots.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => { setSlotIndex(index); setSelectedSlot(null); setSlotTime(''); }}
                      className={`min-w-[70px] snap-center flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-300 border ${
                        slotIndex === index 
                          ? 'bg-gradient-to-b from-emerald-600 to-teal-500 border-transparent text-white shadow-md shadow-emerald-500/20 scale-105' 
                          : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${slotIndex === index ? 'text-emerald-50' : 'text-gray-400'}`}>
                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                      </span>
                      <span className="text-xl font-extrabold mt-1">
                        {item[0] && item[0].datetime.getDate()}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">Loading schedule...</p>
                )}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span>Select Time</span>
              </div>
              <div className="grid grid-cols-3 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
                  docSlots[slotIndex].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotClick(index, item.time)}
                      className={`text-sm py-2.5 rounded-xl font-semibold transition-all duration-200 border ${
                        selectedSlot === index 
                          ? 'bg-teal-500 text-white border-transparent shadow-md transform scale-[1.02]' 
                          : 'bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-white dark:hover:bg-slate-700'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center bg-gray-50 dark:bg-slate-700/20 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No slots left for this day.</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={bookAppointment}
              className={`w-full py-4 mt-2 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                !slotTime 
                  ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-300 dark:border-slate-600' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {slotTime ? 'Confirm Booking' : 'Select a Time Slot'}
              {slotTime && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
            {!slotTime && (
               <p className="text-xs text-center text-gray-400 mt-3 font-medium">Please select an available time to proceed.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Appointment;

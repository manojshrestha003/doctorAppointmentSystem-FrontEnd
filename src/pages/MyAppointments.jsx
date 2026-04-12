import React, { useContext, useEffect, useState } from 'react';
import { AppContex } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContex);
  const [appointments, setAppointments] = useState([]);
  
  // Review States
  const [reviewingId, setReviewingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [cancelModalId, setCancelModalId] = useState(null);

  const formatDate = (slotDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

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
        setCancelModalId(null);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const submitReview = async (appointmentId, docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-review`,
        { appointmentId, docId, rating, reviewText, userId: userData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setReviewingId(null);
        setRating(5);
        setReviewText('');
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
    <div className="w-full py-8 sm:py-12 px-4 transition-all duration-300">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Appointments
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            View and manage your upcoming and past doctor visits.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Main Card Content */}
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  {/* Doctor Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative rounded-xl overflow-hidden bg-blue-50 dark:bg-slate-700 ring-4 ring-gray-50 dark:ring-slate-800/50">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-full h-full object-cover object-bottom"
                    />
                  </div>

                  {/* Info Block */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.docData.name}
                    </h2>
                    <p className="inline-block mt-1 mb-3 text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg w-fit">
                      {item.docData.speciality}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-1">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-200 mb-1">Address</p>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                          {item.docData.address.line1}<br />
                          {item.docData.address.line2}
                        </p>
                      </div>
                      
                      <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-800/20">
                        <p className="font-semibold text-gray-900 dark:text-gray-200 mb-1">Date & Time</p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {formatDate(item.slotDate)} <span className="mx-1 text-gray-300 dark:text-gray-600">|</span> {item.slotTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Block */}
                  <div className="flex flex-col gap-3 justify-center border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-slate-700/50 pt-4 sm:pt-0 sm:pl-6 min-w-[160px]">
                      {!item.cancelled && !item.isCompleted && (
                        <>
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-medium text-sm transition-colors shadow-sm">
                            Pay Online
                          </button>
                          <button
                            onClick={() => setCancelModalId(item._id)}
                            className="w-full px-4 py-2 bg-white dark:bg-slate-800 text-red-500 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {item.cancelled && (
                        <div className="w-full px-4 py-2.5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-center rounded-xl font-semibold text-sm border border-red-100 dark:border-red-900/30">
                          Cancelled
                        </div>
                      )}
                      {item.isCompleted && !item.cancelled && (
                        <button 
                          onClick={() => setReviewingId(reviewingId === item._id ? null : item._id)}
                          className={`w-full px-4 py-2 text-white rounded-xl font-medium text-sm transition-colors shadow-sm ${reviewingId === item._id ? 'bg-gray-400 hover:bg-gray-500' : 'bg-indigo-500 hover:bg-indigo-400'}`}>
                          {reviewingId === item._id ? 'Close Review' : 'Leave Review'}
                        </button>
                      )}
                  </div>
                </div>
                
                {/* Review Section Dropper */}
                {reviewingId === item._id && (
                  <div className="w-full p-6 bg-gray-50 dark:bg-slate-700/30 border-t border-gray-100 dark:border-slate-700/50">
                    <h4 className="text-gray-900 dark:text-white font-bold mb-3 flex items-center gap-2">
                      Review <span className="text-emerald-600 dark:text-emerald-400">{item.docData.name}</span>
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl outline-none hover:scale-110 transition-transform ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">
                        {rating} out of 5
                      </span>
                    </div>
                    
                    <textarea
                      rows="3"
                      className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-4 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow resize-none text-sm placeholder-gray-400"
                      placeholder="Write your feedback here... (Optional)"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => submitReview(item._id, item.docData._id)}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition shadow-sm"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center bg-white/40 dark:bg-slate-800/20 rounded-3xl border border-gray-100 dark:border-slate-700/50 border-dashed">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Appointments Found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">You haven't booked any appointments yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4 ring-8 ring-red-50/50 dark:ring-red-900/10">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">Cancel Appointment?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6 leading-relaxed">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelModalId(null)}
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors border border-gray-200 dark:border-slate-600"
              >
                No, Keep it
              </button>
              <button
                onClick={() => cancelAppointment(cancelModalId)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors shadow-sm shadow-red-500/20 border border-transparent"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

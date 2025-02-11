import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContex } from '../Context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContex);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null); // Track selected slot

  const handleSlotClick = (index) => {
    // Toggle selected slot
    setSelectedSlot(selectedSlot === index ? null : index);
  };
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const foundDoctor = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoctor || null);
    }
  }, [doctors, docId]);

  useEffect(()=>{
    console.log(docSlots)

  },[])

  useEffect(()=>{
    getAvailabelSlots()

  },[docInfo])
 

  const getAvailabelSlots =async () => {
    setDocSlots([])
    //getting current date
    let today = new Date()
    for (let i=0; i<7; i++){
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i)
      //setting date and timw with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0.,0)
      //setting hours
      if(today.getDate() ===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while(currentDate<endTime){
        let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        //add slot to array 
        timeSlots.push({
          datetime: new Date(currentDate),
          time:formattedTime
        })
        //incrementing time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlots(prev =>[...prev, timeSlots])
    }

  
  }
  
  
  if (!docInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading doctor details...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Doctor details */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-40 h-40 overflow-hidden rounded-full border-2 border-gray-300">
          <img 
            src={docInfo?.image || assets.defaultDoctorImage} 
            alt="Doctor" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-700 flex items-center">
            {docInfo?.name} 
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5 ml-2" />
          </p>
          <p className="text-gray-600">{docInfo?.degree} - {docInfo?.speciality}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            {docInfo?.experience} years of experience
          </button>
        </div>
      </div>

      {/* Doctor About Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold flex items-center">
          About <img src={assets.info_icon} alt="Info" className="w-5 h-5 ml-2" />
        </p>
        <p className="text-gray-600 mt-2">{docInfo?.about}</p>
      </div>

      {/* Booking slots  */}
     {/* Booking slots */}
     <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600">
      <div className="flex items-center space-x-4">
        <p className="text-xl font-semibold text-gray-800">Booking Slots</p>
        <div className="flex flex-wrap gap-4">
          {docSlots.length > 0 ? (
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSlotClick(index)}
                className={`${
                  selectedSlot === index ? 'bg-blue-300' : 'bg-blue-100'
                } shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 ml-4">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available slots</p>
          )}
        </div>
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
        <div key={index} className="inline-flex items-center space-x-4 mb-3">
          <p
            onClick={() => handleSlotClick(index)} // Handle the click
            className={`text-lg font-semibold ${
              selectedSlot === index ? 'bg-blue-300' : 'bg-blue-50'
            } hover:bg-blue-200 p-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out`}
          >
            {item.time.toLowerCase()}
          </p>
        </div>
      ))}
    </div>
    </div>

    </div>
  );
};

export default Appointment;

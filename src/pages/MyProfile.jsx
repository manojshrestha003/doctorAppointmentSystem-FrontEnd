import React, { useContext, useState } from 'react';
import { AppContex } from '../Context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContex);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address || {}));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    userData && (
      <div className="w-full py-8 sm:py-12 px-4 transition-all duration-300 flex justify-center">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-3xl shadow-sm p-6 sm:p-10 relative overflow-hidden">
          
          {/* Header Graphic/Background Tint */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/10"></div>

          {/* Profile Header (Image & Name) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 mb-8 sm:mt-6">
            <div className="relative">
              {edit ? (
                <label htmlFor="image" className="cursor-pointer group block">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-lg">
                    <img
                      src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                      alt="Profile"
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <img src={assets.upload_icon} alt="Upload" className="w-8 h-8 opacity-90 invert" />
                    </div>
                  </div>
                  <input
                    type="file"
                    id="image"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-lg">
                  <img
                    src={userData.image || assets.profile_pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
              {edit ? (
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full text-2xl sm:text-3xl font-bold bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-center sm:text-left"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {userData.name}
                  </h1>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">Patient Profile</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Contact Information */}
            <div className="bg-gray-50/50 dark:bg-slate-700/20 p-6 rounded-2xl border border-gray-100 dark:border-slate-700/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-5 pb-2 border-b border-gray-200 dark:border-slate-600">
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                  <p className="text-gray-900 dark:text-white font-medium bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm dark:border-slate-600 truncate">
                    {userData.email}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                  {edit ? (
                    <input
                      type="tel"
                      className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                      value={userData.phone}
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm dark:border-slate-600">
                      {userData.phone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Address</label>
                  {edit ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address, Area"
                        className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                        value={userData.address?.line1 || ''}
                        onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      />
                      <input
                        type="text"
                        placeholder="City, State, Zip Code"
                        className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                        value={userData.address?.line2 || ''}
                        onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      />
                    </div>
                  ) : (
                    <div className="text-gray-900 dark:text-white font-medium bg-white dark:bg-slate-800 px-4 py-3 rounded-xl border border-gray-200 shadow-sm dark:border-slate-600 leading-relaxed">
                      {userData.address?.line1 || "No Address Provided"}<br />
                      {userData.address?.line2}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-gray-50/50 dark:bg-slate-700/20 p-6 rounded-2xl border border-gray-100 dark:border-slate-700/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-5 pb-2 border-b border-gray-200 dark:border-slate-600">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                  {edit ? (
                    <select
                      className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm appearance-none"
                      value={userData.gender}
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer Not To Say</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm dark:border-slate-600 capitalize">
                      {userData.gender || "Not Specified"}
                    </p>
                  )}
                </div>
                
                <div>
                   {/* Optional DOB field space, currently missing from state logic, but keeping grid balanced */}
                   {userData.dob && (
                     <>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Date of Birth</label>
                        <p className="text-gray-900 dark:text-white font-medium bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm dark:border-slate-600">
                          {userData.dob}
                        </p>
                     </>
                   )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700/50 flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto sm:justify-end">
            {edit ? (
              <>
                <button
                  className="px-8 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl font-bold transition-colors shadow-sm"
                  onClick={() => {
                    setEdit(false);
                    setImage(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold shadow-md shadow-emerald-500/20 active:translate-y-0.5 transition-all"
                  onClick={updateUserProfileData}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold shadow-md shadow-emerald-500/20 active:translate-y-0.5 transition-all"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
          
        </div>
      </div>
    )
  );
};

export default MyProfile;

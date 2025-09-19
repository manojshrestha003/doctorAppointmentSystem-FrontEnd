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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 flex justify-center">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6">
          
          {/* Profile Picture */}
          <div className="flex justify-center">
            {edit ? (
              <label htmlFor="image" className="cursor-pointer">
                <div className="relative w-28 h-28 mx-auto">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-2 border-gray-400 object-cover"
                  />
                  {!image && (
                    <img
                      src={assets.upload_icon}
                      alt="Upload"
                      className="absolute inset-0 m-auto w-8 h-8 opacity-70"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-gray-400"
              />
            )}
          </div>

          {/* Name */}
          <div className="text-center mt-4">
            {edit ? (
              <input
                type="text"
                className="w-full text-center bg-white/20 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="text-xl font-semibold text-white">{userData.name}</p>
            )}
          </div>

          <hr className="my-5 border-gray-600" />

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold text-white mb-2">Contact Info</p>

            <p className="font-medium text-gray-300">Email:</p>
            <p className="text-gray-200">{userData.email}</p>

            <p className="font-medium text-gray-300 mt-2">Phone:</p>
            {edit ? (
              <input
                type="text"
                className="w-full bg-white/20 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-200">{userData.phone}</p>
            )}

            <p className="font-medium text-gray-300 mt-2">Address:</p>
            {edit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Line 1"
                  className="w-full bg-white/20 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.address?.line1 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Line 2"
                  className="w-full bg-white/20 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.address?.line2 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-200">
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
            )}
          </div>

          <hr className="my-5 border-gray-600" />

          {/* Basic Info */}
          <div>
            <p className="text-lg font-semibold text-white mb-2">Basic Information</p>

            <p className="font-medium text-gray-300">Gender:</p>
            {edit ? (
              <select
                className="w-full bg-white/20 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-200">{userData.gender}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            {edit && (
              <button
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition shadow"
                onClick={() => {
                  setEdit(false);
                  setImage(null);
                }}
              >
                Cancel
              </button>
            )}
            <button
              className={`${
                edit ? 'w-1/2' : 'w-full'
              } bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow`}
              onClick={edit ? updateUserProfileData : () => setEdit(true)}
            >
              {edit ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;

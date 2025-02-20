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
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Picture */}
        {edit ? (
          <label htmlFor="image" className="block cursor-pointer">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
                className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              />
              {image ? null : (
                <img
                  src={assets.upload_icon}
                  alt=""
                  className="absolute inset-0 m-auto w-8 h-8 opacity-75"
                />
              )}
            </div>
            <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
          />
        )}

        {/* Name */}
        <div className="text-center mt-4">
          {edit ? (
            <input
              type="text"
              className="w-full text-center border rounded px-2 py-1"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-lg font-semibold">{userData.name}</p>
          )}
        </div>

        <hr className="my-4" />

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold">Contact Info</p>
          <div className="mt-2">
            <p className="font-medium">Email ID:</p>
            <p className="text-gray-700">{userData.email}</p>

            <p className="font-medium mt-2">Phone:</p>
            {edit ? (
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}

            <p className="font-medium mt-2">Address:</p>
            {edit ? (
              <div>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 mb-2"
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
                  className="w-full border rounded px-2 py-1"
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
              <p className="text-gray-700">
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* Basic Information */}
        <div>
          <p className="text-lg font-semibold">Basic Information</p>
          <div className="mt-2">
            <p className="font-medium">Gender:</p>
            {edit ? (
              <select
                className="w-full border rounded px-2 py-1"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          {edit && (
            <button
              className="w-1/2 bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-600 transition"
              onClick={() => {
                setEdit(false);
                setImage(null);
              }}
            >
              Cancel
            </button>
          )}
          <button
            className={`w-${edit ? '1/2' : 'full'} bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition`}
            onClick={edit ? updateUserProfileData : () => setEdit(true)}
          >
            {edit ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;

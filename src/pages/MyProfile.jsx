import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    image: assets.profile_pic,
    email: 'john@jc.com',
    phone: '1234567890',
    address: {
      line1: '123 Main St',
      line2: 'Kathmandu',
    },
    gender: 'male',
    dob: '1990-01-01',
  });

  const [edit, setEdit] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        {edit ? (
          <input
            type="text"
            className="mt-2 text-center border rounded px-2 py-1"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="mt-2 text-lg font-semibold">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div>
        <p className="text-lg font-semibold">Contact Info</p>
        <div className="mt-2">
          <p className="font-medium">Email ID:</p>
          <p>{userData.email}</p>

          <p className="font-medium mt-2">Phone:</p>
          {edit ? (
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-medium mt-2">Address:</p>
          {edit ? (
            <div>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full mb-2"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
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
              className="border rounded px-2 py-1"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>
      </div>

      {/* Edit Button */}
      <button
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => setEdit(!edit)}
      >
        {edit ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default MyProfile;

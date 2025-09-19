import React, { useContext, useEffect, useState } from 'react';
import { AppContex } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContex);
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700"
        onSubmit={onSubmit}
      >
        <div className="text-center mb-6">
          <p className="text-2xl sm:text-3xl font-bold">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-gray-300 mt-2">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
          </p>
        </div>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <p className="text-gray-300 font-medium">Full Name</p>
            <input
              type="text"
              className="w-full mt-1 p-2 rounded-md border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-300 font-medium">Email</p>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded-md border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-300 font-medium">Password</p>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded-md border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 rounded-xl bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p
          className="mt-4 text-center text-blue-400 cursor-pointer hover:underline"
          onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
        >
          {state === 'Sign Up'
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default Login;

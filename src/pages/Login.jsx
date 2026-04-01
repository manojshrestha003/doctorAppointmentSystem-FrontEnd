import React, { useContext, useEffect, useState } from 'react';
import { AppContex } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

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
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
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
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 relative bg-gray-950 overflow-hidden">
      
      {/* Background decorations matching the theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 dark:border-gray-800 overflow-hidden relative z-10">
        
        {/* Left Side - Visual Content (Hidden on smaller screens) */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500">
          
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(6,182,212,0.5) 0%, transparent 50%)`
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative z-10 p-12 text-white">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <img src={assets.docMeet} alt="Logo" className="h-8 object-contain" />
              </div>
            </div>
            
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              {state === 'Sign Up' 
                ? "Start Your Health Journey Today" 
                : "Welcome Back to docMeet"}
            </h2>
            <p className="text-emerald-50 text-lg font-light leading-relaxed max-w-md">
              {state === 'Sign Up'
                ? "Join our network of thousands of patients and get access to top-rated healthcare professionals from the comfort of your home."
                : "Log in to manage your appointments, view your medical history, and connect directly with your healthcare providers."}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-500 flex justify-center items-center overflow-hidden">
                  <img src={assets.profile_pic} className="w-full h-full object-cover" alt="User" />
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-emerald-500 flex justify-center items-center">
                  <span className="text-teal-700 text-xs font-bold">5k+</span>
                </div>
              </div>
              <p className="text-sm font-medium text-emerald-100">Patients trust us</p>
            </div>
          </div>

          {/* Abstract graphic replacing the image */}
          <div className="relative z-10 mt-auto px-12 pb-12">
            <div className="w-full h-48 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 flex items-end relative overflow-hidden">
              <div className="absolute top-4 left-4 w-20 h-20 bg-emerald-400/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-cyan-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <img src={assets.docMeetImg} alt="Doctor" className="absolute bottom-0 right-0 w-48 object-cover rounded-tl-3xl rounded-br-2xl" 
                style={{ maskImage: 'linear-gradient(to top, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }} />
              <div className="bg-white/90 dark:bg-slate-800/90 py-2 px-4 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-sm z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col justify-center relative z-10 bg-white/5 backdrop-blur-md">
          
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {state === 'Sign Up' ? 'Create Account' : 'Sign in to docMeet'}
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {state === 'Sign Up' 
                ? 'Fill in your details below to get started.' 
                : 'Enter your credentials to securely access your account.'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {state === 'Sign Up' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 focus-within:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="pl-10 w-full p-3 rounded-xl border border-gray-700 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="pl-10 w-full p-3 rounded-xl border border-gray-700 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                {state !== 'Sign Up' && (
                  <a href="#" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
                    Forgot details?
                  </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="pl-10 w-full p-3 rounded-xl border border-gray-700 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
            >
              {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Setup decorative divider */}
          <div className="mt-8 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-700 after:mt-0.5 after:flex-1 after:border-t after:border-gray-700">
            <span className="mx-4 mb-0 text-sm font-medium text-gray-400 uppercase tracking-widest">
              Or
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              {state === 'Sign Up' 
                ? "Already have an account?" 
                : "Don't have an account?"}{" "}
              <button
                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                className="text-emerald-400 font-bold hover:underline underline-offset-4 hover:text-emerald-300 focus:outline-none transition-all"
              >
                {state === 'Sign Up' ? 'Sign In here' : 'Create one now'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

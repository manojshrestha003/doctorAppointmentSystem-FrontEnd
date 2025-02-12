import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      onSubmit={onSubmit}
    >
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-gray-600 mt-2">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an
          appointment.
        </p>
      </div>

      {state === 'Sign Up' && (
        <div className="mt-4">
          <p className="text-gray-700 font-medium">Full Name</p>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
      )}

      <div className="mt-4">
        <p className="text-gray-700 font-medium">Email</p>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-700 font-medium">Password</p>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
      >
        {state === 'Sign Up' ? 'Create Account' : 'Login'}
      </button>

      <p
        className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
        onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
      >
        {state === 'Sign Up'
          ? 'Already have an account? Login'
          : "Don't have an account? Sign Up"}
      </p>
    </form>
  );
};

export default Login;

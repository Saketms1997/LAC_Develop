import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/auth';

const AdminLogin = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      onSuccess();
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8">
        <img src="/images/lac-mark-sm.png" alt="LAC Stones" width="64" height="69" className="h-16 w-auto mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold text-stone-900 text-center">Admin Login</h1>
        <p className="text-sm text-stone-500 text-center mb-6">LAC Stones Pvt. Ltd.</p>

        <label htmlFor="admin-password" className="block text-sm font-medium text-stone-700 mb-1">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        <button type="submit" className="btn-primary w-full mt-6 cursor-pointer">
          Sign In
        </button>
        <Link to="/" className="block text-center text-sm text-stone-500 hover:text-stone-900 mt-4">
          ← Back to website
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;

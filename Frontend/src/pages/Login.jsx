import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Shield } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { ClipboardList } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginWithEmail(formData.email, formData.password);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-10">
      
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-center text-center mb-10 md:mb-0">
        <div className="text-blue-700 font-medium border border-blue-300 bg-white/40 backdrop-blur-lg rounded-full px-4 py-1 mb-6 text-sm shadow">
          Manage all your tasks in one place!
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight mb-6">
          TaskFlow
        </h1>

        <div className="mt-4 w-28 h-28 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow">
          <ClipboardList className="w-12 h-12 text-blue-800" />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800">Welcome back!</h2>
          <p className="text-sm text-gray-700 mt-1">Continue where you left off!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-6 flex items-center justify-center relative">
          <div className="w-full border-t border-gray-300"></div>
          <span className="absolute bg-white/50 backdrop-blur-sm px-3 text-gray-600 text-sm">
            OR
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        

        {/* Info box */}
        <div className="mt-8 p-4 bg-white/40 rounded-lg backdrop-blur-md border border-blue-100">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Need an account?</h3>
          <p className="text-sm text-blue-800">
            Please contact your administrator to create an account. Login credentials will be emailed to you once set up.
          </p>
        </div>

        {/* Admin box */}
        <div className="mt-6 p-4 bg-white/40 backdrop-blur-md border border-purple-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Administrator?</span>
            </div>
            <a
              href="/admin/login"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Admin Login →
            </a>
          </div>
          <p className="text-xs text-purple-800 mt-2">
            Use the admin dashboard to manage users and system settings.
          </p>
        </div>
      </div>
    </div>
  );
}

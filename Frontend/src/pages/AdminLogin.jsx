import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await loginWithEmail(formData.email, formData.password, true);
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-4">
      <div className="max-w-md w-full">
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-blue-800">Admin Portal</h2>
            <p className="text-sm text-gray-700 mt-1">Sign in to manage TaskFlow</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Admin Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Admin Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              {loading ? 'Signing In...' : 'Sign In as Administrator'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-white/40 rounded-lg backdrop-blur-sm border border-blue-100 text-sm text-blue-900">
            <h3 className="font-medium mb-1">Administrator Access</h3>
            <p>
              Access to this portal is restricted to system administrators. Regular users should log in via the main user page
            </p>
            <div className="mt-3">
              <a
                href="/login"
                className="text-blue-700 hover:underline font-medium"
              >
                Go to User Login →
              </a>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-5 p-4 bg-white/40 border border-yellow-200 rounded-lg backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-900">Security Notice</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  Admin accounts have elevated access. Only log in on secure, trusted devices.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

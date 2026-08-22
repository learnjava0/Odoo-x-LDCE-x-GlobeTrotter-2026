import React, { useState } from 'react';
import { User, Mail, Globe, Camera, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: user?.language || 'en',
    photoUrl: user?.avatar || '',
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock save — in production call PUT /api/auth/profile/
    alert('Profile saved!');
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-purple-100 p-2.5 rounded-xl"><User className="w-6 h-6 text-purple-600" /></div>
          Profile & Settings
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">Manage your account details and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-amber-200/50">
              {user?.name?.charAt(0) || 'T'}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-[13px] text-gray-400">{user?.email}</p>
            <p className="text-[12px] text-gray-400 mt-1">Member since {user?.joinedDate || '2026'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">Language</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <select value={form.language} onChange={(e) => update('language', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button type="button" className="flex items-center gap-2 px-5 py-2.5 text-red-500 hover:bg-red-50 font-semibold rounded-xl transition-colors text-[14px]">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
            <button type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200/50 hover:shadow-xl transition-all text-[14px] cursor-pointer">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

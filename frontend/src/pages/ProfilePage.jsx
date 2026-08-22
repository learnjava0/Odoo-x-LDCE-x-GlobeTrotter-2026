import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowRight, Calendar, Briefcase, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { trips } from '../data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: user?.name || 'Ajay Panchal',
    email: user?.email || 'ajaypanchal@gmail.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    bio: 'Passionate globetrotter, photographer, and culture enthusiast.',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const preplannedTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'planning');
  const previousTrips = trips.filter(t => t.status === 'completed');

  return (
    <div className="animate-fade-in space-y-10 max-w-5xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <User className="w-6 h-6" />
          </div>
          User Profile Pages
        </h1>
        <p className={`text-sm mt-1.5 ml-14 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
          Manage your personal details, theme preferences, and view all your travel itineraries
        </p>
      </div>

      {/* Top Section: Image of the User (Left) + User Details with appropriate option to edit (Right) */}
      <div className={`rounded-3xl p-8 shadow-sm border flex flex-col md:flex-row items-center md:items-start gap-8 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        
        {/* Left: Image of the User */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative group cursor-pointer">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-500/30 flex items-center justify-center overflow-hidden shadow-xl group-hover:border-amber-500 transition-all duration-300">
              {photoPreview ? (
                <img src={photoPreview} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-20 h-20 text-amber-600/70" />
              )}
            </div>
            <label htmlFor="user-profile-photo" className="absolute bottom-1 right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
              <input id="user-profile-photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-3">Image of the User</span>
        </div>

        {/* Right: User Details with option to edit */}
        <div className="flex-1 w-full space-y-6">
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
            <div>
              <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>User Details</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Edit your profile information below</p>
            </div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-xs animate-fade-in">
                <CheckCircle2 className="w-4 h-4" /> Saved Successfully!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[12px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-[12px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[12px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-[12px] font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs cursor-pointer hover:scale-105"
              >
                <Save className="w-4 h-4" /> Save Information
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Theme Preference Settings Card (Button in User Profile) */}
      <div className={`rounded-3xl p-6 shadow-sm border flex items-center justify-between transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div>
          <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>Appearance Theme</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Switch between Light mode and Dark mode across the platform</p>
        </div>

        <button
          onClick={toggleTheme}
          className={`px-5 py-2.5 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105 ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-750'
              : 'bg-gray-50 border-gray-200 text-slate-800 hover:bg-gray-100'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          <span>{isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
        </button>
      </div>

      {/* Middle Section: Preplanned Trips */}
      <div className="space-y-4">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Briefcase className="w-5 h-5 text-amber-500" /> Preplanned Trips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preplannedTrips.map((trip) => (
            <div key={trip.id} className={`rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between p-5 space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div>
                <img src={trip.coverPhoto} alt={trip.name} className="w-full h-40 object-cover rounded-2xl mb-3" />
                <h3 className={`font-extrabold text-base mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {trip.startDate} → {trip.endDate}
                </p>
              </div>
              <button
                onClick={() => navigate(`/builder/${trip.id}`)}
                className={`w-full py-3 font-extrabold rounded-2xl transition-all text-xs flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-amber-500 hover:text-white'
                    : 'bg-amber-50 text-amber-700 border-amber-200/50 hover:bg-amber-500 hover:text-white'
                }`}
              >
                View <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Previous Trips */}
      <div className="space-y-4">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Calendar className="w-5 h-5 text-amber-500" /> Previous Trips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previousTrips.map((trip) => (
            <div key={trip.id} className={`rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between p-5 space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div>
                <img src={trip.coverPhoto} alt={trip.name} className="w-full h-40 object-cover rounded-2xl mb-3" />
                <h3 className={`font-extrabold text-base mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {trip.startDate} → {trip.endDate}
                </p>
              </div>
              <button
                onClick={() => navigate(`/itinerary/${trip.id}`)}
                className={`w-full py-3 font-extrabold rounded-2xl transition-all text-xs flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-800 hover:text-white'
                }`}
              >
                View <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Save, ArrowRight, Calendar, Briefcase, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { tripService, userService } from '../api/client';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Keep name in sync when user is loaded from AuthContext
  useEffect(() => {
    if (user?.name) {
      setTimeout(() => setName(user.name), 0);
    }
  }, [user?.name]);

  useEffect(() => {
    tripService.list()
      .then((data) => {
        const results = Array.isArray(data) ? data : (data.results ?? []);
        setTrips(results);
      })
      .catch(console.error)
      .finally(() => setLoadingTrips(false));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userService.updateMe({ name });
      if (refreshUser) {
        await refreshUser();
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Profile save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const preplannedTrips = trips.filter(t => ['PLANNING', 'UPCOMING'].includes((t.status || '').toUpperCase()));
  const previousTrips = trips.filter(t => (t.status || '').toUpperCase() === 'COMPLETED');

  const getCoverImage = (trip) =>
    trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="animate-fade-in space-y-10 max-w-5xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <User className="w-6 h-6" />
          </div>
          User Profile
        </h1>
        <p className={`text-sm mt-1.5 ml-14 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
          Manage your personal details, theme preferences, and view all your travel itineraries
        </p>
      </div>

      {/* Top Section: Image + User Details */}
      <div className={`rounded-3xl p-8 shadow-sm border flex flex-col md:flex-row items-center md:items-start gap-8 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        
        {/* Left: Avatar */}
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
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-3">Profile Photo</span>
        </div>

        {/* Right: User Details */}
        <div className="flex-1 w-full space-y-6">
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
            <div>
              <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>User Details</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Edit your profile information below</p>
            </div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full text-xs animate-fade-in">
                <CheckCircle2 className="w-4 h-4" /> Saved!
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    readOnly
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl text-xs font-medium opacity-60 cursor-not-allowed ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs cursor-pointer hover:scale-105 disabled:opacity-60"
              >
                <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Information'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Theme Preference Card */}
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

      {/* Preplanned Trips */}
      <div className="space-y-4">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Briefcase className="w-5 h-5 text-amber-500" /> Preplanned Trips
        </h2>

        {loadingTrips ? (
          <div className={`rounded-2xl border p-8 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Loading trips...</p>
          </div>
        ) : preplannedTrips.length === 0 ? (
          <div className={`rounded-2xl border p-8 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>No preplanned trips yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preplannedTrips.map((trip) => (
              <div key={trip.id} className={`rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between p-5 space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                <div>
                  <img src={getCoverImage(trip)} alt={trip.name} className="w-full h-40 object-cover rounded-2xl mb-3" />
                  <h3 className={`font-extrabold text-base mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {trip.start_date} → {trip.end_date}
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
        )}
      </div>

      {/* Previous Trips */}
      <div className="space-y-4">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Calendar className="w-5 h-5 text-amber-500" /> Previous Trips
        </h2>

        {!loadingTrips && previousTrips.length === 0 ? (
          <div className={`rounded-2xl border p-8 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>No completed trips yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div key={trip.id} className={`rounded-3xl overflow-hidden border shadow-sm flex flex-col justify-between p-5 space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                <div>
                  <img src={getCoverImage(trip)} alt={trip.name} className="w-full h-40 object-cover rounded-2xl mb-3" />
                  <h3 className={`font-extrabold text-base mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {trip.start_date} → {trip.end_date}
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
        )}
      </div>

    </div>
  );
}

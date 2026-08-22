import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Plus, ArrowRight, Sparkles, Check, DollarSign, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { cities, activities } from '../data/mockData';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [tripName, setTripName] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [addedSuggestions, setAddedSuggestions] = useState([]);

  const toggleSuggestion = (id) => {
    setAddedSuggestions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/builder/1');
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-10 pb-16">
      <div>
        <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          Create a New Trip
        </h1>
        <p className={`text-sm mt-1.5 ml-14 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Plan your dates, pick your destination, and choose activities</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Form Box */}
        <div className={`rounded-3xl p-8 shadow-sm border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-xl font-extrabold tracking-tight pb-4 border-b flex items-center gap-2 ${
            isDark ? 'text-white border-slate-800' : 'text-gray-900 border-gray-50'
          }`}>
            <Sparkles className="w-5 h-5 text-amber-500" /> Plan a new trip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-[13px] font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Trip Name / Start Date:</label>
              <input
                type="text"
                required
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g. Summer Vacation 2026"
                className={`w-full px-4 py-3.5 border rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[13px] font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Select a Place :</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <select
                  required
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-2xl text-[14px] focus:outline-none cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                >
                  <option value="">Choose a destination city...</option>
                  {cities.map(c => <option key={c.id} value={c.name}>{c.name}, {c.country}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-[13px] font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Start Date:</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-2xl text-[14px] ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[13px] font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>End Date:</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-2xl text-[14px] ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Suggestion for Places to Visit / Activities to perform
            </h2>
            <span className="text-xs text-gray-400 font-medium">Click + to add to your new trip</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 6).map((act) => {
              const city = cities.find(c => c.id === act.cityId);
              const isAdded = addedSuggestions.includes(act.id);
              return (
                <div
                  key={act.id}
                  onClick={() => toggleSuggestion(act.id)}
                  className={`rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                    isDark
                      ? isAdded ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20' : 'bg-slate-900 border-slate-800'
                      : isAdded ? 'bg-white border-amber-500 ring-2 ring-amber-500/20' : 'bg-white border-gray-100'
                  }`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={act.imageUrl} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3">
                        <button type="button" className={`p-2 rounded-full shadow-md ${isAdded ? 'bg-amber-500 text-white' : 'bg-white/90 text-gray-700'}`}>
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-amber-500 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5" /> {city?.name}, {city?.country}
                      </div>
                      <h3 className={`font-extrabold text-base group-hover:text-amber-500 transition-colors mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{act.name}</h3>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>{act.description}</p>
                    </div>
                  </div>

                  <div className={`px-6 pb-6 pt-3 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                    <span className="flex items-center gap-1 font-semibold text-gray-400"><Clock className="w-3.5 h-3.5" /> {act.durationMins} min</span>
                    <span className="font-black text-amber-500 text-sm flex items-center"><DollarSign className="w-3.5 h-3.5" /> {act.cost === 0 ? 'Free' : `$${act.cost}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="py-4 px-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 text-base cursor-pointer">
            Build Itinerary Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
}

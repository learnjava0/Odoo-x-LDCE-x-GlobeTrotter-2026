import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, MapPin, DollarSign, Search, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { trips, cities } from '../data/mockData';

const statusColors = {
  upcoming: 'bg-amber-500/20 text-amber-500',
  planning: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
};

const tabs = ['All', 'Upcoming', 'Planning', 'Completed'];

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter((trip) => {
    const matchesTab = activeTab === 'All' || trip.status === activeTab.toLowerCase();
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>My Travel Itineraries</h1>
          <p className={`text-[13px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Manage, edit, and track your travel plans</p>
        </div>
        <button onClick={() => navigate('/create-trip')}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-[14px] cursor-pointer hover:scale-105">
          <Plus className="w-4 h-4" />
          New Trip
        </button>
      </div>

      {/* Tabs + Search */}
      <div className={`rounded-2xl p-2 shadow-sm border flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex gap-1 w-full sm:w-auto">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-50'
              }`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search trips..."
            className={`pl-10 pr-4 py-2.5 border rounded-xl text-[13px] w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'
            }`} />
        </div>
      </div>

      {/* Trip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => {
          const tripCities = trip.stops.map(s => cities.find(c => c.id === s.cityId)?.name).filter(Boolean).join(', ');
          return (
            <div key={trip.id} onClick={() => navigate(`/itinerary/${trip.id}`)}
              className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
              }`}>
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${statusColors[trip.status] || 'bg-amber-500/20 text-amber-500'}`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className={`font-bold text-[15px] group-hover:text-amber-500 transition-colors mb-3 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                  <div className="space-y-2 text-[13px] text-gray-400">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-amber-500" />{trip.startDate} → {trip.endDate}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" />{tripCities || `${trip.stops.length} stops`}</div>
                  </div>
                </div>
              </div>

              <div className={`p-5 pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[12px] text-gray-400">Budget</span>
                  <span className="text-[14px] font-extrabold text-amber-500 ml-1">${trip.totalBudget.toLocaleString()}</span>
                </div>
                <div className={`p-1.5 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors ${
                  isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

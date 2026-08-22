import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Star, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { cities } from '../data/mockData';

export default function CitySearchPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All');

  const filtered = cities.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === 'All' || c.country === country;
    return matchSearch && matchCountry;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Discover Destination Cities</h1>
          <p className={`text-[13px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Explore global cities, travel costs, and popularity indices</p>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-4 shadow-sm border flex flex-col sm:flex-row gap-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search city or country..."
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'
            }`} />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <select value={country} onChange={(e) => setCountry(e.target.value)}
            className={`py-2.5 px-4 border rounded-xl text-[13px] font-semibold cursor-pointer ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'
            }`}>
            <option value="All">All Countries</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="USA">USA</option>
          </select>
        </div>
      </div>

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(city => (
          <div key={city.id} className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border group ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <div className="relative h-48 overflow-hidden">
              <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {city.popularity}% Popularity
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className={`font-extrabold text-lg group-hover:text-amber-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{city.name}</h3>
                <p className="text-xs text-amber-500 font-bold mt-0.5">{city.country}</p>
              </div>
              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>{city.description}</p>
              <div className={`pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                <span className="text-gray-400">Daily Cost Index</span>
                <span className="font-extrabold text-amber-500 text-sm flex items-center"><DollarSign className="w-3.5 h-3.5" />{city.costIndex}/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

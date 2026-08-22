import React, { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, Star } from 'lucide-react';
import { cities } from '../data/mockData';

const countries = ['All', ...new Set(cities.map(c => c.country))];

export default function CitySearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const filtered = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || city.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-blue-100 p-2.5 rounded-xl"><MapPin className="w-6 h-6 text-blue-600" /></div>
          Discover Cities
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">Explore destinations and find your next stop</p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by city or country..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
        </div>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(city => (
          <div key={city.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-gray-50 cursor-pointer">
            <div className="relative h-40 overflow-hidden">
              <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {city.popularity}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-[15px] mb-1">{city.name}</h3>
              <p className="text-[12px] text-gray-400 mb-3">{city.country}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                  <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                  <span>${city.costIndex}/day avg.</span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-emerald-500 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> Popular
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

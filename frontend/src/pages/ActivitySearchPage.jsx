import React, { useState } from 'react';
import { Search, Clock, DollarSign, Tag } from 'lucide-react';
import { activities, cities } from '../data/mockData';

const categories = ['All', ...new Set(activities.map(a => a.category))];
const catColors = { sightseeing: 'bg-blue-50 text-blue-600', food: 'bg-emerald-50 text-emerald-600', adventure: 'bg-purple-50 text-purple-600' };

export default function ActivitySearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = activities.filter(act => {
    const matchesSearch = act.name.toLowerCase().includes(searchQuery.toLowerCase()) || act.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || act.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-purple-100 p-2.5 rounded-xl"><Search className="w-6 h-6 text-purple-600" /></div>
          Discover Activities
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">Find things to do at your destinations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
        </div>
        <div className="flex gap-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold capitalize transition-all ${selectedCategory === cat ? 'bg-amber-50 text-amber-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(act => {
          const city = cities.find(c => c.id === act.cityId);
          return (
            <div key={act.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-gray-50 cursor-pointer">
              <div className="relative h-36 overflow-hidden">
                <img src={act.imageUrl} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${catColors[act.category] || 'bg-gray-50 text-gray-600'}`}>{act.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-[14px] mb-1 group-hover:text-amber-600 transition-colors">{act.name}</h3>
                <p className="text-[12px] text-gray-400 mb-3 line-clamp-2">{act.description}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-gray-50 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-400" />{act.durationMins}min</span>
                  <span className="flex items-center gap-1 font-bold text-amber-600"><DollarSign className="w-3 h-3" />{act.cost === 0 ? 'Free' : `$${act.cost}`}</span>
                  <span className="flex items-center gap-1 ml-auto"><Tag className="w-3 h-3 text-gray-400" />{city?.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Plus, Sparkles, TrendingUp } from 'lucide-react';

const FEATURED_TRIPS = [
  {
    id: 1,
    name: "Summer in Paris & Rome",
    dates: "Jul 15 - Jul 28, 2026",
    stops: 2,
    budget: "$2,400",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tags: ["Culture", "Romantic"]
  },
  {
    id: 2,
    name: "Tokyo & Kyoto Autumn Tour",
    dates: "Oct 10 - Oct 22, 2026",
    stops: 3,
    budget: "$3,100",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tags: ["Adventure", "Foodie"]
  },
  {
    id: 3,
    name: "Amalfi Coast Explorations",
    dates: "Sep 02 - Sep 09, 2026",
    stops: 1,
    budget: "$1,850",
    image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80",
    tags: ["Beach", "Luxury"]
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white py-24 px-8 md:px-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto z-10">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6 border border-indigo-400/25">
            <Sparkles className="w-3.5 h-3.5" />
            Empower Your Next Adventure
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Plan Trips. Track Budgets.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Wander Effortlessly.
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Turn your messy travel spreadsheets and notes into a structured, visual itinerary. Build stops, organize activities, and watch your budget balance itself.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-xl max-w-xl mx-auto flex items-center border border-gray-100">
            <div className="flex items-center flex-1 px-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where to next? (e.g. Paris, Tokyo...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 ml-2 placeholder-gray-400"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-200 flex items-center gap-2">
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Recent Plans & Inspiration</h2>
              <p className="text-slate-500 text-sm mt-0.5">Start a new planning board or continue your drafts</p>
            </div>
            <button 
              onClick={() => navigate('/trips')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              New Trip
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_TRIPS.map((trip) => (
              <div 
                key={trip.id}
                onClick={() => navigate(`/trips`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    {trip.tags.map((tag, i) => (
                      <span key={i} className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors mb-2 line-clamp-1">
                    {trip.name}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{trip.stops} Stops planned</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Estimated Budget</span>
                      <span className="font-black text-indigo-600 text-lg">{trip.budget}</span>
                    </div>
                    <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-indigo-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Quick Stats
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">Planning Dashboard</h3>
            <p className="text-indigo-100 text-sm mb-6">Manage all travel plans in one dashboard.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <span className="text-2xl font-black block">12</span>
                <span className="text-[11px] text-indigo-200 font-medium">Total Trips</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <span className="text-2xl font-black block">$8.4K</span>
                <span className="text-[11px] text-indigo-200 font-medium">Saved Budget</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

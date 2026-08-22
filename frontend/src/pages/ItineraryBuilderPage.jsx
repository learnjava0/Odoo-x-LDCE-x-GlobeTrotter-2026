import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Plus, GripVertical, Search, ArrowRight } from 'lucide-react';
import { trips, cities, activities } from '../data/mockData';

export default function ItineraryBuilderPage() {
  const navigate = useNavigate();
  const trip = trips[0]; // Mock: first trip
  const tripStops = trip.stops.map(s => ({ ...s, city: cities.find(c => c.id === s.cityId) }));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{trip.name}</h1>
          <p className="text-[13px] text-gray-400 mt-1">{trip.startDate} → {trip.endDate} • {trip.stops.length} stops</p>
        </div>
        <button onClick={() => navigate(`/itinerary/${trip.id}`)} className="px-5 py-2.5 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-100 text-[13px] transition-colors flex items-center gap-2">
          Preview <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Stops List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-[15px]">Trip Stops</h2>
            <button className="text-[13px] text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Stop
            </button>
          </div>
          {tripStops.map((stop, i) => {
            const stopActivities = activities.filter(a => a.cityId === stop.cityId).slice(0, 3);
            return (
              <div key={stop.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="pt-1 cursor-grab text-gray-300 hover:text-gray-400"><GripVertical className="w-5 h-5" /></div>
                  <img src={stop.city?.imageUrl} alt={stop.city?.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-full">Stop {i + 1}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-[15px]">{stop.city?.name}, {stop.city?.country}</h3>
                    <div className="flex items-center gap-4 mt-1.5 text-[12px] text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{stop.startDate} → {stop.endDate}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />${stop.city?.costIndex}/day</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stopActivities.map(act => (
                        <span key={act.id} className="text-[11px] bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-medium border border-gray-100">{act.name}</span>
                      ))}
                      <button className="text-[11px] bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold hover:bg-amber-100">+ Add</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Quick City/Activity Search */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 text-[15px] mb-4">Quick Search</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search cities or activities..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
            </div>
            <div className="space-y-3">
              {cities.slice(0, 5).map(city => (
                <div key={city.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <img src={city.imageUrl} alt={city.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-gray-800">{city.name}</p>
                    <p className="text-[11px] text-gray-400">{city.country} • ${city.costIndex}/day</p>
                  </div>
                  <Plus className="w-4 h-4 text-amber-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

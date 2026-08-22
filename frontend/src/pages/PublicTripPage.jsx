import React from 'react';
import { Compass, MapPin, Calendar, Clock, DollarSign, Globe, Copy } from 'lucide-react';
import { trips, cities, activities } from '../data/mockData';

export default function PublicTripPage() {
  const trip = trips[0]; // Mock: first public trip
  const tripStops = trip.stops.map(s => ({ ...s, city: cities.find(c => c.id === s.cityId) }));

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      {/* Public header */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl text-white">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-gray-900">GlobeTrotter</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[13px] text-gray-400"><Globe className="w-4 h-4" />Public Itinerary</span>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 font-semibold rounded-xl hover:bg-amber-100 text-[13px] transition-colors">
            <Copy className="w-4 h-4" /> Copy Trip
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Trip Hero */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
          <div className="relative h-64">
            <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-extrabold tracking-tight">{trip.name}</h1>
              <p className="text-white/80 text-[14px] flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.startDate} → {trip.endDate}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{trip.stops.length} stops</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />${trip.totalBudget}</span>
              </p>
            </div>
          </div>
          <div className="p-6"><p className="text-[14px] text-gray-500 leading-relaxed">{trip.description}</p></div>
        </div>

        {/* Timeline */}
        {tripStops.map((stop, i) => {
          const stopActs = activities.filter(a => a.cityId === stop.cityId);
          return (
            <div key={stop.id} className="relative pl-8 mb-6">
              {i < tripStops.length - 1 && <div className="absolute left-[13px] top-10 bottom-0 w-0.5 bg-amber-200" />}
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold shadow-md">{i + 1}</div>
              <div className="bg-white rounded-2xl p-6 shadow-sm ml-4">
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">{stop.city?.name}, {stop.city?.country}</h3>
                <p className="text-[12px] text-gray-400 mb-4 flex items-center gap-1"><Calendar className="w-3 h-3" />{stop.startDate} → {stop.endDate}</p>
                <div className="space-y-2">
                  {stopActs.map(act => (
                    <div key={act.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={act.imageUrl} alt={act.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-gray-800">{act.name}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{act.durationMins}min</span>
                          <span>${act.cost}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { MapPin, Calendar, Clock, DollarSign, Share2 } from 'lucide-react';
import { trips, cities, activities } from '../data/mockData';

export default function ItineraryViewPage() {
  const trip = trips[0]; // Mock: first trip
  const tripStops = trip.stops.map(s => ({ ...s, city: cities.find(c => c.id === s.cityId) }));

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      {/* Trip Header */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-56">
          <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">{trip.name}</h1>
            <p className="text-white/80 text-[14px] flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.startDate} → {trip.endDate}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{trip.stops.length} stops</span>
            </p>
          </div>
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-xl hover:bg-white/30 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-[14px] text-gray-500 leading-relaxed">{trip.description}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {tripStops.map((stop, i) => {
          const stopActivities = activities.filter(a => a.cityId === stop.cityId);
          return (
            <div key={stop.id} className="relative pl-8">
              {/* Timeline line */}
              {i < tripStops.length - 1 && <div className="absolute left-[13px] top-10 bottom-0 w-0.5 bg-amber-200" />}
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-amber-200/50">
                {i + 1}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 ml-4">
                <div className="flex items-center gap-4 mb-4">
                  <img src={stop.city?.imageUrl} alt={stop.city?.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px]">{stop.city?.name}, {stop.city?.country}</h3>
                    <p className="text-[12px] text-gray-400 flex items-center gap-2 mt-0.5">
                      <Calendar className="w-3 h-3" />{stop.startDate} → {stop.endDate}
                    </p>
                  </div>
                </div>
                {stopActivities.length > 0 && (
                  <div className="space-y-3">
                    {stopActivities.map(act => (
                      <div key={act.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <img src={act.imageUrl} alt={act.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-[13px] font-semibold text-gray-800">{act.name}</p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-3 mt-0.5">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{act.durationMins}min</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${act.cost}</span>
                            <span className="capitalize bg-white px-2 py-0.5 rounded-full border border-gray-100 text-[10px]">{act.category}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

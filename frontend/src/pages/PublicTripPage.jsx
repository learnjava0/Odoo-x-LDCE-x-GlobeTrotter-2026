import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Compass, MapPin, Calendar, Clock, DollarSign, Globe, Copy, Loader2, AlertCircle } from 'lucide-react';
import { publicService } from '../api/client';

export default function PublicTripPage() {
  const { slug } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    publicService.getBySlug(slug)
      .then(setTrip)
      .catch((err) => setError('Trip not found or is private.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Trip Not Found</h1>
        <p className="text-gray-500">This trip either does not exist or has been made private.</p>
      </div>
    );
  }

  const tripStops = trip.stops || [];

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
            <img src={trip.cover_image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'} alt={trip.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-extrabold tracking-tight">{trip.name}</h1>
              <p className="text-white/80 text-[14px] flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.start_date} → {trip.end_date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{tripStops.length} stops</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />${trip.total_budget}</span>
              </p>
            </div>
          </div>
          <div className="p-6"><p className="text-[14px] text-gray-500 leading-relaxed">{trip.description}</p></div>
        </div>

        {/* Timeline */}
        {tripStops.map((stop, i) => {
          const stopActs = stop.activities || [];
          return (
            <div key={stop.id} className="relative pl-8 mb-6">
              {i < tripStops.length - 1 && <div className="absolute left-[13px] top-10 bottom-0 w-0.5 bg-amber-200" />}
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold shadow-md">{i + 1}</div>
              <div className="bg-white rounded-2xl p-6 shadow-sm ml-4">
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">Destination ID: {stop.destination}</h3>
                <p className="text-[12px] text-gray-400 mb-4 flex items-center gap-1"><Calendar className="w-3 h-3" />{stop.start_date} → {stop.end_date}</p>
                <div className="space-y-2">
                  {stopActs.map(act => (
                    <div key={act.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-gray-800">Activity ID: {act.activity}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Time: {act.time}</span>
                          <span>${act.expense || 0}</span>
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

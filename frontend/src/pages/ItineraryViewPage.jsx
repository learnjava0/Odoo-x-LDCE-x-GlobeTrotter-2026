import { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowDown, MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { tripService } from '../api/client';

export default function ItineraryViewPage() {
  const { isDark } = useTheme();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    tripService.get(tripId || 1)
      .then(setTrip)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!trip) {
    return <div className="p-8 text-center text-red-500">Trip not found</div>;
  }

  const daysData = []; // Replace with actual itinerary transformation once we build Itinerary Stop endpoint mapping


  return (
    <div className="animate-fade-in space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Controls Bar */}
      <div className={`rounded-2xl p-3 shadow-sm border flex flex-col md:flex-row items-center gap-3 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bar ......"
            className={`w-full pl-11 pr-4 py-3 border rounded-xl text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400'
            }`}
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <select className={`px-4 py-3 border rounded-xl text-[13px] font-semibold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option>Group by: Day</option>
          </select>
          <select className={`px-4 py-3 border rounded-xl text-[13px] font-semibold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option>Filter: All</option>
          </select>
          <select className={`px-4 py-3 border rounded-xl text-[13px] font-semibold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option>Sort by: Time</option>
          </select>
        </div>
      </div>

      {/* Main Title */}
      <div className={`rounded-3xl p-8 shadow-sm border space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Itinerary for a selected place: <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{trip.name}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-amber-500" /> {trip.start_date} → {trip.end_date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-500" /> {trip.cities_count || (trip.stops?.length || 0)} Destinations</span>
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => navigate(`/builder/${tripId || 1}`)}
              className={`px-5 py-2.5 font-bold rounded-2xl transition-colors flex items-center gap-2 text-sm w-full md:w-auto justify-center ${
                isDark ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              Edit in Builder
            </button>
            <div className={`border rounded-2xl px-5 py-3 text-right w-full md:w-auto ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50 border-amber-200/60'}`}>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Estimated Expense</span>
              <span className="text-2xl font-black text-amber-500">₹{Number(trip.estimated_budget || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between text-sm font-extrabold uppercase tracking-wider px-4 pt-2 text-gray-400">
          <span>Physical Activity</span>
          <span>Expense</span>
        </div>

        {/* Day Timelines */}
        <div className="space-y-10">
          {daysData.map((dayGroup) => (
            <div key={dayGroup.dayLabel} className="space-y-4">
              
              <div className="inline-flex items-center gap-2 bg-amber-500 text-white font-extrabold px-4 py-1.5 rounded-full text-xs shadow-sm">
                <Calendar className="w-3.5 h-3.5" /> {dayGroup.dayLabel} — {dayGroup.date}
              </div>

              <div className="space-y-4 pt-2">
                {dayGroup.activities.map((act, idx) => (
                  <Fragment key={act.id}>
                    <div className={`rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      isDark ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'
                    }`}>
                      
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${isDark ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-white text-amber-600 border-gray-100'}`}>
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-amber-500">{act.time}</span>
                          <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{act.name}</h3>
                        </div>
                      </div>

                      <div className={`px-5 py-3 rounded-xl border shadow-sm shrink-0 sm:text-right ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200/80'
                      }`}>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Expense</span>
                        <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{act.expense.toFixed(2)}</span>
                      </div>
                    </div>

                    {idx < dayGroup.activities.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className={`p-1 rounded-full ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

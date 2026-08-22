import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, MapPin, DollarSign, Search, ArrowRight, Loader2, Compass, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { tripService } from '../api/client';

const statusColors = {
  UPCOMING: 'bg-amber-500/20 text-amber-500',
  PLANNING: 'bg-blue-500/20 text-blue-400',
  COMPLETED: 'bg-emerald-500/20 text-emerald-400',
  ONGOING: 'bg-purple-500/20 text-purple-400',
};

const tabs = ['All', 'Upcoming', 'Planning', 'Completed', 'Ongoing'];

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripService.list()
      .then((data) => {
        const results = Array.isArray(data) ? data : (data.results ?? []);
        setTrips(results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const status = (trip.status || '').toUpperCase();
    const matchesTab = activeTab === 'All' || status === activeTab.toUpperCase();
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDeleteTrip = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this trip?')) return;
    try {
      await tripService.delete(id);
      setTrips(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
      alert('Failed to delete trip.');
    }
  };

  const getCoverImage = (trip) =>
    trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

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
        <div className="flex gap-1 w-full sm:w-auto flex-wrap">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
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
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className={`rounded-3xl border p-16 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <Compass className="w-12 h-12 text-amber-500/40 mx-auto mb-3" />
          <p className={`font-semibold text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
            {trips.length === 0 ? 'No trips yet — create your first adventure!' : 'No trips match your filter.'}
          </p>
          {trips.length === 0 && (
            <button onClick={() => navigate('/create-trip')}
              className="mt-4 bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-600 transition-colors">
              Plan a Trip
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const statusKey = (trip.status || '').toUpperCase();
            const stopCities = Array.isArray(trip.stops)
              ? trip.stops.map(s => s.city_detail?.city_name || s.city_detail?.name).filter(Boolean).join(', ')
              : '';
            return (
              <div key={trip.id} onClick={() => navigate(statusKey === 'PLANNING' ? `/builder/${trip.id}` : `/itinerary/${trip.id}`)}
                className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
                }`}>
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img src={getCoverImage(trip)} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${statusColors[statusKey] || 'bg-amber-500/20 text-amber-500'}`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteTrip(trip.id); }}
                        className="p-2 bg-red-500/90 text-white rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-bold text-[15px] group-hover:text-amber-500 transition-colors mb-3 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</h3>
                    <div className="space-y-2 text-[13px] text-gray-400">
                      <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-amber-500" />{trip.start_date} → {trip.end_date}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {stopCities || `${trip.cities_count ?? (trip.stops?.length ?? 0)} cities`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-5 pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[12px] text-gray-400">Budget</span>
                    <span className="text-[14px] font-extrabold text-amber-500 ml-1">₹{Number(trip.estimated_budget || 0).toLocaleString()}</span>
                  </div>
                  <div className={`p-1.5 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

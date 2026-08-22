import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, Calendar, ArrowRight, Sparkles, Compass, Loader2, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { tripService} from '../api/client';

const REGIONAL_SELECTIONS = [
  { id: 1, name: 'Europe', citiesCount: 42, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', tag: 'Popular' },
  { id: 2, name: 'Asia', citiesCount: 38, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80', tag: 'Exotic' },
  { id: 3, name: 'Americas', citiesCount: 29, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80', tag: 'Trending' },
  { id: 4, name: 'Oceania', citiesCount: 15, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80', tag: 'Scenic' },
  { id: 5, name: 'Middle East', citiesCount: 18, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', tag: 'Luxury' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupBy, setSelectedGroupBy] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Date');

  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    tripService.list()
      .then((data) => {
        // DRF may return paginated or raw array
        const results = Array.isArray(data) ? data : (data.results ?? []);
        setTrips(results);
      })
      .catch(console.error)
      .finally(() => setLoadingTrips(false));
  }, []);

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

  const filteredTrips = trips.filter(trip => {
    const matchesSearch =
      (trip.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trip.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' ||
      (trip.status || '').toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (selectedSort === 'Date') return new Date(b.start_date) - new Date(a.start_date);
    if (selectedSort === 'Name') return a.name.localeCompare(b.name);
    if (selectedSort === 'Budget') return (b.estimated_budget || 0) - (a.estimated_budget || 0);
    return 0;
  });

  // Map backend field names to display-friendly names
  const getCoverImage = (trip) => trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="animate-fade-in space-y-10 relative pb-20">
      
      {/* 1. Large Hero Banner Image */}
      <div className="relative rounded-3xl overflow-hidden h-[340px] shadow-xl border border-gray-100/10 group">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
          alt="Main Banner"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent flex flex-col justify-center px-8 md:px-14 text-white">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/30 text-amber-300 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 border border-amber-400/30 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Explore The World
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-xl">
            Where to Next, <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">GlobeTrotter?</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-lg mt-3 font-normal leading-relaxed">
            Build customized multi-city itineraries, estimate spend, share public plans, and copy trips worth repeating.
          </p>
        </div>
      </div>

      {/* 2. Controls Bar */}
      <div className={`rounded-2xl p-3 shadow-sm border flex flex-col md:flex-row items-center gap-3 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips..."
            className={`w-full pl-11 pr-4 py-3 border rounded-xl text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-800 placeholder-gray-400'
            }`}
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <select value={selectedGroupBy} onChange={(e) => setSelectedGroupBy(e.target.value)}
            className={`px-4 py-3 border rounded-xl text-[13px] font-semibold cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option value="All">Group by: All</option>
            <option value="Region">Group by: Region</option>
            <option value="Status">Group by: Status</option>
          </select>
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl text-[13px] font-semibold cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option value="All">Filter: All</option>
            <option value="Upcoming">Filter: Upcoming</option>
            <option value="Planning">Filter: Planning</option>
            <option value="Completed">Filter: Completed</option>
          </select>
          <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}
            className={`px-4 py-3 border rounded-xl text-[13px] font-semibold cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option value="Date">Sort by: Date</option>
            <option value="Budget">Sort by: Budget</option>
            <option value="Name">Sort by: Name</option>
          </select>
        </div>
      </div>

      {/* 3. Top Regional Selections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Compass className="w-5 h-5 text-amber-500" /> Top Regional Selections
          </h2>
          <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Explore curated regions</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {REGIONAL_SELECTIONS.map((region) => (
            <div
              key={region.id}
              onClick={() => navigate('/cities')}
              className={`group cursor-pointer rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
              }`}
            >
              <div className="relative h-32 overflow-hidden">
                <img src={region.image} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {region.tag}
                </span>
                <div className="absolute bottom-2.5 left-3 text-white">
                  <h3 className="font-extrabold text-sm">{region.name}</h3>
                  <p className="text-[11px] text-white/80">{region.citiesCount} Cities</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. My Trips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <MapPin className="w-5 h-5 text-amber-500" /> My Trips
          </h2>
          <button onClick={() => navigate('/trips')} className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loadingTrips ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : sortedTrips.length === 0 ? (
          <div className={`rounded-3xl border p-12 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <Compass className="w-12 h-12 text-amber-500/40 mx-auto mb-3" />
            <p className={`font-semibold text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>No trips yet — plan your first adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedTrips.slice(0, 6).map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate((trip.status || '').toUpperCase() === 'PLANNING' ? `/builder/${trip.id}` : `/itinerary/${trip.id}`)}
                className={`group cursor-pointer rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={getCoverImage(trip)} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-600 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm capitalize">
                      {trip.status}
                    </div>
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteTrip(trip.id); }}
                        className="p-2 bg-red-500/90 text-white rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className={`font-extrabold text-base group-hover:text-amber-500 transition-colors mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {trip.name}
                    </h3>
                    <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>{trip.description}</p>
                    <div className="space-y-2 text-[12px]">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{trip.start_date} → {trip.end_date}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{trip.cities_count ?? (trip.stops?.length ?? 0)} Cities</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`px-6 pb-6 pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Est. Budget</span>
                    <span className="font-black text-amber-500 text-lg"> ₹{Number(trip.estimated_budget || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Fixed Floating Action Button */}
      <button
        onClick={() => navigate('/create-trip')}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black px-6 py-4 rounded-full shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 text-sm cursor-pointer border-2 border-white/20"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
        Plan a trip
      </button>
    </div>
  );
}

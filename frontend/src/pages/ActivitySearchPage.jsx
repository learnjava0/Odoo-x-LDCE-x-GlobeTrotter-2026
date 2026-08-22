import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { activityService } from '../api/client';

export default function ActivitySearchPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activityService.list().then(data => {
      setActivities(Array.isArray(data) ? data : (data.results ?? []));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(activities.map(a => a.category))];

  const filtered = activities.filter(act => {
    const actName = act.name || '';
    const actDesc = act.description || '';
    const matchSearch = actName.toLowerCase().includes(search.toLowerCase()) || actDesc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || act.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Activity & Experience Catalog</h1>
        <p className={`text-[13px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Discover tours, museums, hikes, and local dining experiences</p>
      </div>

      {/* Controls */}
      <div className={`rounded-2xl p-4 shadow-sm border flex flex-col sm:flex-row gap-4 justify-between items-center ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activities..."
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'
            }`} />
        </div>
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize cursor-pointer transition-all shrink-0 ${
                category === cat
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-50'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(act => (
            <div key={act.id} className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col justify-between ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img src={act.image_url || 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {act.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Destination ID: {act.destination}
                  </span>
                  <h3 className={`font-extrabold text-base group-hover:text-amber-500 transition-colors line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{act.name}</h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>{act.description}</p>
                </div>
              </div>

              <div className={`p-6 pt-3 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                <span className="flex items-center gap-1 text-gray-400 font-semibold"><Clock className="w-3.5 h-3.5" /> {act.duration_mins} mins</span>
                <span className="font-black text-amber-500 text-sm flex items-center">{Number(act.estimated_cost) === 0 ? 'Free' : `₹${Number(act.estimated_cost).toLocaleString()}`}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={`col-span-full p-8 text-center rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-white border-gray-100 text-gray-500'}`}>
              No activities found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

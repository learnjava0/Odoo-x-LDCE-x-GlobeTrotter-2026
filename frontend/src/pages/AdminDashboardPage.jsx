import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Users, MapPin, Activity, TrendingUp, CheckCircle2, Loader2, X } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext.jsx';
import { adminService } from '../api/client';

const cities = [
  { id: 1, name: "Paris", country: "France", costIndex: 145.00, popularity: 98, imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Rome", country: "Italy", costIndex: 120.00, popularity: 95, imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Tokyo", country: "Japan", costIndex: 130.00, popularity: 92, imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
];

const activities = [
  { id: 1, name: "Eiffel Tower Visit", cost: 26.00, imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Louvre Museum", cost: 17.00, imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Seine River Cruise", cost: 15.00, imageUrl: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=600&q=80" },
];


const pieChartData = [
  { name: 'Active Travelers', value: 450, color: '#0EA5E9' },
  { name: 'Completed Trips', value: 320, color: '#10B981' },
  { name: 'Pending Approvals', value: 120, color: '#F59E0B' },
  { name: 'Draft Itineraries', value: 110, color: '#8B5CF6' },
];

const lineChartData = [
  { month: 'May', value: 30 },
  { month: 'Jun', value: 45 },
  { month: 'Jul', value: 35 },
  { month: 'Aug', value: 60 },
  { month: 'Sep', value: 50 },
  { month: 'Oct', value: 75 },
];

const stackedBarData = [
  { date: '30 Sep', transport: 380, activities: 55, stay: 115 },
  { date: '10 Oct', transport: 405, activities: 0, stay: 110 },
  { date: '20 Oct', transport: 315, activities: 45, stay: 70 },
  { date: '30 Oct', transport: 425, activities: 65, stay: 110 },
  { date: '10 Nov', transport: 415, activities: 0, stay: 75 },
];

function OrlandoConcentricRings({ isDark }) {
  const outerC = 2 * Math.PI * 72;
  const middleC = 2 * Math.PI * 56;
  const innerC = 2 * Math.PI * 40;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[190px] h-[190px] flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 170 170">
          <circle cx="85" cy="85" r="72" fill="none" stroke={isDark ? '#334155' : '#F3E8FF'} strokeWidth="10" />
          <circle cx="85" cy="85" r="72" fill="none" stroke="#7C3AED" strokeWidth="10" strokeDasharray={outerC} strokeDashoffset={outerC * 0.22} strokeLinecap="round" />
          <circle cx="85" cy="85" r="56" fill="none" stroke={isDark ? '#334155' : '#FEE2E2'} strokeWidth="10" />
          <circle cx="85" cy="85" r="56" fill="none" stroke="#EF4444" strokeWidth="10" strokeDasharray={middleC} strokeDashoffset={middleC * 0.38} strokeLinecap="round" />
          <circle cx="85" cy="85" r="40" fill="none" stroke={isDark ? '#334155' : '#FEF3C7'} strokeWidth="10" />
          <circle cx="85" cy="85" r="40" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray={innerC} strokeDashoffset={innerC * 0.48} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>200</span>
          <span className="text-[10px] text-gray-400 font-semibold">Total application</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 w-full text-center">
        <div>
          <span className="w-1.5 h-3 bg-purple-600 inline-block rounded-full mr-1" />
          <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>100</span>
          <p className="text-[10px] text-gray-400">Pending</p>
        </div>
        <div>
          <span className="w-1.5 h-3 bg-red-500 inline-block rounded-full mr-1" />
          <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>60</span>
          <p className="text-[10px] text-gray-400">Approved</p>
        </div>
        <div>
          <span className="w-1.5 h-3 bg-amber-500 inline-block rounded-full mr-1" />
          <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>40</span>
          <p className="text-[10px] text-gray-400">Rejected</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('User Trends and Analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [tripsModal, setTripsModal] = useState(null); // { userName, trips[] }

  // Fetch users + all trips when Manage Users tab is opened
  useEffect(() => {
    if (activeTab === 'Manage Users') {
      setLoadingUsers(true);
      Promise.all([adminService.users(), adminService.trips()])
        .then(([usersData, tripsData]) => {
          setUsers(Array.isArray(usersData) ? usersData : (usersData.results ?? []));
          setAllTrips(Array.isArray(tripsData) ? tripsData : (tripsData.results ?? []));
        })
        .catch(console.error)
        .finally(() => setLoadingUsers(false));
    }
  }, [activeTab]);

  const filteredUsers = users.filter(u =>
    (u.name || u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'Manage Users', label: 'Manage Users', icon: Users },
    { id: 'Popular cities', label: 'Popular cities', icon: MapPin },
    { id: 'Popular Activities', label: 'Popular Activities', icon: Activity },
    { id: 'User Trends and Analytics', label: 'User Trends and Analytics', icon: TrendingUp },
  ];

  return (
    <div className="animate-fade-in space-y-8 max-w-6xl mx-auto pb-16">
      
      <div>
        <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          Admin Panel Screen / Screen 12
        </h1>
        <p className={`text-sm mt-1.5 ml-14 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>System metrics, user management, and trend analytics</p>
      </div>

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
            <option>Group by: All</option>
          </select>
          <select className={`px-4 py-3 border rounded-xl text-[13px] font-semibold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option>Filter: All</option>
          </select>
          <select className={`px-4 py-3 border rounded-xl text-[13px] font-semibold ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
            <option>Sort by: Default</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className={`rounded-2xl p-2 shadow-sm border flex flex-wrap gap-2 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] px-5 py-3 rounded-xl text-[13px] font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                  : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'Manage Users' && (
        <div className={`rounded-3xl p-8 shadow-sm border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
        }`}>
          <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
            <h2 className="text-xl font-black">Manage User Section</h2>
            <p className="text-xs text-gray-400 mt-1">Live user data from the database — manage users and view their trips.</p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-gray-50 text-gray-400'}`}>
                  <th className="text-left text-[11px] font-semibold uppercase pb-3 pr-4">User</th>
                  <th className="text-left text-[11px] font-semibold uppercase pb-3 pr-4">Email</th>
                  <th className="text-left text-[11px] font-semibold uppercase pb-3 pr-4">Trips Created</th>
                  <th className="text-left text-[11px] font-semibold uppercase pb-3 pr-4">Role</th>
                  <th className="text-left text-[11px] font-semibold uppercase pb-3 pr-4">Joined</th>
                  <th className="text-right text-[11px] font-semibold uppercase pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const userTrips = allTrips.filter(t => t.user_id === user.id);
                  return (
                  <tr key={user.id} className={`border-b last:border-0 ${isDark ? 'border-slate-800 hover:bg-slate-800/50' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                    <td className="py-4 pr-4 text-xs font-bold">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs shrink-0">
                          {(user.name || user.email || '?').charAt(0).toUpperCase()}
                        </div>
                        {user.name || '—'}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-xs text-gray-400">{user.email}</td>
                    <td className="py-4 pr-4 text-xs font-extrabold">{userTrips.length} Trips</td>
                    <td className="py-4 pr-4 text-xs">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        (user.is_admin || user.is_superuser) ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {(user.is_admin || user.is_superuser) ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-xs text-gray-400">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => setTripsModal({ userName: user.name || user.email, trips: userTrips })}
                        className="px-3 py-1.5 bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        View Trips
                      </button>
                    </td>
                  </tr>
                  );
                })}
                {filteredUsers.length === 0 && !loadingUsers && (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-400 text-sm">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}

      {/* Trips Modal */}
      {tripsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setTripsModal(null)}>
          <div onClick={e => e.stopPropagation()} className={`rounded-3xl p-8 shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{tripsModal.userName}'s Trips</h2>
                <p className="text-xs text-gray-400 mt-1">{tripsModal.trips.length} trip(s) found</p>
              </div>
              <button onClick={() => setTripsModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {tripsModal.trips.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No trips created yet.</p>
            ) : (
              <div className="space-y-3">
                {tripsModal.trips.map(trip => (
                  <div key={trip.id} className={`flex items-center justify-between p-4 rounded-2xl border ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <div>
                      <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{trip.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{trip.start_date} → {trip.end_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        trip.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                        trip.status === 'ONGOING' ? 'bg-purple-500/20 text-purple-400' :
                        trip.status === 'UPCOMING' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{trip.status}</span>
                      <button
                        onClick={() => { setTripsModal(null); navigate(`/itinerary/${trip.id}`); }}
                        className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors"
                      >
                        Open →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Popular cities */}
      {activeTab === 'Popular cities' && (
        <div className={`rounded-3xl p-8 shadow-sm border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
        }`}>
          <h2 className="text-xl font-black">Popular cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.slice(0, 6).map(city => (
              <div key={city.id} className={`rounded-2xl p-4 border flex items-center gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                <img src={city.imageUrl} alt={city.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-extrabold text-sm">{city.name}</h3>
                  <p className="text-xs text-gray-400">{city.country} • ₹{city.costIndex}/day</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Popular Activities */}
      {activeTab === 'Popular Activities' && (
        <div className={`rounded-3xl p-8 shadow-sm border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
        }`}>
          <h2 className="text-xl font-black">Popular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.slice(0, 6).map(act => (
              <div key={act.id} className={`rounded-2xl p-4 border flex items-center gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                <img src={act.imageUrl} alt={act.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-extrabold text-xs">{act.name}</h3>
                  <p className="text-[11px] text-amber-500 font-bold">{act.cost === 0 ? 'Free' : `₹${act.cost}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: User Trends and Analytics */}
      {activeTab === 'User Trends and Analytics' && (
        <div className="space-y-8">
          
          <div className={`rounded-3xl p-6 shadow-sm border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
          }`}>
            <h2 className="text-xl font-black">User trends and Analytics</h2>
            <p className="text-xs text-gray-400 mt-1">Provides analysis across various data points and gives useful information to the user.</p>
          </div>

          <div className={`rounded-3xl p-8 border space-y-8 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'
          }`}>
            
            {/* Pie Chart Card */}
            <div className={`rounded-3xl p-6 shadow-sm border ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
            }`}>
              <h3 className="font-extrabold text-sm mb-4">Traveler Status Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="space-y-3 shrink-0">
                  {pieChartData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-semibold">{item.name}</span>
                      <span className="text-xs font-black ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="w-[200px] h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4} dataKey="value" strokeWidth={0}>
                        {pieChartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Line Chart Card */}
            <div className={`rounded-3xl p-6 shadow-sm border ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
            }`}>
              <h3 className="font-extrabold text-sm mb-4">Monthly User Engagement Trend</h3>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#F3F4F6'} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke={isDark ? '#cbd5e1' : '#4B5563'} strokeWidth={3} dot={{ r: 7, fill: '#EF4444', stroke: '#EF4444', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orlando Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`rounded-3xl p-6 shadow-sm border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
              }`}>
                <h3 className="font-extrabold text-sm mb-2">Staff Applications Card (Concentric Rings)</h3>
                <OrlandoConcentricRings isDark={isDark} />
              </div>

              <div className={`rounded-3xl p-6 shadow-sm border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-gray-900'
              }`}>
                <h3 className="font-extrabold text-sm mb-2">Annual Payroll Summary (Stacked Bars)</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stackedBarData} barSize={12} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#F3F4F6'} vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="transport" stackId="a" fill="#7C3AED" />
                      <Bar dataKey="activities" stackId="a" fill="#EF4444" />
                      <Bar dataKey="stay" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

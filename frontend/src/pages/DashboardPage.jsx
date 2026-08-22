import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Activity, DollarSign, TrendingUp, TrendingDown, Minus, ArrowRight, MoreVertical } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats, trips, budgetBreakdown, upcomingActivities } from '../data/mockData';

const statCards = [
  { label: 'Total Trips', value: dashboardStats.totalTrips, change: '+2 more than last quarter', trend: 'up', color: 'amber', icon: Briefcase },
  { label: 'Cities Visited', value: dashboardStats.citiesVisited, change: '+3 more than last quarter', trend: 'up', color: 'green', icon: MapPin },
  { label: 'Activities Planned', value: dashboardStats.activitiesPlanned, change: '+5 more than last quarter', trend: 'up', color: 'purple', icon: Activity },
  { label: 'Total Budget', value: `$${(dashboardStats.totalBudget / 1000).toFixed(1)}K`, change: 'On track', trend: 'neutral', color: 'blue', icon: DollarSign },
];

const colorMap = {
  amber: { border: 'border-l-amber-500', bg: 'bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100' },
  green: { border: 'border-l-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  purple: { border: 'border-l-purple-500', bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
  blue: { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
};

const CHART_COLORS = ['#F59E0B', '#8B5CF6', '#3B82F6', '#10B981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 text-xs">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-amber-600 font-bold">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-8">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const colors = colorMap[card.color];
          const Icon = card.icon;
          return (
            <div key={i} className={`bg-white rounded-2xl p-6 border-l-4 ${colors.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 mb-1">{card.value}</p>
              <p className="text-[13px] text-gray-400 font-medium mb-3">{card.label}</p>
              <div className="flex items-center gap-1.5">
                {card.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                {card.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                {card.trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-blue-500" />}
                <span className={`text-[12px] font-medium ${card.trend === 'up' ? 'text-emerald-500' : card.trend === 'down' ? 'text-red-500' : 'text-blue-500'}`}>
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Category Donut */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-[15px]">Budget by Category</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={budgetBreakdown.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {budgetBreakdown.categories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {budgetBreakdown.categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[12px] text-gray-500">{cat.name}</span>
                <span className="text-[12px] font-bold text-gray-700 ml-auto">${cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Spending Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-[15px]">Daily Spending</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={budgetBreakdown.dailySpending} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Trend Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-[15px]">Total Spending</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mb-1">${dashboardStats.totalBudget.toLocaleString()}</p>
          <p className="text-[12px] text-emerald-500 font-medium mb-4 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 21% vs last month
          </p>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={budgetBreakdown.monthlyTrend}>
              <defs>
                <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="spent" stroke="#8B5CF6" fill="url(#spentGradient)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-[15px]">Recent Trips</h3>
            <button onClick={() => navigate('/trips')} className="text-[13px] text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">S/N</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">Trip Name</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">Date</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.slice(0, 4).map((trip, i) => (
                  <tr key={trip.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors" onClick={() => navigate('/trips')}>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-400 font-medium">{String(i + 1).padStart(2, '0')}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-800 font-semibold">{trip.name}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-500">{trip.startDate}</td>
                    <td className="py-3.5">
                      <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${
                        trip.status === 'upcoming' ? 'bg-amber-50 text-amber-600' :
                        trip.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Activities Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-[15px]">Upcoming Activities</h3>
            <button onClick={() => navigate('/activities')} className="text-[13px] text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">S/N</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">Activity</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">City</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3 pr-4">Date</th>
                  <th className="text-right text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">Cost</th>
                </tr>
              </thead>
              <tbody>
                {upcomingActivities.map((act, i) => (
                  <tr key={act.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pr-4 text-[13px] text-gray-400 font-medium">{String(i + 1).padStart(2, '0')}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-800 font-semibold">{act.name}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-500">{act.city}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-gray-500">{act.date}</td>
                    <td className="py-3.5 text-right text-[13px] font-bold text-gray-700">${act.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Activity, DollarSign, TrendingUp, TrendingDown, Minus, ArrowRight, MoreVertical } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats, trips, upcomingActivities } from '../data/mockData';

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

// Stacked Bar Chart Data (Orlando Annual Payroll Summary Style)
const stackedBarData = [
  { date: '30 Sep', transport: 380, activities: 55, stay: 115 },
  { date: '10 Oct', transport: 405, activities: 0, stay: 110 },
  { date: '20 Oct', transport: 315, activities: 45, stay: 70 },
  { date: '30 Oct', transport: 425, activities: 65, stay: 110 },
  { date: '10 Nov', transport: 415, activities: 0, stay: 75 },
];

// Area Chart Trend Data
const areaTrendData = [
  { month: '30 Sep', amount: 3000 },
  { month: '10 Oct', amount: 4500 },
  { month: '20 Oct', amount: 3400 },
  { month: '30 Oct', amount: 6200 },
  { month: '10 Nov', amount: 11800 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 text-xs space-y-1">
        <p className="font-semibold text-gray-700">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="font-bold" style={{ color: entry.fill || entry.color }}>
            {entry.name}: ${entry.value}k
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Concentric Circular Rings SVG Component (Orlando Style)
function ConcentricRingsChart() {
  const outerC = 2 * Math.PI * 78; // r=78
  const middleC = 2 * Math.PI * 62; // r=62
  const innerC = 2 * Math.PI * 46; // r=46

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[210px] h-[210px] flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 180 180">
          {/* Outer Ring Background (Purple) */}
          <circle cx="90" cy="90" r="78" fill="none" stroke="#F3E8FF" strokeWidth="11" />
          {/* Outer Ring Value (Purple) */}
          <circle
            cx="90" cy="90" r="78" fill="none" stroke="#7C3AED" strokeWidth="11"
            strokeDasharray={outerC} strokeDashoffset={outerC * (1 - 0.78)}
            strokeLinecap="round" className="transition-all duration-1000 ease-out"
          />

          {/* Middle Ring Background (Red) */}
          <circle cx="90" cy="90" r="62" fill="none" stroke="#FEE2E2" strokeWidth="11" />
          {/* Middle Ring Value (Red) */}
          <circle
            cx="90" cy="90" r="62" fill="none" stroke="#EF4444" strokeWidth="11"
            strokeDasharray={middleC} strokeDashoffset={middleC * (1 - 0.62)}
            strokeLinecap="round" className="transition-all duration-1000 ease-out"
          />

          {/* Inner Ring Background (Yellow) */}
          <circle cx="90" cy="90" r="46" fill="none" stroke="#FEF3C7" strokeWidth="11" />
          {/* Inner Ring Value (Yellow) */}
          <circle
            cx="90" cy="90" r="46" fill="none" stroke="#F59E0B" strokeWidth="11"
            strokeDasharray={innerC} strokeDashoffset={innerC * (1 - 0.52)}
            strokeLinecap="round" className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-gray-900 tracking-tight leading-none">200</span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1">Total application</span>
        </div>
      </div>

      {/* Legend below concentric rings */}
      <div className="grid grid-cols-3 gap-6 mt-6 w-full px-2">
        <div className="flex items-start gap-2.5">
          <div className="w-1.5 h-8 bg-purple-600 rounded-full shrink-0" />
          <div>
            <p className="text-lg font-black text-gray-900 leading-none">100</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Pending</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-1.5 h-8 bg-red-500 rounded-full shrink-0" />
          <div>
            <p className="text-lg font-black text-gray-900 leading-none">60</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Approved</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-1.5 h-8 bg-amber-500 rounded-full shrink-0" />
          <div>
            <p className="text-lg font-black text-gray-900 leading-none">40</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

      {/* Charts Row — Matching Orlando Dashboard Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Concentric Rings (Staff Applications Style) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-[16px]">Staff applications card</h3>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <ConcentricRingsChart />
        </div>

        {/* Card 2: Stacked Bar Chart (Annual Payroll Summary Style) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-[16px]">Annual payroll summary</h3>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stackedBarData} barSize={12} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}k`}
                  domain={[0, 600]}
                  ticks={[0, 200, 300, 400, 500, 600]}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Stacked bars: Bottom (Purple), Middle (Red), Top (Yellow with rounded corners) */}
                <Bar dataKey="transport" name="Loan" stackId="a" fill="#7C3AED" />
                <Bar dataKey="activities" name="Net salary" stackId="a" fill="#EF4444" />
                <Bar dataKey="stay" name="Tax" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend below stacked bar chart */}
          <div className="flex items-center gap-5 mt-4 pt-2 text-[12px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
              <span className="text-gray-600 font-medium">Net salary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              <span className="text-gray-600 font-medium">Tax</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-purple-600 rounded-sm" />
              <span className="text-gray-600 font-medium">Loan</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Income Gradient Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-[16px]">Total income</h3>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 tracking-tight">$11,800,000.00</p>
            <p className="text-[12px] text-emerald-500 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 21% vs last month
            </p>
          </div>

          <div className="h-[180px] mt-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaTrendData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v / 1000}m`}
                  domain={[0, 15000]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#7C3AED"
                  strokeWidth={2.5}
                  fill="url(#purpleAreaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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

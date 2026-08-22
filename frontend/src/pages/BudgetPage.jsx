import React from 'react';
import { DollarSign, TrendingUp, ArrowDown, Wallet, MoreVertical } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { budgetBreakdown, trips } from '../data/mockData';

const totalSpent = budgetBreakdown.categories.reduce((s, c) => s + c.value, 0);
const totalBudget = trips.reduce((s, t) => s + t.totalBudget, 0);
const remaining = totalBudget - totalSpent;

const summaryCards = [
  { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: Wallet, color: 'amber' },
  { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: ArrowDown, color: 'purple' },
  { label: 'Remaining', value: `$${remaining.toLocaleString()}`, icon: TrendingUp, color: 'emerald' },
];

const colorMap = {
  amber: { iconBg: 'bg-amber-100', iconText: 'text-amber-600', border: 'border-l-amber-500' },
  purple: { iconBg: 'bg-purple-100', iconText: 'text-purple-600', border: 'border-l-purple-500' },
  emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', border: 'border-l-emerald-500' },
};

export default function BudgetPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="bg-amber-100 p-2.5 rounded-xl"><DollarSign className="w-6 h-6 text-amber-600" /></div>
          Budget & Cost Breakdown
        </h1>
        <p className="text-[13px] text-gray-400 mt-2 ml-14">Track your travel spending across all trips</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => {
          const colors = colorMap[card.color];
          const Icon = card.icon;
          return (
            <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${colors.border}`}>
              <div className={`p-2.5 rounded-xl ${colors.iconBg} w-fit mb-3`}><Icon className={`w-5 h-5 ${colors.iconText}`} /></div>
              <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
              <p className="text-[13px] text-gray-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-[15px]">Spending by Category</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={budgetBreakdown.categories} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" strokeWidth={0}>
                  {budgetBreakdown.categories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {budgetBreakdown.categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[12px] text-gray-500">{cat.name}</span>
                <span className="text-[12px] font-bold text-gray-700 ml-auto">${cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-[15px]">Daily Spending</h3>
            <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={budgetBreakdown.dailySpending} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="amount" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-[15px]">Monthly Spending Trend</h3>
          <button className="p-1 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={budgetBreakdown.monthlyTrend}>
            <defs>
              <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="spent" stroke="#8B5CF6" fill="url(#budgetGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Items Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 text-[15px] mb-5">Cost Items</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">Category</th>
              <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">Amount</th>
              <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">% of Total</th>
              <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider pb-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {budgetBreakdown.categories.map((cat, i) => {
              const pct = ((cat.value / totalSpent) * 100).toFixed(1);
              return (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3.5 text-[13px] text-gray-800 font-semibold flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </td>
                  <td className="py-3.5 text-[13px] font-bold text-gray-700">${cat.value.toLocaleString()}</td>
                  <td className="py-3.5 text-[13px] text-gray-500">{pct}%</td>
                  <td className="py-3.5">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

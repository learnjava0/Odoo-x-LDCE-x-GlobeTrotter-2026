

import { useState, useEffect } from 'react';
import { tripService } from '../api/client';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext.jsx';

const budgetBreakdown = {
  categories: [
    { name: "Activities", value: 1240, color: "#F59E0B" },
    { name: "Stay", value: 2100, color: "#8B5CF6" },
    { name: "Transport", value: 850, color: "#3B82F6" },
    { name: "Meals", value: 960, color: "#10B981" },
  ],
  dailySpending: [
    { day: "Jul 15", amount: 180 }, { day: "Jul 16", amount: 120 }, { day: "Jul 17", amount: 240 },
    { day: "Jul 18", amount: 95 }, { day: "Jul 19", amount: 310 }, { day: "Jul 20", amount: 175 },
    { day: "Jul 21", amount: 200 }, { day: "Jul 22", amount: 280 }
  ]
};

export default function BudgetPage() {
  const { isDark } = useTheme();
  
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const totalBudgetAllocated = 650000; // Mock overarching wallet balance limit

  useEffect(() => {
    tripService.list().then((data) => {
      const tripsData = Array.isArray(data) ? data : (data.results ?? []);
      const spent = tripsData.reduce((acc, trip) => acc + Number(trip.estimated_budget || 0), 0);
      setTotalAmountSpent(spent);
    }).catch(console.error);
  }, []);

  const remainingBalance = totalBudgetAllocated - totalAmountSpent;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Budget & Expense Analytics</h1>
        <p className={`text-[13px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Track travel expenses, category breakdowns, and daily spending</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className={`rounded-3xl p-6 border shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Budget Wallet</p>
          <p className="text-3xl font-black text-amber-500">₹{totalBudgetAllocated.toLocaleString()}</p>
        </div>
        <div className={`rounded-3xl p-6 border shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Estimated Sent</p>
          <p className="text-3xl font-black text-emerald-500">₹{totalAmountSpent.toLocaleString()}</p>
        </div>
        <div className={`rounded-3xl p-6 border shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Remaining Available Credit</p>
          <p className={`text-3xl font-black ${remainingBalance < 0 ? 'text-red-500' : 'text-purple-500'}`}>₹{remainingBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Donut Chart */}
        <div className={`rounded-3xl p-6 border shadow-sm space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Spending by Category</h3>
          <div className="flex items-center justify-center h-56">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={budgetBreakdown.categories} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" strokeWidth={0}>
                  {budgetBreakdown.categories.map((cat, i) => <Cell key={i} fill={cat.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {budgetBreakdown.categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{cat.name}</span>
                <span className="text-xs font-bold text-amber-500 ml-auto">₹{cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Spending Bar Chart */}
        <div className={`rounded-3xl p-6 border shadow-sm space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
          <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Daily Spending Distribution</h3>
          <div className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetBreakdown.dailySpending} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#f0f0f0'} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="amount" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

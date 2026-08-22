import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Bell, Filter, Download, Search, CalendarDays } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Welcome */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Welcome {user?.name?.split(' ')[0] || 'Traveler'}!
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Today is {dateStr}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Date range */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <CalendarDays className="w-4 h-4 text-gray-400" />
            <span>Sep 11 — Oct 10</span>
          </button>

          {/* Filter */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
            Filter
          </button>

          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <Download className="w-4 h-4 text-gray-400" />
            Export
          </button>

          {/* Notification bell */}
          <button className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors">
            <Bell className="w-[18px] h-[18px] text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
            <div>
              <p className="text-[13px] font-semibold text-gray-800 text-right leading-tight">{user?.name || 'Traveler'}</p>
              <p className="text-[11px] text-gray-400 text-right">Globe Trotter</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-amber-200/50">
              {user?.name?.charAt(0) || 'T'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

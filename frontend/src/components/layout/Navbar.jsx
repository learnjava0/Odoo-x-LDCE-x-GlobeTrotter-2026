import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Bell, Filter, Download, CalendarDays, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 py-3.5">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu Toggle + Welcome */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              Welcome {user?.name?.split(' ')[0] || 'Traveler'}!
            </h2>
            <p className="text-[12px] md:text-[13px] text-gray-400 mt-0.5">
              Today is {dateStr}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Date range */}
          <button className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[12px] md:text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <CalendarDays className="w-4 h-4 text-gray-400" />
            <span>Sep 11 — Oct 10</span>
          </button>

          {/* Filter */}
          <button className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[12px] md:text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Filter</span>
          </button>

          {/* Export */}
          <button className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[12px] md:text-[13px] font-medium text-gray-600 border border-gray-100 transition-colors">
            <Download className="w-4 h-4 text-gray-400" />
            <span>Export</span>
          </button>

          {/* Notification bell */}
          <button className="relative p-2 md:p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors">
            <Bell className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-2.5 ml-1 md:ml-2 pl-2 md:pl-4 border-l border-gray-100">
            <div className="hidden sm:block text-right">
              <p className="text-[13px] font-semibold text-gray-800 leading-tight">{user?.name || 'Traveler'}</p>
              <p className="text-[11px] text-gray-400">Globe Trotter</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-amber-200/50">
              {user?.name?.charAt(0) || 'T'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

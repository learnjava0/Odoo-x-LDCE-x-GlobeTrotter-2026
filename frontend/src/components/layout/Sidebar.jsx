import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, PlusCircle, Search, MapPin,
  DollarSign, CalendarDays, User, Globe, ChevronDown, Compass
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trips', label: 'My Trips', icon: Briefcase },
  { to: '/create-trip', label: 'Create Trip', icon: PlusCircle },
  { to: '/cities', label: 'City Search', icon: MapPin },
  { to: '/activities', label: 'Activity Search', icon: Search },
  { to: '/budget', label: 'Budget', icon: DollarSign },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 flex flex-col z-40">
      {/* Brand */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-50">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl text-white shadow-lg shadow-amber-200/50">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-[18px] text-gray-900 tracking-tight leading-none">GlobeTrotter</h1>
          <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">Travel Planner</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-amber-50 text-amber-700 font-semibold shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-[18px] h-[18px] transition-colors ${
                    isActive ? 'text-amber-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom user card */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-amber-200/50">
            A
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-semibold text-gray-800 leading-tight">Ajay Panchal</p>
            <p className="text-[11px] text-gray-400">Traveler</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}

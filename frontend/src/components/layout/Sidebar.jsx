
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
  LayoutDashboard, Briefcase, PlusCircle, Search, MapPin,
  DollarSign, CalendarDays, User, ChevronDown, Compass, X, ShieldCheck, Users, Sun, Moon, LogOut
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/trips', label: 'My Trips', icon: Briefcase },
    { to: '/create-trip', label: 'Create Trip', icon: PlusCircle },
    { to: '/cities', label: 'City Search', icon: MapPin },
    { to: '/activities', label: 'Activity Search', icon: Search },
    { to: '/budget', label: 'Budget', icon: DollarSign },
    { to: '/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/community', label: 'Community', icon: Users },
    ...(user?.is_admin ? [{ to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck }] : []),
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] border-r flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-200'
            : 'bg-white border-gray-100 text-gray-800'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className={`px-6 py-5 flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl text-white shadow-lg shadow-amber-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`font-extrabold text-[18px] tracking-tight leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>GlobeTrotter</h1>
              <p className="text-[10px] text-amber-500 font-bold tracking-wider uppercase mt-0.5">Travel Planner</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group ${
                  isActive
                    ? isDark
                      ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/20'
                      : 'bg-amber-50 text-amber-700 font-semibold shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-[18px] h-[18px] transition-colors ${
                      isActive ? 'text-amber-500' : isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-gray-400 group-hover:text-gray-500'
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

        {/* Theme Toggle Button for Mobile Drawer */}
        <div className="px-4 py-2">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-gray-50 border-gray-100 text-slate-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-2">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? 'Light Theme' : 'Dark Theme'}
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-500">
              {isDark ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Logout Toggle */}
        <div className="px-4 py-1">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Bottom user card */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
          <button
            onClick={() => { navigate('/profile'); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-amber-500/20 uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 text-left line-clamp-1">
              <p className={`text-[13px] font-semibold leading-tight ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>
                {user?.name || 'User'}
              </p>
              <p className="text-[11px] text-amber-500 font-bold">
                {user?.is_admin ? 'Admin' : 'Traveler'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </aside>
    </>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, LogOut, Briefcase } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <span className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          GlobeTrotter
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/trips" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          My Trips
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
          <User className="w-4 h-4" />
          Profile
        </Link>
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-xl border border-gray-200/60 transition-all hover:shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Login
        </button>
      </div>
    </nav>
  );
}


import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Menu, Sun, Moon } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short'
  });

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 md:px-8 py-3.5 transition-colors ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/95 border-gray-100 text-gray-900'
    }`}>
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu Toggle + Welcome */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-xl lg:hidden ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-bold tracking-tight">
              Welcome {user?.name?.split(' ')[0] || 'Traveler'}!
            </h2>
            <p className={`text-[12px] md:text-[13px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
              Today is {dateStr}
            </p>
          </div>
        </div>

        {/* Right: Actions + Theme Toggle Button */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            className={`p-2 md:p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-gray-50 border-gray-100 text-slate-700 hover:bg-gray-100'
            }`}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun className="w-4 h-4 md:w-[18px] md:h-[18px]" /> : <Moon className="w-4 h-4 md:w-[18px] md:h-[18px]" />}
          </button>



          {/* User avatar */}
          <div className="flex items-center gap-2.5 ml-1 md:ml-2 pl-2 md:pl-4 border-l border-gray-200/50">
            <div className="hidden sm:block text-right">
              <p className={`text-[13px] font-semibold leading-tight ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{user?.name || 'Traveler'}</p>
              <p className="text-[11px] text-amber-500 font-bold">Globe Trotter</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-amber-500/20">
              {user?.name?.charAt(0) || 'T'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

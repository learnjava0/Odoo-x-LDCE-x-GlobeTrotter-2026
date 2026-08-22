import { useState } from "react";

import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`flex min-h-screen transition-colors ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#F8F7F3] text-gray-800'}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

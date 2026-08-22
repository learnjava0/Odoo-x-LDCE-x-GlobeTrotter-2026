import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-600">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

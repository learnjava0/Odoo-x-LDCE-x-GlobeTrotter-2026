import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  const location = useLocation();
  const noLayout = ['/login', '/signup'].includes(location.pathname) || location.pathname.startsWith('/public/');

  if (noLayout) {
    return <AppRoutes />;
  }

  return (
    <DashboardLayout>
      <AppRoutes />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

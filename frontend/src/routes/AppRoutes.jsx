import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { Loader2 } from 'lucide-react';

import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import MyTripsPage from '../pages/MyTripsPage';
import CreateTripPage from '../pages/CreateTripPage';
import ItineraryBuilderPage from '../pages/ItineraryBuilderPage';
import ItineraryViewPage from '../pages/ItineraryViewPage';
import CitySearchPage from '../pages/CitySearchPage';
import ActivitySearchPage from '../pages/ActivitySearchPage';
import BudgetPage from '../pages/BudgetPage';
import CalendarPage from '../pages/CalendarPage';
import CommunityPage from '../pages/CommunityPage';
import PublicTripPage from '../pages/PublicTripPage';
import ProfilePage from '../pages/ProfilePage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

// ─── Guard: must be logged in ──────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F3]">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

// ─── Guard: must be admin ──────────────────────────────────────────────────────
function AdminRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F3]">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.is_admin) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

// ─── Guard: already logged in → redirect away from auth pages ─────────────────
function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public auth pages ────────────────────────────────── */}
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />

      {/* ── Fully public (no sidebar) ─────────────────────────── */}
      <Route path="/public/:slug" element={<PublicTripPage />} />

      {/* ── Protected pages (require login) ──────────────────── */}
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/trips" element={<ProtectedRoute><MyTripsPage /></ProtectedRoute>} />
      <Route path="/create-trip" element={<ProtectedRoute><CreateTripPage /></ProtectedRoute>} />
      <Route path="/builder/:tripId" element={<ProtectedRoute><ItineraryBuilderPage /></ProtectedRoute>} />
      <Route path="/itinerary/:tripId" element={<ProtectedRoute><ItineraryViewPage /></ProtectedRoute>} />
      <Route path="/cities" element={<ProtectedRoute><CitySearchPage /></ProtectedRoute>} />
      <Route path="/activities" element={<ProtectedRoute><ActivitySearchPage /></ProtectedRoute>} />
      <Route path="/budget" element={<ProtectedRoute><BudgetPage /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* ── Admin-only pages ──────────────────────────────────── */}
      <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />

      {/* ── Fallback ─────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

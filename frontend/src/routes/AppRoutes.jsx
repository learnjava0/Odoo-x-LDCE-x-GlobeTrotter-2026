import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<DashboardPage />} />

      {/* Auth (no sidebar) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Trips */}
      <Route path="/trips" element={<MyTripsPage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/builder/:tripId" element={<ItineraryBuilderPage />} />
      <Route path="/itinerary/:tripId" element={<ItineraryViewPage />} />

      {/* Search */}
      <Route path="/cities" element={<CitySearchPage />} />
      <Route path="/activities" element={<ActivitySearchPage />} />

      {/* Budget, Calendar, Community */}
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/community" element={<CommunityPage />} />

      {/* Public (no sidebar) */}
      <Route path="/public/:slug" element={<PublicTripPage />} />

      {/* Profile */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* Fallback */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
}

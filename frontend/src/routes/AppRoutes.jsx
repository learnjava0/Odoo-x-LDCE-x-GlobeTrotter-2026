import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyTripsPage from '../pages/MyTripsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/trips" element={<MyTripsPage />} />
      {/* Fallback to dashboard */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
}

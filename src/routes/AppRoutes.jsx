import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLoginPage from "../pages/AdminLoginpage";
import AdminBookPage from "../pages/AdminBookPage";
import AdminJournalPage from "../pages/AdminJournalPage";
import AdminDashboard from "../pages/AdminDashboard";

import { isAdminAuthenticated } from "../services/AdminAuthService";

const ProtectedRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookpage"
          element={
            <ProtectedRoute>
              <AdminBookPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journalpage"
          element={
            <ProtectedRoute>
              <AdminJournalPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
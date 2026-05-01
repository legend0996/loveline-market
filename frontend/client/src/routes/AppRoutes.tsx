import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

import UserProtectedRoute from "../components/UserProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminLoginPage from "../pages/auth/AdminLoginPage";
import AdminVerifyPage from "../pages/auth/AdminVerifyPage";

import DashboardOverview from "../pages/dashboard/DashboardOverview";
import ReferralsPage from "../pages/dashboard/ReferralsPage";
import ViewsPage from "../pages/dashboard/ViewsPage";
import ActivePosterPage from "../pages/dashboard/ActivePosterPage";

import AdminOverview from "../pages/admin/AdminOverview";
import AdminReferrals from "../pages/admin/AdminReferrals";
import AdminViews from "../pages/admin/AdminViews";
import AdminPosters from "../pages/admin/AdminPosters";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/login" element={<LoginPage />} />
      <Route path="/profile/register" element={<RegisterPage />} />
    </Route>

    <Route path="/admin-login" element={<AdminLoginPage />} />
    <Route path="/admin-verify" element={<AdminVerifyPage />} />

    <Route
      path="/dashboard"
      element={
        <UserProtectedRoute>
          <DashboardLayout />
        </UserProtectedRoute>
      }
    >
      <Route index element={<DashboardOverview />} />
      <Route path="referrals" element={<ReferralsPage />} />
      <Route path="views" element={<ViewsPage />} />
      <Route path="poster" element={<ActivePosterPage />} />
    </Route>

    <Route
      path="/admin-dashboard"
      element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      }
    >
      <Route index element={<AdminOverview />} />
      <Route path="referrals" element={<AdminReferrals />} />
      <Route path="views" element={<AdminViews />} />
      <Route path="posters" element={<AdminPosters />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminVerify from "./pages/AdminVerify";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* USER AUTH */}
      <Route path="/profile/login" element={<Login />} />
      <Route path="/profile/register" element={<Register />} />

      {/* 🔐 PROTECTED USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <UserProtectedRoute>
            <Dashboard />
          </UserProtectedRoute>
        }
      />

      {/* 🔐 PROTECTED ADMIN DASHBOARD */}
      <Route
  path="/admin-dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

      {/* ADMIN AUTH */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-verify" element={<AdminVerify />} />
    </Routes>
  );
}

export default App;
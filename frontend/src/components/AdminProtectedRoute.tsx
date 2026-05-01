import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { adminToken } = useAuth();
  const location = useLocation();
  if (!adminToken) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default AdminProtectedRoute;
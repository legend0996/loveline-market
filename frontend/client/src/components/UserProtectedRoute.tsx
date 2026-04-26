import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/profile/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
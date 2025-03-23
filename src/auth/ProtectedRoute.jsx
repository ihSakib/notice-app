// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("loggedIn");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

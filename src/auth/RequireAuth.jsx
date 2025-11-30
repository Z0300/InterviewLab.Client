import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

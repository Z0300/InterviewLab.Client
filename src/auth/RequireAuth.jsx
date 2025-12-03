import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Spinner from "../components/ui/Spinner.jsx";

const RequireAuth = () => {
  const { auth, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

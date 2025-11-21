// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      {/* page container -> nested routes render here */}
      <main className="max-w-6xl mx-auto px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

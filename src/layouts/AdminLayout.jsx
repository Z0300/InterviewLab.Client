import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <main className="max-w-6xl mx-auto px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

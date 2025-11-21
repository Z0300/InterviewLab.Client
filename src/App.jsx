import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router";
import ProblemList from "./pages/admin/ProblemList.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import React from "react";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-semibold tracking-tight">
              iTL
            </Link>
            {!isAdmin && (
              <nav className="hidden md:flex gap-4 text-sm text-slate-300">
                <Link to="/" className="hover:text-white">
                  Coding Exams
                </Link>
                <Link to="/interview-questions" className="hover:text-white">
                  Interview Questions
                </Link>
              </nav>
            )}

            {isAdmin && (
              <nav className="hidden md:flex gap-4 text-sm text-slate-300">
                <Link to="/admin/problems/list" className="hover:text-white">
                  Manage Problems
                </Link>
                <Link to="/admin/problems/new" className="hover:text-white">
                  Add Problem
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/logout"
                className="inline-flex items-center px-3 py-1.5 bg-[#ffa1161f] text-[#ffa116] text-sm rounded-md shadow-sm hover:bg-[#ffa11633]"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-8">
        <Routes>
          {/* ADMIN NESTED ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="problems">
              <Route path="list" element={<ProblemList />} />
              <Route index element={<ProblemList />} />
            </Route>
          </Route>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<ProblemList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

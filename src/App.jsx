import "./App.css";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProblemList from "./pages/admin/ProblemList.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import React from "react";
import CreateProblem from "./pages/admin/CreateProblem.jsx";
import EditProblem from "./pages/admin/EditProblem.jsx";
import GetProblem from "./pages/admin/GetProblem.jsx";
import AddSolution from "./pages/admin/AddSolution.jsx";
import EditSolution from "./pages/admin/EditSolution.jsx";
import Login from "./pages/Login.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

import useAuth from "./hooks/useAuth.js";
import useRevokeToken from "./hooks/useRevokeToken.js";
import useCurrentUser from "./hooks/useCurrentUser.js";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  useCurrentUser();
  const isAdminPath = location.pathname.startsWith("/admin");
  const { mutateAsync: revokeTokens } = useRevokeToken();
  const isAuthenticated = Boolean(auth?.accessToken);
  const displayName = auth?.user?.name || auth?.user?.username || "";

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await revokeTokens();
    } catch (err) {
      console.warn("Logout error", err);
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="w-full z-50 bg-slate-800/60 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-semibold tracking-tight">
              iTL
            </Link>

            {!isAdminPath && (
              <nav className="hidden md:flex gap-4 text-sm text-slate-300">
                <Link to="/" className="hover:text-white">
                  Coding Exams
                </Link>
                <Link to="/interview-questions" className="hover:text-white">
                  Interview Questions
                </Link>
              </nav>
            )}

            {isAdminPath && isAuthenticated && (
              <nav className="hidden md:flex gap-4 text-sm text-slate-300">
                <Link to="/admin/problems/list" className="hover:text-white">
                  Problems & Questions
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {displayName && (
                  <span className="hidden sm:inline text-sm text-slate-300">
                    Hello,{" "}
                    <span className="font-medium text-white">
                      {displayName}
                    </span>
                  </span>
                )}

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1.5 bg-[#ffa1161f] text-[#ffa116] text-sm rounded-md shadow-sm hover:bg-[#ffa11633]"
                >
                  Logout
                </button>
              </>
            ) : isAdminPath ? (
              <Link
                to="/admin/login"
                className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="hidden md:inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto px-6 py-16">
        <Routes>
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="problems">
              <Route path="list" element={<ProblemList />} />
              <Route index element={<ProblemList />} />
              <Route path=":id" element={<GetProblem />} />

              <Route element={<RequireAuth />}>
                <Route path="create" element={<CreateProblem />} />
                <Route path=":id/edit" element={<EditProblem />} />
                <Route path=":problemId/solutions" element={<AddSolution />} />
                <Route
                  path=":problemId/solutions/:id/edit"
                  element={<EditSolution />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="/" element={<ProblemList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

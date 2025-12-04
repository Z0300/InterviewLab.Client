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

  const isLoginPage = location.pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {!isLoginPage && (
        <header className="w-full z-50 bg-neutral-950/80 backdrop-blur border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link to="/" className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap">
              iTL
            </Link>

            {!isAdminPath && (
              <nav className="hidden md:flex gap-4 text-sm text-neutral-400">
                <Link to="/" className="hover:text-white transition-colors">
                  Coding Exams
                </Link>
                <Link
                  to="/interview-questions"
                  className="hover:text-white transition-colors"
                >
                  Interview Questions
                </Link>
              </nav>
            )}

            {isAdminPath && isAuthenticated && (
              <nav className="hidden md:flex gap-4 text-sm text-neutral-400">
                <Link
                  to="/admin/problems/list"
                  className="hover:text-white transition-colors"
                >
                  Problems & Questions
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                {displayName && (
                  <span className="hidden lg:inline text-xs sm:text-sm text-neutral-400 truncate max-w-[120px] sm:max-w-none">
                    Hello,{" "}
                    <span className="font-medium text-white">
                      {displayName}
                    </span>
                  </span>
                )}

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-neutral-900 text-neutral-300 text-xs sm:text-sm rounded-md border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors touch-manipulation"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </>
            ) : isAdminPath ? (
              <Link
                to="/admin/login"
                className="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-white text-black text-xs sm:text-sm rounded-md hover:bg-neutral-200 transition-colors touch-manipulation"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="hidden md:inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-white text-black text-xs sm:text-sm rounded-md hover:bg-neutral-200 transition-colors touch-manipulation"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>
      )}
      <main className={isLoginPage ? "" : "mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16"}>
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

import "./App.css";
import { Link, Route, Routes } from "react-router";
import ProblemList from "./pages/ProblemList.jsx";

const App = () => {
  return (
    // App.jsx (replace top-level div/header)
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-semibold tracking-tight">
              iTL
            </Link>
            <nav className="hidden md:flex gap-4 text-sm text-slate-300">
              <Link to="/" className="hover:text-white">
                Coding Exams
              </Link>
              <Link to="/new-problem" className="hover:text-white">
                Interview Questions
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/logoug"
              className="inline-flex items-center px-3 py-1.5 bg-[#ffa1161f] text-[#ffa116] text-sm rounded-md shadow-sm hover:bg-[#ffa11633]"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-8">
        <div className="bg-slate-50/3 rounded-lg p-6 shadow-inner">
          {" "}
          {/* subtle inner panel */}
          {/* routes / content go here */}
        </div>
      </main>
    </div>
  );
};

export default App;

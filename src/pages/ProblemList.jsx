import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "../components/Spinner.jsx";
import { getProblems, deleteProblem } from "../api.js";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getProblems();
      setProblems(data.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this problem?")) return;
    await deleteProblem(id);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Problems</h1>
        <Link
          to="/new-problem"
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          New
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-3">
          {problems.length === 0 && (
            <div className="text-gray-500">No problems yet</div>
          )}
          {problems.map((p) => (
            <div
              key={p.id}
              className=" flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm transition-all
    bg-white border-gray-200 hover:bg-gray-50
    dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {/* Left section: title + details */}
              <div className="flex flex-col">
                <Link
                  to={`/problems/${p.id}`}
                  className="font-medium text-gray-800 hover:text-indigo-600"
                >
                  {p.title}
                </Link>

                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {/* Difficulty */}
                  <span
                    className={
                      p.difficulty === "Easy"
                        ? "text-green-600 font-medium"
                        : p.difficulty === "Medium"
                          ? "text-yellow-600 font-medium"
                          : "text-red-600 font-medium"
                    }
                  >
                    {p.difficulty}
                  </span>

                  {/* Separator */}
                  <span className="text-gray-400">•</span>

                  {/* Tags */}
                  <span>{p.tagsJson || "No tags"}</span>
                </div>
              </div>

              {/* Right section: Edit/Delete */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/problems/${p.id}/edit`}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => onDelete(p.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProblemList;

import { Link } from "react-router"; // IMPORTANT
import Spinner from "../../components/Spinner.jsx";
import useProblems from "../../hooks/useProblems.js";

const ProblemList = () => {
  const { data: problems, error, isLoading } = useProblems();

  const onDelete = async (id) => {
    if (!confirm("Delete this problem?")) return;
    // await deleteProblem(id);
    // await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Problems</h1>
        <Link
          to="/new-problem"
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          New
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-slate-800/40 border border-slate-700/40 shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="px-4 py-3 w-12">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 w-36 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {problems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-slate-400">
                    No problems yet
                  </td>
                </tr>
              ) : (
                problems.map((p, idx) => (
                  <tr key={p.id} className="bg-slate-800/60 transition">
                    <td className="px-4 py-4 text-sm text-slate-400 text-right">
                      {idx + 1}.
                    </td>

                    <td className="px-4 py-4 align-top min-w-0">
                      <Link
                        to={`/problems/${p.id}`}
                        className="text-slate-100 font-medium hover:text-indigo-300 block truncate"
                      >
                        {p.title || "Untitled Problem"}
                      </Link>
                      <div className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                        <span
                          className={
                            p.difficulty === "Easy"
                              ? "text-emerald-400"
                              : p.difficulty === "Medium"
                                ? "text-amber-400"
                                : "text-rose-400"
                          }
                        >
                          {p.difficulty}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {p.tagsJson?.split(",").map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-xl bg-slate-700 text-slate-200"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center gap-4">
                        <Link
                          to={`/problems/${p.id}/edit`}
                          className="text-sm text-indigo-300 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="text-sm text-rose-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProblemList;

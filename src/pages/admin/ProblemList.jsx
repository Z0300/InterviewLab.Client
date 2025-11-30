import { Link } from "react-router-dom";
import Spinner from "../../components/ui/Spinner.jsx";
import useProblems from "../../hooks/useProblems.js";
import useDeleteProblem from "../../hooks/useDeleteProblem.js";
import { useState } from "react";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import useDebounce from "../../hooks/useDebounce.js";

const ProblemList = () => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [dialog, setDialog] = useState({
    open: false,
    id: null,
  });

  const openDeleteDialog = (id) => {
    setDialog({ open: true, id });
  };

  const { data, isPending, isFetching, isPlaceholderData } = useProblems(
    debounceSearch,
    page,
    pageSize,
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const { mutateAsync: deleteProblem, isPending: isDeletingProblem } =
    useDeleteProblem();

  const onDelete = async () => {
    await deleteProblem(dialog.id);
    setDialog({ open: false, id: null });
  };

  const payload = data ?? {}; // fallback so we don't crash
  const items = payload.items ?? [];

  const totalCount =
    typeof payload.totalCount === "number" ? payload.totalCount : undefined;

  const totalPages =
    typeof payload.totalPages === "number" ? payload.totalPages : undefined;

  const hasMore =
    typeof totalPages === "number"
      ? page < totalPages
      : typeof totalCount === "number"
        ? page * pageSize < totalCount
        : items.length === pageSize;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center  pr-4">
          <div className="flex-1">
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Title"
              className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 placeholder-slate-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-auto">
            {isFetching && (
              <span className="text-sm text-slate-300 italic">Searching…</span>
            )}
          </div>
        </div>

        <Link
          to="/admin/problems/create"
          className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md ring-1 ring-indigo-600/30 transition"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M12 5v14M5 12h14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          New
        </Link>
      </div>

      {isPending || isDeletingProblem ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-slate-800/40 border border-slate-700/40 shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="px-4 py-3 w-12">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3 w-36 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-slate-400">
                    No problems yet
                  </td>
                </tr>
              ) : (
                items.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="bg-slate-800/60 transition hover:bg-slate-700/40"
                  >
                    <td className="px-4 py-4 text-sm text-slate-400 text-right">
                      {idx + 1}.
                    </td>

                    <td className="px-4 py-4 align-top min-w-0">
                      <Link
                        to={`/admin/problems/${p.id}`}
                        className="text-slate-100 font-medium hover:text-indigo-300 block truncate"
                      >
                        {p.title || "Untitled Problem"}
                      </Link>

                      <div className="mt-2 text-xs text-slate-400 flex items-center gap-3">
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
                          {(p.tagsJson || []).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-lg bg-slate-700 text-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 align-top min-w-0 text-left">
                      <div className="text-sm text-slate-200">{p.company}</div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-3">
                        {/* Add */}
                        <Link
                          to={`/admin/problems/${p.id}/solutions`}
                          title="Add Solution"
                          className="p-2 rounded-full bg-green-500/10 text-green-300 hover:bg-green-500/20 transition"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              d="M12 5v14M5 12h14"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/problems/${p.id}/edit`}
                          title="Edit"
                          className="p-2 rounded-full bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              d="M3 21l3-1 11-11 1-3-3 1L4 20z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => openDeleteDialog(p.id)}
                          title="Delete"
                          className="p-2 rounded-full bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Small footer: show totals if available */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/30 bg-slate-900/30">
            <div className="text-sm text-slate-400">
              {typeof totalCount === "number"
                ? `${totalCount} problems`
                : `${items.length} shown`}
            </div>

            {(typeof totalPages === "number"
              ? totalPages > 1
              : items.length > pageSize) && (
              <div className="flex items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((s) => Math.max(1, s - 1))}
                  className="px-3 py-1 rounded border border-slate-700 bg-slate-800 text-slate-200 disabled:opacity-50"
                >
                  Prev
                </button>

                <div className="text-sm text-slate-200 px-2">Page {page}</div>

                <button
                  onClick={() => {
                    if (!isPlaceholderData && hasMore) setPage((s) => s + 1);
                  }}
                  disabled={isPlaceholderData || !hasMore}
                  className="px-3 py-1 rounded border border-slate-700 bg-slate-800 text-slate-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <ConfirmDialog
            open={dialog.open}
            title="Delete Problem"
            message="Are you sure you want to delete this problem? This action cannot be undone."
            onCancel={() => setDialog({ open: false, id: null })}
            onConfirm={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ProblemList;

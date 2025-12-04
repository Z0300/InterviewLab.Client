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
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-3 items-center flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Title"
              className="w-full p-2.5 sm:p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 placeholder-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {isFetching && (
              <span className="text-xs sm:text-sm text-neutral-400 italic whitespace-nowrap">Searching…</span>
            )}
          </div>
        </div>

        <Link
          to="/admin/problems/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors text-sm sm:text-base touch-manipulation whitespace-nowrap"
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
        <div className="overflow-x-auto rounded-xl bg-neutral-950 border border-neutral-800 -mx-4 sm:mx-0">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-neutral-400 text-xs sm:text-sm">
                <th className="px-3 sm:px-4 py-2 sm:py-3 w-10 sm:w-12">#</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 min-w-[200px]">Title</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">Company</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 w-28 sm:w-36 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-900">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-neutral-400">
                    No problems yet
                  </td>
                </tr>
              ) : (
                items.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="bg-neutral-950 transition hover:bg-neutral-900"
                  >
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-neutral-400 text-right">
                      {idx + 1}.
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4 align-top min-w-0">
                      <Link
                        to={`/admin/problems/${p.id}`}
                        className="text-white font-medium hover:text-neutral-300 block truncate transition-colors text-sm sm:text-base"
                      >
                        {p.title || "Untitled Problem"}
                      </Link>

                      <div className="mt-2 text-xs text-neutral-400 flex flex-wrap items-center gap-2 sm:gap-3">
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
                        <span className="hidden sm:inline text-neutral-500">•</span>
                        <span className="sm:hidden text-xs text-neutral-500">{p.company}</span>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {(p.tagsJson || []).slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {(p.tagsJson || []).length > 2 && (
                            <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                              +{(p.tagsJson || []).length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4 align-top min-w-0 text-left hidden sm:table-cell">
                      <div className="text-sm text-neutral-300">{p.company}</div>
                    </td>

                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="inline-flex items-center gap-2 sm:gap-3">
                        {/* Add */}
                        <Link
                          to={`/admin/problems/${p.id}/solutions`}
                          title="Add Solution"
                          className="p-2 sm:p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors touch-manipulation"
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
                          className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
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
                          className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 border-t border-neutral-900 bg-neutral-950">
            <div className="text-xs sm:text-sm text-neutral-400">
              {typeof totalCount === "number"
                ? `${totalCount} problems`
                : `${items.length} shown`}
            </div>

            {(typeof totalPages === "number"
              ? totalPages > 1
              : items.length > pageSize) && (
              <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((s) => Math.max(1, s - 1))}
                  className="px-3 sm:px-3 py-1.5 sm:py-1 rounded border border-neutral-800 bg-neutral-950 text-neutral-300 hover:bg-neutral-900 disabled:opacity-50 transition-colors text-xs sm:text-sm touch-manipulation"
                >
                  Prev
                </button>

                <div className="text-xs sm:text-sm text-neutral-300 px-2">Page {page}</div>

                <button
                  onClick={() => {
                    if (!isPlaceholderData && hasMore) setPage((s) => s + 1);
                  }}
                  disabled={isPlaceholderData || !hasMore}
                  className="px-3 sm:px-3 py-1.5 sm:py-1 rounded border border-neutral-800 bg-neutral-950 text-neutral-300 hover:bg-neutral-900 disabled:opacity-50 transition-colors text-xs sm:text-sm touch-manipulation"
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

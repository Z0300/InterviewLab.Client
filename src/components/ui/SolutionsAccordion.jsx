import React, { useMemo, useState } from "react";
import { Link } from "react-router";

const SolutionsAccordion = ({ problem = [], allowMultipleOpen = false }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const { id: problemId, solutions } = problem;

  const grouped = useMemo(() => {
    return solutions.reduce((acc, solution) => {
      const language = solution.language || "Unknown";
      acc[language] = acc[language] || [];
      acc[language].push(solution);
      return acc;
    }, {});
  }, [solutions]);

  const toggle = (key) => {
    if (allowMultipleOpen) {
      setOpenKeys((prevOpenKeys) =>
        prevOpenKeys.includes(key)
          ? prevOpenKeys.filter((k) => k !== key)
          : [...prevOpenKeys, key],
      );
    } else {
      setOpenKeys((prevOpenKeys) => (prevOpenKeys[0] === key ? [] : [key]));
    }
  };
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  return (
    <div className="space-y-3">
      {Object.keys(grouped).length === 0 && (
        <div className="text-neutral-400 text-sm">No solutions yet.</div>
      )}

      {Object.entries(grouped).map(([language, items]) => {
        const isOpen = openKeys.includes(language);

        return (
          <div
            key={language}
            className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden"
          >
            {/* header */}
            <button
              onClick={() => toggle(language)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-neutral-900 transition-colors focus:outline-none touch-manipulation"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="inline-block w-9 text-xs sm:text-sm font-semibold text-neutral-300">
                  {language}
                </span>
              </div>

              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* content area */}
            {isOpen && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 space-y-3">
                {items.map((sol, i) => (
                  <div
                    key={sol.id + i}
                    className="bg-neutral-900 rounded-md p-2.5 sm:p-3 border border-neutral-800 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 mb-2">
                      <div className="text-xs text-neutral-300 font-medium">
                        Implementation
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/problems/${problemId}/solutions/${sol.id}/edit`}
                          title="Edit"
                          className="text-xs px-2.5 sm:px-2 py-1.5 sm:py-1 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors text-neutral-300 touch-manipulation"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => copyToClipboard(sol.code)}
                          title="Copy code"
                          className="text-xs px-2.5 sm:px-2 py-1.5 sm:py-1 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors text-neutral-300 touch-manipulation"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="rounded bg-black p-2 border border-neutral-900 overflow-auto max-h-60">
                      <pre className="whitespace-pre-wrap text-xs text-neutral-300">
                        <code>{sol.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default SolutionsAccordion;

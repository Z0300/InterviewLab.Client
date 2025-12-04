import React from "react";
import useProblem from "../../hooks/useProblem.js";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner.jsx";
import { Interweave } from "interweave";
import SolutionsAccordion from "../../components/ui/SolutionsAccordion.jsx";

const GetProblem = () => {
  const { id } = useParams();
  const { data, isPending } = useProblem(id);

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="bg-neutral-950 rounded-xl p-4 sm:p-6 border border-neutral-800">
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              {data.title}
            </h1>

            <div className="prose prose-invert max-w-none ">
              <div className="flex flex-wrap gap-2">
                <span
                  className={
                    "text-sm " +
                    (data.difficulty === "Easy"
                      ? "text-emerald-400"
                      : data.difficulty === "Medium"
                        ? "text-amber-400"
                        : "text-rose-400")
                  }
                >
                  {data.difficulty}
                </span>

                {(data.tagsJson || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-10">
                <Interweave content={data.description} />
              </div>
            </div>
          </div>
          <div className="bg-neutral-950 rounded-xl p-4 sm:p-6 border border-neutral-800">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-3 sm:gap-4 mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Solutions
              </h2>

              <Link
                to={`/admin/problems/${data.id}/solutions`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-black px-3 py-2 text-xs sm:text-sm font-medium hover:bg-neutral-200 transition-colors touch-manipulation"
                title="Add a new solution"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Solution
              </Link>
            </div>
            <SolutionsAccordion problem={data} allowMultipleOpen={false} />
          </div>
        </div>
      )}
    </>
  );
};
export default GetProblem;

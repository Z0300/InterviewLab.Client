import React from "react";
import useProblem from "../../hooks/useProblem.js";
import { Link, useParams } from "react-router";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h1 className="text-2xl font-semibold text-white mb-4">
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
                    className="px-2 py-0.5 text-xs rounded-lg bg-slate-700 text-slate-200"
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
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                Solutions
              </h2>

              <Link
                to={`/admin/problems/${data.id}/solutions`}
                className="ml-auto inline-flex items-center gap-2 rounded-md bg-indigo-600/90 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
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
            <SolutionsAccordion
              solutions={data.solutions}
              allowMultipleOpen={false}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default GetProblem;

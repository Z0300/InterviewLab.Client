import React from "react";
import useProblem from "../../hooks/useProblem.js";
import { useParams } from "react-router";
import Spinner from "../../components/ui/Spinner.jsx";
import { Interweave } from "interweave";

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
            <h2 className="text-lg font-semibold text-white mb-4">Solutions</h2>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
              <pre className="text-sm text-slate-300">
                <code></code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default GetProblem;

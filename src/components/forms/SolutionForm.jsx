import React from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAddSolution from "../../hooks/useAddSolution.js";
import useUpdateSolution from "../../hooks/useUpdateSolution.js";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import Spinner from "../ui/Spinner.jsx";

const SolutionSchema = z.object({
  language: z.string().nonempty("Problem language"),
  code: z.string().nonempty("Provide a code"),
  explanation: z.string().min(10, "Explanation is too short"),
  qualityScore: z.coerce.number().int().optional(), // accepts "5" and converts
  isCanonical: z.boolean(),
  source: z.string().optional(),
});

const SolutionForm = ({ problemId, solution, action }) => {
  const navigate = useNavigate();
  const titleHeading = action === "Update" ? "Update Solution" : "Add Solution";

  const { mutateAsync: addSolution, isPending: isCreating } = useAddSolution();

  const { mutateAsync: updateSolution, isPending: isUpdating } =
    useUpdateSolution();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SolutionSchema),
    defaultValues: {
      language: solution ? solution.language : "",
      problemId: solution ? problemId : "",
      code: solution ? solution.code : "",
      explanation: solution ? solution.explanation : "",
      qualityScore: solution ? solution.qualityScore : 1,
      isCanonical: solution ? solution.isCanonical : false,
      source: solution ? solution.source : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (solution && action === "Update") {
        await updateSolution({
          id: solution.id,
          payload: { ...data, problemId: problemId },
        });
      } else {
        await addSolution({ ...data, problemId: problemId });
      }
    } catch {
      toast.error(`${action} solution failed. Please try again.`);
    }
    navigate("/admin/problems");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">
              {titleHeading}
            </h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              Use this form to add or update a solution to coding problem.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="language"
                  className="block text-sm/6 font-medium text-white"
                >
                  Language
                </label>
                <div className="mt-2">
                  <input
                    id="language"
                    name="language"
                    {...register("language")}
                    placeholder="Language"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  {errors.language && (
                    <p className="text-rose-400 text-sm">
                      {errors.language.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="Code"
                  className="block text-sm/6 font-medium text-white"
                >
                  Code
                </label>
                <div className="mt-2">
                  <Controller
                    control={control}
                    name="code"
                    render={({ field }) => (
                      <MDEditor
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        preview="edit"
                        height={300}
                      />
                    )}
                  />
                  {errors.code && (
                    <p className="text-rose-400 text-sm">
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="Explanation"
                  className="block text-sm/6 font-medium text-white"
                >
                  Explanation
                </label>
                <div className="mt-2">
                  <Controller
                    control={control}
                    name="explanation"
                    render={({ field }) => (
                      <MDEditor
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        preview="edit"
                        height={200}
                      />
                    )}
                  />
                </div>
                {errors.explanation && (
                  <p className="text-rose-400 text-sm">
                    {errors.explanation.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="qualityScore"
                  className="block text-sm/6 font-medium text-white"
                >
                  Quality Score
                </label>
                <div className="mt-2">
                  <input
                    id="qualityScore"
                    name="qualityScore"
                    {...register("qualityScore", { valueAsNumber: true })}
                    placeholder="Quality Score"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
                {errors.qualityScore && (
                  <p className="text-rose-400 text-sm">
                    {errors.qualityScore.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="souce"
                  className="block text-sm/6 font-medium text-white"
                >
                  Source
                </label>
                <div className="mt-2">
                  <input
                    id="source"
                    name="source"
                    {...register("source")}
                    placeholder="Source"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  {errors.source && (
                    <p className="text-rose-400 text-sm">
                      {errors.source.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label className="relative flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isCanonical")}
                    className="
      peer h-5 w-5 appearance-none
      border border-gray-500 rounded
      bg-transparent
      checked:bg-indigo-600
      checked:border-indigo-600
      focus:outline-none
      transition"
                  />

                  <svg
                    className="
      pointer-events-none absolute left-0 h-5 w-5 text-white
      opacity-0 peer-checked:opacity-100 transition
    "
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>

                  <span className="text-gray-200 peer-checked:text-indigo-400">
                    Is Canonical?
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-white"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md cursor-pointer bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {(isCreating || isUpdating) && <Spinner />}
              {action} Solution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SolutionForm;

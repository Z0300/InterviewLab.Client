import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateProblem from "../../hooks/useCreateProblems.js";
import ReactTagInput from "@pathofdev/react-tag-input";
import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner.jsx";
import { useNavigate } from "react-router";
import useUpdateProblem from "../../hooks/useUpdateProblem.js";

const ProblemSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  company: z
    .string()
    .min(3, "Company must be at least 3 characters")
    .max(100, "Company must be at least 3 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], "Select difficulty"),
  tags: z.array(z.string()).min(1, "Please add at least one tag"),
  description: z.string().min(10, "Description too short"),
});

const ProblemForm = ({ problem, action }) => {
  const navigate = useNavigate();
  const titleHeading = action === "Update" ? "Update Problem" : "Add Problem";

  const { mutateAsync: createProblem, isPending: isCreating } =
    useCreateProblem();

  const { mutateAsync: updateProblem, isPending: isUpdating } =
    useUpdateProblem();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      title: problem ? problem.title : "",
      company: problem ? problem.company : "",
      difficulty: problem ? problem.difficulty : "Easy",
      tags: problem ? problem.tagsJson : [],
      description: problem ? problem.description : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (problem && action === "Update") {
        await updateProblem({
          id: problem.id,
          payload: { ...data, tagsJson: data.tags },
        });
      } else {
        await createProblem({ ...data, tagsJson: data.tags });
      }
    } catch {
      toast.error(`${action} problem failed. Please try again.`);
    }
    navigate("/admin/problems");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base/7 font-semibold text-white">
                {titleHeading}
              </h2>
              <p className="mt-1 text-sm/6 text-gray-400">
                Use this form to create or update a coding problem.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      name="title"
                      {...register("title")}
                      placeholder="Title"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.title && (
                      <p className="text-rose-400 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="company"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Company
                  </label>
                  <div className="mt-2">
                    <input
                      name="company"
                      {...register("company")}
                      placeholder="Company"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.company && (
                      <p className="text-rose-400 text-sm">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="difficulty"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Difficulty
                  </label>
                  <div className="mt-2">
                    <select
                      name="difficulty"
                      {...register("difficulty")}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    >
                      <option value="Easy" defaultValue="Easy">
                        Easy
                      </option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    {errors.difficulty && (
                      <p className="text-rose-400 text-sm">
                        {errors.difficulty.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="tags"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Tags
                  </label>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <ReactTagInput
                        {...register("tags")}
                        tags={field.value}
                        onChange={(newTags) => field.onChange(newTags)}
                      />
                    )}
                  />
                  {errors.tags && (
                    <p className="text-rose-400 text-sm">
                      {errors.tags.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <MDEditor
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          preview="edit"
                          height={300}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-rose-400 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
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
              disabled={isCreating || isUpdating}
              className="rounded-md cursor-pointer bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {(isCreating || isUpdating) && <Spinner />}
              {action} Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;

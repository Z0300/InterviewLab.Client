import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateProblem from "../hooks/useCreateProblems.js";
import ReactTagInput from "@pathofdev/react-tag-input";
import MDEditor from "@uiw/react-md-editor";

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
  tags: z.array(z.string()).nonempty().or(z.array(z.string())),
  description: z.string().min(10, "Description too short"),
});

export default function ProblemForm({ titleHeading }) {
  const mutation = useCreateProblem();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      title: "",
      company: "",
      difficulty: "Easy",
      tags: [],
      description: "",
    },
  });

  async function onSubmit(data) {
    const payload = {
      title: data.title,
      company: data.company,
      difficulty: data.difficulty,
      tagsJson: data.tags,
      description: data.description,
    };
    try {
      await mutation.mutateAsync(payload);
      reset();
    } catch (error) {
      const errRes = error.response?.data;
      const errors = errRes.errors;
      if (errors && typeof errors !== "object") {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key, { type: "server", message: String(value) });
        });
      } else {
        console.log(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="problemForm">
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            {titleHeading}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-white"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register("title")}
                  placeholder="Title"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.title && (
                  <p style={{ color: "red" }}>{errors.title.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm/6 font-medium text-white"
              >
                Company
              </label>
              <div className="mt-2">
                <input
                  id="company"
                  {...register("company")}
                  placeholder="Company"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.company && (
                  <p style={{ color: "red" }}>{errors.company.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="difficulty"
                className="block text-sm/6 font-medium text-white"
              >
                Difficulty
              </label>
              <div className="mt-2">
                <select
                  id="difficulty"
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
                  <p style={{ color: "red" }}>{errors.difficulty.message}</p>
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
              {errors.tagsJson && (
                <p style={{ color: "red" }}>{errors.tagsJson.message}</p>
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
                      id="description"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      height={300}
                    />
                  )}
                />
                {errors.description && (
                  <p style={{ color: "red" }}>{errors.description.message}</p>
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
          onClick={() => reset()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md cursor-pointer bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

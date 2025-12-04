import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout.jsx";

const LoginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      navigate("/admin/problems");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  {...register("username")}
                  placeholder="Username"
                  className="block w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-base
                    text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none sm:text-sm/6"
                />
                {errors.username && (
                  <p className="text-rose-400 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  {...register("password")}
                  placeholder="Password"
                  className="block w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-base
                    text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-rose-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md cursor-pointer bg-white text-black px-4 py-2.5 sm:px-3 sm:py-2
              text-sm font-semibold hover:bg-neutral-200 focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-neutral-400 transition-colors touch-manipulation"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
    </AuthLayout>
  );
};

export default LoginForm;

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
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base/7 font-semibold text-white">Login</h2>
              <p className="mt-1 text-sm/6 text-gray-400">
                Enter your credentials to access your account.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base
                    text-white outline-1 -outline-offset-1 outline-white/10
                    placeholder:text-gray-500 focus:outline-2
                    focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
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
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base
                    text-white outline-1 -outline-offset-1 outline-white/10
                    placeholder:text-gray-500 focus:outline-2
                    focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.password && (
                      <p className="text-rose-400 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md cursor-pointer bg-indigo-500 px-3 py-2
              text-sm font-semibold text-white focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;

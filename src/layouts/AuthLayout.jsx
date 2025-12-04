import React from "react";

const AuthLayout = ({
  children,
  title = "Welcome Back",
  subtitle = "Sign in to your account",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 py-6 sm:py-10">
      <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-base/7 font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm/6 text-gray-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

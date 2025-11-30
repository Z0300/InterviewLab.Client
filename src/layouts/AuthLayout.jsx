import React from "react";

const AuthLayout = ({
  children,
  title = "Welcome Back",
  subtitle = "Sign in to your account",
  showBrand = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center rounded-xl p-8 bg-gradient-to-br from-slate-800/60 to-slate-700/50 border border-slate-700/60 shadow-lg">
          {showBrand ? (
            <div className="text-center">
              <div className="mx-auto mb-6 w-24 h-24 flex items-center justify-center rounded-full bg-white/5">
                <span className="text-white font-bold text-xl">CHH</span>
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                {title}
              </h1>
              <p className="text-sm/6 text-gray-300">{subtitle}</p>
            </div>
          ) : null}

          <div className="mt-8 text-gray-300 text-sm leading-relaxed">
            <p>
              Securely sign in to access the admin panel and manage your
              solutions, problems, and other resources.
            </p>
            <p className="mt-4 text-xs text-gray-400">Powered by your app</p>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-8 shadow-lg">
          <div className="max-w-xl mx-auto">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-base/7 font-semibold text-white">{title}</h2>
              <p className="mt-1 text-sm/6 text-gray-400">{subtitle}</p>
            </div>
            {children}
            <div className="mt-6 text-center text-sm text-gray-400">
              <span>Need an account? </span>
              <a className="text-indigo-400 hover:underline cursor-pointer">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [serverError, setServerError] = useState(urlError || "");
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setServerError(result.error);
      } else {
        // Use full page navigation (not router.push) so the proxy
        // can intercept and check for the checkout_price_id cookie
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#F9FAFB]">
      <div className="card bg-white w-full max-w-md rounded border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="card-body p-8 sm:p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-black">Welcome Back</h1>
            <p className="text-black/60 font-medium mt-2">Sign in to your account to continue</p>
          </div>

          {serverError && (
            <div role="alert" className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full border-2 border-black rounded py-3 font-bold text-black bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-black opacity-10"></div>
            <span className="px-3 text-xs font-bold text-black/40 tracking-wider">OR</span>
            <div className="flex-1 h-px bg-black opacity-10"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-bold text-black">Email Address</span></label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full border-2 focus:outline-none rounded py-2 px-3 ${errors.email ? "border-red-500" : "border-black"}`}
                {...register("email")}
              />
              {errors.email && <label className="label py-1"><span className="label-text-alt text-red-500 font-bold">{errors.email.message}</span></label>}
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center py-1">
                <label className="label py-0">
                  <span className="label-text font-bold text-black">Password</span>
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#00B4D8] hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full border-2 focus:outline-none rounded py-2 px-3 ${errors.password ? "border-red-500" : "border-black"}`}
                {...register("password")}
              />
              {errors.password && <label className="label py-1"><span className="label-text-alt text-red-500 font-bold">{errors.password.message}</span></label>}
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all py-3 mt-4" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
            </button>
          </form>

          <p className="text-center font-medium text-black/60 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#00B4D8] hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

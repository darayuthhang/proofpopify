"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();
        if (res.ok) {
          if (data.alreadyVerified) {
            setStatus("already");
            setMessage("Your email is already verified.");
          } else {
            setStatus("success");
            setMessage("Your email has been verified successfully!");
          }
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  const icons = { verifying: "⏳", success: "✅", already: "ℹ️", error: "❌" };
  const titles = {
    verifying: "Verifying your email...",
    success: "Email Verified!",
    already: "Already Verified",
    error: "Verification Failed",
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body text-center">
          <div className="text-5xl mb-2">{icons[status]}</div>
          <h1 className="text-2xl font-bold">{titles[status]}</h1>
          <p className="text-base-content/60 mb-4">
            {status === "verifying" ? "Please wait..." : message}
          </p>

          {status === "verifying" && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {(status === "success" || status === "already") && (
            <Link href="/login" className="btn btn-primary w-full">
              Sign In to Your Account
            </Link>
          )}

          {status === "error" && (
            <Link href="/register" className="btn btn-outline w-full">
              Try Registering Again
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

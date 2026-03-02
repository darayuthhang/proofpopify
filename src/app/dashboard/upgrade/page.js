"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/constants";

export default function UpgradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(null); // track which plan is loading

  const handleSubscribe = async (priceId) => {
    try {
      setLoading(priceId);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Upgrade Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back to Dashboard */}
      <div className="mb-6">
        <Link href="/dashboard" className="btn btn-ghost btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="badge badge-primary mb-4 font-bold">UPGRADE</div>
        <h1 className="text-4xl font-extrabold text-base-content mb-3">
          Choose Your Plan
        </h1>
        <p className="text-lg text-base-content/60">
          Unlock the full power of your dashboard with a subscription.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {PRICING_TIERS.map((tier, idx) => (
          <div
            key={idx}
            className={`card bg-base-100 shadow-xl border-2 transition-all hover:scale-[1.02] ${
              tier.popular
                ? "border-primary shadow-primary/10 ring ring-primary/5"
                : "border-base-300"
            }`}
          >
            <div className="card-body p-8">
              {tier.popular && (
                <div className="badge badge-primary absolute top-0 right-8 -translate-y-1/2 font-bold p-3">
                  BEST VALUE
                </div>
              )}

              <div className="mb-5">
                <h3 className="card-title text-xl font-bold text-base-content/70">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-base-content tracking-tight">{tier.price}</span>
                  <span className="text-lg text-base-content/40 font-semibold">{tier.interval}</span>
                </div>
                <p className="mt-3 text-base-content/60 leading-relaxed text-sm">{tier.description}</p>
              </div>

              <div className="divider opacity-50 my-2"></div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-base-content/80 text-sm font-medium">
                    <svg className="w-4 h-4 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="card-actions mt-auto">
                <button
                  onClick={() => handleSubscribe(tier.priceId)}
                  disabled={loading !== null}
                  className={`btn btn-block shadow-md ${
                    tier.popular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {loading === tier.priceId ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    tier.cta
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

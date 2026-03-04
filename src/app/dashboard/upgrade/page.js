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
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-transparent">
      {/* Back to Dashboard */}
      <div className="mb-10">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 font-bold text-black hover:text-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 animate-fade-in">
        <div className="inline-block text-black font-bold uppercase tracking-widest text-sm mb-4">
          Upgrade
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-black mb-6 leading-[1.05]">
          Choose Your Plan
        </h1>
        <p className="text-lg sm:text-xl text-black/70 font-medium max-w-xl mx-auto">
          Unlock the full power of your dashboard with a subscription.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {PRICING_TIERS.map((tier, idx) => (
          <div 
            key={idx} 
            className="relative bg-[#F9FAFB] border-2 border-black rounded p-8 sm:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {tier.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#FFD91A] border border-black text-black font-bold uppercase text-xs px-4 py-1.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-black tracking-tight">{tier.price}</span>
                <span className="text-lg text-black/60 font-bold">{tier.interval}</span>
              </div>
              <p className="mt-4 text-black/70 text-base font-medium leading-relaxed">{tier.description}</p>
            </div>
            
            <div className="h-px w-full bg-black mb-8 opacity-20"></div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-4 text-black/80 font-medium">
                  <span className="flex shrink-0 items-center justify-center w-5 h-5 bg-[#72DDA4] rounded-full border border-black mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleSubscribe(tier.priceId)}
              disabled={loading !== null}
              className={`w-full py-3.5 text-lg font-bold rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                tier.popular 
                ? "bg-[#72DDA4] text-black hover:bg-[#5bc58c]" 
                : "bg-white text-black hover:bg-gray-100"
              } ${loading !== null ? "opacity-70 cursor-not-allowed" : "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
            >
              {loading === tier.priceId ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm text-black"></span>
                  Loading...
                </div>
              ) : (
                tier.cta
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

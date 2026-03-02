"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PRICING_TIERS } from "@/lib/constants";

export default function Pricing() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId) => {
    if (!session) {
      if (typeof document !== "undefined") {
        document.cookie = `checkout_price_id=${priceId}; path=/; max-age=3600`;
      }
      router.push("/register");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (response.status === 401) {
        // Session expired on server — re-login
        if (typeof document !== "undefined") {
          document.cookie = `checkout_price_id=${priceId}; path=/; max-age=3600`;
        }
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Checkout Error:", response.status, errorText);
        throw new Error(errorText || "Something went wrong");
      }

      const { url } = await response.json();
      // Use window.location for external Stripe URL
      window.location.href = url;
    } catch (error) {
      console.error("Subscription Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="badge badge-accent mb-4 font-bold">PRICING</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content mb-4">Invest in Trust</h2>
          <p className="text-base sm:text-lg text-base-content/60">Turn one customer into your next ten. Start increasing your conversions today.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, idx) => (
            <div 
              key={idx} 
              className={`card bg-base-100 shadow-xl border-2 transition-all hover:scale-[1.02] ${
                tier.popular 
                ? "border-primary shadow-primary/10 ring ring-primary/5" 
                : "border-base-300"
              }`}
            >
              <div className="card-body p-6 sm:p-10">
                {tier.popular && (
                  <div className="badge badge-primary absolute top-0 right-10 -translate-y-1/2 font-bold p-3">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="card-title text-2xl font-bold text-base-content/70">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-black text-base-content tracking-tight">{tier.price}</span>
                    <span className="text-xl text-base-content/40 font-semibold">{tier.interval}</span>
                  </div>
                  <p className="mt-4 text-base-content/60 leading-relaxed font-medium">{tier.description}</p>
                </div>
                
                <div className="divider opacity-50"></div>
                
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-base-content/80 font-medium">
                      <svg className="w-5 h-5 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="card-actions mt-auto">
                  <button 
                    onClick={() => handleSubscribe(tier.priceId)}
                    disabled={loading}
                    className={`btn btn-lg btn-block shadow-md ${
                      tier.popular 
                      ? "btn-primary" 
                      : "btn-outline"
                    }`}
                  >
                    {loading ? 'Processing...' : tier.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-base-content/50 font-medium">
            Risk-free trial. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
}

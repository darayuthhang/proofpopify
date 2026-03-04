"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStripe } from "react-icons/fa6";
import { HiArrowTopRightOnSquare, HiInformationCircle } from "react-icons/hi2";

export default function StripeIntegrationCard({ startup }) {
  const router = useRouter();

  const [stripeKeyInput, setStripeKeyInput] = useState("");
  const [isSavingStripeKey, setIsSavingStripeKey] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", section: "" });



  const handleSaveStripeKey = async (e) => {
    e.preventDefault();
    setIsSavingStripeKey(true);
    setMessage({ type: "", text: "", section: "stripe" });

    try {
      const response = await fetch(`/api/startups/${startup.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeRestrictedKey: stripeKeyInput }),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        setMessage({ type: "error", text: result?.error || "Failed to update key", section: "stripe" });
      } else {
        setMessage({ type: "success", text: "Stripe key saved successfully!", section: "stripe" });
        setStripeKeyInput("");
        router.refresh();
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error occurred", section: "stripe" });
    }
    setIsSavingStripeKey(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. Stripe Integration */}
      <div className="card bg-base-100 shadow-xl border border-base-200" data-theme="cupcake">
        <div className="card-body">
          <h2 className="card-title text-xl flex items-center gap-2">
            <FaStripe className="w-8 h-8 text-[#635BFF]" />
            1. Stripe Integration
          </h2>
          <p className="text-sm text-base-content/70">
            {startup.isKeySet
              ? "Connected to Stripe. Enter a new key to update."
              : "Enter a Stripe Restricted Key to fetch transactions."}
          </p>

          <details className="my-3 group">
            <summary className="text-xs text-base-content/50 cursor-pointer hover:text-base-content/70 transition-colors flex items-center gap-1.5 select-none">
              <HiInformationCircle className="w-3.5 h-3.5 shrink-0" />
              <span>🔒 Your key is safe — restricted read-only access.{" "}
                <span className="underline underline-offset-2">Learn more</span>
              </span>
            </summary>
            <div className="mt-2 text-xs text-base-content/60 pl-5 leading-relaxed">
              Stripe <strong>Restricted Keys</strong> only grant limited read access — they can't charge customers, issue refunds, or modify account data.
              Create a key with only <strong>Read</strong> access to <strong>Charges</strong>.{" "}
              <a 
                href="https://docs.stripe.com/keys-best-practices#limit-access" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-1"
              >
                Stripe security docs
                <HiArrowTopRightOnSquare className="w-3 h-3" />
              </a>
            </div>
          </details>

          <div className="mb-4 mt-2">
            <a
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline w-fit gap-1"
            >
              Get Key from Stripe
              <HiArrowTopRightOnSquare className="w-4 h-4" />
            </a>
          </div>

          <form onSubmit={handleSaveStripeKey} className="flex flex-col gap-3 mt-2">
            <input
              type="password"
              placeholder={startup.isKeySet ? "rk_live_... (Key is set, enter to update)" : "rk_live_... (Paste your Restricted Key here)"}
              className="input input-bordered w-full"
              value={stripeKeyInput}
              onChange={(e) => setStripeKeyInput(e.target.value)}
              required={!startup.isKeySet}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSavingStripeKey || (!stripeKeyInput && startup.isKeySet)}
            >
              {isSavingStripeKey ? <span className="loading loading-spinner text-current"></span> : (startup.isKeySet ? "Update Key" : "Save Key & Connect")}
            </button>

            {message.section === "stripe" && message.text && (
              <p className={`text-sm mt-2 ${message.type === "error" ? "text-error" : "text-success"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

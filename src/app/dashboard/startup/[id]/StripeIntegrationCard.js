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
      <div className="card bg-base-100 shadow-xl border border-base-200">
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

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 my-4 text-sm flex gap-2 items-start text-base-content/80">
            <HiInformationCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1 text-base-content">Your data is 100% safe.</p>
              <p>
                Stripe specifically designed <strong>Restricted Keys</strong> for safely connecting third-party tools like ProofPopify. 
                They only grant limited read access and cannot charge customers, issue refunds, or modify any account data. 
                For maximum security, please create a key with only <strong>Read</strong> access to <strong>Charges</strong>.{" "}
                <a 
                  href="https://docs.stripe.com/keys-best-practices#limit-access" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  Read Stripe's official security docs
                  <HiArrowTopRightOnSquare className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

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
              placeholder={startup.isKeySet ? "rk_live_... (Key is set, enter to update)" : "rk_live_..."}
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
              {isSavingStripeKey ? <span className="loading loading-spinner text-white"></span> : "Save Key"}
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

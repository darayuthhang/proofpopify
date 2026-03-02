"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStripe } from "react-icons/fa6";
import { HiArrowTopRightOnSquare, HiArrowPath, HiTableCells, HiInformationCircle } from "react-icons/hi2";

export default function StripeIntegrationCard({ startup }) {
  const router = useRouter();

  const [stripeKeyInput, setStripeKeyInput] = useState("");
  const [isSavingStripeKey, setIsSavingStripeKey] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", section: "" });

  const [transactions, setTransactions] = useState([]);
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [txError, setTxError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoadingTx(true);
    setTxError(null);
    try {
      const res = await fetch(`/api/public/transactions?startupId=${startup.id}`);
      const data = await res.json();
      if (res.ok && data.transactions) {
        setTransactions(data.transactions);
      } else {
        setTxError(data.error || "Could not load transactions.");
      }
    } catch {
      setTxError("Failed to fetch transactions.");
    } finally {
      setIsLoadingTx(false);
    }
  };

  useEffect(() => {
    if (startup.isKeySet) {
      fetchTransactions();
    }
  }, [startup.isKeySet]);

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000) - timestamp;
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

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
        fetchTransactions();
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

      {/* 4. Recent Transactions */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="card-title text-xl flex items-center gap-2">
                <HiTableCells className="w-5 h-5 text-info" />
                Recent Transactions
              </h2>
              <p className="text-xs text-base-content/60 mt-1">
                We pull this data live directly from Stripe. <strong>We do not save your customer's data to our databases.</strong>
              </p>
            </div>
            {startup.isKeySet && (
              <button 
                onClick={fetchTransactions} 
                className="btn btn-ghost btn-sm gap-1 mt-1" 
                disabled={isLoadingTx}
              >
                <HiArrowPath className={`w-4 h-4 ${isLoadingTx ? "animate-spin" : ""}`} />
                Refresh
              </button>
            )}
          </div>

          {!startup.isKeySet ? (
            <div className="text-center py-10 text-base-content/50">
              <FaStripe className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Connect your Stripe key above to see transactions here.</p>
            </div>
          ) : isLoadingTx ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : txError ? (
            <div className="text-center py-10">
              <p className="text-error text-sm">{txError}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-10 text-base-content/50">
              <p>No transactions found for this Stripe account yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="font-medium">{tx.name || "Someone"}</td>
                      <td className="font-medium">{tx.city}</td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{tx.country}</span>
                      </td>
                      <td className="text-sm text-base-content/70">{getTimeAgo(tx.created)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { HiArrowPath, HiTableCells } from "react-icons/hi2";
import { FaStripe } from "react-icons/fa6";

export default function RecentTransactionsCard({ startup }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [txError, setTxError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoadingTx(true);
    setTxError(null);
    try {
      const res = await fetch(`/api/public/transactions?proof_id=${startup.proof_id}`);
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

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="card-title text-xl flex items-center gap-2">
              <HiTableCells className="w-5 h-5 text-info" />
              Recent Transactions
            </h2>
            <p className="text-xs text-base-content/60 mt-1">
              Live from Stripe. <strong>We don't save customer data.</strong>
            </p>
          </div>
          {startup.isKeySet && (
            <button 
              onClick={fetchTransactions} 
              className="btn btn-ghost btn-sm gap-1 mt-1 shrink-0" 
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
            <p className="text-sm">Connect your Stripe key to see transactions here.</p>
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
            <p className="text-sm">No transactions found for this Stripe account yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra table-sm w-full text-xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="font-medium truncate max-w-[80px]">{tx.name || "Someone"}</td>
                    <td className="truncate max-w-[100px]">
                      {tx.city ? `${tx.city}, ${tx.country}` : tx.country}
                    </td>
                    <td className="text-base-content/70 whitespace-nowrap">{getTimeAgo(tx.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function StripePopup() {
  const [transactions, setTransactions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch");
        }
        const data = await res.json();
        if (data.transactions && data.transactions.length > 0) {
          setTransactions(data.transactions);
          setIsVisible(true);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    let interval;
    if (transactions.length > 1 && isVisible) {
      interval = setInterval(() => {
        setIsVisible(false); // Trigger fade out
        
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % transactions.length);
          setIsVisible(true); // Trigger fade in
        }, 500); // Wait for fade out animation
      }, 5000); // 5 seconds per notification
    }

    return () => clearInterval(interval);
  }, [transactions.length, isVisible]);

  if (error || transactions.length === 0) return null;

  const currentTx = transactions[currentIndex];

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000) - timestamp;
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-3 border border-base-200">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-700">
            Someone in <span className="text-[#00B4D8] font-semibold">{currentTx.city} ({currentTx.country})</span> subscribed
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-gray-500">{getTimeAgo(currentTx.created)} | </span>
            <svg
              className="w-4 h-4 text-[#00B4D8]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-500">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

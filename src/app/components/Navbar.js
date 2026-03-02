"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { constants } from "@/lib/constants";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [loadingBilling, setLoadingBilling] = useState(false);

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "ADMIN";
  const isSubscribed = !!session?.user?.isAccess;

  // ── Handlers ──────────────────────────────────────────────
  const handleBillingPortal = async () => {
    try {
      setLoadingBilling(true);
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      if (!res.ok) {
        if (res.status === 400) {
          alert("You don't have an active subscription yet!");
        } else {
          throw new Error("Failed to load portal");
        }
        return;
      }
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Error opening billing portal.");
    } finally {
      setLoadingBilling(false);
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-4 lg:px-12 sticky top-0 z-50 backdrop-blur-md bg-base-100/80">

      {/* ── Mobile Hamburger (Left) ── */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
            {/* Guest: show Features + Pricing links */}
            {!isLoggedIn && (
              <>
                <li><Link href="/#features" className="font-bold">Features</Link></li>
                <li><Link href="/#pricing" className="font-bold">Pricing</Link></li>
                <div className="divider my-1"></div>
                <li><Link href="/login">Sign In</Link></li>
                <li><Link href="/register" className="text-primary">Get Started</Link></li>
              </>
            )}
            {/* Logged in: show Dashboard */}
            {isLoggedIn && (
              <li><Link href="/dashboard">Dashboard</Link></li>
            )}
          </ul>
        </div>
      </div>

      {/* ── Logo (Center mobile, Left desktop) ── */}
      <div className="navbar-center lg:navbar-start flex-1 lg:flex-none">
        <Link href="/" className="btn btn-ghost text-xl px-2 hover:bg-transparent">
          <span className="text-2xl mr-1">🔐</span>
          <span className="font-black tracking-tighter text-base-content">{constants.APP_NAME}</span>
        </Link>
      </div>

      {/* ── Desktop Center Links (only for guests) ── */}
      {!isLoggedIn && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link href="/#features" className="font-bold">Features</Link></li>
            <li><Link href="/#pricing" className="font-bold">Pricing</Link></li>
          </ul>
        </div>
      )}

      {/* ── Right Side ── */}
      <div className="navbar-end gap-2 sm:gap-4">
        {status === "loading" ? (
          <span className="loading loading-spinner loading-md text-primary"></span>

        ) : isLoggedIn ? (
          <div className="flex items-center gap-3">
            {/* Desktop action buttons */}
            <div className="hidden sm:flex gap-2">
              <Link href="/dashboard" className="btn btn-primary btn-sm">Dashboard</Link>
              {!isSubscribed && (
                <Link href="/dashboard/upgrade" className="btn btn-secondary btn-sm gap-1">
                  ✨ Upgrade
                </Link>
              )}
             
            </div>

            {/* Avatar dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-300">
                <div className="w-10 rounded-full bg-neutral text-neutral-content grid place-items-center">
                  <span className="text-lg font-bold">
                    {session.user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52 mt-4 border border-base-200 font-bold">
                {/* User info */}
                <div className="px-4 py-3 border-b border-base-200 mb-2">
                  <p className="text-sm truncate opacity-50">{session.user.name}</p>
                  <p className="text-xs truncate text-primary">{session.user.email}</p>
                </div>

                {/* Mobile-only: Dashboard */}
                <li className="sm:hidden"><Link href="/dashboard">Dashboard</Link></li>

                {/* Mobile-only: Upgrade (if not subscribed) */}
                {!isSubscribed && (
                  <li className="sm:hidden">
                    <Link href="/dashboard/upgrade" className="text-secondary">✨ Upgrade Plan</Link>
                  </li>
                )}

               
                {/* Billing (only if subscribed) */}
                {isSubscribed && (
                  <li>
                    <button onClick={handleBillingPortal} disabled={loadingBilling}>
                      {loadingBilling ? "Loading..." : "Billing & Subscription"}
                    </button>
                  </li>
                )}

                <div className="divider my-0 opacity-20"></div>

                {/* Sign out */}
                <li>
                  <button className="text-error" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

        ) : (
          /* Guest: Sign In + Get Started */
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm font-bold">Sign In</Link>
            <Link href="/register" className="btn btn-primary btn-sm px-6 font-bold">Get Started</Link>
          </div>
        )}
      </div>
    </div>
  );
}

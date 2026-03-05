"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { constants } from "@/lib/constants";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [loadingBilling, setLoadingBilling] = useState(false);

  const isLoggedIn = !!session;
  const isLandingPage = pathname === "/";
  const isAdmin = session?.user?.role === "ADMIN";
  const isSubscribed = !!session?.user?.isAccess;

  // Do not show the navbar on the verified page
  if (pathname?.startsWith("/verified")) {
    return null;
  }

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
    <div className={`navbar px-4 lg:px-12 ${isLandingPage ? "bg-[#FFD91A]" : "bg-white border-b-2 border-black"}`}>

      {/* ── Mobile Hamburger (Left) ── */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-black hover:bg-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white rounded border-2 border-black w-56 text-black font-bold">
            {/* Guest: show Features + Pricing links */}
            {!isLoggedIn && (
              <>
                <li><Link href="/#features" className="hover:bg-[#72DDA4] hover:text-black focus:bg-[#72DDA4] focus:text-black py-3 rounded">Features</Link></li>
                <li><Link href="/#pricing" className="hover:bg-[#72DDA4] hover:text-black focus:bg-[#72DDA4] focus:text-black py-3 rounded">Pricing</Link></li>
                <div className="h-px bg-black opacity-20 my-2"></div>
                <li><Link href="/login" className="hover:bg-[#72DDA4] hover:text-black focus:bg-[#72DDA4] focus:text-black py-3 rounded">Sign In</Link></li>
                <li><Link href="/register" className="text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white focus:bg-[#00B4D8] focus:text-white py-3 rounded">Get Started</Link></li>
              </>
            )}
            {/* Logged in: show Dashboard */}
            {isLoggedIn && (
              <li><Link href="/dashboard" className="hover:bg-[#72DDA4] hover:text-black focus:bg-[#72DDA4] focus:text-black py-3 rounded">Dashboard</Link></li>
            )}
          </ul>
        </div>
      </div>

      {/* ── Logo (Center mobile, Left desktop) ── */}
      <div className="navbar-center lg:navbar-start flex-1 lg:flex-none">
        <Link href="/" className="btn btn-ghost text-xl px-2 hover:bg-transparent text-black flex items-center gap-2">
          <img src="/logo.svg" alt="ProofPopify Logo" className="w-8 h-8 drop-shadow-sm" />
          <span className="font-extrabold tracking-tight text-black">{constants.APP_NAME}</span>
        </Link>
      </div>

      {/* ── Desktop Center Links (only for guests) ── */}
      {!isLoggedIn && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 text-black font-bold">
            <li><Link href="/#features" className="hover:bg-black/10 focus:bg-black/10 rounded">Features</Link></li>
            <li><Link href="/#pricing" className="hover:bg-black/10 focus:bg-black/10 rounded">Pricing</Link></li>
          </ul>
        </div>
      )}

      {/* ── Right Side ── */}
      <div className="navbar-end gap-2 sm:gap-4">
        {status === "loading" ? (
          <span className="loading loading-spinner loading-md text-black"></span>
        ) : isLoggedIn ? (
          <div className="flex items-center gap-3">
            {/* Desktop action buttons */}
            <div className="hidden sm:flex gap-3">
              <Link href="/dashboard" className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                Dashboard
              </Link>
              {!isSubscribed && (
                <Link href="/dashboard/upgrade" className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all gap-1">
                  ✨ Upgrade
                </Link>
              )}
            </div>

            {/* Avatar dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-transparent">
                <div className="w-10 rounded-full bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grid place-items-center">
                  <span className="text-lg font-extrabold flex items-center justify-center w-full h-full mt-0.5">
                    {session.user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white rounded border-2 border-black w-56 mt-4 text-black font-bold">
                {/* User info */}
                <div className="px-4 py-3 border-b-2 border-black mb-3 bg-[#F9FAFB] rounded-t-sm">
                  <p className="text-sm truncate font-extrabold">{session.user.name}</p>
                  <p className="text-xs truncate text-black/60 font-medium">{session.user.email}</p>
                </div>

                {/* Mobile-only: Dashboard */}
                <li className="sm:hidden"><Link href="/dashboard" className="hover:bg-[#72DDA4] hover:text-black py-2.5 rounded">Dashboard</Link></li>

                {/* Mobile-only: Upgrade (if not subscribed) */}
                {!isSubscribed && (
                  <li className="sm:hidden mb-1">
                    <Link href="/dashboard/upgrade" className="text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white py-2.5 rounded">✨ Upgrade Plan</Link>
                  </li>
                )}
               
                {/* Billing (only if subscribed) */}
                {isSubscribed && (
                  <li>
                    <button onClick={handleBillingPortal} disabled={loadingBilling} className="hover:bg-[#72DDA4] hover:text-black py-2.5 rounded">
                      {loadingBilling ? "Loading..." : "Billing & Subscription"}
                    </button>
                  </li>
                )}

                <div className="h-px bg-black opacity-20 my-2"></div>

                {/* Sign out */}
                <li>
                  <button className="text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

        ) : (
          /* Guest: Sign In + Get Started */
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="btn btn-ghost btn-sm font-bold text-black hover:bg-black/10">Sign In</Link>
            <Link href="/register" className="h-10 px-6 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { HiPlus, HiArrowRight, HiCalendarDays, HiRocketLaunch } from "react-icons/hi2";
import { FaStripe } from "react-icons/fa6";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [startups, setStartups] = useState([]);
  const [newStartupName, setNewStartupName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/startups")
        .then((res) => res.json())
        .then((data) => {
          if (data.startups) setStartups(data.startups);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch startups:", err);
          setIsLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) return null;

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => {
    modalRef.current?.close();
    setNewStartupName("");
  };

  const handleCreateStartup = async (e) => {
    e.preventDefault();
    if (!newStartupName.trim()) return;
    setIsCreating(true);

    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newStartupName }),
      });
      if (res.ok) {
        const data = await res.json();
        closeModal();
        // Navigate directly to the new startup's settings page
        router.push(`/dashboard/startup/${data.startup.id}`);
      }
    } catch (err) {
      console.error("Error creating startup:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in relative min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {session.user.name}
            </span>
          </h1>
          <p className="text-base-content/60 mt-1">Manage your startups and embed widgets below.</p>
        </div>
        <button onClick={openModal} className="btn btn-primary">
          <HiPlus className="w-5 h-5" />
          Add Your Startup
        </button>
      </div>

      {/* Startup Grid */}
      {startups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <div
              key={startup.id}
              onClick={() => router.push(`/dashboard/startup/${startup.id}`)}
              className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary/50 transition-all cursor-pointer hover:shadow-2xl"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FaStripe className="w-8 h-8 text-[#635BFF] flex-shrink-0" />
                    <h2 className="card-title text-xl break-words">{startup.name}</h2>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-1 ml-2 border border-base-300 shadow-sm"
                    style={{ backgroundColor: startup.themeColor }}
                    title="Theme Color"
                  ></div>
                </div>
                <div className="flex items-center gap-1 text-xs text-base-content/50 mb-4">
                  <HiCalendarDays className="w-3.5 h-3.5" />
                  {new Date(startup.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-auto pt-2 flex items-center gap-1">
                  <span className="text-sm text-primary font-medium">Manage Widget</span>
                  <HiArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-xl font-semibold mb-2">No startups yet</h2>
          <p className="text-base-content/60 mb-6">Create your first startup to get started with Stripe transaction popups.</p>
          <button onClick={openModal} className="btn btn-primary">
            <HiPlus className="w-5 h-5" />
            Add Your Startup
          </button>
        </div>
      )}

      {/* Modal for Creating Startup */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <HiRocketLaunch className="w-5 h-5 text-primary" />
            Add Your Startup
          </h3>
          <p className="text-sm text-base-content/70 mb-6">
            Enter the name of your startup. You&apos;ll be taken to its settings page to connect Stripe and customize your popup widget.
          </p>
          <form onSubmit={handleCreateStartup} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="e.g. My SaaS App"
              className="input input-bordered w-full"
              value={newStartupName}
              onChange={(e) => setNewStartupName(e.target.value)}
              required
              autoFocus
            />
            <div className="modal-action mt-0">
              <button type="button" className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isCreating}>
                {isCreating ? <span className="loading loading-spinner text-white"></span> : "Create & Continue"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

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
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-black">
            Welcome back,{" "}
            <span className="text-[#00B4D8]">
              {session.user.name}
            </span>
          </h1>
          <p className="text-black/60 font-medium mt-2">Manage your startups and embed widgets below.</p>
        </div>
        <button onClick={openModal} className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all gap-2">
          <HiPlus className="w-5 h-5 stroke-2" />
          Add Your Startup
        </button>
      </div>

      {/* Startup Grid */}
      {startups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <div
              key={startup.id}
              onClick={() => router.push(`/dashboard/startup/${startup.id}`)}
              className="bg-white rounded border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer p-6 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <FaStripe className="w-8 h-8 text-[#635BFF] flex-shrink-0" />
                  <h2 className="font-extrabold text-xl text-black break-words tracking-tight">{startup.name}</h2>
                </div>
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1 ml-2 border border-black"
                  style={{ backgroundColor: startup.themeColor }}
                  title="Theme Color"
                ></div>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm text-black/50 font-medium mb-6">
                <HiCalendarDays className="w-4 h-4" />
                {new Date(startup.createdAt).toLocaleDateString()}
              </div>

              <div className="mt-auto pt-4 flex items-center gap-1 text-[#00B4D8] group font-bold">
                <span className="text-sm">Manage Widget</span>
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-black border-dashed rounded bg-white mt-8">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-2xl font-extrabold text-black mb-2 tracking-tight">No startups yet</h2>
          <p className="text-black/60 font-medium mb-8 max-w-sm">Create your first startup to get started with Stripe transaction popups.</p>
          <button onClick={openModal} className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all gap-2">
            <HiPlus className="w-5 h-5 stroke-2" />
            Add Your Startup
          </button>
        </div>
      )}

      {/* Modal for Creating Startup */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle bg-black/50 backdrop-blur-sm">
        <div className="modal-box bg-white border-2 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 overflow-visible">
          <h3 className="font-extrabold text-2xl text-black mb-3 flex items-center gap-2 tracking-tight">
            <HiRocketLaunch className="w-6 h-6 text-[#72DDA4]" />
            Add Your Startup
          </h3>
          <p className="text-sm text-black/60 font-medium mb-8">
            Enter the name of your startup. You&apos;ll be taken to its settings page to connect Stripe and customize your popup widget.
          </p>
          <form onSubmit={handleCreateStartup} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm uppercase tracking-wider">Startup Name</label>
                <input
                type="text"
                placeholder="e.g. My SaaS App"
                className="w-full border-2 border-black focus:outline-none rounded py-3 px-4 text-black font-medium"
                value={newStartupName}
                onChange={(e) => setNewStartupName(e.target.value)}
                required
                autoFocus
                />
            </div>
            
            <div className="modal-action mt-2 flex gap-3">
              <button type="button" className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="h-10 px-4 inline-flex items-center justify-center font-bold text-black border-2 border-black rounded bg-[#72DDA4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" disabled={isCreating}>
                {isCreating ? <span className="loading loading-spinner text-black"></span> : "Create & Continue"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>
    </div>
  );
}

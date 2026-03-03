import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import StartupSettingsClient from "./StartupSettingsClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const startup = await prisma.startup.findUnique({
    where: { id: id },
    select: { name: true }
  });

  return {
    title: startup ? `${startup.name} Settings` : "Startup Settings",
    description: "Configure your Stripe popup widget settings for this startup.",
  };
}

export default async function StartupPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const startup = await prisma.startup.findUnique({
    where: { id: id },
  });

  if (!startup || startup.userId !== session.user.id) {
    redirect("/dashboard");
  }

  // We only pass the fields we need to the client safely
  // For security, if there's a key, we just pass down a boolean or a masked string, 
  // but for simplicity in MVP we can just let them know if it's set or not, 
  // or pass down the full string if they want to view/edit it. (Better to mask though)
  const isKeySet = !!startup.stripeRestrictedKey;
  
  const clientData = {
    id: startup.id,
    proof_id: startup.proof_id,
    name: startup.name,
    themeColor: startup.themeColor || "#00B4D8",
    backgroundColor: startup.backgroundColor || "#ffffff",
    actionText: startup.actionText || "subscribed",
    showRealNames: startup.showRealNames ?? true,
    showIcon: startup.showIcon ?? true,
    position: startup.position || "bottom-left",
    isKeySet,
  };

  return (
    <div className="container mx-auto h-[calc(100vh-64px)] flex flex-col p-6 overflow-hidden">
      <div className="mb-6 shrink-0 flex items-center gap-4">
        <a href="/dashboard" className="btn btn-ghost btn-circle btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <div>
          <h1 className="text-3xl font-bold">{startup.name}</h1>
          <p className="text-base-content/60 mt-1">Configure your Stripe Popup widget here</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <StartupSettingsClient startup={clientData} apiBaseUrl={process.env.NEXT_PUBLIC_APP_URL || ''} />
      </div>
    </div>
  );
}

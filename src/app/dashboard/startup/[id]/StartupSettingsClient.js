"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StripeIntegrationCard from "./StripeIntegrationCard";
import DesignSettingsCard from "./DesignSettingsCard";
import EmbedCodeCard from "./EmbedCodeCard";
import RecentTransactionsCard from "./RecentTransactionsCard";
import LivePreviewCard from "./LivePreviewCard";

export default function StartupSettingsClient({ startup, apiBaseUrl }) {
  const router = useRouter();

  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);
  
  // Design settings state
  const [themeColor, setThemeColor] = useState(startup.themeColor || "#00B4D8");
  const [backgroundColor, setBackgroundColor] = useState(startup.backgroundColor || "#ffffff");
  const [actionText, setActionText] = useState(startup.actionText || "subscribed");
  const [showRealNames, setShowRealNames] = useState(startup.showRealNames);
  const [showIcon, setShowIcon] = useState(startup.showIcon ?? false);
  const [showBorder, setShowBorder] = useState(startup.showBorder ?? true);
  const [position, setPosition] = useState(startup.position || "bottom-left");

  const [isSavingDesign, setIsSavingDesign] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", section: "" });

  const handleSaveDesign = async () => {
    setIsSavingDesign(true);

    try {
      const response = await fetch(`/api/startups/${startup.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeColor,
          backgroundColor,
          actionText,
          showRealNames,
          showIcon,
          showBorder,
          position
        }),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        toast.error(result?.error || "Failed to publish. Try again.");
      } else {
        toast.success("Published successfully! 🎉");
        router.refresh();
      }
    } catch (error) {
      toast.error("Network error — check your connection.");
    }
    setIsSavingDesign(false);
  };

  // Test mode: inject the embed script on the dashboard itself
  useEffect(() => {
    const SCRIPT_ID = `proofpopify-test-script-${startup.id}`;
    
    if (isTestModeEnabled) {
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        const queryParams = new URLSearchParams({
          id: startup.proof_id,
          test: "true",
          theme: themeColor,
          bg: backgroundColor,
          action: actionText,
          realNames: showRealNames.toString(),
          showIcon: showIcon.toString(),
          showBorder: showBorder.toString(),
          position: position
        });
        script.src = `${apiBaseUrl || window.location.origin}/embed.js?${queryParams.toString()}`;
        script.defer = true;
        document.body.appendChild(script);
      }
    } else {
      const script = document.getElementById(SCRIPT_ID);
      if (script) script.remove();
      
      const container = document.getElementById("proofpopify-container");
      if (container) container.remove();
    }
    
    return () => {
      const script = document.getElementById(SCRIPT_ID);
      if (script) script.remove();
      const container = document.getElementById("proofpopify-container");
      if (container) container.remove();
    };
  }, [isTestModeEnabled, startup.id, apiBaseUrl, themeColor, backgroundColor, actionText, showRealNames, showIcon, showBorder, position]);

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12  h-full items-stretch ">
        
        {/* Left Column (Settings) */}
        <div className="lg:col-span-3 h-full overflow-y-auto space-y-6 pr-2 pb-20 custom-scrollbar">
          <StripeIntegrationCard startup={startup} />
          
          <DesignSettingsCard 
            themeColor={themeColor} setThemeColor={setThemeColor}
            backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
            actionText={actionText} setActionText={setActionText}
            showRealNames={showRealNames} setShowRealNames={setShowRealNames}
            showIcon={showIcon} setShowIcon={setShowIcon}
            showBorder={showBorder} setShowBorder={setShowBorder}
            position={position} setPosition={setPosition}
          />
        </div>

        {/* Center Column (Wide Live Preview) */}
        <div className="lg:col-span-6 h-full overflow-y-auto lg:px-2 custom-scrollbar">
          <LivePreviewCard 
            themeColor={themeColor}
            backgroundColor={backgroundColor}
            actionText={actionText}
            showRealNames={showRealNames}
            showIcon={showIcon}
            showBorder={showBorder}
            isTestModeEnabled={isTestModeEnabled}
            setIsTestModeEnabled={setIsTestModeEnabled}
            handleSaveDesign={handleSaveDesign}
            isSavingDesign={isSavingDesign}
            publishMessage={message}
          />
        </div>

        {/* Right Column (Embed Code & Transactions) */}
        <div className="lg:col-span-3 h-full overflow-y-auto space-y-6 lg:pl-2  custom-scrollbar">
          <EmbedCodeCard 
            startupId={startup.proof_id}
            apiBaseUrl={apiBaseUrl}
            message={message}
            setMessage={setMessage}
          />
          <RecentTransactionsCard startup={startup} />
        </div>

      </div>
    </div>
  );
}

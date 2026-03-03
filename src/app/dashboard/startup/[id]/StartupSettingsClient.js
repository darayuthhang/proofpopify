"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StripeIntegrationCard from "./StripeIntegrationCard";
import DesignSettingsCard from "./DesignSettingsCard";
import EmbedCodeCard from "./EmbedCodeCard";
import RecentTransactionsCard from "./RecentTransactionsCard";

export default function StartupSettingsClient({ startup, apiBaseUrl }) {
  const router = useRouter();

  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);
  
  // Design settings state
  const [themeColor, setThemeColor] = useState(startup.themeColor || "#00B4D8");
  const [backgroundColor, setBackgroundColor] = useState(startup.backgroundColor || "#ffffff");
  const [actionText, setActionText] = useState(startup.actionText || "subscribed");
  const [showRealNames, setShowRealNames] = useState(startup.showRealNames);
  const [showIcon, setShowIcon] = useState(startup.showIcon ?? false);
  const [position, setPosition] = useState(startup.position || "bottom-left");

  const [isSavingDesign, setIsSavingDesign] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", section: "" });

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
  }, [isTestModeEnabled, startup.id, apiBaseUrl, themeColor, backgroundColor, actionText, showRealNames, showIcon, position]);

  const handleSaveDesign = async () => {
    setIsSavingDesign(true);
    setMessage({ type: "", text: "", section: "design" });

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
          position
        }),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        setMessage({ type: "error", text: result?.error || "Failed to save design options.", section: "design" });
      } else {
        setMessage({ type: "success", text: "Theme saved successfully!", section: "design" });
        router.refresh();
      }
    } catch (error) {
       setMessage({ type: "error", text: "Network error occurred", section: "design" });
    }
    setIsSavingDesign(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Scrollable (Stripe & Design Settings) */}
        <div className="lg:col-span-7 space-y-8 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 lg:pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <StripeIntegrationCard startup={startup} />
          
          <DesignSettingsCard 
            themeColor={themeColor} setThemeColor={setThemeColor}
            backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
            actionText={actionText} setActionText={setActionText}
            showRealNames={showRealNames} setShowRealNames={setShowRealNames}
            showIcon={showIcon} setShowIcon={setShowIcon}
            position={position} setPosition={setPosition}
            handleSaveDesign={handleSaveDesign}
            isSavingDesign={isSavingDesign}
            message={message}
          />
        </div>

        {/* Right Column - Sticky Sidebar (Live Preview & Embed Code) */}
        <div className="lg:col-span-5 sticky top-24 space-y-8">
          <EmbedCodeCard 
            startupId={startup.proof_id}
            apiBaseUrl={apiBaseUrl}
            message={message}
            setMessage={setMessage}
            themeColor={themeColor}
            backgroundColor={backgroundColor}
            actionText={actionText}
            showRealNames={showRealNames}
            showIcon={showIcon}
            isTestModeEnabled={isTestModeEnabled}
            setIsTestModeEnabled={setIsTestModeEnabled}
          />
          <RecentTransactionsCard startup={startup} />
        </div>
      </div>
    </div>
  );
}

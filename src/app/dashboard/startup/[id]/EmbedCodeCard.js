"use client";

import { useState, useEffect } from "react";
import { HiCodeBracket, HiClipboard, HiCheckBadge } from "react-icons/hi2";
import { AVATAR_API_URL } from "@/lib/constants";

export default function EmbedCodeCard({
  startupId,
  apiBaseUrl,
  setMessage,
  message,
  themeColor,
  backgroundColor,
  actionText,
  showRealNames,
  showIcon,
  isTestModeEnabled,
  setIsTestModeEnabled
}) {
  const [activeTab, setActiveTab] = useState("html");
  const [scriptUrl, setScriptUrl] = useState("");

  useEffect(() => {
    setScriptUrl(`${apiBaseUrl || window.location.origin}/embed.js?id=${startupId}`);
  }, [apiBaseUrl, startupId]);

  const htmlScript = `<script src="${scriptUrl}" defer></script>`;
  
  const nextjsScript = `<Script 
  src="${scriptUrl}"
  strategy="afterInteractive"
/>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeTab === "html" ? htmlScript : nextjsScript);
    setMessage({ type: "success", text: "Copied to clipboard!", section: "embed" });
    setTimeout(() => setMessage({ type: "", text: "", section: "" }), 3000);
  };
  // Mini popup preview component
  const PopupPreview = ({
    color,
    bg,
    action,
    realName,
    size = "normal",
    customerName = "Someone",
    city = "New York",
    country = "United States",
    showIcon = false
  }) => {
    const isSmall = size === "small";
    const displayName = realName ? customerName : "Someone";
    
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    const textColor = (yiq >= 128) ? '#374151' : '#f3f4f6';
    const borderColor = (yiq >= 128) ? '#e5e7eb' : '#374151';

    return (
      <div
        className="flex items-center gap-[12px] transition-all"
        style={{
          width: "max-content",
          maxWidth: "390px",
          backgroundColor: bg,
          border: `1px solid ${borderColor}`,
          padding: isSmall ? "12px" : "16px",
          borderRadius: "12px",
          boxShadow: isSmall ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {showIcon && (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
            backgroundColor: '#f3f4f6',
            border: '2px solid #ffffff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}>
            <img 
              src={`${AVATAR_API_URL}${encodeURIComponent(displayName)}`} 
              alt="Avatar" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="flex flex-col">
          <p
            className="m-0 leading-tight"
            style={{
              color: textColor,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span>{displayName}</span>
            {(city && city !== "Unknown City") || country ? (
              <>
                {" in "}
                <span className="font-semibold" style={{ color: color, fontWeight: "600" }}>
                  {city && city !== "Unknown City" ? `${city} (${country})` : `${country}`}
                </span>
              </>
            ) : ""}
            {" "}{action}
          </p>
          <div className="flex items-center gap-[4px] mt-[4px]">
            <span style={{ fontSize: "12px", color: textColor, opacity: 0.6 }}>
              {isSmall ? "2m ago" : "2 minutes ago"}
            </span>
            <span style={{ fontSize: "12px", color: textColor, opacity: 0.6 }}>|</span>
            <div style={{ color: color, display: 'flex' }}>
              <HiCheckBadge style={{ width: 16, height: 16 }} />
            </div>
            <a 
              href="/verified" 
              target="_blank" 
              rel="noreferrer"
              style={{ fontSize: "12px", color: textColor, opacity: 0.6, textDecoration: "none", display: "flex", gap: "3px", transition: "opacity 0.2s" }}
              className="hover:opacity-100"
            >
              Verified by <span style={{ color: "#635BFF", fontWeight: "600", opacity: 1 }}>Stripe</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card bg-[#111827] text-white shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl mb-2 text-[#e5e7eb] flex items-center gap-2">
          <HiCodeBracket className="w-5 h-5 text-green-400" />
          3. Embed Code
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Copy and paste this script right before the closing{" "}
          <code className="text-pink-400 bg-gray-800 px-1 py-0.5 rounded">&lt;/body&gt;</code> tag of your website.
        </p>

        <div className="tabs tabs-boxed bg-[#1f2937] mb-2 p-1">
          <a 
            className={`tab tab-sm ${activeTab === "html" ? "tab-active bg-gray-700 text-white font-medium" : "text-gray-400 font-medium"}`}
            onClick={() => setActiveTab("html")}
          >
            HTML / Vanilla JS
          </a> 
          <a 
            className={`tab tab-sm ${activeTab === "nextjs" ? "tab-active bg-gray-700 text-white font-medium" : "text-gray-400 font-medium"}`}
            onClick={() => setActiveTab("nextjs")}
          >
            Next.js / React
          </a> 
        </div>

        <div className="flex items-stretch ">
          <div className="bg-[#1f2937] p-3 rounded-lg border border-gray-700 overflow-x-auto flex-1 flex items-center">
            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap break-all m-0">
              {activeTab === "html" ? htmlScript : nextjsScript}
            </pre>
          </div>

          <button
            onClick={copyToClipboard}
            className="btn bg-gray-700 hover:bg-gray-600 border-none text-white h-auto px-4"
            title="Copy Script"
          >
            Copy
            <HiClipboard className="w-5 h-5" />
          </button>
        </div>

        {message.section === "embed" && message.text && (
          <p className="text-sm text-success text-center mt-2">{message.text}</p>
        )}

        <div className="divider before:bg-gray-700 after:bg-gray-700 text-gray-400">Live Preview</div>

        <PopupPreview 
          color={themeColor} 
          bg={backgroundColor} 
          action={actionText} 
          realName={showRealNames} 
          showIcon={showIcon}
        />
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-[#e5e7eb]">Test on Dashboard</h3>
              <p className="text-xs text-gray-400">See the real popup appear on this page.</p>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-success bg-gray-600 border-gray-500" 
              checked={isTestModeEnabled}
              onChange={() => setIsTestModeEnabled(!isTestModeEnabled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { HiCodeBracket, HiClipboard } from "react-icons/hi2";

export default function EmbedCodeCard({
  startupId,
  apiBaseUrl,
  setMessage,
  message
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
      </div>
    </div>
  );
}

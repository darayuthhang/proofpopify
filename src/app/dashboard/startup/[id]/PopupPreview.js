"use client";

import { HiCheckBadge } from "react-icons/hi2";
import { AVATAR_API_URL } from "@/lib/constants";

export default function PopupPreview({
  color,
  bg,
  action,
  realName,
  size = "normal",
  customerName = "Someone",
  city = "New York",
  country = "United States",
  showIcon = false,
  showBorder = true
}) {
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
        maxWidth: "360px",
        backgroundColor: bg,
        border: showBorder ? `2px solid #000000` : `1px solid ${borderColor}`,
        padding: isSmall ? "8px 10px" : "10px 14px",
        borderRadius: showBorder ? "6px" : "12px",
        boxShadow: showBorder 
          ? (isSmall ? "2px 2px 0px 0px rgba(0,0,0,1)" : "4px 4px 0px 0px rgba(0, 0, 0, 1)")
          : (isSmall ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"),
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
          border: showBorder ? '1px solid #000000' : '2px solid #ffffff',
          boxShadow: showBorder ? 'none' : '0 2px 5px rgba(0,0,0,0.05)',
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
            style={{ fontSize: "12px", color: textColor, textDecoration: "none", display: "flex", gap: "3px", transition: "opacity 0.2s" }}
            className="hover:opacity-100"
          >
            <span style={{ opacity: 0.6 }}>Verified by</span> <span style={{ color: '#422ad5', fontWeight: "600" }}>Stripe</span>
          </a>
        </div>
      </div>
    </div>
  );
}

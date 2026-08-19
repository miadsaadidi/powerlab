"use client";

import { useState } from "react";

interface ShareScenarioButtonProps {
  label?: string;
  customParams?: Record<string, string | number>;
}

export function ShareScenarioButton({ label = "Share Calculation", customParams }: ShareScenarioButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let shareUrl = window.location.href;
      if (customParams && Object.keys(customParams).length > 0) {
        const url = new URL(window.location.href);
        Object.entries(customParams).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            url.searchParams.set(key, String(val));
          }
        });
        shareUrl = url.toString();
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy direct link to this calculation scenario"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.45rem 0.85rem",
        borderRadius: "0.55rem",
        border: "1px solid var(--line, #cbd5e1)",
        background: copied ? "var(--brand, #16a34a)" : "var(--surface, #ffffff)",
        color: copied ? "#ffffff" : "var(--ink, #1e293b)",
        fontSize: "0.82rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 140ms ease",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {copied ? (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied Link!</span>
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

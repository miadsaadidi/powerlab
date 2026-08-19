"use client";

import { useState } from "react";

interface ShareCalculationButtonProps {
  /**
   * Key-value map of current parameters to encode in the share URL.
   */
  params: Record<string, string | number | boolean | undefined>;
  title?: string;
}

export function ShareCalculationButton({ params, title }: ShareCalculationButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.pathname, window.location.origin);
    
    // Add active non-empty params
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    });

    const shareUrl = url.toString();

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback if clipboard API is restricted
      prompt("Copy calculation link:", shareUrl);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-secondary share-btn"
      onClick={handleShare}
      title={title || "Copy link with your current calculation inputs"}
      aria-label={title || "Copy calculation link"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.875rem",
        padding: "0.45rem 0.85rem",
        borderRadius: "0.375rem",
        cursor: "pointer",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </>
        )}
      </svg>
      <span>{copied ? "Link Copied!" : "Share Link"}</span>
    </button>
  );
}

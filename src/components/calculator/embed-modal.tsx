"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-config";

interface EmbedModalProps {
  toolName: string;
  route: string;
}

export function EmbedModal({ toolName, route }: EmbedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanOrigin = siteConfig.url.replace(/\/$/, "");
  const embedUrl = typeof window !== "undefined" ? `${window.location.origin}${route}` : `${cleanOrigin}${route}`;
  const canonicalUrl = `${cleanOrigin}${route}`;
  
  const embedCode = `<div style="max-width:100%; width:700px; margin:0 auto; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden;">
  <iframe src="${embedUrl}" width="100%" height="600" style="border:none;" title="${toolName} — PowerLab Free Energy Calculators"></iframe>
  <div style="padding:8px 16px; background:#f8fafc; font-size:12px; font-family:sans-serif; text-align:right; border-top:1px solid #e2e8f0;">
    <a href="${canonicalUrl}" target="_blank" rel="noopener" style="color:#0284c7; text-decoration:none; font-weight:600;">⚡ Powered by PowerLab Free Energy Calculators</a>
  </div>
</div>`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      prompt("Copy iframe embed code:", embedCode);
    }
  };

  return (
    <>
      <button
        type="button"
        className="button secondary-button embed-btn"
        onClick={() => setIsOpen(true)}
        title="Get HTML embed code for your website, blog, or proposal"
        aria-label={`Embed ${toolName} on your website`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.84rem",
          padding: "0.55rem 0.85rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span>Embed</span>
      </button>

      {isOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="embed-modal-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px", padding: "1.5rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 id="embed-modal-title" style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
                Embed {toolName}
              </h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close embed modal"
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-muted)" }}
              >
                &times;
              </button>
            </div>

            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
              Copy and paste this lightweight, responsive HTML iframe embed code into your website, blog, or contractor proposal:
            </p>

            <div style={{ position: "relative", marginBottom: "1.25rem" }}>
              <textarea
                readOnly
                value={embedCode}
                rows={6}
                style={{
                  width: "100%",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  background: "var(--bg-secondary, #f8fafc)",
                  color: "var(--text-color, #0f172a)",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCopy}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                {copied ? "Embed Code Copied!" : "Copy Embed HTML"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

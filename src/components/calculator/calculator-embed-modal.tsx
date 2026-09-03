"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface CalculatorEmbedModalProps {
  toolName: string;
  route: string;
  buttonLabel?: string;
}

export function CalculatorEmbedModal({
  toolName,
  route,
  buttonLabel = "🔗 Embed Tool",
}: CalculatorEmbedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState("680");

  const fullUrl = `${siteConfig.url.replace(/\/$/, "")}${route.startsWith("/") ? route : `/${route}`}`;

  const embedCode = `<iframe src="${fullUrl}" width="100%" height="${height}" frameborder="0" style="border:1px solid #e2e8f0;border-radius:12px;max-width:100%;" title="${toolName} - PowerLab Clean Energy Planning"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;font-family:sans-serif;">Interactive calculation model powered by <a href="${fullUrl}" target="_blank" rel="noopener" style="color:#0284c7;text-decoration:underline;">PowerLab ${toolName}</a></p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="button secondary-button"
        style={{
          fontSize: "0.82rem",
          padding: "0.35rem 0.75rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          cursor: "pointer",
        }}
        aria-label={`Get embed code for ${toolName}`}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="embed-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: "var(--background, #ffffff)",
              border: "1px solid var(--line, #e2e8f0)",
              borderRadius: "1rem",
              maxWidth: "600px",
              width: "100%",
              padding: "1.75rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              color: "var(--foreground, #0f172a)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <h3 id="embed-modal-title" style={{ margin: 0, fontSize: "1.25rem", color: "var(--brand-strong)" }}>
                  Embed {toolName}
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.88rem", color: "var(--muted)" }}>
                  Free, ad-free embed for educational courseware, research labs, or blogs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: "0.2rem",
                }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.35rem" }}>
                Iframe Height (px):
              </label>
              <select
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  fontSize: "0.88rem",
                }}
              >
                <option value="600">600px (Compact)</option>
                <option value="680">680px (Standard)</option>
                <option value="800">800px (Extended View)</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.35rem" }}>
                HTML Embed Code:
              </label>
              <textarea
                readOnly
                value={embedCode}
                rows={5}
                style={{
                  width: "100%",
                  fontFamily: "monospace",
                  fontSize: "0.82rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--line)",
                  background: "var(--surface-subtle, #f8fafc)",
                  color: "var(--ink)",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                Licensed under CC BY 4.0 with attribution link.
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="button"
                style={{ fontSize: "0.9rem", padding: "0.5rem 1.25rem" }}
              >
                {copied ? "✅ Copied to Clipboard!" : "📋 Copy Embed HTML"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

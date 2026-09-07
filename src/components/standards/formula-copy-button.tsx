"use client";

import { useState } from "react";

export function FormulaCopyButton({ formula }: { formula: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is blocked
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "4px",
        padding: "0.15rem 0.45rem",
        fontSize: "0.65rem",
        fontWeight: 600,
        color: "#cbd5e1",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        transition: "all 120ms ease",
      }}
      title="Copy LaTeX formula text"
    >
      <span>{copied ? "✓ Copied" : "📋 Copy"}</span>
    </button>
  );
}

"use client";

import { useState } from "react";

interface DirectAnswerCardProps {
  keyword: string;
  answer: string;
  formula?: string;
  standardExample?: string;
  sourceAuthority?: string;
}

export function DirectAnswerCard({
  keyword,
  answer,
  formula,
  standardExample,
  sourceAuthority = "Engineering Standards (NEC / IEC / NREL)",
}: DirectAnswerCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyFormula = () => {
    if (!formula) return;
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      className="direct-answer-card"
      aria-label={`Direct Answer & Key Takeaway: ${keyword}`}
      style={{
        margin: "1.25rem 0 2rem",
        padding: "1.1rem 1.3rem",
        background: "var(--surface, #ffffff)",
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        borderLeft: "4px solid var(--accent, #c65d24)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1rem" }}>💡</span>
        <strong
          style={{
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--accent, #c65d24)",
            fontWeight: 800,
          }}
        >
          Quick Answer &amp; Key Rule of Thumb
        </strong>
      </div>

      <p
        style={{
          fontSize: "0.90rem",
          lineHeight: 1.55,
          color: "var(--ink, #1e293b)",
          margin: "0 0 0.85rem",
        }}
      >
        {answer}
      </p>

      {/* Creative Code-Style Formula & Benchmark Container */}
      {(formula || standardExample) && (
        <div
          style={{
            borderRadius: "0.55rem",
            overflow: "hidden",
            border: "1px solid #334155",
            background: "#0f172a",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
            marginTop: "0.65rem",
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.4rem 0.75rem",
              background: "#1e293b",
              borderBottom: "1px solid #334155",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              <span
                style={{
                  marginLeft: "0.35rem",
                  fontSize: "0.65rem",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                formula-rule.ts
              </span>
            </div>

            {formula && (
              <button
                type="button"
                onClick={handleCopyFormula}
                aria-label="Copy formula"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.18rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.65rem",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontWeight: 600,
                  background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                  color: copied ? "#34d399" : "#cbd5e1",
                  border: copied ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.15)",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
              >
                {copied ? (
                  <>
                    <span>✓</span> Copied
                  </>
                ) : (
                  <>
                    <span>📋</span> Copy Formula
                  </>
                )}
              </button>
            )}
          </div>

          {/* Terminal Body */}
          <div style={{ padding: "0.75rem 0.9rem", display: "grid", gap: "0.4rem" }}>
            {formula && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: "0.80rem", fontWeight: 700 }}>$</span>
                <code
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    color: "#38bdf8",
                    fontSize: "0.82rem",
                    lineHeight: 1.45,
                    fontWeight: 600,
                    wordBreak: "break-word",
                  }}
                >
                  {formula}
                </code>
              </div>
            )}

            {standardExample && (
              <div style={{ borderTop: "1px dashed rgba(255, 255, 255, 0.1)", paddingTop: "0.35rem", fontSize: "0.76rem", display: "flex", gap: "0.4rem" }}>
                <span style={{ color: "#a78bfa", fontWeight: 600, flexShrink: 0 }}>Benchmark:</span>
                <span style={{ color: "#cbd5e1", lineHeight: 1.35 }}>{standardExample}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "0.6rem",
          fontSize: "0.70rem",
          color: "var(--muted, #94a3b8)",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.3rem",
        }}
      >
        <span>🏛️</span>
        <span>Governing Standard: {sourceAuthority}</span>
      </div>
    </aside>
  );
}

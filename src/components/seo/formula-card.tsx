"use client";

import { useState } from "react";

interface FormulaCardProps {
  title?: string;
  formula: string;
  formulaDescription?: string;
  variables: Array<{
    symbol: string;
    label: string;
    description: string;
    unit?: string;
  }>;
  notes?: string[];
}

export function FormulaCard({
  title = "Calculation Formula & Mathematical Methodology",
  formula,
  formulaDescription,
  variables,
  notes,
}: FormulaCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="formula-card" aria-labelledby="formula-heading">
      <h2 id="formula-heading">{title}</h2>
      {formulaDescription && <p className="formula-intro">{formulaDescription}</p>}

      {/* Code Editor / Terminal Styled Formula Box */}
      <div
        className="formula-terminal-box"
        style={{
          borderRadius: "0.75rem",
          overflow: "hidden",
          border: "1px solid #334155",
          background: "#0f172a",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          marginBottom: "1.75rem",
        }}
      >
        {/* Terminal Window Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 1rem",
            background: "#1e293b",
            borderBottom: "1px solid #334155",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span
              style={{
                marginLeft: "0.5rem",
                fontSize: "0.72rem",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: "#94a3b8",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              📐 calculation-model.ts
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy mathematical formula"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "0.375rem",
              fontSize: "0.72rem",
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
                <span>✓</span> Copied!
              </>
            ) : (
              <>
                <span>📋</span> Copy Formula
              </>
            )}
          </button>
        </div>

        {/* Terminal Code Body */}
        <div
          style={{
            padding: "1.1rem 1.25rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              userSelect: "none",
              color: "#475569",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              textAlign: "right",
            }}
          >
            <span>01</span>
          </div>

          <code
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#38bdf8",
              fontWeight: 600,
              wordBreak: "break-word",
              display: "block",
              flexGrow: 1,
            }}
          >
            {formula}
          </code>
        </div>
      </div>

      <div className="formula-glossary-section">
        <h3>Variable Definitions</h3>
        <dl className="formula-glossary">
          {variables.map((v) => (
            <div key={v.symbol} className="glossary-item">
              <dt>
                <code
                  style={{
                    background: "#0f172a",
                    color: "#38bdf8",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "0.35rem",
                    border: "1px solid #334155",
                    fontSize: "0.85rem",
                  }}
                >
                  {v.symbol}
                </code>
                <span>{v.label}</span>
                {v.unit && <small>({v.unit})</small>}
              </dt>
              <dd>{v.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {notes && notes.length > 0 && (
        <div className="formula-notes">
          <h4>Engineering Notes &amp; Standards</h4>
          <ul>
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

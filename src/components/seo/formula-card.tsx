"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

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
  latexFormula?: string;
  citationTitle?: string;
  bibtexKey?: string;
  doi?: string;
  standardAuthority?: string;
}

type DisplayTab = "code" | "latex" | "bibtex" | "apa";

export function FormulaCard({
  title = "Calculation Formula & Mathematical Methodology",
  formula,
  formulaDescription,
  variables,
  notes,
  latexFormula,
  citationTitle,
  bibtexKey,
  doi = "10.6084/m9.figshare.33321774",
  standardAuthority = "IEEE Std 485 / NFPA 70 NEC / NREL PVWatts / ASHRAE 90.1",
}: FormulaCardProps) {
  const [activeTab, setActiveTab] = useState<DisplayTab>("code");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // Generate fallback LaTeX from formula if not explicitly provided
  const generatedLatex =
    latexFormula ||
    `$$${formula
      .replace(/\s*=\s*/g, " = ")
      .replace(/\s*\/\s*/g, " \\over ")
      .replace(/\s*\*\s*/g, " \\cdot ")
      .replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}")}$$`;

  const cleanTitle = citationTitle || title.replace(/&amp;/g, "&");
  const safeSlug =
    bibtexKey ||
    cleanTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") ||
    "powerlab_model";

  const bibtexContent = `@article{powerlab_2026_${safeSlug},
  author    = {{PowerLab Engineering Group}},
  title     = {${cleanTitle}: Deterministic Engineering Methodology and Mathematical Model},
  journal   = {PowerLab Open Energy Modeling Reference},
  year      = {2026},
  url       = {${siteConfig.url}},
  doi       = {${doi}},
  note      = {Adheres to ${standardAuthority}}
}`;

  const apaContent = `PowerLab Engineering Group. (2026). ${cleanTitle}: Deterministic Engineering Methodology and Mathematical Model. PowerLab Open Energy Modeling Reference. ${siteConfig.url} https://doi.org/${doi}`;

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2200);
  };

  const getCopyContentForActiveTab = (): string => {
    switch (activeTab) {
      case "code":
        return formula;
      case "latex":
        return generatedLatex;
      case "bibtex":
        return bibtexContent;
      case "apa":
        return apaContent;
    }
  };

  return (
    <section className="formula-card" aria-labelledby="formula-heading">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <h2 id="formula-heading" style={{ margin: 0 }}>{title}</h2>
      </div>

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
        {/* Terminal Window Header Bar with Format Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 0.85rem",
            background: "#1e293b",
            borderBottom: "1px solid #334155",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {/* Format Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginRight: "0.4rem" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("code")}
              style={{
                background: activeTab === "code" ? "#0f172a" : "transparent",
                color: activeTab === "code" ? "#38bdf8" : "#94a3b8",
                border: activeTab === "code" ? "1px solid #38bdf8" : "1px solid transparent",
                borderRadius: "0.35rem",
                padding: "0.22rem 0.55rem",
                fontSize: "0.72rem",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📐 Code Model
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("latex")}
              style={{
                background: activeTab === "latex" ? "#0f172a" : "transparent",
                color: activeTab === "latex" ? "#38bdf8" : "#94a3b8",
                border: activeTab === "latex" ? "1px solid #38bdf8" : "1px solid transparent",
                borderRadius: "0.35rem",
                padding: "0.22rem 0.55rem",
                fontSize: "0.72rem",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              $\TeX$ LaTeX
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bibtex")}
              style={{
                background: activeTab === "bibtex" ? "#0f172a" : "transparent",
                color: activeTab === "bibtex" ? "#38bdf8" : "#94a3b8",
                border: activeTab === "bibtex" ? "1px solid #38bdf8" : "1px solid transparent",
                borderRadius: "0.35rem",
                padding: "0.22rem 0.55rem",
                fontSize: "0.72rem",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📚 BibTeX
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("apa")}
              style={{
                background: activeTab === "apa" ? "#0f172a" : "transparent",
                color: activeTab === "apa" ? "#38bdf8" : "#94a3b8",
                border: activeTab === "apa" ? "1px solid #38bdf8" : "1px solid transparent",
                borderRadius: "0.35rem",
                padding: "0.22rem 0.55rem",
                fontSize: "0.72rem",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🎓 APA / IEEE
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={() => handleCopy(getCopyContentForActiveTab(), activeTab)}
            aria-label={`Copy current formula in ${activeTab} format`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "0.375rem",
              fontSize: "0.72rem",
              fontFamily: "ui-monospace, monospace",
              fontWeight: 600,
              background: copiedTab ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
              color: copiedTab ? "#34d399" : "#cbd5e1",
              border: copiedTab ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.15)",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {copiedTab ? (
              <>
                <span>✓</span> Copied {activeTab.toUpperCase()}!
              </>
            ) : (
              <>
                <span>📋</span> Copy {activeTab === "code" ? "Formula" : activeTab.toUpperCase()}
              </>
            )}
          </button>
        </div>

        {/* Terminal Display Body */}
        <div
          style={{
            padding: "0.85rem 1.1rem",
            overflowX: "auto",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "0.86rem",
            lineHeight: 1.55,
          }}
        >
          {activeTab === "code" && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
              <span style={{ userSelect: "none", color: "#475569", fontSize: "0.78rem", textAlign: "right" }}>01</span>
              <code style={{ color: "#38bdf8", fontWeight: 600, wordBreak: "break-word", flexGrow: 1 }}>
                {formula}
              </code>
            </div>
          )}

          {activeTab === "latex" && (
            <pre style={{ margin: 0, color: "#a5f3fc", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {generatedLatex}
            </pre>
          )}

          {activeTab === "bibtex" && (
            <pre style={{ margin: 0, color: "#cbd5e1", whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: "0.80rem" }}>
              {bibtexContent}
            </pre>
          )}

          {activeTab === "apa" && (
            <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.84rem", lineHeight: 1.6 }}>
              {apaContent}
            </p>
          )}
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

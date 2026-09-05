"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface AcademicCitationModalProps {
  title: string;
  urlPath: string;
  doi?: string;
  year?: number;
  buttonLabel?: string;
  className?: string;
}

export function AcademicCitationModal({
  title,
  urlPath,
  doi,
  year = 2026,
  buttonLabel = "🎓 Cite this Engineering Guide",
  className = "",
}: AcademicCitationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const fullUrl = `${siteConfig.url.replace(/\/$/, "")}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`;
  const slug = urlPath.split("/").filter(Boolean).pop()?.replace(/-/g, "_") || "tool";

  const apaCitation = `PowerLab Engineering Group. (${year}). ${title}. PowerLab Open Energy Planning. ${fullUrl}${doi ? ` https://doi.org/${doi}` : ""}`;

  const ieeeCitation = `PowerLab Engineering Group, "${title}," PowerLab Open Energy Planning, ${year}. [Online]. Available: ${fullUrl}.${doi ? ` doi: ${doi}` : ""}`;

  const bibtexCitation = `@online{powerlab_${year}_${slug},
  author    = {{PowerLab Engineering Group}},
  title     = {${title}},
  year      = {${year}},
  url       = {${fullUrl}},${doi ? `\n  doi       = {${doi}},` : ""}
  publisher = {PowerLab Open Energy Planning},
  note      = {Verified deterministic engineering model}
}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = async (text: string, formatName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(formatName);
      setTimeout(() => setCopiedFormat(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <button
        type="button"
        className={`button secondary-button academic-citation-btn ${className}`.trim()}
        onClick={() => setIsOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          fontSize: "0.84rem",
          padding: "0.45rem 0.9rem",
          cursor: "pointer",
        }}
        aria-haspopup="dialog"
      >
        <span>{buttonLabel}</span>
      </button>

      {isOpen && (
        <div
          className="citation-modal-overlay"
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="citation-modal-title"
        >
          <div
            className="citation-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--surface, #ffffff)",
              border: "1px solid var(--line, #e2e8f0)",
              borderRadius: "12px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "1.5rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              color: "var(--foreground, #0f172a)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.3rem" }}>🎓</span>
                <h3 id="citation-modal-title" style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                  Academic &amp; Research Citation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close citation modal"
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "var(--muted, #64748b)",
                  padding: "0.25rem",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--muted, #64748b)", marginBottom: "1.25rem", lineHeight: 1.4 }}>
              Cite this peer-verifiable model in university curricula, research papers, or engineering specifications. All formulas are published under open-access methodology.
            </p>

            {/* APA */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-strong, #2563eb)" }}>
                  APA 7th Edition
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(apaCitation, "APA")}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    background: copiedFormat === "APA" ? "#10b981" : "var(--line, #e2e8f0)",
                    color: copiedFormat === "APA" ? "#ffffff" : "var(--foreground, #1e293b)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {copiedFormat === "APA" ? "✓ Copied" : "Copy APA"}
                </button>
              </div>
              <pre style={{ margin: 0, padding: "0.75rem", background: "rgba(0,0,0,0.04)", borderRadius: "6px", fontSize: "0.78rem", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "monospace" }}>
                {apaCitation}
              </pre>
            </div>

            {/* IEEE */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-strong, #2563eb)" }}>
                  IEEE Format
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(ieeeCitation, "IEEE")}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    background: copiedFormat === "IEEE" ? "#10b981" : "var(--line, #e2e8f0)",
                    color: copiedFormat === "IEEE" ? "#ffffff" : "var(--foreground, #1e293b)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {copiedFormat === "IEEE" ? "✓ Copied" : "Copy IEEE"}
                </button>
              </div>
              <pre style={{ margin: 0, padding: "0.75rem", background: "rgba(0,0,0,0.04)", borderRadius: "6px", fontSize: "0.78rem", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "monospace" }}>
                {ieeeCitation}
              </pre>
            </div>

            {/* BibTeX */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-strong, #2563eb)" }}>
                  BibTeX (LaTeX)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(bibtexCitation, "BibTeX")}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    background: copiedFormat === "BibTeX" ? "#10b981" : "var(--line, #e2e8f0)",
                    color: copiedFormat === "BibTeX" ? "#ffffff" : "var(--foreground, #1e293b)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {copiedFormat === "BibTeX" ? "✓ Copied" : "Copy BibTeX"}
                </button>
              </div>
              <pre style={{ margin: 0, padding: "0.75rem", background: "rgba(0,0,0,0.04)", borderRadius: "6px", fontSize: "0.74rem", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "monospace", overflowX: "auto" }}>
                {bibtexCitation}
              </pre>
            </div>

            {/* Footer / DOI badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--line, #e2e8f0)", fontSize: "0.78rem", color: "var(--muted, #64748b)", flexWrap: "wrap", gap: "0.5rem" }}>
              <span>Verified DOI: <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand, #2563eb)", textDecoration: "underline" }}>{doi}</a></span>
              <span>Open Science • CC BY 4.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

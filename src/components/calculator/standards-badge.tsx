"use client";

import Link from "next/link";
import { CALCULATOR_STANDARDS_MAP } from "@/data/standards-registry";

interface StandardsBadgeProps {
  standards?: string[];
  calculatorId?: string;
  className?: string;
}

/**
 * Standard-to-anchor mapping for instant deep linking to /standards
 */
function getStandardAnchor(code: string): string {
  const lower = code.toLowerCase();
  if (lower.includes("pvwatts") || lower.includes("nrel")) return "nrel-pvwatts";
  if (lower.includes("690")) return "nec-690";
  if (lower.includes("485") || lower.includes("peukert")) return "ieee-485";
  if (lower.includes("625") || lower.includes("110.14")) return "nec-625";
  if (lower.includes("210.19") || lower.includes("table 8")) return "nec-210-19";
  if (lower.includes("mg-1") || lower.includes("8528") || lower.includes("nema")) return "nema-mg1";
  if (lower.includes("ahri") || lower.includes("seer2") || lower.includes("90.1")) return "ahri-210-240";
  return "";
}

/**
 * Renders a verified engineering standard compliance pill on calculator results
 * (e.g. IEEE 485, NEC 2023, NREL PVWatts V8) to visibly prove mathematical rigor over competitors.
 */
export function StandardsBadge({ standards, calculatorId, className = "" }: StandardsBadgeProps) {
  let resolvedList: string[] = [];

  if (standards && standards.length > 0) {
    resolvedList = standards;
  } else if (calculatorId && CALCULATOR_STANDARDS_MAP[calculatorId]) {
    resolvedList = CALCULATOR_STANDARDS_MAP[calculatorId].map((s) => s.code);
  }

  if (resolvedList.length === 0) return null;

  return (
    <div
      className={`standards-badge ${className}`.trim()}
      role="note"
      aria-label="Verified engineering standards compliance"
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.35rem 0.5rem",
        padding: "0.3rem 0.65rem",
        borderRadius: "6px",
        background: "rgba(37, 99, 235, 0.06)",
        border: "1px solid rgba(37, 99, 235, 0.18)",
        fontSize: "0.75rem",
        color: "#1d4ed8",
        fontWeight: 500,
        margin: "0.5rem 0 0.8rem 0",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 1.3,
      }}
    >
      <Link
        href="/standards"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
        title="View PowerLab Standards & Code Compliance Matrix"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>Verified Standards:</span>
      </Link>

      {resolvedList.map((standard, index) => {
        const anchor = getStandardAnchor(standard);
        const targetUrl = anchor ? `/standards#${anchor}` : "/standards";

        return (
          <span key={standard} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <Link
              href={targetUrl}
              style={{
                fontWeight: 600,
                color: "var(--foreground, #1e293b)",
                textDecoration: "none",
              }}
              title={`Inspect governing clause for ${standard}`}
            >
              {standard}
            </Link>
            {index < resolvedList.length - 1 && (
              <span style={{ opacity: 0.4, color: "var(--muted, #64748b)" }}>•</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export { StandardsBadge as VerifiedStandardsBanner };

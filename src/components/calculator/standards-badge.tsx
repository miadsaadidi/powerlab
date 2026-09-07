"use client";

import React from "react";
import Link from "next/link";
import { CALCULATOR_STANDARDS_MAP } from "@/data/standards-registry";

interface StandardsBadgeProps {
  standards?: string[];
  calculatorId?: string;
  className?: string;
  label?: string;
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
 * Renders governing engineering standards compliance badges matching HVACLab's design system.
 */
export function StandardsBadge({
  standards,
  calculatorId,
  className = "",
  label = "Governing Standards & Technical References:",
}: StandardsBadgeProps) {
  let resolvedList: string[] = [];

  if (standards && standards.length > 0) {
    resolvedList = standards;
  } else if (calculatorId && CALCULATOR_STANDARDS_MAP[calculatorId]) {
    resolvedList = CALCULATOR_STANDARDS_MAP[calculatorId].map((s) => s.code);
  }

  if (resolvedList.length === 0) return null;

  return (
    <div
      className={`standards-compliance-container ${className}`.trim()}
      role="region"
      aria-label="Governing Energy Planning Standards"
      style={{
        marginTop: "0.65rem",
        marginBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "var(--text-muted, #64748b)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "0.75rem" }}>⚡</span>
        <span>{label}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        {resolvedList.map((standard) => {
          const anchor = getStandardAnchor(standard);
          const targetUrl = anchor ? `/standards#${anchor}` : "/standards";

          return (
            <Link
              key={standard}
              href={targetUrl}
              title={`View governing engineering documentation for ${standard} on PowerLab`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.18rem 0.55rem",
                borderRadius: "4px",
                fontSize: "0.68rem",
                fontWeight: 600,
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "var(--brand-strong, #047857)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
            >
              <span style={{ fontSize: "0.65rem" }}>🛡️</span>
              <span>{standard}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export { StandardsBadge as VerifiedStandardsBanner };

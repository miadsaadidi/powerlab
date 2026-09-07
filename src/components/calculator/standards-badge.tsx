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
      className={`standards-badge-group ${className}`.trim()}
      role="group"
      aria-label="Governing engineering standards"
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.35rem",
        margin: "0.4rem 0 0.6rem 0",
        maxWidth: "100%",
      }}
    >
      {resolvedList.map((standard) => {
        const anchor = getStandardAnchor(standard);
        const targetUrl = anchor ? `/standards#${anchor}` : "/standards";

        return (
          <Link
            key={standard}
            href={targetUrl}
            className="standard-green-badge"
            title={`Inspect governing engineering standard: ${standard}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: "#10b981", flexShrink: 0 }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{standard}</span>
          </Link>
        );
      })}
    </div>
  );
}

export { StandardsBadge as VerifiedStandardsBanner };

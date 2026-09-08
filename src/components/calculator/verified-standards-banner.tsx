"use client";

import Link from "next/link";
import { CALCULATOR_STANDARDS_MAP, StandardRef } from "@/data/standards-registry";

export interface VerifiedStandardsBannerProps {
  /**
   * Calculator ID matching the registry (e.g. "battery-runtime", "voltage-drop", "solar-charge-controller")
   */
  calculatorId?: string;
  /**
   * Explicit custom standards list (overrides or complements registry lookup)
   */
  standards?: (string | StandardRef)[];
  /**
   * Optional custom title (defaults to "Verified Engineering Standards")
   */
  title?: string;
  /**
   * Compact inline mode for small spaces
   */
  compact?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
}

export function VerifiedStandardsBanner({
  calculatorId,
  standards,
  title = "Verified Engineering Standards",
  compact = false,
  className = "",
}: VerifiedStandardsBannerProps) {
  // Resolve standard items from props or registry lookup
  const resolvedStandards: StandardRef[] = [];

  if (calculatorId && CALCULATOR_STANDARDS_MAP[calculatorId]) {
    resolvedStandards.push(...CALCULATOR_STANDARDS_MAP[calculatorId]);
  }

  if (standards && standards.length > 0) {
    standards.forEach((s) => {
      if (typeof s === "string") {
        resolvedStandards.push({
          code: s,
          authority: "IEEE",
          title: s,
          clauseId: s.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        });
      } else {
        resolvedStandards.push(s);
      }
    });
  }

  // Deduplicate by code
  const uniqueStandards = Array.from(
    new Map(resolvedStandards.map((item) => [item.code, item])).values()
  );

  if (uniqueStandards.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Verified Engineering Standards & Regulatory Compliance"
      className={`verified-standards-box ${compact ? "compact" : ""} ${className}`.trim()}
      style={{
        width: "100%",
        marginTop: "1.15rem",
        marginBottom: "0.85rem",
        padding: compact ? "0.65rem 0.85rem" : "0.95rem 1.15rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--border-color, #cbd5e1)",
        background: "linear-gradient(145deg, var(--surface, #ffffff) 0%, rgba(55, 94, 75, 0.04) 100%)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "0.65rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.05rem" }} aria-hidden="true">
            🛡️
          </span>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--brand-strong, #1e293b)",
            }}
          >
            {title}
          </span>
        </div>

        <Link
          href="/standards"
          style={{
            fontSize: "0.74rem",
            fontWeight: 600,
            color: "var(--accent, #c65d24)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.2rem",
          }}
          title="View full Regulatory Codes & Physics Specification Matrix"
        >
          <span>Compliance Matrix</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Standards Pills Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.45rem",
          alignItems: "center",
        }}
      >
        {uniqueStandards.map((std) => {
          const targetHash = std.clauseId ? `#${std.clauseId}` : "";
          const targetUrl = `/standards${targetHash}`;

          return (
            <Link
              key={std.code}
              href={targetUrl}
              className="standard-pill-tag"
              title={`${std.code}: ${std.title} (Click to inspect governing clauses)`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "0.45rem",
                border: "1px solid var(--border-color, #e2e8f0)",
                background: "var(--card-bg, #ffffff)",
                fontSize: "0.76rem",
                fontWeight: 600,
                color: "var(--ink, #0f172a)",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                transition: "all 140ms ease",
              }}
            >
              <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.8rem" }}>
                ✓
              </span>
              <strong style={{ fontFamily: "var(--font-mono, monospace)", fontWeight: 700 }}>
                {std.code}
              </strong>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

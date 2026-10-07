import React from "react";
import Link from "next/link";

export type DisclaimerVariant = "standard" | "calculator" | "compact" | "safety";

export interface DisclaimerProps {
  /**
   * Visual and semantic variant.
   * - "calculator": Tailored for calculation engines, preliminary screening, input sensitivity, and AHJ/PE review.
   * - "standard": General substantive technical content (guides, research, datasets, methodology).
   * - "compact": Brief inline notice with link to /disclaimer/.
   * - "safety": Emphasizes electrical hazards, arc flash, continuous thermal limits, and qualified personnel.
   */
  variant?: DisclaimerVariant;
  /**
   * Optional custom title overriding the variant default.
   */
  title?: string;
  /**
   * Optional model basis or standards citation note.
   */
  modelBasis?: string;
  /**
   * Optional custom children to augment the notice.
   */
  children?: React.ReactNode;
  /**
   * Optional additional CSS class name.
   */
  className?: string;
  /**
   * Optional inline styles.
   */
  style?: React.CSSProperties;
}

const VARIANT_CONFIG: Record<
  DisclaimerVariant,
  {
    icon: string;
    defaultTitle: string;
    borderColor: string;
    bgColor: string;
    accentColor: string;
    defaultBody: string;
  }
> = {
  calculator: {
    icon: "⚖️",
    defaultTitle: "Technical & Engineering Calculation Notice",
    borderColor: "var(--border-color, #cbd5e1)",
    bgColor: "var(--surface-subtle, #f8fafc)",
    accentColor: "var(--brand-strong, #1e293b)",
    defaultBody:
      "Calculations provide preliminary screening and educational estimates based on the stated mathematical models and user inputs. Results do not constitute professional engineering designs, certified stamped drawings, or installation specifications. Physical installations must comply with jurisdictionally adopted codes (including applicable local amendments), manufacturer documentation, equipment ratings, and may require review or permitting by a licensed professional or qualified contractor.",
  },
  standard: {
    icon: "ℹ️",
    defaultTitle: "Technical Reference & Educational Notice",
    borderColor: "var(--border-color, #cbd5e1)",
    bgColor: "var(--surface-subtle, #f8fafc)",
    accentColor: "var(--brand-strong, #1e293b)",
    defaultBody:
      "This technical documentation, research preprint, benchmark dataset, or engineering reference is provided for informational, screening, and educational purposes. Model codes become legally enforceable only when adopted or incorporated by the applicable jurisdiction, including local amendments. Equipment-specific requirements must follow manufacturer manuals, approved ratings, and installation listings.",
  },
  compact: {
    icon: "⚡",
    defaultTitle: "Engineering Screening Notice",
    borderColor: "var(--border-color, #e2e8f0)",
    bgColor: "var(--surface-subtle, #f8fafc)",
    accentColor: "var(--text-muted, #64748b)",
    defaultBody:
      "Educational calculations based on stated models and inputs. Verify with manufacturer specifications, jurisdictionally adopted codes, and applicable professional or project requirements prior to construction.",
  },
  safety: {
    icon: "⚠️",
    defaultTitle: "Electrical Safety & Code Notice",
    borderColor: "rgba(217, 119, 6, 0.4)",
    bgColor: "rgba(217, 119, 6, 0.05)",
    accentColor: "#b45309",
    defaultBody:
      "Electrical systems involve serious shock, arc flash, and fire hazards. High-voltage DC solar arrays, continuous EVSE charging branch circuits, energy storage batteries, and generator interconnection must strictly comply with applicable local electrical codes, AHJ requirements, and manufacturer listings, and be installed solely by qualified licensed personnel.",
  },
};

export function Disclaimer({
  variant = "standard",
  title,
  modelBasis,
  children,
  className = "",
  style,
}: DisclaimerProps) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.standard;
  const resolvedTitle = title || config.defaultTitle;

  if (variant === "compact") {
    return (
      <aside
        role="note"
        aria-label={resolvedTitle}
        className={`technical-disclaimer technical-disclaimer-compact ${className}`.trim()}
        style={{
          margin: "1.25rem 0",
          padding: "0.65rem 0.95rem",
          borderRadius: "0.5rem",
          border: `1px solid ${config.borderColor}`,
          background: config.bgColor,
          fontSize: "0.8rem",
          lineHeight: 1.5,
          color: "var(--text-muted, #475569)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          ...style,
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "0.95rem", flexShrink: 0, marginTop: "1px" }}>
          {config.icon}
        </span>
        <div style={{ flex: 1 }}>
          <span>{children || config.defaultBody} </span>
          <Link
            href="/disclaimer"
            style={{
              color: "var(--accent, #c65d24)",
              fontWeight: 600,
              textDecoration: "underline",
              whiteSpace: "nowrap",
            }}
          >
            Technical Disclaimer →
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      role="note"
      aria-label={resolvedTitle}
      className={`technical-disclaimer technical-disclaimer-${variant} ${className}`.trim()}
      style={{
        margin: "2rem 0 2.5rem",
        padding: "1.15rem 1.35rem",
        borderRadius: "0.75rem",
        border: `1px solid ${config.borderColor}`,
        background: config.bgColor,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.65rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>
            {config.icon}
          </span>
          <h3
            style={{
              margin: 0,
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: config.accentColor,
            }}
          >
            {resolvedTitle}
          </h3>
        </div>

        <Link
          href="/disclaimer"
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--accent, #c65d24)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          title="Review full PowerLab Technical & Governance Disclaimer"
        >
          <span>Full Disclaimer</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <p
        style={{
          margin: "0 0 0.5rem",
          fontSize: "0.84rem",
          lineHeight: 1.6,
          color: "var(--ink, #1e293b)",
        }}
      >
        {children || config.defaultBody}
      </p>

      {modelBasis && (
        <p
          style={{
            margin: "0.5rem 0 0",
            paddingTop: "0.5rem",
            borderTop: "1px dashed var(--line, #e2e8f0)",
            fontSize: "0.78rem",
            color: "var(--text-muted, #64748b)",
            lineHeight: 1.5,
          }}
        >
          <strong>Model Basis &amp; References:</strong> {modelBasis}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem 1rem",
          marginTop: "0.65rem",
          fontSize: "0.76rem",
          color: "var(--text-muted, #64748b)",
        }}
      >
        <span>
          • Sourced from documented physics models &amp; referenced standards
        </span>
        <span>• Field verification by a licensed Professional Engineer required</span>
        <span>
          • Governed by PowerLab <Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>Terms of Use</Link>
        </span>
      </div>
    </aside>
  );
}

export default Disclaimer;

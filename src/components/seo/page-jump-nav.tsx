import Link from "next/link";

interface PageJumpNavProps {
  hasMatrix?: boolean;
  hasHowTo?: boolean;
  hasFormula?: boolean;
  hasFaqs?: boolean;
  hasRelated?: boolean;
}

export function PageJumpNav({
  hasMatrix = true,
  hasHowTo = true,
  hasFormula = true,
  hasFaqs = true,
  hasRelated = true,
}: PageJumpNavProps) {
  return (
    <nav
      className="page-jump-nav"
      aria-label="Quick jump to page section"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.35rem 0.45rem",
        margin: "0.5rem 0 1.25rem",
        padding: "0.38rem 0.65rem",
        background: "var(--surface, #ffffff)",
        borderRadius: "0.55rem",
        border: "1px solid var(--line, #e2e8f0)",
        fontSize: "0.75rem",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          color: "var(--muted, #64748b)",
          fontSize: "0.70rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginRight: "0.15rem",
        }}
      >
        Jump to:
      </span>

      <a
        href="#calculator-tool"
        className="jump-pill"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.18rem 0.5rem",
          borderRadius: "9999px",
          background: "var(--soft, #f8fafc)",
          border: "1px solid var(--line, #e2e8f0)",
          color: "var(--ink, #1e293b)",
          textDecoration: "none",
          fontSize: "0.74rem",
          fontWeight: 600,
          transition: "all 140ms ease",
        }}
      >
        <span style={{ fontSize: "0.75rem" }}>🧮</span> Calculator
      </a>

      {hasHowTo && (
        <a
          href="#how-to-guide"
          className="jump-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.18rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--soft, #f8fafc)",
            border: "1px solid var(--line, #e2e8f0)",
            color: "var(--ink, #1e293b)",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
            transition: "all 140ms ease",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>📋</span> How-To Guide
        </a>
      )}

      {hasMatrix && (
        <a
          href="#sizing-matrix"
          className="jump-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.18rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--soft, #f8fafc)",
            border: "1px solid var(--line, #e2e8f0)",
            color: "var(--ink, #1e293b)",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
            transition: "all 140ms ease",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>📊</span> Sizing Matrix
        </a>
      )}

      {hasFormula && (
        <a
          href="#formula-math"
          className="jump-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.18rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--soft, #f8fafc)",
            border: "1px solid var(--line, #e2e8f0)",
            color: "var(--ink, #1e293b)",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
            transition: "all 140ms ease",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>📐</span> Formulas
        </a>
      )}

      {hasFaqs && (
        <a
          href="#faq-section"
          className="jump-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.18rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--soft, #f8fafc)",
            border: "1px solid var(--line, #e2e8f0)",
            color: "var(--ink, #1e293b)",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
            transition: "all 140ms ease",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>❓</span> FAQs
        </a>
      )}

      {hasRelated && (
        <a
          href="#related-tools"
          className="jump-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.18rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--soft, #f8fafc)",
            border: "1px solid var(--line, #e2e8f0)",
            color: "var(--ink, #1e293b)",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
            transition: "all 140ms ease",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>🔗</span> Related Tools
        </a>
      )}
    </nav>
  );
}

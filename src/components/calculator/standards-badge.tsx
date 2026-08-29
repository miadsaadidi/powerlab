"use client";

interface StandardsBadgeProps {
  standards: string[];
  className?: string;
}

/**
 * Renders a verified engineering standard compliance pill on calculator results
 * (e.g. IEEE 485, NEC 2023, NREL PVWatts V8) to visibly prove mathematical rigor over competitors.
 */
export function StandardsBadge({ standards, className = "" }: StandardsBadgeProps) {
  if (!standards || standards.length === 0) return null;

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
        padding: "0.25rem 0.6rem",
        borderRadius: "6px",
        background: "rgba(37, 99, 235, 0.07)",
        border: "1px solid rgba(37, 99, 235, 0.2)",
        fontSize: "0.75rem",
        color: "#1d4ed8",
        fontWeight: 500,
        margin: "0.5rem 0 0.8rem 0",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 1.3,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontWeight: 700 }}>
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
        <span>Model Standard:</span>
      </span>
      {standards.map((standard, index) => (
        <span key={standard} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ fontWeight: 600, color: "var(--foreground, #1e293b)" }}>{standard}</span>
          {index < standards.length - 1 && <span style={{ opacity: 0.4, color: "var(--muted, #64748b)" }}>•</span>}
        </span>
      ))}
    </div>
  );
}

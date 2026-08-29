"use client";

interface CalculatorTrustPillProps {
  className?: string;
}

/**
 * Reusable high-trust badge placed at the top of calculator cards
 * to immediately eliminate user fear of lead-capture/sales spam (vs EnergySage & SolarReviews).
 */
export function CalculatorTrustPill({ className = "" }: CalculatorTrustPillProps) {
  return (
    <div
      className={`calculator-trust-pill ${className}`.trim()}
      role="note"
      aria-label="Privacy guarantee"
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.45rem 0.65rem",
        padding: "0.35rem 0.75rem",
        borderRadius: "9999px",
        background: "rgba(55, 94, 75, 0.06)",
        border: "1px solid rgba(55, 94, 75, 0.15)",
        fontSize: "0.78rem",
        fontWeight: 600,
        color: "var(--brand-strong, #264435)",
        marginBottom: "1rem",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 1.3,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>100% Private &amp; Ad-Free</span>
      </span>
      <span style={{ color: "var(--muted, #68736b)", opacity: 0.6 }}>•</span>
      <span>No Sign-Up or Email Required</span>
      <span style={{ color: "var(--muted, #68736b)", opacity: 0.6 }}>•</span>
      <span>Instant Browser-Local Computation</span>
    </div>
  );
}

interface DirectAnswerCardProps {
  keyword: string;
  answer: string;
  formula?: string;
  standardExample?: string;
  sourceAuthority?: string;
}

export function DirectAnswerCard({
  keyword,
  answer,
  formula,
  standardExample,
  sourceAuthority = "Engineering Standards (NEC / IEC / NREL)",
}: DirectAnswerCardProps) {
  return (
    <aside
      className="direct-answer-card"
      aria-label={`Direct Answer & Key Takeaway: ${keyword}`}
      style={{
        margin: "1.25rem 0 2rem",
        padding: "1.2rem 1.4rem",
        background: "var(--surface, #ffffff)",
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        borderLeft: "4px solid var(--accent, #c65d24)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1.1rem" }}>💡</span>
        <strong
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--accent, #c65d24)",
            fontWeight: 800,
          }}
        >
          Quick Answer &amp; Key Rule of Thumb
        </strong>
      </div>

      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.55,
          color: "var(--ink, #1e293b)",
          margin: "0 0 0.75rem",
        }}
      >
        {answer}
      </p>

      {(formula || standardExample) && (
        <div
          style={{
            display: "grid",
            gap: "0.45rem",
            padding: "0.75rem 1rem",
            background: "var(--soft, #f8fafc)",
            borderRadius: "0.5rem",
            border: "1px solid var(--line, #e2e8f0)",
            fontSize: "0.82rem",
          }}
        >
          {formula && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem" }}>
              <span style={{ fontWeight: 700, color: "var(--brand-strong, #264435)" }}>Formula:</span>
              <code style={{ fontFamily: "monospace", color: "var(--ink, #1e293b)", background: "rgba(0,0,0,0.04)", padding: "1px 6px", borderRadius: "4px" }}>
                {formula}
              </code>
            </div>
          )}
          {standardExample && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem" }}>
              <span style={{ fontWeight: 700, color: "var(--brand-strong, #264435)" }}>Benchmark Rule:</span>
              <span style={{ color: "var(--muted, #64748b)" }}>{standardExample}</span>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          marginTop: "0.6rem",
          fontSize: "0.72rem",
          color: "var(--muted, #94a3b8)",
          textAlign: "right",
        }}
      >
        Verified against {sourceAuthority}
      </div>
    </aside>
  );
}

import { MathDisplay } from "@/components/common/math-display";

interface DirectAnswerCardProps {
  keyword: string;
  answer: string;
  formula?: string;
  formulaNode?: React.ReactNode;
  condition?: React.ReactNode;
  standardExample?: string;
  sourceAuthority?: string;
}

export function DirectAnswerCard({
  keyword,
  answer,
  formula,
  formulaNode,
  condition,
  standardExample,
  sourceAuthority = "Engineering Standards (NEC / IEC / NREL)",
}: DirectAnswerCardProps) {
  return (
    <aside
      className="direct-answer-card"
      aria-label={`Direct Answer & Key Takeaway: ${keyword}`}
      style={{
        margin: "1.25rem 0 2rem",
        padding: "1.1rem 1.3rem",
        background: "var(--surface, #ffffff)",
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        borderLeft: "4px solid var(--accent, #c65d24)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1rem" }}>💡</span>
        <strong
          style={{
            fontSize: "0.78rem",
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
          fontSize: "0.90rem",
          lineHeight: 1.55,
          color: "var(--ink, #1e293b)",
          margin: "0 0 0.85rem",
        }}
      >
        {answer}
      </p>

      {/* Modern Mathematical Formula Card */}
      {(formula || formulaNode || standardExample) && (
        <MathDisplay
          copyText={formula}
          title="Calculation Formula &amp; Sizing Principle"
          condition={condition}
          benchmark={standardExample}
        >
          {formulaNode || formula}
        </MathDisplay>
      )}

      <div
        style={{
          marginTop: "0.6rem",
          fontSize: "0.70rem",
          color: "var(--muted, #94a3b8)",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.3rem",
        }}
      >
        <span>🏛️</span>
        <span>Technical References &amp; Model Basis: {sourceAuthority}</span>
      </div>
    </aside>
  );
}

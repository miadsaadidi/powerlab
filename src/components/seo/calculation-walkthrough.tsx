"use client";

export interface WalkthroughStep {
  stepNumber: number;
  title: string;
  description: string;
  formula?: string;
  exampleValue?: string;
  codeReference?: string;
}

export interface CalculationWalkthroughProps {
  calculatorName: string;
  overview?: string;
  steps: WalkthroughStep[];
  standardCitation?: string;
}

export function CalculationWalkthrough({
  calculatorName,
  overview,
  steps,
  standardCitation = "IEEE / NEC / NREL / ASHRAE Deterministic Standards",
}: CalculationWalkthroughProps) {
  return (
    <section
      className="calculation-walkthrough-card"
      aria-label={`Step-by-Step Engineering Calculation Walkthrough: ${calculatorName}`}
      style={{
        margin: "2rem 0",
        padding: "1.25rem 1.4rem",
        background: "var(--surface-card, #ffffff)",
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      <header style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "rgba(198, 93, 36, 0.12)",
              color: "var(--accent, #c65d24)",
              padding: "0.2rem 0.5rem",
              borderRadius: "0.25rem",
            }}
          >
            Engineering Walkthrough
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>
            Governed by {standardCitation}
          </span>
        </div>
        <h3
          style={{
            margin: "0.25rem 0",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-main, #0f172a)",
          }}
        >
          How to Calculate {calculatorName} (Step-by-Step)
        </h3>
        {overview && (
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.88rem", color: "var(--text-muted, #64748b)", lineHeight: 1.5 }}>
            {overview}
          </p>
        )}
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              background: "var(--surface, #f8fafc)",
              borderRadius: "0.5rem",
              border: "1px solid var(--line-subtle, #f1f5f9)",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "var(--accent, #c65d24)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {step.stepNumber}
            </div>
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  margin: "0 0 0.25rem",
                  fontSize: "0.98rem",
                  fontWeight: 700,
                  color: "var(--text-main, #0f172a)",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "0.85rem",
                  color: "var(--text-muted, #475569)",
                  lineHeight: 1.5,
                }}
              >
                {step.description}
              </p>

              {step.formula && (
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.82rem",
                    padding: "0.3rem 0.6rem",
                    background: "var(--surface-code, #0f172a)",
                    color: "#38bdf8",
                    borderRadius: "0.35rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {step.formula}
                </div>
              )}

              {step.exampleValue && (
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-muted, #64748b)",
                    fontStyle: "italic",
                  }}
                >
                  💡 <strong>Standard Example:</strong> {step.exampleValue}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

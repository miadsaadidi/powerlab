interface TrustItem {
  icon: string;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: "📐",
    title: "Physics-Based Calculation Models",
    subtitle: "Formulas produce reproducible outputs based on the stated physical models, published equations, and user inputs.",
  },
  {
    icon: "🔒",
    title: "Local Browser Processing",
    subtitle: "Calculator engines execute locally in your browser with zero account requirements and no server-side scenario database.",
  },
  {
    icon: "☀️",
    title: "Documented Technical References",
    subtitle: "Models cite applicable references including NREL solar resource data, SAE charging protocols, and ASHRAE design conditions.",
  },
  {
    icon: "📜",
    title: "Applicable Code Context",
    subtitle: "Relevant circuit-sizing calculations reference applicable National Electrical Code (NEC) provisions and IEEE guidance.",
  },
];

export function TrustBadges() {
  return (
    <section className="trust-badges-section" style={{ marginTop: "3rem", marginBottom: "3.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Transparent Engineering &amp; Open Models</p>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Why PowerLab Is Designed for Transparency
        </h2>
      </div>

      <div
        className="trust-badge-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.title}
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>{item.title}</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


interface TrustItem {
  icon: string;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: "🔒",
    title: "100% Client-Side Privacy",
    subtitle: "Zero tracking cookies, zero accounts, and zero database logging. Your calculation data stays in your browser.",
  },
  {
    icon: "📐",
    title: "Deterministic Pure Engines",
    subtitle: "All formulas run client-side with transparent electrical losses, temperature derating, and editable reserves.",
  },
  {
    icon: "☀️",
    title: "NREL PVWatts V8 Verified",
    subtitle: "Solar calculations use authentic laboratory irradiance data from the National Renewable Energy Laboratory.",
  },
  {
    icon: "📜",
    title: "NEC & IEEE Standardized",
    subtitle: "Safety margins and circuit sizing adhere to National Electrical Code (NEC 690 & 706) and IEEE guidelines.",
  },
];

export function TrustBadges() {
  return (
    <section className="trust-badges-section" style={{ marginTop: "3rem", marginBottom: "3.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Engineered for Accuracy &amp; Integrity</p>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Why Professionals &amp; Homeowners Trust PowerLab
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

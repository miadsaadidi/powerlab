import Link from "next/link";

interface SystemNode {
  id: string;
  category: string;
  title: string;
  metric: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "home-loads",
    category: "Home Energy",
    title: "1. Household Electrical Load",
    metric: "Watts • kWh/day",
    description: "Audit appliance wattage, schedule duty cycles, and calculate continuous vs peak running power.",
    icon: "🏠",
    href: "/home-energy",
    color: "#0284c7",
  },
  {
    id: "solar-generation",
    category: "Solar Photovoltaics",
    title: "2. Solar PV Generation",
    metric: "kW DC • kWh/yr",
    description: "Size solar panel arrays, optimize tilt angles, and model PVWatts location-aware solar insolation.",
    icon: "☀️",
    href: "/solar",
    color: "#f59e0b",
  },
  {
    id: "battery-storage",
    category: "Battery Storage",
    title: "3. Battery Bank & UPS",
    metric: "kWh • Ah • Runtime",
    description: "Store daytime solar generation or size whole-home battery backup banks for grid blackout protection.",
    icon: "🔋",
    href: "/battery",
    color: "#10b981",
  },
  {
    id: "ev-charging",
    category: "Electric Vehicles",
    title: "4. EV Charging & Transport",
    metric: "Level 1/2 • Fast Charging",
    description: "Calculate charging duration, home vs public electricity costs, real-world range, and gas savings.",
    icon: "🚗",
    href: "/ev",
    color: "#8b5cf6",
  },
];

export function ConnectedSystemFlow() {
  return (
    <section className="connected-system-section" style={{ marginTop: "2rem", marginBottom: "2.25rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.15rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.2rem" }}>The Connected Energy Ecosystem</p>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
          One Unified Energy Planning Architecture
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "680px", margin: "0 auto" }}>
          Your electrical devices, solar production, battery storage, and EV charging are connected in one continuous energy flow:
        </p>
      </div>

      <div
        className="connected-flow-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.15rem",
          position: "relative",
        }}
      >
        {SYSTEM_NODES.map((node) => (
          <Link
            key={node.id}
            href={node.href}
            className="flow-node-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.15rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: `1px solid var(--border-color, #cbd5e1)`,

              borderTop: `4px solid ${node.color}`,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: node.color,
                }}
              >
                {node.category}
              </span>
              <span style={{ fontSize: "1.5rem" }}>{node.icon}</span>
            </div>

            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700 }}>
              {node.title}
            </h3>

            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: node.color,
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {node.metric}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {node.description}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: node.color,
              }}
            >
              <span>Explore {node.category} Tools</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

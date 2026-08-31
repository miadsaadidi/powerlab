import Link from "next/link";

interface GoalOption {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
  badge: string;
  categoryColor: string;
}

const GOAL_OPTIONS: GoalOption[] = [
  {
    icon: "🏠",
    title: "Blackout & Outage Backup",
    subtitle: "Size home batteries & UPS runtime for emergency power.",
    href: "/home-energy/home-battery-size-calculator",
    badge: "Home Battery",
    categoryColor: "#10b981",
  },
  {
    icon: "☀️",
    title: "Off-Grid Solar Planning",
    subtitle: "Calculate daily appliance loads, panel counts & battery banks.",
    href: "/solar/solar-battery-bank-size-calculator",
    badge: "Solar Storage",
    categoryColor: "#f59e0b",
  },
  {
    icon: "⚡",
    title: "Lower Electric Bills",
    subtitle: "Audit high-draw appliances & calculate utility bill costs.",
    href: "/home-energy/electricity-usage-calculator",
    badge: "Energy Audit",
    categoryColor: "#0284c7",
  },
  {
    icon: "🚗",
    title: "EV Charging & Gas Savings",
    subtitle: "Calculate charging speeds, costs & annual fuel savings vs gas.",
    href: "/ev/ev-savings-calculator",
    badge: "EV Economics",
    categoryColor: "#8b5cf6",
  },
  {
    icon: "🚐",
    title: "Camper Van / Camping Power",
    subtitle: "Size portable power stations & 12V LiFePO4 battery runtime.",
    href: "/battery/portable-power-station-calculator",
    badge: "Portable Power",
    categoryColor: "#ec4899",
  },
  {
    icon: "📐",
    title: "Solar Roof Pitch & Tilt",
    subtitle: "Find the optimal tilt angle for your latitude and roof pitch.",
    href: "/solar/solar-panel-tilt-calculator",
    badge: "Solar Geometry",
    categoryColor: "#eab308",
  },
  {
    icon: "⚙️",
    title: "Storm Generator Sizing",
    subtitle: "Calculate running & starting surge watts for emergency backup.",
    href: "/home-energy/generator-size-calculator",
    badge: "Generator Sizing",
    categoryColor: "#0284c7",
  },
  {
    icon: "❄️",
    title: "Air Conditioner Running Cost",
    subtitle: "Calculate central AC, mini-split & window unit costs per hour and month.",
    href: "/home-energy/air-conditioner-cost-calculator",
    badge: "Cooling Bills",
    categoryColor: "#0284c7",
  },
  {
    icon: "🔋",
    title: "EV Real-World Range",
    subtitle: "Calculate highway range drops from 75 mph speed & cold winter temperatures.",
    href: "/ev/ev-range-calculator",
    badge: "EV Highway Range",
    categoryColor: "#8b5cf6",
  },
  {
    icon: "💰",
    title: "Solar Payback & 25-Yr ROI",
    subtitle: "Calculate break-even years, utility inflation & lifetime savings.",
    href: "/solar/solar-payback-calculator",
    badge: "Solar Economics",
    categoryColor: "#f59e0b",
  },
];

export function HeroGoalSelector() {
  return (
    <section className="hero-goals-section" style={{ marginTop: "1rem", marginBottom: "1.75rem" }}>
      <div style={{ textAlign: "center", marginBottom: "0.85rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.15rem" }}>Fast-Track Planning</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
          What is your energy project goal?
        </h2>
      </div>

      <div className="goal-grid">

        {GOAL_OPTIONS.map((goal) => (
          <Link
            key={goal.title}
            href={goal.href}
            className="flow-node-card goal-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem 1.15rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: `4px solid ${goal.categoryColor}`,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {/* Top Row: Category Label on left, Icon on right */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.45rem" }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: goal.categoryColor,
                }}
              >
                {goal.badge}
              </span>
              <span style={{ fontSize: "1.35rem" }}>{goal.icon}</span>
            </div>

            {/* Title */}
            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700 }}>
              {goal.title}
            </h3>

            {/* Subtitle / Description */}
            <p style={{ margin: 0, fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.35, flexGrow: 1 }}>
              {goal.subtitle}
            </p>

            {/* Bottom Action Link */}
            <div
              style={{
                marginTop: "0.65rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: goal.categoryColor,
              }}
            >
              <span>Explore Solution</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}


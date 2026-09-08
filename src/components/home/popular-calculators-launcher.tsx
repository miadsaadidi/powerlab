"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/analytics";

interface PopularTool {
  id: string;
  categoryLabel: string;
  color: string;
  title: string;
  description: string;
  standards: string[];
  metric: string;
  icon: string;
  route: string;
  actionText: string;
}

const POPULAR_TOOLS: PopularTool[] = [
  {
    id: "solar-panel-output",
    categoryLabel: "Solar PV",
    color: "#f59e0b",
    title: "Solar Panel Output & Yield",
    description: "Monthly & annual kWh solar production with tilt & PVWatts physical loss modeling.",
    standards: ["NREL PVWatts V8", "IEC 61215"],
    metric: "kWh/yr • PVWatts V8 Model",
    icon: "☀️",
    route: "/solar/solar-panel-output-calculator",
    actionText: "Calculate Solar Yield",
  },
  {
    id: "ac-cost",
    categoryLabel: "Home Energy",
    color: "#0284c7",
    title: "AC Electricity Cost Calculator",
    description: "Hourly, monthly & seasonal cooling costs by BTU, SEER2 rating, and climate zone.",
    standards: ["AHRI 210/240", "ASHRAE 90.1"],
    metric: "SEER2 • BTU • Hourly & Monthly",
    icon: "❄️",
    route: "/home-energy/air-conditioner-cost-calculator",
    actionText: "Calculate AC Bill",
  },
  {
    id: "battery-runtime",
    categoryLabel: "Battery Storage",
    color: "#10b981",
    title: "Battery Backup Runtime",
    description: "Exact backup duration in hours for home loads, LiFePO4, AGM, and Peukert derating.",
    standards: ["IEEE 485", "Peukert's Law"],
    metric: "Hours • Peukert Law • Inverter",
    icon: "🔋",
    route: "/battery/battery-runtime-calculator",
    actionText: "Calculate Backup Hours",
  },
  {
    id: "ev-range",
    categoryLabel: "Electric Vehicles",
    color: "#8b5cf6",
    title: "Real-World EV Range",
    description: "Range decay modeling under 70+ mph highway speed, cold winter temps, and HVAC loads.",
    standards: ["SAE J1634", "EPA Dynamometer"],
    metric: "Miles • mi/kWh • Cold Weather",
    icon: "🚗",
    route: "/ev/ev-range-calculator",
    actionText: "Estimate Real Range",
  },
];

export function PopularCalculatorsLauncher() {
  return (
    <section
      className="popular-launcher-section"
      aria-label="Most Popular Energy Planning Calculators"
      style={{
        margin: "0.5rem auto 2.5rem",
        maxWidth: "1200px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.15rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--accent, #c65d24)",
            }}
          >
            ⭐ Most Popular Tools
          </span>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0.15rem 0 0" }}>
            Top Energy Planning Calculators
          </h2>
        </div>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
          1-Click Instant Launch with Presets
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {POPULAR_TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.route}
            className="flow-node-card home-calc-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: `4px solid ${tool.color}`,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onClick={() => track("calculator_calculate", { calculator: tool.id, action: "popular_launcher_click" })}
          >
            {/* Top Row: Category Label on left, Icon on right */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: tool.color,
                }}
              >
                {tool.categoryLabel}
              </span>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
                {tool.icon}
              </span>
            </div>

            {/* Calculator Title */}
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700 }}>
              {tool.title}
            </h3>

            {/* Standards Badge */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.55rem" }}>
              {tool.standards.map((std) => (
                <span
                  key={std}
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    background: `${tool.color}15`,
                    color: tool.color,
                    border: `1px solid ${tool.color}35`,
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                    lineHeight: 1.3,
                  }}
                >
                  {std}
                </span>
              ))}
            </div>

            {/* Metric Pill Badge */}
            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: tool.color,
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {tool.metric}
            </div>

            {/* Description */}
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {tool.description}
            </p>

            {/* Bottom Action Link */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: tool.color,
              }}
            >
              <span>{tool.actionText}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

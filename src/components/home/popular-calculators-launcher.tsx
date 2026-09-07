"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/analytics";

interface PopularTool {
  id: string;
  category: string;
  title: string;
  tagline: string;
  badge: string;
  color: string;
  icon: string;
  route: string;
  actionText: string;
  metric: string;
}

const POPULAR_TOOLS: PopularTool[] = [
  {
    id: "solar-panel-output",
    category: "Solar PV",
    title: "Solar Panel Output & Yield",
    tagline: "Monthly kWh production with tilt & PVWatts physical loss modeling.",
    badge: "Top Engagement",
    color: "#f59e0b",
    icon: "☀️",
    route: "/solar/solar-panel-output-calculator",
    actionText: "Calculate Solar Yield",
    metric: "400W–10kW Systems • PVWatts",
  },
  {
    id: "ac-cost",
    category: "Home Energy",
    title: "AC Electricity Cost Calculator",
    tagline: "Hourly, monthly & seasonal cooling costs by BTU & SEER2 rating.",
    badge: "Trending Search",
    color: "#0284c7",
    icon: "❄️",
    route: "/home-energy/air-conditioner-cost-calculator",
    actionText: "Calculate AC Bill",
    metric: "SEER2 • Window, Mini-Split & Central",
  },
  {
    id: "battery-runtime",
    category: "Battery Storage",
    title: "Battery Backup Runtime",
    tagline: "Exact backup duration in hours for home loads, LiFePO4 & AGM.",
    badge: "Zero-Bounce Favorite",
    color: "#10b981",
    icon: "🔋",
    route: "/battery/battery-runtime-calculator",
    actionText: "Calculate Backup Hours",
    metric: "LiFePO4 & AGM • Hours Backup",
  },
  {
    id: "ev-range",
    category: "Electric Vehicles",
    title: "Real-World EV Range",
    tagline: "Range decay modeling under 70+ mph highway speed & cold winter temps.",
    badge: "Physics Model",
    color: "#8b5cf6",
    icon: "🚗",
    route: "/ev/ev-range-calculator",
    actionText: "Estimate Real Range",
    metric: "Speed & Cold Weather Decay",
  },
];

export function PopularCalculatorsLauncher() {
  return (
    <section
      className="popular-launcher-section"
      aria-label="Most Popular Energy Planning Calculators"
      style={{
        margin: "0.5rem auto 2rem",
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
          marginBottom: "1rem",
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
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0.15rem 0 0" }}>
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
          gap: "1.15rem",
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
              padding: "1.25rem",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: tool.color,
                  }}
                >
                  {tool.category}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "1px 6px",
                    borderRadius: "9999px",
                    background: `${tool.color}15`,
                    color: tool.color,
                    border: `1px solid ${tool.color}30`,
                  }}
                >
                  {tool.badge}
                </span>
              </div>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
                {tool.icon}
              </span>
            </div>

            {/* Calculator Title */}
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink, #1e293b)" }}>
              {tool.title}
            </h3>

            {/* Metric / Benchmark Pill */}
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
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted, #64748b)", lineHeight: 1.45, flexGrow: 1 }}>
              {tool.tagline}
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

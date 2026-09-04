"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/analytics";

interface PopularTool {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  icon: string;
  route: string;
  actionText: string;
  metricLabel: string;
  metricValue: string;
}

const POPULAR_TOOLS: PopularTool[] = [
  {
    id: "solar-panel-output",
    title: "Solar Panel Output & Yield",
    tagline: "Monthly kWh production with tilt & PVWatts physical loss modeling.",
    badge: "Top Engagement",
    badgeColor: "#d97706",
    icon: "☀️",
    route: "/solar/solar-panel-output-calculator",
    actionText: "Calculate Solar Yield",
    metricLabel: "Benchmark",
    metricValue: "400W–10kW Systems",
  },
  {
    id: "ac-cost",
    title: "AC Electricity Cost Calculator",
    tagline: "Hourly, monthly & seasonal cooling costs by BTU & SEER2 rating.",
    badge: "Trending Search",
    badgeColor: "#0284c7",
    icon: "❄️",
    route: "/home-energy/air-conditioner-cost-calculator",
    actionText: "Calculate AC Bill",
    metricLabel: "Standard Sizing",
    metricValue: "Window, Mini-Split, Central",
  },
  {
    id: "battery-runtime",
    title: "Battery Backup Runtime",
    tagline: "Exact backup duration in hours for home loads, LiFePO4 & AGM.",
    badge: "Zero-Bounce Favorite",
    badgeColor: "#16a34a",
    icon: "🔋",
    route: "/battery/battery-runtime-calculator",
    actionText: "Calculate Backup Hours",
    metricLabel: "Chemistries",
    metricValue: "Lithium, Lead-Acid, LFP",
  },
  {
    id: "ev-range",
    title: "Real-World EV Range",
    tagline: "Range decay modeling under 70+ mph highway speed & cold winter temps.",
    badge: "Physics Model",
    badgeColor: "#7c3aed",
    icon: "🚗",
    route: "/ev/ev-range-calculator",
    actionText: "Estimate Real Range",
    metricLabel: "Factors",
    metricValue: "Speed, Temp, Battery Health",
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
          gap: "1rem",
        }}
      >
        {POPULAR_TOOLS.map((tool) => (
          <div
            key={tool.id}
            style={{
              borderRadius: "0.85rem",
              border: "1px solid var(--border-color, #e2e8f0)",
              background: "var(--card-bg, #ffffff)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.85rem",
              transition: "transform 140ms ease, box-shadow 140ms ease",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
                  {tool.icon}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    background: `${tool.badgeColor}15`,
                    color: tool.badgeColor,
                    border: `1px solid ${tool.badgeColor}30`,
                  }}
                >
                  {tool.badge}
                </span>
              </div>

              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
                <Link
                  href={tool.route}
                  style={{ textDecoration: "none", color: "var(--ink, #1e293b)" }}
                  onClick={() => track("calculator_calculate", { calculator: tool.id, action: "popular_launcher_click" })}
                >
                  {tool.title}
                </Link>
              </h3>

              <p style={{ fontSize: "0.86rem", color: "var(--text-muted, #64748b)", margin: 0, lineHeight: 1.45 }}>
                {tool.tagline}
              </p>
            </div>

            <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--border-color, #f1f5f9)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  color: "var(--text-muted, #64748b)",
                  marginBottom: "0.65rem",
                }}
              >
                <span>{tool.metricLabel}:</span>
                <strong style={{ color: "var(--ink, #1e293b)" }}>{tool.metricValue}</strong>
              </div>

              <Link
                href={tool.route}
                className="button btn-primary"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  padding: "0.5rem 0.75rem",
                  textDecoration: "none",
                }}
                onClick={() => track("calculator_calculate", { calculator: tool.id, action: "popular_launcher_click" })}
              >
                {tool.actionText} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

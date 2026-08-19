"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { CalculatorRegistryItem } from "@/lib/calculator-registry";

interface HomeSearchFilterProps {
  calculators: CalculatorRegistryItem[];
  cardContent: Record<string, { description: string; action: string }>;
}


const CATEGORY_META: Record<string, { label: string; icon: string; color: string }> = {
  all: { label: "All Tools", icon: "⚡", color: "#0284c7" },
  solar: { label: "Solar PV", icon: "☀️", color: "#f59e0b" },
  battery: { label: "Battery", icon: "🔋", color: "#10b981" },
  "home-energy": { label: "Home Energy", icon: "🏠", color: "#0284c7" },
  ev: { label: "EV", icon: "🚗", color: "#8b5cf6" },
};

const CALCULATOR_METRICS: Record<string, { metric: string; icon: string }> = {
  // Solar PV (Color: #f59e0b)
  "solar-panel-tilt": { metric: "Degrees • Pitch ↔ Tilt", icon: "📐" },
  "solar-panel-output": { metric: "kWh/yr • PVWatts V8 Model", icon: "☀️" },
  "solar-panel-size": { metric: "kW DC • Panel Count • Roof Area", icon: "🏠" },
  "solar-battery-bank-size": { metric: "kWh • Autonomy Days • 48V", icon: "🔋" },
  "solar-load": { metric: "Wh/day • Peak vs Average Load", icon: "📊" },
  "solar-payback": { metric: "Years • 25-Yr ROI • Break-Even", icon: "💰" },
  "solar-charge-controller": { metric: "MPPT/PWM • Amps • Cold Voc", icon: "🎛️" },

  // Battery Storage (Color: #10b981)
  "battery-runtime": { metric: "Hours • Peukert Law • Inverter", icon: "⏱️" },
  "battery-size": { metric: "Ah ↔ Wh • Voltage Sizing", icon: "🔋" },
  "battery-capacity": { metric: "Ah • Nominal Volts • Energy", icon: "⚡" },
  "battery-charging-time": { metric: "Hours • Amps • C-Rate", icon: "🔌" },
  "ups-runtime": { metric: "Minutes • VA to Watts • Power Factor", icon: "🖥️" },
  "ups-battery-size": { metric: "Ah • Inverter Efficiency • Surge", icon: "🏢" },
  "home-battery-size": { metric: "kWh • Whole-Home Outage Backup", icon: "🏡" },
  "portable-power-station": { metric: "Wh • AC & DC Appliance Runtime", icon: "⛺" },
  "voltage-drop": { metric: "NEC 3% • AWG / mm² • Watts Loss", icon: "📏" },
  "inverter-size": { metric: "Continuous • Surge • DC Fuse & Cable", icon: "🔄" },

  // Home Energy (Color: #0284c7)
  "electricity-usage": { metric: "Watts • Daily & Monthly kWh", icon: "💡" },
  "energy-bill": { metric: "Cost • Tiered Rates • Standing Fee", icon: "💵" },
  "appliance-wattage": { metric: "Volts • Amps • Surge Power", icon: "🔌" },
  "generator-size": { metric: "Starting & Running Watts • Outage", icon: "⚙️" },
  "ac-cost": { metric: "SEER2 • BTU • Hourly & Monthly Cost", icon: "🌬️" },
  "space-heater-cost": { metric: "500W–1500W • Overnight 8h • Cost", icon: "🔥" },
  "heat-pump-cost": { metric: "COP vs Gas/Oil/Propane • Annual ROI", icon: "🔄" },

  // Electric Vehicles (Color: #8b5cf6)
  "ev-charging-time": { metric: "Hours • Level 1/2 • DC Fast", icon: "⚡" },
  "ev-charging-cost": { metric: "Cost per Session • Cost/Mile", icon: "💳" },
  "ev-range": { metric: "Miles • mi/kWh • Cold Weather", icon: "🛣️" },
  "ev-savings": { metric: "Annual Fuel Savings • ICE vs EV", icon: "⛽" },
  "v2l-runtime": { metric: "Days • Outage Backup • 20% Reserve", icon: "🚗" },
  "ev-breaker-size": { metric: "NEC 125% • 240V Double-Pole • AWG", icon: "🔌" },
};

export function HomeSearchFilter({ calculators, cardContent }: HomeSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: calculators.length };
    for (const calc of calculators) {
      counts[calc.category] = (counts[calc.category] || 0) + 1;
    }
    return counts;
  }, [calculators]);

  const filteredCalculators = useMemo(() => {
    return calculators.filter((calc) => {
      const matchesCategory = selectedCategory === "all" || calc.category === selectedCategory;
      const content = cardContent[calc.id];
      const searchTarget = `${calc.name} ${calc.category} ${content?.description ?? ""}`.toLowerCase();
      const matchesSearch = !searchQuery.trim() || searchTarget.includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [calculators, cardContent, searchQuery, selectedCategory]);

  return (
    <section className="home-search-filter-section" style={{ marginTop: "1rem", marginBottom: "2.5rem" }}>
      {/* Search Header */}
      <div className="home-search-box-container" style={{ maxWidth: "680px", margin: "0 auto 1.5rem", position: "relative" }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search all ${calculators.length} calculators (e.g. 'solar payback', 'voltage drop', 'generator', 'heat pump', 'V2L')...`}
            aria-label="Search energy calculators"
            style={{
              width: "100%",
              padding: "0.85rem 1rem 0.85rem 2.75rem",
              borderRadius: "9999px",
              border: "2px solid var(--border-color, #cbd5e1)",
              background: "var(--card-bg, #ffffff)",
              color: "var(--text-color, #0f172a)",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "1rem",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter calculators by category"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {Object.entries(CATEGORY_META).map(([key, cat]) => {
          const isActive = selectedCategory === key;
          const count = categoryCounts[key] || 0;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                border: `1px solid ${isActive ? cat.color : "var(--border-color, #cbd5e1)"}`,
                background: isActive ? cat.color : "var(--card-bg, #ffffff)",
                color: isActive ? "#ffffff" : "var(--text-color, #0f172a)",
                transition: "all 0.15s ease",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Filtered Grid */}
      {filteredCalculators.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            background: "var(--card-bg, #ffffff)",
            borderRadius: "0.75rem",
            border: "1px dashed var(--border-color, #cbd5e1)",
          }}
        >
          <p style={{ fontSize: "1.2rem", margin: "0 0 0.5rem" }}>🔎 No matching calculators found</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Try searching for terms like &quot;runtime&quot;, &quot;solar&quot;, &quot;battery&quot;, &quot;EV&quot;, &quot;wattage&quot;, &quot;voltage drop&quot;, or &quot;heat pump&quot;.
          </p>
        </div>
      ) : (
        <div
          className="home-calculators-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredCalculators.map((calculator) => {
            const content = cardContent[calculator.id];
            const catInfo = CATEGORY_META[calculator.category] ?? { label: calculator.category, icon: "⚡", color: "#0284c7" };
            const meta = CALCULATOR_METRICS[calculator.id];
            const color = catInfo.color;
            const categoryName = catInfo.label;

            return (
              <Link
                key={calculator.id}
                href={calculator.route}
                className="flow-node-card home-calc-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.35rem",
                  borderRadius: "0.85rem",
                  background: "var(--card-bg, #ffffff)",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  borderTop: `4px solid ${color}`,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                {/* Top Row: Category Label (uppercase, letter spacing, category color) on left, Icon (1.5rem) on right */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: color,
                    }}
                  >
                    {categoryName}
                  </span>
                  <span style={{ fontSize: "1.5rem" }}>{meta?.icon ?? catInfo.icon}</span>
                </div>

                {/* Calculator Title */}
                <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700 }}>
                  {calculator.name}
                </h3>

                {/* Metric Pill Badge */}
                <div
                  style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: color,
                    background: "var(--bg-secondary, #f8fafc)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    marginBottom: "0.6rem",
                  }}
                >
                  {meta?.metric ?? "Deterministic Math"}
                </div>

                {/* Description */}
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
                  {content?.description ?? ""}
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
                    color: color,
                  }}
                >
                  <span>{content?.action ?? `Explore ${calculator.name}`}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}


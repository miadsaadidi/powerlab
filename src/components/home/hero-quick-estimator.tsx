"use client";

import { useState } from "react";
import Link from "next/link";

export function HeroQuickEstimator() {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [ratePerKwh, setRatePerKwh] = useState(0.16);

  // Math derivations
  const safeRate = ratePerKwh > 0 ? ratePerKwh : 0.16;
  const safeBill = monthlyBill >= 0 ? monthlyBill : 0;
  const monthlyKwh = safeBill / safeRate;
  const dailyKwh = monthlyKwh / 30.4375;
  const annualCost = safeBill * 12;

  // Solar sizing heuristic (4.5 peak sun hours, 14% losses)
  const psh = 4.5;
  const solarLosses = 0.86;
  const suggestedSolarKw = dailyKwh / (psh * solarLosses);
  const panelCount400w = Math.ceil((suggestedSolarKw * 1000) / 400);

  // Home battery sizing heuristic (50% partial backup for 24h, 85% usable DOD)
  const batteryKwhNeeded = (dailyKwh * 0.5) / 0.85;

  return (
    <div
      className="hero-quick-estimator"
      style={{
        margin: "0.75rem auto 2rem",
        maxWidth: "840px",
        borderRadius: "1rem",
        border: "1px solid var(--border-color, #cbd5e1)",
        background: "var(--card-bg, #ffffff)",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          padding: "1.25rem 1.5rem",
          background: "linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)",
          borderBottom: "1px solid var(--border-color, #e2e8f0)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#0284c7", letterSpacing: "0.05em" }}>
            ⚡ Instant Sizing Quick Check
          </span>
          <h2 style={{ margin: "0.2rem 0 0", fontSize: "1.15rem", fontWeight: 700 }}>
            Enter your monthly electric bill to estimate solar &amp; storage:
          </h2>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            background: "#0284c7",
            color: "#ffffff",
            padding: "3px 10px",
            borderRadius: "9999px",
            fontWeight: 600,
          }}
        >
          Live Heuristic
        </span>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <label
              htmlFor="quick-bill-input"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.4rem" }}
            >
              Average Monthly Electric Bill ($)
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                $
              </span>
              <input
                id="quick-bill-input"
                type="number"
                min="10"
                max="2500"
                step="5"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem 0.6rem 1.8rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  background: "var(--bg-secondary, #f8fafc)",
                  color: "var(--text-color, #0f172a)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="quick-rate-input"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.4rem" }}
            >
              Electricity Tariff Rate ($/kWh)
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                $
              </span>
              <input
                id="quick-rate-input"
                type="number"
                min="0.04"
                max="1.00"
                step="0.01"
                value={ratePerKwh}
                onChange={(e) => setRatePerKwh(Number(e.target.value) || 0.16)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem 0.6rem 1.8rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  background: "var(--bg-secondary, #f8fafc)",
                  color: "var(--text-color, #0f172a)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                }}
              />
            </div>
          </div>
        </div>

        {/* Results Matrix */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            padding: "1.25rem",
            background: "var(--bg-secondary, #f8fafc)",
            borderRadius: "0.75rem",
            border: "1px solid var(--border-color, #e2e8f0)",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>
              Daily Household Energy
            </span>
            <strong style={{ fontSize: "1.25rem", color: "#0284c7" }}>
              {dailyKwh.toFixed(1)} kWh / day
            </strong>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
              ~{monthlyKwh.toFixed(0)} kWh/mo (${annualCost.toLocaleString()}/yr)
            </span>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>
              Recommended Solar Array
            </span>
            <strong style={{ fontSize: "1.25rem", color: "#f59e0b" }}>
              {suggestedSolarKw.toFixed(1)} kW DC
            </strong>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
              ~{panelCount400w} panels (400W each)
            </span>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>
              24-Hour Backup Battery
            </span>
            <strong style={{ fontSize: "1.25rem", color: "#10b981" }}>
              ~{batteryKwhNeeded.toFixed(1)} kWh
            </strong>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
              50% essential load backup
            </span>
          </div>
        </div>

        {/* Deep Calculator Links */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link
            href={`/solar/solar-panel-size-calculator?kwh=${monthlyKwh.toFixed(0)}&period=month`}
            className="button secondary-button"
            style={{ fontSize: "0.85rem", padding: "0.45rem 0.95rem" }}
          >
            <span>☀️ Size Full Solar Array</span>
            <span>→</span>
          </Link>
          <Link
            href={`/home-energy/home-battery-size-calculator?monthlyKwh=${monthlyKwh.toFixed(0)}`}
            className="button"
            style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
          >
            <span>🔋 Plan Home Battery Backup</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

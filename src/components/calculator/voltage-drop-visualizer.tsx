"use client";

import React from "react";

interface VoltageDropVisualizerProps {
  systemVoltage: number;
  currentAmps: number;
  oneWayDistanceFeet: number;
  awgSize: string;
  voltageDropVolts: number;
  voltageDropPercent: number;
  powerLossWatts: number;
}

// Approximate conductor diameter in mils (1 mil = 0.001 in) for visual cross-section scale
const AWG_DIAMETERS: Record<string, number> = {
  "14 AWG": 64.1,
  "12 AWG": 80.8,
  "10 AWG": 101.9,
  "8 AWG": 128.5,
  "6 AWG": 162.0,
  "4 AWG": 204.3,
  "2 AWG": 257.6,
  "1/0 AWG": 324.9,
  "2/0 AWG": 364.8,
  "4/0 AWG": 460.0,
  "250 kcmil": 500.0,
  "500 kcmil": 707.1,
};

export function VoltageDropVisualizer({
  systemVoltage,
  currentAmps,
  oneWayDistanceFeet,
  awgSize,
  voltageDropVolts,
  voltageDropPercent,
  powerLossWatts,
}: VoltageDropVisualizerProps) {
  const isCompliant = voltageDropPercent <= 3.0;
  const isCaution = voltageDropPercent > 3.0 && voltageDropPercent <= 5.0;
  const isViolation = voltageDropPercent > 5.0;

  const statusColor = isCompliant ? "#10b981" : isCaution ? "#f59e0b" : "#ef4444";
  const statusBg = isCompliant ? "rgba(16, 185, 129, 0.1)" : isCaution ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)";
  const statusLabel = isCompliant
    ? "NEC Compliant (≤ 3.0%)"
    : isCaution
    ? "Caution (3.0% – 5.0%)"
    : "Excessive Drop (> 5.0%)";

  // Radius for conductor cross-section SVG (clamped 14px to 42px)
  const diameterMil = AWG_DIAMETERS[awgSize] || 150;
  const conductorRadius = Math.max(14, Math.min(44, (diameterMil / 500) * 44));

  // Delivered voltage at load
  const endVoltage = Math.max(0, systemVoltage - voltageDropVolts);
  const dropBarWidth = Math.min(100, Math.max(2, (voltageDropPercent / 10) * 100));

  return (
    <div
      className="voltage-drop-visualizer"
      style={{
        margin: "1.25rem 0",
        padding: "1.25rem",
        borderRadius: "0.85rem",
        background: "var(--surface, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted, #64748b)" }}>
          ⚡ Circuit Voltage Gradient &amp; Conductor Gauge Model
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "999px",
            background: statusBg,
            color: statusColor,
            border: `1px solid ${statusColor}40`,
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* SVG Diagram: Circuit Loop & Conductor Cross Section */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox="0 0 560 170"
          style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
          aria-label={`Visual diagram of ${systemVoltage}V circuit with ${awgSize} conductor and ${voltageDropPercent}% drop`}
        >
          <defs>
            <linearGradient id="voltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset={`${100 - Math.min(60, voltageDropPercent * 5)}%`} stopColor="#0284c7" />
              <stop offset="100%" stopColor={statusColor} />
            </linearGradient>
            <radialGradient id="copperGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>

          {/* Power Source Terminal */}
          <g transform="translate(45, 85)">
            <rect x="-35" y="-55" width="70" height="110" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <text x="0" y="-30" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">SOURCE</text>
            <text x="0" y="-8" fill="#f8fafc" fontSize="13" fontWeight="800" textAnchor="middle">{systemVoltage}V</text>
            <text x="0" y="14" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">{currentAmps}A</text>
            <circle cx="28" cy="-18" r="4" fill="#ef4444" />
            <circle cx="28" cy="18" r="4" fill="#3b82f6" />
          </g>

          {/* Outbound Conductor (Hot/Positive) */}
          <line x1="75" y1="67" x2="395" y2="67" stroke="url(#voltageGradient)" strokeWidth="6" strokeLinecap="round" />
          <text x="235" y="56" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">
            {oneWayDistanceFeet} ft one-way &bull; {awgSize} Copper
          </text>

          {/* Return Conductor (Neutral/Negative) */}
          <line x1="75" y1="103" x2="395" y2="103" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeDasharray="6,4" />
          <text x="235" y="122" fill="#94a3b8" fontSize="9.5" fontWeight="500" textAnchor="middle">
            Return Path (Total loop: {oneWayDistanceFeet * 2} ft)
          </text>

          {/* Conductor Cross Section Callout in Middle */}
          <g transform="translate(235, 85)">
            <circle cx="0" cy="0" r={conductorRadius} fill="url(#copperGrad)" stroke="#d97706" strokeWidth="2" />
            <circle cx="0" cy="0" r={conductorRadius + 5} fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}>
              Cu
            </text>
          </g>

          {/* Load Terminal */}
          <g transform="translate(425, 85)">
            <rect x="-30" y="-55" width="65" height="110" rx="8" fill="#1e293b" stroke={statusColor} strokeWidth="2" />
            <text x="2.5" y="-30" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">LOAD</text>
            <text x="2.5" y="-8" fill="#f8fafc" fontSize="13" fontWeight="800" textAnchor="middle">
              {endVoltage.toFixed(1)}V
            </text>
            <text x="2.5" y="14" fill={statusColor} fontSize="10.5" fontWeight="700" textAnchor="middle">
              -{voltageDropVolts.toFixed(2)}V
            </text>
            <text x="2.5" y="34" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">
              ({voltageDropPercent.toFixed(2)}%)
            </text>
          </g>

          {/* Power Loss Indicator */}
          <g transform="translate(520, 85)">
            <text x="0" y="-12" fill="#64748b" fontSize="9" fontWeight="600" textAnchor="middle">Heat Loss</text>
            <text x="0" y="8" fill="#e11d48" fontSize="11" fontWeight="800" textAnchor="middle">
              {powerLossWatts >= 1000 ? `${(powerLossWatts / 1000).toFixed(2)} kW` : `${powerLossWatts.toFixed(1)} W`}
            </text>
            <text x="0" y="24" fill="#94a3b8" fontSize="8.5" textAnchor="middle">I²R Loss</text>
          </g>
        </svg>
      </div>

      {/* Voltage Drop Scale Bar */}
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted, #64748b)", marginBottom: "4px" }}>
          <span>0% Drop (Ideal)</span>
          <span style={{ color: "#10b981", fontWeight: 700 }}>3.0% NEC Branch Limit</span>
          <span style={{ color: "#f59e0b", fontWeight: 700 }}>5.0% NEC Total Limit</span>
          <span>10%+ Excessive</span>
        </div>
        <div style={{ position: "relative", width: "100%", height: "10px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
          {/* 3% marker */}
          <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: "2px", background: "#10b981", zIndex: 2 }} />
          {/* 5% marker */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "#f59e0b", zIndex: 2 }} />
          {/* Active fill */}
          <div
            style={{
              height: "100%",
              width: `${dropBarWidth}%`,
              background: `linear-gradient(90deg, #10b981 0%, #10b981 30%, #f59e0b 50%, #ef4444 100%)`,
              borderRadius: "999px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Metric Quick Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginTop: "1rem" }}>
        <div style={{ padding: "0.6rem 0.8rem", borderRadius: "6px", background: "var(--slate-50, #f8fafc)", border: "1px solid var(--slate-200, #e2e8f0)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--muted, #64748b)", fontWeight: 600 }}>Delivered at Load</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--foreground, #0f172a)" }}>{endVoltage.toFixed(2)} V</div>
        </div>
        <div style={{ padding: "0.6rem 0.8rem", borderRadius: "6px", background: "var(--slate-50, #f8fafc)", border: "1px solid var(--slate-200, #e2e8f0)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--muted, #64748b)", fontWeight: 600 }}>Total Voltage Drop</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: statusColor }}>{voltageDropVolts.toFixed(2)} V ({voltageDropPercent.toFixed(2)}%)</div>
        </div>
        <div style={{ padding: "0.6rem 0.8rem", borderRadius: "6px", background: "var(--slate-50, #f8fafc)", border: "1px solid var(--slate-200, #e2e8f0)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--muted, #64748b)", fontWeight: 600 }}>Conductor Gauge</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--foreground, #0f172a)" }}>{awgSize}</div>
        </div>
        <div style={{ padding: "0.6rem 0.8rem", borderRadius: "6px", background: "var(--slate-50, #f8fafc)", border: "1px solid var(--slate-200, #e2e8f0)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--muted, #64748b)", fontWeight: 600 }}>Cable Power Dissipation</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#e11d48" }}>{powerLossWatts.toFixed(1)} W</div>
        </div>
      </div>
    </div>
  );
}

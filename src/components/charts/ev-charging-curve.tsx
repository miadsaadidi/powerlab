"use client";

import { GENERIC_DC_TAPER } from "@/data/ev-charging-defaults";

interface EvChargingCurveProps {
  batteryKwh: number;
  chargerKw: number;
  startSoc?: number;
  targetSoc?: number;
  isDcFastCharge?: boolean;
}

export function EvChargingCurveChart({
  batteryKwh,
  chargerKw,
  startSoc = 10,
  targetSoc = 80,
  isDcFastCharge = false,
}: EvChargingCurveProps) {
  // Generate points for every 10% SoC
  const socPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const chargingPoints = socPoints.map((soc) => {
    let effectiveKw: number;
    if (isDcFastCharge) {
      const frac = soc / 100;
      const segment = GENERIC_DC_TAPER.find((s) => frac > s.startSoc && frac <= s.endSoc) ?? GENERIC_DC_TAPER[0];
      effectiveKw = chargerKw * segment.powerFactor;
    } else {
      effectiveKw = chargerKw * 0.90; // Illustrative wall-to-battery AC efficiency assumption
    }

    const energyAddedKwh = (batteryKwh * Math.max(0, soc - startSoc)) / 100;
    const durationHours = Math.max(0, energyAddedKwh / Math.max(effectiveKw, 1));
    const durationMinutes = Math.round(durationHours * 60);

    return {
      soc,
      powerKw: Math.max(effectiveKw, 1),
      durationMinutes,
      active: soc >= startSoc && soc <= targetSoc,
    };
  });

  const maxPower = Math.max(...chargingPoints.map((p) => p.powerKw), 10);

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 175;
  const padX = 45;
  const padY = 25;
  const graphWidth = svgWidth - padX * 2;
  const graphHeight = svgHeight - padY * 2;

  const points = chargingPoints.map((p, index) => {
    const x = padX + (index / (chargingPoints.length - 1)) * graphWidth;
    const y = padY + graphHeight - (p.powerKw / maxPower) * graphHeight;
    return { ...p, x, y };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  return (
    <div
      className="chart-container"
      style={{
        margin: "1.25rem 0",
        padding: "1rem",
        borderRadius: "0.75rem",
        background: "var(--bg-secondary, #f8fafc)",
        border: "1px solid var(--border-color, #e2e8f0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <strong style={{ fontSize: "0.9rem", color: "var(--brand-strong)" }}>
          ⚡ Illustrative Charging Power Profile vs. State of Charge (SoC)
        </strong>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          {batteryKwh} kWh Usable Pack • {chargerKw} kW EVSE Max
        </span>
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.75rem", lineHeight: 1.4 }}>
        {isDcFastCharge
          ? "Illustrative generic DC charging curve. DC charging power typically decreases as SOC rises; exact vehicle charging curves vary by model, battery temperature, SOC and charger conditions."
          : "AC charging delivers approximately constant battery-side power assuming an illustrative 90% overall wall-to-battery efficiency."}
      </p>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        role="img"
        aria-label="EV Charging Curve Chart"
      >
        <defs>
          <linearGradient id="evCurveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path
          d={`${pathD} L ${padX + graphWidth} ${padY + graphHeight} L ${padX} ${padY + graphHeight} Z`}
          fill="url(#evCurveGrad)"
        />

        <path
          d={pathD}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((pt) => {
          return (
            <g key={pt.soc}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={pt.active ? 5 : 3.5}
                fill={pt.active ? "#8b5cf6" : "#cbd5e1"}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text
                x={pt.x}
                y={padY + graphHeight + 14}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-muted, #64748b)"
              >
                {pt.soc}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

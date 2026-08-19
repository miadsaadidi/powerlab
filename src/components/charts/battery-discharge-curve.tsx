"use client";

import { useMemo } from "react";

interface BatteryDischargeCurveProps {
  nominalVoltage: number;
  capacityAh: number;
  dod: number; // e.g. 0.85
  inverterEfficiency?: number; // e.g. 0.90
  currentLoadWatts?: number;
}

const LOAD_POINTS = [100, 250, 500, 750, 1000, 1500, 2000];

export function BatteryDischargeCurveChart({
  nominalVoltage,
  capacityAh,
  dod,
  inverterEfficiency = 0.9,
  currentLoadWatts = 500,
}: BatteryDischargeCurveProps) {
  const curveData = useMemo(() => {
    const usableWh = capacityAh * nominalVoltage * dod * inverterEfficiency;
    return LOAD_POINTS.map((load) => {

      const hours = usableWh / load;
      return {
        load,
        hours,
        hoursFormatted: hours < 1 ? `${Math.round(hours * 60)}m` : `${hours.toFixed(1)}h`,
      };
    });
  }, [nominalVoltage, capacityAh, dod, inverterEfficiency]);

  const maxHours = Math.max(...curveData.map((d) => d.hours), 1);

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 180;
  const padX = 45;
  const padY = 25;
  const graphWidth = svgWidth - padX * 2;
  const graphHeight = svgHeight - padY * 2;

  const points = curveData.map((d, index) => {
    const x = padX + (index / (curveData.length - 1)) * graphWidth;
    const y = padY + graphHeight - (d.hours / maxHours) * graphHeight;
    return { ...d, x, y };
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <strong style={{ fontSize: "0.9rem", color: "var(--brand-strong)" }}>
          📈 Estimated Runtime vs. Continuous Load
        </strong>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          {nominalVoltage}V • {capacityAh}Ah • {Math.round(dod * 100)}% DoD
        </span>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        role="img"
        aria-label="Battery Runtime Curve Chart"
      >
        {/* Background Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padY + graphHeight - ratio * graphHeight;
          return (
            <line
              key={ratio}
              x1={padX}
              y1={y}
              x2={padX + graphWidth}
              y2={y}
              stroke="var(--border-color, #e2e8f0)"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Gradient fill under curve */}
        <defs>
          <linearGradient id="batteryCurveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path
          d={`${pathD} L ${padX + graphWidth} ${padY + graphHeight} L ${padX} ${padY + graphHeight} Z`}
          fill="url(#batteryCurveGrad)"
        />

        {/* Curve Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive Data Points */}
        {points.map((pt) => {
          const isNearest = Math.abs(pt.load - currentLoadWatts) < 200;
          return (
            <g key={pt.load}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isNearest ? 6 : 4}
                fill={isNearest ? "#f59e0b" : "#10b981"}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={pt.x}
                y={pt.y - 9}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="var(--ink, #0f172a)"
              >
                {pt.hoursFormatted}
              </text>
              <text
                x={pt.x}
                y={padY + graphHeight + 14}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-muted, #64748b)"
              >
                {pt.load}W
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

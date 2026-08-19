"use client";

import { useMemo } from "react";

interface SolarRoofVisualizerProps {
  systemKw: number;
  panelCount?: number;
  panelWatts?: number;
  annualKwh?: number;
  sqFtPerPanel?: number;
}

export function SolarRoofVisualizer({
  systemKw,
  panelCount = 18,
  panelWatts = 400,
  annualKwh,
  sqFtPerPanel = 20,
}: SolarRoofVisualizerProps) {
  const safeCount = Math.max(1, Math.min(60, Math.round(panelCount || (systemKw * 1000) / panelWatts)));
  const totalSqFt = Math.round(safeCount * sqFtPerPanel);
  const totalSqM = (totalSqFt * 0.092903).toFixed(1);

  // Compute grid arrangement (rows x cols)
  const grid = useMemo(() => {
    if (safeCount <= 4) return { cols: safeCount, rows: 1 };
    if (safeCount <= 8) return { cols: Math.ceil(safeCount / 2), rows: 2 };
    if (safeCount <= 18) return { cols: Math.ceil(safeCount / 3), rows: 3 };
    if (safeCount <= 32) return { cols: Math.ceil(safeCount / 4), rows: 4 };
    return { cols: Math.ceil(safeCount / 5), rows: 5 };
  }, [safeCount]);

  // Average residential roof space comparison (~1,200 - 1,500 sq ft)
  const roofSpacePercentage = Math.min(100, Math.round((totalSqFt / 1200) * 100));

  return (
    <div className="solar-roof-visualizer" role="region" aria-label="Rooftop Solar Array & Area Visualizer">
      <div className="roof-vis-header">
        <span className="roof-vis-title">🏠 Rooftop Array &amp; Space Visualizer</span>
        <span className="roof-array-badge">
          {safeCount} Panels · {systemKw.toFixed(1)} kW DC
        </span>
      </div>

      <div className="roof-vis-body">
        {/* Isometric Rooftop Graphic */}
        <div className="roof-canvas-box">
          <svg viewBox="0 0 340 170" className="roof-svg" aria-hidden="true">
            <defs>
              <linearGradient id="roofTileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="panelGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="40%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
              <filter id="panelShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Roof Pitch Polygon */}
            <polygon points="170,15 325,85 170,155 15,85" fill="url(#roofTileGrad)" stroke="#475569" strokeWidth="2" />
            <line x1="170" y1="15" x2="170" y2="155" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Solar Panels Grid rendered on the South-facing roof slope (left/center) */}
            <g transform="translate(45, 45) skewY(14) scale(0.95, 0.72)" filter="url(#panelShadow)">
              {Array.from({ length: safeCount }).map((_, i) => {
                const col = i % grid.cols;
                const row = Math.floor(i / grid.cols);
                const w = Math.min(26, Math.max(12, Math.floor(210 / grid.cols) - 3));
                const h = Math.min(36, Math.max(16, Math.floor(100 / grid.rows) - 3));
                const x = col * (w + 3);
                const y = row * (h + 3);

                return (
                  <g key={i}>
                    {/* Panel frame */}
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="2"
                      fill="url(#panelGlassGrad)"
                      stroke="#93c5fd"
                      strokeWidth="0.8"
                    />
                    {/* Panel busbar grid lines */}
                    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                    <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  </g>
                );
              })}
            </g>

            <text x="170" y="166" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              South-Facing Roof Plane ({safeCount} × {panelWatts}W Modules)
            </text>
          </svg>
        </div>

        {/* Space Breakdown Bar & Metrics */}
        <div className="roof-metrics-panel">
          <div className="roof-metric-item">
            <span className="roof-metric-label">Estimated Roof Area</span>
            <span className="roof-metric-val">{totalSqFt} sq ft</span>
            <span className="roof-metric-sub">({totalSqM} m²)</span>
          </div>

          <div className="roof-metric-item">
            <span className="roof-metric-label">Typical Roof Footprint</span>
            <span className="roof-metric-val">{roofSpacePercentage}% of ~1,200 sq ft</span>
            <div className="roof-progress-bar">
              <div className="roof-progress-fill" style={{ width: `${roofSpacePercentage}%` }} />
            </div>
          </div>

          {annualKwh !== undefined && annualKwh > 0 && (
            <div className="roof-metric-item">
              <span className="roof-metric-label">Est. Annual Output</span>
              <span className="roof-metric-val solar-highlight">
                {Math.round(annualKwh).toLocaleString()} kWh/yr
              </span>
              <span className="roof-metric-sub">≈ {(annualKwh / 365).toFixed(1)} kWh/day avg</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

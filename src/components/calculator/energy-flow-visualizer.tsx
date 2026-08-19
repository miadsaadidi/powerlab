"use client";

import { useState } from "react";

interface EnergyFlowVisualizerProps {
  batteryKwh: number;
  backupHours: number;
  scopeLabel?: string;
  solarKw?: number;
  loadWatts?: number;
}

export function EnergyFlowVisualizer({
  batteryKwh,
  backupHours,
  scopeLabel = "Critical Essentials",
  solarKw = 5.0,
  loadWatts,
}: EnergyFlowVisualizerProps) {
  const [isBlackoutMode, setIsBlackoutMode] = useState(false);

  return (
    <div className="energy-flow-visualizer" role="region" aria-label="Home Microgrid Power Flow Diagram">
      <div className="flow-vis-header">
        <span className="flow-vis-title">🔋 Home Power Flow &amp; Outage Sim</span>
        <button
          type="button"
          className={`flow-toggle-btn ${isBlackoutMode ? "blackout-active" : ""}`}
          onClick={() => setIsBlackoutMode(!isBlackoutMode)}
        >
          {isBlackoutMode ? "⚠️ Grid Outage Active (Battery On)" : "⚡ Normal Grid Connected"}
        </button>
      </div>

      <div className="flow-vis-body">
        <svg viewBox="0 0 340 180" className="flow-svg" aria-hidden="true">
          <defs>
            <linearGradient id="flowSolarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="flowBatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="flowGridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Background backdrop */}
          <rect x="5" y="5" width="330" height="170" rx="10" fill="#0f172a" stroke="#334155" />

          {/* Node 1: Solar Panels (Top Left) */}
          <g transform="translate(30, 20)">
            <rect x="0" y="0" width="70" height="42" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="35" y="18" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">☀️ Solar</text>
            <text x="35" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">{solarKw} kW</text>
          </g>

          {/* Node 2: Utility Grid (Bottom Left) */}
          <g transform="translate(30, 115)">
            <rect
              x="0"
              y="0"
              width="70"
              height="42"
              rx="6"
              fill={isBlackoutMode ? "#331515" : "#1e293b"}
              stroke={isBlackoutMode ? "#ef4444" : "#3b82f6"}
              strokeWidth="1.5"
            />
            <text x="35" y="18" fill={isBlackoutMode ? "#fca5a5" : "#93c5fd"} fontSize="11" fontWeight="bold" textAnchor="middle">
              {isBlackoutMode ? "❌ Grid Off" : "🔌 Grid"}
            </text>
            <text x="35" y="32" fill={isBlackoutMode ? "#ef4444" : "#94a3b8"} fontSize="9" textAnchor="middle">
              {isBlackoutMode ? "Blackout" : "120/240V"}
            </text>
          </g>

          {/* Node 3: Hybrid Inverter (Center) */}
          <g transform="translate(135, 68)">
            <rect x="0" y="0" width="70" height="44" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="35" y="18" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">⚡ Inverter</text>
            <text x="35" y="33" fill="#94a3b8" fontSize="9" textAnchor="middle">Hybrid Gateway</text>
          </g>

          {/* Node 4: Battery Storage (Top Right) */}
          <g transform="translate(240, 20)">
            <rect x="0" y="0" width="70" height="42" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="35" y="18" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">🔋 Battery</text>
            <text x="35" y="32" fill="#a7f3d0" fontSize="9" textAnchor="middle">{batteryKwh.toFixed(1)} kWh</text>
          </g>

          {/* Node 5: Home Essential Loads (Bottom Right) */}
          <g transform="translate(240, 115)">
            <rect x="0" y="0" width="70" height="42" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="35" y="18" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">🏠 Home</text>
            <text x="35" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">
              {loadWatts ? `${loadWatts} W` : scopeLabel}
            </text>
          </g>

          {/* Connection Lines with directional arrows */}
          {/* Solar -> Inverter */}
          <line x1="100" y1="41" x2="135" y2="75" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

          {/* Grid -> Inverter */}
          <line
            x1="100"
            y1="136"
            x2="135"
            y2="105"
            stroke={isBlackoutMode ? "#ef4444" : "#3b82f6"}
            strokeWidth="2"
            strokeDasharray={isBlackoutMode ? "2 4" : "4 2"}
            opacity={isBlackoutMode ? 0.4 : 1}
          />

          {/* Inverter <-> Battery */}
          <line
            x1="205"
            y1="75"
            x2="240"
            y2="41"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray={isBlackoutMode ? "none" : "4 2"}
          />

          {/* Inverter -> Home */}
          <line
            x1="205"
            y1="105"
            x2="240"
            y2="136"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
        </svg>

        {/* Microgrid Stats Bar */}
        <div className="flow-stats-bar">
          <div className="flow-stat">
            <span className="flow-stat-label">Outage Autonomy</span>
            <span className="flow-stat-val battery-highlight">{backupHours.toFixed(1)} Hours</span>
          </div>
          <div className="flow-stat">
            <span className="flow-stat-label">Power Protection</span>
            <span className="flow-stat-val">{scopeLabel}</span>
          </div>
          <div className="flow-stat">
            <span className="flow-stat-label">System Storage</span>
            <span className="flow-stat-val">{batteryKwh.toFixed(1)} kWh Pack</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface SolarTiltVisualizerProps {
  tiltAngle: number;
  latitude: number;
  mode?: "year-round" | "summer" | "winter";
}

export function SolarTiltVisualizer({
  tiltAngle,
  latitude,
}: SolarTiltVisualizerProps) {
  const [selectedSeason, setSelectedSeason] = useState<"year-round" | "summer" | "winter" | "custom">("year-round");
  const [customAngle, setCustomAngle] = useState<number>(Math.round(tiltAngle));

  const absLat = Math.min(90, Math.max(0, Math.abs(Number.isFinite(latitude) ? latitude : 34)));

  // Approximate solar noon elevations
  const equinoxElevation = Math.max(5, Math.min(88, 90 - absLat));
  const summerElevation = Math.min(88, Math.max(10, equinoxElevation + 23.45));
  const winterElevation = Math.max(5, Math.min(80, equinoxElevation - 23.45));

  // Calculate seasonal recommendations
  const summerTilt = Math.max(0, Math.round(absLat * 0.93 - 21));
  const winterTilt = Math.max(0, Math.min(90, Math.round(absLat * 0.875 + 19.2)));
  const yearRoundTilt = Math.max(0, Math.min(90, Math.round(absLat * 0.76 + 3.1)));

  const activeTilt = selectedSeason === "summer" 
    ? summerTilt 
    : selectedSeason === "winter" 
      ? winterTilt 
      : selectedSeason === "custom" 
        ? customAngle 
        : Math.round(tiltAngle || yearRoundTilt);

  const activeSunElevation = selectedSeason === "summer" 
    ? summerElevation 
    : selectedSeason === "winter" 
      ? winterElevation 
      : equinoxElevation;

  // Real-time solar ray incidence angle: optimal capture is when panel normal points directly at sun
  // In 2D profile: Sun altitude angle from horizon + Panel tilt angle from horizon = 90° for perfect perpendicular incidence
  const totalAngle = activeSunElevation + activeTilt;
  const angularDeviation = Math.abs(totalAngle - 90);
  const captureEfficiency = Math.max(0, Math.round(Math.cos((angularDeviation * Math.PI) / 180) * 100));

  // Geometry calculations for SVG
  // Pivot point on ground: (180, 160)
  const pivotX = 180;
  const pivotY = 155;
  const panelLength = 85;
  const tiltRad = (activeTilt * Math.PI) / 180;

  // Panel endpoints
  const panelTopX = pivotX - panelLength * Math.cos(tiltRad);
  const panelTopY = pivotY - panelLength * Math.sin(tiltRad);

  // Sun position coordinates in SVG sky (polar coordinates from ground origin)
  const sunElevationRad = (activeSunElevation * Math.PI) / 180;
  const sunDistance = 145;
  const sunX = pivotX - sunDistance * Math.cos(sunElevationRad);
  const sunY = pivotY - sunDistance * Math.sin(sunElevationRad);

  return (
    <div className="tilt-visualizer" role="region" aria-label={`Solar sun path diagram at ${activeTilt} degrees tilt`}>
      <div className="tilt-visualizer-header">
        <span className="tilt-visualizer-title">☀️ Live Sun Path &amp; Angle Visualizer</span>
        <div className="tilt-mode-pills" role="group" aria-label="Season selector">
          <button
            type="button"
            className={`tilt-pill ${selectedSeason === "year-round" ? "active" : ""}`}
            onClick={() => setSelectedSeason("year-round")}
          >
            Year-Round ({yearRoundTilt}°)
          </button>
          <button
            type="button"
            className={`tilt-pill ${selectedSeason === "summer" ? "active" : ""}`}
            onClick={() => setSelectedSeason("summer")}
          >
            Summer ({summerTilt}°)
          </button>
          <button
            type="button"
            className={`tilt-pill ${selectedSeason === "winter" ? "active" : ""}`}
            onClick={() => setSelectedSeason("winter")}
          >
            Winter ({winterTilt}°)
          </button>
        </div>
      </div>

      <div className="tilt-svg-container">
        <svg viewBox="0 0 340 190" className="tilt-svg" aria-hidden="true">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sky background box */}
          <rect x="5" y="5" width="330" height="180" rx="10" fill="url(#skyGrad)" stroke="rgba(255, 255, 255, 0.1)" />

          {/* Sun path arc trajectory */}
          <path
            d="M 35 155 A 145 145 0 0 1 325 155"
            fill="none"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Ground Horizon line */}
          <line x1="15" y1={pivotY} x2="325" y2={pivotY} stroke="#64748b" strokeWidth="2" />
          <text x="25" y={pivotY + 18} fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Horizon (0°)</text>

          {/* Active Sun Ray connecting to panel */}
          <line
            x1={sunX}
            y1={sunY}
            x2={pivotX - (panelLength / 2) * Math.cos(tiltRad)}
            y2={pivotY - (panelLength / 2) * Math.sin(tiltRad)}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="5 3"
            opacity="0.8"
          />

          {/* Active Sun Orb with Glow */}
          <circle cx={sunX} cy={sunY} r="15" fill="#f59e0b" opacity="0.3" filter="url(#glow)" />
          <circle cx={sunX} cy={sunY} r="9" fill="url(#sunGlow)" />
          <text
            x={sunX + (sunX > 170 ? -16 : 16)}
            y={sunY - 10}
            fill="#fef08a"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor={sunX > 170 ? "end" : "start"}
          >
            {selectedSeason === "summer" ? "Summer Sun" : selectedSeason === "winter" ? "Winter Sun" : "Noon Sun"} ({Math.round(activeSunElevation)}°)
          </text>

          {/* Panel Tilt Angle Arc */}
          <path
            d={`M ${pivotX - 35} ${pivotY} A 35 35 0 0 1 ${pivotX - 35 * Math.cos(tiltRad)} ${pivotY - 35 * Math.sin(tiltRad)}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />
          <text
            x={pivotX - 48 * Math.cos(tiltRad / 2)}
            y={pivotY - 24 * Math.sin(tiltRad / 2) - 4}
            fill="#34d399"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {activeTilt}°
          </text>

          {/* Solar Mounting Frame */}
          <polygon
            points={`${pivotX - 4},${pivotY} ${pivotX + 4},${pivotY} ${pivotX},${pivotY - 12}`}
            fill="#64748b"
          />
          <line x1={pivotX} y1={pivotY} x2={panelTopX + (pivotX - panelTopX) * 0.4} y2={pivotY} stroke="#475569" strokeWidth="3" />

          {/* Solar Panel Module Blade */}
          <line
            x1={pivotX}
            y1={pivotY}
            x2={panelTopX}
            y2={panelTopY}
            stroke="url(#solarCellGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            style={{ transition: "all 0.3s ease-out" }}
          />
          {/* Panel Aluminum Frame Outline */}
          <line
            x1={pivotX}
            y1={pivotY}
            x2={panelTopX}
            y2={panelTopY}
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx={pivotX} cy={pivotY} r="4.5" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Real-time incident angle and interactive adjustment */}
      <div className="tilt-metrics-bar">
        <div className="tilt-metric">
          <span className="tilt-metric-label">Panel Tilt Angle</span>
          <span className="tilt-metric-val">{activeTilt}°</span>
        </div>
        <div className="tilt-metric">
          <span className="tilt-metric-label">Sun Elevation</span>
          <span className="tilt-metric-val">{Math.round(activeSunElevation)}°</span>
        </div>
        <div className="tilt-metric">
          <span className="tilt-metric-label">Direct Noon Capture</span>
          <span className={`tilt-metric-val ${captureEfficiency >= 95 ? "optimal" : ""}`}>
            {captureEfficiency}%
          </span>
        </div>
      </div>

      <div className="tilt-slider-row">
        <label htmlFor="interactive-tilt-slider" className="tilt-slider-label">
          Test Custom Angle: <strong>{activeTilt}°</strong>
        </label>
        <input
          id="interactive-tilt-slider"
          type="range"
          min="0"
          max="90"
          step="1"
          value={activeTilt}
          onChange={(e) => {
            setSelectedSeason("custom");
            setCustomAngle(Number(e.target.value));
          }}
          className="tilt-range-slider"
        />
      </div>

      <div className="tilt-visualizer-footer">
        <span className="tilt-note">
          🧭 {latitude >= 0 ? "Facing True South (Northern Hemisphere)" : "Facing True North (Southern Hemisphere)"}
        </span>
      </div>
    </div>
  );
}


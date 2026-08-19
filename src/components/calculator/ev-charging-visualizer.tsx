"use client";

import { useMemo } from "react";

interface EvChargingVisualizerProps {
  batteryCapacityKwh: number;
  startSocPercent: number;
  targetSocPercent: number;
  chargerPowerKw: number;
  chargeTimeHours: number;
  rangeAddedMiles?: number;
  rangeAddedKm?: number;
}

export function EvChargingVisualizer({
  batteryCapacityKwh,
  startSocPercent,
  targetSocPercent,
  chargerPowerKw,
  chargeTimeHours,
  rangeAddedMiles,
  rangeAddedKm,
}: EvChargingVisualizerProps) {
  const safeStart = Math.max(0, Math.min(100, startSocPercent));
  const safeTarget = Math.max(safeStart, Math.min(100, targetSocPercent));
  const socAdded = Math.max(0, safeTarget - safeStart);
  const energyAddedKwh = (batteryCapacityKwh * socAdded) / 100;

  // Charger level classification
  const chargerType = useMemo(() => {
    if (chargerPowerKw <= 2.4) return { label: "Level 1 (120V AC)", color: "#38bdf8", speed: "Slow / Overnight" };
    if (chargerPowerKw <= 19.2) return { label: "Level 2 (240V AC)", color: "#10b981", speed: "Standard Fast Home" };
    return { label: "DC Fast / Supercharger", color: "#f59e0b", speed: "Rapid Highway Charging" };
  }, [chargerPowerKw]);

  // Format time
  const hours = Math.floor(chargeTimeHours);
  const mins = Math.round((chargeTimeHours - hours) * 60);
  const timeString = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

  return (
    <div className="ev-charging-visualizer" role="region" aria-label="EV Battery Charging Dashboard">
      <div className="ev-vis-header">
        <span className="ev-vis-title">⚡ Charging Stream &amp; Range Dial</span>
        <span className="ev-charger-badge" style={{ borderColor: chargerType.color, color: chargerType.color }}>
          {chargerPowerKw} kW · {chargerType.label}
        </span>
      </div>

      <div className="ev-vis-grid">
        {/* Battery Fill Gauge Graphic */}
        <div className="ev-battery-graphic">
          <div className="ev-battery-label-row">
            <span>State of Charge (SOC)</span>
            <strong>{safeStart}% ➔ {safeTarget}% (+{socAdded}%)</strong>
          </div>

          <div className="ev-battery-pack-frame">
            <div className="ev-battery-terminal" />
            <div className="ev-battery-cells">
              {/* Existing charge */}
              <div
                className="ev-cell-fill ev-existing-charge"
                style={{ width: `${safeStart}%` }}
                title={`Starting charge: ${safeStart}%`}
              />
              {/* Added charge animation */}
              <div
                className="ev-cell-fill ev-added-charge"
                style={{ width: `${socAdded}%` }}
                title={`Charging from ${safeStart}% to ${safeTarget}%`}
              >
                <div className="ev-charge-stream-pulse" />
              </div>
            </div>
          </div>

          <div className="ev-battery-markers">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="ev-vis-stats">
          <div className="ev-stat-card">
            <span className="ev-stat-label">Session Duration</span>
            <span className="ev-stat-val time-highlight">{timeString}</span>
            <span className="ev-stat-sub">{chargerType.speed}</span>
          </div>

          <div className="ev-stat-card">
            <span className="ev-stat-label">Energy Delivered</span>
            <span className="ev-stat-val">+{energyAddedKwh.toFixed(1)} kWh</span>
            <span className="ev-stat-sub">of {batteryCapacityKwh} kWh pack</span>
          </div>

          {(rangeAddedMiles !== undefined || rangeAddedKm !== undefined) && (
            <div className="ev-stat-card">
              <span className="ev-stat-label">Estimated Range Added</span>
              <span className="ev-stat-val range-highlight">
                {rangeAddedMiles !== undefined ? `+${Math.round(rangeAddedMiles)} mi` : `+${Math.round(rangeAddedKm ?? 0)} km`}
              </span>
              <span className="ev-stat-sub">
                {rangeAddedMiles !== undefined && rangeAddedKm !== undefined
                  ? `≈ +${Math.round(rangeAddedKm)} km`
                  : "Based on typical efficiency"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

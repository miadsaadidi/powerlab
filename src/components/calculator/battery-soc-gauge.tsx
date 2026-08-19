"use client";

interface BatterySocGaugeProps {
  startingSoc: number; // 0.0 to 1.0
  reserveSoc: number;  // 0.0 to 1.0
  batteryHealth?: number; // 0.0 to 1.0
  usableKwh?: number;
  totalKwh?: number;
}

export function BatterySocGauge({
  startingSoc,
  reserveSoc,
  batteryHealth = 1.0,
  usableKwh,
  totalKwh,
}: BatterySocGaugeProps) {
  const startPct = Math.max(0, Math.min(100, Math.round(startingSoc * 100)));
  const reservePct = Math.max(0, Math.min(100, Math.round(reserveSoc * 100)));
  const healthPct = Math.max(0, Math.min(100, Math.round(batteryHealth * 100)));
  const usablePct = Math.max(0, startPct - reservePct);

  return (
    <div className="battery-soc-gauge" role="region" aria-label="Battery State of Charge Visualization">
      <div className="gauge-header">
        <span className="gauge-title">Usable Energy Window</span>
        <span className="gauge-usable-badge">{usablePct}% Usable</span>
      </div>

      <div className="battery-shell">
        <div className="battery-terminal" aria-hidden="true" />
        <div className="battery-body">
          {/* Unusable Reserve Floor */}
          <div
            className="battery-band reserve-band"
            style={{ width: `${reservePct}%` }}
            title={`Reserve Floor: ${reservePct}% (Protected)`}
          >
            {reservePct >= 15 && <span className="band-label">Reserve {reservePct}%</span>}
          </div>

          {/* Active Usable Energy Window */}
          <div
            className="battery-band usable-band"
            style={{ width: `${usablePct}%` }}
            title={`Usable Energy: ${usablePct}%`}
          >
            {usablePct >= 20 && (
              <span className="band-label">
                {usableKwh ? `${usableKwh.toFixed(2)} kWh` : `${usablePct}% Available`}
              </span>
            )}
          </div>

          {/* Discharge Empty headroom (between startingSoc and 100%) */}
          {startPct < 100 && (
            <div
              className="battery-band empty-band"
              style={{ width: `${100 - startPct}%` }}
              title={`Discharged / Unfilled: ${100 - startPct}%`}
            />
          )}

          {/* Health Cap marker if health < 100% */}
          {healthPct < 100 && (
            <div
              className="battery-health-marker"
              style={{ left: `${healthPct}%` }}
              title={`Battery Health: ${healthPct}% max capacity`}
            />
          )}
        </div>
      </div>

      <div className="gauge-legend">
        <div className="legend-item">
          <span className="legend-dot dot-usable" />
          <span>Usable ({usablePct}%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-reserve" />
          <span>Reserve ({reservePct}%)</span>
        </div>
        {startPct < 100 && (
          <div className="legend-item">
            <span className="legend-dot dot-empty" />
            <span>Used ({100 - startPct}%)</span>
          </div>
        )}
      </div>
    </div>
  );
}

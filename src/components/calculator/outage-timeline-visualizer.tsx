"use client";

import { useEffect, useState } from "react";

interface OutageTimelineVisualizerProps {
  runtimeHours: number;
  loadWatts: number;
  capacityWh: number;
  reserveSoc?: number;
}

export function OutageTimelineVisualizer({
  runtimeHours,
  loadWatts,
  capacityWh,
  reserveSoc = 0.2,
}: OutageTimelineVisualizerProps) {
  const [mounted, setMounted] = useState(false);
  const [clockTimes, setClockTimes] = useState<{ startStr: string; endStr: string }>({
    startStr: "Start (00:00)",
    endStr: "+0h 00m",
  });

  // Format total runtime into hours and minutes
  const totalMinutes = Math.round(runtimeHours * 60);
  const wholeHours = Math.floor(runtimeHours);
  const remainingMins = totalMinutes % 60;
  const runtimeDisplay = wholeHours > 0 ? `${wholeHours}h ${remainingMins}m` : `${remainingMins} min`;

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const shutdownDate = new Date(now.getTime() + totalMinutes * 60 * 1000);
    const startStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const endStr = shutdownDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setClockTimes({ startStr, endStr });
  }, [totalMinutes]);

  const reservePercent = Math.round(reserveSoc * 100);
  const usablePercent = 100 - reservePercent;

  return (
    <div className="outage-timeline-visualizer" role="region" aria-label="Outage Survival Timeline & Depletion Clock">
      <div className="timeline-vis-header">
        <span className="timeline-vis-title">⏱️ Outage Survival Clock &amp; Timeline</span>
        <span className="timeline-runtime-badge">
          {runtimeDisplay} Backup
        </span>
      </div>

      <div className="timeline-vis-body">
        {/* Outage Clock Banner */}
        <div className="timeline-clock-banner">
          <div className="clock-point">
            <span className="clock-label">Outage Starts</span>
            <span className="clock-time" suppressHydrationWarning>
              {mounted ? clockTimes.startStr : "Now"}
            </span>
          </div>
          <div className="clock-arrow-flow">
            <span className="arrow-line" />
            <span className="arrow-duration">{runtimeDisplay}</span>
          </div>
          <div className="clock-point">
            <span className="clock-label">Battery Cutoff</span>
            <span className="clock-time cutoff-time" suppressHydrationWarning>
              {mounted ? clockTimes.endStr : `+${runtimeDisplay}`}
            </span>
          </div>
        </div>

        {/* Visual Depletion Progress Bar */}
        <div className="timeline-bar-wrapper">
          <div className="timeline-bar-track">
            {/* Usable discharging segment */}
            <div
              className="timeline-bar-usable"
              style={{ width: `${usablePercent}%` }}
              title={`Usable operating zone: ${usablePercent}% of battery`}
            >
              <span>Usable Power ({usablePercent}%)</span>
            </div>
            {/* Reserve buffer segment */}
            <div
              className="timeline-bar-reserve"
              style={{ width: `${reservePercent}%` }}
              title={`Protected reserve buffer: ${reservePercent}%`}
            >
              <span>{reservePercent}% Reserve</span>
            </div>
          </div>
        </div>

        {/* Discharge Milestones */}
        <div className="timeline-milestones">
          <div className="milestone">
            <span className="milestone-dot dot-full" />
            <span className="milestone-text">100% Full</span>
          </div>
          <div className="milestone">
            <span className="milestone-dot dot-mid" />
            <span className="milestone-text">50% Half-Life</span>
          </div>
          <div className="milestone">
            <span className="milestone-dot dot-reserve" />
            <span className="milestone-text">{reservePercent}% Low Cutoff</span>
          </div>
        </div>

        <div className="timeline-footer-stats">
          <span>Continuous Load: <strong>{loadWatts} W</strong></span>
          <span>Nominal Energy: <strong>{capacityWh} Wh</strong></span>
        </div>
      </div>
    </div>
  );
}

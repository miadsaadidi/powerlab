"use client";

import { useState } from "react";
import {
  US_REGIONAL_CLIMATE_DATA,
  RegionalClimateData,
  getRegionalDataByState,
} from "@/data/regional-climate-solar-data";

export interface RegionalClimateSelectorProps {
  /**
   * Title displayed above the selector
   */
  title?: string;
  /**
   * Helper description
   */
  description?: string;
  /**
   * Selected state code or name
   */
  selectedState?: string;
  /**
   * Callback fired when a state/region is chosen
   */
  onSelectRegion?: (data: RegionalClimateData) => void;
  /**
   * Specific quick-apply buttons to display
   */
  applyTarget?: "all" | "solar" | "hvac" | "electricity-rate" | "custom";
  /**
   * Custom label for the 1-click apply action
   */
  applyButtonLabel?: string;
  /**
   * Compact styling for dense sidebars or card headers
   */
  compact?: boolean;
  className?: string;
}

export function RegionalClimateSelector({
  title = "📍 Regional Climate & Solar Resource Presets",
  description = "Select your U.S. State or metropolitan area to load official NREL solar irradiance (Peak Sun Hours), ASHRAE design temperatures, and EIA residential electricity rates.",
  selectedState,
  onSelectRegion,
  applyTarget = "all",
  applyButtonLabel,
  compact = false,
  className = "",
}: RegionalClimateSelectorProps) {
  const [activeStateCode, setActiveStateCode] = useState<string>(
    selectedState || "CA"
  );
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const activeRegion =
    getRegionalDataByState(activeStateCode) || US_REGIONAL_CLIMATE_DATA[4]; // Default to California

  const handleStateChange = (code: string) => {
    setActiveStateCode(code);
    const region = getRegionalDataByState(code);
    if (region && onSelectRegion) {
      onSelectRegion(region);
      setAppliedNotice(`Loaded ${region.state} presets`);
      setTimeout(() => setAppliedNotice(null), 2500);
    }
  };

  const handleApplyClick = () => {
    if (activeRegion && onSelectRegion) {
      onSelectRegion(activeRegion);
      setAppliedNotice(`Applied ${activeRegion.state} parameters`);
      setTimeout(() => setAppliedNotice(null), 2500);
    }
  };

  return (
    <section
      className={`regional-climate-selector ${className}`.trim()}
      aria-label="Regional Climate & Solar Resource Presets"
      style={{
        borderRadius: "0.75rem",
        border: "1px solid var(--line, #e2e8f0)",
        background: "var(--surface-card, #ffffff)",
        padding: compact ? "0.85rem 1rem" : "1.2rem 1.35rem",
        marginBottom: "1.25rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: compact ? "0.95rem" : "1.05rem",
              fontWeight: 700,
              color: "var(--text-main, #0f172a)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            {title}
          </h3>
          {!compact && description && (
            <p
              style={{
                margin: "0.35rem 0 0.75rem 0",
                fontSize: "0.83rem",
                color: "var(--text-muted, #64748b)",
                lineHeight: 1.45,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {appliedNotice && (
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#16a34a",
              background: "#dcfce7",
              padding: "0.2rem 0.6rem",
              borderRadius: "0.375rem",
              animation: "fadeIn 200ms ease",
            }}
          >
            ✓ {appliedNotice}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginTop: compact ? "0.5rem" : "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 200px" }}>
          <label
            htmlFor="regional-state-select"
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted, #64748b)",
              marginBottom: "0.25rem",
            }}
          >
            State / Metro Weather Station
          </label>
          <select
            id="regional-state-select"
            value={activeStateCode}
            onChange={(e) => handleStateChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--line, #cbd5e1)",
              background: "var(--surface, #f8fafc)",
              color: "var(--text-main, #0f172a)",
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {US_REGIONAL_CLIMATE_DATA.map((item) => (
              <option key={item.stateCode} value={item.stateCode}>
                {item.state} ({item.metro}) — Zone {item.ashraeClimateZone}
              </option>
            ))}
          </select>
        </div>

        {onSelectRegion && (
          <div style={{ alignSelf: "flex-end" }}>
            <button
              type="button"
              onClick={handleApplyClick}
              className="button primary-button"
              style={{
                padding: "0.55rem 0.95rem",
                fontSize: "0.84rem",
                fontWeight: 600,
                borderRadius: "0.5rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {applyButtonLabel || "⚡ Apply Regional Data"}
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Data Metric Badges */}
      {activeRegion && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.5rem",
            marginTop: "0.85rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--line-subtle, #f1f5f9)",
          }}
        >
          {/* Solar Metrics */}
          {(applyTarget === "all" || applyTarget === "solar") && (
            <>
              <div
                style={{
                  background: "var(--surface, #f8fafc)",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--line-subtle, #e2e8f0)",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)" }}>
                  ☀️ Peak Sun Hours
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                  {activeRegion.peakSunHours} <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>kWh/m²/d</span>
                </div>
              </div>

              <div
                style={{
                  background: "var(--surface, #f8fafc)",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--line-subtle, #e2e8f0)",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)" }}>
                  📐 Optimal Tilt
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                  {activeRegion.optimalTiltDeg}° <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>fixed</span>
                </div>
              </div>
            </>
          )}

          {/* HVAC & ASHRAE Metrics */}
          {(applyTarget === "all" || applyTarget === "hvac") && (
            <>
              <div
                style={{
                  background: "var(--surface, #f8fafc)",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--line-subtle, #e2e8f0)",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)" }}>
                  ❄️ ASHRAE 99% Winter
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                  {activeRegion.winterDesignTempF}°F <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>DB</span>
                </div>
              </div>

              <div
                style={{
                  background: "var(--surface, #f8fafc)",
                  padding: "0.45rem 0.6rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--line-subtle, #e2e8f0)",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)" }}>
                  🔥 ASHRAE 1% Summer
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                  {activeRegion.summerDesignTempF}°F <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>DB</span>
                </div>
              </div>
            </>
          )}

          {/* Electricity Rate Metric */}
          {(applyTarget === "all" || applyTarget === "electricity-rate" || applyTarget === "solar" || applyTarget === "hvac") && (
            <div
              style={{
                background: "var(--surface, #f8fafc)",
                padding: "0.45rem 0.6rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--line-subtle, #e2e8f0)",
              }}
            >
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #64748b)" }}>
                ⚡ EIA Grid Rate
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                ${activeRegion.electricityRateKwh.toFixed(3)} <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>/kWh</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

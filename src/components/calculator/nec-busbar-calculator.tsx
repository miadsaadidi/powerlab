"use client";

import { useEffect, useState, useId } from "react";
import { track } from "@/lib/analytics/analytics";
import { Disclaimer } from "@/components/shared/Disclaimer";

interface PanelPreset {
  label: string;
  busbarRating: number;
  mainOcpd: number;
  description: string;
}

const PANEL_PRESETS: PanelPreset[] = [
  { label: "100A / 100A", busbarRating: 100, mainOcpd: 100, description: "Standard 100A Residential Panel" },
  { label: "125A / 100A", busbarRating: 125, mainOcpd: 100, description: "100A Service with High-Capacity Bus" },
  { label: "125A / 125A", busbarRating: 125, mainOcpd: 125, description: "Standard 125A Subpanel / Service" },
  { label: "150A / 150A", busbarRating: 150, mainOcpd: 150, description: "Standard 150A Service Panel" },
  { label: "200A / 200A", busbarRating: 200, mainOcpd: 200, description: "Standard 200A Residential Panel" },
  { label: "225A / 200A", busbarRating: 225, mainOcpd: 200, description: "Solar-Ready 200A Service Panel" },
  { label: "225A / 225A", busbarRating: 225, mainOcpd: 225, description: "Standard 225A High-Amp Panel" },
  { label: "400A / 400A", busbarRating: 400, mainOcpd: 400, description: "Class 320 / 400A Split-Bus Service" },
];

const STANDARD_OCPD_RATINGS = [
  15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800,
];

type VoltageOption = "240v_split" | "208v_3phase" | "120v_single";
type SystemTopology = "pv_only" | "pv_ac_ess" | "pv_dc_ess" | "pv_pcs_ems";
type PlannedInputUnit = "kw" | "amps";

export function NecBusbarCalculator() {
  const busbarId = useId();
  const mainOcpdId = useId();
  const voltageId = useId();
  const topologyId = useId();
  const plannedValueId = useId();

  const [busbarRating, setBusbarRating] = useState<number>(200);
  const [mainOcpd, setMainOcpd] = useState<number>(200);
  const [voltageType, setVoltageType] = useState<VoltageOption>("240v_split");
  const [topology, setTopology] = useState<SystemTopology>("pv_only");
  const [plannedUnit, setPlannedUnit] = useState<PlannedInputUnit>("kw");
  const [plannedInputVal, setPlannedInputVal] = useState<string>("");
  const [showDerateSimulator, setShowDerateSimulator] = useState<boolean>(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "nec-busbar-120-rule", category: "solar", phase: 5 });
  }, []);

  // 1. Math: 120% Bus Calculation Ceiling
  const busLimit120 = busbarRating * 1.20;

  // 2. Math: Remaining Bus Calculation Allowance
  const rawRemainingAllowance = busLimit120 - mainOcpd;
  const remainingBusAllowance = Math.max(0, rawRemainingAllowance);

  // 3. Math: Maximum Allowable Continuous Source Output Current (125% Inverter Duty Rule)
  const maxContinuousSourceCurrent = remainingBusAllowance / 1.25;

  // 4. Math: Illustrative Example Source OCPD Selection (Bounded to not exceed remainingBusAllowance)
  const eligibleOcpds = STANDARD_OCPD_RATINGS.filter((r) => r <= remainingBusAllowance);
  const exampleSourceOcpd = eligibleOcpds.length > 0 ? eligibleOcpds[eligibleOcpds.length - 1] : null;

  // 5. Math: Phase-Aware Maximum Continuous AC Power Calculation
  let maxContinuousAcPowerKw = 0;
  if (voltageType === "208v_3phase") {
    maxContinuousAcPowerKw = (Math.sqrt(3) * 208 * maxContinuousSourceCurrent) / 1000;
  } else if (voltageType === "120v_single") {
    maxContinuousAcPowerKw = (120 * maxContinuousSourceCurrent) / 1000;
  } else {
    // 240V split-phase
    maxContinuousAcPowerKw = (240 * maxContinuousSourceCurrent) / 1000;
  }

  // 6. Planned Inverter Compliance Evaluation
  const numericPlannedInput = parseFloat(plannedInputVal);
  const hasPlannedInput = !isNaN(numericPlannedInput) && numericPlannedInput > 0;

  let plannedSourceCurrentA = 0;
  let plannedSourceKw = 0;

  if (hasPlannedInput) {
    if (plannedUnit === "kw") {
      plannedSourceKw = numericPlannedInput;
      if (voltageType === "208v_3phase") {
        plannedSourceCurrentA = (numericPlannedInput * 1000) / (Math.sqrt(3) * 208);
      } else if (voltageType === "120v_single") {
        plannedSourceCurrentA = (numericPlannedInput * 1000) / 120;
      } else {
        plannedSourceCurrentA = (numericPlannedInput * 1000) / 240;
      }
    } else {
      plannedSourceCurrentA = numericPlannedInput;
      if (voltageType === "208v_3phase") {
        plannedSourceKw = (Math.sqrt(3) * 208 * numericPlannedInput) / 1000;
      } else if (voltageType === "120v_single") {
        plannedSourceKw = (120 * numericPlannedInput) / 1000;
      } else {
        plannedSourceKw = (240 * numericPlannedInput) / 1000;
      }
    }
  }

  const isWithinCalculationModel = hasPlannedInput && plannedSourceCurrentA <= maxContinuousSourceCurrent;
  const shortfallCurrentA = hasPlannedInput && !isWithinCalculationModel ? plannedSourceCurrentA - maxContinuousSourceCurrent : 0;
  const shortfallPowerKw = hasPlannedInput && !isWithinCalculationModel ? plannedSourceKw - maxContinuousAcPowerKw : 0;

  // Visual Busbar Distribution
  const mainSharePct = busLimit120 > 0 ? Math.min(100, (mainOcpd / busLimit120) * 100) : 0;
  const allowanceSharePct = busLimit120 > 0 ? Math.max(0, 100 - mainSharePct) : 0;

  // Derate Simulator Scenarios
  const derateOptions = [175, 150, 125, 100].filter((r) => r < mainOcpd && r <= busbarRating);

  return (
    <div className="calculator-wrapper" style={{ marginTop: "1.5rem" }}>
      {/* Scope Definition Banner */}
      <div
        style={{
          background: "rgba(56, 189, 248, 0.08)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          borderRadius: "8px",
          padding: "0.85rem 1.15rem",
          marginBottom: "1.5rem",
          fontSize: "0.88rem",
          lineHeight: 1.5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <span style={{ color: "#38bdf8", fontWeight: 700 }}>⚡ Scope &amp; Code Basis:</span>
          <span style={{ fontWeight: 600, color: "var(--foreground)" }}>
            Load-Side 120% Busbar Calculation — Opposite-End Source Configuration (NEC 2023)
          </span>
        </div>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.82rem" }}>
          This calculation model applies specifically to load-side interconnections where the power production source is
          located at the opposite end of the busbar from the primary main supply under NFPA 70-2023 Article 705.12(B).
          Other configurations (center-fed arrangements, supply-side taps under NEC 705.11, and Power Control Systems
          under NEC 705.13) require separate engineering evaluation.
        </p>
      </div>

      {/* Preset Autofill Chips */}
      <div className="preset-chips-container" role="region" aria-label="Standard Panel Presets">
        <span className="preset-chips-label">⚡ 1-Click Autofill: Standard Service Panel Presets</span>
        <div className="preset-chips-row" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
          {PANEL_PRESETS.map((p) => {
            const isSelected = busbarRating === p.busbarRating && mainOcpd === p.mainOcpd;
            return (
              <button
                key={p.label}
                type="button"
                className={`preset-chip-btn ${isSelected ? "active" : ""}`}
                onClick={() => {
                  setBusbarRating(p.busbarRating);
                  setMainOcpd(p.mainOcpd);
                  track("calculator_preset_click", { calculator_id: "nec-busbar-120-rule", preset_label: p.label });
                }}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.82rem",
                  borderRadius: "6px",
                  border: isSelected ? "1px solid var(--accent, #38bdf8)" : "1px solid var(--border)",
                  background: isSelected ? "rgba(56, 189, 248, 0.15)" : "var(--surface)",
                  color: isSelected ? "var(--accent, #38bdf8)" : "var(--foreground)",
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="calculator-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
        {/* Input Panel */}
        <div className="calculator-inputs" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: "0 0 1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            Service Panel Parameters
          </h3>

          {/* Busbar Rating Slider/Input */}
          <div style={{ marginBottom: "1.1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <label htmlFor={busbarId} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                Busbar Rating (Amperes)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <input
                  type="number"
                  min={50}
                  max={800}
                  step={5}
                  value={busbarRating}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      setBusbarRating(Math.max(50, Math.min(800, val)));
                    }
                  }}
                  aria-label="Busbar Rating exact amperes"
                  style={{
                    width: "78px",
                    padding: "0.22rem 0.45rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    textAlign: "right",
                  }}
                />
                <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>A</span>
              </div>
            </div>
            <input
              id={busbarId}
              type="range"
              min={50}
              max={800}
              step={5}
              value={busbarRating}
              onChange={(e) => setBusbarRating(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          {/* Main OCPD Rating Slider/Input */}
          <div style={{ marginBottom: "1.1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <label htmlFor={mainOcpdId} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                Main Supply OCPD / Breaker (Amperes)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <input
                  type="number"
                  min={50}
                  max={800}
                  step={5}
                  value={mainOcpd}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      setMainOcpd(Math.max(50, Math.min(800, val)));
                    }
                  }}
                  aria-label="Main Supply OCPD exact amperes"
                  style={{
                    width: "78px",
                    padding: "0.22rem 0.45rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    textAlign: "right",
                  }}
                />
                <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>A</span>
              </div>
            </div>
            <input
              id={mainOcpdId}
              type="range"
              min={50}
              max={800}
              step={5}
              value={mainOcpd}
              onChange={(e) => setMainOcpd(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#38bdf8" }}
            />
          </div>

          {/* System Voltage / Phase Selection */}
          <div style={{ marginBottom: "1.1rem" }}>
            <label htmlFor={voltageId} style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.35rem" }}>
              System Configuration &amp; AC Voltage
            </label>
            <select
              id={voltageId}
              value={voltageType}
              onChange={(e) => setVoltageType(e.target.value as VoltageOption)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.88rem",
              }}
            >
              <option value="240v_split">240 V Split-Phase (Standard Residential)</option>
              <option value="208v_3phase">208 V Three-Phase (Commercial / Multi-Family)</option>
              <option value="120v_single">120 V Single-Leg (Specialized / Micro)</option>
            </select>
          </div>

          {/* Topology Selector */}
          <div style={{ marginBottom: "1.1rem" }}>
            <label htmlFor={topologyId} style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.35rem" }}>
              Interconnected Generation / Storage Topology
            </label>
            <select
              id={topologyId}
              value={topology}
              onChange={(e) => setTopology(e.target.value as SystemTopology)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.88rem",
              }}
            >
              <option value="pv_only">Solar PV Inverter Only</option>
              <option value="pv_ac_ess">Solar PV + AC-Coupled Battery Storage</option>
              <option value="pv_dc_ess">Solar PV + DC-Coupled Hybrid Storage</option>
              <option value="pv_pcs_ems">Solar + Storage with Power Control System (PCS/EMS)</option>
            </select>
          </div>

          {/* Topology Notice for ESS */}
          {topology !== "pv_only" && (
            <div
              style={{
                background: "rgba(234, 179, 8, 0.08)",
                border: "1px solid rgba(234, 179, 8, 0.25)",
                borderRadius: "6px",
                padding: "0.65rem 0.85rem",
                marginBottom: "1.1rem",
                fontSize: "0.8rem",
                color: "#fde047",
                lineHeight: 1.4,
              }}
            >
              <strong>Topology Notice:</strong> Complete ESS/PCS interconnection evaluation requires equipment-specific
              configuration, operational mode parameters, and applicable NEC Article 705 / 706 verification. This
              calculator models aggregate continuous load-side source limits only.
            </div>
          )}

          {/* Planned System Input with kW / Amps toggle */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <label htmlFor={plannedValueId} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                Planned Generation / Inverter Capacity
              </label>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() => setPlannedUnit("kw")}
                  style={{
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.72rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    background: plannedUnit === "kw" ? "#38bdf8" : "var(--background)",
                    color: plannedUnit === "kw" ? "#000" : "var(--foreground)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  kW
                </button>
                <button
                  type="button"
                  onClick={() => setPlannedUnit("amps")}
                  style={{
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.72rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    background: plannedUnit === "amps" ? "#38bdf8" : "var(--background)",
                    color: plannedUnit === "amps" ? "#000" : "var(--foreground)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Amps
                </button>
              </div>
            </div>
            <input
              id={plannedValueId}
              type="number"
              min={0}
              max={500}
              step={0.1}
              placeholder={plannedUnit === "kw" ? "e.g. 7.6 kW" : "e.g. 32 A"}
              value={plannedInputVal}
              onChange={(e) => setPlannedInputVal(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.88rem",
              }}
            />
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="calculator-results" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", margin: "0 0 1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            Calculation Model Results
          </h3>

          {/* Warning state if mainOcpd > busbarRating */}
          {mainOcpd > busbarRating && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "6px",
                padding: "0.75rem",
                marginBottom: "1rem",
                fontSize: "0.84rem",
                color: "#fca5a5",
              }}
            >
              ⚠️ <strong>Configuration requires verification:</strong> Entered Main OCPD ({mainOcpd} A) exceeds the entered
              busbar rating ({busbarRating} A). Standard installations require busbar ampacity to equal or exceed the main
              supply overcurrent device rating.
            </div>
          )}

          {/* Saturated Busbar Notice */}
          {remainingBusAllowance === 0 && mainOcpd <= busbarRating && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                borderRadius: "6px",
                padding: "0.65rem 0.85rem",
                marginBottom: "1rem",
                fontSize: "0.82rem",
                color: "#fca5a5",
              }}
            >
              ⛔ <strong>Zero Backfeed Capacity:</strong> Main supply OCPD ({mainOcpd} A) utilizes the full 120% busbar
              allowance. Load-side backfeed is not permitted without a main-breaker derate or alternate interconnection method.
            </div>
          )}

          {/* Visual Busbar Distribution */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>
              <span>Busbar 120% Ceiling: {busLimit120.toFixed(1)} A</span>
              <span>Main OCPD: {mainOcpd} A</span>
            </div>
            <div style={{ height: "18px", width: "100%", background: "var(--border)", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
              <div
                title={`Main Supply OCPD: ${mainOcpd} A`}
                style={{
                  width: `${mainSharePct}%`,
                  background: "#64748b",
                  transition: "width 0.2s ease",
                }}
              />
              <div
                title={`Remaining Calculation Allowance: ${remainingBusAllowance.toFixed(1)} A (Permits ${maxContinuousSourceCurrent.toFixed(1)} A Continuous Current)`}
                style={{
                  width: `${allowanceSharePct}%`,
                  background: "#38bdf8",
                  transition: "width 0.2s ease",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginTop: "0.25rem" }}>
              <span style={{ color: "#94a3b8" }}>■ Main Supply ({mainSharePct.toFixed(0)}%)</span>
              <span style={{ color: "#38bdf8" }}>■ Backfeed Allowance ({allowanceSharePct.toFixed(0)}%)</span>
            </div>
          </div>

          {/* 4 Metric Output Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            {/* 120% Bus Limit */}
            <div style={{ background: "var(--background)", padding: "0.85rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "block" }}>120% Bus Calculation Limit</span>
              <strong style={{ fontSize: "1.25rem", color: "var(--foreground)" }}>{busLimit120.toFixed(1)} A</strong>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>{busbarRating} A × 1.20</span>
            </div>

            {/* Remaining Bus Calculation Allowance */}
            <div style={{ background: "var(--background)", padding: "0.85rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "block" }}>Remaining Calculation Allowance</span>
              <strong style={{ fontSize: "1.25rem", color: "#38bdf8" }}>{remainingBusAllowance.toFixed(1)} A</strong>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>{busLimit120.toFixed(0)} A − {mainOcpd} A</span>
            </div>

            {/* Maximum Continuous Source Current */}
            <div style={{ background: "var(--background)", padding: "0.85rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "block" }}>Max Continuous Source Current</span>
              <strong style={{ fontSize: "1.25rem", color: "#4ade80" }}>{maxContinuousSourceCurrent.toFixed(1)} A</strong>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>{remainingBusAllowance.toFixed(1)} A ÷ 1.25</span>
            </div>

            {/* Example Source OCPD */}
            <div style={{ background: "var(--background)", padding: "0.85rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", display: "block" }}>Example Source OCPD</span>
              <strong style={{ fontSize: "1.25rem", color: "var(--foreground)" }}>
                {exampleSourceOcpd ? `${exampleSourceOcpd} A` : "None"}
              </strong>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>
                {exampleSourceOcpd ? "Standard OCPD ceiling" : "Exceeds standard ratings"}
              </span>
            </div>
          </div>

          {/* Maximum Continuous AC Power Card */}
          <div
            style={{
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block" }}>
                Maximum Continuous AC Power Output
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                {voltageType === "208v_3phase"
                  ? "Based on √3 × 208 V × Max Continuous Current"
                  : voltageType === "120v_single"
                  ? "Based on 120 V × Max Continuous Current"
                  : "Based on 240 V × Max Continuous Current"}
              </span>
            </div>
            <strong style={{ fontSize: "1.35rem", color: "#38bdf8" }}>{maxContinuousAcPowerKw.toFixed(2)} kW</strong>
          </div>

          {/* Interactive Busbar Panel Schematic */}
          <div
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)" }}>
                ⚡ Panel Busbar Physical Layout (NEC 705.12(B)(3)(2))
              </span>
              <span style={{ fontSize: "0.74rem", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 600 }}>
                Opposite-End Rule Active
              </span>
            </div>

            {/* Panel Graphic Container */}
            <div
              style={{
                border: "2px solid #475569",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
                padding: "0.85rem",
                color: "#f8fafc",
              }}
            >
              {/* Main Breaker (Top) */}
              <div
                style={{
                  border: "2px solid #94a3b8",
                  background: "#334155",
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  marginBottom: "0.6rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Utility Grid Supply Input (Top End)
                  </div>
                  <strong style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
                    Main Service Breaker: {mainOcpd} A OCPD
                  </strong>
                </div>
                <span style={{ fontSize: "0.75rem", background: "#475569", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "#cbd5e1" }}>
                  Grid Inflow ↓
                </span>
              </div>

              {/* Busbar Body & Branch Circuits */}
              <div
                style={{
                  position: "relative",
                  margin: "0 0.5rem",
                  padding: "0.6rem 0.75rem",
                  background: "rgba(15, 23, 42, 0.7)",
                  borderLeft: "4px solid #f59e0b",
                  borderRight: "4px solid #f59e0b",
                  borderRadius: "4px",
                  marginBottom: "0.6rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.74rem", color: "#f59e0b", fontWeight: 600 }}>
                    Copper / Aluminum Busbar: {busbarRating} A Ampacity
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                    120% Rule Ceiling: {busLimit120.toFixed(0)} A
                  </span>
                </div>

                {/* Simulated Branch Breaker Rows */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem", opacity: 0.7 }}>
                  <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "0.25rem 0.5rem", borderRadius: "3px", fontSize: "0.68rem", color: "#94a3b8" }}>
                    Breaker Slot 1/3 (HVAC / Range)
                  </div>
                  <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "0.25rem 0.5rem", borderRadius: "3px", fontSize: "0.68rem", color: "#94a3b8" }}>
                    Breaker Slot 2/4 (Dryer / EVSE)
                  </div>
                  <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "0.25rem 0.5rem", borderRadius: "3px", fontSize: "0.68rem", color: "#94a3b8" }}>
                    Breaker Slot 5/7 (Lighting / Plugs)
                  </div>
                  <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "0.25rem 0.5rem", borderRadius: "3px", fontSize: "0.68rem", color: "#94a3b8" }}>
                    Breaker Slot 6/8 (Kitchen / Laundry)
                  </div>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.68rem", color: "#64748b", marginTop: "0.4rem" }}>
                  ↕ Load current distributed along bus (opposing currents prevent midpoint overload)
                </div>
              </div>

              {/* Solar / Battery Backfeed Breaker (Bottom / Opposite End) */}
              <div
                style={{
                  border: remainingBusAllowance > 0 ? "2px solid #38bdf8" : "2px dashed #ef4444",
                  background: remainingBusAllowance > 0 ? "rgba(56, 189, 248, 0.12)" : "rgba(239, 68, 68, 0.12)",
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.7rem", color: remainingBusAllowance > 0 ? "#38bdf8" : "#fca5a5", textTransform: "uppercase", fontWeight: 700 }}>
                    Dedicated Source Backfeed (Opposite End)
                  </div>
                  <strong style={{ fontSize: "0.95rem", color: remainingBusAllowance > 0 ? "#f8fafc" : "#fca5a5" }}>
                    {remainingBusAllowance > 0
                      ? `Max ${exampleSourceOcpd || remainingBusAllowance}A Example OCPD (${maxContinuousSourceCurrent.toFixed(1)}A Inverter Continuous)`
                      : "0A Backfeed Allowed (Requires Main Derate)"}
                  </strong>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    background: remainingBusAllowance > 0 ? "#0284c7" : "#dc2626",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {remainingBusAllowance > 0 ? "Solar / ESS Inflow ↑" : "Locked ⛔"}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.73rem", color: "var(--muted)", margin: "0.5rem 0 0", lineHeight: 1.35 }}>
              <strong>Why opposite-end placement is mandatory:</strong> Placing the solar/battery breaker at the opposite end from the main service breaker ensures that loads draw current from both ends simultaneously, preventing any segment of the busbar conductor from carrying more current than its rated ampacity.
            </p>
          </div>

          {/* Planned Inverter Evaluation Result */}
          {hasPlannedInput && (
            <div
              style={{
                borderRadius: "8px",
                padding: "0.85rem 1rem",
                border: isWithinCalculationModel ? "1px solid rgba(74, 222, 128, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                background: isWithinCalculationModel ? "rgba(74, 222, 128, 0.08)" : "rgba(239, 68, 68, 0.08)",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <span style={{ fontSize: "1rem" }}>{isWithinCalculationModel ? "✅" : "⚠️"}</span>
                <strong style={{ fontSize: "0.9rem", color: isWithinCalculationModel ? "#4ade80" : "#fca5a5" }}>
                  {isWithinCalculationModel
                    ? "Within this 705.12 calculation model"
                    : "Exceeds this 705.12 calculation model"}
                </strong>
              </div>
              <p style={{ fontSize: "0.82rem", margin: 0, color: "var(--foreground)", lineHeight: 1.4 }}>
                {isWithinCalculationModel ? (
                  <>
                    Planned output of <strong>{plannedSourceKw.toFixed(2)} kW ({plannedSourceCurrentA.toFixed(1)} A continuous)</strong> is
                    within the calculated busbar ceiling of <strong>{maxContinuousSourceCurrent.toFixed(1)} A ({maxContinuousAcPowerKw.toFixed(2)} kW)</strong>.
                  </>
                ) : (
                  <>
                    Planned output of <strong>{plannedSourceKw.toFixed(2)} kW ({plannedSourceCurrentA.toFixed(1)} A)</strong> exceeds
                    the allowance of <strong>{maxContinuousSourceCurrent.toFixed(1)} A</strong> by{" "}
                    <strong style={{ color: "#fca5a5" }}>+{shortfallCurrentA.toFixed(1)} A (+{shortfallPowerKw.toFixed(2)} kW)</strong>.
                    Possible alternative pathways: (1) Main-OCPD reduction with an NEC 220 load calculation, (2) Supply-side
                    interconnection (NEC 705.11), or (3) Power Control System (NEC 705.13).
                  </>
                )}
              </p>
            </div>
          )}

          {/* Derate Simulator Toggle */}
          <button
            type="button"
            onClick={() => setShowDerateSimulator(!showDerateSimulator)}
            style={{
              width: "100%",
              padding: "0.55rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--background)",
              color: "var(--foreground)",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {showDerateSimulator ? "▲ Hide Main-Breaker Derate Simulator" : "▼ Simulate Main-Breaker Derate Scenarios"}
          </button>
        </div>
      </div>

      {/* Main-Breaker Derate Comparison Sub-Panel */}
      {showDerateSimulator && (
        <div
          style={{
            marginTop: "1.25rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "1.25rem",
          }}
        >
          <h4 style={{ fontSize: "1rem", margin: "0 0 0.5rem" }}>
            Illustrative Capacity Impact of a Reduced Main OCPD
          </h4>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.4 }}>
            Derating the main supply breaker frees calculation capacity on the busbar by lowering the primary feed
            amperage. Any main-OCPD reduction requires an NEC Article 220 dwelling load calculation to ensure the reduced
            main breaker can safely carry all household electrical loads.
          </p>

          {derateOptions.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "0.84rem", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                    <th style={{ padding: "0.5rem" }}>Derated Main OCPD</th>
                    <th style={{ padding: "0.5rem" }}>Bus Allowance</th>
                    <th style={{ padding: "0.5rem" }}>Max Continuous Current</th>
                    <th style={{ padding: "0.5rem" }}>Illustrative OCPD Ceiling</th>
                    <th style={{ padding: "0.5rem" }}>Max AC Output (@ 240V)</th>
                    <th style={{ padding: "0.5rem" }}>Capacity Gain</th>
                    <th style={{ padding: "0.5rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {derateOptions.map((deratedMain) => {
                    const derAllowance = Math.max(0, busLimit120 - deratedMain);
                    const derContinuous = derAllowance / 1.25;
                    const derKw = (240 * derContinuous) / 1000;
                    const gainKw = derKw - (240 * maxContinuousSourceCurrent) / 1000;
                    const derEligible = STANDARD_OCPD_RATINGS.filter((r) => r <= derAllowance);
                    const derOcpd = derEligible.length > 0 ? derEligible[derEligible.length - 1] : null;

                    return (
                      <tr key={deratedMain} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "0.5rem", fontWeight: 600 }}>{deratedMain} A</td>
                        <td style={{ padding: "0.5rem" }}>{derAllowance.toFixed(0)} A</td>
                        <td style={{ padding: "0.5rem", color: "#4ade80" }}>{derContinuous.toFixed(1)} A</td>
                        <td style={{ padding: "0.5rem" }}>{derOcpd ? `${derOcpd} A` : "—"}</td>
                        <td style={{ padding: "0.5rem", fontWeight: 600 }}>{derKw.toFixed(2)} kW</td>
                        <td style={{ padding: "0.5rem", color: "#38bdf8" }}>+{gainKw.toFixed(2)} kW</td>
                        <td style={{ padding: "0.5rem" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setMainOcpd(deratedMain);
                              track("calculator_calculate", {
                                calculator_id: "nec-busbar-120-rule",
                                action: "apply_derate",
                                new_main: deratedMain,
                              });
                            }}
                            style={{
                              padding: "0.25rem 0.6rem",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                              border: "1px solid #38bdf8",
                              background: "rgba(56, 189, 248, 0.15)",
                              color: "#38bdf8",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            Apply {deratedMain}A
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: 0 }}>
              No lower standard main-OCPD ratings available for simulation based on current settings.
            </p>
          )}

          <div
            style={{
              marginTop: "0.85rem",
              padding: "0.6rem 0.85rem",
              borderRadius: "6px",
              background: "rgba(56, 189, 248, 0.05)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              fontSize: "0.78rem",
              color: "var(--muted)",
            }}
          >
            📋 <strong>Engineering Verification Requirement:</strong> Derating scenarios calculate theoretical busbar
            allowance only. Final main-OCPD reduction must be supported by formal NEC Article 220 load calculations, panel
            busbar listing, and AHJ approval.
          </div>
        </div>
      )}

      {/* Engineering Disclaimer Footer */}
      <Disclaimer variant="safety" style={{ marginTop: "1.25rem" }} />
    </div>
  );
}

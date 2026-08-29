"use client";

import { useEffect, useMemo, useState } from "react";
import { VOLTAGE_DROP_DEFAULTS, QUICK_VOLTAGE_DROP_PRESETS } from "@/data/voltage-drop-defaults";
import { WIRE_GAUGES } from "@/data/wire-gauges";
import { calculateVoltageDrop, type CircuitType, type ConductorMaterial, type VoltageDropResult } from "@/lib/calculators/voltage-drop/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";
import { VoltageDropVisualizer } from "@/components/calculator/voltage-drop-visualizer";

export function VoltageDropCalculator() {
  const [circuitType, setCircuitType] = useState<CircuitType>(VOLTAGE_DROP_DEFAULTS.circuitType);
  const [voltage, setVoltage] = useState<number>(VOLTAGE_DROP_DEFAULTS.voltage);
  const [currentAmps, setCurrentAmps] = useState<number>(VOLTAGE_DROP_DEFAULTS.currentAmps);
  const [distanceFeet, setDistanceFeet] = useState<number>(VOLTAGE_DROP_DEFAULTS.distanceFeet);
  const [distanceUnit, setDistanceUnit] = useState<"ft" | "m">("ft");
  const [conductorMaterial, setConductorMaterial] = useState<ConductorMaterial>(VOLTAGE_DROP_DEFAULTS.conductorMaterial);
  const [targetDropPercent, setTargetDropPercent] = useState<number>(VOLTAGE_DROP_DEFAULTS.targetDropPercent);
  const [selectedAwg, setSelectedAwg] = useState<string>("auto");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Normalized distance in feet for engine
  const normalizedDistanceFeet = distanceUnit === "m" ? distanceFeet * 3.28084 : distanceFeet;

  const [calculated, setCalculated] = useState<VoltageDropResult | null>(() => {
    try {
      return calculateVoltageDrop({
        circuitType: VOLTAGE_DROP_DEFAULTS.circuitType,
        voltage: VOLTAGE_DROP_DEFAULTS.voltage,
        currentAmps: VOLTAGE_DROP_DEFAULTS.currentAmps,
        distanceFeet: VOLTAGE_DROP_DEFAULTS.distanceFeet,
        conductorMaterial: VOLTAGE_DROP_DEFAULTS.conductorMaterial,
        targetMaxDropPercent: VOLTAGE_DROP_DEFAULTS.targetDropPercent,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "voltage-drop", category: "battery", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateVoltageDrop({
        circuitType,
        voltage,
        currentAmps,
        distanceFeet: normalizedDistanceFeet,
        conductorMaterial,
        targetMaxDropPercent: targetDropPercent,
        customAwg: selectedAwg !== "auto" ? selectedAwg : undefined,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "voltage-drop", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Invalid voltage drop input values."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(voltage));
    url.searchParams.set("a", String(currentAmps));
    url.searchParams.set("d", String(distanceFeet));
    url.searchParams.set("u", distanceUnit);
    url.searchParams.set("type", circuitType);
    return url.toString();
  };

  const getStatusColor = (status: "pass" | "marginal" | "fail") => {
    if (status === "pass") return "#10b981"; // emerald green
    if (status === "marginal") return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate Voltage Drop &amp; Wire Size</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Wiring Setups</span>
            <div className="preset-chips-row">
              {QUICK_VOLTAGE_DROP_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${voltage === p.voltage && currentAmps === p.current && distanceFeet === p.distanceFeet ? "active" : ""}`}
                  onClick={() => {
                    setVoltage(p.voltage);
                    setCurrentAmps(p.current);
                    setDistanceFeet(p.distanceFeet);
                    setDistanceUnit("ft");
                    setCircuitType(p.type);
                    setConductorMaterial(p.material);
                    setTargetDropPercent(p.targetDrop);
                    setSelectedAwg("auto");
                    try {
                      const res = calculateVoltageDrop({
                        circuitType: p.type,
                        voltage: p.voltage,
                        currentAmps: p.current,
                        distanceFeet: p.distanceFeet,
                        conductorMaterial: p.material,
                        targetMaxDropPercent: p.targetDrop,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "voltage-drop", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorTrustPill />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Circuit Specifications</legend>
              <div className="field-pair">
                <label htmlFor="vd-type">
                  Circuit Type
                  <select
                    id="vd-type"
                    value={circuitType}
                    onChange={(e) => {
                      setCircuitType(e.target.value as CircuitType);
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="dc">DC (Direct Current · 12V/24V/48V)</option>
                    <option value="ac_single_phase">AC Single Phase (120V/240V)</option>
                    <option value="ac_three_phase">AC 3-Phase (208V/480V)</option>
                  </select>
                </label>
                <label htmlFor="vd-voltage">
                  Nominal Voltage (V)
                  <input
                    id="vd-voltage"
                    type="number"
                    min="1"
                    step="any"
                    value={voltage}
                    onChange={(e) => {
                      setVoltage(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>

              <div className="field-pair">
                <label htmlFor="vd-current">
                  Load Current (Amps)
                  <input
                    id="vd-current"
                    type="number"
                    min="0.1"
                    step="any"
                    value={currentAmps}
                    onChange={(e) => {
                      setCurrentAmps(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
                <label htmlFor="vd-distance">
                  One-Way Distance
                  <span className="input-with-unit">
                    <input
                      id="vd-distance"
                      type="number"
                      min="1"
                      step="any"
                      value={distanceFeet}
                      onChange={(e) => {
                        setDistanceFeet(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                    <select
                      aria-label="Distance unit"
                      value={distanceUnit}
                      onChange={(e) => {
                        setDistanceUnit(e.target.value as "ft" | "m");
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="ft">Feet</option>
                      <option value="m">Meters</option>
                    </select>
                  </span>
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced settings &amp; wire selection
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Conductor Material &amp; Target Limits</legend>
                <div className="field-pair">
                  <label htmlFor="vd-material">
                    Conductor Material
                    <select
                      id="vd-material"
                      value={conductorMaterial}
                      onChange={(e) => {
                        setConductorMaterial(e.target.value as ConductorMaterial);
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="copper">Copper (Standard 75°C)</option>
                      <option value="aluminum">Aluminum (75°C)</option>
                    </select>
                  </label>
                  <label htmlFor="vd-target-drop">
                    Target Max Voltage Drop (%)
                    <select
                      id="vd-target-drop"
                      value={targetDropPercent}
                      onChange={(e) => {
                        setTargetDropPercent(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="1.5">1.5% (Critical Marine / Solar MPPT)</option>
                      <option value="2.0">2.0% (Inverter Cables / High Efficiency)</option>
                      <option value="3.0">3.0% (NEC Recommended Standard)</option>
                      <option value="5.0">5.0% (Max Allowable Branch Circuit)</option>
                    </select>
                  </label>
                </div>

                <div className="field-pair">
                  <label htmlFor="vd-select-awg">
                    Specific Wire Gauge to Test
                    <select
                      id="vd-select-awg"
                      value={selectedAwg}
                      onChange={(e) => {
                        setSelectedAwg(e.target.value);
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="auto">Auto-Select Best Gauge (Recommended)</option>
                      {WIRE_GAUGES.map((g) => (
                        <option key={g.awg} value={g.awg}>
                          {g.awg} ({g.metricMm2} mm² · {conductorMaterial === "aluminum" ? g.maxAmpacityAluminum75C : g.maxAmpacityCopper75C}A Max)
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>
            )}

            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Calculate Voltage Drop"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Electrical Wire Recommendation</p>
          {!calculated ? (
            <p>Enter your circuit specs to see wire recommendations.</p>
          ) : (
            <>
              <p className="result-lede">Recommended Minimum Conductor</p>
              <p className="result-value" style={{ color: getStatusColor(calculated.result.necComplianceStatus) }}>
                {calculated.result.recommendedGauge.awg}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {calculated.result.recommendedGauge.metricMm2} mm² Cross-Section · {calculated.result.conductorMaterial === "copper" ? "Copper" : "Aluminum"}
              </p>
              <StandardsBadge standards={["NEC 2023 Table 8", "IEEE Std 141", "NFPA 70"]} />

              {stale && <p className="warning">Inputs changed — recalculate to refresh results.</p>}

              <VoltageDropVisualizer
                systemVoltage={voltage}
                currentAmps={currentAmps}
                oneWayDistanceFeet={normalizedDistanceFeet}
                awgSize={calculated.result.recommendedGauge.awg}
                voltageDropVolts={calculated.result.voltageDropVolts}
                voltageDropPercent={calculated.result.voltageDropPercent}
                powerLossWatts={calculated.result.powerLostWatts}
              />

              <dl className="result-breakdown">
                <div>
                  <dt>Voltage at Load End</dt>
                  <dd>{calculated.result.endVoltage} V</dd>
                </div>
                <div>
                  <dt>Voltage Lost in Cable</dt>
                  <dd>{calculated.result.voltageDropVolts} V</dd>
                </div>
                <div>
                  <dt>Power Dissipated (Heat)</dt>
                  <dd>{calculated.result.powerLostWatts} W</dd>
                </div>
                <div>
                  <dt>Conductor Safe Ampacity</dt>
                  <dd>{calculated.result.conductorMaterial === "aluminum" ? calculated.result.recommendedGauge.maxAmpacityAluminum75C : calculated.result.recommendedGauge.maxAmpacityCopper75C} A</dd>
                </div>
              </dl>

              {/* Gauge Evaluation Matrix */}
              <section className="comparison" style={{ marginTop: "1.25rem" }}>
                <h3>Wire Gauge Comparison Table</h3>
                <div style={{ overflowX: "auto", fontSize: "0.85rem" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border-color, #cbd5e1)" }}>
                        <th style={{ padding: "0.5rem" }}>Gauge</th>
                        <th style={{ padding: "0.5rem" }}>Metric</th>
                        <th style={{ padding: "0.5rem" }}>Drop %</th>
                        <th style={{ padding: "0.5rem" }}>End Volts</th>
                        <th style={{ padding: "0.5rem" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculated.result.evaluations.slice(2, 11).map((ev) => (
                        <tr
                          key={ev.gauge.awg}
                          style={{
                            borderBottom: "1px solid var(--border-color, #e2e8f0)",
                            background: ev.gauge.awg === calculated.result.recommendedGauge.awg ? "rgba(16, 185, 129, 0.1)" : "transparent",
                            fontWeight: ev.gauge.awg === calculated.result.recommendedGauge.awg ? 700 : 400,
                          }}
                        >
                          <td style={{ padding: "0.4rem 0.5rem" }}>{ev.gauge.awg}</td>
                          <td style={{ padding: "0.4rem 0.5rem" }}>{ev.gauge.metricMm2} mm²</td>
                          <td style={{ padding: "0.4rem 0.5rem" }}>{ev.voltageDropPercent}%</td>
                          <td style={{ padding: "0.4rem 0.5rem" }}>{ev.endVoltage} V</td>
                          <td style={{ padding: "0.4rem 0.5rem" }}>
                            {!ev.isAmpacitySafe ? (
                              <span style={{ color: "#ef4444" }}>Overcurrent</span>
                            ) : ev.meetsTargetDrop ? (
                              <span style={{ color: "#10b981" }}>Pass</span>
                            ) : (
                              <span style={{ color: "#f59e0b" }}>High Drop</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <GooglePreferredBanner />

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && <MobileResultBar label="Recommended Wire Gauge" value={calculated.result.recommendedGauge.awg} targetId="calculator-result" />}
    </section>
  );
}

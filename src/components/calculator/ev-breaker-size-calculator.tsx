"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EV_BREAKER_DEFAULTS, QUICK_EV_BREAKER_PRESETS } from "@/data/ev-breaker-defaults";
import { calculateEvBreakerSize, type EvBreakerSizeResult } from "@/lib/calculators/ev-breaker-size/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

export function EvBreakerSizeCalculator() {
  const [chargingAmps, setChargingAmps] = useState<number>(EV_BREAKER_DEFAULTS.chargingAmps);
  const [voltage, setVoltage] = useState<240 | 208 | 120>(EV_BREAKER_DEFAULTS.voltage);
  const [conductorType, setConductorType] = useState<"thhn_conduit" | "romex_nmb">(EV_BREAKER_DEFAULTS.conductorType);
  const [distanceFeet, setDistanceFeet] = useState<number>(EV_BREAKER_DEFAULTS.distanceFeet);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<EvBreakerSizeResult | null>(() => {
    try {
      return calculateEvBreakerSize({
        chargingAmps: EV_BREAKER_DEFAULTS.chargingAmps,
        voltage: EV_BREAKER_DEFAULTS.voltage,
        conductorType: EV_BREAKER_DEFAULTS.conductorType,
        distanceFeet: EV_BREAKER_DEFAULTS.distanceFeet,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "ev-breaker-size", category: "ev", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateEvBreakerSize({
        chargingAmps,
        voltage,
        conductorType,
        distanceFeet,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "ev-breaker-size", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate breaker size."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("a", String(chargingAmps));
    url.searchParams.set("v", String(voltage));
    url.searchParams.set("type", conductorType);
    url.searchParams.set("d", String(distanceFeet));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate Breaker &amp; Wire Size for EV Charger</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Charger Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Charging Setups</span>
            <div className="preset-chips-row">
              {QUICK_EV_BREAKER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${chargingAmps === p.amps && conductorType === p.condType ? "active" : ""}`}
                  onClick={() => {
                    setChargingAmps(p.amps);
                    setVoltage(p.voltage);
                    setConductorType(p.condType);
                    setDistanceFeet(p.dist);
                    try {
                      const res = calculateEvBreakerSize({
                        chargingAmps: p.amps,
                        voltage: p.voltage,
                        conductorType: p.condType,
                        distanceFeet: p.dist,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "ev-breaker-size", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>EV Charger Continuous Amperage</legend>
              <div className="field-pair">
                <label htmlFor="evb-amps">
                  Charger Continuous Current (Amps)
                  <select
                    id="evb-amps"
                    value={chargingAmps}
                    onChange={(e) => {
                      setChargingAmps(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="16">16 Amps (3.8 kW · Level 2 Portable / Dedicated 20A)</option>
                    <option value="24">24 Amps (5.8 kW · 30A Dryer Plug / TT-30)</option>
                    <option value="32">32 Amps (7.7 kW · NEMA 14-50 Plug Standard)</option>
                    <option value="40">40 Amps (9.6 kW · Fast NEMA 14-50 Plug)</option>
                    <option value="48">48 Amps (11.5 kW · Maximum Hardwired Home Wallbox)</option>
                    <option value="80">80 Amps (19.2 kW · Ford Charge Station Pro / Commercial)</option>
                  </select>
                </label>

                <label htmlFor="evb-volt">
                  Electrical Service Voltage
                  <select
                    id="evb-volt"
                    value={voltage}
                    onChange={(e) => {
                      setVoltage(Number(e.target.value) as 240 | 208 | 120);
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="240">240 Volts AC (Standard Residential Split-Phase)</option>
                    <option value="208">208 Volts AC (Commercial / Multi-Family Condo 3-Phase)</option>
                    <option value="120">120 Volts AC (Level 1 Standard Outlet)</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>Wiring Method &amp; Conduit</legend>
              <div className="field-pair">
                <label htmlFor="evb-cond-type">
                  Cable / Conduit Installation Type
                  <select
                    id="evb-cond-type"
                    value={conductorType}
                    onChange={(e) => {
                      setConductorType(e.target.value as "thhn_conduit" | "romex_nmb");
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="thhn_conduit">THHN / THWN-2 Individual Wires in Conduit (75°C rated · Recommended)</option>
                    <option value="romex_nmb">Romex NM-B Non-Metallic Sheathed Cable (60°C rated)</option>
                  </select>
                </label>
                <label htmlFor="evb-distance">
                  One-Way Run Length (Feet)
                  <input
                    id="evb-distance"
                    type="number"
                    min="5"
                    max="300"
                    step="5"
                    value={distanceFeet}
                    onChange={(e) => {
                      setDistanceFeet(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Calculate Breaker & Wire Size"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Electrical Installation Sizing</p>
          {!calculated ? (
            <p>Select EV charger current to determine circuit breaker and wire gauge.</p>
          ) : (
            <>
              <p className="result-lede">Required Circuit Breaker Size</p>
              <p className="result-value" style={{ color: "#0284c7", fontSize: "1.7rem" }}>
                {calculated.result.recommendedBreakerType}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "1rem" }}>
                NEC 125% Continuous Duty Sizing ({calculated.result.chargingAmps}A Continuous Load)
              </p>

              {stale && <p className="warning">Inputs changed — recalculate to refresh specifications.</p>}

              {/* Charging Power & Speed Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Max Charging Power:</span>
                  <strong>{calculated.result.chargingPowerKw} kW</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Charging Speed Added:</span>
                  <strong style={{ color: "#10b981" }}>+{calculated.result.milesPerHourAdded} Miles / Hour</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
                  <span>Estimated Voltage Drop ({distanceFeet} ft):</span>
                  <span>{calculated.result.voltageDropPercentAtDistance}% (NEC Pass &lt; 3%)</span>
                </div>
              </div>

              {/* Contextual Wire Drop Handoff */}
              <div style={{ margin: "0.75rem 0 1rem", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)", fontSize: "0.84rem" }}>
                <span style={{ fontWeight: 700, color: "#8b5cf6" }}>🚗 Long Run Wire Sizing: </span>
                <span>Installing over 50 ft from your subpanel? Verify line resistance with our </span>
                <Link href="/battery/voltage-drop-calculator" style={{ fontWeight: 700, color: "#8b5cf6", textDecoration: "underline" }}>
                  Voltage Drop Calculator →
                </Link>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Minimum Copper Wire Gauge</dt>
                  <dd><strong>{calculated.result.minimumWireGaugeAwg} Copper</strong></dd>
                </div>
                <div>
                  <dt>Wiring Insulation Rating</dt>
                  <dd>{calculated.result.conductorType === "thhn_conduit" ? "THHN 75°C in Conduit" : "Romex NM-B 60°C"}</dd>
                </div>
                <div>
                  <dt>Continuous Load Limit (80%)</dt>
                  <dd>{calculated.result.maxContinuousLoadAmps} Amps Max Continuous</dd>
                </div>
                <div>
                  <dt>Circuit Voltage</dt>
                  <dd>{calculated.result.supplyVoltage} V AC</dd>
                </div>
              </dl>

              <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && <MobileResultBar label="Required Breaker Size" value={`${calculated.result.recommendedBreakerAmps}A Double-Pole`} targetId="calculator-result" />}
    </section>
  );
}

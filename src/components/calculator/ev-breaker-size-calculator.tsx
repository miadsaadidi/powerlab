"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EV_BREAKER_DEFAULTS, QUICK_EV_BREAKER_PRESETS } from "@/data/ev-breaker-defaults";
import { calculateEvBreakerSize, type EvBreakerSizeResult } from "@/lib/calculators/ev-breaker-size/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";
import { QuickReferenceTable } from "@/components/seo/quick-reference-table";
import { CalculationWalkthrough } from "@/components/seo/calculation-walkthrough";

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

          <CalculatorTrustPill />

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
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                NEC 125% Continuous Duty Sizing ({calculated.result.chargingAmps}A Continuous Load)
              </p>
              <StandardsBadge standards={["NEC 2023 Art. 625.42", "NEC 210.19(A)", "SAE J1772"]} />

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

              <GooglePreferredBanner />

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Quick Reference Sizing Matrix (Google Position 0 Table Snippet Magnet) */}
      <QuickReferenceTable
        title="EV Charger Circuit Breaker & Wire Sizing Matrix (240V Level 2)"
        subtitle="National Electrical Code (NEC 625.42) 125% continuous load requirements and standard wire gauge allocations."
        columns={[
          { key: "charger", header: "EV Charger Type", isPrimary: true },
          { key: "amps", header: "Continuous Amps", align: "center" },
          { key: "breaker", header: "Minimum Breaker", align: "center" },
          { key: "thhn", header: "THHN Conduit (75°C)", align: "center" },
          { key: "romex", header: "Romex NM-B (60°C)", align: "center" },
          { key: "power", header: "Power (kW / mph)", align: "right" },
        ]}
        rows={[
          { charger: "12A Level 1 (Standard 120V)", amps: "12 A", breaker: "15A (1-Pole)", thhn: "14 AWG", romex: "14 AWG", power: "1.4 kW (~4 mph)" },
          { charger: "16A Level 2 (20A Circuit)", amps: "16 A", breaker: "20A (2-Pole)", thhn: "12 AWG", romex: "12 AWG", power: "3.8 kW (~14 mph)" },
          { charger: "24A Level 2 (Dryer NEMA 10-30)", amps: "24 A", breaker: "30A (2-Pole)", thhn: "10 AWG", romex: "10 AWG", power: "5.8 kW (~22 mph)" },
          { charger: "32A Level 2 (NEMA 14-50 Plug)", amps: "32 A", breaker: "40A (2-Pole)", thhn: "8 AWG", romex: "8 AWG", power: "7.7 kW (~30 mph)" },
          { charger: "40A Level 2 (NEMA 14-50 Max)", amps: "40 A", breaker: "50A (2-Pole)", thhn: "8 AWG", romex: "6 AWG", power: "9.6 kW (~38 mph)", isHighlighted: true, badge: "Most Popular" },
          { charger: "48A Level 2 (Hardwired Wallbox)", amps: "48 A", breaker: "60A (2-Pole)", thhn: "6 AWG", romex: "4 AWG", power: "11.5 kW (~44 mph)", isHighlighted: true, badge: "Best Hardwire" },
          { charger: "80A Level 2 (Commercial / Dual)", amps: "80 A", breaker: "100A (2-Pole)", thhn: "3 AWG", romex: "1 AWG", power: "19.2 kW (~60 mph)" },
        ]}
        footerNote="Romex NM-B must be sized using the 60°C ampacity column (NEC 334.80). THHN in conduit uses the 75°C column."
        standardReference="NFPA 70 (NEC Article 625.42 & Table 310.16)"
      />

      {/* Step-by-Step Engineering Calculation Walkthrough */}
      <CalculationWalkthrough
        calculatorName="EV Charger Breaker & Wire Size"
        overview="How to determine electrical branch circuit specifications for Level 2 EVSE following the National Electrical Code."
        steps={[
          {
            stepNumber: 1,
            title: "Determine EVSE Continuous Current Draw",
            description: "Identify the vehicle's onboard AC charger maximum acceptance amperage (e.g., 32A, 40A, 48A) or the configurable current limit of your charging station.",
            formula: "P_{\\text{kW}} = \\frac{V \\times I_{\\text{charging}}}{1000}",
            exampleValue: "A 48-Amp Level 2 charger at 240 Volts delivers 11.52 kW of continuous charging power.",
          },
          {
            stepNumber: 2,
            title: "Apply NEC 625.42 125% Continuous Load Multiplier",
            description: "Because EV charging operates continuously for 3+ hours, branch circuit overcurrent protection devices (OCPD) must be sized for at least 125% of the continuous charging current.",
            formula: "I_{\\text{breaker,min}} = I_{\\text{continuous}} \\times 1.25",
            exampleValue: "48A continuous draw × 1.25 = 60A. Select a standard 60-Amp double-pole circuit breaker.",
          },
          {
            stepNumber: 3,
            title: "Select Conductor Gauge from NEC Table 310.16",
            description: "Match conductor ampacity to the breaker size while respecting temperature limits (60°C for Romex NM-B; 75°C for THHN in conduit).",
            formula: "\\text{Ampacity}_{\\text{conductor}} \\ge I_{\\text{breaker,rating}}",
            exampleValue: "For a 60A breaker: THHN in conduit requires 6 AWG copper (65A rated at 75°C); Romex NM-B requires 4 AWG copper (70A rated at 60°C).",
          },
        ]}
        standardCitation="NFPA 70 (NEC 2023/2026 Article 625 & 310)"
      />

      {calculated && <MobileResultBar label="Required Breaker Size" value={`${calculated.result.recommendedBreakerAmps}A Double-Pole`} targetId="calculator-result" />}
    </section>
  );
}

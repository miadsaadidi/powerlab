"use client";

import { useEffect, useState } from "react";
import { SOLAR_PAYBACK_DEFAULTS, QUICK_PAYBACK_PRESETS } from "@/data/solar-payback-defaults";
import { calculateSolarPayback, type SolarPaybackResult } from "@/lib/calculators/solar-payback/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";
import { RegionalClimateSelector } from "@/components/calculator/regional-climate-selector";
import type { RegionalClimateData } from "@/data/regional-climate-solar-data";

export function SolarPaybackCalculator() {
  const [grossCost, setGrossCost] = useState<number>(SOLAR_PAYBACK_DEFAULTS.grossCost);
  const [incentivePercent, setIncentivePercent] = useState<number>(SOLAR_PAYBACK_DEFAULTS.incentivePercent);
  const [annualProductionKwh, setAnnualProductionKwh] = useState<number>(SOLAR_PAYBACK_DEFAULTS.annualProductionKwh);
  const [electricityRate, setElectricityRate] = useState<number>(SOLAR_PAYBACK_DEFAULTS.electricityRate);
  
  // Advanced Assumptions
  const [utilityInflation, setUtilityInflation] = useState<number>(SOLAR_PAYBACK_DEFAULTS.utilityInflationPercent);
  const [panelDegradation, setPanelDegradation] = useState<number>(SOLAR_PAYBACK_DEFAULTS.panelDegradationPercent);
  const [inverterReplacementCost, setInverterReplacementCost] = useState<number>(SOLAR_PAYBACK_DEFAULTS.inverterReplacementCost);
  const [inverterReplacementYear, setInverterReplacementYear] = useState<number>(SOLAR_PAYBACK_DEFAULTS.inverterReplacementYear);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<SolarPaybackResult | null>(() => {
    try {
      return calculateSolarPayback({
        grossCost: SOLAR_PAYBACK_DEFAULTS.grossCost,
        incentivePercent: SOLAR_PAYBACK_DEFAULTS.incentivePercent,
        annualProductionKwh: SOLAR_PAYBACK_DEFAULTS.annualProductionKwh,
        electricityRate: SOLAR_PAYBACK_DEFAULTS.electricityRate,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "solar-payback", category: "solar", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateSolarPayback({
        grossCost,
        incentivePercent,
        annualProductionKwh,
        electricityRate,
        utilityInflationPercent: utilityInflation,
        panelDegradationPercent: panelDegradation,
        inverterReplacementCost,
        inverterReplacementYear,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "solar-payback", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate solar payback period."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("cost", String(grossCost));
    url.searchParams.set("yield", String(annualProductionKwh));
    url.searchParams.set("rate", String(electricityRate));
    url.searchParams.set("itc", String(incentivePercent));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate Solar Break-Even &amp; 25-Year ROI</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Sizing Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Solar Systems</span>
            <div className="preset-chips-row">
              {QUICK_PAYBACK_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${grossCost === p.grossCost && annualProductionKwh === p.annualKwh ? "active" : ""}`}
                  onClick={() => {
                    setGrossCost(p.grossCost);
                    setIncentivePercent(p.incentivePercent);
                    setAnnualProductionKwh(p.annualKwh);
                    setElectricityRate(p.rate);
                    try {
                      const res = calculateSolarPayback({
                        grossCost: p.grossCost,
                        incentivePercent: p.incentivePercent,
                        annualProductionKwh: p.annualKwh,
                        electricityRate: p.rate,
                        utilityInflationPercent: utilityInflation,
                        panelDegradationPercent: panelDegradation,
                        inverterReplacementCost,
                        inverterReplacementYear,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "solar-payback", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <RegionalClimateSelector
            applyTarget="solar"
            title="📍 Regional Solar Yield & EIA Electricity Rates"
            description="Select your state to load official NREL annual peak sun hours, calculated 8kW array kWh yield, and EIA utility rates."
            onSelectRegion={(region: RegionalClimateData) => {
              setElectricityRate(region.electricityRateKwh);
              // Annual production for standard 8kW system = 8kW * PSH * 365 * 0.84 derate
              const estimatedAnnualKwh = Math.round(8 * region.peakSunHours * 365 * 0.84);
              setAnnualProductionKwh(estimatedAnnualKwh);
              try {
                const res = calculateSolarPayback({
                  grossCost,
                  incentivePercent,
                  annualProductionKwh: estimatedAnnualKwh,
                  electricityRate: region.electricityRateKwh,
                  utilityInflationPercent: utilityInflation,
                  panelDegradationPercent: panelDegradation,
                  inverterReplacementCost,
                  inverterReplacementYear,
                });
                setCalculated(res);
                setStale(false);
                setError(null);
              } catch {
                if (calculated) setStale(true);
              }
              track("calculator_region_select", { calculator_id: "solar-payback", state: region.stateCode });
            }}
          />

          <CalculatorTrustPill />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>System Cost &amp; Tax Credits</legend>
              <div className="field-pair">
                <label htmlFor="sp-gross-cost">
                  Gross Installation Cost ($)
                  <input
                    id="sp-gross-cost"
                    type="number"
                    min="1000"
                    step="500"
                    value={grossCost}
                    onChange={(e) => {
                      setGrossCost(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
                <label htmlFor="sp-itc">
                  Incentives / Tax Credit (%)
                  <input
                    id="sp-itc"
                    type="number"
                    min="0"
                    max="100"
                    value={incentivePercent}
                    onChange={(e) => {
                      setIncentivePercent(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>Solar Production &amp; Utility Rates</legend>
              <div className="field-pair">
                <label htmlFor="sp-production">
                  Estimated Annual Solar Yield (kWh/yr)
                  <input
                    id="sp-production"
                    type="number"
                    min="500"
                    step="100"
                    value={annualProductionKwh}
                    onChange={(e) => {
                      setAnnualProductionKwh(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
                <label htmlFor="sp-rate">
                  Current Electricity Rate ($/kWh)
                  <input
                    id="sp-rate"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={electricityRate}
                    onChange={(e) => {
                      setElectricityRate(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced degradation &amp; inflation assumptions
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Economic &amp; Equipment Assumptions</legend>
                <div className="field-pair">
                  <label htmlFor="sp-inflation">
                    Utility Rate Annual Inflation (%)
                    <input
                      id="sp-inflation"
                      type="number"
                      min="0"
                      max="15"
                      step="0.5"
                      value={utilityInflation}
                      onChange={(e) => {
                        setUtilityInflation(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                  <label htmlFor="sp-degradation">
                    Panel Annual Degradation (%)
                    <input
                      id="sp-degradation"
                      type="number"
                      min="0"
                      max="3"
                      step="0.1"
                      value={panelDegradation}
                      onChange={(e) => {
                        setPanelDegradation(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                </div>

                <div className="field-pair">
                  <label htmlFor="sp-inverter-cost">
                    Inverter Replacement Cost ($)
                    <input
                      id="sp-inverter-cost"
                      type="number"
                      min="0"
                      step="100"
                      value={inverterReplacementCost}
                      onChange={(e) => {
                        setInverterReplacementCost(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                  <label htmlFor="sp-inverter-year">
                    Inverter Replacement Year
                    <input
                      id="sp-inverter-year"
                      type="number"
                      min="5"
                      max="24"
                      value={inverterReplacementYear}
                      onChange={(e) => {
                        setInverterReplacementYear(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
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
              {calculated ? "Recalculate" : "Calculate Solar Payback"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Financial Return Recommendation</p>
          {!calculated ? (
            <p>Enter your system specifications to see financial projections.</p>
          ) : (
            <>
              <p className="result-lede">Estimated Break-Even Payback Period</p>
              <p className="result-value" style={{ color: "#f59e0b" }}>
                {calculated.result.paybackYears.toFixed(1)} Years
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {Math.floor(calculated.result.paybackYears)} Years, {calculated.result.paybackMonths} Months
              </p>
              <StandardsBadge standards={["NREL SAM Financial Models", "IRS Section 25D ITC", "DSIRE Policy Metrics"]} />

              {stale && <p className="warning">Inputs changed — recalculate to refresh financial metrics.</p>}

              {/* 25-Year ROI Summary Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>25-Year Net Profit:</span>
                  <strong style={{ color: "#10b981", fontSize: "1.1rem" }}>+${calculated.result.lifetimeNetProfit.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Lifetime Return on Investment:</span>
                  <strong style={{ color: "#0284c7" }}>{calculated.result.roiPercent}% ROI</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Average Annual Savings:</span>
                  <strong>${calculated.result.annualAverageSavings.toLocaleString()} / year</strong>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Gross Installation Cost</dt>
                  <dd>${calculated.result.grossCost.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Tax Credit / Rebate Savings</dt>
                  <dd style={{ color: "#10b981" }}>-${calculated.result.taxCreditSavings.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Net Out-of-Pocket Cost</dt>
                  <dd><strong>${calculated.result.netSystemCost.toLocaleString()}</strong></dd>
                </div>
                <div>
                  <dt>25-Year Total Electric Savings</dt>
                  <dd>${calculated.result.lifetime25YearSavings.toLocaleString()}</dd>
                </div>
              </dl>

              {/* Cash Flow Timeline Table */}
              <section className="comparison" style={{ marginTop: "1.25rem" }}>
                <h3>25-Year Cash Flow Timeline</h3>
                <div style={{ overflowX: "auto", fontSize: "0.85rem", maxHeight: "250px" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border-color, #cbd5e1)" }}>
                        <th style={{ padding: "0.4rem" }}>Year</th>
                        <th style={{ padding: "0.4rem" }}>Rate</th>
                        <th style={{ padding: "0.4rem" }}>Savings</th>
                        <th style={{ padding: "0.4rem" }}>Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculated.result.yearlyCashFlows.map((row) => (
                        <tr
                          key={row.year}
                          style={{
                            borderBottom: "1px solid var(--border-color, #e2e8f0)",
                            background: row.cumulativeNetSavings >= calculated.result.netSystemCost && (row.year === Math.ceil(calculated.result.paybackYears)) ? "rgba(245, 158, 11, 0.15)" : "transparent",
                            fontWeight: row.cumulativeNetSavings >= calculated.result.netSystemCost && (row.year === Math.ceil(calculated.result.paybackYears)) ? 700 : 400,
                          }}
                        >
                          <td style={{ padding: "0.35rem 0.4rem" }}>Yr {row.year} {row.year === Math.ceil(calculated.result.paybackYears) && "🎯"}</td>
                          <td style={{ padding: "0.35rem 0.4rem" }}>${row.utilityRate.toFixed(2)}</td>
                          <td style={{ padding: "0.35rem 0.4rem" }}>${row.annualSavings.toLocaleString()}</td>
                          <td style={{ padding: "0.35rem 0.4rem", color: row.cumulativeNetSavings >= calculated.result.netSystemCost ? "#10b981" : "inherit" }}>
                            ${row.cumulativeNetSavings.toLocaleString()}
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

      {calculated && <MobileResultBar label="Solar Payback Period" value={`${calculated.result.paybackYears.toFixed(1)} Years`} targetId="calculator-result" />}
    </section>
  );
}

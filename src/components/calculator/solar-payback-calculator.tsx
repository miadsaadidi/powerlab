"use client";

import { useEffect, useState } from "react";
import { SOLAR_PAYBACK_DEFAULTS, QUICK_PAYBACK_PRESETS } from "@/data/solar-payback-defaults";
import { calculateSolarPayback, type SolarPaybackResult } from "@/lib/calculators/solar-payback/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
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
  const [annualOmCost, setAnnualOmCost] = useState<number>(SOLAR_PAYBACK_DEFAULTS.annualOmCost);
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
        annualOmCost,
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
    url.searchParams.set("inc", String(incentivePercent));
    url.searchParams.set("inf", String(utilityInflation));
    url.searchParams.set("deg", String(panelDegradation));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Estimate Solar Payback &amp; 25-Year Cash Flow</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Sizing Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Representative Solar Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_PAYBACK_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${grossCost === p.grossCost && annualProductionKwh === p.annualKwh && incentivePercent === p.incentivePercent ? "active" : ""}`}
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
                        annualOmCost,
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
            title="📍 Representative Regional Solar Resource Presets"
            description="Select your state to load representative solar resource estimates (daily Peak Sun Hours), modeled 8kW array yield, and representative EIA electricity-rate benchmarks."
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
                  annualOmCost,
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

          <div
            role="note"
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.45rem 0.65rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              background: "rgba(55, 94, 75, 0.06)",
              border: "1px solid rgba(55, 94, 75, 0.15)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--brand-strong, #264435)",
              marginBottom: "1rem",
              width: "fit-content",
              maxWidth: "100%",
              lineHeight: 1.3,
            }}
          >
            <span>Calculations run in your browser • No sign-up required</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>System Cost &amp; Incentives</legend>
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
                  Incentives / Rebate (%)
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
                  <small style={{ color: "var(--text-muted, #64748b)", fontSize: "0.74rem", display: "block", marginTop: "0.2rem" }}>
                    Default 0% for current installations (Section 25D expired for expenditures after Dec 31, 2025 unless extending legislation applies). Enter 30% for historical 2022–2025 scenario or applicable state/utility rebates.
                  </small>
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
                  Representative Utility Rate ($/kWh)
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
                  <small style={{ color: "var(--text-muted, #64748b)", fontSize: "0.74rem", display: "block", marginTop: "0.2rem" }}>
                    Representative EIA electricity-rate benchmark or enter your specific utility bill tariff.
                  </small>
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced degradation, O&amp;M &amp; inflation assumptions
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
                  <label htmlFor="sp-om-cost">
                    Annual O&amp;M Maintenance ($/yr)
                    <input
                      id="sp-om-cost"
                      type="number"
                      min="0"
                      step="25"
                      value={annualOmCost}
                      onChange={(e) => {
                        setAnnualOmCost(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
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
                </div>

                <div className="field-pair">
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
              {calculated ? "Recalculate Cash Flow" : "Estimate Solar Payback"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Financial Return Estimate</p>
          {!calculated ? (
            <p>Enter your system specifications to see financial projections.</p>
          ) : (
            <>
              <p className="result-lede">Estimated Break-Even Payback Period</p>
              <p className="result-value" style={{ color: "#f59e0b" }}>
                {calculated.result.isPaybackAchieved
                  ? `${calculated.result.paybackYears.toFixed(1)} Years`
                  : `> 25 Years`}
              </p>
              {calculated.result.isPaybackAchieved && (
                <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                  {Math.floor(calculated.result.paybackYears)} Years, {calculated.result.paybackMonths} Months
                </p>
              )}

              <p style={{ fontSize: "0.78rem", color: "var(--text-muted, #64748b)", margin: "0.25rem 0 0.75rem", fontStyle: "italic" }}>
                Model basis: simplified avoided-cost valuation of solar generation.
              </p>

              {stale && <p className="warning">Inputs changed — recalculate to refresh financial metrics.</p>}

              {/* 25-Year Cumulative Cash Flow Summary Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>25-Year Cumulative Net Benefit:</span>
                  <strong style={{ color: calculated.result.lifetimeNetProfit >= 0 ? "#10b981" : "#ef4444", fontSize: "1.05rem" }}>
                    {calculated.result.lifetimeNetProfit >= 0 ? "+" : ""}${calculated.result.lifetimeNetProfit.toLocaleString()}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>25-Year Simple ROI:</span>
                  <strong style={{ color: "#0284c7" }}>{calculated.result.roiPercent}%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Average Annual Avoided Cost:</span>
                  <strong>${calculated.result.annualAverageSavings.toLocaleString()} / year</strong>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Gross Installation Cost</dt>
                  <dd>${calculated.result.grossCost.toLocaleString()}</dd>
                </div>
                {calculated.result.taxCreditSavings > 0 ? (
                  <div>
                    <dt>Applied Incentive / Credit ({calculated.result.incentivePercent}%)</dt>
                    <dd style={{ color: "#10b981" }}>-${calculated.result.taxCreditSavings.toLocaleString()}</dd>
                  </div>
                ) : (
                  <div>
                    <dt>Applied Incentive (2026 Default)</dt>
                    <dd>$0 (0% credit basis)</dd>
                  </div>
                )}
                <div>
                  <dt>Net Initial Capital Cost</dt>
                  <dd><strong>${calculated.result.netSystemCost.toLocaleString()}</strong></dd>
                </div>
                <div>
                  <dt>25-Year Cumulative Net Savings</dt>
                  <dd>${calculated.result.lifetime25YearSavings.toLocaleString()}</dd>
                </div>
              </dl>

              {/* Cash Flow Timeline Table */}
              <section className="comparison" style={{ marginTop: "1.25rem" }}>
                <h3>25-Year Cumulative Cash Flow Timeline</h3>
                <div style={{ overflowX: "auto", fontSize: "0.82rem", maxHeight: "250px" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border-color, #cbd5e1)" }}>
                        <th style={{ padding: "0.35rem" }}>Year</th>
                        <th style={{ padding: "0.35rem" }}>Rate</th>
                        <th style={{ padding: "0.35rem" }}>Avoided Cost</th>
                        <th style={{ padding: "0.35rem" }}>Net Cash Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculated.result.yearlyCashFlows.map((row) => (
                        <tr
                          key={row.year}
                          style={{
                            borderBottom: "1px solid var(--border-color, #e2e8f0)",
                            background: row.cumulativeCashFlow >= 0 && (row.year === Math.ceil(calculated.result.paybackYears)) ? "rgba(245, 158, 11, 0.15)" : "transparent",
                            fontWeight: row.cumulativeCashFlow >= 0 && (row.year === Math.ceil(calculated.result.paybackYears)) ? 700 : 400,
                          }}
                        >
                          <td style={{ padding: "0.35rem" }}>Yr {row.year} {row.year === Math.ceil(calculated.result.paybackYears) && "🎯"}</td>
                          <td style={{ padding: "0.35rem" }}>${row.utilityRate.toFixed(2)}</td>
                          <td style={{ padding: "0.35rem" }}>${row.grossAvoidedCost.toLocaleString()}</td>
                          <td style={{ padding: "0.35rem", color: row.cumulativeCashFlow >= 0 ? "#10b981" : "#64748b" }}>
                            {row.cumulativeCashFlow >= 0 ? "+" : ""}${row.cumulativeCashFlow.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && (
        <MobileResultBar
          label="Solar Payback Period"
          value={calculated.result.isPaybackAchieved ? `${calculated.result.paybackYears.toFixed(1)} Years` : `> 25 Years`}
          targetId="calculator-result"
        />
      )}
    </section>
  );
}


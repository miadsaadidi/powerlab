"use client";

import { useEffect, useState } from "react";
import { HEAT_PUMP_DEFAULTS, QUICK_HEAT_PUMP_PRESETS, type HeatingFuelType } from "@/data/heat-pump-defaults";
import { calculateHeatPumpCost, type HeatPumpCostResult } from "@/lib/calculators/heat-pump-cost/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

export function HeatPumpCostCalculator() {
  const [heatingDemandMmbtu, setHeatingDemandMmbtu] = useState<number>(HEAT_PUMP_DEFAULTS.annualHeatingDemandMmbtu);
  const [scop, setScop] = useState<number>(HEAT_PUMP_DEFAULTS.heatPumpScop);
  const [electricityRate, setElectricityRate] = useState<number>(HEAT_PUMP_DEFAULTS.electricityRate);
  const [existingFuel, setExistingFuel] = useState<HeatingFuelType>(HEAT_PUMP_DEFAULTS.existingFuelType);
  const [afue, setAfue] = useState<number>(HEAT_PUMP_DEFAULTS.furnaceAfuePercent);
  const [gasRate, setGasRate] = useState<number>(HEAT_PUMP_DEFAULTS.gasPricePerTherm);
  const [propaneRate, setPropaneRate] = useState<number>(HEAT_PUMP_DEFAULTS.propanePricePerGallon);
  const [oilRate, setOilRate] = useState<number>(HEAT_PUMP_DEFAULTS.oilPricePerGallon);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<HeatPumpCostResult | null>(() => {
    try {
      return calculateHeatPumpCost({
        annualHeatingDemandMmbtu: HEAT_PUMP_DEFAULTS.annualHeatingDemandMmbtu,
        heatPumpScop: HEAT_PUMP_DEFAULTS.heatPumpScop,
        electricityRate: HEAT_PUMP_DEFAULTS.electricityRate,
        existingFuelType: HEAT_PUMP_DEFAULTS.existingFuelType,
        furnaceAfuePercent: HEAT_PUMP_DEFAULTS.furnaceAfuePercent,
        gasPricePerTherm: HEAT_PUMP_DEFAULTS.gasPricePerTherm,
        propanePricePerGallon: HEAT_PUMP_DEFAULTS.propanePricePerGallon,
        oilPricePerGallon: HEAT_PUMP_DEFAULTS.oilPricePerGallon,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "heat-pump-cost", category: "home-energy", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateHeatPumpCost({
        annualHeatingDemandMmbtu: heatingDemandMmbtu,
        heatPumpScop: scop,
        electricityRate,
        existingFuelType: existingFuel,
        furnaceAfuePercent: afue,
        gasPricePerTherm: gasRate,
        propanePricePerGallon: propaneRate,
        oilPricePerGallon: oilRate,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "heat-pump-cost", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate heat pump comparison."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("mmbtu", String(heatingDemandMmbtu));
    url.searchParams.set("scop", String(scop));
    url.searchParams.set("fuel", existingFuel);
    url.searchParams.set("r", String(electricityRate));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Compare Heat Pump vs. Fossil Fuel Heating Costs</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Climate Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Heating Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_HEAT_PUMP_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${heatingDemandMmbtu === p.mmbtu && existingFuel === p.fuel ? "active" : ""}`}
                  onClick={() => {
                    setHeatingDemandMmbtu(p.mmbtu);
                    setScop(p.scop);
                    setExistingFuel(p.fuel);
                    setAfue(p.afue);
                    if (p.gasRate) setGasRate(p.gasRate);
                    if (p.propaneRate) setPropaneRate(p.propaneRate);
                    if (p.oilRate) setOilRate(p.oilRate);
                    setElectricityRate(p.elecrate);
                    try {
                      const res = calculateHeatPumpCost({
                        annualHeatingDemandMmbtu: p.mmbtu,
                        heatPumpScop: p.scop,
                        electricityRate: p.elecrate,
                        existingFuelType: p.fuel,
                        furnaceAfuePercent: p.afue,
                        gasPricePerTherm: p.gasRate || gasRate,
                        propanePricePerGallon: p.propaneRate || propaneRate,
                        oilPricePerGallon: p.oilRate || oilRate,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "heat-pump-cost", preset: p.label });
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
              <legend>Home Heating Demand &amp; Heat Pump Efficiency</legend>
              <div className="field-pair">
                <label htmlFor="hp-demand">
                  Annual Heating Demand
                  <select
                    id="hp-demand"
                    value={heatingDemandMmbtu}
                    onChange={(e) => {
                      setHeatingDemandMmbtu(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="30">30 MMBTU (Mild Sunbelt Home / Apartment)</option>
                    <option value="50">50 MMBTU (Average Suburban Home · 1,800 sq ft)</option>
                    <option value="70">70 MMBTU (Cold Northern Climate · 2,400 sq ft)</option>
                    <option value="90">90 MMBTU (Large Cold Homestead · 3,200+ sq ft)</option>
                  </select>
                </label>

                <label htmlFor="hp-scop">
                  Heat Pump Seasonal Efficiency (COP / HSPF2)
                  <select
                    id="hp-scop"
                    value={scop}
                    onChange={(e) => {
                      setScop(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="2.5">2.5 COP / 8.0 HSPF2 (Older / Very Cold Climate)</option>
                    <option value="3.0">3.0 COP / 8.8 HSPF2 (Standard Inverter Heat Pump)</option>
                    <option value="3.5">3.5 COP / 10.0 HSPF2 (High Efficiency Cold Climate)</option>
                    <option value="4.0">4.0+ COP / 12.0 HSPF2 (Ultra High-Efficiency Geothermal)</option>
                  </select>
                </label>
              </div>

              <div className="field-pair">
                <label htmlFor="hp-elec-rate">
                  Electricity Rate ($/kWh)
                  <input
                    id="hp-elec-rate"
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

            <fieldset className="input-group">
              <legend>Existing Heating System &amp; Fuel Price</legend>
              <div className="field-pair">
                <label htmlFor="hp-existing-fuel">
                  Current Heating Fuel
                  <select
                    id="hp-existing-fuel"
                    value={existingFuel}
                    onChange={(e) => {
                      setExistingFuel(e.target.value as HeatingFuelType);
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="natural_gas">Natural Gas (Utility NG)</option>
                    <option value="propane">Propane (LP Tank Delivery)</option>
                    <option value="heating_oil">Heating Oil (Fuel Oil #2)</option>
                    <option value="electric_baseboard">Electric Baseboard (100% Resistance)</option>
                  </select>
                </label>

                <label htmlFor="hp-afue">
                  Existing Furnace Efficiency (AFUE %)
                  <select
                    id="hp-afue"
                    value={afue}
                    onChange={(e) => {
                      setAfue(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="70">70% AFUE (Old Gravity / Atmospheric Furnace)</option>
                    <option value="80">80% AFUE (Standard Mid-Efficiency Furnace)</option>
                    <option value="96">96% AFUE (High-Efficiency Condensing Furnace)</option>
                  </select>
                </label>
              </div>

              {existingFuel === "natural_gas" && (
                <div className="field-pair">
                  <label htmlFor="hp-gas-rate">
                    Natural Gas Price ($/Therm)
                    <input
                      id="hp-gas-rate"
                      type="number"
                      min="0.10"
                      step="0.05"
                      value={gasRate}
                      onChange={(e) => {
                        setGasRate(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                </div>
              )}

              {existingFuel === "propane" && (
                <div className="field-pair">
                  <label htmlFor="hp-propane-rate">
                    Propane Price ($/Gallon)
                    <input
                      id="hp-propane-rate"
                      type="number"
                      min="0.50"
                      step="0.10"
                      value={propaneRate}
                      onChange={(e) => {
                        setPropaneRate(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                </div>
              )}

              {existingFuel === "heating_oil" && (
                <div className="field-pair">
                  <label htmlFor="hp-oil-rate">
                    Heating Oil Price ($/Gallon)
                    <input
                      id="hp-oil-rate"
                      type="number"
                      min="1.00"
                      step="0.10"
                      value={oilRate}
                      onChange={(e) => {
                        setOilRate(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                </div>
              )}
            </fieldset>

            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Compare Heating Costs"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Heating Fuel Comparison</p>
          {!calculated ? (
            <p>Enter heating specifications to compare annual operating costs.</p>
          ) : (
            <>
              <p className="result-lede">Annual Operating Cost Difference</p>
              <p className="result-value" style={{ color: calculated.result.isHeatPumpCheaper ? "#10b981" : "#f59e0b" }}>
                {calculated.result.isHeatPumpCheaper ? `Save $${calculated.result.annualCostDifference.toFixed(0)} / year` : `+$${Math.abs(calculated.result.annualCostDifference).toFixed(0)} / year`}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {calculated.result.isHeatPumpCheaper ? "🟢 Heat Pump is Cheaper to Run" : "🟡 Near Price Parity with Utility Gas"}
              </p>
              <StandardsBadge standards={["AHRI 210/240", "DOE 10 CFR 430", "ASHRAE 90.1"]} />

              {stale && <p className="warning">Inputs changed — recalculate to refresh cost breakdown.</p>}

              {/* Side by Side Cost Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span>Heat Pump Annual Cost:</span>
                  <strong style={{ color: "#0284c7" }}>${calculated.result.heatPumpAnnualCost.toFixed(0)} / yr</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span>Existing {calculated.result.existingFuelType.replace("_", " ").toUpperCase()} Cost:</span>
                  <strong>${calculated.result.existingSystemAnnualCost.toFixed(0)} / yr</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
                  <span>Break-Even Electric Rate:</span>
                  <span>${calculated.result.breakEvenElectricityRate.toFixed(2)} / kWh</span>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Heat Pump Electricity Used</dt>
                  <dd>{calculated.result.heatPumpTotalKwh.toLocaleString()} kWh / year</dd>
                </div>
                <div>
                  <dt>Fossil Fuel Consumed</dt>
                  <dd>{calculated.result.existingFuelUnitsConsumed.toLocaleString()} {calculated.result.existingFuelUnitLabel} / year</dd>
                </div>
                <div>
                  <dt>Heat Pump Efficiency</dt>
                  <dd>{scop * 100}% Delivered Thermal Yield</dd>
                </div>
                <div>
                  <dt>Annual Heating Demand</dt>
                  <dd>{calculated.result.annualHeatingDemandMmbtu} MMBTU (Delivered)</dd>
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

      {calculated && <MobileResultBar label="Heat Pump vs Gas Difference" value={calculated.result.isHeatPumpCheaper ? `Save $${calculated.result.annualCostDifference.toFixed(0)}/yr` : `+$${Math.abs(calculated.result.annualCostDifference).toFixed(0)}/yr`} targetId="calculator-result" />}
    </section>
  );
}

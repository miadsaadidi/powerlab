"use client";

import { useEffect, useState } from "react";
import { HEAT_PUMP_DEFAULTS, QUICK_HEAT_PUMP_PRESETS, type HeatingFuelType } from "@/data/heat-pump-defaults";
import { calculateHeatPumpCost, type HeatPumpCostResult } from "@/lib/calculators/heat-pump-cost/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";
import { RegionalClimateSelector } from "@/components/calculator/regional-climate-selector";
import type { RegionalClimateData } from "@/data/regional-climate-solar-data";

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

  const calculate = (
    demand = heatingDemandMmbtu,
    efficiency = scop,
    elec = electricityRate,
    fuel = existingFuel,
    af = afue,
    gas = gasRate,
    lp = propaneRate,
    oil = oilRate
  ) => {
    try {
      const res = calculateHeatPumpCost({
        annualHeatingDemandMmbtu: demand,
        heatPumpScop: efficiency,
        electricityRate: elec,
        existingFuelType: fuel,
        furnaceAfuePercent: af,
        gasPricePerTherm: gas,
        propanePricePerGallon: lp,
        oilPricePerGallon: oil,
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
          <h2 id="calculator-heading">Compare Heat Pump vs. Combustion Heating Costs</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Climate Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Illustrative Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_HEAT_PUMP_PRESETS.map((p) => {
                const isActive =
                  heatingDemandMmbtu === p.mmbtu &&
                  existingFuel === p.fuel &&
                  scop === p.scop &&
                  afue === p.afue;

                return (
                  <button
                    key={p.label}
                    type="button"
                    className={`preset-chip-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setHeatingDemandMmbtu(p.mmbtu);
                      setScop(p.scop);
                      setExistingFuel(p.fuel);
                      setAfue(p.afue);
                      const nextGas = p.gasRate || gasRate;
                      const nextLp = p.propaneRate || propaneRate;
                      const nextOil = p.oilRate || oilRate;
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
                          gasPricePerTherm: nextGas,
                          propanePricePerGallon: nextLp,
                          oilPricePerGallon: nextOil,
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
                );
              })}
            </div>
          </div>

          <RegionalClimateSelector
            applyTarget="hvac"
            title="📍 Regional Climate &amp; Reference Energy Rates"
            description="Select your state to load representative ASHRAE 99% winter design temperatures and illustrative EIA residential electricity rates."
            onSelectRegion={(region: RegionalClimateData) => {
              setElectricityRate(region.electricityRateKwh);
              const isCold = region.winterDesignTempF < 15;
              const isVeryCold = region.winterDesignTempF < 0;
              const nextMmbtu = isVeryCold ? 70 : isCold ? 50 : 30;
              const nextScop = isVeryCold ? 2.8 : isCold ? 3.0 : 3.5;
              setHeatingDemandMmbtu(nextMmbtu);
              setScop(nextScop);
              try {
                const res = calculateHeatPumpCost({
                  annualHeatingDemandMmbtu: nextMmbtu,
                  heatPumpScop: nextScop,
                  electricityRate: region.electricityRateKwh,
                  existingFuelType: existingFuel,
                  furnaceAfuePercent: afue,
                  gasPricePerTherm: gasRate,
                  propanePricePerGallon: propaneRate,
                  oilPricePerGallon: oilRate,
                });
                setCalculated(res);
                setStale(false);
                setError(null);
              } catch {
                if (calculated) setStale(true);
              }
              track("calculator_region_select", { calculator_id: "heat-pump-cost", state: region.stateCode });
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
              <legend>Heating Demand &amp; Heat Pump Seasonal Efficiency</legend>
              <div className="field-pair">
                <label htmlFor="hp-demand">
                  Annual Heating Demand Scenario
                  <select
                    id="hp-demand"
                    value={heatingDemandMmbtu}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setHeatingDemandMmbtu(val);
                      calculate(val, scop, electricityRate, existingFuel, afue, gasRate, propaneRate, oilRate);
                    }}
                  >
                    <option value="30">30 MMBTU (Mild Sunbelt Scenario)</option>
                    <option value="50">50 MMBTU (50 MMBTU Illustrative Demand Scenario)</option>
                    <option value="70">70 MMBTU (Cold Northern Scenario)</option>
                    <option value="90">90 MMBTU (Large Cold Homestead Scenario)</option>
                  </select>
                </label>

                <label htmlFor="hp-scop">
                  Heat Pump Seasonal Efficiency (COP)
                  <select
                    id="hp-scop"
                    value={scop}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setScop(val);
                      calculate(heatingDemandMmbtu, val, electricityRate, existingFuel, afue, gasRate, propaneRate, oilRate);
                    }}
                  >
                    <option value="2.5">2.5 COP (Simplified Seasonal COP · Approx. 8.0 HSPF2)</option>
                    <option value="2.8">2.8 COP (Simplified Seasonal COP · Cold-Climate Baseline)</option>
                    <option value="3.0">3.0 COP (Simplified Seasonal COP · Standard Inverter)</option>
                    <option value="3.2">3.2 COP (Simplified Seasonal COP · High Efficiency Inverter)</option>
                    <option value="3.5">3.5 COP (Simplified Seasonal COP · Cold-Climate Optimized)</option>
                    <option value="4.0">4.0 COP (Simplified Seasonal COP · Geothermal Tier)</option>
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
                    step="0.0001"
                    value={electricityRate}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setElectricityRate(val);
                      calculate(heatingDemandMmbtu, scop, val, existingFuel, afue, gasRate, propaneRate, oilRate);
                    }}
                  />
                </label>
              </div>
              <p style={{ fontSize: "0.76rem", color: "var(--text-muted, #64748b)", margin: "0.25rem 0 0 0", lineHeight: 1.4 }}>
                *Simplified seasonal COP used for planning. Actual operating COP varies with outdoor dry-bulb temperatures and auxiliary heat engagement.
              </p>
            </fieldset>

            <fieldset className="input-group">
              <legend>Baseline Heating System &amp; Fuel Price</legend>
              <div className="field-pair">
                <label htmlFor="hp-existing-fuel">
                  Current Heating Fuel
                  <select
                    id="hp-existing-fuel"
                    value={existingFuel}
                    onChange={(e) => {
                      const val = e.target.value as HeatingFuelType;
                      setExistingFuel(val);
                      calculate(heatingDemandMmbtu, scop, electricityRate, val, afue, gasRate, propaneRate, oilRate);
                    }}
                  >
                    <option value="natural_gas">Natural Gas (Utility NG · Therms)</option>
                    <option value="propane">Propane (LP Tank Delivery · Gallons)</option>
                    <option value="heating_oil">Heating Oil (Fuel Oil #2 · Gallons)</option>
                    <option value="electric_baseboard">Electric Resistance Baseboard (100% Resistance · kWh)</option>
                  </select>
                </label>

                <label htmlFor="hp-afue">
                  Existing Furnace Efficiency (AFUE %)
                  <select
                    id="hp-afue"
                    value={afue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAfue(val);
                      calculate(heatingDemandMmbtu, scop, electricityRate, existingFuel, val, gasRate, propaneRate, oilRate);
                    }}
                  >
                    <option value="70">70% AFUE (Older Atmospheric Furnace)</option>
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
                      step="0.01"
                      value={gasRate}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setGasRate(val);
                        calculate(heatingDemandMmbtu, scop, electricityRate, existingFuel, afue, val, propaneRate, oilRate);
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
                      step="0.05"
                      value={propaneRate}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPropaneRate(val);
                        calculate(heatingDemandMmbtu, scop, electricityRate, existingFuel, afue, gasRate, val, oilRate);
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
                      step="0.05"
                      value={oilRate}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setOilRate(val);
                        calculate(heatingDemandMmbtu, scop, electricityRate, existingFuel, afue, gasRate, propaneRate, val);
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
              <p className="result-lede">Estimated Annual Operating Cost Difference</p>
              <p className="result-value" style={{ color: calculated.result.isHeatPumpCheaper ? "#10b981" : "#f59e0b" }}>
                {calculated.result.isHeatPumpCheaper
                  ? `Save $${calculated.result.annualCostDifference.toFixed(0)} / year`
                  : `+$${Math.abs(calculated.result.annualCostDifference).toFixed(0)} / year`}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {calculated.result.isHeatPumpCheaper ? "🟢 Heat Pump Estimated Lower Annual Cost" : "🟡 Baseline Fuel Estimated Lower Annual Cost"}
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
                  <span>Baseline {calculated.result.existingFuelType.replace("_", " ").toUpperCase()} Cost:</span>
                  <strong>${calculated.result.existingSystemAnnualCost.toFixed(0)} / yr</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
                  <span>Estimated Break-Even Electric Rate:</span>
                  <span>
                    ${calculated.result.breakEvenElectricityRate.toFixed(3)} / kWh ({(calculated.result.breakEvenElectricityRate * 100).toFixed(1)}¢/kWh)
                  </span>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Heat Pump Electricity Used</dt>
                  <dd>{calculated.result.heatPumpTotalKwh.toLocaleString()} kWh / year</dd>
                </div>
                <div>
                  <dt>Baseline Fuel Consumed</dt>
                  <dd>
                    {calculated.result.existingFuelUnitsConsumed.toLocaleString()} {calculated.result.existingFuelUnitLabel} / year
                  </dd>
                </div>
                <div>
                  <dt>Heat Pump Efficiency</dt>
                  <dd>{scop} COP ({scop} units heat per 1 unit electricity)</dd>
                </div>
                <div>
                  <dt>Delivered Heat Demand</dt>
                  <dd>{calculated.result.annualHeatingDemandMmbtu} MMBTU / year</dd>
                </div>
              </dl>

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && (
        <MobileResultBar
          label="Heat Pump vs Fuel Difference"
          value={calculated.result.isHeatPumpCheaper ? `Save $${calculated.result.annualCostDifference.toFixed(0)}/yr` : `+$${Math.abs(calculated.result.annualCostDifference).toFixed(0)}/yr`}
          targetId="calculator-result"
        />
      )}
    </section>
  );
}


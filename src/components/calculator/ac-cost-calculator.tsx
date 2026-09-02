"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AC_COST_DEFAULTS, QUICK_AC_PRESETS } from "@/data/ac-defaults";
import { calculateAcCost, type AcCostResult } from "@/lib/calculators/ac-cost/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { RegionalClimateSelector } from "@/components/calculator/regional-climate-selector";
import type { RegionalClimateData } from "@/data/regional-climate-solar-data";

export function AcCostCalculator() {
  const [inputMode, setInputMode] = useState<"btu_seer" | "watts">(AC_COST_DEFAULTS.inputMode);
  const [coolingBtu, setCoolingBtu] = useState<number>(AC_COST_DEFAULTS.coolingCapacityBtu);
  const [seerRating, setSeerRating] = useState<number>(AC_COST_DEFAULTS.seer2Rating);
  const [nameplateWatts, setNameplateWatts] = useState<number>(AC_COST_DEFAULTS.nameplateWatts);
  const [dailyHours, setDailyHours] = useState<number>(AC_COST_DEFAULTS.dailyHours);
  const [dutyCycle, setDutyCycle] = useState<number>(AC_COST_DEFAULTS.compressorDutyCyclePercent);
  const [electricityRate, setElectricityRate] = useState<number>(AC_COST_DEFAULTS.electricityRate);
  const [seasonMonths, setSeasonMonths] = useState<number>(AC_COST_DEFAULTS.coolingSeasonMonths);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<AcCostResult | null>(() => {
    try {
      return calculateAcCost({
        inputMode: AC_COST_DEFAULTS.inputMode,
        coolingCapacityBtu: AC_COST_DEFAULTS.coolingCapacityBtu,
        seer2Rating: AC_COST_DEFAULTS.seer2Rating,
        nameplateWatts: AC_COST_DEFAULTS.nameplateWatts,
        dailyHours: AC_COST_DEFAULTS.dailyHours,
        compressorDutyCyclePercent: AC_COST_DEFAULTS.compressorDutyCyclePercent,
        electricityRate: AC_COST_DEFAULTS.electricityRate,
        coolingSeasonMonths: AC_COST_DEFAULTS.coolingSeasonMonths,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "ac-cost", category: "home-energy", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateAcCost({
        inputMode,
        coolingCapacityBtu: coolingBtu,
        seer2Rating: seerRating,
        nameplateWatts,
        dailyHours,
        compressorDutyCyclePercent: dutyCycle,
        electricityRate,
        coolingSeasonMonths: seasonMonths,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "ac-cost", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate air conditioner cost."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("mode", inputMode);
    url.searchParams.set("btu", String(coolingBtu));
    url.searchParams.set("seer", String(seerRating));
    url.searchParams.set("h", String(dailyHours));
    url.searchParams.set("r", String(electricityRate));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Estimate Air Conditioner Electricity Costs</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick AC Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 AC Types</span>
            <div className="preset-chips-row">
              {QUICK_AC_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${coolingBtu === p.btu && seerRating === p.seer ? "active" : ""}`}
                  onClick={() => {
                    setInputMode(p.mode);
                    setCoolingBtu(p.btu);
                    setSeerRating(p.seer);
                    setNameplateWatts(p.watts);
                    setDailyHours(p.hours);
                    setDutyCycle(p.duty);
                    try {
                      const res = calculateAcCost({
                        inputMode: p.mode,
                        coolingCapacityBtu: p.btu,
                        seer2Rating: p.seer,
                        nameplateWatts: p.watts,
                        dailyHours: p.hours,
                        compressorDutyCyclePercent: p.duty,
                        electricityRate,
                        coolingSeasonMonths: seasonMonths,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "ac-cost", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <RegionalClimateSelector
            applyTarget="hvac"
            title="📍 Regional ASHRAE Cooling Climate & EIA Rates"
            description="Select your state to load official ASHRAE 1% summer design temperatures, cooling season duration, and EIA grid rates."
            onSelectRegion={(region: RegionalClimateData) => {
              setElectricityRate(region.electricityRateKwh);
              // Set cooling season months based on climate zone & summer design temp
              const isHotSouth = region.summerDesignTempF > 94;
              const isModerate = region.summerDesignTempF >= 88;
              const nextMonths = isHotSouth ? 6 : isModerate ? 4 : 3;
              const nextHours = isHotSouth ? 10 : 8;
              setSeasonMonths(nextMonths);
              setDailyHours(nextHours);
              try {
                const res = calculateAcCost({
                  inputMode,
                  coolingCapacityBtu: coolingBtu,
                  seer2Rating: seerRating,
                  nameplateWatts,
                  dailyHours: nextHours,
                  compressorDutyCyclePercent: dutyCycle,
                  electricityRate: region.electricityRateKwh,
                  coolingSeasonMonths: nextMonths,
                });
                setCalculated(res);
                setStale(false);
                setError(null);
              } catch {
                if (calculated) setStale(true);
              }
              track("calculator_region_select", { calculator_id: "ac-cost", state: region.stateCode });
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
              <legend>Air Conditioner Sizing &amp; Mode</legend>
              <div className="field-pair">
                <label htmlFor="ac-mode">
                  Calculation Mode
                  <select
                    id="ac-mode"
                    value={inputMode}
                    onChange={(e) => {
                      setInputMode(e.target.value as "btu_seer" | "watts");
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="btu_seer">Cooling BTU &amp; SEER2 Rating (Recommended)</option>
                    <option value="watts">Direct Electric Power (Watts)</option>
                  </select>
                </label>

                {inputMode === "btu_seer" ? (
                  <label htmlFor="ac-btu">
                    Cooling Capacity (BTU/hr)
                    <select
                      id="ac-btu"
                      value={coolingBtu}
                      onChange={(e) => {
                        setCoolingBtu(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="5000">5,000 BTU (~150 sq ft Bedroom)</option>
                      <option value="8000">8,000 BTU (~350 sq ft Studio)</option>
                      <option value="10000">10,000 BTU (~450 sq ft Living Room)</option>
                      <option value="12000">12,000 BTU / 1.0 Ton (~550 sq ft)</option>
                      <option value="18000">18,000 BTU / 1.5 Ton Mini-Split</option>
                      <option value="24000">24,000 BTU / 2.0 Ton Central AC</option>
                      <option value="36000">36,000 BTU / 3.0 Ton Central AC</option>
                      <option value="48000">48,000 BTU / 4.0 Ton Central AC</option>
                      <option value="60000">60,000 BTU / 5.0 Ton Large Home</option>
                    </select>
                  </label>
                ) : (
                  <label htmlFor="ac-watts">
                    Nameplate Electric Power (Watts)
                    <input
                      id="ac-watts"
                      type="number"
                      min="100"
                      step="50"
                      value={nameplateWatts}
                      onChange={(e) => {
                        setNameplateWatts(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                )}
              </div>

              {inputMode === "btu_seer" && (
                <div className="field-pair">
                  <label htmlFor="ac-seer">
                    Efficiency Rating (SEER / SEER2 / CEER)
                    <select
                      id="ac-seer"
                      value={seerRating}
                      onChange={(e) => {
                        setSeerRating(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="10.0">10.0 SEER (Legacy 15+ yr old unit)</option>
                      <option value="12.0">12.0 CEER (Standard Window AC)</option>
                      <option value="13.4">13.4 SEER2 (Minimum standard prior to 2023)</option>
                      <option value="14.3">14.3 SEER2 (Modern Standard Central AC)</option>
                      <option value="16.0">16.0 SEER2 (High Efficiency)</option>
                      <option value="20.0">20.0 SEER2 (Inverter Ductless Mini-Split)</option>
                      <option value="24.0">24.0+ SEER2 (Ultra High Efficiency Heat Pump)</option>
                    </select>
                  </label>
                </div>
              )}
            </fieldset>

            <fieldset className="input-group">
              <legend>Usage Hours &amp; Electricity Price</legend>
              <div className="field-pair">
                <label htmlFor="ac-hours">
                  Daily Usage (Hours / Day)
                  <input
                    id="ac-hours"
                    type="number"
                    min="1"
                    max="24"
                    step="1"
                    value={dailyHours}
                    onChange={(e) => {
                      setDailyHours(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
                <label htmlFor="ac-rate">
                  Electricity Rate ($/kWh)
                  <input
                    id="ac-rate"
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
              {advancedOpen ? "Hide" : "Show"} advanced duty cycle &amp; seasonal settings
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Thermostat Cycling &amp; Season Length</legend>
                <div className="field-pair">
                  <label htmlFor="ac-duty">
                    Compressor Duty Cycle (%)
                    <select
                      id="ac-duty"
                      value={dutyCycle}
                      onChange={(e) => {
                        setDutyCycle(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="40">40% (Mild Weather / Moderate Shading)</option>
                      <option value="60">60% (Typical Summer Cycling)</option>
                      <option value="80">80% (Extreme Heat Wave / Peak Sun)</option>
                      <option value="100">100% (Continuous Full Blast / Undersized Unit)</option>
                    </select>
                  </label>
                  <label htmlFor="ac-season">
                    Cooling Season Duration
                    <select
                      id="ac-season"
                      value={seasonMonths}
                      onChange={(e) => {
                        setSeasonMonths(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="3">3 Months (June – August)</option>
                      <option value="4">4 Months (June – September · Standard)</option>
                      <option value="6">6 Months (May – October · Sunbelt)</option>
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
              {calculated ? "Recalculate" : "Calculate AC Running Cost"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Cooling Bill Impact</p>
          {!calculated ? (
            <p>Enter your AC specifications to estimate electricity costs.</p>
          ) : (
            <>
              <p className="result-lede">Estimated Monthly Cooling Cost</p>
              <p className="result-value" style={{ color: "#0284c7" }}>
                ${calculated.result.costPerMonth.toFixed(2)} / mo
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "1rem" }}>
                ${calculated.result.costPerHour.toFixed(2)} per hour · ${calculated.result.costPerDay.toFixed(2)} per day
              </p>

              {stale && <p className="warning">Inputs changed — recalculate to refresh cost breakdown.</p>}

              {/* Upgrade Savings Comparison Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Full Season Cooling Bill ({seasonMonths} mos):</span>
                  <strong>${calculated.result.costPerSeason.toFixed(2)}</strong>
                </div>
                {calculated.result.seasonalUpgradeSavings > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontWeight: 600 }}>
                    <span>Savings vs Older 10 SEER AC:</span>
                    <span>Save ${calculated.result.seasonalUpgradeSavings.toFixed(2)} / season</span>
                  </div>
                )}
              </div>

              {/* Next Step Engineering Handoff */}
              <div style={{ margin: "0.75rem 0 1rem", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", background: "rgba(2, 132, 199, 0.08)", border: "1px solid rgba(2, 132, 199, 0.2)", fontSize: "0.84rem" }}>
                <span style={{ fontWeight: 700, color: "#0284c7" }}>❄️ Year-Round Heating &amp; Cooling: </span>
                <span>Considering an inverter heat pump for winter and summer? Compare operating costs with our </span>
                <Link href="/home-energy/heat-pump-cost-calculator" style={{ fontWeight: 700, color: "#0284c7", textDecoration: "underline" }}>
                  Heat Pump Cost Calculator →
                </Link>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Effective Power Draw</dt>
                  <dd>{calculated.result.effectiveElectricalWatts.toLocaleString()} Watts</dd>
                </div>
                <div>
                  <dt>Average Electricity Consumption</dt>
                  <dd>{calculated.result.hourlyKwh} kWh / hour</dd>
                </div>
                <div>
                  <dt>Thermostat Run-Time Duty</dt>
                  <dd>{calculated.result.dutyCyclePercent}% active compressor time</dd>
                </div>
                <div>
                  <dt>Daily Operating Hours</dt>
                  <dd>{calculated.result.dailyOperatingHours} hours / day</dd>
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

      {calculated && <MobileResultBar label="Monthly AC Electricity Cost" value={`$${calculated.result.costPerMonth.toFixed(2)} / mo`} targetId="calculator-result" />}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AC_COST_DEFAULTS, QUICK_AC_PRESETS } from "@/data/ac-defaults";
import { calculateAcCost, type AcCostResult, type AcRatingType } from "@/lib/calculators/ac-cost/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { RegionalClimateSelector } from "@/components/calculator/regional-climate-selector";
import type { RegionalClimateData } from "@/data/regional-climate-solar-data";

export function AcCostCalculator() {
  const [inputMode, setInputMode] = useState<"btu_seer" | "watts">(AC_COST_DEFAULTS.inputMode);
  const [ratingType, setRatingType] = useState<AcRatingType>(AC_COST_DEFAULTS.ratingType);
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
        ratingType: AC_COST_DEFAULTS.ratingType,
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

  // Synchronous auto-calculation whenever any input state changes
  useEffect(() => {
    try {
      const res = calculateAcCost({
        inputMode,
        ratingType,
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
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate air conditioner cost."));
    }
  }, [inputMode, ratingType, coolingBtu, seerRating, nameplateWatts, dailyHours, dutyCycle, electricityRate, seasonMonths]);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("mode", inputMode);
    url.searchParams.set("btu", String(coolingBtu));
    url.searchParams.set("seer", String(seerRating));
    url.searchParams.set("w", String(nameplateWatts));
    url.searchParams.set("h", String(dailyHours));
    url.searchParams.set("d", String(dutyCycle));
    url.searchParams.set("r", String(electricityRate));
    url.searchParams.set("m", String(seasonMonths));
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
                  className={`preset-chip-btn ${coolingBtu === p.btu && seerRating === p.seer && inputMode === p.mode ? "active" : ""}`}
                  onClick={() => {
                    setInputMode(p.mode);
                    setRatingType(p.ratingType);
                    setCoolingBtu(p.btu);
                    setSeerRating(p.seer);
                    setNameplateWatts(p.watts);
                    setDailyHours(p.hours);
                    setDutyCycle(p.duty);
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
            title="📍 Regional ASHRAE Cooling Climate &amp; EIA Rates"
            description="Select your state to load representative ASHRAE summer design temperatures and EIA residential electricity-rate benchmarks."
            onSelectRegion={(region: RegionalClimateData) => {
              setElectricityRate(region.electricityRateKwh);
              const isHotSouth = region.summerDesignTempF > 94;
              const isModerate = region.summerDesignTempF >= 88;
              const nextMonths = isHotSouth ? 6 : isModerate ? 4 : 3;
              const nextHours = isHotSouth ? 10 : 8;
              setSeasonMonths(nextMonths);
              setDailyHours(nextHours);
              track("calculator_region_select", { calculator_id: "ac-cost", state: region.stateCode });
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
                    }}
                  >
                    <option value="btu_seer">Cooling Capacity &amp; Efficiency Rating (Seasonal / Planning)</option>
                    <option value="watts">Direct Electric Power (Nameplate / Active Watts)</option>
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
                    Nameplate / Measured Power (Watts)
                    <input
                      id="ac-watts"
                      type="number"
                      inputMode="decimal"
                      min="100"
                      step="50"
                      value={nameplateWatts}
                      onChange={(e) => {
                        setNameplateWatts(Number(e.target.value));
                      }}
                    />
                  </label>
                )}
              </div>

              {inputMode === "btu_seer" && (
                <div className="field-pair">
                  <label htmlFor="ac-seer">
                    Efficiency Metric &amp; Rating Value
                    <select
                      id="ac-seer"
                      value={String(seerRating)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSeerRating(val);
                        if (val === 11.0 || val === 12.0) {
                          setRatingType("CEER");
                        } else if (val === 9.5) {
                          setRatingType("SACC");
                        } else if (val === 10.0) {
                          setRatingType("SEER");
                        } else {
                          setRatingType("SEER2");
                        }
                      }}
                    >
                      <option value="10.0">10.0 SEER (Legacy Pre-2006 AC)</option>
                      <option value="11.0">11.0 CEER (Small Window Unit)</option>
                      <option value="12.0">12.0 CEER (Standard Window AC)</option>
                      <option value="9.5">9.5 SACC (Portable Room AC)</option>
                      <option value="13.4">13.4 SEER2 (DOE 2023 North Minimum)</option>
                      <option value="14.3">14.3 SEER2 (Modern Standard Central AC)</option>
                      <option value="15.0">15.0 SEER2 (South / SW Standard Central AC)</option>
                      <option value="16.0">16.0 SEER2 (High Efficiency Central AC)</option>
                      <option value="20.0">20.0 SEER2 (Inverter Ductless Mini-Split)</option>
                      <option value="24.0">24.0+ SEER2 (Ultra High Efficiency Inverter)</option>
                    </select>
                  </label>
                </div>
              )}
            </fieldset>

            <fieldset className="input-group">
              <legend>Usage Hours &amp; Electricity Price</legend>
              <div className="field-pair">
                <label htmlFor="ac-hours">
                  Daily Usage (Clock Hours / Day)
                  <input
                    id="ac-hours"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    max="24"
                    step="1"
                    value={dailyHours}
                    onChange={(e) => {
                      setDailyHours(Number(e.target.value));
                    }}
                  />
                </label>
                <label htmlFor="ac-rate">
                  Electricity Rate ($/kWh)
                  <input
                    id="ac-rate"
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    step="0.001"
                    value={electricityRate}
                    onChange={(e) => {
                      setElectricityRate(Number(e.target.value));
                    }}
                  />
                  <small style={{ color: "var(--text-muted, #64748b)", fontSize: "0.74rem", display: "block", marginTop: "0.2rem" }}>
                    Selected local electricity rate (EIA national benchmark: $0.1834/kWh).
                  </small>
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
                      }}
                    >
                      <option value="40">40% (Mild Weather / Moderate Shading)</option>
                      <option value="60">60% (Illustrative Summer Cycling Assumption)</option>
                      <option value="80">80% (Extreme Heat Wave / Peak Sun)</option>
                      <option value="100">100% (Continuous Active Run / Undersized Unit)</option>
                    </select>
                  </label>
                  <label htmlFor="ac-season">
                    Cooling Season Duration
                    <select
                      id="ac-season"
                      value={seasonMonths}
                      onChange={(e) => {
                        setSeasonMonths(Number(e.target.value));
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
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                ${calculated.result.costPerHour.toFixed(2)} / clock hour ({calculated.result.dutyCyclePercent}% duty) · ${calculated.result.costPerActiveHour.toFixed(2)} / active hour
              </p>

              <p style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)", margin: "0.25rem 0 0.85rem", fontStyle: "italic", lineHeight: 1.4 }}>
                Simplified planning estimate — actual input power varies with operating conditions and equipment rating.
              </p>

              {stale && <p className="warning">Inputs changed — recalculating cost breakdown...</p>}

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
                  <dt>Rated Electrical Input Power</dt>
                  <dd>{calculated.result.effectiveElectricalWatts.toLocaleString()} Watts ({calculated.result.activeHourKwh.toFixed(2)} kW)</dd>
                </div>
                <div>
                  <dt>Clock-Hour Energy Draw ({calculated.result.dutyCyclePercent}% duty)</dt>
                  <dd>{calculated.result.clockHourKwh} kWh / clock hour</dd>
                </div>
                <div>
                  <dt>Active-Hour Energy Draw (100% run)</dt>
                  <dd>{calculated.result.activeHourKwh} kWh / active hour</dd>
                </div>
                <div>
                  <dt>Daily Energy Consumption</dt>
                  <dd>{(calculated.result.clockHourKwh * calculated.result.dailyOperatingHours).toFixed(2)} kWh / day</dd>
                </div>
                <div>
                  <dt>Electricity Tariff Applied</dt>
                  <dd>${calculated.result.electricityRate.toFixed(4)} / kWh</dd>
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

      {calculated && <MobileResultBar label="Monthly AC Electricity Cost" value={`$${calculated.result.costPerMonth.toFixed(2)} / mo`} targetId="calculator-result" />}
    </section>
  );
}


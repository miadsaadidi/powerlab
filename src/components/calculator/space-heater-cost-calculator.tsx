"use client";

import { useEffect, useState } from "react";
import { SPACE_HEATER_DEFAULTS, QUICK_HEATER_PRESETS } from "@/data/space-heater-defaults";
import { calculateSpaceHeaterCost, type SpaceHeaterCostResult } from "@/lib/calculators/space-heater-cost/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

export function SpaceHeaterCostCalculator() {
  const [heaterWatts, setHeaterWatts] = useState<number>(SPACE_HEATER_DEFAULTS.heaterWatts);
  const [dailyHours, setDailyHours] = useState<number>(SPACE_HEATER_DEFAULTS.dailyHours);
  const [dutyCycle, setDutyCycle] = useState<number>(SPACE_HEATER_DEFAULTS.dutyCyclePercent);
  const [electricityRate, setElectricityRate] = useState<number>(SPACE_HEATER_DEFAULTS.electricityRate);
  const [winterMonths, setWinterMonths] = useState<number>(SPACE_HEATER_DEFAULTS.winterMonths);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<SpaceHeaterCostResult | null>(() => {
    try {
      return calculateSpaceHeaterCost({
        heaterWatts: SPACE_HEATER_DEFAULTS.heaterWatts,
        dailyHours: SPACE_HEATER_DEFAULTS.dailyHours,
        dutyCyclePercent: SPACE_HEATER_DEFAULTS.dutyCyclePercent,
        electricityRate: SPACE_HEATER_DEFAULTS.electricityRate,
        winterMonths: SPACE_HEATER_DEFAULTS.winterMonths,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "space-heater-cost", category: "home-energy", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateSpaceHeaterCost({
        heaterWatts,
        dailyHours,
        dutyCyclePercent: dutyCycle,
        electricityRate,
        winterMonths,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "space-heater-cost", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate space heater cost."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("w", String(heaterWatts));
    url.searchParams.set("h", String(dailyHours));
    url.searchParams.set("d", String(dutyCycle));
    url.searchParams.set("r", String(electricityRate));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate Space Heater Electric Bills</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Heater Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Heaters</span>
            <div className="preset-chips-row">
              {QUICK_HEATER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${heaterWatts === p.watts && dailyHours === p.hours ? "active" : ""}`}
                  onClick={() => {
                    setHeaterWatts(p.watts);
                    setDailyHours(p.hours);
                    setDutyCycle(p.duty);
                    try {
                      const res = calculateSpaceHeaterCost({
                        heaterWatts: p.watts,
                        dailyHours: p.hours,
                        dutyCyclePercent: p.duty,
                        electricityRate,
                        winterMonths,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "space-heater-cost", preset: p.label });
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
              <legend>Heater Power &amp; Wattage</legend>
              <div className="field-pair">
                <label htmlFor="sh-watts">
                  Heater Power Rating
                  <select
                    id="sh-watts"
                    value={heaterWatts}
                    onChange={(e) => {
                      setHeaterWatts(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="400">400 Watts (Low-Power Foot Warmer)</option>
                    <option value="500">500 Watts (Personal Under-Desk Heater)</option>
                    <option value="750">750 Watts (Low Setting / Nursery Heater)</option>
                    <option value="1000">1,000 Watts (Medium Setting / Small Room)</option>
                    <option value="1500">1,500 Watts (Standard Max Plug-in Heater)</option>
                    <option value="2000">2,000 Watts (Heavy European 230V Convector)</option>
                  </select>
                </label>

                <label htmlFor="sh-hours">
                  Daily Usage (Hours / Day)
                  <input
                    id="sh-hours"
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
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>Thermostat &amp; Electricity Price</legend>
              <div className="field-pair">
                <label htmlFor="sh-duty">
                  Thermostat Cycling Mode
                  <select
                    id="sh-duty"
                    value={dutyCycle}
                    onChange={(e) => {
                      setDutyCycle(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="50">50% (Well-Insulated Room / Mild Winter)</option>
                    <option value="70">70% (Typical Automatic Thermostat Cycling)</option>
                    <option value="85">85% (Drafty Room / Sub-Zero Outside)</option>
                    <option value="100">100% (Continuous On / High Full Blast)</option>
                  </select>
                </label>
                <label htmlFor="sh-rate">
                  Electricity Rate ($/kWh)
                  <input
                    id="sh-rate"
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
              {advancedOpen ? "Hide" : "Show"} advanced winter season duration
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Winter Heating Season</legend>
                <div className="field-pair">
                  <label htmlFor="sh-season">
                    Winter Duration (Months)
                    <select
                      id="sh-season"
                      value={winterMonths}
                      onChange={(e) => {
                        setWinterMonths(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="2">2 Months (Mild Winter)</option>
                      <option value="3">3 Months (Standard Winter)</option>
                      <option value="5">5 Months (Extended Northern Winter)</option>
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
              {calculated ? "Recalculate" : "Calculate Heater Cost"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Heating Bill Impact</p>
          {!calculated ? (
            <p>Enter heater specs to estimate electricity costs.</p>
          ) : (
            <>
              <p className="result-lede">Estimated Monthly Heating Cost</p>
              <p className="result-value" style={{ color: "#f59e0b" }}>
                ${calculated.result.costPerMonth.toFixed(2)} / mo
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                ${calculated.result.costPerHour.toFixed(2)} per hour · ${calculated.result.costPerNight8h.toFixed(2)} per 8-hr night
              </p>
              <StandardsBadge standards={["UL 1278", "DOE Energy Saver", "IEC 60335-2-30"]} />

              {stale && <p className="warning">Inputs changed — recalculate to refresh results.</p>}

              {/* Overnight & Seasonal Visual Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span>Overnight Sleep Cost (8 Hours):</span>
                  <strong style={{ color: "#0284c7" }}>${calculated.result.costPerNight8h.toFixed(2)} / night</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span>Full Winter Season ({winterMonths} mos):</span>
                  <strong>${calculated.result.costPerWinterSeason.toFixed(2)}</strong>
                </div>
                {calculated.result.thermostatSavingsPerMonth > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontWeight: 600 }}>
                    <span>Thermostat Cycling Savings:</span>
                    <span>Save ${calculated.result.thermostatSavingsPerMonth.toFixed(2)} / mo</span>
                  </div>
                )}
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Heater Rated Power</dt>
                  <dd>{calculated.result.heaterWatts.toLocaleString()} Watts</dd>
                </div>
                <div>
                  <dt>Effective Average Consumption</dt>
                  <dd>{calculated.result.effectiveHourlyKwh} kWh / hour</dd>
                </div>
                <div>
                  <dt>Thermostat Run-Time Duty</dt>
                  <dd>{calculated.result.dutyCyclePercent}% active heating element</dd>
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

      {calculated && <MobileResultBar label="Monthly Heater Electricity Cost" value={`$${calculated.result.costPerMonth.toFixed(2)} / mo`} targetId="calculator-result" />}
    </section>
  );
}

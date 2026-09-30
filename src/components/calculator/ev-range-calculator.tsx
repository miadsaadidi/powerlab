"use client";

import Link from "next/link";
import { useState } from "react";
import { EV_RANGE_DEFAULTS } from "@/data/ev-range-defaults";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { calculateEvRange, formatConsumptionValue, normalizeConsumption, type EvRangeConsumptionUnit, type EvRangeDistanceUnit, type EvRangeResult } from "@/lib/calculators/ev-range/engine";
import { track } from "@/lib/analytics/analytics";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";

const QUICK_EV_PRESETS = [
  { label: "🚗 Compact Class (50 kWh · 4.0 mi/kWh)", capacity: 50, consumption: 4.0, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "⚡ Standard Sedan Class (60 kWh · 3.8 mi/kWh)", capacity: 60, consumption: 3.8, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🚙 Crossover / SUV Class (77 kWh · 3.3 mi/kWh)", capacity: 77, consumption: 3.3, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🏎️ Performance Class (90 kWh · 2.9 mi/kWh)", capacity: 90, consumption: 2.9, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🛻 Large EV Truck Class (130 kWh · 2.1 mi/kWh)", capacity: 130, consumption: 2.1, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
];

const number = (value: number, digits = 2) => value.toLocaleString("en-US", { maximumFractionDigits: digits });

const unitLabel: Record<EvRangeConsumptionUnit, string> = {
  "kwh-per-100-km": "kWh/100 km",
  "wh-per-km": "Wh/km",
  "mi-per-kwh": "mi/kWh",
  "kwh-per-100-mi": "kWh/100 mi",
};

export function EvRangeCalculator() {
  const [capacity, setCapacity] = useState(String(EV_RANGE_DEFAULTS.batteryCapacityKWh));
  const [currentSoc, setCurrentSoc] = useState(String(EV_RANGE_DEFAULTS.currentSoc));
  const [reserveSoc, setReserveSoc] = useState(String(EV_RANGE_DEFAULTS.reserveSoc));
  const [health, setHealth] = useState(String(EV_RANGE_DEFAULTS.batteryHealth));
  const [consumption, setConsumption] = useState(String(EV_RANGE_DEFAULTS.consumption));
  const [consumptionUnit, setConsumptionUnit] = useState<EvRangeConsumptionUnit>(EV_RANGE_DEFAULTS.consumptionUnit);
  const [normalizedConsumption, setNormalizedConsumption] = useState(() => normalizeConsumption(EV_RANGE_DEFAULTS.consumption, EV_RANGE_DEFAULTS.consumptionUnit));
  const [distanceUnit, setDistanceUnit] = useState<EvRangeDistanceUnit>(EV_RANGE_DEFAULTS.distanceUnit);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [result, setResult] = useState<EvRangeResult | null>(() => {
    try {
      const norm = normalizeConsumption(EV_RANGE_DEFAULTS.consumption, EV_RANGE_DEFAULTS.consumptionUnit);
      return calculateEvRange({
        batteryCapacityKWh: EV_RANGE_DEFAULTS.batteryCapacityKWh,
        currentSoc: EV_RANGE_DEFAULTS.currentSoc,
        reserveSoc: EV_RANGE_DEFAULTS.reserveSoc,
        batteryHealth: EV_RANGE_DEFAULTS.batteryHealth,
        consumption: norm * 100,
        consumptionUnit: "kwh-per-100-km",
      });
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markStale = () => {
    if (result) setStale(true);
  };

  const updateConsumption = (value: string) => {
    setConsumption(value);
    const parsed = Number(value);
    setNormalizedConsumption(Number.isFinite(parsed) && parsed > 0 ? normalizeConsumption(parsed, consumptionUnit) : Number.NaN);
    markStale();
  };

  const changeConsumptionUnit = (nextUnit: EvRangeConsumptionUnit) => {
    setConsumptionUnit(nextUnit);
    if (Number.isFinite(normalizedConsumption) && normalizedConsumption > 0) {
      setConsumption(String(formatConsumptionValue(normalizedConsumption, nextUnit)));
    }
  };

  const calculate = () => {
    try {
      const next = calculateEvRange({
        batteryCapacityKWh: Number(capacity),
        currentSoc: Number(currentSoc),
        reserveSoc: Number(reserveSoc),
        batteryHealth: Number(health),
        consumption: normalizedConsumption * 100,
        consumptionUnit: "kwh-per-100-km",
      });
      setResult(next);
      setStale(false);
      setError(null);
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError.message : "Enter valid EV range inputs.");
      if (result) setStale(true);
    }
  };

  return (
    <section className="calculator" aria-labelledby="ev-range-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="ev-range-heading">Estimate EV range</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Vehicle Classes">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Classes</span>
            <div className="preset-chips-row">
              {QUICK_EV_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${capacity === String(sc.capacity) && consumption === String(sc.consumption) ? "active" : ""}`}
                  onClick={() => {
                    setCapacity(String(sc.capacity));
                    setConsumptionUnit(sc.unit);
                    setConsumption(String(sc.consumption));
                    const norm = normalizeConsumption(sc.consumption, sc.unit);
                    setNormalizedConsumption(norm);
                    try {
                      const next = calculateEvRange({
                        batteryCapacityKWh: sc.capacity,
                        currentSoc: Number(currentSoc),
                        reserveSoc: Number(reserveSoc),
                        batteryHealth: Number(health),
                        consumption: norm * 100,
                        consumptionUnit: "kwh-per-100-km",
                      });
                      setResult(next);
                      setStale(false);
                      setError(null);
                    } catch {
                      markStale();
                    }
                    track("calculator_preset_click", { calculator_id: "ev-range", preset: sc.label });
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorTrustPill />

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Battery and estimated consumption</legend>
              <label>
                Usable battery capacity (kWh)
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  inputMode="decimal"
                  value={capacity}
                  onChange={(event) => {
                    setCapacity(event.target.value);
                    markStale();
                  }}
                />
                <span className="form-hint">Usable net capacity when new (SOH derating is applied separately).</span>
              </label>
              <label>
                Current SOC (%)
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  inputMode="decimal"
                  value={currentSoc}
                  onChange={(event) => {
                    setCurrentSoc(event.target.value);
                    markStale();
                  }}
                />
              </label>
              <label>
                Estimated vehicle consumption
                <span className="input-with-unit">
                  <input
                    type="number"
                    min="0.0001"
                    step="any"
                    inputMode="decimal"
                    value={consumption}
                    onChange={(event) => updateConsumption(event.target.value)}
                  />
                  <select
                    aria-label="Consumption unit"
                    value={consumptionUnit}
                    onChange={(event) => changeConsumptionUnit(event.target.value as EvRangeConsumptionUnit)}
                  >
                    {Object.entries(unitLabel).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </span>
                <span className="form-hint">Estimated vehicle consumption (battery-side energy consumed per distance).</span>
              </label>
            </fieldset>
            <fieldset className="input-group">
              <legend>Result display</legend>
              <label>
                Primary distance unit
                <select value={distanceUnit} onChange={(event) => setDistanceUnit(event.target.value as EvRangeDistanceUnit)}>
                  <option value="mi">Miles (mi)</option>
                  <option value="km">Kilometers (km)</option>
                </select>
              </label>
            </fieldset>
            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>
            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <label>
                  Reserve SOC buffer (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    inputMode="decimal"
                    value={reserveSoc}
                    onChange={(event) => {
                      setReserveSoc(event.target.value);
                      markStale();
                    }}
                  />
                  <span className="form-hint">Planned arrival reserve buffer (range is calculated only above this cutoff).</span>
                </label>
                <label>
                  Battery state of health (SOH) / available capacity (%)
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    step="any"
                    inputMode="decimal"
                    value={health}
                    onChange={(event) => {
                      setHealth(event.target.value);
                      markStale();
                    }}
                  />
                  <span className="form-hint">
                    Available pack capacity relative to original factory condition. If entering an already degraded usable pack rating, leave at 100% to avoid double-derating.
                  </span>
                </label>
              </fieldset>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {result ? "Recalculate" : "Calculate EV Range"}
            </button>
          </form>
        </div>
        <aside className="result-panel" aria-live="polite">
          <p className="eyebrow">EV range estimate</p>
          {!result ? (
            <p>Enter the vehicle inputs and calculate to see the planned range.</p>
          ) : (
            <RangeResult result={result} stale={stale} distanceUnit={distanceUnit} consumptionUnit={consumptionUnit} />
          )}
        </aside>
      </div>
    </section>
  );
}

function RangeResult({
  result,
  stale,
  distanceUnit,
  consumptionUnit,
}: {
  result: EvRangeResult;
  stale: boolean;
  distanceUnit: EvRangeDistanceUnit;
  consumptionUnit: EvRangeConsumptionUnit;
}) {
  const data = result.result;
  const chargingTimePublished = isCalculatorPublished("ev-charging-time");
  const chargingCostPublished = isCalculatorPublished("ev-charging-cost");
  const primary = distanceUnit === "km" ? `${number(data.rangeKm, 1)} km` : `${number(data.rangeMiles, 1)} mi`;
  const chargingTimeHref = `/ev/ev-charging-time-calculator?batteryCapacityKwh=${encodeURIComponent(String(data.batteryCapacityKWh))}&startSoc=${encodeURIComponent(String(data.currentSocFraction))}`;

  // Illustrative reference benchmarks (not generated from live temperature or weather inputs)
  const baseRange = distanceUnit === "km" ? data.rangeKm : data.rangeMiles;
  const illustrativeWinterRange = baseRange * 0.72;

  // Energy window percentage widths for visualization
  const reserveWidth = Math.min(100, Math.max(0, data.reserveSoc));
  const usableWidth = Math.min(100 - reserveWidth, Math.max(0, data.currentSoc - data.reserveSoc));
  const emptyWidth = Math.max(0, 100 - data.currentSoc);

  return (
    <>
      <p className="result-lede">Estimated planned driving range</p>
      <p className="result-value">{primary}</p>
      {stale && (
        <p className="warning" role="status">
          Inputs changed — recalculate to update this estimate.
        </p>
      )}

      {/* Battery State & Usable Energy Visualizer (strictly reflecting user inputs) */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1rem", margin: "1rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand-strong)", marginBottom: "0.5rem" }}>
          <span>🔋 Battery State &amp; Usable Energy Window</span>
          <span>{number(data.energyAvailableKWh, 1)} kWh available</span>
        </div>
        <div style={{ height: "14px", width: "100%", background: "#e2e8f0", borderRadius: "6px", display: "flex", overflow: "hidden" }} role="img" aria-label={`Battery state: ${data.reserveSoc}% reserve, ${data.currentSoc - data.reserveSoc}% usable range window, ${100 - data.currentSoc}% depleted`}>
          <div style={{ width: `${reserveWidth}%`, background: "#f59e0b" }} title={`Reserve buffer: ${data.reserveSoc}%`} />
          <div style={{ width: `${usableWidth}%`, background: "#10b981" }} title={`Usable range window: ${usableWidth}%`} />
          <div style={{ width: `${emptyWidth}%`, background: "#cbd5e1" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.4rem" }}>
          <span>Reserve: {data.reserveSoc}%</span>
          <span>Current: {data.currentSoc}%</span>
          <span>Max: 100%</span>
        </div>
      </div>

      {/* Clearly labeled illustrative seasonal reference box */}
      <div style={{ background: "rgba(14, 165, 233, 0.04)", border: "1px solid rgba(14, 165, 233, 0.2)", borderRadius: "0.75rem", padding: "0.875rem 1rem", margin: "0.875rem 0" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: "0.4rem" }}>
          🌡️ Illustrative Seasonal Reference Scenario — Not Used in Primary Calculation
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
              <span>☀️ <strong>Mild / Moderate Ambient</strong> (70°F / 21°C)</span>
              <strong style={{ color: "#16a34a" }}>{number(baseRange, 1)} {distanceUnit} (Baseline)</strong>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
              <span>❄️ <strong>Freezing Winter Scenario</strong> (20°F / -7°C)</span>
              <strong style={{ color: "#0284c7" }}>~{number(illustrativeWinterRange, 1)} {distanceUnit} (~72%)</strong>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: "0.3rem 0 0 0", lineHeight: 1.4 }}>
              *Illustrative scenario reference only. The primary calculation above uses your entered static consumption. Actual cold-weather impact varies by vehicle, speed, HVAC load, and battery temperature.
            </p>
          </div>
        </div>
      </div>

      {result.warnings.map((warning) => (
        <p className={warning.severity === "caution" ? "warning" : "form-hint"} role={warning.severity === "caution" ? "alert" : undefined} key={warning.code}>
          {warning.message}
        </p>
      ))}

      <dl className="result-breakdown">
        <div>
          <dt>Planned range (miles)</dt>
          <dd>{number(data.rangeMiles, 1)} mi</dd>
        </div>
        <div>
          <dt>Planned range (kilometers)</dt>
          <dd>{number(data.rangeKm, 1)} km</dd>
        </div>
        <div>
          <dt>Energy available above reserve</dt>
          <dd>{number(data.energyAvailableKWh, 2)} kWh</dd>
        </div>
        <div>
          <dt>Effective usable capacity</dt>
          <dd>{number(data.effectiveCapacityKWh, 1)} kWh (SOH: {data.batteryHealth}%)</dd>
        </div>
        <div>
          <dt>Normalized consumption</dt>
          <dd>{number(data.consumptionKWhPerKm, 4)} kWh/km</dd>
        </div>
      </dl>

      <section className="comparison">
        <h3>Standard consumption comparisons</h3>
        {data.standardScenarios.map((scenario) => (
          <div className="contributor-label" key={scenario.label}>
            <span>{scenario.label}</span>
            <strong>{number(distanceUnit === "km" ? scenario.rangeKm : scenario.rangeMiles, 1)} {distanceUnit}</strong>
          </div>
        ))}
      </section>

      <section className="comparison">
        <h3>Consumption sensitivity scenarios</h3>
        {data.sensitivityScenarios.map((scenario) => (
          <div className="contributor-label" key={scenario.label}>
            <span>
              {scenario.label}
              <small> ({number(formatConsumptionValue(scenario.consumptionKWhPerKm, consumptionUnit), 3)} {unitLabel[consumptionUnit]})</small>
            </span>
            <strong>{number(distanceUnit === "km" ? scenario.rangeKm : scenario.rangeMiles, 1)} {distanceUnit}</strong>
          </div>
        ))}
      </section>

      <section className="assumption-summary">
        <h3>Assumptions used</h3>
        <dl>
          <div>
            <dt>Usable battery capacity</dt>
            <dd>{number(data.batteryCapacityKWh)} kWh</dd>
          </div>
          <div>
            <dt>Current SOC</dt>
            <dd>{number(data.currentSoc, 1)}%</dd>
          </div>
          <div>
            <dt>Reserve SOC buffer</dt>
            <dd>{number(data.reserveSoc, 1)}%</dd>
          </div>
          <div>
            <dt>Battery state of health (SOH)</dt>
            <dd>{number(data.batteryHealth, 1)}%</dd>
          </div>
        </dl>
      </section>

      <GooglePreferredBanner />

      <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="EV Range Calculation" />
        <PrintSpecButton />
      </div>

      {(chargingTimePublished || chargingCostPublished) && (
        <div className="handoff" style={{ marginTop: "1.2rem" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "0.6rem" }}>Next steps</h3>
          <div className="handoff-button-group">
            {chargingTimePublished && (
              <Link className="button secondary-button handoff-link" href={chargingTimeHref}>
                <span>Estimate charging time</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
            {chargingCostPublished && (
              <Link className="button secondary-button handoff-link" href="/ev/ev-charging-cost-calculator">
                <span>Estimate charging cost</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      )}

      <p className="form-hint" style={{ marginTop: "0.75rem" }}>
        This is a deterministic planning estimate based strictly on your usable capacity, SOC delta, SOH, and assumed consumption. It does not model live telematics, weather, terrain, or cabin HVAC draw.
      </p>
    </>
  );
}

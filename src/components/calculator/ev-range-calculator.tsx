"use client";

import Link from "next/link";
import { useState } from "react";
import { EV_RANGE_DEFAULTS } from "@/data/ev-range-defaults";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { calculateEvRange, formatConsumptionValue, normalizeConsumption, type EvRangeConsumptionUnit, type EvRangeDistanceUnit, type EvRangeResult } from "@/lib/calculators/ev-range/engine";
import { track } from "@/lib/analytics/analytics";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { EvChargingVisualizer } from "@/components/calculator/ev-charging-visualizer";


const QUICK_EV_PRESETS = [
  { label: "🚗 Compact Commuter (50 kWh · 4.0 mi/kWh)", capacity: 50, consumption: 4.0, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "⚡ Standard Sedan (60 kWh · 3.8 mi/kWh)", capacity: 60, consumption: 3.8, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🚙 Crossover / SUV (77 kWh · 3.3 mi/kWh)", capacity: 77, consumption: 3.3, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🏎️ Performance EV (90 kWh · 2.9 mi/kWh)", capacity: 90, consumption: 2.9, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
  { label: "🛻 Large EV Truck (130 kWh · 2.1 mi/kWh)", capacity: 130, consumption: 2.1, unit: "mi-per-kwh" as EvRangeConsumptionUnit },
];

const number = (value: number, digits = 2) => value.toLocaleString("en-US", { maximumFractionDigits: digits });

const fixed = (value: number, digits = 1) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
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

  const markStale = () => { if (result) setStale(true); };
  const updateConsumption = (value: string) => {
    setConsumption(value);
    const parsed = Number(value);
    setNormalizedConsumption(Number.isFinite(parsed) && parsed > 0 ? normalizeConsumption(parsed, consumptionUnit) : Number.NaN);
    markStale();
  };
  const changeConsumptionUnit = (nextUnit: EvRangeConsumptionUnit) => {
    setConsumptionUnit(nextUnit);
    if (Number.isFinite(normalizedConsumption) && normalizedConsumption > 0) setConsumption(String(formatConsumptionValue(normalizedConsumption, nextUnit)));
    setNormalizedConsumption(normalizedConsumption);
  };
  const calculate = () => {
    try {
      const next = calculateEvRange({ batteryCapacityKWh: Number(capacity), currentSoc: Number(currentSoc), reserveSoc: Number(reserveSoc), batteryHealth: Number(health), consumption: normalizedConsumption * 100, consumptionUnit: "kwh-per-100-km" });
      setResult(next);
      setStale(false);
      setError(null);
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError.message : "Enter valid EV range inputs.");
      if (result) setStale(true);
    }
  };

  return <section className="calculator" aria-labelledby="ev-range-heading">
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

        <form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
          <fieldset className="input-group"><legend>Battery and consumption</legend><label>Usable battery capacity (kWh)<input type="number" min="0.01" step="any" inputMode="decimal" value={capacity} onChange={(event) => { setCapacity(event.target.value); markStale(); }} /><span className="form-hint">Use the vehicle&apos;s usable/net battery capacity when known.</span></label><label>Current SOC (%)<input type="number" min="0" max="100" step="any" value={currentSoc} onChange={(event) => { setCurrentSoc(event.target.value); markStale(); }} /></label><label>Battery consumption<span className="input-with-unit"><input type="number" min="0.0001" step="any" inputMode="decimal" value={consumption} onChange={(event) => updateConsumption(event.target.value)} /><select aria-label="Consumption unit" value={consumptionUnit} onChange={(event) => changeConsumptionUnit(event.target.value as EvRangeConsumptionUnit)}>{Object.entries(unitLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></span><span className="form-hint">Battery-side vehicle consumption before charging losses.</span></label></fieldset>
          <fieldset className="input-group"><legend>Result display</legend><label>Primary distance unit<select value={distanceUnit} onChange={(event) => setDistanceUnit(event.target.value as EvRangeDistanceUnit)}><option value="km">Kilometers</option><option value="mi">Miles</option></select></label></fieldset>
          <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
          {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><label>Reserve SOC (%)<input type="number" min="0" max="100" step="any" value={reserveSoc} onChange={(event) => { setReserveSoc(event.target.value); markStale(); }} /><span className="form-hint">Range is planned only above this reserve.</span></label><label>Battery health / available capacity (%)<input type="number" min="0.01" max="100" step="any" value={health} onChange={(event) => { setHealth(event.target.value); markStale(); }} /><span className="form-hint">Planning derating, not measured state of health or degradation prediction.</span></label></fieldset>}
          {error && <p className="error" role="alert">{error}</p>}<button className="button calculator-submit" type="submit">{result ? "Recalculate" : "Calculate EV Range"}</button>
        </form>
      </div>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">EV range estimate</p>{!result ? <p>Enter the vehicle inputs and calculate to see the planned range.</p> : <RangeResult result={result} stale={stale} distanceUnit={distanceUnit} consumptionUnit={consumptionUnit} />}</aside>
    </div>
  </section>;
}

function RangeResult({ result, stale, distanceUnit, consumptionUnit }: { result: EvRangeResult; stale: boolean; distanceUnit: EvRangeDistanceUnit; consumptionUnit: EvRangeConsumptionUnit }) {
  const data = result.result;
  const chargingTimePublished = isCalculatorPublished("ev-charging-time");
  const chargingCostPublished = isCalculatorPublished("ev-charging-cost");
  const primary = distanceUnit === "km" ? `${number(data.rangeKm, 1)} km` : `${number(data.rangeMiles, 1)} mi`;
  const chargingTimeHref = `/ev/ev-charging-time-calculator?batteryCapacityKwh=${encodeURIComponent(String(data.batteryCapacityKWh))}&startSoc=${encodeURIComponent(String(data.currentSocFraction))}`;

  // Winter vs Summer estimated ranges (Freezing winter typically exhibits ~28% range derate)
  const summerRange = distanceUnit === "km" ? data.rangeKm : data.rangeMiles;
  const winterRange = summerRange * 0.72;

  return <><p className="result-lede">Estimated EV range</p><p className="result-value">{primary}</p>{stale && <p className="warning" role="status">Inputs changed — recalculate to update this estimate.</p>}
    <div style={{ background: "var(--surface, rgba(14, 165, 233, 0.04))", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "0.875rem 1rem", margin: "0.875rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted, #64748b)", marginBottom: "0.5rem" }}>
        <span>🌡️ Real-World Seasonal Range Comparison</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
            <span>☀️ <strong>Ideal Summer</strong> (70°F / 21°C)</span>
            <strong style={{ color: "#16a34a" }}>{number(summerRange, 1)} {distanceUnit} (100%)</strong>
          </div>
          <div style={{ height: "8px", width: "100%", background: "#e2e8f0", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "100%", background: "#16a34a", borderRadius: "9999px" }}></div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
            <span>❄️ <strong>Freezing Winter</strong> (20°F / -7°C)</span>
            <strong style={{ color: "#0284c7" }}>{number(winterRange, 1)} {distanceUnit} (72%)</strong>
          </div>
          <div style={{ height: "8px", width: "100%", background: "#e2e8f0", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "72%", background: "#0284c7", borderRadius: "9999px" }}></div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)", margin: "0.3rem 0 0 0" }}>*Accounts for cabin heating HVAC draw &amp; cold battery chemical resistance.</p>
        </div>
      </div>
    </div>
    <EvChargingVisualizer
      batteryCapacityKwh={data.batteryCapacityKWh}
      startSocPercent={data.reserveSoc}
      targetSocPercent={data.currentSoc}
      chargerPowerKw={11}
      chargeTimeHours={data.energyAvailableKWh / 11}
      rangeAddedMiles={data.rangeMiles}
      rangeAddedKm={data.rangeKm}
    />
    {result.warnings.map((warning) => <p className={warning.severity === "caution" ? "warning" : "form-hint"} role={warning.severity === "caution" ? "alert" : undefined} key={warning.code}>{warning.message}</p>)}<dl className="result-breakdown"><div><dt>Range in kilometers</dt><dd>{number(data.rangeKm, 1)} km</dd></div><div><dt>Range in miles</dt><dd>{number(data.rangeMiles, 1)} mi</dd></div><div><dt>Energy available above reserve</dt><dd>{number(data.energyAvailableKWh, 2)} kWh</dd></div><div><dt>Normalized consumption</dt><dd>{number(data.consumptionKWhPerKm, 4)} kWh/km</dd></div></dl>
<section className="comparison"><h3>Standard consumption comparisons</h3>{data.standardScenarios.map((scenario) => <div className="contributor-label" key={scenario.label}><span>{scenario.label}</span><strong>{number(distanceUnit === "km" ? scenario.rangeKm : scenario.rangeMiles, 1)} {distanceUnit}</strong></div>)}</section><section className="comparison"><h3>Consumption scenarios</h3>{data.sensitivityScenarios.map((scenario) => <div className="contributor-label" key={scenario.label}><span>{scenario.label}<small> ({number(formatConsumptionValue(scenario.consumptionKWhPerKm, consumptionUnit), 3)} {unitLabel[consumptionUnit]})</small></span><strong>{number(distanceUnit === "km" ? scenario.rangeKm : scenario.rangeMiles, 1)} {distanceUnit}</strong></div>)}</section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Usable battery capacity</dt><dd>{number(data.batteryCapacityKWh)} kWh</dd></div><div><dt>Current SOC</dt><dd>{number(data.currentSoc, 1)}%</dd></div><div><dt>Reserve SOC</dt><dd>{number(data.reserveSoc, 1)}%</dd></div><div><dt>Battery health</dt><dd>{number(data.batteryHealth, 1)}%</dd></div></dl></section>
  <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
  <p className="form-hint" style={{ marginTop: "0.75rem" }}>This is a planning estimate above your chosen reserve. It does not model speed, weather, terrain, traffic, temperature or vehicle-specific efficiency.</p></>;
}


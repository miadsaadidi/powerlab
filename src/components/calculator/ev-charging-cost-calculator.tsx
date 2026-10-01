"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_DISPLAY_CURRENCY, DISPLAY_CURRENCIES, isSupportedCurrency } from "@/data/currencies";
import { calculateEvChargingCost, type ConsumptionBasis, type ConsumptionUnit, type DistancePeriod, type DistanceUnit, type EvChargingCostInput, type EvChargingCostMode, type EvChargingCostResult } from "@/lib/calculators/ev-charging-cost/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

const QUICK_COST_PRESETS = [
  { label: "🔋 20% → 80% Daily Commute (60 kWh)", capacity: "60", start: "20", target: "80", price: "0.16" },
  { label: "🔌 10% → 100% Full Home (77 kWh)", capacity: "77", start: "10", target: "100", price: "0.16" },
  { label: "⚡ 10% → 80% DC Fast Public ($0.45)", capacity: "75", start: "10", target: "80", price: "0.45" },
  { label: "🚗 40% → 90% Weekend Top-Up (60 kWh)", capacity: "60", start: "40", target: "90", price: "0.20" },
  { label: "🛻 10% → 100% EV Truck (130 kWh)", capacity: "130", start: "10", target: "100", price: "0.16" },
];

type SessionDraft = { batteryCapacityKWh: string; startSoc: string; targetSoc: string; pricePerKWh: string };
type DrivingDraft = {
  consumption: string;
  consumptionUnit: ConsumptionUnit;
  consumptionBasis: ConsumptionBasis;
  distance: string;
  distanceUnit: DistanceUnit;
  distancePeriod: DistancePeriod;
  pricePerKWh: string;
};

const initialSession: SessionDraft = { batteryCapacityKWh: "60", startSoc: "20", targetSoc: "80", pricePerKWh: "0.20" };
const initialDriving: DrivingDraft = {
  consumption: "18",
  consumptionUnit: "kwh-per-100-km",
  consumptionBasis: "battery-consumption",
  distance: "40",
  distanceUnit: "km",
  distancePeriod: "day",
  pricePerKWh: "0.20",
};

const parse = (value: string) => Number(value);
const money = (value: number, currency: string) => new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
const quantity = (value: number, digits = 2) => new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(value);
const percent = (value: string) => parse(value) / 100;

export function EvChargingCostCalculator() {
  const [mode, setMode] = useState<EvChargingCostMode>("session");
  const [session, setSession] = useState<SessionDraft>(initialSession);
  const [driving, setDriving] = useState<DrivingDraft>(initialDriving);
  const [efficiency, setEfficiency] = useState("90");
  const [currency, setCurrency] = useState(DEFAULT_DISPLAY_CURRENCY);
  const [calculated, setCalculated] = useState<EvChargingCostResult | null>(() => {
    try {
      return calculateEvChargingCost({
        mode: "session",
        batteryCapacityKwh: 60,
        startSocPercent: 20,
        targetSocPercent: 80,
        pricePerKWh: 0.2,
        sourceToBatteryEfficiency: 0.9,
      });
    } catch {
      return null;
    }
  });
  const [calculatedMode, setCalculatedMode] = useState<EvChargingCostMode | null>("session");
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const saved = profile.evCharging;
    if (saved.batteryCapacityKWh !== null) setSession((current) => ({ ...current, batteryCapacityKWh: String(saved.batteryCapacityKWh) }));
    if (saved.startSoc !== null) {
      const startSoc = saved.startSoc;
      setSession((current) => ({ ...current, startSoc: String(startSoc * 100) }));
    }
    if (saved.targetSoc !== null) {
      const targetSoc = saved.targetSoc;
      setSession((current) => ({ ...current, targetSoc: String(targetSoc * 100) }));
    }
    if (profile.electricityPricePerKwh !== null) {
      const price = String(profile.electricityPricePerKwh);
      setSession((current) => ({ ...current, pricePerKWh: price }));
      setDriving((current) => ({ ...current, pricePerKWh: price }));
    }
    if (profile.electricityCurrency && isSupportedCurrency(profile.electricityCurrency)) setCurrency(profile.electricityCurrency);
  }, []);

  const input = useMemo<EvChargingCostInput>(
    () =>
      mode === "session"
        ? {
            mode,
            batteryCapacityKwh: parse(session.batteryCapacityKWh),
            startSocPercent: parse(session.startSoc),
            targetSocPercent: parse(session.targetSoc),
            pricePerKWh: parse(session.pricePerKWh),
            sourceToBatteryEfficiency: percent(efficiency),
          }
        : {
            mode,
            consumption: parse(driving.consumption),
            consumptionUnit: driving.consumptionUnit,
            consumptionBasis: driving.consumptionBasis,
            distance: parse(driving.distance),
            distanceUnit: driving.distanceUnit,
            distancePeriod: driving.distancePeriod,
            pricePerKWh: parse(driving.pricePerKWh),
            sourceToBatteryEfficiency: percent(efficiency),
          },
    [driving, efficiency, mode, session]
  );

  const markStale = () => {
    if (calculated) setStale(true);
  };
  const updateMode = (nextMode: EvChargingCostMode) => {
    setMode(nextMode);
    markStale();
    setError(null);
  };
  const updateCurrency = (next: string) => {
    setCurrency(next);
    createEnergyProfileStore(window.localStorage).patchElectricityCurrency(next);
  };
  const calculate = () => {
    try {
      const result = calculateEvChargingCost(input);
      setCalculated(result);
      setCalculatedMode(mode);
      setStale(false);
      setError(null);
    } catch (calculationError) {
      setCalculated(null);
      setError(calculationError instanceof Error ? calculationError.message : "Enter valid values to calculate cost.");
    }
  };

  return (
    <section className="calculator" aria-labelledby="ev-cost-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="ev-cost-heading">Calculate EV charging cost</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Charging Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Charging Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_COST_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${mode === "session" && session.batteryCapacityKWh === sc.capacity && session.startSoc === sc.start && session.targetSoc === sc.target ? "active" : ""}`}
                  onClick={() => {
                    setMode("session");
                    const nextSession = { batteryCapacityKWh: sc.capacity, startSoc: sc.start, targetSoc: sc.target, pricePerKWh: sc.price };
                    setSession(nextSession);
                    try {
                      const res = calculateEvChargingCost({
                        mode: "session",
                        batteryCapacityKwh: parse(sc.capacity),
                        startSocPercent: parse(sc.start),
                        targetSocPercent: parse(sc.target),
                        pricePerKWh: parse(sc.price),
                        sourceToBatteryEfficiency: percent(efficiency),
                      });
                      setCalculated(res);
                      setCalculatedMode("session");
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "ev-charging-cost", preset: sc.label });
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
              <legend>What do you want to estimate?</legend>
              <div className="mode-choice">
                <label>
                  <input type="radio" checked={mode === "session"} onChange={() => updateMode("session")} /> Charging session
                </label>
                <label>
                  <input type="radio" checked={mode === "driving"} onChange={() => updateMode("driving")} /> Driving cost
                </label>
              </div>
            </fieldset>
            {mode === "session" ? (
              <fieldset className="input-group">
                <legend>Charging session</legend>
                <div className="field-pair">
                  <label>
                    Usable battery capacity (kWh)
                    <input
                      type="number"
                      min="0.01"
                      step="any"
                      value={session.batteryCapacityKWh}
                      onChange={(event) => {
                        setSession({ ...session, batteryCapacityKWh: event.target.value });
                        markStale();
                      }}
                    />
                    <span className="form-hint">Usable net capacity. Gross pack capacity may differ from usable SOC energy.</span>
                  </label>
                  <label>
                    Start charge (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={session.startSoc}
                      onChange={(event) => {
                        setSession({ ...session, startSoc: event.target.value });
                        markStale();
                      }}
                    />
                  </label>
                  <label>
                    Target charge (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={session.targetSoc}
                      onChange={(event) => {
                        setSession({ ...session, targetSoc: event.target.value });
                        markStale();
                      }}
                    />
                  </label>
                </div>
              </fieldset>
            ) : (
              <fieldset className="input-group">
                <legend>Driving cost</legend>
                <div className="field-pair">
                  <label>
                    Energy consumption
                    <input
                      type="number"
                      min="0.01"
                      step="any"
                      value={driving.consumption}
                      onChange={(event) => {
                        setDriving({ ...driving, consumption: event.target.value });
                        markStale();
                      }}
                    />
                    <select
                      aria-label="Energy consumption unit"
                      value={driving.consumptionUnit}
                      onChange={(event) => {
                        setDriving({ ...driving, consumptionUnit: event.target.value as ConsumptionUnit });
                        markStale();
                      }}
                    >
                      <option value="kwh-per-100-km">kWh/100 km</option>
                      <option value="kwh-per-100-mi">kWh/100 mi</option>
                    </select>
                  </label>
                  <label>
                    Consumption basis
                    <select
                      aria-label="Consumption measurement basis"
                      value={driving.consumptionBasis}
                      onChange={(event) => {
                        setDriving({ ...driving, consumptionBasis: event.target.value as ConsumptionBasis });
                        markStale();
                      }}
                    >
                      <option value="battery-consumption">Battery meter (before charging losses)</option>
                      <option value="wall-consumption">EPA window sticker / Wall meter (includes losses)</option>
                    </select>
                    <span className="form-hint">EPA window sticker ratings already include wall charging losses; onboard trip meters measure battery draw.</span>
                  </label>
                  <label>
                    Distance
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={driving.distance}
                      onChange={(event) => {
                        setDriving({ ...driving, distance: event.target.value });
                        markStale();
                      }}
                    />
                    <select
                      aria-label="Distance unit"
                      value={driving.distanceUnit}
                      onChange={(event) => {
                        setDriving({ ...driving, distanceUnit: event.target.value as DistanceUnit });
                        markStale();
                      }}
                    >
                      <option value="km">km</option>
                      <option value="mi">mi</option>
                    </select>
                  </label>
                  <label>
                    Distance period
                    <select
                      value={driving.distancePeriod}
                      onChange={(event) => {
                        setDriving({ ...driving, distancePeriod: event.target.value as DistancePeriod });
                        markStale();
                      }}
                    >
                      <option value="day">per day</option>
                      <option value="week">per week</option>
                      <option value="month">per month</option>
                      <option value="year">per year</option>
                    </select>
                  </label>
                </div>
              </fieldset>
            )}
            <fieldset className="input-group">
              <legend>Electricity price</legend>
              <label>
                Price per billed/source kWh
                <div className="input-with-unit">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={mode === "session" ? session.pricePerKWh : driving.pricePerKWh}
                    onChange={(event) => {
                      if (mode === "session") setSession({ ...session, pricePerKWh: event.target.value });
                      else setDriving({ ...driving, pricePerKWh: event.target.value });
                      markStale();
                    }}
                  />
                  <select aria-label="Rate currency" value={currency} onChange={(event) => updateCurrency(event.target.value)}>
                    {DISPLAY_CURRENCIES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="form-hint">No currency conversion is performed; enter the electricity price in the selected rate currency.</span>
              </label>
            </fieldset>
            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>
            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <label>
                  Overall source-to-battery charging efficiency (%)
                  <input
                    type="number"
                    min="0.1"
                    max="100"
                    step="any"
                    value={efficiency}
                    onChange={(event) => {
                      setEfficiency(event.target.value);
                      markStale();
                    }}
                  />
                  <span className="form-hint">
                    Overall source-to-battery charging efficiency — illustrative assumption (default 90% for AC charging, accounting for onboard rectifier and thermal management). Actual efficiency varies by vehicle, EVSE, temperature, and measurement boundary. If your consumption basis already includes wall/charger losses, use 100%.
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
              {calculated ? "Recalculate" : "Calculate Charging Cost"}
            </button>
          </form>
        </div>
        <aside className="result-panel" aria-live="polite">
          <p className="eyebrow">EV charging cost estimate</p>
          {!calculated ? (
            <p>Complete the inputs and calculate to see an estimate.</p>
          ) : (
            <CostResult
              result={calculated}
              mode={calculatedMode ?? mode}
              currency={currency}
              pricePerKWh={calculatedMode === "session" ? parse(session.pricePerKWh) : parse(driving.pricePerKWh)}
              efficiency={parse(efficiency) / 100}
              driving={driving}
              handoff={
                calculatedMode === "session"
                  ? `/ev/ev-charging-time-calculator?batteryCapacityKwh=${encodeURIComponent(session.batteryCapacityKWh)}&startSoc=${encodeURIComponent(session.startSoc)}&targetSoc=${encodeURIComponent(session.targetSoc)}`
                  : null
              }
              stale={stale}
            />
          )}
        </aside>
      </div>
    </section>
  );
}

function CostResult({
  result,
  mode,
  currency,
  pricePerKWh,
  efficiency,
  driving,
  handoff,
  stale,
}: {
  result: EvChargingCostResult;
  mode: EvChargingCostMode;
  currency: string;
  pricePerKWh: number;
  efficiency: number;
  driving: DrivingDraft;
  handoff: string | null;
  stale: boolean;
}) {
  const selectedLabel = mode === "session" ? "charging session" : `${driving.distance} ${driving.distanceUnit}/${driving.distancePeriod}`;
  return (
    <>
      <p className="result-lede">{mode === "session" ? "Estimated charging cost" : "Estimated driving electricity cost"}</p>
      <p className="result-value">
        {money(result.selectedPeriodCost, currency)}
        {mode === "driving" && <small>/{result.selectedPeriodLabel}</small>}
      </p>
      <StandardsBadge standards={["SAE J1772", "EPA EV Efficiency", "ISO 15118"]} />
      {stale && (
        <p className="warning" role="status">
          Inputs changed — recalculate to update the estimate.
        </p>
      )}
      <dl className="result-breakdown">
        <div>
          <dt>Battery energy {mode === "session" ? "added" : "used"}</dt>
          <dd>{quantity(result.batteryEnergyAddedKwh)} kWh</dd>
        </div>
        <div>
          <dt>Estimated billed/source energy</dt>
          <dd>{quantity(result.sourceEnergyKwh)} kWh</dd>
        </div>
        <div>
          <dt>Electricity price</dt>
          <dd>
            {money(pricePerKWh, currency)}/kWh
          </dd>
        </div>
        <div>
          <dt>Source-to-battery efficiency</dt>
          <dd>{quantity(efficiency * 100, 1)}%</dd>
        </div>
        {mode === "driving" && (
          <>
            <div>
              <dt>Cost for selected distance</dt>
              <dd>{money(result.selectedPeriodCost, currency)}</dd>
            </div>
            <div>
              <dt>Cost per 100 km</dt>
              <dd>{money(result.costPer100Km ?? 0, currency)}</dd>
            </div>
            <div>
              <dt>Cost per 100 mi</dt>
              <dd>{money(result.costPer100Mi ?? 0, currency)}</dd>
            </div>
            <div>
              <dt>Daily average</dt>
              <dd>{money(result.dailyCost, currency)}</dd>
            </div>
            <div>
              <dt>Monthly equivalent</dt>
              <dd>{money(result.monthlyCost, currency)}</dd>
            </div>
            <div>
              <dt>Annualized cost</dt>
              <dd>{money(result.annualCost, currency)}</dd>
            </div>
          </>
        )}
      </dl>
      <section className="comparison">
        <h3>Cost at different electricity prices</h3>
        {result.scenarios.map((scenario) => (
          <div className="contributor-label" key={scenario.label}>
            <span>
              {scenario.label} ({money(scenario.pricePerKWh, currency)}/kWh)
            </span>
            <strong>{money(scenario.cost, currency)}</strong>
          </div>
        ))}
      </section>

      <GooglePreferredBanner />

      <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="EV Charging Cost Calculation" />
        <PrintSpecButton />
      </div>
      {mode === "session" && handoff && (
        <div className="handoff" style={{ marginTop: "1.2rem" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "0.6rem" }}>Next step</h3>
          <div className="handoff-button-group">
            <Link className="button secondary-button handoff-link" href={handoff}>
              <span>How long will this session take?</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
      <p className="form-hint" style={{ marginTop: "0.75rem" }}>
        {mode === "session"
          ? "Battery energy stored and billed/source energy purchased are different quantities due to wall-to-battery charging losses. This calculator models energy-priced ($/kWh) charging; public networks may assess additional session, parking, or demand fees."
          : `Normalized costs for ${selectedLabel} assume the same driving rate and electricity price continue.`}
      </p>
    </>
  );
}

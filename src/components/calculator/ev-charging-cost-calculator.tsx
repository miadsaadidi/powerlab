"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_DISPLAY_CURRENCY, DISPLAY_CURRENCIES, isSupportedCurrency } from "@/data/currencies";
import { calculateEvChargingCost, type ConsumptionUnit, type DistancePeriod, type DistanceUnit, type EvChargingCostInput, type EvChargingCostMode, type EvChargingCostResult } from "@/lib/calculators/ev-charging-cost/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";

type SessionDraft = { batteryCapacityKWh: string; startSoc: string; targetSoc: string; pricePerKWh: string };
type DrivingDraft = { consumption: string; consumptionUnit: ConsumptionUnit; distance: string; distanceUnit: DistanceUnit; distancePeriod: DistancePeriod; pricePerKWh: string };

const initialSession: SessionDraft = { batteryCapacityKWh: "60", startSoc: "20", targetSoc: "80", pricePerKWh: "0.20" };
const initialDriving: DrivingDraft = { consumption: "18", consumptionUnit: "kwh-per-100-km", distance: "40", distanceUnit: "km", distancePeriod: "day", pricePerKWh: "0.20" };

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
  const [calculated, setCalculated] = useState<EvChargingCostResult | null>(null);
  const [calculatedMode, setCalculatedMode] = useState<EvChargingCostMode | null>(null);
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const saved = profile.evCharging;
    if (saved.batteryCapacityKWh !== null) setSession((current) => ({ ...current, batteryCapacityKWh: String(saved.batteryCapacityKWh) }));
    if (saved.startSoc !== null) { const startSoc = saved.startSoc; setSession((current) => ({ ...current, startSoc: String(startSoc * 100) })); }
    if (saved.targetSoc !== null) { const targetSoc = saved.targetSoc; setSession((current) => ({ ...current, targetSoc: String(targetSoc * 100) })); }
    if (profile.electricityPricePerKwh !== null) {
      const price = String(profile.electricityPricePerKwh);
      setSession((current) => ({ ...current, pricePerKWh: price }));
      setDriving((current) => ({ ...current, pricePerKWh: price }));
    }
    if (profile.electricityCurrency && isSupportedCurrency(profile.electricityCurrency)) setCurrency(profile.electricityCurrency);
  }, []);

  const input = useMemo<EvChargingCostInput>(() => mode === "session" ? {
    mode,
    batteryCapacityKWh: parse(session.batteryCapacityKWh),
    startSoc: percent(session.startSoc),
    targetSoc: percent(session.targetSoc),
    pricePerKWh: parse(session.pricePerKWh),
    sourceToBatteryEfficiency: percent(efficiency),
  } : {
    mode,
    consumption: parse(driving.consumption),
    consumptionUnit: driving.consumptionUnit,
    distance: parse(driving.distance),
    distanceUnit: driving.distanceUnit,
    distancePeriod: driving.distancePeriod,
    pricePerKWh: parse(driving.pricePerKWh),
    sourceToBatteryEfficiency: percent(efficiency),
  }, [driving, efficiency, mode, session]);

  const markStale = () => { if (calculated) setStale(true); };
  const updateMode = (nextMode: EvChargingCostMode) => { setMode(nextMode); markStale(); setError(null); };
  const updateCurrency = (next: string) => { setCurrency(next); createEnergyProfileStore(window.localStorage).patchElectricityCurrency(next); };
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

  return <section className="calculator" aria-labelledby="ev-cost-heading"><div className="calculator-grid"><div className="calculator-inputs"><h2 id="ev-cost-heading">Calculate EV charging cost</h2><form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
    <fieldset className="input-group"><legend>What do you want to estimate?</legend><div className="mode-choice"><label><input type="radio" checked={mode === "session"} onChange={() => updateMode("session")} /> Charging session</label><label><input type="radio" checked={mode === "driving"} onChange={() => updateMode("driving")} /> Driving cost</label></div></fieldset>
    {mode === "session" ? <fieldset className="input-group"><legend>Charging session</legend><div className="field-pair"><label>Battery usable capacity (kWh)<input type="number" min="0.01" step="any" value={session.batteryCapacityKWh} onChange={(event) => { setSession({ ...session, batteryCapacityKWh: event.target.value }); markStale(); }} /><span className="form-hint">Use usable/net capacity when known. Gross pack capacity may overestimate displayed SOC energy.</span></label><label>Start charge (%)<input type="number" min="0" max="99" value={session.startSoc} onChange={(event) => { setSession({ ...session, startSoc: event.target.value }); markStale(); }} /></label><label>Target charge (%)<input type="number" min="1" max="100" value={session.targetSoc} onChange={(event) => { setSession({ ...session, targetSoc: event.target.value }); markStale(); }} /></label></div></fieldset> : <fieldset className="input-group"><legend>Driving cost</legend><div className="field-pair"><label>Battery consumption<input type="number" min="0.01" step="any" value={driving.consumption} onChange={(event) => { setDriving({ ...driving, consumption: event.target.value }); markStale(); }} /><select aria-label="Battery consumption unit" value={driving.consumptionUnit} onChange={(event) => { setDriving({ ...driving, consumptionUnit: event.target.value as ConsumptionUnit }); markStale(); }}><option value="kwh-per-100-km">kWh/100 km</option><option value="kwh-per-100-mi">kWh/100 mi</option></select><span className="form-hint">Battery-side vehicle consumption before charging losses.</span></label><label>Distance<input type="number" min="0" step="any" value={driving.distance} onChange={(event) => { setDriving({ ...driving, distance: event.target.value }); markStale(); }} /><select aria-label="Distance unit" value={driving.distanceUnit} onChange={(event) => { setDriving({ ...driving, distanceUnit: event.target.value as DistanceUnit }); markStale(); }}><option value="km">km</option><option value="mi">mi</option></select></label><label>Distance period<select value={driving.distancePeriod} onChange={(event) => { setDriving({ ...driving, distancePeriod: event.target.value as DistancePeriod }); markStale(); }}><option value="day">per day</option><option value="week">per week</option><option value="month">per month</option><option value="year">per year</option></select></label></div></fieldset>}
    <fieldset className="input-group"><legend>Electricity price</legend><label>Price per billed/source kWh<div className="input-with-unit"><input type="number" min="0" step="any" value={mode === "session" ? session.pricePerKWh : driving.pricePerKWh} onChange={(event) => { if (mode === "session") setSession({ ...session, pricePerKWh: event.target.value }); else setDriving({ ...driving, pricePerKWh: event.target.value }); markStale(); }} /><select aria-label="Display currency" value={currency} onChange={(event) => updateCurrency(event.target.value)}>{DISPLAY_CURRENCIES.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}</select></div><span className="form-hint">Enter the price charged per kWh of electricity supplied to the charging session.</span></label></fieldset>
    <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
    {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><label>Source-to-battery efficiency (%)<input type="number" min="0.1" max="100" step="any" value={efficiency} onChange={(event) => { setEfficiency(event.target.value); markStale(); }} /><span className="form-hint">Planning assumption — replace when better data is known. If your consumption already includes wall/charger losses, use 100%.</span></label></fieldset>}
    {error && <p className="error" role="alert">{error}</p>}<button className="button calculator-submit" type="submit">{calculated ? "Recalculate" : "Calculate Charging Cost"}</button>
  </form></div><aside className="result-panel" aria-live="polite"><p className="eyebrow">EV charging cost estimate</p>{!calculated ? <p>Complete the inputs and calculate to see an estimate.</p> : <CostResult result={calculated} mode={calculatedMode ?? mode} currency={currency} pricePerKWh={calculatedMode === "session" ? parse(session.pricePerKWh) : parse(driving.pricePerKWh)} efficiency={parse(efficiency) / 100} driving={driving} handoff={calculatedMode === "session" ? `/ev/ev-charging-time-calculator?batteryCapacityKwh=${encodeURIComponent(session.batteryCapacityKWh)}&startSoc=${encodeURIComponent(percent(session.startSoc))}&targetSoc=${encodeURIComponent(percent(session.targetSoc))}` : null} stale={stale} />}</aside></div></section>;
}

function CostResult({ result, mode, currency, pricePerKWh, efficiency, driving, handoff, stale }: { result: EvChargingCostResult; mode: EvChargingCostMode; currency: string; pricePerKWh: number; efficiency: number; driving: DrivingDraft; handoff: string | null; stale: boolean }) {
  const selectedLabel = mode === "session" ? "charging session" : `${driving.distance} ${driving.distanceUnit}/${driving.distancePeriod}`;
  return <><p className="result-lede">{mode === "session" ? "Estimated charging cost" : "Estimated driving electricity cost"}</p><p className="result-value">{money(result.selectedPeriodCost, currency)}{mode === "driving" && <small>/{result.selectedPeriodLabel}</small>}</p>{stale && <p className="warning" role="status">Inputs changed — recalculate to update the estimate.</p>}<dl className="result-breakdown"><div><dt>Battery energy {mode === "session" ? "added" : "used"}</dt><dd>{quantity(result.batteryEnergyKWh)} kWh</dd></div><div><dt>Estimated billed/source energy</dt><dd>{quantity(result.sourceEnergyKWh)} kWh</dd></div><div><dt>Electricity price</dt><dd>{money(pricePerKWh, currency)}/kWh</dd></div><div><dt>Source-to-battery efficiency</dt><dd>{quantity(efficiency * 100, 1)}%</dd></div>{mode === "driving" && <><div><dt>Cost for selected distance</dt><dd>{money(result.selectedPeriodCost, currency)}</dd></div><div><dt>Cost per 100 km</dt><dd>{money(result.costPer100Km ?? 0, currency)}</dd></div><div><dt>Cost per 100 mi</dt><dd>{money(result.costPer100Mi ?? 0, currency)}</dd></div><div><dt>Daily average</dt><dd>{money(result.dailyCost, currency)}</dd></div><div><dt>Monthly equivalent</dt><dd>{money(result.monthlyCost, currency)}</dd></div><div><dt>Annualized cost</dt><dd>{money(result.annualCost, currency)}</dd></div></>}</dl><section className="comparison"><h3>Cost at different electricity prices</h3>{result.scenarios.map((scenario) => <div className="contributor-label" key={scenario.label}><span>{scenario.label} ({money(scenario.pricePerKWh, currency)}/kWh)</span><strong>{money(scenario.cost, currency)}</strong></div>)}</section>{mode === "session" && handoff && <p className="handoff"><Link className="secondary-button" href={handoff}>How long will this session take?</Link></p>}<p className="form-hint">{mode === "session" ? "Battery energy stored and billed/source energy purchased are different quantities." : `Normalized costs for ${selectedLabel} assume the same driving rate and electricity price continue.`}</p></>;
}

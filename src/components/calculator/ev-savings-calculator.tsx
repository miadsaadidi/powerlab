"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_DISPLAY_CURRENCY, DISPLAY_CURRENCIES, isSupportedCurrency } from "@/data/currencies";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { calculateEvSavings, fuelConsumptionToLitersPerKm, type DistanceUnit, type EvConsumptionUnit, type EvSavingsResult, type FuelConsumptionUnit, type FuelPriceUnit } from "@/lib/calculators/ev-savings/engine";
import { resolveElectricityPriceProvenance, type ElectricityPriceProvenance } from "@/lib/calculators/ev-savings/provenance";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

const QUICK_SAVINGS_PRESETS = [
  { label: "🏙️ City (8,000 mi · 30 MPG)", distance: "8000", distUnit: "mi" as DistanceUnit, mpg: "30", fuelUnit: "us-mpg" as FuelConsumptionUnit, gasPrice: "3.50", gasPriceUnit: "per-us-gallon" as FuelPriceUnit, elecPrice: "0.16", evCons: "28", evUnit: "kwh-per-100-mi" as EvConsumptionUnit },
  { label: "🚗 Average (12,000 mi · 28 MPG)", distance: "12000", distUnit: "mi" as DistanceUnit, mpg: "28", fuelUnit: "us-mpg" as FuelConsumptionUnit, gasPrice: "3.50", gasPriceUnit: "per-us-gallon" as FuelPriceUnit, elecPrice: "0.16", evCons: "30", evUnit: "kwh-per-100-mi" as EvConsumptionUnit },
  { label: "🛣️ Long Commute (20,000 mi · 25 MPG)", distance: "20000", distUnit: "mi" as DistanceUnit, mpg: "25", fuelUnit: "us-mpg" as FuelConsumptionUnit, gasPrice: "3.50", gasPriceUnit: "per-us-gallon" as FuelPriceUnit, elecPrice: "0.16", evCons: "32", evUnit: "kwh-per-100-mi" as EvConsumptionUnit },
  { label: "🛻 Truck / SUV (15,000 mi · 19 MPG)", distance: "15000", distUnit: "mi" as DistanceUnit, mpg: "19", fuelUnit: "us-mpg" as FuelConsumptionUnit, gasPrice: "3.75", gasPriceUnit: "per-us-gallon" as FuelPriceUnit, elecPrice: "0.16", evCons: "45", evUnit: "kwh-per-100-mi" as EvConsumptionUnit },
  { label: "🇪🇺 European (15,000 km · 6.5 L/100km)", distance: "15000", distUnit: "km" as DistanceUnit, mpg: "6.5", fuelUnit: "l-per-100-km" as FuelConsumptionUnit, gasPrice: "1.75", gasPriceUnit: "per-liter" as FuelPriceUnit, elecPrice: "0.25", evCons: "18", evUnit: "kwh-per-100-km" as EvConsumptionUnit },
];

type Draft = {
  annualDistance: string;
  distanceUnit: DistanceUnit;
  evConsumption: string;
  evConsumptionUnit: EvConsumptionUnit;
  electricityPrice: string;
  fuelConsumption: string;
  fuelConsumptionUnit: FuelConsumptionUnit;
  fuelPrice: string;
  fuelPriceUnit: FuelPriceUnit;
};

const initialDraft: Draft = {
  annualDistance: "12000",
  distanceUnit: "mi",
  evConsumption: "30",
  evConsumptionUnit: "kwh-per-100-mi",
  electricityPrice: "0.16",
  fuelConsumption: "28",
  fuelConsumptionUnit: "us-mpg",
  fuelPrice: "3.50",
  fuelPriceUnit: "per-us-gallon",
};

const number = (value: number, digits = 2) => value.toLocaleString("en-US", { maximumFractionDigits: digits });
const money = (value: number, currency: string) => new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
const percent = (value: number) => `${number(value * 100, 1)}%`;

function formatFuelConsumption(value: number, unit: FuelConsumptionUnit): number {
  const litersPerKm = fuelConsumptionToLitersPerKm(value, unit);
  if (unit === "l-per-100-km") return litersPerKm * 100;
  if (unit === "km-per-l") return 1 / litersPerKm;
  return 3.785411784 / (litersPerKm * 1.609344);
}

export function EvSavingsCalculator() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [currency, setCurrency] = useState(DEFAULT_DISPLAY_CURRENCY);
  const [electricityProvenance, setElectricityProvenance] = useState<ElectricityPriceProvenance>("example");
  const [savedProfileCurrency, setSavedProfileCurrency] = useState<string | null>(null);
  const [savedProfilePrice, setSavedProfilePrice] = useState<number | null>(null);
  const [evEfficiency, setEvEfficiency] = useState("90");
  const [evMaintenance, setEvMaintenance] = useState("");
  const [iceMaintenance, setIceMaintenance] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [result, setResult] = useState<EvSavingsResult | null>(() => {
    try {
      return calculateEvSavings({
        annualDistance: 12000,
        distanceUnit: "mi",
        evConsumption: 30,
        evConsumptionUnit: "kwh-per-100-mi",
        electricityPricePerKWh: 0.16,
        chargingEfficiency: 0.9,
        fuelConsumption: 28,
        fuelConsumptionUnit: "us-mpg",
        fuelPrice: 3.5,
        fuelPriceUnit: "per-us-gallon",
      });
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    if (profile.electricityPricePerKwh !== null && profile.electricityCurrency && isSupportedCurrency(profile.electricityCurrency)) {
      setDraft((current) => ({ ...current, electricityPrice: String(profile.electricityPricePerKwh) }));
      setCurrency(profile.electricityCurrency);
      setSavedProfileCurrency(profile.electricityCurrency);
      setSavedProfilePrice(profile.electricityPricePerKwh);
      setElectricityProvenance("profile-derived");
    }
  }, []);

  const markStale = () => {
    if (result) setStale(true);
  };
  const updateDraft = (key: keyof Draft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    if (key === "electricityPrice") setElectricityProvenance("user-entered");
    markStale();
  };
  const updateCurrency = (next: string) => {
    setCurrency(next);
    setElectricityProvenance(
      resolveElectricityPriceProvenance({
        price: Number(draft.electricityPrice),
        currency: next,
        savedPrice: savedProfilePrice,
        savedCurrency: savedProfileCurrency,
        current: electricityProvenance,
      })
    );
  };
  const updateUnit = (key: "evConsumptionUnit" | "fuelConsumptionUnit" | "distanceUnit" | "fuelPriceUnit", next: string) => {
    if (key === "distanceUnit") {
      const currentDistance = Number(draft.annualDistance);
      const distanceKm = draft.distanceUnit === "km" ? currentDistance : currentDistance * 1.609344;
      const converted = next === "km" ? distanceKm : distanceKm / 1.609344;
      setDraft((current) => ({ ...current, distanceUnit: next as DistanceUnit, annualDistance: Number.isFinite(converted) ? String(converted) : current.annualDistance }));
      return;
    }
    if (key === "fuelPriceUnit") {
      const currentPrice = Number(draft.fuelPrice);
      const pricePerLiter = draft.fuelPriceUnit === "per-liter" ? currentPrice : currentPrice / 3.785411784;
      const converted = next === "per-liter" ? pricePerLiter : pricePerLiter * 3.785411784;
      setDraft((current) => ({ ...current, fuelPriceUnit: next as FuelPriceUnit, fuelPrice: Number.isFinite(converted) ? String(converted) : current.fuelPrice }));
      return;
    }
    if (key === "evConsumptionUnit") {
      const current = Number(draft.evConsumption);
      const normalized = draft.evConsumptionUnit === "kwh-per-100-km" ? current / 100 : current / 160.9344;
      const converted = next === "kwh-per-100-km" ? normalized * 100 : normalized * 160.9344;
      setDraft((currentDraft) => ({
        ...currentDraft,
        evConsumptionUnit: next as EvConsumptionUnit,
        evConsumption: Number.isFinite(converted) ? String(converted) : currentDraft.evConsumption,
      }));
      return;
    }
    const current = Number(draft.fuelConsumption);
    try {
      const converted = formatFuelConsumption(current, next as FuelConsumptionUnit);
      setDraft((currentDraft) => ({ ...currentDraft, fuelConsumptionUnit: next as FuelConsumptionUnit, fuelConsumption: String(converted) }));
    } catch {
      setDraft((currentDraft) => ({ ...currentDraft, fuelConsumptionUnit: next as FuelConsumptionUnit }));
    }
  };

  const calculate = () => {
    try {
      const next = calculateEvSavings({
        annualDistance: Number(draft.annualDistance),
        distanceUnit: draft.distanceUnit,
        evConsumption: Number(draft.evConsumption),
        evConsumptionUnit: draft.evConsumptionUnit,
        electricityPricePerKWh: Number(draft.electricityPrice),
        chargingEfficiency: Number(evEfficiency) / 100,
        fuelConsumption: Number(draft.fuelConsumption),
        fuelConsumptionUnit: draft.fuelConsumptionUnit,
        fuelPrice: Number(draft.fuelPrice),
        fuelPriceUnit: draft.fuelPriceUnit,
        annualEvMaintenance: evMaintenance === "" ? undefined : Number(evMaintenance),
        annualIceMaintenance: iceMaintenance === "" ? undefined : Number(iceMaintenance),
      });
      setResult(next);
      setStale(false);
      setError(null);
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError.message : "Enter valid EV savings inputs.");
      if (result) setStale(true);
    }
  };

  return (
    <section className="calculator" aria-labelledby="ev-savings-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="ev-savings-heading">Compare EV and fuel costs</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Commute Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Driving Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_SAVINGS_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${draft.annualDistance === sc.distance && draft.distanceUnit === sc.distUnit ? "active" : ""}`}
                  onClick={() => {
                    const nextDraft: Draft = {
                      ...draft,
                      annualDistance: sc.distance,
                      distanceUnit: sc.distUnit,
                      fuelConsumption: sc.mpg,
                      fuelConsumptionUnit: sc.fuelUnit,
                      fuelPrice: sc.gasPrice,
                      fuelPriceUnit: sc.gasPriceUnit,
                      electricityPrice: sc.elecPrice,
                      evConsumption: sc.evCons,
                      evConsumptionUnit: sc.evUnit,
                    };
                    setDraft(nextDraft);
                    try {
                      const next = calculateEvSavings({
                        annualDistance: Number(sc.distance),
                        distanceUnit: sc.distUnit,
                        evConsumption: Number(sc.evCons),
                        evConsumptionUnit: sc.evUnit,
                        electricityPricePerKWh: Number(sc.elecPrice),
                        chargingEfficiency: Number(evEfficiency) / 100,
                        fuelConsumption: Number(sc.mpg),
                        fuelConsumptionUnit: sc.fuelUnit,
                        fuelPrice: Number(sc.gasPrice),
                        fuelPriceUnit: sc.gasPriceUnit,
                        annualEvMaintenance: evMaintenance === "" ? undefined : Number(evMaintenance),
                        annualIceMaintenance: iceMaintenance === "" ? undefined : Number(iceMaintenance),
                      });
                      setResult(next);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (result) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "ev-savings", preset: sc.label });
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Driving and prices</legend>
              <label>
                Annual distance
                <span className="input-with-unit">
                  <input type="number" min="0" step="any" inputMode="decimal" value={draft.annualDistance} onChange={(event) => updateDraft("annualDistance", event.target.value)} />
                  <select aria-label="Distance unit" value={draft.distanceUnit} onChange={(event) => updateUnit("distanceUnit", event.target.value)}>
                    <option value="km">km/year</option>
                    <option value="mi">mi/year</option>
                  </select>
                </span>
              </label>
              <label>
                EV consumption
                <span className="input-with-unit">
                  <input type="number" min="0.0001" step="any" inputMode="decimal" value={draft.evConsumption} onChange={(event) => updateDraft("evConsumption", event.target.value)} />
                  <select aria-label="EV consumption unit" value={draft.evConsumptionUnit} onChange={(event) => updateUnit("evConsumptionUnit", event.target.value)}>
                    <option value="kwh-per-100-km">kWh/100 km</option>
                    <option value="kwh-per-100-mi">kWh/100 mi</option>
                  </select>
                </span>
              </label>
              <label>
                Fuel consumption
                <span className="input-with-unit">
                  <input type="number" min="0.0001" step="any" inputMode="decimal" value={draft.fuelConsumption} onChange={(event) => updateDraft("fuelConsumption", event.target.value)} />
                  <select aria-label="Fuel consumption unit" value={draft.fuelConsumptionUnit} onChange={(event) => updateUnit("fuelConsumptionUnit", event.target.value)}>
                    <option value="l-per-100-km">L/100 km</option>
                    <option value="km-per-l">km/L</option>
                    <option value="us-mpg">US mpg</option>
                  </select>
                </span>
              </label>
              <label>
                Currency
                <select value={currency} onChange={(event) => updateCurrency(event.target.value)}>
                  {DISPLAY_CURRENCIES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Electricity price
                <span className="input-with-unit">
                  <input type="number" min="0" step="any" value={draft.electricityPrice} onChange={(event) => updateDraft("electricityPrice", event.target.value)} />
                  <span>/kWh</span>
                </span>
              </label>
              <label>
                Fuel price
                <span className="input-with-unit">
                  <input type="number" min="0" step="any" value={draft.fuelPrice} onChange={(event) => updateDraft("fuelPrice", event.target.value)} />
                  <select aria-label="Fuel price unit" value={draft.fuelPriceUnit} onChange={(event) => updateUnit("fuelPriceUnit", event.target.value)}>
                    <option value="per-liter">/liter</option>
                    <option value="per-us-gallon">/US gallon</option>
                  </select>
                </span>
              </label>
            </fieldset>
            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>
            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <label>
                  Charging efficiency (%)
                  <input
                    type="number"
                    min="0.1"
                    max="100"
                    step="any"
                    value={evEfficiency}
                    onChange={(event) => {
                      setEvEfficiency(event.target.value);
                      markStale();
                    }}
                  />
                  <span className="form-hint">Planning assumption for electricity delivered to the battery.</span>
                </label>
                <label>
                  Annual EV maintenance (optional)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={evMaintenance}
                    onChange={(event) => {
                      setEvMaintenance(event.target.value);
                      markStale();
                    }}
                  />
                </label>
                <label>
                  Annual ICE maintenance (optional)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={iceMaintenance}
                    onChange={(event) => {
                      setIceMaintenance(event.target.value);
                      markStale();
                    }}
                  />
                </label>
                <p className="form-hint">Maintenance is compared only when both values are entered. No maintenance, depreciation, insurance or tax estimates are invented.</p>
              </fieldset>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {result ? "Recalculate" : "Calculate EV Savings"}
            </button>
          </form>
        </div>
        <aside className="result-panel" aria-live="polite">
          <p className="eyebrow">EV savings estimate</p>
          {!result ? (
            <p>Enter your EV, fuel and price assumptions, then calculate to compare costs.</p>
          ) : (
            <SavingsResult result={result} currency={currency} stale={stale} draft={draft} electricityProvenance={electricityProvenance} />
          )}
        </aside>
      </div>
    </section>
  );
}

function SavingsResult({
  result,
  currency,
  stale,
  draft,
  electricityProvenance,
}: {
  result: EvSavingsResult;
  currency: string;
  stale: boolean;
  draft: Draft;
  electricityProvenance: string;
}) {
  const primaryLabel =
    result.primarySavings < 0
      ? `${result.primaryScope === "operating" ? "EV energy cost is higher" : "EV compared costs are higher"} by`
      : result.primaryScope === "operating"
      ? "Estimated annual EV operating savings"
      : "Estimated annual compared savings";
  const rangePublished = isCalculatorPublished("ev-range");
  const costPublished = isCalculatorPublished("ev-charging-cost");

  return (
    <>
      <p className="result-lede">{primaryLabel}</p>
      <p className="result-value">
        {money(Math.abs(result.primarySavings), currency)}
        <small>/year</small>
      </p>
      {stale && (
        <p className="warning" role="status">
          Inputs changed — recalculate to update this estimate.
        </p>
      )}
      <dl className="result-breakdown">
        <div>
          <dt>EV electricity cost</dt>
          <dd>{money(result.evEnergyCost, currency)}/year</dd>
        </div>
        <div>
          <dt>Fuel cost</dt>
          <dd>{money(result.fuelCost, currency)}/year</dd>
        </div>
        <div>
          <dt>Operating savings</dt>
          <dd>{money(result.operatingSavings, currency)}/year</dd>
        </div>
        <div>
          <dt>EV energy used</dt>
          <dd>
            {number(result.evBatteryEnergyKWh)} kWh battery / {number(result.evGridEnergyKWh)} kWh grid
          </dd>
        </div>
        <div>
          <dt>Fuel used</dt>
          <dd>{number(result.fuelLiters)} L/year</dd>
        </div>
        <div>
          <dt>EV cost per 100 km / 100 mi</dt>
          <dd>
            {money(result.evCostPer100Km, currency)} / {money(result.evCostPer100Mi, currency)}
          </dd>
        </div>
        <div>
          <dt>Fuel cost per 100 km / 100 mi</dt>
          <dd>
            {money(result.fuelCostPer100Km, currency)} / {money(result.fuelCostPer100Mi, currency)}
          </dd>
        </div>
      </dl>
      {result.maintenanceDifference !== null && (
        <dl className="result-breakdown">
          <div>
            <dt>Maintenance difference</dt>
            <dd>{money(result.maintenanceDifference, currency)}/year</dd>
          </div>
          <div>
            <dt>Total compared savings</dt>
            <dd>{money(result.totalComparedSavings ?? 0, currency)}/year</dd>
          </div>
        </dl>
      )}
      <section className="comparison">
        <h3>If electricity prices change</h3>
        {result.scenarios.map((scenario) => (
          <div className="contributor-label" key={scenario.label}>
            <span>
              {scenario.label} ({money(scenario.electricityPricePerKWh, currency)}/kWh)
            </span>
            <strong>{money(scenario.savings, currency)}/year</strong>
          </div>
        ))}
      </section>
      <section className="assumption-summary">
        <h3>Assumptions and provenance</h3>
        <dl>
          <div>
            <dt>Electricity price</dt>
            <dd>{money(Number(draft.electricityPrice), currency)}/kWh</dd>
          </div>
          <div>
            <dt>Electricity price source</dt>
            <dd>
              {electricityProvenance === "profile-derived"
                ? "Loaded from Energy Profile"
                : electricityProvenance === "user-currency-changed"
                ? "Profile value; calculator currency changed"
                : electricityProvenance === "user-entered"
                ? "Entered in this calculator"
                : "Example — replace with your local rate"}
            </dd>
          </div>
          <div>
            <dt>Charging efficiency</dt>
            <dd>{number(result.evGridEnergyKWh > 0 ? (result.evBatteryEnergyKWh / result.evGridEnergyKWh) * 100 : 0, 1)}%</dd>
          </div>
        </dl>
      </section>
      <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="EV Savings Calculation" />
        <PrintSpecButton />
        {rangePublished && (
          <Link className="button secondary-button" href="/ev/ev-range-calculator">
            Estimate EV range
          </Link>
        )}
        {costPublished && (
          <Link className="button secondary-button" href="/ev/ev-charging-cost-calculator">
            Calculate a charging session
          </Link>
        )}
      </div>
      <p className="form-hint" style={{ marginTop: "0.75rem" }}>
        This compares energy/fuel operating costs. It does not include live prices, depreciation, insurance, taxes, vehicle models or public charging fee systems.
      </p>
    </>
  );
}

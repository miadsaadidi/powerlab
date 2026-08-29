"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_DISPLAY_CURRENCY, DISPLAY_CURRENCIES, isSupportedCurrency } from "@/data/currencies";
import { calculateEnergyBill, type EnergyBillInput, type EnergyBillMode, type EnergyBillResult } from "@/lib/calculators/energy-bill/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

type UsageDraft = { energyKWh: string; billingDays: string; pricePerKWh: string };
type MeterDraft = { previousReading: string; currentReading: string; billingDays: string; pricePerKWh: string };
type AdvancedDraft = { fixedChargeForPeriod: string; dailyStandingCharge: string; taxPercent: string };

const initialUsage: UsageDraft = { energyKWh: "300", billingDays: "30", pricePerKWh: "0.20" };
const initialMeter: MeterDraft = { previousReading: "12000", currentReading: "12300", billingDays: "30", pricePerKWh: "0.20" };
const initialAdvanced: AdvancedDraft = { fixedChargeForPeriod: "0", dailyStandingCharge: "0", taxPercent: "0" };

const parse = (value: string) => Number(value);
const money = (value: number, currency: string) => new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
const number = (value: number, digits = 1) => new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(value);

function sharedInput(draft: UsageDraft | MeterDraft, advanced: AdvancedDraft): Omit<EnergyBillInput, "mode" | "energyKWh" | "previousReading" | "currentReading"> {
  return { billingDays: parse(draft.billingDays), pricePerKWh: parse(draft.pricePerKWh), fixedChargeForPeriod: parse(advanced.fixedChargeForPeriod), dailyStandingCharge: parse(advanced.dailyStandingCharge), taxPercent: parse(advanced.taxPercent) / 100 };
}

function resultFor(mode: EnergyBillMode, usage: UsageDraft, meter: MeterDraft, advanced: AdvancedDraft): EnergyBillResult | null {
  try {
    const input: EnergyBillInput = mode === "usage-for-period"
      ? { mode, energyKWh: parse(usage.energyKWh), ...sharedInput(usage, advanced) }
      : { mode, previousReading: parse(meter.previousReading), currentReading: parse(meter.currentReading), ...sharedInput(meter, advanced) };
    return calculateEnergyBill(input);
  } catch {
    return null;
  }
}

export function EnergyBillCalculator() {
  const [mode, setMode] = useState<EnergyBillMode>("usage-for-period");
  const [usage, setUsage] = useState<UsageDraft>(initialUsage);
  const [meter, setMeter] = useState<MeterDraft>(initialMeter);
  const [advanced, setAdvanced] = useState<AdvancedDraft>(initialAdvanced);
  const [currency, setCurrency] = useState(DEFAULT_DISPLAY_CURRENCY);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    if (profile.electricityPricePerKwh !== null) {
      const saved = profile.electricityPricePerKwh.toString();
      setUsage((current) => ({ ...current, pricePerKWh: saved }));
      setMeter((current) => ({ ...current, pricePerKWh: saved }));
    }
    if (profile.electricityCurrency && isSupportedCurrency(profile.electricityCurrency)) setCurrency(profile.electricityCurrency);
  }, []);

  const result = useMemo(() => resultFor(mode, usage, meter, advanced), [mode, usage, meter, advanced]);
  const usageLink = useMemo(() => `/home-energy/electricity-usage-calculator?price=${encodeURIComponent(mode === "usage-for-period" ? usage.pricePerKWh : meter.pricePerKWh)}`, [mode, usage.pricePerKWh, meter.pricePerKWh]);
  const setCurrentPrice = (value: string) => {
    if (mode === "usage-for-period") setUsage((current) => ({ ...current, pricePerKWh: value }));
    else setMeter((current) => ({ ...current, pricePerKWh: value }));
  };

  return <section className="calculator-shell" aria-label="Energy bill calculator">
    <div className="calculator-grid">
      <div className="calculator-card calculator-inputs">
        <div className="calculator-card-header"><div><p className="eyebrow">Quick estimate</p><h2>Bill details</h2></div></div>
        <CalculatorTrustPill />
        <fieldset className="mode-choice"><legend>What do you know?</legend>
          <label><input type="radio" checked={mode === "usage-for-period"} onChange={() => setMode("usage-for-period")} />Usage for this bill</label>
          <label><input type="radio" checked={mode === "meter-readings"} onChange={() => setMode("meter-readings")} />Meter readings</label>
        </fieldset>
        {mode === "usage-for-period" ? <div className="input-grid">
          <label>Usage for this bill (kWh)<input type="number" min="0" step="0.01" value={usage.energyKWh} onChange={(event) => setUsage({ ...usage, energyKWh: event.target.value })} /></label>
          <label>Billing period (days)<input type="number" min="1" step="1" value={usage.billingDays} onChange={(event) => setUsage({ ...usage, billingDays: event.target.value })} /><span className="helper-text">Editable whole-day period</span></label>
        </div> : <div className="input-grid">
          <label>Previous meter reading<input type="number" min="0" step="0.01" value={meter.previousReading} onChange={(event) => setMeter({ ...meter, previousReading: event.target.value })} /></label>
          <label>Current meter reading<input type="number" min="0" step="0.01" value={meter.currentReading} onChange={(event) => setMeter({ ...meter, currentReading: event.target.value })} /></label>
          <label>Billing period (days)<input type="number" min="1" step="1" value={meter.billingDays} onChange={(event) => setMeter({ ...meter, billingDays: event.target.value })} /><span className="helper-text">Required whole-day period</span></label>
        </div>}
        <div className="input-grid">
          <label>Electricity price ({currency}/kWh)<input type="number" min="0" step="0.01" value={mode === "usage-for-period" ? usage.pricePerKWh : meter.pricePerKWh} onChange={(event) => setCurrentPrice(event.target.value)} /><span className="helper-text">Example rate — replace with your rate.</span></label>
          <label>Currency<select value={currency} onChange={(event) => { const next = event.target.value; setCurrency(next); createEnergyProfileStore(window.localStorage).patchElectricityCurrency(next); }}>{DISPLAY_CURRENCIES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><span className="helper-text">Display only; changing currency does not convert the entered rate.</span></label>
        </div>
        <details open={advancedOpen} onToggle={(event) => setAdvancedOpen(event.currentTarget.open)}><summary>Advanced bill assumptions</summary>
          <div className="input-grid">
            <label>Fixed charge for this bill ({currency})<input type="number" min="0" step="0.01" value={advanced.fixedChargeForPeriod} onChange={(event) => setAdvanced({ ...advanced, fixedChargeForPeriod: event.target.value })} /></label>
            <label>Daily standing charge ({currency}/day)<input type="number" min="0" step="0.01" value={advanced.dailyStandingCharge} onChange={(event) => setAdvanced({ ...advanced, dailyStandingCharge: event.target.value })} /></label>
            <label>Tax applied to subtotal (%)<input type="number" min="0" max="100" step="0.1" value={advanced.taxPercent} onChange={(event) => setAdvanced({ ...advanced, taxPercent: event.target.value })} /></label>
          </div>
          <p className="helper-text">Actual utility taxes and fees may apply to different bill components. Enter an effective percentage only when this simplified model matches your bill.</p>
        </details>
      </div>
      <div className="calculator-card calculator-result" aria-live="polite">
        {result ? <Result result={result} currency={currency} usageLink={usageLink} /> : <><p className="eyebrow">Estimated electricity bill</p><p className="validation-message">Enter valid values to see an estimate. Usage and price may be zero; billing days must be a positive whole number.</p></>}
      </div>
    </div>
  </section>;
}

function Result({ result, currency, usageLink }: { result: EnergyBillResult; currency: string; usageLink: string }) {
  return <>
    <p className="eyebrow">Estimated electricity bill</p><div className="result-primary">{money(result.total, currency)}</div><p className="helper-text">For this {result.billingDays}-day billing period</p>
    <dl className="result-breakdown"><div><dt>Energy used</dt><dd>{number(result.energyKWh, 2)} kWh</dd></div><div><dt>Energy charge</dt><dd>{money(result.energyCharge, currency)}</dd></div><div><dt>Fixed charge for this bill</dt><dd>{money(result.fixedChargeForPeriod, currency)}</dd></div><div><dt>Standing charge</dt><dd>{money(result.standingCharge, currency)}</dd></div><div><dt>Tax applied to subtotal</dt><dd>{money(result.tax, currency)}</dd></div><div><dt>Total</dt><dd>{money(result.total, currency)}</dd></div></dl>
    <div className="result-metrics"><div><strong>{number(result.averageDailyKWh)} kWh</strong><span>average usage/day</span></div><div><strong>{money(result.averageDailyCost, currency)}</strong><span>average cost/day</span></div></div>
    <div className="scenario"><h3>What-if usage comparison</h3>{result.scenarios.map((scenario) => <div className="contributor-label" key={scenario.label}><span>{scenario.label}</span><strong>{money(scenario.total, currency)}</strong></div>)}</div>
    <p className="helper-text"><strong>Annualized run-rate estimate:</strong> {number(result.annualizedEnergyKWh)} kWh/year · {money(result.annualizedTotal, currency)}/year. This assumes the same daily usage and charges continue; it is not an expected annual bill.</p>
    <Link className="secondary-button" href={usageLink}>Estimate where your electricity use comes from</Link>

    <GooglePreferredBanner />

    <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ShareButton title="Energy Bill Calculation" />
      <PrintSpecButton />
    </div>
  </>;
}

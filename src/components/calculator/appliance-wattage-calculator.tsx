"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { APPLIANCES } from "@/data/appliances";
import { DEFAULT_DISPLAY_CURRENCY, DISPLAY_CURRENCIES, isSupportedCurrency } from "@/data/currencies";
import { calculateApplianceWattage, type ApplianceSource, type ApplianceWattageResult } from "@/lib/calculators/appliance-wattage/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { track } from "@/lib/analytics/analytics";

type SourceMode = ApplianceSource["sourceMode"];
type StartupMode = "unknown" | "explicit-watts" | "user-multiplier";
type Draft = {
  sourceMode: SourceMode;
  presetId: string;
  presetWatts: string;
  labelWatts: string;
  volts: string;
  amps: string;
  powerFactor: string;
  quantity: string;
  runtimeHours: string;
  dutyPercent: string;
  startupMode: StartupMode;
  startupWatts: string;
  startupMultiplier: string;
  costEnabled: boolean;
  pricePerKWh: string;
};

const initialDraft: Draft = {
  sourceMode: "preset",
  presetId: "led-tv",
  presetWatts: "100",
  labelWatts: "100",
  volts: "230",
  amps: "0.5",
  powerFactor: "1.00",
  quantity: "1",
  runtimeHours: "4",
  dutyPercent: "100",
  startupMode: "unknown",
  startupWatts: "",
  startupMultiplier: "2",
  costEnabled: false,
  pricePerKWh: "0.20",
};

const QUICK_APPLIANCE_PRESETS = [
  { label: "🍳 Fridge (150W)", presetId: "refrigerator", watts: "150", hours: "24", duty: "35", startupWatts: "450" },
  { label: "☕ Kettle (1.8kW)", presetId: "electric-kettle", watts: "1800", hours: "0.25", duty: "100", startupWatts: "1800" },
  { label: "💻 PC Setup (200W)", presetId: "desktop", watts: "200", hours: "8", duty: "100", startupWatts: "200" },
  { label: "❄️ Window AC (1.2kW)", presetId: "window-ac", watts: "1200", hours: "6", duty: "60", startupWatts: "2400" },
  { label: "🔥 Space Heater (1.5kW)", presetId: "space-heater", watts: "1500", hours: "4", duty: "100", startupWatts: "1500" },
];

const parseOptional = (value: string) => value.trim() === "" ? undefined : Number(value);
const formatNumber = (value: number, digits = 2) => new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(value);
const money = (value: number, currency: string) => new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);

function buildInput(draft: Draft) {
  const source: ApplianceSource = draft.sourceMode === "preset"
    ? { sourceMode: "preset", presetId: draft.presetId, unitRunningWatts: Number(draft.presetWatts) }
    : draft.sourceMode === "label-watts"
      ? { sourceMode: "label-watts", unitRunningWatts: Number(draft.labelWatts) }
      : { sourceMode: "label-volts-amps", volts: Number(draft.volts), amps: Number(draft.amps), powerFactor: Number(draft.powerFactor) };

  return {
    source,
    quantity: Number(draft.quantity),
    runtimeHours: parseOptional(draft.runtimeHours),
    dutyCycle: Number(draft.dutyPercent) / 100,
    startupSource: draft.startupMode,
    startupWatts: parseOptional(draft.startupWatts),
    startupMultiplier: parseOptional(draft.startupMultiplier),
    costEnabled: draft.costEnabled,
    pricePerKWh: parseOptional(draft.pricePerKWh),
  };
}

export function ApplianceWattageCalculator() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [currency, setCurrency] = useState(DEFAULT_DISPLAY_CURRENCY);
  const [result, setResult] = useState<ApplianceWattageResult | null>(() => {
    try {
      return calculateApplianceWattage(buildInput(initialDraft));
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    setDraft((current) => ({ ...current, pricePerKWh: profile.electricityPricePerKwh?.toString() ?? current.pricePerKWh }));
    if (profile.electricityCurrency && isSupportedCurrency(profile.electricityCurrency)) setCurrency(profile.electricityCurrency);
  }, []);

  const selectedPreset = useMemo(() => APPLIANCES.find((item) => item.id === draft.presetId) ?? APPLIANCES[0], [draft.presetId]);

  // Real-time calculation on input change
  useEffect(() => {
    try {
      const next = calculateApplianceWattage(buildInput(draft));
      setResult(next);
      setStale(false);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Enter valid appliance values.");
    }
  }, [draft]);

  const update = (patch: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setError(null);
  };

  const calculate = () => {
    try {
      const next = calculateApplianceWattage(buildInput(draft));
      setResult(next);
      setStale(false);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Enter valid appliance values.");
    }
  };

  const applyPreset = (preset: typeof QUICK_APPLIANCE_PRESETS[0]) => {
    const updatedDraft: Draft = {
      ...draft,
      sourceMode: "preset",
      presetId: preset.presetId,
      presetWatts: preset.watts,
      runtimeHours: preset.hours,
      dutyPercent: preset.duty,
      startupMode: "explicit-watts",
      startupWatts: preset.startupWatts,
    };
    setDraft(updatedDraft);
    try {
      const next = calculateApplianceWattage(buildInput(updatedDraft));
      setResult(next);
      setStale(false);
      setError(null);
    } catch {
      if (result) setStale(true);
    }
    track("calculator_preset_click", { calculator_id: "appliance-wattage", preset: preset.label });
  };

  const sourceLabel = draft.sourceMode === "preset" ? "Choose an appliance" : draft.sourceMode === "label-watts" ? "Read a label: watts" : "Read a label: volts + amps";
  const handoffs = [
    isCalculatorPublished("electricity-usage") && { href: "/home-energy/electricity-usage-calculator", label: "Use in Electricity Usage" },
    isCalculatorPublished("solar-load") && { href: "/solar/solar-load-calculator", label: "Use in Solar Load" },
    isCalculatorPublished("battery-runtime") && { href: "/battery/battery-runtime-calculator", label: "Check Battery Runtime" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return <section className="calculator-shell" aria-label="Appliance wattage calculator">
    <div className="calculator-grid">
      <div className="calculator-card calculator-inputs">
        <div className="calculator-card-header"><div><p className="eyebrow">Quick estimate</p><h2>Appliance details</h2></div></div>

        {/* Quick Scenario Chips */}
        <div className="preset-chips-container" role="region" aria-label="Quick Appliance Scenarios">
          <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Heavy Appliances</span>
          <div className="preset-chips-row">
            {QUICK_APPLIANCE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className={`preset-chip-btn ${draft.presetId === p.presetId ? "active" : ""}`}
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="mode-choice"><legend>How do you know the appliance power?</legend>
          <label><input type="radio" checked={draft.sourceMode === "preset"} onChange={() => update({ sourceMode: "preset" })} />Choose an appliance</label>
          <label><input type="radio" checked={draft.sourceMode === "label-watts"} onChange={() => update({ sourceMode: "label-watts" })} />Read a label: watts</label>
          <label><input type="radio" checked={draft.sourceMode === "label-volts-amps"} onChange={() => update({ sourceMode: "label-volts-amps" })} />Read a label: volts + amps</label>
        </fieldset>

        {draft.sourceMode === "preset" && <div className="input-grid">
          <label>Appliance<select value={draft.presetId} onChange={(event) => { const preset = APPLIANCES.find((item) => item.id === event.target.value) ?? APPLIANCES[0]; update({ presetId: preset.id, presetWatts: String(preset.watts), dutyPercent: String(preset.defaultDutyCycle * 100) }); }}>{APPLIANCES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <label>Running watts per appliance<input type="number" min="0" step="any" value={draft.presetWatts} onChange={(event) => update({ presetWatts: event.target.value })} /></label>
        </div>}

        {draft.sourceMode === "label-watts" && <label>Label watts<input type="number" min="0" step="any" value={draft.labelWatts} onChange={(event) => update({ labelWatts: event.target.value })} /><span className="helper-text">Use the device label or a measured value when available.</span></label>}

        {draft.sourceMode === "label-volts-amps" && <div className="input-grid">
          <label>Voltage<input type="number" min="0" step="any" value={draft.volts} onChange={(event) => update({ volts: event.target.value })} /><span className="input-unit">V</span></label>
          <label>Current<input type="number" min="0" step="any" value={draft.amps} onChange={(event) => update({ amps: event.target.value })} /><span className="input-unit">A</span></label>
          <label>Power factor<input type="number" min="0.01" max="1" step="0.01" value={draft.powerFactor} onChange={(event) => update({ powerFactor: event.target.value })} /><span className="helper-text">Editable planning assumption; default 1.00.</span></label>
        </div>}

        {draft.sourceMode === "label-volts-amps" && <p className="helper-text">Use actual watts when available. Power factor is a planning input when only volts and amps are known.</p>}
        <div className="input-grid">
          <label>Quantity<input type="number" min="1" step="1" value={draft.quantity} onChange={(event) => update({ quantity: event.target.value })} /></label>
          <label>Runtime (hours/day)<input type="number" min="0" max="24" step="0.25" value={draft.runtimeHours} placeholder="Optional" onChange={(event) => update({ runtimeHours: event.target.value })} /><span className="helper-text">Leave blank for wattage only.</span></label>
        </div>

        <details open={advancedOpen} onToggle={(event) => setAdvancedOpen(event.currentTarget.open)}><summary>Advanced settings</summary>
          <label>Duty cycle (%)<input type="number" min="1" max="100" step="1" value={draft.dutyPercent} onChange={(event) => update({ dutyPercent: event.target.value })} /><span className="helper-text">Planning estimate. It changes energy use, not connected running watts.</span></label>
          <fieldset className="mode-choice"><legend>Startup estimate</legend>
            <label><input type="radio" checked={draft.startupMode === "unknown"} onChange={() => update({ startupMode: "unknown" })} />Unknown</label>
            <label><input type="radio" checked={draft.startupMode === "explicit-watts"} onChange={() => update({ startupMode: "explicit-watts" })} />Startup watts</label>
            <label><input type="radio" checked={draft.startupMode === "user-multiplier"} onChange={() => update({ startupMode: "user-multiplier" })} />Multiplier</label>
          </fieldset>
          {draft.startupMode === "explicit-watts" && <label>Startup watts per appliance<input type="number" min="0" step="any" value={draft.startupWatts} onChange={(event) => update({ startupWatts: event.target.value })} /></label>}
          {draft.startupMode === "user-multiplier" && <label>User-entered startup multiplier<input type="number" min="1" step="0.1" value={draft.startupMultiplier} onChange={(event) => update({ startupMultiplier: event.target.value })} /></label>}
          <label><input type="checkbox" checked={draft.costEnabled} onChange={(event) => update({ costEnabled: event.target.checked })} /> Include estimated cost</label>
          {draft.costEnabled && <div className="input-grid"><label>Electricity price<input type="number" min="0" step="0.01" value={draft.pricePerKWh} onChange={(event) => update({ pricePerKWh: event.target.value })} /><span className="input-unit">{currency}/kWh</span></label><label>Currency<select value={currency} onChange={(event) => setCurrency(event.target.value)}>{DISPLAY_CURRENCIES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><span className="helper-text">Display only; changing currency does not convert the price.</span></label></div>}
        </details>

        <button type="button" className="primary-button" onClick={calculate}>{result && stale ? "Recalculate" : "Calculate Wattage"}</button>
        {error && <p className="validation-message" role="alert">{error}</p>}
      </div>

      <div className="calculator-card calculator-result" aria-live="polite">
        <p className="eyebrow">Appliance wattage result</p>
        {!result ? <p className="helper-text">Enter appliance details, then calculate to see running power and optional energy use.</p> : <Result result={result} draft={draft} currency={currency} stale={stale} preset={selectedPreset} handoffs={handoffs} sourceLabel={sourceLabel} />}
      </div>
    </div>
  </section>;
}

function Result({ result, draft, currency, stale, preset, handoffs, sourceLabel }: { result: ApplianceWattageResult; draft: Draft; currency: string; stale: boolean; preset: typeof APPLIANCES[number]; handoffs: Array<{ href: string; label: string }>; sourceLabel: string }) {
  const comparison = draft.sourceMode === "preset" && preset.typicalMinW !== undefined && preset.typicalMaxW !== undefined && result.energyKWh !== null ? [
    ["Low", preset.typicalMinW], ["Selected", result.unitRunningWatts], ["High", preset.typicalMaxW],
  ] : null;
  return <>
    {stale && <p className="validation-message" role="status">This result is from the previous inputs. Recalculate to update it.</p>}
    <div className="result-primary">{formatNumber(result.totalRunningWatts)} W</div>
    <p className="helper-text">{result.quantity > 1 ? "Total connected running load" : "Estimated running power"} · {formatNumber(result.totalRunningKilowatts, 3)} kW</p>
    {result.quantity > 1 && <dl className="result-breakdown"><div><dt>Running power per appliance</dt><dd>{formatNumber(result.unitRunningWatts)} W</dd></div><div><dt>Quantity</dt><dd>{result.quantity}</dd></div><div><dt>Total connected running load</dt><dd>{formatNumber(result.totalRunningWatts)} W</dd></div></dl>}
    {result.apparentVA !== null && <dl className="result-breakdown"><div><dt>Apparent power</dt><dd>{formatNumber(result.apparentVA)} VA</dd></div><div><dt>Power factor</dt><dd>{result.powerFactor?.toFixed(2)}</dd></div><div><dt>Estimated real power</dt><dd>{formatNumber(result.unitRunningWatts)} W</dd></div></dl>}
    {result.energyKWh === null ? <p className="helper-text">{draft.costEnabled ? "Enter runtime to estimate energy and cost." : "Enter runtime to estimate energy use."}</p> : <dl className="result-breakdown"><div><dt>Energy for selected daily runtime</dt><dd>{formatNumber(result.energyWh ?? 0)} Wh · {formatNumber(result.energyKWh, 3)} kWh</dd></div>{result.optionalCost !== null && <div><dt>Estimated cost for selected daily runtime</dt><dd>{money(result.optionalCost, currency)}</dd></div>}</dl>}
    {result.startupDataSource === "unknown" ? <p className="helper-text">Startup demand not estimated.</p> : <dl className="result-breakdown"><div><dt>Startup watts per appliance</dt><dd>{formatNumber(result.unitStartupWatts ?? 0)} W</dd></div><div><dt>Total startup estimate</dt><dd>{formatNumber(result.totalStartupWatts ?? 0)} W</dd></div></dl>}
    {comparison && <div className="scenario"><h3>Typical wattage range</h3><p className="helper-text">Comparison values are per-appliance planning estimates.</p>{comparison.map(([label, watts]) => <div className="contributor-label" key={label}><span>{label} · {watts} W per appliance</span><strong>{formatNumber(Number(watts) * result.quantity * (result.runtimeHours ?? 0) * result.dutyCycle)} Wh</strong></div>)}</div>}
    <p className="helper-text">Source: {sourceLabel}. Presets and duty cycles are editable estimates; device labels or measured values should replace them when available.</p>

    <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ShareButton getShareUrl={() => typeof window !== "undefined" ? window.location.href : ""} />
      <PrintSpecButton />
    </div>

    {handoffs.length > 0 && (
      <div className="scenario" style={{ marginTop: "1.2rem" }}>
        <h3 style={{ fontSize: "0.95rem", marginBottom: "0.6rem" }}>Use this result elsewhere</h3>
        <div className="handoff-button-group" style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {handoffs.map((handoff) => (
            <Link
              className="button secondary-button handoff-link"
              href={handoff.href}
              key={handoff.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.55rem 0.85rem",
                borderRadius: "0.5rem",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <span>{handoff.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    )}
  </>;
}


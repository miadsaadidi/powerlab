"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { APPLIANCES } from "@/data/appliances";
import { calculateSolarLoad, type SolarLoadResult, type SolarLoadRowInput } from "@/lib/calculators/solar-load/engine";
import { createStarterSolarLoadRows, importSolarLoadRows } from "@/lib/calculators/solar-load/initialization";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";
import { buildSolarBatteryHandoffUrl } from "@/lib/calculators/solar-load/handoff";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

type Row = SolarLoadRowInput & { presetId?: string };

const formatKWh = (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 3 })} kWh/day`;
const formatWh = (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} Wh/day`;
const formatW = (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} W`;
const makeId = (() => { let count = 0; return (prefix: string) => `${prefix}-${++count}`; })();

function rowError(row: Row): string | null {
  if (!Number.isFinite(row.watts) || row.watts <= 0) return "Watts must be greater than zero.";
  if (!Number.isFinite(row.quantity) || !Number.isInteger(row.quantity) || row.quantity <= 0) return "Quantity must be a positive whole number.";
  if (!Number.isFinite(row.hoursPerDay) || row.hoursPerDay < 0 || row.hoursPerDay > 24) return "Hours per day must be between 0 and 24.";
  if (!Number.isFinite(row.dutyCycle) || row.dutyCycle <= 0 || row.dutyCycle > 1) return "Duty cycle must be greater than 0% and no more than 100%.";
  return null;
}

function starterRow(row: SolarLoadRowInput): Row {
  return { ...row, id: row.id.startsWith("profile-") ? row.id : makeId(row.id) };
}

export function SolarLoadCalculator() {
  const [rows, setRows] = useState<Row[]>(() => createStarterSolarLoadRows().map(starterRow));
  const [search, setSearch] = useState("");
  const [imported, setImported] = useState(false);
  const [weeklyImported, setWeeklyImported] = useState(false);
  const [advancedRows, setAdvancedRows] = useState<Record<string, boolean>>({});
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(0);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const importedRows = importSolarLoadRows(profile.usageRows);
    if (importedRows.length > 0) {
      setRows(importedRows.map((row) => ({ ...row, id: `${row.id}-${++nextId.current}` })));
      setImported(true);
      setWeeklyImported(profile.usageRows.some((row) => row.mode === "watts-time" && (row.daysPerWeek ?? 7) < 7));
      setAnnouncement("Saved appliance rows loaded. Review which loads are essential.");
    }
    track("calculator_view", { calculator_id: "solar-load", category: "solar", phase: 3 });
  }, []);

  const result = useMemo<SolarLoadResult | null>(() => {
    try { return calculateSolarLoad({ rows }); } catch { return null; }
  }, [rows]);
  const visibleAppliances = useMemo(() => {
    const query = search.trim().toLowerCase();
    return APPLIANCES.filter((item) => !query || item.label.toLowerCase().includes(query)).slice(0, 10);
  }, [search]);
  const batteryPublished = isCalculatorPublished("solar-battery-bank-size");
  const batteryHandoffUrl = result ? buildSolarBatteryHandoffUrl(result.result.totalDailyKWh, batteryPublished) : null;

  const updateRow = (id: string, update: Partial<Row>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...update } : row));
  const addPreset = (presetId: string) => {
    const preset = APPLIANCES.find((item) => item.id === presetId) ?? APPLIANCES.find((item) => item.id === "custom")!;
    const schedule = presetId === "custom" ? { hoursPerDay: 1, dutyCycle: 1 } : { hoursPerDay: ({ "refrigerator": 24, "wifi-router": 24, "led-bulb": 5, "led-tv": 4 } as Record<string, number>)[presetId] ?? 1, dutyCycle: preset.defaultDutyCycle };
    setRows((current) => [...current, { id: `${presetId}-${++nextId.current}`, presetId, label: preset.label, watts: preset.watts, quantity: 1, hoursPerDay: schedule.hoursPerDay, dutyCycle: schedule.dutyCycle, essential: false }]);
    setSearch("");
  };
  const removeRow = (id: string) => setRows((current) => current.filter((row) => row.id !== id));
  const updatePreset = (rowId: string, presetId: string) => {
    const preset = APPLIANCES.find((item) => item.id === presetId) ?? APPLIANCES.find((item) => item.id === "custom")!;
    updateRow(rowId, { presetId, label: preset.label, watts: preset.watts, dutyCycle: preset.defaultDutyCycle });
  };
  const batteryHandoff = () => {
    if (!batteryHandoffUrl) return;
    track("calculator_handoff", { from_calculator_id: "solar-load", to_calculator_id: "solar-battery-bank-size" });
    window.location.href = batteryHandoffUrl;
  };

  return <section className="calculator solar-load-calculator" aria-labelledby="solar-load-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <p className="eyebrow">Quick estimate</p>
        <h2 id="solar-load-heading">Build your solar load profile</h2>
        <CalculatorTrustPill />
        {imported && <p className="form-hint" role="status">Saved appliance rows loaded. Review imported appliances and mark the loads you consider essential.</p>}
        {weeklyImported && <p className="form-hint" role="status">Weekly schedules are averaged across seven days for daily-energy planning.</p>}
        <label htmlFor="solar-load-search">Add an appliance</label>
        <input id="solar-load-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search appliance presets..." />
        <div className="appliance-options" role="listbox" aria-label="Solar load appliance presets">{visibleAppliances.map((preset) => { const isAdded = rows.some((r) => r.presetId === preset.id || r.label === preset.label); return <button type="button" key={preset.id} className={isAdded ? "selected" : ""} onClick={() => addPreset(preset.id)}><span>{isAdded ? "✓ " : "+ "}{preset.label}</span><small>{preset.watts} W · {preset.category}</small></button>; })}</div>
        <p className="form-hint">Presets are editable planning estimates. Add Custom Appliance when you know a different load.</p>
        <div className="usage-rows" aria-label="Solar load appliances">
          {rows.map((row) => {
            const error = rowError(row);
            const activeDetails = advancedRows[row.id] ?? false;
            return <div className="usage-row solar-load-row" key={row.id}>
              <div className="solar-load-row-heading"><strong>{row.label}</strong>{row.dutyCycle < 1 && <span className="form-hint">Cycling estimate: {(row.dutyCycle * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>}</div>
              <label>Watts<input aria-label={`${row.label} watts`} type="number" min="0.01" step="any" value={row.watts} onChange={(event) => updateRow(row.id, { watts: Number(event.target.value) })} /></label>
              <label>Qty<input aria-label={`${row.label} quantity`} type="number" min="1" step="1" value={row.quantity} onChange={(event) => updateRow(row.id, { quantity: Number(event.target.value) })} /></label>
              <label>Hours/day<input aria-label={`${row.label} hours per day`} type="number" min="0" max="24" step="0.25" value={row.hoursPerDay} onChange={(event) => updateRow(row.id, { hoursPerDay: Number(event.target.value) })} /></label>
              <label className="switch-row"><input type="checkbox" checked={row.essential} onChange={(event) => updateRow(row.id, { essential: event.target.checked })} /> Essential</label>
              <details open={activeDetails} onToggle={(event) => setAdvancedRows((current) => ({ ...current, [row.id]: event.currentTarget.open }))}><summary>Row details</summary><label>Preset/custom<select value={row.presetId ?? "custom"} onChange={(event) => updatePreset(row.id, event.target.value)}>{APPLIANCES.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><label>Duty cycle (%)<input type="number" min="0.01" max="100" step="any" value={row.dutyCycle * 100} onChange={(event) => updateRow(row.id, { dutyCycle: Number(event.target.value) / 100 })} /></label><p className="form-hint">Duty cycle is a planning estimate for how often the appliance draws its listed watts. It remains editable.</p></details>
              {error && <p className="error" role="alert">{error}</p>}
              <button type="button" className="text-button" onClick={() => removeRow(row.id)} aria-label={`Remove ${row.label}`}>Remove</button>
            </div>;
          })}
        </div>
        <button type="button" className="secondary-button" onClick={() => addPreset("custom")}>+ Add custom appliance</button>
      </div>
      <aside className="result-panel" aria-live="polite">
        <p className="eyebrow">Solar load estimate</p>
        {result ? <>
          <p className="result-lede">Estimated daily load</p>
          <p className="result-value">{formatKWh(result.result.totalDailyKWh)}</p>
          <StandardsBadge standards={["IEEE 1013", "IEC 61724", "NEC Art. 690"]} />
          <dl className="result-breakdown"><div><dt>Essential load</dt><dd>{formatKWh(result.result.essentialDailyKWh)}</dd></div><div><dt>Other load</dt><dd>{formatKWh(result.result.otherDailyKWh)}</dd></div><div><dt>Listed-load running watts</dt><dd>{formatW(result.result.connectedRunningW)}</dd></div></dl>
          <p className="form-hint">Running watts if all listed loads operate together. This is not a measured peak and does not include startup surge.</p>
          <section className="comparison"><h3>All loads vs Essential only</h3><dl><div><dt>All loads</dt><dd>{formatKWh(result.result.comparison.allLoads.dailyKWh)} · {formatW(result.result.comparison.allLoads.connectedW)}</dd></div><div className="current-comparison"><dt>Essential only</dt><dd>{formatKWh(result.result.comparison.essentialOnly.dailyKWh)} · {formatW(result.result.comparison.essentialOnly.connectedW)}</dd></div></dl></section>
          {result.result.topContributors.length > 0 && <section className="comparison"><h3>Top energy contributors</h3><dl>{result.result.topContributors.slice(0, 5).map((item) => <div key={item.id}><dt>{item.label}</dt><dd>{formatWh(item.dailyKWh * 1_000)} · {item.sharePercent.toLocaleString(undefined, { maximumFractionDigits: 1 })}%</dd></div>)}</dl></section>}
          <section className="assumption-summary"><h3>Important assumptions</h3><p className="form-hint">Non-100% duty cycles remain visible on their rows. Preset duty cycles are editable planning estimates, not universal appliance specifications.</p><p className="form-hint">Weekly schedules are averaged across seven days. Average daily load is not a worst-case daily load.</p></section>
          <section className="warning"><h3>Capacity and surge limitation</h3><p>Peak/surge output is not calculated. This tool does not verify inverter sizing, battery or BMS current limits, circuit loading, wiring or installation compatibility.</p></section>
          
          <GooglePreferredBanner />

          <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <ShareButton title="Solar Load Calculation" />
            <PrintSpecButton />
            {batteryPublished && (batteryHandoffUrl ? <button className="button" type="button" onClick={batteryHandoff}>Size battery storage for this load</button> : <p className="form-hint">Add some daily energy use before sizing battery storage.</p>)}
            <Link className="button secondary-button" href="/home-energy/electricity-usage-calculator">Review household electricity use</Link>
          </div>
        </> : <p className="validation-message">Enter valid appliance values to see an estimate.</p>}
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </aside>
    </div>
  </section>;
}

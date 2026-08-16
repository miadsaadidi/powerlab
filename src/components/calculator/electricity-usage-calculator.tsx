"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES } from "@/data/appliances";
import { getApplianceUsagePreset } from "@/data/appliance-usage-presets";
import { calculateOneHourLess, calculateUsage, calculateUsageProfile, type UsageInput, type UsageMode } from "@/lib/calculators/electricity-usage/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";

const money = (n: number) => `$${n.toFixed(2)}`;
const kwh = (n: number) => n < 1 ? n.toFixed(2) : n.toFixed(1);
type Row = { id: string; applianceId: string; mode: UsageMode; watts: number; quantity: number; hours: number; days: number; duty: number; cycle: number; cycles: number; labelKWh: number; labelPeriod: "month" | "year" };

const makeRow = (applianceId = "led-tv"): Row => {
  const appliance = APPLIANCES.find((item) => item.id === applianceId) ?? APPLIANCES[0];
  const schedule = getApplianceUsagePreset(appliance.id);
  return { id: `${appliance.id}-${Date.now()}-${Math.random()}`, applianceId: appliance.id, mode: "watts-time", watts: appliance.watts, quantity: 1, hours: schedule.hoursPerDay, days: schedule.daysPerWeek, duty: schedule.dutyCycle, cycle: 1, cycles: 1, labelKWh: 365, labelPeriod: "year" };
};

function toInput(row: Row, price?: number): UsageInput {
  if (row.mode === "kwh-cycle") return { mode: row.mode, quantity: row.quantity, kWhPerCycle: row.cycle, cyclesPerWeek: row.cycles, pricePerKWh: price };
  if (row.mode === "label-energy") return { mode: row.mode, quantity: row.quantity, labelKWh: row.labelKWh, labelPeriod: row.labelPeriod, pricePerKWh: price };
  return { mode: row.mode, quantity: row.quantity, watts: row.watts, hoursPerDay: row.hours, daysPerWeek: row.days, dutyCycle: row.duty, pricePerKWh: price };
}

export function ElectricityUsageCalculator() {
  const [homeMode, setHomeMode] = useState(false);
  const [rows, setRows] = useState<Row[]>([makeRow()]);
  const [costEnabled, setCostEnabled] = useState(false);
  const [price, setPrice] = useState(0.2);
  const [search, setSearch] = useState("");
  const [advanced, setAdvanced] = useState(false);
  useEffect(() => {
    const savedPrice = createEnergyProfileStore(window.localStorage).read().electricityPricePerKwh;
    const handoffPrice = Number(new URLSearchParams(window.location.search).get("price"));
    if (Number.isFinite(handoffPrice) && handoffPrice >= 0) setPrice(handoffPrice);
    else if (savedPrice !== null) setPrice(savedPrice);
  }, []);
  const row = rows[0];
  const visibleAppliances = useMemo(() => APPLIANCES.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())).slice(0, 8), [search]);
  const updateRow = (id: string, patch: Partial<Row>) => setRows((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const selected = APPLIANCES.find((item) => item.id === row.applianceId) ?? APPLIANCES[0];
  const singleResult = useMemo(() => { try { return calculateUsage(toInput(row, costEnabled ? price : undefined)); } catch { return null; } }, [row, costEnabled, price]);
  const profile = useMemo(() => { try { return homeMode ? calculateUsageProfile(rows.map((item) => ({ id: item.id, label: APPLIANCES.find((a) => a.id === item.applianceId)?.label ?? "Appliance", input: toInput(item, costEnabled ? price : undefined) }))) : null; } catch { return null; } }, [homeMode, rows, costEnabled, price]);
  const scenario = useMemo(() => { if (!singleResult || row.mode !== "watts-time" || row.hours <= 1) return null; try { return calculateOneHourLess(toInput(row)); } catch { return null; } }, [singleResult, row]);
  const result = homeMode ? profile : singleResult;
  const daily = homeMode ? (profile?.totalAverageDailyKWh ?? 0) : (singleResult?.averageDailyKWh ?? 0);
  const monthly = homeMode ? (profile?.totalMonthlyKWh ?? 0) : (singleResult?.monthlyKWh ?? 0);
  const annual = homeMode ? (profile?.totalAnnualKWh ?? 0) : (singleResult?.annualKWh ?? 0);

  const chooseAppliance = (id: string) => {
    const appliance = APPLIANCES.find((item) => item.id === id) ?? APPLIANCES[0];
    const schedule = getApplianceUsagePreset(appliance.id);
    updateRow(row.id, { applianceId: appliance.id, watts: appliance.watts, hours: schedule.hoursPerDay, days: schedule.daysPerWeek, duty: schedule.dutyCycle });
  };

  return <section className="calculator-shell" aria-label="Electricity usage calculator">
    <div className="calculator-grid">
      <div className="calculator-card calculator-inputs">
        <div className="calculator-card-header"><div><p className="eyebrow">Quick estimate</p><h2>{homeMode ? "Build my home" : "Single appliance"}</h2></div><button type="button" className="text-button" onClick={() => setHomeMode((value) => !value)}>{homeMode ? "Single appliance" : "Build my home"}</button></div>
        {!homeMode && <><label htmlFor="appliance-search">Appliance</label><input id="appliance-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search appliances..." /><div className="appliance-options" role="listbox" aria-label="Appliance presets">{visibleAppliances.map((item) => <button type="button" className={item.id === row.applianceId ? "selected" : ""} key={item.id} onClick={() => chooseAppliance(item.id)}>{item.label}</button>)}</div><p className="helper-text">Typical estimate — adjust to match your actual usage.</p></>}
        <fieldset className="mode-choice"><legend>How do you know its energy use?</legend>{([["watts-time", "Power + time"], ["kwh-cycle", "Energy per cycle"], ["label-energy", "Energy label"]] as const).map(([value, label]) => <label key={value}><input type="radio" checked={row.mode === value} onChange={() => updateRow(row.id, { mode: value })} />{label}</label>)}</fieldset>
        <div className="input-grid">
          {row.mode === "watts-time" && <><label>Power (W)<input type="number" min="0" value={row.watts} onChange={(e) => updateRow(row.id, { watts: Number(e.target.value) })} /></label><label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label><label>Hours per day<input type="number" min="0" max="24" step="0.25" value={row.hours} onChange={(e) => updateRow(row.id, { hours: Number(e.target.value) })} /></label><label>Days per week<input type="number" min="1" max="7" value={row.days} onChange={(e) => updateRow(row.id, { days: Number(e.target.value) })} /></label></>}
          {row.mode === "kwh-cycle" && <><label>kWh per cycle<input type="number" min="0" step="0.1" value={row.cycle} onChange={(e) => updateRow(row.id, { cycle: Number(e.target.value) })} /></label><label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label><label>Cycles per week<input type="number" min="0" step="0.1" value={row.cycles} onChange={(e) => updateRow(row.id, { cycles: Number(e.target.value) })} /></label></>}
          {row.mode === "label-energy" && <><label>Energy label (kWh)<input type="number" min="0" value={row.labelKWh} onChange={(e) => updateRow(row.id, { labelKWh: Number(e.target.value) })} /></label><label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label><label>Period<select value={row.labelPeriod} onChange={(e) => updateRow(row.id, { labelPeriod: e.target.value as Row["labelPeriod"] })}><option value="year">per year</option><option value="month">per month</option></select></label></>}
        </div>
        {row.mode === "watts-time" && <details open={advanced} onToggle={(e) => setAdvanced(e.currentTarget.open)}><summary>Advanced settings</summary><label>Duty cycle (%)<input type="number" min="1" max="100" value={row.duty * 100} onChange={(e) => updateRow(row.id, { duty: Number(e.target.value) / 100 })} /></label></details>}
        {homeMode && <div className="usage-rows"><h3>Appliances</h3>{rows.map((item) => <div className="usage-row" key={item.id}><strong>{APPLIANCES.find((a) => a.id === item.applianceId)?.label}</strong><label>W<input aria-label={`${item.applianceId} watts`} type="number" min="0" value={item.watts} onChange={(e) => updateRow(item.id, { watts: Number(e.target.value) })} /></label><label>h/day<input aria-label={`${item.applianceId} hours per day`} type="number" min="0" max="24" step="0.25" value={item.hours} onChange={(e) => updateRow(item.id, { hours: Number(e.target.value) })} /></label><label>Qty<input aria-label={`${item.applianceId} quantity`} type="number" min="1" value={item.quantity} onChange={(e) => updateRow(item.id, { quantity: Number(e.target.value) })} /></label><details className="row-options"><summary>More options</summary><label>Input mode<select value={item.mode} onChange={(e) => updateRow(item.id, { mode: e.target.value as UsageMode })}><option value="watts-time">Power + time</option><option value="kwh-cycle">Energy per cycle</option><option value="label-energy">Energy label</option></select></label><label>Days/week<input type="number" min="1" max="7" value={item.days} onChange={(e) => updateRow(item.id, { days: Number(e.target.value) })} /></label><label>Duty cycle (%)<input type="number" min="1" max="100" value={item.duty * 100} onChange={(e) => updateRow(item.id, { duty: Number(e.target.value) / 100 })} /></label></details><button type="button" className="text-button" onClick={() => setRows((current) => current.filter((r) => r.id !== item.id))} aria-label={`Remove ${item.applianceId}`}>Remove</button></div>)}<button type="button" className="secondary-button" onClick={() => setRows((current) => [...current, makeRow("wifi-router")])}>+ Add appliance</button></div>}
        <div className="cost-section"><label><input type="checkbox" checked={costEnabled} onChange={(e) => setCostEnabled(e.target.checked)} /> Include estimated cost</label>{costEnabled && <label>Electricity price ($/kWh)<input type="number" min="0" step="0.01" value={price} onChange={(e) => { const next = Number(e.target.value); setPrice(next); if (Number.isFinite(next) && next >= 0) createEnergyProfileStore(window.localStorage).patchElectricityPricePerKwh(next); }} /></label>}<p className="helper-text">Example rate — replace with your actual rate.</p></div>
      </div>
      <div className="calculator-card calculator-result" aria-live="polite"><p className="eyebrow">Estimated electricity use</p>{result ? <>{<div className="result-metrics"><div><strong>{kwh(daily)} kWh</strong><span>per day</span></div><div><strong>{kwh(monthly)} kWh</strong><span>per month</span></div><div><strong>{kwh(annual)} kWh</strong><span>per year</span></div></div>}{!homeMode && singleResult && <p className="helper-text">{row.mode === "watts-time" ? `${row.watts} W × ${row.hours} hours/day × ${row.days} days/week = ${singleResult.weeklyKWh.toFixed(2)} kWh/week.` : "Energy-label and cycle values are used directly, then normalized to daily, monthly and annual use."}</p>}{homeMode && profile && <div className="usage-contributors"><h3>Biggest contributors</h3>{profile.rows.slice().sort((a, b) => b.sharePercent - a.sharePercent).map((item) => <div key={item.id}><div className="contributor-label"><span>{item.label}</span><span>{item.sharePercent.toFixed(0)}%</span></div><div className="contributor-bar"><span style={{ width: `${item.sharePercent}%` }} /></div></div>)}</div>}{!homeMode && scenario && <div className="scenario"><h3>What if I use this appliance one hour less per day?</h3><p>{kwh(singleResult?.annualKWh ?? 0)} kWh/year → {kwh(scenario.annualKWh)} kWh/year</p><strong>Potential reduction: {kwh(scenario.reductionKWh)} kWh/year</strong></div>}{costEnabled && result && "annualCost" in result && <p className="helper-text">Estimated cost: {money(result.dailyCost ?? 0)}/day · {money(result.monthlyCost ?? 0)}/month · {money(result.annualCost ?? 0)}/year</p>}</> : <p className="validation-message">Enter valid usage values to see an estimate.</p>}</div>
    </div>
  </section>;
}

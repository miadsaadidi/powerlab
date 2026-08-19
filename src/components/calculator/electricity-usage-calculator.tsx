"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES, type ApplianceCategory } from "@/data/appliances";
import { getApplianceUsagePreset } from "@/data/appliance-usage-presets";
import { calculateOneHourLess, calculateUsage, calculateUsageProfile, type UsageInput, type UsageMode } from "@/lib/calculators/electricity-usage/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { EmbedModal } from "@/components/calculator/embed-modal";
import { track } from "@/lib/analytics/analytics";

const money = (n: number) => `$${n.toFixed(2)}`;
const kwh = (n: number) => n < 1 ? n.toFixed(2) : n.toFixed(1);
type Row = { id: string; applianceId: string; mode: UsageMode; watts: number; quantity: number; hours: number; days: number; duty: number; cycle: number; cycles: number; labelKWh: number; labelPeriod: "month" | "year" };

const ROOM_BUNDLES = [
  { id: "kitchen", label: "🍳 Kitchen", applianceIds: ["refrigerator", "microwave", "coffee-maker", "electric-kettle"] },
  { id: "living", label: "🛋️ Living Room", applianceIds: ["led-tv", "game-console", "ceiling-fan", "led-bulb"] },
  { id: "office", label: "💻 Home Office", applianceIds: ["desktop", "laptop", "wifi-router", "internet-modem"] },
  { id: "climate", label: "❄️ Cooling & Climate", applianceIds: ["window-ac", "ceiling-fan", "space-heater"] },
  { id: "rv", label: "🚐 RV / Off-Grid", applianceIds: ["refrigerator", "wifi-router", "phone-charger", "laptop", "led-bulb"] },
];

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    const savedPrice = createEnergyProfileStore(window.localStorage).read().electricityPricePerKwh;
    const handoffPrice = Number(new URLSearchParams(window.location.search).get("price"));
    if (Number.isFinite(handoffPrice) && handoffPrice >= 0) setPrice(handoffPrice);
    else if (savedPrice !== null) setPrice(savedPrice);
  }, []);

  const row = rows[0];

  const visibleAppliances = useMemo(() => {
    return APPLIANCES.filter((item) => {
      const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    }).slice(0, 10);
  }, [search, selectedCategory]);

  const updateRow = (id: string, patch: Partial<Row>) => setRows((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
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

  const applyRoomBundle = (bundle: typeof ROOM_BUNDLES[0]) => {
    setHomeMode(true);
    const newRows = bundle.applianceIds.map((appId) => makeRow(appId));
    setRows(newRows);
    track("calculator_preset_click", { calculator_id: "electricity-usage", preset: bundle.label });
  };

  const addRoomToHome = (bundle: typeof ROOM_BUNDLES[0]) => {
    const newRows = bundle.applianceIds.map((appId) => makeRow(appId));
    setRows((current) => [...current, ...newRows]);
    track("calculator_preset_click", { calculator_id: "electricity-usage", preset: `add_${bundle.label}` });
  };

  return <section className="calculator-shell" aria-label="Electricity usage calculator">
    <div className="calculator-grid">
      <div className="calculator-card calculator-inputs">
        <div className="calculator-card-header">
          <div>
            <p className="eyebrow">Electricity Planning</p>
            <h2>{homeMode ? "Whole-Home Appliance Builder" : "Single Appliance Usage"}</h2>
          </div>
          <button type="button" className="text-button" onClick={() => setHomeMode((value) => !value)}>
            {homeMode ? "← Single Appliance" : "🏠 Build Whole Home"}
          </button>
        </div>

        {/* Room-by-room Quick Bundles */}
        <div className="preset-chips-container" role="region" aria-label="Room Load Presets">
          <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Room Bundles</span>
          <div className="preset-chips-row">
            {ROOM_BUNDLES.map((bundle) => (
              <button
                key={bundle.id}
                type="button"
                className="preset-chip-btn"
                onClick={() => homeMode ? addRoomToHome(bundle) : applyRoomBundle(bundle)}
                title={homeMode ? `Add ${bundle.label} appliances to home` : `Build ${bundle.label} load`}
              >
                {homeMode ? `+ ${bundle.label}` : bundle.label}
              </button>
            ))}
          </div>
        </div>

        {!homeMode && <>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.5rem 0" }}>
            {["All", "Kitchen", "Electronics", "Cooling", "Lighting", "Common"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`preset-chip-btn ${selectedCategory === cat ? "active" : ""}`}
                style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <label htmlFor="appliance-search">Search Appliance</label>
          <input id="appliance-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Type appliance name (e.g. Fridge, TV, AC)..." />
          <div className="appliance-options" role="listbox" aria-label="Appliance presets">
            {visibleAppliances.map((item) => (
              <button type="button" className={item.id === row.applianceId ? "selected" : ""} key={item.id} onClick={() => chooseAppliance(item.id)}>
                {item.label} ({item.watts}W)
              </button>
            ))}
          </div>
          <p className="helper-text">Typical estimate — adjust to match your actual usage.</p>
        </>}

        <fieldset className="mode-choice">
          <legend>How do you know its energy use?</legend>
          {([["watts-time", "Power + time"], ["kwh-cycle", "Energy per cycle"], ["label-energy", "Energy label"]] as const).map(([value, label]) => (
            <label key={value}>
              <input type="radio" checked={row.mode === value} onChange={() => updateRow(row.id, { mode: value })} />
              {label}
            </label>
          ))}
        </fieldset>

        <div className="input-grid">
          {row.mode === "watts-time" && <>
            <label>Power (W)<input type="number" min="0" value={row.watts} onChange={(e) => updateRow(row.id, { watts: Number(e.target.value) })} /></label>
            <label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label>
            <label>Hours per day<input type="number" min="0" max="24" step="0.25" value={row.hours} onChange={(e) => updateRow(row.id, { hours: Number(e.target.value) })} /></label>
            <label>Days per week<input type="number" min="1" max="7" value={row.days} onChange={(e) => updateRow(row.id, { days: Number(e.target.value) })} /></label>
          </>}
          {row.mode === "kwh-cycle" && <>
            <label>kWh per cycle<input type="number" min="0" step="0.1" value={row.cycle} onChange={(e) => updateRow(row.id, { cycle: Number(e.target.value) })} /></label>
            <label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label>
            <label>Cycles per week<input type="number" min="0" step="0.1" value={row.cycles} onChange={(e) => updateRow(row.id, { cycles: Number(e.target.value) })} /></label>
          </>}
          {row.mode === "label-energy" && <>
            <label>Energy label (kWh)<input type="number" min="0" value={row.labelKWh} onChange={(e) => updateRow(row.id, { labelKWh: Number(e.target.value) })} /></label>
            <label>Quantity<input type="number" min="1" value={row.quantity} onChange={(e) => updateRow(row.id, { quantity: Number(e.target.value) })} /></label>
            <label>Period<select value={row.labelPeriod} onChange={(e) => updateRow(row.id, { labelPeriod: e.target.value as Row["labelPeriod"] })}><option value="year">per year</option><option value="month">per month</option></select></label>
          </>}
        </div>

        {row.mode === "watts-time" && (
          <details open={advanced} onToggle={(e) => setAdvanced(e.currentTarget.open)}>
            <summary>Advanced settings</summary>
            <label>Duty cycle (%)<input type="number" min="1" max="100" value={row.duty * 100} onChange={(e) => updateRow(row.id, { duty: Number(e.target.value) / 100 })} /></label>
          </details>
        )}

        {homeMode && (
          <div className="usage-rows">
            <h3>Household Appliance List ({rows.length})</h3>
            {rows.map((item) => (
              <div className="usage-row" key={item.id}>
                <strong>{APPLIANCES.find((a) => a.id === item.applianceId)?.label ?? "Custom"}</strong>
                <label>W<input aria-label={`${item.applianceId} watts`} type="number" min="0" value={item.watts} onChange={(e) => updateRow(item.id, { watts: Number(e.target.value) })} /></label>
                <label>h/day<input aria-label={`${item.applianceId} hours per day`} type="number" min="0" max="24" step="0.25" value={item.hours} onChange={(e) => updateRow(item.id, { hours: Number(e.target.value) })} /></label>
                <label>Qty<input aria-label={`${item.applianceId} quantity`} type="number" min="1" value={item.quantity} onChange={(e) => updateRow(item.id, { quantity: Number(e.target.value) })} /></label>
                <details className="row-options">
                  <summary>More</summary>
                  <label>Days/week<input type="number" min="1" max="7" value={item.days} onChange={(e) => updateRow(item.id, { days: Number(e.target.value) })} /></label>
                  <label>Duty cycle (%)<input type="number" min="1" max="100" value={item.duty * 100} onChange={(e) => updateRow(item.id, { duty: Number(e.target.value) / 100 })} /></label>
                </details>
                <button type="button" className="text-button" onClick={() => setRows((current) => current.filter((r) => r.id !== item.id))} aria-label={`Remove ${item.applianceId}`}>✕</button>
              </div>
            ))}
            <button type="button" className="secondary-button" onClick={() => setRows((current) => [...current, makeRow("wifi-router")])}>+ Add custom appliance</button>
          </div>
        )}

        <div className="cost-section">
          <label><input type="checkbox" checked={costEnabled} onChange={(e) => setCostEnabled(e.target.checked)} /> Include estimated electricity cost</label>
          {costEnabled && (
            <label>Electricity price ($/kWh)
              <input type="number" min="0" step="0.01" value={price} onChange={(e) => {
                const next = Number(e.target.value);
                setPrice(next);
                if (Number.isFinite(next) && next >= 0) createEnergyProfileStore(window.localStorage).patchElectricityPricePerKwh(next);
              }} />
            </label>
          )}
          <p className="helper-text">Example rate — replace with your actual rate.</p>
        </div>
      </div>

      <div className="calculator-card calculator-result" id="calculator-result" aria-live="polite">
        <p className="eyebrow">{homeMode ? "Total Household Usage" : "Estimated Appliance Use"}</p>
        {result ? <>
          <div className="result-metrics">
            <div><strong>{kwh(daily)} kWh</strong><span>per day</span></div>
            <div><strong>{kwh(monthly)} kWh</strong><span>per month</span></div>
            <div><strong>{kwh(annual)} kWh</strong><span>per year</span></div>
          </div>

          {!homeMode && singleResult && (
            <p className="helper-text">
              {row.mode === "watts-time" ? `${row.watts} W × ${row.hours} hours/day × ${row.days} days/week = ${singleResult.weeklyKWh.toFixed(2)} kWh/week.` : "Energy-label and cycle values are used directly, then normalized to daily, monthly and annual use."}
            </p>
          )}

          {homeMode && profile && (
            <div className="usage-contributors">
              <h3>Top Energy Contributors</h3>
              {profile.rows.slice().sort((a, b) => b.sharePercent - a.sharePercent).map((item) => (
                <div key={item.id}>
                  <div className="contributor-label">
                    <span>{item.label}</span>
                    <span>{item.sharePercent.toFixed(0)}% ({kwh(item.result.averageDailyKWh)} kWh/d)</span>
                  </div>
                  <div className="contributor-bar"><span style={{ width: `${item.sharePercent}%` }} /></div>

                </div>
              ))}
            </div>
          )}

          {!homeMode && scenario && (
            <div className="scenario">
              <h3>What if I use this appliance 1 hour less per day?</h3>
              <p>{kwh(singleResult?.annualKWh ?? 0)} kWh/year → {kwh(scenario.annualKWh)} kWh/year</p>
              <strong>Potential savings: {kwh(scenario.reductionKWh)} kWh/year</strong>
            </div>
          )}

          {costEnabled && result && "annualCost" in result && (
            <p className="helper-text" style={{ fontWeight: 600, color: "var(--brand-strong)" }}>
              Estimated cost: {money(result.dailyCost ?? 0)}/day · {money(result.monthlyCost ?? 0)}/month · {money(result.annualCost ?? 0)}/year
            </p>
          )}

          <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <ShareButton getShareUrl={() => typeof window !== "undefined" ? window.location.href : ""} />
            <PrintSpecButton />
          </div>
        </> : <p className="validation-message">Enter valid usage values to see an estimate.</p>}
      </div>
    </div>
    {result && (
      <MobileResultBar
        label={homeMode ? "Daily Household Usage" : "Daily Appliance Usage"}
        value={`${kwh(daily)} kWh`}
        targetId="calculator-result"
        subtext={`≈ ${kwh(monthly)} kWh / month`}
      />
    )}
  </section>;
}



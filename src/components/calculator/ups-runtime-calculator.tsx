"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES, type AppliancePreset } from "@/data/appliances";
import { BATTERY_CHEMISTRIES, resolveChemistryUsableFraction, UPS_RUNTIME_DEFAULTS } from "@/data/battery-defaults";
import { calculateUpsRuntime, type UpsEquipmentInput, type UpsRuntimeInput } from "@/lib/calculators/ups-runtime/engine";
import { track } from "@/lib/analytics/analytics";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { OutageTimelineVisualizer } from "@/components/calculator/outage-timeline-visualizer";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";


const QUICK_UPS_PRESETS = [
  { label: "📶 Wi-Fi & Modem (25W)", watts: 25 },
  { label: "💼 Laptop Workstation (85W)", watts: 85 },
  { label: "💻 Desktop PC (150W)", watts: 150 },
  { label: "🖥️ Gaming Rig (350W)", watts: 350 },
  { label: "🖧 Server Rack & NAS (600W)", watts: 600 },
];


type CapacityMode = "direct-wh" | "battery-bank";

type LoadMode = "direct-watts" | "equipment";
type EquipmentRow = UpsEquipmentInput & { id: string; typicalRange: string };

const equipmentIds = ["wifi-router", "internet-modem", "desktop", "custom"];
const number = (value: string) => Number(value);
const percent = (value: number) => Math.round(value * 100);
const formatRuntime = (hours: number) => { const minutes = Math.max(0, Math.round(hours * 60)); const h = Math.floor(minutes / 60); const m = minutes % 60; return h ? `${h} h ${m ? `${m} min` : ""}`.trim() : `${m} min`; };

function createRow(preset: AppliancePreset, index: number): EquipmentRow { return { id: `${preset.id}-${Date.now()}-${index}`, label: preset.label, watts: preset.watts, quantity: 1, typicalRange: preset.typicalRange }; }

export function UpsRuntimeCalculator() {
  const [capacityMode, setCapacityMode] = useState<CapacityMode>(UPS_RUNTIME_DEFAULTS.batteryCapacityMode);
  const [directWh, setDirectWh] = useState<number>(UPS_RUNTIME_DEFAULTS.directWh);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(UPS_RUNTIME_DEFAULTS.batteryVoltage);
  const [batteryAh, setBatteryAh] = useState<number>(UPS_RUNTIME_DEFAULTS.batteryAh);
  const [batteryCount, setBatteryCount] = useState<number>(UPS_RUNTIME_DEFAULTS.batteryCount);
  const [loadMode, setLoadMode] = useState<LoadMode>(UPS_RUNTIME_DEFAULTS.loadMode);
  const [directLoadW, setDirectLoadW] = useState<number>(UPS_RUNTIME_DEFAULTS.directLoadW);
  const [equipment, setEquipment] = useState<EquipmentRow[]>([]);
  const [search, setSearch] = useState("");
  const [chemistry, setChemistry] = useState("agm");
  const [usableFraction, setUsableFraction] = useState<number>(UPS_RUNTIME_DEFAULTS.usableFraction);
  const [usableCustomized, setUsableCustomized] = useState(false);
  const [batteryHealth, setBatteryHealth] = useState<number>(UPS_RUNTIME_DEFAULTS.batteryHealth);
  const [upsEfficiency, setUpsEfficiency] = useState<number>(UPS_RUNTIME_DEFAULTS.upsEfficiency);
  const [ratedUpsMaxWatts, setRatedUpsMaxWatts] = useState<number | null>(UPS_RUNTIME_DEFAULTS.ratedUpsMaxWatts);
  const [upsVA, setUpsVA] = useState<number | null>(UPS_RUNTIME_DEFAULTS.upsVA);
  const [powerFactor, setPowerFactor] = useState<number>(UPS_RUNTIME_DEFAULTS.assumedUpsOutputPowerFactor);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => { track("calculator_view", { calculator_id: "ups-runtime", category: "battery", phase: 2 }); }, []);
  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const input = useMemo<UpsRuntimeInput>(() => ({ batteryCapacityMode: capacityMode, directWh, batteryVoltage, batteryAh, batteryCount, loadMode, directLoadW, equipment, usableFraction, batteryHealth, upsEfficiency, ratedUpsMaxWatts, upsVA, assumedUpsOutputPowerFactor: powerFactor, batteryChemistry: chemistryPreset.label }), [capacityMode, directWh, batteryVoltage, batteryAh, batteryCount, loadMode, directLoadW, equipment, usableFraction, batteryHealth, upsEfficiency, ratedUpsMaxWatts, upsVA, powerFactor, chemistryPreset.label]);
  const result = useMemo(() => { try { return calculateUpsRuntime(input); } catch (error) { return error instanceof Error ? error : new Error("Unable to calculate UPS runtime."); } }, [input]);
  const options = (search.trim() ? APPLIANCES.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())) : equipmentIds.map((id) => APPLIANCES.find((item) => item.id === id)).filter((item): item is AppliancePreset => Boolean(item))).slice(0, 8);
  const selectChemistry = (id: string) => { setChemistry(id); setUsableFraction(resolveChemistryUsableFraction(id, usableFraction, usableCustomized)); };
  const addEquipment = (preset: AppliancePreset) => { setEquipment((rows) => [...rows, createRow(preset, rows.length)]); setSearch(""); track("calculator_appliance_add", { calculator_id: "ups-runtime", preset: preset.id }); };
  const updateEquipment = (id: string, update: Partial<EquipmentRow>) => setEquipment((rows) => rows.map((row) => row.id === id ? { ...row, ...update } : row));
  const comparison = result instanceof Error ? [] : [0.5, 1, 1.5].map((multiplier) => { const load = result.result.loadW * multiplier; const exceeds = result.result.upsCapabilityWatts !== null && load > result.result.upsCapabilityWatts; return { load, runtime: result.result.runtimeHours / multiplier, current: multiplier === 1, exceeds }; });
  const activeLoad = result instanceof Error ? 0 : result.result.loadW;
  return <section className="calculator" aria-labelledby="ups-runtime-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="ups-runtime-heading">Estimate UPS runtime</h2>

        <div className="preset-chips-container" role="region" aria-label="Quick Load Scenarios">
          <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 UPS Loads</span>
          <div className="preset-chips-row">
            {QUICK_UPS_PRESETS.map((sc) => (
              <button
                key={sc.label}
                type="button"
                className={`preset-chip-btn ${loadMode === "direct-watts" && directLoadW === sc.watts ? "active" : ""}`}
                onClick={() => {
                  setLoadMode("direct-watts");
                  setDirectLoadW(sc.watts);
                  track("calculator_preset_click", { calculator_id: "ups-runtime", preset: sc.label });
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        <CalculatorTrustPill />

        <form noValidate>
          <fieldset className="input-group"><legend>Battery capacity</legend><div className="mode-choice"><label><input type="radio" checked={capacityMode === "direct-wh"} onChange={() => setCapacityMode("direct-wh")} /> Direct battery energy</label><label><input type="radio" checked={capacityMode === "battery-bank"} onChange={() => setCapacityMode("battery-bank")} /> Voltage × Ah × batteries</label></div>{capacityMode === "direct-wh" ? <label>Battery energy<span className="input-with-unit"><input type="number" min="0.1" step="any" inputMode="decimal" value={directWh} onChange={(e) => setDirectWh(number(e.target.value))} /><span className="unit-suffix">Wh</span></span></label> : <><div className="field-pair"><label>Voltage<input type="number" min="0.1" step="any" value={batteryVoltage} onChange={(e) => setBatteryVoltage(number(e.target.value))} /></label><label>Capacity<input type="number" min="0.1" step="any" value={batteryAh} onChange={(e) => setBatteryAh(number(e.target.value))} /></label><label>Battery count<input type="number" min="1" step="1" value={batteryCount} onChange={(e) => setBatteryCount(number(e.target.value))} /></label></div><p className="form-hint">Calculated nominal energy: {Number.isFinite(batteryVoltage * batteryAh * batteryCount) ? `${batteryVoltage * batteryAh * batteryCount} Wh` : "—"}</p></>}</fieldset>
          <fieldset className="input-group"><legend>Load</legend><div className="mode-choice"><label><input type="radio" checked={loadMode === "direct-watts"} onChange={() => setLoadMode("direct-watts")} /> Direct watts</label><label><input type="radio" checked={loadMode === "equipment"} onChange={() => setLoadMode("equipment")} /> Equipment</label></div>{loadMode === "direct-watts" ? <label>Load<input type="number" min="0.1" step="any" inputMode="decimal" value={directLoadW} onChange={(e) => setDirectLoadW(number(e.target.value))} /></label> : <div className="appliance-builder"><label htmlFor="ups-equipment-search">Add equipment</label><input id="ups-equipment-search" type="search" placeholder="Search equipment..." value={search} onChange={(e) => setSearch(e.target.value)} /><div className="appliance-options" aria-label="Equipment choices">{options.map((preset) => { const isAdded = equipment.some((e) => e.label === preset.label); return <button type="button" key={preset.id} className={isAdded ? "selected" : ""} onClick={() => addEquipment(preset)}><span>{isAdded ? "✓ " : "+ "}{preset.label}</span><small>{preset.watts} W · {preset.category}</small></button>; })}</div>{equipment.map((row) => <fieldset className="appliance-row" key={row.id}><legend>{row.label}</legend><div className="appliance-fields"><label>Watts<input type="number" min="0.1" step="any" value={row.watts} onChange={(e) => updateEquipment(row.id, { watts: number(e.target.value) })} /></label><label>Quantity<input type="number" min="1" step="1" value={row.quantity} onChange={(e) => updateEquipment(row.id, { quantity: number(e.target.value) })} /></label></div><p className="form-hint">Typical estimate ({row.typicalRange}) — adjust if known.</p><button className="remove-button" type="button" onClick={() => setEquipment((rows) => rows.filter((item) => item.id !== row.id))}>Remove {row.label}</button></fieldset>)}</div>}</fieldset>
          <label>Battery chemistry<select value={chemistry} onChange={(e) => selectChemistry(e.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
          {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><div className="field-pair"><label>Usable battery fraction (%)<input type="number" min="1" max="100" value={percent(usableFraction)} onChange={(e) => { setUsableFraction(number(e.target.value) / 100); setUsableCustomized(true); }} /></label><label>Battery health (%)<input type="number" min="1" max="100" value={percent(batteryHealth)} onChange={(e) => setBatteryHealth(number(e.target.value) / 100)} /></label><label>UPS efficiency (%)<input type="number" min="1" max="100" value={percent(upsEfficiency)} onChange={(e) => setUpsEfficiency(number(e.target.value) / 100)} /></label><label>Rated maximum watts<input type="number" min="0.1" step="any" placeholder="Unknown" value={ratedUpsMaxWatts ?? ""} onChange={(e) => setRatedUpsMaxWatts(e.target.value === "" ? null : number(e.target.value))} /></label><label>UPS VA rating<input type="number" min="0.1" step="any" placeholder="Optional" value={upsVA ?? ""} onChange={(e) => setUpsVA(e.target.value === "" ? null : number(e.target.value))} /></label>{ratedUpsMaxWatts === null && upsVA !== null && <label>Assumed UPS output power factor<input type="number" min="0.01" max="1" step="0.01" value={powerFactor} onChange={(e) => setPowerFactor(number(e.target.value))} /></label>}</div>{ratedUpsMaxWatts === null && upsVA !== null && <p className="form-hint">VA × power factor is only an estimate. The visible 0.80 default is a planning assumption—replace it with the UPS specification when known.</p>}{usableCustomized && <p className="form-hint">Your usable fraction is custom and will not be replaced when chemistry changes.</p>}</fieldset>}
        </form>
      </div>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">UPS backup estimate</p>{result instanceof Error ? <p className="error" role="alert">{result.message}</p> : <>{result.result.overloadState === "confirmed-overload" ? <><p className="result-lede">UPS load exceeds rated capacity</p><p className="warning" role="alert">Load exceeds the UPS rated watt capacity.</p></> : result.result.overloadState === "estimated-overload" ? <><p className="result-lede">Possible UPS overload</p><p className="warning" role="alert">Load exceeds the estimated watt capability based on VA and assumed power factor. Check the UPS manufacturer&apos;s watt rating.</p></> : <><p className="result-lede">Estimated UPS runtime</p><p className="result-value">{formatRuntime(result.result.runtimeHours)}</p>
        <StandardsBadge standards={["IEEE 1184", "UL 1778", "IEC 62040-3"]} />
        <OutageTimelineVisualizer
          runtimeHours={result.result.runtimeHours}
          loadWatts={activeLoad}
          capacityWh={result.result.nominalWh}
          reserveSoc={1 - usableFraction}
        />
      </>}<dl className="result-breakdown"><div><dt>Nominal battery energy</dt><dd>{Math.round(result.result.nominalWh)} Wh</dd></div><div><dt>Usable battery energy</dt><dd>{Math.round(result.result.usableWh)} Wh</dd></div><div><dt>Active UPS load</dt><dd>{Math.round(activeLoad)} W</dd></div><div><dt>Battery-side load</dt><dd>{Math.round(result.result.batterySideLoadW)} W</dd></div>{result.result.upsCapabilityWatts !== null && <div><dt>{result.result.upsCapabilitySource === "rated-watts" ? "UPS load" : "Estimated UPS load"}</dt><dd>{(result.result.loadPercent! * 100).toFixed(0)}%</dd></div>}</dl>{result.result.overloadState === "unknown" && <p className="warning">UPS power capability is unknown — confirm that the UPS watt rating supports this load.</p>}<section className="comparison"><h3>Runtime at different loads</h3><dl>{comparison.map((item) => <div key={item.load} className={item.current ? "current-comparison" : ""}><dt>{Math.round(item.load)} W {item.current && <span>Your load</span>}</dt><dd>{item.exceeds ? "Over capacity" : formatRuntime(item.runtime)}</dd></div>)}</dl></section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Battery type</dt><dd>{chemistryPreset.label}</dd></div><div><dt>Usable fraction</dt><dd>{percent(usableFraction)}%</dd></div><div><dt>Battery health</dt><dd>{percent(batteryHealth)}%</dd></div><div><dt>UPS efficiency</dt><dd>{percent(upsEfficiency)}%</dd></div></dl></section><p className="form-hint">Simplified planning estimate — manufacturer runtime curves are preferred for a specific UPS model.</p>
      
      <GooglePreferredBanner />

      <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="UPS Runtime Calculation" />
        <PrintSpecButton />
      </div>
      </>}</aside>

    </div><p className="sr-only" role="status" aria-live="polite">{announcement}</p>
  </section>;

}

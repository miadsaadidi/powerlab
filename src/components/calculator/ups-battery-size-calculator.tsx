"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BATTERY_CHEMISTRIES, BATTERY_VOLTAGE_PRESETS, resolveChemistryUsableFraction, UPS_BATTERY_SIZE_DEFAULTS } from "@/data/battery-defaults";
import { calculateUpsBatterySize, type UpsBatterySizeInput } from "@/lib/calculators/ups-battery-size/engine";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";

type LoadSource = "watts" | "va";
const number = (value: string) => Number(value);
const percent = (value: number) => Math.round(value * 100);
const formatNumber = (value: number, digits = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
const formatRuntime = (hours: number) => { const minutes = Math.round(hours * 60); const h = Math.floor(minutes / 60); const m = minutes % 60; return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`; };

export function UpsBatterySizeCalculator() {
  const [loadSource, setLoadSource] = useState<LoadSource>(UPS_BATTERY_SIZE_DEFAULTS.loadSource);
  const [loadW, setLoadW] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.loadW);
  const [loadVA, setLoadVA] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.loadVA);
  const [powerFactor, setPowerFactor] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.powerFactor);
  const [runtimeHours, setRuntimeHours] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.runtimeHours);
  const [runtimePreset, setRuntimePreset] = useState("30");
  const [busVoltage, setBusVoltage] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.busVoltage);
  const [voltagePreset, setVoltagePreset] = useState(String(UPS_BATTERY_SIZE_DEFAULTS.busVoltage));
  const [upsEfficiency, setUpsEfficiency] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.upsEfficiency);
  const [usableFraction, setUsableFraction] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.usableFraction);
  const [batteryHealth, setBatteryHealth] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.batteryHealth);
  const [designMargin, setDesignMargin] = useState<number>(UPS_BATTERY_SIZE_DEFAULTS.designMargin);
  const [chemistry, setChemistry] = useState<string>(UPS_BATTERY_SIZE_DEFAULTS.batteryChemistry);
  const [usableCustomized, setUsableCustomized] = useState(false);
  const [moduleEnabled, setModuleEnabled] = useState(false);
  const [moduleVoltage, setModuleVoltage] = useState<number>(12);
  const [moduleAh, setModuleAh] = useState<number>(9);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculated, setCalculated] = useState<UpsBatterySizeInput | null>(null);
  const [stale, setStale] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { track("calculator_view", { calculator_id: "ups-battery-size", category: "battery", phase: 2 }); }, []);
  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const currentInput = useMemo<UpsBatterySizeInput>(() => {
    const common = { runtimeHours, busVoltage, upsEfficiency, usableFraction, batteryHealth, designMargin, batteryChemistry: chemistry, ...(moduleEnabled ? { module: { moduleVoltage, moduleAh } } : {}) };
    return loadSource === "watts" ? { ...common, loadSource: "watts", loadW } : { ...common, loadSource: "va", loadVA, powerFactor };
  }, [loadSource, loadW, loadVA, powerFactor, runtimeHours, busVoltage, upsEfficiency, usableFraction, batteryHealth, designMargin, chemistry, moduleEnabled, moduleVoltage, moduleAh]);

  const calculate = () => {
    try { calculateUpsBatterySize(currentInput); setError(""); setCalculated(currentInput); setStale(false); track("calculator_calculate", { calculator_id: "ups-battery-size", category: "battery", phase: 2 }); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Check the active inputs and try again."); }
  };
  const result = useMemo(() => { if (!calculated) return null; try { return calculateUpsBatterySize(calculated); } catch { return null; } }, [calculated]);
  const update = (setter: (value: number) => void, value: number) => { setter(value); if (calculated) setStale(true); };
  const selectRuntime = (value: string) => { setRuntimePreset(value); update(setRuntimeHours, value === "custom" ? runtimeHours : number(value) / 60); };
  const selectChemistry = (value: string) => { setChemistry(value); if (!usableCustomized) update(setUsableFraction, resolveChemistryUsableFraction(value, usableFraction, false)); else if (calculated) setStale(true); };
  const selectVoltage = (value: string) => { setVoltagePreset(value); if (value !== "custom") update(setBusVoltage, number(value)); else if (calculated) setStale(true); };
  const runtimeMatchesPreset = (minutes: number) => Math.abs(runtimeHours * 60 - minutes) < Number.EPSILON;

  return <section className="calculator" aria-labelledby="ups-battery-size-heading">
    <div className="calculator-grid">
      <form className="calculator-form" onSubmit={(event) => { event.preventDefault(); calculate(); }}>
        <h2 id="ups-battery-size-heading">Size a UPS battery</h2>
        <fieldset className="input-group"><legend>Quick Mode</legend>
          <label>Load source<select value={loadSource} onChange={(event) => { const value = event.target.value as LoadSource; setLoadSource(value); if (calculated) setStale(true); }}><option value="watts">Watts</option><option value="va">VA</option></select></label>
          {loadSource === "watts" ? <label>Load<span className="input-with-unit"><input type="number" min="0.1" step="any" inputMode="decimal" value={loadW} onChange={(event) => update(setLoadW, number(event.target.value))} /><span>W</span></span></label> : <><label>UPS load<span className="input-with-unit"><input type="number" min="0.1" step="any" inputMode="decimal" value={loadVA} onChange={(event) => update(setLoadVA, number(event.target.value))} /><span>VA</span></span></label><label>Power factor<input type="number" min="0.01" max="1" step="0.01" value={powerFactor} onChange={(event) => update(setPowerFactor, number(event.target.value))} /><span className="form-hint">Planning default. Use actual watts when available; VA × power factor estimates real load.</span></label><p className="form-hint">Calculated real load: {Number.isFinite(loadVA * powerFactor) ? formatNumber(loadVA * powerFactor) : "—"} W</p></>}
          <label>Target runtime<span className="chip-row">{[15, 30, 60].map((minutes) => <button type="button" className={runtimeMatchesPreset(minutes) ? "chip active" : "chip"} key={minutes} onClick={() => selectRuntime(String(minutes))}>{minutes} min</button>)}<button type="button" className={runtimePreset === "custom" ? "chip active" : "chip"} onClick={() => setRuntimePreset("custom")}>Custom</button></span></label>
          {runtimePreset === "custom" && <label>Custom runtime<span className="input-with-unit"><input type="number" min="0.01" step="any" value={runtimeHours * 60} onChange={(event) => update(setRuntimeHours, number(event.target.value) / 60)} /><span>min</span></span></label>}
          <label>Battery chemistry<select value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <label>Bus voltage<span className="input-with-unit"><select aria-label="Bus voltage" value={voltagePreset} onChange={(event) => selectVoltage(event.target.value)}>{BATTERY_VOLTAGE_PRESETS.map((value) => <option key={value} value={String(value)}>{value} V</option>)}<option value="custom">Custom</option></select>{voltagePreset === "custom" && <input aria-label="Custom bus voltage" type="number" min="0.1" step="any" value={busVoltage} onChange={(event) => update(setBusVoltage, number(event.target.value))} />}</span></label>
        </fieldset>
        <button className="button" type="submit">{calculated ? "Recalculate UPS Battery Size" : "Calculate UPS Battery Size"}</button>
        <button className="advanced-toggle" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((value) => !value)}>Advanced assumptions <span aria-hidden="true">{advancedOpen ? "−" : "+"}</span></button>
        {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><label>UPS efficiency (%)<input type="number" min="1" max="100" step="1" value={percent(upsEfficiency)} onChange={(event) => update(setUpsEfficiency, number(event.target.value) / 100)} /></label><label>Usable battery fraction (%)<input type="number" min="1" max="100" step="1" value={percent(usableFraction)} onChange={(event) => { setUsableCustomized(true); update(setUsableFraction, number(event.target.value) / 100); }} /><span className="form-hint">Chemistry provides the initial planning preset. Your explicit value is preserved.</span></label><label>Battery health (%)<input type="number" min="1" max="100" step="1" value={percent(batteryHealth)} onChange={(event) => update(setBatteryHealth, number(event.target.value) / 100)} /><span className="form-hint">Planning derating, not a degradation prediction.</span></label><label>Design margin (%)<input type="number" min="0" max="100" step="1" value={percent(designMargin)} onChange={(event) => update(setDesignMargin, number(event.target.value) / 100)} /></label><label className="switch-row"><input type="checkbox" checked={moduleEnabled} onChange={(event) => { setModuleEnabled(event.target.checked); if (calculated) setStale(true); }} /> Show energy-equivalent module count</label>{moduleEnabled && <div className="field-pair"><label>Module voltage (V)<input type="number" min="0.1" step="any" value={moduleVoltage} onChange={(event) => update(setModuleVoltage, number(event.target.value))} /></label><label>Module capacity (Ah)<input type="number" min="0.1" step="any" value={moduleAh} onChange={(event) => update(setModuleAh, number(event.target.value))} /></label><p className="form-hint">Energy capacity only; this does not determine series, parallel or UPS voltage compatibility.</p></div>}</fieldset>}
      </form>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">UPS battery planning</p>{error && <p className="error" role="alert">{error}</p>}{!result ? <p>Enter the load and backup time, then calculate the nominal battery energy required.</p> : <><p className="result-lede">Recommended UPS battery</p><p className="result-value">{formatNumber(result.result.recommendedWh)} Wh</p><p className="result-subvalue">{formatNumber(result.result.recommendedKWh, 2)} kWh · {formatNumber(result.result.recommendedAhAtBus)} Ah at {formatNumber(calculated?.busVoltage ?? busVoltage)} V</p>{stale && <p className="warning" role="status">Previous result — inputs have changed. Recalculate to update it.</p>}<dl className="result-breakdown"><div><dt>Effective load</dt><dd>{formatNumber(result.result.loadW)} W</dd></div><div><dt>Load energy</dt><dd>{formatNumber(result.result.loadEnergyWh)} Wh</dd></div><div><dt>Battery energy before reserve</dt><dd>{formatNumber(result.result.batteryEnergyBeforeReserveWh)} Wh</dd></div><div><dt>Minimum nominal battery</dt><dd>{formatNumber(result.result.minimumNominalWh)} Wh</dd></div><div><dt>Recommended battery</dt><dd>{formatNumber(result.result.recommendedWh)} Wh</dd></div></dl><section className="comparison"><h3>Battery size by runtime</h3><dl>{result.result.runtimeComparisons.map((item) => <div className={item.isSelected ? "current-comparison" : ""} key={item.runtimeMinutes}><dt>{item.isSelected && item.runtimeMinutes !== 15 && item.runtimeMinutes !== 30 && item.runtimeMinutes !== 60 ? `Your selection — ${formatNumber(item.runtimeMinutes)} min` : `${item.runtimeMinutes} min`}</dt><dd>{formatNumber(item.recommendedWh)} Wh</dd></div>)}</dl></section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>UPS efficiency</dt><dd>{percent(upsEfficiency)}%</dd></div><div><dt>Usable battery fraction</dt><dd>{percent(usableFraction)}%</dd></div><div><dt>Battery health</dt><dd>{percent(batteryHealth)}%</dd></div><div><dt>Design margin</dt><dd>{percent(designMargin)}%</dd></div><div><dt>Battery chemistry</dt><dd>{chemistryPreset.label} planning preset</dd></div></dl></section>{result.result.energyEquivalentModuleCount !== null && <p className="form-hint">Energy-equivalent module count: {result.result.energyEquivalentModuleCount} modules ({formatNumber(result.result.energyEquivalentInstalledWh!)} Wh nominal). This does not determine series, parallel or installation layout.</p>}<p className="warning">Energy sizing only. Actual UPS runtime, discharge behavior, battery compatibility, wiring, topology and installation requirements may differ.</p>{isCalculatorPublished("ups-runtime") && <Link className="button secondary-button" href={`/battery/ups-runtime-calculator?loadW=${encodeURIComponent(formatNumber(result.result.loadW, 6))}&capacityWh=${encodeURIComponent(formatNumber(result.result.recommendedWh, 6))}`}>Check estimated runtime with this battery</Link>}</>}</aside>
    </div>
  </section>;
}

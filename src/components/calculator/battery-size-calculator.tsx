"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES, type AppliancePreset } from "@/data/appliances";
import { BATTERY_CHEMISTRIES, BATTERY_SIZE_DEFAULTS, BATTERY_VOLTAGE_PRESETS, resolveChemistryReserve } from "@/data/battery-defaults";
import { calculateBatterySize, type BatterySizeApplianceInput, type BatterySizeInput, type BatterySizeResult } from "@/lib/calculators/battery-size/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";

type LoadMode = "total" | "appliances";
type LoadUnit = "w" | "kw";
type RuntimeUnit = "hours" | "minutes";
type ApplianceRow = BatterySizeApplianceInput & { id: string; typicalRange: string };

const commonIds = ["wifi-router", "laptop", "led-tv", "led-bulb", "refrigerator", "ceiling-fan", "desktop", "phone-charger", "game-console", "microwave", "coffee-maker", "air-fryer", "electric-kettle", "space-heater", "window-ac", "custom"];
const number = (value: string) => Number(value);
const fraction = (value: string) => Number(value) / 100;
const percent = (value: number) => Math.round(value * 100);
const kwh = (value: number) => `${(value / 1_000).toFixed(2)} kWh`;
const ah = (value: number) => `${Math.round(value)} Ah`;
const hours = (value: number) => `${Number.isInteger(value) ? value : value.toFixed(2)} h`;

function createRow(preset: AppliancePreset, index: number): ApplianceRow {
  return { id: `${preset.id}-${Date.now()}-${index}`, label: preset.label, watts: preset.watts, quantity: 1, loadType: preset.loadType, dutyCycle: preset.defaultDutyCycle, typicalRange: preset.typicalRange };
}

export function BatterySizeCalculator() {
  const [loadMode, setLoadMode] = useState<LoadMode>("total");
  const [loadValue, setLoadValue] = useState<number>(BATTERY_SIZE_DEFAULTS.loadWatts);
  const [loadUnit, setLoadUnit] = useState<LoadUnit>("w");
  const [loadType, setLoadType] = useState<"ac" | "dc">("ac");
  const [runtimeValue, setRuntimeValue] = useState<number>(BATTERY_SIZE_DEFAULTS.runtimeHours);
  const [runtimeUnit, setRuntimeUnit] = useState<RuntimeUnit>("hours");
  const [chemistry, setChemistry] = useState<string>(BATTERY_SIZE_DEFAULTS.batteryChemistry);
  const [startingSoc, setStartingSoc] = useState<number>(BATTERY_SIZE_DEFAULTS.startingSoc);
  const [reserveSoc, setReserveSoc] = useState<number>(BATTERY_SIZE_DEFAULTS.reserveSoc);
  const [batteryHealth, setBatteryHealth] = useState<number>(BATTERY_SIZE_DEFAULTS.batteryHealth);
  const [acEfficiency, setAcEfficiency] = useState<number>(BATTERY_SIZE_DEFAULTS.acInverterEfficiency);
  const [dcEfficiency, setDcEfficiency] = useState<number>(BATTERY_SIZE_DEFAULTS.dcConversionEfficiency);
  const [designMargin, setDesignMargin] = useState<number>(BATTERY_SIZE_DEFAULTS.designMargin);
  const [voltage, setVoltage] = useState<number>(BATTERY_SIZE_DEFAULTS.voltage);
  const [voltagePreset, setVoltagePreset] = useState(String(BATTERY_SIZE_DEFAULTS.voltage));
  const [appliances, setAppliances] = useState<ApplianceRow[]>([]);
  const [search, setSearch] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [reserveCustomized, setReserveCustomized] = useState(false);
  const [calculated, setCalculated] = useState<BatterySizeResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    if (profile.battery.chemistry && BATTERY_CHEMISTRIES.some((item) => item.id === profile.battery.chemistry)) setChemistry(profile.battery.chemistry);
    if (profile.battery.reserveSoc !== null) { setReserveSoc(profile.battery.reserveSoc); setReserveCustomized(profile.battery.reserveSoc !== BATTERY_SIZE_DEFAULTS.reserveSoc); }
    track("calculator_view", { calculator_id: "battery-size", category: "battery", phase: 1 });
  }, []);

  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const normalizedLoad = loadUnit === "kw" ? loadValue * 1_000 : loadValue;
  const runtimeHours = runtimeUnit === "minutes" ? runtimeValue / 60 : runtimeValue;
  const input = useMemo<BatterySizeInput>(() => ({ loadWatts: normalizedLoad, loadType, runtimeHours, startingSoc, reserveSoc, batteryHealth, acInverterEfficiency: acEfficiency, dcConversionEfficiency: dcEfficiency, designMargin, voltage, appliances: loadMode === "appliances" ? appliances : undefined }), [acEfficiency, appliances, batteryHealth, dcEfficiency, designMargin, loadMode, loadType, normalizedLoad, reserveSoc, runtimeHours, startingSoc, voltage]);
  const options = (search.trim() ? APPLIANCES.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())) : commonIds.map((id) => APPLIANCES.find((item) => item.id === id)).filter((item): item is AppliancePreset => Boolean(item))).slice(0, 10);

  const markChanged = <T,>(setter: (value: T) => void, value: T) => { setter(value); if (calculated) setStale(true); };
  const selectChemistry = (id: string) => {
    setChemistry(id);
    const preset = BATTERY_CHEMISTRIES.find((item) => item.id === id);
    setReserveSoc(resolveChemistryReserve(id, reserveSoc, reserveCustomized));
    if (calculated) setStale(true);
  };
  const addAppliance = (preset: AppliancePreset) => { setAppliances((current) => [...current, createRow(preset, current.length)]); setSearch(""); if (calculated) setStale(true); track("calculator_appliance_add", { calculator_id: "battery-size", preset: preset.id }); };
  const updateAppliance = (id: string, update: Partial<ApplianceRow>) => { setAppliances((current) => current.map((item) => item.id === id ? { ...item, ...update } : item)); if (calculated) setStale(true); };
  const calculate = () => {
    try {
      const result = calculateBatterySize(input);
      setCalculated(result); setError(null); setStale(false); setAnnouncement(`Recommended battery size: ${kwh(result.result.recommendedNominalWh)}.`);
      createEnergyProfileStore(window.localStorage).patchBattery({ capacityWh: result.result.recommendedNominalWh, capacityAh: result.result.selectedVoltageAh, nominalVoltage: voltage, chemistry, batteryHealth, reserveSoc });
      track("calculator_calculate", { calculator_id: "battery-size", mode: loadMode, used_advanced: advancedOpen });
    } catch (calculationError) { setError(calculationError instanceof Error ? calculationError : new Error("Unable to calculate battery size.")); }
  };
  const verifyRuntime = () => {
    if (!calculated) return;
    createEnergyProfileStore(window.localStorage).patchBattery({ capacityWh: calculated.result.recommendedNominalWh, capacityAh: calculated.result.selectedVoltageAh, nominalVoltage: voltage, chemistry, batteryHealth, reserveSoc });
    createEnergyProfileStore(window.localStorage).patchRuntimeHandoff({ loadWatts: input.loadWatts, loadType: input.loadType, appliances: appliances.map(({ label, watts, quantity, loadType: type, dutyCycle }) => ({ label, watts, quantity, loadType: type, dutyCycle })) });
    window.location.href = "/battery/battery-runtime-calculator";
  };

  const comparison = calculated ? [0.5, 1, 2].map((multiplier) => ({ runtime: runtimeHours * multiplier, capacity: calculated.result.recommendedNominalWh * multiplier, current: multiplier === 1 })) : [];
  return <section className="calculator" aria-labelledby="battery-size-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="battery-size-heading">Calculate required battery size</h2>
        <form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
          <fieldset className="input-group"><legend>Backup requirements</legend><div className="field-pair"><label>Load<span className="input-with-unit"><input type="number" min="0.1" step="any" inputMode="decimal" value={loadValue} onChange={(e) => markChanged(setLoadValue, number(e.target.value))} /><select aria-label="Load unit" value={loadUnit} onChange={(e) => markChanged(setLoadUnit, e.target.value as LoadUnit)}><option value="w">W</option><option value="kw">kW</option></select></span></label><label>Load type<select value={loadType} onChange={(e) => markChanged(setLoadType, e.target.value as "ac" | "dc")}><option value="ac">AC appliance</option><option value="dc">DC direct</option></select></label><label>Desired runtime<span className="input-with-unit"><input type="number" min="0.1" step="0.25" inputMode="decimal" value={runtimeValue} onChange={(e) => markChanged(setRuntimeValue, number(e.target.value))} /><select aria-label="Runtime unit" value={runtimeUnit} onChange={(e) => markChanged(setRuntimeUnit, e.target.value as RuntimeUnit)}><option value="hours">hours</option><option value="minutes">minutes</option></select></span></label><label>Battery type<select value={chemistry} onChange={(e) => selectChemistry(e.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div><p className="form-hint">These are editable planning defaults, not product specifications.</p></fieldset>
          <fieldset className="input-group"><legend>Optional appliance mode</legend><label className="switch-row"><input type="checkbox" checked={loadMode === "appliances"} onChange={(e) => { const mode = e.target.checked ? "appliances" : "total"; setLoadMode(mode); if (calculated) setStale(true); }} /> Use appliances instead</label>{loadMode === "appliances" && <div className="appliance-builder"><label htmlFor="battery-size-appliance-search">Add an appliance</label><input id="battery-size-appliance-search" type="search" placeholder="Search appliances..." value={search} onChange={(e) => setSearch(e.target.value)} /><div className="appliance-options" aria-label="Appliance choices">{options.map((preset) => <button type="button" key={preset.id} onClick={() => addAppliance(preset)}><span>{preset.label}</span><small>{preset.watts} W · {preset.category}</small></button>)}</div>{appliances.map((appliance) => <fieldset className="appliance-row" key={appliance.id}><legend>{appliance.label}</legend><div className="appliance-fields"><label>Watts<input type="number" min="0.1" step="any" value={appliance.watts} onChange={(e) => updateAppliance(appliance.id, { watts: number(e.target.value) })} /></label><label>Quantity<input type="number" min="1" value={appliance.quantity} onChange={(e) => updateAppliance(appliance.id, { quantity: number(e.target.value) })} /></label><label>Type<select value={appliance.loadType} onChange={(e) => updateAppliance(appliance.id, { loadType: e.target.value as "ac" | "dc" })}><option value="ac">AC</option><option value="dc">DC</option></select></label></div><p className="form-hint">Typical estimate ({appliance.typicalRange}) — adjust if known.</p><details><summary>Usage pattern</summary><label>Duty cycle (%)<input type="number" min="1" max="100" value={percent(appliance.dutyCycle)} onChange={(e) => updateAppliance(appliance.id, { dutyCycle: fraction(e.target.value) })} /></label></details><button className="remove-button" type="button" onClick={() => { setAppliances((current) => current.filter((item) => item.id !== appliance.id)); if (calculated) setStale(true); }}>Remove {appliance.label}</button></fieldset>)}</div>}</fieldset>
          <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
          {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><div className="field-pair"><label>Starting charge (%)<input type="number" min="1" max="100" value={percent(startingSoc)} onChange={(e) => markChanged(setStartingSoc, fraction(e.target.value))} /></label><label>Minimum remaining charge (%)<input type="number" min="0" max="99" value={percent(reserveSoc)} onChange={(e) => { setReserveSoc(fraction(e.target.value)); setReserveCustomized(true); if (calculated) setStale(true); }} /></label><label>Battery health (%)<input type="number" min="1" max="100" value={percent(batteryHealth)} onChange={(e) => markChanged(setBatteryHealth, fraction(e.target.value))} /></label><label>AC inverter efficiency (%)<input type="number" min="1" max="100" value={percent(acEfficiency)} onChange={(e) => markChanged(setAcEfficiency, fraction(e.target.value))} /></label><label>DC conversion efficiency (%)<input type="number" min="1" max="100" value={percent(dcEfficiency)} onChange={(e) => markChanged(setDcEfficiency, fraction(e.target.value))} /></label><label>Design margin (%)<input type="number" min="0" max="100" value={percent(designMargin)} onChange={(e) => markChanged(setDesignMargin, fraction(e.target.value))} /></label><label>System voltage<select value={voltagePreset} onChange={(e) => { const next = e.target.value; setVoltagePreset(next); if (next !== "custom") markChanged(setVoltage, number(next)); else if (calculated) setStale(true); }}><option value="12">12 V</option>{BATTERY_VOLTAGE_PRESETS.filter((item) => item !== 12).map((item) => <option key={item} value={item}>{item} V</option>)}<option value="custom">Custom</option></select>{voltagePreset === "custom" && <input type="number" min="1" step="0.1" value={voltage} onChange={(e) => markChanged(setVoltage, number(e.target.value))} />}</label></div>{reserveCustomized && <p className="form-hint">Your reserve is custom and will not be replaced when chemistry changes.</p>}</fieldset>}
          {!calculated && <p className="form-hint">Enter your backup requirements, then calculate the battery capacity you need.</p>}{error && <p className="error" role="alert">{error.message}</p>}<button className="button calculator-submit" type="submit">{calculated ? "Recalculate" : "Calculate Battery Size"}</button>
        </form>
      </div>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">Battery recommendation</p>{!calculated ? <p>Complete the inputs and calculate to see a recommendation.</p> : <><p className="result-lede">Recommended battery size</p><p className="result-value">{kwh(calculated.result.recommendedNominalWh)}</p><p className="result-lede">Choose a battery with at least {kwh(calculated.result.recommendedNominalWh)} nominal capacity.</p>{stale && <p className="warning" role="status">Inputs changed — recalculate to update the recommendation.</p>}<dl className="result-breakdown"><div><dt>Minimum before planning margin</dt><dd>{kwh(calculated.result.minimumNominalWh)}</dd></div><div><dt>Required load energy</dt><dd>{kwh(calculated.result.deviceLoadEnergyWh)}</dd></div><div><dt>Planning margin</dt><dd>{percent(designMargin)}%</dd></div><div><dt>Average device load</dt><dd>{Math.round(calculated.result.totalAverageDeviceW)} W</dd></div>{loadMode === "appliances" && <div><dt>Peak connected load</dt><dd>{Math.round(calculated.result.peakConnectedLoadW)} W</dd></div>}</dl><section className="comparison"><h3>Battery size at different runtimes</h3><dl>{comparison.map((item) => <div key={item.runtime} className={item.current ? "current-comparison" : ""}><dt>{hours(item.runtime)} {item.current && <span>Your target</span>}</dt><dd>{kwh(item.capacity)}</dd></div>)}</dl></section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Battery type</dt><dd>{chemistryPreset.label}</dd></div><div><dt>Starting charge</dt><dd>{percent(startingSoc)}%</dd></div><div><dt>Minimum charge</dt><dd>{percent(reserveSoc)}%</dd></div><div><dt>Battery health</dt><dd>{percent(batteryHealth)}%</dd></div><div><dt>Conversion efficiency</dt><dd>{percent(loadType === "ac" ? acEfficiency : dcEfficiency)}%</dd></div><div><dt>System voltage</dt><dd>{voltage} V</dd></div></dl><button className="text-button" type="button" onClick={() => setAdvancedOpen(true)}>Edit assumptions</button></section><section className="comparison"><h3>Your selected system voltage</h3><p><strong>{voltage} V</strong> · {ah(calculated.result.selectedVoltageAh)} equivalent</p><p className="form-hint">Ah equivalent depends on system voltage.</p><dl>{calculated.result.equivalentAh.map((item) => <div key={item.voltage} className={item.voltage === voltage ? "current-comparison" : ""}><dt>{item.voltage} V {item.voltage === voltage && <span>Selected</span>}</dt><dd>{ah(item.ampHours)}</dd></div>)}</dl></section><p className="warning">Capacity is only one part of battery selection. Confirm that the battery, BMS and inverter can support your required continuous and peak power using manufacturer specifications.</p><button className="button" type="button" onClick={verifyRuntime}>Verify this battery&apos;s runtime</button></>}</aside>
    </div><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </section>;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { EV_CHARGERS, EV_CHARGING_EFFICIENCIES, EV_CHARGING_TIME_DEFAULTS, type DcTaperMode, type EvChargingType } from "@/data/ev-charging-defaults";
import { calculateEvChargingTime, type EvChargingTimeResult } from "@/lib/calculators/ev-charging-time/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";

const number = (value: string) => Number(value);
const percent = (value: number) => Math.round(value * 100);
const fraction = (value: string) => Number(value) / 100;
const formatTime = (hours: number) => { const minutes = Math.max(0, Math.round(hours * 60)); const h = Math.floor(minutes / 60); const m = minutes % 60; if (!h) return `${m} min`; if (!m) return `${h} h`; return `${h} h ${m} min`; };
const formatPower = (value: number) => `${value.toFixed(value >= 10 ? 0 : 2)} kW`;

export function EvChargingTimeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState<number>(EV_CHARGING_TIME_DEFAULTS.batteryCapacityKwh);
  const [startSoc, setStartSoc] = useState<number>(EV_CHARGING_TIME_DEFAULTS.startSoc);
  const [targetSoc, setTargetSoc] = useState<number>(EV_CHARGING_TIME_DEFAULTS.targetSoc);
  const [chargerId, setChargerId] = useState("ac-7.2");
  const [chargerPower, setChargerPower] = useState<number>(EV_CHARGING_TIME_DEFAULTS.chargerPowerKw);
  const [chargingType, setChargingType] = useState<EvChargingType>(EV_CHARGING_TIME_DEFAULTS.chargingType);
  const [customPower, setCustomPower] = useState<number>(22);
  const [customType, setCustomType] = useState<EvChargingType>("AC");
  const [vehicleMaxAc, setVehicleMaxAc] = useState<number | null>(null);
  const [vehicleMaxDc, setVehicleMaxDc] = useState<number | null>(null);
  const [acEfficiency, setAcEfficiency] = useState<number>(EV_CHARGING_TIME_DEFAULTS.acEfficiency);
  const [dcEfficiency, setDcEfficiency] = useState<number>(EV_CHARGING_TIME_DEFAULTS.dcEfficiency);
  const [taperMode, setTaperMode] = useState<DcTaperMode>(EV_CHARGING_TIME_DEFAULTS.dcTaperMode);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculated, setCalculated] = useState<EvChargingTimeResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const saved = createEnergyProfileStore(window.localStorage).read().evCharging;
    if (saved.batteryCapacityKWh !== null) setBatteryCapacity(saved.batteryCapacityKWh);
    if (saved.startSoc !== null) setStartSoc(saved.startSoc);
    if (saved.targetSoc !== null) setTargetSoc(saved.targetSoc);
    if (saved.vehicleMaxAcPowerKw !== null) setVehicleMaxAc(saved.vehicleMaxAcPowerKw);
    if (saved.vehicleMaxDcPowerKw !== null) setVehicleMaxDc(saved.vehicleMaxDcPowerKw);
    if (saved.acEfficiency !== null) setAcEfficiency(saved.acEfficiency);
    if (saved.dcEfficiency !== null) setDcEfficiency(saved.dcEfficiency);
    if (saved.dcTaperMode !== null) setTaperMode(saved.dcTaperMode);
    track("calculator_view", { calculator_id: "ev-charging-time", category: "ev", phase: 1 });
  }, []);

  const isCustom = chargerId === "custom";
  const activePower = isCustom ? customPower : chargerPower;
  const activeType = isCustom ? customType : chargingType;
  const input = useMemo(() => ({ batteryCapacityKwh: batteryCapacity, startSoc, targetSoc, chargerPowerKw: activePower, chargingType: activeType, vehicleMaxAcPowerKw: vehicleMaxAc ?? undefined, vehicleMaxDcPowerKw: vehicleMaxDc ?? undefined, acEfficiency, dcEfficiency, dcTaperMode: activeType === "DC" ? taperMode : "constant" as const }), [acEfficiency, activePower, activeType, batteryCapacity, dcEfficiency, startSoc, targetSoc, taperMode, vehicleMaxAc, vehicleMaxDc]);
  const mark = <T,>(setter: (value: T) => void, value: T) => { setter(value); if (calculated) setStale(true); };
  const selectPreset = (id: string) => { setChargerId(id); const preset = EV_CHARGERS.find((item) => item.id === id); if (preset) { setChargerPower(preset.powerKw); setChargingType(preset.chargingType); if (calculated) setStale(true); } };
  const calculate = () => {
    try {
      const result = calculateEvChargingTime(input);
      setCalculated(result); setError(null); setStale(false); setAnnouncement(`Estimated charging time: ${formatTime(result.result.timeHours)}.`);
      createEnergyProfileStore(window.localStorage).patchEvCharging({ batteryCapacityKWh: batteryCapacity, startSoc, targetSoc, chargerPowerKw: activePower, chargingType: activeType, vehicleMaxAcPowerKw: vehicleMaxAc, vehicleMaxDcPowerKw: vehicleMaxDc, acEfficiency, dcEfficiency, dcTaperMode: activeType === "DC" ? taperMode : "constant" });
      track("calculator_calculate", { calculator_id: "ev-charging-time", charging_type: activeType, used_advanced: advancedOpen });
    } catch (calculationError) { setError(calculationError instanceof Error ? calculationError : new Error("Unable to calculate charging time.")); }
  };
  const comparison = (type: EvChargingType) => EV_CHARGERS.filter((item) => item.chargingType === type).map((preset) => { try { const result = calculateEvChargingTime({ ...input, chargerPowerKw: preset.powerKw, chargingType: type, dcTaperMode: type === "DC" ? taperMode : "constant" }); return { ...preset, result }; } catch { return null; } }).filter((item): item is typeof EV_CHARGERS[number] & { result: EvChargingTimeResult } => Boolean(item));
  const acComparisons = calculated ? comparison("AC") : [];
  const dcComparisons = calculated ? comparison("DC") : [];
  const selectedLabel = isCustom ? `${customPower} kW ${customType}` : `${activePower} kW ${activeType}`;

  return <section className="calculator" aria-labelledby="ev-charging-heading"><div className="calculator-grid"><div className="calculator-inputs"><h2 id="ev-charging-heading">Calculate charging time</h2><form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
    <fieldset className="input-group"><legend>Charging session</legend><div className="field-pair"><label>Battery capacity (kWh)<input type="number" min="0.1" step="any" value={batteryCapacity} onChange={(e) => mark(setBatteryCapacity, number(e.target.value))} /></label><label>Start charge (%)<input type="number" min="0" max="99" value={percent(startSoc)} onChange={(e) => mark(setStartSoc, fraction(e.target.value))} /></label><label>Target charge (%)<input type="number" min="1" max="100" value={percent(targetSoc)} onChange={(e) => mark(setTargetSoc, fraction(e.target.value))} /></label></div></fieldset>
    <fieldset className="input-group"><legend>Charger</legend><div className="appliance-options charger-options">{EV_CHARGERS.map((preset) => <button key={preset.id} type="button" className={chargerId === preset.id ? "selected" : ""} onClick={() => selectPreset(preset.id)}><strong>{preset.label}</strong><small>{preset.detail}</small></button>)}<button type="button" className={isCustom ? "selected" : ""} onClick={() => { setChargerId("custom"); if (calculated) setStale(true); }}><strong>Custom</strong><small>Choose type</small></button></div>{isCustom && <div className="field-pair"><label>Custom charger power (kW)<input type="number" min="0.1" step="any" value={customPower} onChange={(e) => mark(setCustomPower, number(e.target.value))} /></label><fieldset className="mode-choice"><legend>Charging type</legend><label><input type="radio" checked={customType === "AC"} onChange={() => mark(setCustomType, "AC")} /> AC</label><label><input type="radio" checked={customType === "DC"} onChange={() => mark(setCustomType, "DC")} /> DC</label></fieldset></div>}<p className="form-hint">Known charger presets determine AC or DC automatically.</p></fieldset>
    <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
    {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><div className="field-pair">{activeType === "AC" ? <label>Vehicle maximum AC charge power (kW)<input type="number" min="0.1" step="any" placeholder="Unknown" value={vehicleMaxAc ?? ""} onChange={(e) => mark(setVehicleMaxAc, e.target.value === "" ? null : number(e.target.value))} /></label> : <label>Vehicle maximum DC charge power (kW)<input type="number" min="0.1" step="any" placeholder="Unknown" value={vehicleMaxDc ?? ""} onChange={(e) => mark(setVehicleMaxDc, e.target.value === "" ? null : number(e.target.value))} /></label>}<label>AC charging efficiency (%)<input type="number" min="1" max="100" value={percent(acEfficiency)} onChange={(e) => mark(setAcEfficiency, fraction(e.target.value))} /></label><label>DC charging efficiency (%)<input type="number" min="1" max="100" value={percent(dcEfficiency)} onChange={(e) => mark(setDcEfficiency, fraction(e.target.value))} /></label>{activeType === "DC" && <label>DC charging model<select value={taperMode} onChange={(e) => mark(setTaperMode, e.target.value as DcTaperMode)}><option value="generic">Generic DC taper</option><option value="constant">Idealized constant power</option></select></label>}</div></fieldset>}
    {!calculated && <p className="form-hint">Enter your battery and charger details, then calculate the estimated charging time.</p>}{error && <p className="error" role="alert">{error.message}</p>}<button className="button calculator-submit" type="submit">{calculated ? "Recalculate" : "Calculate Charging Time"}</button>
  </form></div><aside className="result-panel" aria-live="polite"><p className="eyebrow">EV charging estimate</p>{!calculated ? <p>Complete the inputs and calculate to see an estimate.</p> : <><p className="result-lede">Estimated charging time</p><p className="result-value">{formatTime(calculated.result.timeHours)}</p>{stale && <p className="warning" role="status">Inputs changed — recalculate to update the estimate.</p>}<dl className="result-breakdown"><div><dt>Battery energy added</dt><dd>{calculated.result.batteryEnergyAddedKWh.toFixed(1)} kWh</dd></div><div><dt>Estimated source energy</dt><dd>{calculated.result.gridEnergyKWh.toFixed(1)} kWh</dd></div><div><dt>Selected charger</dt><dd>{selectedLabel}</dd></div>{activeType === "AC" ? <div><dt>Effective battery charging power</dt><dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd></div> : <><div><dt>Base DC charging power</dt><dd>{formatPower(calculated.result.baseDcBatteryPowerKw ?? 0)} before taper</dd></div>{calculated.result.taperMode === "generic" && <div><dt>Average charging power</dt><dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd></div>}</>}{calculated.result.limitingFactor !== "vehicle-limit-unknown" && <div><dt>Limiting factor</dt><dd>{calculated.result.limitingFactor === "vehicle-ac-charging-limit" ? "Vehicle AC limit" : "Vehicle DC limit"}</dd></div>}</dl>{calculated.result.limitingFactor === "vehicle-limit-unknown" && <p className="form-hint">Vehicle charging limit unknown — estimate assumes the vehicle can accept the selected charger power.</p>}{activeType === "DC" && calculated.result.taperMode === "generic" && <p className="warning">Generic planning curve — actual charging behavior varies by vehicle, battery temperature and battery management system.</p>}<section className="comparison"><h3>Common AC charging speeds</h3><dl>{acComparisons.map((item) => <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}><dt>{item.label} <span>{item.detail}</span></dt><dd>{formatTime(item.result.timeHours)}</dd></div>)}</dl><p className="form-hint">AC estimates use constant battery-side power after conversion losses.</p></section><section className="comparison"><h3>DC fast charging estimates</h3><dl>{dcComparisons.map((item) => <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}><dt>{item.label} <span>{item.detail}</span></dt><dd>{formatTime(item.result.timeHours)}</dd></div>)}</dl><p className="form-hint">DC estimates apply the generic taper curve to the charger/vehicle power limit.</p></section></>}</aside></div><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p></section>;
}

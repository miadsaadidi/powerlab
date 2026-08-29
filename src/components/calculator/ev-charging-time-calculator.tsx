"use client";

import { useEffect, useMemo, useState } from "react";
import { EV_CHARGERS, EV_CHARGING_EFFICIENCIES, EV_CHARGING_TIME_DEFAULTS, type DcTaperMode, type EvChargingType } from "@/data/ev-charging-defaults";
import { calculateEvChargingTime, type EvChargingTimeResult } from "@/lib/calculators/ev-charging-time/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { EmbedModal } from "@/components/calculator/embed-modal";
import { EvChargingVisualizer } from "@/components/calculator/ev-charging-visualizer";

import { EvChargingCurveChart } from "@/components/charts/ev-charging-curve";



const QUICK_EV_PRESETS = [
  { label: "🔌 Standard Home L2 (32A / 7.7kW)", battery: 60, start: 0.2, target: 0.8, charger: "ac-7.2" },
  { label: "⚡ Fast Home L2 (48A / 11.5kW)", battery: 75, start: 0.2, target: 0.8, charger: "ac-11.5" },
  { label: "🚗 Road Trip DCFC (150kW)", battery: 75, start: 0.1, target: 0.8, charger: "dc-150" },
  { label: "🏠 Wall Outlet L1 (120V 12A)", battery: 60, start: 0.5, target: 0.7, charger: "ac-1.4" },
  { label: "🛻 Large EV Truck (48A / 11.5kW)", battery: 130, start: 0.15, target: 0.85, charger: "ac-11.5" },
];

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

  const isCustom = chargerId === "custom";
  const activePower = isCustom ? customPower : chargerPower;
  const activeType = isCustom ? customType : chargingType;
  const input = useMemo(() => ({ batteryCapacityKwh: batteryCapacity, startSoc, targetSoc, chargerPowerKw: activePower, chargingType: activeType, vehicleMaxAcPowerKw: vehicleMaxAc ?? undefined, vehicleMaxDcPowerKw: vehicleMaxDc ?? undefined, acEfficiency, dcEfficiency, dcTaperMode: activeType === "DC" ? taperMode : "constant" as const }), [acEfficiency, activePower, activeType, batteryCapacity, dcEfficiency, startSoc, targetSoc, taperMode, vehicleMaxAc, vehicleMaxDc]);

  useEffect(() => {
    let initialBattery: number = EV_CHARGING_TIME_DEFAULTS.batteryCapacityKwh;
    let initialStart: number = EV_CHARGING_TIME_DEFAULTS.startSoc;
    let initialTarget: number = EV_CHARGING_TIME_DEFAULTS.targetSoc;
    let initialChargerId: string = "ac-7.2";
    let initialPower: number = EV_CHARGING_TIME_DEFAULTS.chargerPowerKw;
    let initialType: "AC" | "DC" = EV_CHARGING_TIME_DEFAULTS.chargingType;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCap = Number(params.get("battery"));
      const urlStart = Number(params.get("start"));
      const urlTarget = Number(params.get("target"));
      const urlCharger = params.get("charger");

      if (Number.isFinite(urlCap) && urlCap > 0) { setBatteryCapacity(urlCap); initialBattery = urlCap; }
      if (Number.isFinite(urlStart) && urlStart >= 0 && urlStart < 100) { setStartSoc(urlStart / 100); initialStart = urlStart / 100; }
      if (Number.isFinite(urlTarget) && urlTarget > 0 && urlTarget <= 100) { setTargetSoc(urlTarget / 100); initialTarget = urlTarget / 100; }
      if (urlCharger) {
        const found = EV_CHARGERS.find((c) => c.id === urlCharger);
        if (found) {
          setChargerId(found.id);
          setChargerPower(found.powerKw);
          setChargingType(found.chargingType);
          initialChargerId = found.id;
          initialPower = found.powerKw;
          initialType = found.chargingType;
        }
      }
    }

    const saved = createEnergyProfileStore(window.localStorage).read().evCharging;
    if (saved.batteryCapacityKWh !== null && !new URLSearchParams(window.location.search).get("battery")) { setBatteryCapacity(saved.batteryCapacityKWh); initialBattery = saved.batteryCapacityKWh; }
    if (saved.startSoc !== null && !new URLSearchParams(window.location.search).get("start")) { setStartSoc(saved.startSoc); initialStart = saved.startSoc; }
    if (saved.targetSoc !== null && !new URLSearchParams(window.location.search).get("target")) { setTargetSoc(saved.targetSoc); initialTarget = saved.targetSoc; }
    if (saved.vehicleMaxAcPowerKw !== null) setVehicleMaxAc(saved.vehicleMaxAcPowerKw);
    if (saved.vehicleMaxDcPowerKw !== null) setVehicleMaxDc(saved.vehicleMaxDcPowerKw);
    if (saved.acEfficiency !== null) setAcEfficiency(saved.acEfficiency);
    if (saved.dcEfficiency !== null) setDcEfficiency(saved.dcEfficiency);
    if (saved.dcTaperMode !== null) setTaperMode(saved.dcTaperMode);

    // Initial instant calculation so the user sees results immediately
    try {
      const res = calculateEvChargingTime({
        batteryCapacityKwh: initialBattery,
        startSoc: initialStart,
        targetSoc: initialTarget,
        chargerPowerKw: initialPower,
        chargingType: initialType,
        acEfficiency: saved.acEfficiency ?? EV_CHARGING_TIME_DEFAULTS.acEfficiency,
        dcEfficiency: saved.dcEfficiency ?? EV_CHARGING_TIME_DEFAULTS.dcEfficiency,
        dcTaperMode: initialType === "DC" ? (saved.dcTaperMode ?? "generic") : "constant",
      });
      setCalculated(res);
    } catch {
      // Ignore initial calculation fallback
    }

    track("calculator_view", { calculator_id: "ev-charging-time", category: "ev", phase: 1 });
  }, []);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("battery", String(batteryCapacity));
    url.searchParams.set("start", String(percent(startSoc)));
    url.searchParams.set("target", String(percent(targetSoc)));
    url.searchParams.set("charger", chargerId);
    return url.toString();
  };

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

  // Miles per hour speed indicator based on standard 3.5 mi/kWh efficiency
  const effectivePower = calculated ? calculated.result.averageBatteryChargingPowerKw : activePower;
  const mphChargeRate = Math.round(effectivePower * 3.5);
  const kmhChargeRate = Math.round(effectivePower * 3.5 * 1.60934);
  const rangeAddedMiles = calculated ? Math.round(calculated.result.batteryEnergyAddedKWh * 3.5) : 0;
  const rangeAddedKm = Math.round(rangeAddedMiles * 1.60934);

  return <section className="calculator" aria-labelledby="ev-charging-heading"><div className="calculator-grid"><div className="calculator-inputs"><h2 id="ev-charging-heading">Calculate charging time</h2>
    <CalculatorTrustPill />

    <div className="preset-chips-container" role="region" aria-label="Quick EV Scenarios">
      <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Scenarios</span>
      <div className="preset-chips-row">
        {QUICK_EV_PRESETS.map((sc) => (
          <button
            key={sc.label}
            type="button"
            className={`preset-chip-btn ${batteryCapacity === sc.battery && Math.abs(startSoc - sc.start) < 0.05 && Math.abs(targetSoc - sc.target) < 0.05 && chargerId === sc.charger ? "active" : ""}`}
            onClick={() => {
              setBatteryCapacity(sc.battery);
              setStartSoc(sc.start);
              setTargetSoc(sc.target);
              selectPreset(sc.charger);
              if (calculated) setStale(true);
              track("calculator_preset_click", { calculator_id: "ev-charging-time", preset: sc.label });
            }}
          >
            {sc.label}
          </button>
        ))}
      </div>
    </div>

    <form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
      <fieldset className="input-group"><legend>Charging session</legend><div className="field-pair"><label>Battery capacity (kWh)<input type="number" min="0.1" step="any" value={batteryCapacity} onChange={(e) => mark(setBatteryCapacity, number(e.target.value))} /></label><label>Start charge (%)<input type="number" min="0" max="99" value={percent(startSoc)} onChange={(e) => mark(setStartSoc, fraction(e.target.value))} /></label><label>Target charge (%)<input type="number" min="1" max="100" value={percent(targetSoc)} onChange={(e) => mark(setTargetSoc, fraction(e.target.value))} /></label></div></fieldset>
      <fieldset className="input-group"><legend>Charger</legend><div className="appliance-options charger-options">{EV_CHARGERS.map((preset) => <button key={preset.id} type="button" className={chargerId === preset.id ? "selected" : ""} onClick={() => selectPreset(preset.id)}><strong>{preset.label}</strong><small>{preset.detail}</small></button>)}<button type="button" className={isCustom ? "selected" : ""} onClick={() => { setChargerId("custom"); if (calculated) setStale(true); }}><strong>Custom</strong><small>Choose type</small></button></div>{isCustom && <div className="field-pair"><label>Custom charger power (kW)<input type="number" min="0.1" step="any" value={customPower} onChange={(e) => mark(setCustomPower, number(e.target.value))} /></label><fieldset className="mode-choice"><legend>Charging type</legend><label><input type="radio" checked={customType === "AC"} onChange={() => mark(setCustomType, "AC")} /> AC</label><label><input type="radio" checked={customType === "DC"} onChange={() => mark(setCustomType, "DC")} /> DC</label></fieldset></div>}<p className="form-hint">Known charger presets determine AC or DC automatically.</p></fieldset>
      <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
      {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><div className="field-pair">{activeType === "AC" ? <label>Vehicle maximum AC charge power (kW)<input type="number" min="0.1" step="any" placeholder="Unknown" value={vehicleMaxAc ?? ""} onChange={(e) => mark(setVehicleMaxAc, e.target.value === "" ? null : number(e.target.value))} /></label> : <label>Vehicle maximum DC charge power (kW)<input type="number" min="0.1" step="any" placeholder="Unknown" value={vehicleMaxDc ?? ""} onChange={(e) => mark(setVehicleMaxDc, e.target.value === "" ? null : number(e.target.value))} /></label>}<label>AC charging efficiency (%)<input type="number" min="1" max="100" value={percent(acEfficiency)} onChange={(e) => mark(setAcEfficiency, fraction(e.target.value))} /></label><label>DC charging efficiency (%)<input type="number" min="1" max="100" value={percent(dcEfficiency)} onChange={(e) => mark(setDcEfficiency, fraction(e.target.value))} /></label>{activeType === "DC" && <label>DC charging model<select value={taperMode} onChange={(e) => mark(setTaperMode, e.target.value as DcTaperMode)}><option value="generic">Generic DC taper</option><option value="constant">Idealized constant power</option></select></label>}</div></fieldset>}
      {!calculated && <p className="form-hint">Enter your battery and charger details, then calculate the estimated charging time.</p>}{error && <p className="error" role="alert">{error.message}</p>}<button className="button calculator-submit" type="submit">{calculated ? "Recalculate" : "Calculate Charging Time"}</button>
    </form></div><aside id="calculator-result" className="result-panel" aria-live="polite"><p className="eyebrow">EV charging estimate</p>{!calculated ? <p>Complete the inputs and calculate to see an estimate.</p> : <><p className="result-lede">Estimated charging time</p><p className="result-value">{formatTime(calculated.result.timeHours)}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.75rem", background: "rgba(2, 132, 199, 0.08)", border: "1px solid rgba(2, 132, 199, 0.2)", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600, color: "#0284c7", margin: "0.5rem 0 1rem 0" }}>
          <span>⚡ +{mphChargeRate} mph ({kmhChargeRate} km/h) speed</span>
          <span style={{ color: "var(--text-muted, #64748b)", fontWeight: 400 }}>• Adds ~{rangeAddedMiles} mi ({rangeAddedKm} km) total</span>
        </div>
        {stale && <p className="warning" role="status">Inputs changed — recalculate to update the estimate.</p>}        <EvChargingVisualizer
          batteryCapacityKwh={batteryCapacity}
          startSocPercent={percent(startSoc)}
          targetSocPercent={percent(targetSoc)}
          chargerPowerKw={activePower}
          chargeTimeHours={calculated.result.timeHours}
          rangeAddedMiles={calculated.result.batteryEnergyAddedKWh * 3.5}
          rangeAddedKm={calculated.result.batteryEnergyAddedKWh * 3.5 * 1.60934}
        />
        <EvChargingCurveChart
          batteryKwh={batteryCapacity}
          chargerKw={activePower}
          startSoc={percent(startSoc)}
          targetSoc={percent(targetSoc)}
          isDcFastCharge={activeType === "DC"}
        />
        <dl className="result-breakdown">
<div><dt>Battery energy added</dt><dd>{calculated.result.batteryEnergyAddedKWh.toFixed(1)} kWh</dd></div><div><dt>Estimated source energy</dt><dd>{calculated.result.gridEnergyKWh.toFixed(1)} kWh</dd></div><div><dt>Selected charger</dt><dd>{selectedLabel}</dd></div>{activeType === "AC" ? <div><dt>Effective battery charging power</dt><dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd></div> : <><div><dt>Base DC charging power</dt><dd>{formatPower(calculated.result.baseDcBatteryPowerKw ?? 0)} before taper</dd></div>{calculated.result.taperMode === "generic" && <div><dt>Average charging power</dt><dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd></div>}</>}{calculated.result.limitingFactor !== "vehicle-limit-unknown" && <div><dt>Limiting factor</dt><dd>{calculated.result.limitingFactor === "vehicle-ac-charging-limit" ? "Vehicle AC limit" : "Vehicle DC limit"}</dd></div>}</dl>{calculated.result.limitingFactor === "vehicle-limit-unknown" && <p className="form-hint">Vehicle charging limit unknown — estimate assumes the vehicle can accept the selected charger power.</p>}{activeType === "DC" && calculated.result.taperMode === "generic" && <p className="warning">Generic planning curve — actual charging behavior varies by vehicle, battery temperature and battery management system.</p>}<section className="comparison"><h3>Common AC charging speeds</h3><dl>{acComparisons.map((item) => <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}><dt>{item.label} <span>{item.detail}</span></dt><dd>{formatTime(item.result.timeHours)}</dd></div>)}</dl><p className="form-hint">AC estimates use constant battery-side power after conversion losses.</p></section><section className="comparison"><h3>DC fast charging estimates</h3><dl>{dcComparisons.map((item) => <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}><dt>{item.label} <span>{item.detail}</span></dt><dd>{formatTime(item.result.timeHours)}</dd></div>)}</dl><p className="form-hint">DC estimates apply the generic taper curve to the charger/vehicle power limit.</p></section>
        <GooglePreferredBanner />
        <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <ShareButton getShareUrl={getShareUrl} />
          <PrintSpecButton />
        </div>
      </>}
</aside></div>
    {calculated && <MobileResultBar label="Estimated Charging Time" value={formatTime(calculated.result.timeHours)} targetId="calculator-result" />}
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p></section>;
}




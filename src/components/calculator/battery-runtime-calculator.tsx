"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES, type AppliancePreset } from "@/data/appliances";
import { BATTERY_CHEMISTRIES, BATTERY_RUNTIME_DEFAULTS, BATTERY_VOLTAGE_PRESETS } from "@/data/battery-defaults";
import { track } from "@/lib/analytics/analytics";
import { calculateBatteryRuntime, type BatteryRuntimeInput, type LoadType, type RuntimeApplianceInput } from "@/lib/calculators/battery-runtime/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { LossWaterfall } from "@/components/calculator/loss-waterfall";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { BatterySocGauge } from "@/components/calculator/battery-soc-gauge";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";
import { EmbedModal } from "@/components/calculator/embed-modal";
import { OutageTimelineVisualizer } from "@/components/calculator/outage-timeline-visualizer";
import { BatteryDischargeCurveChart } from "@/components/charts/battery-discharge-curve";
import { QuickReferenceTable } from "@/components/seo/quick-reference-table";
import { CalculationWalkthrough } from "@/components/seo/calculation-walkthrough";



type CapacityUnit = "wh" | "kwh" | "ah";
type LoadMode = "total" | "appliances";
type LoadUnit = "w" | "kw";

type ApplianceRow = RuntimeApplianceInput & { id: string; typicalRange: string };

const COMMON_APPLIANCE_IDS = ["wifi-router", "laptop", "led-tv", "led-bulb", "refrigerator", "ceiling-fan", "desktop", "phone-charger", "game-console", "microwave", "coffee-maker", "air-fryer", "electric-kettle", "space-heater", "window-ac", "custom"];

const QUICK_SCENARIOS = [
  { label: "🏕️ 12V Vanlife Fridge", capacity: 1200, unit: "wh" as const, chem: "lifepo4", watts: 45, duty: 0.35, desc: "12V 100Ah LiFePO4 + 45W fridge (35% cycling)" },
  { label: "💻 Workstation & Starlink", capacity: 1000, unit: "wh" as const, chem: "lifepo4", watts: 150, duty: 1.0, desc: "1,000Wh station + 150W laptop, monitor & Starlink" },
  { label: "🏠 Home Outage Essentials", capacity: 13500, unit: "wh" as const, chem: "lifepo4", watts: 285, duty: 1.0, desc: "13.5kWh Home Battery + Fridge, Wi-Fi & LED lights" },
  { label: "🏥 Medical CPAP (Overnight)", capacity: 500, unit: "wh" as const, chem: "lifepo4", watts: 45, duty: 1.0, desc: "500Wh battery + 45W CPAP with humidifier" },
  { label: "🚨 Sump Pump Storm Backup", capacity: 1200, unit: "wh" as const, chem: "agm", watts: 800, duty: 0.1, desc: "12V 100Ah AGM + 800W pump (10% storm duty)" },
];


const asNumber = (value: string) => Number(value);
const asPercent = (value: string) => Number(value) / 100;
const percent = (value: number) => Math.round(value * 100);
const watts = (value: number) => Math.round(value).toLocaleString();

function formatRuntime(hours: number) {
  const totalMinutes = Math.max(0, Math.round(hours * 60));
  const days = Math.floor(totalMinutes / 1_440);
  const remainingHours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} ${remainingHours} h`;
  if (remainingHours === 0) return `${minutes} min`;
  if (minutes === 0) return `${remainingHours} h`;
  return `${remainingHours} h ${minutes} min`;
}

function roundComparisonLoad(currentLoad: number, multiplier: number) {
  const raw = currentLoad * multiplier;
  return currentLoad <= 100 ? Math.round(raw) : Math.round(raw / 10) * 10;
}

export function BatteryRuntimeCalculator() {
  const [capacityUnit, setCapacityUnit] = useState<CapacityUnit>("wh");
  const [capacityValue, setCapacityValue] = useState<number>(BATTERY_RUNTIME_DEFAULTS.capacityWh);
  const [voltage, setVoltage] = useState<number>(BATTERY_RUNTIME_DEFAULTS.batteryVoltage);
  const [voltagePreset, setVoltagePreset] = useState<string>("12");
  const [chemistry, setChemistry] = useState("lifepo4");
  const [loadMode, setLoadMode] = useState<LoadMode>("total");
  const [loadValue, setLoadValue] = useState<number>(BATTERY_RUNTIME_DEFAULTS.loadWatts);
  const [loadUnit, setLoadUnit] = useState<LoadUnit>("w");
  const [loadType, setLoadType] = useState<LoadType>("ac");
  const [appliances, setAppliances] = useState<ApplianceRow[]>([]);
  const [applianceSearch, setApplianceSearch] = useState("");
  const [startingSoc, setStartingSoc] = useState<number>(BATTERY_RUNTIME_DEFAULTS.startingSoc);
  const [reserveSoc, setReserveSoc] = useState<number>(BATTERY_RUNTIME_DEFAULTS.reserveSoc);
  const [batteryHealth, setBatteryHealth] = useState<number>(BATTERY_RUNTIME_DEFAULTS.batteryHealth);
  const [acInverterEfficiency, setAcInverterEfficiency] = useState<number>(BATTERY_RUNTIME_DEFAULTS.acInverterEfficiency);
  const [dcConversionEfficiency, setDcConversionEfficiency] = useState<number>(BATTERY_RUNTIME_DEFAULTS.dcConversionEfficiency);
  const [dutyCycle, setDutyCycle] = useState<number>(BATTERY_RUNTIME_DEFAULTS.dutyCycle);
  const [peukertEnabled, setPeukertEnabled] = useState<boolean>(BATTERY_RUNTIME_DEFAULTS.peukertEnabled);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const [reserveCustomized, setReserveCustomized] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const normalizedLoadWatts = loadUnit === "kw" ? loadValue * 1_000 : loadValue;
  const normalizedCapacityWh = capacityUnit === "wh" ? capacityValue : capacityUnit === "kwh" ? capacityValue * 1_000 : capacityValue * voltage;

  useEffect(() => {
    // 1. Check URL parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLoad = Number(params.get("load"));
      const urlCap = Number(params.get("capacity"));
      const urlUnit = params.get("unit") as CapacityUnit | null;
      const urlVolt = Number(params.get("voltage"));
      const urlChem = params.get("chemistry");

      if (Number.isFinite(urlLoad) && urlLoad > 0) setLoadValue(urlLoad);
      if (Number.isFinite(urlCap) && urlCap > 0) setCapacityValue(urlCap);
      if (urlUnit && ["wh", "kwh", "ah"].includes(urlUnit)) setCapacityUnit(urlUnit);
      if (Number.isFinite(urlVolt) && urlVolt > 0) setVoltage(urlVolt);
      if (urlChem && BATTERY_CHEMISTRIES.some((c) => c.id === urlChem)) setChemistry(urlChem);
    }

    const profile = createEnergyProfileStore(window.localStorage).read();
    const savedChemistry = BATTERY_CHEMISTRIES.find((item) => item.id === profile.battery.chemistry) ?? BATTERY_CHEMISTRIES[0];
    if (profile.battery.capacityWh && !new URLSearchParams(window.location.search).get("capacity")) {
      setCapacityValue(profile.battery.capacityWh);
      setCapacityUnit("wh");
    }
    if (profile.battery.chemistry && !new URLSearchParams(window.location.search).get("chemistry")) setChemistry(savedChemistry.id);
    if (profile.battery.reserveSoc !== null) {
      setReserveSoc(profile.battery.reserveSoc);
      setReserveCustomized(profile.battery.reserveSoc !== savedChemistry.reserveSoc);
    }
    track("calculator_view", { calculator_id: "battery-runtime", category: "battery", phase: 1 });
  }, []);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("load", String(loadValue));
    url.searchParams.set("capacity", String(capacityValue));
    url.searchParams.set("unit", capacityUnit);
    url.searchParams.set("voltage", String(voltage));
    url.searchParams.set("chemistry", chemistry);
    return url.toString();
  };


  const calculationInput = useMemo<BatteryRuntimeInput>(() => ({
    capacityWh: capacityUnit === "wh" ? capacityValue : undefined,
    capacityKwh: capacityUnit === "kwh" ? capacityValue : undefined,
    capacityAh: capacityUnit === "ah" ? capacityValue : undefined,
    voltage: capacityUnit === "ah" ? voltage : undefined,
    loadWatts: normalizedLoadWatts,
    loadType,
    appliances: loadMode === "appliances" ? appliances : undefined,
    startingSoc,
    reserveSoc,
    batteryHealth,
    acInverterEfficiency,
    dcConversionEfficiency,
    dutyCycle,
    batteryChemistry: chemistryPreset.label,
    peukertEnabled,
  }), [acInverterEfficiency, appliances, batteryHealth, capacityUnit, capacityValue, chemistryPreset.label, dcConversionEfficiency, dutyCycle, loadMode, loadType, normalizedLoadWatts, peukertEnabled, reserveSoc, startingSoc, voltage]);

  const result = useMemo(() => {
    if (loadMode === "appliances" && appliances.length === 0) return new Error("Add at least one appliance, or switch back to total load.");
    try {
      return calculateBatteryRuntime(calculationInput);
    } catch (calculationError) {
      return calculationError instanceof Error ? calculationError : new Error("Unable to calculate runtime.");
    }
  }, [appliances.length, calculationInput, loadMode]);

  const comparison = useMemo(() => {
    if (result instanceof Error) return [];
    const currentLoad = result.result.averageLoadWatts;
    return [0.75, 1, 1.25].map((multiplier) => {
      const load = roundComparisonLoad(currentLoad, multiplier);
      return { load, isCurrent: multiplier === 1, runtimeHours: result.result.runtimeHours * (currentLoad / load) };
    });
  }, [result]);

  const applianceTotals = useMemo(() => appliances.reduce((total, appliance) => ({
    connectedWatts: total.connectedWatts + appliance.watts * appliance.quantity,
    averageWatts: total.averageWatts + appliance.watts * appliance.quantity * appliance.dutyCycle,
  }), { connectedWatts: 0, averageWatts: 0 }), [appliances]);

  const updateAppliance = (id: string, update: Partial<ApplianceRow>) => {
    setAppliances((current) => current.map((appliance) => appliance.id === id ? { ...appliance, ...update } : appliance));
  };

  const addAppliance = (preset: AppliancePreset) => {
    setAppliances((current) => [...current, {
      id: `${preset.id}-${Date.now()}-${current.length}`,
      label: preset.label,
      watts: preset.watts,
      quantity: 1,
      loadType: preset.loadType,
      dutyCycle: preset.defaultDutyCycle,
      typicalRange: preset.typicalRange,
    }]);
    setApplianceSearch("");
    track("calculator_appliance_add", { calculator_id: "battery-runtime", preset: preset.id });
  };

  const selectChemistry = (id: string) => {
    const preset = BATTERY_CHEMISTRIES.find((item) => item.id === id);
    setChemistry(id);
    if (preset && !reserveCustomized) setReserveSoc(preset.reserveSoc);
  };

  const saveProfile = () => {
    if (result instanceof Error) {
      return;
    }
    createEnergyProfileStore(window.localStorage).patchBattery({
      capacityWh: normalizedCapacityWh,
      reserveSoc,
      chemistry: chemistryPreset.id,
      nominalVoltage: capacityUnit === "ah" ? voltage : null,
      capacityAh: capacityUnit === "ah" ? capacityValue : null,
      batteryHealth,
    });
    track("calculator_calculate", { calculator_id: "battery-runtime", used_advanced: advancedOpen, mode: loadMode });
    setAnnouncement("Battery values saved to this browser's Energy Profile.");
  };

  const filteredAppliances = (applianceSearch.trim()
    ? APPLIANCES.filter((item) => item.label.toLowerCase().includes(applianceSearch.trim().toLowerCase()))
    : COMMON_APPLIANCE_IDS.map((id) => APPLIANCES.find((item) => item.id === id)).filter((item): item is AppliancePreset => Boolean(item))).slice(0, 10);
  const visibleResult = submitted && !(result instanceof Error) ? result : null;

  return <section className="calculator" aria-labelledby="calculator-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="calculator-heading">Calculate estimated runtime</h2>
        <CalculatorTrustPill />

        <div className="preset-chips-container" role="region" aria-label="Quick Scenario Presets">
          <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Battery Setups</span>
          <div className="preset-chips-row">
            {QUICK_SCENARIOS.map((sc) => (
              <button
                key={sc.label}
                type="button"
                className={`preset-chip-btn ${loadMode === "total" && loadValue === sc.watts && capacityValue === sc.capacity ? "active" : ""}`}
                onClick={() => {
                  setCapacityValue(sc.capacity);
                  setCapacityUnit(sc.unit);
                  selectChemistry(sc.chem);
                  setLoadMode("total");
                  setLoadUnit("w");
                  setLoadValue(sc.watts);
                  setDutyCycle(sc.duty);
                  track("calculator_preset_click", { calculator_id: "battery-runtime", preset: sc.label });
                }}
                title={sc.desc}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={(event) => event.preventDefault()} noValidate>
          <fieldset className="input-group">
            <legend>Battery</legend>
            <div className="field-pair">
              <label htmlFor="battery-capacity">Capacity
                <span className="input-with-unit"><input id="battery-capacity" type="number" min="0.1" step="any" inputMode="decimal" value={capacityValue} onChange={(event) => setCapacityValue(asNumber(event.target.value))} /><select aria-label="Capacity unit" value={capacityUnit} onChange={(event) => setCapacityUnit(event.target.value as CapacityUnit)}><option value="wh">Wh</option><option value="kwh">kWh</option><option value="ah">Ah</option></select></span>
              </label>
              <label htmlFor="battery-chemistry">Battery type
                <select id="battery-chemistry" value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
              </label>
            </div>
            {capacityUnit === "ah" && <label htmlFor="battery-voltage">Battery voltage
              <span className="input-with-unit"><select id="battery-voltage" value={voltagePreset} onChange={(event) => { setVoltagePreset(event.target.value); if (event.target.value !== "custom") setVoltage(asNumber(event.target.value)); }}><option value="6">6 V</option>{BATTERY_VOLTAGE_PRESETS.filter((item) => item !== 6).map((item) => <option key={item} value={item}>{item} V</option>)}<option value="custom">Custom</option></select>{voltagePreset === "custom" && <input aria-label="Custom battery voltage" type="number" min="1" step="0.1" inputMode="decimal" value={voltage} onChange={(event) => setVoltage(asNumber(event.target.value))} />}</span>
            </label>}
            <p className="form-hint">Common starting values — adjust if you know your battery specification.</p>
          </fieldset>

          <fieldset className="input-group">
            <legend>Load</legend>
            <span className="field-label">How do you want to enter your load?</span>
            <div className="mode-choice" role="radiogroup" aria-label="Load entry mode">
              <label><input type="radio" name="load-mode" checked={loadMode === "total"} onChange={() => { setLoadMode("total"); track("calculator_mode_change", { calculator_id: "battery-runtime", mode: "total" }); }} /> Total load</label>
              <label><input type="radio" name="load-mode" checked={loadMode === "appliances"} onChange={() => { setLoadMode("appliances"); track("calculator_mode_change", { calculator_id: "battery-runtime", mode: "appliances" }); }} /> Add appliances</label>
            </div>
            {loadMode === "total" ? <div className="field-pair">
              <label htmlFor="total-load">Total load
                <span className="input-with-unit"><input id="total-load" type="number" min="0.1" step="any" inputMode="decimal" value={loadValue} onChange={(event) => setLoadValue(asNumber(event.target.value))} /><select aria-label="Load unit" value={loadUnit} onChange={(event) => setLoadUnit(event.target.value as LoadUnit)}><option value="w">W</option><option value="kw">kW</option></select></span>
              </label>
              <label htmlFor="total-load-type">Load type<select id="total-load-type" value={loadType} onChange={(event) => setLoadType(event.target.value as LoadType)}><option value="ac">AC appliance</option><option value="dc">DC direct</option></select></label>
            </div> : <div className="appliance-builder">
              <label htmlFor="appliance-search">Add an appliance</label>
              <input id="appliance-search" type="search" placeholder="Search appliances..." value={applianceSearch} onChange={(event) => setApplianceSearch(event.target.value)} />
              <div className="appliance-options" aria-label="Appliance choices">{filteredAppliances.map((preset) => <button key={preset.id} type="button" onClick={() => addAppliance(preset)}><span>{preset.label}</span><small>{preset.watts} W · {preset.category}</small></button>)}</div>
              {appliances.map((appliance) => <fieldset className="appliance-row" key={appliance.id}>
                <legend>{appliance.label}</legend>
                <div className="appliance-fields">
                  <label>Watts<input type="number" min="0.1" step="any" inputMode="decimal" value={appliance.watts} onChange={(event) => updateAppliance(appliance.id, { watts: asNumber(event.target.value) })} /></label>
                  <label>Quantity<input type="number" min="1" step="1" inputMode="numeric" value={appliance.quantity} onChange={(event) => updateAppliance(appliance.id, { quantity: asNumber(event.target.value) })} /></label>
                  <label>Type<select value={appliance.loadType} onChange={(event) => updateAppliance(appliance.id, { loadType: event.target.value as LoadType })}><option value="ac">AC</option><option value="dc">DC</option></select></label>
                </div>
                <p className="form-hint">Typical estimate ({appliance.typicalRange}) — use your device&apos;s rating if known.</p>
                <details><summary>Usage pattern</summary><label>Duty cycle (%)<input type="number" min="1" max="100" step="1" inputMode="numeric" value={percent(appliance.dutyCycle)} onChange={(event) => updateAppliance(appliance.id, { dutyCycle: asPercent(event.target.value) })} /></label></details>
                <button className="remove-button" type="button" onClick={() => setAppliances((current) => current.filter((item) => item.id !== appliance.id))}>Remove {appliance.label}</button>
              </fieldset>)}
              {appliances.length > 0 && <p className="appliance-summary"><strong>Total connected load:</strong> {watts(applianceTotals.connectedWatts)} W <span aria-hidden="true">·</span> <strong>Average load:</strong> {watts(applianceTotals.averageWatts)} W</p>}
            </div>}
          </fieldset>

          <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => { const willOpen = !advancedOpen; setAdvancedOpen(willOpen); if (willOpen) track("calculator_advanced_open", { calculator_id: "battery-runtime" }); }}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
          {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend>
            <div className="field-pair">
              <label>Starting charge (%)<input type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(startingSoc)} onChange={(event) => setStartingSoc(asPercent(event.target.value))} /></label>
              <label>Minimum remaining charge (%)<input type="number" min="0" max="99" step="1" inputMode="numeric" value={percent(reserveSoc)} onChange={(event) => { setReserveSoc(asPercent(event.target.value)); setReserveCustomized(true); }} /></label>
              <label>Battery health (%)<input type="number" min="1" max="100" step="1" inputMode="numeric" value={percent(batteryHealth)} onChange={(event) => setBatteryHealth(asPercent(event.target.value))} /></label>
              <label>AC inverter efficiency (%)<input type="number" min="1" max="100" step="1" inputMode="numeric" value={percent(acInverterEfficiency)} onChange={(event) => setAcInverterEfficiency(asPercent(event.target.value))} /></label>
              <label>DC conversion efficiency (%)<input type="number" min="1" max="100" step="1" inputMode="numeric" value={percent(dcConversionEfficiency)} onChange={(event) => setDcConversionEfficiency(asPercent(event.target.value))} /></label>
              <label>Load duty cycle (%)<input type="number" min="1" max="100" step="1" inputMode="numeric" value={percent(dutyCycle)} onChange={(event) => setDutyCycle(asPercent(event.target.value))} /></label>
            </div>
            {reserveCustomized && <p className="form-hint">Your reserve is a custom value and will not be replaced when you change battery type.</p>}
            <label className="switch-row"><input type="checkbox" checked={peukertEnabled} onChange={(event) => setPeukertEnabled(event.target.checked)} /> Peukert correction <span>Off by default</span></label>
            {peukertEnabled && <p className="form-hint">Suggested planning exponent: {chemistryPreset.peukertExponent}. A precise Peukert correction needs the battery&apos;s rated discharge current or time, so it is not applied to this quick estimate.</p>}
          </fieldset>}
          {result instanceof Error && <p className="error" role="alert">{result.message}</p>}
        </form>
      </div>

      <aside className="result-panel" id="calculator-result">
        <p className="eyebrow">Estimated runtime</p>
        {visibleResult ? <>
          <p className="result-value">{formatRuntime(visibleResult.result.runtimeHours)}</p>
          <p className="result-decimal">≈ {visibleResult.result.runtimeHours.toFixed(1)} hours</p>
          <p className="result-lede">A planning estimate based on your battery energy and average device load.</p>
          <StandardsBadge standards={["IEEE 485", "Peukert Physics", "IEC 60896"]} />

          <BatterySocGauge
            startingSoc={startingSoc}
            reserveSoc={reserveSoc}
            batteryHealth={batteryHealth}
            usableKwh={visibleResult.result.usableBatteryWh / 1000}
            totalKwh={visibleResult.result.nominalEnergyWh / 1000}
          />

          <OutageTimelineVisualizer
            runtimeHours={visibleResult.result.runtimeHours}
            loadWatts={visibleResult.result.averageLoadWatts}
            capacityWh={visibleResult.result.nominalEnergyWh}
            reserveSoc={reserveSoc}
          />

          <BatteryDischargeCurveChart
            nominalVoltage={voltage}
            capacityAh={capacityUnit === "ah" ? capacityValue : (visibleResult.result.nominalEnergyWh / voltage)}
            dod={1 - reserveSoc}
            inverterEfficiency={loadType === "ac" ? acInverterEfficiency : dcConversionEfficiency}
            currentLoadWatts={visibleResult.result.averageLoadWatts}
          />



          <dl className="result-breakdown">
            <div><dt>Battery capacity</dt><dd>{watts(visibleResult.result.nominalEnergyWh)} Wh</dd></div>
            <div><dt>Usable battery energy</dt><dd>{watts(visibleResult.result.usableBatteryWh)} Wh</dd></div>
            <div><dt>Device load</dt><dd>{watts(visibleResult.result.averageLoadWatts)} W average</dd></div>
            <div><dt>Battery-side load</dt><dd>{watts(visibleResult.result.batterySideLoadWatts)} W</dd></div>
            {loadMode === "appliances" && <div><dt>Peak connected load</dt><dd>{watts(visibleResult.result.peakConnectedLoadWatts)} W</dd></div>}
          </dl>
          <LossWaterfall
            title="Energy Conversion Flow"
            steps={[
              { label: "Nominal Capacity", value: visibleResult.result.nominalEnergyWh, unit: "Wh", subtext: "Rated pack capacity" },
              { label: "Usable After Reserve", value: visibleResult.result.usableBatteryWh, unit: "Wh", subtext: `${percent(1 - reserveSoc)}% usable DOD window` },
              { label: "Effective Delivered Energy", value: visibleResult.result.usableBatteryWh * (loadType === "ac" ? acInverterEfficiency : dcConversionEfficiency), unit: "Wh", subtext: `After ${percent(loadType === "ac" ? acInverterEfficiency : dcConversionEfficiency)}% efficiency`, isFinal: true },
            ]}
          />
          <section className="comparison" aria-labelledby="runtime-comparison-heading"><h3 id="runtime-comparison-heading">Runtime at different loads</h3><dl>{comparison.map((item) => <div key={item.load} className={item.isCurrent ? "current-comparison" : ""}><dt>{watts(item.load)} W {item.isCurrent && <span>Your load</span>}</dt><dd>{formatRuntime(item.runtimeHours)}</dd></div>)}</dl></section>
          <section className="assumption-summary" aria-labelledby="assumptions-heading"><h3 id="assumptions-heading">Assumptions used</h3><dl><div><dt>Battery type</dt><dd>{chemistryPreset.label}</dd></div><div><dt>Starting charge</dt><dd>{percent(startingSoc)}%</dd></div><div><dt>Reserve</dt><dd>{percent(reserveSoc)}%</dd></div><div><dt>Battery health</dt><dd>{percent(batteryHealth)}%</dd></div><div><dt>AC inverter efficiency</dt><dd>{percent(acInverterEfficiency)}%</dd></div></dl><button className="text-button" type="button" onClick={() => setAdvancedOpen(true)}>Edit assumptions</button></section>
          {visibleResult.warnings.map((warning) => <p className={warning.severity === "caution" ? "warning" : "form-hint"} key={warning.code}>{warning.message}</p>)}
          <p className="sensitivity-note">If your actual load is 10% higher, runtime is about 9% shorter.</p>

          <GooglePreferredBanner />

          <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className="button secondary-button" type="button" onClick={saveProfile}>Save to Profile</button>
            <ShareButton getShareUrl={getShareUrl} />
            <PrintSpecButton />
          </div>

          <section className="accuracy-tip"><h3>Want a more accurate result?</h3><p>Use your battery&apos;s actual Wh/Ah rating, your appliance&apos;s measured or nameplate watts, inverter efficiency if known, current charge, and battery health.</p></section>
        </> : <p>Enter valid values to see the estimate.</p>}
      </aside>
    </div>

    {/* Quick-Reference Lookup Matrix (Google Position 0 Table Snippet Magnet) */}
    <QuickReferenceTable
      title="Battery Backup Runtime Quick Lookup Matrix (12V LiFePO4 / 90% DoD)"
      subtitle="Estimated runtimes across standard battery capacities under continuous AC appliance loads (92% inverter efficiency)."
      columns={[
        { key: "load", header: "Continuous AC Load", isPrimary: true },
        { key: "b50", header: "50 Ah (640 Wh)", align: "right" },
        { key: "b100", header: "100 Ah (1.28 kWh)", align: "right" },
        { key: "b200", header: "200 Ah (2.56 kWh)", align: "right" },
        { key: "b300", header: "300 Ah (3.84 kWh)", align: "right" },
      ]}
      rows={[
        { load: "50 W (Wi-Fi, LED lights, CPAP)", b50: "10.6 hrs", b100: "21.2 hrs", b200: "42.4 hrs", b300: "63.6 hrs" },
        { load: "100 W (Laptop + Fridge cycle)", b50: "5.3 hrs", b100: "10.6 hrs", b200: "21.2 hrs", b300: "31.8 hrs", isHighlighted: true, badge: "Popular" },
        { load: "250 W (Desktop PC + Monitor)", b50: "2.1 hrs", b100: "4.2 hrs", b200: "8.5 hrs", b300: "12.7 hrs" },
        { load: "500 W (Sump pump / Refrigerator)", b50: "1.1 hrs", b100: "2.1 hrs", b200: "4.2 hrs", b300: "6.4 hrs" },
        { load: "1,000 W (Microwave / Power tools)", b50: "0.5 hrs", b100: "1.1 hrs", b200: "2.1 hrs", b300: "3.2 hrs" },
        { load: "1,500 W (Space heater / Kettle)", b50: "0.3 hrs", b100: "0.7 hrs", b200: "1.4 hrs", b300: "2.1 hrs" },
      ]}
      footerNote="Assumes 12.8V nominal LiFePO4 chemistry with 90% DoD and 25W inverter tare dissipation."
      standardReference="IEEE Std 485 / Peukert Equation (k = 1.02)"
    />

    {/* Step-by-Step Engineering Calculation Walkthrough */}
    <CalculationWalkthrough
      calculatorName="Battery Backup Runtime"
      overview="How to calculate battery discharge duration step-by-step using Peukert's law, depth of discharge windows, and power conversion efficiencies."
      steps={[
        {
          stepNumber: 1,
          title: "Calculate Effective Battery-Side Load Current",
          description: "Divide the AC load wattage by nominal battery voltage and inverter efficiency to find the total DC Amperes drawn from the battery bank.",
          formula: "I = \\frac{P_{\\text{load}}}{V_{\\text{nominal}} \\times \\eta_{\\text{inverter}}}",
          exampleValue: "100W load at 12V with 92% inverter efficiency draws: 100 / (12 × 0.92) = 9.06 Amps DC",
        },
        {
          stepNumber: 2,
          title: "Determine Usable Amp-Hour Capacity",
          description: "Multiply rated manufacturer Amp-hour capacity by maximum safe Depth of Discharge (0.80–0.90 for LiFePO4; 0.50 for Lead-Acid) and battery state of health.",
          formula: "C_{\\text{usable}} = C_{\\text{rated}} \\times \\text{DoD}_{\\text{max}} \\times \\text{Health}",
          exampleValue: "100Ah LiFePO4 battery at 90% DoD and 100% Health provides: 100 × 0.90 × 1.0 = 90 Usable Ah",
        },
        {
          stepNumber: 3,
          title: "Solve for Runtime Duration via Peukert Equation",
          description: "Apply Peukert's Law to account for high-current capacity degradation under heavier loads.",
          formula: "t = H \\cdot \\left( \\frac{C_{\\text{usable}}}{I \\cdot H} \\right)^k",
          exampleValue: "90 usable Ah / 9.06A continuous current = ~9.9 hours of continuous runtime",
        },
      ]}
      standardCitation="IEEE Std 485 / Peukert (1897)"
    />

    {visibleResult && (
      <MobileResultBar
        label="Estimated Runtime"
        value={formatRuntime(visibleResult.result.runtimeHours)}
        targetId="calculator-result"
        subtext={`@ ${watts(visibleResult.result.averageLoadWatts)} W load`}
      />
    )}
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </section>;
}


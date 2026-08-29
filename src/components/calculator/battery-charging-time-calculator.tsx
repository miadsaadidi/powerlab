"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BATTERY_CHEMISTRIES, BATTERY_VOLTAGE_PRESETS } from "@/data/battery-defaults";
import { BATTERY_CHARGING_TIME_DEFAULTS, getChemistryChargingDefaults } from "@/data/battery-charging-defaults";
import { track } from "@/lib/analytics/analytics";
import { calculateBatteryChargingTime, type BatteryChargingTimeInput, type BatteryChargingTimeResult } from "@/lib/calculators/battery-charging-time/engine";
import { createBatteryChargingRuntimeHandoff } from "@/lib/calculators/battery-charging-time/handoff";
import { resolveBatteryChargingInitialization } from "@/lib/calculators/battery-charging-time/initialization";
import { createEnergyProfileStore, type BatteryChargingProfile } from "@/lib/energy-profile/store";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

const QUICK_CHARGING_PRESETS = [
  { label: "🔋 100Ah LiFePO4 (20A)", mode: "ah-amps" as const, capacity: 100, current: 20, chem: "lifepo4" },
  { label: "⚡ 100Ah AGM (10A)", mode: "ah-amps" as const, capacity: 100, current: 10, chem: "agm" },
  { label: "🏡 48V 100Ah Bank (50A)", mode: "ah-amps" as const, capacity: 100, current: 50, chem: "lifepo4" },
  { label: "🏕️ 1,000Wh Station (200W)", mode: "energy-power" as const, capacity: 1000, power: 200, chem: "lifepo4" },
];

type ChargingMode = BatteryChargingTimeInput["mode"];


const numberValue = (value: string) => Number(value);
const fraction = (value: string) => Number(value) / 100;
const percent = (value: number) => Math.round(value * 100);
const formatNumber = (value: number, maximumFractionDigits = 2) => value.toLocaleString("en-US", { maximumFractionDigits });
const formatTime = (hours: number) => {
  const minutes = Math.max(0, Math.round(hours * 60));
  const wholeHours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!wholeHours) return `${remainingMinutes} min`;
  if (!remainingMinutes) return `${wholeHours} h`;
  return `${wholeHours} h ${remainingMinutes} min`;
};

interface SavedRuntimeContext {
  capacityWh: number | null;
  capacityAh: number | null;
  voltage: number | null;
  chemistry: string | null;
  batteryHealth: number | null;
  minimumSoc: number | null;
}

export function BatteryChargingTimeCalculator() {
  const [mode, setMode] = useState<ChargingMode>(BATTERY_CHARGING_TIME_DEFAULTS.mode);
  const [ahCapacity, setAhCapacity] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.capacityAh);
  const [ahChargerCurrent, setAhChargerCurrent] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.chargerCurrentA);
  const [ahBatteryMaxCurrent, setAhBatteryMaxCurrent] = useState<number | null>(null);
  const [ahStartSoc, setAhStartSoc] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.startSoc);
  const [ahTargetSoc, setAhTargetSoc] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.targetSoc);
  const [ahVoltage, setAhVoltage] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.voltage);
  const [powerCapacity, setPowerCapacity] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.capacityWh);
  const [powerCapacityUnit, setPowerCapacityUnit] = useState<"wh" | "kwh">("wh");
  const [powerOutput, setPowerOutput] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.chargerOutputPowerW);
  const [powerOutputUnit, setPowerOutputUnit] = useState<"w" | "kw">("w");
  const [powerBatteryMax, setPowerBatteryMax] = useState<number | null>(null);
  const [powerStartSoc, setPowerStartSoc] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.startSoc);
  const [powerTargetSoc, setPowerTargetSoc] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.targetSoc);
  const [powerVoltage, setPowerVoltage] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.voltage);
  const [chemistry, setChemistry] = useState<string>(BATTERY_CHARGING_TIME_DEFAULTS.chemistry);
  const [batteryChargeEfficiency, setBatteryChargeEfficiency] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.batteryChargeEfficiency);
  const [planningOverheadEnabled, setPlanningOverheadEnabled] = useState<boolean>(BATTERY_CHARGING_TIME_DEFAULTS.planningOverheadEnabled);
  const [planningOverheadFactor, setPlanningOverheadFactor] = useState<number>(BATTERY_CHARGING_TIME_DEFAULTS.planningOverheadFactor);
  const [efficiencyCustomized, setEfficiencyCustomized] = useState(false);
  const [overheadCustomized, setOverheadCustomized] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculated, setCalculated] = useState<BatteryChargingTimeResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [runtimeContext, setRuntimeContext] = useState<SavedRuntimeContext>({ capacityWh: null, capacityAh: null, voltage: null, chemistry: null, batteryHealth: null, minimumSoc: null });
  const initialized = useRef(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const saved = profile.batteryCharging;
    const savedChemistry = saved?.chemistry ?? BATTERY_CHARGING_TIME_DEFAULTS.chemistry;
    const chemistryDefaults = getChemistryChargingDefaults(savedChemistry);
    const initial = resolveBatteryChargingInitialization({
      saved: {
        chemistry: saved?.chemistry ?? null,
        batteryChargeEfficiency: saved?.batteryChargeEfficiency ?? null,
        planningOverheadFactor: saved?.planningOverheadFactor ?? null,
        planningOverheadEnabled: saved?.planningOverheadEnabled ?? null,
      },
      chemistryDefaults,
      hardcoded: {
        chemistry: BATTERY_CHARGING_TIME_DEFAULTS.chemistry,
        batteryChargeEfficiency: BATTERY_CHARGING_TIME_DEFAULTS.batteryChargeEfficiency,
        planningOverheadFactor: BATTERY_CHARGING_TIME_DEFAULTS.planningOverheadFactor,
        planningOverheadEnabled: BATTERY_CHARGING_TIME_DEFAULTS.planningOverheadEnabled,
      },
    });

    setMode(saved?.mode ?? BATTERY_CHARGING_TIME_DEFAULTS.mode);
    setChemistry(initial.chemistry);
    setBatteryChargeEfficiency(initial.batteryChargeEfficiency);
    setPlanningOverheadFactor(initial.planningOverheadFactor);
    setPlanningOverheadEnabled(initial.planningOverheadEnabled);
    setEfficiencyCustomized(initial.efficiencyCustomized);
    setOverheadCustomized(initial.planningOverheadCustomized);
    if (saved?.capacityAh !== null && saved?.capacityAh !== undefined) setAhCapacity(saved.capacityAh);
    if (saved?.capacityWh !== null && saved?.capacityWh !== undefined) { setPowerCapacity(saved.capacityWh); setPowerCapacityUnit("wh"); }
    if (saved?.voltage !== null && saved?.voltage !== undefined) { setAhVoltage(saved.voltage); setPowerVoltage(saved.voltage); }
    if (saved?.startSoc !== null && saved?.startSoc !== undefined) { setAhStartSoc(saved.startSoc); setPowerStartSoc(saved.startSoc); }
    if (saved?.targetSoc !== null && saved?.targetSoc !== undefined) { setAhTargetSoc(saved.targetSoc); setPowerTargetSoc(saved.targetSoc); }
    if (saved?.chargerCurrentA !== null && saved?.chargerCurrentA !== undefined) setAhChargerCurrent(saved.chargerCurrentA);
    if (saved?.chargerOutputPowerW !== null && saved?.chargerOutputPowerW !== undefined) { setPowerOutput(saved.chargerOutputPowerW); setPowerOutputUnit("w"); }
    if (saved?.batteryMaxChargeCurrentA !== null && saved?.batteryMaxChargeCurrentA !== undefined) setAhBatteryMaxCurrent(saved.batteryMaxChargeCurrentA);
    if (saved?.batteryMaxChargePowerW !== null && saved?.batteryMaxChargePowerW !== undefined) setPowerBatteryMax(saved.batteryMaxChargePowerW);
    setRuntimeContext({
      capacityWh: profile.battery.capacityWh,
      capacityAh: profile.battery.capacityAh,
      voltage: profile.battery.nominalVoltage,
      chemistry: profile.battery.chemistry,
      batteryHealth: null,
      minimumSoc: profile.battery.reserveSoc,
    });
    initialized.current = true;
    track("calculator_view", { calculator_id: "battery-charging-time", category: "battery", phase: 2 });
  }, []);

  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const activeInput = useMemo<BatteryChargingTimeInput>(() => {
    const shared = { batteryChargeEfficiency, planningOverheadEnabled, planningOverheadFactor, chemistry: chemistryPreset.label };
    if (mode === "ah-amps") return { mode, capacityAh: ahCapacity, chargerCurrentA: ahChargerCurrent, batteryMaxChargeCurrentA: ahBatteryMaxCurrent ?? undefined, startSoc: ahStartSoc, targetSoc: ahTargetSoc, voltage: ahVoltage, ...shared } as BatteryChargingTimeInput;
    return { mode, capacity: powerCapacity, capacityUnit: powerCapacityUnit, chargerOutputPower: powerOutput, chargerPowerUnit: powerOutputUnit, batteryMaxChargePowerW: powerBatteryMax ?? undefined, startSoc: powerStartSoc, targetSoc: powerTargetSoc, voltage: powerVoltage, ...shared } as BatteryChargingTimeInput;
  }, [ahBatteryMaxCurrent, ahCapacity, ahChargerCurrent, ahStartSoc, ahTargetSoc, ahVoltage, batteryChargeEfficiency, chemistryPreset.label, mode, planningOverheadEnabled, planningOverheadFactor, powerBatteryMax, powerCapacity, powerCapacityUnit, powerOutput, powerOutputUnit, powerStartSoc, powerTargetSoc, powerVoltage]);

  const markActive = <T,>(setter: (value: T) => void, value: T) => { setter(value); if (calculated) setStale(true); };
  const changeMode = (nextMode: ChargingMode) => { setMode(nextMode); if (calculated) setStale(true); track("calculator_mode_change", { calculator_id: "battery-charging-time", mode: nextMode }); };
  const changeVoltage = (setter: (value: number) => void, value: number) => setter(value);
  const selectChemistry = (next: string) => {
    setChemistry(next);
    if (!overheadCustomized) setPlanningOverheadFactor(getChemistryChargingDefaults(next).planningOverheadFactor);
    if (calculated) setStale(true);
  };
  const updateEfficiency = (value: number) => { setBatteryChargeEfficiency(value); setEfficiencyCustomized(true); if (calculated) setStale(true); };
  const updateOverhead = (value: number) => { setPlanningOverheadFactor(value); setOverheadCustomized(true); if (calculated) setStale(true); };
  const updateOverheadEnabled = (value: boolean) => { setPlanningOverheadEnabled(value); if (calculated) setStale(true); };

  const calculate = () => {
    try {
      const result = calculateBatteryChargingTime(activeInput);
      setCalculated(result);
      setError(null);
      setStale(false);
      setAnnouncement(`Estimated charging time: ${formatTime(result.result.adjustedHours)}.`);
      track("calculator_calculate", { calculator_id: "battery-charging-time", mode, used_advanced: advancedOpen });
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError : new Error("Unable to calculate charging time."));
    }
  };

  const saveProfile = () => {
    const update: Partial<BatteryChargingProfile> = {
      mode,
      chemistry,
      batteryChargeEfficiency: efficiencyCustomized ? batteryChargeEfficiency : null,
      planningOverheadFactor: overheadCustomized ? planningOverheadFactor : null,
      planningOverheadEnabled,
      voltage: mode === "ah-amps" ? ahVoltage : powerVoltage,
      startSoc: mode === "ah-amps" ? ahStartSoc : powerStartSoc,
      targetSoc: mode === "ah-amps" ? ahTargetSoc : powerTargetSoc,
      capacityAh: mode === "ah-amps" ? ahCapacity : null,
      capacityWh: mode === "energy-power" ? (powerCapacityUnit === "wh" ? powerCapacity : powerCapacity * 1_000) : null,
      chargerCurrentA: mode === "ah-amps" ? ahChargerCurrent : null,
      chargerOutputPowerW: mode === "energy-power" ? (powerOutputUnit === "w" ? powerOutput : powerOutput * 1_000) : null,
      batteryMaxChargeCurrentA: mode === "ah-amps" ? ahBatteryMaxCurrent : null,
      batteryMaxChargePowerW: mode === "energy-power" ? powerBatteryMax : null,
    };
    createEnergyProfileStore(window.localStorage).patchBatteryCharging(update);
    setAnnouncement("Charging calculator preferences saved to this browser.");
  };

  const runtimePublished = isCalculatorPublished("battery-runtime");
  const capacityPublished = isCalculatorPublished("battery-capacity");
  const currentTargetSoc = mode === "ah-amps" ? ahTargetSoc : powerTargetSoc;
  const currentStartSoc = mode === "ah-amps" ? ahStartSoc : powerStartSoc;
  const currentVoltage = mode === "ah-amps" ? ahVoltage : powerVoltage;
  const currentCapacityAh = mode === "ah-amps" ? ahCapacity : (Number.isFinite(currentVoltage) && currentVoltage > 0 ? (powerCapacityUnit === "wh" ? powerCapacity : powerCapacity * 1_000) / currentVoltage : null);
  const currentCapacityWh = mode === "ah-amps" ? (Number.isFinite(ahVoltage) ? ahCapacity * ahVoltage : null) : (powerCapacityUnit === "wh" ? powerCapacity : powerCapacity * 1_000);

  const runtimeHandoff = () => {
    if (!runtimePublished) return;
    const handoff = createBatteryChargingRuntimeHandoff({ capacityAh: Number.isFinite(currentCapacityAh) ? currentCapacityAh : null, capacityWh: currentCapacityWh, targetSoc: currentTargetSoc, voltage: Number.isFinite(currentVoltage) ? currentVoltage : null, chemistry, batteryHealth: runtimeContext.batteryHealth, minimumSoc: runtimeContext.minimumSoc });
    const store = createEnergyProfileStore(window.localStorage);
    store.patchBattery({ capacityWh: handoff.nominalWh ?? null, capacityAh: handoff.capacityAh ?? null, nominalVoltage: handoff.voltage ?? null, chemistry: handoff.chemistry ?? null, reserveSoc: handoff.reserveSoc ?? null, ...(handoff.batteryHealth === undefined ? {} : { batteryHealth: handoff.batteryHealth }) });
    window.location.href = "/battery/battery-runtime-calculator";
  };

  const capacityHandoff = () => {
    if (!capacityPublished) return;
    const store = createEnergyProfileStore(window.localStorage);
    store.patchBattery({ capacityWh: currentCapacityWh, capacityAh: Number.isFinite(currentCapacityAh) ? currentCapacityAh : null, nominalVoltage: Number.isFinite(currentVoltage) ? currentVoltage : null, chemistry });
    window.location.href = "/battery/battery-capacity-calculator";
  };

  const comparison = useMemo(() => {
    if (!calculated) return [];
    if (mode === "ah-amps") {
      const rates = [10, 20, 40];
      return rates.map((rate) => {
        try {
          const scenario = calculateBatteryChargingTime({ ...activeInput, mode: "ah-amps", chargerCurrentA: rate } as BatteryChargingTimeInput);
          return { label: `${rate} A`, result: scenario, selected: rate === ahChargerCurrent };
        } catch {
          return null;
        }
      }).filter((item): item is NonNullable<typeof item> => item !== null);
    }
    const base = powerOutputUnit === "w" ? powerOutput : powerOutput * 1_000;
    return [0.5, 1, 2].map((multiplier) => {
      const output = base * multiplier;
      try {
        const scenario = calculateBatteryChargingTime({ ...activeInput, mode: "energy-power", chargerOutputPower: output, chargerPowerUnit: "w" } as BatteryChargingTimeInput);
        return { label: `${formatNumber(output)} W`, result: scenario, selected: multiplier === 1 };
      } catch {
        return null;
      }
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }, [activeInput, ahChargerCurrent, calculated, mode, powerOutput, powerOutputUnit]);

  return <section className="calculator" aria-labelledby="battery-charging-time-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="battery-charging-time-heading">Calculate charging time</h2>

        <div className="preset-chips-container" role="region" aria-label="Quick Battery & Charger Presets">
          <span className="preset-chips-label">Quick Presets:</span>
          <div className="preset-chips-row">
            {QUICK_CHARGING_PRESETS.map((sc) => (
              <button
                key={sc.label}
                type="button"
                className={`preset-chip-btn ${mode === sc.mode && (sc.mode === "ah-amps" ? ahCapacity === sc.capacity && ahChargerCurrent === sc.current : powerCapacity === sc.capacity && powerOutput === sc.power) ? "active" : ""}`}
                onClick={() => {
                  setMode(sc.mode);
                  setChemistry(sc.chem);
                  if (sc.mode === "ah-amps") {
                    setAhCapacity(sc.capacity);
                    setAhChargerCurrent(sc.current);
                  } else {
                    setPowerCapacity(sc.capacity);
                    setPowerCapacityUnit("wh");
                    setPowerOutput(sc.power);
                    setPowerOutputUnit("w");
                  }
                  if (calculated) setStale(true);
                  track("calculator_preset_click", { calculator_id: "battery-charging-time", preset: sc.label });
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        <CalculatorTrustPill />

        <form onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
          <fieldset className="input-group"><legend>What do you know?</legend><div className="mode-choice" role="radiogroup" aria-label="Charging calculation mode"><label><input type="radio" name="charging-mode" checked={mode === "ah-amps"} onChange={() => changeMode("ah-amps")} /> Ah + charger amps</label><label><input type="radio" name="charging-mode" checked={mode === "energy-power"} onChange={() => changeMode("energy-power")} /> Wh/kWh + charger watts</label></div></fieldset>
          {mode === "ah-amps" ? <fieldset className="input-group"><legend>Battery and charger</legend><label htmlFor="charging-capacity-ah">Battery capacity (Ah)<input id="charging-capacity-ah" type="number" min="0" step="any" inputMode="decimal" value={ahCapacity} onChange={(event) => markActive(setAhCapacity, numberValue(event.target.value))} /></label><label htmlFor="charging-current">Charger current delivered to battery (A)<input id="charging-current" type="number" min="0" step="any" inputMode="decimal" value={ahChargerCurrent} onChange={(event) => markActive(setAhChargerCurrent, numberValue(event.target.value))} /></label><div className="mode-choice" aria-label="Target charge shortcuts"><span className="field-label">Target charge</span>{[0.8, 0.9, 1].map((value) => <button className={ahTargetSoc === value ? "secondary-button" : "text-button"} type="button" key={value} onClick={() => markActive(setAhTargetSoc, value)}>{percent(value)}%</button>)}</div><label htmlFor="charging-start-ah">Starting charge (%)<input id="charging-start-ah" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(ahStartSoc)} onChange={(event) => markActive(setAhStartSoc, fraction(event.target.value))} /></label><label htmlFor="charging-target-ah">Target charge (%)<input id="charging-target-ah" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(ahTargetSoc)} onChange={(event) => markActive(setAhTargetSoc, fraction(event.target.value))} /></label></fieldset> : <fieldset className="input-group"><legend>Battery and charger</legend><label htmlFor="charging-capacity-energy">Battery energy<span className="input-with-unit"><input id="charging-capacity-energy" type="number" min="0" step="any" inputMode="decimal" value={powerCapacity} onChange={(event) => markActive(setPowerCapacity, numberValue(event.target.value))} /><select aria-label="Battery energy unit" value={powerCapacityUnit} onChange={(event) => markActive(setPowerCapacityUnit, event.target.value as "wh" | "kwh")}><option value="wh">Wh</option><option value="kwh">kWh</option></select></span></label><label htmlFor="charging-power">Charger output power<span className="input-with-unit"><input id="charging-power" type="number" min="0" step="any" inputMode="decimal" value={powerOutput} onChange={(event) => markActive(setPowerOutput, numberValue(event.target.value))} /><select aria-label="Charger output power unit" value={powerOutputUnit} onChange={(event) => markActive(setPowerOutputUnit, event.target.value as "w" | "kw")}><option value="w">W</option><option value="kw">kW</option></select></span></label><div className="mode-choice" aria-label="Target charge shortcuts"><span className="field-label">Target charge</span>{[0.8, 0.9, 1].map((value) => <button className={powerTargetSoc === value ? "secondary-button" : "text-button"} type="button" key={value} onClick={() => markActive(setPowerTargetSoc, value)}>{percent(value)}%</button>)}</div><label htmlFor="charging-start-power">Starting charge (%)<input id="charging-start-power" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(powerStartSoc)} onChange={(event) => markActive(setPowerStartSoc, fraction(event.target.value))} /></label><label htmlFor="charging-target-power">Target charge (%)<input id="charging-target-power" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(powerTargetSoc)} onChange={(event) => markActive(setPowerTargetSoc, fraction(event.target.value))} /></label></fieldset>}
          <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => { const next = !advancedOpen; setAdvancedOpen(next); if (next) track("calculator_advanced_open", { calculator_id: "battery-charging-time" }); }}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
          {advancedOpen && <fieldset className="input-group advanced-settings"><legend>Advanced assumptions</legend><label htmlFor="charging-chemistry">Battery chemistry<select id="charging-chemistry" value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><label htmlFor="charging-efficiency">Battery charge efficiency (%)<input id="charging-efficiency" type="number" min="1" max="100" step="1" value={percent(batteryChargeEfficiency)} onChange={(event) => updateEfficiency(fraction(event.target.value))} /><span className="form-hint">Planning assumption — use battery/manufacturer data when known.</span></label><label className="switch-row"><input type="checkbox" checked={planningOverheadEnabled} onChange={(event) => updateOverheadEnabled(event.target.checked)} /> Apply planning estimate</label>{planningOverheadEnabled && <label htmlFor="charging-overhead">Planning overhead factor<input id="charging-overhead" type="number" min="1" step="0.01" value={planningOverheadFactor} onChange={(event) => updateOverhead(numberValue(event.target.value))} /><span className="form-hint">Simple allowance for taper/absorption behavior, not a CC/CV model.</span></label>}<label htmlFor="charging-voltage">Battery nominal voltage (optional)<span className="input-with-unit"><select id="charging-voltage" aria-label="Battery nominal voltage" value={String(BATTERY_VOLTAGE_PRESETS.includes((mode === "ah-amps" ? ahVoltage : powerVoltage) as never) ? (mode === "ah-amps" ? ahVoltage : powerVoltage) : "custom")} onChange={(event) => { if (event.target.value !== "custom") changeVoltage(mode === "ah-amps" ? setAhVoltage : setPowerVoltage, numberValue(event.target.value)); }}>{BATTERY_VOLTAGE_PRESETS.map((value) => <option key={value} value={value}>{value} V</option>)}<option value="custom">Custom</option></select><input aria-label="Custom battery nominal voltage" type="number" min="0" step="any" value={mode === "ah-amps" ? ahVoltage : powerVoltage} onChange={(event) => changeVoltage(mode === "ah-amps" ? setAhVoltage : setPowerVoltage, numberValue(event.target.value))} /></span><span className="form-hint">Optional — it does not change charging time.</span></label>{mode === "ah-amps" ? <label htmlFor="charging-battery-max-current">Battery maximum charge current (A, optional)<input id="charging-battery-max-current" type="number" min="0" step="any" value={ahBatteryMaxCurrent ?? ""} placeholder="Unknown" onChange={(event) => markActive(setAhBatteryMaxCurrent, event.target.value === "" ? null : numberValue(event.target.value))} /></label> : <label htmlFor="charging-battery-max-power">Battery maximum charge power (W, optional)<input id="charging-battery-max-power" type="number" min="0" step="any" value={powerBatteryMax ?? ""} placeholder="Unknown" onChange={(event) => markActive(setPowerBatteryMax, event.target.value === "" ? null : numberValue(event.target.value))} /></label>}</fieldset>}
          {error && <p className="error" role="alert">{error.message}</p>}
          <button className="button calculator-submit" type="submit">{calculated ? "Recalculate" : "Calculate Charging Time"}</button>
        </form>
      </div>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">Battery charging estimate</p>{!calculated ? <p>Complete the inputs and calculate to see an estimate.</p> : <><p className="result-lede">Estimated charging time</p><p className="result-value">{formatTime(calculated.result.adjustedHours)}</p><StandardsBadge standards={["IEC 62619", "UL 1973", "IEEE 485"]} />{stale && <p className="warning" role="status">Inputs changed — recalculate to update the estimate.</p>}<dl className="result-breakdown"><div><dt>Ideal constant-rate time</dt><dd>{formatTime(calculated.result.idealHours)}</dd></div><div><dt>{calculated.result.rateUnit === "A" ? "Charge to add" : "Energy to add"}</dt><dd>{calculated.result.rateUnit === "A" ? `${formatNumber(calculated.result.chargeAh ?? 0)} Ah` : `${formatNumber(calculated.result.energyToAddWh ?? 0)} Wh`}</dd></div><div><dt>Selected charger output</dt><dd>{formatNumber(calculated.result.selectedChargerRate)} {calculated.result.rateUnit}</dd></div><div><dt>Effective charging rate</dt><dd>{formatNumber(calculated.result.effectiveChargerRate)} {calculated.result.rateUnit}</dd></div><div><dt>Limiting factor</dt><dd>{calculated.result.limitingFactor === "battery-charge-limit" ? "Battery charge limit" : "Charger output"}</dd></div></dl>{calculated.result.limitingFactor === "charger-output" && <p className="form-hint">Battery maximum charge rate is unknown — confirm the manufacturer&apos;s charging specification.</p>}{calculated.result.limitingFactor === "battery-charge-limit" && <p className="warning">The battery acceptance limit caps the effective charging rate below the selected charger output.</p>}<section className="comparison"><h3>What if the charger output changes?</h3><dl>{comparison.map((item) => <div key={item.label} className={item.selected ? "current-comparison" : ""}><dt>{item.label} {item.selected && <span>Selected</span>}</dt><dd>{formatTime(item.result.result.adjustedHours)}<small> · {formatNumber(item.result.result.effectiveChargerRate)} {item.result.result.rateUnit} effective</small></dd></div>)}</dl></section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Battery charge efficiency</dt><dd>{percent(calculated.result.batteryChargeEfficiency)}%</dd></div><div><dt>Planning overhead</dt><dd>{formatNumber(calculated.result.planningOverheadFactor)}× planning estimate</dd></div><div><dt>Start → target charge</dt><dd>{percent(currentStartSoc)}% → {percent(currentTargetSoc)}%</dd></div><div><dt>Battery chemistry</dt><dd>{chemistryPreset.label}</dd></div></dl><button className="text-button" type="button" onClick={() => setAdvancedOpen(true)}>Edit assumptions</button></section>
      <GooglePreferredBanner />
      <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="Battery Charging Time Calculation" />
        <PrintSpecButton />
      </div>
      <div className="handoff">
        <h3>Save or continue</h3>
        <p>Calculation experiments stay in this form until you choose an action.</p>
        <div className="handoff-button-group" style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <button className="button secondary-button handoff-link" type="button" onClick={saveProfile}>
            <span>Save to Energy Profile</span>
            <span aria-hidden="true">💾</span>
          </button>
          {capacityPublished && (
            <button className="button secondary-button handoff-link" type="button" onClick={capacityHandoff}>
              <span>Convert/check this battery capacity</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
          {runtimePublished && (
            <button className="button secondary-button handoff-link" type="button" onClick={runtimeHandoff}>
              <span>Estimate runtime after charging</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </>}</aside>
    </div><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </section>;
}



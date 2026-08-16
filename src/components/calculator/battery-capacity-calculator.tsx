"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BATTERY_CAPACITY_DEFAULTS, BATTERY_CHEMISTRIES, BATTERY_VOLTAGE_PRESETS } from "@/data/battery-defaults";
import { track } from "@/lib/analytics/analytics";
import { calculateBatteryCapacity, type BatteryCapacityInput, type BatteryCapacityResult, type ChargeUnit, type EnergyUnit } from "@/lib/calculators/battery-capacity/engine";
import { resolveBatteryCapacityInitialization } from "@/lib/calculators/battery-capacity/initialization";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { isCalculatorPublished } from "@/lib/calculator-registry";

type CapacityMode = BatteryCapacityInput["mode"];

const numberValue = (value: string) => Number(value);
const percent = (value: number) => Math.round(value * 100);
const display = (value: number, maximumFractionDigits = 2) => value.toLocaleString("en-US", { maximumFractionDigits });
const displayKwh = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const displayWh = (value: number) => display(value, 2);
const displayAh = (value: number) => display(value, 2);
const displayVoltage = (value: number) => display(value, 2);
const voltageOption = (value: number) => BATTERY_VOLTAGE_PRESETS.map(String).includes(String(value)) ? String(value) : "custom";

export function BatteryCapacityCalculator() {
  const [mode, setMode] = useState<CapacityMode>(BATTERY_CAPACITY_DEFAULTS.mode);
  const [chargeToEnergyCharge, setChargeToEnergyCharge] = useState<number>(BATTERY_CAPACITY_DEFAULTS.capacityAh);
  const [chargeToEnergyUnit, setChargeToEnergyUnit] = useState<ChargeUnit>("ah");
  const [chargeToEnergyVoltage, setChargeToEnergyVoltage] = useState<number>(BATTERY_CAPACITY_DEFAULTS.voltage);
  const [energyToChargeEnergy, setEnergyToChargeEnergy] = useState<number>(1_200);
  const [energyToChargeUnit, setEnergyToChargeUnit] = useState<EnergyUnit>("wh");
  const [energyToChargeVoltage, setEnergyToChargeVoltage] = useState<number>(BATTERY_CAPACITY_DEFAULTS.voltage);
  const [findVoltageEnergy, setFindVoltageEnergy] = useState<number>(1_200);
  const [findVoltageEnergyUnit, setFindVoltageEnergyUnit] = useState<EnergyUnit>("wh");
  const [findVoltageCharge, setFindVoltageCharge] = useState<number>(BATTERY_CAPACITY_DEFAULTS.capacityAh);
  const [findVoltageChargeUnit, setFindVoltageChargeUnit] = useState<ChargeUnit>("ah");
  const [chemistry, setChemistry] = useState<string>(BATTERY_CAPACITY_DEFAULTS.batteryChemistry);
  const [startingSoc, setStartingSoc] = useState<number>(BATTERY_CAPACITY_DEFAULTS.startingSoc);
  const [minimumSoc, setMinimumSoc] = useState<number>(BATTERY_CAPACITY_DEFAULTS.reserveSoc);
  const [batteryHealth, setBatteryHealth] = useState<number>(BATTERY_CAPACITY_DEFAULTS.batteryHealth);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [minimumSocCustomized, setMinimumSocCustomized] = useState(false);
  const initialized = useRef(false);
  const interacted = useRef(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const savedChemistry = BATTERY_CHEMISTRIES.some((item) => item.id === profile.battery.chemistry)
      ? profile.battery.chemistry!
      : BATTERY_CAPACITY_DEFAULTS.batteryChemistry;
    const savedVoltage = profile.battery.nominalVoltage ?? BATTERY_CAPACITY_DEFAULTS.voltage;
    const savedCapacityAh = profile.battery.capacityAh ?? (
      profile.battery.capacityWh && savedVoltage > 0 ? profile.battery.capacityWh / savedVoltage : null
    );
    const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === savedChemistry) ?? BATTERY_CHEMISTRIES[0];
    const initial = resolveBatteryCapacityInitialization({
      profile: {
        chemistry: savedChemistry,
        minimumSoc: profile.battery.reserveSoc,
        batteryHealth: profile.battery.batteryHealth,
        voltage: savedVoltage,
        capacityAh: savedCapacityAh,
      },
      defaultChemistry: BATTERY_CAPACITY_DEFAULTS.batteryChemistry,
      defaultMinimumSoc: BATTERY_CAPACITY_DEFAULTS.reserveSoc,
      defaultBatteryHealth: BATTERY_CAPACITY_DEFAULTS.batteryHealth,
      defaultVoltage: BATTERY_CAPACITY_DEFAULTS.voltage,
      defaultCapacityAh: BATTERY_CAPACITY_DEFAULTS.capacityAh,
      chemistryMinimumSoc: chemistryPreset.reserveSoc,
    });

    setChemistry(initial.chemistry);
    setMinimumSoc(initial.minimumSoc);
    setMinimumSocCustomized(initial.minimumSocCustomized);
    setBatteryHealth(initial.batteryHealth);
    setChargeToEnergyCharge(initial.capacityAh);
    setChargeToEnergyVoltage(initial.voltage);
    setEnergyToChargeVoltage(initial.voltage);
    setStartingSoc(BATTERY_CAPACITY_DEFAULTS.startingSoc);
    initialized.current = true;
    track("calculator_view", { calculator_id: "battery-capacity", category: "battery", phase: 2 });
  }, []);

  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const calculationInput = useMemo<BatteryCapacityInput>(() => {
    const shared = { startingSoc, minimumSoc, batteryHealth, chemistry: chemistryPreset.label };
    if (mode === "charge-to-energy") return { mode, charge: chargeToEnergyCharge, chargeUnit: chargeToEnergyUnit, voltage: chargeToEnergyVoltage, ...shared };
    if (mode === "energy-to-charge") return { mode, energy: energyToChargeEnergy, energyUnit: energyToChargeUnit, voltage: energyToChargeVoltage, ...shared };
    return { mode, energy: findVoltageEnergy, energyUnit: findVoltageEnergyUnit, charge: findVoltageCharge, chargeUnit: findVoltageChargeUnit, ...shared };
  }, [batteryHealth, chargeToEnergyCharge, chargeToEnergyUnit, chargeToEnergyVoltage, chemistryPreset.label, energyToChargeEnergy, energyToChargeUnit, energyToChargeVoltage, findVoltageCharge, findVoltageChargeUnit, findVoltageEnergy, findVoltageEnergyUnit, minimumSoc, mode, startingSoc]);

  const calculation = useMemo<BatteryCapacityResult | Error>(() => {
    try {
      return calculateBatteryCapacity(calculationInput);
    } catch (error) {
      return error instanceof Error ? error : new Error("Enter valid battery capacity values.");
    }
  }, [calculationInput]);

  useEffect(() => {
    if (!initialized.current || !interacted.current || calculation instanceof Error) return;
    createEnergyProfileStore(window.localStorage).patchBattery({
      capacityWh: calculation.result.nominalWh,
      capacityAh: calculation.result.capacityAh,
      nominalVoltage: calculation.result.voltage,
      chemistry,
      batteryHealth,
      reserveSoc: minimumSocCustomized ? minimumSoc : null,
    });
  }, [batteryHealth, calculation, chemistry, minimumSoc, minimumSocCustomized]);

  const changeMode = (nextMode: CapacityMode) => {
    interacted.current = true;
    setMode(nextMode);
    track("calculator_mode_change", { calculator_id: "battery-capacity", mode: nextMode });
  };

  const selectChemistry = (nextChemistry: string) => {
    interacted.current = true;
    setChemistry(nextChemistry);
    const preset = BATTERY_CHEMISTRIES.find((item) => item.id === nextChemistry);
    if (preset && !minimumSocCustomized) setMinimumSoc(preset.reserveSoc);
  };

  const updateMinimumSoc = (value: number) => {
    interacted.current = true;
    setMinimumSoc(value);
    setMinimumSocCustomized(true);
  };

  const update = <T,>(setter: (value: T) => void, value: T) => {
    interacted.current = true;
    setter(value);
  };

  const result = calculation instanceof Error ? null : calculation.result;
  const error = calculation instanceof Error ? calculation : null;
  const runtimePublished = isCalculatorPublished("battery-runtime");

  const useInRuntime = () => {
    if (!result || !runtimePublished) return;
    createEnergyProfileStore(window.localStorage).patchBattery({
      capacityWh: result.nominalWh,
      capacityAh: result.capacityAh,
      nominalVoltage: result.voltage,
      chemistry,
      batteryHealth,
      reserveSoc: minimumSocCustomized ? minimumSoc : null,
    });
    window.location.href = "/battery/battery-runtime-calculator";
  };

  return <section className="calculator" aria-labelledby="battery-capacity-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="battery-capacity-heading">Convert battery capacity</h2>
        <fieldset className="input-group">
          <legend>What do you know?</legend>
          <div className="mode-choice" role="radiogroup" aria-label="Capacity calculation mode">
            <label><input type="radio" name="capacity-mode" checked={mode === "charge-to-energy"} onChange={() => changeMode("charge-to-energy")} /> I know Ah / mAh</label>
            <label><input type="radio" name="capacity-mode" checked={mode === "energy-to-charge"} onChange={() => changeMode("energy-to-charge")} /> I know Wh / kWh</label>
            <label><input type="radio" name="capacity-mode" checked={mode === "find-voltage"} onChange={() => changeMode("find-voltage")} /> Find voltage</label>
          </div>
        </fieldset>

        {mode === "charge-to-energy" && <fieldset className="input-group">
          <legend>Charge to energy</legend>
          <label htmlFor="capacity-charge">Charge capacity<span className="input-with-unit"><input id="capacity-charge" type="number" min="0" step="any" inputMode="decimal" value={chargeToEnergyCharge} onChange={(event) => update(setChargeToEnergyCharge, numberValue(event.target.value))} /><select aria-label="Charge capacity unit" value={chargeToEnergyUnit} onChange={(event) => update(setChargeToEnergyUnit, event.target.value as ChargeUnit)}><option value="ah">Ah</option><option value="mah">mAh</option></select></span></label>
          <label htmlFor="capacity-charge-voltage">Voltage<span className="input-with-unit"><select id="capacity-charge-voltage" aria-label="Voltage" value={voltageOption(chargeToEnergyVoltage)} onChange={(event) => { if (event.target.value !== "custom") update(setChargeToEnergyVoltage, numberValue(event.target.value)); }}>{BATTERY_VOLTAGE_PRESETS.map((value) => <option key={value} value={value}>{value} V</option>)}<option value="custom">Custom</option></select>{voltageOption(chargeToEnergyVoltage) === "custom" && <input aria-label="Custom voltage" type="number" min="0" step="any" inputMode="decimal" value={chargeToEnergyVoltage} onChange={(event) => update(setChargeToEnergyVoltage, numberValue(event.target.value))} />}</span></label>
        </fieldset>}

        {mode === "energy-to-charge" && <fieldset className="input-group">
          <legend>Energy to charge</legend>
          <label htmlFor="capacity-energy">Energy<span className="input-with-unit"><input id="capacity-energy" type="number" min="0" step="any" inputMode="decimal" value={energyToChargeEnergy} onChange={(event) => update(setEnergyToChargeEnergy, numberValue(event.target.value))} /><select aria-label="Energy unit" value={energyToChargeUnit} onChange={(event) => update(setEnergyToChargeUnit, event.target.value as EnergyUnit)}><option value="wh">Wh</option><option value="kwh">kWh</option></select></span></label>
          <label htmlFor="capacity-energy-voltage">Voltage<span className="input-with-unit"><select id="capacity-energy-voltage" aria-label="Voltage" value={voltageOption(energyToChargeVoltage)} onChange={(event) => { if (event.target.value !== "custom") update(setEnergyToChargeVoltage, numberValue(event.target.value)); }}>{BATTERY_VOLTAGE_PRESETS.map((value) => <option key={value} value={value}>{value} V</option>)}<option value="custom">Custom</option></select>{voltageOption(energyToChargeVoltage) === "custom" && <input aria-label="Custom voltage" type="number" min="0" step="any" inputMode="decimal" value={energyToChargeVoltage} onChange={(event) => update(setEnergyToChargeVoltage, numberValue(event.target.value))} />}</span></label>
        </fieldset>}

        {mode === "find-voltage" && <fieldset className="input-group">
          <legend>Find voltage</legend>
          <label htmlFor="find-voltage-energy">Energy<span className="input-with-unit"><input id="find-voltage-energy" type="number" min="0" step="any" inputMode="decimal" value={findVoltageEnergy} onChange={(event) => update(setFindVoltageEnergy, numberValue(event.target.value))} /><select aria-label="Energy unit" value={findVoltageEnergyUnit} onChange={(event) => update(setFindVoltageEnergyUnit, event.target.value as EnergyUnit)}><option value="wh">Wh</option><option value="kwh">kWh</option></select></span></label>
          <label htmlFor="find-voltage-charge">Charge capacity<span className="input-with-unit"><input id="find-voltage-charge" type="number" min="0" step="any" inputMode="decimal" value={findVoltageCharge} onChange={(event) => update(setFindVoltageCharge, numberValue(event.target.value))} /><select aria-label="Charge capacity unit" value={findVoltageChargeUnit} onChange={(event) => update(setFindVoltageChargeUnit, event.target.value as ChargeUnit)}><option value="ah">Ah</option><option value="mah">mAh</option></select></span></label>
        </fieldset>}

        <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => { setAdvancedOpen((open) => !open); track("calculator_advanced_open", { calculator_id: "battery-capacity" }); }}>{advancedOpen ? "Hide" : "Show"} advanced assumptions</button>
        {advancedOpen && <fieldset className="input-group advanced-settings">
          <legend>Advanced assumptions</legend>
          <label htmlFor="capacity-chemistry">Battery chemistry<select id="capacity-chemistry" value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>{BATTERY_CHEMISTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
          <label htmlFor="capacity-starting-soc">Starting charge (%)<input id="capacity-starting-soc" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(startingSoc)} onChange={(event) => update(setStartingSoc, numberValue(event.target.value) / 100)} /></label>
          <label htmlFor="capacity-minimum-soc">Minimum remaining charge (%)<input id="capacity-minimum-soc" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(minimumSoc)} onChange={(event) => updateMinimumSoc(numberValue(event.target.value) / 100)} /></label>
          <label htmlFor="capacity-health">Battery health (%)<input id="capacity-health" type="number" min="0" max="100" step="1" inputMode="numeric" value={percent(batteryHealth)} onChange={(event) => update(setBatteryHealth, numberValue(event.target.value) / 100)} /></label>
          {minimumSocCustomized && <p className="form-hint">Your minimum charge is user-controlled and will not be replaced when chemistry changes.</p>}
        </fieldset>}
        {error && <p className="error" role="alert">{error.message}</p>}
      </div>

      <aside className="result-panel" aria-live="polite">
        <p className="eyebrow">Battery capacity result</p>
        {!result ? <p>Enter valid values to see the conversion.</p> : <>
          <p className="result-lede">{mode === "charge-to-energy" ? "Battery capacity" : mode === "energy-to-charge" ? "Charge capacity" : "Calculated nominal voltage"}</p>
          <p className="result-value">{mode === "find-voltage" ? `${displayVoltage(result.voltage)} V` : mode === "charge-to-energy" ? `${displayKwh(result.nominalKWh)} kWh` : `${displayAh(result.capacityAh)} Ah`}</p>
          <dl className="result-breakdown">
            <div><dt>Charge capacity</dt><dd>{displayAh(result.capacityAh)} Ah</dd></div>
            <div><dt>Charge equivalent</dt><dd>{display(result.capacityMah, 0)} mAh</dd></div>
            <div><dt>Nominal energy</dt><dd>{displayWh(result.nominalWh)} Wh / {displayKwh(result.nominalKWh)} kWh</dd></div>
            <div><dt>Voltage</dt><dd>{displayVoltage(result.voltage)} V</dd></div>
          </dl>
          <section className="formula-breakdown" aria-labelledby="capacity-formula-heading">
            <h3 id="capacity-formula-heading">How this was calculated</h3>
            {mode === "charge-to-energy" && <p className="formula-line"><span>{displayAh(result.capacityAh)} Ah × {displayVoltage(result.voltage)} V</span><strong>= {displayWh(result.nominalWh)} Wh</strong></p>}
            {mode === "energy-to-charge" && <p className="formula-line"><span>{displayWh(result.nominalWh)} Wh ÷ {displayVoltage(result.voltage)} V</span><strong>= {displayAh(result.capacityAh)} Ah</strong></p>}
            {mode === "find-voltage" && <p className="formula-line"><span>{displayWh(result.nominalWh)} Wh ÷ {displayAh(result.capacityAh)} Ah</span><strong>= {displayVoltage(result.voltage)} V</strong></p>}
            <p className="formula-line"><span>{displayWh(result.nominalWh)} Wh × {percent(result.usableSocWindow)}% SOC window × {percent(batteryHealth)}% battery health</span><strong>= {displayWh(result.usableWh)} Wh usable</strong></p>
          </section>
          {mode === "find-voltage" && <p className="form-hint">Compare the calculated value with your battery&apos;s actual nominal specification.</p>}
          {mode === "energy-to-charge" && <section className="comparison"><h3>Equivalent charge capacity by voltage</h3><p className="form-hint">The same energy capacity requires fewer amp-hours at higher voltage.</p><dl>{result.equivalentAh.map((item) => <div key={item.voltage} className={item.voltage === result.voltage ? "current-comparison" : ""}><dt>{item.voltage} V {item.voltage === result.voltage && <span>Selected</span>}</dt><dd>{displayAh(item.capacityAh)} Ah equivalent</dd></div>)}</dl></section>}
          <section className="comparison"><h3>Usable energy</h3><p className="result-value">{displayWh(result.usableWh)} Wh</p><p className="result-lede">{displayKwh(result.usableKWh)} kWh after the SOC window and battery health assumptions.</p><dl><div><dt>SOC window</dt><dd>{percent(result.usableSocWindow)}%</dd></div><div><dt>Starting charge</dt><dd>{percent(startingSoc)}%</dd></div><div><dt>Minimum charge</dt><dd>{percent(minimumSoc)}%</dd></div><div><dt>Battery health</dt><dd>{percent(batteryHealth)}%</dd></div></dl></section>
          <section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Battery chemistry</dt><dd>{chemistryPreset.label}</dd></div><div><dt>Voltage</dt><dd>{displayVoltage(result.voltage)} V</dd></div></dl><button className="text-button" type="button" onClick={() => setAdvancedOpen(true)}>Edit assumptions</button></section>
          {runtimePublished && <section className="handoff"><h3>Next step</h3><p>See how this battery capacity may perform against a load.</p><button className="button secondary-button" type="button" onClick={useInRuntime}>Use in Battery Runtime</button></section>}
        </>}
      </aside>
    </div>
  </section>;
}

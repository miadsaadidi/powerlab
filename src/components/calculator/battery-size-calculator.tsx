"use client";

import { useEffect, useMemo, useState } from "react";
import { APPLIANCES, type AppliancePreset } from "@/data/appliances";
import { BATTERY_CHEMISTRIES, BATTERY_SIZE_DEFAULTS, BATTERY_VOLTAGE_PRESETS, resolveChemistryReserve } from "@/data/battery-defaults";
import { calculateBatterySize, type BatterySizeApplianceInput, type BatterySizeInput, type BatterySizeResult } from "@/lib/calculators/battery-size/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { LossWaterfall } from "@/components/calculator/loss-waterfall";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

const QUICK_BATTERY_SIZE_PRESETS = [
  { label: "⚡ Wi-Fi & Workstation (100W · 8h · 12V)", watts: 100, hours: 8, voltage: 12, chem: "lifepo4" },
  { label: "🏕️ Vanlife Fridge & Lights (150W · 24h · 12V)", watts: 150, hours: 24, voltage: 12, chem: "lifepo4" },
  { label: "🚨 Critical Outage (300W · 12h · 24V)", watts: 300, hours: 12, voltage: 24, chem: "lifepo4" },
  { label: "⛈️ Storm Backup (500W · 24h · 48V)", watts: 500, hours: 24, voltage: 48, chem: "lifepo4" },
  { label: "🏠 Home Essentials (1.2kW · 12h · 48V)", watts: 1200, hours: 12, voltage: 48, chem: "lifepo4" },
];

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
  const [calculated, setCalculated] = useState<BatterySizeResult | null>(() => {
    try {
      return calculateBatterySize({
        loadWatts: BATTERY_SIZE_DEFAULTS.loadWatts,
        loadType: "ac",
        runtimeHours: BATTERY_SIZE_DEFAULTS.runtimeHours,
        startingSoc: BATTERY_SIZE_DEFAULTS.startingSoc,
        reserveSoc: BATTERY_SIZE_DEFAULTS.reserveSoc,
        batteryHealth: BATTERY_SIZE_DEFAULTS.batteryHealth,
        acInverterEfficiency: BATTERY_SIZE_DEFAULTS.acInverterEfficiency,
        dcConversionEfficiency: BATTERY_SIZE_DEFAULTS.dcConversionEfficiency,
        designMargin: BATTERY_SIZE_DEFAULTS.designMargin,
        voltage: BATTERY_SIZE_DEFAULTS.voltage,
      });
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLoad = Number(params.get("load"));
      const urlRuntime = Number(params.get("runtime"));
      const urlVolt = Number(params.get("voltage"));
      const urlChem = params.get("chemistry");

      if (Number.isFinite(urlLoad) && urlLoad > 0) setLoadValue(urlLoad);
      if (Number.isFinite(urlRuntime) && urlRuntime > 0) setRuntimeValue(urlRuntime);
      if (Number.isFinite(urlVolt) && urlVolt > 0) setVoltage(urlVolt);
      if (urlChem && BATTERY_CHEMISTRIES.some((c) => c.id === urlChem)) setChemistry(urlChem);
    }

    const saved = createEnergyProfileStore(window.localStorage).read().battery;
    if (saved.capacityWh && !new URLSearchParams(window.location.search).get("load")) {
      const chemistryMatch = BATTERY_CHEMISTRIES.find((item) => item.id === saved.chemistry);
      if (chemistryMatch) setChemistry(chemistryMatch.id);
      if (saved.reserveSoc !== null) {
        setReserveSoc(saved.reserveSoc);
        setReserveCustomized(true);
      }
    }
    track("calculator_view", { calculator_id: "battery-size", category: "battery", phase: 1 });
  }, []);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("load", String(loadValue));
    url.searchParams.set("runtime", String(runtimeValue));
    url.searchParams.set("voltage", String(voltage));
    url.searchParams.set("chemistry", chemistry);
    return url.toString();
  };

  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const normalizedLoadWatts = loadUnit === "kw" ? loadValue * 1_000 : loadValue;
  const normalizedRuntimeHours = runtimeUnit === "minutes" ? runtimeValue / 60 : runtimeValue;
  const input = useMemo<BatterySizeInput>(
    () => ({
      loadWatts: normalizedLoadWatts,
      loadType,
      runtimeHours: normalizedRuntimeHours,
      appliances: loadMode === "appliances" ? appliances : undefined,
      startingSoc,
      reserveSoc,
      batteryHealth,
      acInverterEfficiency: acEfficiency,
      dcConversionEfficiency: dcEfficiency,
      designMargin,
      voltage,
    }),
    [acEfficiency, appliances, batteryHealth, dcEfficiency, designMargin, loadMode, loadType, normalizedLoadWatts, normalizedRuntimeHours, reserveSoc, startingSoc, voltage]
  );

  const selectChemistry = (id: string) => {
    setChemistry(id);
    const updatedReserve = resolveChemistryReserve(id, reserveSoc, reserveCustomized);
    setReserveSoc(updatedReserve);
    if (calculated) setStale(true);
  };

  const markChanged = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    if (calculated) setStale(true);
  };

  const calculate = () => {
    try {
      if (loadMode === "appliances" && appliances.length === 0) throw new Error("Add at least one appliance or switch to total load.");
      const result = calculateBatterySize(input);
      setCalculated(result);
      setError(null);
      setStale(false);
      setAnnouncement(`Recommended battery size is ${kwh(result.result.recommendedNominalWh)}.`);
      createEnergyProfileStore(window.localStorage).patchBattery({ capacityWh: result.result.recommendedNominalWh, chemistry, reserveSoc });
      track("calculator_calculate", { calculator_id: "battery-size", load_mode: loadMode, used_advanced: advancedOpen });
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError : new Error("Unable to calculate battery size."));
    }
  };

  const updateAppliance = (id: string, update: Partial<ApplianceRow>) => {
    setAppliances((curr) => curr.map((row) => (row.id === id ? { ...row, ...update } : row)));
    if (calculated) setStale(true);
  };

  const addAppliance = (preset: AppliancePreset) => {
    setAppliances((curr) => [...curr, createRow(preset, curr.length)]);
    setSearch("");
    if (calculated) setStale(true);
    track("calculator_appliance_add", { calculator_id: "battery-size", preset: preset.id });
  };

  const comparison = useMemo(() => {
    if (!calculated) return [];
    const baseRuntime = normalizedRuntimeHours;
    return [0.5, 1, 2].map((m) => {
      const runtime = baseRuntime * m;
      const calc = calculateBatterySize({ ...input, runtimeHours: runtime });
      return { runtime, current: m === 1, capacity: calc.result.recommendedNominalWh };
    });
  }, [calculated, input, normalizedRuntimeHours]);

  const verifyRuntime = () => {
    if (!calculated) return;
    const url = `/battery/battery-runtime-calculator?load=${Math.round(calculated.result.totalAverageDeviceW)}&capacity=${Math.round(calculated.result.recommendedNominalWh)}&unit=wh&voltage=${voltage}&chemistry=${chemistry}`;
    window.location.href = url;
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate required battery size</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Sizing Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Battery Sizing Setups</span>
            <div className="preset-chips-row">
              {QUICK_BATTERY_SIZE_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${loadMode === "total" && loadValue === sc.watts && runtimeValue === sc.hours && voltage === sc.voltage ? "active" : ""}`}
                  onClick={() => {
                    setLoadMode("total");
                    setLoadValue(sc.watts);
                    setLoadUnit("w");
                    setRuntimeValue(sc.hours);
                    setRuntimeUnit("hours");
                    setVoltage(sc.voltage);
                    setVoltagePreset(String(sc.voltage));
                    selectChemistry(sc.chem);
                    try {
                      const res = calculateBatterySize({
                        loadWatts: sc.watts,
                        loadType: "ac",
                        runtimeHours: sc.hours,
                        startingSoc: 1,
                        reserveSoc: resolveChemistryReserve(sc.chem, 0.2, false),
                        batteryHealth: 1,
                        acInverterEfficiency: 0.9,
                        dcConversionEfficiency: 0.95,
                        designMargin: 0.1,
                        voltage: sc.voltage,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "battery-size", preset: sc.label });
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Load</legend>
              <span className="field-label">How do you want to enter your load?</span>
              <div className="mode-choice" role="radiogroup" aria-label="Load entry mode">
                <label>
                  <input type="radio" name="bs-load-mode" checked={loadMode === "total"} onChange={() => markChanged(setLoadMode, "total")} /> Total load
                </label>
                <label>
                  <input type="radio" name="bs-load-mode" checked={loadMode === "appliances"} onChange={() => markChanged(setLoadMode, "appliances")} /> Add appliances
                </label>
              </div>
              {loadMode === "total" ? (
                <div className="field-pair">
                  <label htmlFor="bs-total-load">
                    Total load
                    <span className="input-with-unit">
                      <input id="bs-total-load" type="number" min="0.1" step="any" value={loadValue} onChange={(e) => markChanged(setLoadValue, number(e.target.value))} />
                      <select aria-label="Load unit" value={loadUnit} onChange={(e) => markChanged(setLoadUnit, e.target.value as LoadUnit)}>
                        <option value="w">W</option>
                        <option value="kw">kW</option>
                      </select>
                    </span>
                  </label>
                  <label htmlFor="bs-total-load-type">
                    Load type
                    <select id="bs-total-load-type" value={loadType} onChange={(e) => markChanged(setLoadType, e.target.value as "ac" | "dc")}>
                      <option value="ac">AC appliance</option>
                      <option value="dc">DC direct</option>
                    </select>
                  </label>
                </div>
              ) : (
                <div className="appliance-builder">
                  <label htmlFor="bs-appliance-search">Add an appliance</label>
                  <input id="bs-appliance-search" type="search" placeholder="Search appliances..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <div className="appliance-options" aria-label="Appliance choices">
                    {commonIds
                      .map((id) => APPLIANCES.find((a) => a.id === id))
                      .filter((a): a is AppliancePreset => Boolean(a))
                      .slice(0, 10)
                      .map((preset) => (
                        <button key={preset.id} type="button" onClick={() => addAppliance(preset)}>
                          <span>{preset.label}</span>
                          <small>
                            {preset.watts} W · {preset.category}
                          </small>
                        </button>
                      ))}
                  </div>
                  {appliances.map((a) => (
                    <fieldset className="appliance-row" key={a.id}>
                      <legend>{a.label}</legend>
                      <div className="appliance-fields">
                        <label>
                          Watts
                          <input type="number" min="0.1" step="any" value={a.watts} onChange={(e) => updateAppliance(a.id, { watts: number(e.target.value) })} />
                        </label>
                        <label>
                          Quantity
                          <input type="number" min="1" step="1" value={a.quantity} onChange={(e) => updateAppliance(a.id, { quantity: number(e.target.value) })} />
                        </label>
                        <label>
                          Type
                          <select value={a.loadType} onChange={(e) => updateAppliance(a.id, { loadType: e.target.value as "ac" | "dc" })}>
                            <option value="ac">AC</option>
                            <option value="dc">DC</option>
                          </select>
                        </label>
                      </div>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => {
                          setAppliances((c) => c.filter((row) => row.id !== a.id));
                          if (calculated) setStale(true);
                        }}
                      >
                        Remove {a.label}
                      </button>
                    </fieldset>
                  ))}
                </div>
              )}
            </fieldset>

            <fieldset className="input-group">
              <legend>Required runtime &amp; chemistry</legend>
              <div className="field-pair">
                <label htmlFor="bs-runtime">
                  Target runtime
                  <span className="input-with-unit">
                    <input id="bs-runtime" type="number" min="0.1" step="any" value={runtimeValue} onChange={(e) => markChanged(setRuntimeValue, number(e.target.value))} />
                    <select aria-label="Runtime unit" value={runtimeUnit} onChange={(e) => markChanged(setRuntimeUnit, e.target.value as RuntimeUnit)}>
                      <option value="hours">Hours</option>
                      <option value="minutes">Minutes</option>
                    </select>
                  </span>
                </label>
                <label htmlFor="bs-chemistry">
                  Battery type
                  <select id="bs-chemistry" value={chemistry} onChange={(e) => selectChemistry(e.target.value)}>
                    {BATTERY_CHEMISTRIES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((open) => !open)}>
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>
            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <div className="field-pair">
                  <label>
                    Starting charge (%)
                    <input type="number" min="1" max="100" value={percent(startingSoc)} onChange={(e) => markChanged(setStartingSoc, fraction(e.target.value))} />
                  </label>
                  <label>
                    Minimum remaining charge (%)
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={percent(reserveSoc)}
                      onChange={(e) => {
                        setReserveSoc(fraction(e.target.value));
                        setReserveCustomized(true);
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                  <label>
                    Battery health (%)
                    <input type="number" min="1" max="100" value={percent(batteryHealth)} onChange={(e) => markChanged(setBatteryHealth, fraction(e.target.value))} />
                  </label>
                  <label>
                    AC inverter efficiency (%)
                    <input type="number" min="1" max="100" value={percent(acEfficiency)} onChange={(e) => markChanged(setAcEfficiency, fraction(e.target.value))} />
                  </label>
                  <label>
                    DC conversion efficiency (%)
                    <input type="number" min="1" max="100" value={percent(dcEfficiency)} onChange={(e) => markChanged(setDcEfficiency, fraction(e.target.value))} />
                  </label>
                  <label>
                    Design margin (%)
                    <input type="number" min="0" max="100" value={percent(designMargin)} onChange={(e) => markChanged(setDesignMargin, fraction(e.target.value))} />
                  </label>
                  <label>
                    System voltage
                    <select
                      value={voltagePreset}
                      onChange={(e) => {
                        const next = e.target.value;
                        setVoltagePreset(next);
                        if (next !== "custom") markChanged(setVoltage, number(next));
                        else if (calculated) setStale(true);
                      }}
                    >
                      <option value="12">12 V</option>
                      {BATTERY_VOLTAGE_PRESETS.filter((item) => item !== 12).map((item) => (
                        <option key={item} value={item}>
                          {item} V
                        </option>
                      ))}
                      <option value="custom">Custom</option>
                    </select>
                    {voltagePreset === "custom" && <input type="number" min="1" step="0.1" value={voltage} onChange={(e) => markChanged(setVoltage, number(e.target.value))} />}
                  </label>
                </div>
                {reserveCustomized && <p className="form-hint">Your reserve is custom and will not be replaced when chemistry changes.</p>}
              </fieldset>
            )}
            {!calculated && <p className="form-hint">Enter your backup requirements, then calculate the battery capacity you need.</p>}
            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Calculate Battery Size"}
            </button>
          </form>
        </div>
        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Battery recommendation</p>
          {!calculated ? (
            <p>Complete the inputs and calculate to see a recommendation.</p>
          ) : (
            <>
              <p className="result-lede">Recommended battery size</p>
              <p className="result-value">{kwh(calculated.result.recommendedNominalWh)}</p>
              <p className="result-lede">Choose a battery with at least {kwh(calculated.result.recommendedNominalWh)} nominal capacity.</p>
              {stale && <p className="warning" role="status">Inputs changed — recalculate to update the recommendation.</p>}
              <LossWaterfall
                steps={[
                  { label: "Required Load Energy", value: calculated.result.deviceLoadEnergyWh, unit: "Wh", subtext: "Direct energy consumed by your appliances" },
                  { label: "Battery-Side Energy (Conversion Loss)", value: calculated.result.conversionAdjustedWh, unit: "Wh", subtext: "Energy drawn from battery after inverter / DC conversion", isLoss: true },
                  { label: "Recommended Nominal Capacity", value: calculated.result.recommendedNominalWh, unit: "Wh", subtext: "Total nameplate capacity with reserve and planning margin", isFinal: true },
                ]}
              />
              <dl className="result-breakdown">
                <div>
                  <dt>Minimum before planning margin</dt>
                  <dd>{kwh(calculated.result.minimumNominalWh)}</dd>
                </div>
                <div>
                  <dt>Required load energy</dt>
                  <dd>{kwh(calculated.result.deviceLoadEnergyWh)}</dd>
                </div>
                <div>
                  <dt>Planning margin</dt>
                  <dd>{percent(designMargin)}%</dd>
                </div>
                <div>
                  <dt>Average device load</dt>
                  <dd>{Math.round(calculated.result.totalAverageDeviceW)} W</dd>
                </div>
                {loadMode === "appliances" && (
                  <div>
                    <dt>Peak connected load</dt>
                    <dd>{Math.round(calculated.result.peakConnectedLoadW)} W</dd>
                  </div>
                )}
              </dl>
              <section className="comparison">
                <h3>Battery size at different runtimes</h3>
                <dl>
                  {comparison.map((item) => (
                    <div key={item.runtime} className={item.current ? "current-comparison" : ""}>
                      <dt>
                        {hours(item.runtime)} {item.current && <span>Your target</span>}
                      </dt>
                      <dd>{kwh(item.capacity)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className="assumption-summary">
                <h3>Assumptions used</h3>
                <dl>
                  <div>
                    <dt>Battery type</dt>
                    <dd>{chemistryPreset.label}</dd>
                  </div>
                  <div>
                    <dt>Starting charge</dt>
                    <dd>{percent(startingSoc)}%</dd>
                  </div>
                  <div>
                    <dt>Minimum charge</dt>
                    <dd>{percent(reserveSoc)}%</dd>
                  </div>
                  <div>
                    <dt>Battery health</dt>
                    <dd>{percent(batteryHealth)}%</dd>
                  </div>
                  <div>
                    <dt>Conversion efficiency</dt>
                    <dd>{percent(loadType === "ac" ? acEfficiency : dcEfficiency)}%</dd>
                  </div>
                  <div>
                    <dt>System voltage</dt>
                    <dd>{voltage} V</dd>
                  </div>
                </dl>
                <button className="text-button" type="button" onClick={() => setAdvancedOpen(true)}>
                  Edit assumptions
                </button>
              </section>
              <section className="comparison">
                <h3>Your selected system voltage</h3>
                <p>
                  <strong>{voltage} V</strong> · {ah(calculated.result.selectedVoltageAh)} equivalent
                </p>
                <p className="form-hint">Ah equivalent depends on system voltage.</p>
                <dl>
                  {calculated.result.equivalentAh.map((item) => (
                    <div key={item.voltage} className={item.voltage === voltage ? "current-comparison" : ""}>
                      <dt>
                        {item.voltage} V {item.voltage === voltage && <span>Selected</span>}
                      </dt>
                      <dd>{ah(item.ampHours)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <p className="warning">Capacity is only one part of battery selection. Confirm that the battery, BMS and inverter can support your required continuous and peak power using manufacturer specifications.</p>
              <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button className="button" type="button" onClick={verifyRuntime}>
                  Verify this battery&apos;s runtime
                </button>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>
      {calculated && <MobileResultBar label="Recommended Battery Size" value={kwh(calculated.result.recommendedNominalWh)} targetId="calculator-result" />}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}

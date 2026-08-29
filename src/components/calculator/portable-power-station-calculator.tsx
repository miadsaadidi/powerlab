"use client";

import { useEffect, useState } from "react";
import { APPLIANCES, type AppliancePreset } from "@/data/appliances";
import { PORTABLE_POWER_STATION_DEFAULTS } from "@/data/battery-defaults";
import { calculatePortablePowerStation, type PortableCapacityInput, type PortableEquipmentInput, type PortablePowerStationResult, type PortableRuntimeInput } from "@/lib/calculators/portable-power-station/engine";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { LossWaterfall } from "@/components/calculator/loss-waterfall";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

const QUICK_POWER_STATION_PRESETS = [
  { label: "📱 Weekend Camping (256Wh · 45W)", wh: 256, watts: 45, cont: 300 },
  { label: "🏕️ Overnight Vanlife (512Wh · 65W)", wh: 512, watts: 65, cont: 500 },
  { label: "⚡ 1 kWh All-Rounder (1024Wh · 150W)", wh: 1024, watts: 150, cont: 1000 },
  { label: "🚨 Home Outage (2048Wh · 300W)", wh: 2048, watts: 300, cont: 2000 },
  { label: "🔌 Heavy Jobsite (3072Wh · 600W)", wh: 3072, watts: 600, cont: 3000 },
];

type Mode = "runtime" | "capacity";
type LoadMode = "direct-watts" | "equipment";
type EquipmentRow = PortableEquipmentInput & { id: string };

const number = (value: string) => Number(value);
const percent = (value: number) => `${Math.round(value * 100)}%`;
const formatNumber = (value: number, digits = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
const formatRuntime = (hours: number) => {
  const minutes = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${m ? `${m} min` : ""}`.trim() : `${m} min`;
};
const createRow = (preset: AppliancePreset, index: number): EquipmentRow => ({
  id: `${preset.id}-${Date.now()}-${index}`,
  label: preset.label,
  watts: preset.watts,
  quantity: 1,
  dutyCycle: preset.defaultDutyCycle,
  surgeWatts: null,
});

export function PortablePowerStationCalculator() {
  const [mode, setMode] = useState<Mode>("runtime");
  const [loadMode, setLoadMode] = useState<LoadMode>("direct-watts");
  const [capacityWh, setCapacityWh] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.capacityWh);
  const [desiredRuntimeHours, setDesiredRuntimeHours] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.desiredRuntimeHours);
  const [directLoadW, setDirectLoadW] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.directLoadW);
  const [peakLoadW, setPeakLoadW] = useState<number | null>(null);
  const [equipment, setEquipment] = useState<EquipmentRow[]>([]);
  const [search, setSearch] = useState("");
  const [continuousOutputW, setContinuousOutputW] = useState<number | null>(PORTABLE_POWER_STATION_DEFAULTS.continuousOutputW);
  const [surgeOutputW, setSurgeOutputW] = useState<number | null>(null);
  const [acEfficiency, setAcEfficiency] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.acEfficiency);
  const [reserveFraction, setReserveFraction] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.reserveFraction);
  const [batteryHealth, setBatteryHealth] = useState<number>(PORTABLE_POWER_STATION_DEFAULTS.batteryHealth);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculation, setCalculation] = useState<{
    result: PortablePowerStationResult;
    mode: Mode;
    loadMode: LoadMode;
    capacityWh: number;
    desiredRuntimeHours: number;
    directLoadW: number;
    peakLoadW: number | null;
    equipment: EquipmentRow[];
    continuousOutputW: number | null;
    surgeOutputW: number | null;
    acEfficiency: number;
    reserveFraction: number;
    batteryHealth: number;
  } | null>(() => {
    try {
      const res = calculatePortablePowerStation({
        mode: "runtime",
        capacityWh: PORTABLE_POWER_STATION_DEFAULTS.capacityWh,
        load: { loadMode: "direct-watts", directLoadW: PORTABLE_POWER_STATION_DEFAULTS.directLoadW, peakLoadW: null },
        continuousOutputW: PORTABLE_POWER_STATION_DEFAULTS.continuousOutputW,
        surgeOutputW: null,
        acEfficiency: PORTABLE_POWER_STATION_DEFAULTS.acEfficiency,
        reserveFraction: PORTABLE_POWER_STATION_DEFAULTS.reserveFraction,
        batteryHealth: PORTABLE_POWER_STATION_DEFAULTS.batteryHealth,
      });
      return {
        result: res,
        mode: "runtime",
        loadMode: "direct-watts",
        capacityWh: PORTABLE_POWER_STATION_DEFAULTS.capacityWh,
        desiredRuntimeHours: PORTABLE_POWER_STATION_DEFAULTS.desiredRuntimeHours,
        directLoadW: PORTABLE_POWER_STATION_DEFAULTS.directLoadW,
        peakLoadW: null,
        equipment: [],
        continuousOutputW: PORTABLE_POWER_STATION_DEFAULTS.continuousOutputW,
        surgeOutputW: null,
        acEfficiency: PORTABLE_POWER_STATION_DEFAULTS.acEfficiency,
        reserveFraction: PORTABLE_POWER_STATION_DEFAULTS.reserveFraction,
        batteryHealth: PORTABLE_POWER_STATION_DEFAULTS.batteryHealth,
      };
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    track("calculator_view", { calculator_id: "portable-power-station", category: "battery", phase: 4 });
  }, []);

  const markStale = () => {
    if (calculation) setStale(true);
  };
  const addEquipment = (preset: AppliancePreset) => {
    setEquipment((rows) => [...rows, createRow(preset, rows.length)]);
    setSearch("");
    track("calculator_appliance_add", { calculator_id: "portable-power-station", preset: preset.id });
    if (loadMode === "equipment") markStale();
  };
  const updateEquipment = (id: string, update: Partial<EquipmentRow>) => {
    setEquipment((rows) => rows.map((row) => (row.id === id ? { ...row, ...update } : row)));
    if (loadMode === "equipment") markStale();
  };
  const removeEquipment = (id: string) => {
    setEquipment((rows) => rows.filter((row) => row.id !== id));
    if (loadMode === "equipment") markStale();
  };
  const options = (search.trim() ? APPLIANCES.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())) : APPLIANCES.slice(0, 6)).slice(0, 8);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const load = loadMode === "direct-watts" ? { loadMode: "direct-watts" as const, directLoadW, peakLoadW } : { loadMode: "equipment" as const, equipment };
    const input: PortableRuntimeInput | PortableCapacityInput =
      mode === "runtime"
        ? { mode: "runtime", capacityWh, load, continuousOutputW, surgeOutputW, acEfficiency, reserveFraction, batteryHealth }
        : { mode: "capacity", desiredRuntimeHours, load, continuousOutputW, surgeOutputW, acEfficiency, reserveFraction, batteryHealth };
    try {
      const result = calculatePortablePowerStation(input);
      setCalculation({
        result,
        mode,
        loadMode,
        capacityWh,
        desiredRuntimeHours,
        directLoadW,
        peakLoadW,
        equipment,
        continuousOutputW,
        surgeOutputW,
        acEfficiency,
        reserveFraction,
        batteryHealth,
      });
      setStale(false);
      setError("");
      track("calculator_calculate", { calculator_id: "portable-power-station", mode, load_mode: loadMode });
    } catch (err) {
      setCalculation((current) => current);
      setStale(Boolean(calculation));
      setError(err instanceof Error ? err.message : "Enter valid values before calculating.");
      track("calculator_calculate", { calculator_id: "portable-power-station", mode, load_mode: loadMode, error: true });
    }
  };

  const calculationResult = calculation?.result.result;
  const calculationMode = calculation?.mode;
  const hasOutputOverload = calculationResult?.continuousCapability === "overload";
  const showElectricityUsage = isCalculatorPublished("electricity-usage");
  const showSolarLoad = isCalculatorPublished("solar-load");
  const showBatteryRuntime = isCalculatorPublished("battery-runtime");

  return (
    <section className="calculator" aria-labelledby="portable-power-station-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="portable-power-station-heading">Estimate portable power station performance</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Power Station Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Popular Setups</span>
            <div className="preset-chips-row">
              {QUICK_POWER_STATION_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${mode === "runtime" && loadMode === "direct-watts" && capacityWh === sc.wh && directLoadW === sc.watts ? "active" : ""}`}
                  onClick={() => {
                    setMode("runtime");
                    setLoadMode("direct-watts");
                    setCapacityWh(sc.wh);
                    setDirectLoadW(sc.watts);
                    setContinuousOutputW(sc.cont);
                    try {
                      const res = calculatePortablePowerStation({
                        mode: "runtime",
                        capacityWh: sc.wh,
                        load: { loadMode: "direct-watts", directLoadW: sc.watts, peakLoadW: null },
                        continuousOutputW: sc.cont,
                        surgeOutputW,
                        acEfficiency,
                        reserveFraction,
                        batteryHealth,
                      });
                      setCalculation({
                        result: res,
                        mode: "runtime",
                        loadMode: "direct-watts",
                        capacityWh: sc.wh,
                        desiredRuntimeHours,
                        directLoadW: sc.watts,
                        peakLoadW: null,
                        equipment: [],
                        continuousOutputW: sc.cont,
                        surgeOutputW,
                        acEfficiency,
                        reserveFraction,
                        batteryHealth,
                      });
                      setStale(false);
                      setError("");
                    } catch {
                      if (calculation) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "portable-power-station", preset: sc.label });
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorTrustPill />

          <form noValidate onSubmit={handleSubmit}>
            <fieldset className="input-group">
              <legend>Calculation mode</legend>
              <div className="mode-choice">
                <label>
                  <input
                    type="radio"
                    checked={mode === "runtime"}
                    onChange={() => {
                      setMode("runtime");
                      markStale();
                    }}
                  />{" "}
                  Runtime from my power station
                </label>
                <label>
                  <input
                    type="radio"
                    checked={mode === "capacity"}
                    onChange={() => {
                      setMode("capacity");
                      markStale();
                    }}
                  />{" "}
                  Capacity needed for my runtime
                </label>
              </div>
            </fieldset>
            {mode === "runtime" && (
              <label>
                Power station capacity
                <span className="input-with-unit">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    inputMode="decimal"
                    value={capacityWh}
                    onChange={(event) => {
                      setCapacityWh(number(event.target.value));
                      markStale();
                    }}
                  />
                  <span className="unit-suffix">Wh</span>
                </span>
                <span className="form-hint">Enter the station&apos;s rated battery energy capacity.</span>
              </label>
            )}
            {mode === "capacity" && (
              <label>
                Desired runtime
                <span className="input-with-unit">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    inputMode="decimal"
                    value={desiredRuntimeHours}
                    onChange={(event) => {
                      setDesiredRuntimeHours(number(event.target.value));
                      markStale();
                    }}
                  />
                  <span className="unit-suffix">hours</span>
                </span>
              </label>
            )}
            <fieldset className="input-group">
              <legend>Load</legend>
              <div className="mode-choice">
                <label>
                  <input
                    type="radio"
                    checked={loadMode === "direct-watts"}
                    onChange={() => {
                      setLoadMode("direct-watts");
                      markStale();
                    }}
                  />{" "}
                  Direct watts
                </label>
                <label>
                  <input
                    type="radio"
                    checked={loadMode === "equipment"}
                    onChange={() => {
                      setLoadMode("equipment");
                      markStale();
                    }}
                  />{" "}
                  Equipment
                </label>
              </div>
              {loadMode === "direct-watts" ? (
                <>
                  <label>
                    Average / running AC load
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      inputMode="decimal"
                      value={directLoadW}
                      onChange={(event) => {
                        setDirectLoadW(number(event.target.value));
                        markStale();
                      }}
                    />
                    <span className="form-hint">Expected average/running load while the station is in use.</span>
                  </label>
                  <label>
                    Startup / peak load <span className="optional-label">optional</span>
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      placeholder="Unknown"
                      value={peakLoadW ?? ""}
                      onChange={(event) => {
                        setPeakLoadW(event.target.value === "" ? null : number(event.target.value));
                        markStale();
                      }}
                    />
                  </label>
                </>
              ) : (
                <div className="appliance-builder">
                  <label htmlFor="portable-equipment-search">Add equipment</label>
                  <input
                    id="portable-equipment-search"
                    type="search"
                    placeholder="Search appliances..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <div className="appliance-options" aria-label="Equipment choices">
                    {options.map((preset) => {
                      const isAdded = equipment.some((e) => e.label === preset.label);
                      return (
                        <button
                          type="button"
                          key={preset.id}
                          className={isAdded ? "selected" : ""}
                          onClick={() => addEquipment(preset)}
                        >
                          <span>{isAdded ? "✓ " : "+ "}{preset.label}</span>
                          <small>{preset.watts} W · {preset.category}</small>
                        </button>
                      );
                    })}
                  </div>
                  {equipment.length === 0 && <p className="form-hint">Add the appliances that will run from the station.</p>}
                  {equipment.map((row) => (
                    <fieldset className="appliance-row" key={row.id}>
                      <legend>{row.label}</legend>
                      <div className="appliance-fields">
                        <label>
                          Running watts
                          <input
                            type="number"
                            min="0.1"
                            step="any"
                            value={row.watts}
                            onChange={(event) => updateEquipment(row.id, { watts: number(event.target.value) })}
                          />
                        </label>
                        <label>
                          Quantity
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={row.quantity}
                            onChange={(event) => updateEquipment(row.id, { quantity: number(event.target.value) })}
                          />
                        </label>
                        <label>
                          Duty cycle (%)
                          <input
                            type="number"
                            min="0.01"
                            max="100"
                            step="any"
                            value={row.dutyCycle * 100}
                            onChange={(event) => updateEquipment(row.id, { dutyCycle: number(event.target.value) / 100 })}
                          />
                        </label>
                        <label>
                          Startup watts <span className="optional-label">optional</span>
                          <input
                            type="number"
                            min="0.1"
                            step="any"
                            placeholder="Unknown"
                            value={row.surgeWatts ?? ""}
                            onChange={(event) => updateEquipment(row.id, { surgeWatts: event.target.value === "" ? null : number(event.target.value) })}
                          />
                        </label>
                      </div>
                      <p className="form-hint">Duty cycle affects average energy, not listed running watts. Startup watts are for one appliance.</p>
                      <button className="remove-button" type="button" onClick={() => removeEquipment(row.id)}>
                        Remove {row.label}
                      </button>
                    </fieldset>
                  ))}
                </div>
              )}
            </fieldset>
            <label>
              Continuous AC output <span className="optional-label">optional</span>
              <span className="input-with-unit">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  placeholder="Unknown"
                  value={continuousOutputW ?? ""}
                  onChange={(event) => {
                    setContinuousOutputW(event.target.value === "" ? null : number(event.target.value));
                    markStale();
                  }}
                />
                <span className="unit-suffix">W</span>
              </span>
            </label>
            <button
              className="text-button"
              type="button"
              aria-expanded={advancedOpen}
              onClick={() => {
                setAdvancedOpen((open) => !open);
                if (!advancedOpen) track("calculator_advanced_open", { calculator_id: "portable-power-station" });
              }}
            >
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>
            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <div className="field-pair">
                  <label>
                    AC efficiency (%)
                    <input
                      type="number"
                      min="0.01"
                      max="100"
                      step="any"
                      value={acEfficiency * 100}
                      onChange={(event) => {
                        setAcEfficiency(number(event.target.value) / 100);
                        markStale();
                      }}
                    />
                  </label>
                  <label>
                    Reserve (%)
                    <input
                      type="number"
                      min="0"
                      max="99.99"
                      step="any"
                      value={reserveFraction * 100}
                      onChange={(event) => {
                        setReserveFraction(number(event.target.value) / 100);
                        markStale();
                      }}
                    />
                  </label>
                  <label>
                    Battery health (%)
                    <input
                      type="number"
                      min="0.01"
                      max="100"
                      step="any"
                      value={batteryHealth * 100}
                      onChange={(event) => {
                        setBatteryHealth(number(event.target.value) / 100);
                        markStale();
                      }}
                    />
                  </label>
                  <label>
                    Surge / peak AC output <span className="optional-label">optional</span>
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      placeholder="Unknown"
                      value={surgeOutputW ?? ""}
                      onChange={(event) => {
                        setSurgeOutputW(event.target.value === "" ? null : number(event.target.value));
                        markStale();
                      }}
                    />
                  </label>
                </div>
                <p className="form-hint">If you enter a measured usable AC-energy value instead of nominal battery capacity, do not apply these losses again.</p>
              </fieldset>
            )}
            <button className="button calculator-submit" type="submit">
              {calculation ? "Recalculate" : mode === "runtime" ? "Calculate Runtime" : "Calculate Required Capacity"}
            </button>
          </form>
        </div>
        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Portable power station estimate</p>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {!calculation ? (
            <p>Enter your station capacity or target runtime and a load, then calculate the estimate.</p>
          ) : (
            <>
              {hasOutputOverload && <p className="warning" role="alert">The listed running load exceeds the station&apos;s continuous AC output.</p>}
              {stale && <p className="warning" role="status">Previous result — inputs have changed. Recalculate to update it.</p>}
              {calculationMode === "runtime" ? (
                <>
                  <p className="result-lede">{hasOutputOverload ? "Energy estimate — output overload" : "Estimated runtime"}</p>
                  <p className="result-value">{formatRuntime(calculationResult!.runtimeHours!)}</p>
                  <StandardsBadge standards={["UL 2743", "IEC 62133", "UN 38.3"]} />
                  <LossWaterfall
                    steps={[
                      { label: "Nominal Battery Capacity", value: calculation!.capacityWh, unit: "Wh", subtext: "Rated battery capacity of the power station" },
                      { label: "Usable Stored Energy", value: calculationResult!.usableStoredWh!, unit: "Wh", subtext: "Energy available above reserve and health deratings", isLoss: true },
                      { label: "Delivered AC Outlet Energy", value: calculationResult!.deliveredAcWh!, unit: "Wh", subtext: "Actual energy available at the AC plugs after inverter losses", isFinal: true },
                    ]}
                  />
                </>
              ) : (
                <>
                  <p className="result-lede">{hasOutputOverload ? "Required energy — output overload" : "Required nominal capacity"}</p>
                  <p className="result-value">{formatNumber(calculationResult!.requiredNominalWh!)} Wh</p>
                  <StandardsBadge standards={["UL 2743", "IEC 62133", "UN 38.3"]} />
                  <LossWaterfall
                    steps={[
                      { label: "Required Delivered AC Energy", value: calculationResult!.requiredDeliveredWh!, unit: "Wh", subtext: `Energy needed to run ${formatNumber(calculationResult!.averageLoadW)} W for ${formatNumber(desiredRuntimeHours)}h` },
                      { label: "Required Nominal Capacity", value: calculationResult!.requiredNominalWh!, unit: "Wh", subtext: "Total power station battery Wh needed with reserve and inverter losses", isFinal: true },
                    ]}
                  />
                </>
              )}
              <dl className="result-breakdown">
                <div>
                  <dt>Average load</dt>
                  <dd>{formatNumber(calculationResult!.averageLoadW)} W</dd>
                </div>
                <div>
                  <dt>Connected running load</dt>
                  <dd>{formatNumber(calculationResult!.connectedRunningW)} W</dd>
                </div>
                {calculationMode === "runtime" && (
                  <>
                    <div>
                      <dt>Nominal capacity</dt>
                      <dd>{formatNumber(calculation!.capacityWh)} Wh</dd>
                    </div>
                    <div>
                      <dt>Usable stored energy</dt>
                      <dd>{formatNumber(calculationResult!.usableStoredWh!)} Wh</dd>
                    </div>
                    <div>
                      <dt>Estimated delivered AC energy</dt>
                      <dd>{formatNumber(calculationResult!.deliveredAcWh!)} Wh</dd>
                    </div>
                  </>
                )}
                {calculationMode === "capacity" && (
                  <div>
                    <dt>Required delivered AC energy</dt>
                    <dd>{formatNumber(calculationResult!.requiredDeliveredWh!)} Wh</dd>
                  </div>
                )}
                <div>
                  <dt>Continuous capability</dt>
                  <dd>{calculationResult!.continuousCapability === "valid" ? "Within entered output" : calculationResult!.continuousCapability === "overload" ? "Overload" : "Not checked"}</dd>
                </div>
              </dl>
              {calculationResult!.surgeCheck === "incomplete" && <p className="warning">Startup capability not fully checked — startup watts are missing for one or more appliances.</p>}
              {calculationResult!.surgeCheck === "confirmed-overload" && <p className="warning">Known startup demand exceeds the station&apos;s surge rating.</p>}
              {calculationResult!.surgeCheck === "unknown" && <p className="form-hint">Startup capability not fully checked — confirm the station&apos;s surge/peak output rating.</p>}
              {calculationResult!.startupDataComplete && calculationResult!.startupLoadW !== null && (
                <p className="form-hint">Simultaneous startup estimate: {formatNumber(calculationResult!.startupLoadW)} W.</p>
              )}
              {!calculationResult!.startupDataComplete && calculationResult!.minimumKnownStartupW !== null && (
                <p className="form-hint">Minimum known startup load: {formatNumber(calculationResult!.minimumKnownStartupW)} W.</p>
              )}
              {calculationMode === "runtime" && (
                <section className="comparison">
                  <h3>Hypothetical load scenarios</h3>
                  <dl>
                    {calculationResult!.runtimeComparisons.map((item) => (
                      <div className={item.current ? "current-comparison" : ""} key={item.multiplier}>
                        <dt>{item.multiplier * 100}% load</dt>
                        <dd>{item.continuousCapability === "overload" ? "Output overload" : formatRuntime(item.runtimeHours)}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              {calculationMode === "capacity" && (
                <section className="comparison">
                  <h3>Runtime target comparisons</h3>
                  <dl>
                    {calculationResult!.runtimeTargetComparisons.map((item) => (
                      <div className={item.current ? "current-comparison" : ""} key={item.multiplier}>
                        <dt>{formatNumber(item.runtimeHours)} h</dt>
                        <dd>{formatNumber(item.requiredNominalWh)} Wh</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              <section className="assumption-summary">
                <h3>Assumptions used</h3>
                <dl>
                  <div>
                    <dt>AC efficiency</dt>
                    <dd>{percent(calculation!.acEfficiency)}</dd>
                  </div>
                  <div>
                    <dt>Reserve</dt>
                    <dd>{percent(calculation!.reserveFraction)}</dd>
                  </div>
                  <div>
                    <dt>Battery health</dt>
                    <dd>{percent(calculation!.batteryHealth)}</dd>
                  </div>
                </dl>
              </section>

              <GooglePreferredBanner />

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton title="Portable Power Station Calculation" />
                <PrintSpecButton />
                {showElectricityUsage && (
                  <a className="button secondary-button" href="/home-energy/electricity-usage-calculator">
                    Review household electricity use
                  </a>
                )}
                {showSolarLoad && (
                  <a className="button secondary-button" href="/solar/solar-load-calculator">
                    Plan solar loads
                  </a>
                )}
                {showBatteryRuntime && (
                  <a className="button secondary-button" href="/battery/battery-runtime-calculator">
                    Compare battery runtime
                  </a>
                )}
              </div>
            </>
          )}
        </aside>
      </div>
      {calculation && (
        <MobileResultBar
          label={calculationMode === "runtime" ? "Estimated Runtime" : "Required Capacity"}
          value={calculationMode === "runtime" ? formatRuntime(calculationResult!.runtimeHours!) : `${formatNumber(calculationResult!.requiredNominalWh!)} Wh`}
          targetId="calculator-result"
        />
      )}
    </section>
  );
}

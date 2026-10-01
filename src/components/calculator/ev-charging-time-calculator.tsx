"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EV_CHARGERS,
  EV_CHARGING_TIME_DEFAULTS,
  resolveChargerPreset,
  type DcTaperMode,
  type EvChargingType,
} from "@/data/ev-charging-defaults";
import { calculateEvChargingTime, type EvChargingTimeResult } from "@/lib/calculators/ev-charging-time/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { EvChargingVisualizer } from "@/components/calculator/ev-charging-visualizer";
import { EvChargingCurveChart } from "@/components/charts/ev-charging-curve";

const QUICK_EV_PRESETS = [
  { label: "🔌 Standard Home L2 (32A / 7.68 kW)", battery: 60, start: 20, target: 80, charger: "l2-32a" },
  { label: "⚡ Fast Home L2 (48A / 11.52 kW)", battery: 75, start: 20, target: 80, charger: "l2-48a" },
  { label: "🚗 Road Trip DCFC (150 kW)", battery: 75, start: 10, target: 80, charger: "dc-150" },
  { label: "🏠 Wall Outlet L1 (120V 12A / 1.44 kW)", battery: 60, start: 50, target: 70, charger: "l1-12a" },
  { label: "🛻 Large EV Truck (48A / 11.52 kW)", battery: 130, start: 15, target: 85, charger: "l2-48a" },
];

const number = (value: string) => Number(value);
const formatTime = (hours: number) => {
  const minutes = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  if (!m) return `${h} h`;
  return `${h} h ${m} min`;
};
const formatPower = (value: number) => `${value.toFixed(value >= 10 ? 1 : 2)} kW`;

export function EvChargingTimeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState<number>(EV_CHARGING_TIME_DEFAULTS.batteryCapacityKwh);
  const [startSocPercent, setStartSocPercent] = useState<number>(20);
  const [targetSocPercent, setTargetSocPercent] = useState<number>(80);
  const [chargerId, setChargerId] = useState<string>(EV_CHARGING_TIME_DEFAULTS.chargerId);
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

  const input = useMemo(
    () => ({
      batteryCapacityKwh: batteryCapacity,
      startSocPercent,
      targetSocPercent,
      chargerPowerKw: activePower,
      chargingType: activeType,
      vehicleMaxAcPowerKw: vehicleMaxAc ?? undefined,
      vehicleMaxDcPowerKw: vehicleMaxDc ?? undefined,
      acEfficiency,
      dcEfficiency,
      dcTaperMode: activeType === "DC" ? taperMode : ("constant" as const),
    }),
    [acEfficiency, activePower, activeType, batteryCapacity, dcEfficiency, startSocPercent, targetSocPercent, taperMode, vehicleMaxAc, vehicleMaxDc]
  );

  useEffect(() => {
    let initialBattery: number = EV_CHARGING_TIME_DEFAULTS.batteryCapacityKwh;
    let initialStart = 20;
    let initialTarget = 80;
    let initialPower: number = EV_CHARGING_TIME_DEFAULTS.chargerPowerKw;
    let initialType: "AC" | "DC" = EV_CHARGING_TIME_DEFAULTS.chargingType;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCap = Number(params.get("battery"));
      const urlStart = Number(params.get("start"));
      const urlTarget = Number(params.get("target"));
      const urlCharger = params.get("charger");

      if (Number.isFinite(urlCap) && urlCap > 0) {
        setBatteryCapacity(urlCap);
        initialBattery = urlCap;
      }
      if (Number.isFinite(urlStart) && urlStart >= 0 && urlStart <= 100) {
        setStartSocPercent(urlStart);
        initialStart = urlStart;
      }
      if (Number.isFinite(urlTarget) && urlTarget >= 0 && urlTarget <= 100) {
        setTargetSocPercent(urlTarget);
        initialTarget = urlTarget;
      }
      if (urlCharger) {
        const found = resolveChargerPreset(urlCharger);
        if (found) {
          setChargerId(found.id);
          setChargerPower(found.powerKw);
          setChargingType(found.chargingType);
          initialPower = found.powerKw;
          initialType = found.chargingType;
        }
      }
    }

    const saved = createEnergyProfileStore(window.localStorage).read().evCharging;
    if (saved.batteryCapacityKWh !== null && !new URLSearchParams(window.location.search).get("battery")) {
      setBatteryCapacity(saved.batteryCapacityKWh);
      initialBattery = saved.batteryCapacityKWh;
    }
    if (saved.startSoc !== null && !new URLSearchParams(window.location.search).get("start")) {
      const p = saved.startSoc <= 1 ? Math.round(saved.startSoc * 100) : saved.startSoc;
      setStartSocPercent(p);
      initialStart = p;
    }
    if (saved.targetSoc !== null && !new URLSearchParams(window.location.search).get("target")) {
      const p = saved.targetSoc <= 1 ? Math.round(saved.targetSoc * 100) : saved.targetSoc;
      setTargetSocPercent(p);
      initialTarget = p;
    }
    if (saved.vehicleMaxAcPowerKw !== null) setVehicleMaxAc(saved.vehicleMaxAcPowerKw);
    if (saved.vehicleMaxDcPowerKw !== null) setVehicleMaxDc(saved.vehicleMaxDcPowerKw);
    if (saved.acEfficiency !== null) setAcEfficiency(saved.acEfficiency);
    if (saved.dcEfficiency !== null) setDcEfficiency(saved.dcEfficiency);
    if (saved.dcTaperMode !== null) setTaperMode(saved.dcTaperMode);

    // Initial instant calculation
    try {
      const res = calculateEvChargingTime({
        batteryCapacityKwh: initialBattery,
        startSocPercent: initialStart,
        targetSocPercent: initialTarget,
        chargerPowerKw: initialPower,
        chargingType: initialType,
        acEfficiency: saved.acEfficiency ?? EV_CHARGING_TIME_DEFAULTS.acEfficiency,
        dcEfficiency: saved.dcEfficiency ?? EV_CHARGING_TIME_DEFAULTS.dcEfficiency,
        dcTaperMode: initialType === "DC" ? (saved.dcTaperMode ?? "generic") : "constant",
      });
      setCalculated(res);
    } catch {
      // Fallback if initial inputs need user correction
    }

    track("calculator_view", { calculator_id: "ev-charging-time", category: "ev", phase: 1 });
  }, []);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("battery", String(batteryCapacity));
    url.searchParams.set("start", String(startSocPercent));
    url.searchParams.set("target", String(targetSocPercent));
    url.searchParams.set("charger", chargerId);
    return url.toString();
  };

  const mark = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    if (calculated) setStale(true);
  };

  const selectPreset = (id: string) => {
    setChargerId(id);
    const preset = resolveChargerPreset(id);
    if (preset) {
      setChargerPower(preset.powerKw);
      setChargingType(preset.chargingType);
      if (calculated) setStale(true);
    }
  };

  const calculate = () => {
    try {
      const result = calculateEvChargingTime(input);
      setCalculated(result);
      setError(null);
      setStale(false);
      setAnnouncement(`Estimated charging time: ${formatTime(result.result.timeHours)}.`);
      createEnergyProfileStore(window.localStorage).patchEvCharging({
        batteryCapacityKWh: batteryCapacity,
        startSoc: startSocPercent / 100,
        targetSoc: targetSocPercent / 100,
        chargerPowerKw: activePower,
        chargingType: activeType,
        vehicleMaxAcPowerKw: vehicleMaxAc,
        vehicleMaxDcPowerKw: vehicleMaxDc,
        acEfficiency,
        dcEfficiency,
        dcTaperMode: activeType === "DC" ? taperMode : "constant",
      });
      track("calculator_calculate", { calculator_id: "ev-charging-time", charging_type: activeType, used_advanced: advancedOpen });
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError : new Error("Unable to calculate charging time."));
    }
  };

  const comparison = (type: EvChargingType) =>
    EV_CHARGERS.filter((item) => item.chargingType === type)
      .map((preset) => {
        try {
          const result = calculateEvChargingTime({
            ...input,
            chargerPowerKw: preset.powerKw,
            chargingType: type,
            dcTaperMode: type === "DC" ? taperMode : "constant",
          });
          return { ...preset, result };
        } catch {
          return null;
        }
      })
      .filter((item): item is (typeof EV_CHARGERS)[number] & { result: EvChargingTimeResult } => Boolean(item));

  const acComparisons = calculated ? comparison("AC") : [];
  const dcComparisons = calculated ? comparison("DC") : [];
  const selectedLabel = isCustom ? `${customPower} kW Custom (${customType})` : `${activePower} kW ${activeType}`;

  // Illustrative speed indicator assuming 3.5 mi/kWh baseline efficiency
  const effectivePower = calculated ? calculated.result.averageBatteryChargingPowerKw : activePower;
  const mphChargeRate = Math.round(effectivePower * 3.5);
  const kmhChargeRate = Math.round(effectivePower * 3.5 * 1.60934);
  const rangeAddedMiles = calculated ? Math.round(calculated.result.batteryEnergyAddedKWh * 3.5) : 0;
  const rangeAddedKm = Math.round(rangeAddedMiles * 1.60934);

  return (
    <section className="calculator" aria-labelledby="ev-charging-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="ev-charging-heading">Calculate charging time</h2>
          <CalculatorTrustPill />

          <div className="preset-chips-container" role="region" aria-label="Quick EV Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_EV_PRESETS.map((sc) => {
                const isActive =
                  batteryCapacity === sc.battery &&
                  startSocPercent === sc.start &&
                  targetSocPercent === sc.target &&
                  chargerId === sc.charger;
                return (
                  <button
                    key={sc.label}
                    type="button"
                    className={`preset-chip-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setBatteryCapacity(sc.battery);
                      setStartSocPercent(sc.start);
                      setTargetSocPercent(sc.target);
                      selectPreset(sc.charger);
                      if (calculated) setStale(true);
                      track("calculator_preset_click", { calculator_id: "ev-charging-time", preset: sc.label });
                    }}
                  >
                    {sc.label}
                  </button>
                );
              })}
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
              <legend>Charging session</legend>
              <div className="field-pair">
                <label>
                  Usable battery capacity (kWh)
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={batteryCapacity}
                    onChange={(e) => mark(setBatteryCapacity, number(e.target.value))}
                  />
                  <small style={{ display: "block", color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.2rem" }}>
                    Usable capacity may differ from gross/nominal pack capacity.
                  </small>
                </label>
                <label>
                  Start charge (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={startSocPercent}
                    onChange={(e) => mark(setStartSocPercent, number(e.target.value))}
                  />
                </label>
                <label>
                  Target charge (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={targetSocPercent}
                    onChange={(e) => mark(setTargetSocPercent, number(e.target.value))}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>EVSE Charger</legend>
              <div className="appliance-options charger-options">
                {EV_CHARGERS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={chargerId === preset.id ? "selected" : ""}
                    onClick={() => selectPreset(preset.id)}
                  >
                    <strong>{preset.label}</strong>
                    <small>{preset.detail}</small>
                  </button>
                ))}
                <button
                  type="button"
                  className={isCustom ? "selected" : ""}
                  onClick={() => {
                    setChargerId("custom");
                    if (calculated) setStale(true);
                  }}
                >
                  <strong>Custom</strong>
                  <small>User defined</small>
                </button>
              </div>

              {isCustom && (
                <div className="field-pair" style={{ marginTop: "0.75rem" }}>
                  <label>
                    Custom EVSE maximum power (kW)
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      value={customPower}
                      onChange={(e) => mark(setCustomPower, number(e.target.value))}
                    />
                  </label>
                  <fieldset className="mode-choice">
                    <legend>Charging mode</legend>
                    <label>
                      <input type="radio" checked={customType === "AC"} onChange={() => mark(setCustomType, "AC")} /> AC
                    </label>
                    <label>
                      <input type="radio" checked={customType === "DC"} onChange={() => mark(setCustomType, "DC")} /> DC
                    </label>
                  </fieldset>
                </div>
              )}
              <p className="form-hint">Selected charger preset determines AC or DC power profile automatically.</p>
            </fieldset>

            <button
              className="text-button"
              type="button"
              aria-expanded={advancedOpen}
              onClick={() => setAdvancedOpen((open) => !open)}
            >
              {advancedOpen ? "Hide" : "Show"} advanced assumptions
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Advanced assumptions</legend>
                <div className="field-pair">
                  {activeType === "AC" ? (
                    <label>
                      Vehicle maximum AC acceptance (kW)
                      <input
                        type="number"
                        min="0.1"
                        step="any"
                        placeholder="Unconstrained / Unknown"
                        value={vehicleMaxAc ?? ""}
                        onChange={(e) => mark(setVehicleMaxAc, e.target.value === "" ? null : number(e.target.value))}
                      />
                    </label>
                  ) : (
                    <label>
                      Vehicle maximum DC acceptance (kW)
                      <input
                        type="number"
                        min="0.1"
                        step="any"
                        placeholder="Unconstrained / Unknown"
                        value={vehicleMaxDc ?? ""}
                        onChange={(e) => mark(setVehicleMaxDc, e.target.value === "" ? null : number(e.target.value))}
                      />
                    </label>
                  )}

                  <label>
                    Overall wall-to-battery charging efficiency — illustrative assumption (%)
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={Math.round(acEfficiency * 100)}
                      onChange={(e) => mark(setAcEfficiency, number(e.target.value) / 100)}
                    />
                    <small style={{ display: "block", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                      Models onboard AC-to-DC rectification and thermal losses. Illustrative default: 90%.
                    </small>
                  </label>

                  <label>
                    DC charger source efficiency (%)
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={Math.round(dcEfficiency * 100)}
                      onChange={(e) => mark(setDcEfficiency, number(e.target.value) / 100)}
                    />
                    <small style={{ display: "block", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                      Grid-to-DC conversion efficiency. Does not alter battery charge duration.
                    </small>
                  </label>

                  {activeType === "DC" && (
                    <label>
                      DC charging model
                      <select value={taperMode} onChange={(e) => mark(setTaperMode, e.target.value as DcTaperMode)}>
                        <option value="generic">Generic DC taper curve (decreases as SOC rises)</option>
                        <option value="constant">Idealized constant power (no taper)</option>
                      </select>
                    </label>
                  )}
                </div>
              </fieldset>
            )}

            {!calculated && (
              <p className="form-hint">Enter your usable pack capacity and charger details, then calculate estimated charging time.</p>
            )}
            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Calculate Charging Time"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">EV charging estimate</p>
          {!calculated ? (
            <p>Complete the inputs and calculate to see an estimate.</p>
          ) : (
            <>
              <p className="result-lede">Estimated charging time</p>
              <p className="result-value">{formatTime(calculated.result.timeHours)}</p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.75rem",
                  background: "rgba(2, 132, 199, 0.08)",
                  border: "1px solid rgba(2, 132, 199, 0.2)",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#0284c7",
                  margin: "0.5rem 0 0.75rem 0",
                }}
              >
                <span>⚡ +{mphChargeRate} mph ({kmhChargeRate} km/h) speed</span>
                <span style={{ color: "var(--text-muted, #64748b)", fontWeight: 400 }}>
                  • Adds ~{rangeAddedMiles} mi ({rangeAddedKm} km) total (@ 3.5 mi/kWh assumption)
                </span>
              </div>

              {/* Uncertainty Warning Note */}
              <div
                style={{
                  fontSize: "0.82rem",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "0.5rem",
                  background: "var(--bg-secondary, #f8fafc)",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  color: "var(--text-muted, #475569)",
                  margin: "0.25rem 0 1rem",
                  lineHeight: 1.5,
                }}
              >
                <strong>⚠️ Estimate only:</strong> Actual charging time varies with vehicle charging curve, battery temperature,
                SOC, charger capability, battery conditioning and operating conditions.
                {activeType === "DC" && (
                  <div style={{ marginTop: "0.35rem", color: "var(--brand-strong)", fontWeight: 600 }}>
                    Vehicle-specific charging curve not supplied — result is an estimate.
                  </div>
                )}
              </div>

              {stale && <p className="warning" role="status">Inputs changed — recalculate to update the estimate.</p>}

              <EvChargingVisualizer
                batteryCapacityKwh={batteryCapacity}
                startSocPercent={startSocPercent}
                targetSocPercent={targetSocPercent}
                chargerPowerKw={activePower}
                chargeTimeHours={calculated.result.timeHours}
                rangeAddedMiles={calculated.result.batteryEnergyAddedKWh * 3.5}
                rangeAddedKm={calculated.result.batteryEnergyAddedKWh * 3.5 * 1.60934}
              />

              <EvChargingCurveChart
                batteryKwh={batteryCapacity}
                chargerKw={activePower}
                startSoc={startSocPercent}
                targetSoc={targetSocPercent}
                isDcFastCharge={activeType === "DC"}
              />

              <dl className="result-breakdown">
                <div>
                  <dt>Recharge window</dt>
                  <dd>
                    {startSocPercent}% → {targetSocPercent}% (+{targetSocPercent - startSocPercent}% SOC)
                  </dd>
                </div>
                <div>
                  <dt>Battery energy added</dt>
                  <dd>{calculated.result.batteryEnergyAddedKWh.toFixed(1)} kWh</dd>
                </div>
                <div>
                  <dt>Estimated source energy</dt>
                  <dd>{calculated.result.gridEnergyKWh.toFixed(1)} kWh</dd>
                </div>
                <div>
                  <dt>EVSE maximum power</dt>
                  <dd>{selectedLabel}</dd>
                </div>
                <div>
                  <dt>Vehicle acceptance limit</dt>
                  <dd>
                    {calculated.result.vehicleAcceptanceLimitKw
                      ? `${calculated.result.vehicleAcceptanceLimitKw} kW`
                      : "Unconstrained / Unknown"}
                  </dd>
                </div>
                {activeType === "AC" ? (
                  <div>
                    <dt>Battery-side effective power</dt>
                    <dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd>
                  </div>
                ) : (
                  <>
                    <div>
                      <dt>Base DC supply power</dt>
                      <dd>{formatPower(calculated.result.baseDcBatteryPowerKw ?? activePower)}</dd>
                    </div>
                    {calculated.result.taperMode === "generic" && (
                      <div>
                        <dt>Average charging power (tapered)</dt>
                        <dd>{formatPower(calculated.result.averageBatteryChargingPowerKw)}</dd>
                      </div>
                    )}
                  </>
                )}
                <div>
                  <dt>Efficiency assumption</dt>
                  <dd>
                    {activeType === "AC"
                      ? `${Math.round(acEfficiency * 100)}% overall wall-to-battery (illustrative)`
                      : `${Math.round(dcEfficiency * 100)}% grid-to-vehicle source`}
                  </dd>
                </div>
                <div>
                  <dt>Charging mode</dt>
                  <dd>{activeType === "AC" ? "AC conductive" : "DC Fast Charging"}</dd>
                </div>
                {calculated.result.limitingFactor !== "vehicle-limit-unknown" && (
                  <div>
                    <dt>Limiting factor</dt>
                    <dd>
                      {calculated.result.limitingFactor === "vehicle-ac-charging-limit"
                        ? "Vehicle onboard AC acceptance limit"
                        : "Vehicle DC acceptance limit"}
                    </dd>
                  </div>
                )}
              </dl>

              {calculated.result.limitingFactor === "vehicle-limit-unknown" && (
                <p className="form-hint">
                  Vehicle charging limit unknown — estimate assumes the vehicle can accept the selected EVSE maximum power.
                </p>
              )}

              <section className="comparison">
                <h3>Common AC charging speeds</h3>
                <dl>
                  {acComparisons.map((item) => (
                    <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}>
                      <dt>
                        {item.label} <span>{item.detail}</span>
                      </dt>
                      <dd>{formatTime(item.result.timeHours)}</dd>
                    </div>
                  ))}
                </dl>
                <p className="form-hint">
                  AC estimates assume constant battery-side power after illustrative 90% wall-to-battery conversion losses.
                </p>
              </section>

              <section className="comparison">
                <h3>DC fast charging estimates</h3>
                <dl>
                  {dcComparisons.map((item) => (
                    <div key={item.id} className={item.id === chargerId ? "current-comparison" : ""}>
                      <dt>
                        {item.label} <span>{item.detail}</span>
                      </dt>
                      <dd>{formatTime(item.result.timeHours)}</dd>
                    </div>
                  ))}
                </dl>
                <p className="form-hint">
                  DC fast charge results are estimates applying a generic illustrative taper curve. Actual times vary significantly.
                </p>
              </section>

              <GooglePreferredBanner />
              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && (
        <MobileResultBar
          label="Estimated Charging Time"
          value={formatTime(calculated.result.timeHours)}
          targetId="calculator-result"
        />
      )}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}





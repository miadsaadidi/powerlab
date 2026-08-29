"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BATTERY_CHEMISTRIES, resolveChemistryReserve } from "@/data/battery-defaults";
import { calculateUsageProfile } from "@/lib/calculators/electricity-usage/engine";
import { calculateHomeBatterySize, normalizeHomeEnergy, type HomeBatterySizeResult, type HomeEnergyUnit } from "@/lib/calculators/home-battery-size/engine";
import { energyProvenanceAfterChange, type EnergyProvenance } from "@/lib/calculators/home-battery-size/provenance";
import { buildSolarBatteryHandoffUrl } from "@/lib/calculators/home-battery-size/handoff";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { LossWaterfall } from "@/components/calculator/loss-waterfall";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { EnergyFlowVisualizer } from "@/components/calculator/energy-flow-visualizer";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

const QUICK_HOME_PRESETS = [
  { label: "⚡ Essential Outage (12h · 25% Load)", energy: 300, scope: "critical" as ScopeMode, duration: "12" as DurationMode },
  { label: "🏠 Overnight Storm (24h · 50% Load)", energy: 300, scope: "partial" as ScopeMode, duration: "24" as DurationMode },
  { label: "⛈️ Multi-Day Winter Storm (48h · 50%)", energy: 300, scope: "partial" as ScopeMode, duration: "48" as DurationMode },
  { label: "🏡 Whole-Home Backup (24h · 100%)", energy: 450, scope: "whole" as ScopeMode, duration: "24" as DurationMode },
  { label: "☀️ Peak Load Shifting (8h · 50%)", energy: 300, scope: "partial" as ScopeMode, duration: "8" as DurationMode },
];

type ScopeMode = "critical" | "partial" | "whole" | "custom";
type DurationMode = "4" | "8" | "12" | "24" | "48" | "custom";

type CalculationState = {
  result: HomeBatterySizeResult;
  energyValue: number;
  energyUnit: HomeEnergyUnit;
  scopeMode: ScopeMode;
  customScope: number;
  durationMode: DurationMode;
  customHours: number;
  chemistry: string;
  minimumSoc: number;
  inverterEfficiency: number;
  batteryHealth: number;
  designMargin: number;
};

const numberOrNaN = (value: string) => Number(value);
const fraction = (value: string) => Number(value) / 100;
const formatNumber = (value: number, digits = 2) => value.toLocaleString(undefined, { maximumFractionDigits: digits });
const percent = (value: number) => `${formatNumber(value * 100, 1)}%`;
const scopeValues: Record<Exclude<ScopeMode, "custom">, number> = { critical: 0.25, partial: 0.5, whole: 1 };

export function HomeBatterySizeCalculator() {
  const [energyValue, setEnergyValue] = useState(300);
  const [energyUnit, setEnergyUnit] = useState<HomeEnergyUnit>("month");
  const [energyProvenance, setEnergyProvenance] = useState<EnergyProvenance>("user-edited");
  const [scopeMode, setScopeMode] = useState<ScopeMode>("partial");
  const [customScope, setCustomScope] = useState(35);
  const [durationMode, setDurationMode] = useState<DurationMode>("12");
  const [customHours, setCustomHours] = useState(18);
  const [chemistry, setChemistry] = useState("lifepo4");
  const [minimumSoc, setMinimumSoc] = useState(0.2);
  const [inverterEfficiency, setInverterEfficiency] = useState(0.9);
  const [batteryHealth, setBatteryHealth] = useState(1);
  const [designMargin, setDesignMargin] = useState(0.1);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculation, setCalculation] = useState<CalculationState | null>(() => {
    try {
      const norm = normalizeHomeEnergy(300, "month");
      const res = calculateHomeBatterySize({
        dailyKWh: norm.dailyKWh,
        scopeFraction: 0.5,
        backupHours: 12,
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
      });
      return {
        result: res,
        energyValue: 300,
        energyUnit: "month",
        scopeMode: "partial",
        customScope: 35,
        durationMode: "12",
        customHours: 18,
        chemistry: "lifepo4",
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
      };
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [reserveCustomized, setReserveCustomized] = useState(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    let initialEnergy = 300;
    try {
      const usage = calculateUsageProfile(
        profile.usageRows.map((row) => ({
          id: row.id,
          label: row.label,
          input: {
            mode: row.mode,
            watts: row.watts ?? undefined,
            quantity: row.quantity,
            hoursPerDay: row.hoursPerDay ?? undefined,
            daysPerWeek: row.daysPerWeek ?? undefined,
            dutyCycle: row.dutyCycle,
            kWhPerCycle: row.kWhPerCycle ?? undefined,
            cyclesPerWeek: row.cyclesPerWeek ?? undefined,
            labelKWh: row.labelKWh ?? undefined,
            labelPeriod: row.labelPeriod ?? undefined,
          },
        }))
      );
      if (usage.totalMonthlyKWh > 0) {
        setEnergyValue(usage.totalMonthlyKWh);
        initialEnergy = usage.totalMonthlyKWh;
        setEnergyUnit("month");
        setEnergyProvenance("profile-derived");
        setProfileLoaded(true);
        setMessage("Energy target loaded from your Energy Profile.");
      }
    } catch {
      /* profile usage is optional */
    }
    if (profile.battery.chemistry && BATTERY_CHEMISTRIES.some((item) => item.id === profile.battery.chemistry)) {
      setChemistry(profile.battery.chemistry);
    }
    if (profile.battery.reserveSoc !== null && Number.isFinite(profile.battery.reserveSoc)) {
      setMinimumSoc(profile.battery.reserveSoc);
      setReserveCustomized(true);
    }

    try {
      const norm = normalizeHomeEnergy(initialEnergy, "month");
      const res = calculateHomeBatterySize({
        dailyKWh: norm.dailyKWh,
        scopeFraction: 0.5,
        backupHours: 12,
        minimumSoc: profile.battery.reserveSoc ?? 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
      });
      setCalculation({
        result: res,
        energyValue: initialEnergy,
        energyUnit: "month",
        scopeMode: "partial",
        customScope: 35,
        durationMode: "12",
        customHours: 18,
        chemistry: profile.battery.chemistry ?? "lifepo4",
        minimumSoc: profile.battery.reserveSoc ?? 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
      });
    } catch {
      // Ignore initial calculation fallback
    }

    track("calculator_view", { calculator_id: "home-battery-size", category: "home-energy", phase: 3 });
  }, []);

  const scopeFraction = scopeMode === "custom" ? customScope / 100 : scopeValues[scopeMode];
  const backupHours = durationMode === "custom" ? customHours : Number(durationMode);
  const normalized = useMemo(() => {
    try {
      return normalizeHomeEnergy(energyValue, energyUnit);
    } catch {
      return null;
    }
  }, [energyUnit, energyValue]);
  const usageError = !Number.isFinite(energyValue) || energyValue <= 0 ? "Household energy must be greater than zero." : null;
  const scopeError = !Number.isFinite(scopeFraction) || scopeFraction <= 0 || scopeFraction > 1 ? "Backup scope must be greater than 0% and no more than 100%." : null;
  const hoursError = !Number.isFinite(backupHours) || backupHours <= 0 ? "Backup duration must be greater than zero." : null;
  const canCalculate = normalized !== null && !usageError && !scopeError && !hoursError;
  const batteryPublished = isCalculatorPublished("solar-battery-bank-size");
  const electricityUsagePublished = isCalculatorPublished("electricity-usage");
  const markStale = () => {
    if (calculation) setStale(true);
  };
  const updateEnergyUnit = (nextUnit: HomeEnergyUnit) => {
    if (nextUnit === energyUnit) return;
    try {
      const converted = normalizeHomeEnergy(energyValue, energyUnit);
      setEnergyValue(nextUnit === "day" ? converted.dailyKWh : converted.monthlyKWh);
      setEnergyUnit(nextUnit);
      markStale();
    } catch {
      setEnergyUnit(nextUnit);
      markStale();
    }
  };
  const selectChemistry = (next: string) => {
    setChemistry(next);
    if (!reserveCustomized) setMinimumSoc(resolveChemistryReserve(next, minimumSoc, false));
    markStale();
  };
  const calculate = () => {
    if (!canCalculate || !normalized) {
      setError("Enter valid household energy, scope and backup duration values.");
      return;
    }
    try {
      const result = calculateHomeBatterySize({
        dailyKWh: normalized.dailyKWh,
        scopeFraction,
        backupHours,
        minimumSoc,
        inverterEfficiency,
        batteryHealth,
        designMargin,
      });
      setCalculation({
        result,
        energyValue,
        energyUnit,
        scopeMode,
        customScope,
        durationMode,
        customHours,
        chemistry,
        minimumSoc,
        inverterEfficiency,
        batteryHealth,
        designMargin,
      });
      setStale(false);
      setError("");
      setMessage("Home battery size updated.");
      track("calculator_calculate", { calculator_id: "home-battery-size", scope: scopeMode, used_advanced: advancedOpen });
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError.message : "Unable to calculate home battery size.");
    }
  };
  const handoffUrl = calculation ? buildSolarBatteryHandoffUrl(calculation.result.selectedScopeDailyLoadKWh, batteryPublished) : null;

  return (
    <section className="calculator home-battery-size-calculator" aria-labelledby="home-battery-size-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="home-battery-size-heading">Estimate home battery capacity</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Outage Backup Scenarios">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Outage Scenarios</span>
            <div className="preset-chips-row">
              {QUICK_HOME_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${energyValue === sc.energy && scopeMode === sc.scope && durationMode === sc.duration ? "active" : ""}`}
                  onClick={() => {
                    setEnergyValue(sc.energy);
                    setEnergyUnit("month");
                    setScopeMode(sc.scope);
                    setDurationMode(sc.duration);
                    try {
                      const norm = normalizeHomeEnergy(sc.energy, "month");
                      const res = calculateHomeBatterySize({
                        dailyKWh: norm.dailyKWh,
                        scopeFraction: scopeValues[sc.scope as Exclude<ScopeMode, "custom">],
                        backupHours: Number(sc.duration),
                        minimumSoc,
                        inverterEfficiency,
                        batteryHealth,
                        designMargin,
                      });
                      setCalculation({
                        result: res,
                        energyValue: sc.energy,
                        energyUnit: "month",
                        scopeMode: sc.scope,
                        customScope,
                        durationMode: sc.duration,
                        customHours,
                        chemistry,
                        minimumSoc,
                        inverterEfficiency,
                        batteryHealth,
                        designMargin,
                      });
                      setStale(false);
                      setError("");
                    } catch {
                      markStale();
                    }
                    track("calculator_preset_click", { calculator_id: "home-battery-size", preset: sc.label });
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorTrustPill />

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Quick inputs</legend>
              <label>
                Household energy{" "}
                <span className="input-with-unit">
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    inputMode="decimal"
                    value={Number.isNaN(energyValue) ? "" : energyValue}
                    onChange={(event) => {
                      setEnergyValue(numberOrNaN(event.target.value));
                      setEnergyProvenance(energyProvenanceAfterChange(energyProvenance, "value"));
                      setProfileLoaded(false);
                      markStale();
                    }}
                  />
                  <select aria-label="Household energy unit" value={energyUnit} onChange={(event) => updateEnergyUnit(event.target.value as HomeEnergyUnit)}>
                    <option value="month">kWh/month</option>
                    <option value="day">kWh/day</option>
                  </select>
                </span>
              </label>
              {profileLoaded && energyProvenance === "profile-derived" && <p className="form-hint">Energy target loaded from your Energy Profile.</p>}
              {energyProvenance === "user-edited" && profileLoaded === false && <p className="form-hint">Energy target is an editable calculator value.</p>}
              {usageError && (
                <p className="error" role="alert">
                  {usageError}
                </p>
              )}
              <fieldset className="input-group">
                <legend>Backup scope</legend>
                <div className="chip-row">
                  {(["critical", "partial", "whole", "custom"] as const).map((mode) => (
                    <button
                      type="button"
                      className={scopeMode === mode ? "chip active" : "chip"}
                      aria-pressed={scopeMode === mode}
                      key={mode}
                      onClick={() => {
                        setScopeMode(mode);
                        markStale();
                      }}
                    >
                      {mode === "critical"
                        ? "Critical loads — 25% estimate"
                        : mode === "partial"
                        ? "Partial home — 50% estimate"
                        : mode === "whole"
                        ? "Whole home — 100%"
                        : "Custom"}
                    </button>
                  ))}
                </div>
                {scopeMode === "custom" && (
                  <label>
                    Custom backup scope{" "}
                    <span className="input-with-unit">
                      <input
                        type="number"
                        min="0.01"
                        max="100"
                        step="any"
                        value={customScope}
                        onChange={(event) => {
                          setCustomScope(numberOrNaN(event.target.value));
                          markStale();
                        }}
                      />
                      <span aria-hidden="true">%</span>
                    </span>
                  </label>
                )}
                <p className="form-hint">Backup scope estimates the share of normal household energy you want to support during an outage.</p>
                {scopeError && (
                  <p className="error" role="alert">
                    {scopeError}
                  </p>
                )}
              </fieldset>
              <fieldset className="input-group">
                <legend>Backup duration</legend>
                <div className="chip-row">
                  {(["4", "8", "12", "24", "48", "custom"] as const).map((mode) => (
                    <button
                      type="button"
                      className={durationMode === mode ? "chip active" : "chip"}
                      aria-pressed={durationMode === mode}
                      key={mode}
                      onClick={() => {
                        setDurationMode(mode);
                        markStale();
                      }}
                    >
                      {mode === "custom" ? "Custom" : `${mode} h`}
                    </button>
                  ))}
                </div>
                {durationMode === "custom" && (
                  <label>
                    Custom backup duration{" "}
                    <span className="input-with-unit">
                      <input
                        type="number"
                        min="0.01"
                        step="any"
                        value={customHours}
                        onChange={(event) => {
                          setCustomHours(numberOrNaN(event.target.value));
                          markStale();
                        }}
                      />
                      <span aria-hidden="true">hours</span>
                    </span>
                  </label>
                )}
                <p className="form-hint">Multi-day estimates repeat the normalized average daily load.</p>
                {hoursError && (
                  <p className="error" role="alert">
                    {hoursError}
                  </p>
                )}
              </fieldset>
              <label>
                Battery chemistry
                <select value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>
                  {BATTERY_CHEMISTRIES.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
            <details
              open={advancedOpen}
              onToggle={(event) => {
                setAdvancedOpen(event.currentTarget.open);
                if (event.currentTarget.open) track("calculator_advanced_open", { calculator_id: "home-battery-size" });
              }}
            >
              <summary>Advanced assumptions</summary>
              <fieldset className="input-group advanced-settings">
                <label>
                  Minimum SOC / reserve (%)
                  <input
                    type="number"
                    min="0"
                    max="99.99"
                    step="any"
                    value={minimumSoc * 100}
                    onChange={(event) => {
                      setMinimumSoc(fraction(event.target.value));
                      setReserveCustomized(true);
                      markStale();
                    }}
                  />
                </label>
                <label>
                  Inverter efficiency (%)
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    step="any"
                    value={inverterEfficiency * 100}
                    onChange={(event) => {
                      setInverterEfficiency(fraction(event.target.value));
                      markStale();
                    }}
                  />
                </label>
                <label>
                  Battery health / available capacity (%)
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    step="any"
                    value={batteryHealth * 100}
                    onChange={(event) => {
                      setBatteryHealth(fraction(event.target.value));
                      markStale();
                    }}
                  />
                </label>
                <label>
                  Design margin (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={designMargin * 100}
                    onChange={(event) => {
                      setDesignMargin(fraction(event.target.value));
                      markStale();
                    }}
                  />
                </label>
                {reserveCustomized && <p className="form-hint">Your reserve is custom and will not be replaced when chemistry changes.</p>}
              </fieldset>
            </details>
            <button className="button calculator-submit" type="submit">
              {calculation ? "Recalculate" : "Calculate Battery Size"}
            </button>
          </form>
        </div>
        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Home backup estimate</p>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {!calculation ? (
            <p>Enter your household energy, backup scope and duration, then calculate the recommended capacity.</p>
          ) : (
            <>
              <p className="result-lede">Recommended home battery capacity</p>
              <p className="result-value">{formatNumber(calculation.result.recommendedKWh)} kWh</p>
              <StandardsBadge standards={["NFPA 855", "UL 9540", "IEEE 2030.5", "NEC Art. 706"]} />
              <div style={{ background: "var(--surface, rgba(14, 165, 233, 0.04))", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "0.875rem 1rem", margin: "0.75rem 0 1rem 0" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted, #64748b)", display: "block", marginBottom: "0.5rem" }}>
                  📦 Equivalent Physical Hardware Modules
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0284c7" }}>{Math.max(1, Math.ceil(calculation.result.recommendedKWh / 13.5))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>13.5 kWh Units<br />(Powerwall / Enphase)</small>
                  </div>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#16a34a" }}>{Math.max(1, Math.ceil(calculation.result.recommendedKWh / 5.12))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>5.12 kWh Modules<br />(48V Server Racks)</small>
                  </div>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#d97706" }}>{Math.max(1, Math.ceil((calculation.result.recommendedKWh * 1000) / 1200))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>12V 100Ah Batteries<br />(1.2 kWh Drop-ins)</small>
                  </div>
                </div>
              </div>
              {stale && <p className="warning" role="status">Previous result — inputs have changed. Recalculate to update it.</p>}
              <EnergyFlowVisualizer
                batteryKwh={calculation.result.recommendedKWh}
                backupHours={calculation.result.backupHours}
                scopeLabel={
                  calculation.scopeMode === "critical"
                    ? "Critical Essentials (25%)"
                    : calculation.scopeMode === "partial"
                    ? "Partial Home (50%)"
                    : calculation.scopeMode === "whole"
                    ? "Whole Home (100%)"
                    : `Custom (${calculation.customScope}%)`
                }
              />
              <LossWaterfall
                steps={[
                  {
                    label: "Backup Window Energy",
                    value: calculation.result.backupLoadEnergyKWh * 1000,
                    unit: "Wh",
                    subtext: `Direct energy needed for ${formatNumber(calculation.result.backupHours)}h backup`,
                  },
                  {
                    label: "Battery-Side Energy Demand",
                    value: (calculation.result.backupLoadEnergyKWh / calculation.inverterEfficiency) * 1000,
                    unit: "Wh",
                    subtext: "Energy required from battery after inverter losses",
                    isLoss: true,
                  },
                  {
                    label: "Recommended Battery Capacity",
                    value: calculation.result.recommendedKWh * 1000,
                    unit: "Wh",
                    subtext: "Total nominal capacity with reserve and design margin",
                    isFinal: true,
                  },
                ]}
              />
              <dl className="result-breakdown">
                <div>
                  <dt>Average daily household use</dt>
                  <dd>{formatNumber(calculation.result.dailyKWh)} kWh/day</dd>
                </div>
                <div>
                  <dt>Selected scope daily energy</dt>
                  <dd>
                    {formatNumber(calculation.result.selectedScopeDailyLoadKWh)} kWh/day · {percent(calculation.result.scopeFraction)} estimate
                  </dd>
                </div>
                <div>
                  <dt>Backup-window energy</dt>
                  <dd>{formatNumber(calculation.result.backupLoadEnergyKWh)} kWh</dd>
                </div>
                <div>
                  <dt>Minimum nominal capacity</dt>
                  <dd>{formatNumber(calculation.result.minimumNominalKWh)} kWh</dd>
                </div>
                <div>
                  <dt>Recommended capacity</dt>
                  <dd>{formatNumber(calculation.result.recommendedKWh)} kWh</dd>
                </div>
              </dl>
              <section className="scenario-table">
                <h3>Capacity by backup scope</h3>
                <table>
                  <caption>Recommended capacity using the selected backup duration</caption>
                  <thead>
                    <tr>
                      <th scope="col">Scope</th>
                      <th scope="col">Recommended capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculation.result.scopeComparisons.map((row) => (
                      <tr className={row.isSelected ? "current-comparison" : undefined} key={row.scopeFraction}>
                        <th scope="row">
                          {row.label}
                          {row.isSelected && row.label.includes("estimate") ? " — selected" : ""}
                        </th>
                        <td>{formatNumber(row.recommendedKWh)} kWh</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section className="assumption-summary">
                <h3>Assumptions used</h3>
                <dl>
                  <div>
                    <dt>Household energy basis</dt>
                    <dd>Average daily use</dd>
                  </div>
                  <div>
                    <dt>Backup scope</dt>
                    <dd>
                      {percent(calculation.scopeMode === "custom" ? calculation.customScope / 100 : scopeValues[calculation.scopeMode as Exclude<ScopeMode, "custom">])} planning estimate
                    </dd>
                  </div>
                  <div>
                    <dt>Backup duration</dt>
                    <dd>{formatNumber(calculation.result.backupHours)} hours</dd>
                  </div>
                  <div>
                    <dt>Starting SOC</dt>
                    <dd>100%</dd>
                  </div>
                  <div>
                    <dt>Minimum SOC</dt>
                    <dd>{percent(calculation.minimumSoc)}</dd>
                  </div>
                  <div>
                    <dt>Usable SOC window</dt>
                    <dd>{percent(calculation.result.usableSocWindow)}</dd>
                  </div>
                  <div>
                    <dt>Inverter efficiency</dt>
                    <dd>{percent(calculation.inverterEfficiency)}</dd>
                  </div>
                  <div>
                    <dt>Battery health / available capacity</dt>
                    <dd>{percent(calculation.batteryHealth)}</dd>
                  </div>
                  <div>
                    <dt>Design margin</dt>
                    <dd>{percent(calculation.designMargin)}</dd>
                  </div>
                  <div>
                    <dt>Chemistry</dt>
                    <dd>{BATTERY_CHEMISTRIES.find((item) => item.id === calculation.chemistry)?.label ?? calculation.chemistry} planning preset</dd>
                  </div>
                </dl>
              </section>
              <p className="warning">
                This average-energy estimate does not model hourly load curves, solar recharge, generator recharge, nighttime variation or day-to-day appliance schedules. It does not size inverter power, service panels, transfer equipment, wiring or installation.
              </p>

              <GooglePreferredBanner />

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton title="Home Battery Size Calculation" />
                <PrintSpecButton />
              </div>

              {(electricityUsagePublished || (batteryPublished && handoffUrl)) && (
                <div className="handoff" style={{ marginTop: "1.2rem" }}>
                  <h3 style={{ fontSize: "0.95rem", marginBottom: "0.6rem" }}>Use this result elsewhere</h3>
                  <div className="handoff-button-group">
                    {electricityUsagePublished && (
                      <Link className="button secondary-button handoff-link" href="/home-energy/electricity-usage-calculator">
                        <span>Build a more accurate appliance profile</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                    {batteryPublished && handoffUrl && (
                      <Link className="button secondary-button handoff-link" href={handoffUrl}>
                        <span>Size an off-grid or solar battery bank</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </aside>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {message}
        </p>
      </div>
      {calculation && <MobileResultBar label="Recommended Home Battery" value={`${formatNumber(calculation.result.recommendedKWh)} kWh`} targetId="calculator-result" />}
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { BATTERY_CHEMISTRIES, BATTERY_VOLTAGE_PRESETS, resolveChemistryReserve } from "@/data/battery-defaults";
import { calculateSolarBatteryBankSize, type SolarBatteryBankSizeInput, type SolarBatteryBankSizeResult } from "@/lib/calculators/solar-battery-bank-size/engine";
import { calculateUsageProfile } from "@/lib/calculators/electricity-usage/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { LossWaterfall } from "@/components/calculator/loss-waterfall";
import { EnergyFlowVisualizer } from "@/components/calculator/energy-flow-visualizer";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";

const QUICK_SOLAR_BATTERY_PRESETS = [
  { label: "🚐 Camper Van (1.5 kWh/day · 1 Day)", load: 1.5, days: 1, voltage: 12, chem: "lifepo4" },
  { label: "🏕️ Weekend Cabin (4 kWh/day · 2 Days)", load: 4, days: 2, voltage: 24, chem: "lifepo4" },
  { label: "🏡 Off-Grid Homestead (10 kWh/day · 3 Days)", load: 10, days: 3, voltage: 48, chem: "lifepo4" },
  { label: "⚡ Evening Solar Shift (6 kWh/day · 1 Day)", load: 6, days: 1, voltage: 48, chem: "lifepo4" },
  { label: "🚨 Storm Emergency (3 kWh/day · 2 Days)", load: 3, days: 2, voltage: 12, chem: "agm" },
];

const numberOrNaN = (value: string) => Number(value);
const percent = (value: number) => Math.round(value * 100);
const formatKWh = (value: number, digits = 2) => `${value.toLocaleString(undefined, { maximumFractionDigits: digits })} kWh`;
const formatAh = (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} Ah`;

export function SolarBatteryBankSizeCalculator() {
  const [dailyLoadKWh, setDailyLoadKWh] = useState(5);
  const [autonomyDays, setAutonomyDays] = useState(1);
  const [autonomyPreset, setAutonomyPreset] = useState("1");
  const [chemistry, setChemistry] = useState("lifepo4");
  const [minimumSoc, setMinimumSoc] = useState(0.2);
  const [inverterEfficiency, setInverterEfficiency] = useState(0.9);
  const [batteryHealth, setBatteryHealth] = useState(1);
  const [designMargin, setDesignMargin] = useState(0.1);
  const [systemVoltage, setSystemVoltage] = useState(48);
  const [voltagePreset, setVoltagePreset] = useState("48");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [minimumSocCustomized, setMinimumSocCustomized] = useState(false);
  const [calculation, setCalculation] = useState<SolarBatteryBankSizeResult | null>(() => {
    try {
      return calculateSolarBatteryBankSize({
        dailyLoadKWh: 5,
        autonomyDays: 1,
        chemistry: "lifepo4",
        minimumSoc: 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
        systemVoltage: 48,
      });
    } catch {
      return null;
    }
  });
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    const handoffLoad = Number(new URLSearchParams(window.location.search).get("dailyLoadKWh"));
    const hasSolarLoadHandoff = Number.isFinite(handoffLoad) && handoffLoad > 0;
    const savedChemistry = profile.battery.chemistry && BATTERY_CHEMISTRIES.some((item) => item.id === profile.battery.chemistry) ? profile.battery.chemistry : "lifepo4";
    setChemistry(savedChemistry);
    if (profile.battery.reserveSoc !== null) {
      setMinimumSoc(profile.battery.reserveSoc);
      setMinimumSocCustomized(true);
    } else {
      setMinimumSoc(resolveChemistryReserve(savedChemistry, 0.2, false));
    }
    if (Number.isFinite(profile.battery.batteryHealth) && profile.battery.batteryHealth !== 1) setBatteryHealth(profile.battery.batteryHealth);
    if (profile.battery.nominalVoltage !== null && Number.isFinite(profile.battery.nominalVoltage) && profile.battery.nominalVoltage > 0) {
      setSystemVoltage(profile.battery.nominalVoltage);
      setVoltagePreset(BATTERY_VOLTAGE_PRESETS.includes(profile.battery.nominalVoltage as typeof BATTERY_VOLTAGE_PRESETS[number]) ? String(profile.battery.nominalVoltage) : "custom");
    }
    let initialLoad = 5;
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
      if (usage.totalAnnualKWh > 0 && !hasSolarLoadHandoff) {
        setDailyLoadKWh(usage.totalAnnualKWh / 365.25);
        initialLoad = usage.totalAnnualKWh / 365.25;
      }
    } catch {
      /* profile usage is optional */
    }
    if (hasSolarLoadHandoff) {
      setDailyLoadKWh(handoffLoad);
      initialLoad = handoffLoad;
    }
    const handoffSource = new URLSearchParams(window.location.search).get("source");
    if (hasSolarLoadHandoff && handoffSource === "solar-load") setMessage("Daily load loaded from Solar Load Calculator.");
    if (hasSolarLoadHandoff && handoffSource === "home-battery-size") setMessage("Daily load loaded from Home Battery Size Calculator.");

    try {
      const res = calculateSolarBatteryBankSize({
        dailyLoadKWh: initialLoad,
        autonomyDays: 1,
        chemistry: savedChemistry,
        minimumSoc: profile.battery.reserveSoc ?? 0.2,
        inverterEfficiency: 0.9,
        batteryHealth: 1,
        designMargin: 0.1,
        systemVoltage: profile.battery.nominalVoltage ?? 48,
      });
      setCalculation(res);
    } catch {
      // Ignore fallback
    }

    track("calculator_view", { calculator_id: "solar-battery-bank-size", category: "solar", phase: 3 });
  }, []);

  const input = useMemo<SolarBatteryBankSizeInput>(
    () => ({ dailyLoadKWh, autonomyDays, chemistry, minimumSoc, inverterEfficiency, batteryHealth, designMargin, systemVoltage }),
    [autonomyDays, batteryHealth, chemistry, dailyLoadKWh, designMargin, inverterEfficiency, minimumSoc, systemVoltage]
  );
  const chemistryPreset = BATTERY_CHEMISTRIES.find((item) => item.id === chemistry) ?? BATTERY_CHEMISTRIES[0];
  const markChanged = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    if (calculation) setStale(true);
  };
  const selectChemistry = (next: string) => {
    setChemistry(next);
    if (!minimumSocCustomized) setMinimumSoc(resolveChemistryReserve(next, minimumSoc, false));
    if (calculation) setStale(true);
  };
  const selectAutonomy = (value: string) => {
    setAutonomyPreset(value);
    if (value !== "custom") markChanged(setAutonomyDays, Number(value));
    else if (calculation) setStale(true);
  };
  const calculate = () => {
    try {
      const result = calculateSolarBatteryBankSize(input);
      setCalculation(result);
      setStale(false);
      setError(null);
      setMessage("Calculation updated.");
      track("calculator_calculate", { calculator_id: "solar-battery-bank-size", used_advanced: advancedOpen });
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError : new Error("Enter valid sizing inputs."));
    }
  };
  const saveProfile = () => {
    if (!calculation) return;
    createEnergyProfileStore(window.localStorage).patchBattery({
      capacityWh: calculation.result.recommendedKWh * 1_000,
      capacityAh: calculation.result.selectedVoltageAh,
      nominalVoltage: systemVoltage,
      chemistry,
      batteryHealth,
      reserveSoc: minimumSoc,
    });
    setMessage("Battery assumptions saved to your Energy Profile.");
    track("calculator_calculate", { calculator_id: "solar-battery-bank-size", action: "save_profile" });
  };
  const handoffSolar = () => {
    track("calculator_handoff", { from_calculator_id: "solar-battery-bank-size", to_calculator_id: "solar-panel-output" });
    window.location.href = "/solar/solar-panel-output-calculator";
  };

  return (
    <section className="calculator solar-battery-bank-size-calculator" aria-labelledby="solar-battery-bank-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="solar-battery-bank-heading">Size a solar battery bank</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Battery Bank Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Off-Grid Setups</span>
            <div className="preset-chips-row">
              {QUICK_SOLAR_BATTERY_PRESETS.map((sc) => (
                <button
                  key={sc.label}
                  type="button"
                  className={`preset-chip-btn ${dailyLoadKWh === sc.load && autonomyDays === sc.days && systemVoltage === sc.voltage ? "active" : ""}`}
                  onClick={() => {
                    setDailyLoadKWh(sc.load);
                    setAutonomyDays(sc.days);
                    setAutonomyPreset(String(sc.days));
                    setSystemVoltage(sc.voltage);
                    setVoltagePreset(String(sc.voltage));
                    selectChemistry(sc.chem);
                    try {
                      const res = calculateSolarBatteryBankSize({
                        dailyLoadKWh: sc.load,
                        autonomyDays: sc.days,
                        chemistry: sc.chem,
                        minimumSoc: resolveChemistryReserve(sc.chem, 0.2, false),
                        inverterEfficiency,
                        batteryHealth,
                        designMargin,
                        systemVoltage: sc.voltage,
                      });
                      setCalculation(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculation) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "solar-battery-bank-size", preset: sc.label });
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
                Daily load energy{" "}
                <span className="input-with-unit">
                  <input type="number" min="0.01" step="any" inputMode="decimal" value={dailyLoadKWh} onChange={(event) => markChanged(setDailyLoadKWh, numberOrNaN(event.target.value))} />
                  <span aria-hidden="true">kWh/day</span>
                </span>
              </label>
              <p className="form-hint">Enter the energy your loads use each day. Inverter losses are accounted for separately.</p>
              <label>
                Autonomy{" "}
                <select value={autonomyPreset} onChange={(event) => selectAutonomy(event.target.value)}>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
              {autonomyPreset === "custom" && <label>Custom autonomy days<input type="number" min="0.01" step="any" value={autonomyDays} onChange={(event) => markChanged(setAutonomyDays, numberOrNaN(event.target.value))} /></label>}
              <p className="form-hint">How long the battery should support the entered daily load without meaningful solar or other charging input.</p>
              <label>
                Battery chemistry
                <select value={chemistry} onChange={(event) => selectChemistry(event.target.value)}>
                  {BATTERY_CHEMISTRIES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                System voltage
                <select
                  value={voltagePreset}
                  onChange={(event) => {
                    const value = event.target.value;
                    setVoltagePreset(value);
                    if (value !== "custom") markChanged(setSystemVoltage, Number(value));
                    else if (calculation) setStale(true);
                  }}
                >
                  {BATTERY_VOLTAGE_PRESETS.map((value) => (
                    <option value={String(value)} key={value}>
                      {value} V
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
              </label>
              {voltagePreset === "custom" && (
                <label>
                  Custom system voltage<input type="number" min="0.01" step="any" value={systemVoltage} onChange={(event) => markChanged(setSystemVoltage, numberOrNaN(event.target.value))} />
                  <span className="form-hint">V</span>
                </label>
              )}
              <p className="form-hint">Voltage changes the Ah representation only; it never changes the required kWh.</p>
            </fieldset>
            <details
              open={advancedOpen}
              onToggle={(event) => {
                setAdvancedOpen(event.currentTarget.open);
                if (event.currentTarget.open) track("calculator_advanced_open", { calculator_id: "solar-battery-bank-size" });
              }}
            >
              <summary>Advanced assumptions</summary>
              <fieldset className="input-group advanced-settings">
                <legend>Planning assumptions</legend>
                <label>
                  Minimum SOC (%)
                  <input
                    type="number"
                    min="0"
                    max="99.99"
                    step="any"
                    value={percent(minimumSoc)}
                    onChange={(event) => {
                      setMinimumSoc(numberOrNaN(event.target.value) / 100);
                      setMinimumSocCustomized(true);
                      if (calculation) setStale(true);
                    }}
                  />
                </label>
                <p className="form-hint">Chemistry presets initialize this value, but your saved or edited value remains under your control.</p>
                <label>
                  Inverter efficiency (%)
                  <input type="number" min="0.01" max="100" step="any" value={percent(inverterEfficiency)} onChange={(event) => markChanged(setInverterEfficiency, numberOrNaN(event.target.value) / 100)} />
                </label>
                <p className="form-hint">If your daily energy figure already includes inverter losses or represents battery-side energy, use 100% to avoid counting losses twice.</p>
                <label>
                  Battery health / available capacity (%)
                  <input type="number" min="0.01" max="100" step="any" value={percent(batteryHealth)} onChange={(event) => markChanged(setBatteryHealth, numberOrNaN(event.target.value) / 100)} />
                </label>
                <p className="form-hint">Planning derating only; this tool does not predict aging or degradation.</p>
                <label>
                  Design margin (%)
                  <input type="number" min="0" max="100" step="any" value={percent(designMargin)} onChange={(event) => markChanged(setDesignMargin, numberOrNaN(event.target.value) / 100)} />
                </label>
              </fieldset>
            </details>
            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            {!calculation && <p className="form-hint">Calculate a planning capacity from your daily load and autonomy.</p>}
            <button className="button calculator-submit" type="submit">
              {calculation ? "Recalculate" : "Calculate Battery Bank Size"}
            </button>
          </form>
        </div>
        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Energy capacity estimate</p>
          {!calculation ? (
            <p>Enter your load and calculate to see the recommended stored-energy capacity.</p>
          ) : (
            <>
              <p className="result-lede">Recommended stored-energy capacity</p>
              <p className="result-value">{formatKWh(calculation.result.recommendedKWh)}</p>
              <div style={{ background: "var(--surface, rgba(14, 165, 233, 0.04))", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "0.875rem 1rem", margin: "0.75rem 0 1rem 0" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted, #64748b)", display: "block", marginBottom: "0.5rem" }}>
                  📦 Suggested Hardware Configurations
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0284c7" }}>{Math.max(1, Math.ceil((calculation.result.recommendedKWh * 1000) / (systemVoltage * 100)))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>{systemVoltage}V 100Ah Units<br />({(systemVoltage * 100) / 1000} kWh each)</small>
                  </div>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#16a34a" }}>{Math.max(1, Math.ceil((calculation.result.recommendedKWh * 1000) / 1200))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>12V 100Ah Batteries<br />(1.2 kWh in Series/Parallel)</small>
                  </div>
                  <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.5rem", textAlign: "center" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#d97706" }}>{Math.max(1, Math.ceil(calculation.result.recommendedKWh / 5.12))}×</strong>
                    <small style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>5.12 kWh 48V<br />(Server Rack Units)</small>
                  </div>
                </div>
              </div>
              {stale && <p className="warning" role="status">Inputs changed — recalculate to update this recommendation.</p>}
              <EnergyFlowVisualizer
                batteryKwh={calculation.result.recommendedKWh}
                backupHours={autonomyDays * 24}
                scopeLabel={`${autonomyDays} Day(s) Off-Grid Autonomy`}
                loadWatts={Math.round((dailyLoadKWh * 1000) / 24)}
              />
              <LossWaterfall
                steps={[
                  {
                    label: "Autonomy Load Energy",
                    value: calculation.result.loadEnergyKWh * 1000,
                    unit: "Wh",
                    subtext: `${autonomyDays} day(s) direct appliance energy requirement`,
                  },
                  {
                    label: "Battery-Side Energy Demand",
                    value: (calculation.result.loadEnergyKWh / inverterEfficiency) * 1000,
                    unit: "Wh",
                    subtext: "Energy required from battery bank including inverter conversion",
                    isLoss: true,
                  },
                  {
                    label: "Recommended Bank Capacity",
                    value: calculation.result.recommendedKWh * 1000,
                    unit: "Wh",
                    subtext: "Total nominal battery bank size with reserve and margin",
                    isFinal: true,
                  },
                ]}
              />
              <dl className="result-breakdown">
                <div>
                  <dt>Load energy for autonomy</dt>
                  <dd>{formatKWh(calculation.result.loadEnergyKWh)}</dd>
                </div>
                <div>
                  <dt>Minimum nominal capacity</dt>
                  <dd>{formatKWh(calculation.result.minimumNominalKWh, 3)}</dd>
                </div>
                <div>
                  <dt>Selected voltage equivalent</dt>
                  <dd>
                    {formatAh(calculation.result.selectedVoltageAh)} at {systemVoltage} V
                  </dd>
                </div>
              </dl>
              <section className="comparison">
                <h3>Ah equivalents at common voltages</h3>
                <p className="form-hint">
                  These are capacity equivalents for the same {formatKWh(calculation.result.recommendedKWh)} recommendation, not recommended system voltages.
                </p>
                <dl>
                  {calculation.result.referenceAh.map((item) => (
                    <div key={item.voltage}>
                      <dt>{item.voltage} V</dt>
                      <dd>{formatAh(item.ampHours)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className="comparison">
                <h3>Capacity by autonomy</h3>
                <dl>
                  {calculation.result.autonomyComparisons.map((item) => (
                    <div key={item.autonomyDays} className={item.isSelected ? "current-comparison" : ""}>
                      <dt>
                        {item.isSelected && item.autonomyDays !== 1 && item.autonomyDays !== 2 && item.autonomyDays !== 3
                          ? `Your selection — ${item.autonomyDays} days`
                          : `${item.autonomyDays} day${item.autonomyDays === 1 ? "" : "s"}`}
                      </dt>
                      <dd>{formatKWh(item.recommendedKWh)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className="assumption-summary">
                <h3>Assumptions used</h3>
                <dl>
                  <div>
                    <dt>Daily load</dt>
                    <dd>{dailyLoadKWh} kWh/day, load-side energy</dd>
                  </div>
                  <div>
                    <dt>Autonomy</dt>
                    <dd>
                      {autonomyDays} day{autonomyDays === 1 ? "" : "s"}, without meaningful recharge
                    </dd>
                  </div>
                  <div>
                    <dt>Starting battery SOC</dt>
                    <dd>100%</dd>
                  </div>
                  <div>
                    <dt>Minimum SOC</dt>
                    <dd>{percent(minimumSoc)}%</dd>
                  </div>
                  <div>
                    <dt>Usable SOC window</dt>
                    <dd>{percent(calculation.result.usableSocWindow)}%</dd>
                  </div>
                  <div>
                    <dt>Inverter efficiency</dt>
                    <dd>{percent(inverterEfficiency)}%</dd>
                  </div>
                  <div>
                    <dt>Battery health / available capacity</dt>
                    <dd>{percent(batteryHealth)}%</dd>
                  </div>
                  <div>
                    <dt>Design margin</dt>
                    <dd>{percent(designMargin)}%</dd>
                  </div>
                  <div>
                    <dt>Chemistry</dt>
                    <dd>{chemistryPreset.label} planning preset</dd>
                  </div>
                </dl>
              </section>
              <section className="warning">
                <h3>Capacity check only</h3>
                <p>
                  This estimates stored-energy capacity in kWh and Ah. It does not verify inverter power, surge demand, battery discharge-current limits, BMS limits, C-rate, wiring or installation
                  compatibility.
                </p>
              </section>
              <GooglePreferredBanner />
              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button className="button secondary-button" type="button" onClick={saveProfile}>
                  Save to Energy Profile
                </button>
                <button className="button" type="button" onClick={handoffSolar}>
                  Compare with solar production
                </button>
                <ShareButton title="Solar Battery Bank Size Calculation" />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>
      {calculation && <MobileResultBar label="Recommended Bank Size" value={formatKWh(calculation.result.recommendedKWh)} targetId="calculator-result" />}
    </section>
  );
}

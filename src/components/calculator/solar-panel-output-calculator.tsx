"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AZIMUTH_PRESETS, PVWATTS_ARRAY_TYPES, PVWATTS_MODULE_TYPES, SOLAR_DEFAULTS } from "@/data/solar-defaults";
import { calculatePanelSystemCapacity, summarizeSolarOutput, type NormalizedSolarOutput, type SolarOutputSummary } from "@/lib/calculators/solar-output/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import { calculateSeasonalTilts, getEquatorFacingAzimuth } from "@/lib/calculators/solar-tilt/engine";
import { calculateUsageProfile } from "@/lib/calculators/electricity-usage/engine";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { EmbedModal } from "@/components/calculator/embed-modal";
import { SolarRoofVisualizer } from "@/components/calculator/solar-roof-visualizer";
import { SolarMonthlyYieldChart } from "@/components/charts/solar-monthly-yield";



const QUICK_SYSTEM_PRESETS = [
  { label: "🚐 Camper Van / RV (600W)", kw: 0.6 },
  { label: "🏕️ Off-Grid Cabin (3 kW)", kw: 3.0 },
  { label: "🏠 Townhouse (4.8 kW)", kw: 4.8 },
  { label: "🏡 Suburban Home (8 kW)", kw: 8.0 },
  { label: "🏢 Large All-Electric (12 kW)", kw: 12.0 },
];


type InputMode = "system" | "panels";

type OrientationMode = "preset" | "custom";
type CalculationState = { summary: SolarOutputSummary; provider: NormalizedSolarOutput; capacityKw: number };
const numberOr = (value: string, fallback: number) => { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback; };
const formatNumber = (value: number, digits = 1) => value.toLocaleString(undefined, { maximumFractionDigits: digits });

export function SolarPanelOutputCalculator() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("system");
  const [systemSize, setSystemSize] = useState(5);
  const [panelCount, setPanelCount] = useState(10);
  const [panelWatts, setPanelWatts] = useState(400);
  const [tilt, setTilt] = useState(34);
  const [tiltSource, setTiltSource] = useState<"derived" | "saved" | "user">("derived");
  const [orientationMode, setOrientationMode] = useState<OrientationMode>("preset");
  const [orientation, setOrientation] = useState(180);
  const [azimuthSource, setAzimuthSource] = useState<"derived" | "saved" | "user">("derived");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [moduleType, setModuleType] = useState<number>(SOLAR_DEFAULTS.moduleType);
  const [arrayType, setArrayType] = useState<number>(SOLAR_DEFAULTS.arrayType);
  const [lossesPercent, setLossesPercent] = useState<number>(SOLAR_DEFAULTS.lossesPercent);
  const [dcAcRatio, setDcAcRatio] = useState<number>(SOLAR_DEFAULTS.dcAcRatio);
  const [inverterEfficiencyPercent, setInverterEfficiencyPercent] = useState<number>(SOLAR_DEFAULTS.inverterEfficiencyPercent);
  const [calculation, setCalculation] = useState<CalculationState | null>(null);
  const [stale, setStale] = useState(false);
  const [requestState, setRequestState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [annualUsage, setAnnualUsage] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    try {
      const usage = calculateUsageProfile(profile.usageRows.map((row) => ({ id: row.id, label: row.label, input: { mode: row.mode, watts: row.watts ?? undefined, quantity: row.quantity, hoursPerDay: row.hoursPerDay ?? undefined, daysPerWeek: row.daysPerWeek ?? undefined, dutyCycle: row.dutyCycle, kWhPerCycle: row.kWhPerCycle ?? undefined, cyclesPerWeek: row.cyclesPerWeek ?? undefined, labelKWh: row.labelKWh ?? undefined, labelPeriod: row.labelPeriod ?? undefined } })));
      setAnnualUsage(usage.totalAnnualKWh);
    } catch { setAnnualUsage(null); }
    if (profile.solar.latitude !== null) setLatitude(profile.solar.latitude);
    if (profile.solar.longitude !== null) setLongitude(profile.solar.longitude);
    if (profile.solar.systemCapacityKw !== null) setSystemSize(profile.solar.systemCapacityKw);
    if (profile.solar.tiltDeg !== null) { setTilt(profile.solar.tiltDeg); setTiltSource("saved"); }
    if (profile.solar.azimuthDeg !== null) { setOrientation(profile.solar.azimuthDeg); setAzimuthSource("saved"); setOrientationMode("custom"); }
    initialized.current = true;
  }, []);

  const latitudeValid = latitude !== null && Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
  const longitudeValid = longitude !== null && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
  const capacity = useMemo(() => inputMode === "system" ? systemSize : (Number.isFinite(panelCount) && Number.isFinite(panelWatts) ? panelCount * panelWatts / 1000 : Number.NaN), [inputMode, panelCount, panelWatts, systemSize]);
  const capacityError = inputMode === "system"
    ? (!Number.isFinite(systemSize) || systemSize <= 0 ? "System size must be greater than zero." : null)
    : (!Number.isFinite(panelCount) || !Number.isInteger(panelCount) || panelCount < 1 ? "Panel count must be a positive whole number." : !Number.isFinite(panelWatts) || panelWatts <= 0 ? "Panel wattage must be greater than zero." : !Number.isFinite(capacity) || capacity <= 0 ? "Calculated system size must be greater than zero." : null);
  const tiltError = !Number.isFinite(tilt) || tilt < 0 || tilt > 90 ? "Tilt must be between 0° and 90°." : null;
  const azimuthError = !Number.isFinite(orientation) || orientation < 0 || orientation >= 360 ? "Azimuth must be between 0° and 359.99°." : null;
  const canCalculate = latitudeValid && longitudeValid && !capacityError && !tiltError && !azimuthError;

  const saveSolar = (update: Parameters<ReturnType<typeof createEnergyProfileStore>["patchSolar"]>[0]) => {
    if (initialized.current) createEnergyProfileStore(window.localStorage).patchSolar(update);
  };
  const markStale = () => { if (calculation) setStale(true); };
  const updateLocation = (nextLatitude: number, nextLongitude: number | null = longitude) => {
    setLatitude(nextLatitude); setLongitude(nextLongitude); saveSolar({ latitude: nextLatitude, longitude: nextLongitude });
    if (tiltSource === "derived" && Number.isFinite(nextLatitude) && nextLatitude >= -90 && nextLatitude <= 90) setTilt(calculateSeasonalTilts(nextLatitude).yearRound);
    if (azimuthSource === "derived" && Number.isFinite(nextLatitude) && nextLatitude >= -90 && nextLatitude <= 90) setOrientation(getEquatorFacingAzimuth(nextLatitude).degrees ?? 180);
    markStale();
  };
  const useLocation = () => {
    track("calculator_calculate", { calculator: "solar-panel-output", action: "use_location" });
    if (!navigator.geolocation) { setLocationMessage("Location is not supported in this browser. Enter coordinates manually."); return; }
    setLocationMessage("Detecting your location…");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      updateLocation(Number(coords.latitude.toFixed(4)), Number(coords.longitude.toFixed(4)));
      setLocationMessage("Location applied. You can still edit it manually.");
    }, (error) => setLocationMessage(error.code === error.PERMISSION_DENIED ? "Location permission was denied. Enter coordinates manually." : "Location could not be detected. Enter coordinates manually."), { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  };
  const calculate = async () => {
    if (!canCalculate) { setMessage("Enter valid coordinates and system details before calculating."); return; }
    setRequestState("loading"); setMessage("Calculating modeled solar production…"); setStale(false);
    track("calculator_calculate", { calculator: "solar-panel-output", input_mode: inputMode, used_advanced: advancedOpen });
    try {
      const response = await fetch("/api/solar-production", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ latitude, longitude, systemCapacityKw: capacity, tiltDeg: tilt, azimuthDeg: orientation, moduleType, arrayType, lossesPercent, dcAcRatio, inverterEfficiencyPercent }) });
      if (!response.ok) throw new Error("Updated production could not be modeled. Retry using the current inputs.");
      const provider = await response.json() as NormalizedSolarOutput;
      const summary = summarizeSolarOutput({ systemCapacityKw: capacity, provider, annualElectricityUsageKWh: annualUsage });
      setCalculation({ summary, provider, capacityKw: capacity }); setRequestState("idle"); setMessage("Modeled solar production updated."); setAnnouncement(`Estimated annual solar production ${Math.round(summary.annualAcKWh).toLocaleString()} kilowatt-hours.`);
      saveSolar({ latitude, longitude, systemCapacityKw: capacity, tiltDeg: tilt, azimuthDeg: orientation });
    } catch (error) {
      setRequestState("error"); setStale(Boolean(calculation)); setMessage(error instanceof Error ? error.message : "Updated production could not be modeled. Retry using the current inputs.");
    }
  };
  const orientationLabel = AZIMUTH_PRESETS.find((preset) => preset.value === orientation)?.label ?? "Custom";
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return <section className="calculator solar-output-calculator" aria-labelledby="solar-output-heading">
    <div className="calculator-grid"><div className="calculator-inputs"><h2 id="solar-output-heading">Estimate solar production</h2>

      <div className="preset-chips-container" role="region" aria-label="Quick System Sizes">
        <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Solar Setups</span>
        <div className="preset-chips-row">
          {QUICK_SYSTEM_PRESETS.map((sc) => (
            <button
              key={sc.label}
              type="button"
              className={`preset-chip-btn ${inputMode === "system" && systemSize === sc.kw ? "active" : ""}`}
              onClick={() => {
                setInputMode("system");
                setSystemSize(sc.kw);
                markStale();
                track("calculator_preset_click", { calculator_id: "solar-panel-output", preset: sc.label });
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); void calculate(); }}>
        <fieldset className="input-group"><legend>Location</legend>
          <div className="field-pair"><label>Latitude (°)<input type="number" inputMode="decimal" step="any" value={latitude ?? ""} onChange={(event) => { const value = numberOr(event.target.value, Number.NaN); updateLocation(value); }} /></label><label>Longitude (°)<input type="number" inputMode="decimal" step="any" value={longitude ?? ""} onChange={(event) => { const value = numberOr(event.target.value, Number.NaN); setLongitude(value); saveSolar({ longitude: value }); markStale(); }} /></label></div>
          {!latitudeValid && <p className="form-hint">Latitude must be between -90° and 90°.</p>}{latitudeValid && !longitudeValid && <p className="form-hint">Longitude must be between -180° and 180°.</p>}
          <button type="button" className="button secondary-button" onClick={useLocation}>Use my location</button>{locationMessage && <p className="form-hint" role="status">{locationMessage}</p>}
        </fieldset>
        <fieldset className="input-group"><legend>System</legend><label>Input mode<select value={inputMode} onChange={(event) => { setInputMode(event.target.value as InputMode); markStale(); }}><option value="system">System size</option><option value="panels">Panels × watts</option></select></label>
          {inputMode === "system" ? <label>System size (kW)<input type="number" min="0.01" step="0.01" value={systemSize} onChange={(event) => { setSystemSize(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label> : <div className="field-pair"><label>Panels<input type="number" min="1" step="1" value={panelCount} onChange={(event) => { setPanelCount(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label><label>Panel rating (W)<input type="number" min="0.1" step="any" value={panelWatts} onChange={(event) => { setPanelWatts(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label></div>}
          {capacityError && <p className="error" role="alert">{capacityError}</p>}{inputMode === "panels" && !capacityError && <p className="form-hint">Calculated system size: {capacity.toFixed(2)} kW</p>}
        </fieldset>
        <fieldset className="input-group"><legend>Panel orientation</legend><label>Tilt (°)<input type="number" min="0" max="90" step="any" value={tilt} onChange={(event) => { setTilt(numberOr(event.target.value, Number.NaN)); setTiltSource("user"); markStale(); }} /></label>
          <label>Orientation<select value={orientationMode === "custom" ? "custom" : String(orientation)} onChange={(event) => { const value = event.target.value; if (value === "custom") { setOrientationMode("custom"); setAzimuthSource("user"); } else { setOrientationMode("preset"); setOrientation(Number(value)); setAzimuthSource("user"); } markStale(); }}><option value="180">South / equator-facing</option><option value="0">North</option><option value="90">East</option><option value="270">West</option><option value="custom">Custom</option></select></label>
          {orientationMode === "custom" && <label>Exact azimuth (°)<input type="number" min="0" max="359.99" step="any" value={orientation} onChange={(event) => { setOrientation(numberOr(event.target.value, Number.NaN)); setAzimuthSource("user"); markStale(); }} /></label>}
          {tiltError && <p className="error" role="alert">{tiltError}</p>}{azimuthError && <p className="error" role="alert">{azimuthError}</p>}
        </fieldset>
        <details open={advancedOpen} onToggle={(event) => { setAdvancedOpen(event.currentTarget.open); if (event.currentTarget.open) track("calculator_advanced_open", { calculator: "solar-panel-output" }); }}><summary>Advanced assumptions</summary><div className="input-group"><label>Module type<select value={moduleType} onChange={(event) => { setModuleType(Number(event.target.value)); markStale(); }}>{PVWATTS_MODULE_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>Array type<select value={arrayType} onChange={(event) => { setArrayType(Number(event.target.value)); markStale(); }}>{PVWATTS_ARRAY_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>System losses (%)<input type="number" min="0" max="100" step="1" value={lossesPercent} onChange={(event) => { setLossesPercent(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label><label>DC/AC ratio<input type="number" min="0.1" step="0.1" value={dcAcRatio} onChange={(event) => { setDcAcRatio(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label><label>Inverter efficiency (%)<input type="number" min="1" max="100" step="1" value={inverterEfficiencyPercent} onChange={(event) => { setInverterEfficiencyPercent(numberOr(event.target.value, Number.NaN)); markStale(); }} /></label><p className="form-hint">PVWatts planning assumptions are editable estimates, not product specifications.</p></div></details>
        {!calculation && <p className="form-hint">Add your location to estimate solar production for your {systemSize} kW system.</p>}
        <button className="button calculator-submit" type="submit" disabled={requestState === "loading"}>{requestState === "loading" ? "Calculating…" : calculation ? "Recalculate" : "Calculate Solar Output"}</button>
      </form>
    </div>
    <aside className="result-panel" aria-live="polite"><p className="eyebrow">PVWatts V8 estimate</p>{!calculation ? <p>Enter a valid location and calculate to see modeled solar production.</p> : <><p className="result-lede">Estimated annual solar production</p><p className="result-value">{formatNumber(calculation.summary.annualAcKWh)} kWh/year</p>{stale && <p className="warning" role="status">Previous result — inputs have changed.</p>}
      <SolarRoofVisualizer
        systemKw={calculation.capacityKw}
        panelWatts={panelWatts}
        annualKwh={calculation.summary.annualAcKWh}
      />
      <SolarMonthlyYieldChart
        monthlyKwh={calculation.provider.monthlyAcKWh}
        annualKwh={calculation.summary.annualAcKWh}
      />
      <dl className="result-breakdown">
<div><dt>Average daily production</dt><dd>{formatNumber(calculation.summary.averageDailyKWh, 2)} kWh/day</dd></div><div><dt>Best month</dt><dd>{calculation.summary.bestMonth.label} · {formatNumber(calculation.summary.bestMonth.kWh)} kWh</dd></div><div><dt>Lowest month</dt><dd>{calculation.summary.lowestMonth.label} · {formatNumber(calculation.summary.lowestMonth.kWh)} kWh</dd></div><div><dt>Specific yield</dt><dd>{formatNumber(calculation.summary.specificYieldKWhPerKwYear)} kWh/kW-year</dd></div>{calculation.summary.capacityFactorPercent !== undefined && <div><dt>Capacity factor</dt><dd>{formatNumber(calculation.summary.capacityFactorPercent)}%</dd></div>}<div><dt>Modeled system size</dt><dd>{calculation.capacityKw.toFixed(2)} kW</dd></div></dl>{calculation.summary.coveragePercent !== null && <p className="form-hint">Modeled annual solar production compared with saved annual electricity use: {formatNumber(calculation.summary.coveragePercent)}%.</p>}<section className="scenario-table" aria-label="Monthly solar production"><h3>Production by month</h3><table><caption>PVWatts modeled monthly AC production</caption><thead><tr><th scope="col">Month</th><th scope="col">AC production</th></tr></thead><tbody>{calculation.provider.monthlyAcKWh.map((value, index) => <tr key={monthLabels[index]}><th scope="row">{monthLabels[index]}</th><td>{formatNumber(value)} kWh</td></tr>)}</tbody></table></section><section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Location</dt><dd>{latitude?.toFixed(2)}°, {longitude?.toFixed(2)}°</dd></div><div><dt>Tilt</dt><dd>{tilt.toFixed(1)}°</dd></div><div><dt>Orientation</dt><dd>{orientationLabel} / {orientation.toFixed(1)}°</dd></div><div><dt>System losses</dt><dd>{lossesPercent}%</dd></div><div><dt>Module / array</dt><dd>{PVWATTS_MODULE_TYPES.find((item) => item.value === moduleType)?.label} / {PVWATTS_ARRAY_TYPES.find((item) => item.value === arrayType)?.label}</dd></div><div><dt>Model</dt><dd>PVWatts V8</dd></div></dl></section><p className="warning">This is a modeled historical-weather estimate, not a guarantee of actual production. Shading, weather, equipment and site conditions can change the result.</p>
      <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <ShareButton title="Solar Panel Output Calculation" />
        <PrintSpecButton />
      </div>
      </>}</aside>
<p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement || message}</p></div>
  </section>;

}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AZIMUTH_PRESETS, PVWATTS_ARRAY_TYPES, PVWATTS_MODULE_TYPES, SOLAR_DEFAULTS } from "@/data/solar-defaults";
import { calculateSeasonalTilts, getEquatorFacingAzimuth } from "@/lib/calculators/solar-tilt/engine";
import { calculateSolarPanelSize, normalizeEnergyTargetToAnnual, type EnergyTargetPeriod, type SolarPanelSizeResult } from "@/lib/calculators/solar-panel-size/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { calculateUsageProfile } from "@/lib/calculators/electricity-usage/engine";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";
import type { NormalizedSolarOutput } from "@/lib/calculators/solar-output/engine";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { SolarRoofVisualizer } from "@/components/calculator/solar-roof-visualizer";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";


const QUICK_USAGE_PRESETS = [
  { label: "🌱 350 kWh/mo", value: 350, period: "month" as EnergyTargetPeriod },
  { label: "🏡 800 kWh/mo", value: 800, period: "month" as EnergyTargetPeriod },
  { label: "⚡ 1,500 kWh/mo", value: 1500, period: "month" as EnergyTargetPeriod },
];

type YieldSource = "location" | "manual";

type CalculationState = { result: SolarPanelSizeResult; source: YieldSource; annualTargetKWh: number; provider: NormalizedSolarOutput | null; targetValue: number; targetPeriod: EnergyTargetPeriod; panelWatts: number; designMargin: number; latitude: number | null; longitude: number | null; tilt: number; azimuth: number; lossesPercent: number; dcAcRatio: number; inverterEfficiencyPercent: number; moduleType: number; arrayType: number };

const numberOrNaN = (value: string) => Number(value);
const formatNumber = (value: number, digits = 2) => value.toLocaleString(undefined, { maximumFractionDigits: digits });
const percent = (value: number) => `${formatNumber(value, 1)}%`;

export function SolarPanelSizeCalculator() {
  const [targetValue, setTargetValue] = useState(300);
  const [targetPeriod, setTargetPeriod] = useState<EnergyTargetPeriod>("month");
  const [panelWatts, setPanelWatts] = useState(400);
  const [yieldSource, setYieldSource] = useState<YieldSource>("location");
  const [manualYield, setManualYield] = useState(Number.NaN);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [tilt, setTilt] = useState<number>(SOLAR_DEFAULTS.exampleLatitude);
  const [azimuth, setAzimuth] = useState<number>(180);
  const [tiltSource, setTiltSource] = useState<"derived" | "saved" | "user">("derived");
  const [azimuthSource, setAzimuthSource] = useState<"derived" | "saved" | "user">("derived");
  const [moduleType, setModuleType] = useState(SOLAR_DEFAULTS.moduleType);
  const [arrayType, setArrayType] = useState(SOLAR_DEFAULTS.arrayType);
  const [lossesPercent, setLossesPercent] = useState<number>(SOLAR_DEFAULTS.lossesPercent);
  const [dcAcRatio, setDcAcRatio] = useState<number>(SOLAR_DEFAULTS.dcAcRatio);
  const [inverterEfficiencyPercent, setInverterEfficiencyPercent] = useState<number>(SOLAR_DEFAULTS.inverterEfficiencyPercent);
  const [designMargin, setDesignMargin] = useState(0.1);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [calculation, setCalculation] = useState<CalculationState | null>(null);
  const [stale, setStale] = useState(false);
  const [requestState, setRequestState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    try {
      const usage = calculateUsageProfile(profile.usageRows.map((row) => ({ id: row.id, label: row.label, input: { mode: row.mode, watts: row.watts ?? undefined, quantity: row.quantity, hoursPerDay: row.hoursPerDay ?? undefined, daysPerWeek: row.daysPerWeek ?? undefined, dutyCycle: row.dutyCycle, kWhPerCycle: row.kWhPerCycle ?? undefined, cyclesPerWeek: row.cyclesPerWeek ?? undefined, labelKWh: row.labelKWh ?? undefined, labelPeriod: row.labelPeriod ?? undefined } })));
      if (usage.totalAnnualKWh > 0) { setTargetValue(usage.totalAnnualKWh / 12); setTargetPeriod("month"); setMessage("Energy target loaded from your Energy Profile."); }
    } catch { /* usage profile is optional */ }
    if (profile.solar.latitude !== null && Number.isFinite(profile.solar.latitude)) setLatitude(profile.solar.latitude);
    if (profile.solar.longitude !== null && Number.isFinite(profile.solar.longitude)) setLongitude(profile.solar.longitude);
    if (profile.solar.panelPowerW !== null && Number.isFinite(profile.solar.panelPowerW) && profile.solar.panelPowerW > 0) setPanelWatts(profile.solar.panelPowerW);
    if (profile.solar.tiltDeg !== null && Number.isFinite(profile.solar.tiltDeg)) { setTilt(profile.solar.tiltDeg); setTiltSource("saved"); }
    if (profile.solar.azimuthDeg !== null && Number.isFinite(profile.solar.azimuthDeg)) { setAzimuth(profile.solar.azimuthDeg); setAzimuthSource("saved"); }
    initialized.current = true;
    track("calculator_view", { calculator: "solar-panel-size", category: "solar", phase: 2 });
  }, []);

  const latitudeValid = latitude !== null && Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
  const longitudeValid = longitude !== null && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
  const annualTargetKWh = useMemo(() => { try { return normalizeEnergyTargetToAnnual(targetValue, targetPeriod); } catch { return Number.NaN; } }, [targetPeriod, targetValue]);
  const targetError = !Number.isFinite(targetValue) || targetValue <= 0 ? "Energy target must be greater than zero." : null;
  const panelError = !Number.isFinite(panelWatts) || panelWatts <= 0 ? "Panel wattage must be greater than zero." : null;
  const marginError = !Number.isFinite(designMargin) || designMargin < 0 || designMargin > 1 ? "Design margin must be between 0% and 100%." : null;
  const manualYieldError = yieldSource === "manual" && (!Number.isFinite(manualYield) || manualYield <= 0) ? "Enter a specific yield greater than zero." : null;
  const locationError = yieldSource === "location" && (!latitudeValid || !longitudeValid) ? "Enter a valid latitude and longitude or use your location." : null;
  const canCalculate = !targetError && !panelError && !marginError && !manualYieldError && !locationError && Number.isFinite(annualTargetKWh) && Number.isFinite(tilt) && tilt >= 0 && tilt <= 90 && Number.isFinite(azimuth) && azimuth >= 0 && azimuth < 360;

  const markStale = () => { if (calculation) setStale(true); };
  const updateLocation = (nextLatitude: number, nextLongitude: number | null = longitude) => {
    setLatitude(nextLatitude); setLongitude(nextLongitude); markStale();
    if (tiltSource === "derived" && Number.isFinite(nextLatitude) && nextLatitude >= -90 && nextLatitude <= 90) setTilt(calculateSeasonalTilts(nextLatitude).yearRound);
    if (azimuthSource === "derived" && Number.isFinite(nextLatitude) && nextLatitude >= -90 && nextLatitude <= 90) setAzimuth(getEquatorFacingAzimuth(nextLatitude).degrees ?? 180);
  };
  const useLocation = () => {
    if (!navigator.geolocation) { setLocationMessage("Location is not supported in this browser. Enter coordinates manually."); return; }
    setLocationMessage("Detecting your location…");
    navigator.geolocation.getCurrentPosition(({ coords }) => { updateLocation(Number(coords.latitude.toFixed(4)), Number(coords.longitude.toFixed(4))); setLocationMessage("Location applied. You can still edit it manually."); }, (geoError) => setLocationMessage(geoError.code === geoError.PERMISSION_DENIED ? "Location permission was denied. Enter coordinates manually." : "Location could not be detected. Enter coordinates manually."), { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  };
  const calculate = async () => {
    if (!canCalculate) { setError("Enter valid sizing inputs before calculating."); return; }
    setRequestState("loading"); setError(""); setMessage(yieldSource === "location" ? "Calculating modeled solar yield…" : "Calculating from your manual yield…");
    track("calculator_calculate", { calculator: "solar-panel-size", yield_source: yieldSource, used_advanced: advancedOpen });
    try {
      let specificYield = manualYield;
      let monthly: number[] | undefined;
      let provider: NormalizedSolarOutput | null = null;
      if (yieldSource === "location") {
        const response = await fetch("/api/solar-production", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ latitude, longitude, systemCapacityKw: 1, tiltDeg: tilt, azimuthDeg: azimuth, moduleType, arrayType, lossesPercent, dcAcRatio, inverterEfficiencyPercent }) });
        if (!response.ok) throw new Error("Could not update the solar model. Review the location and settings, then try again.");
        const raw = await response.json() as { annualAcKWh?: number; annualAcKwh?: number; monthlyAcKWh?: number[]; monthlyAcKwh?: number[]; warnings?: string[] };
        provider = { annualAcKWh: raw.annualAcKWh ?? raw.annualAcKwh ?? Number.NaN, monthlyAcKWh: raw.monthlyAcKWh ?? raw.monthlyAcKwh ?? [], warnings: raw.warnings ?? [] };
        specificYield = provider.annualAcKWh;
        monthly = provider.monthlyAcKWh;
      }
      const result = calculateSolarPanelSize({ annualTargetKWh, specificYieldKWhPerKwYear: specificYield, normalizedMonthlyKWhPerKw: monthly, panelWatts, designMargin });
      setCalculation({ result, source: yieldSource, annualTargetKWh, provider, targetValue, targetPeriod, panelWatts, designMargin, latitude, longitude, tilt, azimuth, lossesPercent, dcAcRatio, inverterEfficiencyPercent, moduleType, arrayType }); setStale(false); setRequestState("idle"); setMessage("Solar panel size updated.");
    } catch (calculationError) {
      setRequestState("error"); setStale(Boolean(calculation)); setError(calculationError instanceof Error ? calculationError.message : "Solar sizing could not be calculated.");
    }
  };
  const orientationLabel = AZIMUTH_PRESETS.find((preset) => preset.value === azimuth)?.label ?? "Custom";
  const solarOutputPublished = isCalculatorPublished("solar-panel-output");
  const solarTiltPublished = isCalculatorPublished("solar-panel-tilt");
  const batteryPublished = isCalculatorPublished("solar-battery-bank-size");

  return <section className="calculator solar-panel-size-calculator" aria-labelledby="solar-panel-size-heading">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2 id="solar-panel-size-heading">Size a solar array</h2>

        <div className="preset-chips-container" role="region" aria-label="Quick Energy Targets">
          <span className="preset-chips-label">Quick Usage Targets:</span>
          <div className="preset-chips-row">
            {QUICK_USAGE_PRESETS.map((sc) => (
              <button
                key={sc.label}
                type="button"
                className={`preset-chip-btn ${targetValue === sc.value && targetPeriod === sc.period ? "active" : ""}`}
                onClick={() => {
                  setTargetValue(sc.value);
                  setTargetPeriod(sc.period);
                  markStale();
                  track("calculator_preset_click", { calculator_id: "solar-panel-size", preset: sc.label });
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        <CalculatorTrustPill />

        <form onSubmit={(event) => { event.preventDefault(); void calculate(); }} noValidate>
          <fieldset className="input-group"><legend>Quick inputs</legend>
            <label>Energy target <span className="input-with-unit"><input type="number" min="0.01" step="any" inputMode="decimal" value={Number.isNaN(targetValue) ? "" : targetValue} onChange={(event) => { setTargetValue(numberOrNaN(event.target.value)); markStale(); }} /><span aria-hidden="true">kWh</span></span></label>
            <label>Energy period<select value={targetPeriod} onChange={(event) => { setTargetPeriod(event.target.value as EnergyTargetPeriod); markStale(); }}><option value="day">per day</option><option value="month">per month</option><option value="year">per year</option></select></label>
            {targetError && <p className="error" role="alert">{targetError}</p>}
            <label>Panel wattage <span className="input-with-unit"><input type="number" min="1" step="any" value={Number.isNaN(panelWatts) ? "" : panelWatts} onChange={(event) => { setPanelWatts(numberOrNaN(event.target.value)); markStale(); }} /><span aria-hidden="true">W</span></span></label>
            {panelError && <p className="error" role="alert">{panelError}</p>}
            <label>Yield source<select value={yieldSource} onChange={(event) => { setYieldSource(event.target.value as YieldSource); markStale(); }}><option value="location">Location model / PVWatts</option><option value="manual">Manual specific yield</option></select></label>
            {yieldSource === "manual" ? <><label>Specific solar yield <span className="input-with-unit"><input type="number" min="0.01" step="any" placeholder="Enter a known yield" value={Number.isNaN(manualYield) ? "" : manualYield} onChange={(event) => { setManualYield(numberOrNaN(event.target.value)); markStale(); }} /><span aria-hidden="true">kWh/kW-year</span></span></label><p className="form-hint">Enter the annual solar energy produced per installed kW for your site or estimate.</p>{manualYieldError && <p className="error" role="alert">{manualYieldError}</p>}</> : <fieldset className="input-group"><legend>Location</legend><div className="field-pair"><label>Latitude<input type="number" step="any" value={latitude ?? ""} onChange={(event) => updateLocation(numberOrNaN(event.target.value))} /></label><label>Longitude<input type="number" step="any" value={longitude ?? ""} onChange={(event) => { setLongitude(numberOrNaN(event.target.value)); markStale(); }} /></label></div><button type="button" className="button secondary-button" onClick={useLocation}>Use my location</button>{locationError && <p className="error" role="alert">{locationError}</p>}{locationMessage && <p className="form-hint" role="status">{locationMessage}</p>}</fieldset>}
          </fieldset>
          <details open={advancedOpen} onToggle={(event) => { setAdvancedOpen(event.currentTarget.open); if (event.currentTarget.open) track("calculator_advanced_open", { calculator: "solar-panel-size" }); }}><summary>Advanced assumptions</summary><fieldset className="input-group advanced-settings"><label>Design margin (%)<input type="number" min="0" max="100" step="1" value={designMargin * 100} onChange={(event) => { setDesignMargin(numberOrNaN(event.target.value) / 100); markStale(); }} /></label>{marginError && <p className="error" role="alert">{marginError}</p>}<div className="field-pair"><label>Tilt (°)<input type="number" min="0" max="90" step="any" value={tilt} onChange={(event) => { setTilt(numberOrNaN(event.target.value)); setTiltSource("user"); markStale(); }} /></label><label>Azimuth (°)<input type="number" min="0" max="359.99" step="any" value={azimuth} onChange={(event) => { setAzimuth(numberOrNaN(event.target.value)); setAzimuthSource("user"); markStale(); }} /></label></div><div className="field-pair"><label>Module type<select value={moduleType} onChange={(event) => { setModuleType(Number(event.target.value) as typeof moduleType); markStale(); }}>{PVWATTS_MODULE_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>Array type<select value={arrayType} onChange={(event) => { setArrayType(Number(event.target.value) as typeof arrayType); markStale(); }}>{PVWATTS_ARRAY_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label></div><label>System losses (%)<input type="number" min="0" max="100" step="1" value={lossesPercent} onChange={(event) => { setLossesPercent(numberOrNaN(event.target.value)); markStale(); }} /></label><div className="field-pair"><label>DC/AC ratio<input type="number" min="0.1" step="any" value={dcAcRatio} onChange={(event) => { setDcAcRatio(numberOrNaN(event.target.value)); markStale(); }} /></label><label>Inverter efficiency (%)<input type="number" min="1" max="100" step="1" value={inverterEfficiencyPercent} onChange={(event) => { setInverterEfficiencyPercent(numberOrNaN(event.target.value)); markStale(); }} /></label></div><p className="form-hint">Geometry and PVWatts values are editable planning assumptions, not universal specifications.</p></fieldset></details>
          <button className="button calculator-submit" type="submit" disabled={requestState === "loading"}>{requestState === "loading" ? "Calculating…" : calculation ? "Recalculate" : "Calculate Solar Panel Size"}</button>
        </form>
      </div>
      <aside className="result-panel" aria-live="polite"><p className="eyebrow">Solar array sizing</p>{error && <p className="error" role="alert">{error}</p>}{!calculation ? <p>Enter a valid target and yield source, then calculate to see the required array size.</p> : <><p className="result-lede">Recommended solar array</p><p className="result-value">{formatNumber(calculation.result.recommendedKw)} kW design target</p><p className="result-value-secondary">{calculation.result.panelCount} panels · {formatNumber(calculation.result.installedKw)} kW installed</p><StandardsBadge standards={["NREL PVWatts V8", "IEC 61724", "IEEE 1562"]} />{stale && <p className="warning" role="status">Could not update the solar model. The result below is from your previous assumptions.</p>}
        <SolarRoofVisualizer
          systemKw={calculation.result.installedKw}
          panelCount={calculation.result.panelCount}
          panelWatts={calculation.panelWatts}
          annualKwh={calculation.result.modeledAnnualKWh}
        />
        <dl className="result-breakdown"><div><dt>Base array requirement</dt><dd>{formatNumber(calculation.result.baseRequiredKw)} kW</dd></div><div><dt>Recommended design target</dt><dd>{formatNumber(calculation.result.recommendedKw)} kW</dd></div><div><dt>Installed array after panel rounding</dt><dd>{formatNumber(calculation.result.installedKw)} kW · {calculation.result.panelCount} × {calculation.panelWatts} W</dd></div><div><dt>Modeled annual production</dt><dd>{formatNumber(calculation.result.modeledAnnualKWh, 0)} kWh/year</dd></div><div><dt>Annual energy coverage</dt><dd>{percent(calculation.result.annualEnergyCoveragePercent)}</dd></div></dl><section className="scenario-table"><h3>Panel-count comparisons</h3><table><caption>Panel count at different generic panel wattages</caption><thead><tr><th scope="col">Panel wattage</th><th scope="col">Panel count</th><th scope="col">Installed size</th></tr></thead><tbody>{calculation.result.panelComparisons.map((item) => <tr className={item.isSelected ? "current-comparison" : undefined} key={item.panelWatts}><th scope="row">{item.isSelected && ![350, 400, 450].includes(item.panelWatts) ? `Your selection — ${item.panelWatts} W` : `${item.panelWatts} W`}</th><td>{item.panelCount}</td><td>{formatNumber(item.installedKw)} kW</td></tr>)}</tbody></table></section>{calculation.result.modeledMonthlyKWh && <section className="scenario-table"><h3>Modeled monthly production</h3><table><caption>Scaled monthly production from the normalized provider model</caption><tbody>{calculation.result.modeledMonthlyKWh.map((value, index) => <tr key={index}><th scope="row">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</th><td>{formatNumber(value, 0)} kWh</td></tr>)}</tbody></table></section>}<section className="assumption-summary"><h3>Assumptions used</h3><dl><div><dt>Energy target</dt><dd>{formatNumber(calculation.targetValue)} kWh/{calculation.targetPeriod}</dd></div><div><dt>Solar yield source</dt><dd>{calculation.source === "location" ? "PVWatts V8 — normalized 1 kW model" : "User-provided manual yield"}</dd></div><div><dt>Specific yield</dt><dd>{formatNumber(calculation.result.specificYieldKWhPerKwYear, 0)} kWh/kW-year</dd></div><div><dt>Design margin</dt><dd>{percent(calculation.designMargin)}</dd></div>{calculation.source === "location" && <><div><dt>Coordinates</dt><dd>{calculation.latitude}°, {calculation.longitude}°</dd></div><div><dt>Tilt / azimuth</dt><dd>{formatNumber(calculation.tilt, 1)}° / {AZIMUTH_PRESETS.find((preset) => preset.value === calculation.azimuth)?.label ?? "Custom"} ({formatNumber(calculation.azimuth, 1)}°)</dd></div><div><dt>PVWatts model</dt><dd>{PVWATTS_MODULE_TYPES.find((item) => item.value === calculation.moduleType)?.label} / {PVWATTS_ARRAY_TYPES.find((item) => item.value === calculation.arrayType)?.label}, {calculation.lossesPercent}% losses, {calculation.dcAcRatio} DC/AC, {calculation.inverterEfficiencyPercent}% inverter</dd></div></>}</dl></section><p className="warning">Annual energy matching does not model timing, seasonal variation, nighttime use, exports, imports or battery behavior. Roof area, shading, structural loading, electrical design, battery storage and instantaneous power matching are not sized.</p>
        <GooglePreferredBanner />
        <div className="button-row" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.85rem" }}><ShareButton title="Solar Panel Size Calculation" /><PrintSpecButton />{solarOutputPublished && <Link className="button secondary-button" href="/solar/solar-panel-output-calculator">See detailed solar production</Link>}{solarTiltPublished && <Link className="button secondary-button" href="/solar/solar-panel-tilt-calculator">Check panel angle</Link>}{batteryPublished && <Link className="button secondary-button" href="/solar/solar-battery-bank-size-calculator">Plan battery storage separately</Link>}</div></>}</aside><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{message}</p>
    </div>
  </section>;
}


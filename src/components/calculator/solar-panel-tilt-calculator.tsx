"use client";

import { useEffect, useMemo, useState } from "react";
import { AZIMUTH_PRESETS, PVWATTS_ARRAY_TYPES, PVWATTS_MODULE_TYPES, SOLAR_DEFAULTS } from "@/data/solar-defaults";
import { calculateSeasonalTilts, getEquatorFacingAzimuth, validateLatitude } from "@/lib/calculators/solar-tilt/engine";
import { createEnergyProfileStore } from "@/lib/energy-profile/store";
import { track } from "@/lib/analytics/analytics";
import type { SolarProductionResult } from "@/lib/providers/pvwatts";

const numberOr = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function SolarPanelTiltCalculator() {
  const [latitude, setLatitude] = useState<number>(SOLAR_DEFAULTS.exampleLatitude);
  const [longitude, setLongitude] = useState<number>(SOLAR_DEFAULTS.exampleLongitude);
  const [latitudeTouched, setLatitudeTouched] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [compareRoof, setCompareRoof] = useState(false);
  const [roofTilt, setRoofTilt] = useState<number>(30);
  const [azimuth, setAzimuth] = useState<number>(180);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [systemCapacityKw, setSystemCapacityKw] = useState<number>(SOLAR_DEFAULTS.systemCapacityKw);
  const [moduleType, setModuleType] = useState<number>(SOLAR_DEFAULTS.moduleType);
  const [arrayType, setArrayType] = useState<number>(SOLAR_DEFAULTS.arrayType);
  const [lossesPercent, setLossesPercent] = useState<number>(SOLAR_DEFAULTS.lossesPercent);
  const [dcAcRatio, setDcAcRatio] = useState<number>(SOLAR_DEFAULTS.dcAcRatio);
  const [inverterEfficiencyPercent, setInverterEfficiencyPercent] = useState<number>(SOLAR_DEFAULTS.inverterEfficiencyPercent);
  const [announcement, setAnnouncement] = useState("");
  const [comparison, setComparison] = useState<{ current: SolarProductionResult; recommended: SolarProductionResult } | null>(null);
  const [comparisonState, setComparisonState] = useState<"idle" | "loading" | "error">("idle");
  const [comparisonMessage, setComparisonMessage] = useState("");

  useEffect(() => {
    const profile = createEnergyProfileStore(window.localStorage).read();
    if (profile.solar.latitude !== null) setLatitude(profile.solar.latitude);
    if (profile.solar.longitude !== null) setLongitude(profile.solar.longitude);
    if (profile.solar.tiltDeg !== null) setRoofTilt(profile.solar.tiltDeg);
    if (profile.solar.azimuthDeg !== null) setAzimuth(profile.solar.azimuthDeg);
    if (profile.solar.systemCapacityKw !== null) setSystemCapacityKw(profile.solar.systemCapacityKw);
  }, []);

  const latitudeError = validateLatitude(latitude);
  const longitudeError = !Number.isFinite(longitude) ? "Enter a valid longitude." : longitude < -180 || longitude > 180 ? "Longitude must be between -180° and 180°." : null;
  const tilts = useMemo(() => latitudeError ? null : calculateSeasonalTilts(latitude), [latitude, latitudeError]);
  const orientation = useMemo(() => latitudeError ? null : getEquatorFacingAzimuth(latitude), [latitude, latitudeError]);

  const saveSolar = (update: Parameters<ReturnType<typeof createEnergyProfileStore>["patchSolar"]>[0]) => {
    createEnergyProfileStore(window.localStorage).patchSolar(update);
  };

  const updateLatitude = (value: number) => {
    setLatitude(value);
    setLatitudeTouched(true);
    saveSolar({ latitude: value });
  };

  const useLocation = () => {
    track("calculator_calculate", { calculator: "solar-panel-tilt", action: "use_location" });
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported in this browser. Enter latitude manually.");
      return;
    }
    setLocationMessage("Detecting your location…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        updateLatitude(Number(coords.latitude.toFixed(4)));
        setLongitude(Number(coords.longitude.toFixed(4)));
        saveSolar({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationMessage("Location applied. You can still edit it manually.");
        setAnnouncement("Location applied. Your starting tilt has been updated.");
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. You can enter latitude manually."
          : "Location could not be detected. Enter latitude manually.";
        setLocationMessage(message);
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  };

  const handleRoofToggle = (checked: boolean) => {
    setCompareRoof(checked);
    track("calculator_mode_change", { calculator: "solar-panel-tilt", mode: checked ? "roof-comparison" : "local-estimate" });
  };

  const compareProduction = async () => {
    if (!tilts || !orientation) return;
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      setComparisonState("error");
      setComparisonMessage("Longitude is required for location-based production modeling.");
      return;
    }
    setComparisonState("loading");
    setComparisonMessage("Comparing modeled solar production…");
    setComparison(null);
    track("calculator_calculate", { calculator: "solar-panel-tilt", action: "compare_production" });
    const base = { latitude, longitude, systemCapacityKw, moduleType, arrayType, lossesPercent, dcAcRatio, inverterEfficiencyPercent };
    try {
      const responses = await Promise.all([
        fetch("/api/solar-production", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...base, tiltDeg: roofTilt, azimuthDeg: azimuth }) }),
        fetch("/api/solar-production", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...base, tiltDeg: tilts.yearRound, azimuthDeg: orientation.degrees ?? 180 }) }),
      ]);
      if (responses.some((response) => !response.ok)) throw new Error("Modeled production comparison is unavailable right now.");
      const [current, recommended] = await Promise.all(responses.map((response) => response.json() as Promise<SolarProductionResult>));
      setComparison({ current, recommended });
      setComparisonState("idle");
      setComparisonMessage("Modeled production comparison updated.");
      setAnnouncement(`Modeled comparison: ${Math.round(current.annualAcKwh)} versus ${Math.round(recommended.annualAcKwh)} kilowatt-hours per year.`);
    } catch {
      setComparisonState("error");
      setComparisonMessage("Modeled production comparison is unavailable right now. Your latitude-based tilt result is still valid as a starting estimate.");
    }
  };

  const comparisonDelta = comparison ? comparison.recommended.annualAcKwh - comparison.current.annualAcKwh : 0;
  const comparisonPercent = comparison && comparison.current.annualAcKwh > 0 ? (comparisonDelta / comparison.current.annualAcKwh) * 100 : 0;
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return <div className="calculator solar-tilt-calculator">
    <div className="calculator-grid">
      <div className="calculator-inputs">
        <h2>Find a starting panel angle</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <fieldset className="input-group">
            <legend>Location</legend>
            <label htmlFor="solar-latitude">Latitude <span className="form-hint">Example: 34° N</span>
              <div className="input-with-unit"><input id="solar-latitude" type="number" inputMode="decimal" step="0.01" value={Number.isFinite(latitude) ? latitude : ""} onChange={(event) => updateLatitude(numberOr(event.target.value, Number.NaN))} onBlur={() => setLatitudeTouched(true)} aria-describedby="solar-latitude-help solar-latitude-error" /><span aria-hidden="true">°</span></div>
            </label>
            <p id="solar-latitude-help" className="form-hint">Use a negative value south of the equator.</p>
            {latitudeTouched && latitudeError && <p id="solar-latitude-error" className="error" role="alert">{latitudeError}</p>}
            <label htmlFor="solar-longitude">Longitude <span className="form-hint">Optional for the local tilt estimate</span>
              <div className="input-with-unit"><input id="solar-longitude" type="number" inputMode="decimal" step="0.01" value={Number.isFinite(longitude) ? longitude : ""} onChange={(event) => { const value = numberOr(event.target.value, Number.NaN); setLongitude(value); saveSolar({ longitude: value }); }} /><span aria-hidden="true">°</span></div>
            </label>
            {longitudeError && <p className="error" role="alert">{longitudeError}</p>}
            <button type="button" className="button secondary-button" onClick={useLocation}>Use my location</button>
            {locationMessage && <p className="form-hint" role="status">{locationMessage}</p>}
          </fieldset>

          <fieldset className="input-group">
            <legend>Optional roof comparison</legend>
            <label className="switch-row" htmlFor="compare-roof"><input id="compare-roof" type="checkbox" checked={compareRoof} onChange={(event) => handleRoofToggle(event.target.checked)} /><span>Compare my roof</span></label>
            {compareRoof && <>
              <label htmlFor="roof-tilt">My roof tilt
                <div className="input-with-unit"><input id="roof-tilt" type="number" inputMode="decimal" min="0" max="90" step="1" value={roofTilt} onChange={(event) => { const value = numberOr(event.target.value, roofTilt); setRoofTilt(value); saveSolar({ tiltDeg: value }); }} /><span aria-hidden="true">°</span></div>
              </label>
              <div><span className="field-label">Orientation</span><div className="mode-choice" role="group" aria-label="Roof orientation">{AZIMUTH_PRESETS.map((preset) => <button type="button" className={azimuth === preset.value ? "button" : "text-button"} key={preset.value} onClick={() => { setAzimuth(preset.value); saveSolar({ azimuthDeg: preset.value }); }}>{preset.label}</button>)}</div></div>
              <p className="form-hint">Production comparison will use the roof angle and orientation you enter.</p>
            </>}
          </fieldset>

          <details open={advancedOpen} onToggle={(event) => { const open = event.currentTarget.open; setAdvancedOpen(open); if (open) track("calculator_advanced_open", { calculator: "solar-panel-tilt" }); }}>
            <summary>Advanced assumptions</summary>
            <div className="input-group">
              <label htmlFor="solar-system-size">System size (kW)<input id="solar-system-size" type="number" min="0.01" step="0.1" value={systemCapacityKw} onChange={(event) => { const value = numberOr(event.target.value, systemCapacityKw); setSystemCapacityKw(value); saveSolar({ systemCapacityKw: value }); }} /></label>
              <label htmlFor="solar-module">Module type<select id="solar-module" value={moduleType} onChange={(event) => setModuleType(Number(event.target.value))}>{PVWATTS_MODULE_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
              <label htmlFor="solar-array">Array type<select id="solar-array" value={arrayType} onChange={(event) => setArrayType(Number(event.target.value))}>{PVWATTS_ARRAY_TYPES.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
              <label htmlFor="solar-losses">System losses (%)<input id="solar-losses" type="number" min="0" max="100" step="1" value={lossesPercent} onChange={(event) => setLossesPercent(numberOr(event.target.value, lossesPercent))} /></label>
              <label htmlFor="solar-dcac">DC/AC ratio<input id="solar-dcac" type="number" min="0.1" step="0.1" value={dcAcRatio} onChange={(event) => setDcAcRatio(numberOr(event.target.value, dcAcRatio))} /></label>
              <label htmlFor="solar-inverter">Inverter efficiency (%)<input id="solar-inverter" type="number" min="1" max="100" step="1" value={inverterEfficiencyPercent} onChange={(event) => setInverterEfficiencyPercent(numberOr(event.target.value, inverterEfficiencyPercent))} /></label>
              <label htmlFor="solar-azimuth">Exact roof azimuth (°)<input id="solar-azimuth" type="number" min="0" max="359.99" step="1" value={azimuth} onChange={(event) => { const value = numberOr(event.target.value, azimuth); setAzimuth(value); saveSolar({ azimuthDeg: value }); }} /></label>
              <p className="form-hint">These are editable PVWatts planning defaults, not product specifications.</p>
            </div>
          </details>
        </form>
      </div>

      <aside className="result-panel" aria-labelledby="solar-result-title">
        <h2 id="solar-result-title">Year-round starting tilt</h2>
        {tilts && orientation ? <>
          <p className="result-value">{tilts.yearRound}°</p>
          <p className="result-lede">For latitude {latitude > 0 ? `${latitude}° N` : latitude < 0 ? `${Math.abs(latitude)}° S` : "0° at the equator"}</p>
          <div className="comparison tilt-season-grid"><dl><div><dt>Summer</dt><dd>{tilts.summer}°</dd></div><div className="current-comparison"><dt>Year-round</dt><dd>{tilts.yearRound}°</dd></div><div><dt>Winter</dt><dd>{tilts.winter}°</dd></div></dl></div>
          <dl className="result-breakdown"><div><dt>Face toward</dt><dd>{orientation.label}{orientation.degrees === null ? "" : ` / ${orientation.degrees}°`}</dd></div><div><dt>Method</dt><dd>Latitude starting estimate</dd></div></dl>
          <p className="energy-flow-note form-hint">This is a practical starting estimate, not a universal optimum. Roof shape, shading and local conditions can change the best practical angle.</p>
          {compareRoof && <div className="comparison">
            <h3>Modeled roof comparison</h3>
            <p className="form-hint">Compare your roof with the recommended angle using a normalized {systemCapacityKw} kW system.</p>
            <button type="button" className="button" onClick={compareProduction} disabled={comparisonState === "loading"}>{comparisonState === "loading" ? "Comparing…" : "Compare production"}</button>
            {comparisonMessage && <p className={comparisonState === "error" ? "error" : "form-hint"} role={comparisonState === "error" ? "alert" : "status"}>{comparisonMessage}</p>}
            {comparisonState === "error" && <button type="button" className="text-button" onClick={compareProduction}>Retry comparison</button>}
            {comparison && <>
              <dl><div><dt>Current roof</dt><dd>{Math.round(comparison.current.annualAcKwh).toLocaleString()} kWh/year</dd></div><div><dt>Recommended tilt</dt><dd>{Math.round(comparison.recommended.annualAcKwh).toLocaleString()} kWh/year</dd></div><div><dt>Potential difference</dt><dd>{comparisonDelta >= 0 ? "+" : ""}{Math.round(comparisonDelta).toLocaleString()} kWh/year ({comparisonPercent >= 0 ? "+" : ""}{comparisonPercent.toFixed(2)}%)</dd></div></dl>
              <div className="scenario-table"><table><caption>Monthly modeled comparison</caption><thead><tr><th scope="col">Month</th><th scope="col">Current roof</th><th scope="col">Recommended</th></tr></thead><tbody>{monthLabels.map((month, index) => <tr key={month}><th scope="row">{month}</th><td>{Math.round(comparison.current.monthlyAcKwh[index] ?? 0)} kWh</td><td>{Math.round(comparison.recommended.monthlyAcKwh[index] ?? 0)} kWh</td></tr>)}</tbody></table></div>
            </>}
          </div>}
        </> : <p className="error" role="alert">Enter a latitude between -90° and 90° to see the estimate.</p>}
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </aside>
    </div>
  </div>;
}

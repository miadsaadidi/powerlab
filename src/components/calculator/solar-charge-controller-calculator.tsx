"use client";

import { useEffect, useState } from "react";
import { CHARGE_CONTROLLER_DEFAULTS, QUICK_CHARGE_CONTROLLER_PRESETS } from "@/data/charge-controller-defaults";
import { calculateSolarChargeController, type SolarChargeControllerResult } from "@/lib/calculators/solar-charge-controller/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

export function SolarChargeControllerCalculator() {
  const [tech, setTech] = useState<"mppt" | "pwm">(CHARGE_CONTROLLER_DEFAULTS.technology);
  const [panelWatts, setPanelWatts] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.panelWatts);
  const [panelCount, setPanelCount] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.panelCount);
  const [batteryVoltage, setBatteryVoltage] = useState<12 | 24 | 48>(CHARGE_CONTROLLER_DEFAULTS.batteryVoltage);
  const [panelVoc, setPanelVoc] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.panelVoc);
  const [panelIsc, setPanelIsc] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.panelIsc);
  const [seriesCount, setSeriesCount] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.seriesCount);
  const [parallelCount, setParallelCount] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.parallelCount);
  const [minWinterTemp, setMinWinterTemp] = useState<number>(CHARGE_CONTROLLER_DEFAULTS.minWinterTempCelsius);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<SolarChargeControllerResult | null>(() => {
    try {
      return calculateSolarChargeController({
        technology: CHARGE_CONTROLLER_DEFAULTS.technology,
        panelWatts: CHARGE_CONTROLLER_DEFAULTS.panelWatts,
        panelCount: CHARGE_CONTROLLER_DEFAULTS.panelCount,
        batteryVoltage: CHARGE_CONTROLLER_DEFAULTS.batteryVoltage,
        panelVoc: CHARGE_CONTROLLER_DEFAULTS.panelVoc,
        panelIsc: CHARGE_CONTROLLER_DEFAULTS.panelIsc,
        seriesCount: CHARGE_CONTROLLER_DEFAULTS.seriesCount,
        parallelCount: CHARGE_CONTROLLER_DEFAULTS.parallelCount,
        minWinterTempCelsius: CHARGE_CONTROLLER_DEFAULTS.minWinterTempCelsius,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "solar-charge-controller", category: "solar", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateSolarChargeController({
        technology: tech,
        panelWatts,
        panelCount,
        batteryVoltage,
        panelVoc,
        panelIsc,
        seriesCount,
        parallelCount,
        minWinterTempCelsius: minWinterTemp,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "solar-charge-controller", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate charge controller size."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("tech", tech);
    url.searchParams.set("w", String(panelWatts));
    url.searchParams.set("n", String(panelCount));
    url.searchParams.set("bv", String(batteryVoltage));
    url.searchParams.set("s", String(seriesCount));
    url.searchParams.set("p", String(parallelCount));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Size MPPT &amp; PWM Solar Charge Controllers</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Array Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Solar Setups</span>
            <div className="preset-chips-row">
              {QUICK_CHARGE_CONTROLLER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${panelWatts === p.watts && panelCount === p.count && batteryVoltage === p.battV ? "active" : ""}`}
                  onClick={() => {
                    setTech(p.tech);
                    setPanelWatts(p.watts);
                    setPanelCount(p.count);
                    setSeriesCount(p.series);
                    setParallelCount(p.parallel);
                    setPanelVoc(p.voc);
                    setPanelIsc(p.isc);
                    setBatteryVoltage(p.battV);
                    setMinWinterTemp(p.minTemp);
                    try {
                      const res = calculateSolarChargeController({
                        technology: p.tech,
                        panelWatts: p.watts,
                        panelCount: p.count,
                        batteryVoltage: p.battV,
                        panelVoc: p.voc,
                        panelIsc: p.isc,
                        seriesCount: p.series,
                        parallelCount: p.parallel,
                        minWinterTempCelsius: p.minTemp,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "solar-charge-controller", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorTrustPill />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Controller Type &amp; Battery Bank</legend>
              <div className="field-pair">
                <label htmlFor="scc-tech">
                  Controller Technology
                  <select
                    id="scc-tech"
                    value={tech}
                    onChange={(e) => {
                      setTech(e.target.value as "mppt" | "pwm");
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="mppt">MPPT (Maximum Power Point Tracking · High Efficiency)</option>
                    <option value="pwm">PWM (Pulse Width Modulation · Budget/Small Arrays)</option>
                  </select>
                </label>

                <label htmlFor="scc-batt-v">
                  Battery Bank Voltage
                  <select
                    id="scc-batt-v"
                    value={batteryVoltage}
                    onChange={(e) => {
                      setBatteryVoltage(Number(e.target.value) as 12 | 24 | 48);
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="12">12 Volts DC (Van / RV / Small Off-Grid)</option>
                    <option value="24">24 Volts DC (Cabin / Medium Off-Grid)</option>
                    <option value="48">48 Volts DC (Home Storage / Server Rack)</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>Solar Panel Specifications</legend>
              <div className="field-pair">
                <label htmlFor="scc-p-watts">
                  Individual Panel Wattage (W)
                  <input
                    id="scc-p-watts"
                    type="number"
                    min="50"
                    step="10"
                    value={panelWatts}
                    onChange={(e) => {
                      setPanelWatts(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>

                <label htmlFor="scc-p-count">
                  Total Number of Panels
                  <input
                    id="scc-p-count"
                    type="number"
                    min="1"
                    max="48"
                    value={panelCount}
                    onChange={(e) => {
                      setPanelCount(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>

              <div className="field-pair">
                <label htmlFor="scc-series">
                  Panels Wired in Series (per String)
                  <input
                    id="scc-series"
                    type="number"
                    min="1"
                    max="12"
                    value={seriesCount}
                    onChange={(e) => {
                      setSeriesCount(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>

                <label htmlFor="scc-parallel">
                  Parallel Strings
                  <input
                    id="scc-parallel"
                    type="number"
                    min="1"
                    max="12"
                    value={parallelCount}
                    onChange={(e) => {
                      setParallelCount(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced electrical specs (Voc, Isc &amp; Winter Temp)
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Electrical Datasheet Specs &amp; Climate</legend>
                <div className="field-pair">
                  <label htmlFor="scc-voc">
                    Panel Open-Circuit Voltage (Voc @ 25°C)
                    <input
                      id="scc-voc"
                      type="number"
                      min="10"
                      step="0.1"
                      value={panelVoc}
                      onChange={(e) => {
                        setPanelVoc(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                  <label htmlFor="scc-isc">
                    Panel Short-Circuit Current (Isc @ 25°C)
                    <input
                      id="scc-isc"
                      type="number"
                      min="1"
                      step="0.1"
                      value={panelIsc}
                      onChange={(e) => {
                        setPanelIsc(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
                  </label>
                </div>

                <div className="field-pair">
                  <label htmlFor="scc-winter-temp">
                    Lowest Expected Winter Temperature
                    <select
                      id="scc-winter-temp"
                      value={minWinterTemp}
                      onChange={(e) => {
                        setMinWinterTemp(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="10">+10°C / 50°F (Tropical / Sunbelt)</option>
                      <option value="0">0°C / 32°F (Mild Winter)</option>
                      <option value="-10">-10°C / 14°F (Standard Winter)</option>
                      <option value="-20">-20°C / -4°F (Cold Climate)</option>
                      <option value="-35">-35°C / -31°F (Extreme Arctic / Alpine)</option>
                    </select>
                  </label>
                </div>
              </fieldset>
            )}

            {error && (
              <p className="error" role="alert">
                {error.message}
              </p>
            )}
            <button className="button calculator-submit" type="submit">
              {calculated ? "Recalculate" : "Calculate Controller Size"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Hardware Recommendation</p>
          {!calculated ? (
            <p>Enter array configuration to size solar charge controller.</p>
          ) : (
            <>
              <p className="result-lede">Recommended Charge Controller Class</p>
              <p className="result-value" style={{ color: "#0284c7", fontSize: "1.6rem" }}>
                {calculated.result.recommendedModelClass}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {calculated.result.totalArrayWatts}W Array on {calculated.result.nominalBatteryVoltage}V Battery Bank
              </p>
              <StandardsBadge standards={["NEC 2023 Article 690.7", "IEC 62109-1", "UL 1741"]} />

              {stale && <p className="warning">Inputs changed — recalculate to refresh recommendation.</p>}

              {/* Cold Voc Safety Headroom Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Max Cold-Weather Voltage:</span>
                  <strong style={{ color: "#f59e0b" }}>{calculated.result.worstCaseColdVoc} V (Voc)</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Controller Max PV Input Limit:</span>
                  <strong>{calculated.result.recommendedMaxVoltageRating} V Max</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontWeight: 600, fontSize: "0.85rem" }}>
                  <span>Voltage Safety Headroom:</span>
                  <span>+{calculated.result.voltageSafetyHeadroomVolts} V Safe Margin</span>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Charging Current to Battery</dt>
                  <dd><strong>{calculated.result.requiredChargeCurrentAmps} A</strong> (with 125% safety margin)</dd>
                </div>
                <div>
                  <dt>Nominal Array Voltage (25°C)</dt>
                  <dd>{calculated.result.nominalArrayVoc25C} V</dd>
                </div>
                <div>
                  <dt>Total Array Short-Circuit (Isc)</dt>
                  <dd>{calculated.result.arrayTotalIscAmps} A</dd>
                </div>
                <div>
                  <dt>Recommended Fuse on Battery Line</dt>
                  <dd>{Math.ceil(calculated.result.recommendedControllerAmps * 1.25)} A DC Fuse</dd>
                </div>
              </dl>

              <GooglePreferredBanner />

              <div className="button-row" style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && <MobileResultBar label="Recommended Controller" value={calculated.result.recommendedModelClass} targetId="calculator-result" />}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { V2L_DEFAULTS, QUICK_V2L_PRESETS } from "@/data/v2l-defaults";
import { calculateV2lRuntime, type V2lRuntimeResult } from "@/lib/calculators/v2l-runtime/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

export function V2lRuntimeCalculator() {
  const [capacityKwh, setCapacityKwh] = useState<number>(V2L_DEFAULTS.batteryCapacityKwh);
  const [startingSoc, setStartingSoc] = useState<number>(V2L_DEFAULTS.startingSocPercent);
  const [reservePercent, setReservePercent] = useState<number>(V2L_DEFAULTS.drivingReservePercent);
  const [loadWatts, setLoadWatts] = useState<number>(V2L_DEFAULTS.averageLoadWatts);
  const [maxV2lWatts, setMaxV2lWatts] = useState<number>(V2L_DEFAULTS.v2lMaxOutputWatts);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<V2lRuntimeResult | null>(() => {
    try {
      return calculateV2lRuntime({
        batteryCapacityKwh: V2L_DEFAULTS.batteryCapacityKwh,
        startingSocPercent: V2L_DEFAULTS.startingSocPercent,
        drivingReservePercent: V2L_DEFAULTS.drivingReservePercent,
        averageLoadWatts: V2L_DEFAULTS.averageLoadWatts,
        v2lMaxOutputWatts: V2L_DEFAULTS.v2lMaxOutputWatts,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "v2l-runtime", category: "ev", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateV2lRuntime({
        batteryCapacityKwh: capacityKwh,
        startingSocPercent: startingSoc,
        drivingReservePercent: reservePercent,
        averageLoadWatts: loadWatts,
        v2lMaxOutputWatts: maxV2lWatts,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "v2l-runtime", used_advanced: advancedOpen });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate V2L runtime."));
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("cap", String(capacityKwh));
    url.searchParams.set("soc", String(startingSoc));
    url.searchParams.set("res", String(reservePercent));
    url.searchParams.set("load", String(loadWatts));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Calculate EV Emergency Backup Runtime (V2L / V2H)</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick V2L Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 EV Outage Setups</span>
            <div className="preset-chips-row">
              {QUICK_V2L_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`preset-chip-btn ${capacityKwh === p.cap && loadWatts === p.load ? "active" : ""}`}
                  onClick={() => {
                    setCapacityKwh(p.cap);
                    setStartingSoc(p.soc);
                    setReservePercent(p.reserve);
                    setLoadWatts(p.load);
                    setMaxV2lWatts(p.maxOutput);
                    try {
                      const res = calculateV2lRuntime({
                        batteryCapacityKwh: p.cap,
                        startingSocPercent: p.soc,
                        drivingReservePercent: p.reserve,
                        averageLoadWatts: p.load,
                        v2lMaxOutputWatts: p.maxOutput,
                      });
                      setCalculated(res);
                      setStale(false);
                      setError(null);
                    } catch {
                      if (calculated) setStale(true);
                    }
                    track("calculator_preset_click", { calculator_id: "v2l-runtime", preset: p.label });
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            noValidate
          >
            <fieldset className="input-group">
              <legend>Electric Vehicle Battery &amp; Charge</legend>
              <div className="field-pair">
                <label htmlFor="v2l-cap">
                  Usable Battery Capacity (kWh)
                  <input
                    id="v2l-cap"
                    type="number"
                    min="20"
                    max="220"
                    step="0.5"
                    value={capacityKwh}
                    onChange={(e) => {
                      setCapacityKwh(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>

                <label htmlFor="v2l-soc">
                  Current Battery Charge (SOC %)
                  <input
                    id="v2l-soc"
                    type="number"
                    min="10"
                    max="100"
                    step="5"
                    value={startingSoc}
                    onChange={(e) => {
                      setStartingSoc(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="input-group">
              <legend>Emergency Home Load &amp; Driving Buffer</legend>
              <div className="field-pair">
                <label htmlFor="v2l-load">
                  Average Connected Power (Watts)
                  <input
                    id="v2l-load"
                    type="number"
                    min="50"
                    max="9600"
                    step="50"
                    value={loadWatts}
                    onChange={(e) => {
                      setLoadWatts(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  />
                </label>

                <label htmlFor="v2l-reserve">
                  Protected Driving Reserve (%)
                  <select
                    id="v2l-reserve"
                    value={reservePercent}
                    onChange={(e) => {
                      setReservePercent(Number(e.target.value));
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="10">10% Reserve (~25 Miles)</option>
                    <option value="15">15% Reserve (~38 Miles)</option>
                    <option value="20">20% Reserve (~50 Miles · Recommended)</option>
                    <option value="30">30% Reserve (~75 Miles · Heavy Buffer)</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced vehicle socket limits
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>V2L Output Limit</legend>
                <div className="field-pair">
                  <label htmlFor="v2l-max-out">
                    Vehicle Maximum V2L Socket Power (Watts)
                    <select
                      id="v2l-max-out"
                      value={maxV2lWatts}
                      onChange={(e) => {
                        setMaxV2lWatts(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="1900">1,900 Watts (Standard 120V 16A North American V2L)</option>
                      <option value="3600">3,600 Watts (230V 16A European / Ioniq 5 / EV6)</option>
                      <option value="7200">7,200 Watts (Ford Pro Power 240V 30A)</option>
                      <option value="9600">9,600 Watts (Ford F-150 Lightning / Cybertruck 40A)</option>
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
              {calculated ? "Recalculate" : "Calculate V2L Runtime"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Emergency Outage Duration</p>
          {!calculated ? (
            <p>Enter EV battery capacity and load to calculate backup duration.</p>
          ) : (
            <>
              <p className="result-lede">Total Outage Backup Runtime</p>
              <p className="result-value" style={{ color: "#10b981", fontSize: "1.8rem" }}>
                {calculated.result.totalRuntimeDays} Days
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "1rem" }}>
                {calculated.result.totalRuntimeHours} Hours Continuous Power at {calculated.result.averageLoadWatts}W
              </p>

              {stale && <p className="warning">Inputs changed — recalculate to refresh results.</p>}

              {/* Driving Range Safeguard Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>🚗 Preserved Driving Range:</span>
                  <strong style={{ color: "#0284c7" }}>~{calculated.result.preservedDrivingRangeMiles} Miles</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
                  <span>Emergency Reserve Energy:</span>
                  <span>{calculated.result.reserveEnergyKwh} kWh ({reservePercent}%)</span>
                </div>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Usable Backup Energy Available</dt>
                  <dd>{calculated.result.deliveredAcEnergyKwh} kWh AC</dd>
                </div>
                <div>
                  <dt>Starting Battery Energy</dt>
                  <dd>{calculated.result.startingEnergyKwh} kWh ({startingSoc}%)</dd>
                </div>
                <div>
                  <dt>Connected Power Load</dt>
                  <dd>{calculated.result.averageLoadWatts} W</dd>
                </div>
                <div>
                  <dt>Socket Overload Status</dt>
                  <dd style={{ color: calculated.result.isOverloaded ? "#ef4444" : "#10b981" }}>
                    {calculated.result.isOverloaded ? "⚠️ Overloaded" : "🟢 Safe Within Limit"}
                  </dd>
                </div>
              </dl>

              {/* Day by Day Discharge Timeline */}
              <section className="comparison" style={{ marginTop: "1.25rem" }}>
                <h3>Outage Discharge Timeline</h3>
                <div style={{ overflowX: "auto", fontSize: "0.85rem", maxHeight: "200px" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border-color, #cbd5e1)" }}>
                        <th style={{ padding: "0.4rem" }}>Timeline</th>
                        <th style={{ padding: "0.4rem" }}>Battery Remaining</th>
                        <th style={{ padding: "0.4rem" }}>SOC (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculated.result.dischargeTimeline.map((row) => (
                        <tr
                          key={row.day}
                          style={{
                            borderBottom: "1px solid var(--border-color, #e2e8f0)",
                            color: row.socPercent <= reservePercent ? "#f59e0b" : "inherit",
                          }}
                        >
                          <td style={{ padding: "0.35rem 0.4rem" }}>{row.day === 0 ? "Outage Start" : `Day ${row.day}`}</td>
                          <td style={{ padding: "0.35rem 0.4rem" }}>{row.remainingKwh} kWh</td>
                          <td style={{ padding: "0.35rem 0.4rem", fontWeight: 600 }}>{row.socPercent}% {row.socPercent <= reservePercent && "🛡️"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && <MobileResultBar label="V2L Outage Runtime" value={`${calculated.result.totalRuntimeDays} Days`} targetId="calculator-result" />}
    </section>
  );
}

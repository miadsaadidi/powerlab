"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INVERTER_APPLIANCES, QUICK_INVERTER_PRESETS, type InverterAppliancePreset } from "@/data/inverter-defaults";
import { calculateInverterSize, type InverterLoadItem, type InverterSizeResult } from "@/lib/calculators/inverter-size/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";
import { GooglePreferredBanner } from "@/components/calculator/google-preferred-banner";
import { CalculatorTrustPill } from "@/components/calculator/calculator-trust-pill";
import { StandardsBadge } from "@/components/calculator/standards-badge";

export function InverterSizeCalculator() {
  const [selectedItems, setSelectedItems] = useState<InverterLoadItem[]>([
    { id: "fridge-120v", label: "Residential Refrigerator", runningWatts: 150, surgeWatts: 1200, quantity: 1 },
    { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, surgeWatts: 1000, quantity: 1 },
    { id: "laptop", label: "Laptop & Monitors", runningWatts: 90, surgeWatts: 90, quantity: 1 },
    { id: "starlink", label: "Starlink Satellite & Router", runningWatts: 65, surgeWatts: 95, quantity: 1 },
  ]);

  const [batteryVoltage, setBatteryVoltage] = useState<12 | 24 | 48>(12);
  const [headroom, setHeadroom] = useState<number>(0.20);
  const [efficiency, setEfficiency] = useState<number>(90);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<InverterSizeResult | null>(() => {
    try {
      return calculateInverterSize({
        appliances: [
          { id: "fridge-120v", label: "Residential Refrigerator", runningWatts: 150, surgeWatts: 1200, quantity: 1 },
          { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, surgeWatts: 1000, quantity: 1 },
          { id: "laptop", label: "Laptop & Monitors", runningWatts: 90, surgeWatts: 90, quantity: 1 },
          { id: "starlink", label: "Starlink Satellite & Router", runningWatts: 65, surgeWatts: 95, quantity: 1 },
        ],
        batteryVoltage: 12,
        inverterEfficiencyPercent: 90,
        safetyHeadroomFraction: 0.20,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "inverter-size", category: "battery", phase: 5 });
  }, []);

  const calculate = () => {
    try {
      const res = calculateInverterSize({
        appliances: selectedItems,
        batteryVoltage,
        inverterEfficiencyPercent: efficiency,
        safetyHeadroomFraction: headroom,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
      track("calculator_calculate", { calculator_id: "inverter-size", count: selectedItems.length });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate inverter size."));
    }
  };

  const addItem = (preset: InverterAppliancePreset) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === preset.id);
      if (existing) {
        return prev.map((item) => (item.id === preset.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: preset.id, label: preset.label, runningWatts: preset.runningWatts, surgeWatts: preset.surgeWatts, quantity: 1 }];
    });
    if (calculated) setStale(true);
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    if (calculated) setStale(true);
  };

  const updateItemQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setSelectedItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
    if (calculated) setStale(true);
  };

  const applyPreset = (presetIndex: number) => {
    const p = QUICK_INVERTER_PRESETS[presetIndex];
    setBatteryVoltage(p.battV);
    const newItems: InverterLoadItem[] = [
      { id: "preset-running", label: `${p.label} (Combined Load)`, runningWatts: p.running, surgeWatts: p.surge, quantity: 1 },
    ];
    setSelectedItems(newItems);
    try {
      const res = calculateInverterSize({
        appliances: newItems,
        batteryVoltage: p.battV,
        inverterEfficiencyPercent: efficiency,
        safetyHeadroomFraction: headroom,
      });
      setCalculated(res);
      setStale(false);
      setError(null);
    } catch {
      if (calculated) setStale(true);
    }
    track("calculator_preset_click", { calculator_id: "inverter-size", preset: p.label });
  };

  const filteredCatalog = INVERTER_APPLIANCES.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = search === "" || item.label.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const itemStr = selectedItems.map((i) => `${i.id}:${i.quantity}`).join(",");
    url.searchParams.set("items", itemStr);
    url.searchParams.set("bv", String(batteryVoltage));
    url.searchParams.set("headroom", String(headroom));
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Size Inverter by Appliance Wattage</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Inverter Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Inverter Setups</span>
            <div className="preset-chips-row">
              {QUICK_INVERTER_PRESETS.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  className="preset-chip-btn"
                  onClick={() => applyPreset(idx)}
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
              <legend>Battery Bank System Voltage</legend>
              <div className="field-pair">
                <label htmlFor="inv-batt-v">
                  Battery Voltage
                  <select
                    id="inv-batt-v"
                    value={batteryVoltage}
                    onChange={(e) => {
                      setBatteryVoltage(Number(e.target.value) as 12 | 24 | 48);
                      if (calculated) setStale(true);
                    }}
                  >
                    <option value="12">12 Volts DC (Camper Van / RV / Standard Lead &amp; LFP)</option>
                    <option value="24">24 Volts DC (Medium Off-Grid / Tiny House)</option>
                    <option value="48">48 Volts DC (Whole Home / Server Rack Battery)</option>
                  </select>
                </label>
              </div>
            </fieldset>

            {/* Selected Appliances Checklist */}
            <fieldset className="input-group">
              <legend>Connected AC Appliances ({selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items)</legend>
              {selectedItems.length === 0 ? (
                <p className="form-hint" style={{ color: "#ef4444" }}>
                  Your appliance list is empty. Add items from the catalog below.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.8rem",
                        background: "var(--card-bg, #f8fafc)",
                        border: "1px solid var(--border-color, #e2e8f0)",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div>
                        <strong style={{ display: "block", fontSize: "0.95rem" }}>{item.label}</strong>
                        <small style={{ color: "var(--text-muted, #64748b)" }}>
                          {item.runningWatts}W Running · {item.surgeWatts}W Surge
                        </small>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <label htmlFor={`inv-qty-${item.id}`} className="sr-only">Quantity</label>
                        <input
                          id={`inv-qty-${item.id}`}
                          type="number"
                          min="1"
                          max="20"
                          value={item.quantity}
                          onChange={(e) => updateItemQty(item.id, Number(e.target.value))}
                          style={{ width: "55px", padding: "0.3rem", textAlign: "center" }}
                        />
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => removeItem(item.id)}
                          style={{ color: "#ef4444", fontSize: "0.85rem", marginLeft: "0.25rem" }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>

            {/* Appliance Catalog */}
            <fieldset className="input-group">
              <legend>Add Appliances to Inverter Load</legend>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {["All", "Kitchen", "Electronics", "Comfort", "Tools & Pumps"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`preset-chip-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <input
                type="search"
                placeholder="Search appliances (e.g. fridge, microwave, laptop)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", marginBottom: "0.75rem", padding: "0.5rem 0.75rem" }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "0.5rem",
                  maxHeight: "220px",
                  overflowY: "auto",
                  padding: "0.25rem",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  borderRadius: "0.5rem",
                }}
              >
                {filteredCatalog.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => addItem(preset)}
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      borderRadius: "0.35rem",
                      border: "1px solid var(--border-color, #cbd5e1)",
                      background: "var(--card-bg, #ffffff)",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span style={{ fontWeight: 600, display: "block" }}>+ {preset.label}</span>
                    <small style={{ color: "var(--text-muted, #64748b)" }}>
                      {preset.runningWatts}W / {preset.surgeWatts}W
                    </small>
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced safety headroom &amp; efficiency
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Headroom &amp; Efficiency</legend>
                <div className="field-pair">
                  <label htmlFor="inv-headroom">
                    Safety Headroom Margin
                    <select
                      id="inv-headroom"
                      value={String(headroom)}
                      onChange={(e) => {
                        setHeadroom(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="0.10">10% Headroom</option>
                      <option value="0.20">20% Headroom (Standard Recommendation)</option>
                      <option value="0.30">30% Headroom (Heavy Inductive Motors)</option>
                    </select>
                  </label>
                  <label htmlFor="inv-eff">
                    Inverter Efficiency (%)
                    <input
                      id="inv-eff"
                      type="number"
                      min="70"
                      max="98"
                      value={efficiency}
                      onChange={(e) => {
                        setEfficiency(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    />
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
              {calculated ? "Recalculate" : "Calculate Inverter Size"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Inverter Sizing Recommendation</p>
          {!calculated ? (
            <p>Add appliances to calculate required inverter wattage.</p>
          ) : (
            <>
              <p className="result-lede">Recommended Inverter Rating</p>
              <p className="result-value" style={{ color: "#0284c7", fontSize: "1.6rem" }}>
                {calculated.result.recommendedInverterClass}
              </p>
              <p className="result-subtext" style={{ fontWeight: 600, marginTop: "-0.25rem", marginBottom: "0.5rem" }}>
                {calculated.result.totalRunningWatts}W Running Load on {calculated.result.batteryVoltage}V DC Battery
              </p>
              <StandardsBadge standards={["NEC 2023 Art. 445/706", "UL 1741", "IEEE 1547"]} />

              {stale && <p className="warning">Appliance list changed — recalculate to refresh results.</p>}

              {/* DC Current & Safety Card */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Max DC Battery Current:</span>
                  <strong style={{ color: "#f59e0b" }}>{calculated.result.maxContinuousDcAmps} Amps DC</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span>Recommended DC Fuse:</span>
                  <strong>{calculated.result.recommendedDcFuseAmps} A Class-T / ANL</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#0284c7", fontWeight: 600, fontSize: "0.85rem" }}>
                  <span>Minimum Battery Cable:</span>
                  <span>{calculated.result.recommendedBatteryCableGauge} Copper</span>
                </div>
              </div>

              {/* Next Step Engineering Handoff */}
              <div style={{ margin: "0.75rem 0 1rem", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", background: "rgba(2, 132, 199, 0.08)", border: "1px solid rgba(2, 132, 199, 0.2)", fontSize: "0.84rem" }}>
                <span style={{ fontWeight: 700, color: "#0284c7" }}>⚡ Wire Sizing Next Step: </span>
                <span>Drawing {calculated.result.maxContinuousDcAmps}A DC? Check one-way cable run length with our </span>
                <Link href="/battery/voltage-drop-calculator" style={{ fontWeight: 700, color: "#0284c7", textDecoration: "underline" }}>
                  Voltage Drop Calculator →
                </Link>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Continuous Running Load</dt>
                  <dd>{calculated.result.totalRunningWatts} W</dd>
                </div>
                <div>
                  <dt>Peak Inductive Surge Demand</dt>
                  <dd>{calculated.result.totalSurgeWatts} W</dd>
                </div>
                <div>
                  <dt>Target Sizing (with 20% Headroom)</dt>
                  <dd>{calculated.result.targetContinuousWatts} W</dd>
                </div>
                <div>
                  <dt>Recommended Waveform</dt>
                  <dd>Pure Sine Wave (Safe for Electronics)</dd>
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

      {calculated && <MobileResultBar label="Recommended Inverter" value={`${calculated.result.recommendedInverterWatts}W Pure Sine`} targetId="calculator-result" />}
    </section>
  );
}

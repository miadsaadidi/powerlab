"use client";

import { useEffect, useState } from "react";
import { GENERATOR_APPLIANCES, QUICK_GENERATOR_PRESETS, type GeneratorAppliancePreset } from "@/data/generator-defaults";
import { calculateGeneratorSize, type GeneratorApplianceItem, type GeneratorSizeResult } from "@/lib/calculators/generator-size/engine";
import { track } from "@/lib/analytics/analytics";
import { MobileResultBar } from "@/components/calculator/mobile-result-bar";
import { ShareButton } from "@/components/calculator/share-button";
import { PrintSpecButton } from "@/components/calculator/print-spec-button";

export function GeneratorSizeCalculator() {
  const [selectedItems, setSelectedItems] = useState<GeneratorApplianceItem[]>([
    { id: "refrigerator", label: "Refrigerator / Freezer", runningWatts: 150, startingWatts: 1200, quantity: 1 },
    { id: "sump-pump-half", label: "Sump Pump (1/2 HP Heavy)", runningWatts: 800, startingWatts: 2400, quantity: 1 },
    { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, startingWatts: 1000, quantity: 1 },
    { id: "wifi-modem", label: "Wi-Fi Router & Fiber Modem", runningWatts: 25, startingWatts: 25, quantity: 1 },
    { id: "led-lighting", label: "LED Home Lighting (10 Rooms)", runningWatts: 100, startingWatts: 100, quantity: 1 },
  ]);

  const [safetyMargin, setSafetyMargin] = useState<number>(0.20);
  const [fuelType, setFuelType] = useState<"gasoline" | "propane" | "natural_gas" | "diesel">("gasoline");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [calculated, setCalculated] = useState<GeneratorSizeResult | null>(() => {
    try {
      return calculateGeneratorSize({
        appliances: [
          { id: "refrigerator", label: "Refrigerator / Freezer", runningWatts: 150, startingWatts: 1200, quantity: 1 },
          { id: "sump-pump-half", label: "Sump Pump (1/2 HP Heavy)", runningWatts: 800, startingWatts: 2400, quantity: 1 },
          { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, startingWatts: 1000, quantity: 1 },
          { id: "wifi-modem", label: "Wi-Fi Router & Fiber Modem", runningWatts: 25, startingWatts: 25, quantity: 1 },
          { id: "led-lighting", label: "LED Home Lighting (10 Rooms)", runningWatts: 100, startingWatts: 100, quantity: 1 },
        ],
        safetyMarginFraction: 0.20,
      });
    } catch {
      return null;
    }
  });

  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    track("calculator_view", { calculator_id: "generator-size", category: "home-energy", phase: 5 });
  }, []);

  const [notification, setNotification] = useState<string | null>(null);

  // Auto-calculate in real time whenever appliances or settings change
  useEffect(() => {
    if (selectedItems.length === 0) {
      setCalculated(null);
      return;
    }
    try {
      const res = calculateGeneratorSize({
        appliances: selectedItems,
        safetyMarginFraction: safetyMargin,
        fuelType,
      });
      setCalculated(res);
      setError(null);
      setStale(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to calculate generator size."));
    }
  }, [selectedItems, safetyMargin, fuelType]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const addItem = (preset: GeneratorAppliancePreset) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === preset.id);
      if (existing) {
        return prev.map((item) => (item.id === preset.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: preset.id, label: preset.label, runningWatts: preset.runningWatts, startingWatts: preset.startingWatts, quantity: 1 }];
    });
    showToast(`✓ Added ${preset.label} (+1)`);
    track("calculator_preset_click", { calculator_id: "generator-size", preset: preset.label });
  };

  const decrementItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const removeItem = (id: string) => {
    const item = selectedItems.find((i) => i.id === id);
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
    if (item) showToast(`Removed ${item.label}`);
  };

  const updateItemQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setSelectedItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const applyPreset = (presetIndex: number) => {
    const p = QUICK_GENERATOR_PRESETS[presetIndex];
    const newItems: GeneratorApplianceItem[] = p.appliances.map((entry) => {
      const found = GENERATOR_APPLIANCES.find((a) => a.id === entry.id)!;
      return {
        id: found.id,
        label: found.label,
        runningWatts: found.runningWatts,
        startingWatts: found.startingWatts,
        quantity: entry.qty,
      };
    });
    setSelectedItems(newItems);
    showToast(`⚡ Loaded "${p.label}" scenario`);
    track("calculator_preset_click", { calculator_id: "generator-size", preset: p.label });
  };

  const filteredCatalog = GENERATOR_APPLIANCES.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = search === "" || item.label.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const itemStr = selectedItems.map((i) => `${i.id}:${i.quantity}`).join(",");
    url.searchParams.set("items", itemStr);
    url.searchParams.set("margin", String(safetyMargin));
    url.searchParams.set("fuel", fuelType);
    return url.toString();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <h2 id="calculator-heading">Size Generator by Home Appliances</h2>

          <div className="preset-chips-container" role="region" aria-label="Quick Outage Presets">
            <span className="preset-chips-label">⚡ 1-Click Autofill: Top 5 Outage Setups</span>
            <div className="preset-chips-row">
              {QUICK_GENERATOR_PRESETS.map((p, idx) => (
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

          {notification && (
            <div
              style={{
                marginBottom: "0.75rem",
                padding: "0.55rem 0.85rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                animation: "fadeIn 200ms ease",
              }}
            >
              <span>{notification}</span>
              <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>⚡ Sizing updated</span>
            </div>
          )}

          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            {/* Selected Appliances Checklist */}
            <fieldset className="input-group">
              <legend>Active Appliances ({selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items)</legend>
              {selectedItems.length === 0 ? (
                <p className="form-hint" style={{ color: "#ef4444" }}>
                  Your appliance list is empty. Click any appliance below to add it to your generator load.
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
                          {item.runningWatts}W Running · {item.startingWatts}W Surge
                        </small>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</label>
                        <input
                          id={`qty-${item.id}`}
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
                          style={{ color: "#ef4444", fontSize: "0.85rem", marginLeft: "0.25rem", cursor: "pointer" }}
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
              <legend>Appliance Catalog — Click to Add or Adjust</legend>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {["All", "Kitchen", "Climate", "Pumps & Utilities", "Electronics & Work", "Heavy Equipment"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`preset-chip-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{ fontSize: "0.78rem", padding: "0.3rem 0.55rem" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <input
                type="search"
                placeholder="Search appliances (e.g. well pump, fridge, microwave)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", marginBottom: "0.75rem", padding: "0.5rem 0.75rem" }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "0.6rem",
                  maxHeight: "280px",
                  overflowY: "auto",
                  padding: "0.35rem",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  borderRadius: "0.5rem",
                }}
              >
                {filteredCatalog.map((preset) => {
                  const current = selectedItems.find((i) => i.id === preset.id);
                  const isAdded = !!current && current.quantity > 0;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => addItem(preset)}
                      style={{
                        position: "relative",
                        textAlign: "left",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: isAdded
                          ? "2px solid var(--accent, #c65d24)"
                          : "1.5px solid var(--border-color, #cbd5e1)",
                        background: isAdded
                          ? "var(--bg-secondary, #fff8f2)"
                          : "var(--surface, #ffffff)",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        transition: "all 140ms ease",
                        boxShadow: isAdded
                          ? "0 3px 8px rgba(198, 93, 36, 0.15)"
                          : "0 1px 3px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.4rem" }}>
                        <span style={{ fontWeight: 700, display: "block", color: isAdded ? "var(--accent, #c65d24)" : "inherit" }}>
                          {isAdded ? "✓" : "+"} {preset.label}
                        </span>
                        {isAdded && (
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              padding: "0.15rem 0.4rem",
                              borderRadius: "0.35rem",
                              background: "var(--accent, #c65d24)",
                              color: "#ffffff",
                              whiteSpace: "nowrap",
                            }}
                          >
                            ×{current.quantity}
                          </span>
                        )}
                      </div>

                      <small style={{ color: "var(--text-muted, #64748b)", display: "block", marginTop: "0.2rem" }}>
                        {preset.runningWatts}W Running · {preset.startingWatts}W Surge
                      </small>

                      {isAdded && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "0.35rem",
                            marginTop: "0.45rem",
                            paddingTop: "0.35rem",
                            borderTop: "1px solid rgba(198, 93, 36, 0.2)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={(e) => decrementItem(preset.id, e)}
                            style={{
                              padding: "0.15rem 0.45rem",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              borderRadius: "0.3rem",
                              border: "1px solid var(--border-color, #cbd5e1)",
                              background: "var(--surface, #ffffff)",
                              cursor: "pointer",
                            }}
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, minWidth: "1.2rem", textAlign: "center" }}>
                            {current.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(preset);
                            }}
                            style={{
                              padding: "0.15rem 0.45rem",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              borderRadius: "0.3rem",
                              border: "1px solid var(--accent, #c65d24)",
                              background: "var(--accent, #c65d24)",
                              color: "#ffffff",
                              cursor: "pointer",
                            }}
                            title="Add one more"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <button className="text-button" type="button" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((o) => !o)}>
              {advancedOpen ? "Hide" : "Show"} advanced safety headroom &amp; fuel settings
            </button>

            {advancedOpen && (
              <fieldset className="input-group advanced-settings">
                <legend>Headroom &amp; Fuel Derating</legend>
                <div className="field-pair">
                  <label htmlFor="gen-margin">
                    Safety Headroom Margin
                    <select
                      id="gen-margin"
                      value={String(safetyMargin)}
                      onChange={(e) => {
                        setSafetyMargin(Number(e.target.value));
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="0.10">10% (Tight Budget)</option>
                      <option value="0.20">20% (Standard Recommendation)</option>
                      <option value="0.25">25% (Extended Continuous Operation)</option>
                    </select>
                  </label>
                  <label htmlFor="gen-fuel">
                    Primary Fuel Source
                    <select
                      id="gen-fuel"
                      value={fuelType}
                      onChange={(e) => {
                        setFuelType(e.target.value as "gasoline" | "propane" | "natural_gas" | "diesel");
                        if (calculated) setStale(true);
                      }}
                    >
                      <option value="gasoline">Gasoline (100% Nameplate Rating)</option>
                      <option value="propane">Liquid Propane (LP · ~10% Fuel Derate)</option>
                      <option value="natural_gas">Natural Gas (Utility NG · ~15% Derate)</option>
                      <option value="diesel">Diesel</option>
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
              {calculated ? "Recalculate" : "Calculate Generator Size"}
            </button>
          </form>
        </div>

        <aside id="calculator-result" className="result-panel" aria-live="polite">
          <p className="eyebrow">Generator Recommendation</p>
          {!calculated ? (
            <p>Select your appliances to see generator sizing recommendations.</p>
          ) : (
            <>
              <p className="result-lede">Recommended Generator Class</p>
              <p className="result-value" style={{ fontSize: "1.6rem", color: "#0284c7" }}>
                {calculated.result.recommendedPortableClass}
              </p>

              {stale && <p className="warning">Appliance list changed — recalculate to update recommendation.</p>}

              {/* Running vs Surge Visual Bar */}
              <div style={{ margin: "1rem 0", padding: "1rem", borderRadius: "0.5rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  <span>Continuous Load: {calculated.result.totalRunningWatts} W</span>
                  <span style={{ color: "#f59e0b" }}>Peak Starting Surge: {calculated.result.totalStartingSurgeWatts} W</span>
                </div>
                <div style={{ width: "100%", height: "14px", background: "#e2e8f0", borderRadius: "7px", display: "flex", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${Math.min(70, (calculated.result.totalRunningWatts / calculated.result.targetPeakSurgeWatts) * 100)}%`,
                      background: "#0284c7",
                    }}
                    title="Running Load"
                  />
                  <div
                    style={{
                      width: `${Math.min(30, (calculated.result.maxInductiveSurgeDelta / calculated.result.targetPeakSurgeWatts) * 100)}%`,
                      background: "#f59e0b",
                    }}
                    title="Max Single Motor Surge Delta"
                  />
                </div>
                <small style={{ display: "block", color: "var(--text-muted, #64748b)", marginTop: "0.35rem", fontSize: "0.75rem" }}>
                  Blue = Continuous Running Load · Orange = Motor Starting Surge (Well Pump / Fridge / AC)
                </small>
              </div>

              <dl className="result-breakdown">
                <div>
                  <dt>Target Continuous Capacity</dt>
                  <dd><strong>{calculated.result.targetContinuousWatts} W</strong> (with 20% margin)</dd>
                </div>
                <div>
                  <dt>Target Peak Starting Surge</dt>
                  <dd><strong>{calculated.result.targetPeakSurgeWatts} W</strong></dd>
                </div>
                <div>
                  <dt>Required Outlet / Plug</dt>
                  <dd>{calculated.result.recommendedNemaOutlet}</dd>
                </div>
                <div>
                  <dt>Recommended Power Cord</dt>
                  <dd>{calculated.result.recommendedCordGauge}</dd>
                </div>
                <div>
                  <dt>Whole-Home Standby Class</dt>
                  <dd>{calculated.result.recommendedStandbyClass}</dd>
                </div>
              </dl>

              <div className="button-row" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShareButton getShareUrl={getShareUrl} />
                <PrintSpecButton />
              </div>
            </>
          )}
        </aside>
      </div>

      {calculated && <MobileResultBar label="Recommended Generator Class" value={calculated.result.recommendedPortableClass} targetId="calculator-result" />}
    </section>
  );
}

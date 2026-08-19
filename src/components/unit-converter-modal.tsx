"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ConverterTab = "power" | "storage" | "pitch" | "efficiency";

export function UnitConverterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ConverterTab>("power");
  const [copied, setCopied] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Power state
  const [watts, setWatts] = useState("1500");

  // Storage state
  const [voltage, setVoltage] = useState("12");
  const [ampHours, setAmpHours] = useState("100");

  // Roof Pitch state
  const [pitchRise, setPitchRise] = useState("4"); // e.g. 4:12

  // Vehicle Efficiency state
  const [miPerKwh, setMiPerKwh] = useState("3.4");

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Close on Escape or click outside everywhere
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      // If click/touch is outside the modal content and outside the trigger button, close
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        (!buttonRef.current || !buttonRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Derived Power conversions
  const parsedWatts = Number(watts) || 0;
  const kw = (parsedWatts / 1000).toFixed(3);
  const hp = (parsedWatts / 745.699872).toFixed(2);
  const btuHr = (parsedWatts * 3.412142).toFixed(0);

  // Derived Storage conversions
  const parsedV = Number(voltage) || 12;
  const parsedAh = Number(ampHours) || 0;
  const wattHours = (parsedV * parsedAh).toFixed(1);
  const kilowattHours = ((parsedV * parsedAh) / 1000).toFixed(3);

  // Derived Roof Pitch conversions
  const parsedRise = Number(pitchRise) || 0;
  const tiltDeg = ((Math.atan(parsedRise / 12) * 180) / Math.PI).toFixed(1);
  const slopePercent = ((parsedRise / 12) * 100).toFixed(1);

  // Derived Vehicle Efficiency conversions
  const parsedMiKwh = Number(miPerKwh) || 0;
  const kwhPer100Km = parsedMiKwh > 0 ? (62.1371 / parsedMiKwh).toFixed(2) : "0";
  const whPerKm = parsedMiKwh > 0 ? ((62.1371 / parsedMiKwh) * 10).toFixed(1) : "0";
  const mpge = (parsedMiKwh * 33.7).toFixed(1);

  const modalContent = isOpen ? (
    <div
      className="converter-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div
        ref={modalRef}
        className="converter-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="converter-modal-title"
      >
        <div className="converter-header">
          <h2 id="converter-modal-title">🧮 Quick Electrical &amp; Energy Converter</h2>
          <button
            className="converter-close-btn"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close converter"
          >
            ✕
          </button>
        </div>

        <div className="converter-tabs" role="tablist">
          <button
            className={`converter-tab ${activeTab === "power" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "power"}
            onClick={() => setActiveTab("power")}
          >
            ⚡ Power (W/kW/HP)
          </button>
          <button
            className={`converter-tab ${activeTab === "storage" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "storage"}
            onClick={() => setActiveTab("storage")}
          >
            🔋 Storage (Ah ↔ Wh)
          </button>
          <button
            className={`converter-tab ${activeTab === "pitch" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "pitch"}
            onClick={() => setActiveTab("pitch")}
          >
            📐 Roof Pitch ↔ Tilt
          </button>
          <button
            className={`converter-tab ${activeTab === "efficiency" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "efficiency"}
            onClick={() => setActiveTab("efficiency")}
          >
            🚗 EV Efficiency
          </button>
        </div>

        <div className="converter-body">
          {activeTab === "power" && (
            <div className="converter-pane">
              <label className="converter-input-label">
                Power in Watts (W)
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={watts}
                  onChange={(e) => setWatts(e.target.value)}
                  placeholder="e.g. 1500"
                />
              </label>

              <div className="converter-results-grid">
                <div className="conv-result-card">
                  <span className="conv-label">Kilowatts</span>
                  <strong className="conv-val">{kw} kW</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(kw, "kw")}
                  >
                    {copied === "kw" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">Mechanical HP</span>
                  <strong className="conv-val">{hp} HP</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(hp, "hp")}
                  >
                    {copied === "hp" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">BTU / Hour</span>
                  <strong className="conv-val">{btuHr} BTU/hr</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(btuHr, "btu")}
                  >
                    {copied === "btu" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "storage" && (
            <div className="converter-pane">
              <div className="conv-input-row">
                <label className="converter-input-label">
                  System Voltage (V)
                  <select value={voltage} onChange={(e) => setVoltage(e.target.value)}>
                    <option value="12">12 Volts</option>
                    <option value="24">24 Volts</option>
                    <option value="36">36 Volts</option>
                    <option value="48">48 Volts</option>
                    <option value="400">400 Volts (EV Standard)</option>
                    <option value="800">800 Volts (EV 800V)</option>
                  </select>
                </label>
                <label className="converter-input-label">
                  Capacity (Ah)
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={ampHours}
                    onChange={(e) => setAmpHours(e.target.value)}
                    placeholder="e.g. 100"
                  />
                </label>
              </div>

              <div className="converter-results-grid">
                <div className="conv-result-card">
                  <span className="conv-label">Energy (Watt-Hours)</span>
                  <strong className="conv-val">{wattHours} Wh</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(wattHours, "wh")}
                  >
                    {copied === "wh" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">Energy (Kilowatt-Hours)</span>
                  <strong className="conv-val">{kilowattHours} kWh</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(kilowattHours, "kwh")}
                  >
                    {copied === "kwh" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pitch" && (
            <div className="converter-pane">
              <label className="converter-input-label">
                Roof Pitch Ratio (Rise in 12 inches)
                <select value={pitchRise} onChange={(e) => setPitchRise(e.target.value)}>
                  <option value="1">1:12 (4.8° Flat/Shallow)</option>
                  <option value="2">2:12 (9.5° Low Slope)</option>
                  <option value="3">3:12 (14.0° Low Slope)</option>
                  <option value="4">4:12 (18.4° Standard Residential)</option>
                  <option value="5">5:12 (22.6° Standard Residential)</option>
                  <option value="6">6:12 (26.6° Common Pitch)</option>
                  <option value="7">7:12 (30.3° Steep Residential)</option>
                  <option value="8">8:12 (33.7° Steep)</option>
                  <option value="9">9:12 (36.9° Steep)</option>
                  <option value="10">10:12 (39.8° Very Steep)</option>
                  <option value="12">12:12 (45.0° Full 45° Pitch)</option>
                </select>
              </label>

              <div className="converter-results-grid">
                <div className="conv-result-card">
                  <span className="conv-label">Solar Tilt Angle</span>
                  <strong className="conv-val">{tiltDeg}°</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(tiltDeg, "tilt")}
                  >
                    {copied === "tilt" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">Roof Slope Grade</span>
                  <strong className="conv-val">{slopePercent}%</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(slopePercent, "slope")}
                  >
                    {copied === "slope" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "efficiency" && (
            <div className="converter-pane">
              <label className="converter-input-label">
                EV Consumption (Miles per kWh)
                <input
                  type="number"
                  step="any"
                  min="0.1"
                  value={miPerKwh}
                  onChange={(e) => setMiPerKwh(e.target.value)}
                  placeholder="e.g. 3.4"
                />
              </label>

              <div className="converter-results-grid">
                <div className="conv-result-card">
                  <span className="conv-label">Metric Consumption</span>
                  <strong className="conv-val">{kwhPer100Km} kWh/100km</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(kwhPer100Km, "kwh100")}
                  >
                    {copied === "kwh100" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">Wh per Kilometer</span>
                  <strong className="conv-val">{whPerKm} Wh/km</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(whPerKm, "whkm")}
                  >
                    {copied === "whkm" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="conv-result-card">
                  <span className="conv-label">Gas Equivalent MPGe</span>
                  <strong className="conv-val">{mpge} MPGe</strong>
                  <button
                    className="conv-copy-btn"
                    type="button"
                    onClick={() => copyToClipboard(mpge, "mpge")}
                  >
                    {copied === "mpge" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        className="header-utility-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open Electrical & Energy Unit Converter"
        title="Unit Converter (Power, Ah/Wh, Pitch, Efficiency)"
      >
        <span aria-hidden="true">🧮</span>
        <span className="utility-btn-label">Converter</span>
      </button>

      {mounted && isOpen ? createPortal(modalContent, document.body) : null}
    </>
  );
}


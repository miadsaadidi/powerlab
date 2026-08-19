"use client";

import { useEffect, useState, useId } from "react";
import Link from "next/link";
import { createEnergyProfileStore, type EnergyProfileV1 } from "@/lib/energy-profile/store";

function countSavedItems(profile: EnergyProfileV1): number {
  let count = 0;
  if (profile.battery.capacityWh !== null || profile.battery.capacityAh !== null) count++;
  if (profile.usageRows.length > 0 || profile.runtimeHandoff.appliances.length > 0) count++;
  if (profile.solar.systemCapacityKw !== null || profile.solar.latitude !== null) count++;
  if (profile.evCharging.batteryCapacityKWh !== null || profile.evCharging.chargerPowerKw !== null) count++;
  if (profile.electricityPricePerKwh !== null) count++;
  return count;
}

interface SavedScenario {
  id: string;
  name: string;
  savedAt: string;
  profile: EnergyProfileV1;
}

export function EnergyProfileDrawer() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<EnergyProfileV1 | null>(null);
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const [newScenarioName, setNewScenarioName] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const drawerId = useId();

  const loadScenarios = () => {
    try {
      const raw = window.localStorage.getItem("powerlab_scenarios_v1");
      if (raw) {
        setScenarios(JSON.parse(raw));
      }
    } catch {
      // Storage unavailable
    }
  };

  const saveCurrentScenario = () => {
    if (!profile) return;
    const name = newScenarioName.trim() || `Scenario ${scenarios.length + 1}`;
    const newSc: SavedScenario = {
      id: `sc_${Date.now()}`,
      name,
      savedAt: new Date().toLocaleDateString(),
      profile: JSON.parse(JSON.stringify(profile)),
    };
    const updated = [newSc, ...scenarios.slice(0, 5)];
    setScenarios(updated);
    setNewScenarioName("");
    try {
      window.localStorage.setItem("powerlab_scenarios_v1", JSON.stringify(updated));
    } catch {}
  };

  const loadScenario = (sc: SavedScenario) => {
    try {
      createEnergyProfileStore(window.localStorage).write(sc.profile);
      setProfile(sc.profile);
      window.dispatchEvent(new CustomEvent("energy-profile-updated", { detail: sc.profile }));
    } catch {}
  };

  const deleteScenario = (id: string) => {
    const updated = scenarios.filter((s) => s.id !== id);
    setScenarios(updated);
    try {
      window.localStorage.setItem("powerlab_scenarios_v1", JSON.stringify(updated));
    } catch {}
  };

  const loadProfile = () => {
    try {
      const store = createEnergyProfileStore(window.localStorage);
      setProfile(store.read());
    } catch {
      // Storage unavailable or fallback
    }
  };

  useEffect(() => {
    loadProfile();
    loadScenarios();
    const handleUpdate = () => loadProfile();
    window.addEventListener("energy-profile-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("energy-profile-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!profile) {
    return (
      <button
        type="button"
        className="profile-badge-btn"
        aria-label="Open Energy Profile"
        onClick={() => setOpen(true)}
      >
        <span className="profile-badge-icon" aria-hidden="true">⚡</span>
        <span className="profile-badge-text">Profile</span>
      </button>
    );
  }

  const savedCount = countSavedItems(profile);

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    createEnergyProfileStore(window.localStorage).reset();
    setConfirmClear(false);
    loadProfile();
  };

  const handleCopySummary = async () => {
    const lines = ["=== PowerLab Energy Profile ==="];
    if (profile.electricityPricePerKwh !== null) {
      lines.push(`Electricity Price: ${profile.electricityCurrency ?? "$"}${profile.electricityPricePerKwh}/kWh`);
    }
    if (profile.battery.capacityWh !== null) {
      lines.push(`Battery Capacity: ${profile.battery.capacityWh} Wh (${profile.battery.chemistry ?? "standard"})`);
    } else if (profile.battery.capacityAh !== null) {
      lines.push(`Battery Capacity: ${profile.battery.capacityAh} Ah @ ${profile.battery.nominalVoltage ?? 12}V`);
    }
    if (profile.solar.latitude !== null && profile.solar.longitude !== null) {
      lines.push(`Solar Location: ${profile.solar.latitude.toFixed(2)}°, ${profile.solar.longitude.toFixed(2)}°`);
    }
    if (profile.solar.systemCapacityKw !== null) {
      lines.push(`Solar System: ${profile.solar.systemCapacityKw} kW`);
    }
    if (profile.evCharging.batteryCapacityKWh !== null) {
      lines.push(`EV Battery: ${profile.evCharging.batteryCapacityKWh} kWh`);
    }
    if (profile.usageRows.length > 0) {
      lines.push(`Appliances Saved: ${profile.usageRows.length} items`);
    }

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard write failed
    }
  };

  return (
    <>
      <button
        type="button"
        className={`profile-badge-btn ${savedCount > 0 ? "has-data" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => {
          setOpen(true);
          setConfirmClear(false);
        }}
        title="View browser-stored Energy Profile"
      >
        <span className="profile-badge-icon" aria-hidden="true">⚡</span>
        <span className="profile-badge-text">Profile</span>
        {savedCount > 0 && <span className="profile-badge-pill">{savedCount}</span>}
      </button>

      {open && (
        <div className="profile-drawer-backdrop" onClick={() => setOpen(false)}>
          <div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-drawer-title"
            className="profile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-drawer-header">
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>Browser Storage</p>
                <h2 id="profile-drawer-title" style={{ margin: "0.2rem 0 0", fontSize: "1.3rem" }}>
                  Your Energy Profile
                </h2>
              </div>
              <button
                type="button"
                className="profile-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close Energy Profile"
              >
                ✕
              </button>
            </div>

            <p className="profile-drawer-desc">
              Your energy facts are stored locally in this browser. They automatically prefill connected calculators with zero accounts or tracking.
            </p>

            <div className="profile-sections-list">
              {/* Home Energy */}
              <div className="profile-section-card">
                <div className="profile-section-title">
                  <span className="profile-section-icon" aria-hidden="true">🏠</span>
                  <strong>Home Energy &amp; Rates</strong>
                </div>
                <div className="profile-section-content">
                  {profile.electricityPricePerKwh !== null ? (
                    <p className="profile-data-row">
                      <span>Electricity Rate:</span>
                      <strong>{profile.electricityCurrency ?? "$"}{profile.electricityPricePerKwh} / kWh</strong>
                    </p>
                  ) : (
                    <p className="profile-empty-row">No electricity price saved yet.</p>
                  )}
                  {profile.usageRows.length > 0 && (
                    <p className="profile-data-row">
                      <span>Saved Appliances:</span>
                      <strong>{profile.usageRows.length} item{profile.usageRows.length === 1 ? "" : "s"}</strong>
                    </p>
                  )}
                </div>
                <div className="profile-section-links">
                  <Link href="/home-energy/electricity-usage-calculator" onClick={() => setOpen(false)}>
                    Electricity Usage →
                  </Link>
                  <Link href="/home-energy/energy-bill-calculator" onClick={() => setOpen(false)}>
                    Energy Bill →
                  </Link>
                </div>
              </div>

              {/* Battery */}
              <div className="profile-section-card">
                <div className="profile-section-title">
                  <span className="profile-section-icon" aria-hidden="true">🔋</span>
                  <strong>Battery &amp; Backup</strong>
                </div>
                <div className="profile-section-content">
                  {profile.battery.capacityWh !== null || profile.battery.capacityAh !== null ? (
                    <>
                      <p className="profile-data-row">
                        <span>Capacity:</span>
                        <strong>
                          {profile.battery.capacityWh !== null
                            ? `${profile.battery.capacityWh} Wh`
                            : `${profile.battery.capacityAh} Ah @ ${profile.battery.nominalVoltage ?? 12}V`}
                        </strong>
                      </p>
                      {profile.battery.chemistry && (
                        <p className="profile-data-row">
                          <span>Chemistry:</span>
                          <strong>{profile.battery.chemistry}</strong>
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="profile-empty-row">No battery capacity saved yet.</p>
                  )}
                </div>
                <div className="profile-section-links">
                  <Link href="/battery/battery-runtime-calculator" onClick={() => setOpen(false)}>
                    Battery Runtime →
                  </Link>
                  <Link href="/battery/battery-size-calculator" onClick={() => setOpen(false)}>
                    Battery Size →
                  </Link>
                </div>
              </div>

              {/* Solar */}
              <div className="profile-section-card">
                <div className="profile-section-title">
                  <span className="profile-section-icon" aria-hidden="true">☀️</span>
                  <strong>Solar &amp; Tilt</strong>
                </div>
                <div className="profile-section-content">
                  {profile.solar.latitude !== null || profile.solar.systemCapacityKw !== null ? (
                    <>
                      {profile.solar.latitude !== null && profile.solar.longitude !== null && (
                        <p className="profile-data-row">
                          <span>Location:</span>
                          <strong>
                            {profile.solar.latitude.toFixed(2)}°, {profile.solar.longitude.toFixed(2)}°
                          </strong>
                        </p>
                      )}
                      {profile.solar.systemCapacityKw !== null && (
                        <p className="profile-data-row">
                          <span>System Size:</span>
                          <strong>{profile.solar.systemCapacityKw} kW</strong>
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="profile-empty-row">No solar location or system saved yet.</p>
                  )}
                </div>
                <div className="profile-section-links">
                  <Link href="/solar/solar-panel-tilt-calculator" onClick={() => setOpen(false)}>
                    Panel Tilt →
                  </Link>
                  <Link href="/solar/solar-panel-output-calculator" onClick={() => setOpen(false)}>
                    Solar Output →
                  </Link>
                </div>
              </div>

              {/* EV */}
              <div className="profile-section-card">
                <div className="profile-section-title">
                  <span className="profile-section-icon" aria-hidden="true">🚗</span>
                  <strong>EV Charging</strong>
                </div>
                <div className="profile-section-content">
                  {profile.evCharging.batteryCapacityKWh !== null || profile.evCharging.chargerPowerKw !== null ? (
                    <>
                      {profile.evCharging.batteryCapacityKWh !== null && (
                        <p className="profile-data-row">
                          <span>EV Battery:</span>
                          <strong>{profile.evCharging.batteryCapacityKWh} kWh</strong>
                        </p>
                      )}
                      {profile.evCharging.chargerPowerKw !== null && (
                        <p className="profile-data-row">
                          <span>Charger:</span>
                          <strong>{profile.evCharging.chargerPowerKw} kW {profile.evCharging.chargingType ?? ""}</strong>
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="profile-empty-row">No EV charging data saved yet.</p>
                  )}
                </div>
                <div className="profile-section-links">
                  <Link href="/ev/ev-charging-time-calculator" onClick={() => setOpen(false)}>
                    Charging Time →
                  </Link>
                  <Link href="/ev/ev-charging-cost-calculator" onClick={() => setOpen(false)}>
                    Charging Cost →
                  </Link>
                </div>
              </div>

              {/* Saved Scenarios Comparison */}

              <div className="profile-section-card" style={{ borderTop: "3px solid #0284c7" }}>
                <div className="profile-section-title">
                  <span className="profile-section-icon" aria-hidden="true">⚖️</span>
                  <strong>Saved Planning Scenarios</strong>
                </div>
                <div className="profile-section-content">
                  {/* Save current scenario input */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <input
                      type="text"
                      placeholder="e.g. 'Cabin Solar' or '10kWh AGM'"
                      value={newScenarioName}
                      onChange={(e) => setNewScenarioName(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.4rem 0.6rem",
                        fontSize: "0.8rem",
                        borderRadius: "0.4rem",
                        border: "1px solid var(--border-color, #cbd5e1)",
                        background: "var(--bg-secondary, #f8fafc)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={saveCurrentScenario}
                      className="button secondary-button"
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", fontWeight: 700 }}
                    >
                      💾 Save
                    </button>
                  </div>

                  {scenarios.length === 0 ? (
                    <p className="profile-empty-row">No saved scenarios yet. Name your current setup above to save it.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {scenarios.map((sc) => (
                        <div
                          key={sc.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.4rem 0.6rem",
                            borderRadius: "0.4rem",
                            background: "var(--bg-secondary, #f8fafc)",
                            border: "1px solid var(--border-color, #e2e8f0)",
                            fontSize: "0.8rem",
                          }}
                        >
                          <div>
                            <strong>{sc.name}</strong>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: "0.4rem" }}>
                              ({sc.savedAt})
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: "0.35rem" }}>
                            <button
                              type="button"
                              onClick={() => loadScenario(sc)}
                              style={{
                                background: "#0284c7",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "0.25rem",
                                padding: "0.2rem 0.45rem",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Load
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteScenario(sc.id)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                                padding: "0.2rem",
                              }}
                              title="Delete scenario"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>


            <div className="profile-drawer-footer">
              <button
                type="button"
                className="profile-action-btn secondary"
                onClick={handleCopySummary}
              >
                {copied ? "✓ Copied Summary" : "📋 Copy Summary"}
              </button>
              {savedCount > 0 && (
                <button
                  type="button"
                  className={`profile-action-btn ${confirmClear ? "danger" : "secondary"}`}
                  onClick={handleClear}
                >
                  {confirmClear ? "⚠️ Confirm Clear All" : "🗑️ Clear Saved Data"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

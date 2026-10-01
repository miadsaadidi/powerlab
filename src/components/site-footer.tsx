import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* BRAND COLUMN */}
          <div>
            <div style={{ marginBottom: "0.85rem" }}>
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  textDecoration: "none",
                }}
                aria-label={`${siteConfig.name} Home`}
              >
                <EnergyLogo />
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                  <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--ink, #0f172a)" }}>
                    Power<span style={{ color: "var(--accent, #c65d24)" }}>Lab</span>
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      color: "var(--text-muted, #64748b)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: "2px",
                    }}
                  >
                    Deterministic Energy Planning
                  </span>
                </div>
              </Link>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted, #64748b)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Planning calculators using transparent engineering formulas and technical references for solar design engineers, storage technicians, and clean energy planners.
            </p>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)", marginBottom: "1rem" }}>
              References: IEEE • NFPA 70 (NEC) • NREL • SAE
            </div>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: "var(--ink, #0f172a)", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.6875rem" }}>
                Open Source &amp; Ecosystem
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem" }}>
                <a
                  href="https://github.com/miadsaadidi/powerlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", color: "var(--text-muted, #64748b)", textDecoration: "none" }}
                  title="PowerLab on GitHub"
                >
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a
                  href="https://sourceforge.net/projects/powerlab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", color: "var(--text-muted, #64748b)", textDecoration: "none" }}
                  title="PowerLab on SourceForge"
                >
                  <span>SourceForge</span>
                </a>
                <span>•</span>
                <a
                  href="https://www.saashub.com/powerlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", color: "var(--text-muted, #64748b)", textDecoration: "none" }}
                  title="PowerLab on SaaSHub"
                >
                  <span>SaaSHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* PILLAR 1: SOLAR PV */}
          <div>
            <p className="footer-column-title">
              <Link href="/solar" style={{ color: "inherit", textDecoration: "none" }}>
                Solar PV ↗
              </Link>
            </p>
            <ul>
              <li><Link href="/solar/solar-panel-output-calculator">Solar Output (PVWatts V8)</Link></li>
              <li><Link href="/solar/solar-panel-tilt-calculator">Solar Panel Tilt &amp; Azimuth</Link></li>
              <li><Link href="/solar/solar-charge-controller-calculator">MPPT Charge Controller Sizer</Link></li>
              <li><Link href="/solar/solar-panel-size-calculator">Solar Panel Count Sizer</Link></li>
              <li><Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size</Link></li>
              <li><Link href="/solar/solar-load-calculator">Solar Daily Load Profiler</Link></li>
              <li><Link href="/solar/solar-payback-calculator">Solar Payback &amp; 25-Yr ROI</Link></li>
            </ul>
          </div>

          {/* PILLAR 2: BATTERY & STORAGE */}
          <div>
            <p className="footer-column-title">
              <Link href="/battery" style={{ color: "inherit", textDecoration: "none" }}>
                Battery &amp; Storage ↗
              </Link>
            </p>
            <ul>
              <li><Link href="/battery/battery-runtime-calculator">Battery Backup Runtime</Link></li>
              <li><Link href="/battery/battery-size-calculator">Battery Sizing Calculator</Link></li>
              <li><Link href="/battery/battery-capacity-calculator">Battery Capacity (Ah &bull; kWh)</Link></li>
              <li><Link href="/battery/battery-charging-time-calculator">Battery Charging Duration</Link></li>
              <li><Link href="/battery/inverter-size-calculator">Pure Sine Wave Inverter</Link></li>
              <li><Link href="/battery/voltage-drop-calculator">Wire Voltage Drop &amp; AWG</Link></li>
              <li><Link href="/battery/ups-runtime-calculator">UPS Backup Runtime</Link></li>
              <li><Link href="/battery/ups-battery-size-calculator">UPS Battery Bank Sizer</Link></li>
              <li><Link href="/battery/portable-power-station-calculator">Portable Power Stations</Link></li>
            </ul>
          </div>

          {/* PILLAR 3: ELECTRIC VEHICLES */}
          <div>
            <p className="footer-column-title">
              <Link href="/ev" style={{ color: "inherit", textDecoration: "none" }}>
                Electric Vehicles ↗
              </Link>
            </p>
            <ul>
              <li><Link href="/ev/ev-charging-time-calculator">EV Charging Speed Sizer</Link></li>
              <li><Link href="/ev/ev-charging-cost-calculator">EV Charging Cost ($/Charge)</Link></li>
              <li><Link href="/ev/ev-range-calculator">Real-World EV Range Decay</Link></li>
              <li><Link href="/ev/ev-savings-calculator">EV Savings vs Gas Calculator</Link></li>
              <li><Link href="/ev/ev-charger-breaker-size-calculator">EV Breaker Size (NEC 625)</Link></li>
              <li><Link href="/ev/v2l-runtime-calculator">V2L Blackout Outage Runtime</Link></li>
            </ul>
          </div>

          {/* PILLAR 4: HOME ENERGY */}
          <div>
            <p className="footer-column-title">
              <Link href="/home-energy" style={{ color: "inherit", textDecoration: "none" }}>
                Home Energy ↗
              </Link>
            </p>
            <ul>
              <li><Link href="/home-energy/electricity-usage-calculator">Electricity Usage (kWh)</Link></li>
              <li><Link href="/home-energy/energy-bill-calculator">Monthly Electric Bill Sizer</Link></li>
              <li><Link href="/home-energy/appliance-wattage-calculator">Appliance Wattage Catalog</Link></li>
              <li><Link href="/home-energy/home-battery-size-calculator">Home Battery Backup Size</Link></li>
              <li><Link href="/home-energy/generator-size-calculator">Emergency Generator Sizing</Link></li>
              <li><Link href="/home-energy/air-conditioner-cost-calculator">AC Electricity Cost (SEER2)</Link></li>
              <li><Link href="/home-energy/heat-pump-cost-calculator">Heat Pump vs Gas Heating</Link></li>
              <li><Link href="/home-energy/space-heater-cost-calculator">Space Heater Cost &amp; Watts</Link></li>
            </ul>
          </div>

          {/* STANDARDS & AUTHORITY */}
          <div>
            <p className="footer-column-title" style={{ color: "#0284c7" }}>
              Standards &amp; Trust
            </p>
            <ul style={{ gap: "0.45rem" }}>
              <li>
                <Link href="/calculators" style={{ fontWeight: 700, color: "#f59e0b" }}>
                  🧮 All Calculators Hub
                </Link>
              </li>
              <li>
                <Link href="/guides" style={{ fontWeight: 600, color: "#0284c7" }}>
                  📚 Master Engineering Guides
                </Link>
              </li>
              <li>
                <Link href="/research" style={{ fontWeight: 600 }}>
                  🔬 Research &amp; Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/datasets" style={{ fontWeight: 600, color: "#10b981" }}>
                  📊 Open Benchmark Datasets
                </Link>
              </li>
              <li>
                <Link href="/standards" style={{ fontWeight: 600 }}>
                  🛡️ Standards &amp; Technical References
                </Link>
              </li>
              <li>
                <Link href="/solar/regional-climate-data" style={{ fontWeight: 600 }}>
                  📍 Regional Climatic Solar Data
                </Link>
              </li>
              <li>
                <Link href="/methodology" style={{ fontWeight: 600 }}>
                  📐 Calculation Methodology
                </Link>
              </li>
              <li>
                <Link href="/sources" style={{ fontWeight: 600 }}>
                  🧪 Laboratory Sources &amp; Codes
                </Link>
              </li>
              <li>
                <Link href="/glossary" style={{ fontWeight: 600 }}>
                  📖 Engineering Glossary
                </Link>
              </li>
              <li>
                <Link href="/developers" style={{ fontWeight: 600 }}>
                  ⚡ API &amp; Embed Widgets
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ fontWeight: 600 }}>
                  ℹ️ About PowerLab
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ fontWeight: 600 }}>
                  🔒 Zero-Database Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ fontWeight: 600 }}>
                  ⚖️ Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SITEEWIDE RESEARCH PREPRINTS & MASTER GUIDES CRAWL MESH */}
        <div
          style={{
            borderTop: "1px solid var(--line, #e2e8f0)",
            paddingTop: "1.75rem",
            marginBottom: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* RESEARCH PREPRINTS */}
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#7c3aed",
                margin: "0 0 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>🔬 Open Access Research Whitepapers &amp; Technical Reports:</span>
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.4rem 1.1rem",
                fontSize: "0.8125rem",
                lineHeight: 1.5,
              }}
            >
              <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ color: "var(--ink, #0f172a)", textDecoration: "none" }}>
                PL-TR-2026-EVSE01: Level 2 EVSE Thermal Sizing &amp; Ampacity
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ color: "var(--ink, #0f172a)", textDecoration: "none" }}>
                PL-TR-2026-HVAC01: Heat Pump COP Degradation &amp; Aux Heat
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" style={{ color: "var(--ink, #0f172a)", textDecoration: "none" }}>
                PL-TR-2026-GEN02: Motor Inrush Surge &amp; Generator Sizing
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ color: "var(--ink, #0f172a)", textDecoration: "none" }}>
                PL-TR-2026-SOL03: PV Ground Albedo &amp; Cold-Weather Voc
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/research/electrochemical-peukert-derating-bess" style={{ color: "var(--ink, #0f172a)", textDecoration: "none" }}>
                PL-TR-2026-BESS01: BESS Peukert Derating &amp; Tare Losses
              </Link>
            </div>
          </div>

          {/* MASTER ENGINEERING GUIDES */}
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent, #c65d24)",
                margin: "0 0 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>📚 Master Engineering Reference Guides:</span>
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.4rem 1rem",
                fontSize: "0.8125rem",
                lineHeight: 1.5,
              }}
            >
              <Link href="/guides/mppt-solar-charge-controller-sizing-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                MPPT Charge Controller Sizing
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Battery Runtime Formula &amp; Inverter Losses
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/voltage-drop-and-wire-size-calculation-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Voltage Drop &amp; AWG Wire Sizing
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Solar Tilt Angle by Latitude &amp; Season
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/solar-payback-and-roi-calculation-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Solar Payback &amp; 25-Yr Cash Flow
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Level 2 EV Charging Speed &amp; Breaker Sizing
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/how-to-calculate-ev-driving-range-and-efficiency-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                EV Driving Range Formula &amp; Winter Drag
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Central AC &amp; Heat Pump Costs (SEER2)
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/space-heater-electricity-cost-and-wattage-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Space Heater Wattage &amp; Running Costs
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Generator Sizing &amp; Motor Inrush Guide
              </Link>
              <span style={{ color: "var(--line, #cbd5e1)" }}>•</span>
              <Link href="/guides/how-many-kwh-does-a-house-use-per-day" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
                Daily Household kWh Usage Benchmark
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DISCLAIMER */}
        <div
          style={{
            borderTop: "1px solid var(--line, #e2e8f0)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-muted, #64748b)",
          }}
        >
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name} (powerlab.org). Open-access engineering calculators.
          </div>
          <div style={{ maxWidth: "600px", textAlign: "right", lineHeight: 1.45 }}>
            Disclaimer: Calculations are provided for engineering screening and estimating purposes. Consult governing electrical codes (NFPA 70 / NEC, IEEE) and licensed professional electrical engineers (PE) for permitted construction designs.
          </div>
        </div>
      </div>
    </footer>
  );
}

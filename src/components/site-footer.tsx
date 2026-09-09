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
              Engineering-grade calculators, physical loss models, and technical references for solar design engineers, storage technicians, and clean energy planners.
            </p>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)", marginBottom: "1rem" }}>
              Standards: IEEE • NFPA 70 (NEC) • NREL • SAE
            </div>
            <a
              href="https://www.google.com/preferences/source?q=powerlab.org"
              target="_blank"
              rel="noopener noreferrer"
              className="google-pin-button"
              title="Pin PowerLab on Google Preferences"
              aria-label="Pin PowerLab to your Google Preferences (opens in a new tab)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Add to Favorites</span>
              <span aria-hidden="true" style={{ fontSize: "0.8rem", marginLeft: "0.1rem" }}>⭐</span>
            </a>
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
              <li><Link href="/battery/ups-runtime-calculator">UPS Backup Runtime</Link></li>
              <li><Link href="/battery/ups-battery-size-calculator">UPS Battery Bank Sizer</Link></li>
              <li><Link href="/battery/portable-power-station-calculator">Portable Power Stations</Link></li>
            </ul>
          </div>

          {/* PILLAR 3: EV & HOME ENERGY */}
          <div>
            <p className="footer-column-title">
              <Link href="/ev" style={{ color: "inherit", textDecoration: "none" }}>EV</Link> &amp; <Link href="/home-energy" style={{ color: "inherit", textDecoration: "none" }}>Home Energy ↗</Link>
            </p>
            <ul>
              <li><Link href="/ev/ev-range-calculator">Real-World EV Range Decay</Link></li>
              <li><Link href="/ev/ev-charging-time-calculator">EV Charging Speed Sizer</Link></li>
              <li><Link href="/ev/ev-charger-breaker-size-calculator">EV Breaker Size (NEC 625)</Link></li>
              <li><Link href="/ev/v2l-runtime-calculator">V2L Blackout Outage Runtime</Link></li>
              <li><Link href="/home-energy/air-conditioner-cost-calculator">AC Electricity Cost (SEER2)</Link></li>
              <li><Link href="/home-energy/heat-pump-cost-calculator">Heat Pump vs Gas Heating</Link></li>
              <li><Link href="/home-energy/generator-size-calculator">Emergency Generator Sizing</Link></li>
              <li><Link href="/battery/voltage-drop-calculator">Wire Voltage Drop &amp; AWG</Link></li>
            </ul>
          </div>

          {/* STANDARDS & AUTHORITY */}
          <div>
            <p className="footer-column-title" style={{ color: "#0284c7" }}>
              Standards &amp; Trust
            </p>
            <ul style={{ gap: "0.5rem" }}>
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
                <Link href="/standards" style={{ fontWeight: 600 }}>
                  🛡️ Standards &amp; Codes Matrix
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
                <a
                  href="https://www.google.com/preferences/source?q=powerlab.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#0284c7" }}
                  title="Add PowerLab to your favorites"
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Add to Favorites</span>
                </a>
              </li>
            </ul>
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

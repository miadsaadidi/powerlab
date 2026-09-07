import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: "1px solid var(--border-color, #e2e8f0)",
        background: "var(--bg-secondary, #f8fafc)",
        padding: "3.5rem 0 2.5rem",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <div className="site-container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.25rem" }}>
        {/* 5-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Column 1: Brand & Suite Purpose */}
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
                  <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--ink)" }}>
                    Power<span style={{ color: "var(--accent, #c65d24)" }}>Lab</span>
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: "2px",
                    }}
                  >
                    Deterministic Energy Planning Suite
                  </span>
                </div>
              </Link>
            </div>

            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: "0.85rem",
              }}
            >
              Engineering-grade calculators, physical loss models, and technical references for solar design engineers, master electricians, battery storage technicians, and EV fleet planners.
            </p>

            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--brand-strong, #264435)",
                fontWeight: 600,
                marginBottom: "1rem",
                lineHeight: 1.4,
              }}
            >
              Standards: IEEE • NFPA 70 (NEC) • NREL • SAE • UL • AHRI
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
              {/* Google Pin Button */}
              <a
                href="https://www.google.com/preferences/source?q=powelab.org"
                target="_blank"
                rel="noopener noreferrer"
                className="google-pin-button"
                title="Pin PowerLab on Google Preferences"
                aria-label="Pin PowerLab to your Google Preferences (opens in a new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.78125rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--surface, #ffffff)",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "all 0.15s ease",
                }}
              >
                <svg width={15} height={15} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Pin on Google</span>
                <span aria-hidden="true" style={{ fontSize: "0.8rem", marginLeft: "0.1rem" }}>📌</span>
              </a>

              {/* Trustpilot Badge */}
              <a
                href="https://www.trustpilot.com/review/powelab.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--surface, #ffffff)",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  textDecoration: "none",
                }}
                title="Review PowerLab on Trustpilot"
              >
                <span style={{ color: "#00b67a", fontSize: "0.95rem" }}>★</span>
                <span>Review on Trustpilot</span>
              </a>
            </div>
          </div>

          {/* Column 2: Solar PV Generation */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/solar" style={{ color: "inherit", textDecoration: "none" }}>
                Solar PV Generation →
              </Link>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/solar/solar-panel-output-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Output (PVWatts V8)</Link></li>
              <li><Link href="/solar/solar-panel-tilt-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Panel Tilt &amp; Azimuth</Link></li>
              <li><Link href="/solar/solar-charge-controller-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>MPPT Charge Controller Sizer</Link></li>
              <li><Link href="/solar/solar-panel-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Panel Count Sizer</Link></li>
              <li><Link href="/solar/solar-battery-bank-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Battery Bank Size</Link></li>
              <li><Link href="/solar/solar-load-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Daily Load Profiler</Link></li>
              <li><Link href="/solar/solar-payback-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solar Payback &amp; 25-Yr ROI</Link></li>
            </ul>
          </div>

          {/* Column 3: Battery & Storage */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/battery" style={{ color: "inherit", textDecoration: "none" }}>
                Battery &amp; Storage →
              </Link>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/battery/battery-runtime-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Battery Backup Runtime</Link></li>
              <li><Link href="/battery/battery-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Battery Sizing Calculator</Link></li>
              <li><Link href="/battery/battery-capacity-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Battery Capacity (Ah &bull; kWh)</Link></li>
              <li><Link href="/battery/battery-charging-time-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Battery Charging Duration</Link></li>
              <li><Link href="/battery/inverter-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Pure Sine Wave Inverter Sizer</Link></li>
              <li><Link href="/battery/ups-runtime-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>UPS Backup Runtime</Link></li>
              <li><Link href="/battery/ups-battery-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>UPS Battery Bank Sizer</Link></li>
              <li><Link href="/battery/portable-power-station-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Portable Power Stations</Link></li>
            </ul>
          </div>

          {/* Column 4: EV & Home Energy */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/ev" style={{ color: "inherit", textDecoration: "none" }}>EV</Link> &amp; <Link href="/home-energy" style={{ color: "inherit", textDecoration: "none" }}>Home Energy →</Link>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/ev/ev-range-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Real-World EV Range Decay</Link></li>
              <li><Link href="/ev/ev-charging-time-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>EV Charging Speed Calculator</Link></li>
              <li><Link href="/ev/ev-charger-breaker-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>EV Breaker &amp; Wire Sizer (NEC 625)</Link></li>
              <li><Link href="/ev/v2l-runtime-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>V2L Blackout Outage Runtime</Link></li>
              <li><Link href="/home-energy/air-conditioner-cost-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>AC Electricity Cost (SEER2)</Link></li>
              <li><Link href="/home-energy/heat-pump-cost-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Heat Pump vs Gas Heating Cost</Link></li>
              <li><Link href="/home-energy/generator-size-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Emergency Generator Sizing</Link></li>
              <li><Link href="/battery/voltage-drop-calculator" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Wire Voltage Drop &amp; AWG</Link></li>
            </ul>
          </div>

          {/* Column 5: Standards & Trust */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent, #c65d24)", marginBottom: "0.75rem" }}>
              Standards &amp; Trust
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li>
                <Link href="/guides" style={{ fontWeight: 600, color: "var(--accent, #c65d24)", textDecoration: "none" }}>
                  📚 Master Engineering Guides
                </Link>
              </li>
              <li>
                <Link href="/research" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  🎓 Research &amp; Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/standards" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  📜 Standards &amp; Codes Matrix
                </Link>
              </li>
              <li>
                <Link href="/solar/regional-climate-data" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  📍 Regional Climatic Data
                </Link>
              </li>
              <li>
                <Link href="/methodology" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  📐 Calculation Methodology
                </Link>
              </li>
              <li>
                <Link href="/sources" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  🏛️ Laboratory Sources &amp; Codes
                </Link>
              </li>
              <li>
                <Link href="/developers" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  🔌 API &amp; Open Datasets
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  ℹ️ About PowerLab
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  🔒 Zero-Database Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Engineering Disclaimer */}
        <div
          style={{
            borderTop: "1px solid var(--border-color, #cbd5e1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name} (powelab.org). Open-access deterministic energy planning suite.
          </div>
          <div style={{ maxWidth: "620px", textAlign: "right", lineHeight: 1.45 }}>
            Disclaimer: Calculations are provided for engineering screening and estimating purposes. Consult governing electrical codes (NFPA 70 NEC, IEEE, local AHJ) and licensed master electricians for permitted construction designs.
          </div>
        </div>
      </div>
    </footer>
  );
}

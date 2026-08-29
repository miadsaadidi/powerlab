import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "About PowerLab — Transparent Planning",
  description: "Learn about PowerLab: deterministic, first-principles engineering calculators for solar, battery storage, home energy, and electric vehicles.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  return (
    <article className="page reading-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>About PowerLab</span>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <EnergyLogo />
        <p className="eyebrow" style={{ margin: 0 }}>System Philosophy &amp; Architecture</p>
      </div>

      <h1>About PowerLab</h1>
      <p className="intro">
        PowerLab was created to replace black-box marketing calculators with <strong>transparent, deterministic engineering tools</strong>. We believe anyone planning an off-grid cabin, home battery backup, rooftop solar array, or EV charging setup deserves accurate math with visible physical losses.
      </p>

      {/* Core Pillars Grid */}
      <section>
        <h2>The 4 Connected Energy Pillars</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            margin: "1.25rem 0",
          }}
        >
          <div
            className="flow-node-card"
            style={{
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #f59e0b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase" }}>Solar PV</span>
              <span style={{ fontSize: "1.5rem" }}>☀️</span>
            </div>
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>Solar Photovoltaics</strong>
            <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Model location-aware solar insolation with NREL PVWatts V8, optimize roof pitch and seasonal tilt angles, and size array capacities.
            </p>
            <Link href="/solar" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem" }}>
              Explore Solar Tools →
            </Link>
          </div>

          <div
            className="flow-node-card"
            style={{
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #10b981",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase" }}>Storage</span>
              <span style={{ fontSize: "1.5rem" }}>🔋</span>
            </div>
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>Battery &amp; UPS Systems</strong>
            <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Calculate runtime under real loads, model Peukert discharge effects, size whole-home LiFePO4 banks, and configure server UPS runtimes.
            </p>
            <Link href="/battery" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem" }}>
              Explore Battery Tools →
            </Link>
          </div>

          <div
            className="flow-node-card"
            style={{
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #0284c7",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>Auditing</span>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
            </div>
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>Home Energy &amp; Loads</strong>
            <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Audit household appliance wattages, calculate continuous vs. surge inrush power, and model monthly electric utility tariffs.
            </p>
            <Link href="/home-energy" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem" }}>
              Explore Home Energy →
            </Link>
          </div>

          <div
            className="flow-node-card"
            style={{
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #8b5cf6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase" }}>E-Mobility</span>
              <span style={{ fontSize: "1.5rem" }}>🚗</span>
            </div>
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>Electric Vehicles</strong>
            <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Determine charging speeds across Level 1, Level 2, and DC Fast Charging, calculate home charging costs, and model gas savings.
            </p>
            <Link href="/ev" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem" }}>
              Explore EV Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section>
        <h2>Our Engineering Philosophy</h2>
        <ul>
          <li>
            <strong>Deterministic Pure TypeScript Engines:</strong> No stochastic AI hallucinations or random estimates. Every formula produces identical, verifiable outputs for given inputs.
          </li>
          <li>
            <strong>Visible Physical Loss Models:</strong> We explicitly model real-world inefficiencies: inverter tare idle draw (15–50W), AC/DC conversion losses (85–95%), DC wiring voltage drops (2–3%), and chemistry-specific depth-of-discharge thresholds.
          </li>
          <li>
            <strong>Zero Database Tracking:</strong> We operate completely free of user databases. There are no accounts, no logins, no advertising tracking pixels, and no utility bill harvesting.
          </li>
          <li>
            <strong>100% Client-Side Computation:</strong> All calculations execute in your browser. Your Energy Profile and scenarios are stored locally in your device&apos;s <code>localStorage</code>.
          </li>
        </ul>
      </section>

      {/* Who PowerLab Is For */}
      <section>
        <h2>Who PowerLab Is Built For</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <div style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>🏡 Homeowners &amp; Preppers</strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Sizing whole-home backup batteries, calculating blackout runtimes, and planning rooftop solar arrays without pushy sales reps.
            </p>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>🚐 Van Builders &amp; Campers</strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Configuring 12V / 24V LiFePO4 battery banks, portable power stations, and 12V DC compressor fridge duty cycles.
            </p>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>⚡ Electricians &amp; Solar Installers</strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Rapid benchmark validation for seasonal tilt angles, NEC continuous load sizing, inverter clipping, and battery capacity conversions.
            </p>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--bg-secondary, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>🚗 New &amp; Prospective EV Owners</strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Comparing Level 1 vs Level 2 home charging install requirements, modeling charging electricity bills, and estimating fuel cost savings.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Links */}
      <section>
        <h2>Transparency &amp; Governance</h2>
        <p>
          PowerLab maintains open scientific governance. Review our complete formulas on the <Link href="/methodology">Engineering Methodology</Link> page, inspect reference standards on our <Link href="/sources">Authoritative Data Sources</Link> page, or read our architecture-backed <Link href="/privacy">Zero-Database Privacy Policy</Link>.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Community &amp; user verified: <a href="https://www.trustpilot.com/review/powelab.org" target="_blank" rel="noopener noreferrer" style={{ color: "#00b67a", fontWeight: 600 }}>Review PowerLab on Trustpilot ★★★★★</a>
        </p>
      </section>
    </article>
  );
}

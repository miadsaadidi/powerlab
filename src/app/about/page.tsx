import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "About PowerLab — Transparent Planning Tools",
  description: "Learn about PowerLab: transparent, deterministic engineering calculation tools for solar PV, battery storage, home energy, and electric vehicles.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PowerLab",
    url: `${siteConfig.url}/about`,
    description: "Learn about PowerLab: transparent, deterministic engineering calculation tools for solar PV, battery storage, home energy, and electric vehicles.",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      logo: `${siteConfig.url}/icon.svg`,
    },
  };

  return (
    <article className="page reading-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
        PowerLab was created to provide <strong>transparent, deterministic engineering calculation tools</strong> for clean energy planning. We believe anyone planning an off-grid cabin, home battery backup, rooftop solar array, or EV charging setup benefits from reproducible calculations with visible physical loss models.
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
              Model location-aware solar insolation using NSRDB solar climate data and NREL PVWatts V8 proxy methodology, optimize roof pitch and seasonal tilt angles, and size array capacities.
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
            <strong>Deterministic Pure TypeScript Engines:</strong> No stochastic AI hallucinations or unrepeatable estimates. Every engine produces deterministic, verifiable outputs for given calculation inputs.
          </li>
          <li>
            <strong>Visible Physical Loss Models:</strong> We explicitly model representative physical losses and operational parameters (such as inverter standby tare draw, AC/DC conversion efficiencies, conductor voltage drop, and chemistry-specific depth-of-discharge design thresholds). Actual losses vary with equipment specifications, operating temperature, system voltage, and conductor sizing.
          </li>
          <li>
            <strong>No User Account Database:</strong> PowerLab does not require user accounts, logins, or server database storage for calculation inputs. Website usage and performance metrics are measured via Google Analytics.
          </li>
          <li>
            <strong>Client-Side Calculation Processing:</strong> Core calculation logic executes directly in your browser. Your Energy Profile and scenarios remain stored locally on your device in <code>localStorage</code>.
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
              Rapid screening and benchmark calculations for seasonal tilt angles, NEC continuous load sizing references, inverter clipping, and battery capacity conversions. (Calculations assist with engineering estimates; permitted construction designs require applicable local codes and qualified professionals.)
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

      {/* Authorship & Engineering */}
      <section>
        <h2>Authorship &amp; Engineering</h2>
        <p>
          PowerLab is authored and maintained by <strong>Miad S.</strong> alongside open engineering benchmarks and verified research datasets. All calculation engines are developed as transparent, open-source TypeScript algorithms verified against physics fundamentals and applicable engineering references.
        </p>
      </section>

      {/* Trust & Transparency Links */}
      <section>
        <h2>Transparency &amp; Governance</h2>
        <p>
          PowerLab provides transparent methodology, engineering references, and open documentation. Review calculation methods on our <Link href="/methodology">Engineering Methodology</Link> page, inspect reference standards on our <Link href="/standards">Standards Matrix</Link>, browse definitions in our <Link href="/glossary">Engineering Glossary</Link>, consult our <Link href="/terms">Terms of Service</Link>, or read our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
          External profiles &amp; reviews:{" "}
          <a href="https://www.trustpilot.com/review/powelab.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary, #0284c7)", fontWeight: 500 }}>Trustpilot Review Page</a>
          {" • "}
          <a href="https://www.saashub.com/powerlab" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary, #0284c7)", fontWeight: 500 }}>SaaSHub Profile</a>
          {" • "}
          <a href="https://sourceforge.net/projects/powerlab/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary, #0284c7)", fontWeight: 500 }}>SourceForge Project</a>
        </p>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Data Sources & Engineering Technical References",
  description:
    "Directory of electrical codes, government datasets, manufacturer technical guides, and research informing PowerLab energy calculation methods and models.",
  alternates: {
    canonical: `${siteConfig.url}/sources`,
  },
  openGraph: {
    title: "Data Sources & Engineering Technical References — PowerLab",
    description:
      "Directory of electrical codes, government datasets, manufacturer technical guides, and research informing PowerLab energy calculation methods and models.",
    url: `${siteConfig.url}/sources`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Data Sources & Technical References — PowerLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Sources & Technical References — PowerLab",
    description:
      "Directory of electrical codes, government datasets, manufacturer technical guides, and research informing PowerLab energy calculation methods and models.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export default function SourcesPage() {
  const pageUrl = `${siteConfig.url}/sources`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PowerLab Engineering Data Sources & Technical References",
    description:
      "Index of electrical safety codes, government research datasets, manufacturer technical guides, and peer-reviewed research informing PowerLab calculation engines.",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <article className="page reading-page" style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1rem 4rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span>Data Sources &amp; Technical References</span>
      </nav>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.3rem 0.85rem",
          borderRadius: "9999px",
          background: "rgba(38, 68, 53, 0.08)",
          border: "1px solid rgba(38, 68, 53, 0.2)",
          color: "var(--brand-strong, #264435)",
          fontSize: "0.78rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.75rem",
        }}
      >
        <span>🧪</span>
        <span>Citations &amp; Provenance Directory</span>
      </div>

      <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", margin: "0 0 0.75rem" }}>
        Data Sources &amp; Technical References
      </h1>
      <p className="intro" style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
        PowerLab calculation methods, empirical baselines, and parameter presets draw from applicable electrical safety codes, government open datasets, manufacturer technical specifications, peer-reviewed academic literature, and PowerLab engineering reports.
      </p>

      {/* 1. Electrical & Safety Standards & Codes */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, borderBottom: "2px solid #f59e0b", paddingBottom: "0.4rem", marginBottom: "1.25rem" }}>
          ⚡ 1. Electrical &amp; Safety Standards and Codes
        </h2>
        <div className="source-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>NFPA 70: National Electrical Code (NEC) — Article 690</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Adopted Electrical Code
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Governs solar photovoltaic system installation safety. Specifically referenced for maximum circuit current calculations (Section 690.8(A)(1), 125% of short-circuit current), continuous conductor and overcurrent protection sizing (Section 690.8(B)(1), 125% of maximum circuit current), cold-temperature open-circuit voltage correction factors (Section 690.7(A)), and PV rapid shutdown requirements.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> PV wire sizing, breaker sizing, Voc temp corrections</div>
              <div><strong>Source type:</strong> Adopted Electrical Safety Code</div>
              <div><strong>Organization:</strong> National Fire Protection Association (NFPA)</div>
              <div><strong>Referenced Edition:</strong> NEC 2023 (NFPA 70-2023)</div>
            </div>
            <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              NFPA 70 Code Reference Portal ↗
            </a>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>NFPA 70: National Electrical Code (NEC) — Article 625 &amp; 110.14(C)</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Adopted Electrical Code
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Governs Electric Vehicle Power Transfer Systems. Article 625 classifies EV charging as a continuous load requiring overcurrent protection and branch circuit conductors rated at not less than 125% of the maximum load (NEC 625.41 / 625.42). Article 110.14(C) establishes terminal temperature limitations and conductor ampacity selection baselines (60°C vs 75°C).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> EV charger breaker sizing, conductor ampacity rating</div>
              <div><strong>Source type:</strong> Adopted Electrical Safety Code</div>
              <div><strong>Organization:</strong> National Fire Protection Association (NFPA)</div>
              <div><strong>Referenced Edition:</strong> NEC 2023 (NFPA 70-2023)</div>
            </div>
            <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              NFPA 70 Article 625 Standards Overview ↗
            </a>
          </article>
        </div>
      </section>

      {/* 2. Government Research, Models & Datasets */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, borderBottom: "2px solid #0284c7", paddingBottom: "0.4rem", marginBottom: "1.25rem" }}>
          🏛️ 2. Government Research, Computational Models &amp; Open Datasets
        </h2>
        <div className="source-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>NREL PVWatts® Version 8 &amp; NSRDB</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Modeling Tool &amp; Dataset
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              National Renewable Energy Laboratory (NREL) solar performance modeling methodology and the National Solar Radiation Database (NSRDB). PowerLab references PVWatts V8 mathematical algorithms for plane-of-array irradiance transposition, temperature-derating mechanics, and balance-of-system loss parameterization in its solar calculation engines.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> Solar panel output estimation, regional PSH benchmarks</div>
              <div><strong>Source type:</strong> Computational Performance Model &amp; Solar Dataset</div>
              <div><strong>Organization:</strong> National Renewable Energy Laboratory (NREL / U.S. DOE)</div>
              <div><strong>Version / Release:</strong> PVWatts V8 / NSRDB Multi-Year Solar Irradiance</div>
            </div>
            <a href="https://developer.nrel.gov/docs/solar/pvwatts/v8/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              NREL PVWatts V8 Technical Documentation ↗
            </a>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>U.S. Department of Energy (DOE) — AFDC</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Government Technical Resource
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Alternative Fuels Data Center (AFDC): Technical specifications for electric vehicle supply equipment (EVSE), covering voltage/amperage delivery ranges for Level 1 (120V AC), Level 2 (208/240V AC J1772 / NACS), and DC Fast Charging (CCS / NACS / CHAdeMO) infrastructure.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> EV charging power levels, connector power envelopes</div>
              <div><strong>Source type:</strong> Government Infrastructure Technical Resource</div>
              <div><strong>Organization:</strong> U.S. Department of Energy (DOE) / EERE</div>
              <div><strong>Resource:</strong> AFDC EV Charging Infrastructure Specifications</div>
            </div>
            <a href="https://afdc.energy.gov/fuels/electricity-stations" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              DOE Alternative Fuels Data Center ↗
            </a>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>U.S. Energy Information Administration (EIA) — RECS &amp; Electric Power Monthly</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Statistical Survey &amp; Utility Data
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Residential Energy Consumption Survey (RECS 2020) and Electric Power Monthly (Table 5.6.A). Provides statistical survey data on U.S. household electricity consumption, appliance end-use energy splits, and state-level weighted average residential electricity rates ($/kWh).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> Household electricity usage baselines, state utility rate presets</div>
              <div><strong>Source type:</strong> National Statistical Survey &amp; Utility Tariff Reports</div>
              <div><strong>Organization:</strong> U.S. Energy Information Administration (EIA)</div>
              <div><strong>Edition:</strong> RECS 2020 Survey Data &amp; Electric Power Monthly (Table 5.6.A)</div>
            </div>
            <a href="https://www.eia.gov/consumption/residential/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              EIA Residential Energy Consumption Survey (RECS) Portal ↗
            </a>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>ENERGY STAR® Product Database</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Certified Product Database
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              U.S. EPA / DOE ENERGY STAR certified product registries: Sourced for certified appliance energy consumption metrics, including annual kWh consumption ratings and energy efficiency metrics (SEER2, HSPF2, CEER) across residential refrigerators, heat pump dryers, and HVAC equipment.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> Appliance wattage catalog presets, HVAC seasonal efficiency references</div>
              <div><strong>Source type:</strong> Certified Equipment Performance Database</div>
              <div><strong>Organization:</strong> U.S. Environmental Protection Agency (EPA) &amp; DOE</div>
              <div><strong>Resource:</strong> ENERGY STAR Qualified Product Finder</div>
            </div>
            <a href="https://www.energystar.gov/productfinder/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              ENERGY STAR Product Finder ↗
            </a>
          </article>
        </div>
      </section>

      {/* 3. Manufacturer Technical Documentation */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, borderBottom: "2px solid #10b981", paddingBottom: "0.4rem", marginBottom: "1.25rem" }}>
          🔧 3. Manufacturer Technical Documentation &amp; Application Guides
        </h2>
        <div className="source-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Victron Energy B.V. — SmartShunt &amp; Battery Monitor Manuals</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Manufacturer Technical Guide
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Manufacturer technical documentation on battery monitor configuration parameters: Details configurable settings for Peukert exponents, Charge Efficiency Factors (CEF), discharge floor thresholds, and zero-current calibration used in state-of-charge tracking algorithms.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> Battery monitoring parameters, Peukert rate-loss ranges</div>
              <div><strong>Source type:</strong> Manufacturer Technical Manual</div>
              <div><strong>Organization:</strong> Victron Energy B.V.</div>
              <div><strong>Resource:</strong> SmartShunt &amp; BMV Battery Monitor Manuals</div>
            </div>
            <a href="https://www.victronenergy.com/media/pg/SmartShunt/en/configuration.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              Victron Energy Configuration Guide ↗
            </a>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Trojan Battery Company — Deep-Cycle Technical Guidance</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Manufacturer Application Guide
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Deep-cycle lead-acid technical literature: Sourced for depth-of-discharge vs. cycle-life degradation curves (50% recommended design threshold vs. accelerated deep degradation at 80% DoD) and typical charging-voltage temperature compensation coefficients (approx. -5 mV/°C/cell for flooded deep-cycle lead-acid).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> Lead-acid DoD lifecycle guidelines, temp voltage compensation</div>
              <div><strong>Source type:</strong> Manufacturer Technical &amp; Maintenance Literature</div>
              <div><strong>Organization:</strong> Trojan Battery Company, LLC</div>
              <div><strong>Resource:</strong> Battery Maintenance &amp; Deep-Cycle User Guides</div>
            </div>
            <a href="https://www.trojanbattery.com/resources/battery-maintenance" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              Trojan Battery Technical Maintenance Resources ↗
            </a>
          </article>
        </div>
      </section>

      {/* 4. Peer-Reviewed Academic Research */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, borderBottom: "2px solid #8b5cf6", paddingBottom: "0.4rem", marginBottom: "1.25rem" }}>
          📚 4. Peer-Reviewed Academic Research
        </h2>
        <div className="source-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Archsmith, Kendall, &amp; Rapson (2015)</h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8b5cf6", background: "rgba(139, 92, 246, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                Peer-Reviewed Journal Article
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              <em>Research in Transportation Economics</em>, Vol. 52, pp. 48–59 (&ldquo;From Cradle to Junkyard: Assessing the Life Cycle Greenhouse Gas Benefits of Electric Vehicles&rdquo;). Peer-reviewed study quantifying EV life-cycle emissions, emphasizing the necessity of accounting for AC wall recharge energy losses, regional electric grid marginal emissions intensity, and the operational impact of ambient temperature on EV energy consumption.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink)", background: "var(--bg-secondary, #f8fafc)", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "0.85rem" }}>
              <div><strong>Used for:</strong> EV AC recharge efficiency context, temperature drag modeling</div>
              <div><strong>Source type:</strong> Peer-Reviewed Academic Journal Article</div>
              <div><strong>Authors:</strong> J. Archsmith, A. Kendall, D. Rapson (UC Davis)</div>
              <div><strong>DOI:</strong> 10.1016/j.retrec.2015.10.007</div>
            </div>
            <a href="https://doi.org/10.1016/j.retrec.2015.10.007" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              Journal Paper (DOI: 10.1016/j.retrec.2015.10.007) ↗
            </a>
          </article>
        </div>
      </section>

      {/* 5. PowerLab Original Technical Reports */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, borderBottom: "2px solid #264435", paddingBottom: "0.4rem", marginBottom: "1.25rem" }}>
          🔬 5. PowerLab Original Technical Research &amp; Preprints
        </h2>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          To ensure mathematical transparency and reproducible derivations for physical formulas across our calculators, PowerLab authors open-access technical research papers:
        </p>
        <div className="source-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ color: "inherit", textDecoration: "underline" }}>
                  Level 2 EVSE Continuous-Duty Thermal Sizing &amp; Ampacity (PL-TR-2026-EVSE01)
                </Link>
              </h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8b5cf6", background: "rgba(139, 92, 246, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                PL-TR-2026-EVSE01
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Investigates continuous load Joule heating (I²Rt thermal energy), terminal temperature ratings (60°C vs 75°C per NEC 110.14(C)), and 125% continuous ampacity requirements under NEC Article 625.42.
            </p>
            <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ color: "inherit", textDecoration: "underline" }}>
                  Cold-Climate Heat Pump COP Degradation &amp; Strip Heat Staging (PL-TR-2026-HVAC01)
                </Link>
              </h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                PL-TR-2026-HVAC01
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Thermodynamic modeling of sub-freezing vapor compression efficiency, defrost parasitic overhead, and electric resistance backup staging economics based on AHRI 210/240 and ASHRAE design temperature bins.
            </p>
            <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" style={{ color: "inherit", textDecoration: "underline" }}>
                  Inductive Motor Inrush Currents &amp; Generator Load Stacking (PL-TR-2026-GEN02)
                </Link>
              </h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                PL-TR-2026-GEN02
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Locked Rotor Amperage (LRA) sub-transient reactance modeling, NEMA MG-1 starting kVA code letters, ISO 8528-5 transient voltage dip envelopes, and non-coincident peak load stacking for backup generator sizing.
            </p>
            <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ color: "inherit", textDecoration: "underline" }}>
                  Snow Albedo Transposition &amp; Cold-Weather Voc Expansion (PL-TR-2026-SOL03)
                </Link>
              </h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "0.35rem" }}>
                PL-TR-2026-SOL03
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 0.85rem" }}>
              Anisotropic Perez ground-reflected diffuse gain models and sub-zero open-circuit voltage (Voc) string sizing for MPPT charge controllers under NEC Section 690.7.
            </p>
            <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent, #c65d24)" }}>
              View Technical Report &amp; Derivations →
            </Link>
          </article>
        </div>
      </section>

      {/* Provenance & Governance Section */}
      <section style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color, #cbd5e1)" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Provenance &amp; Source Governance
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
          PowerLab actively monitors and verifies data source editions and standards revisions on an individual basis. When electrical code cycles (e.g., three-year NEC revisions), government database updates (e.g., annual EIA electricity statistics, RECS releases), or manufacturer application guides are published, our technical team evaluates and updates the corresponding calculator engines, datasets, and cross-reference matrices.
        </p>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          To inspect pure TypeScript algorithms and unit invariant verification, explore our <Link href="/methodology">Calculation Methodology</Link>, view our <Link href="/standards">Standards Cross-Reference Matrix</Link>, or search the <Link href="/glossary">Engineering Glossary</Link>.
        </p>
      </section>
    </article>
  );
}


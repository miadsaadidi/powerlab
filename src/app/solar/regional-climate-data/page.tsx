import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { US_REGIONAL_CLIMATE_DATA } from "@/data/regional-climate-solar-data";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "U.S. Solar Insolation & ASHRAE Climatic Design Data",
  description:
    "U.S. regional solar Peak Sun Hours (h/day), ASHRAE 99% winter and 1% summer design temperatures, reference tilt angles, and EIA residential electricity rates.",
  alternates: {
    canonical: `${siteConfig.url}/solar/regional-climate-data`,
  },
  openGraph: {
    title: "U.S. Solar Resource & ASHRAE Climatic Design Database — PowerLab",
    description:
      "U.S. regional solar Peak Sun Hours (h/day), ASHRAE climate zones, design temperatures, and EIA electricity rates across all 50 states and metro regions.",
    url: `${siteConfig.url}/solar/regional-climate-data`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/solar/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "U.S. Solar Resource & ASHRAE Climatic Design Database — PowerLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "U.S. Solar Resource & ASHRAE Climatic Design Database — PowerLab",
    description:
      "U.S. regional solar Peak Sun Hours (h/day), ASHRAE climate zones, design temperatures, and EIA electricity rates across all 50 states and metro regions.",
    images: [`${siteConfig.url}/solar/opengraph-image`],
  },
};

export default function RegionalClimateDataPage() {
  const pageUrl = `${siteConfig.url}/solar/regional-climate-data`;

  const datasetStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Solar Planning", item: `${siteConfig.url}/solar` },
          { "@type": "ListItem", position: 3, name: "Regional Climatic & Solar Database", item: pageUrl },
        ],
      },
      {
        "@type": "Dataset",
        "@id": `${pageUrl}#dataset`,
        name: "United States Regional Solar Resource, ASHRAE Climatic Design & Electricity Pricing Reference Dataset",
        description:
          "Engineering reference dataset compiling solar Peak Sun Hours (h/day) derived from NREL NSRDB multi-year solar irradiance data, ASHRAE Handbook Fundamentals 99% winter and 1% summer dry-bulb design temperatures for representative weather stations, reference annual fixed solar tilt angles, and U.S. EIA residential electricity rates across 54 meteorological stations covering all 50 U.S. states and metro areas.",
        url: pageUrl,
        keywords: [
          "Solar Insolation by State",
          "Peak Sun Hours by State",
          "ASHRAE 99% Design Temperatures",
          "ASHRAE 1% Design Temperatures",
          "Reference Solar Tilt Angle by State",
          "Electricity Cost per kWh by State",
          "ASHRAE Climate Zones",
        ],
        creator: {
          "@type": "Organization",
          name: "PowerLab",
          url: siteConfig.url,
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        isAccessibleForFree: true,
        spatialCoverage: {
          "@type": "Place",
          name: "United States",
          geo: {
            "@type": "GeoShape",
            box: "18.91 -171.79 71.38 -66.95",
          },
        },
        variableMeasured: [
          "Peak Sun Hours (h/day)",
          "ASHRAE 99% Winter Design DB Temperature (deg F)",
          "ASHRAE 1% Summer Design DB Temperature (deg F)",
          "Reference Fixed Solar Tilt (deg)",
          "Average Residential Electricity Rate ($/kWh)",
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: "U.S. Solar Resource & ASHRAE Climatic Design Data Cross-Reference",
        description:
          "Solar Peak Sun Hours (h/day), ASHRAE 99% winter and 1% summer design temperatures, reference tilt angles, and EIA electricity rates for energy planning and HVAC load screening.",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: "2026-08-20",
        dateModified: "2026-09-30",
        author: {
          "@type": "Organization",
          name: "PowerLab Engineering Team",
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: "PowerLab",
          url: siteConfig.url,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".direct-answer-card", ".direct-answer-card p", "h1"],
        },
      },
    ],
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetStructuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ margin: "1.25rem 0 0.75rem 0", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
        <Link href="/" style={{ color: "var(--primary, #0284c7)", textDecoration: "none" }}>Home</Link>
        {" / "}
        <Link href="/solar" style={{ color: "var(--primary, #0284c7)", textDecoration: "none" }}>Solar</Link>
        {" / "}
        <span aria-current="page" style={{ fontWeight: 600, color: "var(--text-main, #0f172a)" }}>Regional Climatic Data</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "1.75rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            background: "rgba(2, 132, 199, 0.08)",
            border: "1px solid rgba(2, 132, 199, 0.2)",
            color: "var(--primary, #0284c7)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.75rem",
          }}
        >
          <span>☀️</span>
          <span>U.S. Solar Resource &amp; Climatic References</span>
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main, #0f172a)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          U.S. Solar Resource &amp; ASHRAE Climatic Design Database
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-muted, #64748b)", maxWidth: "880px", lineHeight: 1.6 }}>
          Meteorological and utility references compiled from the <strong>National Renewable Energy Laboratory (NREL National Solar Radiation Database &amp; PVWatts V8 modeling methodology)</strong>, 
          <strong>ASHRAE Handbook — Fundamentals (Climatic Design Information)</strong>, and the <strong>U.S. Energy Information Administration (EIA Electric Power Monthly)</strong>.
        </p>
      </header>

      {/* Direct Answer Summary Card */}
      <DirectAnswerCard
        keyword="U.S. Solar Resource & ASHRAE Climatic Design Data"
        answer="Peak Sun Hours (PSH, where 1 PSH = 1 hour of 1,000 W/m² equivalent solar irradiance, or 1 kWh/m²/day of cumulative irradiation) serve as a first-order solar-resource indicator, ranging from 3.15 h/day in Alaska to 6.55 h/day in Arizona. Actual PV production depends on array capacity, azimuth orientation, tilt angle, ambient temperature derating, shading, inverter conversion efficiency, and local microclimate factors. For HVAC systems, ASHRAE 99% winter and 1% summer dry-bulb design temperatures provide station-specific baselines for thermal envelope load sizing and heat pump auxiliary strip heat staging."
        sourceAuthority="Data & Technical References: NREL NSRDB / PVWatts V8 Model, ASHRAE Handbook — Fundamentals, & U.S. EIA Electric Power Monthly"
      />

      {/* Interactive Regional Data Table */}
      <section aria-labelledby="data-table-heading" style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
          <h2 id="data-table-heading" style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>
            50-State &amp; Regional Solar &amp; Climatic Reference Table
          </h2>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)", background: "var(--surface, #f8fafc)", padding: "0.3rem 0.65rem", borderRadius: "0.375rem", border: "1px solid var(--line, #e2e8f0)" }}>
            54 Representative Weather Stations (50 States + DC &amp; Subdivided Metro Regions)
          </span>
        </div>

        <div style={{ overflowX: "auto", border: "1px solid var(--line, #cbd5e1)", borderRadius: "0.75rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-header, #0f172a)", color: "#ffffff", borderBottom: "2px solid #334155" }}>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>State &amp; Metro</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>Zone</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>☀️ Peak Sun Hours (h/day)</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>📐 Ref. Tilt</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>❄️ ASHRAE 99% Winter</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>🔥 ASHRAE 1% Summer</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>⚡ EIA Rate</th>
              </tr>
            </thead>
            <tbody>
              {US_REGIONAL_CLIMATE_DATA.map((row, index) => (
                <tr
                  key={row.stateCode}
                  style={{
                    background: index % 2 === 0 ? "var(--surface-card, #ffffff)" : "var(--surface, #f8fafc)",
                    borderBottom: "1px solid var(--line-subtle, #f1f5f9)",
                  }}
                >
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 600, color: "var(--text-main, #0f172a)" }}>
                    {row.state} <span style={{ color: "var(--text-muted, #64748b)", fontWeight: 400 }}>({row.metro})</span>
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontFamily: "monospace", fontWeight: 700, color: "var(--primary, #0284c7)" }}>
                    {row.ashraeClimateZone}
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 700 }}>
                    {row.peakSunHours} <span style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>h/day</span>
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 600 }}>
                    {row.optimalTiltDeg}°
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 600, color: row.winterDesignTempF < 10 ? "#dc2626" : "inherit" }}>
                    {row.winterDesignTempF}°F
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 600, color: row.summerDesignTempF > 95 ? "#ea580c" : "inherit" }}>
                    {row.summerDesignTempF}°F
                  </td>
                  <td style={{ padding: "0.7rem 0.9rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                    ${row.electricityRateKwh.toFixed(3)}/kWh
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology & Data Provenance */}
      <section
        style={{
          marginTop: "3rem",
          padding: "2rem",
          borderRadius: "0.85rem",
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--line, #cbd5e1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
        }}
      >
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main, #0f172a)", marginBottom: "0.75rem" }}>
          📐 Methodology &amp; Data Provenance
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted, #64748b)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          This reference dataset compiles publicly accessible meteorological, solar radiation, and utility statistics into a standardized screening matrix. The following methodology outlines how each variable is defined, sourced, and applied in engineering calculations:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {/* Item 1: Solar Resource & PSH */}
          <div style={{ background: "var(--surface-card, #f8fafc)", padding: "1.25rem", borderRadius: "0.6rem", border: "1px solid var(--line, #e2e8f0)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main, #0f172a)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>☀️</span> Solar Resource &amp; Peak Sun Hours (PSH)
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted, #64748b)", lineHeight: 1.55, margin: 0 }}>
              <strong>Definition:</strong> 1 Peak Sun Hour equals 1 hour of equivalent standard irradiance at 1,000 W/m² (1 PSH = 1 kWh/m²/day of cumulative daily irradiation).<br />
              <strong>Source:</strong> Derived from multi-year solar irradiance records in the NREL National Solar Radiation Database (NSRDB) and NREL PVWatts V8 modeling runs for south-facing surfaces.<br />
              <strong>Engineering Note:</strong> PSH is a first-order resource indicator. Actual array energy yield (kWh/yr) requires modeling array DC rating (kW), tilt/azimuth transposition, thermal cell degradation (power temperature coefficient), inverter efficiency, and system losses.
            </p>
          </div>

          {/* Item 2: Reference Fixed Solar Tilt */}
          <div style={{ background: "var(--surface-card, #f8fafc)", padding: "1.25rem", borderRadius: "0.6rem", border: "1px solid var(--line, #e2e8f0)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main, #0f172a)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>📐</span> Reference Fixed Solar Tilt Angle
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted, #64748b)", lineHeight: 1.55, margin: 0 }}>
              <strong>Definition:</strong> The fixed module tilt angle (degrees from horizontal) oriented due south (180° azimuth) that maximizes annual cumulative energy capture.<br />
              <strong>Methodology:</strong> Derived from latitude-based transposition models accounting for atmospheric path length and regional seasonal solar clearness indices (typically latitude minus 2° to 5° across continental U.S. latitudes).
            </p>
          </div>

          {/* Item 3: ASHRAE Design Temperatures */}
          <div style={{ background: "var(--surface-card, #f8fafc)", padding: "1.25rem", borderRadius: "0.6rem", border: "1px solid var(--line, #e2e8f0)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main, #0f172a)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>❄️</span> ASHRAE Climatic Design Conditions
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted, #64748b)", lineHeight: 1.55, margin: 0 }}>
              <strong>Source:</strong> <em>ASHRAE Handbook — Fundamentals</em> (Chapter 14: Climatic Design Information).<br />
              <strong>99% Winter DB:</strong> Ambient dry-bulb temperature exceeded 99% of hours in a typical year (used for peak heating load sizing and cold-climate heat pump staging).<br />
              <strong>1% Summer DB:</strong> Ambient dry-bulb temperature exceeded only 1% of annual hours (used for peak sensible cooling sizing).<br />
              <strong>Location Specificity:</strong> Values are specific to the representative airport/weather station listed for each metro area and do not represent a uniform statewide figure.
            </p>
          </div>

          {/* Item 4: U.S. EIA Electricity Rates */}
          <div style={{ background: "var(--surface-card, #f8fafc)", padding: "1.25rem", borderRadius: "0.6rem", border: "1px solid var(--line, #e2e8f0)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main, #0f172a)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>⚡</span> U.S. EIA Electricity Rates
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted, #64748b)", lineHeight: 1.55, margin: 0 }}>
              <strong>Source:</strong> U.S. Energy Information Administration (EIA), <em>Electric Power Monthly</em> (Table 5.6.A: Average Price of Electricity to Ultimate Customers by End-Use Sector).<br />
              <strong>Basis:</strong> State-level weighted average residential retail price ($/kWh).<br />
              <strong>Variability Note:</strong> Rates represent historical statewide averages. Local retail utility tariffs vary significantly based on time-of-use (TOU) schedules, tiered consumption tiers, and monthly fixed service fees.
            </p>
          </div>
        </div>
      </section>

      {/* Connected Planning Calculators */}
      <section style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.75rem", background: "var(--surface-card, #ffffff)", border: "1px solid var(--line, #e2e8f0)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Explore Interactive Calculators Using This Dataset
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted, #64748b)", marginBottom: "1.25rem" }}>
          These interactive engineering calculators integrate solar irradiance data and ASHRAE design baselines for planning modeling:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <Link
            href="/solar/solar-panel-output-calculator"
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--line, #cbd5e1)", textDecoration: "none", color: "inherit", background: "var(--surface, #f8fafc)" }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary, #0284c7)", marginBottom: "0.25rem" }}>☀️ Solar Panel Output Calculator</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)" }}>Computes daily and annual kWh yield based on state peak sun hours and array derating.</div>
          </Link>

          <Link
            href="/solar/solar-panel-tilt-calculator"
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--line, #cbd5e1)", textDecoration: "none", color: "inherit", background: "var(--surface, #f8fafc)" }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary, #0284c7)", marginBottom: "0.25rem" }}>📐 Solar Panel Tilt Calculator</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)" }}>Calculates seasonal optimal fixed and adjustable tilt angles by latitude.</div>
          </Link>

          <Link
            href="/home-energy/heat-pump-cost-calculator"
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--line, #cbd5e1)", textDecoration: "none", color: "inherit", background: "var(--surface, #f8fafc)" }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary, #0284c7)", marginBottom: "0.25rem" }}>❄️ Heat Pump Cost Calculator</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)" }}>Applies ASHRAE 99% winter design temperatures for thermal balance and auxiliary heat modeling.</div>
          </Link>

          <Link
            href="/home-energy/air-conditioner-cost-calculator"
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--line, #cbd5e1)", textDecoration: "none", color: "inherit", background: "var(--surface, #f8fafc)" }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary, #0284c7)", marginBottom: "0.25rem" }}>🔥 Central AC Cost Calculator</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)" }}>Evaluates SEER2 cooling electricity expenses using ASHRAE 1% summer temperature bins.</div>
          </Link>
        </div>

        <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--line, #e2e8f0)", display: "flex", flexWrap: "wrap", gap: "1.25rem", fontSize: "0.88rem" }}>
          <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" style={{ fontWeight: 600, color: "var(--primary, #0284c7)" }}>
            📦 50-State Solar Insolation Climatic Benchmark Dataset (PL-DS-SOL-03) →
          </Link>
          <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" style={{ fontWeight: 600, color: "var(--primary, #0284c7)" }}>
            📖 Solar Panel Tilt Angle by Latitude Guide →
          </Link>
          <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontWeight: 600, color: "var(--primary, #0284c7)" }}>
            📄 Snow Albedo Transposition Research (PL-TR-2026-SOL03) →
          </Link>
        </div>
      </section>

      <Disclaimer variant="standard" />
    </div>
  );
}


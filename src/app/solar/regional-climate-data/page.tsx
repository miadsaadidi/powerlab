import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { US_REGIONAL_CLIMATE_DATA } from "@/data/regional-climate-solar-data";

export const metadata: Metadata = {
  title: "U.S. Solar Insolation & ASHRAE Climatic Data",
  description:
    "Official NREL Peak Sun Hours, ASHRAE 99% winter / 1% summer design temperatures, and EIA electricity rates for all 50 U.S. states and major metropolitan areas.",
  alternates: {
    canonical: `${siteConfig.url}/solar/regional-climate-data`,
  },
  openGraph: {
    title: "U.S. Solar Insolation & ASHRAE Climatic Database | PowerLab",
    description:
      "Deterministic NREL solar radiation benchmarks, ASHRAE climate zones, design temperatures, and EIA electricity prices across all 50 states.",
    url: `${siteConfig.url}/solar/regional-climate-data`,
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
        name: "United States Regional Solar Irradiance, ASHRAE Climatic Design & Electricity Pricing Dataset",
        description:
          "Comprehensive engineering dataset containing NREL NSRDB annual average peak sun hours (kWh/m²/day), ASHRAE Handbook Fundamentals 99% winter and 1% summer dry-bulb design temperatures, optimal fixed solar tilt angles, and U.S. EIA residential electric rates across all 50 states.",
        url: pageUrl,
        keywords: [
          "Solar Insolation by State",
          "Peak Sun Hours by State",
          "ASHRAE 99% Design Temperatures",
          "ASHRAE 1% Design Temperatures",
          "Optimal Solar Tilt Angle by State",
          "Electricity Cost per kWh by State",
          "ASHRAE Climate Zones",
        ],
        creator: {
          "@type": "Organization",
          name: "PowerLab Engineering & Energy Modeling Team",
          url: siteConfig.url,
          sameAs: [
            "https://doi.org/10.6084/m9.figshare.33321774",
            "https://independent.academia.edu/PowerLabEngineering",
          ],
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        isAccessibleForFree: true,
        temporalCoverage: "2024/2026",
        spatialCoverage: {
          "@type": "Place",
          name: "United States",
          geo: {
            "@type": "GeoShape",
            box: "18.91 -171.79 71.38 -66.95",
          },
        },
        variableMeasured: [
          "Peak Sun Hours (kWh/m2/day)",
          "ASHRAE 99% Winter Design DB Temperature (deg F)",
          "ASHRAE 1% Summer Design DB Temperature (deg F)",
          "Optimal Fixed Solar Tilt (deg)",
          "Average Residential Electricity Rate ($/kWh)",
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: "U.S. Solar Insolation & ASHRAE Climatic Design Data (50 States)",
        description:
          "Official NREL Peak Sun Hours, ASHRAE 99% winter / 1% summer design temperatures, and EIA electricity rates for engineering submittals and energy planning.",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: "2026-08-20",
        dateModified: "2026-09-02",
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
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main, #0f172a)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          U.S. Solar Insolation &amp; ASHRAE Climatic Design Database
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-muted, #64748b)", maxWidth: "850px", lineHeight: 1.6 }}>
          Standardized meteorological benchmarks from the <strong>National Renewable Energy Laboratory (NREL NSRDB &amp; PVWatts V8)</strong>, 
          <strong>ASHRAE Handbook — Fundamentals (Chapters 14 &amp; 18)</strong>, and the <strong>U.S. Energy Information Administration (EIA)</strong>.
        </p>
      </header>

      {/* Direct Answer Summary Card */}
      <DirectAnswerCard
        keyword="U.S. Solar Insolation & ASHRAE Climatic Design Data"
        answer="Solar photovoltaic daily yield is directly proportional to regional Peak Sun Hours (1 PSH = 1,000 W/m² equivalent irradiance for 1 hour), ranging from 3.15 PSH in Alaska to 6.55 PSH in Arizona. For HVAC heat pumps and air conditioning, ASHRAE 99% winter and 1% summer dry-bulb design temperatures determine peak thermal transmission loads, non-linear COP degradation, and auxiliary strip heat staging thresholds."
        sourceAuthority="NREL NSRDB / PVWatts V8, ANSI/ASHRAE Standard 90.1, & U.S. EIA Electric Power Monthly"
      />

      {/* Interactive Regional Data Table */}
      <section aria-labelledby="data-table-heading" style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
          <h2 id="data-table-heading" style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>
            50-State Solar &amp; Climatic Benchmark Table
          </h2>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)", background: "var(--surface, #f8fafc)", padding: "0.3rem 0.65rem", borderRadius: "0.375rem", border: "1px solid var(--line, #e2e8f0)" }}>
            54 Meteorological Stations Listed
          </span>
        </div>

        <div style={{ overflowX: "auto", border: "1px solid var(--line, #cbd5e1)", borderRadius: "0.75rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-header, #0f172a)", color: "#ffffff", borderBottom: "2px solid #334155" }}>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>State &amp; Metro</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>Zone</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>☀️ Peak Sun Hours</th>
                <th style={{ padding: "0.75rem 0.9rem", fontWeight: 700 }}>📐 Opt. Tilt</th>
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
                    {row.peakSunHours} <span style={{ fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>kWh/m²/d</span>
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

      {/* Connected Planning Calculators */}
      <section style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.75rem", background: "var(--surface-card, #ffffff)", border: "1px solid var(--line, #e2e8f0)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Explore Interactive Calculators Using This Dataset
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted, #64748b)", marginBottom: "1.25rem" }}>
          These deterministic calculators automatically integrate NREL solar radiation tables and ASHRAE design baselines for high-accuracy engineering modeling:
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
      </section>
    </div>
  );
}

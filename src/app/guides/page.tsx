import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Educational Energy Guides & Engineering Reference — PowerLab",
  description: "In-depth, formula-backed educational guides for home energy auditing, solar photovoltaic engineering, battery storage sizing, and EV charging infrastructure.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Educational Energy Guides & Engineering Reference — PowerLab",
    description: "In-depth, formula-backed educational guides for home energy, solar PV, battery systems, and EV infrastructure.",
    url: `${siteConfig.url}/guides`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FEATURED_GUIDES = [
  {
    name: "How Many kWh Does an Average House Use Per Day?",
    route: "/guides/how-many-kwh-does-a-house-use-per-day",
    category: "Home Energy",
    badge: "15,000+ Readers / Month",
    description: "Complete empirical breakdown of residential electricity consumption based on EIA utility benchmarks. Includes square-footage tables, heavy appliance duty cycles, and daily kWh formula calculation.",
    readTime: "8 min read",
    updatedDate: "Updated August 2026",
    standards: ["EIA Residential Survey", "NEC 220 Load Calculations"],
  },
];

export default function GuidesHubPage() {
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "Educational Guides",
    categoryRoute: "/guides",
    description: "Comprehensive engineering guides and Open Educational Resources (OER) for solar PV, battery storage, and residential energy planning.",
    tools: FEATURED_GUIDES.map((g) => ({
      name: g.name,
      route: g.route,
      description: g.description,
    })),
  });

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Educational Guides</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Open Educational Resources &amp; Technical Analysis</p>
        <h1>Engineering Energy Guides &amp; Reference</h1>
        <p className="intro">
          Rigorous, formula-backed technical explainers and educational curriculum resources for homeowners, students, and engineers. Every guide pairs empirical data with live, interactive calculation models.
        </p>
      </header>

      <section className="guide-hub-grid" style={{ display: "grid", gap: "1.5rem", marginTop: "1.5rem" }}>
        {FEATURED_GUIDES.map((guide) => (
          <article
            key={guide.route}
            style={{
              padding: "1.75rem",
              borderRadius: "1rem",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--accent)",
                  background: "rgba(198, 93, 36, 0.1)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "0.35rem",
                }}
              >
                {guide.category}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                {guide.readTime} • {guide.updatedDate}
              </span>
            </div>

            <h2 style={{ margin: "0.25rem 0", fontSize: "1.35rem", lineHeight: 1.3 }}>
              <Link href={guide.route} style={{ color: "inherit", textDecoration: "none" }}>
                {guide.name}
              </Link>
            </h2>

            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.55 }}>
              {guide.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
              {guide.standards.map((std) => (
                <span
                  key={std}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "0.25rem",
                    background: "#eee5d7",
                    color: "var(--brand-strong)",
                    fontWeight: 600,
                  }}
                >
                  ⚡ {std}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "0.75rem" }}>
              <Link
                href={guide.route}
                className="button primary"
                style={{ display: "inline-block", padding: "0.6rem 1.25rem", textDecoration: "none", fontWeight: 600 }}
              >
                Read Complete Guide &amp; Calculate →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="hub-support" style={{ marginTop: "2.5rem" }}>
        <h2>Educational Integrity &amp; Standards Grounding</h2>
        <p>
          All PowerLab educational guides are authored by the PowerLab Engineering &amp; Energy Modeling team. We cite open-source benchmarks from the <strong>U.S. Energy Information Administration (EIA)</strong>, <strong>National Fire Protection Association (NFPA / NEC 2023)</strong>, <strong>IEEE Standards Association</strong>, and the <strong>National Renewable Energy Laboratory (NREL)</strong>.
        </p>
        <p>
          These materials are provided under Open Educational Access for university coursework, vocational training, and independent technical analysis.
        </p>
      </section>
    </article>
  );
}

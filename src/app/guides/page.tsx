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

interface GuideItem {
  name: string;
  route: string;
  category: "Home Energy" | "Solar Photovoltaics" | "Battery Storage" | "Electric Vehicles";
  categoryIcon: string;
  categoryColor: string;
  categoryBg: string;
  badge: string;
  badgeType: "trending" | "popular" | "new";
  description: string;
  readTime: string;
  updatedDate: string;
  standards: string[];
}

const FEATURED_GUIDES: GuideItem[] = [
  {
    name: "How Many kWh Does an Average House Use Per Day?",
    route: "/guides/how-many-kwh-does-a-house-use-per-day",
    category: "Home Energy",
    categoryIcon: "⚡",
    categoryColor: "#0284c7",
    categoryBg: "rgba(2, 132, 199, 0.1)",
    badge: "🔥 15,000+ Readers / Month",
    badgeType: "trending",
    description: "Complete empirical breakdown of residential electricity consumption based on EIA utility benchmarks. Includes home size square-footage tables, heavy appliance duty cycles, and daily kWh formula calculation.",
    readTime: "8 min read",
    updatedDate: "Updated August 2026",
    standards: ["EIA RECS Survey", "NEC 220 Load Sizing", "DOE Building Tech"],
  },
  {
    name: "MPPT vs PWM Solar Charge Controller Sizing Guide & Formula",
    route: "/guides/mppt-solar-charge-controller-sizing-guide",
    category: "Solar Photovoltaics",
    categoryIcon: "☀️",
    categoryColor: "#f59e0b",
    categoryBg: "rgba(245, 158, 11, 0.1)",
    badge: "⚡ 5,000+ Readers / Month",
    badgeType: "popular",
    description: "Engineering guide to sizing solar charge controllers. Calculates continuous charging amperage, winter sub-zero Voc voltage expansion limits, and MPPT conversion efficiency gains.",
    readTime: "7 min read",
    updatedDate: "Updated August 2026",
    standards: ["NEC Article 690.8", "IEC 62548 Array Design", "IEEE 1547"],
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

      {/* Hero Header */}
      <header className="calculator-header" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Open Educational Resources &amp; Applied Engineering</p>
        <h1>Engineering Energy Guides &amp; Reference</h1>
        <p className="intro" style={{ maxWidth: "52rem" }}>
          Rigorous, formula-backed technical explainers for homeowners, engineering students, and trade professionals. Every guide pairs real-world electrical standards with live, interactive calculation engines.
        </p>

        {/* Highlight Stats Ribbon */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 2rem",
            marginTop: "1.5rem",
            padding: "0.9rem 1.25rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            fontSize: "0.85rem",
            color: "var(--ink)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
            <span><strong>100% Free</strong> &amp; Open-Access</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>📐</span>
            <span><strong>Deterministic</strong> Mathematical Models</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>🏛️</span>
            <span><strong>IEEE, NEC &amp; EIA</strong> Standards Grounded</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#8b5cf6", fontWeight: 700 }}>🧮</span>
            <span><strong>Live Embedded</strong> Interactive Tools</span>
          </div>
        </div>
      </header>

      {/* Guide Cards 2-Column Grid */}
      <section
        className="guide-hub-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "1.5rem",
          marginTop: "1.25rem",
        }}
      >
        {FEATURED_GUIDES.map((guide) => (
          <article
            key={guide.route}
            style={{
              padding: "1.65rem 1.75rem",
              borderRadius: "1rem",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              position: "relative",
              transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
            }}
          >
            {/* Top Badge Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: guide.categoryColor,
                    background: guide.categoryBg,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "0.4rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span>{guide.categoryIcon}</span>
                  <span>{guide.category}</span>
                </span>

                <span
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    color: "#c65d24",
                    background: "rgba(198, 93, 36, 0.08)",
                    padding: "0.22rem 0.55rem",
                    borderRadius: "0.35rem",
                  }}
                >
                  {guide.badge}
                </span>
              </div>

              <span style={{ fontSize: "0.80rem", color: "var(--muted)" }}>
                {guide.readTime} • {guide.updatedDate}
              </span>
            </div>

            {/* Title */}
            <h2 style={{ margin: "0.15rem 0", fontSize: "1.35rem", lineHeight: 1.3 }}>
              <Link
                href={guide.route}
                style={{
                  color: "var(--brand-strong)",
                  textDecoration: "none",
                  transition: "color 140ms ease",
                }}
              >
                {guide.name}
              </Link>
            </h2>

            {/* Description */}
            <p style={{ margin: 0, color: "var(--ink)", lineHeight: 1.55, fontSize: "0.92rem", flexGrow: 1 }}>
              {guide.description}
            </p>

            {/* Standards Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginTop: "0.15rem" }}>
              <span style={{ fontSize: "0.74rem", color: "var(--muted)", fontWeight: 600 }}>Citations:</span>
              {guide.standards.map((std) => (
                <span
                  key={std}
                  style={{
                    fontSize: "0.70rem",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "0.3rem",
                    background: "#eee5d7",
                    color: "var(--brand-strong)",
                    fontWeight: 600,
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  ⚡ {std}
                </span>
              ))}
            </div>

            {/* Bottom Actions with Green Button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem", paddingTop: "0.85rem", borderTop: "1px solid var(--line)" }}>
              <Link
                href={guide.route}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "0.55rem",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(22, 163, 74, 0.28)",
                  border: "1px solid #15803d",
                  transition: "all 140ms ease",
                }}
              >
                <span>Read Complete Guide &amp; Calculate</span>
                <span>→</span>
              </Link>

              <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>
                🧮 Interactive tool included
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* 3-Column Educational Trust Banner */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "var(--brand-strong)" }}>
          Academic Integrity &amp; Open Courseware Standards
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <span style={{ fontSize: "1.4rem" }}>🎓</span>
            <h3 style={{ margin: "0.5rem 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>Open Educational Resource (OER)</h3>
            <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Licensed for free educational use in university engineering courses, electrical vocational programs, and research papers.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <span style={{ fontSize: "1.4rem" }}>📐</span>
            <h3 style={{ margin: "0.5rem 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>Formula Transparency</h3>
            <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Zero proprietary black-box calculations. Every equation, conversion constant, and derating factor is displayed with variable definitions.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <span style={{ fontSize: "1.4rem" }}>⚡</span>
            <h3 style={{ margin: "0.5rem 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>Verified Engineering Standards</h3>
            <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Mathematical models directly implement formulas from NFPA 70 / NEC 2023, IEEE 1547, IEC 62548, and NREL PVWatts V8.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

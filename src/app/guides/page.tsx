import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Energy Guides & Engineering Reference",
  description: "In-depth, formula-backed educational guides for home energy auditing, solar photovoltaic engineering, battery storage sizing, and EV charging infrastructure.",
  canonicalPath: "/guides",
  ogImageUrlOverride: `${siteConfig.url}/clean_energy_educational_model.jpg`,
  ogImageAlt: "PowerLab Educational Energy Modeling & Engineering Reference",
});

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
    name: "Emergency Generator Sizing & Motor Inrush Load Guide (LRA & NEC 702)",
    route: "/guides/emergency-generator-sizing-and-inrush-load-guide",
    category: "Home Energy",
    categoryIcon: "⚡",
    categoryColor: "#ea580c",
    categoryBg: "rgba(234, 88, 12, 0.1)",
    badge: "🔥 New Engineering Guide",
    badgeType: "new",
    description: "Learn how to size whole-home and portable emergency generators accurately. Master inductive motor starting surge (LRA), sequential load stacking, and fuel derating under NEC 702.",
    readTime: "10 min read",
    updatedDate: "Published August 26, 2026",
    standards: ["NEC Article 702", "IEEE Std 446", "NEMA MG-1", "ISO 8528-5"],
  },
  {
    name: "Voltage Drop & Wire Size Calculation Guide (NEC 3% Rules & Table 8)",
    route: "/guides/voltage-drop-and-wire-size-calculation-guide",
    category: "Battery Storage",
    categoryIcon: "⚡",
    categoryColor: "#10b981",
    categoryBg: "rgba(16, 185, 129, 0.1)",
    badge: "🔥 74,000+ Search Volume Target",
    badgeType: "trending",
    description: "Master the mathematical formulas for DC and AC voltage drop. Size copper and aluminum AWG conductors using NEC Chapter 9 Table 8, Ohm's law, and the 3% branch circuit efficiency threshold.",
    readTime: "9 min read",
    updatedDate: "Published August 25, 2026",
    standards: ["NEC 210.19(A)", "NEC 215.2(A)", "NEC Ch 9 Table 8", "IEEE Std 141"],
  },
  {
    name: "Battery Backup Runtime Formula & Calculation Guide (Ah, Wh & Inverter Losses)",
    route: "/guides/battery-backup-runtime-calculation-guide",
    category: "Battery Storage",
    categoryIcon: "🔋",
    categoryColor: "#16a34a",
    categoryBg: "rgba(22, 163, 74, 0.1)",
    badge: "⚡ 12,000+ Readers / Month",
    badgeType: "popular",
    description: "Master the battery runtime formula for LiFePO4, AGM, and Lead-Acid. Calculate Amp-hours to Watt-hours, inverter conversion losses, idle tare draw, and Peukert high-rate discharge capacity derating.",
    readTime: "9 min read",
    updatedDate: "Updated August 2026",
    standards: ["IEEE Std 485 Sizing", "IEC 62619 Lithium Cells", "NEC Article 706"],
  },
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
  {
    name: "Level 2 EV Charging Speed, Amperage & Breaker Sizing Guide",
    route: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide",
    category: "Electric Vehicles",
    categoryIcon: "🚗",
    categoryColor: "#8b5cf6",
    categoryBg: "rgba(139, 92, 246, 0.1)",
    badge: "⚡ 8,500+ Readers / Month",
    badgeType: "new",
    description: "Definitive electrical engineering guide to Level 2 EV charging speeds, breaker sizing, wire gauges, and the NEC 80% continuous load rule for 16A through 48A home chargers.",
    readTime: "8 min read",
    updatedDate: "Updated August 2026",
    standards: ["NEC Article 625", "SAE J1772 / NACS", "UL 2594 EVSE"],
  },
  {
    name: "Solar Panel Tilt Angle by Latitude & Season Guide",
    route: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
    category: "Solar Photovoltaics",
    categoryIcon: "☀️",
    categoryColor: "#f59e0b",
    categoryBg: "rgba(245, 158, 11, 0.1)",
    badge: "⚡ 10,000+ Readers / Month",
    badgeType: "trending",
    description: "Master the mathematics of solar panel tilt angles, seasonal summer vs. winter adjustments, azimuth orientation, and cosine irradiance capture by latitude.",
    readTime: "8 min read",
    updatedDate: "Updated August 2026",
    standards: ["NREL PVWatts V8", "IEC 61724 Monitoring", "ASHRAE Solar Tables"],
  },
];

export default function GuidesHubPage() {
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "Educational Guides",
    categoryRoute: "/guides",
    title: "Educational Energy Guides & Engineering Reference",
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

      {/* Connected Planning Paths */}
      <section style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "0.9rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem", color: "var(--brand-strong)" }}>Continue from a Guide to a Planning Tool</h2>
        <p style={{ marginBottom: "1rem", lineHeight: 1.55, color: "var(--muted)" }}>
          Turn the concepts from these guides into a practical estimate with the connected PowerLab calculator system.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/home-energy" className="button secondary-button">Home energy tools</Link>
          <Link href="/solar" className="button secondary-button">Solar planning tools</Link>
          <Link href="/battery" className="button secondary-button">Battery planning tools</Link>
          <Link href="/ev" className="button secondary-button">EV planning tools</Link>
          <Link href="/battery/battery-runtime-calculator" className="button secondary-button">Battery Runtime Calculator</Link>
          <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button">Solar Panel Tilt Calculator</Link>
          <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button">EV Charger Breaker Sizing</Link>
          <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button">Electricity Usage Calculator</Link>
          <Link href="/solar/solar-charge-controller-calculator" className="button secondary-button">Solar Charge Controller Calculator</Link>
        </div>
      </section>

      {/* 2-Day Editorial Release Calendar */}
      <section style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.9rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.3rem", color: "var(--brand-strong)" }}>📅 2026 Engineering Guide Editorial Roadmap</h2>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "rgba(2, 132, 199, 0.1)", color: "var(--accent)", border: "1px solid rgba(2, 132, 199, 0.25)" }}>
            1 New Engineering Guide Every 2 Days
          </span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1.25rem" }}>
          Our engineering research group publishes peer-referenced, formula-complete sizing guides paired with deterministic computation engines:
        </p>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "0.6rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase" }}>✅ Day 0 (Today · Aug 25)</span>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)" }}>Voltage Drop &amp; Wire Size Calculation Guide (NEC 3% &amp; Table 8)</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Target Keyword: Voltage Drop Formula &bull; 74,000/mo &bull; Live Now</div>
            </div>
            <Link href="/guides/voltage-drop-and-wire-size-calculation-guide" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10b981", textDecoration: "none" }}>Read Guide →</Link>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "0.6rem", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>⏳ Day 2 (Aug 27, 2026)</span>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)" }}>Whole-Home Backup Generator Sizing &amp; Motor Inrush Current Guide</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Target Keyword: Generator Sizing Guide &bull; 40,500/mo &bull; Running vs Starting Watts (LRA)</div>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600 }}>Scheduled</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "0.6rem", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>⏳ Day 4 (Aug 29, 2026)</span>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)" }}>Central Air Conditioner &amp; Heat Pump Electricity Cost Guide</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Target Keyword: AC Running Cost Guide &bull; 34,300/mo &bull; SEER2 &amp; HSPF2 Duty Cycles</div>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600 }}>Scheduled</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "0.6rem", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>⏳ Day 6 (Aug 31, 2026)</span>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)" }}>Solar Payback Period &amp; Net Metering ROI Financial Guide</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Target Keyword: Solar Payback Formula &bull; 18,100/mo &bull; Net Billing 3.0 &amp; ITC Tax Credits</div>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600 }}>Scheduled</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "0.6rem", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>⏳ Day 8 (Sep 2, 2026)</span>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)" }}>Space Heater vs Central Heating Electricity Cost Guide</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Target Keyword: Space Heater Electricity Cost &bull; 18,100/mo &bull; 1500W Duty Cycles</div>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600 }}>Scheduled</span>
          </div>
        </div>
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

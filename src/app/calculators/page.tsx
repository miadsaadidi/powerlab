import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/calculator-registry";
import { HomeSearchFilter } from "@/components/home/home-search-filter";
import { CALCULATOR_CARD_CONTENT } from "@/data/calculator-card-content";
import { TrustBadges } from "@/components/home/trust-badges";
import { ConnectedSystemFlow } from "@/components/home/connected-system-flow";

export const metadata: Metadata = {
  title: "Clean Energy Calculators Directory",
  description:
    "Complete directory of deterministic energy calculators. Sizing tools for solar PV, battery runtime, wire voltage drop, and EV charging under NEC codes.",
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: "Clean Energy Calculators Directory — PowerLab",
    description:
      "Complete directory of deterministic energy calculators. Sizing tools for solar PV, battery runtime, wire voltage drop, and EV charging under NEC codes.",
    url: `${siteConfig.url}/calculators`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Clean Energy Calculators Directory — PowerLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean Energy Calculators Directory — PowerLab",
    description:
      "Complete directory of deterministic energy calculators. Sizing tools for solar PV, battery runtime, wire voltage drop, and EV charging under NEC codes.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const categoryDescriptions: Record<string, { label: string; icon: string; description: string }> = {
  solar: {
    label: "Solar Photovoltaic",
    icon: "☀️",
    description: "Solar array sizing, seasonal tilt angles, PVWatts production yield, and charge controller sizing.",
  },
  battery: {
    label: "Battery Storage & UPS",
    icon: "🔋",
    description: "Battery runtime with Peukert derating, inverter surge capacity, UPS backup sizing, and wire voltage drop.",
  },
  ev: {
    label: "Electric Vehicles (EV)",
    icon: "🚗",
    description: "Level 1 and Level 2 charging speeds, circuit breaker sizing, driving range, and vehicle-to-load (V2L) runtime.",
  },
  "home-energy": {
    label: "Home Energy & Appliances",
    icon: "⚡",
    description: "Household electricity consumption, appliance wattage audits, utility bill analysis, and heating costs.",
  },
};

export default function CalculatorsHubPage() {
  const allCalculators = publishedCalculators();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: `${siteConfig.url}/calculators`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "PowerLab Clean Energy Calculators Directory",
        description: "Open-source deterministic calculation engines for solar PV, battery storage, electric vehicles, and electrical building science.",
        numberOfItems: allCalculators.length,
        itemListElement: allCalculators.map((calc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: calc.name,
          url: `${siteConfig.url}${calc.route}`,
        })),
      },
    ],
  };

  return (
    <div className="page calculators-directory-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Calculators</span>
      </nav>

      <header className="page-header" style={{ marginBottom: "2rem" }}>
        <p className="eyebrow">Engineering Tools &amp; Sizing Directory</p>
        <h1>Clean Energy Calculators Directory</h1>
        <p className="intro" style={{ maxWidth: "780px" }}>
          Explore PowerLab&apos;s full suite of deterministic computational models. Calculator engines execute locally in the browser using pure TypeScript without requiring user accounts or server-side saved calculation storage. Each calculator uses the engineering standards, technical references, datasets, or physical models applicable to its calculation domain. Relevant circuit-sizing tools reference applicable NEC provisions and IEEE engineering guidance.
        </p>
      </header>

      {/* Interactive Category Search & Filter */}
      <section aria-label="Filter Calculators" style={{ marginBottom: "2.5rem" }}>
        <HomeSearchFilter calculators={allCalculators} cardContent={CALCULATOR_CARD_CONTENT} />
      </section>

      {/* Connected System Flow */}
      <section style={{ marginBottom: "3rem" }}>
        <ConnectedSystemFlow />
      </section>

      {/* Browse by Category Quick Links */}
      <section aria-labelledby="category-overview-heading" style={{ marginBottom: "3rem" }}>
        <h2 id="category-overview-heading" style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
          Browse Calculators by Discipline
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(categoryDescriptions).map(([catKey, cat]) => (
            <Link
              key={catKey}
              href={`/${catKey}`}
              style={{
                display: "block",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                background: "var(--card-bg, #ffffff)",
                border: "1px solid var(--border-color, #cbd5e1)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{cat.icon}</div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.1rem" }}>{cat.label}</h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Specialized Calculation Tools & Sizing Guides */}
      <section aria-labelledby="featured-tools-heading" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
          <h2 id="featured-tools-heading" style={{ fontSize: "1.35rem", margin: 0 }}>
            Specialized NEC Sizing Engines &amp; Technical Tools
          </h2>
          <Link href="/guides" style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            View all guides &amp; tools →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* NEC 705.12 Busbar Calculator & Guide */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem" }}>⚡</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#38bdf8", background: "rgba(56, 189, 248, 0.12)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                  Interactive Calculator + NEC 2023 Guide
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem" }}>
                NEC 705.12 120% Busbar &amp; Main Breaker Derating Calculator
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.45 }}>
                Calculate solar and battery backfeed allowances, simulate 1-click main breaker derating scenarios, and inspect physical busbar opposite-end layouts under NFPA 70 / NEC 705.12(B).
              </p>
            </div>
            <Link
              href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                background: "var(--brand-strong, #0284c7)",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              Launch Busbar Calculator &amp; Guide →
            </Link>
          </div>

          {/* Inverter Clipping Guide & Sizing Tool */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem" }}>☀️</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#4ade80", background: "rgba(74, 222, 128, 0.12)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                  Engineering Reference Guide
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem" }}>
                Solar Inverter Clipping &amp; DC-to-AC Ratio Sizing Guide
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.45 }}>
                Evaluate inverter clipping losses, optimal 1.15–1.35 DC/AC oversizing ratios across warm vs cold climates, and grid interconnection considerations referencing IEEE 1547.
              </p>
            </div>
            <Link
              href="/guides/solar-inverter-clipping-and-dc-ac-ratio-guide"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                background: "var(--brand-strong, #0284c7)",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              Read Inverter Clipping Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Trust Badges */}
      <TrustBadges />
    </div>
  );
}

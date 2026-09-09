import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/calculator-registry";
import { HomeSearchFilter } from "@/components/home/home-search-filter";
import { CALCULATOR_CARD_CONTENT } from "@/data/calculator-card-content";
import { TrustBadges } from "@/components/home/trust-badges";
import { ConnectedSystemFlow } from "@/components/home/connected-system-flow";

export const metadata: Metadata = {
  title: "All Clean Energy Calculators - Solar, Battery, EV & Home Energy",
  description: "Complete directory of open-source deterministic energy calculators. Sizing tools for solar PV, battery runtime, wire voltage drop, and EV charging under NEC and IEEE standards.",
  alternates: { canonical: "/calculators" },
  openGraph: {
    title: "All Clean Energy Calculators - Solar, Battery, EV & Home Energy",
    description: "Complete directory of open-source deterministic energy calculators. Sizing tools for solar PV, battery runtime, wire voltage drop, and EV charging under NEC and IEEE standards.",
    url: `${siteConfig.url}/calculators`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
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
          Explore PowerLab&apos;s full suite of deterministic computational models. Built with pure TypeScript, our engines run entirely in your browser with zero paywalls, tracking, or cloud dependencies. Every calculation adheres to NFPA 70 / NEC 2023, IEEE 1547-2018, and NREL SAM standards.
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

      {/* Engineering Trust Badges */}
      <TrustBadges />
    </div>
  );
}

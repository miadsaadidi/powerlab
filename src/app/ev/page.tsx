import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedCalculatorsForCategory, isCategoryPublished } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";
import { CategoryWorkflow } from "@/components/category-workflow";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";


const evToolContent: Record<string, string> = {
  "ev-charging-time": "Estimate AC and DC EV charging times from usable battery capacity, charge level and charger power.",
  "ev-charging-cost": "Estimate cost per charge and cost per mile or kilometer using your driving efficiency and electricity rate.",
  "ev-range": "Estimate real-world driving range from usable battery capacity, charge level, reserve, and vehicle efficiency.",
  "ev-savings": "Compare annual EV electricity costs with gas or diesel fuel costs for the same annual driving distance.",
  "v2l-runtime": "Calculate how many days your EV can power essential home appliances during an electrical blackout.",
  "ev-breaker-size": "Find the exact circuit breaker size, wire gauge (AWG), and charging speed for your Level 2 EV charger.",
};

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Calculators — Charging & Savings",
  description: "Free deterministic EV planning tools to calculate charging time, charging cost, real-world driving range, and annual fuel savings vs gas.",
  canonicalPath: "/ev",
  category: "ev",
});

export default function EvHub() {
  if (!isCategoryPublished("ev")) notFound();
  const tools = getPublishedCalculatorsForCategory("ev");
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "EV",
    categoryRoute: "/ev",
    description: "Calculate EV charging time across Level 1, Level 2 AC and DC fast chargers, estimate cost per charge, predict driving range, and compare fuel savings.",
    tools: tools.map((t) => ({ name: t.name, route: t.route, description: evToolContent[t.id] ?? t.name })),
  });


  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>EV</span></nav>
    <p className="eyebrow">Electric Vehicle Energy Planning</p>
    <h1>EV Calculators</h1>
    <p className="intro">Calculate EV charging time across Level 1, Level 2 AC and DC fast chargers, estimate cost per charge, predict driving range, and compare annual electric vs fuel savings.</p>
    <section aria-labelledby="ev-tools-heading">
      <h2 id="ev-tools-heading">Available EV calculators</h2>
      <div
        className="available-tool-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.route}
            className="flow-node-card home-calc-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #8b5cf6",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#8b5cf6",
                }}
              >
                Electric Vehicles
              </span>
              <span style={{ fontSize: "1.5rem" }}>
                {tool.id === "ev-charging-time"
                  ? "⚡"
                  : tool.id === "ev-charging-cost"
                  ? "💳"
                  : tool.id === "ev-range"
                  ? "🛣️"
                  : tool.id === "v2l-runtime"
                  ? "🚗"
                  : tool.id === "ev-breaker-size"
                  ? "🔌"
                  : "⛽"}
              </span>
            </div>

            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700 }}>
              {tool.name}
            </h3>

            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#8b5cf6",
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {tool.id === "ev-charging-time"
                ? "Hours • Level 1/2 • DC Fast"
                : tool.id === "ev-charging-cost"
                ? "Cost per Session • Cost/Mile"
                : tool.id === "ev-range"
                ? "Miles • mi/kWh • Cold Weather"
                : tool.id === "v2l-runtime"
                ? "Days • Outage Backup • 20% Reserve"
                : tool.id === "ev-breaker-size"
                ? "NEC 125% • 240V Double-Pole • AWG"
                : "Annual Fuel Savings • ICE vs EV"}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {evToolContent[tool.id] ?? tool.name}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#8b5cf6",
              }}
            >
              <span>Explore {tool.name}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <SystemFlowDiagram category="ev" />

    <CategoryWorkflow
      categoryTitle="Electric Vehicle"
      categoryDescription="Follow our 4-step workflow to plan EV driving efficiency, compare operating costs against gasoline, and optimize charging sessions:"
      steps={[
        {
          step: 1,
          title: "Estimate Real Driving Range",
          description: "Calculate expected miles or kilometers per charge across city, highway, and winter conditions.",
          href: "/ev/ev-range-calculator",
          badge: "Step 1 • Range Math",
          icon: "🚗",
        },
        {
          step: 2,
          title: "Compare EV vs Gas Savings",
          description: "Calculate annual dollar savings compared to internal combustion fuel and maintenance.",
          href: "/ev/ev-savings-calculator",
          badge: "Step 2 • Fuel Savings",
          icon: "💰",
        },
        {
          step: 3,
          title: "Estimate Charging Speeds",
          description: "Calculate charging duration across Level 1, Level 2 AC and DC Fast Charging stations.",
          href: "/ev/ev-charging-time-calculator",
          badge: "Step 3 • Charge Time",
          icon: "⏱️",
        },
        {
          step: 4,
          title: "Calculate Session & Mile Costs",
          description: "Calculate exact monetary expense per charging session and per-mile driving cost.",
          href: "/ev/ev-charging-cost-calculator",
          badge: "Step 4 • Electricity Cost",
          icon: "⚡",
        },
      ]}
    />

    <StandardsBadge category="ev" />

    <section className="hub-support" aria-labelledby="which-ev-tool-heading">
      <h2 id="which-ev-tool-heading">Which EV calculator should I use?</h2>
      <div className="trust-grid">
        <article>
          <h3>To estimate charging duration:</h3>
          <p>Use the <Link href="/ev/ev-charging-time-calculator">EV Charging Time Calculator</Link> to calculate hours and minutes for Level 1, Level 2, or DC fast charging with realistic taper curves.</p>
        </article>
        <article>
          <h3>To estimate charging cost:</h3>
          <p>Use the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link> to calculate the cost to charge at home or public stations based on your local electricity price.</p>
        </article>
        <article>
          <h3>For range &amp; fuel savings comparison:</h3>
          <p>Use the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link> to estimate miles/km per charge, or the <Link href="/ev/ev-savings-calculator">EV Savings Calculator</Link> to compare electricity vs gas costs.</p>
        </article>
        <article>
          <h3>For vehicle-to-home blackout emergency power:</h3>
          <p>Use the <Link href="/ev/v2l-runtime-calculator">V2L Runtime Calculator</Link> to simulate how many days your EV traction battery can power essential household appliances while preserving emergency driving range.</p>
        </article>
        <article>
          <h3>For home Level 2 charger circuit sizing:</h3>
          <p>Use the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link> to determine double-pole breaker amperage (NEC 125% rule), Romex vs THHN copper wire gauge, and charging speed.</p>
        </article>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="ev-guides-heading">
      <h2 id="ev-guides-heading">Featured EV Engineering Guides</h2>
      <p>Explore our peer-reviewed electrical installation and charging speed technical reference:</p>
      <div className="supporting-links" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "0.75rem" }}>
        <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" className="footer-link">🚗 Level 2 EV Charging Speed &amp; Breaker Sizing Guide</Link>
        <Link href="/guides" className="footer-link">📚 All Engineering Guides</Link>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="ev-method-heading">
      <h2 id="ev-method-heading">Realistic charging and conversion models</h2>
      <p>Our EV engines account for onboard charger limits, AC/DC conversion losses, and fast-charge thermal tapering. Read our <Link href="/methodology">methodology</Link> or <Link href="/sources">sources</Link>.</p>
    </section>
  </section>;
}



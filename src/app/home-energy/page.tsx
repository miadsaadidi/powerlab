import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getPublishedCalculatorsForCategory, isCategoryPublished } from "@/lib/navigation";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";
import { CategoryWorkflow } from "@/components/category-workflow";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";


import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Energy Calculators — Power Usage & Bills",
  description: "Free deterministic home energy calculators to estimate appliance electricity usage, calculate utility power bills, and size whole-home battery backup.",
  canonicalPath: "/home-energy",
  category: "home-energy",
});

const toolDescriptions: Record<string, string> = {
  "electricity-usage": "Estimate daily, monthly and annual electricity use from appliance power, schedules, cycles or energy-label values.",
  "energy-bill": "Estimate an electricity bill from your usage, electricity price and optional fixed or standing charges.",
  "home-battery-size": "Estimate home battery capacity from household energy, backup scope and outage duration with transparent planning assumptions.",
  "appliance-wattage": "Estimate running watts from an editable preset or appliance label, then calculate energy use for a selected runtime.",
  "generator-size": "Calculate generator running and starting wattage requirements for storm outages and emergency home backup.",
  "ac-cost": "Estimate hourly, monthly, and full-season air conditioning electricity costs for window units, mini-splits, and central AC.",
  "space-heater-cost": "Calculate operating costs per hour, per 8-hour night, and per winter month for electric space heaters and radiators.",
  "heat-pump-cost": "Compare annual running costs of an electric heat pump against natural gas, propane, and fuel oil heating systems.",
};

export default function HomeEnergyHub() {
  if (!isCategoryPublished("home-energy")) notFound();
  const tools = getPublishedCalculatorsForCategory("home-energy").filter((calculator) => toolDescriptions[calculator.id]);
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    description: "Calculate electricity usage by appliance or whole home, estimate monthly electric bills, find appliance running watts, and size home battery storage.",
    tools: tools.map((t) => ({ name: t.name, route: t.route, description: toolDescriptions[t.id] })),
  });


  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Home Energy</span></nav>
    <p className="eyebrow">Household Energy &amp; Cost Planning</p>
    <h1>Home Energy Calculators</h1>
    <p className="intro">Calculate electricity usage by appliance or whole home, estimate monthly electric bills with standing charges and tiered rates, find appliance running watts, and size home battery storage.</p>
    <section aria-labelledby="home-energy-tools-heading">
      <h2 id="home-energy-tools-heading">Available home energy calculators</h2>
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
              borderTop: "4px solid #0284c7",
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
                  color: "#0284c7",
                }}
              >
                Home Energy
              </span>
              <span style={{ fontSize: "1.5rem" }}>
                {tool.id === "electricity-usage"
                  ? "💡"
                  : tool.id === "energy-bill"
                  ? "💵"
                  : tool.id === "appliance-wattage"
                  ? "🔌"
                  : tool.id === "generator-size"
                  ? "⚙️"
                  : tool.id === "ac-cost"
                  ? "🌬️"
                  : tool.id === "space-heater-cost"
                  ? "🔥"
                  : tool.id === "heat-pump-cost"
                  ? "🔄"
                  : "🏡"}
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
                color: "#0284c7",
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {tool.id === "electricity-usage"
                ? "Watts • Daily & Monthly kWh"
                : tool.id === "energy-bill"
                ? "Cost • Tiered Rates • Standing Fee"
                : tool.id === "appliance-wattage"
                ? "Volts • Amps • Surge Power"
                : tool.id === "generator-size"
                ? "Starting & Running Watts • Outage"
                : tool.id === "ac-cost"
                ? "SEER2 • BTU • Hourly & Monthly Cost"
                : tool.id === "space-heater-cost"
                ? "500W–1500W • Overnight 8h • Cost"
                : tool.id === "heat-pump-cost"
                ? "COP vs Gas/Oil/Propane • Annual ROI"
                : "kWh • Whole-Home Outage Backup"}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {toolDescriptions[tool.id]}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#0284c7",
              }}
            >
              <span>Explore {tool.name}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <SystemFlowDiagram category="home-energy" />

    <CategoryWorkflow
      categoryTitle="Home Energy"
      categoryDescription="Follow our 4-step workflow to audit household electrical demand, calculate utility costs, and engineer home backup resilience:"
      steps={[
        {
          step: 1,
          title: "Lookup Device Wattages",
          description: "Estimate continuous and starting surge watts from appliance labels or presets.",
          href: "/home-energy/appliance-wattage-calculator",
          badge: "Step 1 • Power Draw",
          icon: "🔌",
        },
        {
          step: 2,
          title: "Audit Energy Usage (kWh)",
          description: "Tally appliance schedules, duty cycles, and monthly household consumption.",
          href: "/home-energy/electricity-usage-calculator",
          badge: "Step 2 • Energy Audit",
          icon: "📊",
        },
        {
          step: 3,
          title: "Estimate Electricity Bills",
          description: "Calculate monthly electric utility costs with standing charges, tiers, and tax.",
          href: "/home-energy/energy-bill-calculator",
          badge: "Step 3 • Bill Analysis",
          icon: "💵",
        },
        {
          step: 4,
          title: "Size Home Battery Backup",
          description: "Size residential battery capacity for critical essentials or 100% whole-home backup.",
          href: "/home-energy/home-battery-size-calculator",
          badge: "Step 4 • Home Storage",
          icon: "🔋",
        },
      ]}
    />

    <StandardsBadge category="home-energy" />

    <section className="hub-support" aria-labelledby="which-home-energy-tool-heading">
      <h2 id="which-home-energy-tool-heading">Which home energy tool should I use?</h2>
      <div className="trust-grid">
        <article>
          <h3>To audit appliance &amp; household electricity:</h3>
          <p>Use the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link> to tally daily, monthly, and annual kWh across appliances, or the <Link href="/home-energy/appliance-wattage-calculator">Appliance Wattage Calculator</Link> to look up typical device watts.</p>
        </article>
        <article>
          <h3>To estimate electric bills &amp; utility costs:</h3>
          <p>Use the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link> to calculate total bills from your energy rate ($/kWh), standing daily charges, and local sales tax.</p>
        </article>
        <article>
          <h3>For storm outages, generators &amp; battery backup:</h3>
          <p>Use the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link> to calculate running and motor surge watts for portable/standby generators, or the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link> to plan whole-home storage.</p>
        </article>
        <article>
          <h3>To calculate AC cooling electricity costs:</h3>
          <p>Use the <Link href="/home-energy/air-conditioner-cost-calculator">Air Conditioner Cost Calculator</Link> to estimate hourly, monthly, and seasonal electric bills for window units, mini-splits, and central AC systems.</p>
        </article>
        <article>
          <h3>To analyze winter space heaters vs heat pumps:</h3>
          <p>Use the <Link href="/home-energy/space-heater-cost-calculator">Space Heater Cost Calculator</Link> to compute electric heater running costs, or the <Link href="/home-energy/heat-pump-cost-calculator">Heat Pump Cost Calculator</Link> to compare heat pump operating savings against gas, propane, and fuel oil.</p>
        </article>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="home-energy-guides-heading">
      <h2 id="home-energy-guides-heading">Featured Home Energy Guides</h2>
      <p>Explore our empirical reference guides for residential electricity audits and emergency power planning:</p>
      <div className="supporting-links" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "0.75rem" }}>
        <Link href="/guides/how-many-kwh-does-a-house-use-per-day" className="footer-link">📊 How Many kWh Does a House Use Per Day Guide</Link>
        <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide" className="footer-link">⚡ Emergency Generator Sizing &amp; Motor Inrush Guide</Link>
        <Link href="/guides" className="footer-link">📚 All Engineering Guides</Link>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="home-energy-method-heading">
      <h2 id="home-energy-method-heading">Transparent household energy accounting</h2>
      <p>Our home energy models separate continuous running load from peak connected load, accounting for duty cycles, standby power, and seasonal heating/cooling variance. Review our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.</p>
    </section>
  </section>;
}



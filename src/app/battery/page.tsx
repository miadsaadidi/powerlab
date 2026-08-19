import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { isCategoryPublished, getPublishedCalculatorsForCategory } from "@/lib/navigation";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";
import { CategoryWorkflow } from "@/components/category-workflow";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";





const batteryToolContent: Record<string, string> = {
  "battery-runtime": "Estimate how long your battery can power a load, with editable reserve, battery health and efficiency assumptions.",
  "battery-size": "Estimate the battery capacity needed for a load and backup time, with clear planning assumptions.",
  "battery-capacity": "Convert Ah, mAh, Wh and kWh using voltage, then estimate usable battery energy.",
  "ups-runtime": "Estimate how long a UPS can support your equipment from usable battery energy and load watts.",
  "ups-battery-size": "Calculate UPS battery Wh and Ah from load, backup time and editable planning assumptions.",
  "battery-charging-time": "Estimate charging time from capacity, state of charge and charger output with editable battery-limit assumptions.",
  "portable-power-station": "Estimate portable power station runtime or required capacity while checking continuous and startup output limits.",
  "voltage-drop": "Calculate DC and AC wire gauge sizing, voltage drop percentage, and power loss in watts under NEC standards.",
  "inverter-size": "Calculate continuous and surge inverter wattage, DC battery amperage, fuse rating, and battery cable gauge.",
};

export const metadata: Metadata = {
  title: "Battery Calculators",
  description: "Free deterministic battery planning tools to calculate runtime, bank sizing, Ah-to-Wh conversions, UPS backup, and charge times.",
  alternates: { canonical: "/battery" },
  openGraph: {
    title: "Battery Planning Calculators — Runtime, Size & Capacity",
    description: "Free deterministic battery planning tools to calculate runtime, bank sizing, Ah-to-Wh conversions, UPS backup, and charge times.",
    url: `${siteConfig.url}/battery`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Battery Planning Calculators",
    description: "Free deterministic battery planning tools to calculate runtime, bank sizing, Ah-to-Wh conversions, UPS backup, and charge times.",
  },
};

export default function BatteryHub() {
  if (!isCategoryPublished("battery")) notFound();
  const tools = getPublishedCalculatorsForCategory("battery").filter((calculator) => batteryToolContent[calculator.id]);
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "Battery",
    categoryRoute: "/battery",
    description: "Calculate battery backup runtime, size a battery bank for power outages, convert Ah to Wh, or estimate charge times with transparent formulas.",
    tools: tools.map((t) => ({ name: t.name, route: t.route, description: batteryToolContent[t.id] })),
  });


  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Battery</span></nav>
    <p className="eyebrow">Battery &amp; Backup Planning</p>
    <h1>Battery Calculators</h1>
    <p className="intro">Calculate battery backup runtime, size a battery bank for power outages, convert Ah to Wh, or estimate charge times with transparent, editable assumptions.</p>
    <section aria-labelledby="battery-tools-heading">
      <h2 id="battery-tools-heading">Available battery calculators</h2>
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
              borderTop: "4px solid #10b981",
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
                  color: "#10b981",
                }}
              >
                Battery Storage
              </span>
              <span style={{ fontSize: "1.5rem" }}>
                {tool.id === "battery-runtime"
                  ? "⏱️"
                  : tool.id === "battery-size"
                  ? "🔋"
                  : tool.id === "battery-capacity"
                  ? "⚡"
                  : tool.id === "battery-charging-time"
                  ? "🔌"
                  : tool.id === "ups-runtime"
                  ? "🖥️"
                  : tool.id === "ups-battery-size"
                  ? "🏢"
                  : tool.id === "home-battery-size"
                  ? "🏡"
                  : tool.id === "voltage-drop"
                  ? "📏"
                  : tool.id === "inverter-size"
                  ? "🔄"
                  : "⛺"}
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
                color: "#10b981",
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {tool.id === "battery-runtime"
                ? "Hours • Peukert Law • Inverter"
                : tool.id === "battery-size"
                ? "Ah ↔ Wh • Voltage Sizing"
                : tool.id === "battery-capacity"
                ? "Ah • Nominal Volts • Energy"
                : tool.id === "battery-charging-time"
                ? "Hours • Amps • C-Rate"
                : tool.id === "ups-runtime"
                ? "Minutes • VA to Watts • PF"
                : tool.id === "ups-battery-size"
                ? "Ah • Inverter Efficiency • Surge"
                : tool.id === "home-battery-size"
                ? "kWh • Whole-Home Outage Backup"
                : tool.id === "voltage-drop"
                ? "NEC 3% • AWG / mm² • Watts Loss"
                : tool.id === "inverter-size"
                ? "Continuous • Surge • DC Fuse & Cable"
                : "Wh • AC & DC Appliance Runtime"}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {batteryToolContent[tool.id]}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              <span>Explore {tool.name}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <SystemFlowDiagram category="battery" />

    <CategoryWorkflow
      categoryTitle="Battery & Energy Storage"
      categoryDescription="Follow our 4-step engineering workflow to calculate, size, convert, and verify battery performance for backup outages and off-grid living:"
      steps={[
        {
          step: 1,
          title: "Size Required Capacity",
          description: "Calculate required nominal kWh and Ah for your connected load and target autonomy.",
          href: "/battery/battery-size-calculator",
          badge: "Step 1 • Sizing",
          icon: "🔋",
        },
        {
          step: 2,
          title: "Convert Ah & Usable Wh",
          description: "Convert between Amp-hours, Watt-hours, and system voltages (12V, 24V, 48V).",
          href: "/battery/battery-capacity-calculator",
          badge: "Step 2 • Energy Math",
          icon: "🧮",
        },
        {
          step: 3,
          title: "Verify Outage Runtime",
          description: "Simulate exact backup duration (hours/minutes) with inverter efficiency and SOH derating.",
          href: "/battery/battery-runtime-calculator",
          badge: "Step 3 • Runtime",
          icon: "⏱️",
        },
        {
          step: 4,
          title: "Calculate Recharge Time",
          description: "Estimate charging hours from AC chargers or solar power with CC/CV taper allowances.",
          href: "/battery/battery-charging-time-calculator",
          badge: "Step 4 • Charging",
          icon: "⚡",
        },
      ]}
    />

    <StandardsBadge category="battery" />

    <section className="hub-support" aria-labelledby="which-battery-tool-heading">
      <h2 id="which-battery-tool-heading">Which battery calculator should I use?</h2>
      <div className="trust-grid">
        <article>
          <h3>If you already have a battery:</h3>
          <p>Use the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link> to estimate how many hours or days it can power your devices. For office equipment or servers, use the <Link href="/battery/ups-runtime-calculator">UPS Runtime Calculator</Link>, or check portable units with the <Link href="/battery/portable-power-station-calculator">Portable Power Station Calculator</Link>.</p>
        </article>
        <article>
          <h3>If you are planning backup power:</h3>
          <p>Use the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link> to find the required kWh or Ah for your backup duration, the <Link href="/battery/ups-battery-size-calculator">UPS Battery Size Calculator</Link> for desktop setups, or the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link> for household outages.</p>
        </article>
        <article>
          <h3>If you need unit conversions or charging estimates:</h3>
          <p>Use the <Link href="/battery/battery-capacity-calculator">Battery Capacity Calculator</Link> to convert Ah, mAh, Wh, and kWh, or the <Link href="/battery/battery-charging-time-calculator">Battery Charging Time Calculator</Link> to estimate recharge hours.</p>
        </article>
        <article>
          <h3>For electrical cable sizing &amp; voltage drop:</h3>
          <p>Use the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link> to determine copper wire gauge (AWG/mm²) and ensure DC/AC branch circuit voltage drop remains under 3%.</p>
        </article>
        <article>
          <h3>To size an off-grid DC-to-AC inverter:</h3>
          <p>Use the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link> to calculate continuous running watts, peak inductive motor starting surges, and DC battery cable fuse ampacity.</p>
        </article>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="battery-method-heading">
      <h2 id="battery-method-heading">Plan with the details that matter</h2>
      <p>Real battery performance depends on depth of discharge, battery chemistry, inverter efficiency, and ambient temperature. Our calculators expose every assumption so you can adjust them to your exact equipment.</p>
      <p><Link href="/methodology">Read the calculation methodology</Link> or <Link href="/sources">review laboratory sources &amp; standards</Link>.</p>
    </section>
  </section>;
}



import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCategoryPublished, getPublishedCalculatorsForCategory } from "@/lib/navigation";
import { buildCategoryHubStructuredData } from "@/lib/seo/structured-data";
import { CategoryWorkflow } from "@/components/category-workflow";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";




const solarToolContent: Record<string, string> = {
  "solar-panel-tilt": "Find a latitude-based starting panel angle, then compare your roof geometry with modeled production when available.",
  "solar-panel-output": "Estimate monthly and annual solar production for your location using system size and editable PVWatts assumptions.",
  "solar-battery-bank-size": "Estimate solar battery bank energy capacity from daily load, autonomy, SOC, efficiency and planning margin.",
  "solar-load": "Estimate daily appliance energy from watts, schedules, duty-cycle assumptions and essential-load planning.",
  "solar-panel-size": "Estimate solar system size and panel count from your energy target, panel wattage and modeled solar yield.",
  "solar-payback": "Calculate solar break-even timeline in years, 25-year net profit, and return on investment without lead-generation forms.",
  "solar-charge-controller": "Size MPPT and PWM solar charge controllers by required charging current and cold-weather Voc voltage limits.",
};

import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Calculators — PV Sizing, Tilt & Output",
  description: "Free physics-based solar planning calculators for tilt angle, monthly PVWatts production yield, array sizing, and off-grid battery banks.",
  canonicalPath: "/solar",
  category: "solar",
});

export default function SolarHub() {
  if (!isCategoryPublished("solar")) notFound();
  const tools = getPublishedCalculatorsForCategory("solar").filter((calculator) => solarToolContent[calculator.id]);
  const structuredData = buildCategoryHubStructuredData({
    categoryName: "Solar",
    categoryRoute: "/solar",
    description: "Calculate solar panel tilt angles, model monthly solar production using PVWatts, estimate array sizing, and plan off-grid solar battery storage.",
    tools: tools.map((t) => ({ name: t.name, route: t.route, description: solarToolContent[t.id] })),
  });


  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Solar</span></nav>
    <p className="eyebrow">Solar &amp; Photovoltaic Planning</p>
    <h1>Solar Calculators</h1>
    <p className="intro">Calculate solar panel tilt angles, model monthly solar production using PVWatts, estimate array sizing, and plan off-grid solar battery storage with transparent formulas.</p>
    <section aria-labelledby="solar-tools-heading">
      <h2 id="solar-tools-heading">Available solar calculators</h2>
      <div
        className="available-tool-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
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
              borderTop: "4px solid #f59e0b",
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
                  color: "#f59e0b",
                }}
              >
                Solar PV
              </span>
              <span style={{ fontSize: "1.5rem" }}>
                {tool.id === "solar-panel-tilt" ? "📐" : tool.id === "solar-panel-output" ? "☀️" : tool.id === "solar-panel-size" ? "🏠" : tool.id === "solar-battery-bank-size" ? "🔋" : tool.id === "solar-payback" ? "💰" : tool.id === "solar-charge-controller" ? "🎛️" : "📊"}
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
                color: "#f59e0b",
                background: "var(--bg-secondary, #f8fafc)",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "0.6rem",
              }}
            >
              {tool.id === "solar-panel-tilt"
                ? "Degrees • Pitch ↔ Tilt"
                : tool.id === "solar-panel-output"
                ? "kWh/yr • PVWatts V8 Model"
                : tool.id === "solar-panel-size"
                ? "kW DC • Panel Count • Area"
                : tool.id === "solar-battery-bank-size"
                ? "kWh • Autonomy Days • 48V"
                : tool.id === "solar-payback"
                ? "Years • 25-Yr ROI • Break-Even"
                : tool.id === "solar-charge-controller"
                ? "MPPT/PWM • Amps • Cold Voc"
                : "Wh/day • Peak vs Average"}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flexGrow: 1 }}>
              {solarToolContent[tool.id]}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#f59e0b",
              }}
            >
              <span>Explore {tool.name}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <SystemFlowDiagram category="solar" />

    <section aria-labelledby="solar-pv-benchmark-matrix" style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 id="solar-pv-benchmark-matrix">
        Solar PV Array Geometry, Climate Insolation &amp; System Derating Benchmarks
      </h2>
      <p>
        Accurate solar PV generation modeling requires combining solar position geometry, local Peak Sun Hours (PSH), NREL multiplicative DC loss factors, and inverter loading ratio (ILR) sizing:
      </p>
      <div className="scenario-table" role="region" aria-label="Solar PV system modeling benchmarks">
        <table>
          <caption>Regional solar array tilt geometry, specific yield &amp; system loss modeling matrix</caption>
          <thead>
            <tr>
              <th scope="col">Climatic Zone / Latitude</th>
              <th scope="col">Latitude Band</th>
              <th scope="col">Optimal Annual Fixed Tilt</th>
              <th scope="col">Daily Peak Sun Hours (PSH)</th>
              <th scope="col">Annual Specific Yield (kWh/kWp)</th>
              <th scope="col">Recommended DC/AC Ratio (ILR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Arid Desert (US Southwest / MENA)</strong></td>
              <td>25°N – 35°N</td>
              <td>Latitude − 2° (~30°)</td>
              <td>5.8 – 6.8 PSH/day</td>
              <td>1,650 – 1,900 kWh/kWp</td>
              <td>1.15 – 1.22</td>
            </tr>
            <tr>
              <td><strong>Sub-Tropical / Mediterranean</strong></td>
              <td>30°N – 38°N</td>
              <td>Latitude × 0.87 (~31°)</td>
              <td>4.5 – 5.5 PSH/day</td>
              <td>1,400 – 1,650 kWh/kWp</td>
              <td>1.20 – 1.28</td>
            </tr>
            <tr>
              <td><strong>Temperate Humid (US Mid-Atlantic / Western Europe)</strong></td>
              <td>38°N – 48°N</td>
              <td>Latitude × 0.85 (~35°)</td>
              <td>3.8 – 4.5 PSH/day</td>
              <td>1,150 – 1,400 kWh/kWp</td>
              <td>1.25 – 1.35</td>
            </tr>
            <tr>
              <td><strong>Northern / Cold-Climate (Canada / Northern Europe)</strong></td>
              <td>48°N – 60°N</td>
              <td>Latitude × 0.80 + 3° (~45°)</td>
              <td>3.0 – 3.8 PSH/day</td>
              <td>950 – 1,150 kWh/kWp</td>
              <td>1.30 – 1.40</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <CategoryWorkflow
      categoryTitle="Solar PV"
      categoryDescription="Follow our 4-step engineering sequence to plan a complete grid-tied or off-grid photovoltaic system from appliance energy demand to storage:"
      steps={[
        {
          step: 1,
          title: "Audit Daily Energy Demand",
          description: "Tally your household appliance schedules, duty cycles, and peak running watts.",
          href: "/solar/solar-load-calculator",
          badge: "Step 1 • Energy Load",
          icon: "📊",
        },
        {
          step: 2,
          title: "Size Array & Panel Count",
          description: "Calculate required DC nameplate capacity in kW and exact number of 400W panels.",
          href: "/solar/solar-panel-size-calculator",
          badge: "Step 2 • Array Sizing",
          icon: "🏠",
        },
        {
          step: 3,
          title: "Model Monthly PVWatts Yield",
          description: "Simulate month-by-month AC generation using NREL location irradiance data.",
          href: "/solar/solar-panel-output-calculator",
          badge: "Step 3 • Generation Yield",
          icon: "☀️",
        },
        {
          step: 4,
          title: "Size Battery Storage Bank",
          description: "Size nominal kWh and Ah battery capacity for continuous multi-day cloudy autonomy.",
          href: "/solar/solar-battery-bank-size-calculator",
          badge: "Step 4 • Storage Bank",
          icon: "🔋",
        },
      ]}
    />

    <StandardsBadge category="solar" />

    <section className="hub-support" aria-labelledby="which-solar-tool-heading">
      <h2 id="which-solar-tool-heading">Which solar calculator should I use?</h2>
      <div className="trust-grid">
        <article>
          <h3>To find your optimal panel angle:</h3>
          <p>Use the <Link href="/solar/solar-panel-tilt-calculator">Solar Panel Tilt Calculator</Link> to find seasonal and year-round tilt angles based on your latitude, and compare roof orientations.</p>
        </article>
        <article>
          <h3>To estimate solar generation &amp; system size:</h3>
          <p>Use the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link> to determine kW capacity and panel count, then the <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link> for location-specific monthly kWh yield.</p>
        </article>
        <article>
          <h3>For off-grid and battery storage planning:</h3>
          <p>Use the <Link href="/solar/solar-load-calculator">Solar Load Calculator</Link> to tally daily appliance energy, then the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link> to size your backup storage.</p>
        </article>
        <article>
          <h3>To calculate solar ROI &amp; payback period:</h3>
          <p>Use the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link> to model break-even years, 25-year cumulative cash flows, and return on investment with the 30% Federal ITC.</p>
        </article>
        <article>
          <h3>For MPPT charge controller sizing:</h3>
          <p>Use the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link> to calculate required charging amperage and sub-zero Voc open-circuit voltage rise.</p>
        </article>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="solar-guides-heading">
      <h2 id="solar-guides-heading">Featured Solar Engineering Guides &amp; Open Datasets</h2>
      <p>Explore our technical reference guides, empirical datasets, and research reports for solar photovoltaic system design:</p>
      <div className="supporting-links" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "0.75rem" }}>
        <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" className="footer-link">📊 Dataset: 50-State Solar Insolation &amp; Climatic Benchmark (PL-DS-SOL-03)</Link>
        <Link href="/solar/regional-climate-data" className="footer-link">🗺️ 50-State NREL Solar &amp; ASHRAE Climatic Database</Link>
        <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" className="footer-link">🔬 Research: Snow Albedo &amp; Sub-Zero Voc Expansion Paper</Link>
        <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" className="footer-link">☀️ Solar Panel Tilt Angle by Latitude &amp; Season Guide</Link>
        <Link href="/guides/mppt-solar-charge-controller-sizing-guide" className="footer-link">⚡ MPPT vs PWM Solar Charge Controller Sizing Guide</Link>
        <Link href="/guides/solar-payback-and-roi-calculation-guide" className="footer-link">📈 Solar Payback &amp; ROI Calculation Guide</Link>
        <Link href="/datasets" className="footer-link">📊 All Open Benchmark Datasets</Link>
        <Link href="/guides" className="footer-link">📚 All Engineering Guides</Link>
      </div>
    </section>
    <section className="hub-support" aria-labelledby="solar-method-heading">
      <h2 id="solar-method-heading">Physics-based calculations &amp; transparent model references</h2>
      <p>Our solar tools pair local geometry heuristics with NREL PVWatts V8 solar irradiance data. Every technical assumption (losses, inverter efficiency, DC-to-AC ratio) is visible and user-editable.</p>
      <p>Consult our <Link href="/solar/regional-climate-data">50-State Regional Climate Data</Link>, review applicable <Link href="/standards">engineering standards</Link>, browse all categories in the <Link href="/calculators">calculators directory</Link>, <Link href="/methodology">inspect our methodology</Link>, or <Link href="/sources">review laboratory sources</Link>.</p>
    </section>

    {/* Technical Disclaimer Notice */}
    <Disclaimer variant="standard" />
  </section>;
}



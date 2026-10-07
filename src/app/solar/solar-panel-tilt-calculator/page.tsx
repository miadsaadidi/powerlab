import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { SolarPanelTiltCalculator } from "@/components/calculator/solar-panel-tilt-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("solar-panel-tilt");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Tilt Calculator — Optimal Angle",
  description: "Calculate optimal solar panel tilt angle and azimuth for your latitude. Features seasonal summer/winter angle adjustments and roof pitch comparison.",
  canonicalPath: "/solar/solar-panel-tilt-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "What is the optimal angle for solar panels?",
    answer: "As an engineering reference formula, the optimal year-round tilt angle for fixed solar panels equals Latitude × 0.76 + 3.1°. Simplified rules of thumb often use your latitude directly. For example, at 34° latitude (e.g. Los Angeles), the canonical formula calculates 29° (with simplified rule of thumb at 34° and regional modeled estimates around 31°). At 35° latitude, optimal tilt is approximately 30° facing True South (in the Northern Hemisphere) or True North (in the Southern Hemisphere).",
  },
  {
    question: "How much power do you lose if your roof pitch isn't optimal?",
    answer: "Under typical insolation conditions, a tilt angle within ±10° to 15° of optimal typically reduces total annual energy production by less than 3% to 5%, though exact variance depends on local climate, diffuse-to-direct irradiance ratios, and azimuth. Because the losses are relatively modest, it is usually more cost-effective to mount solar panels flush with your existing roof pitch rather than installing expensive racking tilt legs.",
  },
  {
    question: "Should solar panels be adjusted seasonally?",
    answer: "For ground-mounted or adjustable rack systems, adjusting tilt seasonally can increase annual energy capture by approximately 4% to 7% in sunny climates with low cloud cover. As practical rules of thumb: in summer, tilt panels Latitude − 15° to capture higher midday sun; in winter, tilt panels Latitude + 15° to capture lower winter sun and assist snow shedding. Actual annual yield gains depend on local seasonal cloud distribution and diffuse irradiance.",
  },
  {
    question: "What compass direction should solar panels face?",
    answer: "In the Northern Hemisphere, solar panels should face True South (180° azimuth). In the Southern Hemisphere, they should face True North (0° azimuth). West-facing panels are also popular for time-of-use (TOU) utility rate structures because they generate peak power during high-rate late afternoon peak hours.",
  },
];

export default function SolarTiltPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Tilt Calculator",
    description: "Calculate optimal solar panel tilt angle and compass orientation for your latitude.",
    route: "/solar/solar-panel-tilt-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates seasonal and year-round solar panel tilt angle from latitude",
      "Determines equator-facing azimuth orientation",
      "Compares current roof pitch and azimuth with modeled PVWatts yield",
      "No account required — calculations run locally in your browser",
    ],
    standards: [
      "NREL PVWatts V8 Photovoltaic Performance Model",
      "NREL Solar Position Algorithm (SPA)",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "ASHRAE Handbook of Fundamentals (Solar Heat Gain & Solar Geometry)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/solar">Solar</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Panel Tilt Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar planning</p>
        <h1>Solar Panel Tilt Calculator</h1>
        <p className="intro">
          Find the optimal solar panel tilt angle and orientation for your geographic latitude, calculate seasonal summer/winter angles, and compare existing roof pitches with NREL PVWatts production models.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarPanelTiltCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="solar panel tilt calculator"
        answer="As an engineering reference formula, optimal fixed year-round solar panel tilt is calculated as Latitude × 0.76 + 3.1°. Simplified rules of thumb often use your latitude directly. For seasonal adjustments, tilt panels approximately Latitude + 15° in winter (when the sun is lower) and Latitude − 15° in summer."
        formula="Year-Round Tilt = Latitude × 0.76 + 3.1° · Facing True South (180° in Northern Hemisphere) or True North (0° in Southern Hemisphere)"
        standardExample="For 34° N latitude (e.g., Los Angeles), the canonical year-round tilt is 29° (34 × 0.76 + 3.1°), with summer tilt at 19° and winter tilt at 49°, facing True South (180°). For 35° N latitude, year-round tilt is 30°."
        sourceAuthority="Technical Reference / Model Basis: NREL / PVWatts Solar Geometry Models & Empirical Insolation Literature"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Find Your Optimal Solar Panel Tilt Angle</h2>
        <ol>
          <li><strong>Enter Latitude or Location:</strong> Type your city or geographic latitude (e.g. 34.05° for Los Angeles or −33.87° for Sydney).</li>
          <li><strong>Choose Optimization Goal:</strong> Review canonical year-round maximum yield (Lat × 0.76 + 3.1°), winter optimization (+15°), or summer optimization (−15°).</li>
          <li><strong>Check Compass Direction (Azimuth):</strong> Aim True South (180°) in the Northern Hemisphere or True North (0°) in the Southern Hemisphere.</li>
          <li><strong>Compare Existing Roof Pitch:</strong> Optionally compare your actual roof pitch (e.g. 4/12 or 6/12 slope) against the theoretical ideal using NREL PVWatts.</li>
        </ol>

        <SystemFlowDiagram category="solar" title="Solar PV Irradiance Geometry & AC Power Flow" />
      </section>

      <section id="sizing-matrix">
        <h2>Solar Panel Tilt Angle by Latitude Reference Chart</h2>
        <p>Representative optimal tilt angles and seasonal adjustments across common latitudes:</p>
        <div className="scenario-table" role="region" aria-label="Solar panel tilt reference by latitude">
          <table>
            <caption>Optimal solar panel tilt angle and orientation by latitude</caption>
            <thead>
              <tr>
                <th scope="col">Latitude / Region</th>
                <th scope="col">Summer Tilt (Lat − 15°)</th>
                <th scope="col">Year-Round Canonical (Lat × 0.76 + 3.1°)</th>
                <th scope="col">Winter Tilt (Lat + 15°)</th>
                <th scope="col">Optimal Orientation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>25° N</strong> (Miami, Taipei, Dubai)</td>
                <td>10°</td>
                <td>22°</td>
                <td>40°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>30° N</strong> (Houston, Cairo, New Delhi)</td>
                <td>15°</td>
                <td>26°</td>
                <td>45°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>34° N</strong> (Los Angeles, Beirut, Rabat)</td>
                <td>19°</td>
                <td>29°</td>
                <td>49°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>35° N</strong> (Charlotte, Tokyo, Tehran)</td>
                <td>20°</td>
                <td>30°</td>
                <td>50°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>40° N</strong> (New York, Madrid, Denver)</td>
                <td>25°</td>
                <td>34°</td>
                <td>55°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>45° N</strong> (Seattle, Minneapolis, Milan)</td>
                <td>30°</td>
                <td>37°</td>
                <td>60°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>50° N</strong> (London, Vancouver, Frankfurt)</td>
                <td>35°</td>
                <td>41°</td>
                <td>65°</td>
                <td>True South (180°)</td>
              </tr>
              <tr>
                <td><strong>34° S</strong> (Sydney, Cape Town, Buenos Aires)</td>
                <td>19°</td>
                <td>29°</td>
                <td>49°</td>
                <td>True North (0°)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar Panel Tilt Angle & Ground Albedo Calculation Formulas"
          formula="Year_Round = Latitude × 0.76 + 3.1°  |  Summer = Latitude - 15°  |  Winter = Latitude + 15°  |  G_ground = G_horiz × ρ × (1 - cos β) / 2"
          formulaDescription="Calculates optimal fixed solar panel tilt relative to horizontal based on geographic latitude, solar geometry, and simplified isotropic ground-reflected albedo view factor."
          variables={[
            { symbol: "Latitude", label: "Geographic Latitude", description: "Distance north (+) or south (-) from Earth's equator.", unit: "degrees" },
            { symbol: "Year_Round", label: "Fixed Annual Optimal Tilt", description: "Maximizes cumulative annual kilowatt-hour solar harvest for fixed mounts.", unit: "degrees" },
            { symbol: "Summer", label: "Summer Tilt (Rule of Thumb)", description: "Flatter angle optimized for higher summer solar noon trajectory.", unit: "degrees" },
            { symbol: "Winter", label: "Winter Tilt (Rule of Thumb)", description: "Steeper angle optimized for lower winter sun trajectories and snow shedding.", unit: "degrees" },
            { symbol: "G_ground", label: "Ground-Reflected Irradiance", description: "Simplified isotropic ground-view factor diffuse irradiance estimate.", unit: "W/m²" },
            { symbol: "ρ (rho)", label: "Ground Albedo Coefficient", description: "Surface reflectance: ~0.20 for dark ground/grass; ~0.70 for fresh snow pack.", unit: "fraction" },
            { symbol: "β (beta)", label: "Panel Tilt Angle", description: "Array inclination angle relative to horizontal.", unit: "degrees" },
          ]}
          notes={[
            "Equator-facing azimuth orientation: 180° (True South) in the Northern Hemisphere; 0° (True North) in the Southern Hemisphere.",
            "Canonical vs. Modeled Presets: The canonical formula (Latitude × 0.76 + 3.1°) provides a clear-sky geometric starting estimate. Regional weather-modeled simulations (such as NREL PVWatts V8) incorporate local cloudiness, atmospheric turbidity, and diffuse-to-direct irradiance ratios, which can shift the empirical optimum by 1° to 3°.",
            "Ground Albedo Model: The ground reflection calculation uses the standard isotropic view factor (1 - cos β)/2. When fresh snow is present (ρ ≈ 0.70), steep winter tilts expand foreground diffuse reflection.",
            "A tilt angle deviation of ±10° to 15° from optimal typically causes less than 3% to 5% loss in total annual solar generation under average insolation conditions.",
          ]}
        />
      </div>

      <section id="technical-basis" style={{ marginTop: "2.5rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>
          This calculator integrates solar geometric principles, empirical clear-sky insolation literature, and NREL photovoltaic performance modeling:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.15rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem" }}>📐 Solar Geometry &amp; SPA</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Solar noon elevation and incidence angle calculations follow spherical astronomical geometry and the NREL Solar Position Algorithm (SPA).
            </p>
          </div>
          <div style={{ padding: "1.15rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem" }}>🔬 NREL PVWatts V8 Engine</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Roof-pitch comparison and regional benchmarks use NREL PVWatts V8 hourly simulation models with standard system loss derates (14.08%).
            </p>
          </div>
          <div style={{ padding: "1.15rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem" }}>❄️ Isotropic Ground View Factor</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Foreground albedo reflection is modeled using the standard geometric view factor (1 − cos β) / 2 under isotropic diffuse sky assumptions.
            </p>
          </div>
          <div style={{ padding: "1.15rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem" }}>📊 Regional NSRDB Data</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Benchmark insolation values are derived from the NREL National Solar Radiation Database (NSRDB) and representative state weather stations.
            </p>
          </div>
        </div>
      </section>

      <section id="faq-section" className="faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className="faq-grid">
          {FAQS.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section id="related-tools">
        <h2>Connected Solar Planning &amp; Engineering Cluster</h2>
        <p>
          Determining the optimal fixed or seasonal tilt angle is step one in photovoltaic system engineering. PowerLab links array orientation geometry directly into full-year generation modeling, state climatic benchmarks, and investment economics:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>☀️ Simulate AC kWh Generation</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Model annual kilowatt-hour harvest using our NREL PVWatts V8 hourly simulation engine. Evaluate exact production derates if your actual roof pitch differs from ideal tilt.
            </p>
            <Link href="/solar/solar-panel-output-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Solar Panel Output Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🗺️ 50-State Solar &amp; Climate Matrix</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Access standardized NREL NSRDB peak sun hours, ASHRAE climatic design temperatures, and EIA residential electricity rates across all 50 U.S. states.
            </p>
            <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              50-State Insolation Benchmark Dataset →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📖 Solar Tilt &amp; Season Guide</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Explore mathematical models, solar geometry, global latitude matrices, and snow albedo reflection mechanics.
            </p>
            <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Solar Panel Tilt Angle Guide →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>💰 Payback &amp; Battery Bank Sizing</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Translate annual kWh generation into financial payback schedules or size an off-grid lithium/lead-acid battery bank for multi-day autonomy.
            </p>
            <Link href="/solar/solar-payback-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Solar Payback Calculator →
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Also explore regional meteorological tables in our <Link href="/solar/regional-climate-data" style={{ fontWeight: 600, color: "var(--accent)" }}>U.S. Regional Solar Insolation &amp; Climate Database</Link> or inspect open-circuit voltage cold-expansion mechanics in research paper <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontWeight: 600, color: "var(--accent)" }}>PL-TR-2026-SOL03</Link>.
        </p>
      </section>
    </article>
  );
}

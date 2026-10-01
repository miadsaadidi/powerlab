import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarPanelTiltCalculator } from "@/components/calculator/solar-panel-tilt-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Tilt Angle by Latitude & Season Guide",
  description: "Calculate solar panel starting tilt angles by latitude and season. Explore mathematical models for year-round yield, winter steep angles, and summer shallow angles.",
  canonicalPath: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the formula to calculate a starting solar panel tilt angle?",
    answer: "For a fixed year-round installation, a widely used heuristic estimate is: Tilt = |Latitude| × 0.87. For winter seasonal optimization: Tilt = (|Latitude| × 0.89) + 24°. For summer seasonal optimization: Tilt = (|Latitude| × 0.93) - 21°. For spring/autumn: Tilt = |Latitude| - 2.5°. In the Northern Hemisphere, panels should face True South (180° azimuth), and in the Southern Hemisphere, True North (0° azimuth). These angles serve as starting planning estimates; site-specific shading, roof pitch, and time-of-use tariffs may warrant adjustments.",
  },
  {
    question: "Why is winter solar panel tilt steeper than summer tilt?",
    answer: "Earth's 23.44° axial tilt causes the solar elevation angle at solar noon to be significantly lower in winter (up to 46.88° lower than at the summer solstice). A steeper panel angle (e.g. 50° to 65° in mid-to-high latitudes) aligns the panel surface normal vector with the low winter sun rays, maximizing direct beam cosine capture while promoting natural snow shedding.",
  },
  {
    question: "How much extra energy do seasonal tilt adjustments produce?",
    answer: "Adjusting panel tilt twice a year (summer vs. winter angle) typically increases modeled annual energy generation by approximately 4% to 7% compared to a fixed year-round tilt. Adjusting four times per year can yield roughly 6% to 9% more annual energy. For off-grid solar systems with critical winter power deficits, a steep winter tilt can boost winter monthly generation by 25% or more compared to a shallow summer angle.",
  },
  {
    question: "What is the difference between True South and Magnetic South?",
    answer: "Solar azimuth must be aligned to True Geographic South (or True North in the Southern Hemisphere), not Magnetic South. Magnetic compass needles point toward the magnetic poles. Depending on geographic location, magnetic declination can vary by ±15° or more, requiring compass adjustment to locate true geographic meridian.",
  },
  {
    question: "Is it worth tilting solar panels on a low-slope or residential pitched roof?",
    answer: "On residential pitched roofs (typically 15° to 35° / 3:12 to 8:12 pitch), flush-mounting panels parallel to the roof plane is standard practice. Flush mounting preserves roof warranty, reduces wind uplift loads, and typically captures 90% to 98% of maximum theoretical annual solar yield without the complexity and cost of tilt racking.",
  },
];

export default function SolarTiltGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Solar Panel Tilt Angle by Latitude & Season Guide",
    description: "Engineering guide to solar panel tilt angles, seasonal adjustments, azimuth alignment, and cosine irradiance formulas.",
    route: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-09-30",
    categoryName: "Solar Photovoltaics",
    categoryRoute: "/solar",
    standards: [
      "NREL PVWatts V8 Modeling Standards",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "ASHRAE Handbook (Fundamentals of Solar Radiation and Angles)",
      "NREL Solar Position Algorithm (SPA)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Panel Tilt Angle Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Solar PV Engineering &amp; Sizing Guide</p>
        <h1>Solar Panel Tilt Angle by Latitude &amp; Season Guide</h1>
        <p className="intro">
          Learn how to calculate starting tilt angles and azimuth orientations for photovoltaic arrays. Explore mathematical models for year-round generation, steep winter off-grid angles, and summer peak performance.
        </p>
      </header>

      <DirectAnswerCard
        keyword="solar panel tilt angle formula"
        answer="The rule-of-thumb fixed year-round solar panel tilt angle is approximately: Tilt = |Latitude| × 0.87. For seasonal adjustments: Winter Tilt = (|Latitude| × 0.89) + 24° (steeper for low sun elevation and snow shedding); Summer Tilt = (|Latitude| × 0.93) - 21° (shallower for high overhead sun); Spring/Autumn Tilt = |Latitude| - 2.5°. In the Northern Hemisphere, panels face True South (180°); in the Southern Hemisphere, panels face True North (0°)."
        formula="Year-Round: Tilt = |Lat| × 0.87   |   Winter: Tilt = (|Lat| × 0.89) + 24°   |   Summer: Tilt = (|Lat| × 0.93) - 21°"
        standardExample="Latitude 34°N (e.g. Los Angeles / Atlanta): Fixed Year-Round = 29.6° (facing 180° South); Winter Starting Angle = 54.3° (steep); Summer Starting Angle = 10.6° (shallow)."
        sourceAuthority="Technical Models: NREL Solar Position Algorithm (SPA), NREL PVWatts & ASHRAE Fundamentals"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Solar Panel Tilt Angle Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your latitude or select a representative city preset to estimate starting seasonal tilt angles, azimuth direction, and optionally simulate production against your existing roof pitch.
          </p>
        </div>
        <SolarPanelTiltCalculator />
      </section>

      {/* Section 1: Latitude Matrix */}
      <section id="sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <div id="latitude-matrix">
          <div id="how-to-guide">
            <h2>Global Latitude Tilt Angle Reference Matrix</h2>
            <p>
              Because Earth rotates on a <strong>23.44° axial tilt</strong>, the sun&apos;s solar elevation changes throughout the year between the Summer Solstice (+23.44° declination) and Winter Solstice (-23.44° declination).
            </p>

            <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <caption>Table 1: Starting Tilt Angle Estimates and True Azimuth Across Global Latitudes</caption>
                <thead>
                  <tr>
                    <th scope="col">Location / Latitude</th>
                    <th scope="col">True Azimuth</th>
                    <th scope="col">Fixed Year-Round Tilt</th>
                    <th scope="col">Summer Tilt (Shallow)</th>
                    <th scope="col">Winter Tilt (Steep)</th>
                    <th scope="col">Spring/Fall Tilt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Equator (0° – 15°)</strong> (e.g. Nairobi, Singapore)</td>
                    <td>180° S or 0° N</td>
                    <td><strong>0°</strong> (Theoretical) / <strong>10°–15°</strong> (Drainage minimum)*</td>
                    <td>0° (Flat)</td>
                    <td><strong>24.0°</strong></td>
                    <td>0°</td>
                  </tr>
                  <tr>
                    <td><strong>Subtropical (25°N)</strong> (e.g. Miami, Taipei)</td>
                    <td>180° (True South)</td>
                    <td><strong>21.8°</strong></td>
                    <td>2.3°</td>
                    <td><strong>46.3°</strong></td>
                    <td>22.5°</td>
                  </tr>
                  <tr>
                    <td><strong>Mid-Latitude (34°N/S)</strong> (e.g. Los Angeles, Sydney)</td>
                    <td>180° S / 0° N</td>
                    <td><strong>29.6°</strong></td>
                    <td>10.6°</td>
                    <td><strong>54.3°</strong></td>
                    <td>31.5°</td>
                  </tr>
                  <tr>
                    <td><strong>Temperate (40°N)</strong> (e.g. New York, Madrid, Beijing)</td>
                    <td>180° (True South)</td>
                    <td><strong>34.8°</strong></td>
                    <td>16.2°</td>
                    <td><strong>59.6°</strong></td>
                    <td>37.5°</td>
                  </tr>
                  <tr>
                    <td><strong>Northern (51.5°N)</strong> (e.g. London, Berlin, Calgary)</td>
                    <td>180° (True South)</td>
                    <td><strong>44.8°</strong></td>
                    <td>26.9°</td>
                    <td><strong>69.8°</strong></td>
                    <td>49.0°</td>
                  </tr>
                  <tr>
                    <td><strong>Subarctic (60°N)</strong> (e.g. Oslo, Anchorage, Helsinki)</td>
                    <td>180° (True South)</td>
                    <td><strong>52.2°</strong></td>
                    <td>34.8°</td>
                    <td><strong>77.4°</strong></td>
                    <td>57.5°</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0.5rem 0 0 0" }}>
              *<em>Drainage Note for Equatorial Systems:</em> While direct overhead noon sun indicates a theoretical 0° horizontal orientation at the equator, photovoltaic modules require a minimum physical tilt of 10° to 15° to facilitate rainwater runoff, prevent dirt pooling, and maintain self-cleaning.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Fixed vs Seasonal vs Tracking */}
      <section id="fixed-vs-tracking" style={{ marginTop: "2.5rem" }}>
        <h2>Fixed Roof vs. Seasonal Adjustment vs. Solar Trackers</h2>
        <p>
          Mounting configurations balance capital cost, structural wind loads, and seasonal energy priorities:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Fixed Roof Mount (Standard)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Panels are installed flush with the existing roof pitch (typically 18° to 30°). Lowest installation cost, minimal wind resistance, and typically captures <strong>90% to 98%</strong> of theoretical maximum annual production compared to an optimized rack.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>2. Seasonal 2-Position Mount (~4% to 7% Gain)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Ground or pole racks adjusted manually twice per year (e.g. October for winter angle and April for summer angle). Modeled annual energy increases by approximately <strong>4% to 7%</strong>, with critical winter off-grid battery charging gains.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>3. Active Dual-Axis Tracker (~25% to 35% Gain)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Motorized actuators track sun elevation (tilt) and azimuth (East-West) continuously. In high-DNI desert environments, dual-axis tracking produces <strong>25% to 35%</strong> more annual kWh, though mechanical maintenance and wind stowing must be managed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Mathematical Formulas */}
      <section id="formula-math" style={{ marginTop: "2.5rem" }}>
        <div id="formula-breakdown">
          <h2>Deterministic Irradiance &amp; Solar Position Formulas</h2>

          <FormulaCard
            title="Solar Position & Cosine Incidence Angle Model"
            formula="E_effective = E_DNI × cos(θ_incident)   |   θ_incident = arccos[ sin(α)·cos(β) + cos(α)·sin(β)·cos(γ_sun - γ_panel) ]"
            formulaDescription="Calculates incident solar irradiance on a tilted surface as a function of direct normal irradiance (DNI), solar altitude angle (α), panel tilt (β), and azimuth differential."
            variables={[
              { symbol: "E_effective", label: "Incident Solar Irradiance", description: "Effective solar flux hitting photovoltaic cells perpendicularly", unit: "W/m²" },
              { symbol: "E_DNI", label: "Direct Normal Irradiance", description: "Clear-sky solar beam intensity perpendicular to rays", unit: "W/m²" },
              { symbol: "θ_incident", label: "Angle of Incidence", description: "Angle between incoming solar rays and panel surface normal vector", unit: "Degrees (°)" },
              { symbol: "β", label: "Panel Tilt Angle", description: "Angle of solar module surface measured from horizontal ground", unit: "Degrees (°)" },
              { symbol: "α", label: "Solar Altitude Angle", description: "Elevation angle of sun above the local horizon (0° to 90°)", unit: "Degrees (°)" },
              { symbol: "γ_panel", label: "Panel Azimuth", description: "Horizontal compass orientation of panel (180° for South, 0° for North)", unit: "Degrees (°)" },
              { symbol: "γ_sun", label: "Solar Azimuth", description: "Current compass position of the sun in the sky", unit: "Degrees (°)" },
            ]}
            notes={[
              "At angle of incidence θ = 0° (rays perpendicular), cos(θ) = 1.0 (100% optical capture).",
              "At θ = 45°, cos(45°) = 0.707 (29.3% reduction in incident power due to geometric cosine projection).",
            ]}
          />
        </div>
      </section>

      {/* Section 4: Worked Problems */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <div id="worked-examples">
          <h2>Worked Sizing Examples: Cabin, Residential Roof, &amp; Commercial Array</h2>
          <p>
            Three engineering design scenarios demonstrating how tilt angle affects seasonal energy production:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
            {/* Example 1 */}
            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
              <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: Off-Grid Cabin (Lat 44°N, Maine)</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
                <strong>Goal:</strong> Maximize winter energy production for off-grid battery charging and promote snow shedding.<br />
                <strong>Winter Tilt:</strong> (44 × 0.89) + 24° = <strong>63.2°</strong> facing 180° South.<br />
                <strong>Benefit:</strong> A steep 63.2° tilt aligns with low winter sun (solar noon elevation ~22.5° at solstice), capturing nearly perpendicular rays (θ<sub>incident</sub> ≈ 4.3°, cos θ ≈ 0.997) compared to a shallow 30° roof pitch (θ<sub>incident</sub> ≈ 37.5°, cos θ ≈ 0.793), while facilitating rapid snow shedding.
              </p>
              <Link href="/solar/solar-battery-bank-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                Size Off-Grid Solar Battery Bank →
              </Link>
            </div>

            {/* Example 2 */}
            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
              <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: Grid-Tied Home (Lat 33°N, Phoenix)</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
                <strong>Goal:</strong> Compare flush roof mounting against optimal seasonal angles.<br />
                <strong>Summer Tilt:</strong> (33 × 0.93) - 21° = <strong>9.7°</strong>.<br />
                <strong>Year-Round Fixed:</strong> 33 × 0.87 = <strong>28.7°</strong>.<br />
                <strong>Flush Roof Evaluation:</strong> A standard 22° south-facing roof pitch captures approximately <strong>98% to 99%</strong> of the modeled annual kWh of an optimal 28.7° rack, eliminating racking tilt brackets.
              </p>
              <Link href="/solar/solar-panel-output-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                Calculate Annual kWh Output with PVWatts →
              </Link>
            </div>

            {/* Example 3 */}
            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
              <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: Flat Roof Commercial Array (Lat 40°N)</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
                <strong>Constraint:</strong> High wind uplift loads and penetration restrictions on commercial membrane roofs.<br />
                <strong>Design Choice:</strong> 10° or 15° low-tilt ballasted racking.<br />
                <strong>Trade-off:</strong> Captures approximately <strong>90% to 92%</strong> of the per-panel output of a 34.8° tilt array while allowing tighter row spacing (reduced inter-row shading) and significantly higher total rooftop installed capacity (kW).
              </p>
              <Link href="/solar/solar-payback-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                Calculate Solar Payback &amp; ROI →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section id="related-tools" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>Connected Solar Planning &amp; Engineering Cluster</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Solar array geometry directly impacts real-world generation, string voltage boundaries, and clean energy storage sizing:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface-subtle, #f8fafc)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📐 Solar Panel Tilt Calculator</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Calculate starting year-round, winter steep, and summer shallow angles for your coordinate, and test production variance against your actual roof pitch.
            </p>
            <Link href="/solar/solar-panel-tilt-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Launch Tilt Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface-subtle, #f8fafc)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>☀️ Solar Panel Output Calculator</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Run full NREL PVWatts V8 hourly simulations. Quantify the modeled annual kilowatt-hour difference when panels are installed flush on a sub-optimal roof pitch.
            </p>
            <Link href="/solar/solar-panel-output-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Simulate PVWatts AC Yield →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface-subtle, #f8fafc)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🗺️ 50-State Solar &amp; Climate Matrix</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Access standardized NREL NSRDB peak sun hours (PSH), annual optimal tilt benchmarks, and ASHRAE design temperatures across all 50 states.
            </p>
            <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              50-State Insolation Benchmark Dataset →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface-subtle, #f8fafc)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📄 Ground View &amp; Snow Albedo Research</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--muted)" }}>
              Read our technical report analyzing Perez diffuse transposition models, snow albedo boost (+15% to +40%), and sub-zero Voc expansion.
            </p>
            <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Read Research Report (PL-TR-2026-SOL03) →
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0 }}>
          Additional solar engineering tools: <Link href="/solar/solar-panel-size-calculator">System Size Calculator</Link> • <Link href="/solar/solar-battery-bank-size-calculator">Battery Bank Sizing</Link> • <Link href="/solar/solar-charge-controller-calculator">Charge Controller Sizing</Link> • <Link href="/solar/solar-payback-calculator">Payback &amp; ROI Calculator</Link>.
        </p>
      </section>

      {/* Section 6: FAQs */}
      <section id="faq-section" style={{ marginTop: "2.5rem" }}>
        <div id="faqs">
          <h2>Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                }}
              >
                <summary style={{ fontWeight: 600, cursor: "pointer", color: "var(--brand-strong)" }}>
                  {faq.question}
                </summary>
                <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--muted)" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Standards & Citations */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations reference mathematical algorithms from the <strong>National Renewable Energy Laboratory (NREL PVWatts V8 &amp; SPA)</strong>, <strong>IEC 61724</strong> photovoltaic monitoring standards, and <strong>ASHRAE</strong> clear-sky solar irradiance formulas. For snow albedo diffuse boost and sub-zero <em>V<sub>oc</sub></em> expansion formulas under NEC 690.7, read our technical report: <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ color: "var(--brand-strong)", fontWeight: 700, textDecoration: "underline" }}>Ground View Factor Transposition &amp; Snow Albedo (PL-TR-2026-SOL03)</Link>.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            50-State Solar Insolation Climatic Benchmark (PL-DS-SOL-03) →
          </Link>
          <Link href="/solar/regional-climate-data" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            50-State NREL Solar &amp; Climate Database →
          </Link>
          <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Read Solar Research Report (PL-TR-2026-SOL03) →
          </Link>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>
    </article>
  );
}


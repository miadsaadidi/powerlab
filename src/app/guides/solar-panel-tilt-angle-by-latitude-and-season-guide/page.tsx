import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarPanelTiltCalculator } from "@/components/calculator/solar-panel-tilt-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Tilt Angle by Latitude Guide",
  description: "Calculate optimal solar panel tilt angles by latitude and season. Master formulas for maximum annual yield, winter steep tilt, and summer angles.",
  canonicalPath: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the formula to calculate optimal solar panel tilt angle?",
    answer: "For a fixed year-round installation between latitudes 25° and 50°, the optimal tilt angle is: Tilt = |Latitude| × 0.87 (or roughly Latitude - 5°). For winter optimization: Tilt = (|Latitude| × 0.89) + 24°. For summer optimization: Tilt = (|Latitude| × 0.93) - 21°. In the Northern Hemisphere panels must face true South (180° azimuth), and in the Southern Hemisphere they must face true North (0° azimuth).",
  },
  {
    question: "Why should winter solar panel tilt be steeper than summer tilt?",
    answer: "During winter, the sun sits much lower on the horizon (up to 47° lower than summer solstice due to Earth's 23.44° axial tilt). A steeper panel angle (e.g. 55° to 65°) ensures sunlight hits the photovoltaic silicon at a perpendicular 90° angle, maximizing irradiance while naturally shedding snow and frost.",
  },
  {
    question: "How much extra energy do seasonal tilt adjustments produce?",
    answer: "Adjusting panel tilt twice a year (summer vs. winter angles) increases annual energy output by 4% to 7%. Adjusting four times a year (spring, summer, autumn, winter) increases annual output by 6% to 9%. For off-grid solar systems with winter power deficits, steep winter tilt can boost December/January energy generation by over 25% compared to a flat summer angle.",
  },
  {
    question: "What is the difference between True South and Magnetic South?",
    answer: "Solar azimuth must be aligned to True Geographic South (or True North in the Southern Hemisphere), not Magnetic South. Magnetic compass needles point toward the Earth's shifting magnetic pole. Depending on your location, you must correct for 'magnetic declination' (which can vary from -15° West to +15° East).",
  },
  {
    question: "Is it worth tilting solar panels on a low-slope or flat residential roof?",
    answer: "On residential pitched roofs (typically 15° to 35° / 3:12 to 8:12 pitch), flush-mounting panels parallel to the roof plane is standard practice because mounting flush saves significant structural racking and wind-load costs while capturing 90% to 96% of maximum possible solar yield.",
  },
];

export default function SolarTiltGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Solar Panel Tilt Angle by Latitude & Season Guide",
    description: "Engineering guide to solar panel tilt angles, seasonal adjustments, azimuth alignment, and cosine irradiance formulas.",
    route: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
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
          Learn how to calculate the optimal tilt angle and azimuth orientation for your solar panels. Explore mathematical models for year-round maximum generation, steep winter off-grid angles, and summer peak performance.
        </p>
      </header>

      <DirectAnswerCard
        keyword="solar panel tilt angle formula"
        answer="The optimal fixed year-round solar tilt angle equals: Tilt = |Latitude| × 0.87. For seasonal adjustments: Winter Tilt = (|Latitude| × 0.89) + 24° (steep for low sun and snow shedding); Summer Tilt = (|Latitude| × 0.93) - 21° (shallow for high overhead sun); Spring/Autumn Tilt = |Latitude| - 2.5°. In the Northern Hemisphere, panels should face True South (180°); in the Southern Hemisphere, panels should face True North (0°)."
        formula="Year-Round: Tilt = |Lat| × 0.87   |   Winter: Tilt = (|Lat| × 0.89) + 24°   |   Summer: Tilt = (|Lat| × 0.93) - 21°"
        standardExample="Latitude 38°N (e.g. Richmond / San Francisco): Fixed Year-Round = 33.1° (facing 180° South); Winter Angle = 57.8° (steep); Summer Angle = 14.3° (shallow)."
        sourceAuthority="NREL Solar Position Algorithm / NREL PVWatts V8 Modeling Standards"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Solar Panel Tilt &amp; Production Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your exact latitude or choose a major city preset to calculate your precise seasonal tilt angles, azimuth direction, and compare output against your actual roof pitch.
          </p>
        </div>
        <SolarPanelTiltCalculator />
      </section>

      {/* Section 1: Latitude Matrix */}
      <section id="latitude-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>Global Latitude Tilt Angle Reference Matrix</h2>
        <p>
          Because Earth rotates on a <strong>23.44° axial tilt</strong>, the sun&apos;s solar elevation changes throughout the year between the Summer Solstice (+23.44° declination) and Winter Solstice (-23.44° declination).
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Optimal Tilt Angles and Azimuth Across Global Latitudes</caption>
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
                <td><strong>10° – 15°</strong> (min for rain self-clean)</td>
                <td>0° (Flat)</td>
                <td>20°</td>
                <td>10°</td>
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
      </section>

      {/* Section 2: Fixed vs Seasonal vs Tracking */}
      <section id="fixed-vs-tracking" style={{ marginTop: "2.5rem" }}>
        <h2>Fixed Roof vs. Seasonal Adjustment vs. Solar Trackers</h2>
        <p>
          Choosing between mounting options depends on whether your priority is maximizing annual grid revenue or maintaining critical off-grid winter battery autonomy:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Fixed Roof Mount (Standard)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Panels are installed flush with the existing roof pitch (typically 18° to 30°). Lowest installation cost, lowest wind resistance, and captures <strong>90% to 95%</strong> of theoretical maximum annual production.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>2. Seasonal 2-Position Mount (+5% to 7%)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Ground or pole racks adjusted manually twice per year (e.g. October 15 for Winter angle and April 15 for Summer angle). Critical for off-grid cabins to prevent winter generator runtime.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>3. Active Dual-Axis Tracker (+25% to 35%)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Motorized actuators track sun elevation (tilt) and azimuth (East-West) continuously from dawn to dusk. Generates up to 35% more kWh but requires maintenance on moving mechanical parts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Mathematical Formulas */}
      <section id="formula-breakdown" style={{ marginTop: "2.5rem" }}>
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
      </section>

      {/* Section 4: Worked Problems */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Examples: Cabin, Residential Roof, &amp; Commercial Array</h2>
        <p>
          Three real-world design scenarios demonstrating how tilt angle affects seasonal energy production:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          {/* Example 1 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: Off-Grid Cabin (Lat 44°N, Maine)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Maximize critical winter power for battery charging and shed heavy snow.<br />
              <strong>Winter Tilt:</strong> (44 × 0.89) + 24° = <strong>63.2°</strong> facing 180° South.<br />
              <strong>Benefit:</strong> Steep 63° tilt sheds snow automatically within 30 minutes of sunrise and increases December daily solar yield by <strong>32%</strong> vs. a standard 30° roof pitch.
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Off-Grid Solar Battery Bank →
            </Link>
          </div>

          {/* Example 2 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: Grid-Tied Home (Lat 33°N, Phoenix)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Maximize summer generation during expensive peak time-of-use (TOU) hours.<br />
              <strong>Summer Tilt:</strong> (33 × 0.93) - 21° = <strong>9.7°</strong>.<br />
              <strong>Year-Round Fixed:</strong> 33 × 0.87 = <strong>28.7°</strong>.<br />
              <strong>Flush Roof Pitch:</strong> 22° roof captures <strong>98.4%</strong> of maximum possible annual revenue.
            </p>
            <Link href="/solar/solar-panel-output-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate Annual kWh Output with PVWatts →
            </Link>
          </div>

          {/* Example 3 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: Flat Roof Commercial Array (Lat 40°N)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Constraint:</strong> High wind uplift loads on commercial membrane roofs.<br />
              <strong>Design Choice:</strong> 10° or 15° low-tilt ballasted racking.<br />
              <strong>Trade-off:</strong> Captures 91% of optimal 35° production while eliminating roof penetrations and allowing tighter row-to-row panel spacing without self-shading.
            </p>
            <Link href="/solar/solar-payback-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate Solar Payback &amp; ROI →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>Connected Solar Planning Calculators</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Explore our complete suite of deterministic solar photovoltaic sizing and engineering tools:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button">Solar Panel Tilt Calculator</Link>
          <Link href="/solar/solar-panel-output-calculator" className="button secondary-button">Solar Panel Output Calculator (PVWatts)</Link>
          <Link href="/solar/solar-panel-size-calculator" className="button secondary-button">Solar Panel System Size Calculator</Link>
          <Link href="/solar/solar-battery-bank-size-calculator" className="button secondary-button">Solar Battery Bank Sizing</Link>
          <Link href="/solar/solar-charge-controller-calculator" className="button secondary-button">Solar Charge Controller Calculator</Link>
          <Link href="/solar/solar-payback-calculator" className="button secondary-button">Solar Payback &amp; ROI Calculator</Link>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section id="faqs" style={{ marginTop: "2.5rem" }}>
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
      </section>

      {/* Section 7: Standards & Citations */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations implement mathematical algorithms from the <strong>National Renewable Energy Laboratory (NREL PVWatts V8 &amp; SPA)</strong>, <strong>IEC 61724</strong> photovoltaic monitoring standards, and <strong>ASHRAE</strong> clear-sky solar irradiance formulas.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
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

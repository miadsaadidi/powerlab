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
    answer: "As a general rule, the optimal year-round tilt angle for fixed solar panels equals your geographic latitude multiplied by 0.76 plus 3.1 degrees (or simply your latitude). For example, at 35° latitude, optimal tilt is approximately 30° to 35° facing true South (in Northern hemisphere) or true North (in Southern hemisphere).",
  },
  {
    question: "How much power do you lose if your roof pitch isn't optimal?",
    answer: "A tilt angle within ±10° to 15° of optimal typically reduces total annual energy production by less than 3% to 5%. Because the losses are relatively modest, it is usually more cost-effective to mount solar panels flush with your existing roof pitch rather than installing expensive racking tilt legs.",
  },
  {
    question: "Should solar panels be adjusted seasonally?",
    answer: "If you have ground-mounted or adjustable rack panels, adjusting tilt twice or four times a year increases annual energy capture by 4% to 7%. In summer, tilt panels 15° flatter than your latitude; in winter, tilt panels 15° steeper than your latitude to capture the low winter sun and shed snow.",
  },
  {
    question: "What compass direction should solar panels face?",
    answer: "In the Northern Hemisphere, solar panels should face true South (180° azimuth). In the Southern Hemisphere, they should face true North (0° azimuth). West-facing panels are also popular for time-of-use (TOU) utility rates because they generate peak power during expensive late afternoon hours.",
  },
];

export default function SolarTiltPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Tilt Calculator",
    description: "Find optimal solar panel tilt angle and compass orientation for your latitude.",
    route: "/solar/solar-panel-tilt-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates seasonal and year-round solar panel tilt angle from latitude",
      "Determines equator-facing azimuth orientation",
      "Compares current roof pitch and azimuth with modeled PVWatts yield",
      "Zero account or registration required",
    ],
    standards: [
      "NREL PVWatts V8 Photovoltaic Performance Model",
      "NREL Solar Position Algorithm (SPA)",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "ASHRAE Handbook of Solar Irradiance Fundamentals",
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

      <DirectAnswerCard
        keyword="solar panel tilt calculator"
        answer="As a general rule of thumb, your optimal year-round solar panel tilt angle equals your geographic latitude. For seasonal adjustments, tilt panels Latitude + 15° in winter (when the sun is lower) and Latitude - 15° in summer."
        formula="Year-Round Tilt = Latitude × 0.87 (or Latitude) · Facing True South (180° in Northern Hemisphere)"
        standardExample="At 35° North latitude, optimal fixed year-round tilt is ~35°, winter angle is ~50°, and summer angle is ~20°."
        sourceAuthority="NREL / PVWatts Solar Geometry Models"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarPanelTiltCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Find Your Optimal Solar Panel Tilt Angle</h2>
        <ol>
          <li><strong>Enter Latitude or Location:</strong> Type your city or geographic latitude (e.g. 34.05° for Los Angeles).</li>
          <li><strong>Choose Optimization Goal:</strong> Select year-round maximum yield, winter heating optimization (+15°), or summer air conditioning optimization (-15°).</li>
          <li><strong>Check Compass Direction (Azimuth):</strong> Aim true South (180°) in the Northern Hemisphere or true North (0°) in the Southern Hemisphere.</li>
          <li><strong>Compare Existing Roof Pitch:</strong> Optionally compare your actual roof pitch (e.g. 4/12 or 6/12 slope) against the theoretical ideal.</li>
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
                <th scope="col">Year-Round Optimal (Lat × 0.76 + 3.1°)</th>
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
                <td><strong>35° N</strong> (Los Angeles, Atlanta, Tokyo)</td>
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
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar Panel Tilt Angle & Ground Albedo Formulas"
          formula="Year_Round = Latitude × 0.76 + 3.1°  |  Winter = Latitude + 15°  |  G_ground = G_horiz × ρ × (1 - cos β) / 2"
          formulaDescription="Calculates optimal fixed solar panel tilt relative to horizontal based on geographic latitude, 23.45° axial declination, and Perez ground-reflected albedo backscatter."
          variables={[
            { symbol: "Latitude", label: "Geographic Latitude", description: "Distance north (+) or south (-) from Earth's equator.", unit: "degrees" },
            { symbol: "Year_Round", label: "Fixed Annual Optimal Tilt", description: "Maximizes cumulative annual kilowatt-hour solar harvest for fixed mounts.", unit: "degrees" },
            { symbol: "Winter", label: "Winter Peak Optimization", description: "Steeper angle optimized for lower winter sun trajectories and snow shedding.", unit: "degrees" },
            { symbol: "G_ground", label: "Ground-Reflected Irradiance", description: "Plane-of-array diffuse irradiance captured from ground reflection (Perez transposition model).", unit: "W/m²" },
            { symbol: "ρ (rho)", label: "Ground Albedo Coefficient", description: "Surface reflectance: 0.20 for dark ground/grass; 0.70 for fresh snow pack.", unit: "fraction" },
            { symbol: "β (beta)", label: "Panel Tilt Angle", description: "Array inclination angle relative to horizontal.", unit: "degrees" },
          ]}
          notes={[
            "Equator-facing azimuth orientation: 180° (True South) in the Northern Hemisphere; 0° (True North) in the Southern Hemisphere.",
            "Steep winter tilts (e.g. 50°–60°) increase the ground view factor (1 - cos β)/2 to ~0.20, capturing up to +15% additional diffuse plane-of-array irradiance when ground snow albedo (ρ ≈ 0.70) is present.",
            "A tilt angle deviation of ±10° from optimal typically causes less than 3% to 5% loss in total annual solar generation.",
          ]}
        />
      </div>

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
        <h2>Related Solar Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Model your expected annual kilowatt-hour production with our <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link>, determine how many panels fit on your roof with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, or calculate break-even ROI with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Solar Panel Tilt Angle by Latitude &amp; Season Guide</Link> for complete mathematical models, global latitude matrices, and cosine irradiance calculations.
        </p>
      </section>
    </article>
  );
}

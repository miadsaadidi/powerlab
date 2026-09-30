import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { SolarPanelSizeCalculator } from "@/components/calculator/solar-panel-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-panel-size");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Size Calculator — How Many Panels Do You Need?",
  description: "Calculate solar array size (kW DC) and whole-number panel count from annual or monthly electricity targets using location-based PVWatts solar yield modeling.",
  canonicalPath: "/solar/solar-panel-size-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "How do I calculate what size solar system I need?",
    answer: "Divide your target annual electricity consumption (kWh/year) by the specific solar yield (kWh/kW-year) for your location, then apply your chosen design margin. For example: (10,800 kWh/year × 1.10) ÷ 1,450 kWh/kW-year = 8.193 kW required DC capacity. Sizing with 400W panels requires: ⌈8.193 kW ÷ 0.4 kW⌉ = 21 panels, delivering 8.4 kW installed DC capacity.",
  },
  {
    question: "How much roof space do solar panels require?",
    answer: "A standard 400-Watt residential solar module is approximately 68 × 40 inches (~18 to 20 sq ft / 1.7 to 1.9 m²), though exact dimensions vary by manufacturer. A 21-panel system (8.4 kW) has an approximate module footprint of 380 to 420 sq ft. Actual roof area requirements depend on row spacing, roof pitch, local building code setbacks, access pathways, and shading obstructions.",
  },
  {
    question: "What does the design margin represent in solar array sizing?",
    answer: "The design margin is an additional sizing allowance applied to your baseline energy target. While this calculator does not individually simulate multi-year cell degradation, high-temperature derating, or specific shading geometry, a 10% to 20% design margin is commonly chosen by planners as a buffer for future electricity demand (such as EV charging or heat pump installation) or localized system losses.",
  },
  {
    question: "Does sizing a solar system to cover 100% of my annual kWh eliminate my electric bill?",
    answer: "Physical energy generation and utility billing economics are distinct. In areas with traditional 1-to-1 Net Energy Metering (NEM), matching 100% of annual consumption may reduce net energy charges, but customers still pay fixed monthly utility connection fees. In markets with modern net billing (e.g., NEM 3.0 / avoided-cost export compensation) or time-of-use tariffs, daytime exported energy is credited at lower rates than evening imported energy, requiring battery storage or dedicated rate optimization to maximize bill savings.",
  },
];

export default function SolarPanelSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Size Calculator",
    description: "Calculate required solar array capacity in kW DC and whole-number panel count from annual electricity consumption targets.",
    route: "/solar/solar-panel-size-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates required solar array capacity in kW DC and whole-number panel count",
      "Integrated location-based PVWatts V8 specific yield modeling",
      "Configurable panel wattages (350W to 500W)",
      "Estimates approximate module footprint in square feet and square meters",
    ],
    standards: [
      "NREL PVWatts V8 (Photovoltaic Performance Modeling Reference)",
      "IEC 61215 (Terrestrial Photovoltaic Module Design Qualification Context)",
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
        <span aria-current="page">Solar Panel Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar planning</p>
        <h1>Solar Panel Size Calculator</h1>
        <p className="intro">
          Estimate the solar array size in kilowatts and exact number of solar panels needed to offset your home electricity usage using location-based PVWatts V8 solar yield data.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarPanelSizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="solar panel size and count calculation"
        answer="An illustrative U.S. household consuming 900 kWh/month (10,800 kWh/year) in a region with 1,450 kWh/kW-year solar yield and a 10% design margin requires an 8.19 kW DC system target: (10,800 × 1.10) ÷ 1,450 = 8.193 kW. With standard 400W panels, this requires exactly 21 panels (⌈8.193 ÷ 0.4⌉ = 21), resulting in 8.4 kW installed DC capacity with an approximate module footprint of ~420 square feet."
        formula="Required kW DC = (Annual kWh × (1 + Margin)) ÷ Specific Yield · Panel Count = ⌈Required kW ÷ Panel kW⌉ · Installed kW = Panel Count × Panel kW"
        standardExample="Illustrative Scenario: (10,800 kWh/year × 1.10) ÷ 1,450 = 8.19 kW target → 21 × 400W panels = 8.4 kW installed DC (~420 sq ft footprint)"
        sourceAuthority="Technical Reference / Model Basis: NREL PVWatts V8 & IEC 61215 Design Qualification Context"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate How Many Solar Panels You Need</h2>
        <ol>
          <li><strong>Enter Annual Electricity Target (kWh):</strong> Check your electric utility bill for annual kilowatt-hour usage (typical US homes use 9,000 to 12,000 kWh/yr).</li>
          <li><strong>Select Individual Panel Wattage:</strong> Standard modern residential monocrystalline panels range from 380W to 440W (400W default).</li>
          <li><strong>Apply Design Margin:</strong> Add a sizing margin (e.g. 10% to 20%) to provide a buffer for future electrification (EVs or heat pumps) or unmodeled localized losses.</li>
          <li><strong>Review Approximate Module Footprint:</strong> Check total estimated square footage of module area required.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar Panel System Sizing Guide by Household Electricity Usage</h2>
        <p>Typical solar array sizes and panel counts needed to offset household electricity targets (assuming 400W panels, 1,450 kWh/kW-yr specific solar yield, and a 10% design margin):</p>
        <div className="scenario-table" role="region" aria-label="Solar system size by monthly usage">
          <table>
            <caption>Solar array size and panel count by monthly household electricity usage (1,450 kWh/kW-yr yield, 10% margin, 400W panels)</caption>
            <thead>
              <tr>
                <th scope="col">Monthly Electricity Use</th>
                <th scope="col">Annual Energy Target</th>
                <th scope="col">Required DC Target</th>
                <th scope="col">400W Panel Count</th>
                <th scope="col">Installed Capacity &amp; Footprint</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>300 kWh/mo</strong> (Small Home / Apartment)</td>
                <td>3,600 kWh/yr</td>
                <td>~2.73 kW</td>
                <td>7 panels</td>
                <td>2.8 kW (~140 sq ft / 13 m²)</td>
              </tr>
              <tr>
                <td><strong>600 kWh/mo</strong> (Energy-Efficient Home)</td>
                <td>7,200 kWh/yr</td>
                <td>~5.46 kW</td>
                <td>14 panels</td>
                <td>5.6 kW (~280 sq ft / 26 m²)</td>
              </tr>
              <tr>
                <td><strong>900 kWh/mo</strong> (Illustrative U.S. Household)</td>
                <td>10,800 kWh/yr</td>
                <td>~8.19 kW</td>
                <td>21 panels</td>
                <td>8.4 kW (~420 sq ft / 39 m²)</td>
              </tr>
              <tr>
                <td><strong>1,200 kWh/mo</strong> (Large Home + Central AC)</td>
                <td>14,400 kWh/yr</td>
                <td>~10.92 kW</td>
                <td>28 panels</td>
                <td>11.2 kW (~560 sq ft / 52 m²)</td>
              </tr>
              <tr>
                <td><strong>1,500 kWh/mo+</strong> (Large Home + EV + Heat Pump)</td>
                <td>18,000 kWh/yr</td>
                <td>~13.66 kW</td>
                <td>35 panels</td>
                <td>14.0 kW (~700 sq ft / 65 m²)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="form-hint" style={{ marginTop: "0.5rem" }}>
          Module footprints represent approximate net panel surface area. Actual roof area requirements depend on row spacing, setbacks, roof pitch, and obstructions.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas &amp; Mathematical Methodology"
          formula="Required_kW = (Annual_kWh_Target * (1 + Margin)) / Specific_Yield  |  Panel_Count = ceil(Required_kW / Panel_kW)  |  Installed_kW = Panel_Count * Panel_kW"
          formulaDescription="Calculates the required photovoltaic DC nameplate capacity, whole-number module count, and resulting installed DC capacity to generate your target annual electrical energy."
          variables={[
            { symbol: "Annual_kWh_Target", label: "Annual Energy Target", description: "Total electricity energy requirement for the year.", unit: "kWh/yr" },
            { symbol: "Margin", label: "Design Margin", description: "Sizing allowance applied to the annual target (e.g., 0.10 for 10%).", unit: "fraction" },
            { symbol: "Specific_Yield", label: "Specific Solar Yield", description: "Annual AC kWh generated per installed DC kW per year from location or PVWatts model.", unit: "kWh/kW-yr" },
            { symbol: "Panel_kW", label: "Individual Module Rating", description: "Rated peak DC power of a single panel in kilowatts (e.g., 0.400 kW for 400W).", unit: "kW" },
            { symbol: "Panel_Count", label: "Module Count", description: "Whole number of panels calculated using ceiling rounding.", unit: "count" },
            { symbol: "Installed_kW", label: "Installed DC Capacity", description: "Actual total installed array DC capacity after panel rounding.", unit: "kW DC" },
          ]}
          notes={[
            "Installed DC capacity = Panel Count × Panel Wattage ÷ 1,000.",
            "Approximate module footprint ≈ Panel Count × 20 sq ft (1.85 m²). Actual roof area requirements depend on row spacing, setbacks, roof pitch, and obstructions.",
            "PVWatts V8 specific yield already models AC inverter conversion, temperature derating, tilt/azimuth geometry, and DC system losses.",
          ]}
        />
      </div>

      <section id="technical-basis" style={{ marginTop: "2.5rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          PowerLab implements a deterministic photovoltaic sizing model based on location-specific solar irradiance modeling and whole-number module discretization. The following technical references provide context for performance modeling and module ratings:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>NREL PVWatts V8</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              National Renewable Energy Laboratory photovoltaic performance model, simulating grid-connected solar array energy production accounting for solar irradiance, system losses, and inverter conversion.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>IEC 61215 Design Context</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              International Electrotechnical Commission standard for design qualification and type approval of terrestrial crystalline silicon photovoltaic modules under standard test conditions (STC: 1,000 W/m², 25°C cell temperature).
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
        <h2>Related Solar Planning Tools</h2>
        <p>
          Model your expected monthly yield with our <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link>, calculate appliance energy requirements with the <Link href="/solar/solar-load-calculator">Solar Load Calculator</Link>, check financial break-even with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>, or size battery backup with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

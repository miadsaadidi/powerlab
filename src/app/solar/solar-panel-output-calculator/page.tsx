import type { Metadata } from "next";
import Link from "next/link";
import { SolarPanelOutputCalculator } from "@/components/calculator/solar-panel-output-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-panel-output");

export const metadata: Metadata = {
  title: "Solar Panel Output & Production Calculator — kWh Yield",
  description: "Calculate monthly and annual solar panel output and energy yield (kWh) based on system size, location, tilt, azimuth, and NREL PVWatts V8 solar production modeling.",
  alternates: { canonical: "/solar/solar-panel-output-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Solar Panel Output & Production Calculator — PowerLab",
    description: "Calculate monthly and annual solar panel output, production, and kilowatt-hour yield with NREL PVWatts V8 solar modeling.",
    url: `${siteConfig.url}/solar/solar-panel-output-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How much electricity does a 400-Watt solar panel produce per day?",
    answer: "In an area with 4.5 peak sun hours per day, a 400W panel produces approximately 1.4 to 1.6 kilowatt-hours (kWh) of usable AC electricity per day after accounting for normal wiring and inverter conversion losses (approx 14%). Over a full year, one 400W panel produces between 500 and 650 kWh.",
  },
  {
    question: "How many solar panels do I need to power an average home?",
    answer: "The average US household consumes approximately 880 to 900 kWh per month (around 10,500 kWh annually). To offset 100% of this consumption in an average sun region, you would need a 7 kW to 8 kW solar array, which translates to roughly 18 to 22 modern 400-Watt solar panels.",
  },
  {
    question: "Why does solar production drop in winter?",
    answer: "Winter solar production decreases due to shorter daylight hours, lower solar altitude (sun angle), increased cloud cover, and snow coverage. In northern latitudes, a system may produce 60% to 70% less energy in December than in June.",
  },
  {
    question: "What are standard solar system losses (derate factors)?",
    answer: "Typical grid-tied residential solar arrays experience combined losses of 14% to 18%. This includes DC wiring resistance (~2%), inverter DC-to-AC conversion losses (~3%–4%), panel soiling and dust (~2%), module mismatch (~1%–2%), and high temperature power derating (~4%–8% during hot summer afternoons).",
  },
];

export default function SolarOutputPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Output Calculator",
    description: "Estimate monthly and annual solar panel output using system size, panel details, orientation, and NREL PVWatts V8 modeling.",
    route: "/solar/solar-panel-output-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Location-aware AC kilowatt-hour production modeling via NREL PVWatts V8",
      "Automatic coordinates lookup or manual latitude/longitude input",
      "Monthly and annual solar generation breakdowns with seasonal variation",
      "Customizable system losses, module type, and DC-to-AC ratio",
    ],
    standards: [
      "NREL PVWatts V8 Photovoltaic Performance Model",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "IEEE 1547 (Interconnection and Interoperability of Distributed Energy Resources)",
      "NFPA 70 / NEC Article 690 (Solar Photovoltaic Systems)",
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
        <span aria-current="page">Solar Panel Output Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar planning</p>
        <h1>Solar Panel Output Calculator</h1>
        <p className="intro">
          Estimate monthly and annual solar panel output for your location using system size, panel details, orientation, and a location-aware PVWatts V8 model.
        </p>
      </div>

      <DirectAnswerCard
        keyword="solar panel output calculator"
        answer="To calculate daily solar panel electricity output, multiply your solar panel wattage (Watts) by your area's average daily Peak Sun Hours (PSH), then multiply by system efficiency (~86% after wiring and inverter losses)."
        formula="Daily Output (kWh) = (Panel Watts × Peak Sun Hours × 0.86) ÷ 1,000"
        standardExample="A 400W solar panel receiving 4.5 peak sun hours per day produces approximately 1.55 kWh/day (~565 kWh/year)."
        sourceAuthority="NREL PVWatts V8 Solar Irradiance Model"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarPanelOutputCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Solar Panel Output</h2>
        <ol>
          <li><strong>Enter Location:</strong> Input your city or exact latitude/longitude coordinates to pull historical solar insolation datasets.</li>
          <li><strong>Select System Capacity (kW):</strong> Choose total system size in kilowatts or calculate from panel count and wattage (e.g. 20 panels × 400W = 8.0 kW).</li>
          <li><strong>Set Roof Pitch &amp; Orientation:</strong> Enter roof tilt angle and compass azimuth (180° South is standard).</li>
          <li><strong>Review Monthly Yield Breakdown:</strong> Analyze expected monthly generation curves to plan winter vs summer energy balances.</li>
        </ol>

        <SystemFlowDiagram category="solar" title="Solar PV Power Path & AC Conversion Architecture" />
      </section>

      <section id="sizing-matrix">
        <h2>Solar Panel System Production Reference Matrix</h2>
        <p>Estimated annual and monthly electricity generation across standard residential system capacities and regional solar insolation levels:</p>
        <div className="scenario-table" role="region" aria-label="Solar output reference matrix">
          <table>
            <caption>Estimated annual &amp; monthly AC generation (14% typical system losses)</caption>
            <thead>
              <tr>
                <th scope="col">System Size (kW DC)</th>
                <th scope="col">Panel Count (400W)</th>
                <th scope="col">Moderate Sun (3.5 PSH / ~1,200 kWh/kW-yr)</th>
                <th scope="col">High Sun (5.0 PSH / ~1,650 kWh/kW-yr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4.0 kW System</strong></td>
                <td>10 panels (~200 sq ft)</td>
                <td>~4,800 kWh / yr (~400 kWh/mo)</td>
                <td>~6,600 kWh / yr (~550 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>6.0 kW System</strong></td>
                <td>15 panels (~300 sq ft)</td>
                <td>~7,200 kWh / yr (~600 kWh/mo)</td>
                <td>~9,900 kWh / yr (~825 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>8.0 kW System</strong></td>
                <td>20 panels (~400 sq ft)</td>
                <td>~9,600 kWh / yr (~800 kWh/mo)</td>
                <td>~13,200 kWh / yr (~1,100 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>12.0 kW System</strong></td>
                <td>30 panels (~600 sq ft)</td>
                <td>~14,400 kWh / yr (~1,200 kWh/mo)</td>
                <td>~19,800 kWh / yr (~1,650 kWh/mo)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar AC Energy Yield &amp; System Sizing Formulas"
          formula="Daily_kWh = System_Size_kW × Peak_Sun_Hours × (1 - System_Losses)"
          formulaDescription="Estimates practical solar electricity output based on DC nameplate capacity, regional irradiance (solar insolation), and derating factors including wiring, inverter efficiency, and temperature coefficients."
          variables={[
            { symbol: "System_Size_kW", label: "Array DC Nameplate Rating", description: "Total panel wattage sum in kilowatts (e.g. 15 × 400W panels = 6.0 kW).", unit: "kW" },
            { symbol: "Peak_Sun_Hours", label: "Daily Solar Insolation (PSH)", description: "Equivalent hours per day at standard solar irradiance of 1,000 W/m² (typically 3.5 to 5.5 hours).", unit: "hours/day" },
            { symbol: "System_Losses", label: "Aggregate Derate Factor", description: "Standard combined losses for soiling, shading, wiring, inverter AC conversion, and thermal derate (typically 14% to 18%).", unit: "fraction" },
          ]}
          notes={[
            "NREL PVWatts V8 performs hourly solar irradiance simulations using typical meteorological year (TMY3/NSRDB) climate records.",
            "Specific Yield (kWh/kWp/year) measures how many kilowatt-hours each kilowatt of installed solar generates annually.",
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
        <h2>Related Solar Planning Tools</h2>
        <p>
          Calculate optimal mounting tilt with the <Link href="/solar/solar-panel-tilt-calculator">Solar Panel Tilt Calculator</Link>, size your off-grid storage with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, or evaluate investment returns with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

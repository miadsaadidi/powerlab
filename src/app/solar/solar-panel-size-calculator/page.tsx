import type { Metadata } from "next";
import Link from "next/link";
import { SolarPanelSizeCalculator } from "@/components/calculator/solar-panel-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-panel-size");

export const metadata: Metadata = {
  title: "Solar Panel Size Calculator — Calculate How Many Panels You Need",
  description: "Calculate how many solar panels and what system size (kW) you need to power your home. Uses location-based PVWatts V8 specific solar yield modeling.",
  alternates: { canonical: "/solar/solar-panel-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Solar Panel Size Calculator — PowerLab",
    description: "Calculate how many solar panels you need based on monthly electricity usage and local solar yield.",
    url: `${siteConfig.url}/solar/solar-panel-size-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do I calculate what size solar system I need?",
    answer: "Divide your target annual electricity consumption in kilowatt-hours (kWh) by the specific solar yield (kWh/kW-year) for your location, then add a 10% to 15% design buffer. For example: 10,800 kWh/year ÷ 1,450 kWh/kW-yr × 1.10 = 8.19 kW system, which requires 21 panels rated at 400 Watts each.",
  },
  {
    question: "How much roof space do solar panels require?",
    answer: "A standard residential 400-Watt solar panel is approximately 68 × 40 inches (~18 to 20 square feet / 1.75 to 1.9 m²). An average 8 kW system (20 panels) requires about 380 to 420 square feet of unobstructed, unshaded roof space.",
  },
  {
    question: "Why should I add a design buffer to my solar array size?",
    answer: "A 10% to 20% design margin accounts for natural silicon panel degradation (~0.5% per year), tree shading, high-temperature efficiency derating, and future increases in household electricity demand (such as purchasing an electric vehicle or installing a heat pump).",
  },
  {
    question: "Can I size my solar system to cover 100% of my electric bill?",
    answer: "Yes, in areas with 1-to-1 Net Energy Metering (NEM), sizing your system for 100% to 105% of annual consumption can reduce your net annual electricity bill to the minimum utility connection fee.",
  },
];

export default function SolarPanelSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Size Calculator",
    description: "Calculate the solar array size in kW and whole-panel count needed to meet an annual energy target.",
    route: "/solar/solar-panel-size-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates solar array size in kW DC and required whole-number panel count",
      "Integrated location-based PVWatts specific yield modeling",
      "Configurable panel wattages (350W to 500W)",
      "Estimates total roof surface area footprint in square feet and meters",
    ],
    standards: [
      "NREL PVWatts V8 Photovoltaic Performance Model",
      "IEC 62548 (Design Requirements for Photovoltaic Arrays)",
      "NFPA 70 / NEC Article 690 (Solar Photovoltaic Systems)",
      "IEEE 1547 Distributed Energy Standards",
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

      <DirectAnswerCard
        keyword="solar panel size and count calculation"
        answer="An average American home consuming 900 kWh/month (10,800 kWh/year) in a region with 1,450 kWh/kW-yr solar yield requires approximately an 8.0 kW to 8.5 kW solar system. With standard 400W solar panels, this requires 20 to 22 panels taking up roughly 400 square feet of roof space."
        formula="System Size (kW) = (Annual kWh × Design Margin) ÷ Specific Solar Yield · Panel Count = System kW ÷ Panel Rating (kW)"
        standardExample="10,800 kWh/year at 1,450 yield with 10% buffer: (10,800 × 1.10) ÷ 1,450 = 8.19 kW → 21 × 400W panels"
        sourceAuthority="NREL PVWatts V8 Model & IEC 61215 PV Standards"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarPanelSizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate How Many Solar Panels You Need</h2>
        <ol>
          <li><strong>Enter Annual Electricity Target (kWh):</strong> Check your electric utility bill for annual kilowatt-hour usage (typical US homes use 9,000 to 12,000 kWh/yr).</li>
          <li><strong>Select Individual Panel Wattage:</strong> Standard modern residential monocrystalline panels range from 380W to 440W (400W default).</li>
          <li><strong>Apply Design Margin:</strong> Add 10% to 20% headroom to account for panel aging and future electrification (EVs or heat pumps).</li>
          <li><strong>Review Roof Footprint:</strong> Check total estimated square footage of roof space required.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar Panel System Sizing Guide by Household Electricity Usage</h2>
        <p>Typical solar array sizes and panel counts needed to offset 100% of household electricity (assuming 400W modern panels and average 1,450 kWh/kW-yr specific solar yield):</p>
        <div className="scenario-table" role="region" aria-label="Solar system size by monthly usage">
          <table>
            <caption>Solar array size and panel count by monthly household electricity usage</caption>
            <thead>
              <tr>
                <th scope="col">Monthly Electricity Use</th>
                <th scope="col">Annual Energy Target</th>
                <th scope="col">System Size (kW)</th>
                <th scope="col">400W Panel Count</th>
                <th scope="col">Est. Roof Area Needed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>300 kWh/mo</strong> (Apartment / Small Home)</td>
                <td>3,600 kWh/yr</td>
                <td>~2.8 kW</td>
                <td>7 panels</td>
                <td>~140 sq ft (13 m²)</td>
              </tr>
              <tr>
                <td><strong>600 kWh/mo</strong> (Medium Energy Efficient Home)</td>
                <td>7,200 kWh/yr</td>
                <td>~5.2 kW</td>
                <td>13 panels</td>
                <td>~260 sq ft (24 m²)</td>
              </tr>
              <tr>
                <td><strong>900 kWh/mo</strong> (Average US Household)</td>
                <td>10,800 kWh/yr</td>
                <td>~8.0 kW</td>
                <td>20 panels</td>
                <td>~400 sq ft (37 m²)</td>
              </tr>
              <tr>
                <td><strong>1,200 kWh/mo</strong> (Large Home + Central AC)</td>
                <td>14,400 kWh/yr</td>
                <td>~10.4 kW</td>
                <td>26 panels</td>
                <td>~520 sq ft (48 m²)</td>
              </tr>
              <tr>
                <td><strong>1,500 kWh/mo+</strong> (Large Home + EV + Heat Pump)</td>
                <td>18,000 kWh/yr</td>
                <td>~13.2 kW</td>
                <td>33 panels</td>
                <td>~660 sq ft (61 m²)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar Array Sizing &amp; Panel Count Formulas"
          formula="System_kW = (Annual_kWh_Target × (1 + Margin)) / Specific_Yield  |  Panels = ⌈(System_kW × 1,000) / Panel_Watts⌉"
          formulaDescription="Calculates the total photovoltaic DC nameplate system capacity and whole-number panel count required to generate your target annual electrical energy."
          variables={[
            { symbol: "Annual_kWh_Target", label: "Target Annual Consumption", description: "Total electricity energy requirement for the year.", unit: "kWh/yr" },
            { symbol: "Margin", label: "Design Buffer", description: "Safety margin for degradation and inverter clipping (typically 10%–20%).", unit: "fraction" },
            { symbol: "Specific_Yield", label: "Annual Solar Yield", description: "Location-specific AC kWh generated per installed DC kWp per year (typically 1,100 to 1,750 kWh/kWp).", unit: "kWh/kW-yr" },
            { symbol: "Panel_Watts", label: "Single Module Wattage", description: "Rated peak DC power of individual panel (e.g. 400W).", unit: "W" },
          ]}
          notes={[
            "Total roof area footprint ≈ Panel Count × 20 sq ft (1.85 m²).",
            "Installed array size = Panel Count × Panel Watts ÷ 1,000.",
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
          Model your expected monthly yield with our <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link>, check financial break-even with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>, or size battery backup with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

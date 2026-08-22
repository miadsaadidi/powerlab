import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { HeatPumpCostCalculator } from "@/components/calculator/heat-pump-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("heat-pump-cost");

export const metadata: Metadata = {
  title: "Heat Pump Running Cost Calculator — Heat Pump vs Gas Comparison",
  description: "Compare heat pump operating costs vs natural gas, propane, or oil furnaces. Calculate annual heating bill savings based on COP/HSPF2, AFUE, and local fuel prices.",
  alternates: { canonical: "/home-energy/heat-pump-cost-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Heat Pump Running Cost Calculator — PowerLab",
    description: "Compare annual running costs of electric heat pumps vs natural gas, propane, and fuel oil furnaces.",
    url: `${siteConfig.url}/home-energy/heat-pump-cost-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "Is a heat pump cheaper to run than a natural gas furnace?",
    answer: "It depends on local utility rates and winter climate. Because heat pumps move heat rather than generate it through combustion, they deliver 250% to 350% thermal efficiency (COP 2.5 to 3.5). In regions with moderate electricity prices ($0.12 to $0.18/kWh) and typical gas prices ($1.30 to $1.60/therm), heat pumps and modern 80%–96% gas furnaces have roughly comparable running costs. When replacing expensive propane or heating oil, heat pumps save between $800 and $1,500 every year.",
  },
  {
    question: "How much money can you save switching from propane or oil to a heat pump?",
    answer: "Delivered propane ($3.20/gal) and heating oil ($4.10/gal) are among the most expensive heating fuels. Switching to a high-efficiency electric heat pump typically saves homeowners between $800 and $1,600 per year on winter heating bills.",
  },
  {
    question: "What is COP and how does it work in cold weather?",
    answer: "COP (Coefficient of Performance) measures how many units of heat energy a heat pump moves into your home for every 1 unit of electrical energy consumed. A COP of 3.0 means you get 300% effective heating efficiency. Modern cold-climate heat pumps maintain COPs of 2.0 to 2.5 even in sub-zero (0°F / -18°C) temperatures without turning on backup heat strips.",
  },
  {
    question: "What is the break-even electricity rate for a heat pump?",
    answer: "The break-even electricity rate is the maximum price per kilowatt-hour at which a heat pump matches the operating cost of your existing furnace. If your actual utility rate is lower than this break-even value, heating with your heat pump saves you money on every thermal unit delivered.",
  },
];

export default function HeatPumpCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Heat Pump vs Furnace Cost Calculator",
    description: "Compare annual running costs of an electric heat pump against natural gas, propane, and fuel oil heating systems.",
    route: "/home-energy/heat-pump-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Universal thermodynamic energy balance across electricity, gas (Therms), propane (gal), and oil (gal)",
      "AHRI standard COP and HSPF2 seasonal efficiency calculations",
      "Dynamic break-even electricity price ($/kWh) threshold solver",
      "Building thermal demand modeling by climate zone and square footage",
    ],
    standards: [
      "AHRI Standard 210/240 (Unitary Heat Pump Equipment Rating)",
      "DOE 10 CFR Part 430 Appendix M1 (HSPF2 Rating Procedures)",
      "ASHRAE Handbook of HVAC Systems and Equipment",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/home-energy">Home Energy</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Heat Pump Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home Electrification &amp; Heating Economics</p>
        <h1>Heat Pump Running Cost Calculator</h1>
        <p className="intro">
          Compare the annual operating costs of an electric heat pump against natural gas, propane, or heating oil furnaces based on your home heating demand, equipment efficiency, and local utility rates.
        </p>
      </div>

      <DirectAnswerCard
        keyword="heat pump running cost vs gas comparison"
        answer="Because heat pumps move heat rather than burning fuel, they operate at 250% to 350% seasonal efficiency (COP 2.5 to 3.5). Compared to a standard 80% natural gas furnace, a heat pump has comparable operating costs ($1,100 to $1,400/yr). Compared to propane ($3.20/gal) or oil ($4.10/gal), an electric heat pump saves homeowners $800 to $1,500 every winter."
        formula="Annual Heat Pump Cost ($) = [Total Heating Demand (BTU) ÷ (COP × 3,412)] × Electricity Rate ($/kWh)"
        standardExample="50 Million BTU heating demand with COP 3.0 heat pump @ $0.18/kWh: (50M ÷ 10,236) × 0.18 = $879/year"
        sourceAuthority="AHRI Directory of Certified Heating Products & DOE Energy Star"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <HeatPumpCostCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Compare Heat Pump vs Furnace Heating Costs</h2>
        <ol>
          <li><strong>Select Heat Pump Efficiency (COP / HSPF2):</strong> Modern cold-climate inverter heat pumps deliver average seasonal COPs between 2.8 and 3.8.</li>
          <li><strong>Choose Comparison Fossil Fuel:</strong> Select natural gas ($/Therm), propane ($/gal), fuel oil ($/gal), or baseboard electric ($/kWh).</li>
          <li><strong>Set Annual Heating Thermal Demand:</strong> Choose home square footage and insulation level (average US homes require 40M to 70M BTU of heat per winter).</li>
          <li><strong>Analyze the Break-Even Rate:</strong> The calculator identifies the exact $/kWh electricity threshold below which a heat pump saves money every winter.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Annual Heating Bill Comparison by Fuel Type</h2>
        <p>Representative annual operating costs for heating a 2,000 sq ft home (50 Million BTU heat demand):</p>
        <div className="scenario-table" role="region" aria-label="Annual heating cost comparison by fuel type">
          <table>
            <caption>Residential heating system operating costs, fuel consumption, and net savings</caption>
            <thead>
              <tr>
                <th scope="col">Heating Fuel System</th>
                <th scope="col">Efficiency Rating</th>
                <th scope="col">Fuel Energy Needed</th>
                <th scope="col">Typical Annual Cost</th>
                <th scope="col">vs Heat Pump</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Electric Inverter Heat Pump</strong></td>
                <td>3.20 COP (11.0 HSPF2)</td>
                <td>4,580 kWh</td>
                <td><strong>$824 / yr</strong></td>
                <td><em>Baseline</em></td>
              </tr>
              <tr>
                <td><strong>Standard Natural Gas Furnace</strong></td>
                <td>80% AFUE</td>
                <td>625 Therms</td>
                <td>$906 / yr</td>
                <td>Save $82 / yr</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Gas Furnace</strong></td>
                <td>96% AFUE (Condensing)</td>
                <td>521 Therms</td>
                <td>$755 / yr</td>
                <td>+$69 / yr (similar)</td>
              </tr>
              <tr>
                <td><strong>Propane Gas Furnace</strong></td>
                <td>85% AFUE</td>
                <td>643 Gallons</td>
                <td>$2,058 / yr</td>
                <td><strong>Save $1,234 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>Heating Oil Boiler / Furnace</strong></td>
                <td>80% AFUE</td>
                <td>451 Gallons</td>
                <td>$1,850 / yr</td>
                <td><strong>Save $1,026 / yr</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Heating Fuel Equivalence &amp; Cost Formulas"
          formula="Annual_Cost = (Annual_BTU_Demand / (Fuel_Energy_Density × Efficiency)) × Fuel_Price"
          formulaDescription="Universal thermodynamic energy balance normalizing electric COP, gas AFUE, and delivered fuel heating values."
          variables={[
            { symbol: "Annual_BTU_Demand", label: "Home Thermal Heating Load", description: "Total seasonal heat energy required by the building (standard 50 Million BTU for average home)", unit: "BTU/year" },
            { symbol: "COP", label: "Coefficient of Performance", description: "Heat pump thermal efficiency multiplier (e.g., 3.0 COP delivers 3.0 kWh heat per 1.0 kWh electricity)", unit: "dimensionless" },
            { symbol: "AFUE", label: "Combustion Efficiency", description: "Annual Fuel Utilization Efficiency of furnace/boiler (80% standard vs 96% condensing)", unit: "%" },
            { symbol: "Break_Even_Rate", label: "Break-Even Electricity Price", description: "Maximum electricity price ($/kWh) where heat pump cost equals combustion fuel cost", unit: "$/kWh" },
          ]}
          notes={[
            "1 kWh electricity delivers 3,412 BTU of thermal energy at 1.0 COP.",
            "1 Therm of natural gas contains 100,000 BTU; 1 Gallon of propane contains 91,500 BTU; 1 Gallon of #2 fuel oil contains 138,500 BTU.",
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
        <h2>Related Heating, Cooling &amp; Energy Planning</h2>
        <p>
          Looking at summer cooling efficiency? Use our <Link href="/home-energy/air-conditioner-cost-calculator">Air Conditioner Cost Calculator</Link> (SEER2 modeling), check supplemental room heating with the <Link href="/home-energy/space-heater-cost-calculator">Space Heater Cost Calculator</Link>, or project overall electricity bills with the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Heating fuel conversions utilize standard US Energy Information Administration (EIA) Higher Heating Values (HHV) and AHRI standard COP/HSPF2 ratings. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

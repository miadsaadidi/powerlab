import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvSavingsCalculator } from "@/components/calculator/ev-savings-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("ev-savings");

export const metadata: Metadata = buildPageMetadata({
  title: "EV Savings Calculator — Fuel vs Electric Cost",
  description: "Compare EV electricity cost with combustion-vehicle fuel cost using your annual distance, EV consumption, electricity price, fuel economy and fuel price.",
  canonicalPath: "/ev/ev-savings-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How much money does switching to an electric vehicle save per year?",
    answer: "Driving 12,000 miles per year in an EV (averaging 3.5 mi/kWh battery consumption, 90% charging efficiency, at $0.16/kWh) costs ~$610 in grid electricity. Driving a 28 MPG gas car paying $3.50/gallon costs ~$1,500 in fuel. This yields ~$890 per year in recurring energy and fuel cost savings.",
  },
  {
    question: "How much cheaper is EV electricity compared to gasoline per mile?",
    answer: "At $0.16/kWh electricity, 3.5 mi/kWh battery consumption, and 90% charging efficiency, home EV charging costs ~$0.051 per mile. A 28 MPG gasoline car at $3.50/gallon costs ~$0.125 per mile. Energy costs per mile for electric driving are typically 2× to 3.5× lower than gasoline under typical utility rates.",
  },
  {
    question: "Do EVs save money on maintenance and repair?",
    answer: "Electric vehicles generally have lower recurring powertrain maintenance costs because they eliminate engine oil changes, spark plugs, timing belts, and exhaust systems, while regenerative braking reduces brake pad wear. However, maintenance and repair costs vary significantly by vehicle model, tire replacement frequency, driving habits, and manufacturer service intervals.",
  },
  {
    question: "Can I use this calculator to estimate vehicle purchase payback?",
    answer: "No. This calculator compares recurring energy and fuel operating costs. Calculating full vehicle purchase payback requires upfront vehicle purchase prices, federal/state tax incentives, trade-in values, financing terms, depreciation, insurance, and local registration fees.",
  },
];

export default function EvSavingsPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Savings Calculator",
    description: "Compare EV electricity cost with gas car fuel cost for the same annual driving distance and calculate total savings.",
    route: "/ev/ev-savings-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates annual fuel cost difference between EV and gasoline cars",
      "Calculates cost per mile and cost per kilometer comparison",
      "Supports MPG, L/100km, km/L, mi/kWh, kWh/100mi, and kWh/100km units",
      "Optional maintenance and repair cost comparison inputs",
    ],
    standards: [
      "Technical references: DOE AFDC, EPA Fuel Economy resources, and AAA cost benchmarks",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/ev">EV</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">EV Savings Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Savings Calculator</h1>
        <p className="intro">
          Compare electric vehicle charging costs against gasoline fuel expenses for the same annual driving mileage, and calculate your annual electricity and fuel cost savings.
        </p>
      </div>

      <div id="calculator-tool">
        <EvSavingsCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="EV vs gas car fuel savings calculation"
        answer="Driving an electric vehicle 12,000 miles per year saves approximately $890 annually in energy costs compared to a 28 MPG gas car paying $3.50/gallon. Annual EV electricity cost is about $610 (at 3.5 mi/kWh, 90% charging efficiency, and $0.16/kWh) versus $1,500 for gasoline."
        formula="Annual Energy/Fuel Savings ($) = [Annual Miles ÷ Gas_MPG × Fuel_Price] − [(Annual Miles ÷ EV_mi_kWh ÷ Efficiency) × Electricity_Price]"
        standardExample="12,000 miles: Gas (28 MPG @ $3.50/gal = $1,500/yr) − EV (3.5 mi/kWh, 90% eff @ $0.16/kWh = $610/yr) = $890/year saved"
        sourceAuthority="Technical references: DOE AFDC, EPA Fuel Economy resources, and AAA cost benchmarks"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV vs Gas Vehicle Savings</h2>
        <ol>
          <li><strong>Enter Annual Driving Distance:</strong> Input yearly miles or kilometers (US average is ~12,000–14,000 miles/yr).</li>
          <li><strong>Enter Gasoline Vehicle Specs:</strong> Input current car fuel economy (MPG or L/100km) and local pump gas price ($/gal).</li>
          <li><strong>Enter EV Battery Consumption &amp; Power Price:</strong> Input vehicle economy (mi/kWh, kWh/100mi, or kWh/100km) and electricity rate ($/kWh).</li>
          <li><strong>Review Total Savings:</strong> Compare annual operating fuel bills, cost per mile, and energy differentials.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>US-Dollar Reference Scenario: Annual Fuel &amp; Energy Cost Savings</h2>
        <p>
          Illustrative reference scenario assuming $3.50/gal gasoline, $0.16/kWh electricity, 28 MPG combustion efficiency, 3.5 mi/kWh battery-side EV consumption, and 90% grid-to-battery charging efficiency. These values are illustrative rather than universal market prices:
        </p>
        <div className="scenario-table" role="region" aria-label="Annual EV vs Gas savings comparison">
          <table>
            <caption>Annual fuel cost comparison: 28 MPG Gas Car vs 3.5 mi/kWh Electric Vehicle (90% eff)</caption>
            <thead>
              <tr>
                <th scope="col">Annual Driving Distance</th>
                <th scope="col">Gasoline Car Cost (@ $3.50/gal)</th>
                <th scope="col">EV Electricity Cost (@ $0.16/kWh)</th>
                <th scope="col">Net Annual Fuel Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>8,000 miles/yr</strong> (~12,875 km)</td>
                <td>$1,000 / yr</td>
                <td>~$406 / yr</td>
                <td><strong>+$594 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>12,000 miles/yr</strong> (~19,312 km)</td>
                <td>$1,500 / yr</td>
                <td>~$610 / yr</td>
                <td><strong>+$890 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>15,000 miles/yr</strong> (~24,140 km)</td>
                <td>$1,875 / yr</td>
                <td>~$762 / yr</td>
                <td><strong>+$1,113 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>20,000 miles/yr</strong> (~32,187 km)</td>
                <td>$2,500 / yr</td>
                <td>~$1,016 / yr</td>
                <td><strong>+$1,484 / yr</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV vs Gas Operating Cost &amp; Savings Formulas"
          formula="Battery_kWh = Annual_Distance ÷ mi_per_kWh  |  Grid_kWh = Battery_kWh ÷ Charging_Efficiency  |  EV_Annual_Cost = Grid_kWh × Electricity_Rate  |  Gas_Annual_Cost = (Annual_Distance ÷ MPG) × Fuel_Price"
          formulaDescription="Calculates the annual electricity and gasoline cost differential between an electric vehicle and an internal combustion engine vehicle over the exact same annual mileage."
          variables={[
            { symbol: "Annual_Distance", label: "Annual Travel Distance", description: "Total miles or kilometers driven per year.", unit: "mi/yr or km/yr" },
            { symbol: "mi_per_kWh", label: "EV Battery Consumption", description: "Battery-side vehicle energy economy before charging losses.", unit: "mi/kWh" },
            { symbol: "Charging_Efficiency", label: "Charging Efficiency", description: "Grid-to-battery charging efficiency (typically 85%–95%, default 90%).", unit: "fraction" },
            { symbol: "Electricity_Rate", label: "Electricity Price", description: "Electricity rate per kilowatt-hour purchased from the grid.", unit: "currency/kWh" },
            { symbol: "MPG", label: "Gas Car Fuel Economy", description: "Fuel economy of the comparable combustion vehicle.", unit: "MPG" },
            { symbol: "Fuel_Price", label: "Gasoline / Diesel Price", description: "Price per gallon or liter ($/gal, €/L, £/L).", unit: "currency/gal" },
          ]}
          notes={[
            "Annual Energy/Fuel Savings = Gas_Annual_Cost − EV_Annual_Cost.",
            "When maintenance inputs are provided: Net Annual Savings = Annual Energy/Fuel Savings + (Gas Maintenance − EV Maintenance).",
            "Grid electricity consumption accounts for charging losses between wall power and battery storage: Grid_kWh = Battery_kWh ÷ Charging_Efficiency.",
          ]}
        />
      </div>

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Calculations are derived from deterministic energy conversion physics and empirical automotive operating cost benchmarks:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "1.25rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>DOE Alternative Fuels Data Center</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              U.S. Department of Energy (AFDC) fuel property comparisons, gasoline gallon equivalent (GGE) metrics, and residential Level 2 charging efficiency benchmarks.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>EPA Fuel Economy Guide</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Environmental Protection Agency (EPA) vehicle dynamometer testing procedures, window-sticker fuel economy ratings, and standardized electrical consumption metrics.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>AAA Driving Costs Benchmarks</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              American Automobile Association (AAA) annual &ldquo;Your Driving Costs&rdquo; empirical studies detailing fuel, electricity, and preventative maintenance differentials.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>PowerLab Deterministic Engine</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Pure client-side mathematical evaluation applying AC charging efficiency divisor exactly once with zero hidden assumptions or invented multi-year financial figures.
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
        <h2>Related EV Planning Tools</h2>
        <p>
          Calculate individual charging session costs with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>, estimate battery driving range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>, or calculate solar installation payback with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

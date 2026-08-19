import type { Metadata } from "next";
import Link from "next/link";
import { EvSavingsCalculator } from "@/components/calculator/ev-savings-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


const isPublished = isCalculatorPublished("ev-savings");

export const metadata: Metadata = {
  title: "EV Savings Calculator — Compare Electricity vs Fuel Cost",
  description: "Compare EV electricity cost with combustion-vehicle fuel cost using your annual distance, EV consumption, electricity price, fuel economy and fuel price.",
  alternates: { canonical: "/ev/ev-savings-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: { title: "EV Savings Calculator — Compare Electricity vs Fuel Cost", description: "Compare EV electricity cost with combustion-vehicle fuel cost using your annual distance, EV consumption, electricity price, fuel economy and fuel price." },
};

const FAQS = [
  {
    question: "How much money does switching to an electric vehicle save per year?",
    answer: "Driving 12,000 miles per year in an EV (averaging 3.5 mi/kWh at $0.16/kWh) costs ~$610 in electricity. Driving a 28 MPG gas car paying $3.50/gallon costs ~$1,500 in fuel. This yields ~$890 per year in pure fuel savings, plus an additional $300 to $500/year in reduced oil changes and brake wear.",
  },
  {
    question: "How much cheaper is EV electricity compared to gasoline per mile?",
    answer: "Home EV charging typically costs $0.035 to $0.050 per mile, while a modern gasoline car costs $0.12 to $0.16 per mile. Driving an electric vehicle is typically 2.5× to 4× cheaper per mile than gasoline.",
  },
  {
    question: "Do EVs save money on maintenance and repair?",
    answer: "Yes. Electric cars have no engine oil, spark plugs, timing belts, transmission fluid, oxygen sensors, or catalytic converters. Regenerative braking also extends brake pad life to over 100,000 miles. AAA estimates EV maintenance costs are ~30% to 40% lower than gas cars.",
  },
  {
    question: "What is the typical payback period when switching to an EV?",
    answer: "Depending on federal/state tax incentives, electricity rates, and annual driving mileage, the higher upfront purchase price of an EV is typically recouped within 3 to 6 years through fuel and maintenance savings alone.",
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
      "Supports MPG, L/100km, km/L, mi/kWh, and kWh/100km units",
      "Optional maintenance and repair cost comparison inputs",
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
          Compare electric vehicle charging costs against gasoline fuel expenses for the same annual driving mileage, and calculate your net annual fuel and maintenance savings.
        </p>
      </div>

      <DirectAnswerCard
        keyword="EV vs gas car fuel savings calculation"
        answer="Driving an electric vehicle 12,000 miles per year saves approximately $850 to $1,200 annually in fuel expenses compared to a 28 MPG gas car at $3.50/gallon. Annual EV electricity cost is about $550 to $650 (at $0.165/kWh) versus $1,500 for gasoline. Over 5 years, total combined fuel and maintenance savings typically exceed $6,000."
        formula="Annual Fuel Savings ($) = [Annual Miles ÷ Gas_MPG × Gas_Price] − [Annual Miles ÷ EV_mi_kWh × Electricity_Price]"
        standardExample="12,000 miles: Gas (28 MPG @ $3.50/gal = $1,500) − EV (3.5 mi/kWh @ $0.165/kWh = $565) = $935/year saved"
        sourceAuthority="US Department of Energy (AFDC) & AAA Driving Costs Study"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <EvSavingsCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV vs Gas Vehicle Savings</h2>
        <ol>
          <li><strong>Enter Annual Driving Distance:</strong> Input yearly miles or kilometers (US average is ~12,000–14,000 miles/yr).</li>
          <li><strong>Enter Gasoline Vehicle Specs:</strong> Input current car fuel economy (MPG or L/100km) and local pump gas price ($/gal).</li>
          <li><strong>Enter EV Efficiency &amp; Power Price:</strong> Input vehicle economy (mi/kWh) and home electricity rate ($/kWh).</li>
          <li><strong>Review Total Savings:</strong> Compare annual operating fuel bills, cost per mile, and multi-year cumulative savings.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>EV vs Gas Annual Fuel Cost Savings Comparison</h2>
        <p>Estimated annual fuel savings comparing an average gasoline vehicle (28 mpg @ $3.50/gal) with an electric vehicle (3.5 mi/kWh @ $0.16/kWh and 90% charging efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Annual EV vs Gas savings comparison">
          <table>
            <caption>Annual fuel cost comparison: 28 MPG Gas Car vs 3.5 mi/kWh Electric Vehicle</caption>
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
                <td><strong>8,000 miles/yr</strong> (~13,000 km)</td>
                <td>$1,000 / yr</td>
                <td>~$406 / yr</td>
                <td><strong>+$594 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>12,000 miles/yr</strong> (~19,000 km)</td>
                <td>$1,500 / yr</td>
                <td>~$610 / yr</td>
                <td><strong>+$890 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>15,000 miles/yr</strong> (~24,000 km)</td>
                <td>$1,875 / yr</td>
                <td>~$762 / yr</td>
                <td><strong>+$1,113 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>20,000 miles/yr</strong> (~32,000 km)</td>
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
          formula="EV_Annual_Cost = (Annual_Distance / mi_per_kWh / Efficiency) × Rate_Per_kWh  |  Gas_Annual_Cost = (Annual_Distance / MPG) × Fuel_Price"
          formulaDescription="Calculates the annual fuel-to-electricity financial differential between driving an electric vehicle versus an internal combustion engine vehicle over the exact same annual mileage."
          variables={[
            { symbol: "Annual_Distance", label: "Annual Travel Distance", description: "Total miles or kilometers driven per year.", unit: "mi/yr or km/yr" },
            { symbol: "mi_per_kWh", label: "EV Energy Efficiency", description: "Average real-world electricity economy (or kWh/100 km).", unit: "mi/kWh" },
            { symbol: "Efficiency", label: "Charging Loss Factor", description: "Grid-to-battery charging efficiency (typically 88%–92%).", unit: "fraction" },
            { symbol: "MPG", label: "Gas Car Fuel Economy", description: "Miles per gallon (or L/100 km) for the comparable combustion vehicle.", unit: "MPG" },
            { symbol: "Fuel_Price", label: "Gasoline / Diesel Price", description: "Price per gallon or liter ($/gal, €/L, £/L).", unit: "currency/gal" },
          ]}
          notes={[
            "Annual Fuel Savings = Gas_Annual_Cost - EV_Annual_Cost.",
            "Total Annual Savings = Annual Fuel Savings + (Gas Maintenance - EV Maintenance).",
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
        <h2>Related EV Planning Tools</h2>
        <p>
          Calculate individual charging session costs with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>, estimate battery driving range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>, or calculate solar installation payback with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

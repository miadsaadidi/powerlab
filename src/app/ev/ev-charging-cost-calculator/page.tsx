import type { Metadata } from "next";
import Link from "next/link";
import { EvChargingCostCalculator } from "@/components/calculator/ev-charging-cost-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ev-charging-cost");


export const metadata: Metadata = {
  title: "EV Charging Cost Calculator — Cost per Charge",
  description: "Estimate EV charging cost from battery size, start and target charge, charging efficiency and your electricity price per kWh.",
  alternates: { canonical: "/ev/ev-charging-cost-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: { title: "EV Charging Cost Calculator — Cost per Charge", description: "Estimate EV charging cost from battery size, battery-side consumption, charging efficiency and your electricity price." },
};

const FAQS = [
  {
    question: "How much does it cost to fully charge an electric car at home?",
    answer: "Charging an average 65 kWh EV battery from empty to full at the US national average electricity rate of $0.16/kWh (with 90% AC charging efficiency) costs approximately $11.50, providing about 250 to 280 miles of driving range.",
  },
  {
    question: "How much does an EV cost per mile to drive?",
    answer: "At $0.16/kWh and an average vehicle efficiency of 3.5 miles per kWh, driving an EV costs approximately $0.046 per mile. In contrast, a 30 MPG gasoline car paying $3.50/gallon costs about $0.117 per mile — over 2.5× more expensive.",
  },
  {
    question: "Why does home charging cost less than public DC fast charging?",
    answer: "Home charging uses standard residential utility electric rates ($0.10–$0.20/kWh). Commercial DC fast charging networks (Electrify America, EVgo, Tesla Superchargers) typically charge $0.35 to $0.50/kWh to recoup high installation costs, high-power grid demand charges, and commercial operating margins.",
  },
  {
    question: "What are EV charging efficiency losses?",
    answer: "During AC charging, onboard inverters convert AC power to DC battery power with 88% to 92% efficiency. The remaining 8% to 12% is dissipated as heat or used for active battery thermal management cooling fans and pumps.",
  },
];

export default function EvChargingCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Charging Cost Calculator",
    description: "Estimate how much an EV charging session or driving distance costs from battery capacity, charging efficiency, and electricity price per kWh.",
    route: "/ev/ev-charging-cost-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates charging session cost and cost per mile / 100 miles",
      "Supports session charging mode and distance driving mode",
      "Configurable source-to-battery charging efficiency losses",
      "Supports multiple display currencies (USD, EUR, GBP, CAD, AUD)",
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
        <span aria-current="page">EV Charging Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Charging Cost Calculator</h1>
        <p className="intro">
          Estimate how much an EV charging session or driving distance costs based on battery capacity, AC/DC charging losses, and your local electricity rate ($/kWh).
        </p>
      </div>

      <DirectAnswerCard
        keyword="EV charging cost calculation"
        answer="Charging an electric vehicle with a 65 kWh battery from 10% to 80% at home costs approximately $8.25 at the US national average residential electricity rate of $0.165/kWh (including 90% AC onboard charger efficiency). Driving an EV costs roughly $0.04 to $0.05 per mile, compared to $0.12 to $0.14 per mile for an equivalent gas vehicle."
        formula="Session Cost ($) = {[Battery Capacity (kWh) × (Target SoC − Start SoC)] ÷ Charging Efficiency} × Electricity Rate ($/kWh)"
        standardExample="65 kWh EV from 10% to 80% (45.5 kWh needed) with 90% efficiency @ $0.165/kWh: (45.5 ÷ 0.90) × $0.165 = $8.34"
        sourceAuthority="EPA Fuel Economy Guidelines & US Dept. of Energy Alternative Fuels Data"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <EvChargingCostCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Charging Costs</h2>
        <ol>
          <li><strong>Select Calculation Mode:</strong> Choose Single Charging Session or Driving Distance Cost.</li>
          <li><strong>Enter Battery Capacity (kWh):</strong> Input usable battery pack size (e.g. 60 kWh, 75 kWh, 100 kWh).</li>
          <li><strong>Enter Electricity Rate ($/kWh):</strong> Input your home tariff (e.g. $0.16/kWh) or commercial DC fast charge price (e.g. $0.45/kWh).</li>
          <li><strong>Review Financial Breakdown:</strong> See total session cost, billed grid kWh, and cost per mile driven.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>EV Charging Session &amp; Cost per Mile Reference Matrix</h2>
        <p>Comparison of full recharge costs (10% to 100% SOC, 90% AC efficiency) across standard battery pack sizes and charging locations:</p>
        <div className="scenario-table" role="region" aria-label="EV charging cost comparison table">
          <table>
            <caption>Estimated charging session cost &amp; cost-per-mile comparison</caption>
            <thead>
              <tr>
                <th scope="col">EV Battery Pack Size</th>
                <th scope="col">Off-Peak Home ($0.10/kWh)</th>
                <th scope="col">US Avg Home ($0.16/kWh)</th>
                <th scope="col">Commercial DC Fast ($0.45/kWh)</th>
                <th scope="col">Driving Cost per Mile (3.5 mi/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>50 kWh Pack</strong> (e.g. Leaf, Kona)</td>
                <td>~$5.00</td>
                <td>~$8.00</td>
                <td>~$22.50</td>
                <td><strong>$0.029 – $0.046 / mi</strong></td>
              </tr>
              <tr>
                <td><strong>65 kWh Pack</strong> (e.g. Model 3 RWD, Bolt)</td>
                <td>~$6.50</td>
                <td>~$10.40</td>
                <td>~$29.25</td>
                <td><strong>$0.029 – $0.046 / mi</strong></td>
              </tr>
              <tr>
                <td><strong>75 kWh Pack</strong> (e.g. Model Y, Ioniq 5)</td>
                <td>~$7.50</td>
                <td>~$12.00</td>
                <td>~$33.75</td>
                <td><strong>$0.029 – $0.046 / mi</strong></td>
              </tr>
              <tr>
                <td><strong>100 kWh Pack</strong> (e.g. Rivian, F-150 Lightning)</td>
                <td>~$10.00</td>
                <td>~$16.00</td>
                <td>~$45.00</td>
                <td><strong>$0.038 – $0.061 / mi</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Charging Cost &amp; Driving Expense Formulas"
          formula="Session_Cost = [(Battery_kWh × (Target_SOC - Start_SOC)) / Efficiency] × Rate_Per_kWh"
          formulaDescription="Calculates the total monetary expense of an EV charging session by determining total wall-socket grid energy drawn, factoring in AC onboard charger conversion losses."
          variables={[
            { symbol: "Battery_kWh", label: "Usable Battery Pack Size", description: "Gross or usable energy capacity of the traction pack.", unit: "kWh" },
            { symbol: "Target_SOC - Start_SOC", label: "Charge State Delta", description: "Target minus starting percentage of battery charge (e.g. 20% to 80% = 0.60).", unit: "fraction" },
            { symbol: "Efficiency", label: "Source-to-Battery Efficiency", description: "AC-DC rectification and thermal cooling efficiency (typically 88%–92%).", unit: "fraction" },
            { symbol: "Rate_Per_kWh", label: "Electricity Cost Rate", description: "Home utility rate or public EVSE fee per kilowatt-hour.", unit: "currency/kWh" },
          ]}
          notes={[
            "Driving cost per 100 miles = [(Consumption_kWh_100mi / Efficiency) × Rate_Per_kWh].",
            "Driving cost per mile = Driving cost per 100 miles ÷ 100.",
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
          Compare annual savings versus gasoline with the <Link href="/ev/ev-savings-calculator">EV Savings Calculator</Link>, calculate session hours with the <Link href="/ev/ev-charging-time-calculator">EV Charging Time Calculator</Link>, or size home charger electrical wiring with the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvChargingTimeCalculator } from "@/components/calculator/ev-charging-time-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ev-charging-time");

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charging Time Calculator — AC & DC Charge Time",
  description: "Estimate EV charging time from battery capacity, start and target charge, charger power and vehicle limits with clear AC and DC assumptions.",
  canonicalPath: "/ev/ev-charging-time-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How long does it take to charge an electric car on a 240V Level 2 charger?",
    answer: "A standard Level 2 home charger (7.2 kW to 11.5 kW / 30A to 48A @ 240V) fully charges an average 60 kWh to 75 kWh EV battery from 20% to 80% in approximately 4.5 to 7 hours, easily completing a full recharge overnight.",
  },
  {
    question: "How long does Level 1 (120V wall outlet) EV charging take?",
    answer: "A standard 120V household outlet delivers ~1.4 kW (12A), adding about 3 to 5 miles of driving range per hour. Recharging an average 60 kWh battery from 20% to 80% takes roughly 28 to 35 hours.",
  },
  {
    question: "Why does DC Fast Charging slow down above 80%?",
    answer: "Lithium-ion battery cells generate increased internal electrical resistance and heat as they fill. To prevent lithium plating and thermal degradation, the vehicle BMS commands the DC fast charger to taper current significantly once the battery exceeds 80% state of charge.",
  },
  {
    question: "What is the difference between charger power and vehicle onboard acceptance limit?",
    answer: "During AC charging, an onboard inverter inside the car converts AC grid power to DC battery power. If your home charger can supply 11.5 kW (48A) but your EV's onboard charger maxes out at 7.7 kW (32A), your car will only charge at 7.7 kW.",
  },
];

export default function EvChargingTimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Charging Time Calculator",
    description: "Estimate how long an electric vehicle takes to charge from one state of charge to another across Level 1, Level 2 and DC Fast Charging.",
    route: "/ev/ev-charging-time-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates charging time in hours and minutes across AC and DC speeds",
      "Accounts for vehicle onboard acceptance limit (kW)",
      "Models DC fast charge saturation curve and taper behavior",
      "Separates battery energy added from grid source energy",
    ],
    standards: [
      "SAE J1772 / SAE J3400 (North American Charging Standard)",
      "NFPA 70 / NEC Article 625 (Electric Vehicle Power Transfer System)",
      "IEC 61851 (Electric Vehicle Conductive Charging System)",
      "IEEE 2030.1.1 (Standard for EV Infrastructure Interfaces)",
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
        <span aria-current="page">EV Charging Time Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Charging Time Calculator</h1>
        <p className="intro">
          Estimate how long an electric vehicle takes to charge across Level 1 (120V), Level 2 (240V), and DC Fast Charging speeds, factoring in vehicle onboard acceptance limits and DC taper curves.
        </p>
      </div>

      <DirectAnswerCard
        keyword="ev charging time calculator"
        answer="To calculate EV charging time, divide the energy needed (kWh) by the effective charging power (kW) delivered to the battery, accounting for approximately 90% AC charging efficiency."
        formula="Charging Time (Hours) = (Battery Size kWh × % Charge Needed) ÷ (Charger Power kW × 0.90 Efficiency)"
        standardExample="A 60 kWh EV battery adding 50% charge (30 kWh) on a 9.6 kW Level 2 home charger takes approximately 3.5 hours."
        sourceAuthority="SAE J1772 / J3400 (NACS) Charging Standards"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <EvChargingTimeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Charging Time</h2>
        <ol>
          <li><strong>Enter EV Battery Capacity (kWh):</strong> Input usable battery pack size (e.g. 60 kWh for standard sedans, 75–100 kWh for SUVs/trucks).</li>
          <li><strong>Set Start and Target Battery Level (%):</strong> Typical daily charging runs from 20% to 80% to maximize lithium battery health.</li>
          <li><strong>Select Charger Type / Speed:</strong> Choose Level 1 (1.4 kW), Level 2 Home Wallbox (7.2 kW–11.5 kW), or DC Fast Charger (50 kW–350 kW).</li>
          <li><strong>Review Charge Duration:</strong> View calculated charge hours and miles of range added per hour.</li>
        </ol>

        <SystemFlowDiagram category="ev" title="Electric Vehicle Charging Power Path & Onboard Rectification" />
      </section>

      <section id="sizing-matrix">
        <h2>EV Charging Time Comparison Chart (20% to 80% Charge)</h2>
        <p>A practical comparison of charging speeds across common EV battery sizes and charger types for a standard 20% to 80% daily recharge window (60% capacity added):</p>
        <div className="scenario-table" role="region" aria-label="EV charging time comparison matrix">
          <table>
            <caption>Estimated charging time by battery capacity &amp; charger power (20% → 80%)</caption>
            <thead>
              <tr>
                <th scope="col">Charger Type &amp; Power</th>
                <th scope="col">50 kWh EV (e.g. Leaf, Kona)</th>
                <th scope="col">60 kWh EV (e.g. Model 3 RWD, Bolt)</th>
                <th scope="col">75 kWh EV (e.g. Model Y, Ioniq 5)</th>
                <th scope="col">100 kWh EV (e.g. F-150 Lightning, Taycan)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Level 1 AC (1.4 kW / 120V 12A)</strong></td>
                <td>~23.8 hrs</td>
                <td>~28.6 hrs</td>
                <td>~35.7 hrs</td>
                <td>~47.6 hrs</td>
              </tr>
              <tr>
                <td><strong>Level 2 AC (7.2 kW / 240V 30A)</strong></td>
                <td>~4.6 hrs</td>
                <td>~5.6 hrs</td>
                <td>~6.9 hrs</td>
                <td>~9.3 hrs</td>
              </tr>
              <tr>
                <td><strong>Level 2 AC (11.5 kW / 240V 48A)</strong></td>
                <td>~2.9 hrs</td>
                <td>~3.5 hrs</td>
                <td>~4.3 hrs</td>
                <td>~5.8 hrs</td>
              </tr>
              <tr>
                <td><strong>DC Fast Charging (50 kW)</strong></td>
                <td>~40 min</td>
                <td>~48 min</td>
                <td>~60 min</td>
                <td>~80 min</td>
              </tr>
              <tr>
                <td><strong>DC Ultra-Fast (150 kW+)</strong></td>
                <td>~18 min</td>
                <td>~21 min</td>
                <td>~25 min</td>
                <td>~32 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Charging Duration &amp; Energy Formulas"
          formula="Time (hours) = (Capacity_kWh × (Target_SOC - Start_SOC)) / Effective_Power_kW"
          formulaDescription="Computes exact charging duration by dividing net energy required by the effective charging power delivered to the battery pack, accounting for AC/DC conversion efficiencies and vehicle acceptance limits."
          variables={[
            { symbol: "Capacity_kWh", label: "Usable Battery Capacity", description: "Total usable energy storage of the EV battery pack.", unit: "kWh" },
            { symbol: "Start_SOC", label: "Starting State of Charge", description: "Battery percentage at the beginning of the charging session.", unit: "%" },
            { symbol: "Target_SOC", label: "Target State of Charge", description: "Desired final battery percentage.", unit: "%" },
            { symbol: "Effective_Power_kW", label: "Net Charging Rate", description: "min(Charger Power, Vehicle Max Accept Rate) × Conversion Efficiency (η).", unit: "kW" },
          ]}
          notes={[
            "For Level 1 and Level 2 AC charging, efficiency typically ranges between 85% and 92% due to onboard AC-to-DC rectifier losses and thermal management.",
            "For DC fast charging, charging rates taper significantly above 80% SOC as battery cell resistance increases.",
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
        <h2>Related EV Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Calculate charging costs with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>, size electrical wiring with the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link>, or compare gas savings with the <Link href="/ev/ev-savings-calculator">EV Savings Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Level 2 EV Charging Speed, Amperage &amp; Breaker Sizing Guide</Link> for detailed continuous load calculations, NEC 80% rule charts, and hardwired vs. plug-in comparisons.
        </p>
      </section>
    </article>
  );
}

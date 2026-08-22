import type { Metadata } from "next";
import Link from "next/link";
import { BatteryChargingTimeCalculator } from "@/components/calculator/battery-charging-time-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("battery-charging-time");

export const metadata: Metadata = {
  title: "Battery Charging Time Calculator — Calculate Recharge Time",
  description: "Calculate how long it takes to charge a 12V, 24V, or 48V battery based on Ah capacity, charger amperage/watts, chemistry, and absorption taper.",
  alternates: { canonical: "/battery/battery-charging-time-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Battery Charging Time Calculator — PowerLab",
    description: "Calculate exact battery recharge hours and minutes based on battery capacity and charger output current.",
    url: `${siteConfig.url}/battery/battery-charging-time-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How long does it take to charge a 100Ah 12V battery?",
    answer: "With a 10A charger, charging a 100Ah battery from 20% to 100% takes approximately 8.5 hours. With a 20A fast charger, it takes about 4.2 hours, and with a 50A high-output charger, it takes around 1.7 hours.",
  },
  {
    question: "Why does charging take longer than battery capacity divided by charger amps?",
    answer: "Simple division (100Ah ÷ 10A = 10 hrs) ignores coulombic energy losses (heat dissipation) and the constant-voltage (CV) absorption saturation phase, where the charger throttles current down as the battery approaches 100% full.",
  },
  {
    question: "What is the maximum safe charge rate (C-rate) for LiFePO4 batteries?",
    answer: "Most standard LiFePO4 batteries recommend a continuous charge rate between 0.2C and 0.5C (e.g. 20A to 50A for a 100Ah pack). While some cells can accept up to 1.0C (100A), charging at 0.2C–0.5C significantly extends cycle life.",
  },
  {
    question: "Why do Lead-Acid batteries take much longer to charge than LiFePO4?",
    answer: "Lead-Acid batteries have a lower charge efficiency (~80%–85%) and require a prolonged 4-to-6 hour absorption stage to reach a true 100% state of charge without boiling the electrolyte. LiFePO4 accepts high current up to 95%+ SOC.",
  },
];

export default function BatteryChargingTimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Charging Time Calculator",
    description: "Estimate battery charging time from capacity, starting and target state of charge, and charger output.",
    route: "/battery/battery-charging-time-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates battery charge time from start to target state of charge",
      "Supports charger amps, watts, and C-rate maximum limits",
      "Chemistry-specific charging efficiency loss modeling",
      "Accounts for constant-voltage absorption saturation slowdown",
    ],
    standards: [
      "IEEE Std 485 (Recommended Practice for Battery Sizing)",
      "IEC 62619 (Secondary Lithium Cells and Batteries)",
      "UL 1973 (Batteries for Use in Stationary Applications)",
      "NFPA 70 / NEC Article 706",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/battery">Battery</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Battery Charging Time Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Battery planning</p>
        <h1>Battery Charging Time Calculator</h1>
        <p className="intro">
          Estimate how long it takes to charge your battery in hours and minutes from initial to target state of charge, factoring in charger amperage, chemistry efficiency, and absorption taper.
        </p>
      </div>

      <DirectAnswerCard
        keyword="battery charging time calculation"
        answer="A 12V 100Ah battery takes approximately 8.5 hours to recharge from 20% to 100% using a standard 10A charger, or about 4.2 hours with a 20A charger. Charging time equals the energy deficit (Ah needed) divided by charger current, adjusted for charging efficiency (95% for LiFePO4, 85% for Lead-Acid) and the constant-voltage absorption taper stage."
        formula="Charge Time (Hours) = [Battery Ah × (Target SoC − Start SoC)] ÷ (Charger Amps × Charging Efficiency × Taper Factor)"
        standardExample="100Ah LiFePO4 from 20% to 100% with 20A charger: [100 × 0.80] ÷ (20A × 0.95) = 4.21 hours (4h 13m)"
        sourceAuthority="IEC 62619 (Secondary Lithium Cells) & IEEE Std 485"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <BatteryChargingTimeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Battery Charging Duration</h2>
        <ol>
          <li><strong>Enter Battery Capacity:</strong> Enter capacity in Amp-hours (Ah) or Watt-hours (Wh).</li>
          <li><strong>Set Start and Target State of Charge (%):</strong> Choose initial charge level (e.g. 20%) and desired target (e.g. 100%).</li>
          <li><strong>Enter Charger Output Rating:</strong> Input charger output current in Amperes (A) or power in Watts (W).</li>
          <li><strong>Review Estimated Charge Time:</strong> View calculated charge hours with absorption slowdown buffer.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Battery Charging Time Reference Matrix</h2>
        <p>Estimated recharge time from 20% to 100% state of charge (80% capacity replenishment) across standard battery sizes and smart charger output amperages:</p>
        <div className="scenario-table" role="region" aria-label="Battery charging time comparison matrix">
          <table>
            <caption>Estimated charging hours (20% → 100% SOC, LiFePO4 99% efficiency + 1.05 taper)</caption>
            <thead>
              <tr>
                <th scope="col">Battery Capacity</th>
                <th scope="col">5A Trickle / Maintainer</th>
                <th scope="col">10A Standard Charger</th>
                <th scope="col">20A Fast Charger</th>
                <th scope="col">50A High-Output Charger</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>50 Ah Pack</strong> (~640 Wh @ 12.8V)</td>
                <td>~8.5 hours</td>
                <td>~4.2 hours</td>
                <td>~2.1 hours</td>
                <td>~51 min (1.0C max)</td>
              </tr>
              <tr>
                <td><strong>100 Ah Pack</strong> (~1.28 kWh @ 12.8V)</td>
                <td>~17.0 hours</td>
                <td>~8.5 hours</td>
                <td>~4.2 hours</td>
                <td>~1.7 hours</td>
              </tr>
              <tr>
                <td><strong>200 Ah Pack</strong> (~2.56 kWh @ 12.8V)</td>
                <td>~33.9 hours</td>
                <td>~17.0 hours</td>
                <td>~8.5 hours</td>
                <td>~3.4 hours</td>
              </tr>
              <tr>
                <td><strong>300 Ah Pack</strong> (~3.84 kWh @ 12.8V)</td>
                <td>~50.9 hours</td>
                <td>~25.5 hours</td>
                <td>~12.7 hours</td>
                <td>~5.1 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Battery Charging Time Formulas"
          formula="Time (hours) = [(Capacity_Ah × (Target_SOC - Start_SOC)) / (Effective_Amps × Charge_Efficiency)] × Taper_Overhead"
          formulaDescription="Estimates total recharge time by dividing the required Ah/Wh deficit by the effective charging rate, factoring in coulombic charge efficiency and constant-voltage saturation taper time."
          variables={[
            { symbol: "Capacity_Ah", label: "Rated Pack Capacity", description: "Total rated charge capacity in Amp-Hours.", unit: "Ah" },
            { symbol: "Start_SOC / Target_SOC", label: "Charge Delta Window", description: "Target state of charge minus initial state of charge.", unit: "fraction" },
            { symbol: "Effective_Amps", label: "Net Charge Current", description: "min(Charger Current, Battery Max BMS Charge Rate).", unit: "A" },
            { symbol: "Charge_Efficiency", label: "Coulombic Efficiency", description: "Fraction of charging energy stored without dissipation as heat (99% LiFePO4, 85% Lead-Acid).", unit: "fraction" },
            { symbol: "Taper_Overhead", label: "Saturation & Taper Allowance", description: "Multiplier for CV absorption phase slowdown (typically 1.05x LiFePO4, 1.15x Lead-Acid).", unit: "multiplier" },
          ]}
          notes={[
            "In Energy Mode (Wh/W): Time = [(Energy_Wh × ΔSOC) / (Effective_Watts × Efficiency)] × Taper_Overhead.",
            "Charging current should generally not exceed 0.5C (50A for a 100Ah battery) unless fast-charging is explicitly rated by the manufacturer.",
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
        <h2>Related Battery Tools</h2>
        <p>
          Convert capacity with the <Link href="/battery/battery-capacity-calculator">Battery Capacity Calculator</Link>, estimate runtime under load with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or size solar charge controllers with the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

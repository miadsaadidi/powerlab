import type { Metadata } from "next";
import Link from "next/link";
import { BatteryCapacityCalculator } from "@/components/calculator/battery-capacity-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("battery-capacity");

export const metadata: Metadata = {
  title: "Battery Capacity Calculator — Ah to Wh & kWh Conversion",
  description: "Convert battery capacity between Amp-Hours (Ah), Watt-Hours (Wh), and Kilowatt-Hours (kWh) with nominal voltage and usable SOC window math.",
  alternates: { canonical: "/battery/battery-capacity-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Battery Capacity Calculator — PowerLab",
    description: "Convert Ah to Wh and kWh across 12V, 24V, 36V, and 48V battery systems with usable DOD reserves.",
    url: `${siteConfig.url}/battery/battery-capacity-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you convert Amp-hours (Ah) to Watt-hours (Wh)?",
    answer: "Multiply Amp-hours by the nominal battery voltage: Wh = Ah × Volts. For example, a 12V 100Ah battery stores 12 × 100 = 1,200 Watt-hours (or 1.20 kWh) of nominal electrical energy.",
  },
  {
    question: "How do you convert Watt-hours (Wh) to Amp-hours (Ah)?",
    answer: "Divide Watt-hours by the battery voltage: Ah = Wh ÷ Volts. For example, a 2,400 Wh battery is 200 Ah at 12 Volts, 100 Ah at 24 Volts, or 50 Ah at 48 Volts.",
  },
  {
    question: "How many mAh are in 1 Ah?",
    answer: "1 Amp-hour (Ah) equals 1,000 milliamp-hours (mAh). A 20,000 mAh portable power bank has 20 Ah of capacity at its internal 3.7V cell rating (~74 Wh).",
  },
  {
    question: "What is the difference between nominal and usable battery capacity?",
    answer: "Nominal capacity is the theoretical maximum energy stored when fully charged to 100%. Usable capacity is the actual energy you can safely extract above the minimum cutoff reserve (typically 80%–90% usable for LiFePO4, 50% for Lead-Acid).",
  },
];

export default function BatteryCapacityPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Capacity Calculator",
    description: "Convert battery capacity between Ah, mAh, Wh, and kWh using nominal system voltage and usable state-of-charge windows.",
    route: "/battery/battery-capacity-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Bidirectional conversion between Ah, mAh, Wh, and kWh",
      "Nominal voltage presets (3.7V, 12V, 24V, 36V, 48V)",
      "Usable energy calculations factoring in starting and minimum reserve SOC",
      "Accounts for battery State of Health (SOH) degradation",
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
        <span aria-current="page">Battery Capacity Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Battery planning</p>
        <h1>Battery Capacity Calculator</h1>
        <p className="intro">
          Convert battery capacity between Amp-Hours (Ah), Watt-Hours (Wh), and Kilowatt-Hours (kWh) using system voltage, and calculate real usable stored energy.
        </p>
      </div>

      <DirectAnswerCard
        keyword="battery capacity Ah to Wh conversion"
        answer="To convert Amp-hours (Ah) to Watt-hours (Wh), multiply capacity by nominal voltage: Wh = Ah × Volts. For example, a 12V 100Ah battery contains 1,200 Wh (1.2 kWh) of nominal capacity. Usable energy is calculated by multiplying nominal Wh by the safe Depth of Discharge (typically 80%–90% for LiFePO4, 50% for Lead-Acid)."
        formula="Energy (Watt-Hours) = Capacity (Amp-Hours) × Nominal Voltage (Volts)"
        standardExample="12V 100Ah battery = 12V × 100Ah = 1,200 Wh (1.20 kWh) nominal · ~960 Wh usable (80% DoD)"
        sourceAuthority="IEC 60896 (Stationary Batteries) & IEEE Std 485 Standards"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <BatteryCapacityCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Convert Battery Capacity (Ah to Wh)</h2>
        <ol>
          <li><strong>Select Input Unit:</strong> Choose whether you want to enter Amp-hours (Ah), milliamp-hours (mAh), or Watt-hours (Wh).</li>
          <li><strong>Enter Nominal System Voltage:</strong> Select 12V, 24V, 36V, 48V, or enter a custom voltage rating.</li>
          <li><strong>Set Minimum Reserve Cutoff:</strong> Protect battery longevity by defining minimum SOC (20% for Lithium, 50% for Lead-Acid).</li>
          <li><strong>View Usable Energy:</strong> See both gross nominal energy and actual net usable kilowatt-hours.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Battery Capacity &amp; Voltage Conversion Reference Matrix</h2>
        <p>Quick reference table converting Amp-Hours (Ah) to stored energy in Watt-Hours (Wh) and Kilowatt-Hours (kWh) across standard DC system voltages:</p>
        <div className="scenario-table" role="region" aria-label="Battery capacity conversion reference table">
          <table>
            <caption>Energy equivalent (Wh &amp; kWh) for common Amp-Hour capacities across voltages</caption>
            <thead>
              <tr>
                <th scope="col">Charge Capacity (Ah)</th>
                <th scope="col">12V System (12.8V LiFePO4)</th>
                <th scope="col">24V System (25.6V LiFePO4)</th>
                <th scope="col">48V System (51.2V LiFePO4)</th>
                <th scope="col">Typical Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>20 Ah</strong></td>
                <td>240 Wh (0.24 kWh)</td>
                <td>480 Wh (0.48 kWh)</td>
                <td>960 Wh (0.96 kWh)</td>
                <td>Kayak fish finders, small UPS backup</td>
              </tr>
              <tr>
                <td><strong>50 Ah</strong></td>
                <td>600 Wh (0.60 kWh)</td>
                <td>1,200 Wh (1.20 kWh)</td>
                <td>2,400 Wh (2.40 kWh)</td>
                <td>Trolling motors, camping power stations</td>
              </tr>
              <tr>
                <td><strong>100 Ah</strong></td>
                <td>1,200 Wh (1.20 kWh)</td>
                <td>2,400 Wh (2.40 kWh)</td>
                <td>4,800 Wh (4.80 kWh)</td>
                <td>RV house batteries, solar vans, DIY solar</td>
              </tr>
              <tr>
                <td><strong>200 Ah</strong></td>
                <td>2,400 Wh (2.40 kWh)</td>
                <td>4,800 Wh (4.80 kWh)</td>
                <td>9,600 Wh (9.60 kWh)</td>
                <td>Off-grid cabins, marine vessels</td>
              </tr>
              <tr>
                <td><strong>300 Ah</strong></td>
                <td>3,600 Wh (3.60 kWh)</td>
                <td>7,200 Wh (7.20 kWh)</td>
                <td>14,400 Wh (14.4 kWh)</td>
                <td>Whole-home battery backup banks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Battery Capacity &amp; Energy Conversion Formulas"
          formula="Watt_Hours (Wh) = Amp_Hours (Ah) × Voltage (V)  |  Usable_Wh = Nominal_Wh × (Start_SOC - Reserve_SOC) × Health"
          formulaDescription="Converts between electrical charge (Ah) and stored energy (Wh/kWh) using nominal terminal voltage, then derives net usable stored energy."
          variables={[
            { symbol: "Amp_Hours (Ah)", label: "Battery Charge Capacity", description: "Rated charge capacity at standard C/20 discharge rate.", unit: "Ah" },
            { symbol: "Voltage (V)", label: "Nominal System Voltage", description: "Rated terminal voltage (12V, 24V, 48V, etc.).", unit: "V" },
            { symbol: "Nominal_Wh", label: "Gross Rated Energy", description: "Nominal energy = Ah × Volts (or kWh × 1,000).", unit: "Wh" },
            { symbol: "Usable_SOC", label: "Operating Window", description: "Starting state of charge minus minimum reserve cutoff.", unit: "fraction" },
            { symbol: "Health", label: "State of Health (SOH)", description: "Remaining capacity relative to factory original.", unit: "fraction" },
          ]}
          notes={[
            "1,000 milliamp-hours (mAh) = 1 Amp-Hour (Ah).",
            "1 Kilowatt-Hour (kWh) = 1,000 Watt-Hours (Wh).",
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
          Calculate appliance runtimes with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, calculate required capacity for outages with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, or check charging speeds with the <Link href="/battery/battery-charging-time-calculator">Battery Charging Time Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

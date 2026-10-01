import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { BatteryChargingTimeCalculator } from "@/components/calculator/battery-charging-time-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("battery-charging-time");

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Charging Time Calculator — Charge Hours",
  description: "Estimate battery charging time from capacity, state of charge and charger output, with optional battery limits, efficiency and planning assumptions.",
  canonicalPath: "/battery/battery-charging-time-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How long does it take to charge a 100Ah 12V battery?",
    answer: "Using the canonical model (20% to 100% replenishment, 95% charge efficiency, 1.05 taper allowance), a 100Ah LiFePO4 battery takes approximately 8.8 hours with a 10A charger, 4.4 hours with a 20A fast charger, and about 1.8 hours with a 50A charger.",
  },
  {
    question: "Why does charging take longer than battery capacity divided by charger amps?",
    answer: "Simple division (100Ah ÷ 10A = 10 hrs) ignores coulombic energy losses (charging efficiency) and the taper slowdown near full charge where current reduces as the battery approaches the target state of charge.",
  },
  {
    question: "What is the recommended charge rate (C-rate) for LiFePO4 batteries?",
    answer: "Maximum charge current is battery- and BMS-specific. Many LiFePO4 batteries are designed around moderate charge rates such as 0.2C–0.5C (e.g. 20A to 50A for a 100Ah pack), while some products permit higher rates. Always use the battery manufacturer's specified continuous and maximum charge-current limits.",
  },
  {
    question: "Why do Lead-Acid batteries take longer to charge than LiFePO4?",
    answer: "Lead-Acid batteries have a lower charge efficiency (~80%–85%) and can include substantial absorption time near full charge. This calculator uses a simplified taper allowance and does not model the manufacturer's actual absorption profile.",
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
      "Supports charger current (A) and power (W) inputs",
      "Supports battery charge-current acceptance limits",
      "Applies configurable charging efficiency and taper allowances",
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
          Estimate how long it takes to charge your battery in hours and minutes from initial to target state of charge, factoring in charger amperage, chemistry efficiency, and taper allowance.
        </p>
      </div>

      <div id="calculator-tool">
        <BatteryChargingTimeCalculator />
      </div>

      <DirectAnswerCard
        keyword="battery charging time calculation"
        answer="A 12V 100Ah LiFePO4 battery takes approximately 8.8 hours to recharge from 20% to 100% using a standard 10A charger, or about 4.4 hours with a 20A charger. Charging time equals the energy deficit (Ah needed) divided by effective charger current, adjusted for charging efficiency (95% for LiFePO4, 85% for Lead-Acid) and a simplified taper allowance: Time = [(Capacity_Ah × ΔSOC) ÷ (Effective_Amps × Charge_Efficiency)] × Taper_Allowance."
        formula="Time_h = [(Capacity_Ah × (Target_SOC − Start_SOC)) ÷ (Effective_Amps × Charge_Efficiency)] × Taper_Allowance"
        standardExample="100Ah LiFePO4 from 20% to 100% with 20A charger, 95% efficiency, 1.05 taper: [(100 × 0.80) ÷ (20 × 0.95)] × 1.05 = 4.42 hours (4h 25m)"
        sourceAuthority="Technical References & Model Basis: IEC 62619 & IEEE Std 485"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Battery Charging Duration</h2>
        <ol>
          <li><strong>Enter Battery Capacity:</strong> Enter capacity in Amp-hours (Ah) or Watt-hours (Wh).</li>
          <li><strong>Set Start and Target State of Charge (%):</strong> Choose initial charge level (e.g. 20%) and desired target (e.g. 100%).</li>
          <li><strong>Enter Charger Output Rating:</strong> Input charger output current in Amperes (A) or power in Watts (W).</li>
          <li><strong>Review Estimated Charge Time:</strong> View calculated charge hours with taper allowance buffer.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Battery Charging Time Reference Matrix</h2>
        <p>Estimated recharge time from 20% to 100% state of charge (80% capacity replenishment) across standard battery sizes and smart charger output amperages:</p>
        <div className="scenario-table" role="region" aria-label="Battery charging time comparison matrix">
          <table>
            <caption>Estimated charging hours (20% → 100% SOC, LiFePO4 95% efficiency + 1.05 taper allowance)</caption>
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
                <td>~8.8 hours</td>
                <td>~4.4 hours</td>
                <td>~2.2 hours</td>
                <td>~53 min (1.0C; only where manufacturer/BMS-rated)</td>
              </tr>
              <tr>
                <td><strong>100 Ah Pack</strong> (~1.28 kWh @ 12.8V)</td>
                <td>~17.7 hours</td>
                <td>~8.8 hours</td>
                <td>~4.4 hours</td>
                <td>~1.8 hours</td>
              </tr>
              <tr>
                <td><strong>200 Ah Pack</strong> (~2.56 kWh @ 12.8V)</td>
                <td>~35.4 hours</td>
                <td>~17.7 hours</td>
                <td>~8.8 hours</td>
                <td>~3.5 hours</td>
              </tr>
              <tr>
                <td><strong>300 Ah Pack</strong> (~3.84 kWh @ 12.8V)</td>
                <td>~53.1 hours</td>
                <td>~26.5 hours</td>
                <td>~13.3 hours</td>
                <td>~5.3 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas"
          formula="Time_h = [(Capacity_Ah × (Target_SOC − Start_SOC)) ÷ (Effective_Amps × Charge_Efficiency)] × Taper_Allowance"
          formulaDescription="Estimates total recharge time by dividing the required Ah or Wh deficit by the effective charging rate, factoring in charging efficiency and a simplified taper allowance."
          variables={[
            { symbol: "Capacity_Ah", label: "Rated Pack Capacity", description: "Total rated charge capacity in Amp-Hours.", unit: "Ah" },
            { symbol: "Start_SOC / Target_SOC", label: "Charge Delta Window", description: "Target state of charge minus initial state of charge.", unit: "fraction" },
            { symbol: "Effective_Amps", label: "Net Charge Current", description: "min(Charger Current, Battery Max BMS Charge Rate).", unit: "A" },
            { symbol: "Charge_Efficiency", label: "Charging Efficiency", description: "Fraction of charging energy stored without thermal dissipation (typically 95% LiFePO4, 85% Lead-Acid).", unit: "fraction" },
            { symbol: "Taper_Allowance", label: "Taper Allowance", description: "Simplified multiplier representing additional charging time near the upper SOC range (typically 1.05x LiFePO4, 1.15x Lead-Acid).", unit: "multiplier" },
          ]}
          notes={[
            "In Energy Mode (Wh/W): Time_h = [(Energy_Wh × ΔSOC) ÷ (Effective_Watts × Charge_Efficiency)] × Taper_Allowance.",
            "Taper allowance is a simplified planning estimate and does not model the manufacturer's actual CC/CV charging curve or absorption duration.",
            "Always verify charging current limits against the battery manufacturer's BMS specifications.",
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

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <ul>
          <li><strong>IEEE Std 485:</strong> IEEE Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications.</li>
          <li><strong>IEC 62619:</strong> Secondary cells and batteries containing alkaline or other non-acid electrolytes — Safety requirements for secondary lithium cells and batteries.</li>
          <li><strong>UL 1973:</strong> Standard for Batteries for Use in Stationary and Motive Auxiliary Power Applications.</li>
          <li><strong>NFPA 70 (NEC Article 706):</strong> National Electrical Code requirements for Energy Storage Systems.</li>
        </ul>
      </section>

      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>Related Battery Tools</h2>
        <p>
          Convert capacity with the <Link href="/battery/battery-capacity-calculator">Battery Capacity Calculator</Link>, estimate runtime under load with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or size solar charge controllers with the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

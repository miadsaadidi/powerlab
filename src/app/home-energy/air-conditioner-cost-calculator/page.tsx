import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { AcCostCalculator } from "@/components/calculator/ac-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ac-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "AC Electricity Cost Calculator: $/Hour & Month",
  description: "Calculate exact AC electricity costs per hour, day & month. Sizing formulas for Central AC, Mini-Splits & Window units with SEER2 efficiency & duty cycle.",
  canonicalPath: "/home-energy/air-conditioner-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How much does it cost to run an air conditioner for 1 hour?",
    answer: "At the US average electric rate of $0.18/kWh: a small 5,000 BTU window AC costs about $0.05 to $0.07/hr; a modern 12,000 BTU mini-split costs about $0.08 to $0.12/hr; and a standard 3-ton (36,000 BTU) central AC costs about $0.35 to $0.55/hr depending on its SEER2 rating and compressor cycling.",
  },
  {
    question: "What is SEER2 and how does it save money on cooling bills?",
    answer: "SEER2 (Seasonal Energy Efficiency Ratio 2) measures how many BTUs of heat an air conditioner removes per Watt-hour of electricity consumed over an entire cooling season under new DOE M1 test standards. Upgrading from an older 10 SEER AC to an 18 SEER2 unit reduces cooling electricity bills by approximately 44%.",
  },
  {
    question: "Why does compressor duty cycle affect my electric bill?",
    answer: "An air conditioner does not draw continuous peak wattage all day; the compressor cycles on and off once the room reaches the thermostat setpoint. On a typical 85°F day, a properly sized AC runs roughly 50% to 70% of each hour. On extremely hot 95°F+ days, it may run at 85% to 100% duty cycle.",
  },
  {
    question: "Is it cheaper to leave the AC running all day or turn it off when away?",
    answer: "It is cheaper to set the thermostat 7°F to 10°F higher when you are away (or use a programmable/smart thermostat). Homes lose and gain heat proportionally to the indoor-outdoor temperature difference; maintaining a cool home all day uses significantly more energy than cooling it down when you return.",
  },
];

export default function AcCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Air Conditioner Running Cost Calculator",
    description: "Estimate hourly, monthly, and full-season air conditioning electricity costs for window units, mini-splits, and central AC.",
    route: "/home-energy/air-conditioner-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "BTU cooling capacity and DOE SEER2 seasonal efficiency modeling",
      "Thermostat compressor duty cycle adjustments for mild vs extreme heat",
      "Calculations for window units, portable ACs, ductless mini-splits, and central air",
      "Annual upgrade savings comparison against older 10-SEER legacy equipment",
    ],
    standards: [
      "AHRI Standard 210/240 (Performance Rating of Unitary Air-Conditioning Equipment)",
      "DOE 10 CFR Part 430 Appendix M1 (SEER2 / EER2 Testing Procedures)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
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
        <span aria-current="page">Air Conditioner Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Cooling Bills &amp; HVAC Efficiency</p>
        <h1>Air Conditioner Electricity Cost Calculator</h1>
        <p className="intro">
          Estimate how much your air conditioner costs to run per hour, per day, and across the entire summer cooling season for window units, mini-splits, and central AC systems.
        </p>
      </div>

      <DirectAnswerCard
        keyword="air conditioner electricity cost calculation"
        answer="Running a standard 3-ton (36,000 BTU) 15-SEER2 central air conditioner costs approximately $0.40 to $0.55 per operating hour at $0.18/kWh (averaging ~$120 to $160/month with 8 hours of daily compressor run time). A 5,000 BTU window unit costs about $0.06/hr (~$15/mo), while an 18-SEER2 mini-split costs ~$0.09/hr (~$22/mo)."
        formula="Hourly Cost ($/hr) = (BTU Cooling Capacity ÷ SEER2 Rating ÷ 1,000) × Compressor Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="36,000 BTU unit @ 15 SEER2, 60% duty cycle, $0.18/kWh: (36,000 ÷ 15 ÷ 1000) × 0.60 × 0.18 = $0.26 per clock hour"
        sourceAuthority="US Department of Energy (DOE) SEER2 Test Procedures & AHRI"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <AcCostCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Air Conditioner Electricity Cost</h2>
        <ol>
          <li><strong>Select AC System Type &amp; BTU Size:</strong> Choose window AC, portable unit, mini-split, or central air (5,000 to 60,000 BTU/hr).</li>
          <li><strong>Check Seasonal Efficiency (SEER2 / EER):</strong> Higher SEER2 ratings (16 to 24+) use significantly less electricity for the same cooling output.</li>
          <li><strong>Set Daily Usage &amp; Thermostat Duty Cycle:</strong> Adjust daily operating hours and compressor cycling percentage (typically 50% to 70% during peak heat).</li>
          <li><strong>Input Utility Electricity Rate ($/kWh):</strong> Review the hourly, daily, monthly, and full summer cooling season electric bill impact.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Typical AC Power Consumption &amp; Running Costs</h2>
        <p>Representative running costs across common cooling systems at $0.18/kWh utility rate:</p>
        <div className="scenario-table" role="region" aria-label="Typical AC power consumption and operating costs">
          <table>
            <caption>Residential air conditioning energy consumption and operating cost benchmarks</caption>
            <thead>
              <tr>
                <th scope="col">AC System Type</th>
                <th scope="col">Cooling Capacity</th>
                <th scope="col">Avg. Power (Watts)</th>
                <th scope="col">Cost / Hour (@ $0.18)</th>
                <th scope="col">Monthly (8h/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Small Window Unit (100–150 sq ft)</strong></td>
                <td>5,000 BTU</td>
                <td>450 W</td>
                <td>$0.05 / hr</td>
                <td>$12.96 / mo</td>
              </tr>
              <tr>
                <td><strong>Large Window / Wall Unit (350–550 sq ft)</strong></td>
                <td>12,000 BTU</td>
                <td>1,100 W</td>
                <td>$0.12 / hr</td>
                <td>$28.50 / mo</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Inverter Mini-Split</strong></td>
                <td>12,000 BTU (22 SEER2)</td>
                <td>650 W</td>
                <td>$0.07 / hr</td>
                <td>$16.80 / mo</td>
              </tr>
              <tr>
                <td><strong>Central AC (2.5 Ton / 1,500 sq ft)</strong></td>
                <td>30,000 BTU (15 SEER2)</td>
                <td>2,000 W</td>
                <td>$0.22 / hr</td>
                <td>$52.80 / mo</td>
              </tr>
              <tr>
                <td><strong>Central AC (3.0 Ton / 1,800–2,200 sq ft)</strong></td>
                <td>36,000 BTU</td>
                <td>2,500 W</td>
                <td>$0.27 / hr</td>
                <td>$65.70 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Air Conditioner Power &amp; Cost Formulas"
          formula="Hourly_Cost = (BTU_hr / SEER2 / 1000) × Duty_Cycle × Electricity_Rate"
          formulaDescription="Standard HVAC thermodynamic conversion using AHRI SEER2 seasonal cooling efficiency and realistic thermostat duty cycles."
          variables={[
            { symbol: "BTU_hr", label: "Cooling Capacity", description: "Nominal cooling rating in British Thermal Units per hour (1 ton = 12,000 BTU)", unit: "BTU/hr" },
            { symbol: "SEER2", label: "Seasonal Cooling Efficiency", description: "DOE SEER2 rating (BTU of heat removed per Watt-hour of electricity consumed)", unit: "BTU/Wh" },
            { symbol: "Duty_Cycle", label: "Compressor Active Run Time", description: "Fraction of time compressor actively chills air (typically 50%–70% on warm days)", unit: "%" },
            { symbol: "Electricity_Rate", label: "Utility Electricity Tariff", description: "Marginal cost per kilowatt-hour of electric grid power", unit: "$/kWh" },
          ]}
          notes={[
            "SEER2 test standards incorporate 0.50 in. WG duct pressure for realistic real-world airflow modeling.",
            "Inverter-driven variable-speed mini-splits ramp power smoothly, achieving effective seasonal efficiencies over 20+ SEER2.",
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
        <h2>Related Cooling &amp; Home Energy Planning</h2>
        <p>
          Need a complete engineering breakdown of SEER2 formulas, tonnage sizing, and compressor inrush? Read our in-depth <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Central AC &amp; Heat Pump Electricity Cost Guide</Link> or examine total household power in our <Link href="/guides/how-many-kwh-does-a-house-use-per-day">Household Daily kWh Usage Guide</Link>. You can also size emergency generator backup for your AC with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>, compare winter heating with the <Link href="/home-energy/heat-pump-cost-calculator">Heat Pump Cost Calculator</Link>, or model whole-home consumption with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Cooling calculations follow AHRI / DOE SEER2 test procedures and typical residential compressor duty cycles. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

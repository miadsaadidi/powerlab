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
  title: "AC Cost Calculator — Electricity Cost & SEER2",
  description: "Calculate air conditioner electricity costs per hour, day & month. Sizing formulas for Central AC, Mini-Splits & Window units with SEER2 efficiency.",
  canonicalPath: "/home-energy/air-conditioner-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How much does it cost to run central air conditioning per month?",
    answer: "Running a standard 3-ton (36,000 BTU, 14 SEER2) central air conditioner for 8 hours per day at a typical 65% compressor duty cycle consumes approximately 450 to 600 kWh per month. At the U.S. national average electric rate of $0.16/kWh, this costs between $72 and $96 per month. In hot southern climates with 12 to 14 hours of daily operation, monthly cooling costs typically range from $130 to $200 per month.",
  },
  {
    question: "How much does it cost to run an air conditioner for 1 hour?",
    answer: "At the US average electric rate of $0.16/kWh: a small 5,000 BTU window AC costs about $0.05 to $0.07/hr; a modern 12,000 BTU mini-split costs about $0.08 to $0.12/hr; and a standard 3-ton (36,000 BTU) central AC costs about $0.35 to $0.55/hr depending on its SEER2 rating and compressor cycling.",
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
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821931",
    companionPaperUrl: "https://www.powelab.org/research/central-ac-heat-pump-seasonal-efficiency-degradation",
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

      <div id="calculator-tool">
        <AcCostCalculator />
      </div>

      <DirectAnswerCard
        keyword="air conditioner electricity cost calculation"
        answer="Running a standard 3-ton (36,000 BTU) 15-SEER2 central air conditioner costs approximately $0.40 to $0.55 per operating hour at $0.18/kWh (averaging ~$120 to $160/month with 8 hours of daily compressor run time). A 5,000 BTU window unit costs about $0.06/hr (~$15/mo), while an 18-SEER2 mini-split costs ~$0.09/hr (~$22/mo)."
        formula="Hourly Cost ($/hr) = (BTU Cooling Capacity ÷ SEER2 Rating ÷ 1,000) × Compressor Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="36,000 BTU unit @ 15 SEER2, 60% duty cycle, $0.18/kWh: (36,000 ÷ 15 ÷ 1000) × 0.60 × 0.18 = $0.26 per clock hour"
        sourceAuthority="US Department of Energy (DOE) SEER2 Test Procedures & AHRI"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Air Conditioner Electricity Cost</h2>
        <p>
          Calculating air conditioner operating cost requires four variables: cooling capacity (BTUs or tons), seasonal efficiency rating (SEER2), compressor duty cycle, and your local electricity rate ($/kWh).
        </p>
        <ol>
          <li><strong>Select AC System Type &amp; BTU Size:</strong> Choose window AC, portable unit, mini-split, or central air (5,000 to 60,000 BTU/hr). Note that 1 ton of cooling equals 12,000 BTU/hr.</li>
          <li><strong>Check Seasonal Efficiency (SEER2 / EER):</strong> Higher SEER2 ratings (14.3 to 22+) consume fewer electrical watts for the same heat removal capacity.</li>
          <li><strong>Set Daily Usage &amp; Thermostat Duty Cycle:</strong> Adjust daily operating hours and compressor cycling percentage (typically 50% to 70% during standard summer weather).</li>
          <li><strong>Input Utility Electricity Rate ($/kWh):</strong> Calculate the exact hourly, daily, monthly, and full summer cooling season electric bill impact.</li>
        </ol>
      </section>

      {/* Central AC Sizing Matrix by Tonnage */}
      <section id="central-ac-tonnage-matrix">
        <h2>Cost to Run Central Air Conditioning per Hour by Tonnage</h2>
        <p>
          Central air conditioning operating costs scale directly with tonnage (BTU capacity) and compressor cycling. Below is a reference benchmark for standard residential central air systems (15.0 SEER2 baseline under DOE Appendix M1 test standards) at the U.S. average electricity rate of $0.18/kWh:
        </p>
        <div className="scenario-table" role="region" aria-label="Central AC running cost per hour by tonnage">
          <table>
            <caption>Central air conditioner electricity consumption and operating cost by tonnage (15.0 SEER2 @ $0.18/kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Capacity (Tons / BTU)</th>
                <th scope="col">Typical Home Size</th>
                <th scope="col">Electric Power Draw</th>
                <th scope="col">Cost / Clock Hour (60% Duty)</th>
                <th scope="col">Cost / Active Hour (100% Run)</th>
                <th scope="col">Monthly Cost (8 hrs/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Ton (18,000 BTU)</strong></td>
                <td>800–1,100 sq ft</td>
                <td>1,200 W (1.20 kW)</td>
                <td>$0.13 / hr</td>
                <td>$0.22 / hr</td>
                <td>$31.10 / mo</td>
              </tr>
              <tr>
                <td><strong>2.0 Ton (24,000 BTU)</strong></td>
                <td>1,100–1,400 sq ft</td>
                <td>1,600 W (1.60 kW)</td>
                <td>$0.17 / hr</td>
                <td>$0.29 / hr</td>
                <td>$41.47 / mo</td>
              </tr>
              <tr>
                <td><strong>2.5 Ton (30,000 BTU)</strong></td>
                <td>1,400–1,700 sq ft</td>
                <td>2,000 W (2.00 kW)</td>
                <td>$0.22 / hr</td>
                <td>$0.36 / hr</td>
                <td>$51.84 / mo</td>
              </tr>
              <tr>
                <td><strong>3.0 Ton (36,000 BTU)</strong></td>
                <td>1,700–2,100 sq ft</td>
                <td>2,400 W (2.40 kW)</td>
                <td>$0.26 / hr</td>
                <td>$0.43 / hr</td>
                <td>$62.21 / mo</td>
              </tr>
              <tr>
                <td><strong>3.5 Ton (42,000 BTU)</strong></td>
                <td>2,100–2,500 sq ft</td>
                <td>2,800 W (2.80 kW)</td>
                <td>$0.30 / hr</td>
                <td>$0.50 / hr</td>
                <td>$72.58 / mo</td>
              </tr>
              <tr>
                <td><strong>4.0 Ton (48,000 BTU)</strong></td>
                <td>2,500–3,000 sq ft</td>
                <td>3,200 W (3.20 kW)</td>
                <td>$0.35 / hr</td>
                <td>$0.58 / hr</td>
                <td>$82.94 / mo</td>
              </tr>
              <tr>
                <td><strong>5.0 Ton (60,000 BTU)</strong></td>
                <td>3,000–3,800 sq ft</td>
                <td>4,000 W (4.00 kW)</td>
                <td>$0.43 / hr</td>
                <td>$0.72 / hr</td>
                <td>$103.68 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Window AC vs Mini-Split Sizing Matrix */}
      <section id="sizing-matrix">
        <h2>Window AC vs. Ductless Mini-Split Running Costs</h2>
        <p>
          Small room air conditioners and high-efficiency inverter mini-splits operate at distinct wattage profiles compared to whole-home ducted systems:
        </p>
        <div className="scenario-table" role="region" aria-label="Window AC and mini-split running cost reference">
          <table>
            <caption>Room air conditioner energy consumption benchmarks (@ $0.18/kWh utility rate)</caption>
            <thead>
              <tr>
                <th scope="col">Unit Type</th>
                <th scope="col">Cooling Capacity</th>
                <th scope="col">Efficiency Rating</th>
                <th scope="col">Avg. Power (Watts)</th>
                <th scope="col">Cost / Hour (60% Duty)</th>
                <th scope="col">Monthly (8h/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Small Window Unit (Bedrooms)</strong></td>
                <td>5,000 BTU</td>
                <td>11.0 CEER</td>
                <td>450 W</td>
                <td>$0.05 / hr</td>
                <td>$11.66 / mo</td>
              </tr>
              <tr>
                <td><strong>Medium Window Unit (Living Rooms)</strong></td>
                <td>8,000 BTU</td>
                <td>11.4 CEER</td>
                <td>700 W</td>
                <td>$0.08 / hr</td>
                <td>$18.14 / mo</td>
              </tr>
              <tr>
                <td><strong>Large Window / Wall Unit</strong></td>
                <td>12,000 BTU</td>
                <td>11.0 CEER</td>
                <td>1,090 W</td>
                <td>$0.12 / hr</td>
                <td>$28.25 / mo</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Inverter Mini-Split</strong></td>
                <td>12,000 BTU (1 Ton)</td>
                <td>22.0 SEER2</td>
                <td>545 W</td>
                <td>$0.06 / hr</td>
                <td>$14.13 / mo</td>
              </tr>
              <tr>
                <td><strong>Multi-Zone Mini-Split (2-3 Rooms)</strong></td>
                <td>24,000 BTU (2 Ton)</td>
                <td>20.0 SEER2</td>
                <td>1,200 W</td>
                <td>$0.13 / hr</td>
                <td>$31.10 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Worked Step-by-Step Calculation Example */}
      <section id="worked-example" style={{ margin: "2rem 0", padding: "1.5rem", borderRadius: "0.75rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
        <h2 style={{ marginTop: 0 }}>Step-by-Step Worked Calculation Example</h2>
        <p>
          Here is how to manually calculate the hourly and monthly electricity cost for a typical residential central air conditioner:
        </p>
        <div style={{ background: "rgba(0, 0, 0, 0.03)", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>Example Parameters:</p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.95rem" }}>
            <li><strong>Unit Size:</strong> 3-Ton Central AC = 36,000 BTU/hr</li>
            <li><strong>Seasonal Efficiency:</strong> 15.0 SEER2</li>
            <li><strong>Thermostat Duty Cycle:</strong> 60% active compressor run time (0.60)</li>
            <li><strong>Daily Usage:</strong> 8 clock hours per day</li>
            <li><strong>Electricity Rate:</strong> $0.18 per kWh</li>
          </ul>
        </div>
        <ol style={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
          <li>
            <strong>Step 1: Calculate Effective Electrical Power Draw:</strong><br />
            <code>Electrical Watts = Cooling Capacity (BTU/hr) ÷ SEER2 Rating = 36,000 ÷ 15.0 = 2,400 Watts (2.40 kW)</code>
          </li>
          <li>
            <strong>Step 2: Calculate Hourly Energy Consumption with Compressor Cycling:</strong><br />
            <code>Hourly Energy = (2.40 kW × 0.60 duty cycle) = 1.44 kWh per clock hour</code>
          </li>
          <li>
            <strong>Step 3: Calculate Operating Cost per Clock Hour:</strong><br />
            <code>Cost per Hour = 1.44 kWh × $0.18/kWh = $0.2592 ≈ $0.26 / hr</code>
          </li>
          <li>
            <strong>Step 4: Calculate Monthly Electric Bill Contribution:</strong><br />
            <code>Monthly Cost = 1.44 kWh/hr × 8 hrs/day × 30.4 days × $0.18/kWh = $63.04 / month</code>
          </li>
        </ol>
      </section>

      {/* Dataset & Research Cross-Link Callout */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#065f46" }}>
          📊 Open Empirical Benchmark Data
        </h3>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.6 }}>
          Need empirical laboratory data on cooling degree days and seasonal efficiency transitions under DOE Appendix M1? Explore our open <Link href="/datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>Central AC &amp; Heat Pump SEER2 Benchmark Dataset (PL-DS-AC-04)</Link> and thermodynamic study on <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>HVAC COP Degradation &amp; Auxiliary Staging (PL-TR-2026-HVAC01)</Link>.
        </p>
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
          Need a complete engineering breakdown of SEER2 formulas, tonnage sizing, and compressor inrush? Read our in-depth <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Central AC &amp; Heat Pump Electricity Cost Guide</Link> or examine total household power in our <Link href="/guides/how-many-kwh-does-a-house-use-per-day">Household Daily kWh Usage Guide</Link>.
        </p>
        <p>
          When planning emergency backup power during summer grid outages, central AC compressors draw 5x to 7x their running power in instantaneous inductive inrush current (Locked Rotor Amperes). Size an emergency generator or soft-starter using our <Link href="/home-energy/generator-size-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>Emergency Generator Sizing Calculator</Link>. You can also compare winter heating economics in the <Link href="/home-energy/heat-pump-cost-calculator">Heat Pump Cost Calculator</Link> or model whole-home baseline appliances with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
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

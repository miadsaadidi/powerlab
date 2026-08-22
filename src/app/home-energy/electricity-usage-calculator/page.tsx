import type { Metadata } from "next";
import Link from "next/link";
import { ElectricityUsageCalculator } from "@/components/calculator/electricity-usage-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("electricity-usage");

export const metadata: Metadata = {
  title: "Electricity Usage Calculator — Calculate kWh & Power Costs",
  description: "Calculate how much electricity (kWh) your appliances consume per day, month, and year. Built-in appliance wattage catalog and electricity bill cost modeling.",
  alternates: { canonical: "/home-energy/electricity-usage-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Electricity Usage Calculator — PowerLab",
    description: "Calculate daily, monthly, and annual electricity usage (kWh) and power costs across household appliances.",
    url: `${siteConfig.url}/home-energy/electricity-usage-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you calculate appliance electricity usage in kWh?",
    answer: "Multiply the appliance wattage (W) by the hours used per day, then divide by 1,000 to convert to kilowatt-hours: kWh = (Watts × Hours) ÷ 1,000. To find operating cost, multiply the result by your local electricity rate ($/kWh).",
  },
  {
    question: "Which household appliances use the most electricity?",
    answer: "Central air conditioning (3,000W–5,000W), electric water heaters (4,500W), electric space heaters (1,500W), electric clothes dryers (3,000W), and Level 2 EV home chargers (7,200W–11,500W) account for over 65% of the average home electricity bill.",
  },
  {
    question: "What is an appliance duty cycle in energy calculations?",
    answer: "A duty cycle represents the percentage of time a cycling compressor or thermostat heating element actively draws electricity while powered on. Refrigerators typically operate at a 30% to 40% duty cycle (~8 to 10 hours of active compressor runtime per 24-hour day).",
  },
  {
    question: "How many kWh does an average home use per month?",
    answer: "According to the US Energy Information Administration (EIA), the average residential utility customer consumes approximately 880 to 900 kWh per month (around 10,500 kWh per year).",
  },
];

export default function ElectricityUsagePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Electricity Usage Calculator",
    description: "Calculate daily, monthly and annual electricity consumption in kWh for home appliances and audit power bill costs.",
    route: "/home-energy/electricity-usage-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Calculates appliance energy consumption in daily, monthly, and annual kWh",
      "Calculates operating cost using customizable electricity utility rates",
      "Comprehensive appliance library with realistic duty cycles",
      "Supports direct energy label and cycle-based input modes",
    ],
    standards: [
      "U.S. Energy Information Administration (EIA) Residential Energy Consumption Survey (RECS)",
      "DOE 10 CFR Part 430 Energy Conservation Standards for Consumer Products",
      "NFPA 70 / NEC Article 220 (Branch-Circuit, Feeder, and Service Load Calculations)",
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
        <span aria-current="page">Electricity Usage Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home energy planning</p>
        <h1>Electricity Usage Calculator</h1>
        <p className="intro">
          Estimate how much electricity (kWh) your appliances use each day, month, and year, and calculate exactly how much they add to your electric utility bill.
        </p>
      </div>

      <DirectAnswerCard
        keyword="electricity usage calculator"
        answer="To calculate an appliance's electricity consumption in kilowatt-hours (kWh), multiply its operating wattage by the hours used per day, then divide by 1,000. Multiply by your utility electricity rate ($/kWh) to find total operating cost."
        formula="Electricity Use (kWh) = (Appliance Watts × Daily Hours) ÷ 1,000"
        standardExample="A 1,500W space heater run for 8 hours consumes 12 kWh/day (approx. $1.92/day at the national average rate of $0.16/kWh)."
        sourceAuthority="U.S. Department of Energy (DOE) & EIA Benchmarks"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <ElectricityUsageCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Appliance Electricity Usage &amp; Costs</h2>
        <ol>
          <li><strong>Select or Add Appliances:</strong> Choose devices from the built-in library (AC, heater, fridge, TV) or enter custom wattage.</li>
          <li><strong>Enter Operating Schedule:</strong> Input active hours per day and days used per week.</li>
          <li><strong>Enter Utility Electricity Rate ($/kWh):</strong> Input your local power tariff (US national average is ~$0.16/kWh).</li>
          <li><strong>Review Breakdown:</strong> Compare monthly and annual kilowatt-hours across all household devices.</li>
        </ol>

        <SystemFlowDiagram category="home-energy" title="Residential Electricity Consumption & Load Hierarchy" />
      </section>

      <section id="sizing-matrix">
        <h2>Top Household Appliances Electricity Usage Breakdown</h2>
        <p>Typical continuous watts, operating schedules, and monthly electricity consumption for common residential appliances:</p>
        <div className="scenario-table" role="region" aria-label="Typical appliance electricity usage">
          <table>
            <caption>Typical household appliance electricity consumption &amp; running cost</caption>
            <thead>
              <tr>
                <th scope="col">Appliance</th>
                <th scope="col">Running Watts</th>
                <th scope="col">Typical Daily Use</th>
                <th scope="col">Est. Monthly kWh</th>
                <th scope="col">Est. Monthly Cost (@ $0.16/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Central Air Conditioning (3-ton, 14 SEER)</strong></td>
                <td>3,500 W</td>
                <td>6 hours/day (cycling)</td>
                <td>~630 kWh</td>
                <td>~$100.80</td>
              </tr>
              <tr>
                <td><strong>Water Heater (50-gallon electric tank)</strong></td>
                <td>4,500 W</td>
                <td>3 hours/day (cycling)</td>
                <td>~405 kWh</td>
                <td>~$64.80</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater</strong></td>
                <td>1,500 W</td>
                <td>8 hours/day</td>
                <td>~360 kWh</td>
                <td>~$57.60</td>
              </tr>
              <tr>
                <td><strong>Standard Kitchen Refrigerator (22 cu. ft.)</strong></td>
                <td>150 W (running)</td>
                <td>24 hrs (33% duty cycle)</td>
                <td>~36 kWh</td>
                <td>~$5.76</td>
              </tr>
              <tr>
                <td><strong>Level 2 EV Home Charger</strong></td>
                <td>7,200 W (30A @ 240V)</td>
                <td>2.5 hours/day (30 mi/day)</td>
                <td>~540 kWh</td>
                <td>~$86.40</td>
              </tr>
              <tr>
                <td><strong>Electric Clothes Dryer</strong></td>
                <td>3,000 W</td>
                <td>1 cycle/day (45 min)</td>
                <td>~68 kWh</td>
                <td>~$10.88</td>
              </tr>
              <tr>
                <td><strong>Home Desktop Computer / Gaming PC</strong></td>
                <td>300 W</td>
                <td>6 hours/day</td>
                <td>~54 kWh</td>
                <td>~$8.64</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Electricity Usage &amp; Appliance Energy Formulas"
          formula="Daily_kWh = (Watts × Hours_Per_Day × (Days_Per_Week / 7) × Duty_Cycle) / 1,000"
          formulaDescription="Converts instantaneous appliance power demand into normalized daily, monthly, and annual kilowatt-hour energy consumption, accounting for weekly schedules and cycling compressor behavior."
          variables={[
            { symbol: "Watts", label: "Appliance Running Wattage", description: "Nominal power draw under active operation (Volts × Amps × Power Factor).", unit: "W" },
            { symbol: "Hours_Per_Day", label: "Daily Operating Time", description: "Active hours of use per operating day.", unit: "hours" },
            { symbol: "Days_Per_Week", label: "Weekly Schedule", description: "Number of operating days per 7-day calendar week.", unit: "days/week" },
            { symbol: "Duty_Cycle", label: "Compressor / Heating Duty Cycle", description: "Fraction of time the appliance draws active power while turned on (e.g. 33% for refrigerators).", unit: "fraction" },
          ]}
          notes={[
            "Monthly kWh is derived using exact Gregorian calendar normalization: Daily_kWh × 30.4375 (365.25 ÷ 12).",
            "Annual kWh = Daily_kWh × 365.25.",
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
        <h2>Related Home Energy Tools</h2>
        <p>
          Calculate total monthly bills with the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link>, check specific AC costs with the <Link href="/home-energy/air-conditioner-cost-calculator">Air Conditioner Cost Calculator</Link>, or size solar panels with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

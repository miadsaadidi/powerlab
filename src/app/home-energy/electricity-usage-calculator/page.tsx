import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
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

export const metadata: Metadata = buildPageMetadata({
  title: "Electricity Usage Calculator — Daily kWh & Cost",
  description: "Calculate daily, monthly, and annual electricity usage (kWh) and operating cost ($) for any appliance with EIA wattage presets and NEC load math.",
  canonicalPath: "/home-energy/electricity-usage-calculator",
  category: "home-energy",
});

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

      <div id="calculator-tool">
        <ElectricityUsageCalculator />
      </div>

      <DirectAnswerCard
        keyword="electricity usage calculator"
        answer="To calculate an appliance's electricity consumption in kilowatt-hours (kWh), multiply its operating wattage by the hours used per day, then divide by 1,000. Multiply by your utility electricity rate ($/kWh) to find total operating cost."
        formula="Electricity Use (kWh) = (Appliance Watts × Daily Hours) ÷ 1,000"
        standardExample="A 1,500W space heater run for 8 hours consumes 12 kWh/day (approx. $1.92/day at the national average rate of $0.16/kWh)."
        sourceAuthority="U.S. Department of Energy (DOE) & EIA Benchmarks"
      />

      {/* Next-Step Planning Pathways */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.15rem", margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>
          🧭 Next Steps in Your Home Energy Planning
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.5 }}>
          Once you have audited your appliance kilowatt-hours, continue your energy optimization workflow across these related tools:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>📊 Compare to Household Benchmarks</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Benchmark your daily total against the official EIA US national average of 29–30 kWh/day (~900 kWh/mo).
            </p>
            <Link href="/guides/how-many-kwh-does-a-house-use-per-day" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Daily kWh Usage Guide →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>💡 Model Total Utility Power Bills</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Incorporate monthly fixed customer fees, daily standing grid charges, and local sales tax into your cost forecast.
            </p>
            <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Energy Bill Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>🔋 Size Home Battery Backup</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate battery capacity in kWh needed to sustain these critical loads during power grid outages.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Home Battery Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      <PageJumpNav />

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

      <section id="battery-sizing-handoff" style={{ marginTop: "2.5rem" }}>
        <h2>Translating Appliance Audits to Battery Storage &amp; Backup Inverter Sizing</h2>
        <p>
          A common objective when calculating appliance electricity usage is sizing backup battery storage for emergency power outages. Sizing requires two distinct electrical metrics: <strong>continuous/surge power (Watts)</strong> to size the inverter, and <strong>24-hour energy consumption (Watt-hours)</strong> to size battery capacity.
        </p>
        <p>
          Under National Electrical Code (NEC) Article 702 and IEEE 485 sizing principles, battery storage calculations must account for inverter conversion efficiency (~90%) and usable Depth of Discharge (typically 80% to 90% for Lithium Iron Phosphate / LiFePO4 cells to preserve 6,000+ cycle life):
        </p>

        <div className="scenario-table" role="region" aria-label="Appliance to Battery Sizing Reference Table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Critical Home Appliance Audit to Battery Storage &amp; Inverter Sizing Benchmarks</caption>
            <thead>
              <tr>
                <th scope="col">Critical Appliance</th>
                <th scope="col">Running Power &amp; Duty Cycle</th>
                <th scope="col">Daily Energy (Wh/day)</th>
                <th scope="col">24-Hr Battery Needed (LiFePO4 @ 85% DoD)</th>
                <th scope="col">Inverter Sizing (Continuous / Peak LRA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Full-Size Refrigerator / Freezer</strong></td>
                <td>150W running (35% duty cycle)</td>
                <td>~1,260 Wh/day</td>
                <td>~1.65 kWh nominal (137 Ah @ 12V / 34 Ah @ 48V)</td>
                <td>600W cont. / 1,500W surge (motor startup LRA)</td>
              </tr>
              <tr>
                <td><strong>Home Internet (Fiber ONT + Wi-Fi 6 Router)</strong></td>
                <td>30W continuous (100% duty cycle)</td>
                <td>~720 Wh/day</td>
                <td>~0.94 kWh nominal (78 Ah @ 12V / 20 Ah @ 48V)</td>
                <td>100W cont. (pure sine wave recommended)</td>
              </tr>
              <tr>
                <td><strong>Gas Furnace Heating (Blower Motor + Control Board)</strong></td>
                <td>400W running (50% winter duty cycle)</td>
                <td>~4,800 Wh/day</td>
                <td>~6.27 kWh nominal (523 Ah @ 12V / 131 Ah @ 48V)</td>
                <td>1,000W cont. / 2,200W surge (inductive blower motor)</td>
              </tr>
              <tr>
                <td><strong>Medical CPAP Machine (with Heated Humidifier)</strong></td>
                <td>60W average (8 hours/night)</td>
                <td>~480 Wh/night</td>
                <td>~0.63 kWh nominal (52 Ah @ 12V / 13 Ah @ 48V)</td>
                <td>200W cont. (or 12V/24V native DC cable)</td>
              </tr>
              <tr>
                <td><strong>Sump Pump (1/2 HP Submersible)</strong></td>
                <td>1,050W running (10 min/hr during rain storm)</td>
                <td>~4,200 Wh/day</td>
                <td>~5.49 kWh nominal (458 Ah @ 12V / 114 Ah @ 48V)</td>
                <td>1,500W cont. / 3,500W surge (high inductive LRA)</td>
              </tr>
              <tr>
                <td><strong>Essentials Circuit Hub (Fridge + Wi-Fi + LED Lights + CPAP)</strong></td>
                <td>Combined ~320W average continuous</td>
                <td>~7,680 Wh/day</td>
                <td>~10.04 kWh nominal (1× 10 kWh residential battery unit)</td>
                <td>3,000W cont. / 6,000W peak hybrid inverter</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          *Note: Battery sizing incorporates a 90% hybrid inverter DC-to-AC conversion efficiency and an 85% maximum Depth of Discharge (DoD) cutoff. Inductive loads (compressors and motors) require peak surge allowance to prevent inverter overload trips.*
        </p>
      </section>

      {/* 4-Way Planning Mesh Cards */}
      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>Related Home Energy, Storage &amp; Electrical Planning</h2>
        <p>
          Translating appliance wattage audits into whole-home resilience requires coordinating continuous power, battery bank autonomy, and utility billing:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🔋 Size Whole-Home Battery Storage</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Scale nominal battery capacity (kWh) for 1 to 3 days of outage backup across critical circuits or whole-home load profiles.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Home Battery Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ Convert kWh to Amp-Hours (Ah)</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Translate appliance daily Watt-hours into Amp-Hours (Ah) across 12V, 24V, and 48V battery bank chemistries.
            </p>
            <Link href="/battery/battery-capacity-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Battery Capacity Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⏱️ Model Battery Outage Runtime</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Simulate how long an existing battery bank will last under real appliance load curves with Peukert and inverter tare losses.
            </p>
            <Link href="/battery/battery-runtime-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Battery Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ Size Standby Generator &amp; Inrush</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Calculate starting generator wattage and motor surge capacity (LRA) to keep large heating and refrigeration equipment running.
            </p>
            <Link href="/home-energy/generator-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Generator Size Calculator →
            </Link>
          </div>
        </div>

        <p style={{ marginTop: "1rem" }}>
          📖 <strong>In-Depth Technical Guides &amp; Research:</strong> Benchmark baseline consumption with our <Link href="/guides/how-many-kwh-does-a-house-use-per-day" style={{ fontWeight: 600, color: "var(--accent)" }}>Daily Household kWh Usage Guide</Link>, learn battery autonomy math in the <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Battery Runtime Guide</Link>, or inspect empirical Peukert derating in our open <Link href="/datasets/bess-peukert-capacity-derating-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>Residential BESS Peukert Benchmark (PL-DS-BESS-05)</Link>.
        </p>
      </section>
    </article>
  );
}

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
  description: "Calculate daily, monthly, and annual electricity usage (kWh) and operating cost ($) for any appliance with EIA wattage presets and deterministic energy formulas.",
  canonicalPath: "/home-energy/electricity-usage-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How do you calculate appliance electricity usage in kWh?",
    answer: "To calculate daily kilowatt-hours, multiply running wattage by daily hours of operation, weekly schedule fraction, and duty cycle, then divide by 1,000: Daily kWh = Watts × (Hours/day) × (Days/week ÷ 7) × Duty cycle ÷ 1,000. Monthly kWh is Daily kWh × 30.4375, and annual kWh is Daily kWh × 365.25. Multiply by your electricity tariff ($/kWh) to estimate operating cost.",
  },
  {
    question: "Which household appliances use the most electricity?",
    answer: "High-power heating, cooling, water-heating, and vehicle charging equipment (such as central AC, heat pumps, electric water heaters, space heaters, clothes dryers, and EV chargers) typically have the highest individual power draws and contribute substantially to household electricity consumption, depending on climate, equipment efficiency, and operating schedules.",
  },
  {
    question: "What is an appliance duty cycle in energy calculations?",
    answer: "A duty cycle represents the fraction of scheduled powered-on time during which an appliance actively draws its rated running wattage. For example, a refrigerator compressor might only run actively for 33% of the day (about 8 hours across a 24-hour period). Continuous loads (such as LED lighting or Wi-Fi routers) operate at a 100% duty cycle.",
  },
  {
    question: "How many kWh does an average home use per month?",
    answer: "According to U.S. Energy Information Administration (EIA) benchmarks (2022/2023 Form EIA-861/RECS data), the average U.S. residential customer consumes approximately 880 to 900 kWh per month (around 29 to 30 kWh per day, or ~10,500 kWh per year). Actual usage varies widely by home size, climate zone, heating fuel type, and appliance efficiency.",
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
      "Technical references: U.S. Energy Information Administration (EIA) RECS and DOE 10 CFR Part 430 benchmarks",
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
          Estimate how much electricity your appliances use each day, month, and year, and optionally estimate their operating cost using your electricity rate.
        </p>
      </div>

      <div id="calculator-tool">
        <ElectricityUsageCalculator />
      </div>

      <DirectAnswerCard
        keyword="electricity usage calculator"
        answer="To calculate an appliance's electricity consumption in kilowatt-hours (kWh), multiply its running wattage by daily operating hours, weekly schedule fraction, and duty cycle, then divide by 1,000: Daily kWh = Watts × (Hours/day) × (Days/week ÷ 7) × Duty cycle ÷ 1,000. Multiply by your electricity rate ($/kWh) to find operating cost."
        formula="Daily kWh = Watts × Hours/day × (Days/week ÷ 7) × Duty cycle ÷ 1,000  |  Monthly kWh = Daily kWh × 30.4375  |  Annual kWh = Daily kWh × 365.25"
        standardExample="1,500W space heater run for 8 hours/day (7 days/wk, 100% duty cycle) consumes 12.0 kWh/day (~365.25 kWh/month or 4,383 kWh/year), costing approx. $1.92/day at $0.16/kWh."
        sourceAuthority="Technical references: DOE 10 CFR Part 430 & EIA RECS Benchmarks"
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
              Benchmark your daily total against the official EIA U.S. residential benchmark (2022/2023 Form EIA-861/RECS data of 29–30 kWh/day or ~880–900 kWh/mo).
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
          <li><strong>Select or Add Appliances:</strong> Choose devices from the built-in library (AC, heater, fridge, TV) or enter custom running wattage.</li>
          <li><strong>Enter Operating Schedule:</strong> Input scheduled hours per day, days per week, and duty cycle for cycling equipment.</li>
          <li><strong>Enter Utility Electricity Rate ($/kWh):</strong> Input your local power tariff (US national average is ~$0.16/kWh).</li>
          <li><strong>Review Breakdown:</strong> Compare daily, monthly, and annual kilowatt-hours across all household devices.</li>
        </ol>

        <SystemFlowDiagram category="home-energy" title="Residential Electricity Consumption & Load Hierarchy" />
      </section>

      <section id="sizing-matrix">
        <h2>Illustrative Appliance Scenarios</h2>
        <p>
          Values are example scenarios, not universal household averages. Actual consumption varies with equipment efficiency, capacity, climate, usage patterns, controls, and operating conditions. Monthly kWh is calculated using the canonical Gregorian month factor (Daily kWh × 30.4375):
        </p>
        <div className="scenario-table" role="region" aria-label="Typical appliance electricity usage">
          <table>
            <caption>Illustrative household appliance electricity consumption &amp; running cost</caption>
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
                <td>6 active hours/day (cycling)</td>
                <td>~639.2 kWh</td>
                <td>~$102.27</td>
              </tr>
              <tr>
                <td><strong>Water Heater (50-gallon electric tank)</strong></td>
                <td>4,500 W</td>
                <td>3 active hours/day (cycling)</td>
                <td>~410.9 kWh</td>
                <td>~$65.74</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater</strong></td>
                <td>1,500 W</td>
                <td>8 hours/day (100% duty)</td>
                <td>~365.25 kWh</td>
                <td>~$58.44</td>
              </tr>
              <tr>
                <td><strong>Standard Kitchen Refrigerator (22 cu. ft.)</strong></td>
                <td>150 W (running)</td>
                <td>24 hrs (33% duty cycle)</td>
                <td>~36.16 kWh</td>
                <td>~$5.79</td>
              </tr>
              <tr>
                <td><strong>Level 2 EV Home Charger</strong></td>
                <td>7,200 W (30A @ 240V)</td>
                <td>2.5 hours/day (30 mi/day)</td>
                <td>~547.9 kWh</td>
                <td>~$87.66</td>
              </tr>
              <tr>
                <td><strong>Electric Clothes Dryer</strong></td>
                <td>3,000 W</td>
                <td>1 cycle/day (45 min = 0.75 hr)</td>
                <td>~68.48 kWh</td>
                <td>~$10.96</td>
              </tr>
              <tr>
                <td><strong>Home Desktop Computer / Gaming PC</strong></td>
                <td>300 W</td>
                <td>6 hours/day</td>
                <td>~54.79 kWh</td>
                <td>~$8.77</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Electricity Usage &amp; Appliance Energy Formulas"
          formula="Daily_kWh = (Watts × Hours_Per_Day × (Days_Per_Week ÷ 7) × Duty_Cycle) ÷ 1,000  |  Monthly_kWh = Daily_kWh × 30.4375  |  Annual_kWh = Daily_kWh × 365.25"
          formulaDescription="Converts instantaneous appliance power demand into normalized daily, monthly, and annual kilowatt-hour energy consumption, accounting for weekly schedules and cycling compressor behavior."
          variables={[
            { symbol: "Watts", label: "Appliance Running Wattage", description: "Nominal power draw under active operation (Volts × Amps × Power Factor).", unit: "W" },
            { symbol: "Hours_Per_Day", label: "Daily Scheduled Time", description: "Hours per day the appliance is scheduled or powered on.", unit: "hours" },
            { symbol: "Days_Per_Week", label: "Weekly Schedule", description: "Number of operating days per 7-day calendar week.", unit: "days/week" },
            { symbol: "Duty_Cycle", label: "Active Duty Cycle", description: "Fraction of scheduled time the appliance actively draws full running power (e.g. 33% for refrigerators).", unit: "fraction" },
          ]}
          notes={[
            "Monthly kWh is derived using exact Gregorian calendar normalization: Daily_kWh × 30.4375 (365.25 ÷ 12).",
            "Annual kWh = Daily_kWh × 365.25.",
            "Duty cycle should only be applied when entering peak/running wattage for cycling equipment (e.g. refrigeration compressors, thermostatically controlled heaters). For appliances whose entered power is already an average draw, keep duty cycle at 100%.",
          ]}
        />
      </div>

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Appliance energy formulas and baseline profiles are based on national energy conservation metrics and empirical consumption benchmarks:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "1.25rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>DOE 10 CFR Part 430</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Department of Energy energy conservation standards for consumer products, standardized test procedures, and annual EnergyGuide labeling requirements.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>EIA RECS &amp; Form EIA-861</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Energy Information Administration Residential Energy Consumption Survey and annual utility sales reporting for empirical household electricity baselines.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>NREL / DOE Building Energy Data</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              National Renewable Energy Laboratory residential building load profiles and end-use load shape modeling data.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>PowerLab Deterministic Model</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Pure deterministic calendar and schedule evaluation (365.25-day astronomical year, 30.4375-day mean Gregorian month) with zero hidden assumptions.
            </p>
          </div>
        </div>
      </section>

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
        <h2>Illustrative Battery &amp; Backup Planning</h2>
        <p>
          A common objective when calculating appliance electricity usage is estimating backup battery storage for emergency power outages. Sizing requires two distinct electrical metrics: <strong>continuous/surge power (Watts)</strong> to evaluate the inverter, and <strong>24-hour energy consumption (Watt-hours)</strong> to evaluate battery capacity.
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", fontStyle: "italic" }}>
          Disclaimer: These examples are educational estimates, not a complete battery, inverter, or electrical-system design. Actual system sizing requires manufacturer specifications, measured/expected load profiles, surge characteristics, battery operating limits, inverter efficiency, environmental conditions, installation requirements, and applicable local codes.
        </p>

        <div className="scenario-table" role="region" aria-label="Appliance to Battery Sizing Reference Table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Illustrative Critical Home Appliance Audit to Battery Storage &amp; Inverter Sizing Estimates</caption>
            <thead>
              <tr>
                <th scope="col">Critical Appliance</th>
                <th scope="col">Running Power &amp; Duty Cycle</th>
                <th scope="col">Daily Energy (Wh/day)</th>
                <th scope="col">24-Hr Battery Estimate (LiFePO4 @ 85% DoD)</th>
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
                <td>~6.28 kWh nominal (523 Ah @ 12V / 131 Ah @ 48V)</td>
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
          *Note: Example battery nominal capacity is calculated as: <code>Nominal Battery Capacity = Daily AC Energy ÷ Inverter Efficiency (0.90) ÷ Usable DoD (0.85)</code>. Example battery sizing uses an 85% DoD assumption. Actual usable DoD and cycle-life limits should follow the battery manufacturer&apos;s specifications. Motor startup Locked Rotor Amps (LRA) and inrush surge requirements must be verified against actual equipment nameplate data.*
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

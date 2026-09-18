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
  title: "EV Charging Time Calculator — AC & DC Speed",
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

      <div id="calculator-tool">
        <EvChargingTimeCalculator />
      </div>

      <DirectAnswerCard
        keyword="ev charging time calculator"
        answer="To calculate EV charging time, divide the energy needed (kWh) by the effective charging power (kW) delivered to the battery, accounting for approximately 90% AC charging efficiency."
        formula="Charging Time (Hours) = (Battery Size kWh × % Charge Needed) ÷ (Charger Power kW × 0.90 Efficiency)"
        standardExample="A 60 kWh EV battery adding 50% charge (30 kWh) on a 9.6 kW Level 2 home charger takes approximately 3.5 hours."
        sourceAuthority="SAE J1772 / J3400 (NACS) Charging Standards"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Charging Time and Energy Requirements</h2>
        <ol>
          <li><strong>Enter EV Battery Capacity (kWh):</strong> Input total usable battery pack capacity (e.g., 60 kWh for compact sedans, 75–85 kWh for crossovers, 100–130+ kWh for full-size electric trucks).</li>
          <li><strong>Set Starting and Target State of Charge (%):</strong> Standard daily charging cycles run from 20% to 80% to preserve lithium-ion battery health and prevent high internal resistance degradation.</li>
          <li><strong>Select Charger Speed &amp; Power Rating:</strong> Choose Level 1 (1.4 kW @ 120V), Level 2 Wallbox (3.8 kW to 11.5 kW @ 240V), or DC Fast Charging (50 kW to 350 kW).</li>
          <li><strong>Factor in Inverter &amp; Onboard Rectifier Efficiency:</strong> Level 1/Level 2 AC charging operates at approximately 88%–92% efficiency due to onboard AC-to-DC conversion and active thermal battery conditioning.</li>
        </ol>

        <SystemFlowDiagram category="ev" title="Electric Vehicle Charging Power Path & Onboard Rectification" />
      </section>

      <section id="sizing-matrix">
        <h2>Table 1: EV Charging Time Comparison Matrix (20% to 80% Daily Recharge)</h2>
        <p>Estimated charge durations across popular electric vehicle battery capacities for a standard 20% to 80% daily replenishment window (60% net battery capacity added):</p>
        <div className="scenario-table" role="region" aria-label="EV charging time comparison matrix">
          <table>
            <caption>Estimated charging time by battery capacity &amp; charger power (20% → 80% at ~90% AC efficiency)</caption>
            <thead>
              <tr>
                <th scope="col">Charger Type &amp; Power Rating</th>
                <th scope="col">50 kWh EV (e.g., Leaf, Kona)</th>
                <th scope="col">60 kWh EV (e.g., Model 3 RWD, Bolt)</th>
                <th scope="col">75 kWh EV (e.g., Model Y, Ioniq 5)</th>
                <th scope="col">100 kWh EV (e.g., F-150 Lightning, EV9)</th>
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
                <td><strong>Level 2 AC (3.8 kW / 240V 16A)</strong></td>
                <td>~8.8 hrs</td>
                <td>~10.5 hrs</td>
                <td>~13.2 hrs</td>
                <td>~17.5 hrs</td>
              </tr>
              <tr>
                <td><strong>Level 2 AC (7.7 kW / 240V 32A)</strong></td>
                <td>~4.3 hrs</td>
                <td>~5.2 hrs</td>
                <td>~6.5 hrs</td>
                <td>~8.7 hrs</td>
              </tr>
              <tr>
                <td><strong>Level 2 AC (9.6 kW / 240V 40A)</strong></td>
                <td>~3.5 hrs</td>
                <td>~4.2 hrs</td>
                <td>~5.2 hrs</td>
                <td>~6.9 hrs</td>
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

      <section id="infrastructure-matrix">
        <h2>Table 2: Level 2 AC Circuit Infrastructure &amp; Charging Speed Matrix</h2>
        <p>National Electrical Code (NEC Article 625) breaker sizing, circuit conductors, and realistic charging speeds across standard residential Level 2 installations:</p>
        <div className="scenario-table" role="region" aria-label="Level 2 charging infrastructure and breaker matrix">
          <table>
            <caption>Level 2 continuous current, required double-pole breaker, wire gauge, and recharge times for 60 kWh pack (20% → 80%)</caption>
            <thead>
              <tr>
                <th scope="col">Continuous Current</th>
                <th scope="col">Double-Pole Breaker</th>
                <th scope="col">Conductor (THHN / Romex)</th>
                <th scope="col">Power @ 240V</th>
                <th scope="col">Range Added / Hour</th>
                <th scope="col">60 kWh Pack (20% → 80%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps</strong></td>
                <td>20A Breaker</td>
                <td>12 AWG / 12 AWG</td>
                <td>3.84 kW</td>
                <td>~12–15 miles</td>
                <td>10.4 hours</td>
              </tr>
              <tr>
                <td><strong>24 Amps</strong></td>
                <td>30A Breaker</td>
                <td>10 AWG / 10 AWG</td>
                <td>5.76 kW</td>
                <td>~18–22 miles</td>
                <td>6.9 hours</td>
              </tr>
              <tr>
                <td><strong>32 Amps</strong></td>
                <td>40A Breaker</td>
                <td>8 AWG / 8 AWG</td>
                <td>7.68 kW</td>
                <td>~25–30 miles</td>
                <td>5.2 hours</td>
              </tr>
              <tr>
                <td><strong>40 Amps</strong></td>
                <td>50A Breaker</td>
                <td>8 AWG / 6 AWG</td>
                <td>9.60 kW</td>
                <td>~30–36 miles</td>
                <td>4.2 hours</td>
              </tr>
              <tr>
                <td><strong>48 Amps</strong></td>
                <td>60A Breaker</td>
                <td>6 AWG / 4 AWG</td>
                <td>11.52 kW</td>
                <td>~40–48 miles</td>
                <td>3.5 hours</td>
              </tr>
              <tr>
                <td><strong>80 Amps</strong></td>
                <td>100A Breaker</td>
                <td>3 AWG / 2 AWG</td>
                <td>19.20 kW</td>
                <td>~65–75 miles</td>
                <td>2.1 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Charging Duration &amp; Energy Formulas"
          formula="Time_Hours = (Capacity_kWh × (Target_SOC - Start_SOC)) / (P_effective × η_conversion)  |  E_grid_kWh = E_battery_kWh / η_conversion"
          formulaDescription="Computes exact charging duration by dividing net battery energy needed by effective charging power delivered to the battery cells, factoring in onboard rectification efficiency and thermal management loads."
          variables={[
            { symbol: "Capacity_kWh", label: "Usable Battery Capacity", description: "Total usable energy storage capacity of the EV high-voltage battery pack.", unit: "kWh" },
            { symbol: "Start_SOC", label: "Starting State of Charge", description: "Battery percentage at the beginning of the charging session (0.0–1.0).", unit: "%" },
            { symbol: "Target_SOC", label: "Target State of Charge", description: "Desired final battery percentage (0.0–1.0).", unit: "%" },
            { symbol: "P_effective", label: "Effective Charging Power", description: "min(EVSE Supply Power, Onboard Charger Limit) in kilowatts.", unit: "kW" },
            { symbol: "η_conversion", label: "Charging System Efficiency", description: "Onboard AC-to-DC rectifier and thermal conditioning efficiency (nominally 0.88–0.92).", unit: "dimensionless" },
          ]}
          notes={[
            "Level 1 and Level 2 AC charging incurs ~8% to 12% loss due to onboard rectification, coolant pump circulation, and battery heating/cooling.",
            "DC Fast Charging bypasses the vehicle onboard AC rectifier, feeding high-voltage DC directly to the battery with 92%–95% system efficiency, but tapers heavily above 80% SOC.",
          ]}
        />
      </div>

      <section id="worked-example" style={{ marginTop: "2rem" }}>
        <h2>Step-by-Step Worked Calculation: 75 kWh EV Recharge (20% to 80%)</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", lineHeight: 1.65 }}>
          <p><strong>Scenario:</strong> A driver recharges a 75 kWh battery pack from 20% to 80% using a 48-Amp Level 2 home wall connector (11.52 kW @ 240V) with 90% onboard rectifier efficiency.</p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
            <li>
              <strong>Step 1: Calculate Net Energy Required by the Battery:</strong>
              <br />
              <code>ΔSOC = 80% - 20% = 60% (0.60)</code>
              <br />
              <code>E_battery = 75 kWh × 0.60 = 45.0 kWh</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 2: Calculate Total Grid Source Energy Consumed:</strong>
              <br />
              <code>E_grid = E_battery / η_conversion = 45.0 kWh / 0.90 = 50.0 kWh</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 3: Determine Effective Charging Power Delivered to Cells:</strong>
              <br />
              <code>P_effective = P_EVSE × η_conversion = 11.52 kW × 0.90 = 10.368 kW</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 4: Compute Total Charge Duration:</strong>
              <br />
              <code>Time = 45.0 kWh / 10.368 kW = 4.34 hours = 4 hours and 20 minutes</code>
              <br />
              <em>Comparison:</em> On a 32A (7.68 kW) charger, this same 45 kWh recharge takes <code>45.0 / (7.68 × 0.90) = 6.51 hours (6 hrs 31 min)</code>.
            </li>
          </ol>
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

      <section id="related-tools">
        <h2>Related EV Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Size circuit breakers and wire gauges with the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link>, calculate driving range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>, compute home charging electricity costs with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>, or check feeder cable voltage drop with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Level 2 EV Charging Speed, Amperage &amp; Breaker Sizing Guide</Link> for detailed continuous load calculations, NEC 80% rule charts, and hardwired vs. plug-in comparisons.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          📊 <strong>Empirical Benchmark Dataset:</strong> Review our open research benchmark <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontWeight: 600, color: "var(--brand-strong)" }}>Continuous Duty EVSE Terminal Temperature Benchmark (PL-DS-EVSE-04)</Link> for thermal performance metrics.
        </p>
      </section>
    </article>
  );
}

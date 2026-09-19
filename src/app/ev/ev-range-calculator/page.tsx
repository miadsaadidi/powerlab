import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvRangeCalculator } from "@/components/calculator/ev-range-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ev-range");

export const metadata: Metadata = buildPageMetadata({
  title: "EV Range Calculator — Highway & Winter Range",
  description: "Estimate real-world electric vehicle driving range by battery kWh, 70+ mph highway speed & cold winter temperature drop. Physics-based EV range estimation.",
  canonicalPath: "/ev/ev-range-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How is electric vehicle driving range calculated?",
    answer: "Available usable energy in kilowatt-hours is calculated as: Available kWh = Battery Capacity × (Current SOC% − Reserve SOC%) × Battery Health. Driving range is then: Range (miles) = Available kWh × Efficiency (mi/kWh).",
  },
  {
    question: "How does highway driving affect EV range?",
    answer: "Aerodynamic drag increases with the square of vehicle speed. Driving at 75–80 mph on the highway typically reduces EV driving range by 15% to 25% compared to 55–65 mph city and suburban driving.",
  },
  {
    question: "How much does cold winter weather reduce EV range?",
    answer: "Freezing ambient temperatures (below 32°F / 0°C) can reduce EV range by 20% to 35% due to increased battery internal resistance, higher air density drag, and cabin heating HVAC energy consumption.",
  },
  {
    question: "What is the difference between gross and usable EV battery capacity?",
    answer: "Gross capacity is the physical chemical capacity of the battery cells. Usable (net) capacity is the portion unlocked by the manufacturer BMS for driving (usually 90%–95% of gross) to prevent overcharging and overdischarging.",
  },
];

export default function EvRangePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Range Calculator",
    description: "Estimate planned driving range from usable battery capacity, current charge, reserve, battery health, and consumption efficiency.",
    route: "/ev/ev-range-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates real-world driving range in miles and kilometers",
      "Supports mi/kWh, kWh/100km, Wh/km, and kWh/100mi efficiency units",
      "Configurable arrival reserve buffer and battery state of health (SOH)",
      "Instant scenario analysis for highway, city, and winter conditions",
    ],
    standards: [
      "EPA Light-Duty Automotive Technology, Carbon Dioxide Emissions, and Fuel Economy Trends",
      "SAE J1634 (Electric Vehicle Energy Consumption and Range Test Procedure)",
      "WLTP (Worldwide Harmonised Light Vehicles Test Procedure)",
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
        <span aria-current="page">EV Range Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Range Calculator</h1>
        <p className="intro">
          Estimate real-world electric vehicle driving range in miles and kilometers from usable battery pack capacity (kWh), current state of charge, and vehicle driving efficiency.
        </p>
      </div>

      <div id="calculator-tool">
        <EvRangeCalculator />
      </div>

      <DirectAnswerCard
        keyword="EV driving range calculation"
        answer="Real-world EV driving range is calculated by multiplying available battery energy (kWh remaining above reserve limit) by vehicle efficiency: Range (Miles) = [Usable kWh × (Current SoC − Reserve SoC)] × Efficiency (mi/kWh). A 75 kWh EV at 80% charge with 3.5 mi/kWh efficiency and a 10% arrival reserve provides approximately 183 miles of driving range."
        formula="Estimated Range (Miles) = [Battery Pack Capacity (kWh) × (Current SoC − Reserve SoC) × Battery Health] × Vehicle Efficiency (mi/kWh)"
        standardExample="75 kWh pack at 80% SoC, 10% reserve, 3.5 mi/kWh: [75 × (0.80 − 0.10)] × 3.5 = 183.75 miles"
        sourceAuthority="EPA / SAE J1634 (Electric Vehicle Range & Energy Test Procedures)"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Real-World EV Driving Range</h2>
        <p>
          Calculating real-world EV range requires determining your net usable battery energy in kilowatt-hours and multiplying by your vehicle&apos;s real-time consumption efficiency:
        </p>
        <div style={{ padding: "1.25rem 1.5rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1.5rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--ink)" }}>4-Step Manual EV Range Calculation:</h3>
          <ol style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.7 }}>
            <li><strong>Determine Usable Battery Capacity:</strong> Check your vehicle&apos;s net usable battery size (e.g. 75 kWh on a standard long-range EV).</li>
            <li><strong>Calculate Usable State of Charge (SoC) Window:</strong> Subtract your arrival buffer (e.g. 10% reserve) from current charge (e.g. 80%): &Delta;SoC = 0.80 &minus; 0.10 = 0.70.</li>
            <li><strong>Compute Available Driving Energy:</strong> Multiply usable capacity by the SoC window: Available kWh = 75 &times; 0.70 = 52.5 kWh.</li>
            <li><strong>Multiply by Vehicle Efficiency:</strong> Multiply available energy by real-world efficiency (e.g. 3.4 mi/kWh): Range = 52.5 kWh &times; 3.4 mi/kWh = 178.5 miles (287 km).</li>
          </ol>
        </div>
      </section>

      <section id="speed-aerodynamics">
        <h2>Highway Speed &amp; Aerodynamic Drag Range Impact</h2>
        <p>
          Aerodynamic drag force increases with the square of speed (F_drag = 0.5 &times; &rho; &times; C_d &times; A &times; v&sup2;), while power required to overcome drag scales with the cube of speed (P_drag &prop; v&sup3;). Driving at 75–80 mph increases energy consumption significantly compared to 55–65 mph:
        </p>
        <div className="scenario-table" role="region" aria-label="Highway speed and aerodynamic drag impact table">
          <table>
            <caption>Aerodynamic drag &amp; real-world consumption derating across highway cruising speeds</caption>
            <thead>
              <tr>
                <th scope="col">Cruising Speed</th>
                <th scope="col">Aerodynamic Drag Power</th>
                <th scope="col">Typical Consumption</th>
                <th scope="col">Efficiency (mi/kWh)</th>
                <th scope="col">75 kWh Pack Range</th>
                <th scope="col">Range vs 55 mph</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>55 mph</strong> (88 km/h)</td>
                <td>~6.2 kW</td>
                <td>~240 Wh/mi (14.9 kWh/100km)</td>
                <td>4.17 mi/kWh</td>
                <td>~312 miles (502 km)</td>
                <td><span style={{ color: "#059669", fontWeight: 700 }}>Baseline (100%)</span></td>
              </tr>
              <tr>
                <td><strong>65 mph</strong> (105 km/h)</td>
                <td>~10.1 kW</td>
                <td>~285 Wh/mi (17.7 kWh/100km)</td>
                <td>3.51 mi/kWh</td>
                <td>~263 miles (423 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>-15.7%</span></td>
              </tr>
              <tr>
                <td><strong>70 mph</strong> (113 km/h)</td>
                <td>~12.6 kW</td>
                <td>~315 Wh/mi (19.6 kWh/100km)</td>
                <td>3.17 mi/kWh</td>
                <td>~238 miles (383 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>-23.7%</span></td>
              </tr>
              <tr>
                <td><strong>75 mph</strong> (121 km/h)</td>
                <td>~15.5 kW</td>
                <td>~350 Wh/mi (21.7 kWh/100km)</td>
                <td>2.86 mi/kWh</td>
                <td>~214 miles (344 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>-31.4%</span></td>
              </tr>
              <tr>
                <td><strong>80 mph</strong> (129 km/h)</td>
                <td>~18.8 kW</td>
                <td>~390 Wh/mi (24.2 kWh/100km)</td>
                <td>2.56 mi/kWh</td>
                <td>~192 miles (309 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>-38.5%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="winter-subzero">
        <h2>Cold Weather &amp; Sub-Zero Temperature Range Derating</h2>
        <p>
          Low ambient temperatures derate EV range through three simultaneous physical mechanisms: increased electrochemical internal cell resistance (R_i), higher ambient air density increasing aerodynamic drag, and thermal HVAC energy demand for cabin and battery pack thermal management:
        </p>
        <div className="scenario-table" role="region" aria-label="Winter sub-zero temperature derating table">
          <table>
            <caption>Winter temperature derating &amp; HVAC impact on 75 kWh battery pack (100% to 10% SoC window)</caption>
            <thead>
              <tr>
                <th scope="col">Ambient Temperature</th>
                <th scope="col">HVAC Heating System</th>
                <th scope="col">Heating Power Draw</th>
                <th scope="col">Effective Consumption</th>
                <th scope="col">Real-World Range</th>
                <th scope="col">Range Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>70°F (21°C)</strong> — Ideal</td>
                <td>None / Fan Only</td>
                <td>~0.3 kW</td>
                <td>~290 Wh/mi (3.45 mi/kWh)</td>
                <td>~233 miles (375 km)</td>
                <td><span style={{ color: "#059669", fontWeight: 700 }}>100% (Baseline)</span></td>
              </tr>
              <tr>
                <td><strong>45°F (7°C)</strong> — Chilly</td>
                <td>Heat Pump Active</td>
                <td>~1.2 kW</td>
                <td>~325 Wh/mi (3.08 mi/kWh)</td>
                <td>~208 miles (335 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>89.3%</span></td>
              </tr>
              <tr>
                <td><strong>32°F (0°C)</strong> — Freezing</td>
                <td>Heat Pump Active</td>
                <td>~2.2 kW</td>
                <td>~365 Wh/mi (2.74 mi/kWh)</td>
                <td>~185 miles (298 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>79.4%</span></td>
              </tr>
              <tr>
                <td><strong>15°F (-9°C)</strong> — Deep Winter</td>
                <td>Heat Pump + Resistive</td>
                <td>~3.8 kW</td>
                <td>~420 Wh/mi (2.38 mi/kWh)</td>
                <td>~161 miles (259 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>69.1%</span></td>
              </tr>
              <tr>
                <td><strong>-5°F (-21°C)</strong> — Sub-Zero</td>
                <td>PTC Resistive Heater (COP 1.0)</td>
                <td>~5.5 kW</td>
                <td>~495 Wh/mi (2.02 mi/kWh)</td>
                <td>~136 miles (219 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>58.4%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sizing-matrix">
        <h2>EV Driving Range Reference Matrix</h2>
        <p>Real-world driving range varies significantly by vehicle efficiency, driving speed, and ambient temperature. Here is how common battery capacities perform across driving profiles (based on 100% to 10% usable capacity window):</p>
        <div className="scenario-table" role="region" aria-label="EV driving range comparison matrix">
          <table>
            <caption>Estimated driving range by battery size &amp; driving conditions (90% usable charge)</caption>
            <thead>
              <tr>
                <th scope="col">Battery Pack Size</th>
                <th scope="col">City Driving (4.0 mi/kWh)</th>
                <th scope="col">Combined Average (3.4 mi/kWh)</th>
                <th scope="col">Highway 75 mph (2.8 mi/kWh)</th>
                <th scope="col">Winter Freezing (2.3 mi/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>50 kWh Pack</strong> (e.g. Nissan Leaf, Mini SE)</td>
                <td>~180 mi (290 km)</td>
                <td>~153 mi (246 km)</td>
                <td>~126 mi (203 km)</td>
                <td>~104 mi (167 km)</td>
              </tr>
              <tr>
                <td><strong>65 kWh Pack</strong> (e.g. Chevy Bolt, Kona EV)</td>
                <td>~234 mi (377 km)</td>
                <td>~199 mi (320 km)</td>
                <td>~164 mi (264 km)</td>
                <td>~135 mi (217 km)</td>
              </tr>
              <tr>
                <td><strong>75 kWh Pack</strong> (e.g. Tesla Model 3/Y Long Range)</td>
                <td>~270 mi (435 km)</td>
                <td>~230 mi (370 km)</td>
                <td>~189 mi (304 km)</td>
                <td>~155 mi (249 km)</td>
              </tr>
              <tr>
                <td><strong>100 kWh Pack</strong> (e.g. Model S/X, Taycan, Rivian)</td>
                <td>~360 mi (579 km)</td>
                <td>~306 mi (492 km)</td>
                <td>~252 mi (406 km)</td>
                <td>~207 mi (333 km)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          <em>Data Sources: Derived from EPA Light-Duty Vehicle Test Cycles, SAE J1634 EV Energy Consumption Standards, and Idaho National Laboratory (INL) Advanced Vehicle Fleet Testing.</em>
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Driving Range Formulas"
          formula="Available_kWh = Usable_kWh × (Current_SOC - Reserve_SOC) × Health  |  Range (mi) = Available_kWh × mi_per_kWh"
          formulaDescription="Calculates real-world driving distance in miles and kilometers from net usable battery capacity, current state of charge, and vehicle efficiency."
          variables={[
            { symbol: "Usable_kWh", label: "Usable Battery Pack Energy", description: "Manufacturer net usable traction battery capacity.", unit: "kWh" },
            { symbol: "Current_SOC", label: "Current Charge Level", description: "Starting state of charge percentage.", unit: "fraction" },
            { symbol: "Reserve_SOC", label: "Minimum Reserve Buffer", description: "Target arrival state of charge cutoff (typically 10%–15%).", unit: "fraction" },
            { symbol: "Health", label: "Battery State of Health (SOH)", description: "Available capacity relative to new factory condition.", unit: "fraction" },
            { symbol: "mi_per_kWh", label: "Vehicle Efficiency", description: "Real-world electrical economy (typically 3.0 to 4.0 mi/kWh, or 15–20 kWh/100km).", unit: "mi/kWh" },
          ]}
          notes={[
            "Metric Range: Range (km) = (Available_kWh ÷ kWh_per_100km) × 100.",
            "Efficiency conversion: mi/kWh = 62.1371 ÷ (kWh/100 km).",
            "Aerodynamic drag scales quadratically with speed: F_drag = 0.5 × rho × Cd × A × v^2.",
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

      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Related Electric Vehicle Engineering Guides &amp; Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Dive into the underlying physics of highway aerodynamic drag, winter battery losses, and home charging sizing:
        </p>

        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.03) 100%)", border: "1.5px solid rgba(139, 92, 246, 0.3)", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "1.3rem" }}>📘</span>
            <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--brand-strong)" }}>
              Featured Engineering Guide: How to Calculate EV Driving Range &amp; Efficiency
            </h3>
          </div>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.55 }}>
            Master aerodynamic speed drag formulas ($F_d = \frac{1}{2} \rho C_d A v^2$), winter heat pump vs PTC strip heating penalties, and 100,000-mile battery degradation kinetics.
          </p>
          <Link href="/guides/how-to-calculate-ev-driving-range-and-efficiency-guide" className="button" style={{ display: "inline-block", background: "#8b5cf6", color: "#ffffff", fontWeight: 700, padding: "0.6rem 1.25rem", borderRadius: "0.5rem", textDecoration: "none", fontSize: "0.9rem" }}>
            Read Complete EV Range Calculation Guide →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>⏱️ Level 2 Home Recharge Time</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate hours required to replenish your battery across 3.8 kW to 11.5 kW Level 2 wallboxes.
            </p>
            <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              EV Charging Time Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>⚡ Size Dedicated Breaker &amp; Wire</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size 40A, 50A, or 60A double-pole breakers and copper wire under the NEC 125% continuous duty rule.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              EV Breaker Size Calculator →
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/ev/ev-charging-time-calculator" className="button secondary-button">EV Charging Time Calculator</Link>
          <Link href="/ev/ev-charging-cost-calculator" className="button secondary-button">EV Charging Cost Calculator</Link>
          <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button">EV Breaker Size Calculator</Link>
          <Link href="/ev/v2l-runtime-calculator" className="button secondary-button">V2L Runtime Calculator</Link>
          <Link href="/ev/ev-savings-calculator" className="button secondary-button">EV vs Gas Savings Calculator</Link>
        </div>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvRangeCalculator } from "@/components/calculator/ev-range-calculator";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { calculateEvRange } from "@/lib/calculators/ev-range/engine";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Range Calculator — Battery, SOC & Efficiency",
  description: "Estimate electric vehicle driving range from usable battery pack capacity (kWh), current state of charge, reserve buffer, and vehicle energy consumption.",
  canonicalPath: "/ev/ev-range-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How is electric vehicle driving range calculated?",
    answer: "Available usable energy is calculated from battery capacity, the state-of-charge window, and battery health: Available kWh = Usable Battery Capacity (kWh) × (Current SOC% − Reserve SOC%) / 100 × (Battery Health% / 100). Driving range is then: Range (miles) = Available kWh × Efficiency (mi/kWh), or Range (km) = (Available kWh ÷ kWh/100 km) × 100.",
  },
  {
    question: "How does highway cruising speed affect EV range?",
    answer: "Aerodynamic drag power increases with the cube of vehicle speed (P ∝ v³). Driving at 75–80 mph on the highway typically reduces EV range by an illustrative 15% to 25% compared to 55–65 mph moderate cruising, though actual impact varies substantially by vehicle aerodynamics, speed, road topography, wind, and tire resistance.",
  },
  {
    question: "How much does cold winter weather reduce EV range?",
    answer: "Freezing ambient temperatures (below 32°F / 0°C) can reduce EV range by an illustrative 20% to 35% due to increased battery electrochemical internal resistance, higher air density drag, and cabin heating HVAC energy consumption. Actual impact varies substantially depending on cabin heating type (heat pump vs. PTC resistive strip), battery pre-conditioning, and driving conditions.",
  },
  {
    question: "What is the difference between gross and usable EV battery capacity?",
    answer: "Gross capacity is the total physical chemical capacity of all battery cells. Usable (net) capacity is the energy buffer unlocked by the vehicle's battery management system (BMS) for driving to prevent excessive degradation from deep discharge or overcharge.",
  },
];

const MATRIX_CLASSES = [
  { label: "50 kWh Class", capacity: 50, examples: "e.g. Standard-Range Compact EVs" },
  { label: "65 kWh Class", capacity: 65, examples: "e.g. Standard-Range Sedans & Crossovers" },
  { label: "75 kWh Class", capacity: 75, examples: "e.g. Long-Range Sedans & Crossovers" },
  { label: "100 kWh Class", capacity: 100, examples: "e.g. Full-Size Luxury EVs & Large Trucks" },
];

const MATRIX_PROFILES = [
  { label: "City Driving (4.0 mi/kWh)", consumption: 4.0, unit: "mi-per-kwh" as const },
  { label: "Combined Average (3.4 mi/kWh)", consumption: 3.4, unit: "mi-per-kwh" as const },
  { label: "Highway 75 mph (2.8 mi/kWh)", consumption: 2.8, unit: "mi-per-kwh" as const },
  { label: "Winter Scenario (2.3 mi/kWh)", consumption: 2.3, unit: "mi-per-kwh" as const },
];

export default function EvRangePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Range Calculator",
    description: "Estimate planned driving range from usable battery capacity, current charge, reserve, battery health, and consumption.",
    route: "/ev/ev-range-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates planned driving range in miles and kilometers",
      "Supports mi/kWh, kWh/100km, Wh/km, and kWh/100mi efficiency units",
      "Configurable arrival reserve buffer and battery state of health (SOH)",
      "Standard consumption comparisons and sensitivity scenarios",
    ],
    standards: [
      "EPA Light-Duty Automotive Technology and Fuel Economy Test Procedures",
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
          Estimate electric vehicle driving range in miles and kilometers from usable battery pack capacity (kWh), current state of charge, arrival reserve buffer, and vehicle energy consumption.
        </p>
      </div>

      <div id="calculator-tool">
        <EvRangeCalculator />
      </div>

      <DirectAnswerCard
        keyword="EV driving range calculation"
        answer="Planned EV driving range is calculated by multiplying available battery energy (kWh remaining above your reserve buffer) by estimated vehicle consumption: Range (Miles) = [Usable kWh × (Current SOC% − Reserve SOC%) / 100 × (SOH% / 100)] × Efficiency (mi/kWh). A 75 kWh usable battery pack at 80% SOC with a 10% reserve buffer and 3.5 mi/kWh consumption provides 183.75 miles (295.7 km) of planned driving range."
        formula="Range (mi) = [Usable Pack kWh × (Current SOC% − Reserve SOC%) / 100 × SOH% / 100] × mi/kWh  |  Range (km) = [Available kWh ÷ (kWh/100 km)] × 100"
        standardExample="75 kWh pack at 80% SOC, 10% reserve (0.80 − 0.10 = 0.70 window), 100% SOH, 3.5 mi/kWh: [75 × 0.70] × 3.5 = 183.75 miles (295.7 km)"
        sourceAuthority="EPA / SAE J1634 (Test Procedure & Consumption Measurement References)"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Real-World EV Driving Range</h2>
        <p>
          Calculating EV driving range requires determining net usable battery energy in kilowatt-hours and multiplying by estimated vehicle consumption:
        </p>
        <div style={{ padding: "1.25rem 1.5rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1.5rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--ink)" }}>4-Step Manual EV Range Calculation:</h3>
          <ol style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.7 }}>
            <li>
              <strong>Determine Usable Battery Capacity:</strong> Identify the vehicle&apos;s new-condition net usable battery pack capacity in kWh (e.g. 75 kWh).
            </li>
            <li>
              <strong>Calculate Usable State of Charge (SOC) Window:</strong> Convert percentages to fractions and subtract your arrival reserve buffer from current charge: <code>ΔSOC = (Current SOC% − Reserve SOC%) / 100 = 0.80 − 0.10 = 0.70</code>.
            </li>
            <li>
              <strong>Compute Available Driving Energy:</strong> Multiply usable capacity by the SOC fraction and battery health factor (SOH): <code>Available kWh = 75 × 0.70 × 1.00 = 52.5 kWh</code>.
            </li>
            <li>
              <strong>Apply Estimated Vehicle Consumption:</strong> Multiply available energy by economy: <code>Range = 52.5 kWh × 3.5 mi/kWh = 183.75 miles (295.7 km)</code>.
            </li>
          </ol>
        </div>
      </section>

      <section id="technical-references" style={{ marginTop: "2rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          PowerLab clearly separates official automotive test cycles, standard testing procedures, and deterministic arithmetic models:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>EPA Fuel Economy Test Cycles</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              U.S. EPA dynamometer testing procedures (UDDS city and HWFET highway cycles) establish official window sticker range and MPGe ratings.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>SAE J1634 Standard</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Society of Automotive Engineers standard test procedure for electric vehicle energy consumption and range measurement under controlled multi-cycle laboratory conditions.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>WLTP Test Procedure</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Worldwide Harmonised Light Vehicles Test Procedure, defining standardized laboratory driving cycles used in European and international regulatory markets.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>PowerLab Calculation Model</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Deterministic physics-based calculation dividing available pack energy by static user-entered consumption. Does not substitute for vehicle telemetry or dynamometer certification.
            </p>
          </div>
        </div>
      </section>

      <section id="speed-aerodynamics" style={{ marginTop: "2rem" }}>
        <h2>Highway Speed &amp; Aerodynamic Drag Range Impact</h2>
        <p>
          Aerodynamic drag force increases with the square of speed (<em>F</em><sub>drag</sub> = ½ · <em>ρ</em> · <em>C</em><sub>d</sub> · <em>A</em> · <em>v</em>²), while the power required to overcome drag scales with the cube of speed (<em>P</em><sub>drag</sub> ∝ <em>v</em>³). Driving at 75–80 mph increases energy consumption significantly compared to 55–65 mph:
        </p>
        <div style={{ margin: "1rem 0", padding: "0.85rem 1.15rem", borderRadius: "0.5rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", fontSize: "0.85rem", lineHeight: 1.5 }}>
          <strong>Illustrative Engineering Reference:</strong> Real-world highway impact varies based on individual vehicle drag coefficient (<em>C</em><sub>d</sub>), frontal area, wind speed, elevation changes, tire rolling resistance, and climate control loads.
        </div>
        <div className="scenario-table" role="region" aria-label="Highway speed and aerodynamic drag impact table">
          <table>
            <caption>Illustrative aerodynamic drag &amp; estimated consumption derating across cruising speeds (75 kWh pack, 100% to 10% SOC)</caption>
            <thead>
              <tr>
                <th scope="col">Cruising Speed</th>
                <th scope="col">Estimated Drag Power</th>
                <th scope="col">Typical Consumption</th>
                <th scope="col">Efficiency (mi/kWh)</th>
                <th scope="col">75 kWh Pack Range</th>
                <th scope="col">Range vs 55 mph Baseline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>55 mph</strong> (88 km/h)</td>
                <td>~6.2 kW</td>
                <td>~240 Wh/mi (14.9 kWh/100km)</td>
                <td>4.17 mi/kWh</td>
                <td>~281 miles (453 km)</td>
                <td><span style={{ color: "#059669", fontWeight: 700 }}>Baseline (100%)</span></td>
              </tr>
              <tr>
                <td><strong>65 mph</strong> (105 km/h)</td>
                <td>~10.1 kW</td>
                <td>~285 Wh/mi (17.7 kWh/100km)</td>
                <td>3.51 mi/kWh</td>
                <td>~237 miles (381 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>-15.7%</span></td>
              </tr>
              <tr>
                <td><strong>70 mph</strong> (113 km/h)</td>
                <td>~12.6 kW</td>
                <td>~315 Wh/mi (19.6 kWh/100km)</td>
                <td>3.17 mi/kWh</td>
                <td>~214 miles (344 km)</td>
                <td><span style={{ color: "#d97706", fontWeight: 700 }}>-23.8%</span></td>
              </tr>
              <tr>
                <td><strong>75 mph</strong> (121 km/h)</td>
                <td>~15.5 kW</td>
                <td>~350 Wh/mi (21.7 kWh/100km)</td>
                <td>2.86 mi/kWh</td>
                <td>~193 miles (311 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>-31.3%</span></td>
              </tr>
              <tr>
                <td><strong>80 mph</strong> (129 km/h)</td>
                <td>~18.8 kW</td>
                <td>~390 Wh/mi (24.2 kWh/100km)</td>
                <td>2.56 mi/kWh</td>
                <td>~173 miles (278 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>-38.4%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="winter-subzero" style={{ marginTop: "2rem" }}>
        <h2>Cold Weather &amp; Sub-Zero Temperature Range Derating</h2>
        <p>
          Low ambient temperatures derate EV range through three simultaneous physical mechanisms: increased electrochemical cell internal resistance, denser air increasing aerodynamic drag, and cabin heating HVAC energy consumption:
        </p>
        <div style={{ margin: "1rem 0", padding: "0.85rem 1.15rem", borderRadius: "0.5rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", fontSize: "0.85rem", lineHeight: 1.5 }}>
          <strong>Illustrative Scenario Note:</strong> Illustrative scenario values only. Actual winter range variation depends on vehicle thermal architecture, speed, cabin heating system (heat pump vs. PTC resistive), cabin setpoint, battery thermal preconditioning, road conditions, and driving behavior. Values do not apply universally.
        </div>
        <div className="scenario-table" role="region" aria-label="Winter sub-zero temperature derating table">
          <table>
            <caption>Illustrative winter temperature derating &amp; HVAC impact on 75 kWh battery pack (100% to 10% SOC window = 67.5 kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Ambient Temperature</th>
                <th scope="col">HVAC Heating System</th>
                <th scope="col">Heating Power Draw</th>
                <th scope="col">Effective Consumption</th>
                <th scope="col">Estimated Range</th>
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
                <td>PTC Resistive Heater</td>
                <td>~5.5 kW</td>
                <td>~495 Wh/mi (2.02 mi/kWh)</td>
                <td>~136 miles (219 km)</td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>58.4%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sizing-matrix" style={{ marginTop: "2rem" }}>
        <h2>EV Driving Range Reference Matrix</h2>
        <p>
          Calculated driving range across popular vehicle battery capacity classes and driving consumption profiles (based on 100% to 10% usable SOC window = 90% net pack energy available):
        </p>
        <div className="scenario-table" role="region" aria-label="EV driving range comparison matrix">
          <table>
            <caption>Estimated driving range by usable capacity class &amp; consumption profile (90% available charge window)</caption>
            <thead>
              <tr>
                <th scope="col">Usable Battery Capacity Class</th>
                {MATRIX_PROFILES.map((p) => (
                  <th scope="col" key={p.label}>
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_CLASSES.map((cls) => (
                <tr key={cls.label}>
                  <td>
                    <strong>{cls.label}</strong>
                    <br />
                    <small style={{ color: "var(--muted)" }}>{cls.examples}</small>
                  </td>
                  {MATRIX_PROFILES.map((prof) => {
                    const res = calculateEvRange({
                      batteryCapacityKWh: cls.capacity,
                      currentSoc: 100,
                      reserveSoc: 10,
                      batteryHealth: 100,
                      consumption: prof.consumption,
                      consumptionUnit: prof.unit,
                    }).result;
                    return (
                      <td key={prof.label}>
                        ~{res.rangeMiles.toFixed(0)} mi ({res.rangeKm.toFixed(0)} km)
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          <em>Values calculated dynamically using the PowerLab deterministic range engine for a 90-percentage-point usable state-of-charge window (100% → 10% SOC).</em>
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Driving Range Formulas"
          formula="Available_kWh = Usable_kWh × (Current_SOC% − Reserve_SOC%) / 100 × (Health% / 100)  |  Range (mi) = Available_kWh × mi_per_kWh"
          formulaDescription="Calculates planned driving distance in miles and kilometers from net usable battery capacity, current state of charge, arrival reserve buffer, and estimated vehicle consumption."
          variables={[
            { symbol: "Usable_kWh", label: "Usable Battery Pack Energy", description: "Manufacturer net usable traction battery capacity when new (kWh).", unit: "kWh" },
            { symbol: "Current_SOC%", label: "Current Charge Level", description: "Starting state of charge percentage (0% to 100%).", unit: "%" },
            { symbol: "Reserve_SOC%", label: "Minimum Reserve Buffer", description: "Target arrival state of charge cutoff (typically 10%–15%).", unit: "%" },
            { symbol: "Health%", label: "Battery State of Health (SOH)", description: "Available capacity relative to new factory condition (1% to 100%).", unit: "%" },
            { symbol: "mi_per_kWh", label: "Vehicle Consumption", description: "Estimated electrical efficiency (typically 2.5 to 4.5 mi/kWh, or 14–25 kWh/100km).", unit: "mi/kWh" },
          ]}
          notes={[
            "Metric Range Formula: Range (km) = [Available_kWh ÷ (kWh/100 km)] × 100.",
            "Efficiency conversion: mi/kWh = 62.1371 ÷ (kWh/100 km).",
            "Aerodynamic drag scales quadratically with speed: F_drag = ½ · ρ · Cd · A · v².",
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
          Explore connected EV planning tools and technical guides across charging speeds, electricity costs, and electrical infrastructure:
        </p>

        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.03) 100%)", border: "1.5px solid rgba(139, 92, 246, 0.3)", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "1.3rem" }}>📘</span>
            <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--brand-strong)" }}>
              Featured Engineering Guide: How to Calculate EV Driving Range &amp; Efficiency
            </h3>
          </div>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.55 }}>
            Master aerodynamic speed drag formulas (<em>F</em><sub>d</sub> = ½ · <em>ρ</em> · <em>C</em><sub>d</sub> · <em>A</em> · <em>v</em>²), winter heat pump vs PTC strip heating penalties, and 100,000-mile battery degradation kinetics.
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

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { ApplianceWattageCalculator } from "@/components/calculator/appliance-wattage-calculator";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

export const metadata: Metadata = buildPageMetadata({
  title: "Appliance Wattage & Starting Surge Calculator — Watts, LRA & kWh",
  description: "Calculate appliance running watts, motor inrush surge from nameplate Locked Rotor Amps (LRA), and hourly electricity costs based on U.S. EIA benchmarks.",
  canonicalPath: "/home-energy/appliance-wattage-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How do you calculate appliance wattage from volts and amps?",
    answer: "For direct current (DC) and purely resistive alternating current (AC) loads, multiply Voltage by Amperage: Watts = Volts × Amps. For AC inductive loads containing electric motors or transformers, multiply by the operating power factor (cos φ): Watts = Volts × Amps × Power Factor. The product of Volts and Amps alone gives apparent power in Volt-Amps (VA).",
  },
  {
    question: "What is Locked Rotor Amps (LRA) and how does it determine starting surge?",
    answer: "Locked Rotor Amps (LRA) is the root-mean-square (RMS) current drawn by an electric motor when voltage is applied with the rotor stationary at zero speed (slip s = 1.0). In this state, there is zero back-electromotive force (back-EMF), so current is limited only by winding impedance. Starting Apparent Power equals Volts × LRA. Single-phase induction motors typically exhibit starting inrush currents 4.5× to 7.0× their running full load amps (FLA/RLA).",
  },
  {
    question: "Does starting surge wattage increase your electric utility bill?",
    answer: "No, not measurably. Starting inrush lasts only 50 to 300 milliseconds (0.000014 to 0.000083 hours). Because electric utility meters record cumulative kilowatt-hours (Energy = Power × Time), the energy consumed during a brief startup spike is negligible (often less than 0.0002 kWh, or a fraction of a cent). Starting surge is strictly an instantaneous electrical capacity and current sizing constraint for generators, inverters, and circuit breakers—not a driver of electric bills.",
  },
  {
    question: "Why do backup generators and battery inverters trip on motor startup?",
    answer: "Inductive motors during starting operate at a low power factor (typically 0.35 to 0.55 lagging). This creates a massive instantaneous apparent power demand (kVA surge). If the backup generator cannot supply the required subtransient starting kVA or if the battery inverter hits its peak current threshold, the output voltage sags below 108V AC, causing under-voltage or over-current protection to trip.",
  },
  {
    question: "Do inverter-driven appliances require high starting surge capacity?",
    answer: "No. Inverter-driven equipment (such as modern variable-speed mini-splits and inverter refrigerators) utilizes variable frequency drives (VFD) that ramp voltage and frequency gradually. This soft-start behavior avoids the locked-rotor inrush of conventional single-speed compressors, limiting starting demand to near running levels (typically estimated at 1.1× to 1.3× running wattage depending on manufacturer DC bus filtering).",
  },
  {
    question: "What is the difference between real power (Watts) and apparent power (Volt-Amps)?",
    answer: "Real power (Watts) is the actual energy consumed to perform physical work or generate heat. Apparent power (Volt-Amps, VA) represents the total vector sum of real and reactive power in an AC circuit. Electrical wiring, circuit breakers, transformers, and generators must be sized for apparent power (VA), whereas utility energy meters bill primarily for real power (kWh).",
  },
];

export default function ApplianceWattagePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Appliance Wattage & Starting Surge Calculator",
    description: "Calculate appliance running watts, motor starting surge from nameplate Locked Rotor Amps (LRA), and daily kWh energy consumption with U.S. EIA electricity cost modeling.",
    route: "/home-energy/appliance-wattage-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Converts nameplate Volts and Amps to continuous running Watts with power factor adjustment",
      "Calculates starting surge apparent power (VA) directly from nameplate Locked Rotor Amps (LRA)",
      "Four-tier equipment load classification: Resistive, Inverter/VFD, Standard Inductive Motor, High-Inertia HVAC Compressor",
      "Evaluates backup generator and battery inverter starting kVA surge requirements vs continuous running kW",
      "Projects hourly, daily, and monthly electricity operating costs based on U.S. EIA Electric Power Monthly benchmarks",
    ],
    standards: [
      "ANSI/NEMA MG 1-2021 (Motors and Generators — Locked Rotor kVA Code Letters)",
      "IEEE 1459-2025 (Standard Definitions for the Measurement of Electric Power Quantities)",
      "NFPA 70-2026 / National Electrical Code (NEC) Article 430 & 440 (Motors and AC/Refrigerating Equipment)",
      "DOE 10 CFR Part 430 (Energy Conservation Standards for Consumer Products)",
      "ANSI C84.1-2020 (Electric Power Systems and Equipment — Voltage Ratings 60 Hz)",
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
        <span aria-current="page">Appliance Wattage Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Electrical power &amp; inrush engineering</p>
        <h1>Appliance Wattage &amp; Starting Surge Calculator</h1>
        <p className="intro">
          Calculate continuous running power (Watts), electromechanical starting surge (VA) from nameplate Locked Rotor Amps (LRA), and electricity operating costs for backup generator, battery storage inverter, and whole-home energy planning.
        </p>
      </div>

      <div id="calculator-tool">
        <ApplianceWattageCalculator />
      </div>

      <DirectAnswerCard
        keyword="appliance starting surge & wattage calculation"
        answer="To calculate running wattage from electrical ratings, multiply Voltage by Amperage and Power Factor: Watts = Volts × Amps × cos φ. To calculate starting surge demand for motorized appliances, multiply operating Voltage by nameplate Locked Rotor Amps: Starting VA = Volts × LRA. For generator and battery inverter sizing, equipment must supply the total starting apparent power (kVA) without exceeding permissible voltage sag limits."
        formula="Running Power: P = V × I × cos φ  |  Starting Surge: S_start = V × LRA  |  Daily Energy: E_kWh = (P × Hours × Duty_Cycle) ÷ 1,000"
        standardExample="Single-phase 240V well pump drawing 8.5A run (0.80 PF) with 45A LRA: Running = 240V × 8.5A × 0.80 = 1,632 W; Starting Surge = 240V × 45A = 10,800 VA (10.8 kVA)"
        sourceAuthority="ANSI/NEMA MG 1-2021, IEEE 1459-2025 & NFPA 70-2026 (NEC Article 430/440)"
      />

      {/* Connected Home Energy Planning Pathways */}
      <section id="planning-pathways" style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Connected Home Energy Planning Pathways</h2>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Once you have determined appliance wattage and starting surges, continue your electrical sizing and energy planning workflow across these connected tools:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>📊 Audit Whole-Home Energy</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Combine multiple appliance wattages and runtime schedules into a cumulative daily, monthly, and annual kilowatt-hour load profile.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>💡 Model Total Utility Power Bills</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Project monthly electric bills by applying tiered utility rates, fixed standing charges, and local taxes to your appliance consumption.
            </p>
            <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Energy Bill Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>⚡ Size Emergency Standby Generators</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Stack motor starting surges and calculate generator running kW and surge kVA capacity required to prevent voltage collapse.
            </p>
            <Link href="/home-energy/generator-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Generator Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>🔋 Plan Home Battery Storage</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size residential battery backup capacity (kWh) and verify inverter peak surge output for critical household circuits.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Home Battery Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      <PageJumpNav hasWorkedExample={true} />

      {/* Running Energy vs Starting Surge Distinction */}
      <section id="running-vs-surge" style={{ marginTop: "2.5rem" }}>
        <h2>Running Energy Cost vs. Starting Surge Electrical Sizing</h2>
        <p>
          A fundamental rule of electrical engineering is that <strong>steady-state energy consumption</strong> and <strong>instantaneous starting surge</strong> represent two entirely different physical phenomena requiring distinct planning frameworks:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface, #ffffff)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>1. Running Energy &amp; Operating Cost (kWh)</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink)" }}>
              Electric utility meters record <strong>real electrical work performed over time</strong>. Real active power ($P$) is multiplied by operating duration ($t$):
            </p>
            <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0.5rem 0" }}>
              Energy (kWh) = [Power (W) × Hours] ÷ 1,000<br />
              Cost ($) = Energy (kWh) × Electricity Rate ($/kWh)
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Hourly operating expenses depend entirely on continuous running watts, compressor/heating duty cycle, and volumetric utility tariffs.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface, #ffffff)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>2. Starting Surge &amp; Inrush Capacity (kVA)</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink)" }}>
              Motor startup is a <strong>short-duration electromechanical transient</strong> lasting only 50 to 300 milliseconds. It is governed by apparent power ($S$):
            </p>
            <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0.5rem 0" }}>
              Starting Surge (VA) = Supply Voltage (V) × Locked Rotor Amps (LRA)
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              <strong>Crucial Distinction:</strong> Never multiply brief starting surge watts by an hour. Starting surge determines whether standby generators, battery inverters, transfer switches, and breakers can start the load without voltage collapse—it does not register measurable kilowatt-hours on your electric bill.
            </p>
          </div>
        </div>

        <div className="scenario-table" role="region" aria-label="Electrical sizing implications table">
          <table>
            <caption>System engineering impact: continuous running watts vs. instantaneous starting surge</caption>
            <thead>
              <tr>
                <th scope="col">Electrical System Component</th>
                <th scope="col">Governing Parameter</th>
                <th scope="col">Engineering Failure Mode if Undersized</th>
                <th scope="col">Applicable Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standby Backup Generator</strong></td>
                <td>Subtransient motor starting kVA (at ≤30% voltage dip)</td>
                <td>Engine stall, alternator excitation collapse, output voltage dips below 108V AC tripping load controls</td>
                <td>NEMA MG 1, NFPA 110</td>
              </tr>
              <tr>
                <td><strong>Battery Storage Inverter</strong></td>
                <td>Peak surge rating (typically 1.5×–2.0× continuous for 5–10 seconds)</td>
                <td>Instantaneous inverter shutdown on hardware overcurrent threshold; resets required</td>
                <td>UL 1741, IEEE 1547</td>
              </tr>
              <tr>
                <td><strong>Branch Circuit Breaker</strong></td>
                <td>Inverse-time thermal-magnetic trip curve (NEC 430.52)</td>
                <td>Nuisance magnetic tripping on motor energization before centrifugal switch disengages start winding</td>
                <td>NFPA 70 (NEC Article 430)</td>
              </tr>
              <tr>
                <td><strong>Utility Electricity Bill</strong></td>
                <td>Integrated active real energy (kWh) over 15-to-60 min intervals</td>
                <td>No failure mode; momentary 200 ms surges do not register measurable kWh billing units</td>
                <td>ANSI C12.20, IEEE 1459</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Load Classes */}
      <section id="equipment-classes" style={{ marginTop: "3rem" }}>
        <h2>The Four Appliance Load Classes &amp; Inrush Characteristics</h2>
        <p>
          Electrical loads exhibit vastly different startup behaviors depending on their electromechanical architecture. When planning off-grid solar, battery storage, or standby generators, appliances should be categorized into one of four distinct engineering classes:
        </p>

        <div className="scenario-table" role="region" aria-label="Appliance load classification table">
          <table>
            <caption>Four-tier appliance electrical classification and inrush behavior</caption>
            <thead>
              <tr>
                <th scope="col">Load Class</th>
                <th scope="col">Representative Equipment</th>
                <th scope="col">Operating Power Factor</th>
                <th scope="col">Starting Inrush Multiplier</th>
                <th scope="col">Inrush Mechanics &amp; Sizing Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Class 1: Pure Resistive</strong></td>
                <td>Space heaters, toasters, electric water heaters, incandescent lighting</td>
                <td>1.00 (Unity)</td>
                <td>1.0× (Zero inductive surge)</td>
                <td>Current is strictly governed by Ohm&apos;s Law ($I = V/R$). No locked-rotor inertia. Sized purely on continuous running watts.</td>
              </tr>
              <tr>
                <td><strong>Class 2: Inverter / VFD Driven</strong></td>
                <td>Variable-speed mini-splits, inverter refrigerators, brushless DC pumps</td>
                <td>0.90 – 0.98</td>
                <td>1.1× – 1.3× <em>(Engineering estimate)</em></td>
                <td>Variable Frequency Drives (VFD) rectify AC to DC and ramp frequency gradually, eliminating locked-rotor spikes. <em>Note: Exact starting peak depends on manufacturer DC bus pre-charge circuitry.</em></td>
              </tr>
              <tr>
                <td><strong>Class 3: Standard Single-Phase Motor</strong></td>
                <td>Sump pumps, submersible well pumps, garage door openers, garbage disposals</td>
                <td>0.70 – 0.85 (running)<br />0.40 – 0.55 (starting)</td>
                <td>3.5× – 5.0× of Running Current (RLA)</td>
                <td>Capacitor-start or split-phase induction motors draw heavy inrush until centrifugal switch disengages start winding at ~75% synchronous speed.</td>
              </tr>
              <tr>
                <td><strong>Class 4: High-Inertia HVAC Compressor</strong></td>
                <td>Fixed-speed central air conditioners, traditional heat pumps (without soft start)</td>
                <td>0.82 – 0.90 (running)<br />0.35 – 0.50 (starting)</td>
                <td>Nameplate LRA Lookup (Often 5.0× – 7.0× RLA)</td>
                <td>Compressors starting against differential head pressure draw locked rotor current for 100–300 ms. Best sized using manufacturer nameplate LRA (Starting VA = V × LRA).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sizing Matrix & Hourly Operating Cost */}
      <section id="sizing-matrix">
        <h2>Appliance Wattage, Starting Surge &amp; Hourly Operating Cost Benchmark Table</h2>
        <p>
          Reference power ratings, locked rotor amperage benchmarks, typical operating power factors, and estimated hourly operating costs across common household appliances:
        </p>
        <div className="scenario-table" role="region" aria-label="Household appliance wattage, starting surge, and operating cost reference table">
          <table>
            <caption>Household appliance electrical specifications, starting surge parameters, and hourly electricity costs</caption>
            <thead>
              <tr>
                <th scope="col">Appliance Category</th>
                <th scope="col">Nominal Voltage &amp; Current</th>
                <th scope="col">Power Factor (cos φ)</th>
                <th scope="col">Running Power (Watts)</th>
                <th scope="col">Starting Surge Method &amp; Demand</th>
                <th scope="col">Duty Cycle</th>
                <th scope="col">Hourly Energy (Active Run)</th>
                <th scope="col">Hourly Cost (@ 18.34¢/kWh)*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Refrigerator / Freezer</strong> (Single-Speed Compressor)</td>
                <td>120V · 1.6A run</td>
                <td>0.80 lag</td>
                <td>150 W</td>
                <td>1,200 VA (Nameplate 10A LRA)</td>
                <td>35% (cycling)</td>
                <td>0.053 kWh/hr (0.150 kWh/hr run)</td>
                <td>$0.010/hr ($0.028/hr run)</td>
              </tr>
              <tr>
                <td><strong>Inverter Refrigerator</strong> (Variable-Speed Linear Compressor)</td>
                <td>120V · 0.8A run</td>
                <td>0.95 lag</td>
                <td>90 W</td>
                <td>~120 VA peak (Soft-start VFD)</td>
                <td>45% (modulating)</td>
                <td>0.041 kWh/hr (0.090 kWh/hr run)</td>
                <td>$0.007/hr ($0.017/hr run)</td>
              </tr>
              <tr>
                <td><strong>Submersible Well Pump (0.75 HP)</strong></td>
                <td>240V · 6.5A run</td>
                <td>0.77 lag</td>
                <td>1,200 W</td>
                <td>6,720 VA (Nameplate 28A LRA)</td>
                <td>10% intermittent</td>
                <td>0.120 kWh/hr (1.200 kWh/hr run)</td>
                <td>$0.022/hr ($0.220/hr run)</td>
              </tr>
              <tr>
                <td><strong>Residential Sump Pump (0.5 HP)</strong></td>
                <td>120V · 7.2A run</td>
                <td>0.82 lag</td>
                <td>709 W</td>
                <td>4,560 VA (Nameplate 38A LRA)</td>
                <td>20% storm duty</td>
                <td>0.142 kWh/hr (0.709 kWh/hr run)</td>
                <td>$0.026/hr ($0.130/hr run)</td>
              </tr>
              <tr>
                <td><strong>Central Air Conditioner (3-Ton Standard Single-Phase)</strong></td>
                <td>240V · 17.5A run</td>
                <td>0.83 lag</td>
                <td>3,500 W</td>
                <td>19,680 VA (Nameplate 82A LRA)</td>
                <td>50% summer duty</td>
                <td>1.750 kWh/hr (3.500 kWh/hr run)</td>
                <td>$0.321/hr ($0.642/hr run)</td>
              </tr>
              <tr>
                <td><strong>Central Air Conditioner (3-Ton with Electronic Soft Starter)</strong></td>
                <td>240V · 17.5A run</td>
                <td>0.83 lag</td>
                <td>3,500 W</td>
                <td>6,720 VA (28A limited inrush)</td>
                <td>50% summer duty</td>
                <td>1.750 kWh/hr (3.500 kWh/hr run)</td>
                <td>$0.321/hr ($0.642/hr run)</td>
              </tr>
              <tr>
                <td><strong>Mini-Split Heat Pump (1.5-Ton Inverter Driven)</strong></td>
                <td>240V · 5.3A run</td>
                <td>0.94 lag</td>
                <td>1,200 W</td>
                <td>~1,500 VA peak (Inverter ramp)</td>
                <td>60% modulating</td>
                <td>0.720 kWh/hr (1.200 kWh/hr run)</td>
                <td>$0.132/hr ($0.220/hr run)</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater (Convection / Oil)</strong></td>
                <td>120V · 12.5A run</td>
                <td>1.00 (unity)</td>
                <td>1,500 W</td>
                <td>N/A (Resistive — No motor LRA; 1,500 VA continuous)</td>
                <td>100% active</td>
                <td>1.500 kWh/hr runtime</td>
                <td>$0.275/hr active</td>
              </tr>
              <tr>
                <td><strong>Electric Storage Water Heater (50-Gal)</strong></td>
                <td>240V · 18.75A run</td>
                <td>1.00 (unity)</td>
                <td>4,500 W</td>
                <td>N/A (Resistive — No motor LRA; 4,500 VA continuous)</td>
                <td>15% recovery</td>
                <td>0.675 kWh/hr (4.500 kWh/hr run)</td>
                <td>$0.124/hr ($0.825/hr run)</td>
              </tr>
              <tr>
                <td><strong>Microwave Oven (1,000W Output Rating)</strong></td>
                <td>120V · 12.0A run</td>
                <td>0.97 lag</td>
                <td>1,400 W</td>
                <td>~2,100 VA (transformer magnetizing)</td>
                <td>100% active</td>
                <td>1.400 kWh/hr runtime</td>
                <td>$0.257/hr runtime (~$0.021/5-min)</td>
              </tr>
              <tr>
                <td><strong>Electric Clothes Dryer (240V)</strong></td>
                <td>240V · 22.0A run</td>
                <td>0.98 lag</td>
                <td>5,000 W</td>
                <td>5,800 VA (motor startup inrush)</td>
                <td>100% active</td>
                <td>5.000 kWh/hr runtime</td>
                <td>$0.917/hr runtime (~$0.69/cycle)</td>
              </tr>
              <tr>
                <td><strong>Washing Machine (Top-Load Agitator)</strong></td>
                <td>120V · 5.5A run</td>
                <td>0.76 lag</td>
                <td>500 W</td>
                <td>2,200 VA (agitation motor inrush)</td>
                <td>100% active</td>
                <td>0.500 kWh/hr runtime</td>
                <td>$0.092/hr runtime (~$0.07/cycle)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
          <strong>*National Electricity Cost Benchmark:</strong> Estimated hourly operating costs are calculated using the <strong>U.S. Energy Information Administration (EIA) Electric Power Monthly</strong> national residential average rate of <strong>18.34¢/kWh ($0.1834/kWh)</strong> published for June 2026 (January–June 2026 YTD average: 18.16¢/kWh). This figure is an illustrative national benchmark and does not represent an individual utility tariff; retail utility rates vary significantly across service territories (ranging from ~11¢ to over 33¢/kWh). Use the interactive calculator above to calculate costs at your exact utility rate.<br />
          <strong>Critical Engineering Data Rule:</strong> For motorized and compressor loads, actual starting surge is strictly governed by manufacturer nameplate Locked Rotor Amps (LRA) and NEMA MG 1 code letters. Values shown above reflect source-backed typical ranges and illustrative modeled scenarios. Manufacturer nameplate data and equipment documentation always supersede generic multiplier rules.
        </p>
      </section>

      {/* Worked Engineering Example */}
      <section id="worked-example" style={{ marginTop: "3rem" }}>
        <h2>Worked Engineering Example: Motor Inrush vs. Operating Cost</h2>
        <p>
          To illustrate how running watts, motor starting surge (LRA), and electricity operating costs interact during emergency generator and battery backup sizing, consider an illustrative modeled scenario of a <strong>residential 0.5 HP submersible sump pump</strong> operating on a 120V dedicated branch circuit:
        </p>

        <div style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--line)", borderRadius: "0.5rem", padding: "1.25rem 1.5rem", margin: "1rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 1: Identify Manufacturer Nameplate Specifications
          </h3>
          <ul style={{ margin: "0 0 1rem 1.25rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <li><strong>Supply Voltage (V):</strong> 120 V AC, single-phase, 60 Hz</li>
            <li><strong>Full Load Amps (I / FLA):</strong> 7.2 A continuous running current</li>
            <li><strong>Operating Power Factor (cos φ):</strong> 0.82 lagging (typical capacitor-start induction motor)</li>
            <li><strong>Nameplate Locked Rotor Amps (LRA):</strong> 38.0 A (NEMA Code Letter J motor)</li>
          </ul>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 2: Calculate Continuous Running Real Power
          </h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
            The continuous real active electrical power (P) drawn by the pump motor while discharging water is:
          </p>
          <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0 0 1rem" }}>
            P = V × I × cos φ = 120 V × 7.2 A × 0.82 = 708.48 W ≈ 709 Watts (0.709 kW)
          </div>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 3: Calculate Electromechanical Starting Inrush Apparent Power
          </h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
            At the instant the pump float switch closes, the motor rotor is stationary (slip s = 1.0) with zero counter-electromotive force. The instantaneous starting apparent power (S_start) drawn from the power source is:
          </p>
          <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0 0 1rem" }}>
            S_start = V × LRA = 120 V × 38.0 A = 4,560 VA = 4.56 kVA
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.5 }}>
            During locked-rotor standstill, motor power factor drops to approximately 0.45 lagging, drawing an active real starting power peak of 4,560 VA × 0.45 ≈ 2,052 Watts for approximately 150 to 250 milliseconds.
          </p>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 4: Evaluate Standby Generator &amp; Battery Inverter Sizing
          </h3>
          <ul style={{ margin: "0 0 1rem 1.25rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <li><strong>Standby Generator:</strong> If the generator is sized solely to handle the 709W running power, the alternator voltage will collapse upon pump energization. The generator must provide at least <strong>4.56 kVA motor-starting capacity</strong> at a maximum 30% permissible voltage dip.</li>
            <li><strong>Battery Storage Inverter:</strong> The inverter must support a peak surge current of <strong>38A at 120V (4.56 kVA)</strong> without tripping its instantaneous hardware overcurrent protection.</li>
            <li><strong>Branch Circuit Breaker:</strong> Per NEC Article 430.52, the branch circuit must utilize an inverse-time circuit breaker rated to absorb the 38A inrush without false magnetic tripping.</li>
          </ul>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 5: Calculate Energy Consumption &amp; Hourly Operating Cost
          </h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
            Assuming heavy rainfall causes the pump to run 12 minutes per clock hour (20% operating duty cycle):
          </p>
          <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0 0 0.5rem" }}>
            Hourly Energy (kWh) = (709 W × 0.20 hours) ÷ 1,000 = 0.1418 kWh/hr<br />
            Hourly Operating Cost = 0.1418 kWh × $0.1834/kWh = $0.0260/hr (~2.6¢ per operating hour)
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0", lineHeight: 1.5 }}>
            <strong>Why Starting Surge Does Not Impact Bills:</strong> The 38A starting inrush lasts only ~200 milliseconds (0.000055 hours). The total energy consumed during startup is (2,052 W × 0.000055 hrs) ÷ 1,000 ≈ 0.00011 kWh, representing less than $0.00002. This confirms that motor inrush is strictly an equipment sizing constraint, not a driver of energy costs.
          </p>
        </div>
      </section>

      {/* Primary Engineering Method */}
      <section id="lra-math-guide">
        <h2>Primary Engineering Method: Sizing Starting Surge from Nameplate LRA</h2>
        <p>
          To determine whether a backup generator or off-grid inverter can start a motor-driven load, rely on the manufacturer nameplate <strong>Locked Rotor Amps (LRA)</strong> rating rather than generic wattage multipliers:
        </p>
        <ol>
          <li><strong>Locate the Equipment Data Tag:</strong> Find the metal nameplate on the compressor housing, motor casing, or pump controller. Identify the <strong>LRA</strong> value and operating <strong>Voltage (V)</strong>.</li>
          <li><strong>Compute Starting Apparent Power (VA):</strong> Multiply rated Voltage by LRA:
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace" }}>
              Starting Apparent Power (VA) = Voltage (V) × Locked Rotor Amps (LRA)
            </div>
          </li>
          <li><strong>Estimate Real Starting Watts (W):</strong> During locked-rotor startup, motor winding power factor drops significantly (Starting PF ≈ 0.40 to 0.55 lagging). Real starting power equals:
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace" }}>
              Starting Real Power (W) = Starting Apparent Power (VA) × Starting Power Factor (~0.50)
            </div>
          </li>
          <li><strong>Verify Generator Subtransient Capability:</strong> Ensure the standby generator has sufficient motor-starting kVA capacity (specified as kVA at 30% allowable voltage dip) to prevent voltage collapse below 108V AC.</li>
        </ol>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Electrical Power, Inrush &amp; Operating Cost Equations"
          formula="P = V × I × cos φ  |  S_start = V × LRA  |  E_kWh = (P × Hours × Duty_Cycle) ÷ 1,000  |  Cost = E_kWh × Rate"
          formulaDescription="Defines steady-state real active electrical power, electromechanical locked-rotor apparent starting surge, cumulative energy consumption, and retail utility operating costs."
          variables={[
            { symbol: "V", label: "RMS Supply Voltage", description: "Nominal root-mean-square line voltage (120V / 240V AC, ANSI C84.1).", unit: "V" },
            { symbol: "I", label: "Running Current (FLA / RLA)", description: "Continuous operating current draw under rated mechanical load.", unit: "A" },
            { symbol: "cos φ", label: "Operating Power Factor", description: "Cosine of phase angle between voltage and current (1.0 for resistive, 0.75–0.85 for induction motors).", unit: "dimensionless" },
            { symbol: "LRA", label: "Locked Rotor Amperes", description: "Maximum inrush current drawn by stationary motor at moment of energization (s = 1.0, ANSI/NEMA MG 1).", unit: "A" },
            { symbol: "Duty_Cycle", label: "Cycling Ratio", description: "Fraction of clock time equipment actively draws power under thermostat or pressure switch control.", unit: "fraction" },
            { symbol: "Rate", label: "Electricity Tariff", description: "Volumetric retail electricity rate ($/kWh, U.S. EIA residential benchmark: $0.1834/kWh).", unit: "$/kWh" },
          ]}
          notes={[
            "Real Power (Watts) performs physical work and generates heat: P = V × I × cos φ.",
            "Apparent Power (VA) governs conductor ampacity, breaker tripping, and generator core saturation: S = V × I.",
            "Backup generator and inverter sizing must satisfy both continuous running kW and instantaneous starting kVA.",
            "Starting inrush transients (50–300 ms) do not add measurable kilowatt-hours to utility billing meters.",
          ]}
        />
      </div>

      {/* Standards & Technical References */}
      <section id="standards-reference" style={{ margin: "2.5rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.5rem", background: "var(--soft, #f8fafc)", border: "1px solid var(--line)" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--ink)" }}>
          📚 Authoritative Engineering Standards &amp; Data Sources
        </h3>
        <ul style={{ margin: "0 0 0 1.25rem", fontSize: "0.86rem", color: "var(--muted)", lineHeight: 1.7 }}>
          <li><strong>ANSI/NEMA MG 1-2021:</strong> <em>Motors and Generators</em> — Section I, Part 10: Locked Rotor kVA Code Letters and Inrush Current Limits for Single-Phase and Polyphase Induction Motors.</li>
          <li><strong>IEEE 1459-2025:</strong> <em>Standard Definitions for the Measurement of Electric Power Quantities Under Sinusoidal, Nonsinusoidal, Balanced, or Unbalanced Conditions</em> — Real, Reactive, and Apparent Power Formulation.</li>
          <li><strong>NFPA 70-2026 (National Electrical Code):</strong> Article 430 (Motors, Motor Circuits, and Controllers) &amp; Article 440 (Air-Conditioning and Refrigerating Equipment) — Branch Circuit Sizing and Overcurrent Protection.</li>
          <li><strong>U.S. Energy Information Administration (EIA):</strong> <em>Electric Power Monthly</em> (Table 5.6.A) — National Average Residential Electricity Price of 18.34¢/kWh published June 2026 (Jan–Jun 2026 YTD average: 18.16¢/kWh).</li>
          <li><strong>ANSI C84.1-2020:</strong> <em>Electric Power Systems and Equipment — Voltage Ratings (60 Hz)</em> — Utilization Voltage Range A (108V–126V nominal 120V).</li>
          <li><strong>U.S. DOE 10 CFR Part 430:</strong> <em>Energy Conservation Program for Consumer Products</em> — Federal test procedures and energy conservation standards for residential appliances (note: DOE test procedures govern annual energy efficiency metrics, not motor LRA or starting inrush).</li>
        </ul>
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
        <h2>Related Energy &amp; Backup Sizing Tools</h2>
        <p>
          Size backup generators for high inrush loads with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>, model battery backup discharge with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, evaluate whole-home consumption using the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>, or model monthly electric bills in the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

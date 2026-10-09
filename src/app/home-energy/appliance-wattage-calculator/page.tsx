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
  description: "Calculate appliance running watts, motor starting apparent power (VA) from nameplate LRA, and daily electricity costs based on U.S. EIA benchmarks.",
  canonicalPath: "/home-energy/appliance-wattage-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How do you calculate appliance wattage from volts and amps?",
    answer:
      "For direct current (DC) and purely resistive alternating current (AC) loads, multiply Voltage by Amperage: Watts = Volts × Amps. For AC inductive loads containing electric motors or transformers, multiply by the operating power factor (cos φ): Watts = Volts × Amps × Power Factor. The product of Volts and Amps alone gives apparent power in Volt-Amps (VA).",
  },
  {
    question: "What is Locked Rotor Amps (LRA) and how does it determine starting surge?",
    answer:
      "Locked Rotor Amps (LRA) is the root-mean-square (RMS) current drawn by an electric motor when voltage is applied with the rotor stationary at zero speed (slip s = 1.0). In this state, there is zero back-electromotive force (back-EMF), so current is limited only by winding impedance. Starting Apparent Power equals Volts × LRA (expressed in VA or kVA). Single-phase induction motors typically exhibit starting inrush currents 3.5× to 7.0× their running full load amps (FLA/RLA).",
  },
  {
    question: "Does starting surge wattage increase your electric utility bill?",
    answer:
      "Because motor starting is brief, its energy contribution is normally negligible compared with sustained operating consumption, although the exact contribution depends on current, power factor and transient duration. Electric utility meters record cumulative kilowatt-hours (Energy = Power × Time). Sustained continuous running watts and operating duty cycle determine utility billing, while starting surge (kVA) is an instantaneous equipment capacity sizing constraint for generators and inverters.",
  },
  {
    question: "Why do backup generators and battery inverters trip on motor startup?",
    answer:
      "Inductive motors during starting operate at a low power factor (typically 0.35 to 0.55 lagging), demanding massive instantaneous apparent power (kVA surge). If the backup generator cannot supply the required motor-starting kVA or if the battery inverter hits its peak surge current limit, the output voltage sags, which can cause under-voltage or overcurrent protection to trip.",
  },
  {
    question: "Do inverter-driven appliances require high starting surge capacity?",
    answer:
      "Inverter-driven equipment (such as modern variable-speed mini-splits and inverter refrigerators) utilizes variable frequency drives (VFD) that ramp voltage and frequency gradually. This soft-start behavior generally avoids the large locked-rotor inrush of conventional single-speed compressors, though actual peak starting current depends on the manufacturer's DC bus and control electronics.",
  },
  {
    question: "What is the difference between real power (Watts) and apparent power (Volt-Amps)?",
    answer:
      "Real power (Watts) is the actual energy consumed to perform physical work or generate heat (P = V × I × cos φ). Apparent power (Volt-Amps, VA) represents the total vector product of voltage and current in an AC circuit (S = V × I). Electrical wiring, transformers, generators, and inverters must be evaluated for apparent power (VA / kVA), whereas utility energy meters bill primarily for real power (kWh).",
  },
];

export default function ApplianceWattagePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Appliance Wattage & Starting Surge Calculator",
    description: "Calculate appliance running watts, motor starting apparent power (VA) from nameplate Locked Rotor Amps (LRA), and daily kWh energy consumption with U.S. EIA electricity cost modeling.",
    route: "/home-energy/appliance-wattage-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Converts nameplate Volts and Amps to continuous running Watts with power factor adjustment",
      "Calculates starting surge apparent power (VA / kVA) directly from nameplate Locked Rotor Amps (LRA)",
      "Four-tier equipment load classification: Resistive, Inverter/VFD, Standard Inductive Motor, High-Inertia HVAC Compressor",
      "Evaluates backup generator and battery inverter starting kVA demand indicators vs continuous running kW",
      "Projects hourly, daily, and monthly electricity operating costs based on U.S. EIA Electric Power Monthly benchmarks",
    ],
    standards: [
      "ANSI/NEMA MG 1 (Motors and Generators — Locked Rotor kVA Reference)",
      "IEEE 1459 (Definitions for the Measurement of Electric Power Quantities)",
      "NFPA 70 / National Electrical Code (NEC) Article 430 & 440 (Motors & Refrigerating Equipment Reference)",
      "DOE 10 CFR Part 430 (Energy Conservation Standards for Consumer Products Reference)",
      "ANSI C84.1 (Electric Power Systems and Equipment — Voltage Ratings 60 Hz Reference)",
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
          Calculate continuous running power (Watts), electromechanical starting surge apparent power (VA) from nameplate Locked Rotor Amps (LRA), and electricity operating costs for backup generator, battery storage inverter, and whole-home energy planning.
        </p>
      </div>

      <div id="calculator-tool">
        <ApplianceWattageCalculator />
      </div>

      <DirectAnswerCard
        keyword="appliance starting surge & wattage calculation"
        answer="To calculate continuous running wattage from electrical ratings, multiply Voltage by Amperage and Power Factor: Watts = Volts × Amps × cos φ. To calculate electromechanical starting surge demand for motorized appliances, multiply operating Voltage by nameplate Locked Rotor Amps: Starting VA = Volts × LRA. For generator and battery inverter planning, equipment must handle both running real power (kW) and starting apparent power (kVA)."
        formula="Running Power: P = V × I × cos φ  |  Starting Apparent Surge: S_start = V × LRA  |  Daily Energy: E_kWh = (P × Hours × Duty_Cycle) ÷ 1,000"
        formulaTitle="Calculation Formulas"
        standardExample="Single-phase 240V well pump drawing 8.5A run (0.80 PF) with 45A LRA: Running = 240V × 8.5A × 0.80 = 1,632 W; Starting Apparent Surge = 240V × 45A = 10,800 VA (10.8 kVA)"
        sourceAuthority="ANSI/NEMA MG 1, IEEE 1459 & NFPA 70 (NEC Article 430/440)"
        sourceAuthorityLabel="Technical References & Model Basis:"
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
          A fundamental rule of electrical planning is that <strong>steady-state energy consumption</strong> and <strong>instantaneous starting surge</strong> represent two entirely different physical phenomena requiring distinct sizing frameworks:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "125rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface, #ffffff)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>1. Running Energy &amp; Operating Cost (kWh)</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink)" }}>
              Electric utility meters record <strong>real electrical work performed over time</strong>. Real active power ($P$) is multiplied by scheduled runtime ($t$) and duty cycle:
            </p>
            <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0.5rem 0" }}>
              Daily Energy (kWh) = [Running Watts (W) × Runtime (h) × Duty Cycle] ÷ 1,000<br />
              Cost ($) = Daily Energy (kWh) × Electricity Rate ($/kWh)
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Operating expenses depend entirely on continuous running watts, cycling duty cycle, and volumetric utility tariffs.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface, #ffffff)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>2. Starting Surge &amp; Inrush Capacity (VA / kVA)</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink)" }}>
              Motor starting transients are short-duration events (duration varies by motor, load, control method and operating conditions). Starting demand is governed by apparent power ($S$):
            </p>
            <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0.5rem 0" }}>
              Starting Apparent Power (VA) = Supply Voltage (V) × Locked Rotor Amps (LRA)
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              <strong>Important Distinction:</strong> Never multiply momentary starting surge by operating hours. Starting apparent surge (kVA) helps determine whether standby generators and battery inverters can start the load without voltage collapse—it does not drive cumulative kilowatt-hour energy billing.
            </p>
          </div>
        </div>

        <div className="scenario-table" role="region" aria-label="Electrical sizing implications table">
          <table>
            <caption>System planning considerations: continuous running watts vs. instantaneous starting surge</caption>
            <thead>
              <tr>
                <th scope="col">Electrical System Component</th>
                <th scope="col">Primary Sizing Parameter</th>
                <th scope="col">Engineering Failure Mode if Undersized</th>
                <th scope="col">Applicable Reference Standards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standby Backup Generator</strong></td>
                <td>Motor-starting apparent power (kVA) and voltage regulation</td>
                <td>Engine stall or alternator voltage sag under sudden inductive starting inrush</td>
                <td>NEMA MG 1, NFPA 110</td>
              </tr>
              <tr>
                <td><strong>Battery Storage Inverter</strong></td>
                <td>Peak surge output rating and duration capability</td>
                <td>Instantaneous inverter shutdown on hardware overcurrent threshold</td>
                <td>UL 1741, IEEE 1547</td>
              </tr>
              <tr>
                <td><strong>Branch Circuit Breaker</strong></td>
                <td>Motor FLA, conductor ampacity, and trip characteristics</td>
                <td>Nuisance magnetic tripping on motor energization before motor reaches operating speed</td>
                <td>NFPA 70 (NEC Article 430 &amp; 440)</td>
              </tr>
              <tr>
                <td><strong>Utility Electricity Bill</strong></td>
                <td>Integrated active real energy (kWh) over billing period</td>
                <td>No failure mode; momentary transients contribute negligibly to cumulative energy billing</td>
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
          Electrical loads exhibit different startup behaviors depending on their electromechanical architecture. When planning off-grid solar, battery storage, or standby generators, appliances are typically categorized into four planning classes (typical planning ranges — manufacturer data supersedes these estimates):
        </p>

        <div className="scenario-table" role="region" aria-label="Appliance load classification table">
          <table>
            <caption>Four-tier appliance electrical classification and inrush behavior (typical planning ranges)</caption>
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
                <td>1.1× – 1.3× <em>(Planning estimate)</em></td>
                <td>Variable Frequency Drives (VFD) rectify AC to DC and ramp frequency gradually, reducing locked-rotor spikes. <em>Note: Actual peak current depends on manufacturer electronics and DC bus design.</em></td>
              </tr>
              <tr>
                <td><strong>Class 3: Standard Single-Phase Motor</strong></td>
                <td>Sump pumps, submersible well pumps, garage door openers, garbage disposals</td>
                <td>0.70 – 0.85 (running)<br />0.40 – 0.55 (starting)</td>
                <td>3.5× – 5.0× of Running Current (RLA)</td>
                <td>Capacitor-start or split-phase induction motors draw heavy inrush until the centrifugal switch disengages the start winding.</td>
              </tr>
              <tr>
                <td><strong>Class 4: High-Inertia HVAC Compressor</strong></td>
                <td>Fixed-speed central air conditioners, traditional heat pumps (without soft start)</td>
                <td>0.82 – 0.90 (running)<br />0.35 – 0.50 (starting)</td>
                <td>Nameplate LRA (Often 5.0× – 7.0× RLA)</td>
                <td>Compressors starting against differential head pressure draw locked rotor current during startup. Best sized using manufacturer nameplate LRA (Starting VA = V × LRA).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sizing Matrix & Hourly Operating Cost */}
      <section id="sizing-matrix">
        <h2>Appliance Wattage, Starting Surge &amp; Hourly Operating Cost Benchmark Table</h2>
        <p>
          Illustrative planning examples only. Values are not manufacturer specifications. Actual nameplate ratings, measured power and manufacturer starting-current data should be used whenever available:
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
                <th scope="col">Starting Demand (VA / W)</th>
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
                <td>~120 VA (Illustrative soft-start estimate)</td>
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
                <td>~6,720 VA (Illustrative ~28A reduced inrush)</td>
                <td>50% summer duty</td>
                <td>1.750 kWh/hr (3.500 kWh/hr run)</td>
                <td>$0.321/hr ($0.642/hr run)</td>
              </tr>
              <tr>
                <td><strong>Mini-Split Heat Pump (1.5-Ton Inverter Driven)</strong></td>
                <td>240V · 5.3A run</td>
                <td>0.94 lag</td>
                <td>1,200 W</td>
                <td>~1,500 VA (Illustrative inverter ramp)</td>
                <td>60% modulating</td>
                <td>0.720 kWh/hr (1.200 kWh/hr run)</td>
                <td>$0.132/hr ($0.220/hr run)</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater (Convection / Oil)</strong></td>
                <td>120V · 12.5A run</td>
                <td>1.00 (unity)</td>
                <td>1,500 W</td>
                <td>Resistive — No motor LRA (1,500 VA)</td>
                <td>100% active</td>
                <td>1.500 kWh/hr runtime</td>
                <td>$0.275/hr active</td>
              </tr>
              <tr>
                <td><strong>Electric Storage Water Heater (50-Gal)</strong></td>
                <td>240V · 18.75A run</td>
                <td>1.00 (unity)</td>
                <td>4,500 W</td>
                <td>Resistive — No motor LRA (4,500 VA)</td>
                <td>15% recovery</td>
                <td>0.675 kWh/hr (4.500 kWh/hr run)</td>
                <td>$0.124/hr ($0.825/hr run)</td>
              </tr>
              <tr>
                <td><strong>Microwave Oven (1,000W Output Rating)</strong></td>
                <td>120V · 12.0A run</td>
                <td>0.97 lag</td>
                <td>1,400 W</td>
                <td>~2,100 VA (transformer magnetizing inrush)</td>
                <td>100% active</td>
                <td>1.400 kWh/hr runtime</td>
                <td>$0.257/hr runtime (~$0.021/5-min)</td>
              </tr>
              <tr>
                <td><strong>Electric Clothes Dryer (240V)</strong></td>
                <td>240V · 22.0A run</td>
                <td>0.98 lag</td>
                <td>5,000 W</td>
                <td>~5,800 VA (motor startup inrush)</td>
                <td>100% active</td>
                <td>5.000 kWh/hr runtime</td>
                <td>$0.917/hr runtime (~$0.69/cycle)</td>
              </tr>
              <tr>
                <td><strong>Washing Machine (Top-Load Agitator)</strong></td>
                <td>120V · 5.5A run</td>
                <td>0.76 lag</td>
                <td>500 W</td>
                <td>~2,200 VA (agitation motor inrush)</td>
                <td>100% active</td>
                <td>0.500 kWh/hr runtime</td>
                <td>$0.092/hr runtime (~$0.07/cycle)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
          <strong>*National Electricity Cost Benchmark:</strong> Estimated hourly operating costs are calculated using the <strong>U.S. Energy Information Administration (EIA) Electric Power Monthly</strong> national residential average rate of <strong>18.34¢/kWh ($0.1834/kWh)</strong> published for June 2026 (January–June 2026 YTD average: 18.16¢/kWh). This figure is an illustrative national benchmark and does not represent an individual utility tariff; retail utility rates vary significantly across service territories. Use the interactive calculator above to calculate costs at your exact utility rate.<br />
          <strong>Engineering Note:</strong> For motorized and compressor loads, actual starting surge is governed by manufacturer nameplate Locked Rotor Amps (LRA) and equipment specifications. Values shown above reflect illustrative planning examples. Manufacturer nameplate data and equipment documentation always supersede generic estimates.
        </p>
      </section>

      {/* Worked Engineering Example */}
      <section id="worked-example" style={{ marginTop: "3rem" }}>
        <h2>Worked Engineering Example: Motor Inrush vs. Operating Cost</h2>
        <p>
          To illustrate how running watts, motor starting surge apparent power (LRA), and electricity operating costs interact during emergency generator and battery backup planning, consider an illustrative modeled scenario of a <strong>residential 0.5 HP submersible sump pump</strong> operating on a 120V branch circuit:
        </p>

        <div style={{ background: "var(--surface, #ffffff)", border: "1px solid var(--line)", borderRadius: "0.5rem", padding: "1.25rem 1.5rem", margin: "1rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 1: Identify Nameplate Specifications
          </h3>
          <ul style={{ margin: "0 0 1rem 1.25rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <li><strong>Supply Voltage (V):</strong> 120 V AC, single-phase, 60 Hz</li>
            <li><strong>Full Load Amps (I / FLA):</strong> 7.2 A continuous running current</li>
            <li><strong>Operating Power Factor (cos φ):</strong> 0.82 lagging (typical capacitor-start induction motor)</li>
            <li><strong>Nameplate Locked Rotor Amps (LRA):</strong> 38.0 A (Illustrative motor example using a stated 38A nameplate LRA)</li>
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
            Assuming a starting power factor of approximately 0.45 to 0.50 lagging during locked-rotor standstill, the active real starting power peak is approximately 4,560 VA × 0.45 ≈ 2,052 Watts during the initial startup transient.
          </p>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 4: Evaluate Standby Generator, Inverter &amp; Circuit Considerations
          </h3>
          <ul style={{ margin: "0 0 1rem 1.25rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <li><strong>Standby Generator:</strong> The calculated starting kVA (4.56 kVA) indicates the motor&apos;s instantaneous apparent-power demand. Actual generator selection must also verify the generator manufacturer&apos;s motor-starting/transient capability and allowable voltage/frequency deviation.</li>
            <li><strong>Battery Storage Inverter:</strong> Battery inverters must be checked against both continuous output and manufacturer-rated surge/peak capability. Actual motor-start compatibility depends on the inverter&apos;s transient response, duration rating, current limit and the motor load.</li>
            <li><strong>Branch Circuit Breaker:</strong> Actual branch-circuit breaker and conductor sizing depends on motor FLA, conductor ampacity, applicable code provisions, equipment instructions, and the specific motor/application. LRA is an important starting characteristic but does not by itself determine the breaker rating.</li>
          </ul>

          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Step 5: Calculate Energy Consumption &amp; Hourly Operating Cost
          </h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
            Assuming heavy rainfall causes the pump to run 12 minutes per clock hour (20% operating duty cycle):
          </p>
          <div style={{ padding: "0.6rem 0.8rem", background: "var(--soft, #f8fafc)", borderRadius: "0.35rem", fontFamily: "monospace", fontSize: "0.85rem", margin: "0 0 0.5rem" }}>
            Hourly Energy (kWh) = (709 W × 1 hr × 0.20) ÷ 1,000 = 0.1418 kWh/hr<br />
            Hourly Operating Cost = 0.1418 kWh × $0.1834/kWh = $0.0260/hr (~2.6¢ per operating hour)
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0", lineHeight: 1.5 }}>
            <strong>Why Starting Surge Does Not Impact Energy Bills:</strong> Because motor starting is brief, its energy contribution is normally negligible compared with sustained operating consumption, although the exact contribution depends on current, power factor and transient duration. Motor inrush is strictly an equipment sizing constraint, not a driver of volumetric energy costs.
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
          <li><strong>Estimate Real Starting Watts (W):</strong> During locked-rotor startup, motor winding power factor drops (e.g. ~0.40 to 0.55 lagging). Real starting power can be estimated as:
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace" }}>
              Starting Real Power (W) = Starting Apparent Power (VA) × Starting Power Factor (~0.50 assumption)
            </div>
          </li>
          <li><strong>Verify Generator &amp; Inverter Transient Capability:</strong> Ensure the power source has sufficient motor-starting kVA surge capacity to prevent excessive voltage sag.</li>
        </ol>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Appliance Power, Inrush &amp; Operating Cost Formulas"
          formula="P = V × I × cos φ  |  S_start = V × LRA  |  E_kWh = (P × Hours × Duty_Cycle) ÷ 1,000  |  Cost = E_kWh × Rate"
          formulaDescription="Defines steady-state real active electrical power, electromechanical locked-rotor apparent starting surge, cumulative energy consumption, and retail utility operating costs."
          variables={[
            { symbol: "V", label: "RMS Supply Voltage", description: "Nominal root-mean-square line voltage (120V / 240V AC).", unit: "V" },
            { symbol: "I", label: "Running Current (FLA / RLA)", description: "Continuous operating current draw under rated mechanical load.", unit: "A" },
            { symbol: "cos φ", label: "Operating Power Factor", description: "Cosine of phase angle between voltage and current (1.0 for resistive, 0.75–0.85 for induction motors).", unit: "dimensionless" },
            { symbol: "LRA", label: "Locked Rotor Amperes", description: "Inrush current drawn by stationary motor at moment of energization (s = 1.0).", unit: "A" },
            { symbol: "Hours", label: "Scheduled Runtime", description: "Scheduled or available operating hours per day.", unit: "hours" },
            { symbol: "Duty_Cycle", label: "Duty Cycle", description: "Fraction of scheduled operating hours equipment actively draws full running power.", unit: "fraction" },
            { symbol: "Rate", label: "Electricity Tariff", description: "Volumetric retail electricity rate ($/kWh, U.S. EIA residential benchmark: $0.1834/kWh).", unit: "$/kWh" },
          ]}
          notes={[
            "Real Power (Watts) performs physical work and generates heat: P = V × I × cos φ.",
            "Apparent Power (VA) governs conductor ampacity, breaker characteristics, and generator sizing: S = V × I.",
            "Backup generator and inverter planning must evaluate both continuous running kW and instantaneous starting kVA demand.",
            "Starting inrush transients do not add measurable kilowatt-hours to utility billing meters.",
          ]}
        />
      </div>

      {/* Standards & Technical References */}
      <section id="standards-reference" style={{ margin: "2.5rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.5rem", background: "var(--soft, #f8fafc)", border: "1px solid var(--line)" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--ink)" }}>
          📚 Technical References &amp; Model Basis
        </h3>
        <ul style={{ margin: "0 0 0 1.25rem", fontSize: "0.86rem", color: "var(--muted)", lineHeight: 1.7 }}>
          <li><strong>ANSI/NEMA MG 1:</strong> <em>Motors and Generators</em> — Locked Rotor kVA Code Letters and Inrush Current Reference.</li>
          <li><strong>IEEE 1459:</strong> <em>Standard Definitions for the Measurement of Electric Power Quantities</em> — Real, Reactive, and Apparent Power Formulation.</li>
          <li><strong>NFPA 70 (National Electrical Code):</strong> Article 430 (Motors, Motor Circuits, and Controllers) &amp; Article 440 (Air-Conditioning and Refrigerating Equipment) — Electrical Sizing Reference.</li>
          <li><strong>U.S. Energy Information Administration (EIA):</strong> <em>Electric Power Monthly</em> (Table 5.6.A) — National Average Residential Electricity Price Reference.</li>
          <li><strong>ANSI C84.1:</strong> <em>Electric Power Systems and Equipment — Voltage Ratings (60 Hz)</em> — Utilization Voltage Range Reference.</li>
          <li><strong>U.S. DOE 10 CFR Part 430:</strong> <em>Energy Conservation Program for Consumer Products</em> — Appliance Energy Testing Reference.</li>
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

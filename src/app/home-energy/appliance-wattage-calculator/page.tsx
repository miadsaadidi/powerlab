import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { ApplianceWattageCalculator } from "@/components/calculator/appliance-wattage-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

export const metadata: Metadata = buildPageMetadata({
  title: "Appliance Wattage & Starting Surge Calculator — Watts, LRA & kWh",
  description: "Calculate appliance running watts, motor inrush surge from nameplate Locked Rotor Amps (LRA), and daily kWh energy use for solar and generator sizing.",
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
    question: "Why do backup generators and battery inverters trip on motor startup?",
    answer: "Inductive motors during starting operate at a low power factor (typically 0.35 to 0.55 lagging). This creates a massive instantaneous apparent power demand (kVA surge). If the backup generator cannot supply the required subtransient starting kVA or if the battery inverter hits its peak current threshold, the output voltage sags below 108V, causing the under-voltage protection to trip.",
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
    description: "Calculate appliance running watts, motor starting surge from nameplate Locked Rotor Amps (LRA), and daily kWh energy consumption.",
    route: "/home-energy/appliance-wattage-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Converts nameplate Volts and Amps to continuous running Watts with power factor adjustment",
      "Calculates starting surge apparent power (VA) directly from nameplate Locked Rotor Amps (LRA)",
      "Four-tier equipment load classification: Resistive, Inverter/VFD, Standard Inductive Motor, High-Inertia HVAC Compressor",
      "Estimates daily and monthly kWh energy consumption with configurable duty cycles",
      "Evaluates backup generator and battery inverter starting kVA surge requirements",
    ],
    standards: [
      "NEMA MG 1 (Motors and Generators — Locked Rotor kVA Code Letters)",
      "IEEE 1459 (Standard Definitions for the Measurement of Electric Power Quantities)",
      "DOE 10 CFR Part 430 (Energy Conservation Standards for Consumer Products)",
      "ANSI C84.1 (Electric Power Systems and Equipment — Voltage Ratings)",
      "NFPA 70 / National Electrical Code (NEC) Article 430 & 440 (Motors and AC/Refrigerating Equipment)",
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
          Calculate continuous running power (Watts), electromechanical starting surge (VA) from nameplate Locked Rotor Amps (LRA), and cumulative daily energy consumption (kWh) for backup generator and battery storage sizing.
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
        sourceAuthority="NEMA MG 1, IEEE 1459 & NFPA 70 (NEC Article 430/440)"
      />

      <PageJumpNav />

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

      <section id="sizing-matrix">
        <h2>Appliance Wattage, LRA &amp; Starting Surge Reference Guide</h2>
        <p>
          Reference power ratings, locked rotor amperage benchmarks, typical operating power factors, and daily energy consumption across common household appliances:
        </p>
        <div className="scenario-table" role="region" aria-label="Household appliance wattage and LRA reference table">
          <table>
            <caption>Household appliance power ratings, starting surge parameters, and energy consumption</caption>
            <thead>
              <tr>
                <th scope="col">Appliance Category</th>
                <th scope="col">Load Class</th>
                <th scope="col">Nominal Running Power</th>
                <th scope="col">Starting Surge Demand (VA / LRA)</th>
                <th scope="col">Typical Duty Cycle</th>
                <th scope="col">Daily Energy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Refrigerator / Freezer</strong> (Single-Speed Reciprocating)</td>
                <td>Class 3 (Inductive)</td>
                <td>150 W (120V · 1.6A · 0.80 PF)</td>
                <td>1,200 VA surge (10A LRA peak)</td>
                <td>35% (8.4 hrs/day)</td>
                <td>~1.26 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Inverter Refrigerator</strong> (Linear / Variable-Speed Compressor)</td>
                <td>Class 2 (Inverter)</td>
                <td>90 W (120V · 0.8A · 0.95 PF)</td>
                <td>~120 VA peak <em>(Qualified estimate)</em></td>
                <td>45% (10.8 hrs/day)</td>
                <td>~0.97 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Submersible Well Pump (0.75 HP · 240V)</strong></td>
                <td>Class 3 (Inductive)</td>
                <td>1,200 W (240V · 6.5A · 0.77 PF)</td>
                <td>6,720 VA surge (28A LRA)</td>
                <td>10% (2.4 hrs/day)</td>
                <td>~2.88 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Residential Sump Pump (0.5 HP · 120V)</strong></td>
                <td>Class 3 (Inductive)</td>
                <td>800 W (120V · 8.9A · 0.75 PF)</td>
                <td>3,600 VA surge (30A LRA)</td>
                <td>5% intermittent</td>
                <td>~0.96 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Central AC (3-Ton Standard Single-Phase)</strong> <em>(Example: Copeland Scroll Baseline)</em></td>
                <td>Class 4 (HVAC)</td>
                <td>3,500 W (240V · 17.5A · 0.83 PF)</td>
                <td>19,680 VA surge (82A nameplate LRA)</td>
                <td>50% summer duty</td>
                <td>~14.0 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Central AC (3-Ton with Electronic Soft Starter)</strong></td>
                <td>Class 4 (HVAC + Soft Start)</td>
                <td>3,500 W (240V · 17.5A · 0.83 PF)</td>
                <td>6,720 VA surge (28A limited peak)</td>
                <td>50% summer duty</td>
                <td>~14.0 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater (Convection / Oil)</strong></td>
                <td>Class 1 (Resistive)</td>
                <td>1,500 W (120V · 12.5A · 1.00 PF)</td>
                <td>1,500 VA (1.0× surge)</td>
                <td>4.0 hrs / day</td>
                <td>~6.00 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Electric Storage Water Heater (50-Gal)</strong></td>
                <td>Class 1 (Resistive)</td>
                <td>4,500 W (240V · 18.75A · 1.00 PF)</td>
                <td>4,500 VA (1.0× surge)</td>
                <td>3.0 hrs recovery</td>
                <td>~13.5 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Microwave Oven (1,000W Output Rating)</strong></td>
                <td>Class 1 / Transformer</td>
                <td>1,400 W input (120V · 12.0A · 0.97 PF)</td>
                <td>~2,100 VA magnetizing inrush (50ms)</td>
                <td>0.3 hrs / day</td>
                <td>~0.42 kWh / day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="lra-math-guide">
        <h2>Primary Engineering Method: Calculating Starting Surge from Nameplate LRA</h2>
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
          <li><strong>Verify Generator Subtransient Capability:</strong> Ensure the standby generator has sufficient motor-starting kVA capacity (often specified as kVA at 30% allowable voltage dip) to prevent voltage collapse below 108V AC.</li>
        </ol>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Electrical Power, Inrush &amp; Daily Energy Equations"
          formula="P = V × I × cos φ  |  S_start = V × LRA  |  E_kWh = (P × Hours × Duty_Cycle) ÷ 1,000"
          formulaDescription="Defines steady-state real active electrical power, electromechanical locked-rotor apparent starting surge, and cumulative daily energy consumption."
          variables={[
            { symbol: "V", label: "RMS Supply Voltage", description: "Nominal root-mean-square line voltage (120V / 240V AC).", unit: "V" },
            { symbol: "I", label: "Running Current (FLA / RLA)", description: "Continuous operating current draw under rated mechanical load.", unit: "A" },
            { symbol: "cos φ", label: "Operating Power Factor", description: "Cosine of phase angle between voltage and current (1.0 for resistive, 0.75–0.85 for induction motors).", unit: "dimensionless" },
            { symbol: "LRA", label: "Locked Rotor Amperes", description: "Maximum inrush current drawn by stationary motor at moment of energization (s = 1.0).", unit: "A" },
            { symbol: "Duty_Cycle", label: "Cycling Ratio", description: "Fraction of daily hours equipment actively operates under thermal/pressure control.", unit: "fraction" },
          ]}
          notes={[
            "Real Power (Watts) performs physical shaft work and thermal dissipation: P = V × I × cos φ.",
            "Apparent Power (VA) governs conductor heating, breaker tripping, and generator core saturation: S = V × I.",
            "Backup sizing must satisfy both continuous running kW and instantaneous starting kVA.",
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
        <h2>Related Energy &amp; Backup Sizing Tools</h2>
        <p>
          Size backup generators for high inrush loads with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>, model battery backup discharge with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or evaluate whole-home consumption using the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>
      </section>
    </article>
  );
}


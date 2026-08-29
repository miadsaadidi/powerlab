import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { GeneratorSizeCalculator } from "@/components/calculator/generator-size-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Sizing & Motor Inrush Guide",
  description: "Learn how to size emergency generators accurately. Master motor starting surge (LRA), sequential load stacking, and fuel derating under NEC 702.",
  canonicalPath: "/guides/emergency-generator-sizing-and-inrush-load-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "Why is simply summing all starting watts an engineering mistake?",
    answer: "Summing all starting surges assumes every motorized appliance in your home (central AC, well pump, sump pump, refrigerator) energizes at the exact same millisecond. This naive linear method leads to massive 80% to 150% overcapitalization (forcing homeowners to buy costly 22kW–26kW standby units). In reality, motorized loads cycle non-coincidentally, requiring sizing only for total running load plus the single largest motor starting surge.",
  },
  {
    question: "What is Locked Rotor Amperage (LRA) and how does it relate to starting watts?",
    answer: "Locked Rotor Amperage (LRA) is the momentary inrush current drawn by an induction motor at standstill (rotor slip s = 1.0). Before the motor begins spinning to generate counter-electromotive force (CEMF), the circuit impedance is dominated almost entirely by winding resistance and leakage reactance, causing an instantaneous inrush surge 5 to 7 times nominal full load amperage (FLA) for 100 to 500 milliseconds.",
  },
  {
    question: "How do soft-starters (like Micro-Air EasyStart) reduce generator size requirements?",
    answer: "A micro-controller soft-starter uses semiconductor thyristor phase-angle clipping to ramp motor starting current smoothly over 100–300 milliseconds. This reduces peak inrush current on a central AC compressor by 65% to 70% (e.g., dropping a 75A LRA surge down to ~24A), allowing a 3-ton to 4-ton heat pump to start cleanly on an 8.5kW–10kW generator instead of requiring a 20kW unit.",
  },
  {
    question: "How much power do generators lose when running on propane (LP) or natural gas (NG)?",
    answer: "Due to differences in volumetric energy density compared to gasoline: Liquid Propane (LP) derates output by approximately 10% to 15% (multiplier ~0.88–0.90), while pipeline Natural Gas (NG) derates output by 15% to 22% (multiplier ~0.78–0.82). Additionally, generators lose ~3.5% capacity per 1,000 feet of elevation above sea level and ~1% per 10°F above 77°F ambient temperature.",
  },
  {
    question: "What generator size is required to run a 1/2 HP well pump and refrigerator during a blackout?",
    answer: "A 1/2 HP 240V submersible well pump pulls ~1,000 running watts and ~2,200 to 2,500 starting surge watts. A standard refrigerator pulls ~150 running watts and ~800 starting watts. Using sequential load stacking (1,000W + 150W running + 1,500W surge delta + 20% safety margin), a 3,500W to 5,000W generator with 240V capability easily powers both appliances simultaneously.",
  },
];

export default function EmergencyGeneratorGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Emergency Generator Sizing & Motor Inrush Load Guide",
    description: "Engineering guide to sizing residential emergency generators: inductive motor inrush (LRA), sequential load stacking, alternator sub-transient reactance, and fuel derating.",
    route: "/guides/emergency-generator-sizing-and-inrush-load-guide",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "IEEE Standard 446 (Recommended Practice for Emergency & Standby Power - Orange Book)",
      "NEMA MG-1 (Motors and Generators - Locked Rotor kVA Codes)",
      "ISO 8528-5 (Reciprocating Internal Combustion Engine Driven Alternating Current Generating Sets)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Emergency Generator Sizing Guide</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">Emergency Power &amp; Applied Electrical Engineering Reference</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Emergency Generator Sizing &amp; Motor Inrush Load Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          A comprehensive engineering reference on emergency generator sizing. Learn how to accurately calculate running wattage, manage inductive motor starting surges (Locked Rotor Amps), prevent alternator sub-transient voltage dips, and apply multi-fuel derating under NEC Article 702.
        </p>
      </header>

      <DirectAnswerCard
        keyword="generator sizing and motor inrush calculation formula"
        answer="To size a generator without severe overcapitalization, apply sequential load stacking: Total Required Capacity = (Sum of All Continuous Running Watts) + (Single Largest Motor Starting Surge Delta) × Safety Factor (1.15 to 1.25). For motorized appliances (AC compressors, well pumps), starting surge equals Locked Rotor Amperage (LRA × Volts), which is 5× to 7× nominal running load for 100–500ms."
        formula="P_gen (W) = [ ∑ P_running + max(P_starting,i - P_running,i) ] × k_safety ÷ (η_fuel × η_altitude × η_temp)"
        standardExample="Well Pump (1,000W run / 2,500W surge) + Refrigerator (150W run / 800W surge) + Furnace Blower (600W run / 1,400W surge) + Lighting (250W): Running Sum = 2,000W. Max Surge Delta = 1,500W (Well Pump). Required Generator = (2,000 + 1,500) × 1.20 = 4,200 Watts."
        sourceAuthority="IEEE Std 446 (Orange Book) & NFPA 70 / NEC Article 702 & NEMA MG-1"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Emergency Generator Sizing &amp; Motor Inrush Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Select your essential household appliances, adjust fuel type (gasoline, propane, natural gas, diesel), and dynamically calculate steady-state running watts, locked-rotor starting surges, and recommended generator capacity under sequential load stacking.
          </p>
        </div>
        <GeneratorSizeCalculator />
      </section>

      {/* Deep Technical Content First */}
      <section id="inrush-physics">
        <h2>1. The Physics of Induction Motor Inrush &amp; Locked Rotor Amperage (LRA)</h2>
        <p>
          The most frequent cause of generator stalling during grid outages is failing to understand the electromagnetic physics of single-phase AC induction motors (found in central air conditioner compressors, heat pumps, deep-well submersible pumps, sump pumps, and refrigeration systems).
        </p>
        <p>
          At standstill (rotor slip <code>s = 1.0</code>), an induction motor behaves electrically as a short-circuited transformer. Because the rotor is not yet rotating, it generates zero <strong>Counter-Electromotive Force (CEMF)</strong> to oppose incoming current. The stator circuit impedance is constrained entirely by the tiny internal copper winding resistance and leakage reactance:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Z_start = √((R_stator + R'_rotor)² + (X_stator + X'_rotor)²) << Z_running`}</code>
        </pre>
        <p>
          Consequently, the instantaneous initial current—designated on equipment nameplates as <strong>Locked Rotor Amperage (LRA)</strong>—surges to <strong>500% to 700%</strong> of steady-state Full Load Amperage (FLA) for 100 to 500 milliseconds until the rotor achieves synchronous slip.
        </p>
      </section>

      <section id="load-stacking">
        <h2>2. Sequential Load Stacking vs. The Linear Summation Fallacy</h2>
        <p>
          Many online sizing calculators and sales charts make the classic mistake of adding all starting wattages together:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.08)", borderRadius: "0.5rem", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#b91c1c", overflowX: "auto" }}>
          <code>{`INCORRECT: Capacity = (Pump_Start + AC_Start + Fridge_Start + Sump_Start) -> 26,000W Oversized!`}</code>
        </pre>
        <p>
          In reality, thermostatic controls and motor duty cycles ensure that motorized loads cycle asynchronously. Under standard <strong>sequential starting methodology (IEEE 446 / ISO 8528)</strong>, you only size the generator for:
        </p>
        <ol>
          <li><strong>Baseline Steady-State Load:</strong> The continuous running watts of all connected lighting, electronics, heating elements, and running motors.</li>
          <li><strong>Peak Single Starting Surge Delta:</strong> The single largest starting surge minus its running wattage (<code>P_surge - P_running</code>).</li>
          <li><strong>Engineering Safety Margin:</strong> A 15% to 25% continuous reserve headroom to prevent engine lugging during sudden stepped load changes.</li>
        </ol>
      </section>

      <section id="nema-code-letters">
        <h2>3. NEMA Motor Code Letters &amp; Starting kVA Multipliers</h2>
        <p>
          Electric motors manufactured under NEMA MG-1 standards display a <strong>Code Letter (A through V)</strong> on the nameplate designating locked-rotor kilovolt-amperes per horsepower (kVA/HP). Use this standard engineering lookup table when exact LRA is not stamped:
        </p>
        <div className="scenario-table" role="region" aria-label="NEMA Motor Code Letters and Starting kVA per Horsepower">
          <table>
            <caption>NEMA MG-1 Standard Locked-Rotor kVA per Horsepower Multipliers</caption>
            <thead>
              <tr>
                <th scope="col">NEMA Code Letter</th>
                <th scope="col">Starting kVA / HP</th>
                <th scope="col">Nominal Inrush Multiplier</th>
                <th scope="col">Typical Appliance Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Code A – C</strong></td>
                <td>0.00 – 3.99 kVA/HP</td>
                <td>~3.0× – 4.0× FLA</td>
                <td>Low-inrush variable-speed ECM blowers</td>
              </tr>
              <tr>
                <td><strong>Code D – F</strong></td>
                <td>4.00 – 5.59 kVA/HP</td>
                <td>~4.5× – 5.5× FLA</td>
                <td>Standard fractional HP furnace blowers, fans</td>
              </tr>
              <tr>
                <td><strong>Code G – K (Most Common)</strong></td>
                <td>5.60 – 8.99 kVA/HP</td>
                <td>~6.0× – 7.5× FLA</td>
                <td>Submersible well pumps, refrigerators, air compressors</td>
              </tr>
              <tr>
                <td><strong>Code L – P</strong></td>
                <td>9.00 – 12.49 kVA/HP</td>
                <td>~8.0× – 10.0× FLA</td>
                <td>Heavy single-phase scroll compressors, grain augers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sub-transient-reactance">
        <h2>4. Alternator Sub-Transient Reactance (X&apos;&apos;d) &amp; Voltage Sag Limits</h2>
        <p>
          When an induction motor starts, the generator alternator rotor field cannot immediately increase magnetic flux. During the first few cycles (0–50ms), the alternator terminal voltage drops proportionally to its <strong>direct-axis sub-transient reactance (X&apos;&apos;d)</strong>:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`ΔV_transient (%) ≈ (kVA_motor_inrush ÷ kVA_alternator_nominal) × X''d × 100`}</code>
        </pre>
        <p>
          Under <strong>IEEE 446 guidelines</strong>, transient voltage sag must not exceed <strong>18% to 20%</strong>. Sags greater than 25% cause sensitive microprocessor controls (such as digital furnace control boards, inverter heat pumps, and electronic transfer switches) to trip offline on low-voltage error codes.
        </p>
      </section>

      <section id="soft-starters">
        <h2>5. Soft-Starters: Slashing Generator Requirements by 65%</h2>
        <p>
          For homeowners wanting to power central air conditioning (3-ton to 5-ton heat pumps) during blackouts without buying a giant 20kW+ commercial generator, installing a digital micro-controller soft-starter (such as a Micro-Air EasyStart or Hyper Engineering SureStart) is the gold-standard electrical solution:
        </p>
        <ul>
          <li><strong>Without Soft-Starter:</strong> 3-Ton Scroll AC (75A LRA @ 240V) = <strong>18,000 Watts momentary inrush</strong> (requires 15kW–20kW generator).</li>
          <li><strong>With Soft-Starter:</strong> 3-Ton Scroll AC (~24A peak ramp @ 240V) = <strong>5,760 Watts smooth ramp</strong> (starts comfortably on an 8.5kW portable generator).</li>
        </ul>
      </section>

      <section id="fuel-derating">
        <h2>6. Multi-Fuel &amp; Environmental Derating Factors</h2>
        <p>
          Generators rarely produce their advertised laboratory nameplate rating in real-world field conditions. Always apply fuel, elevation, and temperature derating factors before finalizing your purchase:
        </p>
        <div className="scenario-table" role="region" aria-label="Generator Fuel and Environmental Derating Coefficients">
          <table>
            <caption>Derating Multipliers for Standby and Portable Generators</caption>
            <thead>
              <tr>
                <th scope="col">Operating Parameter</th>
                <th scope="col">Typical Multiplier</th>
                <th scope="col">Physical Mechanism</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gasoline (Octane 87)</strong></td>
                <td><strong>1.00 (100%)</strong></td>
                <td>Standard factory baseline testing fuel rating.</td>
              </tr>
              <tr>
                <td><strong>Liquid Propane (LP)</strong></td>
                <td><strong>0.88 – 0.90 (88–90%)</strong></td>
                <td>Lower volumetric energy density per cubic foot of vapor.</td>
              </tr>
              <tr>
                <td><strong>Pipeline Natural Gas (NG)</strong></td>
                <td><strong>0.78 – 0.82 (78–82%)</strong></td>
                <td>Lower British Thermal Unit (BTU) content per cubic foot (~1,000 BTU/cu ft).</td>
              </tr>
              <tr>
                <td><strong>Altitude Derating</strong></td>
                <td><strong>-3.5% per 1,000 ft</strong></td>
                <td>Reduced atmospheric oxygen density in naturally aspirated engines above 1,000 ft.</td>
              </tr>
              <tr>
                <td><strong>High Ambient Temperature</strong></td>
                <td><strong>-1.0% per 10°F above 77°F</strong></td>
                <td>Thinner combustion air and alternator thermal coil resistance increases.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sizing-matrix">
        <h2>7. Typical Generator Sizing Matrix for Blackout Preparedness</h2>
        <div className="scenario-table" role="region" aria-label="Generator Size Capabilities by Tier">
          <table>
            <caption>Household Generator Capacity Classes and Load Capabilities</caption>
            <thead>
              <tr>
                <th scope="col">Generator Class</th>
                <th scope="col">Running / Surge Watts</th>
                <th scope="col">Typical Fuel Connection</th>
                <th scope="col">What It Can Power Simultaneously</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Compact Inverter</strong></td>
                <td>2,000W / 2,500W</td>
                <td>Gasoline</td>
                <td>Fridge, internet router, laptops, LED lights, CPAP machine.</td>
              </tr>
              <tr>
                <td><strong>Mid-Size Emergency</strong></td>
                <td>4,500W / 5,500W</td>
                <td>Dual-Fuel (Gas / LP)</td>
                <td>Fridge, gas furnace blower, 1/2 HP sump pump, microwave, TV, lights.</td>
              </tr>
              <tr>
                <td><strong>Heavy Portable / Interlock</strong></td>
                <td>8,500W / 11,000W</td>
                <td>Tri-Fuel (Gas / LP / NG)</td>
                <td>1/2 HP well pump, 3-ton AC (w/ soft starter), fridge, gas water heater, whole-house lights.</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Standby</strong></td>
                <td>18,000W / 22,000W</td>
                <td>Natural Gas / 500-gal LP Tank</td>
                <td>Full 200A service: central 4-ton AC, electric range, electric water heater, well pump, full home circuits.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Worked Engineering Case Study */}
      <section id="worked-example" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "var(--surface)", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", color: "var(--brand-strong)", marginTop: 0 }}>
          8. Worked Engineering Example: Sizing a Backup Generator for Essential Outage Loads
        </h2>
        <p>
          To see sequential load stacking in action, let us calculate the required generator capacity for a typical suburban home protecting against winter ice-storm blackouts:
        </p>

        <div className="scenario-table" role="region" aria-label="Sample Household Load Breakdown">
          <table>
            <caption>Sample Emergency Blackout Appliance Schedule</caption>
            <thead>
              <tr>
                <th scope="col">Connected Appliance</th>
                <th scope="col">Running Watts</th>
                <th scope="col">Starting Surge Watts</th>
                <th scope="col">Motor Surge Delta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1/2 HP Submersible Well Pump (240V)</strong></td>
                <td>1,000 W</td>
                <td>2,600 W</td>
                <td>+1,600 W (Peak Surge)</td>
              </tr>
              <tr>
                <td><strong>Kitchen Refrigerator / Freezer</strong></td>
                <td>150 W</td>
                <td>800 W</td>
                <td>+650 W</td>
              </tr>
              <tr>
                <td><strong>Gas Furnace Central Blower (1/3 HP)</strong></td>
                <td>550 W</td>
                <td>1,300 W</td>
                <td>+750 W</td>
              </tr>
              <tr>
                <td><strong>1/3 HP Basement Sump Pump</strong></td>
                <td>800 W</td>
                <td>1,800 W</td>
                <td>+1,000 W</td>
              </tr>
              <tr>
                <td><strong>LED Lighting &amp; WiFi Internet Router</strong></td>
                <td>150 W</td>
                <td>150 W</td>
                <td>0 W (Resistive / Electronic)</td>
              </tr>
              <tr style={{ fontWeight: 700, background: "rgba(0, 0, 0, 0.03)" }}>
                <td><strong>Total Combined Running Baseline</strong></td>
                <td><strong>2,650 Watts</strong></td>
                <td>—</td>
                <td><strong>Max Delta = 1,600 W</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: "1.1rem", marginTop: "1.25rem", color: "var(--brand-strong)" }}>Step-by-Step Calculation:</h3>
        <ol style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
          <li><strong>Step 1 (Sum Steady-State Running Load):</strong> <code>1,000W + 150W + 550W + 800W + 150W = 2,650 Watts</code> continuous demand.</li>
          <li><strong>Step 2 (Isolate the Single Largest Motor Inrush Delta):</strong> The 1/2 HP well pump has the highest starting delta (<code>2,600W - 1,000W = 1,600 Watts</code>).</li>
          <li><strong>Step 3 (Apply Sequential Load Stacking):</strong> <code>2,650W running + 1,600W surge delta = 4,250 Watts</code> required momentary peak capacity.</li>
          <li><strong>Step 4 (Add 20% Operating Safety Reserve):</strong> <code>4,250W × 1.20 = 5,100 Watts</code>.</li>
          <li><strong>Step 5 (Propane Fuel Derating if Applicable):</strong> Sizing for Liquid Propane (0.90 factor): <code>5,100W ÷ 0.90 = 5,666 Watts</code> rated gasoline generator.</li>
        </ol>

        <p style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", borderRadius: "0.5rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#065f46" }}>
          <strong>Engineering Sizing Verdict:</strong> A standard <strong>6,500W Running / 8,000W Starting Dual-Fuel Portable Generator</strong> connected via a 30-Amp 240V transfer switch (NEMA L14-30) comfortably powers this home without engine bogging or low-voltage tripping.
        </p>

        {/* Interactive Tool Callout Card */}
        <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", border: "1.5px solid #ea580c", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>🧮</span>
            <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#9a3412" }}>Need to Calculate Your Home&apos;s Specific Appliances?</h3>
          </div>
          <p style={{ margin: 0, color: "#7c2d12", fontSize: "0.95rem", lineHeight: 1.5 }}>
            Use our free, deterministic online calculator to select your specific household appliances, toggle gasoline vs. propane vs. natural gas, and get instant running and surge wattage recommendations:
          </p>
          <div>
            <Link
              href="/home-energy/generator-size-calculator"
              className="button"
              style={{ display: "inline-block", background: "#ea580c", color: "#fff", textDecoration: "none", padding: "0.75rem 1.25rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.95rem" }}
            >
              Launch Interactive Generator Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Emergency Generator Sizing &amp; Derating Formulas"
          formula="Capacity_Req (W) = [ ∑ P_running + max(P_starting,i - P_running,i) ] × k_safety ÷ (η_fuel × η_derate)"
          formulaDescription="Standard sequential motor load calculation with multi-fuel and environmental derating according to IEEE 446 and NEC 702."
          variables={[
            { symbol: "∑ P_running", label: "Total Running Watts", description: "Sum of continuous operational power for all simultaneously running devices.", unit: "Watts" },
            { symbol: "max(P_surge,i)", label: "Peak Starting Surge", description: "The single largest motor starting surge among all connected appliances.", unit: "Watts" },
            { symbol: "k_safety", label: "Safety Margin", description: "Continuous operating headroom factor (typically 1.15 to 1.25).", unit: "ratio" },
            { symbol: "η_fuel", label: "Fuel Efficiency Factor", description: "Gasoline = 1.0, Propane = 0.90, Natural Gas = 0.80.", unit: "ratio" },
            { symbol: "η_derate", label: "Altitude & Temp Factor", description: "1.0 - (Altitude_ft ÷ 1000 × 0.035) - ((Temp_F - 77) ÷ 10 × 0.01).", unit: "ratio" },
          ]}
          notes={[
            "Always verify generator rated continuous watts against fuel derating before connecting transfer switches.",
            "Transfer switch inlet boxes must be sized to match the generator maximum 240V amperage (e.g. NEMA L14-30 for up to 30A / 7,200W, NEMA 14-50 for up to 50A / 12,000W).",
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
        <h2>Related Emergency Power &amp; Electrical Sizing Tools</h2>
        <p>
          Planning comprehensive blackout resilience or clean energy backup? Calculate battery inverter capacity with the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>, model whole-home battery backup with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, estimate battery runtimes with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or check heavy appliance power draws with the <Link href="/home-energy/appliance-wattage-calculator">Appliance Wattage Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Calculations follow NFPA 70 (NEC Article 702), IEEE Std 446 (Orange Book), and NEMA MG-1 motor inrush standards. Review our complete <Link href="/methodology">calculation methodology</Link> and <Link href="/sources">engineering sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

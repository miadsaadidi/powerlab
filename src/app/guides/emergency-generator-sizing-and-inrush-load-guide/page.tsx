import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { GeneratorSizeCalculator } from "@/components/calculator/generator-size-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { MathDisplay } from "@/components/common/math-display";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Sizing & Motor Inrush Guide",
  description: "Learn how to size emergency generators using sequential load modeling. Master motor starting surge (LRA), sequential load stacking, and fuel derating factors.",
  canonicalPath: "/guides/emergency-generator-sizing-and-inrush-load-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "Why is simply summing all starting watts an engineering mistake?",
    answer: "Summing all starting surges assumes every motorized appliance in your home (central AC, well pump, sump pump, refrigerator) energizes at the exact same millisecond. In reality, motorized loads cycle asynchronously during operation, so sequential load models size for total continuous running load plus the single largest motor starting surge delta, scaled by a safety factor and applicable derating.",
  },
  {
    question: "What is Locked Rotor Amperage (LRA) and how does it relate to starting watts?",
    answer: "Locked Rotor Amperage (LRA) is the momentary inrush current drawn by an induction motor at standstill before rotor rotation generates counter-electromotive force (CEMF). Motor starting current can be several times normal running current (often an illustrative 5× to 7× nominal running load for standard induction motors), but actual magnitude and duration vary by motor type, mechanical load, voltage, starting method, and manufacturer data.",
  },
  {
    question: "How do soft starters reduce generator size requirements?",
    answer: "Compatible soft-start equipment ramps motor starting voltage smoothly over initial electrical cycles, substantially reducing peak starting inrush current on compressors. While manufacturers often report reductions of 65% to 70% in illustrative tests, actual current reduction and generator compatibility depend on motor design, line voltage, compressor load, and generator surge capability.",
  },
  {
    question: "How much power do generators lose when running on propane (LP) or natural gas (NG)?",
    answer: "Because of lower volumetric energy density compared to gasoline, dual-fuel and tri-fuel generators typically exhibit derating: illustrative planning assumptions are ~0.88 to 0.90 for propane (LP) and ~0.78 to 0.82 for natural gas (NG). Environmental deratings often assume ~3.5% loss per 1,000 ft elevation and ~1% per 10°F above 77°F. However, actual derating varies by engine, carburetor, and alternator design, so manufacturer nameplate ratings must always be verified.",
  },
  {
    question: "What generator size is required to run a 1/2 HP well pump and refrigerator during a blackout?",
    answer: "In an illustrative scenario with a 1/2 HP well pump (1,000W running / 2,600W starting; delta = 1,600W) and a refrigerator (150W running / 800W starting), the base peak load is 1,000 + 150 + 1,600 = 2,750W. With a 20% safety factor (2,750 × 1.20 = 3,300W), a 3,500W to 5,000W continuous generator with 240V capability provides adequate modeled capacity. Always verify actual appliance nameplate LRA and generator 240V output ratings.",
  },
];

export default function EmergencyGeneratorGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Emergency Generator Sizing & Motor Inrush Load Guide",
    description: "Engineering planning guide to sizing residential emergency generators: inductive motor inrush (LRA), sequential load stacking, alternator voltage sags, and fuel derating.",
    route: "/guides/emergency-generator-sizing-and-inrush-load-guide",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "NFPA 70 / NEC Article 702 (Optional Standby Systems - Informational Reference)",
      "IEEE Standard 446 (Recommended Practice for Emergency & Standby Power)",
      "NEMA MG-1 (Motors and Generators - Locked Rotor kVA Guidelines)",
      "ISO 8528-5 (Internal Combustion Engine Driven AC Generating Sets)",
    ],
    faqs: FAQS,
    proficiencyLevel: "Beginner to Intermediate",
    audienceType: "Homeowners, Electricians, Emergency Planners",
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
        <p className="eyebrow">Emergency Power &amp; Electrical Planning Reference</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Emergency Generator Sizing &amp; Motor Inrush Load Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          A practical engineering reference on emergency generator sizing. Learn how to calculate continuous running wattage, evaluate inductive motor starting surges (Locked Rotor Amps), prevent excessive voltage sags, and apply sequential load stacking and fuel derating models.
        </p>
      </header>

      <DirectAnswerCard
        keyword="generator sizing and motor inrush calculation formula"
        answer="To size an emergency generator using sequential load stacking, calculate Base Peak Watts as the sum of all continuous running loads plus the single largest motor starting surge delta: Base_Peak_W = Sum(P_running) + max(P_starting,i − P_running,i). Apply a safety factor (typically 1.15 to 1.25) to determine Modeled Required Watts, then divide by any fuel or environmental derating factors. Motor starting current can be several times running current, so nameplate LRA should be used when available."
        formula="Modeled_Required_W = [ Sum(P_running) + max(P_starting,i − P_running,i) ] × Safety_Factor · Required_Rated_W = Modeled_Required_W ÷ (Fuel_Derating × Env_Derating)"
        standardExample="Well Pump (1,000W run / 2,600W surge) + Refrigerator (150W run / 800W surge) + Furnace Blower (550W run / 1,300W surge) + Sump Pump (800W run / 1,800W surge) + Lights (150W): Running Sum = 2,650W. Max Surge Delta = 1,600W (Well Pump). Base Peak = 4,250W. With 20% Safety Factor = 5,100W. On Propane (0.90 planning assumption) = 5,667W rated generator."
        sourceAuthority="IEEE Std 446 & NFPA 70 / NEC Article 702 & NEMA MG-1 (Technical References)"
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

      {/* Section 1: The Physics of Inrush & LRA */}
      <section id="inrush-physics">
        <h2>1. The Physics of Induction Motor Inrush &amp; Locked Rotor Amperage (LRA)</h2>
        <p>
          A frequent cause of generator stalling during grid outages is underestimating the starting characteristics of single-phase AC induction motors (found in central air conditioner compressors, heat pumps, deep-well submersible pumps, sump pumps, and refrigeration systems).
        </p>
        <p>
          At standstill (rotor slip <code>s = 1.0</code>), an induction motor behaves electrically as a short-circuited transformer. Because the rotor is not yet rotating, it generates zero <strong>Counter-Electromotive Force (CEMF)</strong> to oppose incoming current. The stator circuit impedance is constrained primarily by internal winding resistance and leakage reactance:
        </p>
        <MathDisplay
          title="Motor Starting Impedance vs Running Impedance"
          copyText="Z_start = sqrt((R_stator + R'_rotor)^2 + (X_stator + X'_rotor)^2) << Z_running"
          benchmark="Starting impedance is significantly lower than running impedance, creating an initial LRA inrush current"
        >
          Z_start = √((R_stator + R&apos;_rotor)² + (X_stator + X&apos;_rotor)²) ≪ Z_running
        </MathDisplay>
        <p>
          Motor starting current can be several times normal running current, but the magnitude and duration vary by motor type, mechanical load, voltage, starting method, and manufacturer. Use nameplate LRA or manufacturer data when available. For standard residential induction motors, initial inrush current often falls in the illustrative range of 5 to 7 times nominal Full Load Amperage (FLA) for a duration of 100 to 500 milliseconds until the rotor accelerates.
        </p>
      </section>

      {/* Section 2: Sequential Load Stacking */}
      <section id="load-stacking">
        <h2>2. Sequential Load Stacking vs. The Linear Summation Fallacy</h2>
        <p>
          Many informal sizing methods make the mistake of adding all starting wattages together simultaneously:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.08)", borderRadius: "0.5rem", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#b91c1c", overflowX: "auto" }}>
          <code>{`INCORRECT: Capacity = Sum(All Starting Watts) -> Substantially Oversized!`}</code>
        </pre>
        <p>
          In reality, thermostatic controls and motor duty cycles ensure that motorized loads cycle asynchronously during typical operation. Under standard <strong>sequential starting methodology (IEEE 446 / ISO 8528)</strong>, generator capacity is modeled using:
        </p>
        <ol>
          <li><strong>Baseline Steady-State Load:</strong> The continuous running watts of all connected lighting, electronics, heating elements, and running motors: <code>Sum(P_running)</code>.</li>
          <li><strong>Peak Single Starting Surge Delta:</strong> The single largest motor starting surge minus its own running wattage: <code>max(P_starting,i − P_running,i)</code>.</li>
          <li><strong>Engineering Safety Margin:</strong> A 15% to 25% continuous reserve headroom to accommodate load steps and maintain voltage stability: <code>Safety_Factor</code>.</li>
        </ol>
      </section>

      {/* Section 3: NEMA Code Letters */}
      <section id="nema-code-letters">
        <h2>3. NEMA Motor Code Letters &amp; Starting kVA Multipliers</h2>
        <p>
          Electric motors manufactured under NEMA MG-1 standards often display a <strong>Code Letter (A through V)</strong> on the nameplate designating locked-rotor kilovolt-amperes per horsepower (kVA/HP). The following table provides illustrative reference multipliers when specific nameplate LRA is unavailable:
        </p>
        <div className="scenario-table" role="region" aria-label="NEMA Motor Code Letters and Starting kVA per Horsepower">
          <table>
            <caption>NEMA MG-1 Standard Locked-Rotor kVA per Horsepower Multipliers (Reference Data)</caption>
            <thead>
              <tr>
                <th scope="col">NEMA Code Letter</th>
                <th scope="col">Starting kVA / HP</th>
                <th scope="col">Illustrative Inrush Multiplier</th>
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
                <td><strong>Code G – K (Common)</strong></td>
                <td>5.60 – 8.99 kVA/HP</td>
                <td>~6.0× – 7.5× FLA</td>
                <td>Submersible well pumps, refrigerators, air compressors</td>
              </tr>
              <tr>
                <td><strong>Code L – P</strong></td>
                <td>9.00 – 12.49 kVA/HP</td>
                <td>~8.0× – 10.0× FLA</td>
                <td>Heavy single-phase scroll compressors, industrial augers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Sub-transient Reactance & Voltage Sag */}
      <section id="sub-transient-reactance">
        <h2>4. Alternator Sub-Transient Reactance (X&apos;&apos;d) &amp; Voltage Sag Limits</h2>
        <p>
          When an induction motor starts, the generator alternator rotor field cannot instantaneously increase magnetic flux. During initial electrical cycles, the alternator terminal voltage experiences a transient drop related to its <strong>direct-axis sub-transient reactance (X&apos;&apos;d)</strong>:
        </p>
        <MathDisplay
          title="Alternator Sub-Transient Voltage Sag Relationship"
          copyText="Delta_V_transient = (kVA_inrush / kVA_gen_nom) * X''d * 100%"
          benchmark="Technical guidelines generally recommend keeping transient voltage sag ≤ 18%–20% to avoid nuisance tripping"
        >
          ΔV_transient = (kVA_inrush / kVA_gen_nom) × X&apos;&apos;d × 100%
        </MathDisplay>
        <p>
          Under standard design practices, transient voltage sag should ideally remain within <strong>18% to 20%</strong>. Excessive sags (&gt;25%) can cause sensitive microprocessor controls (such as digital furnace control boards, inverter heat pumps, and electronic transfer switches) to drop offline on under-voltage protection.
        </p>
      </section>

      {/* Section 5: Soft-Starters */}
      <section id="soft-starters">
        <h2>5. Soft-Starters: Reducing Compressor Starting Inrush</h2>
        <p>
          Compatible soft-start equipment can substantially reduce motor starting current. Actual reduction depends on the motor, compressor, equipment, line voltage, generator and soft-starter configuration:
        </p>
        <ul>
          <li><strong>Direct-On-Line (DOL) Starting:</strong> A standard 3-ton scroll compressor (e.g., 75A LRA @ 240V) presents an instantaneous inrush demand of up to 18,000 Watts.</li>
          <li><strong>With Compatible Soft Starter:</strong> In manufacturer tests and field implementations, electronic soft starters ramp voltage over initial electrical cycles, often reducing peak inrush to approximately 22A to 28A (~5,300W to 6,700W peak).</li>
        </ul>
        <p>
          While soft starters allow larger HVAC compressors to operate on smaller generators, total generator continuous rating and surge capacity must always be verified against the entire connected household load.
        </p>
      </section>

      {/* Section 6: Fuel and Environmental Derating */}
      <section id="fuel-derating">
        <h2>6. Multi-Fuel &amp; Environmental Derating Factors (Planning Assumptions)</h2>
        <p>
          Generators rarely produce their full advertised nameplate rating across all fuels and operating environments. The factors below represent simplified planning assumptions:
        </p>
        <div className="scenario-table" role="region" aria-label="Generator Fuel and Environmental Derating Coefficients">
          <table>
            <caption>Fuel &amp; Environmental Derating Factors — Simplified Planning Assumptions</caption>
            <thead>
              <tr>
                <th scope="col">Operating Parameter</th>
                <th scope="col">Planning Assumption Multiplier</th>
                <th scope="col">Underlying Mechanism</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gasoline (Octane 87)</strong></td>
                <td><strong>1.00 (Baseline)</strong></td>
                <td>Standard factory baseline testing fuel rating.</td>
              </tr>
              <tr>
                <td><strong>Liquid Propane (LP)</strong></td>
                <td><strong>0.88 – 0.90 (Planning Assumption)</strong></td>
                <td>Lower volumetric energy density per cubic foot of gaseous fuel.</td>
              </tr>
              <tr>
                <td><strong>Pipeline Natural Gas (NG)</strong></td>
                <td><strong>0.78 – 0.82 (Planning Assumption)</strong></td>
                <td>Lower British Thermal Unit (BTU) energy content per cubic foot.</td>
              </tr>
              <tr>
                <td><strong>Altitude Derating</strong></td>
                <td><strong>-3.5% per 1,000 ft above 1,000 ft</strong></td>
                <td>Reduced atmospheric oxygen density in naturally aspirated engines.</td>
              </tr>
              <tr>
                <td><strong>High Ambient Temperature</strong></td>
                <td><strong>-1.0% per 10°F above 77°F</strong></td>
                <td>Warmer intake air density and increased alternator winding resistance.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="form-hint">
          <em>Actual generator derating varies by engine, alternator, fuel system, altitude, ambient temperature, installation conditions, and manufacturer specifications. Use the generator manufacturer&apos;s published ratings and derating tables for final equipment selection.</em>
        </p>
      </section>

      {/* Section 7: Sizing Matrix */}
      <section id="sizing-matrix">
        <h2>7. Illustrative Generator Capacity Examples</h2>
        <p>
          The table below illustrates common generator capacity tiers and representative load combinations. Actual compatibility depends on the generator&apos;s continuous and starting ratings, voltage, appliance running/start characteristics, transfer equipment, load-management controls, and manufacturer specifications.
        </p>
        <div className="scenario-table" role="region" aria-label="Generator Size Capabilities by Tier">
          <table>
            <caption>Illustrative Generator Capacity Classes and Load Combinations</caption>
            <thead>
              <tr>
                <th scope="col">Generator Class</th>
                <th scope="col">Typical Rated / Surge Watts</th>
                <th scope="col">Typical Fuel Option</th>
                <th scope="col">Illustrative Simultaneous Load Group</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Compact Inverter</strong></td>
                <td>2,000W / 2,500W</td>
                <td>Gasoline</td>
                <td>Refrigerator, WiFi router, laptops, LED lighting, CPAP device.</td>
              </tr>
              <tr>
                <td><strong>Mid-Size Portable</strong></td>
                <td>4,500W / 5,500W</td>
                <td>Dual-Fuel (Gas / LP)</td>
                <td>Refrigerator, gas furnace blower, 1/2 HP sump pump, microwave, TV, select lights.</td>
              </tr>
              <tr>
                <td><strong>Heavy Portable / Interlock</strong></td>
                <td>8,500W / 11,000W</td>
                <td>Tri-Fuel (Gas / LP / NG)</td>
                <td>1/2 HP well pump, 3-ton AC (with verified soft starter), refrigerator, gas water heater, general lighting.</td>
              </tr>
              <tr>
                <td><strong>Home Standby Generator</strong></td>
                <td>18,000W / 22,000W</td>
                <td>Natural Gas / LP Tank</td>
                <td>Selected high-demand circuits (e.g. central AC with load management, electric cooking/water heating with interlocks, well pump, general circuits up to generator capacity).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 8: Worked Engineering Example */}
      <section id="worked-example" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "var(--surface)", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", color: "var(--brand-strong)", marginTop: 0 }}>
          8. Worked Planning Example: Sizing a Backup Generator for Essential Outage Loads
        </h2>
        <p>
          The following example illustrates how sequential load stacking calculates required generator capacity for a typical residential emergency load schedule:
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
                <td>+1,600 W (Peak Surge Delta)</td>
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
          <li><strong>Step 2 (Isolate the Single Largest Motor Inrush Delta):</strong> The 1/2 HP well pump has the highest starting delta (<code>2,600W − 1,000W = 1,600 Watts</code>).</li>
          <li><strong>Step 3 (Calculate Base Peak Requirement):</strong> <code>2,650W running + 1,600W surge delta = 4,250 Watts</code> base peak capacity.</li>
          <li><strong>Step 4 (Apply 20% Safety Factor):</strong> <code>4,250W × 1.20 = 5,100 Watts</code> modeled required capacity.</li>
          <li><strong>Step 5 (Apply Fuel Derating Planning Assumption):</strong> If operating on Liquid Propane with an illustrative 0.90 derating factor: <code>5,100W ÷ 0.90 = 5,667 Watts</code> rated generator capacity.</li>
        </ol>

        <p style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", borderRadius: "0.5rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#065f46" }}>
          <strong>Planning Assessment:</strong> A generator rated at <strong>6,500W Running / 8,000W Starting Dual-Fuel</strong> exceeds the modeled requirement (5,667W) in this simplified example. Final selection must also verify continuous rating, starting capability, voltage, transfer equipment, generator fuel rating, and manufacturer specifications.
        </p>

        {/* Interactive Tool Callout Card */}
        <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", border: "1.5px solid #ea580c", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>🧮</span>
            <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#9a3412" }}>Need to Calculate Your Home&apos;s Specific Appliances?</h3>
          </div>
          <p style={{ margin: 0, color: "#7c2d12", fontSize: "0.95rem", lineHeight: 1.5 }}>
            Use our interactive online calculator to select your specific household appliances, choose your fuel type, and calculate customized running and starting wattage recommendations:
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

      {/* Formula Card */}
      <div id="formula-math">
        <FormulaCard
          title="Calculation Formula & Model Basis"
          formula="Required_Rated_W = [ (∑ P_running + max(P_starting,i − P_running,i)) × Safety_Factor ] ÷ (Fuel_Derating × Env_Derating)"
          formulaDescription="Sequential motor load calculation with multi-fuel and environmental derating planning factors."
          variables={[
            { symbol: "∑ P_running", label: "Total Running Watts", description: "Sum of continuous operational power for all simultaneously connected devices.", unit: "Watts" },
            { symbol: "max(P_starting,i − P_running,i)", label: "Peak Starting Surge Delta", description: "The single largest motor starting surge minus its running power.", unit: "Watts" },
            { symbol: "Safety_Factor", label: "Safety Margin", description: "Continuous operating reserve factor (typically 1.15 to 1.25).", unit: "ratio" },
            { symbol: "Fuel_Derating", label: "Fuel Derating Factor — Simplified Planning Assumption", description: "Gasoline = 1.0, Propane = 0.90, Natural Gas = 0.80 (illustrative planning values).", unit: "ratio" },
            { symbol: "Env_Derating", label: "Environmental Derating Factor — Simplified Planning Assumption", description: "1.0 − (Altitude_ft ÷ 1000 × 0.035) − ((Temp_F − 77) ÷ 10 × 0.01).", unit: "ratio" },
          ]}
          notes={[
            "Actual generator derating varies by engine, alternator, and manufacturer specifications.",
            "Transfer switch inlet boxes must be sized to match the generator maximum 240V amperage (e.g. NEMA L14-30 for up to 30A / 7,200W, NEMA 14-50 for up to 50A / 12,000W).",
          ]}
        />
      </div>

      {/* FAQ Section */}
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

      {/* Related Tools */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Related Emergency Backup &amp; Inrush Sizing Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Plan continuous backup resilience across fuel, inverter, and battery storage architectures:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Emergency Generator Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Select specific appliances, apply fuel derating factors, and compute running and starting generator wattage.
            </p>
            <Link href="/home-energy/generator-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Generator Sizing Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Portable Power Station Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate runtime hours for camping, CPAP machines, and blackouts with inverter tare loss and surge watts.
            </p>
            <Link href="/battery/portable-power-station-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Portable Power Station Calc →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔄 Inverter Sizing Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size off-grid and backup DC-to-AC inverters for continuous power draw and motor surge starting requirements.
            </p>
            <Link href="/battery/inverter-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Inverter Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔌 Appliance Wattage Audit</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Lookup nameplate running and starting watts for refrigerators, sump pumps, well pumps, and air compressors.
            </p>
            <Link href="/home-energy/appliance-wattage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Appliance Wattage Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/battery/battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Size Calculator</Link>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Voltage Drop Calculator</Link>
          <Link href="/guides/voltage-drop-and-wire-size-calculation-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Wire Sizing Guide</Link>
        </div>
      </section>

      {/* Methodology and Technical References */}
      <section style={{ marginTop: "3rem", padding: "1.5rem", border: "1px solid var(--line)", borderRadius: "0.75rem", background: "var(--surface)" }}>
        <h2 style={{ margin: "0 0 0.5rem" }}>Methodology &amp; Technical References</h2>
        <p style={{ margin: "0 0 1rem", fontSize: "0.95rem", color: "var(--ink)" }}>
          The calculation is a simplified planning model informed by the referenced technical literature and standards (including NFPA 70 / NEC Article 702, IEEE Std 446, and NEMA MG-1). Applicable code requirements and manufacturer instructions take precedence. For technical research on motor inrush envelopes, see our report on <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" style={{ color: "var(--brand-strong)", fontWeight: 700 }}>Deterministic Modeling of Inductive Motor Inrush Currents (PL-TR-2026-GEN02)</Link>. Review our <Link href="/methodology">calculation methodology</Link> and <Link href="/sources">engineering sources</Link>.
        </p>
        <AcademicCitationModal
          title="Emergency Generator Sizing &amp; Motor Inrush Load Guide"
          urlPath="/guides/emergency-generator-sizing-and-inrush-load-guide"
          year={2026}
        />
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}


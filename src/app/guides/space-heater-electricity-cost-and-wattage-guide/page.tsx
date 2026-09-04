import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SpaceHeaterCostCalculator } from "@/components/calculator/space-heater-cost-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Space Heater Electricity Cost & Wattage Guide",
  description: "Calculate space heater electricity costs, 1,500W power draw, thermostat duty cycles, zone heating vs. central heat pump savings, and NEC circuit safety.",
  canonicalPath: "/guides/space-heater-electricity-cost-and-wattage-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many watts does a standard space heater use, and why is 1,500W the maximum?",
    answer: "Most portable residential electric space heaters draw 1,500 Watts on High and 750 to 1,000 Watts on Low. 1,500 Watts is the practical limit under the National Electrical Code (NEC Article 210.19) for standard 120-Volt, 15-Amp residential branch circuits. Drawing 1,500W consumes 12.5 Amps (1,500W ÷ 120V = 12.5A), which approaches the continuous 80% thermal breaker limit (12 Amps continuous on a 15A breaker).",
  },
  {
    question: "How much does it cost to run a 1,500-watt space heater for 24 hours?",
    answer: "At the U.S. national average electricity rate of $0.16/kWh, running a 1,500W space heater continuously (100% duty cycle) costs $0.24 per hour, or $5.76 for 24 hours ($175.20/month). However, when regulated by an internal thermostat cycling at a typical 65% duty cycle, the actual cost drops to approximately $3.74 per 24-hour day ($113.88/month).",
  },
  {
    question: "How many BTUs of heat does a 1,500-watt space heater produce?",
    answer: "Because all electric resistance heating operates at 100% thermodynamic efficiency (converting 1 Watt of electrical energy into exactly 3.412142 BTU/hr of thermal energy), a 1,500-Watt space heater produces exactly 5,118 BTU/hr of heat output, regardless of whether it uses ceramic elements, oil-filled radiators, or infrared quartz bulbs.",
  },
  {
    question: "Is it cheaper to use a space heater or central heating?",
    answer: "A space heater is cheaper only for 'zone heating'—warming a single occupied room (e.g., a home office or bedroom) while setting the central whole-house thermostat back by 5°F to 10°F. However, trying to heat an entire home with multiple space heaters is significantly more expensive than running a central heat pump (which is 300% to 400% efficient with a COP of 3.0–4.0) or a high-efficiency natural gas furnace.",
  },
  {
    question: "Why do space heaters frequently trip circuit breakers?",
    answer: "A 1,500W heater draws 12.5 Amps on a 120V line. Standard residential bedroom and living room circuits are protected by 15-Amp circuit breakers. If a television, computer, lamp, or vacuum cleaner on the same shared branch circuit draws just 3 to 4 additional Amps, the total load exceeds the 15A thermal trip curve, causing the circuit breaker to disconnect power.",
  },
  {
    question: "What is the most energy-efficient type of space heater?",
    answer: "Thermodynamically, all electric resistance heaters (ceramic, micathermic, oil-filled, and infrared) convert electricity to heat at identical 100% efficiency (1 kWh in = 3,412 BTU out). However, oil-filled radiators provide the best sustained thermal comfort due to thermal inertia, while infrared heaters feel warmest fastest because they radiate directional heat directly to human skin without heating ambient air first.",
  },
];

export default function SpaceHeaterGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Space Heater vs Central Heating Electricity Cost Guide (1500W, Duty Cycles & Safety)",
    description: "Definitive thermal and electrical engineering guide: calculate space heater electricity cost, 1500W power draw, thermostat duty cycles, zone heating economics, and NEC 80% circuit limits.",
    route: "/guides/space-heater-electricity-cost-and-wattage-guide",
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "UL Standard 1278 (Movable and Wall-Hung Electric Room Heaters)",
      "NFPA 70 / NEC Article 210.19(A) (Branch Circuit Ampacity & Rating)",
      "NFPA 70 / NEC Article 210.20 (Overcurrent Protection 80% Continuous Rule)",
      "U.S. Department of Energy 10 CFR Part 430 (Space Heating Test Procedures)",
      "ASHRAE Standard 62.2 (Ventilation and Acceptable Indoor Air Quality)",
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
        <span aria-current="page">Space Heater Electricity Cost Guide</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">Thermal Thermodynamics &amp; Electrical Load Engineering</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Space Heater Electricity Cost &amp; Wattage Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          A definitive engineering guide to electric space heater power consumption and zone heating economics. Learn how Joule heating laws govern 1,500W maximum draws, model thermostat cycling duty cycles, evaluate space heater vs. central heat pump COP efficiency, and ensure NEC continuous circuit safety.
        </p>
      </header>

      <DirectAnswerCard
        keyword="space heater electricity cost formula"
        answer="Running a standard 1,500-Watt space heater costs approximately $0.24 per continuous hour at the U.S. national average electricity rate of $0.16/kWh ($0.17/hr at a typical 70% thermostat duty cycle). Overnight use (8 hours) costs $1.34 to $1.92 per night, totaling $40 to $58 per month for a single room."
        formula="Operating Cost ($) = (Watts ÷ 1,000) × Duty Cycle × Hours × Electricity Rate ($/kWh)"
        standardExample="1,500W Space Heater @ 70% duty cycle (1.05 kWh effective draw) running 8 hours/day at $0.16/kWh: Daily Cost = 1.05 × 8 × $0.16 = $1.34/day ($40.90/month). 100% continuous full-blast draw = $1.92/day ($58.44/month)."
        sourceAuthority="UL Standard 1278, NEC Article 210.19/210.20 & U.S. DOE Building Technologies Office"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Space Heater Running Cost Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Configure heater wattage (500W–2,000W), daily run-time, thermostat cycling percentage, and local utility rates to calculate exact hourly, 8-hour night, daily, monthly, and full winter heating expenses.
          </p>
        </div>
        <SpaceHeaterCostCalculator />
      </section>

      {/* Section 1: The Thermodynamics */}
      <section id="physics-and-formulas" style={{ marginTop: "2.5rem" }}>
        <h2>1. The Thermodynamics of Electric Resistance Heating (Joule&apos;s Law)</h2>
        <p>
          Unlike heat pumps that move thermal energy across an outdoor refrigerant loop, portable electric space heaters generate heat directly through <strong>Joule heating (resistive dissipation)</strong>. When electric current flows through a conductive nickel-chromium (Nichrome) wire or ceramic PTC heating element, atomic collisions convert 100% of electrical energy directly into thermal energy:
        </p>

        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Power (Watts) = Current (I)² × Resistance (R) = Voltage (V) × Current (I)
Thermal Heat Output = 1 Watt = 3.412142 BTU/hr`}</code>
        </pre>

        <h3>Why Are All Space Heaters Capped at 1,500 Watts?</h3>
        <p>
          In North America, standard wall receptacles operate at <strong>120 Volts on a 15-Ampere branch circuit</strong>. Applying Ohm&apos;s Law reveals that a 1,500W load draws 12.5 Amps:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`I = P ÷ V = 1,500 Watts ÷ 120 Volts = 12.5 Amperes`}</code>
        </pre>
        <p>
          Under <strong>NEC Article 210.19(A) and 210.20</strong>, any electrical load expected to operate continuously for 3 hours or more is classified as a <em>continuous load</em> and must not exceed <strong>80% of the circuit&apos;s maximum overcurrent rating</strong>:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Max Continuous Allowable Current on 15A Circuit = 15A × 0.80 = 12.0 Amperes (1,440 Watts)`}</code>
        </pre>
        <p>
          To maintain safety certifications under <strong>UL 1278</strong> and prevent household electrical fires, manufacturers strictly cap residential plug-in space heaters at 1,500 Watts (producing exactly <strong>5,118 BTU/hr</strong> of maximum heat output).
        </p>
      </section>

      {/* Section 2: Mathematical Formulas & Duty Cycles */}
      <section id="mathematical-formulas" style={{ marginTop: "2.5rem" }}>
        <h2>2. Mathematical Formulas: Continuous vs. Thermostat Duty Cycle Costs</h2>
        <p>
          A space heater with a built-in mechanical or digital thermostat does not draw 1,500 Watts continuously. Once the enclosed room reaches the setpoint temperature (e.g., 70°F / 21°C), the thermostat shuts off the heating element, only cycling back on when temperature drops.
        </p>

        <FormulaCard
          title="Space Heater Operating Cost Equation"
          formula="Operating Cost ($) = (P_watts / 1000) * (Duty_Cycle_Percent / 100) * Operating_Hours * Electricity_Rate"
          latexFormula="\text{Cost} = \left( \frac{P}{1000} \right) \cdot \eta_{\text{duty}} \cdot t_{\text{hours}} \cdot R_{\text{kWh}}"
          formulaDescription="Calculates the exact electricity expenditure for a resistive space heater, factoring in thermostat cycling duty fraction."
          variables={[
            { symbol: "P", label: "Heater Rated Power", description: "Nameplate wattage on High or Low setting (e.g. 1500W, 1000W, 750W)", unit: "Watts" },
            { symbol: "η_duty", label: "Thermostat Duty Cycle", description: "Percentage of time the heating element is energized (typically 0.60 to 0.75)", unit: "Fraction (0.1–1.0)" },
            { symbol: "t_hours", label: "Operating Time", description: "Daily operating duration (e.g., 8 hours overnight sleep)", unit: "Hours/day" },
            { symbol: "R_kWh", label: "Electricity Rate", description: "Local electric utility tariff per kilowatt-hour", unit: "$/kWh" },
          ]}
          notes={[
            "100% duty cycle (η_duty = 1.0) occurs only in uninsulated, drafty rooms or heaters without thermostats.",
            "Effective hourly energy draw = (Watts ÷ 1,000) × η_duty (e.g., 1,500W @ 70% duty cycle = 1.05 kWh per clock hour).",
            "Thermal heat produced = Watts × 3.412142 BTU/hr regardless of ceramic, infrared, or oil-filled technology.",
          ]}
          citationTitle="Resistive Thermal Modeling and Continuous Load Economics for Residential Space Heating"
          standardAuthority="UL Standard 1278 / NFPA 70 NEC Article 210 / U.S. DOE 10 CFR Part 430"
        />

        <h3>Electric Resistance vs. Heat Pump Coefficient of Performance (COP)</h3>
        <p>
          Thermodynamically, electric resistance space heaters operate at a <strong>Coefficient of Performance of exactly 1.0 (COP = 1.0)</strong>. By comparison, modern air-source heat pumps achieve a <strong>COP of 3.0 to 4.2</strong> in typical winter weather (30°F–50°F):
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Heat Pump Heat Output = 1 kWh Electricity → 3.0 to 4.2 kWh Thermal Energy (10,236 to 14,330 BTU)
Space Heater Heat Output = 1 kWh Electricity → 1.0 kWh Thermal Energy (3,412 BTU)`}</code>
        </pre>
      </section>

      {/* Section 3: Space Heater Wattage Matrix */}
      <section id="wattage-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>3. Space Heater Wattage, Room Size &amp; Operating Cost Reference Matrix</h2>
        <p>
          Operating costs scale directly with heater wattage, thermostat cycling, and local electric rates:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                <th style={{ padding: "0.75rem" }}>Heater Setting</th>
                <th style={{ padding: "0.75rem" }}>Rated Watts</th>
                <th style={{ padding: "0.75rem" }}>Heat Output (BTU/hr)</th>
                <th style={{ padding: "0.75rem" }}>Recommended Room Area</th>
                <th style={{ padding: "0.75rem" }}>Cost / Hr (@ $0.16/kWh, 70% Duty)</th>
                <th style={{ padding: "0.75rem" }}>Cost / 8-Hr Night</th>
                <th style={{ padding: "0.75rem" }}>Cost / Month (8h/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Personal / Desktop</td>
                <td style={{ padding: "0.75rem" }}>500 W</td>
                <td style={{ padding: "0.75rem" }}>1,706 BTU/hr</td>
                <td style={{ padding: "0.75rem" }}>Personal desk / footwell</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.056 / hr</td>
                <td style={{ padding: "0.75rem" }}>$0.45</td>
                <td style={{ padding: "0.75rem" }}>$13.63 / mo</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Low / Eco Setting</td>
                <td style={{ padding: "0.75rem" }}>750 W</td>
                <td style={{ padding: "0.75rem" }}>2,559 BTU/hr</td>
                <td style={{ padding: "0.75rem" }}>Small bathroom (75 sq ft)</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.084 / hr</td>
                <td style={{ padding: "0.75rem" }}>$0.67</td>
                <td style={{ padding: "0.75rem" }}>$20.45 / mo</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Medium Setting</td>
                <td style={{ padding: "0.75rem" }}>1,000 W</td>
                <td style={{ padding: "0.75rem" }}>3,412 BTU/hr</td>
                <td style={{ padding: "0.75rem" }}>Small bedroom (100–120 sq ft)</td>
                <td style={{ padding: "0.75rem" }}>$0.112 / hr</td>
                <td style={{ padding: "0.75rem" }}>$0.90</td>
                <td style={{ padding: "0.75rem" }}>$27.27 / mo</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>High / Max (Thermostat)</td>
                <td style={{ padding: "0.75rem" }}>1,500 W</td>
                <td style={{ padding: "0.75rem" }}>5,118 BTU/hr</td>
                <td style={{ padding: "0.75rem" }}>Standard room (150–200 sq ft)</td>
                <td style={{ padding: "0.75rem", color: "#ea580c", fontWeight: 700 }}>$0.168 / hr</td>
                <td style={{ padding: "0.75rem" }}>$1.34</td>
                <td style={{ padding: "0.75rem" }}>$40.90 / mo</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>High / Max (Continuous 100%)</td>
                <td style={{ padding: "0.75rem" }}>1,500 W</td>
                <td style={{ padding: "0.75rem" }}>5,118 BTU/hr</td>
                <td style={{ padding: "0.75rem" }}>Drafty / uninsulated garage</td>
                <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.240 / hr</td>
                <td style={{ padding: "0.75rem" }}>$1.92</td>
                <td style={{ padding: "0.75rem" }}>$58.44 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Zone Heating Case Study */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>4. Zone Heating Case Study: When Does a Space Heater Save You Money?</h2>
        <p>
          The golden rule of space heater economics is <strong>Zone Heating</strong>: heating only the room you are currently occupying rather than heating unoccupied space across a 2,000+ sq ft home.
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.25rem", margin: "1rem 0" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario Comparison (8-Hour Overnight Sleep Period):</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "0.75rem" }}>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(220, 38, 38, 0.06)", border: "1px solid rgba(220, 38, 38, 0.25)" }}>
              <h4 style={{ margin: "0 0 0.5rem", color: "#dc2626", fontSize: "0.95rem" }}>❌ Option A: Whole-House Central Heating at 70°F</h4>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                Maintaining a 2,200 sq ft home at 70°F overnight with a central 80,000 BTU gas furnace or 3.5-ton heat pump during 28°F outdoor weather requires approximately <strong>2.5 therms of gas ($3.25/night)</strong> or <strong>24 kWh of heat pump electricity ($3.84/night)</strong>.<br />
                <strong>Monthly Overnight Cost: $98 to $115/month</strong>
              </p>
            </div>

            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(22, 163, 74, 0.06)", border: "1px solid rgba(22, 163, 74, 0.25)" }}>
              <h4 style={{ margin: "0 0 0.5rem", color: "#16a34a", fontSize: "0.95rem" }}>✅ Option B: Thermostat Setback (62°F) + Bedroom Space Heater (70°F)</h4>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                Setting central thermostat back to 62°F cuts whole-house baseline heat loss by 40% ($1.95/night central load). Running one 1,500W space heater at 65% duty cycle in the occupied master bedroom adds <strong>7.8 kWh ($1.25/night)</strong>.<br />
                <strong>Total Combined Cost: $3.20/night ($96.00/month) — Plus improved comfort</strong>
              </p>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "1rem" }}>
          <strong>When Space Heaters Cause Huge Electric Bills:</strong> If a homeowner places three 1,500W space heaters in separate rooms while leaving the central system running, power consumption explodes to <strong>4,500 continuous Watts (31.5 kWh per 7-hour evening = $5.04/day = $151.20/month just in space heater electricity)</strong>, completely destroying household energy efficiency.
        </p>
      </section>

      {/* Section 5: Electrical Safety & Circuit Breakers */}
      <section id="safety-and-codes" style={{ marginTop: "2.5rem" }}>
        <h2>5. Electrical Safety, Wire Gauges &amp; Circuit Breaker Rules (NEC 210)</h2>
        <p>
          Space heaters cause approximately <strong>1,700 residential structure fires annually</strong> in the United States according to the National Fire Protection Association (NFPA). Electrical compliance is essential:
        </p>

        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Never Use Extension Cords or Power Strips:</strong> Most cheap household extension cords use 16 AWG or 18 AWG copper wire rated for only 10 to 13 Amps. Carrying 12.5 Amps continuously causes severe resistive heating ($I^2 R$), melting the PVC insulation and creating direct electrical fire hazards. Always plug space heaters directly into a wall outlet.</li>
          <li><strong>Dedicated 15A or 20A Branch Circuit:</strong> Verify that high-wattage appliances (microwaves, hair dryers, gaming PCs, laser printers) are not on the same circuit breaker. Use our <Link href="/guides/voltage-drop-and-wire-size-calculation-guide">Voltage Drop &amp; Wire Sizing Guide</Link> to check line losses on long circuit runs.</li>
          <li><strong>3-Foot Clearance Rule:</strong> Maintain a minimum of 36 inches (0.9 meters) of clearance from combustible materials (bedding, curtains, furniture, paper).</li>
          <li><strong>UL 1278 Safety Features:</strong> Ensure your unit is certified with automatic <em>tip-over shutoff switches</em> and internal <em>thermal cut-off fuses</em> that prevent overheat runaway.</li>
        </ul>

        <StandardsBadge category="home-energy" />
      </section>

      {/* Section 6: Key Rules of Thumb */}
      <section id="rules-of-thumb" style={{ marginTop: "2.5rem" }}>
        <h2>6. Rules of Thumb for Minimizing Space Heating Costs</h2>
        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>The 10 Watts per Square Foot Rule:</strong> Sizing guideline for standard 8-foot ceiling rooms with normal insulation. A 150 sq ft bedroom requires 150 × 10 = 1,500 Watts. A 100 sq ft office needs only 1,000 Watts.</li>
          <li><strong>Choose Oil-Filled Radiators for Bedrooms:</strong> Oil-filled radiators warm diathermic oil, providing silent, draft-free, steady radiant heat with long thermal retention that prevents abrupt on/off temperature swings.</li>
          <li><strong>Use Ceramic Fan Heaters for Quick Warm-Ups:</strong> Ceramic elements heat up instantly and circulate air rapidly, making them ideal for warming bathrooms or drafty desk spaces in under 5 minutes.</li>
          <li><strong>Switch to Heat Pumps for Whole-Home Heating:</strong> For whole-home heating, modern cold-climate heat pumps deliver 3× the heat output per dollar compared to resistive space heaters. (See our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide">Central AC &amp; Heat Pump Cost Guide</Link>).</li>
        </ul>
      </section>

      {/* Section 7: FAQs */}
      <section id="faqs" style={{ marginTop: "3rem" }}>
        <h2>Frequently Asked Questions About Space Heater Electricity &amp; Costs</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {FAQS.map((faq, idx) => (
            <details key={idx} style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <summary style={{ fontWeight: 700, cursor: "pointer", color: "var(--brand-strong)", fontSize: "1.02rem" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--ink)", fontSize: "0.95rem" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 8: Related Calculators & Planning Paths */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem", color: "var(--brand-strong)" }}>Related Home Energy &amp; Heating Planning Tools</h2>
        <p style={{ marginBottom: "1rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Explore connected calculators to model home thermal efficiency and electrical consumption:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/home-energy/space-heater-cost-calculator" className="button secondary-button">Space Heater Calculator</Link>
          <Link href="/home-energy/air-conditioner-cost-calculator" className="button secondary-button">AC &amp; Heat Pump Cost Calculator</Link>
          <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button">Electricity Usage Calculator</Link>
          <Link href="/home-energy/energy-bill-calculator" className="button secondary-button">Energy Bill Calculator</Link>
          <Link href="/home-energy/appliance-wattage-calculator" className="button secondary-button">Appliance Wattage Calculator</Link>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button">Voltage Drop &amp; Wire Size Calculator</Link>
        </div>
      </section>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <AcademicCitationModal
          title="Space Heater vs Central Heating Electricity Cost Guide"
          urlPath="/guides/space-heater-electricity-cost-and-wattage-guide"
        />
      </div>
    </article>
  );
}

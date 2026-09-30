import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SpaceHeaterCostCalculator } from "@/components/calculator/space-heater-cost-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { MathDisplay } from "@/components/common/math-display";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Space Heater Electricity Cost & Wattage Guide",
  description: "Calculate space heater electricity costs, 1,500W power draw, thermostat duty cycles, zone heating vs. central heat pump COP efficiency, and electrical circuit safety.",
  canonicalPath: "/guides/space-heater-electricity-cost-and-wattage-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many watts does a standard space heater use, and why is 1,500W the common rating?",
    answer: "Most portable residential electric space heaters draw 1,500 Watts on High and 750 to 1,000 Watts on Low. 1,500 Watts is the standard design maximum under safety product standards (such as UL 1278) for portable equipment intended for standard 120-Volt, 15-Amp residential branch circuits. At 120 V, a 1,500 W heater draws 12.5 Amps (1,500 W ÷ 120 V = 12.5 A). Under NEC Section 210.19(A) and 210.20, continuous loads are limited to 80% of circuit rating (12 Amps on a 15 A breaker), meaning a 1,500 W heater utilizes virtually the entire continuous capacity of a standard 15 A circuit.",
  },
  {
    question: "How much does it cost to run a 1,500-watt space heater for 8 hours or 24 hours?",
    answer: "At a baseline electricity rate of $0.18/kWh: Running a 1,500 W heater continuously (100% duty cycle) costs $0.27 per hour ($2.16 for an 8-hour period, or $6.48 for 24 hours). When regulated by a thermostat cycling at an illustrative 70% duty cycle, the effective power draw is 1.05 kW, reducing the estimated cost to $0.19 per hour ($1.51 for an 8-hour night, or $45.36 per 30-day month). Actual expenses vary with thermostat setting, room insulation, and utility tariffs.",
  },
  {
    question: "How many BTUs of heat does a 1,500-watt space heater produce?",
    answer: "Because electric resistance heating operates at 100% point-of-use thermodynamic conversion efficiency (converting 1 Watt of electrical power into 3.412142 BTU/hr of thermal energy), a 1,500-Watt heater produces 5,118 BTU/hr of heat output while energized, regardless of whether it utilizes ceramic elements, oil-filled radiators, or infrared quartz bulbs.",
  },
  {
    question: "Is it cheaper to use a space heater or central heating?",
    answer: "A space heater is typically more economical only when used for 'zone heating'—warming a single occupied room (such as a home office or bedroom) while setting the central thermostat back by 5°F to 10°F. Attempting to heat an entire home with multiple space heaters is significantly more expensive than operating a central heat pump (which delivers a Coefficient of Performance of 3.0 to 4.0 under rating conditions) or a high-efficiency natural gas furnace.",
  },
  {
    question: "Why do space heaters frequently trip circuit breakers?",
    answer: "A 1,500 W space heater draws 12.5 Amperes at 120 Volts. In most residential bedrooms and living rooms, multiple wall outlets share a single 15-Amp branch circuit breaker. If other appliances on the same circuit (such as a television, computer, lighting, or vacuum) draw even 3 to 4 additional Amps, total current exceeds the breaker's 15 A thermal trip threshold, causing it to trip.",
  },
  {
    question: "What is the difference in heating performance among ceramic, oil-filled, and infrared heaters?",
    answer: "All electric resistance heaters convert electricity to heat at the same direct conversion ratio (1 kWh = 3,412 BTU). However, heat delivery mechanisms differ: oil-filled radiators offer diathermic thermal inertia for steady, silent warmth; ceramic fan heaters circulate convective warm air rapidly; and infrared heaters project radiant electromagnetic heat directly to occupants without first heating the ambient air volume.",
  },
];

export default function SpaceHeaterGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Space Heater Electricity Cost & Wattage Sizing Guide",
    description: "Engineering guide to electric space heater power consumption, 1,500W circuit sizing, thermostat duty cycles, zone heating economics, and heat pump COP comparisons.",
    route: "/guides/space-heater-electricity-cost-and-wattage-guide",
    datePublished: "2026-09-02",
    dateModified: "2026-09-30",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "UL 1278: Standard for Movable and Wall-Hung Electric Room Heaters",
      "NFPA 70: National Electrical Code (NEC), 2026 Edition — Articles 100, 210.19, 210.20",
      "U.S. Department of Energy (DOE): Building Technologies Office Space Heating Standards",
      "AHRI Standard 210/240: Performance Rating of Unitary Air-Conditioning & Air-Source Heat Pump Equipment",
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
          An educational engineering guide to electric space heater energy consumption and zone heating economics. Learn how Joule heating principles govern 1,500W ratings, model thermostat cycling duty cycles, evaluate space heater vs. central heat pump COP efficiency, and understand branch-circuit electrical safety.
        </p>
      </header>

      <DirectAnswerCard
        keyword="space heater electricity cost formula"
        answer="Running a standard 1,500-Watt electric space heater costs approximately $0.27 per continuous hour at a baseline rate of $0.18/kWh ($0.19/hr at an illustrative 70% thermostat duty cycle). An 8-hour scheduled period costs approximately $1.51 to $2.16, totaling $45.36 to $64.80 per 30-day month for a single room."
        formula="Estimated Cost ($) = (Watts ÷ 1,000) × Duty Cycle × Operating Hours × Electricity Rate ($/kWh)"
        standardExample="1,500W Heater @ 70% duty cycle (1.05 kW effective draw) running 8 hours/day at $0.18/kWh: Daily Cost = 1.05 × 8 × $0.18 = $1.51/day ($45.36/month). Continuous 100% draw = $2.16/day ($64.80/month)."
        sourceAuthority="UL Standard 1278, NFPA 70 (NEC) Article 210 & U.S. DOE Energy Saver Guidelines"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Interactive Space Heater Running Cost Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Configure heater wattage (400W–2,000W), daily run-time, thermostat cycling percentage, and local utility rates to estimate hourly, 8-hour scheduled, daily, monthly (30-day), and winter season heating expenses.
          </p>
        </div>
        <SpaceHeaterCostCalculator />
      </section>

      {/* Section 1: The Thermodynamics */}
      <section id="physics-and-formulas" style={{ marginTop: "2.5rem" }}>
        <div id="how-to-guide">
          <h2>1. The Thermodynamics of Electric Resistance Heating (Joule&apos;s Law)</h2>
          <p>
            Unlike heat pumps that transfer ambient thermal energy via a refrigeration cycle, portable electric space heaters generate heat directly through <strong>Joule heating (resistive dissipation)</strong>. When electric current flows through a resistive conductor (such as a nickel-chromium alloy or ceramic PTC element), electrical energy is converted directly into thermal energy at 100% point-of-use efficiency:
          </p>

          <MathDisplay
            title="Joule Heating Law & Thermal Conversion"
            copyText="P = I^2 * R = V * I | 1 Watt = 3.412142 BTU/hr"
            benchmark="1 Watt = 3.412142 BTU/hr (100% resistive thermal conversion)"
          >
            {"P = I² × R = V × I   |   1 Watt = 3.412142 BTU/hr"}
          </MathDisplay>

          <h3>Why Are Most Residential Plug-In Heaters Rated at 1,500 Watts?</h3>
          <p>
            In North American residential buildings, general-purpose wall receptacles operate at <strong>120 Volts on 15-Ampere branch circuits</strong>. Applying Ohm&apos;s Law indicates that a 1,500 W load draws 12.5 Amps:
          </p>
          <MathDisplay
            title="Ohm's Law Current Draw"
            copyText="I = P / V = 1500 / 120 = 12.5 A"
            benchmark="1,500W ÷ 120V = 12.5 Amperes continuous load"
          >
            {"I = P / V = 1,500 W ÷ 120 V = 12.5 A"}
          </MathDisplay>
          <p>
            Under <strong>NEC Section 210.19(A) and Section 210.20</strong>, circuits supplying continuous loads (loads operating for 3 hours or more) must have overcurrent protection sized at not less than 125% of the continuous load (equivalent to loading a standard breaker to a maximum of 80%, or <strong>12.0 Amps on a 15 A circuit</strong>).
          </p>
          <p>
            To satisfy safety listing standards under <strong>UL 1278</strong> (Standard for Movable and Wall-Hung Electric Room Heaters) and prevent overloading shared household branch circuits, portable residential plug-in space heaters are standardized at a maximum of 1,500 Watts (producing <strong>5,118 BTU/hr</strong>). Higher-wattage heating equipment (such as 2,000 W or 3,000 W units) requires dedicated 20 A circuits or 240 V installations.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            <em>Safety Disclaimer:</em> This calculation model provides educational screening estimates. It does not evaluate specific building wiring conditions, branch circuit capacity, or electrical code compliance for a particular installation. Consult a licensed electrical professional for wiring assessments.
          </p>
        </div>
      </section>

      {/* Section 2: Mathematical Formulas & Duty Cycles */}
      <section id="formula-math" style={{ marginTop: "2.5rem" }}>
        <div id="mathematical-formulas">
          <h2>2. Mathematical Formulas: Continuous vs. Thermostat Duty Cycle Modeling</h2>
          <p>
            A space heater equipped with an adjustable thermostat does not draw full power continuously once the room reaches the setpoint. The thermostat cycles the heating element on and off to maintain room temperature.
          </p>

          <FormulaCard
            title="Space Heater Operating Cost Equation"
            formula="Operating Cost ($) = (P_watts / 1000) × Duty_Cycle_Fraction × Operating_Hours × Electricity_Rate"
            latexFormula="\text{Cost} = \left( \frac{P}{1000} \right) \cdot \eta_{\text{duty}} \cdot t_{\text{hours}} \cdot R_{\text{kWh}}"
            formulaDescription="Calculates estimated electricity cost for a resistive space heater based on rated wattage, thermostat cycling duty fraction, run time, and utility rates."
            variables={[
              { symbol: "P", label: "Heater Rated Power", description: "Nameplate wattage on High or Low setting (e.g., 1,500W, 1,000W, 750W)", unit: "Watts" },
              { symbol: "η_duty", label: "Thermostat Duty Cycle", description: "Fraction of time heating element is energized (e.g., 0.70 for 70% illustrative duty cycle)", unit: "Fraction (0.1–1.0)" },
              { symbol: "t_hours", label: "Operating Time", description: "Scheduled operating duration (e.g., 8 hours per day)", unit: "Hours/day" },
              { symbol: "R_kWh", label: "Electricity Rate", description: "Local electric utility tariff per kilowatt-hour", unit: "$/kWh" },
            ]}
            notes={[
              "100% duty cycle (η_duty = 1.0) represents continuous operation in uninsulated rooms or heaters without thermostat regulation.",
              "Effective hourly energy draw = (Watts ÷ 1,000) × η_duty (e.g., 1,500W @ 70% duty cycle = 1.05 kWh per operating hour).",
              "Heat produced = Watts × 3.412142 BTU/hr across all electric resistance heater technologies.",
            ]}
            citationTitle="Resistive Thermal Modeling and Continuous Load Economics for Residential Space Heating"
            standardAuthority="UL Standard 1278 / NFPA 70 (NEC) Article 210 / U.S. DOE Energy Saver"
          />

          <h3>Electric Resistance vs. Heat Pump Coefficient of Performance (COP)</h3>
          <p>
            Direct electric resistance heating operates at a <strong>Coefficient of Performance of 1.0 (COP = 1.0)</strong>, delivering 1 kWh of thermal output for every 1 kWh of electrical input. In contrast, modern air-source heat pumps transfer heat from the outside air, achieving a <strong>COP of 3.0 to 4.0 under standard rating conditions (AHRI 210/240)</strong> in moderate winter weather (35°F–50°F):
          </p>
          <MathDisplay
            title="Thermal Performance Comparison: Heat Pump COP vs. Resistance COP"
            copyText="COP_heatpump = 3.0 to 4.0 | COP_resistance = 1.0"
            benchmark="Heat pump moves 3.0–4.0x more thermal energy per kWh of electricity compared to direct resistive heat under mild-to-moderate winter conditions"
          >
            {"Heat Pump COP (3.0–4.0 @ rating conditions) > Resistance Heater COP (1.0 direct conversion)"}
          </MathDisplay>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
            <em>Note on COP:</em> Heat pump COP varies with outdoor ambient temperature, heating load, and equipment design, decreasing at sub-zero temperatures.
          </p>
        </div>
      </section>

      {/* Section 3: Space Heater Wattage Matrix */}
      <section id="sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <div id="wattage-matrix">
          <h2>3. Space Heater Wattage, Estimated Heat Output &amp; Cost Reference Matrix</h2>
          <p>
            Estimated operating costs across common heater power settings at a baseline rate of <strong>$0.18/kWh</strong>:
          </p>

          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                  <th style={{ padding: "0.75rem" }}>Heater Setting</th>
                  <th style={{ padding: "0.75rem" }}>Rated Watts</th>
                  <th style={{ padding: "0.75rem" }}>Heat Output</th>
                  <th style={{ padding: "0.75rem" }}>Typical Application</th>
                  <th style={{ padding: "0.75rem" }}>Cost / Hr (@ 70% Duty)*</th>
                  <th style={{ padding: "0.75rem" }}>Cost / 8-Hr Night*</th>
                  <th style={{ padding: "0.75rem" }}>Cost / Month (30 Days)*</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Personal / Desktop</td>
                  <td style={{ padding: "0.75rem" }}>500 W</td>
                  <td style={{ padding: "0.75rem" }}>1,706 BTU/hr</td>
                  <td style={{ padding: "0.75rem" }}>Personal desk / footwell</td>
                  <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.063 / hr</td>
                  <td style={{ padding: "0.75rem" }}>$0.50</td>
                  <td style={{ padding: "0.75rem" }}>$15.12 / mo</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Low / Eco Setting</td>
                  <td style={{ padding: "0.75rem" }}>750 W</td>
                  <td style={{ padding: "0.75rem" }}>2,559 BTU/hr</td>
                  <td style={{ padding: "0.75rem" }}>Small bathroom / nursery</td>
                  <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.095 / hr</td>
                  <td style={{ padding: "0.75rem" }}>$0.76</td>
                  <td style={{ padding: "0.75rem" }}>$22.68 / mo</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Medium Setting</td>
                  <td style={{ padding: "0.75rem" }}>1,000 W</td>
                  <td style={{ padding: "0.75rem" }}>3,412 BTU/hr</td>
                  <td style={{ padding: "0.75rem" }}>Small bedroom / office</td>
                  <td style={{ padding: "0.75rem" }}>$0.126 / hr</td>
                  <td style={{ padding: "0.75rem" }}>$1.01</td>
                  <td style={{ padding: "0.75rem" }}>$30.24 / mo</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Standard High (Thermostat)</td>
                  <td style={{ padding: "0.75rem" }}>1,500 W</td>
                  <td style={{ padding: "0.75rem" }}>5,118 BTU/hr</td>
                  <td style={{ padding: "0.75rem" }}>Standard room (70% duty cycle)</td>
                  <td style={{ padding: "0.75rem", color: "#ea580c", fontWeight: 700 }}>$0.189 / hr</td>
                  <td style={{ padding: "0.75rem" }}>$1.51</td>
                  <td style={{ padding: "0.75rem" }}>$45.36 / mo</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Standard High (100% Continuous)</td>
                  <td style={{ padding: "0.75rem" }}>1,500 W</td>
                  <td style={{ padding: "0.75rem" }}>5,118 BTU/hr</td>
                  <td style={{ padding: "0.75rem" }}>Drafty / uninsulated space</td>
                  <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.270 / hr</td>
                  <td style={{ padding: "0.75rem" }}>$2.16</td>
                  <td style={{ padding: "0.75rem" }}>$64.80 / mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
            *Calculated at the default $0.18/kWh rate. U.S. residential electricity prices range from approximately $0.12/kWh to $0.35/kWh depending on state and utility tariff (U.S. EIA data).
          </p>
        </div>
      </section>

      {/* Section 4: Zone Heating Case Study */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <div id="worked-examples">
          <h2>4. Zone Heating Economics: Space Heater vs. Central Heating Case Study</h2>
          <p>
            The economic benefit of a space heater depends on <strong>Zone Heating</strong>—heating only the occupied room while setting back the central thermostat across unoccupied areas of the home.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.25rem", margin: "1rem 0" }}>
            <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>Modeled Comparison (2,200 sq ft Home, 8-Hour Overnight Period @ 28°F Outdoor):</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "0.75rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(220, 38, 38, 0.06)", border: "1px solid rgba(220, 38, 38, 0.25)" }}>
                <h4 style={{ margin: "0 0 0.5rem", color: "#dc2626", fontSize: "0.95rem" }}>❌ Scenario A: Whole-House Central Heating at 70°F</h4>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                  Maintaining an entire 2,200 sq ft home at 70°F overnight with an 80% AFUE natural gas furnace requires approximately <strong>2.3 therms ($2.99/night @ $1.30/therm)</strong>, or with a central heat pump (COP ~2.8 @ 28°F) requires approximately <strong>24 kWh ($4.32/night @ $0.18/kWh)</strong>.<br />
                  <strong>Monthly Overnight Cost: ~$90 to $130 / month</strong>
                </p>
              </div>

              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(22, 163, 74, 0.06)", border: "1px solid rgba(22, 163, 74, 0.25)" }}>
                <h4 style={{ margin: "0 0 0.5rem", color: "#16a34a", fontSize: "0.95rem" }}>✅ Scenario B: Central Setback (62°F) + Bedroom Space Heater (70°F)</h4>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                  Setting the central thermostat back to 62°F reduces whole-house overnight heat loss by approximately 25%–30% (~$2.10/night gas central load). Operating one 1,500W space heater in the occupied bedroom at a 70% duty cycle adds <strong>8.4 kWh ($1.51/night @ $0.18/kWh)</strong>.<br />
                  <strong>Total Combined Cost: ~$3.61/night (~$108/month) with targeted comfort</strong>
                </p>
              </div>
            </div>
          </div>

          <p style={{ marginTop: "1rem", fontSize: "0.92rem", color: "var(--ink)" }}>
            <strong>When Space Heaters Increase Heating Bills:</strong> Operating multiple space heaters simultaneously throughout several rooms without central setback rapidly multiplies electricity consumption. Running three 1,500 W space heaters at 70% duty cycle consumes <strong>25.2 kWh per 8-hour period ($4.54/day or $136.08/month)</strong>, exceeding the cost of operating an efficient central heat pump.
          </p>
        </div>
      </section>

      {/* Section 5: Electrical Safety & Circuit Breakers */}
      <section id="safety-and-codes" style={{ marginTop: "2.5rem" }}>
        <h2>5. Electrical Safety, Extension Cords &amp; Circuit Loading (NEC 210)</h2>
        <p>
          According to the National Fire Protection Association (NFPA) heating fire safety research, portable heating equipment is involved in a significant portion of home heating fires, with failure to maintain proper clearance from combustible materials being the primary contributing factor.
        </p>

        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Direct Wall Receptacle Connection:</strong> Always plug space heaters directly into a wall outlet. Standard household extension cords (often 16 AWG or 18 AWG) are not rated for prolonged 12.5 A continuous loads and can overheat due to conductor resistance ($I^2 R$) and contact point degradation.</li>
          <li><strong>Branch Circuit Capacity Coordination:</strong> Ensure that high-draw appliances (such as microwaves, coffee makers, or hair dryers) are not operated simultaneously on the same 15 A or 20 A branch circuit.</li>
          <li><strong>3-Foot Clearance Rule:</strong> Maintain a minimum clearance of 36 inches (0.9 meters) from bedding, drapery, upholstery, and combustible materials.</li>
          <li><strong>UL 1278 Certified Safety Mechanisms:</strong> Ensure portable heaters feature automatic <em>tip-over shutoff switches</em> and internal <em>thermal cut-off limiters</em>.</li>
        </ul>

        <StandardsBadge category="home-energy" />
      </section>

      {/* Section 6: Key Rules of Thumb */}
      <section id="rules-of-thumb" style={{ marginTop: "2.5rem" }}>
        <h2>6. Engineering Rules of Thumb &amp; Sizing Considerations</h2>
        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>10 Watts per Square Foot Heuristic:</strong> A common rule-of-thumb sizing estimate for rooms with standard 8-foot ceilings and average insulation (e.g., 150 sq ft room $\times$ 10 W/sq ft $\approx$ 1,500 W). Actual heating load depends on building envelope insulation, window area, infiltration, and outdoor design temperatures.</li>
          <li><strong>Thermal Inertia with Oil-Filled Radiators:</strong> Diathermic oil radiators retain heat longer and provide consistent radiant comfort with less abrupt temperature fluctuations compared to fan-forced units.</li>
          <li><strong>Rapid Heat Delivery with Ceramic Heaters:</strong> Ceramic PTC elements heat rapidly and distribute convective warm air quickly in localized spaces.</li>
          <li><strong>Heat Pumps for Whole-Home Efficiency:</strong> For primary whole-building heating, modern air-source heat pumps provide significantly higher seasonal efficiency compared to direct resistance heating. (See our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide">Central AC &amp; Heat Pump Cost Guide</Link>).</li>
        </ul>
      </section>

      {/* Section 7: FAQs */}
      <section id="faq-section" style={{ marginTop: "3rem" }}>
        <div id="faqs">
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
        </div>
      </section>

      {/* Section 8: Related Calculators & Planning Paths */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Compare Space Heating with Whole-Home HVAC Calculators</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Integrate space heater calculations with whole-home HVAC and utility auditing engines to optimize your annual energy budget:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>❄️ Air Conditioner &amp; Cooling Cost</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate hourly, monthly, and seasonal operating costs for window AC units, ductless mini-splits, and central cooling.
            </p>
            <Link href="/home-energy/air-conditioner-cost-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Air Conditioner Cost Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔥 Cold-Climate Heat Pump Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model COP efficiency derating, seasonal HSPF2 benchmarks, and auxiliary electric strip heat staging costs in sub-freezing weather.
            </p>
            <Link href="/home-energy/heat-pump-cost-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Heat Pump Running Cost Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Household Electricity Consumption</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Audit your home&apos;s daily and monthly kilowatt-hour consumption across all major appliances and duty cycles.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>💡 Energy Bill &amp; Tiered Rates</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Estimate your monthly utility power bill with tiered rates, fixed service charges, and seasonal peak multipliers.
            </p>
            <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Energy Bill Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/space-heater-cost-calculator" className="button" style={{ fontSize: "0.85rem" }}>⚡ Space Heater Cost Calculator →</Link>
          <Link href="/home-energy/appliance-wattage-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Appliance Wattage Calculator</Link>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Voltage Drop &amp; Wire Size Calculator</Link>
          <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Central AC &amp; Heat Pump Guide</Link>
        </div>
      </section>

      {/* Section 9: Methodology & Sources */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards References</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          The calculation models and safety criteria in this guide reference the following electrical and thermal standards:
        </p>
        <ul style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)", paddingLeft: "1.25rem", margin: "0.75rem 0 1.25rem" }}>
          <li><strong>UL 1278 (Standard for Movable and Wall-Hung Electric Room Heaters):</strong> Construction, thermal cut-off, and tip-over safety listing requirements for portable residential room heaters.</li>
          <li><strong>NFPA 70: National Electrical Code (NEC), 2026 Edition:</strong> Branch-circuit ampacity (Section 210.19) and continuous-load overcurrent protection ratings (Section 210.20).</li>
          <li><strong>U.S. Department of Energy (DOE) Energy Saver:</strong> Guidelines on zone heating, thermostat setbacks, and space heating efficiency.</li>
          <li><strong>AHRI Standard 210/240:</strong> Unitary heat pump performance and Coefficient of Performance (COP) rating methodology.</li>
        </ul>

        <div style={{ padding: "1rem", borderRadius: "0.6rem", background: "var(--soft, #f8fafc)", border: "1px solid var(--line)", fontSize: "0.85rem", color: "var(--muted)", margin: "1rem 0" }}>
          <strong>Educational Disclaimer:</strong> This guide provides screening-level energy estimation calculations. Actual heating costs depend on room dimensions, ceiling height, building envelope insulation, window area, outdoor temperatures, and specific electric utility rate structures.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
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


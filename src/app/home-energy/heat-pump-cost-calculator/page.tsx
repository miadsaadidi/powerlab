import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { HeatPumpCostCalculator } from "@/components/calculator/heat-pump-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("heat-pump-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "Heat Pump Cost Calculator — Seasonal Heating Cost vs Gas, Propane & Oil",
  description:
    "Compare seasonal heat pump operating costs against natural gas, propane, and fuel oil furnaces using delivered thermal demand, seasonal COP, and local fuel tariffs.",
  canonicalPath: "/home-energy/heat-pump-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "Is a heat pump cheaper to run than a natural gas furnace?",
    answer:
      "Whether a heat pump costs less to run than a natural gas furnace depends on local utility rates, furnace efficiency, and seasonal climate. Heat pumps deliver heat at a seasonal Coefficient of Performance (COP) typically between 2.5 and 3.8 (delivering 2.5 to 3.8 units of heat per unit of electricity consumed). In regions with moderate electricity rates ($0.12 to $0.18/kWh) and typical natural gas tariffs ($1.30 to $1.60/therm), heat pumps and modern 80%–96% gas furnaces have comparable annual operating costs. When replacing delivered propane ($3.20/gal) or heating oil ($4.10/gal), heat pumps typically offer substantial annual operating savings depending on heating demand and local prices.",
  },
  {
    question: "What is the difference between HSPF and HSPF2 ratings?",
    answer:
      "HSPF2 (Heating Seasonal Performance Factor 2) is the Department of Energy test standard mandated under 10 CFR Part 430 Appendix M1. Unlike legacy HSPF (Appendix M) which tested blowers against an external static pressure (ESP) of 0.15 to 0.20 inches of water column (in. w.c.), HSPF2 tests at 0.50 in. w.c. to reflect real-world residential ductwork resistance. As a result, HSPF2 ratings are approximately 15% lower than legacy HSPF numbers for the exact same physical equipment (e.g., 8.8 HSPF ≈ 7.5 HSPF2 in Region IV).",
  },
  {
    question: "How much does an electric heat pump cost to run per hour?",
    answer:
      "At an illustrative reference rate of 18.34¢/kWh ($0.1834/kWh), a 3-ton (36,000 BTU/h) heat pump drawing an illustrative 3.30 kW in mild heating weather (COP 3.2) costs approximately $0.61 per continuous run hour. In freezing weather (COP 2.0), compressor power demand increases to approximately 5.28 kW ($0.97/hr). If an illustrative 10 kW supplemental electric resistance heat kit activates during severe cold snaps, total power draw reaches approximately 15.28 kW, costing about $2.80 per continuous hour. Actual input depends on equipment model, ambient temperature, and defrost cycles.",
  },
  {
    question: "What is COP and how does it relate to outdoor temperature?",
    answer:
      "COP (Coefficient of Performance) measures thermal heat energy delivered divided by electrical energy consumed. A COP of 3.0 means 3.0 units of heat delivered per 1.0 unit of electricity consumed. In sub-freezing air, lower ambient vapor density decreases refrigerant mass flow, reducing compressor capacity and COP. In illustrative AHRI test conditions, standard single-stage heat pumps drop from approximately COP 3.4 at 47°F to COP 1.3 at 0°F, while cold-climate inverter heat pumps (ccASHP) with variable-speed compressors maintain approximately COP 1.8 to 2.2 at 0°F and operate into sub-zero conditions.",
  },
  {
    question: "What is a heat pump's thermal balance point?",
    answer:
      "The thermal balance point is the outdoor ambient temperature where a home's heat loss rate matches the maximum heating capacity of the heat pump. Above this temperature, the heat pump meets the heating load without assistance. Below this temperature, supplemental heat (such as electric resistance strips or a dual-fuel combustion furnace) stages on to satisfy indoor thermostat demand.",
  },
  {
    question: "What is the break-even electricity rate for a heat pump vs natural gas?",
    answer:
      "The break-even rate is the estimated electricity price ($/kWh) where heating with a heat pump costs the same as heating with combustion fuel. For natural gas, the formula is: Break-Even ($/kWh) = (Gas Price per Therm ÷ 100,000 BTU) × 3,412.142 BTU/kWh × (Heat Pump COP ÷ Furnace AFUE). If natural gas costs $1.45/Therm with an 80% AFUE furnace and your heat pump operates at COP 3.0, the break-even electricity rate is ($1.45 ÷ 100,000) × 3,412.142 × (3.0 ÷ 0.80) ≈ $0.1855/kWh (18.5¢/kWh). If your electricity tariff is below 18.5¢/kWh, the heat pump is estimated to cost less to run.",
  },
];

export default function HeatPumpCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Heat Pump vs Furnace Cost Calculator",
    description: "Compare annual running costs of an electric heat pump against natural gas, propane, and fuel oil heating systems based on seasonal COP and fuel tariffs.",
    route: "/home-energy/heat-pump-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    applicationCategory: "UtilitiesApplication",
    features: [
      "Thermodynamic energy balance modeling across electricity, natural gas, propane, and heating oil",
      "Seasonal heat pump COP and DOE Appendix M1 HSPF2 reference conversions",
      "Break-even electricity tariff ($/kWh) solver for combustion fuels",
      "Delivered thermal demand scenarios (30 to 90 MMBTU/year)",
      "Annual fuel consumption and operating cost projections",
    ],
    standards: [
      "AHRI Standard 210/240-2023 (Unitary Air-Source Heat Pump Equipment Rating)",
      "DOE 10 CFR Part 430 Appendix M1 (Uniform Test Method for Central Air Conditioners and Heat Pumps)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "ENERGY STAR Program Requirements for Air-Source Heat Pumps (v6.1 Cold Climate Specification)",
    ],
    companionDatasetUrl: "https://www.powelab.org/datasets/heat-pump-sub-zero-cop-degradation-benchmark",
    companionPaperUrl: "https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
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
        <span aria-current="page">Heat Pump Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home Electrification &amp; Heating Economics</p>
        <h1>Heat Pump Running Cost Calculator</h1>
        <p className="intro">
          Compare seasonal operating costs between an electric air-source heat pump and natural gas, propane, or heating oil furnaces using delivered thermal demand, seasonal COP assumptions, and local fuel prices.
        </p>
      </div>

      <div id="calculator-tool">
        <HeatPumpCostCalculator />
      </div>

      <DirectAnswerCard
        keyword="heat pump running cost vs gas comparison"
        answer="Heat pumps deliver heat at a seasonal Coefficient of Performance (COP) typically between 2.5 and 3.8. In an illustrative 50 MMBTU/year heating demand scenario with a 3.20 COP heat pump at an illustrative electricity rate of $0.1834/kWh, annual heat pump electricity is 4,579 kWh ($840/year). Compared to an 80% AFUE natural gas furnace (625 therms at $1.45/therm = $906/year), estimated annual savings are $66/year, with an estimated break-even electricity rate of 19.8¢/kWh ($0.1979/kWh)."
        formula="Annual Heat Pump Cost ($) = [Delivered Demand (BTU) ÷ (COP × 3,412.142)] × Electricity Rate ($/kWh)"
        standardExample="50 MMBTU delivered demand, 3.20 COP, $0.1834/kWh: [50,000,000 ÷ (3.20 × 3,412.142)] × 0.1834 = 4,579 kWh × $0.1834 = $839.83/year ($840)"
        sourceAuthority="Technical References & Model Basis: AHRI Directory of Certified Heating Products & DOE 10 CFR Part 430 Appendix M1"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Compare Heat Pump vs Furnace Heating Costs</h2>
        <ol>
          <li><strong>Select Heat Pump Efficiency (COP):</strong> Enter your system&apos;s simplified seasonal COP. Modern cold-climate inverter heat pumps deliver seasonal COP values between 2.5 and 3.5 (corresponding to approximately 8.5 to 11.5 HSPF2).</li>
          <li><strong>Choose Comparison Fossil Fuel:</strong> Select natural gas ($/Therm), delivered propane ($/gal), heating oil ($/gal), or electric resistance baseboards ($/kWh) to compare against your baseline.</li>
          <li><strong>Set Annual Heating Thermal Demand:</strong> Enter your home&apos;s annual heating load scenario (e.g. 50 MMBTU for a standard residential scenario).</li>
          <li><strong>Analyze the Break-Even Rate:</strong> The calculator estimates the break-even electricity rate ($/kWh) below which heating with your heat pump is projected to cost less than your baseline combustion heating system.</li>
        </ol>
      </section>

      {/* DOE Appendix M1 HSPF vs HSPF2 Matrix */}
      <section id="hspf-vs-hspf2-matrix" style={{ marginTop: "3rem" }}>
        <h2>DOE Appendix M1: HSPF vs. HSPF2 Rating Transition Matrix</h2>
        <p>
          Effective January 1, 2023, the U.S. Department of Energy (DOE 10 CFR Part 430 Appendix M1) mandated <strong>HSPF2</strong> (Heating Seasonal Performance Factor 2) to replace legacy HSPF metrics. The primary engineering change is testing blowers under <strong>0.50 inches of water column (in. w.c.)</strong> external static pressure (ESP), compared to 0.15 to 0.20 in. w.c. in legacy Appendix M testing.
        </p>
        <p>
          Because real residential duct systems create static pressure, testing against 0.50 in. w.c. increases blower power consumption and reduces measured airflow. In Region IV, <strong>HSPF2 is approximately 15% lower</strong> than legacy HSPF for the exact same physical equipment.
        </p>
        <div className="scenario-table" role="region" aria-label="HSPF vs HSPF2 comparison matrix">
          <table>
            <caption>DOE Appendix M1 heating efficiency transition and seasonal COP equivalence</caption>
            <thead>
              <tr>
                <th scope="col">Efficiency Tier</th>
                <th scope="col">Legacy Rating (App. M)</th>
                <th scope="col">Modern Rating (App. M1)</th>
                <th scope="col">Testing ESP</th>
                <th scope="col">Equivalent Seasonal COP</th>
                <th scope="col">Standard / Code Tier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>DOE 2023 National Minimum</strong></td>
                <td>8.8 HSPF</td>
                <td>7.5 HSPF2</td>
                <td>0.50 in. WG</td>
                <td>2.20 COP</td>
                <td>Mandatory U.S. baseline for split systems</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Standard</strong></td>
                <td>9.5–10.0 HSPF</td>
                <td>8.1–8.5 HSPF2</td>
                <td>0.50 in. WG</td>
                <td>2.37–2.49 COP</td>
                <td>ENERGY STAR v6.1 baseline</td>
              </tr>
              <tr>
                <td><strong>Cold-Climate Inverter Tier</strong></td>
                <td>10.5–11.5 HSPF</td>
                <td>9.0–9.8 HSPF2</td>
                <td>0.50 in. WG</td>
                <td>2.64–2.87 COP</td>
                <td>ENERGY STAR Cold Climate specification</td>
              </tr>
              <tr>
                <td><strong>Premium Ultra-Efficient Inverter</strong></td>
                <td>12.0–13.5+ HSPF</td>
                <td>10.2–11.5+ HSPF2</td>
                <td>0.50 in. WG</td>
                <td>2.99–3.37+ COP</td>
                <td>High-performance mini-splits and advanced systems</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Seasonal COP equivalence is calculated using the relationship: COP = HSPF2 ÷ 3.412142. Actual operating COP varies with outdoor dry-bulb temperatures.
        </p>
      </section>

      {/* Sizing Matrix: Annual Heating Costs */}
      <section id="sizing-matrix" style={{ marginTop: "3rem" }}>
        <h2>Annual Heating Bill Comparison by Fuel Type</h2>
        <p>
          Representative annual operating costs for heating a <strong>50 MMBTU/year illustrative heating-demand scenario</strong>, evaluated at illustrative U.S. residential fuel price benchmarks:
        </p>
        <div className="scenario-table" role="region" aria-label="Annual heating cost comparison by fuel type">
          <table>
            <caption>Residential heating system operating costs, fuel consumption, and estimated differences</caption>
            <thead>
              <tr>
                <th scope="col">Heating Fuel System</th>
                <th scope="col">Efficiency Metric</th>
                <th scope="col">Fuel Energy Needed</th>
                <th scope="col">Reference Fuel Price</th>
                <th scope="col">Annual Cost</th>
                <th scope="col">vs Heat Pump</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cold-Climate Inverter Heat Pump</strong></td>
                <td>COP 3.20 (approx. 11.0 HSPF2)</td>
                <td>4,579 kWh</td>
                <td>$0.1834 / kWh</td>
                <td><strong>$840 / yr</strong></td>
                <td><em>Baseline</em></td>
              </tr>
              <tr>
                <td><strong>Standard Inverter Heat Pump</strong></td>
                <td>COP 2.80 (approx. 9.5 HSPF2)</td>
                <td>5,233 kWh</td>
                <td>$0.1834 / kWh</td>
                <td><strong>$960 / yr</strong></td>
                <td>+$120 / yr</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Natural Gas Furnace</strong></td>
                <td>96% AFUE</td>
                <td>521 Therms</td>
                <td>$1.45 / Therm</td>
                <td><strong>$755 / yr</strong></td>
                <td>Save $85 / yr</td>
              </tr>
              <tr>
                <td><strong>Standard Natural Gas Furnace</strong></td>
                <td>80% AFUE</td>
                <td>625 Therms</td>
                <td>$1.45 / Therm</td>
                <td><strong>$906 / yr</strong></td>
                <td>+$66 / yr</td>
              </tr>
              <tr>
                <td><strong>Propane Gas Furnace</strong></td>
                <td>80% AFUE</td>
                <td>683 Gallons</td>
                <td>$3.20 / Gallon</td>
                <td><strong>$2,186 / yr</strong></td>
                <td><strong>Save $1,346 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>Heating Oil Boiler / Furnace</strong></td>
                <td>80% AFUE</td>
                <td>451 Gallons</td>
                <td>$4.10 / Gallon</td>
                <td><strong>$1,850 / yr</strong></td>
                <td><strong>Save $1,010 / yr</strong></td>
              </tr>
              <tr>
                <td><strong>Electric Resistance Baseboards</strong></td>
                <td>100% (COP 1.00)</td>
                <td>14,654 kWh</td>
                <td>$0.1834 / kWh</td>
                <td><strong>$2,688 / yr</strong></td>
                <td><strong>Save $1,848 / yr</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Heat Pump Tonnage Power Draw Matrix */}
      <section id="heat-pump-tonnage-matrix" style={{ marginTop: "3rem" }}>
        <h2>Illustrative Modeled Heat Pump Electrical Input by Tonnage</h2>
        <p>
          Electrical input scales with compressor capacity, efficiency, and outdoor temperatures. The table below illustrates modeled electrical power demand and running costs evaluated at an illustrative benchmark of <strong>18.34¢/kWh ($0.1834/kWh)</strong>:
        </p>
        <div className="scenario-table" role="region" aria-label="Heat pump hourly electricity draw and cost by tonnage">
          <table>
            <caption>Illustrative modeled electrical power demand and operating cost by capacity rating</caption>
            <thead>
              <tr>
                <th scope="col">Capacity Rating</th>
                <th scope="col">Illustrative Scenario Area</th>
                <th scope="col">Mild Modeled Input (COP 3.2)</th>
                <th scope="col">Mild Cost / Run Hr</th>
                <th scope="col">Cold Modeled Input (COP 2.0)</th>
                <th scope="col">Cold Cost / Run Hr</th>
                <th scope="col">With Auxiliary Heat Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Ton (18,000 BTU/h)</strong></td>
                <td>800–1,100 sq ft</td>
                <td>1.65 kW</td>
                <td>$0.30 / hr</td>
                <td>2.64 kW</td>
                <td>$0.48 / hr</td>
                <td>7.64 kW ($1.40 / hr)</td>
              </tr>
              <tr>
                <td><strong>2.0 Ton (24,000 BTU/h)</strong></td>
                <td>1,100–1,400 sq ft</td>
                <td>2.20 kW</td>
                <td>$0.40 / hr</td>
                <td>3.52 kW</td>
                <td>$0.65 / hr</td>
                <td>8.52 kW ($1.56 / hr)</td>
              </tr>
              <tr>
                <td><strong>2.5 Ton (30,000 BTU/h)</strong></td>
                <td>1,400–1,800 sq ft</td>
                <td>2.75 kW</td>
                <td>$0.50 / hr</td>
                <td>4.40 kW</td>
                <td>$0.81 / hr</td>
                <td>9.40 kW ($1.72 / hr)</td>
              </tr>
              <tr>
                <td><strong>3.0 Ton (36,000 BTU/h)</strong></td>
                <td>1,800–2,200 sq ft</td>
                <td>3.30 kW</td>
                <td>$0.61 / hr</td>
                <td>5.28 kW</td>
                <td>$0.97 / hr</td>
                <td>10.28 kW ($1.89 / hr)</td>
              </tr>
              <tr>
                <td><strong>3.5 Ton (42,000 BTU/h)</strong></td>
                <td>2,200–2,600 sq ft</td>
                <td>3.85 kW</td>
                <td>$0.71 / hr</td>
                <td>6.15 kW</td>
                <td>$1.13 / hr</td>
                <td>11.15 kW ($2.04 / hr)</td>
              </tr>
              <tr>
                <td><strong>4.0 Ton (48,000 BTU/h)</strong></td>
                <td>2,600–3,000 sq ft</td>
                <td>4.40 kW</td>
                <td>$0.81 / hr</td>
                <td>7.03 kW</td>
                <td>$1.29 / hr</td>
                <td>17.03 kW* ($3.12 / hr)</td>
              </tr>
              <tr>
                <td><strong>5.0 Ton (60,000 BTU/h)</strong></td>
                <td>3,000–3,800+ sq ft</td>
                <td>5.50 kW</td>
                <td>$1.01 / hr</td>
                <td>8.79 kW</td>
                <td>$1.61 / hr</td>
                <td>18.79 kW* ($3.45 / hr)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Note: 4.0-ton and 5.0-ton scenarios reflect an illustrative 10 kW auxiliary resistance heat assumption (drawing 10,000 W supplemental input during extreme weather or recovery cycles), compared to 5 kW for smaller capacities.
        </p>
      </section>

      <div id="formula-math" style={{ marginTop: "3rem" }}>
        <FormulaCard
          title="Heating Fuel Equivalence &amp; Calculation Formulas"
          formula="Annual_Cost = (Delivered_BTU_Demand / (Fuel_Energy_Density × Efficiency)) × Fuel_Price"
          formulaDescription="Deterministic thermodynamic energy balance modeling electric heat pump COP, combustion furnace AFUE, and delivered fuel heating values."
          variables={[
            { symbol: "Delivered_BTU_Demand", label: "Delivered Thermal Heating Load", description: "Total seasonal heat energy required by the building envelope (e.g. 50M BTU for standard scenario)", unit: "BTU/year" },
            { symbol: "COP", label: "Coefficient of Performance", description: "Heat pump thermal multiplier (e.g. 3.0 COP delivers 3.0 units of heat per 1.0 unit of electricity)", unit: "dimensionless" },
            { symbol: "AFUE", label: "Annual Fuel Utilization Efficiency", description: "Combustion efficiency percentage of furnace or boiler (e.g. 80% standard vs 96% condensing)", unit: "%" },
            { symbol: "Break_Even_Rate", label: "Break-Even Electricity Price", description: "Estimated electricity price ($/kWh) where heat pump operating cost matches baseline fuel cost", unit: "$/kWh" },
          ]}
          notes={[
            "1 kWh electricity delivers 3,412.142 BTU of thermal energy at 1.0 COP.",
            "1 Therm of natural gas contains 100,000 BTU gross heating value (HHV).",
            "1 Gallon of propane contains 91,500 BTU; 1 Gallon of #2 fuel oil contains 138,500 BTU.",
            "Natural Gas Break-Even: BreakEven ($/kWh) = (Gas_Price_per_Therm / 100,000) × 3,412.142 × (COP / AFUE).",
            "Propane Break-Even: BreakEven ($/kWh) = (Propane_Price_per_Gallon / 91,500) × 3,412.142 × (COP / AFUE).",
            "Heating Oil Break-Even: BreakEven ($/kWh) = (Oil_Price_per_Gallon / 138,500) × 3,412.142 × (COP / AFUE).",
            "Electric Resistance Break-Even: BreakEven ($/kWh) = Baseboard_Electricity_Rate × COP.",
          ]}
        />
      </div>

      <section id="faq-section" className="faq-section" style={{ marginTop: "3rem" }}>
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

      {/* 4-Way HVAC Planning Mesh Cards */}
      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>Related Heating, Cooling &amp; Home Energy Planning</h2>
        <p>
          Heating and cooling represent a major portion of residential energy consumption. PowerLab connects heating efficiency calculations directly into complete seasonal cooling, utility billing, and electrical backup planning:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>❄️ Model Summer Cooling Costs</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Calculate summer cooling operating costs, SEER2 ratings, and temperature derating for reversible heat pumps and central air conditioning.
            </p>
            <Link href="/home-energy/air-conditioner-cost-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Air Conditioner Cost Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>💵 Analyze Full Utility Bills</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              See how seasonal winter heat pump kWh consumption interacts with utility tiered rates, baseline allowances, and winter peak tariffs.
            </p>
            <Link href="/home-energy/energy-bill-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Energy Bill Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ Generator &amp; Inrush Sizing</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Heat pump compressors draw Locked Rotor Amperage (LRA) at startup, and auxiliary heat kits draw 5 kW–15 kW. Size a standby generator with motor surge modeling.
            </p>
            <Link href="/home-energy/generator-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Generator Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📊 Whole-House Consumption Audit</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Audit water heating, appliances, lighting, and HVAC loads simultaneously to evaluate total household electrification capacity before switching from gas.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>
        </div>

        <p>
          For additional analysis of SEER2/HSPF2 standards and heating performance, consult our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Central AC &amp; Heat Pump Electricity Cost Guide</Link>, explore our open benchmark dataset on <Link href="/datasets/cold-climate-heat-pump-cop-degradation-benchmark" style={{ fontWeight: 600, color: "#059669" }}>Heat Pump Sub-Zero COP Degradation (PL-DS-HVAC-04)</Link>, or read our technical report on <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ fontWeight: 600, color: "var(--accent)" }}>Heat Pump Sub-Zero COP Degradation &amp; Strip Heat Staging</Link>.
        </p>
      </section>

      <section>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Heating calculations use deterministic thermodynamic conversions (3,412.142 BTU per kWh), fuel higher heating values, and user-entered efficiency and tariff inputs. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}


import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { HeatPumpCostCalculator } from "@/components/calculator/heat-pump-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("heat-pump-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "Heat Pump Cost Calculator — Running Cost vs Gas (HSPF2 & Cold Climate)",
  description: "Compare heat pump operating costs vs natural gas, propane, or oil furnaces. Calculate seasonal bills based on HSPF2, cold-weather COP curves, and local fuel prices.",
  canonicalPath: "/home-energy/heat-pump-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "Is a heat pump cheaper to run than a natural gas furnace?",
    answer: "It depends on local utility rates and winter climate. Because heat pumps move heat rather than generate it through combustion, they deliver 250% to 380% seasonal thermal efficiency (COP 2.5 to 3.8). In regions with moderate electricity prices ($0.12 to $0.18/kWh) and typical gas prices ($1.30 to $1.60/therm), heat pumps and modern 80%–96% gas furnaces have comparable operating costs. When replacing expensive delivered propane ($3.20/gal) or heating oil ($4.10/gal), heat pumps save homeowners between $800 and $1,600 every winter.",
  },
  {
    question: "What is the difference between HSPF and HSPF2 ratings?",
    answer: "HSPF2 (Heating Seasonal Performance Factor 2) is the Department of Energy test standard mandated under 10 CFR Part 430 Appendix M1. Unlike legacy HSPF (Appendix M) which tested blowers against an artificially low external static pressure (ESP) of 0.15 to 0.20 inches of water column (in. w.c.), HSPF2 tests at 0.50 in. w.c. to reflect real-world residential ductwork resistance. As a result, HSPF2 ratings are approximately 15% lower than legacy HSPF numbers for the exact same physical equipment (e.g., 8.8 HSPF ≈ 7.5 HSPF2 in Region IV).",
  },
  {
    question: "How much does an electric heat pump cost to run per hour?",
    answer: "At the U.S. EIA national residential electricity benchmark of 18.34¢/kWh ($0.1834/kWh), a standard 3-ton (36,000 BTU/hr) heat pump drawing 3.30 kW in mild heating weather (COP 3.2) costs approximately $0.61 per continuous run hour. In freezing weather (COP 2.0), compressor power increases to 5.28 kW ($0.97/hr). If supplemental 10 kW electric resistance heat strips activate during sub-zero cold snaps, total power draw reaches 15.28 kW, costing approximately $2.80 per continuous hour.",
  },
  {
    question: "What is COP and how does it degrade in cold weather?",
    answer: "COP (Coefficient of Performance) measures thermal heat energy delivered divided by electrical energy consumed. A COP of 3.0 delivers 3.0 kWh of heat per 1.0 kWh electricity (300% efficiency). In sub-freezing air, lower ambient vapor density decreases refrigerant mass flow, reducing compressor capacity and COP. Standard single-stage units drop from COP 3.4 at 47°F to COP 1.3 at 0°F. Modern cold-climate heat pumps (ccASHP) with variable-speed inverter compressors and enhanced vapor injection (EVI) maintain COPs of 1.8 to 2.2 at 0°F and operate down to -15°F to -22°F without compressor lockout.",
  },
  {
    question: "What is a heat pump's thermal balance point?",
    answer: "The thermal balance point is the outdoor ambient temperature where a home's heat loss exactly equals the maximum heating capacity of the heat pump. Above this temperature, the heat pump heats the home without assistance. Below this temperature, supplemental heat (typically electric resistance strips or a dual-fuel gas furnace) must stage on to meet thermostat demand.",
  },
  {
    question: "What is the break-even electricity rate for a heat pump vs natural gas?",
    answer: "The break-even rate is the electricity price ($/kWh) where heating with a heat pump costs the exact same as heating with combustion fuel. For natural gas, the formula is: Break-Even ($/kWh) = (Gas Price per Therm ÷ 100,000 BTU) × 3,412 BTU/kWh × (Heat Pump COP ÷ Furnace AFUE). If natural gas costs $1.45/Therm with an 80% furnace and your heat pump operates at COP 3.0, the break-even electricity rate is ($1.45 / 100,000) × 3,412 × (3.0 / 0.80) = $0.185/kWh (18.5¢/kWh). If your actual electric rate is below 18.5¢/kWh, the heat pump is cheaper to run.",
  },
];

export default function HeatPumpCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Heat Pump vs Furnace Cost Calculator",
    description: "Compare annual running costs of an electric heat pump against natural gas, propane, and fuel oil heating systems based on HSPF2 and cold-climate COP.",
    route: "/home-energy/heat-pump-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Universal thermodynamic energy balance across electricity, natural gas (Therms), propane (gal), and heating oil (gal)",
      "AHRI standard COP, HSPF, and DOE Appendix M1 HSPF2 seasonal efficiency conversions",
      "Dynamic break-even electricity price ($/kWh) threshold solver",
      "Cold-climate ambient temperature COP decay and balance point modeling",
      "Electric resistance auxiliary heat strip staging cost projections",
    ],
    standards: [
      "AHRI Standard 210/240-2023 (Unitary Air-Source Heat Pump Equipment Rating)",
      "DOE 10 CFR Part 430 Appendix M1 (Uniform Test Method for Central Air Conditioners and Heat Pumps)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "ENERGY STAR Program Requirements for Air-Source Heat Pumps (v6.1 Cold Climate Specification)",
    ],
    companionDatasetUrl: "https://www.powelab.org/datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark",
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
          Compare seasonal operating costs between an electric air-source heat pump and natural gas, propane, or heating oil furnaces. Model seasonal HSPF2 ratings, cold-weather COP degradation, and identify your utility break-even price.
        </p>
      </div>

      <div id="calculator-tool">
        <HeatPumpCostCalculator />
      </div>

      <DirectAnswerCard
        keyword="heat pump running cost vs gas comparison"
        answer="Because heat pumps transfer atmospheric heat rather than burning fuel, they deliver 250% to 380% seasonal thermal efficiency (COP 2.5 to 3.8). At the U.S. residential benchmark of 18.34¢/kWh ($0.1834/kWh), heating an average home with an efficient heat pump costs $800 to $1,250 per winter. When replacing propane ($3.20/gal) or heating oil ($4.10/gal), homeowners save $800 to $1,600 annually. Compared to an 80% natural gas furnace ($1.45/therm), heat pumps have roughly comparable annual operating costs."
        formula="Annual Heat Pump Cost ($) = [Total Heating Demand (BTU) ÷ (COP × 3,412)] × Electricity Rate ($/kWh)"
        standardExample="50 Million BTU heating demand with COP 3.0 heat pump @ $0.1834/kWh: (50,000,000 ÷ 10,236) × 0.1834 = $896/year"
        sourceAuthority="AHRI Directory of Certified Heating Products & DOE 10 CFR Part 430 Appendix M1"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Compare Heat Pump vs Furnace Heating Costs</h2>
        <ol>
          <li><strong>Select Heat Pump Efficiency (COP / HSPF2):</strong> Enter your system&apos;s seasonal efficiency. Modern cold-climate inverter heat pumps deliver seasonal HSPF2 ratings between 8.1 and 11.0 (equivalent to seasonal COP 2.4 to 3.2).</li>
          <li><strong>Choose Comparison Fossil Fuel:</strong> Select natural gas ($/Therm), delivered propane ($/gal), heating oil ($/gal), or electric resistance baseboards ($/kWh) to compare against your baseline.</li>
          <li><strong>Set Annual Heating Thermal Demand:</strong> Enter your home&apos;s annual heating load based on square footage and climate zone (typical U.S. homes consume 40M to 70M BTU of thermal heat energy per winter).</li>
          <li><strong>Analyze the Break-Even Rate:</strong> The calculator identifies the exact electricity rate ($/kWh) below which heating with your heat pump saves money compared to your existing combustion heating system.</li>
        </ol>
      </section>

      {/* DOE Appendix M1 HSPF vs HSPF2 Matrix */}
      <section id="hspf-vs-hspf2-matrix" style={{ marginTop: "3rem" }}>
        <h2>DOE Appendix M1: HSPF vs. HSPF2 Rating Transition Matrix</h2>
        <p>
          Effective January 1, 2023, the U.S. Department of Energy (DOE 10 CFR Part 430 Appendix M1) mandated <strong>HSPF2</strong> (Heating Seasonal Performance Factor 2) to replace legacy HSPF metrics. The primary engineering change is testing blowers under <strong>0.50 inches of water column (in. w.c.)</strong> external static pressure (ESP), compared to the unrealistic 0.15 to 0.20 in. w.c. in legacy Appendix M testing.
        </p>
        <p>
          Because real residential duct systems create substantial static pressure, testing against 0.50 in. w.c. increases blower power consumption and reduces measured airflow. In Region IV (the national standard rating climate), <strong>HSPF2 is approximately 15% lower</strong> than legacy HSPF for the exact same physical heat pump.
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
                <td>ENERGY STAR Cold Climate (COP ≥ 1.75 @ 5°F)</td>
              </tr>
              <tr>
                <td><strong>Premium Ultra-Efficient Inverter</strong></td>
                <td>12.0–13.5+ HSPF</td>
                <td>10.2–11.5+ HSPF2</td>
                <td>0.50 in. WG</td>
                <td>2.99–3.37+ COP</td>
                <td>High-performance mini-splits and geothermal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Seasonal COP equivalence is calculated using the thermodynamic relationship: COP = HSPF2 ÷ 3.41214. Actual operating COP varies continuously with outdoor ambient dry-bulb temperature.
        </p>
      </section>

      {/* Cold Climate Ambient Temperature COP Matrix */}
      <section id="cold-climate-cop-matrix" style={{ marginTop: "3rem" }}>
        <h2>Cold-Climate Heat Pump COP Degradation &amp; Temperature Curves</h2>
        <p>
          Unlike combustion furnaces that output a fixed heat rate regardless of outdoor weather, an air-source heat pump&apos;s capacity and efficiency depend directly on outdoor dry-bulb temperature. As temperatures drop below freezing, refrigerant suction pressure decreases, reducing compressor mass flow rate and lowering the Coefficient of Performance (COP).
        </p>
        <p>
          Standard single-stage heat pumps experience steep capacity loss below 32°F, often requiring supplemental <strong>electric resistance heat strips (COP = 1.00)</strong> below their thermal balance point. Modern cold-climate heat pumps (ccASHP) incorporate variable-speed inverter compressors with <strong>Enhanced Vapor Injection (EVI)</strong>, maintaining high capacity and COP down to -15°F (-26°C):
        </p>
        <div className="scenario-table" role="region" aria-label="Heat pump COP and capacity retention by ambient outdoor temperature">
          <table>
            <caption>Empirical heat pump performance across ambient design temperatures (AHRI 210/240 test points)</caption>
            <thead>
              <tr>
                <th scope="col">Outdoor Ambient Temp</th>
                <th scope="col">Operating Characteristics</th>
                <th scope="col">Standard Heat Pump</th>
                <th scope="col">Cold-Climate Inverter (ccASHP)</th>
                <th scope="col">Auxiliary Electric Strips</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>+47°F (+8.3°C)</strong><br /><em>AHRI High Rating</em></td>
                <td>Optimal compression ratio; negligible coil frost formation.</td>
                <td>COP 3.40 (100% capacity)</td>
                <td>COP 4.00 (100% capacity)</td>
                <td>COP 1.00 (Off / 0 kW)</td>
              </tr>
              <tr>
                <td><strong>+35°F (+1.7°C)</strong><br /><em>Frost Transition</em></td>
                <td>High humidity triggers outdoor coil frost; periodic reverse-cycle defrost cycles.</td>
                <td>COP 2.70 (82% capacity)</td>
                <td>COP 3.20 (92% capacity)</td>
                <td>COP 1.00 (Off / 0 kW)</td>
              </tr>
              <tr>
                <td><strong>+17°F (-8.3°C)</strong><br /><em>AHRI Low Rating</em></td>
                <td>Typical residential thermal balance point; heat loss exceeds standard capacity.</td>
                <td>COP 2.05 (55% capacity)</td>
                <td>COP 2.60 (85% capacity)</td>
                <td>COP 1.00 (Supplemental Stage 1)</td>
              </tr>
              <tr>
                <td><strong>0°F (-17.8°C)</strong><br /><em>Sub-Zero Extreme</em></td>
                <td>Low vapor density reduces suction volume; standard units require resistance strips.</td>
                <td>COP 1.30 (35% capacity)</td>
                <td>COP 2.00 (72% capacity with EVI)</td>
                <td>COP 1.00 (Supplemental Stage 2)</td>
              </tr>
              <tr>
                <td><strong>-15°F (-26.1°C)</strong><br /><em>Deep Arctic Cold</em></td>
                <td>Compressor thermal cutoff limit for legacy hardware; ccASHP remains operational.</td>
                <td>Locked out (100% strip heat)</td>
                <td>COP 1.55 (58% capacity)</td>
                <td>COP 1.00 (Full Load Backup)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Data modeled after AHRI Standard 210/240 rating conditions and empirical field monitoring from the Northeast Energy Efficiency Partnerships (NEEP) Cold Climate Air Source Heat Pump Specification.
        </p>
      </section>

      {/* Sizing Matrix: Annual Heating Costs */}
      <section id="sizing-matrix" style={{ marginTop: "3rem" }}>
        <h2>Annual Heating Bill Comparison by Fuel Type</h2>
        <p>
          Representative annual operating costs for heating a typical 2,000 sq ft home requiring <strong>50 Million BTU (50 MMBTU)</strong> of thermal heat across a standard winter season, evaluated at current U.S. residential fuel price averages:
        </p>
        <div className="scenario-table" role="region" aria-label="Annual heating cost comparison by fuel type">
          <table>
            <caption>Residential heating system operating costs, fuel consumption, and net savings</caption>
            <thead>
              <tr>
                <th scope="col">Heating Fuel System</th>
                <th scope="col">Efficiency Metric</th>
                <th scope="col">Fuel Energy Needed</th>
                <th scope="col">Typical Fuel Price</th>
                <th scope="col">Annual Cost</th>
                <th scope="col">vs Heat Pump</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cold-Climate Inverter Heat Pump</strong></td>
                <td>COP 3.20 (11.0 HSPF2)</td>
                <td>4,580 kWh</td>
                <td>$0.1834 / kWh</td>
                <td><strong>$840 / yr</strong></td>
                <td><em>Baseline</em></td>
              </tr>
              <tr>
                <td><strong>Standard Heat Pump (Single Stage)</strong></td>
                <td>COP 2.40 (8.2 HSPF2)</td>
                <td>6,106 kWh</td>
                <td>$0.1834 / kWh</td>
                <td><strong>$1,120 / yr</strong></td>
                <td>+$280 / yr</td>
              </tr>
              <tr>
                <td><strong>Condensing Natural Gas Furnace</strong></td>
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
                <td>+$66 / yr (comparable)</td>
              </tr>
              <tr>
                <td><strong>Propane Gas Furnace</strong></td>
                <td>85% AFUE</td>
                <td>643 Gallons</td>
                <td>$3.20 / Gallon</td>
                <td><strong>$2,058 / yr</strong></td>
                <td><strong>Save $1,218 / yr</strong></td>
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
                <td><strong>Electric Baseboard / Space Heaters</strong></td>
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
        <h2>Heat Pump Hourly Power Draw &amp; Electricity Cost by Tonnage</h2>
        <p>
          Heating electrical power draw scales directly with outdoor unit capacity (tonnage) and ambient temperature. The table below outlines electrical power demand and running cost per operating hour evaluated at the U.S. EIA residential benchmark of <strong>18.34¢/kWh ($0.1834/kWh)</strong>:
        </p>
        <div className="scenario-table" role="region" aria-label="Heat pump hourly electricity draw and cost by tonnage">
          <table>
            <caption>Heat pump heating electrical power demand and operating cost by tonnage</caption>
            <thead>
              <tr>
                <th scope="col">Capacity (Tons / BTU)</th>
                <th scope="col">Illustrative Home Size</th>
                <th scope="col">Mild Day Draw (COP 3.2)</th>
                <th scope="col">Mild Cost / Run Hr</th>
                <th scope="col">Cold Day Draw (COP 2.0)</th>
                <th scope="col">Cold Cost / Run Hr</th>
                <th scope="col">With 5kW Strips Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Ton (18,000 BTU)</strong></td>
                <td>800–1,100 sq ft</td>
                <td>1.65 kW</td>
                <td>$0.30 / hr</td>
                <td>2.64 kW</td>
                <td>$0.48 / hr</td>
                <td>7.64 kW ($1.40 / hr)</td>
              </tr>
              <tr>
                <td><strong>2.0 Ton (24,000 BTU)</strong></td>
                <td>1,100–1,400 sq ft</td>
                <td>2.20 kW</td>
                <td>$0.40 / hr</td>
                <td>3.52 kW</td>
                <td>$0.65 / hr</td>
                <td>8.52 kW ($1.56 / hr)</td>
              </tr>
              <tr>
                <td><strong>2.5 Ton (30,000 BTU)</strong></td>
                <td>1,400–1,800 sq ft</td>
                <td>2.75 kW</td>
                <td>$0.50 / hr</td>
                <td>4.40 kW</td>
                <td>$0.81 / hr</td>
                <td>9.40 kW ($1.72 / hr)</td>
              </tr>
              <tr>
                <td><strong>3.0 Ton (36,000 BTU)</strong></td>
                <td>1,800–2,200 sq ft</td>
                <td>3.30 kW</td>
                <td>$0.61 / hr</td>
                <td>5.28 kW</td>
                <td>$0.97 / hr</td>
                <td>10.28 kW ($1.89 / hr)</td>
              </tr>
              <tr>
                <td><strong>3.5 Ton (42,000 BTU)</strong></td>
                <td>2,200–2,600 sq ft</td>
                <td>3.85 kW</td>
                <td>$0.71 / hr</td>
                <td>6.15 kW</td>
                <td>$1.13 / hr</td>
                <td>11.15 kW ($2.04 / hr)</td>
              </tr>
              <tr>
                <td><strong>4.0 Ton (48,000 BTU)</strong></td>
                <td>2,600–3,000 sq ft</td>
                <td>4.40 kW</td>
                <td>$0.81 / hr</td>
                <td>7.03 kW</td>
                <td>$1.29 / hr</td>
                <td>17.03 kW* ($3.12 / hr)</td>
              </tr>
              <tr>
                <td><strong>5.0 Ton (60,000 BTU)</strong></td>
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
          *Note: 4.0-ton and 5.0-ton heat pump systems typically utilize 10 kW supplemental electric resistance heat kits (drawing 10,000 W) rather than 5 kW kits, significantly elevating peak electrical demand during sub-zero defrost or recovery cycles.
        </p>
      </section>

      <div id="formula-math" style={{ marginTop: "3rem" }}>
        <FormulaCard
          title="Heating Fuel Equivalence &amp; Cost Formulas"
          formula="Annual_Cost = (Annual_BTU_Demand / (Fuel_Energy_Density × Efficiency)) × Fuel_Price"
          formulaDescription="Universal thermodynamic energy balance normalizing electric heat pump COP, combustion furnace AFUE, and delivered fuel heating values."
          variables={[
            { symbol: "Annual_BTU_Demand", label: "Home Thermal Heating Load", description: "Total seasonal heat energy required by the building envelope (typically 40M to 70M BTU for average residential homes)", unit: "BTU/year" },
            { symbol: "COP", label: "Coefficient of Performance", description: "Heat pump thermal efficiency multiplier (e.g., 3.0 COP delivers 3.0 kWh heat per 1.0 kWh electricity)", unit: "dimensionless" },
            { symbol: "HSPF2", label: "Heating Seasonal Performance Factor 2", description: "Seasonal heating output (BTU) per watt-hour consumed under DOE Appendix M1 (HSPF2 ≈ COP × 3.41214)", unit: "BTU/Wh" },
            { symbol: "AFUE", label: "Combustion Efficiency", description: "Annual Fuel Utilization Efficiency of furnace/boiler (80% standard vs 96% condensing)", unit: "%" },
            { symbol: "Break_Even_Rate", label: "Break-Even Electricity Price", description: "Maximum electricity price ($/kWh) where heat pump operating cost equals fossil fuel operating cost", unit: "$/kWh" },
          ]}
          notes={[
            "1 kWh electricity delivers 3,412.14 BTU of thermal energy at 1.0 COP.",
            "1 Therm of natural gas contains 100,000 BTU of gross heating value (HHV).",
            "1 Gallon of propane contains 91,500 BTU; 1 Gallon of #2 fuel oil contains 138,500 BTU.",
            "Break-Even ($/kWh) = (Fuel_Price / Fuel_BTU) × 3,412.14 × (Heat_Pump_COP / Combustion_AFUE).",
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
          Heating and cooling represent more than 50% of residential energy consumption. PowerLab connects heating efficiency calculations directly into complete seasonal cooling, utility billing, and electrical backup planning:
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
              Heat pump compressors draw substantial Locked Rotor Amperage (LRA) at startup, and heat strips draw 5kW–15kW. Size a standby generator with motor surge modeling.
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
          For comprehensive thermodynamic analysis of SEER2/HSPF2 standards, building heat-loss curves, and compressor cycling physics, consult our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Central AC &amp; Heat Pump Electricity Cost Guide</Link> or inspect our open engineering study on <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ fontWeight: 600, color: "var(--accent)" }}>Heat Pump Sub-Zero COP Degradation &amp; Strip Heat Staging (PL-TR-2026-HVAC01)</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Heating calculations adhere to AHRI Standard 210/240-2023, DOE 10 CFR Part 430 Appendix M1 test procedures, and U.S. EIA retail electricity and fuel price benchmarks. Detailed thermodynamic derivations are available in our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}


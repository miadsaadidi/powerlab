import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { AcCostCalculator } from "@/components/calculator/ac-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ac-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "AC Cost Calculator — Central AC Electricity Cost & SEER2",
  description: "Calculate air conditioner electricity costs per hour, day & month. Sizing formulas for Central AC, Mini-Splits & Window units with DOE Appendix M1 SEER2 efficiency.",
  canonicalPath: "/home-energy/air-conditioner-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How much does central air conditioning cost to run per month?",
    answer: "At the U.S. EIA June 2026 residential benchmark rate of 18.34¢/kWh ($0.1834/kWh), a standard 3-ton (36,000 BTU, 15.0 SEER2) central air conditioner operating for 8 clock hours per day at a typical 60% compressor duty cycle consumes approximately 350 kWh per month, costing roughly $64.20 per month. In hot southern climates with 12 to 14 daily operating hours and higher duty cycles, monthly central AC electricity usage typically ranges from 600 to 900 kWh, costing between $110 and $165 per month.",
  },
  {
    question: "How much does it cost to run an air conditioner for 1 hour?",
    answer: "At the national benchmark rate of 18.34¢/kWh: a small 5,000 BTU window AC (450W active draw) costs about $0.05 to $0.08 per operating hour; a modern 12,000 BTU 22-SEER2 ductless mini-split (545W active draw) costs about $0.06 to $0.10 per operating hour; and a 3-ton (36,000 BTU, 15.0 SEER2) central AC (2,400W nominal draw) costs about $0.26 per clock hour at 60% compressor cycling ($0.44 per continuous active hour).",
  },
  {
    question: "What is the difference between SEER and SEER2 under DOE Appendix M1?",
    answer: "SEER2 (Seasonal Energy Efficiency Ratio 2) replaced legacy SEER in 2023 under DOE 10 CFR Part 430 Appendix M1. The updated test standard raised the external static pressure (ESP) from 0.10–0.20 inches of water column (in. WG) up to 0.50 in. WG to realistically simulate ducted residential air distribution. Because the blower motor works against higher static resistance during testing, the resulting numerical SEER2 rating is approximately 4.5% lower than the legacy SEER rating for equivalent physical hardware. Certified ratings are model-specific under AHRI 210/240-2023.",
  },
  {
    question: "Does Cooling Degree Days (CDD) equal equipment run hours?",
    answer: "No. Cooling Degree Days (CDD, base 65°F) measure cumulative outdoor weather severity, not direct compressor operating hours. Actual equipment runtime depends on building thermal envelope performance (wall/attic R-value, window solar heat gain, air infiltration), internal occupant and appliance heat gains, thermostat setpoints, and proper HVAC sizing (ACCA Manual J). CDD provides an index for regional climate comparison, while compressor run hours must be evaluated through thermal load calculations or empirical metering.",
  },
  {
    question: "Why does compressor duty cycle affect my electric bill?",
    answer: "An air conditioner does not draw continuous peak wattage all day; the compressor cycles on and off once the indoor temperature satisfies the thermostat setpoint. On a moderate 82°F summer day, a properly sized central AC runs roughly 50% to 65% of each clock hour. During peak 95°F+ heatwaves, the compressor may operate at 85% to 100% duty cycle, substantially increasing hourly and daily electricity consumption.",
  },
  {
    question: "Is it cheaper to leave the AC running all day or set it higher when away?",
    answer: "It is substantially cheaper to set the thermostat 7°F to 10°F higher when away from home for more than 4 hours (or use a programmable/smart thermostat). The rate of thermal heat transfer into a building is directly proportional to the temperature differential between outside and inside; maintaining a low indoor temperature all day causes greater total heat accumulation and higher seasonal electricity consumption.",
  },
];

export default function AcCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Air Conditioner Running Cost Calculator",
    description: "Estimate hourly, daily, monthly, and seasonal air conditioning electricity costs for window units, mini-splits, and central AC systems.",
    route: "/home-energy/air-conditioner-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "BTU cooling capacity and DOE Appendix M1 SEER2 seasonal efficiency modeling",
      "Thermostat compressor duty cycle adjustments for mild vs extreme heatwaves",
      "Calculations for window units, portable ACs, ductless mini-splits, and central air systems",
      "Annual upgrade savings comparisons against legacy 10 SEER and 13 SEER equipment",
      "DOE Appendix M1 static pressure derate reference and regional cooling hour analysis",
    ],
    standards: [
      "AHRI Standard 210/240-2023 (Performance Rating of Unitary Air-Conditioning & Heat Pump Equipment)",
      "DOE 10 CFR Part 430 Appendix M1 (SEER2 / EER2 Uniform Test Method)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "U.S. EIA Electric Power Monthly (June 2026 Residential Average: 18.34¢/kWh)",
    ],
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821931",
    companionPaperUrl: "https://www.powelab.org/research/central-ac-heat-pump-seasonal-efficiency-degradation",
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
        <span aria-current="page">Air Conditioner Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Cooling Bills &amp; HVAC Efficiency</p>
        <h1>Air Conditioner Electricity Cost Calculator</h1>
        <p className="intro">
          Calculate how much your air conditioner costs to run per hour, per day, and across the entire summer cooling season for central AC systems, ductless mini-splits, and window units using DOE Appendix M1 SEER2 standards.
        </p>
      </div>

      <div id="calculator-tool">
        <AcCostCalculator />
      </div>

      <DirectAnswerCard
        keyword="air conditioner electricity cost calculation"
        answer="Running a standard 3-ton (36,000 BTU) 15.0-SEER2 central air conditioner costs approximately $0.44 per active compressor hour at the U.S. EIA June 2026 residential benchmark of 18.34¢/kWh ($0.1834/kWh). At a realistic 60% compressor duty cycle, it costs $0.26 per clock hour (averaging ~$64/month at 8 hours of daily use). A 5,000 BTU window unit costs ~$0.05 to $0.08/hr, while an 18-SEER2 mini-split costs ~$0.09/hr."
        formula="Hourly Cost ($/hr) = (BTU Cooling Capacity ÷ SEER2 Rating ÷ 1,000) × Compressor Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="36,000 BTU unit @ 15.0 SEER2, 60% duty cycle, $0.1834/kWh: (36,000 ÷ 15 ÷ 1,000) × 0.60 × 0.1834 = $0.264 per clock hour ($2.11 per 8-hour day)"
        sourceAuthority="U.S. Department of Energy (DOE 10 CFR Part 430 Appendix M1) & U.S. EIA June 2026 Benchmark"
      />

      <PageJumpNav />

      {/* Methodology & Calculation Steps */}
      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Air Conditioner Electricity Cost</h2>
        <p>
          Calculating central air conditioner electricity consumption and operating costs requires four core engineering variables: nominal cooling capacity (BTU/hr or tons), seasonal cooling efficiency (SEER2), compressor duty cycle, and your local electricity tariff ($/kWh).
        </p>
        <ol>
          <li>
            <strong>Determine Cooling Capacity (BTU/hr or Tons):</strong> One ton of refrigeration equals 12,000 BTU/hr of heat removal. Residential central air conditioners typically range from 1.5 tons (18,000 BTU/hr) to 5.0 tons (60,000 BTU/hr).
          </li>
          <li>
            <strong>Check Seasonal Efficiency Rating (SEER2):</strong> Under DOE Appendix M1 standards, SEER2 measures total seasonal heat removed (BTU) divided by total electrical energy consumed (Watt-hours). Higher SEER2 ratings (14.3 to 22+) require fewer electrical watts for equivalent cooling capacity.
          </li>
          <li>
            <strong>Account for Compressor Duty Cycle:</strong> Central AC compressors cycle on and off once indoor temperatures reach the thermostat setpoint. During moderate summer days, properly sized systems operate at roughly 50% to 65% duty cycle. On extreme 95°F+ design days, duty cycles approach 85% to 100%.
          </li>
          <li>
            <strong>Apply Local Electric Utility Tariff ($/kWh):</strong> The national residential electricity benchmark is <strong>18.34¢/kWh ($0.1834/kWh)</strong>, based on U.S. Energy Information Administration (EIA) data from June 2026. Local retail tariffs vary significantly across utility territories. The calculator allows entering your exact local tariff.
          </li>
        </ol>
      </section>

      {/* SEER vs SEER2 Comparison Section */}
      <section id="seer-vs-seer2" style={{ margin: "2.5rem 0" }}>
        <h2>SEER vs. SEER2: DOE Appendix M1 Efficiency Standards</h2>
        <p>
          In January 2023, the U.S. Department of Energy (DOE 10 CFR Part 430 Appendix M1) updated the mandatory test procedure for residential central air conditioners and heat pumps, transitioning from legacy SEER to <strong>SEER2</strong>.
        </p>
        <p>
          Under the legacy Appendix M test procedure, ducted systems were evaluated at an external static pressure (ESP) of only <strong>0.10 to 0.20 inches of water column (in. WG)</strong>. In real-world ducted installations with supply registers, return grilles, and air filtration, residential duct systems typically present 0.50 in. WG or higher. The updated Appendix M1 standard increased the testing static pressure to <strong>0.50 in. WG</strong> to accurately reflect real-world duct resistance.
        </p>
        <div style={{ background: "rgba(0, 0, 0, 0.02)", padding: "1.25rem", borderRadius: "0.5rem", borderLeft: "4px solid var(--accent)", marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
            <strong>Important Engineering Distinctions:</strong> SEER2 is not a simple universal mathematical conversion of SEER. Because the indoor blower motor expends more electrical power to overcome the higher 0.50 in. WG static resistance during testing, a ducted system evaluated under Appendix M1 receives a numerical rating roughly <strong>~4.5% lower</strong> than under legacy Appendix M. This ~4.5% difference serves as an <em>approximate screening and comparison aid</em>; certified ratings are model-specific and governed by AHRI Standard 210/240-2023 certification protocols.
          </p>
        </div>

        <div className="scenario-table" role="region" aria-label="SEER vs SEER2 efficiency and cost comparison table">
          <table>
            <caption>Comparison of residential air conditioner efficiency tiers, nominal electrical draw, and relative energy savings</caption>
            <thead>
              <tr>
                <th scope="col">Efficiency Tier / Era</th>
                <th scope="col">Legacy Rating</th>
                <th scope="col">DOE M1 Rating (SEER2)</th>
                <th scope="col">3-Ton Power Draw (kW)</th>
                <th scope="col">Cooling Energy vs. 10 SEER</th>
                <th scope="col">Testing Static Pressure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Legacy Pre-2006 Standard</strong></td>
                <td>10.0 SEER</td>
                <td>~9.5 SEER2 (approx.)</td>
                <td>3.60 kW</td>
                <td>Baseline (0%)</td>
                <td>0.10–0.20 in. WG (App. M)</td>
              </tr>
              <tr>
                <td><strong>EPAct 2005 Baseline (2006–2014)</strong></td>
                <td>13.0 SEER</td>
                <td>~12.4 SEER2 (approx.)</td>
                <td>2.77 kW</td>
                <td>23.1% reduction</td>
                <td>0.10–0.20 in. WG (App. M)</td>
              </tr>
              <tr>
                <td><strong>DOE 2015 Regional Standard</strong></td>
                <td>14.0 SEER</td>
                <td>~13.4 SEER2 (approx.)</td>
                <td>2.57 kW</td>
                <td>28.6% reduction</td>
                <td>0.15–0.20 in. WG (App. M)</td>
              </tr>
              <tr>
                <td><strong>DOE 2023 Minimum (North)</strong></td>
                <td>14.0 SEER equiv.</td>
                <td>13.4 SEER2</td>
                <td>2.69 kW</td>
                <td>25.3% reduction</td>
                <td>0.50 in. WG (App. M1)</td>
              </tr>
              <tr>
                <td><strong>DOE 2023 Minimum (South / SW)</strong></td>
                <td>15.0 SEER equiv.</td>
                <td>14.3–15.2 SEER2</td>
                <td>2.37–2.52 kW</td>
                <td>30.0%–34.2% reduction</td>
                <td>0.50 in. WG (App. M1)</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Two-Stage</strong></td>
                <td>17.0 SEER equiv.</td>
                <td>16.0–16.5 SEER2</td>
                <td>2.18–2.25 kW</td>
                <td>37.5%–39.4% reduction</td>
                <td>0.50 in. WG (App. M1)</td>
              </tr>
              <tr>
                <td><strong>Premium Variable-Speed Inverter</strong></td>
                <td>19.0+ SEER equiv.</td>
                <td>18.0–22.0+ SEER2</td>
                <td>1.64–2.00 kW</td>
                <td>44.4%–54.5% reduction</td>
                <td>0.50 in. WG (App. M1)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Power draw values are calculated from nominal rating assumptions (36,000 BTU/hr ÷ SEER2 Rating ÷ 1,000) and represent full-capacity steady-state operation. Actual power varies with ambient temperature, humidity, and airflow.
        </p>
      </section>

      {/* Central AC Sizing Matrix by Tonnage */}
      <section id="central-ac-tonnage-matrix">
        <h2>Cost to Run Central Air Conditioning per Hour by Tonnage</h2>
        <p>
          Central air conditioner operating costs scale directly with cooling capacity (tonnage) and compressor cycling. The table below provides reference metrics for standard residential capacities operating at a <strong>15.0 SEER2 baseline</strong> evaluated at the U.S. EIA June 2026 residential benchmark of <strong>18.34¢/kWh ($0.1834/kWh)</strong>:
        </p>
        <div className="scenario-table" role="region" aria-label="Central AC running cost per hour by tonnage">
          <table>
            <caption>Central air conditioner electricity consumption and operating cost by tonnage (15.0 SEER2 @ $0.1834/kWh benchmark)</caption>
            <thead>
              <tr>
                <th scope="col">Capacity (Tons / BTU)</th>
                <th scope="col">Illustrative Home Size</th>
                <th scope="col">Nominal Power Draw</th>
                <th scope="col">Cost / Clock Hr (60% Duty)</th>
                <th scope="col">Cost / Active Hr (100% Run)</th>
                <th scope="col">Monthly Cost (8 hrs/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Ton (18,000 BTU)</strong></td>
                <td>800–1,100 sq ft</td>
                <td>1.20 kW (1,200 W)</td>
                <td>$0.13 / hr</td>
                <td>$0.22 / hr</td>
                <td>$31.69 / mo</td>
              </tr>
              <tr>
                <td><strong>2.0 Ton (24,000 BTU)</strong></td>
                <td>1,100–1,400 sq ft</td>
                <td>1.60 kW (1,600 W)</td>
                <td>$0.18 / hr</td>
                <td>$0.29 / hr</td>
                <td>$42.26 / mo</td>
              </tr>
              <tr>
                <td><strong>2.5 Ton (30,000 BTU)</strong></td>
                <td>1,400–1,700 sq ft</td>
                <td>2.00 kW (2,000 W)</td>
                <td>$0.22 / hr</td>
                <td>$0.37 / hr</td>
                <td>$52.82 / mo</td>
              </tr>
              <tr>
                <td><strong>3.0 Ton (36,000 BTU)</strong></td>
                <td>1,700–2,100 sq ft</td>
                <td>2.40 kW (2,400 W)</td>
                <td>$0.26 / hr</td>
                <td>$0.44 / hr</td>
                <td>$63.38 / mo</td>
              </tr>
              <tr>
                <td><strong>3.5 Ton (42,000 BTU)</strong></td>
                <td>2,100–2,500 sq ft</td>
                <td>2.80 kW (2,800 W)</td>
                <td>$0.31 / hr</td>
                <td>$0.51 / hr</td>
                <td>$73.95 / mo</td>
              </tr>
              <tr>
                <td><strong>4.0 Ton (48,000 BTU)</strong></td>
                <td>2,500–3,000 sq ft</td>
                <td>3.20 kW (3,200 W)</td>
                <td>$0.35 / hr</td>
                <td>$0.59 / hr</td>
                <td>$84.51 / mo</td>
              </tr>
              <tr>
                <td><strong>5.0 Ton (60,000 BTU)</strong></td>
                <td>3,000–3,800 sq ft</td>
                <td>4.00 kW (4,000 W)</td>
                <td>$0.44 / hr</td>
                <td>$0.73 / hr</td>
                <td>$105.64 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Notes: Power draw is calculated directly from the stated efficiency assumption (Nominal BTU/hr ÷ 15.0 SEER2 ÷ 1,000). Systems of identical tonnage may have different power draws depending on whether they are single-stage, two-stage, or variable-speed inverter compressors, as well as duct design and outdoor ambient temperature.
        </p>
      </section>

      {/* Regional Climate & Operating Hours Scenarios */}
      <section id="climate-and-operating-hours" style={{ margin: "2.5rem 0" }}>
        <h2>Regional Climate, Cooling Degree Days (CDD) &amp; Operating Hours</h2>
        <p>
          Annual cooling costs vary substantially across climate regions due to differences in cumulative summer heat and cooling duration. Heating, ventilation, and air-conditioning engineers characterize regional cooling demand through <strong>Cooling Degree Days (CDD, base 65°F)</strong> and <strong>Full-Load Equivalent Operating Hours (FLH)</strong>.
        </p>
        <p>
          It is critical to distinguish between weather metrics, modeled operating hours, and actual equipment runtime:
        </p>
        <ul>
          <li><strong>Cooling Degree Days (CDD):</strong> Climatological metric indicating the extent to which mean daily outdoor temperatures exceed 65°F. CDD measures regional weather severity, not direct compressor runtime.</li>
          <li><strong>Modeled Operating Hours (FLH):</strong> Standardized engineering metric representing the equivalent annual hours a system would operate at 100% capacity to satisfy the cooling load.</li>
          <li><strong>Actual Equipment Runtime:</strong> Physical clock hours the compressor runs, which depends on building envelope insulation (R-value), window solar heat gain coefficients (SHGC), air infiltration, occupant internal loads, thermostat setpoints, and proper equipment sizing.</li>
        </ul>

        <div className="scenario-table" role="region" aria-label="Regional cooling climate scenarios and annual operating cost">
          <table>
            <caption>Illustrative engineering scenarios: Modeled regional cooling hours and annual operating cost for a 3-Ton 15.0 SEER2 central AC (@ $0.1834/kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Climate Region / Zone</th>
                <th scope="col">Typical CDD Range (Base 65°F)</th>
                <th scope="col">Modeled Operating Hours (FLH)*</th>
                <th scope="col">Annual Cooling Energy</th>
                <th scope="col">Annual Cooling Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cool / Northern Climates</strong> (e.g., Seattle, Minneapolis, Boston)</td>
                <td>500–1,200 CDD</td>
                <td>600–900 hrs/yr (Illustrative scenario)</td>
                <td>1,440–2,160 kWh</td>
                <td>$264–$396 / yr</td>
              </tr>
              <tr>
                <td><strong>Moderate / Continental</strong> (e.g., Chicago, St. Louis, Philadelphia)</td>
                <td>1,200–2,000 CDD</td>
                <td>1,000–1,400 hrs/yr (Illustrative scenario)</td>
                <td>2,400–3,360 kWh</td>
                <td>$440–$616 / yr</td>
              </tr>
              <tr>
                <td><strong>Warm Humid / Southeast</strong> (e.g., Atlanta, Orlando, Houston)</td>
                <td>2,000–3,500 CDD</td>
                <td>1,500–2,100 hrs/yr (Illustrative scenario)</td>
                <td>3,600–5,040 kWh</td>
                <td>$660–$924 / yr</td>
              </tr>
              <tr>
                <td><strong>Hot Arid / Desert Southwest</strong> (e.g., Phoenix, Las Vegas)</td>
                <td>3,500–4,800+ CDD</td>
                <td>2,100–2,600 hrs/yr (Illustrative scenario)</td>
                <td>5,040–6,240 kWh</td>
                <td>$924–$1,144 / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          *Labeled as <strong>Illustrative engineering scenario</strong>. Annual cost calculated as: (36,000 BTU ÷ 15.0 SEER2 ÷ 1,000) × FLH × $0.1834/kWh. Actual compressor runtime varies by building envelope quality, duct efficiency, and thermostat preferences.
        </p>
      </section>

      {/* Window AC vs Mini-Split Sizing Matrix */}
      <section id="sizing-matrix">
        <h2>Window AC vs. Ductless Mini-Split Running Costs</h2>
        <p>
          Small room air conditioners and high-efficiency inverter mini-splits operate at distinct wattage profiles compared to whole-home ducted systems. Ductless mini-splits avoid duct thermal losses and static resistance, frequently achieving seasonal efficiencies exceeding 20+ SEER2:
        </p>
        <div className="scenario-table" role="region" aria-label="Window AC and mini-split running cost reference">
          <table>
            <caption>Room air conditioner energy consumption benchmarks (@ $0.1834/kWh utility rate)</caption>
            <thead>
              <tr>
                <th scope="col">Unit Type</th>
                <th scope="col">Cooling Capacity</th>
                <th scope="col">Efficiency Rating</th>
                <th scope="col">Avg. Power (Watts)</th>
                <th scope="col">Cost / Hour (60% Duty)</th>
                <th scope="col">Monthly (8h/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Small Window Unit (Bedrooms)</strong></td>
                <td>5,000 BTU</td>
                <td>11.0 CEER</td>
                <td>450 W</td>
                <td>$0.05 / hr</td>
                <td>$11.88 / mo</td>
              </tr>
              <tr>
                <td><strong>Medium Window Unit (Living Rooms)</strong></td>
                <td>8,000 BTU</td>
                <td>11.4 CEER</td>
                <td>700 W</td>
                <td>$0.08 / hr</td>
                <td>$18.49 / mo</td>
              </tr>
              <tr>
                <td><strong>Large Window / Wall Unit</strong></td>
                <td>12,000 BTU</td>
                <td>11.0 CEER</td>
                <td>1,090 W</td>
                <td>$0.12 / hr</td>
                <td>$28.78 / mo</td>
              </tr>
              <tr>
                <td><strong>High-Efficiency Inverter Mini-Split</strong></td>
                <td>12,000 BTU (1 Ton)</td>
                <td>22.0 SEER2</td>
                <td>545 W</td>
                <td>$0.06 / hr</td>
                <td>$14.40 / mo</td>
              </tr>
              <tr>
                <td><strong>Multi-Zone Mini-Split (2-3 Rooms)</strong></td>
                <td>24,000 BTU (2 Ton)</td>
                <td>20.0 SEER2</td>
                <td>1,200 W</td>
                <td>$0.13 / hr</td>
                <td>$31.69 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Worked Step-by-Step Calculation Example */}
      <section id="worked-example" style={{ margin: "2rem 0", padding: "1.5rem", borderRadius: "0.75rem", background: "var(--card-bg, #f8fafc)", border: "1px solid var(--border-color, #e2e8f0)" }}>
        <h2 style={{ marginTop: 0 }}>Step-by-Step Worked Calculation Example</h2>
        <p>
          Below is a manual calculation demonstrating how hourly power draw, daily consumption, and monthly electricity costs are determined for a residential central air conditioner:
        </p>
        <div style={{ background: "rgba(0, 0, 0, 0.03)", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>Example System Parameters:</p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.95rem" }}>
            <li><strong>Cooling Capacity:</strong> 3.0-Ton Central AC = 36,000 BTU/hr</li>
            <li><strong>Seasonal Efficiency:</strong> 15.0 SEER2 (DOE Appendix M1 certified)</li>
            <li><strong>Thermostat Duty Cycle:</strong> 60% active compressor run time (0.60)</li>
            <li><strong>Daily Usage:</strong> 8 clock hours per day</li>
            <li><strong>Electricity Rate:</strong> $0.1834 per kWh (U.S. EIA June 2026 residential benchmark)</li>
          </ul>
        </div>
        <ol style={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
          <li>
            <strong>Step 1: Calculate Effective Electrical Power Draw:</strong><br />
            <code>Electrical kW = Nominal Capacity (BTU/hr) ÷ (SEER2 Rating × 1,000) = 36,000 ÷ (15.0 × 1,000) = 2.40 kW (2,400 Watts)</code>
          </li>
          <li>
            <strong>Step 2: Calculate Energy Consumption per Clock Hour:</strong><br />
            <code>Hourly Energy = 2.40 kW × 0.60 duty cycle = 1.44 kWh per clock hour</code>
          </li>
          <li>
            <strong>Step 3: Calculate Operating Cost per Clock Hour:</strong><br />
            <code>Cost per Clock Hour = 1.44 kWh × $0.1834/kWh = $0.2641 ≈ $0.26 / hr</code>
          </li>
          <li>
            <strong>Step 4: Calculate Daily Operating Cost (8 Hours):</strong><br />
            <code>Daily Cost = 1.44 kWh/hr × 8 hrs/day × $0.1834/kWh = $2.11 / day</code>
          </li>
          <li>
            <strong>Step 5: Calculate Monthly Electric Bill Impact:</strong><br />
            <code>Monthly Cost = 1.44 kWh/hr × 8 hrs/day × 30.4 days × $0.1834/kWh = $64.22 / month</code>
          </li>
        </ol>
      </section>

      {/* Dataset & Research Cross-Link Callout */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#065f46" }}>
          📊 Open Empirical Benchmark Data
        </h3>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.6 }}>
          Need empirical laboratory data on cooling degree days and seasonal efficiency transitions under DOE Appendix M1? Explore our open <Link href="/datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>Central AC &amp; Heat Pump SEER2 Benchmark Dataset (PL-DS-AC-04)</Link> and thermodynamic study on <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>HVAC COP Degradation &amp; Auxiliary Staging (PL-TR-2026-HVAC01)</Link>.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Air Conditioner Power &amp; Cost Formulas"
          formula="Hourly_Cost = (BTU_hr / SEER2 / 1000) × Duty_Cycle × Electricity_Rate"
          formulaDescription="Standard HVAC thermodynamic conversion using AHRI SEER2 seasonal cooling efficiency and realistic thermostat duty cycles."
          variables={[
            { symbol: "BTU_hr", label: "Cooling Capacity", description: "Nominal cooling rating in British Thermal Units per hour (1 ton = 12,000 BTU)", unit: "BTU/hr" },
            { symbol: "SEER2", label: "Seasonal Cooling Efficiency", description: "DOE Appendix M1 SEER2 rating (BTU removed per Watt-hour consumed at 0.50 in. WG ESP)", unit: "BTU/Wh" },
            { symbol: "Duty_Cycle", label: "Compressor Active Run Time", description: "Fraction of time compressor actively chills air (typically 50%–70% on warm days)", unit: "%" },
            { symbol: "Electricity_Rate", label: "Utility Electricity Tariff", description: "Marginal cost per kilowatt-hour of electric grid power (U.S. EIA June 2026 avg: $0.1834/kWh)", unit: "$/kWh" },
          ]}
          notes={[
            "SEER2 test standards incorporate 0.50 in. WG external duct pressure for realistic real-world airflow modeling.",
            "Inverter-driven variable-speed mini-splits ramp power smoothly, achieving effective seasonal efficiencies over 20+ SEER2.",
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

      {/* Internal Planning Pathways & Connected System Architecture */}
      <section id="related-tools">
        <h2>Connected Energy Planning: Cooling, Heating &amp; Backup Power</h2>
        <p>
          Air conditioning is typically the single largest driver of summer residential electric bills and grid peak demand. PowerLab connects cooling efficiency calculations directly into whole-home energy and electrical resilience planning:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🔥 Compare Heat Pump Heating</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Evaluating whether to replace an older central AC with a reversible heat pump? Compare year-round heating economics against natural gas, propane, and fuel oil in our dedicated tool.
            </p>
            <Link href="/home-energy/heat-pump-cost-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Heat Pump Cost Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>💵 Analyze Full Utility Bills</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              See how seasonal air conditioner kWh consumption interacts with utility tier thresholds, monthly customer service charges, and local sales tax on your power bill.
            </p>
            <Link href="/home-energy/energy-bill-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Energy Bill Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ Generator &amp; Inrush Sizing</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Central AC compressors draw 5x to 7x their running wattage in Locked Rotor Amperes (LRA) during motor startup. Size an emergency standby generator or soft-starter kit.
            </p>
            <Link href="/home-energy/generator-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Generator Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📊 Whole-House Power Audit</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Audit refrigeration, water heating, laundry, and cooling loads simultaneously to identify baseline vs flexible electric loads across all seasons.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>
        </div>

        <p>
          For a comprehensive technical breakdown of SEER vs SEER2 testing, heat-load kinetics, and compressor electrical characteristics, consult our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Central AC &amp; Heat Pump Electricity Cost Guide</Link> or reference national household consumption norms in the <Link href="/guides/how-many-kwh-does-a-house-use-per-day">Daily Household kWh Guide</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Cooling calculations adhere to AHRI Standard 210/240-2023, DOE 10 CFR Part 430 Appendix M1 test procedures, and U.S. EIA retail electricity price benchmarks. Detailed formulas and calculation assumptions are available in our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

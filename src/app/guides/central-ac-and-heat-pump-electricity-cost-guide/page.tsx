import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { AcCostCalculator } from "@/components/calculator/ac-cost-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { MathDisplay } from "@/components/common/math-display";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Central AC & Heat Pump Electricity Cost Guide",
  description: "Estimate central AC and heat pump electricity costs. Learn SEER2 efficiency ratings, cooling tonnage power demand, duty cycles, and operating cost formulas.",
  canonicalPath: "/guides/central-ac-and-heat-pump-electricity-cost-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many watts does a 3-ton central air conditioner use?",
    answer: "Based on a simplified SEER2 planning proxy (P = Btu/hr ÷ (SEER2 × 1,000)), a standard 3-ton (36,000 BTU/hr) central air conditioner rated at 14.5 to 16 SEER2 represents an estimated electrical power input of approximately 2,250 to 2,500 continuous running watts while the compressor and outdoor fan are active. However, actual rated input varies by equipment model, ambient temperature, and specific operating conditions.",
  },
  {
    question: "How much does it cost to run central AC all day (24 hours)?",
    answer: "At an electricity price of $0.16/kWh, a 3-ton central AC (2.4 kW estimated input proxy) maintaining setpoint over a 24-hour day with a 50% compressor duty cycle runs the compressor for approximately 12 cumulative hours. This consumes about 28.8 kWh/day, costing approximately $4.61/day ($138/month for 30 days). Operating cost depends on actual compressor runtime hours rather than continuous 24-hour compressor operation.",
  },
  {
    question: "Is it cheaper to leave the AC running all day or turn it off when away?",
    answer: "Heat transfer into a home is proportional to the indoor-outdoor temperature difference (ΔT). Allowing indoor temperature to float upward while unoccupied reduces cumulative heat gain over the day, requiring less total cooling energy than maintaining a cold setpoint continuously. A thermostat setback of 7°F to 10°F during unoccupied periods typically yields an illustrative 5% to 15% reduction in cooling energy, though actual savings depend on climate, envelope insulation, equipment sizing, and setback duration.",
  },
  {
    question: "What is the difference between SEER and SEER2 ratings?",
    answer: "SEER2 (Seasonal Energy Efficiency Ratio 2), established under DOE 10 CFR Part 430 and AHRI 210/240 Appendix M1, tests HVAC equipment under 0.50 in. w.c. (inches of water column) external static pressure to represent typical ducted field installations, compared to 0.10 to 0.20 in. w.c. used in legacy SEER tests. Due to higher modeled blower static work, SEER2 ratings are numerically ~4.5% to 4.7% lower than legacy SEER values for equivalent physical equipment (e.g., 14 SEER ≈ 13.4 SEER2).",
  },
  {
    question: "Can a portable generator run a central air conditioner during an outage?",
    answer: "Running a 3-ton AC requires ~2,400 running watts, which falls within a 7,500W–9,000W generator's continuous rating. However, motor compressor startup draws Locked Rotor Amperage (LRA) that can reach 75A to 88A at 240V (18 kW to 21 kW instantaneous surge), which can stall a generator. A properly selected electronic soft starter can reduce inrush current (often by 65% to 70% in illustrative tests), but generator compatibility must always be verified using actual running watts, compressor LRA, voltage, soft-starter specifications, and generator surge ratings.",
  },
  {
    question: "When is a heat pump cheaper to run than a natural gas furnace?",
    answer: "The break-even electricity rate depends on gas price, furnace AFUE, and heat-pump COP: BreakEven ($/kWh) = GasPrice ($/therm) × COP × 3412 ÷ (100,000 × AFUE). At $1.45/therm, 80% furnace AFUE, and a heat-pump COP of 3.0, the simplified break-even electricity rate is about $0.186/kWh. If electricity is below this rate, heating with the heat pump is cheaper. Actual seasonal economics depend on temperature-dependent COP, cycling, auxiliary heat staging, utility tariffs, and local climate.",
  },
];

export default function CentralAcAndHeatPumpGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Central AC & Heat Pump Electricity Cost Guide (SEER2, Tons & Power Draw)",
    description: "Practical HVAC energy planning guide: estimate central AC and heat pump operating costs, SEER2 power demand proxies, compressor cycling, and heat pump vs gas economics.",
    route: "/guides/central-ac-and-heat-pump-electricity-cost-guide",
    datePublished: "2026-08-29",
    dateModified: "2026-08-29",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "AHRI Standard 210/240 (Unitary Air-Conditioning & Air-Source Heat Pump Equipment)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "U.S. Department of Energy 10 CFR Part 430 (SEER2 / HSPF2 Metric Rules)",
      "U.S. Energy Information Administration (EIA) Residential Energy Data",
      "NFPA 70 / NEC Article 440 (Air-Conditioning and Refrigerating Equipment)",
    ],
    faqs: FAQS,
    proficiencyLevel: "Beginner to Intermediate",
    audienceType: "Homeowners, Energy Planners, Property Managers",
  });

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Central AC &amp; Heat Pump Cost Guide</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">HVAC Energy Planning &amp; Efficiency Reference</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Central AC &amp; Heat Pump Electricity Cost Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          A practical HVAC energy-planning guide to residential cooling and heating power consumption. Learn how to convert cooling tonnage and SEER2 ratings into estimated kilowatt-hour consumption, model compressor cycling duty cycles, evaluate heat pump vs. natural gas cost parity, and estimate hourly, daily, and seasonal operating costs.
        </p>
      </header>

      <DirectAnswerCard
        keyword="central AC and heat pump electricity cost formula"
        answer="Running a typical 3-ton central AC (14–16 SEER2) represents an estimated electrical power input of 2,250 to 2,500 watts while actively running. At a 50% compressor duty cycle and an electricity rate of $0.16/kWh, average consumption is about 1.2 kWh per clock hour ($0.192/hr), or approximately $4.61 per 24-hour day ($138/month for 30 days). Actual power draw and operating costs vary with outdoor temperature, equipment specifications, and thermostat schedule."
        formula="Estimated Input (kW) = Cooling_Capacity_Btu_per_h ÷ (SEER2 × 1,000) · Average Hourly Cost = Estimated_kW × Duty_Cycle × Electricity_Rate ($/kWh)"
        standardExample="3-Ton Central AC (36,000 BTU/hr @ 15 SEER2) = 2.4 kW estimated input proxy. At 50% duty cycle (1.2 kWh per clock hour) and $0.16/kWh, estimated cost is $0.192 per clock hour, $4.61 per 24-hour day (12 runtime hours), and ~$138.24 per 30-day month."
        sourceAuthority="AHRI Standard 210/240, ASHRAE 90.1 & U.S. EIA Residential Energy Data (Technical References)"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Air Conditioner &amp; Heat Pump Cost Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Configure cooling capacity (BTU or Tons), SEER2 rating, compressor daily run-time, and local electric utility rates to model estimated hourly, daily, and monthly cooling expenses.
          </p>
        </div>
        <AcCostCalculator />
      </section>

      {/* Section 1: The Engineering Physics */}
      <section id="physics-and-formulas" style={{ marginTop: "2.5rem" }}>
        <h2>1. The Physics of Air Conditioner &amp; Heat Pump Power Consumption</h2>
        <p>
          Air conditioners and heat pumps do not generate cold; they are refrigeration machines operating on the <strong>vapor-compression cycle</strong> (utilizing refrigerants such as R-410A or R-32). They absorb heat energy from indoor air across an evaporator coil and pump that heat outdoors through a condenser coil.
        </p>
        
        <h3>Understanding Cooling Tonnage &amp; BTU/hr</h3>
        <p>
          Residential cooling capacity is measured in <strong>British Thermal Units per hour (BTU/hr)</strong> or <strong>Tons of Refrigeration</strong>. By definition, <strong>1 Ton of cooling equals 12,000 BTU/hr</strong>—the rate of heat transfer required to freeze or melt one short ton (2,000 lbs) of pure water ice at 32°F over a 24-hour period:
        </p>
        <MathDisplay
          title="Cooling Tonnage Thermal Definition"
          copyText="1 Ton = 12000 BTU/hr = 3.517 kW"
          benchmark="1 Ton = 12,000 BTU/hr = 3.517 kW of thermal heat extraction"
        >
          1 Ton = 12,000 BTU/hr = 3.517 kW
        </MathDisplay>

        <h3>SEER2, EER, and Electrical Power Draw</h3>
        <p>
          The electrical energy demand of an air conditioner during the cooling season is characterized by its seasonal efficiency rating. <strong>SEER2 (Seasonal Energy Efficiency Ratio 2)</strong>, defined under AHRI 210/240 and DOE 10 CFR Part 430, represents total cooling output in BTUs divided by total electrical energy input in watt-hours over a standardized seasonal temperature distribution.
        </p>
        <p>
          For general planning when only tonnage and SEER2 are available, electrical power input can be estimated using the simplified planning proxy below:
        </p>
        <MathDisplay
          title="SEER2 Power Input Planning Proxy"
          copyText="Estimated_Input_kW = (Tonnage * 12000) / (SEER2 * 1000)"
          benchmark="3 Tons @ 15 SEER2 = (3 × 12,000) ÷ 15,000 = 2.40 kW estimated electrical input"
        >
          Estimated_Input_kW = (Tonnage × 12000) / (SEER2 × 1000)
        </MathDisplay>
        <p className="form-hint" style={{ marginTop: "0.5rem" }}>
          <em>Simplified planning estimate — actual electrical input varies with operating conditions, outdoor temperatures, and equipment specifications.</em>
        </p>
        <p>
          For peak summer demand during extreme heat waves (95°F / 35°C outdoor ambient), the system operates closer to its steady-state <strong>EER2 (Energy Efficiency Ratio 2)</strong>, which is typically 15% to 20% lower than the seasonal SEER2 value. When manufacturer nameplate electrical ratings or measured wattages are available, they should be used in place of the SEER2 proxy for instantaneous power calculations.
        </p>
      </section>

      {/* Section 2: Tonnage Sizing & Benchmark Matrix */}
      <section id="tonnage-sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>2. Central AC Power Draw &amp; Cost by Tonnage (1.5 to 5.0 Tons)</h2>
        <p>
          Below is a planning benchmark table showing estimated electrical power input, daily kilowatt-hour consumption, and estimated monthly operating cost across common residential AC sizes at standard 15 SEER2 efficiency and the U.S. national average electric rate of $0.16/kWh:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Illustrative Central AC Electrical Demand &amp; Operating Cost by System Size (15 SEER2 planning proxy @ $0.16/kWh)</caption>
            <thead>
              <tr>
                <th scope="col">System Size</th>
                <th scope="col">Capacity (BTU/hr)</th>
                <th scope="col">Typical Home Area</th>
                <th scope="col">Estimated Input Draw</th>
                <th scope="col">Daily kWh (10h runtime)</th>
                <th scope="col">Cost / Month (@ $0.16)</th>
                <th scope="col">Illustrative Locked Rotor Amps (LRA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Ton</strong></td>
                <td>18,000 BTU/hr</td>
                <td>600 – 900 sq ft</td>
                <td>1.20 kW (1,200 W)</td>
                <td>12.0 kWh / day</td>
                <td>~$57.60 / mo</td>
                <td>~45 – 55 A</td>
              </tr>
              <tr>
                <td><strong>2.0 Ton</strong></td>
                <td>24,000 BTU/hr</td>
                <td>900 – 1,300 sq ft</td>
                <td>1.60 kW (1,600 W)</td>
                <td>16.0 kWh / day</td>
                <td>~$76.80 / mo</td>
                <td>~55 – 65 A</td>
              </tr>
              <tr>
                <td><strong>2.5 Ton</strong></td>
                <td>30,000 BTU/hr</td>
                <td>1,300 – 1,700 sq ft</td>
                <td>2.00 kW (2,000 W)</td>
                <td>20.0 kWh / day</td>
                <td>~$96.00 / mo</td>
                <td>~65 – 75 A</td>
              </tr>
              <tr>
                <td><strong>3.0 Ton</strong></td>
                <td>36,000 BTU/hr</td>
                <td>1,700 – 2,200 sq ft</td>
                <td>2.40 kW (2,400 W)</td>
                <td>24.0 kWh / day</td>
                <td>~$115.20 / mo</td>
                <td>~75 – 88 A</td>
              </tr>
              <tr>
                <td><strong>3.5 Ton</strong></td>
                <td>42,000 BTU/hr</td>
                <td>2,200 – 2,600 sq ft</td>
                <td>2.80 kW (2,800 W)</td>
                <td>28.0 kWh / day</td>
                <td>~$134.40 / mo</td>
                <td>~88 – 105 A</td>
              </tr>
              <tr>
                <td><strong>4.0 Ton</strong></td>
                <td>48,000 BTU/hr</td>
                <td>2,600 – 3,200 sq ft</td>
                <td>3.20 kW (3,200 W)</td>
                <td>32.0 kWh / day</td>
                <td>~$153.60 / mo</td>
                <td>~105 – 125 A</td>
              </tr>
              <tr>
                <td><strong>5.0 Ton</strong></td>
                <td>60,000 BTU/hr</td>
                <td>3,200 – 4,000+ sq ft</td>
                <td>4.00 kW (4,000 W)</td>
                <td>40.0 kWh / day</td>
                <td>~$192.00 / mo</td>
                <td>~125 – 150 A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="form-hint">
          <em>Note: Daily kWh assumes 10 hours of active compressor runtime per day. Monthly costs are modeled at 30 days. Actual power draw and energy consumption depend on local weather, building envelope, and thermostat settings.</em>
        </p>
      </section>

      {/* Section 3: SEER2 vs SEER Efficiency */}
      <section id="seer2-efficiency-comparison" style={{ marginTop: "2.5rem" }}>
        <h2>3. SEER2 Rating Impact: Upgrading Old Equipment</h2>
        <p>
          Many homes operate legacy 10 SEER or 12 SEER air conditioning systems. Because electrical energy demand is inversely related to the efficiency rating, upgrading to modern equipment yields substantial compounding savings:
        </p>
        <MathDisplay
          title="Equipment Upgrade Energy Reduction Ratio"
          copyText="Savings_percent = 1 - (SEER_old / SEER2_new)"
          benchmark="10 SEER upgraded to 15.2 SEER2 = 1 - (10 / 15.2) = 34.2% energy reduction"
        >
          Savings_percent = 1 - (SEER_old / SEER2_new)
        </MathDisplay>
        <ul>
          <li><strong>Upgrading from 10 SEER to 15.2 SEER2:</strong> Reduces cooling electrical consumption by approximately <strong>34.2%</strong> (saving ~$60 to $100 per peak summer month on a 3-ton unit).</li>
          <li><strong>Upgrading from 10 SEER to 18 SEER2 (Inverter Variable-Speed):</strong> Reduces electricity usage by approximately <strong>44.4%</strong> while improving humidity control and reducing temperature swings.</li>
          <li><strong>Upgrading from 12 SEER to 20 SEER2:</strong> Delivers an estimated <strong>40.0%</strong> reduction in summer cooling electricity consumption.</li>
        </ul>
      </section>

      {/* Section 4: Heat Pump vs Gas Parity */}
      <section id="heat-pump-vs-gas" style={{ marginTop: "2.5rem" }}>
        <h2>4. Heat Pump Heating Mode vs. Natural Gas Furnace Economics</h2>
        <p>
          In heating mode, modern air-source heat pumps reverse their refrigeration cycle, extracting thermal energy from outdoor air and delivering it inside. Unlike cooling mode, <strong>heat-pump heating performance is evaluated by HSPF2 (Heating Seasonal Performance Factor 2) or COP (Coefficient of Performance), not SEER2</strong>. A COP of 2.5 to 4.0 means the heat pump delivers 2.5 to 4.0 units of heat energy for each unit of electricity consumed.
        </p>
        <p>
          To determine whether heating with a heat pump is cheaper than a natural gas furnace at a specific operating condition, calculate the <strong>Break-Even Electricity Rate</strong>:
        </p>
        <MathDisplay
          title="Heat Pump vs. Natural Gas Break-Even Electricity Rate"
          copyText="BreakEven_Electricity_Rate = (GasPrice_therm * COP * 3412) / (100000 * AFUE)"
          benchmark="At $1.45/therm gas, 80% furnace AFUE, and COP 3.0: Break-Even Electricity Rate = $0.186/kWh"
        >
          BreakEven_Electricity_Rate = (GasPrice_therm × COP × 3412) / (100000 × AFUE)
        </MathDisplay>
        <p>
          In this example with natural gas at $1.45/therm and an 80% AFUE furnace, a heat pump operating at COP 3.0 provides cheaper heat whenever electricity costs less than <strong>$0.186/kWh</strong>. At $1.50/therm gas with a 95% condensing furnace and $0.16/kWh electricity, the required break-even COP is approximately <strong>2.97</strong>.
        </p>
        <p>
          <em>Note: This simplified comparison evaluates point-condition COP. Actual seasonal heating economics vary with climate temperature bin distributions, defrost cycles, auxiliary electric strip staging, and seasonal HSPF2 ratings. For comprehensive heating modeling, see our dedicated <Link href="/home-energy/heat-pump-cost-calculator" style={{ fontWeight: 600, color: "var(--brand-strong)" }}>Heat Pump Running Cost Calculator</Link>.</em>
        </p>
      </section>

      {/* Section 5: Compressor Inrush & Generator Sizing */}
      <section id="compressor-inrush-and-generators" style={{ marginTop: "2.5rem" }}>
        <h2>5. Compressor Inrush Surge &amp; Emergency Generator Sizing</h2>
        <p>
          While running a 3-ton air conditioner requires an estimated 2,400 running watts, starting the single-phase induction compressor motor presents a significant surge load for home backup systems:
        </p>
        <ul>
          <li><strong>Locked Rotor Amperage (LRA):</strong> At standstill, the compressor motor draws an instantaneous starting surge of 75 to 88 Amps at 240V (representing 18,000 to 21,000 Watts) for 100 to 300 milliseconds.</li>
          <li><strong>Generator Sizing Considerations:</strong> Standard 7,500W to 10,000W portable generators can experience severe voltage drop and frequency sag when subjected to an 18+ kW motor starting surge, potentially tripping breakers or stalling.</li>
          <li><strong>Soft-Starter Compatibility:</strong> A properly selected electronic soft starter (such as Micro-Air EasyStart or Hyper Engineering SureStart) can reduce starting inrush by an illustrative 65% to 70%, lowering starting surge down to ~22A–26A. However, generator compatibility must always be verified using actual compressor LRA, soft-starter specifications, generator continuous and surge capabilities, and manufacturer installation guidelines.</li>
        </ul>
        <p>
          To model generator sizing with motor inrush, use our dedicated <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link> or consult our <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide">Emergency Generator Sizing &amp; Motor Inrush Guide</Link>.
        </p>
      </section>

      {/* Formula Card */}
      <div id="formula-math" style={{ marginTop: "2.5rem" }}>
        <FormulaCard
          title="Calculation Formula & Sizing Method"
          formula="Estimated Cost ($) = [(Cooling_BTU / (SEER2 × 1000))] × Daily_Hours × (Duty_Cycle / 100) × Electricity_Rate × Days"
          formulaDescription="Provides a simplified planning estimate of electrical energy consumption and operating cost by converting nominal cooling capacity and SEER2 to an estimated kilowatt power proxy, adjusting for compressor cycling duty cycle, and applying local utility tariffs."
          variables={[
            { symbol: "Cooling_BTU", label: "Nominal Cooling Capacity", description: "Rated cooling capacity (Tons × 12,000 BTU/hr).", unit: "BTU/hr" },
            { symbol: "SEER2", label: "Seasonal Energy Efficiency", description: "DOE standardized seasonal cooling efficiency ratio.", unit: "BTU/Wh" },
            { symbol: "Daily_Hours", label: "Thermostat Active Window", description: "Hours per day the system is maintaining setpoint.", unit: "hours" },
            { symbol: "Duty_Cycle", label: "Compressor Active Percentage", description: "Fraction of time the compressor actively cycles (typically 35% to 65%).", unit: "%" },
            { symbol: "Electricity_Rate", label: "Utility Tariff", description: "Cost per kilowatt-hour including generation and delivery.", unit: "$/kWh" },
          ]}
          notes={[
            "SEER2 is a seasonal efficiency rating; actual instantaneous power varies with ambient temperatures, airflow, and compressor modulation.",
            "In heating mode, heat pumps use HSPF2 or COP rather than SEER2. Use the dedicated Heat Pump Cost Calculator for heating projections.",
          ]}
        />
      </div>

      {/* FAQ Section */}
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

      {/* Related Tools & Interlinking */}
      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>Related Energy Planning Calculators &amp; Engineering Guides</h2>
        <p>
          Calculations run in your browser • No sign-up required. Continue planning your home energy efficiency and backup power systems:
        </p>
        <ul>
          <li>
            <Link href="/home-energy/air-conditioner-cost-calculator"><strong>Air Conditioner Cost Calculator</strong></Link> — Customize room AC units, mini-splits, and central systems with seasonal month projections.
          </li>
          <li>
            <Link href="/home-energy/heat-pump-cost-calculator"><strong>Heat Pump Running Cost Calculator</strong></Link> — Compare heat pump operating costs against natural gas, propane, and fuel oil across climate zones.
          </li>
          <li>
            <Link href="/home-energy/space-heater-cost-calculator"><strong>Space Heater Cost Calculator</strong></Link> — Calculate operating costs for 500W, 1000W, and 1500W resistance heaters.
          </li>
          <li>
            <Link href="/home-energy/electricity-usage-calculator"><strong>Electricity Usage Calculator</strong></Link> — Model total home daily and monthly kilowatt-hour consumption.
          </li>
          <li>
            <Link href="/home-energy/generator-size-calculator"><strong>Generator Size Calculator</strong></Link> — Size portable and standby generators with sequential motor starting and LRA surge modeling.
          </li>
          <li>
            <Link href="/guides/how-many-kwh-does-a-house-use-per-day"><strong>Daily Household kWh Usage Guide</strong></Link> — See EIA benchmark data for typical residential electric usage by home square footage.
          </li>
          <li>
            <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide"><strong>Emergency Generator Sizing &amp; Motor Inrush Guide</strong></Link> — Inductive motor inrush physics and soft-starter sizing for AC compressors.
          </li>
          <li>
            <Link href="/datasets/heat-pump-sub-zero-cop-degradation-benchmark"><strong>Benchmark Dataset: Heat Pump Sub-Zero COP Degradation (PL-DS-HVAC-04)</strong></Link> — Open empirical dataset tabulating sub-zero COP retention, compressor power draw, and electric strip heat staging from 47°F down to -15°F.
          </li>
          <li>
            <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics"><strong>Research Report: Heat Pump COP Degradation &amp; Strip Heat Dynamics (PL-TR-2026-HVAC01)</strong></Link> — Engineering preprint analyzing sub-zero vapor compression kinetics and auxiliary staging costs.
          </li>
        </ul>
      </section>

      {/* Academic Citation & Technical References */}
      <section style={{ marginTop: "3rem", padding: "1.5rem", border: "1px solid var(--line)", borderRadius: "0.75rem", background: "var(--surface)" }}>
        <h3 style={{ margin: "0 0 0.5rem" }}>Technical References &amp; Model Basis</h3>
        <p style={{ margin: "0 0 1rem", fontSize: "0.95rem", color: "var(--ink)" }}>
          This guide references AHRI Standard 210/240, ASHRAE Standard 90.1, DOE 10 CFR Part 430, and U.S. EIA residential data for contextual HVAC efficiency metrics, test procedures, and utility benchmarks. The formulas presented are simplified planning models and are not certified engineering specifications. For thermodynamic research on low-temperature heating, see our report on <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ color: "var(--brand-strong)", fontWeight: 700 }}>COP Degradation &amp; Strip Heat Staging (PL-TR-2026-HVAC01)</Link>. Cite this publication for planning and educational references:
        </p>
        <AcademicCitationModal
          title="Central AC & Heat Pump Electricity Cost Guide"
          urlPath="/guides/central-ac-and-heat-pump-electricity-cost-guide"
          year={2026}
        />
      </section>

      <StandardsBadge category="home-energy" />

      <Disclaimer variant="standard" />
    </article>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { AcCostCalculator } from "@/components/calculator/ac-cost-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Central AC & Heat Pump Electricity Cost Guide",
  description: "Calculate central AC and heat pump electricity costs. Master SEER2, tonnage power draw, compressor duty cycles, and operating cost formulas.",
  canonicalPath: "/guides/central-ac-and-heat-pump-electricity-cost-guide",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many watts does a 3-ton central air conditioner use?",
    answer: "A standard 3-ton (36,000 BTU/hr) central air conditioner with a modern SEER2 rating of 14.5 to 16 draws approximately 2,250 to 2,500 continuous running watts while the compressor and outdoor fan are active. Older 10-SEER units draw 3,500 to 3,800 watts for the same cooling capacity.",
  },
  {
    question: "How much does it cost to run central AC all day (24 hours)?",
    answer: "At the U.S. national average electricity price of $0.16/kWh, running a 3-ton central AC costs approximately $3.60 to $5.50 per day during summer heat. Even though the thermostat is set 24 hours a day, the compressor cycles on and off, averaging 9 to 14 total operating hours per day (a 35% to 60% compressor duty cycle).",
  },
  {
    question: "Is it cheaper to leave the AC running all day or turn it off when away?",
    answer: "According to thermodynamics and U.S. Department of Energy (DOE) studies, heat transfer into a home is directly proportional to the indoor-outdoor temperature delta (ΔT). Allowing the house to warm up while away reduces total heat gain, requiring less cumulative energy to cool back down than maintaining a constant low temperature all day. A programmable thermostat setback of 7°F to 10°F saves 10% to 15% on cooling bills.",
  },
  {
    question: "What is the difference between SEER and SEER2 ratings?",
    answer: "SEER2 (Seasonal Energy Efficiency Ratio 2), mandated by the DOE in 2023 under test standard M1, tests HVAC equipment under 0.5 inches of water column (in. w.c.) external static pressure rather than the unrealistic 0.1 to 0.2 in. w.c. used in legacy SEER tests. As a result, SEER2 ratings are nominally 4.5% to 4.7% lower than legacy SEER numbers for the exact same physical equipment (e.g., 14 SEER ≈ 13.4 SEER2).",
  },
  {
    question: "Can a portable generator run a central air conditioner during an outage?",
    answer: "A central AC's running watts (2,000W–3,500W) can easily fit within a 7,500W–9,000W generator's capacity, but its compressor starting surge (Locked Rotor Amperage or LRA) can instantaneously demand 15,000W to 20,000W (60A–85A at 240V), stalling the generator. Installing a micro-controller soft starter (such as Micro-Air EasyStart) drops inrush current by 65% to 70%, allowing a 3-ton to 4-ton unit to start smoothly on an 8,500W generator.",
  },
  {
    question: "When is a heat pump cheaper to run than a natural gas furnace?",
    answer: "A modern heat pump operating with a Coefficient of Performance (COP) above 3.0 provides heat at lower cost than a natural gas furnace when the local electricity price per kWh is less than ~28 to 30 times the price of natural gas per therm. In moderate winter temperatures (above 35°F / 2°C), heat pumps deliver 300% to 400% efficiency, outperforming even 96% AFUE condensing gas furnaces.",
  },
];

export default function CentralAcAndHeatPumpGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Central AC & Heat Pump Electricity Cost Guide (SEER2, Tons & Power Draw)",
    description: "Definitive HVAC engineering and energy auditing guide: calculate central AC and heat pump operating cost, SEER2 power demand, compressor cycling, and heat pump vs gas economics.",
    route: "/guides/central-ac-and-heat-pump-electricity-cost-guide",
    datePublished: "2026-08-29",
    dateModified: "2026-08-29",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    standards: [
      "AHRI Standard 210/240 (Unitary Air-Conditioning & Air-Source Heat Pump Equipment)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "U.S. Department of Energy 10 CFR Part 430 (SEER2 / HSPF2 Metric Rules)",
      "U.S. Energy Information Administration (EIA) RECS Benchmark Data",
      "NFPA 70 / NEC Article 440 (Air-Conditioning and Refrigerating Equipment)",
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
        <span aria-current="page">Central AC &amp; Heat Pump Cost Guide</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">HVAC Energy Auditing &amp; Efficiency Engineering</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Central AC &amp; Heat Pump Electricity Cost Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          A definitive engineering guide to residential cooling and heating power consumption. Learn how to convert tonnage and SEER2 ratings to kilowatt-hours, model compressor cycling duty cycles, evaluate heat pump vs. natural gas cost parity, and calculate exact hourly, daily, and seasonal operating expenses.
        </p>
      </header>

      <DirectAnswerCard
        keyword="central AC and heat pump electricity cost formula"
        answer="Running a typical 3-ton central AC or heat pump (14–16 SEER2) costs approximately $0.35 to $0.60 per operating hour, or $3.50 to $6.00 per day at the U.S. national average electricity rate of $0.16/kWh. Steady-state power draw averages 2,250 to 2,800 running watts with a 35% to 65% compressor cycling duty cycle."
        formula="P (kW) = (Tons × 12,000) ÷ (SEER2 × 1,000) · Hourly Cost = P (kW) × Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="3-Ton Central AC (36,000 BTU/hr @ 15 SEER2) = 2.4 kW. At 50% duty cycle (1.2 kWh/hr active) and $0.16/kWh, operating cost is $0.192/hr of day, $4.61/day, and ~$138/month."
        sourceAuthority="AHRI Standard 210/240, ASHRAE 90.1 & U.S. EIA RECS Utility Benchmarks"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Air Conditioner &amp; Heat Pump Cost Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Configure cooling capacity (BTU or Tons), SEER2 rating, compressor daily run-time, and local electric utility rates to model precise hourly, daily, and monthly cooling expenses.
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
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`1 Ton of Cooling = 12,000 BTU/hr = 3.517 kW of Thermal Heat Removal`}</code>
        </pre>

        <h3>SEER2, EER, and Electrical Power Draw</h3>
        <p>
          The electrical power demand of an air conditioner is dictated by its efficiency ratio. The seasonal performance is governed by <strong>SEER2 (Seasonal Energy Efficiency Ratio 2)</strong>, defined under AHRI 210/240 as total cooling output in BTUs divided by total electrical energy input in watt-hours over a standardized cooling season:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`P_electrical (Watts) = Cooling Capacity (BTU/hr) ÷ SEER2 (or EER)
P_electrical (kW) = (Tonnage × 12,000) ÷ (SEER2 × 1,000)`}</code>
        </pre>
        <p>
          For instantaneous peak summer demand during extreme heat waves (95°F / 35°C outdoor ambient), the system operates closer to its steady-state <strong>EER (Energy Efficiency Ratio)</strong>, which is typically 15% to 20% lower than the seasonal SEER2 number.
        </p>
      </section>

      {/* Section 2: Tonnage Sizing & Benchmark Matrix */}
      <section id="tonnage-sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>2. Central AC Power Draw &amp; Cost by Tonnage (1.5 to 5.0 Tons)</h2>
        <p>
          Below is an empirical benchmark table showing electrical power demand, daily kilowatt-hour consumption, and estimated monthly operating cost across common residential AC sizes at standard 15 SEER2 efficiency and the U.S. national average electric rate of $0.16/kWh:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Central AC Electrical Demand &amp; Operating Cost by System Size (15 SEER2 @ $0.16/kWh)</caption>
            <thead>
              <tr>
                <th scope="col">System Size</th>
                <th scope="col">Capacity (BTU/hr)</th>
                <th scope="col">Typical Home Area</th>
                <th scope="col">Electrical Draw</th>
                <th scope="col">Daily kWh (10h/day)</th>
                <th scope="col">Cost / Month (@ $0.16)</th>
                <th scope="col">Locked Rotor Amps (LRA)</th>
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
      </section>

      {/* Section 3: SEER2 vs SEER Efficiency */}
      <section id="seer2-efficiency-comparison" style={{ marginTop: "2.5rem" }}>
        <h2>3. SEER2 Rating Impact: Upgrading Old Equipment</h2>
        <p>
          Many homeowners operate legacy 10 SEER or 12 SEER air conditioning systems installed in the early 2000s. Because power draw is inversely proportional to the efficiency rating, upgrading to modern equipment yields substantial compounding savings:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Percentage Energy Savings (%) = 1 - (Old SEER ÷ New SEER2)`}</code>
        </pre>
        <ul>
          <li><strong>Upgrading from 10 SEER to 15.2 SEER2:</strong> Reduces cooling electrical consumption by <strong>36.8%</strong> (saving ~$65 to $110 per peak summer month on a 3-ton unit).</li>
          <li><strong>Upgrading from 10 SEER to 18 SEER2 (Inverter Variable-Speed):</strong> Reduces electricity usage by <strong>46.7%</strong> while improving humidity removal and eliminating on/off temperature swings.</li>
          <li><strong>Upgrading from 12 SEER to 20 SEER2:</strong> Delivers a <strong>42.1%</strong> reduction in summer cooling costs.</li>
        </ul>
      </section>

      {/* Section 4: Heat Pump vs Gas Parity */}
      <section id="heat-pump-vs-gas" style={{ marginTop: "2.5rem" }}>
        <h2>4. Heat Pump Heating Mode vs. Natural Gas Furnace Economics</h2>
        <p>
          In heating mode, modern air-source heat pumps reverse their refrigeration cycle, extracting thermal energy from cold outdoor air and pumping it inside. Rather than burning fuel at 80%–96% efficiency, heat pumps achieve a <strong>Coefficient of Performance (COP) of 2.5 to 4.2</strong> (generating 2.5 to 4.2 units of heat per unit of electricity consumed).
        </p>
        <p>
          To determine whether heating with a heat pump is cheaper than a high-efficiency natural gas furnace, calculate the <strong>Break-Even COP</strong> based on your local utility rates:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Break-Even COP = (Electricity Rate in $/kWh × 29.3) ÷ (Natural Gas Rate in $/therm ÷ η_furnace)`}</code>
        </pre>
        <p>
          <em>Example:</em> At an electricity price of $0.16/kWh and natural gas at $1.50/therm with a 95% efficient furnace (<code>η = 0.95</code>):
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Break-Even COP = (0.16 × 29.3) ÷ (1.50 ÷ 0.95) = 4.69 ÷ 1.58 = 2.97`}</code>
        </pre>
        <p>
          Whenever outdoor temperatures allow the heat pump to operate at a COP above 2.97 (typically above 32°F / 0°C for modern cold-climate heat pumps with vapor-injection compressors), heating with the heat pump is cheaper than burning natural gas.
        </p>
      </section>

      {/* Section 5: Compressor Inrush & Generator Sizing */}
      <section id="compressor-inrush-and-generators" style={{ marginTop: "2.5rem" }}>
        <h2>5. Compressor Inrush Surge &amp; Emergency Generator Sizing</h2>
        <p>
          While running a 3-ton air conditioner requires only 2,400 running watts, starting the unit poses the single greatest challenge to emergency home backup systems:
        </p>
        <ul>
          <li><strong>Locked Rotor Amperage (LRA):</strong> At standstill, the single-phase induction compressor motor draws 75 to 88 Amps at 240V for 100 to 300 milliseconds. This represents an instantaneous inrush surge of <strong>18,000 to 21,000 Watts</strong>.</li>
          <li><strong>Generator Stalling:</strong> Standard 7,500W to 10,000W portable generators experience severe voltage drop and frequency collapse when hit with an instantaneous 18 kW surge, tripping their breakers or stalling the engine.</li>
          <li><strong>The Soft-Starter Solution:</strong> Installing an electronic soft starter (such as Micro-Air EasyStart or Hyper Engineering SureStart) uses thyristor voltage ramping to reduce starting inrush by <strong>65% to 70%</strong>. This lowers a 75A LRA down to ~22A–25A (under 6,000W surge), enabling a 3-ton or 4-ton unit to start cleanly on an 8,500W generator or a home battery system.</li>
        </ul>
        <p>
          To calculate exact generator sizing with motor inrush, use our dedicated <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link> or read our deep-dive <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide">Emergency Generator Sizing &amp; Motor Inrush Guide</Link>.
        </p>
      </section>

      {/* Formula Card */}
      <div id="formula-math" style={{ marginTop: "2.5rem" }}>
        <FormulaCard
          title="Central AC & Heat Pump Operating Cost Formulation"
          formula="Cost ($) = [(Cooling_BTU / SEER2) / 1000] × Daily_Hours × (Duty_Cycle / 100) × Electricity_Rate × Days"
          formulaDescription="Determines exact electrical energy consumption and dollar cost by converting rated cooling capacity to continuous electrical kilowatt demand, adjusting for compressor thermostat cycling, and applying local utility tariffs."
          variables={[
            { symbol: "Cooling_BTU", label: "Rated Cooling Capacity", description: "Nominal heat removal rate (Tons × 12,000 BTU/hr).", unit: "BTU/hr" },
            { symbol: "SEER2", label: "Seasonal Energy Efficiency", description: "DOE 2023 standardized seasonal cooling efficiency ratio.", unit: "BTU/Wh" },
            { symbol: "Daily_Hours", label: "Operating Window", description: "Hours per day the cooling system is armed and maintaining setpoint.", unit: "hours" },
            { symbol: "Duty_Cycle", label: "Compressor Active Percentage", description: "Fraction of time the compressor actively pumps refrigerant (typically 35% to 65%).", unit: "%" },
            { symbol: "Electricity_Rate", label: "Utility Tariff", description: "All-in cost per kilowatt-hour including generation and distribution.", unit: "$/kWh" },
          ]}
          notes={[
            "Window AC units and portable ACs have lower efficiency (typically 10 to 12 CEER) compared to central AC systems (14.5 to 20+ SEER2).",
            "In extreme heat waves (>100°F), compressor duty cycles can approach 85% to 100% continuous runtime.",
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
          Continue planning your home energy efficiency, solar sizing, and backup power systems with our verified, ad-free calculators:
        </p>
        <ul>
          <li>
            <Link href="/home-energy/air-conditioner-cost-calculator"><strong>Air Conditioner Cost Calculator</strong></Link> — Customize room AC units, mini-splits, and central systems with seasonal month projections.
          </li>
          <li>
            <Link href="/home-energy/heat-pump-cost-calculator"><strong>Heat Pump Running Cost Calculator</strong></Link> — Compare heat pump operating costs against natural gas, propane, and fuel oil.
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
            <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide"><strong>Emergency Generator Sizing &amp; Motor Inrush Guide</strong></Link> — Master inductive motor inrush physics and soft-starter sizing for AC compressors.
          </li>
        </ul>
      </section>

      {/* Academic Citation & Standards */}
      <section style={{ marginTop: "3rem", padding: "1.5rem", border: "1px solid var(--line)", borderRadius: "0.75rem", background: "var(--surface)" }}>
        <h3 style={{ margin: "0 0 0.5rem" }}>Engineering Standards &amp; Academic Citation</h3>
        <p style={{ margin: "0 0 1rem", fontSize: "0.95rem", color: "var(--ink)" }}>
          Calculations adhere to AHRI 210/240, ASHRAE 90.1, DOE 10 CFR Part 430, and U.S. EIA residential consumption data. Cite this publication for academic research, syllabus planning, or engineering audits:
        </p>
        <AcademicCitationModal
          title="Central AC & Heat Pump Electricity Cost Guide"
          urlPath="/guides/central-ac-and-heat-pump-electricity-cost-guide"
          year={2026}
        />
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

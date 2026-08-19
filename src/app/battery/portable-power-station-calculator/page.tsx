import type { Metadata } from "next";
import Link from "next/link";
import { PortablePowerStationCalculator } from "@/components/calculator/portable-power-station-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


const isPublished = isCalculatorPublished("portable-power-station");

export const metadata: Metadata = {
  title: "Portable Power Station Calculator — Runtime & Capacity",
  description: "Estimate portable power station runtime from Wh capacity and appliance load, or calculate the capacity needed for a target runtime. Check AC output limits.",
  alternates: { canonical: "/battery/portable-power-station-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: { title: "Portable Power Station Calculator — Runtime & Capacity", description: "Estimate portable power station runtime or required capacity with transparent energy and output assumptions." },
};

const FAQS = [
  {
    question: "How long will a 1,000Wh portable power station run a refrigerator?",
    answer: "A modern home refrigerator (averaging ~150W with a 35% duty cycle = ~50W continuous average) will run for approximately 14 to 17 hours on a 1,000Wh portable power station (factoring in ~88% inverter efficiency and internal BMS reserve).",
  },
  {
    question: "Why does my 500Wh power station not give me a full 500 watt-hours?",
    answer: "Portable power stations convert internal DC battery power to 120V/230V AC via a built-in inverter (typically 85%–90% efficiency). Additionally, the internal BMS retains a 5%–10% safety buffer to prevent cell over-discharge.",
  },
  {
    question: "What size power station do I need for camping?",
    answer: "For a weekend camping trip running a 12V cooler/fridge (20W), LED lanterns, phone chargers, and a drone, a 500Wh to 1,000Wh power station (like a Jackery 1000 or EcoFlow Delta 2) is typically the sweet spot.",
  },
  {
    question: "Can a portable power station run a coffee maker or microwave?",
    answer: "Yes, provided the power station's continuous inverter rating exceeds the appliance's wattage. A 1,000W coffee maker requires a power station with at least a 1,200W to 1,500W pure sine wave inverter (e.g. 1,000Wh+ class units).",
  },
];

export default function PortablePowerStationPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Portable Power Station Calculator",
    description: "Estimate portable power station runtime and required capacity in Wh for camping, vans, and blackout backup.",
    route: "/battery/portable-power-station-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates runtime in hours and minutes across standard station capacities",
      "Calculates required station capacity (Wh) for a target runtime duration",
      "Checks continuous inverter and surge wattage limits",
      "Appliance builder with duty cycles and power checks",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/battery">Battery</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Portable Power Station Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Portable battery planning</p>
        <h1>Portable Power Station Calculator</h1>
        <p className="intro">
          Estimate how long a portable power station (Jackery, EcoFlow, Bluetti, Anker) will run your devices, or calculate the exact watt-hour capacity you need for camping and emergency backup.
        </p>
      </div>

      <DirectAnswerCard
        keyword="portable power station runtime calculation"
        answer="A 1,000Wh portable power station will power a 60W portable fridge for approximately 14 hours, a 30W CPAP machine for 28 hours, or recharge a 60Wh laptop ~14 times. Runtime is calculated by multiplying rated battery capacity by usable depth-of-discharge (90%) and inverter conversion efficiency (85%), then dividing by device wattage."
        formula="Runtime (Hours) = (Station Capacity Wh × 0.90 DoD × 0.85 Inverter Efficiency) ÷ Total AC Load (Watts)"
        standardExample="1000Wh station running a 60W load: (1000 × 0.90 × 0.85) ÷ 60W = 12.75 hours (12h 45m)"
        sourceAuthority="UL 2743 (Portable Power Packs Standard) & IEC 62133"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <PortablePowerStationCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Power Station Runtime &amp; Sizing</h2>
        <ol>
          <li><strong>Select Power Station Capacity:</strong> Choose standard models (300Wh, 500Wh, 1000Wh, 2000Wh) or enter custom watt-hours.</li>
          <li><strong>Add Connected Devices:</strong> Add laptops, camping fridges, CPAP machines, or electric coolers with realistic duty cycles.</li>
          <li><strong>Verify Inverter Limits:</strong> Ensure device running watts and startup surges do not exceed the station&apos;s continuous AC inverter rating.</li>
          <li><strong>Review Operating Duration:</strong> View exact hours and battery recharges available on a single charge.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Portable Power Station Capability Chart (What Can It Run?)</h2>
        <p>Estimated runtime across common portable power station capacities (e.g. Jackery, EcoFlow, Bluetti, Anker) assuming 10% reserve and 88% AC inverter efficiency:</p>
        <div className="scenario-table" role="region" aria-label="Power station capability matrix">
          <table>
            <caption>Estimated runtime across portable power station capacities</caption>
            <thead>
              <tr>
                <th scope="col">Device / Appliance</th>
                <th scope="col">Average Power</th>
                <th scope="col">300 Wh Station (~240 Usable Wh)</th>
                <th scope="col">500 Wh Station (~400 Usable Wh)</th>
                <th scope="col">1,000 Wh Station (~800 Usable Wh)</th>
                <th scope="col">2,000 Wh Station (~1,600 Usable Wh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Smartphones &amp; Tablets</strong> (15W USB-C)</td>
                <td>15 W</td>
                <td>~16 charges</td>
                <td>~27 charges</td>
                <td>~53 charges</td>
                <td>~107 charges</td>
              </tr>
              <tr>
                <td><strong>Laptop (65W USB-PD)</strong></td>
                <td>45 W avg</td>
                <td>~5.3 hours</td>
                <td>~8.9 hours</td>
                <td>~17.8 hours</td>
                <td>~35.6 hours</td>
              </tr>
              <tr>
                <td><strong>12V 45L Portable Camping Fridge</strong></td>
                <td>20 W avg (cycling)</td>
                <td>~12 hours</td>
                <td>~20 hours</td>
                <td>~40 hours (1.7 days)</td>
                <td>~80 hours (3.3 days)</td>
              </tr>
              <tr>
                <td><strong>CPAP Machine</strong> (no heated humidifier)</td>
                <td>35 W</td>
                <td>~6.9 hours</td>
                <td>~11.4 hours</td>
                <td>~22.9 hours (2.8 nights)</td>
                <td>~45.7 hours (5.7 nights)</td>
              </tr>
              <tr>
                <td><strong>Starlink Satellite Dish</strong></td>
                <td>60 W</td>
                <td>~4.0 hours</td>
                <td>~6.7 hours</td>
                <td>~13.3 hours</td>
                <td>~26.7 hours</td>
              </tr>
              <tr>
                <td><strong>Full-Size Home Refrigerator</strong></td>
                <td>150 W avg (450W surge)</td>
                <td>Inverter limit check</td>
                <td>~2.7 hours</td>
                <td>~5.3 hours</td>
                <td>~10.7 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Portable Power Station Runtime &amp; Capacity Formulas"
          formula="Runtime (hours) = (Station_Wh × Usable_Window × Health × Inverter_Eff) / Load_Watts"
          formulaDescription="Calculates operational hours from battery storage and validates whether continuous and surge wattage demand satisfy the station's built-in inverter limits."
          variables={[
            { symbol: "Station_Wh", label: "Rated Battery Energy", description: "Nominal lithium battery capacity of the power station (e.g. 512 Wh, 1,024 Wh, 2,048 Wh).", unit: "Wh" },
            { symbol: "Usable_Window", label: "Usable SOC Share", description: "Available capacity above internal BMS cutoff (typically 90%–95%).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Pure Sine Wave Inverter Efficiency", description: "Internal DC-to-AC conversion efficiency (typically 85%–90%).", unit: "fraction" },
            { symbol: "Load_Watts", label: "Average Connected Load", description: "Running watts × duty cycle.", unit: "W" },
          ]}
          notes={[
            "Required Capacity Mode: Station_Wh = (Load_Watts × Desired_Hours × (1 + Margin)) / (Usable_Window × Inverter_Eff).",
            "Power check: Running Watts ≤ Continuous Inverter Limit, and Startup Surge Watts ≤ Peak Surge Limit.",
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
        <h2>Related Portable &amp; Off-Grid Tools</h2>
        <p>
          Compare vehicle-to-load capabilities with the <Link href="/ev/v2l-runtime-calculator">V2L Runtime Calculator</Link>, size off-grid solar storage with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, or check battery discharge with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

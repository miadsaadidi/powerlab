import type { Metadata } from "next";
import Link from "next/link";
import { SolarLoadCalculator } from "@/components/calculator/solar-load-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-load");

export const metadata: Metadata = {
  title: "Solar Load Calculator — Daily Watt-Hour & Inverter Sizing",
  description: "Calculate your total daily electrical load (Wh/day and kWh/day) to accurately size off-grid solar panels, battery banks, and inverter wattage.",
  alternates: { canonical: "/solar/solar-load-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Solar Load Calculator — PowerLab",
    description: "Calculate daily appliance watt-hours and peak continuous wattage for off-grid solar planning.",
    url: `${siteConfig.url}/solar/solar-load-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you calculate total solar electrical load?",
    answer: "Multiply each appliance's running wattage by its operating hours per day, quantity, and duty cycle (percentage of time actively drawing power). Sum all appliances to find your total daily energy requirement in Watt-hours (Wh) or kilowatt-hours (kWh).",
  },
  {
    question: "What is the difference between daily energy load (Wh) and peak wattage (W)?",
    answer: "Daily energy load (Watt-hours) measures total electricity consumed over 24 hours and determines how many solar panels and battery amp-hours you need. Peak wattage (Watts) is the maximum instantaneous power drawn if all appliances run simultaneously, which determines the size of your AC power inverter.",
  },
  {
    question: "Why do cycling appliances like refrigerators use duty cycles?",
    answer: "A refrigerator rated at 150 Watts does not draw 150W for 24 continuous hours. Once the interior reaches the set temperature, the compressor cycles off. In typical room temperatures, a refrigerator has an active duty cycle of approximately 30% to 40% (~8 to 10 hours of active compressor run time per day).",
  },
  {
    question: "What is an essential versus non-essential load in solar planning?",
    answer: "Essential loads are critical devices that must remain powered during an extended blackout or cloudy period (refrigeration, medical devices, Wi-Fi router, LED lighting, water well pump). Non-essential loads (air conditioning, clothes dryer, dishwasher) can be turned off to conserve battery storage.",
  },
];

export default function SolarLoadPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Load Calculator",
    description: "Estimate daily appliance energy in Watt-hours and peak power in Watts for off-grid solar and battery storage sizing.",
    route: "/solar/solar-load-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates daily energy consumption in Wh/day and kWh/day",
      "Calculates total connected running watts for inverter sizing",
      "Built-in appliance catalog with realistic duty-cycle estimates",
      "One-click handoff to solar panel sizing and battery bank sizing",
    ],
    standards: [
      "NFPA 70 / NEC Article 220 (Branch-Circuit, Feeder, and Service Load Calculations)",
      "IEEE Std 1013 (Sizing Stand-Alone Photovoltaic Systems)",
      "IEC 62548 (Design Requirements for Photovoltaic Arrays)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/solar">Solar</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Load Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar planning</p>
        <h1>Solar Load Calculator</h1>
        <p className="intro">
          Estimate your total daily appliance electrical energy consumption (Wh/day and kWh/day) and connected peak power to size off-grid solar arrays, battery banks, and inverters.
        </p>
      </div>

      <DirectAnswerCard
        keyword="solar load profile calculation"
        answer="Total daily solar load is the sum of every appliance's power draw multiplied by its operating hours and duty cycle: Daily Energy (Wh) = Σ (Watts × Hours/Day × Duty Cycle). For example, a refrigerator (150W × 24h × 35% duty = 1,260 Wh) + LED lighting (100W × 5h = 500 Wh) + Wi-Fi router (20W × 24h = 480 Wh) totals 2,240 Wh/day (2.24 kWh/day)."
        formula="Daily Solar Load (Wh/day) = Σ (Appliance Watts × Quantity × Daily Hours × Duty Cycle)"
        standardExample="Essential load (Fridge + Wi-Fi + Lights + TV): ~3.5 kWh/day · requires ~1.0 kW solar array & 5 kWh battery"
        sourceAuthority="IEEE Std 1562 (Array Sizing for Stand-Alone PV Systems)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarLoadCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Solar Load</h2>
        <ol>
          <li><strong>Select or Add Appliances:</strong> Choose common household appliances from the pre-populated catalog or enter custom wattages.</li>
          <li><strong>Set Daily Run Hours &amp; Quantity:</strong> Enter how many hours each device operates per day.</li>
          <li><strong>Check Duty Cycles:</strong> Thermostatically cycled appliances (refrigerators, freezers) default to realistic 30%–40% duty cycles.</li>
          <li><strong>Filter Essential vs Total Load:</strong> Distinguish critical blackout loads from heavy discretionary appliances.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar System Load Profiles &amp; Inverter Sizing Guide</h2>
        <p>Typical daily watt-hour energy consumption profiles and continuous inverter power requirements for off-grid and backup solar applications:</p>
        <div className="scenario-table" role="region" aria-label="Solar daily load sizing matrix">
          <table>
            <caption>Typical solar load profiles and recommended inverter capacities</caption>
            <thead>
              <tr>
                <th scope="col">Application Type</th>
                <th scope="col">Key Appliances Included</th>
                <th scope="col">Daily Energy (Wh/day)</th>
                <th scope="col">Continuous Inverter Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Overland / RV Setup</strong></td>
                <td>12V Fridge, LED lights, fan, phone/camera charging</td>
                <td>~600 – 1,000 Wh / day</td>
                <td>1,000 W – 1,500 W</td>
              </tr>
              <tr>
                <td><strong>Off-Grid Tiny House / Cabin</strong></td>
                <td>Energy-star fridge, Starlink, TV, laptops, lighting</td>
                <td>~2,500 – 4,500 Wh / day</td>
                <td>2,000 W – 3,000 W</td>
              </tr>
              <tr>
                <td><strong>Critical Home Backup</strong></td>
                <td>Fridge, deep freezer, well pump, router, security</td>
                <td>~5,000 – 8,000 Wh / day</td>
                <td>4,000 W – 6,000 W</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Off-Grid</strong></td>
                <td>All appliances, mini-split heat pump, induction cooktop</td>
                <td>~15,000 – 25,000 Wh / day</td>
                <td>8,000 W – 12,000 W</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Daily Solar Load &amp; Energy Demand Formulas"
          formula="Daily_Wh = ∑ (Watts_i × Quantity_i × Hours_i × (Days_i / 7) × Duty_Cycle_i)  |  Peak_Watts = ∑ (Watts_i × Quantity_i)"
          formulaDescription="Calculates cumulative daily energy requirement (Wh/day) and connected peak power demand (Watts) across all AC and DC household appliances."
          variables={[
            { symbol: "Watts_i", label: "Appliance Running Wattage", description: "Nominal electrical power consumed by device i.", unit: "W" },
            { symbol: "Quantity_i", label: "Unit Count", description: "Number of identical active appliances.", unit: "count" },
            { symbol: "Hours_i", label: "Operating Duration", description: "Active operating hours per run day.", unit: "hours/day" },
            { symbol: "Duty_Cycle_i", label: "Cycling Factor", description: "Percentage of active runtime drawing power (e.g., 35% for refrigerators, 100% for lighting).", unit: "fraction" },
            { symbol: "Peak_Watts", label: "Total Connected Power", description: "Simultaneous running wattage sum determining inverter size.", unit: "W" },
          ]}
          notes={[
            "Daily energy (Wh/day) determines solar array and battery storage capacity.",
            "Peak connected load (Watts) determines required AC inverter continuous power and breaker ratings.",
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
        <h2>Related Solar &amp; Off-Grid Planning Tools</h2>
        <p>
          Size your battery storage with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, size your solar array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, or check inverter capacity with the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

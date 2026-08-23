import type { Metadata } from "next";
import Link from "next/link";
import { BatteryRuntimeCalculator } from "@/components/calculator/battery-runtime-calculator";
import { calculateBatteryRuntime } from "@/lib/calculators/battery-runtime/engine";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


export const metadata: Metadata = {
  title: "Battery Runtime & Backup Calculator — Calculate Backup Hours",
  description: "Calculate how long a 12V, 24V, or 48V battery backup will run your appliances in hours and minutes. Supports LiFePO4, AGM, and Gel chemistries with inverter efficiency.",
  alternates: { canonical: "/battery/battery-runtime-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Battery Runtime & Backup Calculator — PowerLab",
    description: "Calculate how long your battery backup will power appliances in hours and minutes with depth-of-discharge reserve protection.",
    url: `${siteConfig.url}/battery/battery-runtime-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const example = calculateBatteryRuntime({
  capacityAh: 100,
  voltage: 12,
  loadWatts: 100,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  conversionEfficiency: 0.9,
  dutyCycle: 1,
});

const scenarioLoads = [50, 100, 300, 500].map((loadWatts) => ({
  loadWatts,
  runtimeHours: calculateBatteryRuntime({
    capacityAh: 100,
    voltage: 12,
    loadWatts,
    startingSoc: 1,
    reserveSoc: 0.2,
    batteryHealth: 1,
    conversionEfficiency: 0.9,
    dutyCycle: 1,
  }).result.runtimeHours,
}));

const FAQS = [
  {
    question: "How long will a 100Ah 12V battery run a refrigerator?",
    answer: "A standard household refrigerator averaging 150W (cycling with a ~35% compressor duty cycle) will run for approximately 6.3 hours on a 12V 100Ah LiFePO4 battery (assuming 80% usable capacity and 90% inverter efficiency). On a 200Ah battery, it will run for about 12.7 hours.",
  },
  {
    question: "How long will a 100Ah battery run a CPAP machine?",
    answer: "A CPAP machine consuming 35W without a heated humidifier will run for approximately 24.7 hours on a 12V 100Ah LiFePO4 battery, or around 3 full 8-hour nights of sleep before needing recharge.",
  },
  {
    question: "Why does a 12V 100Ah battery not provide the full 1,200 watt-hours?",
    answer: "Nominal energy is 12V × 100Ah = 1,200Wh. However, usable capacity is reduced by minimum state-of-charge reserve limits (typically 20% for LiFePO4 or 50% for Lead-Acid) and AC inverter conversion losses (typically 85%–92% efficiency).",
  },
  {
    question: "How do I calculate battery runtime for AC appliances?",
    answer: "Divide usable battery watt-hours by the battery-side load. For AC equipment: Usable Wh = Rated Wh × Usable Fraction. Battery-Side Load = Appliance Watts ÷ Inverter Efficiency. Runtime Hours = Usable Wh ÷ Battery-Side Load.",
  },
];

export default function BatteryRuntimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Runtime Calculator",
    description: "Estimate battery runtime from Wh or Ah, voltage, load, state of charge, reserve and inverter efficiency.",
    route: "/battery/battery-runtime-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates battery backup runtime in hours and minutes",
      "Converts Ah to Wh using nominal voltage presets",
      "Accounts for AC inverter and DC conversion efficiency losses",
      "Customizable depth-of-discharge reserve and battery health",
      "Appliance load builder with duty cycles and peak watts",
    ],
    standards: [
      "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
      "IEC 62619 (Secondary Lithium Cells and Batteries for Industrial Applications)",
      "UL 1973 (Batteries for Use in Stationary and Motive Applications)",
      "NFPA 70 / NEC Article 706 (Energy Storage Systems)",
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
        <span aria-current="page">Battery Runtime Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Battery planning</p>
        <h1>Battery Runtime Calculator</h1>
        <p className="intro">
          Estimate how long your 12V, 24V, or 48V battery bank will power connected appliances in hours and minutes, factoring in DOD reserves, battery health, and inverter losses.
        </p>
      </div>

      <DirectAnswerCard
        keyword="battery runtime calculator"
        answer="To calculate battery runtime, multiply your battery's total watt-hours by its usable Depth of Discharge (80% for LiFePO4, 50% for Lead-Acid) and inverter efficiency (~90%), then divide by the total connected load in watts."
        formula="Runtime (Hours) = (Capacity Wh × Usable DOD % × Inverter Eff %) ÷ Load Watts"
        standardExample="A 12V 100Ah LiFePO4 battery (1,280 Wh nominal = 921 Wh usable AC) powers a continuous 100W load for ~9.2 hours."
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <BatteryRuntimeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Battery Backup Runtime</h2>
        <ol>
          <li><strong>Enter Battery Capacity (Ah or Wh):</strong> Choose nominal system voltage (12V, 24V, 48V) and Amp-hour capacity.</li>
          <li><strong>Select or Enter Appliance Load (Watts):</strong> Enter continuous average running watts or use the appliance load builder.</li>
          <li><strong>Set Depth of Discharge (DOD) Reserve:</strong> Lithium LiFePO4 batteries allow 80% to 90% usable capacity; Lead-Acid/AGM allows 50%.</li>
          <li><strong>Review Operating Duration:</strong> View exact hours and minutes of backup power available.</li>
        </ol>

        <SystemFlowDiagram category="battery" title="Battery Discharge & Backup Flow Topology" />
      </section>

      <section id="sizing-matrix">
        <h2>Common Battery Runtime Scenarios (100Ah vs 200Ah LiFePO4)</h2>
        <p>Estimated continuous operating hours for popular appliances powered by a 12V lithium battery (80% usable capacity, 90% inverter efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Battery runtime scenarios">
          <table>
            <caption>Estimated runtime on 12V 100Ah (960Wh usable) vs 12V 200Ah (1,920Wh usable)</caption>
            <thead>
              <tr>
                <th scope="col">Device / Load</th>
                <th scope="col">Average Power</th>
                <th scope="col">100Ah 12V Runtime</th>
                <th scope="col">200Ah 12V Runtime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Wi-Fi Router + Modem</strong></td>
                <td>15 W</td>
                <td>~57.6 hours (2.4 days)</td>
                <td>~115.2 hours (4.8 days)</td>
              </tr>
              <tr>
                <td><strong>CPAP Machine</strong> (no heated humidifier)</td>
                <td>35 W</td>
                <td>~24.7 hours (~3 nights)</td>
                <td>~49.4 hours (~6 nights)</td>
              </tr>
              <tr>
                <td><strong>Starlink Satellite Terminal</strong></td>
                <td>50 W</td>
                <td>~17.3 hours</td>
                <td>~34.6 hours</td>
              </tr>
              <tr>
                <td><strong>12V Portable Camping Fridge</strong></td>
                <td>30 W avg (cycling)</td>
                <td>~28.8 hours (1.2 days)</td>
                <td>~57.6 hours (2.4 days)</td>
              </tr>
              <tr>
                <td><strong>Desktop PC + Monitor</strong></td>
                <td>200 W</td>
                <td>~4.3 hours</td>
                <td>~8.6 hours</td>
              </tr>
              <tr>
                <td><strong>Full-Size Refrigerator</strong> (cycling)</td>
                <td>150 W avg</td>
                <td>~6.3 hours</td>
                <td>~12.7 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Battery Runtime Calculation Formula"
          formula="Runtime (hours) = (Capacity_Wh × Usable_SOC × Battery_Health × Efficiency) / Load_Watts"
          formulaDescription="Calculates exact continuous running duration by determining net usable stored energy after Depth-of-Discharge (DOD) limits, battery health degradation, and inverter conversion losses."
          variables={[
            { symbol: "Capacity_Wh", label: "Nominal Battery Energy", description: "Rated battery watt-hours (or Volts × Amp-Hours).", unit: "Wh" },
            { symbol: "Usable_SOC", label: "Usable State of Charge Window", description: "Fraction of capacity available above minimum reserve (e.g., 80% for LiFePO4, 50% for Lead-Acid).", unit: "fraction" },
            { symbol: "Battery_Health", label: "State of Health (SOH)", description: "Available capacity relative to original factory rating (default 100%).", unit: "fraction" },
            { symbol: "Efficiency", label: "Conversion Efficiency (η)", description: "Inverter efficiency for AC loads (85%–93%) or DC-DC step efficiency.", unit: "fraction" },
            { symbol: "Load_Watts", label: "Continuous Power Demand", description: "Average real-time appliance consumption (Running Watts × Duty Cycle).", unit: "W" },
          ]}
          notes={[
            "For intermittent loads like refrigerators and AC compressors, average load = running watts × duty cycle (typically 30%–45%).",
            "Lead-acid and AGM batteries experience Peukert capacity loss under heavy discharge rates (>0.2C).",
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
        <h2>Related Battery Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Need to size a battery for a specific target runtime? Use our <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, check inverter continuous wattage with the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>, or size whole-home backup with the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Battery Backup Runtime Formula &amp; Inverter Loss Guide</Link> for detailed chemistry comparisons, Peukert derating curves, and worked step-by-step sizing examples.
        </p>
      </section>
    </article>
  );
}

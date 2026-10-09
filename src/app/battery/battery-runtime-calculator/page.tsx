import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { BatteryRuntimeCalculator } from "@/components/calculator/battery-runtime-calculator";
import { calculateBatteryRuntime } from "@/lib/calculators/battery-runtime/engine";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Runtime Calculator — Backup Hours",
  description: "Estimate how long a 12V, 24V, or 48V battery backup runs your appliances. Supports LiFePO4, AGM, and Gel chemistries with DoD reserves and inverter loss.",
  canonicalPath: "/battery/battery-runtime-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How long will a 100Ah 12V battery run a refrigerator?",
    answer: "A household refrigerator with a 150W compressor cycling at a 35% duty cycle averages approximately 52.5W. On a 12V 100Ah LiFePO4 battery (1,200Wh nominal, 80% usable DoD = 960Wh, 90% inverter efficiency yielding 864Wh delivered AC), it will run for approximately 16.5 hours (864 Wh ÷ 52.5 W). On a 12V 200Ah battery, it will run for about 32.9 hours. If the refrigerator runs continuously at 150W without cycling, runtime is approximately 5.8 hours on 100Ah and 11.5 hours on 200Ah.",
  },
  {
    question: "How long will a 100Ah battery run a CPAP machine?",
    answer: "An illustrative CPAP machine consuming ~35W (without a heated humidifier or heated tube) will run for approximately 24.7 hours on a 12V 100Ah LiFePO4 battery (864Wh delivered AC), or around 3 full 8-hour nights of sleep. Actual runtime varies depending on machine model, therapy pressure settings, humidifier heating (which can increase draw to 70W–100W+), mask seal quality, and whether powered via an AC inverter or a high-efficiency native DC-DC adapter.",
  },
  {
    question: "Why does a 12V 100Ah battery not deliver the full 1,200 watt-hours to AC appliances?",
    answer: "Nominal stored energy is 12V × 100Ah = 1,200Wh (or 1,280Wh for a 12.8V 4S LiFePO4 pack). Delivered AC energy is lower due to: (1) Safe Depth of Discharge reserve limits (typically 20% reserve / 80% usable for LiFePO4, 50% for Lead-Acid) to protect battery lifespan, leaving 960Wh usable DC; and (2) Inverter conversion losses (typically 85%–92% efficiency), delivering approximately 864Wh of AC power to connected appliances.",
  },
  {
    question: "How do I calculate battery runtime for AC appliances?",
    answer: "Divide usable battery watt-hours by the battery-side load. For AC loads: Usable Wh = Nominal Wh × Usable Fraction × SOH. Battery-Side Load = Appliance Watts ÷ Inverter Efficiency. Runtime (Hours) = Usable Wh ÷ Battery-Side Load.",
  },
];

export default function BatteryRuntimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Runtime Calculator",
    description: "Estimate battery backup runtime from Wh or Ah, voltage, appliance load, state of charge, reserve limits, and inverter efficiency.",
    route: "/battery/battery-runtime-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Estimates battery backup runtime in hours and minutes for planning purposes",
      "Converts Ah to Wh using nominal voltage presets (12V, 12.8V, 24V, 48V)",
      "Accounts for AC inverter and DC conversion efficiency losses",
      "Customizable depth-of-discharge reserve and battery State of Health (SOH)",
      "Appliance load builder with duty cycles and peak watts",
    ],
    standards: [
      "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
      "IEC 62619 (Secondary Lithium Cells and Batteries for Industrial Applications)",
      "UL 1973 (Batteries for Use in Stationary and Motive Applications)",
      "NFPA 70 / NEC Article 706 (Energy Storage Systems)",
    ],
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821940",
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

      <div id="calculator-tool">
        <BatteryRuntimeCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="battery runtime calculator"
        answer="To calculate battery runtime, multiply your battery's nominal watt-hours by its usable State of Charge window (80%–90% for LiFePO4, 50% for Lead-Acid) and inverter efficiency (~90%), then divide by the total connected load in watts."
        formula="Runtime (Hours) = (Nominal Wh × Usable SOC % × Inverter Eff %) ÷ Load Watts"
        standardExample="A 12V 100Ah LiFePO4 battery (1,200 Wh nominal; 80% usable DoD = 960 Wh DC; 90% inverter efficiency = 864 Wh delivered AC) powers a continuous 100W load for ~8.6 hours. On a 12.8V 100Ah pack (1,280 Wh nominal = 921.6 Wh delivered AC), it provides ~9.2 hours."
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Battery Backup Runtime</h2>
        <ol>
          <li><strong>Enter Battery Capacity (Ah or Wh):</strong> Choose nominal system voltage (12V, 24V, 48V) and Amp-hour capacity.</li>
          <li><strong>Select or Enter Appliance Load (Watts):</strong> Enter continuous average running watts or use the appliance load builder.</li>
          <li><strong>Set Depth of Discharge (DOD) Reserve:</strong> Lithium LiFePO4 batteries allow 80% to 90% usable capacity; Lead-Acid/AGM allows 50%.</li>
          <li><strong>Review Operating Duration:</strong> View estimated hours and minutes of backup power available for planning.</li>
        </ol>

        <SystemFlowDiagram category="battery" title="Battery Discharge & Backup Flow Topology" />
      </section>

      <section id="sizing-matrix">
        <h2>Common Battery Runtime Scenarios (100Ah vs 200Ah LiFePO4)</h2>
        <p>Estimated continuous operating hours for popular appliances powered by a 12V lithium battery (80% usable capacity, 90% inverter efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Battery runtime scenarios">
          <table>
            <caption>Estimated runtime on 12V 100Ah (864Wh delivered AC) vs 12V 200Ah (1,728Wh delivered AC)</caption>
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
                <td><strong>CPAP Machine</strong> (illustrative load, no heater)</td>
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
                <td><strong>Full-Size Refrigerator</strong> (cycling at 35% duty)</td>
                <td>52.5 W avg (150W peak)</td>
                <td>~16.5 hours</td>
                <td>~32.9 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Battery Runtime Calculation Formula"
          formula="Runtime (hours) = (Capacity_Wh × Usable_SOC × Battery_Health × Inverter_Efficiency) / Load_Watts"
          formulaDescription="Estimates battery backup duration for planning purposes by determining net usable stored energy after Depth-of-Discharge (DOD) limits, battery State of Health (SOH), and inverter conversion losses."
          variables={[
            { symbol: "Capacity_Wh", label: "Nominal Battery Energy", description: "Rated battery watt-hours (or Volts × Amp-Hours).", unit: "Wh" },
            { symbol: "Usable_SOC", label: "Usable State of Charge Window", description: "Fraction of capacity available above minimum reserve (e.g., 80% for LiFePO4, 50% for Lead-Acid).", unit: "fraction" },
            { symbol: "Battery_Health", label: "State of Health (SOH)", description: "Available capacity factor relative to original factory rating (default 100%).", unit: "fraction" },
            { symbol: "Inverter_Efficiency", label: "Conversion Efficiency (η)", description: "Inverter efficiency for AC loads (85%–93%) or DC-DC step efficiency.", unit: "fraction" },
            { symbol: "Load_Watts", label: "Continuous Power Demand", description: "Average real-time appliance consumption (Running Watts × Duty Cycle).", unit: "W" },
          ]}
          notes={[
            "For cycling loads like refrigerators, average continuous demand = running wattage × duty cycle (e.g., 150 W × 35% = 52.5 W).",
            "Real-world runtime varies with ambient temperature, cell aging/SOH, discharge rate, BMS voltage cutoff thresholds, standby inverter tare losses, and dynamic load cycling.",
          ]}
        />
      </div>

      <section id="governing-standards" className="standards-section" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>The mathematical models in this calculator reflect industry planning guidelines and test standards for stationary and portable energy storage systems:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius)", background: "var(--card-bg)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>IEEE Std 485 / IEC 62619</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Industry engineering recommendations for battery sizing, defining depth-of-discharge reserve thresholds, and state-of-health capacity retention in lithium and lead-acid battery banks.
            </p>
          </div>
          <div style={{ padding: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius)", background: "var(--card-bg)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>UL 1973 &amp; NFPA 70 / NEC 706</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Safety and installation standards governing energy storage systems (ESS), inverter integration boundaries, and electrical protection requirements.
            </p>
          </div>
        </div>
      </section>

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
          Need to size a battery for a specific target runtime? Use our <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, check inverter continuous wattage with the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>, calculate DC cable gauge with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, or compare battery storage with fuel backup using the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guides &amp; Research Benchmarks:</strong> Read our comprehensive <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Battery Backup Runtime Formula &amp; Inverter Loss Guide</Link>, examine our <Link href="/datasets/residential-bess-low-load-efficiency-and-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>Residential BESS Low-Load Efficiency &amp; Tare Loss Benchmark (PL-DS-BESS-07)</Link>, inspect our <Link href="/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>Residential BESS Degradation &amp; Thermal Loss Benchmark (PL-DS-BESS-06)</Link>, or explore C-rate kinetics in our <Link href="/datasets/bess-peukert-capacity-derating-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>BESS Peukert Derating Benchmark (PL-DS-BESS-05)</Link>.
        </p>
      </section>
    </article>
  );
}

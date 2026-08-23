import type { Metadata } from "next";
import Link from "next/link";
import { BatterySizeCalculator } from "@/components/calculator/battery-size-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";


export const metadata: Metadata = {
  title: "Battery Size Calculator — Size Battery Bank in kWh & Ah",
  description: "Calculate the battery size needed for any load and backup runtime. Accurately determines required kWh and Ah capacity with DOD, inverter efficiency, and safety margin.",
  alternates: { canonical: "/battery/battery-size-calculator" },
  robots: { index: isCalculatorPublished("battery-size"), follow: true },
  openGraph: {
    title: "Battery Size Calculator — Size Battery Bank in kWh & Ah",
    description: "Calculate the battery size needed for a load and backup time with transparent reserve, efficiency and health assumptions.",
    url: `${siteConfig.url}/battery/battery-size-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do I calculate what size battery I need?",
    answer: "Multiply your appliance load (in Watts) by your target runtime (in hours) to find total watt-hours needed. Then divide by inverter efficiency (~90%) and usable battery depth-of-discharge (80% for LiFePO4, 50% for Lead-Acid), plus a 10% safety margin. Finally, divide by battery voltage (12V, 24V, 48V) to find required Amp-hours (Ah).",
  },
  {
    question: "What size battery do I need for a 500W load?",
    answer: "To run a continuous 500W AC load for 4 hours (2,000Wh of device energy), you need a battery bank of approximately 3.06 kWh (assuming 90% inverter efficiency, 80% usable depth-of-discharge, and a 10% design margin). At 12V this is ~255 Ah; at 24V this is ~127 Ah; at 48V this is ~64 Ah.",
  },
  {
    question: "What size battery do I need to run a refrigerator during a 24-hour power outage?",
    answer: "A typical full-size refrigerator consumes about 1.2 to 1.8 kWh per day. Factoring in inverter standby losses, 80% depth of discharge, and safety margins, a 2.5 kWh to 3.5 kWh battery bank (or approximately 200Ah–300Ah at 12V LiFePO4) is recommended to comfortably cover 24 hours.",
  },
  {
    question: "Why does system voltage affect required battery Ah but not kWh?",
    answer: "Watt-hours (kWh) measure total energy storage capacity, which remains constant regardless of voltage. However, Amp-hours (Ah) measure electrical charge at a specific voltage (Ah = Wh ÷ Volts). A 2,400 Wh battery bank equals 200 Ah at 12V, 100 Ah at 24V, or 50 Ah at 48V.",
  },
  {
    question: "How much extra capacity should I add for battery aging?",
    answer: "Batteries naturally lose capacity over their operational lifespan. Adding a 10% to 20% planning margin ensures your battery continues meeting your full backup runtime target even after several years of continuous cycling.",
  },
];

export default function BatterySizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Size Calculator",
    description: "Estimate the battery capacity needed in Ah and kWh to power an electrical load for a target backup runtime.",
    route: "/battery/battery-size-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates required battery capacity in kWh and Ah across 12V, 24V, and 48V",
      "Customizable depth-of-discharge reserve presets for Lithium, AGM, and Gel",
      "AC inverter conversion efficiency and DC-DC step loss compensation",
      "Built-in appliance catalog with power presets and runtime duration sliders",
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
        <span aria-current="page">Battery Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Battery planning</p>
        <h1>Battery Size Calculator</h1>
        <p className="intro">
          Estimate the exact battery capacity (Ah and kWh) needed to power your electrical appliances for a desired backup runtime, factoring in inverter conversion losses and chemistry DOD limits.
        </p>
      </div>

      <DirectAnswerCard
        keyword="battery size calculator"
        answer="To size a battery bank, multiply total load watts by desired backup hours, divide by inverter efficiency (~88%) and usable Depth of Discharge (DOD), then divide by system voltage (12V, 24V, or 48V) to find required Amp-hours (Ah)."
        formula="Battery Size (Ah) = (Load Watts × Backup Hours) ÷ (Inverter Eff × Usable DOD × Voltage)"
        standardExample="Powering a 200W load for 8 hours on a 12V LiFePO4 battery (80% DOD, 90% inverter) requires a minimum 185Ah (2.22 kWh) battery bank."
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <BatterySizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a Battery Bank for Power Outages</h2>
        <ol>
          <li><strong>Enter Continuous Power Load (Watts):</strong> Enter the total wattage of all devices running simultaneously.</li>
          <li><strong>Set Target Backup Duration (Hours):</strong> Specify how many hours or days the battery must sustain the load without grid power.</li>
          <li><strong>Choose Battery Chemistry (LiFePO4 vs Lead-Acid):</strong> LiFePO4 allows 80%–90% usable DOD, while Lead-Acid/AGM is limited to 50%.</li>
          <li><strong>Select System Voltage (12V / 24V / 48V):</strong> Review required Amp-hour (Ah) capacity across voltage configurations.</li>
        </ol>

        <SystemFlowDiagram category="battery" title="Battery Storage Sizing & Backup Load Hierarchy" />
      </section>

      <section id="sizing-matrix">
        <h2>Common Emergency Backup Battery Sizing Scenarios</h2>
        <p>Typical battery capacities needed for common residential power outage durations (assuming 12V LiFePO4 with 10% reserve and 88% AC inverter efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Backup battery sizing scenarios">
          <table>
            <caption>Battery capacity needed by load and outage duration (12V LiFePO4)</caption>
            <thead>
              <tr>
                <th scope="col">Backup Scope &amp; Average Load</th>
                <th scope="col">4-Hour Outage</th>
                <th scope="col">8-Hour Outage</th>
                <th scope="col">12-Hour Outage</th>
                <th scope="col">24-Hour Outage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Essential Communications</strong> (Wi-Fi + Phone + LED Lights: 50W)</td>
                <td>~250 Wh (21 Ah)</td>
                <td>~505 Wh (42 Ah)</td>
                <td>~758 Wh (63 Ah)</td>
                <td>~1.52 kWh (126 Ah)</td>
              </tr>
              <tr>
                <td><strong>CPAP Machine + Phone Charging</strong> (70W avg)</td>
                <td>~354 Wh (29 Ah)</td>
                <td>~707 Wh (59 Ah)</td>
                <td>~1.06 kWh (88 Ah)</td>
                <td>~2.12 kWh (177 Ah)</td>
              </tr>
              <tr>
                <td><strong>Refrigerator + Wi-Fi + Lights</strong> (180W avg)</td>
                <td>~909 Wh (76 Ah)</td>
                <td>~1.82 kWh (152 Ah)</td>
                <td>~2.73 kWh (227 Ah)</td>
                <td>~5.45 kWh (455 Ah)</td>
              </tr>
              <tr>
                <td><strong>Home Office / Remote Work</strong> (Laptop + 2 Monitors + Starlink: 220W)</td>
                <td>~1.11 kWh (93 Ah)</td>
                <td>~2.22 kWh (185 Ah)</td>
                <td>~3.33 kWh (278 Ah)</td>
                <td>~6.67 kWh (556 Ah)</td>
              </tr>
              <tr>
                <td><strong>Critical Household Circuit</strong> (Fridge + Sump Pump + Internet: 400W)</td>
                <td>~2.02 kWh (168 Ah)</td>
                <td>~4.04 kWh (337 Ah)</td>
                <td>~6.06 kWh (505 Ah)</td>
                <td>~12.1 kWh (1,010 Ah)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Battery Sizing Formulas &amp; Capacity Math"
          formula="Battery_Wh = (Load_Watts × Runtime_Hours × (1 + Margin)) / (Usable_SOC × Inverter_Eff × Battery_Health)"
          formulaDescription="Calculates nominal stored-energy capacity (Wh and Ah) required to sustain a continuous or cycling electrical load for a desired backup duration."
          variables={[
            { symbol: "Load_Watts", label: "Continuous Electrical Load", description: "Average real-time power draw (Watts × Duty Cycle).", unit: "W" },
            { symbol: "Runtime_Hours", label: "Target Autonomy Duration", description: "Desired continuous operating hours without recharging.", unit: "hours" },
            { symbol: "Usable_SOC", label: "Usable DOD Window", description: "Fraction of nominal energy available above minimum reserve (e.g., 80% for LiFePO4, 50% for Lead-Acid).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Inverter AC Efficiency (η)", description: "DC-to-AC power conversion efficiency (typically 88%–93%).", unit: "fraction" },
            { symbol: "Margin", label: "Planning Design Margin", description: "Safety buffer for temperature deratings and cable losses (typically 10%–20%).", unit: "fraction" },
          ]}
          notes={[
            "Amp-Hour equivalent at selected voltage V: Ah = Battery_Wh / V.",
            "For mixed loads, AC appliances use Inverter Efficiency and DC appliances use DC-DC step efficiency separately.",
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
        <h2>Related Battery Planning Tools</h2>
        <p>
          After sizing your battery, use the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link> to verify operating durations, check cable sizing with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, or explore whole-home backup with the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

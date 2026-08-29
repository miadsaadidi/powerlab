import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { UpsBatterySizeCalculator } from "@/components/calculator/ups-battery-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ups-battery-size");

export const metadata: Metadata = buildPageMetadata({
  title: "UPS Battery Size Calculator — Wh & Ah Sizing",
  description: "Calculate UPS battery size from load watts and required backup time, including UPS efficiency, usable battery fraction, health and planning margin.",
  canonicalPath: "/battery/ups-battery-size-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How do I calculate what size UPS battery I need?",
    answer: "Multiply your equipment load (Watts) by desired runtime in hours (e.g. 15 minutes = 0.25 hrs). Divide by inverter efficiency (~88%) and usable SLA battery fraction (50%), then add a 10% safety margin: Wh = (Load_Watts × Hours × 1.10) ÷ (0.88 × 0.50).",
  },
  {
    question: "What battery capacity is inside a standard 1500VA UPS?",
    answer: "A standard 1500VA desktop UPS contains two 12V 9Ah Sealed Lead-Acid (SLA) batteries connected in series for a 24V DC bus, giving 216 Watt-hours (Wh) of nominal energy.",
  },
  {
    question: "Why is usable battery fraction so low (50%) in UPS sizing?",
    answer: "UPS units discharge batteries rapidly (often within 10 to 30 minutes). At such high discharge rates (1C to 3C), lead-acid batteries suffer severe Peukert capacity drop and must cut off at 50% DOD to prevent cell reversal.",
  },
  {
    question: "Can I add an External Battery Pack (EBM) to extend UPS runtime?",
    answer: "Yes, many expandable UPS models feature an external DC port allowing daisy-chained external battery enclosures (EBMs) that expand runtime from minutes to multiple hours.",
  },
];

export default function UpsBatterySizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "UPS Battery Size Calculator",
    description: "Calculate nominal UPS battery energy in Wh and Ah needed for a given load and backup runtime target.",
    route: "/battery/ups-battery-size-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates required internal UPS battery capacity in Wh and Ah",
      "Configurable DC bus voltages (12V, 24V, 36V, 48V, 72V, 96V)",
      "Supports VA and Watt power conversion with power factor",
      "Estimates standard 12V 7Ah and 12V 9Ah replacement cell counts",
    ],
    standards: [
      "IEEE Std 1184 (Guide for Sizing Batteries for UPS Systems)",
      "IEC 62040-3 (Uninterruptible Power Systems Method of Specifying Performance)",
      "UL 1778 (Uninterruptible Power Supply Equipment)",
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
        <span aria-current="page">UPS Battery Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">UPS planning</p>
        <h1>UPS Battery Size Calculator</h1>
        <p className="intro">
          Calculate the nominal UPS battery capacity (Wh and Ah) needed to sustain your critical IT equipment for a desired shutdown or generator-start buffer duration.
        </p>
      </div>

      <DirectAnswerCard
        keyword="UPS battery sizing calculation"
        answer="To size a UPS battery, calculate required energy: multiply load watts by target runtime hours, then divide by inverter efficiency (88%) and usable depth-of-discharge (50% for lead-acid). For example, supporting a 300W server for 30 minutes (0.5 hr) requires approximately 375 Wh of nominal battery capacity (~31.2 Ah at a 12V bus)."
        formula="Required UPS Battery (Wh) = (Load Watts × Desired Hours × Design Margin) ÷ (Inverter Efficiency × Usable Fraction)"
        standardExample="300W load for 30 min (0.5 hr) with 10% margin: (300 × 0.5 × 1.10) ÷ (0.88 × 0.50) = 375 Wh nominal"
        sourceAuthority="IEEE Std 1184 & UL 1778 (Uninterruptible Power Supply Systems)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <UpsBatterySizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a UPS Battery Bank</h2>
        <ol>
          <li><strong>Enter IT Load (Watts or VA):</strong> Enter the total power consumption of your server, workstation, or networking gear.</li>
          <li><strong>Set Target Backup Duration (Minutes):</strong> Enter desired runtime (e.g., 15 minutes for automated graceful OS shutdown).</li>
          <li><strong>Select UPS DC Bus Voltage:</strong> Select internal voltage (12V for compact units, 24V/48V for enterprise models).</li>
          <li><strong>Review Battery Cell Counts:</strong> See recommended replacement module counts (e.g. 2× 12V 9Ah cells).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>UPS Battery Sizing &amp; Runtime Buffer Reference Matrix</h2>
        <p>Recommended nominal battery energy (Wh and 24V Ah) required to sustain IT and telecom loads for specific backup runtime targets:</p>
        <div className="scenario-table" role="region" aria-label="UPS battery sizing reference table">
          <table>
            <caption>Recommended nominal UPS battery capacity (50% usable SLA fraction, 90% inverter efficiency, 10% margin)</caption>
            <thead>
              <tr>
                <th scope="col">Continuous IT Load</th>
                <th scope="col">15-Min Safe Shutdown</th>
                <th scope="col">30-Min Generator Start</th>
                <th scope="col">60-Min Full Outage Buffer</th>
                <th scope="col">Standard Battery Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>100 W</strong> (Network Switch + Router)</td>
                <td>~61 Wh (2.5 Ah @ 24V)</td>
                <td>~122 Wh (5.1 Ah @ 24V)</td>
                <td>~244 Wh (10.2 Ah @ 24V)</td>
                <td>2× 12V 5Ah SLA cells</td>
              </tr>
              <tr>
                <td><strong>300 W</strong> (Workstation + Monitors)</td>
                <td>~183 Wh (7.6 Ah @ 24V)</td>
                <td>~367 Wh (15.3 Ah @ 24V)</td>
                <td>~733 Wh (30.5 Ah @ 24V)</td>
                <td>2× 12V 9Ah SLA cells (1500VA UPS)</td>
              </tr>
              <tr>
                <td><strong>600 W</strong> (Mid-Tower Server + Storage)</td>
                <td>~367 Wh (15.3 Ah @ 24V)</td>
                <td>~733 Wh (30.5 Ah @ 24V)</td>
                <td>~1,467 Wh (61.1 Ah @ 24V)</td>
                <td>4× 12V 9Ah cells (48V DC bus)</td>
              </tr>
              <tr>
                <td><strong>1,200 W</strong> (Enterprise Rack Enclosure)</td>
                <td>~733 Wh (15.3 Ah @ 48V)</td>
                <td>~1,467 Wh (30.6 Ah @ 48V)</td>
                <td>~2,933 Wh (61.1 Ah @ 48V)</td>
                <td>External Battery Module (EBM 72V/96V)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="UPS Battery Sizing Formulas"
          formula="UPS_Wh = [Load_Watts × (Runtime_Min / 60) × (1 + Margin)] / (Inverter_Eff × Usable_Fraction × Health)"
          formulaDescription="Calculates nominal battery energy (Wh and Ah) required inside a UPS chassis or external battery module to sustain critical IT loads for a target duration."
          variables={[
            { symbol: "Load_Watts", label: "Real Equipment Power", description: "Active power demand (Apparent VA × Power Factor).", unit: "W" },
            { symbol: "Runtime_Min", label: "Target Outage Buffer", description: "Desired runtime in minutes for safe shutdown or generator start.", unit: "minutes" },
            { symbol: "Inverter_Eff", label: "UPS Inverter Efficiency", description: "DC-to-AC conversion efficiency (typically 85%–90%).", unit: "fraction" },
            { symbol: "Usable_Fraction", label: "Usable Capacity Share", description: "Cutoff depth of discharge (typically 50% for SLA batteries under high discharge rates).", unit: "fraction" },
            { symbol: "Margin", label: "Planning Design Margin", description: "Safety buffer for cell aging and standby losses (typically 10%–20%).", unit: "fraction" },
          ]}
          notes={[
            "Amp-Hour equivalent at DC bus voltage V: Ah = UPS_Wh / V.",
            "For desktop and server loads, typical power factors range between 0.70 and 0.90.",
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
        <h2>Related Backup &amp; Battery Tools</h2>
        <p>
          Verify operating duration with the <Link href="/battery/ups-runtime-calculator">UPS Runtime Calculator</Link>, size general storage with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, or check battery discharge with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

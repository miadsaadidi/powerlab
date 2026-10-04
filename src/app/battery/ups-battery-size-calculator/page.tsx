import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { UpsBatterySizeCalculator } from "@/components/calculator/ups-battery-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ups-battery-size");

export const metadata: Metadata = buildPageMetadata({
  title: "UPS Battery Size Calculator — Wh & Ah Sizing",
  description: "Calculate required UPS battery capacity in Wh and Ah for a target backup runtime. Sizing model incorporates DC bus voltage, inverter efficiency, usable DoD fraction, and planning margin.",
  canonicalPath: "/battery/ups-battery-size-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How do I calculate what size UPS battery I need?",
    answer: "Use the canonical formula: Required Battery Wh = (Load_Watts × Runtime_Hours × (1 + Planning_Margin)) ÷ (UPS_Efficiency × Usable_Capacity_Fraction × Battery_Health). For example, supporting a 300W load for 30 minutes (0.5 hr) with 10% planning margin, 88% efficiency, 50% usable fraction planning assumption, and 100% battery health requires: (300 × 0.5 × 1.10) ÷ (0.88 × 0.50 × 1.00) = 375 Wh of nominal battery energy (~31.3 Ah at a 12V bus or ~15.6 Ah at a 24V bus).",
  },
  {
    question: "What battery capacity is inside a standard 1500VA UPS?",
    answer: "Some illustrative 1500VA UPS configurations use two 12V 9Ah batteries in series, providing 216 Wh nominal energy. Actual UPS battery voltage, quantity and capacity vary by model.",
  },
  {
    question: "Why is a 50% usable battery fraction used in UPS sizing examples?",
    answer: "A 50% usable fraction is an illustrative planning assumption for rapid discharge scenarios. Actual usable capacity depends on the UPS low-voltage cutoff, battery chemistry, battery model, discharge rate, ambient temperature, manufacturer discharge curves, and required service-life assumptions. This calculator uses a simplified energy-based model and does not explicitly model Peukert effects.",
  },
  {
    question: "Can I add an External Battery Pack (EBM) to extend UPS runtime?",
    answer: "Yes, many expandable UPS models feature an external DC port allowing daisy-chained external battery enclosures (EBMs) that expand total nominal Wh and support extended runtimes.",
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
      "Calculates required nominal UPS battery energy in Wh and Ah",
      "Supports load input in watts or VA with an assumed power factor",
      "Provides illustrative battery configuration calculations",
      "Configurable DC bus voltages (12V, 24V, 36V, 48V, 72V, 96V)",
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
          Calculate the nominal UPS battery capacity (Wh and Ah) needed to sustain critical equipment for a desired shutdown or generator-start buffer duration.
        </p>
      </div>

      <div id="calculator-tool">
        <UpsBatterySizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="UPS battery sizing calculation"
        answer="To size a UPS battery, calculate required nominal energy using the canonical formula: Required Battery Wh = (Load Watts × Runtime Hours × (1 + Planning Margin)) ÷ (UPS Efficiency × Usable Capacity Fraction × Battery Health). For example, supporting a 300W server for 30 minutes (0.5 hr) with 10% planning margin, 88% efficiency, 50% usable capacity fraction planning assumption, and 100% battery health requires approximately 375 Wh of nominal battery capacity (~31.3 Ah at a 12V bus or ~15.6 Ah at a 24V bus)."
        formula="Required Battery Wh = (Load_W × Runtime_h × (1 + Planning_Margin)) ÷ (UPS_Efficiency × Usable_Capacity_Fraction × Battery_Health)"
        standardExample="300W load for 30 min (0.5 hr) with 10% margin, 88% efficiency, 50% usable fraction, 100% health: (300 × 0.5 × 1.10) ÷ (0.88 × 0.50 × 1.00) = 375 Wh nominal (~31.3 Ah @ 12V, ~15.6 Ah @ 24V)"
        sourceAuthority="Technical References & Model Basis: IEEE Std 1184, IEC 62040-3 & UL 1778"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a UPS Battery Bank</h2>
        <ol>
          <li><strong>Enter Equipment Load (Watts or VA):</strong> Enter the active power consumption or apparent power with power factor of your equipment.</li>
          <li><strong>Set Target Backup Duration:</strong> Enter desired runtime in minutes (e.g., 15 minutes for automated graceful shutdown or 30 minutes for generator start).</li>
          <li><strong>Select UPS DC Bus Voltage:</strong> Select internal system voltage (12V, 24V, 48V, etc.).</li>
          <li><strong>Review Illustrative Battery Configurations:</strong> Review calculated nominal Wh, required Ah, and illustrative module string layouts.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>UPS Battery Sizing &amp; Runtime Buffer Reference Matrix</h2>
        <p>Illustrative nominal battery energy (Wh and Ah) required to sustain IT and telecom loads for specific backup runtime targets:</p>
        <div className="scenario-table" role="region" aria-label="UPS battery sizing reference table">
          <table>
            <caption>Illustrative nominal UPS battery capacity (50% usable capacity fraction planning assumption, 90% inverter efficiency, 10% planning margin, 100% battery health)</caption>
            <thead>
              <tr>
                <th scope="col">Continuous IT Load</th>
                <th scope="col">15-Min Safe Shutdown</th>
                <th scope="col">30-Min Generator Start</th>
                <th scope="col">60-Min Full Outage Buffer</th>
                <th scope="col">Illustrative UPS Battery Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>100 W</strong> (Network Switch + Router)</td>
                <td>~61 Wh (2.5 Ah @ 24V)</td>
                <td>~122 Wh (5.1 Ah @ 24V)</td>
                <td>~244 Wh (10.2 Ah @ 24V)</td>
                <td>2× 12V 9Ah SLA modules in series (24V string, 216 Wh nominal covers up to ~30 min)</td>
              </tr>
              <tr>
                <td><strong>300 W</strong> (Workstation + Monitors)</td>
                <td>~183 Wh (7.6 Ah @ 24V)</td>
                <td>~367 Wh (15.3 Ah @ 24V)</td>
                <td>~733 Wh (30.5 Ah @ 24V)</td>
                <td>4× 12V 9Ah SLA modules (2S2P at 24V, 432 Wh nominal covers up to ~30 min; 60 min requires ~733 Wh)</td>
              </tr>
              <tr>
                <td><strong>600 W</strong> (Mid-Tower Server + Storage)</td>
                <td>~367 Wh (15.3 Ah @ 24V)</td>
                <td>~733 Wh (30.5 Ah @ 24V)</td>
                <td>~1,467 Wh (61.1 Ah @ 24V)</td>
                <td>4× 12V 9Ah modules at 48V (432 Wh covers ~15 min; 60 min requires ~1,467 Wh / 16 modules)</td>
              </tr>
              <tr>
                <td><strong>1,200 W</strong> (Enterprise Rack Enclosure)</td>
                <td>~733 Wh (15.3 Ah @ 48V)</td>
                <td>~1,467 Wh (30.6 Ah @ 48V)</td>
                <td>~2,933 Wh (61.1 Ah @ 48V)</td>
                <td>External Battery Module (EBM sized for required nominal Wh)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="form-hint" style={{ marginTop: "0.5rem" }}>
          <em>Illustrative configuration only — actual UPS battery configuration must be verified against the specific UPS model and required capacity.</em>
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas"
          formula="Required_Battery_Wh = [Load_W × (Runtime_Min / 60) × (1 + Planning_Margin)] ÷ (UPS_Efficiency × Usable_Capacity_Fraction × Battery_Health)"
          formulaDescription="Calculates nominal battery energy (Wh and Ah) required inside a UPS chassis or external battery module to sustain critical equipment loads for a target duration."
          variables={[
            { symbol: "Load_W", label: "Real Equipment Power", description: "Active power demand in watts (VA × Power Factor if entered in VA).", unit: "W" },
            { symbol: "Runtime_Min", label: "Target Outage Buffer", description: "Desired runtime in minutes for safe shutdown or generator start.", unit: "minutes" },
            { symbol: "Planning_Margin", label: "Planning Margin", description: "Additional capacity buffer applied to the simplified calculation (typically 10%–20%).", unit: "fraction" },
            { symbol: "UPS_Efficiency", label: "UPS Inverter Efficiency", description: "DC-to-AC conversion and inverter efficiency (typically 85%–92%).", unit: "fraction" },
            { symbol: "Usable_Capacity_Fraction", label: "Usable Capacity Fraction", description: "Illustrative planning depth of discharge assumption (typically 50% for high-rate lead-acid discharge).", unit: "fraction" },
            { symbol: "Battery_Health", label: "Battery Health / Available Capacity Factor", description: "Available capacity factor relative to nominal nameplate (1.00 = 100% nominal).", unit: "fraction" },
          ]}
          notes={[
            "Required Battery Ah at DC bus voltage V: Required_Battery_Ah = Required_Battery_Wh / Bus_Voltage.",
            "This calculator uses a simplified energy-based model and does not explicitly model Peukert effects, cell aging, or temperature derating.",
            "Actual usable capacity depends on UPS cutoff voltage, chemistry, discharge rate, and manufacturer curves.",
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

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <ul>
          <li><strong>IEEE Std 1184:</strong> IEEE Guide for Selection and Sizing of Batteries for Uninterruptible Power Supply Systems.</li>
          <li><strong>UL 1778:</strong> Standard for Uninterruptible Power Supply Equipment.</li>
          <li><strong>IEC 62040-3:</strong> Uninterruptible Power Systems (UPS) — Method of Specifying Performance and Test Requirements.</li>
        </ul>
      </section>

      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Related Uninterruptible Power &amp; Battery Storage Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Model backup runtimes, battery chemistries, and DC conductor voltage drop across your critical power infrastructure:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⏱️ UPS Runtime Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate estimated minutes and hours of backup power for UPS units under specific computer and server loads.
            </p>
            <Link href="/battery/ups-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              UPS Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Battery Capacity &amp; Ah/kWh</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Convert Amp-Hours (Ah) to Kilowatt-Hours (kWh), calculate series/parallel string voltage, and model battery storage.
            </p>
            <Link href="/battery/battery-capacity-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Battery Capacity Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Battery Runtime Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Estimate discharge time across Lead-Acid (AGM/Gel) and Lithium Iron Phosphate (LiFePO4) chemistries.
            </p>
            <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Battery Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📉 Voltage Drop &amp; Wire Size</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size heavy DC battery cables (12V/24V/48V) to maintain &lt;2% voltage drop between battery bank and inverter.
            </p>
            <Link href="/battery/voltage-drop-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Voltage Drop Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/battery/portable-power-station-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Portable Power Station Calculator</Link>
          <Link href="/battery/battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Size Calculator</Link>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Home Battery Size Calculator</Link>
          <Link href="/guides/battery-backup-runtime-calculation-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Runtime Calculation Guide</Link>
        </div>
      </section>
    </article>
  );
}

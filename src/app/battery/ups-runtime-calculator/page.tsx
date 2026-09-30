import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { UpsRuntimeCalculator } from "@/components/calculator/ups-runtime-calculator";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

export const metadata: Metadata = buildPageMetadata({
  title: "UPS Runtime Calculator — Estimate Backup Time",
  description: "Estimate UPS backup runtime from internal battery Wh, load watts, usable capacity fraction, battery health and UPS efficiency.",
  canonicalPath: "/battery/ups-runtime-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How long will a 1500VA UPS run a desktop computer?",
    answer: "An illustrative 1500VA / 900W UPS configuration (containing two 12V 9Ah batteries = 216 Wh) will power a typical 100W desktop PC and monitor setup for approximately 58 minutes (216 Wh × 50% usable fraction × 90% efficiency ÷ 100W × 60 = 58.3 min). Under high-demand gaming or rendering loads (~350W), runtime is approximately 17 minutes.",
  },
  {
    question: "What is the difference between UPS VA and Watts?",
    answer: "Volt-Amperes (VA) measures apparent electrical power, while Watts (W) measures real power consumed by electronics. The ratio is the Power Factor (PF = Watts ÷ VA), which varies by device power supply and UPS topology (typically 0.6 to 0.8 for basic desktop supplies and 0.9 to 1.0 for active PFC supplies).",
  },
  {
    question: "Why do UPS batteries typically have a 3 to 5 year service life?",
    answer: "Most consumer UPS units use Sealed Lead-Acid (SLA) batteries kept continuously on float charge. Actual service life and available capacity retention depend on operating temperature, float voltage regulation, discharge frequency, depth of discharge, battery manufacturing quality, and maintenance conditions.",
  },
  {
    question: "Can I replace my UPS lead-acid battery with a LiFePO4 battery?",
    answer: "LiFePO4 replacement is only appropriate when the battery is explicitly designed, tested, and listed for UPS applications with compatible nominal voltage, charging profiles, BMS current thresholds, and low-voltage cutoff parameters. While lithium chemistry provides higher usable capacity fraction and longer cycle life under suitable conditions, compatibility must be verified with the UPS manufacturer.",
  },
];

export default function UpsRuntimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "UPS Runtime Calculator",
    description: "Estimate how long an uninterruptible power supply (UPS) can support IT equipment in minutes.",
    route: "/battery/ups-runtime-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates backup runtime in minutes and hours using canonical energy equations",
      "Converts UPS VA rating to real watts using selectable power factors",
      "Customizable internal battery capacity presets (12V 7Ah, 12V 9Ah)",
      "Accounts for user-defined battery health/capacity factor and UPS efficiency",
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
        <span aria-current="page">UPS Runtime Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">UPS planning</p>
        <h1>UPS Runtime Calculator</h1>
        <p className="intro">
          Estimate how long your uninterruptible power supply (UPS) can keep computers, network routers, and servers running during an unexpected power outage.
        </p>
      </div>

      <div id="calculator-tool">
        <UpsRuntimeCalculator />
      </div>

      <DirectAnswerCard
        keyword="UPS runtime calculation"
        answer="An illustrative 1500VA / 900W UPS configuration (216Wh internal battery pack) provides approximately 58 minutes of backup runtime for a 100W PC and monitor setup, or ~17 minutes for a 350W workstation load. Runtime is determined by battery watt-hours multiplied by usable capacity fraction (50% for SLA) and UPS efficiency (90%) divided by active equipment load in watts."
        formula="UPS Runtime (Minutes) = [(Internal Battery Wh × Usable Capacity Fraction × UPS Efficiency) ÷ Total Load (Watts)] × 60"
        standardExample="1500VA UPS (216Wh) at 100W load: (216Wh × 0.50 × 0.90 ÷ 100W) × 60 = 58.3 minutes (~58 min). At 150W load: (216Wh × 0.50 × 0.90 ÷ 150W) × 60 = 38.9 minutes (~39 min)."
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate UPS Battery Backup Duration</h2>
        <ol>
          <li><strong>Enter UPS Capacity:</strong> Choose standard UPS models (650VA, 1000VA, 1500VA) or input internal battery watt-hours directly.</li>
          <li><strong>Input Total Connected Load (Watts):</strong> Enter total real wattage of all plugged-in computers, monitors, and networking devices.</li>
          <li><strong>Check Power Factor (PF):</strong> Verify power factor (typically 0.6 to 0.9) when converting from VA ratings.</li>
          <li><strong>Review Backup Minutes:</strong> Note estimated shutdown time to ensure safe data saving during blackouts.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>UPS Backup Runtime Reference Matrix</h2>
        <p>Estimated backup minutes across illustrative UPS capacity classes and connected IT loads (assumes 50% usable SLA capacity and 90% UPS efficiency):</p>
        <div className="scenario-table" role="region" aria-label="UPS runtime comparison matrix">
          <table>
            <caption>Estimated runtime minutes (Illustrative UPS configurations — actual battery capacity and runtime vary by model; 50% usable SLA capacity, 90% UPS efficiency)</caption>
            <thead>
              <tr>
                <th scope="col">UPS Capacity Rating</th>
                <th scope="col">Wi-Fi + Modem (25W)</th>
                <th scope="col">Laptop + Monitor (100W)</th>
                <th scope="col">Gaming PC / Workstation (350W)</th>
                <th scope="col">Rack Server + NAS (600W)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>650 VA / 360 W</strong> (1× 12V 7Ah = 84 Wh)</td>
                <td>~91 min</td>
                <td>~23 min</td>
                <td>~6 min</td>
                <td>Overload (exceeds 360W rating)</td>
              </tr>
              <tr>
                <td><strong>1000 VA / 600 W</strong> (2× 12V 7Ah = 168 Wh)</td>
                <td>~181 min (3.0 hrs)</td>
                <td>~45 min</td>
                <td>~13 min</td>
                <td>~8 min</td>
              </tr>
              <tr>
                <td><strong>1500 VA / 900 W</strong> (2× 12V 9Ah = 216 Wh)</td>
                <td>~233 min (3.9 hrs)</td>
                <td>~58 min</td>
                <td>~17 min</td>
                <td>~10 min</td>
              </tr>
              <tr>
                <td><strong>2200 VA / 1980 W</strong> (4× 12V 9Ah = 432 Wh)</td>
                <td>~467 min (7.8 hrs)</td>
                <td>~117 min (1.9 hrs)</td>
                <td>~33 min</td>
                <td>~19 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas"
          formula="Runtime (min) = [(Battery_Wh × Usable_Capacity_Fraction × Health × Efficiency) / Load_Watts] × 60"
          formulaDescription="Calculates standby operating minutes of an uninterruptible power supply based on internal DC battery energy, usable capacity fraction, and UPS conversion efficiency."
          variables={[
            { symbol: "Battery_Wh", label: "Internal Battery Energy", description: "Nominal internal battery pack rating (e.g. 2 × 12V 9Ah = 216 Wh).", unit: "Wh" },
            { symbol: "Usable_Capacity_Fraction", label: "Usable Capacity Fraction", description: "Safety cutoff fraction (typically 50% for standard SLA batteries).", unit: "fraction" },
            { symbol: "Health", label: "Battery Health / SOH", description: "Available capacity factor relative to new factory condition.", unit: "fraction" },
            { symbol: "Efficiency", label: "UPS Efficiency (η)", description: "UPS DC-to-AC inverter conversion efficiency (typically 85%–93%, default 90%).", unit: "fraction" },
            { symbol: "Load_Watts", label: "Connected Real Load", description: "Active power demand in watts (VA × Power Factor).", unit: "W" },
          ]}
          notes={[
            "Real Watts = Apparent VA × Power Factor. Power factor varies by load type and power supply design (typically 0.6 to 0.9 for standard desktop IT equipment).",
            "This calculator uses a simplified energy-based runtime model and does not explicitly model Peukert effects, temperature variations, manufacturer-specific discharge curves, or UPS-specific cutoff behavior.",
          ]}
        />
      </div>

      <section id="governing-standards" className="standards-section" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>The calculation principles and energy reserve assumptions in this tool reference established industry standards:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius)", background: "var(--card-bg)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>IEEE Std 1184 &amp; IEC 62040-3</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Guidelines for sizing battery banks in stationary UPS installations, specifying performance methods, and defining battery reserve windows.
            </p>
          </div>
          <div style={{ padding: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius)", background: "var(--card-bg)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>UL 1778</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Safety standards for uninterruptible power supply equipment, thermal thresholds, and electrical isolation boundaries.
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
        <h2>Related Power &amp; Backup Calculators</h2>
        <p>
          Size a UPS battery with the <Link href="/battery/ups-battery-size-calculator">UPS Battery Size Calculator</Link>, calculate battery storage runtime with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or size whole-home emergency backup with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

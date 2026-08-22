import type { Metadata } from "next";
import Link from "next/link";
import { UpsRuntimeCalculator } from "@/components/calculator/ups-runtime-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


const published = isCalculatorPublished("ups-runtime");

export const metadata: Metadata = {
  title: "UPS Runtime Calculator — Estimate Backup Time",
  description: "Estimate UPS backup runtime from battery energy, load watts, usable energy, battery health and UPS efficiency.",
  alternates: { canonical: "/battery/ups-runtime-calculator" },
  robots: { index: published, follow: true },
  openGraph: { title: "UPS Runtime Calculator — Estimate Backup Time", description: "Estimate UPS backup runtime from battery energy, load watts, usable energy, battery health and UPS efficiency." },
};

const FAQS = [
  {
    question: "How long will a 1500VA UPS run a desktop computer?",
    answer: "A standard 1500VA / 900W UPS (containing two 12V 9Ah batteries = 216 Wh) will power a typical 100W desktop PC and monitor setup for approximately 50 to 58 minutes. Under high-demand gaming or 3D rendering (350W), runtime drops to roughly 14 to 16 minutes.",
  },
  {
    question: "What is the difference between UPS VA and Watts?",
    answer: "Volt-Amperes (VA) measures apparent electrical power, while Watts (W) measures real power consumed by your electronics. The ratio is the Power Factor (PF = Watts ÷ VA), typically 0.6 for basic consumer UPS units and 0.9 to 1.0 for enterprise sine-wave units.",
  },
  {
    question: "Why do UPS batteries only last 3 to 5 years?",
    answer: "Most consumer UPS units use Sealed Lead-Acid (SLA) batteries kept continuously on float charge at elevated internal temperatures. Over 3 to 5 years, electrolyte dry-out and internal grid corrosion reduce available capacity to under 50% of new condition.",
  },
  {
    question: "Can I replace my UPS lead-acid battery with a LiFePO4 battery?",
    answer: "Yes, drop-in 12V LiFePO4 replacement batteries designed with matching BMS charge profiles can increase usable runtime by up to 80% and extend operational service life to 8–10 years.",
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
      "Calculates backup runtime in minutes and hours",
      "Converts UPS VA rating to real watts using power factor",
      "Customizable internal battery capacity presets (12V 7Ah, 12V 9Ah)",
      "Accounts for inverter efficiency and lead-acid degradation",
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

      <DirectAnswerCard
        keyword="UPS runtime calculation"
        answer="A standard 1500VA / 900W desktop UPS (216Wh internal battery) provides approximately 50 to 60 minutes of backup for a 100W PC and monitor, or 15 minutes for a 350W gaming/workstation load. Runtime is determined by battery watt-hours multiplied by inverter efficiency (85%) divided by active equipment wattage."
        formula="UPS Runtime (Hours) = (Internal Battery Wh × DoD × Inverter Efficiency) ÷ Total Load (Watts)"
        standardExample="1500VA UPS (216Wh) at 150W load: (216Wh × 0.85 × 0.85) ÷ 150W = 1.04 hours (62 minutes)"
        sourceAuthority="IEEE Std 1184 (UPS Battery Sizing) & IEC 62040-3 Standards"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <UpsRuntimeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate UPS Battery Backup Duration</h2>
        <ol>
          <li><strong>Enter UPS Capacity:</strong> Choose standard UPS models (650VA, 1000VA, 1500VA) or input internal battery watt-hours.</li>
          <li><strong>Input Total Connected Load (Watts):</strong> Enter total real wattage of all plugged-in computers, monitors, and networking devices.</li>
          <li><strong>Check Power Factor (PF):</strong> Verify power factor (typically 0.6 to 0.9) if calculating from VA ratings.</li>
          <li><strong>Review Backup Minutes:</strong> Note estimated shutdown time to ensure safe data saving during blackouts.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>UPS Backup Runtime Reference Matrix</h2>
        <p>Typical uninterruptible power supply backup minutes across standard consumer and enterprise UPS capacity classes and connected IT loads:</p>
        <div className="scenario-table" role="region" aria-label="UPS runtime comparison matrix">
          <table>
            <caption>Estimated runtime minutes (50% usable SLA capacity, 85%–90% inverter efficiency)</caption>
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
                <td>~85 min</td>
                <td>~21 min</td>
                <td>~5 min (Load Limit)</td>
                <td>Overload</td>
              </tr>
              <tr>
                <td><strong>1000 VA / 600 W</strong> (2× 12V 7Ah = 168 Wh)</td>
                <td>~170 min</td>
                <td>~43 min</td>
                <td>~12 min</td>
                <td>Overload</td>
              </tr>
              <tr>
                <td><strong>1500 VA / 900 W</strong> (2× 12V 9Ah = 216 Wh)</td>
                <td>~220 min</td>
                <td>~58 min</td>
                <td>~16 min</td>
                <td>~8 min</td>
              </tr>
              <tr>
                <td><strong>2200 VA / 1980 W</strong> (4× 12V 9Ah = 432 Wh)</td>
                <td>~440 min (7.3 hrs)</td>
                <td>~116 min</td>
                <td>~33 min</td>
                <td>~18 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="UPS Runtime &amp; Apparent Power Formulas"
          formula="Runtime (min) = [(Battery_Wh × Usable_Fraction × Health × Efficiency) / Load_Watts] × 60"
          formulaDescription="Calculates standby operating minutes of an uninterruptible power supply based on internal DC battery energy and AC inverter conversion losses."
          variables={[
            { symbol: "Battery_Wh", label: "Internal Battery Energy", description: "Nominal internal battery pack rating (e.g. 2 × 12V 9Ah = 216 Wh).", unit: "Wh" },
            { symbol: "Usable_Fraction", label: "Usable Capacity Share", description: "Safety cutoff fraction (typically 50% for standard SLA batteries).", unit: "fraction" },
            { symbol: "Health", label: "SOH Degradation", description: "Available capacity relative to new factory condition.", unit: "fraction" },
            { symbol: "Efficiency", label: "Inverter DC-AC Efficiency", description: "UPS inverter conversion efficiency (typically 80%–90%).", unit: "fraction" },
            { symbol: "Load_Watts", label: "Connected Real Load", description: "Active power demand (VA × Power Factor).", unit: "W" },
          ]}
          notes={[
            "Real Watts = Apparent VA × Power Factor (typically 0.6 to 0.9 for standard desktop UPS models).",
            "Lead-acid runtime decreases faster at discharge rates above 0.5C due to internal resistance and Peukert losses.",
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
        <h2>Related Power &amp; Backup Calculators</h2>
        <p>
          Size a UPS battery with the <Link href="/battery/ups-battery-size-calculator">UPS Battery Size Calculator</Link>, calculate battery storage runtime with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, or size whole-home emergency backup with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

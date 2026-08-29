import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { VoltageDropCalculator } from "@/components/calculator/voltage-drop-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Voltage Drop & Wire Size Sizing Guide",
  description: "Learn how to calculate voltage drop and size copper/aluminum wire gauge (AWG). Features single-phase, 3-phase, and DC formulas under NEC 3% standards.",
  canonicalPath: "/guides/voltage-drop-and-wire-size-calculation-guide",
  category: "battery",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the maximum allowable voltage drop under the National Electrical Code (NEC)?",
    answer: "The NEC recommends a maximum voltage drop of 3% on branch circuits (NEC 210.19(A) Informational Note No. 2) and 3% on feeders (NEC 215.2(A)(1)). The combined total voltage drop from the main electrical service panel to the farthest outlet or load should not exceed 5% to ensure reasonable efficiency and prevent equipment under-voltage malfunction.",
  },
  {
    question: "What is the formula to calculate DC and single-phase AC voltage drop?",
    answer: "The formula is: Voltage Drop (V) = (2 × K × I × L) / Cmil, or V_drop = 2 × I × L × R_conductor. Where K is the conductor resistivity constant (12.9 ohms-cmil/ft for copper, 21.2 for aluminum at 75°C), I is current in Amperes, L is one-way distance in feet, Cmil is wire cross-sectional area in circular mils, and R_conductor is resistance per foot from NEC Table 8.",
  },
  {
    question: "Why is voltage drop much more severe on 12V and 24V DC systems than 120V AC?",
    answer: "Because voltage drop is a fixed voltage loss determined by current (V = I × R), losing 1.2 Volts on a 120V circuit represents only a 1.0% drop (hardly noticeable). However, losing that same 1.2 Volts on a 12V battery system represents a massive 10.0% voltage drop, which can cause inverters to shut down on low-voltage disconnect (LVD) and waste significant energy as heat.",
  },
  {
    question: "How do you calculate the minimum wire gauge required for a maximum 3% drop?",
    answer: "To find the minimum circular mils required: Cmil = (2 × K × I × L) / (V_source × 0.03). Once Cmil is calculated, select the nearest standard AWG size from NEC Chapter 9 Table 8 with equal or greater cross-sectional area, while verifying that the wire also satisfies ampacity safety limits from NEC Table 310.16.",
  },
  {
    question: "What is the difference between one-way distance and circuit loop length?",
    answer: "One-way distance (L) is the physical measurement between the power source and the electrical load. The electrical circuit loop distance is 2 × L because current must flow out along the ungrounded (hot/positive) conductor and return along the grounded (neutral/negative) conductor. The factor of 2 in single-phase and DC formulas accounts for this return path.",
  },
];

export default function VoltageDropGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Voltage Drop & Wire Size Calculation Guide (NEC 3% Rules & Table 8)",
    description: "Complete engineering guide to electrical voltage drop formulas, wire gauge sizing, resistance tables, and NEC continuous load limits.",
    route: "/guides/voltage-drop-and-wire-size-calculation-guide",
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
    categoryName: "Battery & Electrical Engineering",
    categoryRoute: "/battery",
    standards: [
      "NEC Article 210.19(A) Informational Note No. 2 (Branch Circuits)",
      "NEC Article 215.2(A)(1) Informational Note No. 2 (Feeders)",
      "NEC Chapter 9, Table 8 (Conductor Properties & Resistance)",
      "IEEE Standard 141 (Red Book — Industrial Power Distribution)",
      "ABYC E-11 (AC & DC Electrical Systems on Boats)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Voltage Drop &amp; Wire Size Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Electrical Engineering &amp; Wire Sizing Reference</p>
        <h1>Voltage Drop &amp; Wire Size Calculation Guide</h1>
        <p className="intro">
          Learn the exact mathematical formulas, conductor resistivity constants, and NEC standards to calculate voltage drop and select the correct wire gauge (AWG) for DC battery systems, AC residential branch circuits, and 3-phase commercial feeds.
        </p>
      </header>

      <DirectAnswerCard
        keyword="voltage drop calculation formula"
        answer="To calculate voltage drop on DC and single-phase AC circuits: V_drop = (2 × K × I × L) / Cmil. For copper conductors at 75°C, K = 12.9 Ω·cmil/ft (aluminum K = 21.2). The percentage voltage drop equals (V_drop / V_source) × 100%. Under NEC 210.19(A) and 215.2(A), maximum recommended voltage drop is 3% on branch circuits/feeders and 5% total combined."
        formula="Single-Phase / DC: V_drop = (2 × K × I × L) / Cmil   |   3-Phase: V_drop = (1.732 × K × I × L) / Cmil"
        standardExample="120V circuit carrying 16A over 75 ft on 12 AWG copper (6,530 Cmil): V_drop = (2 × 12.9 × 16 × 75) / 6530 = 4.74 V (3.95% drop). Upsizing to 10 AWG (10,380 Cmil) reduces drop to 2.98 V (2.48% — NEC Compliant)."
        sourceAuthority="NEC 2023 / 2026 Article 210.19(A) & NEC Chapter 9 Table 8"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Voltage Drop &amp; Wire Gauge Sizing Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your operating voltage, continuous amperage, and run distance to dynamically compute voltage drop percentage, heat loss in watts, and auto-select the optimal AWG wire gauge.
          </p>
        </div>
        <VoltageDropCalculator />
      </section>

      {/* Section 1: Core Physics & NEC Thresholds */}
      <section id="nec-standards" style={{ marginTop: "2.5rem" }}>
        <h2>1. Voltage Drop Physics &amp; NEC Standard Limits</h2>
        <p>
          Every electrical conductor possesses internal electrical resistance ($R$). As current ($I$) flows through a wire of length ($L$), electrical potential is lost as heat according to <strong>Ohm&apos;s Law ($V = I \times R$)</strong> and <strong>Joule&apos;s First Law ($P = I^2 \times R$)</strong>.
        </p>
        <p>
          Excessive voltage drop causes three major engineering failures:
        </p>
        <ul>
          <li><strong>Motor Overheating &amp; Burnout:</strong> Induction motors (air conditioners, refrigerators, pumps) draw higher current to maintain mechanical power under reduced voltage, causing stator windings to overheat.</li>
          <li><strong>Inverter &amp; Electronics Trip:</strong> Off-grid solar inverters and battery systems trip into Low-Voltage Disconnect (LVD) error states under surge loads.</li>
          <li><strong>Energy Waste &amp; Thermal Risk:</strong> Lost voltage is dissipated as continuous resistance heat inside conduits, walls, and cable trays.</li>
        </ul>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#10b981", fontSize: "1.1rem" }}>🟢 NEC Branch Circuit Limit: ≤ 3.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              NEC Article 210.19(A) Informational Note No. 2 recommends that conductors for branch circuits be sized to prevent a voltage drop exceeding <strong>3.0%</strong> at the farthest outlet of power.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#0284c7", fontSize: "1.1rem" }}>🔵 Total System Combined Limit: ≤ 5.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              NEC Article 215.2(A)(1) recommends that the combined voltage drop on the feeder plus the branch circuit not exceed <strong>5.0%</strong> overall from the utility meter to the end device.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#f59e0b", fontSize: "1.1rem" }}>🟡 Critical Battery &amp; Solar MPPT: ≤ 1.5% – 2.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              For high-amperage low-voltage DC battery cables (12V/24V) and solar array feeds, industry best practice mandates <strong>≤ 1.5% to 2.0%</strong> drop to maximize charging efficiency and inverter stability.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Mathematical Formulas */}
      <section id="formulas" style={{ marginTop: "2.5rem" }}>
        <h2>2. Deterministic Voltage Drop Formulas</h2>

        <FormulaCard
          title="Single-Phase AC & 2-Wire DC Voltage Drop Model"
          formula="V_drop = (2 × K × I × L) / Cmil   |   %VD = (V_drop / V_source) × 100"
          formulaDescription="Calculates voltage drop in Volts and percentage for two-wire circuits (hot/neutral or positive/negative) accounting for complete round-trip conductor resistance."
          variables={[
            { symbol: "V_drop", label: "Voltage Drop", description: "Electrical potential lost across conductor length", unit: "Volts (V)" },
            { symbol: "K", label: "Conductor Resistivity Constant", description: "12.9 Ω·cmil/ft for Copper; 21.2 Ω·cmil/ft for Aluminum at 75°C", unit: "Ω·cmil/ft" },
            { symbol: "I", label: "Circuit Current", description: "Continuous operating load current", unit: "Amperes (A)" },
            { symbol: "L", label: "One-Way Distance", description: "Physical linear distance from power source to load", unit: "Feet (ft)" },
            { symbol: "Cmil", label: "Conductor Area", description: "Cross-sectional area of wire in circular mils (from NEC Table 8)", unit: "Circular Mils (kcmil)" },
            { symbol: "V_source", label: "Nominal System Voltage", description: "Supply voltage at breaker/battery (e.g. 12V, 120V, 240V)", unit: "Volts (V)" },
          ]}
          notes={[
            "The multiplier '2' represents the outbound and return conductors.",
            "For 3-Phase balanced circuits: replace '2' with √3 ≈ 1.732: V_drop = (1.732 × K × I × L) / Cmil.",
            "To size wire for a target voltage drop (%VD): Cmil_required = (2 × K × I × L) / (V_source × %VD / 100).",
          ]}
        />
      </section>

      {/* Section 3: NEC Table 8 Conductor Resistance Table */}
      <section id="nec-table-8" style={{ marginTop: "2.5rem" }}>
        <h2>3. NEC Chapter 9, Table 8 Conductor Properties Matrix</h2>
        <p>
          The table below lists standard American Wire Gauge (AWG) sizes, circular mil cross-sectional areas, and direct current resistance ($R$) at 75°C per 1,000 feet of uncoated copper and aluminum conductors:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Conductor Area, 75°C Resistance, and Max 75°C Ampacity (NEC Table 8 &amp; Table 310.16)</caption>
            <thead>
              <tr>
                <th scope="col">Conductor Size (AWG)</th>
                <th scope="col">Cross-Section (mm²)</th>
                <th scope="col">Area (Circular Mils)</th>
                <th scope="col">Copper Resistance (Ω / 1k ft @ 75°C)</th>
                <th scope="col">Aluminum Resistance (Ω / 1k ft @ 75°C)</th>
                <th scope="col">Max Copper 75°C Ampacity (A)</th>
                <th scope="col">Max Aluminum 75°C Ampacity (A)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>14 AWG</strong></td>
                <td>2.08 mm²</td>
                <td>4,110 cmil</td>
                <td>3.07 Ω</td>
                <td>5.06 Ω</td>
                <td>15 A (20A table)</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>12 AWG</strong></td>
                <td>3.31 mm²</td>
                <td>6,530 cmil</td>
                <td>1.93 Ω</td>
                <td>3.18 Ω</td>
                <td>20 A (25A table)</td>
                <td>15 A</td>
              </tr>
              <tr>
                <td><strong>10 AWG</strong></td>
                <td>5.26 mm²</td>
                <td>10,380 cmil</td>
                <td>1.21 Ω</td>
                <td>2.00 Ω</td>
                <td>30 A (35A table)</td>
                <td>25 A</td>
              </tr>
              <tr>
                <td><strong>8 AWG</strong></td>
                <td>8.37 mm²</td>
                <td>16,510 cmil</td>
                <td>0.764 Ω</td>
                <td>1.26 Ω</td>
                <td>50 A</td>
                <td>40 A</td>
              </tr>
              <tr>
                <td><strong>6 AWG</strong></td>
                <td>13.30 mm²</td>
                <td>26,240 cmil</td>
                <td>0.481 Ω</td>
                <td>0.793 Ω</td>
                <td>65 A</td>
                <td>50 A</td>
              </tr>
              <tr>
                <td><strong>4 AWG</strong></td>
                <td>21.15 mm²</td>
                <td>41,740 cmil</td>
                <td>0.302 Ω</td>
                <td>0.499 Ω</td>
                <td>85 A</td>
                <td>65 A</td>
              </tr>
              <tr>
                <td><strong>2 AWG</strong></td>
                <td>33.62 mm²</td>
                <td>66,360 cmil</td>
                <td>0.190 Ω</td>
                <td>0.313 Ω</td>
                <td>115 A</td>
                <td>90 A</td>
              </tr>
              <tr>
                <td><strong>1/0 AWG</strong></td>
                <td>53.49 mm²</td>
                <td>105,600 cmil</td>
                <td>0.119 Ω</td>
                <td>0.197 Ω</td>
                <td>150 A</td>
                <td>120 A</td>
              </tr>
              <tr>
                <td><strong>2/0 AWG</strong></td>
                <td>67.43 mm²</td>
                <td>133,100 cmil</td>
                <td>0.0945 Ω</td>
                <td>0.156 Ω</td>
                <td>175 A</td>
                <td>135 A</td>
              </tr>
              <tr>
                <td><strong>4/0 AWG</strong></td>
                <td>107.20 mm²</td>
                <td>211,600 cmil</td>
                <td>0.0595 Ω</td>
                <td>0.0980 Ω</td>
                <td>230 A</td>
                <td>180 A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Worked Real-World Examples */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>4. Worked Engineering Examples</h2>
        <p>Three practical calculations demonstrating low-voltage DC, residential branch, and EV charging circuits:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          
          {/* Example 1: 12V Inverter */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: 12V DC Inverter (100A, 10 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Size battery cables for a 1000W continuous inverter running on a 12V LiFePO4 bank.<br />
              <strong>Current:</strong> 100 Amps &bull; <strong>Distance:</strong> 10 ft (20 ft total loop).<br />
              <strong>Using 4 AWG (41,740 cmil):</strong><br />
              V_drop = (2 × 12.9 × 100 × 10) / 41,740 = <strong>0.618 V (5.15% drop — Fails NEC &amp; Inverter limits)</strong>.<br />
              <strong>Upsizing to 1/0 AWG (105,600 cmil):</strong><br />
              V_drop = (2 × 12.9 × 100 × 10) / 105,600 = <strong>0.244 V (2.03% drop — Passes)</strong>. Prevents low-voltage disconnect (LVD) trips.
            </p>
            <Link href="/battery/battery-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Inverter Battery Bank →
            </Link>
          </div>

          {/* Example 2: 120V Shed Subpanel */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: 120V Outdoor Circuit (15A, 150 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Power outdoor garden tools and lighting in a detached garage 150 ft away.<br />
              <strong>Current:</strong> 15 Amps &bull; <strong>Voltage:</strong> 120V.<br />
              <strong>Standard 14 AWG (4,110 cmil):</strong><br />
              V_drop = (2 × 12.9 × 15 × 150) / 4,110 = <strong>14.12 V (11.77% drop — Severe hazard)</strong>.<br />
              <strong>Required for 3% Drop (V_drop ≤ 3.6V):</strong><br />
              Cmil = (2 × 12.9 × 15 × 150) / 3.6 = <strong>16,125 cmil → 8 AWG Copper required</strong>.
            </p>
            <Link href="/home-energy/generator-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Backup Generator →
            </Link>
          </div>

          {/* Example 3: 240V Level 2 EV Charger */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: 240V Level 2 EV Charger (40A, 80 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Install a 40A continuous EV charger (50A breaker) in a detached garage.<br />
              <strong>Current:</strong> 40 Amps continuous &bull; <strong>Voltage:</strong> 240V.<br />
              <strong>Using 6 AWG (26,240 cmil):</strong><br />
              V_drop = (2 × 12.9 × 40 × 80) / 26,240 = <strong>3.15 V (1.31% drop — Optimal)</strong>.<br />
              Delivers 236.85V to vehicle on-board charger for full 9.6 kW charging speed without thermal throttling.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate EV Breaker &amp; Wire Size →
            </Link>
          </div>

        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>Connected Electrical &amp; Energy Planning Tools</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Explore our complete suite of deterministic electrical sizing calculators:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button">Voltage Drop Calculator</Link>
          <Link href="/battery/inverter-size-calculator" className="button secondary-button">Inverter Size Calculator</Link>
          <Link href="/battery/battery-size-calculator" className="button secondary-button">Battery Size Calculator</Link>
          <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button">EV Breaker &amp; Wire Sizing</Link>
          <Link href="/solar/solar-charge-controller-calculator" className="button secondary-button">Solar Charge Controller Calculator</Link>
          <Link href="/home-energy/generator-size-calculator" className="button secondary-button">Generator Size Calculator</Link>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section id="faqs" style={{ marginTop: "2.5rem" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              <summary style={{ fontWeight: 600, cursor: "pointer", color: "var(--brand-strong)" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 7: Standards & Citations */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations implement mathematical conductor properties from the <strong>National Electrical Code (NFPA 70 / NEC 2023 &amp; 2026 Edition) Chapter 9 Table 8</strong>, <strong>IEEE Standard 141 (Red Book)</strong>, and <strong>ABYC Standards</strong>.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>
    </article>
  );
}

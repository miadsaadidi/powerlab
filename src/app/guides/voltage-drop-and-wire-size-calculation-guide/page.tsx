import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { VoltageDropCalculator } from "@/components/calculator/voltage-drop-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Voltage Drop & Wire Size Calculation Guide",
  description: "Learn how to calculate voltage drop using resistive approximations and size copper/aluminum wire gauge (AWG). Features single-phase, 3-phase, and DC models with NEC informational design recommendations.",
  canonicalPath: "/guides/voltage-drop-and-wire-size-calculation-guide",
  category: "battery",
  isArticle: true,
});

const FAQS = [
  {
    question: "What are the NEC voltage drop design recommendations?",
    answer: "The National Electrical Code (NEC) includes informational design recommendations: NEC Article 210.19(A) Informational Note No. 2 recommends a maximum voltage drop of 3% on branch circuits, and NEC Article 215.2(A)(1) Informational Note No. 2 recommends a 3% limit on feeders. The combined total voltage drop from the service panel to the farthest outlet is recommended not to exceed 5% for reasonable operating efficiency. These are design recommendations in informational notes rather than universal mandatory requirements, though specific local jurisdictions or equipment manufacturer specifications may enforce strict limits.",
  },
  {
    question: "What is the formula to calculate DC and single-phase AC voltage drop?",
    answer: "Under the simplified resistive approximation: Voltage Drop (V) = (2 × K × I × L) / Cmil, where K is conductor resistivity at 75°C (12.9 Ω·cmil/ft for copper, 21.2 for aluminum), I is current in Amperes, L is one-way distance in feet, and Cmil is cross-sectional area in circular mils (from NEC Chapter 9 Table 8). For balanced 3-phase circuits, 2 is replaced with √3 ≈ 1.732. Note that for detailed AC circuits with larger conductors, inductive reactance and power factor also influence total impedance.",
  },
  {
    question: "Why is voltage drop percentage much higher on 12V and 24V DC systems than 120V AC?",
    answer: "Because voltage drop is a physical voltage loss determined by current and conductor resistance (V = I × R), losing 1.2 Volts on a 120V circuit represents only a 1.0% drop. However, losing that same 1.2 Volts on a 12V battery system represents a 10.0% voltage drop. This large percentage drop can cause low-voltage disconnects on inverters and dissipate significant energy as heat in the wiring.",
  },
  {
    question: "How do you calculate the minimum wire gauge for a target voltage drop?",
    answer: "To find the minimum circular mils required for a target voltage drop (%VD): Cmil = (2 × K × I × L) / (V_source × %VD / 100). Select the nearest standard AWG with equal or greater cross-sectional area from NEC Chapter 9 Table 8. Conductor ampacity must then be verified separately using applicable insulation ratings, ambient temperature corrections, and conduit bundling factors.",
  },
  {
    question: "What is the difference between one-way distance and circuit loop length?",
    answer: "One-way distance (L) is the linear distance between the power source and the electrical load. In DC and single-phase AC circuits, current flows out along the hot/positive conductor and returns along the neutral/negative conductor, creating a total loop length of 2 × L. The factor of 2 in the standard formula accounts for both conductors.",
  },
];

export default function VoltageDropGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Voltage Drop & Wire Size Calculation Guide (Resistive Approximations & NEC Table 8)",
    description: "Practical electrical guide to voltage drop formulas, wire gauge sizing, resistance tables, and NEC informational design recommendations.",
    route: "/guides/voltage-drop-and-wire-size-calculation-guide",
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
    categoryName: "Battery & Electrical Engineering",
    categoryRoute: "/battery",
    standards: [
      "NEC Article 210.19(A) Informational Note No. 2 (Branch Circuits - Design Recommendation)",
      "NEC Article 215.2(A)(1) Informational Note No. 2 (Feeders - Design Recommendation)",
      "NEC Chapter 9, Table 8 (Conductor Properties & Resistance)",
      "IEEE Standard 141 (Red Book — Industrial Power Distribution)",
    ],
    faqs: FAQS,
    proficiencyLevel: "Beginner to Intermediate",
    audienceType: "Electricians, Solar Installers, DIY Planners, Homeowners",
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
        <p className="eyebrow">Electrical Planning &amp; Conductor Sizing Reference</p>
        <h1>Voltage Drop &amp; Wire Size Calculation Guide</h1>
        <p className="intro">
          Learn how to calculate circuit voltage drop using resistive approximations, apply conductor resistivity constants from NEC Chapter 9 Table 8, and determine the minimum wire gauge (AWG) to meet voltage-drop design targets across DC, single-phase AC, and three-phase circuits.
        </p>
      </header>

      <DirectAnswerCard
        keyword="voltage drop calculation formula"
        answer="To calculate voltage drop on DC and single-phase AC circuits using the resistive approximation: V_drop = (2 × K × I × L) / Cmil. For copper conductors at 75°C, K = 12.9 Ω·cmil/ft (aluminum K = 21.2). Percentage drop equals (V_drop / V_source) × 100%. Under NEC 210.19(A) and 215.2(A) informational notes, common design recommendations are ≤ 3% on branch circuits and ≤ 5% overall. Conductor ampacity and installation conditions must be verified separately."
        formula="Single-Phase / DC: V_drop = (2 × K × I × L) / Cmil   |   3-Phase: V_drop = (1.732 × K × I × L) / Cmil"
        standardExample="120V circuit carrying 16A over 75 ft on 12 AWG copper (6,530 Cmil): V_drop = (2 × 12.9 × 16 × 75) / 6,530 = 4.74 V (3.95% drop). Upsizing to 10 AWG (10,380 Cmil) reduces drop to 2.98 V (2.48% — meets the 3% design recommendation)."
        sourceAuthority="NEC Article 210.19(A) Informational Note & NEC Chapter 9 Table 8 (Technical References)"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Voltage Drop &amp; Wire Gauge Sizing Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your operating voltage, continuous amperage, and run distance to compute voltage drop percentage, estimated power loss in watts, and the minimum conductor size to meet your voltage-drop target.
          </p>
        </div>
        <VoltageDropCalculator />
      </section>

      {/* Section 1: Core Physics & NEC Recommendations */}
      <section id="nec-standards" style={{ marginTop: "2.5rem" }}>
        <h2>1. Voltage Drop Physics &amp; NEC Informational Design Recommendations</h2>
        <p>
          Every electrical conductor possesses internal electrical resistance (<em>R</em>). As current (<em>I</em>) flows through a wire of length (<em>L</em>), electrical potential is dissipated as heat according to <strong>Ohm&apos;s Law (<em>V</em> = <em>I</em> × <em>R</em>)</strong> and <strong>Joule&apos;s First Law (<em>P</em> = <em>I</em>² × <em>R</em>)</strong>.
        </p>
        <p>
          Excessive voltage drop can impact system performance in three major areas:
        </p>
        <ul>
          <li><strong>Motor Performance &amp; Heat:</strong> Induction motors (air conditioners, refrigerators, pumps) draw higher current to maintain mechanical output when supplied with reduced voltage, which can increase winding operating temperatures.</li>
          <li><strong>Inverter &amp; DC Electronics Operation:</strong> Low-voltage DC battery systems can experience nuisance low-voltage disconnect (LVD) events during high-current surges if cable resistance is excessive.</li>
          <li><strong>Energy Loss:</strong> Voltage drop represents electrical energy dissipated as continuous resistive heat in conductors and raceways.</li>
        </ul>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#10b981", fontSize: "1.1rem" }}>🟢 NEC Branch Circuit Design Target: ≤ 3.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              NEC Article 210.19(A) Informational Note No. 2 provides a design recommendation that branch circuit conductors be sized for a maximum voltage drop of <strong>3.0%</strong> at the farthest outlet.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#0284c7", fontSize: "1.1rem" }}>🔵 Total Feeder + Branch Combined Target: ≤ 5.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              NEC Article 215.2(A)(1) Informational Note No. 2 recommends that the combined voltage drop on the feeder plus the branch circuit not exceed <strong>5.0%</strong> overall to provide reasonable operating efficiency.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#f59e0b", fontSize: "1.1rem" }}>🟡 Low-Voltage Battery &amp; Solar Design Target: ≤ 1.5% – 2.0%</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              A common design target for high-current low-voltage battery and solar conductors is approximately <strong>1.5% to 2.0%</strong>, depending on system and application requirements.
            </p>
          </div>
        </div>

        <p className="form-hint">
          <em>Important: Meeting a voltage-drop target does not establish electrical code compliance. Conductor sizing must also satisfy continuous-load ampacity, terminal temperature ratings, ambient temperature correction factors, conduit fill adjustments, and overcurrent protection requirements under applicable electrical codes.</em>
        </p>
      </section>

      {/* Section 2: Mathematical Formulas */}
      <section id="formulas" style={{ marginTop: "2.5rem" }}>
        <h2>2. Resistive Voltage-Drop Approximation Formulas</h2>

        <FormulaCard
          title="Single-Phase AC & 2-Wire DC Voltage Drop Model"
          formula="V_drop = (2 × K × I × L) / Cmil   |   %VD = (V_drop / V_source) × 100"
          formulaDescription="Calculates voltage drop in Volts and percentage for two-wire circuits (hot/neutral or positive/negative) using a simplified DC/resistive conductor model."
          variables={[
            { symbol: "V_drop", label: "Voltage Drop", description: "Electrical potential lost across conductor length", unit: "Volts (V)" },
            { symbol: "K", label: "Conductor Resistivity Constant", description: "12.9 Ω·cmil/ft for Copper; 21.2 Ω·cmil/ft for Aluminum at 75°C", unit: "Ω·cmil/ft" },
            { symbol: "I", label: "Circuit Current", description: "Continuous operating load current", unit: "Amperes (A)" },
            { symbol: "L", label: "One-Way Distance", description: "Physical linear distance from power source to load", unit: "Feet (ft)" },
            { symbol: "Cmil", label: "Conductor Area", description: "Cross-sectional area of wire in circular mils (from NEC Table 8)", unit: "Circular Mils (cmil)" },
            { symbol: "V_source", label: "Nominal System Voltage", description: "Supply voltage at breaker/battery (e.g. 12V, 120V, 240V)", unit: "Volts (V)" },
          ]}
          notes={[
            "The multiplier '2' represents the outbound and return conductors.",
            "For 3-Phase balanced circuits: replace '2' with √3 ≈ 1.732: V_drop = (1.732 × K × I × L) / Cmil.",
            "To size wire for a target voltage drop (%VD): Cmil_required = (2 × K × I × L) / (V_source × %VD / 100).",
            "For detailed AC installations, voltage drop may also depend on conductor reactance, power factor, conductor configuration and installation-specific impedance.",
          ]}
        />
      </section>

      {/* Section 3: NEC Table 8 Conductor Resistance Table */}
      <section id="nec-table-8" style={{ marginTop: "2.5rem" }}>
        <h2>3. NEC Chapter 9, Table 8 Conductor Properties Matrix</h2>
        <p>
          The table below lists standard American Wire Gauge (AWG) sizes, circular mil cross-sectional areas, DC resistance ($R$) at 75°C per 1,000 feet of uncoated copper and aluminum conductors, and reference 75°C ampacities:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Conductor Area, 75°C DC Resistance, and Reference 75°C Ampacity (NEC Table 8 &amp; Table 310.16)</caption>
            <thead>
              <tr>
                <th scope="col">Conductor Size (AWG)</th>
                <th scope="col">Cross-Section (mm²)</th>
                <th scope="col">Area (Circular Mils)</th>
                <th scope="col">Copper DC Resistance (Ω / 1k ft @ 75°C)</th>
                <th scope="col">Aluminum DC Resistance (Ω / 1k ft @ 75°C)</th>
                <th scope="col">Reference Copper 75°C Ampacity (A)</th>
                <th scope="col">Reference Aluminum 75°C Ampacity (A)</th>
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
        <p className="form-hint">
          <em>*Reference ampacity shown for the 75°C conductor column; actual allowable ampacity depends on conductor insulation, terminals, ambient temperature, adjustment/correction factors, installation method and applicable code requirements.</em>
        </p>
      </section>

      {/* Section 4: Worked Real-World Examples */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>4. Worked Planning Examples</h2>
        <p>Three practical calculations demonstrating low-voltage DC, residential branch, and EV charging circuits:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          
          {/* Example 1: 12V Inverter */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: 12V DC Inverter (100A, 10 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Size battery cables for a 1000W continuous inverter running on a 12V LiFePO4 bank.<br />
              <strong>Current:</strong> 100 Amps &bull; <strong>Distance:</strong> 10 ft (20 ft total loop).<br />
              <strong>Using 4 AWG (41,740 cmil):</strong><br />
              V_drop = (2 × 12.9 × 100 × 10) / 41,740 = <strong>0.618 V (5.15% drop — Exceeds 2%–3% design target)</strong>.<br />
              <strong>Upsizing to 1/0 AWG (105,600 cmil):</strong><br />
              V_drop = (2 × 12.9 × 100 × 10) / 105,600 = <strong>0.244 V (2.03% drop — Meets target)</strong>. Reduces the modeled cable voltage drop and may reduce voltage-related shutdown risk. Actual inverter LVD behavior depends on battery voltage, inverter cutoff threshold, battery internal resistance, transient load, cable resistance, and operating conditions.
            </p>
            <Link href="/battery/battery-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Inverter Battery Bank →
            </Link>
          </div>

          {/* Example 2: 120V Shed Subpanel */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: 120V Outdoor Circuit (15A, 150 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Power outdoor equipment in a detached structure 150 ft away.<br />
              <strong>Current:</strong> 15 Amps &bull; <strong>Voltage:</strong> 120V.<br />
              <strong>Standard 14 AWG (4,110 cmil):</strong><br />
              V_drop = (2 × 12.9 × 15 × 150) / 4,110 = <strong>14.12 V (11.77% drop — High voltage loss)</strong>.<br />
              <strong>Required for 3% Target (V_drop ≤ 3.6V):</strong><br />
              Cmil = (2 × 12.9 × 15 × 150) / 3.6 = <strong>16,125 cmil → 8 AWG Copper meets voltage-drop target</strong>.
            </p>
            <Link href="/home-energy/generator-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Backup Generator →
            </Link>
          </div>

          {/* Example 3: 240V Level 2 EV Charger */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: 240V Level 2 EV Charger (40A, 80 ft run)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Goal:</strong> Model voltage drop for a 40A continuous EV charging circuit.<br />
              <strong>Current:</strong> 40 Amps continuous &bull; <strong>Voltage:</strong> 240V.<br />
              <strong>Using 6 AWG (26,240 cmil):</strong><br />
              V_drop = (2 × 12.9 × 40 × 80) / 26,240 = <strong>3.15 V (1.31% drop — Meets target)</strong>.<br />
              The simplified model predicts approximately 236.85V at the load under the stated 40A continuous-load assumption. Actual EVSE/vehicle charging performance depends on equipment ratings, installation conditions and thermal behavior.
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
          Calculations run in your browser • No sign-up required. Explore our electrical sizing planning tools:
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

      {/* Section 7: Technical References & Model Basis */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Technical References &amp; Model Basis</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          This guide provides simplified resistive voltage-drop calculations informed by <strong>NEC Chapter 9 Table 8</strong>, <strong>NEC 210.19(A) Informational Note No. 2</strong>, and <strong>IEEE Standard 141 (Red Book)</strong>. Meeting a voltage-drop target does not substitute for complete conductor ampacity, overcurrent protection, and electrical code compliance.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <AcademicCitationModal
            title="Voltage Drop &amp; Wire Size Calculation Guide"
            urlPath="/guides/voltage-drop-and-wire-size-calculation-guide"
            year={2026}
          />
        </div>
      </section>

      <Disclaimer
        variant="safety"
        title="Conductor Sizing & Ampacity Safety Notice"
        modelBasis="NEC Chapter 9 Table 8, NEC 210.19(A) Informational Note No. 2, Table 310.16 & IEEE 141"
      >
        Meeting a voltage drop design target (such as 3% on branch circuits) does not guarantee thermal safety or code compliance. Conductor ampacity must be verified separately under applicable temperature ratings, conduit fill adjustments, and terminal temperature limits (NEC 110.14(C)). Always verify wiring designs with a licensed electrical contractor or Professional Engineer.
      </Disclaimer>
    </article>
  );
}


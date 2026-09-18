import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { VoltageDropCalculator } from "@/components/calculator/voltage-drop-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("voltage-drop");

export const metadata: Metadata = buildPageMetadata({
  title: "Voltage Drop Calculator — Wire Gauge Sizing",
  description: "Calculate DC & AC voltage drop percentage, power loss, and wire gauge (AWG/mm²) for 12V, 24V, 48V, 120V, and 240V circuits with NEC Chapter 9 Table 8 properties.",
  canonicalPath: "/battery/voltage-drop-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "Is the 3% voltage drop limit a mandatory NEC code requirement?",
    answer: "No. Under the National Electrical Code (NEC Article 210.19(A) Informational Note No. 4 and Article 215.2(A)(1) Informational Note No. 2), voltage drop limits are published as non-mandatory engineering design guidance rather than enforceable code requirements. The code recommends limiting voltage drop to a maximum of 3% on branch circuits and 5% total across combined feeder and branch circuits to ensure reasonable equipment efficiency. Mandatory code rules govern conductor thermal ampacity (NEC Table 310.16) and overcurrent protection (NEC Article 240).",
  },
  {
    question: "Why is voltage drop more critical in 12V DC systems than 120V AC?",
    answer: "In a 12V DC system, a 1-volt drop represents a massive 8.3% loss of system voltage, which can trigger inverter low-voltage cutoffs or cause equipment malfunction. In contrast, in a 120V AC circuit, a 1-volt drop represents less than 0.9% of total line voltage.",
  },
  {
    question: "Why must round-trip distance be used for DC circuit calculations?",
    answer: "Direct current (DC) circuits require current to travel from the positive battery terminal to the load along the supply wire, and then all the way back to the negative terminal along the return conductor. Both legs produce resistance and voltage loss, which is why 2-wire DC calculations use a 2.0 loop distance multiplier.",
  },
  {
    question: "What is the difference between copper and aluminum wire resistance?",
    answer: "Copper is approximately 64% more conductive than aluminum. Copper has a resistivity constant (K) of 12.9 ohms-cmil/ft at 75°C, while aluminum has a K constant of 21.2 ohms-cmil/ft. This means an aluminum conductor must generally be 1 to 2 gauge sizes thicker than copper to carry the same current with equivalent voltage drop.",
  },
];

export default function VoltageDropPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Voltage Drop & Wire Size Calculator",
    description: "Calculate DC & AC voltage drop percentage, power loss in watts, and recommended wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits using NEC Chapter 9 Table 8 conductor properties.",
    route: "/battery/voltage-drop-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates exact DC and AC voltage drop percentage under load",
      "Recommends minimum AWG / mm² wire gauge to satisfy 3% engineering target",
      "Models copper vs aluminum conductor resistivity at 75°C (NEC Chapter 9 Table 8)",
      "Calculates continuous resistance power loss in watts and kilowatt-hours",
    ],
    standards: [
      "NFPA 70 / NEC Article 210.19(A) & 215.2(A)(1) (Voltage Drop Recommendations)",
      "NEC Chapter 9 Table 8 (Conductor Properties)",
      "NEC Table 310.16 (Allowable Ampacities of Insulated Conductors)",
      "IEEE Std 141 (Electric Power Distribution for Industrial Plants)",
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
        <span aria-current="page">Voltage Drop Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Electrical Sizing &amp; NEC Standards</p>
        <h1>Voltage Drop &amp; Wire Size Calculator</h1>
        <p className="intro">
          Calculate electrical voltage drop, power loss in watts, and recommended wire gauge (AWG / mm²) for DC (12V, 24V, 48V) and AC (120V, 240V) wiring circuits to ensure compliance with the NEC 3% rule.
        </p>
      </div>

      <div id="calculator-tool">
        <VoltageDropCalculator />
      </div>

      <DirectAnswerCard
        keyword="voltage drop and wire gauge sizing calculation"
        answer="Voltage drop occurs due to internal electrical conductor resistance over distance, calculated via Ohm's law: VD = (2 × K × Length × Amps) ÷ CMIL. In low-voltage DC systems (12V, 24V, 48V), even modest voltage drops cause severe percentage losses. While NEC Section 210.19(A) Informational Note No. 4 recommends a 3% maximum branch circuit drop as engineering design guidance, mandatory electrical code rules govern conductor thermal ampacity (NEC Table 310.16) and overcurrent protection."
        formula="Voltage Drop (V) = (2 × K × Length_feet × Current_amps) ÷ Conductor_CMIL (where K_copper = 12.9 Ω·cmil/ft at 75°C)"
        standardExample="12V DC, 30A load, 15 ft run: with 6 AWG copper (26,240 CMIL), VD = (2 × 12.9 × 15 × 30) ÷ 26,240 = 0.443V (3.69% drop) → upsize to 4 AWG (41,740 CMIL) to achieve 0.278V (2.32% drop, satisfying a 3.0% engineering target)"
        sourceAuthority="NEC Chapter 9 Table 8, NEC Table 310.16 & NEC 210.19(A) Informational Note No. 4"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Voltage Drop and Size Electrical Conductors</h2>
        <ol>
          <li><strong>Select Circuit Voltage &amp; Phase Configuration:</strong> Choose low-voltage DC (12V, 24V, 48V) for battery and solar wiring, single-phase AC (120V, 240V) for branch circuits and EV chargers, or 3-phase AC ($1.732$ multiplier).</li>
          <li><strong>Identify Operating Current (Amperes):</strong> Enter the continuous load current expected under full-load equipment draw.</li>
          <li><strong>Specify One-Way Run Length (Feet):</strong> Enter the physical one-way conductor length from power source to load (the 2-wire round-trip loop of $2 \times L$ is automatically factored into the calculation).</li>
          <li><strong>Select Conductor Material &amp; Target Voltage Drop:</strong> Choose copper (K = 12.9 ohms-cmil/ft) or aluminum (K = 21.2 ohms-cmil/ft). Evaluate the result against your design target (commonly 3% for sensitive electronics or 5% for general circuits).</li>
          <li><strong>Verify Mandatory Conductor Ampacity:</strong> Cross-reference the selected wire gauge against NEC Table 310.16 thermal ampacities to ensure safe overcurrent protection.</li>
        </ol>
      </section>

      <section id="dc-voltage-drop-matrix">
        <h2>Table 1: 12V / 24V / 48V Low-Voltage DC Voltage-Drop Reference Matrix</h2>
        <p>
          Calculated voltage drop and recommended copper conductor gauge across standard low-voltage DC battery, inverter, and solar circuits evaluated against a <strong>3.0% engineering design target</strong> (0.36V drop on 12V, 0.72V drop on 24V, 1.44V drop on 48V):
        </p>
        <div className="scenario-table" role="region" aria-label="12V 24V 48V DC voltage drop reference matrix">
          <table>
            <caption>Low-voltage DC continuous current, one-way distance, conductor size, calculated drop, and percentage loss</caption>
            <thead>
              <tr>
                <th scope="col">Nominal Voltage</th>
                <th scope="col">Load Current</th>
                <th scope="col">One-Way Run</th>
                <th scope="col">Conductor Size</th>
                <th scope="col">Calculated Drop (V)</th>
                <th scope="col">Percentage Drop</th>
                <th scope="col">Design Target Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>12V DC Battery</strong></td>
                <td>10 Amps</td>
                <td>10 ft</td>
                <td>10 AWG Copper</td>
                <td>0.248 V</td>
                <td>2.07%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>12V DC Battery</strong></td>
                <td>20 Amps</td>
                <td>15 ft</td>
                <td>6 AWG Copper</td>
                <td>0.295 V</td>
                <td>2.46%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>12V DC Battery</strong></td>
                <td>30 Amps</td>
                <td>15 ft</td>
                <td>6 AWG Copper</td>
                <td>0.443 V</td>
                <td>3.69%</td>
                <td>Marginal (Upsize to 4 AWG for 2.32%)</td>
              </tr>
              <tr>
                <td><strong>12V DC Battery</strong></td>
                <td>50 Amps</td>
                <td>10 ft</td>
                <td>4 AWG Copper</td>
                <td>0.309 V</td>
                <td>2.58%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>12V DC Battery</strong></td>
                <td>100 Amps</td>
                <td>10 ft</td>
                <td>1/0 AWG Copper</td>
                <td>0.244 V</td>
                <td>2.04%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>24V DC System</strong></td>
                <td>20 Amps</td>
                <td>25 ft</td>
                <td>8 AWG Copper</td>
                <td>0.781 V</td>
                <td>3.26%</td>
                <td>Marginal (Upsize to 6 AWG for 2.05%)</td>
              </tr>
              <tr>
                <td><strong>24V DC System</strong></td>
                <td>40 Amps</td>
                <td>20 ft</td>
                <td>6 AWG Copper</td>
                <td>0.786 V</td>
                <td>3.28%</td>
                <td>Marginal (Upsize to 4 AWG for 2.06%)</td>
              </tr>
              <tr>
                <td><strong>24V DC System</strong></td>
                <td>50 Amps</td>
                <td>30 ft</td>
                <td>2 AWG Copper</td>
                <td>0.583 V</td>
                <td>2.43%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>48V DC ESS / Solar</strong></td>
                <td>30 Amps</td>
                <td>40 ft</td>
                <td>6 AWG Copper</td>
                <td>1.181 V</td>
                <td>2.46%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>48V DC ESS / Solar</strong></td>
                <td>60 Amps</td>
                <td>50 ft</td>
                <td>2 AWG Copper</td>
                <td>1.167 V</td>
                <td>2.43%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
              <tr>
                <td><strong>48V DC ESS / Solar</strong></td>
                <td>100 Amps</td>
                <td>40 ft</td>
                <td>1/0 AWG Copper</td>
                <td>0.977 V</td>
                <td>2.04%</td>
                <td>Pass (&le; 3.0% target)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.5rem" }}>
          * Assumptions: Uncoated stranded copper conductors at 75°C operating temperature (K = 12.9 ohms-cmil/ft); 2-wire DC circuit round-trip conductor loop length (2 × L). Percentage drop calculated as (V_drop / V_nominal) × 100.
        </p>
      </section>

      <section id="ac-conductor-matrix">
        <h2>Table 2: AC Conductor Resistance &amp; Allowable Ampacity Reference</h2>
        <p>
          Conductor cross-sectional area, direct current resistance (NEC Chapter 9 Table 8), and allowable thermal ampacities (NEC Table 310.16) for copper conductors. <em>Notice: Conductor ampacity is a mandatory thermal safety limit and does not guarantee that voltage drop will remain within acceptable limits on long circuit runs.</em>
        </p>
        <div className="scenario-table" role="region" aria-label="AC conductor resistance and ampacity reference table">
          <table>
            <caption>Conductor properties from NEC Chapter 9 Table 8 and allowable ampacities from NEC Table 310.16</caption>
            <thead>
              <tr>
                <th scope="col">Conductor Size (AWG / kcmil)</th>
                <th scope="col">Area (Circular Mils)</th>
                <th scope="col">DC Resistance @ 75°C (NEC Ch 9 Tbl 8)</th>
                <th scope="col">60°C Ampacity (Romex NM-B)</th>
                <th scope="col">75°C Ampacity (THHN in Conduit)</th>
                <th scope="col">Application Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>14 AWG</strong></td>
                <td>4,110 CM</td>
                <td>3.14 Ω / 1,000 ft</td>
                <td>15 Amps</td>
                <td>20 Amps</td>
                <td>Residential lighting / 15A branch circuits</td>
              </tr>
              <tr>
                <td><strong>12 AWG</strong></td>
                <td>6,530 CM</td>
                <td>1.98 Ω / 1,000 ft</td>
                <td>20 Amps</td>
                <td>25 Amps</td>
                <td>20A standard branch circuits / kitchen small appliances</td>
              </tr>
              <tr>
                <td><strong>10 AWG</strong></td>
                <td>10,380 CM</td>
                <td>1.24 Ω / 1,000 ft</td>
                <td>30 Amps</td>
                <td>35 Amps</td>
                <td>Electric water heaters / clothes dryers / 30A EVSE</td>
              </tr>
              <tr>
                <td><strong>8 AWG</strong></td>
                <td>16,510 CM</td>
                <td>0.778 Ω / 1,000 ft</td>
                <td>40 Amps</td>
                <td>50 Amps</td>
                <td>Electric ranges / 40A subpanels / 32A Level 2 EVSE</td>
              </tr>
              <tr>
                <td><strong>6 AWG</strong></td>
                <td>26,240 CM</td>
                <td>0.491 Ω / 1,000 ft</td>
                <td>55 Amps</td>
                <td>65 Amps</td>
                <td>50A ranges / 48A EVSE (THHN conduit) / 50A subpanels</td>
              </tr>
              <tr>
                <td><strong>4 AWG</strong></td>
                <td>41,740 CM</td>
                <td>0.308 Ω / 1,000 ft</td>
                <td>70 Amps</td>
                <td>85 Amps</td>
                <td>60A EV chargers (Romex NM-B) / large heat pumps</td>
              </tr>
              <tr>
                <td><strong>3 AWG</strong></td>
                <td>52,620 CM</td>
                <td>0.245 Ω / 1,000 ft</td>
                <td>85 Amps</td>
                <td>100 Amps</td>
                <td>100A subpanels / commercial branch feeds</td>
              </tr>
              <tr>
                <td><strong>2 AWG</strong></td>
                <td>66,360 CM</td>
                <td>0.194 Ω / 1,000 ft</td>
                <td>95 Amps</td>
                <td>115 Amps</td>
                <td>100A residential subpanels / battery bank feeders</td>
              </tr>
              <tr>
                <td><strong>1/0 AWG</strong></td>
                <td>105,600 CM</td>
                <td>0.122 Ω / 1,000 ft</td>
                <td>125 Amps</td>
                <td>150 Amps</td>
                <td>125A–150A services / large multi-battery interconnects</td>
              </tr>
              <tr>
                <td><strong>2/0 AWG</strong></td>
                <td>133,100 CM</td>
                <td>0.0967 Ω / 1,000 ft</td>
                <td>145 Amps</td>
                <td>175 Amps</td>
                <td>200A residential service entrance (residential table)</td>
              </tr>
              <tr>
                <td><strong>4/0 AWG</strong></td>
                <td>211,600 CM</td>
                <td>0.0608 Ω / 1,000 ft</td>
                <td>195 Amps</td>
                <td>230 Amps</td>
                <td>200A main service entrance conductors</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.5rem", padding: "1rem", marginTop: "1rem", fontSize: "0.88rem", lineHeight: 1.6 }}>
          <strong>NEC Table 310.16 Operating Conditions &amp; Limitations:</strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
            <li>Ampacities assume not more than three current-carrying conductors in a raceway, cable, or direct buried, at an ambient temperature of 30°C (86°F).</li>
            <li>Conductors exposed to ambient temperatures exceeding 30°C (such as attics or solar roof conduit) must be derated using NEC Table 310.15(B)(1) temperature correction factors.</li>
            <li>Per NEC Section 334.80, Non-Metallic Sheathed Cable (Romex NM-B) must use the 60°C ampacity column regardless of conductor insulation rating.</li>
            <li><strong>Critical Distinction:</strong> Meeting ampacity ensures conductors will not exceed insulation thermal limits, but long branch circuits meeting ampacity can still fail equipment voltage-drop criteria. Always calculate both.</li>
          </ul>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Voltage Drop &amp; Circular-Mil Sizing Formula"
          formula="V_drop = (M × K × I × L) / CMIL  |  % V_drop = (V_drop / V_nominal) × 100"
          formulaDescription="Standard circular-mil voltage drop formula based on Ohm's law (V = I × R), conductor resistivity constants, and physical circuit geometry."
          variables={[
            { symbol: "V_drop", label: "Voltage Drop", description: "Potential difference lost along the circuit conductors", unit: "Volts" },
            { symbol: "M", label: "Phase Geometry Multiplier", description: "2.0 for DC & single-phase AC (round-trip loop 2 × L); 1.732 for 3-phase AC (line-to-line)", unit: "dimensionless" },
            { symbol: "K", label: "Conductor Resistivity Constant", description: "12.9 Ω·cmil/ft for Copper; 21.2 Ω·cmil/ft for Aluminum at 75°C", unit: "Ω·cmil/ft" },
            { symbol: "I", label: "Operating Current", description: "Sustained electrical current drawn by the load", unit: "Amperes" },
            { symbol: "L", label: "One-Way Conductor Length", description: "Physical one-way distance between source and load", unit: "Feet" },
            { symbol: "CMIL", label: "Conductor Cross-Section", description: "Cross-sectional area in circular mils (NEC Chapter 9 Table 8)", unit: "cmil" },
          ]}
          notes={[
            "K is the specific resistance of a conductor 1 mil in diameter and 1 foot long at 75°C (12.9 for copper, 21.2 for aluminum).",
            "NEC 210.19(A) Informational Note No. 4 recommends a 3% maximum branch circuit drop as an engineering design guideline, not a mandatory code requirement.",
            "Mandatory code compliance requires that the selected conductor satisfy NEC Table 310.16 ampacity limits and overcurrent protection rules.",
          ]}
        />
      </div>

      <section id="worked-example" style={{ marginTop: "2rem" }}>
        <h2>Step-by-Step Worked Calculation: Sizing a 12V 30A DC Circuit</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", lineHeight: 1.65 }}>
          <p>
            <strong>Problem:</strong> A 12V DC camper inverter draws 30 Amps continuously and is located 15 feet from the lithium battery bank. Calculate the voltage drop for 6 AWG copper wire and determine whether it satisfies a 3.0% engineering design target.
          </p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
            <li>
              <strong>Step 1: Identify Nominal Voltage:</strong>
              <br />
              <code>V_nominal = 12.0 Volts DC</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 2: Identify Operating Current:</strong>
              <br />
              <code>I = 30.0 Amperes</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 3: Determine Conductor Area (Circular Mils):</strong>
              <br />
              From NEC Chapter 9 Table 8, 6 AWG copper has a cross-sectional area of:
              <br />
              <code>CMIL = 26,240 cmil</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 4: Establish Circuit Length &amp; Geometry:</strong>
              <br />
              One-way length L = 15 ft. For a 2-wire DC circuit (positive supply + negative return), the loop multiplier is M = 2.0:
              <br />
              <code>Total Conductor Distance = 2 × 15 ft = 30 feet</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 5: Apply Conductor Resistivity Constant:</strong>
              <br />
              For copper at 75°C operating temperature, K = 12.9 ohms-cmil/ft.
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 6: Compute Voltage Drop:</strong>
              <br />
              <code>V_drop = (2.0 × 12.9 × 30A × 15 ft) / 26,240 cmil = 11,610 / 26,240 = 0.4425 Volts</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 7: Calculate Percentage Voltage Drop &amp; Evaluate Design Target:</strong>
              <br />
              <code>% V_drop = (0.4425 V / 12.0 V) × 100 = 3.69%</code>
              <br />
              <em>Engineering Evaluation:</em> 3.69% exceeds the 3.0% design target (0.36V maximum allowed). While 6 AWG copper is thermally safe under NEC Table 310.16 (rated for 55A–65A), voltage drop is excessive for a 12V inverter. Upsizing to <strong>4 AWG copper</strong> (41,740 cmil) reduces voltage drop to:
              <br />
              <code>V_drop(4 AWG) = (2.0 × 12.9 × 30A × 15 ft) / 41,740 cmil = 0.278 Volts (2.32% drop — Satisfies 3% target)</code>
            </li>
          </ol>
        </div>
      </section>

      <section id="engineering-distinctions" style={{ marginTop: "2rem" }}>
        <h2>Voltage Drop Engineering Criteria vs. Mandatory Electrical Code</h2>
        <p>
          It is critical to distinguish between <em>mandatory National Electrical Code requirements</em> and <em>engineering design recommendations</em>:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1rem", margin: "1rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📋 Informational Notes (Design Guidance)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
              NEC Section 210.19(A) Informational Note No. 4 and Section 215.2(A)(1) Informational Note No. 2 recommend limiting branch circuit voltage drop to 3% and combined feeder plus branch circuit drop to 5%. Per NEC Section 90.5(C), informational notes are explanatory and not enforceable as mandatory code unless specifically enacted by a local jurisdiction.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚠️ Mandatory Code (Thermal Safety)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
              Mandatory code rules include NEC Article 310 (Conductors for General Wiring), Table 310.16 (Allowable Ampacities), and Article 240 (Overcurrent Protection). Conductors must never carry continuous current exceeding their adjusted ampacity rating, regardless of circuit run length or low voltage drop.
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
        <h2>Related Electrical Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Sizing an EV branch circuit? Use the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link> to check continuous 125% breaker sizing and Romex vs THHN conductor gauge limits. Sizing solar string wiring? Use the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link> to calculate cold-weather Voc voltage limits under NEC 690.7. Sizing battery storage or inverters? Use our <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link> and <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>Comprehensive Engineering Guide:</strong> Read our detailed <Link href="/guides/voltage-drop-and-wire-size-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Voltage Drop &amp; Wire Size Calculation Guide</Link> for detailed conductor resistance derivation, AC inductive reactance factors, and ambient temperature derating formulas.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Voltage drop calculations use standard National Electrical Code (NEC) Chapter 9 Table 8 conductor properties and Table 310.16 ampacities. Design thresholds reflect NEC 210.19(A) Informational Note No. 4 and IEEE Std 141. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="battery" />
    </article>
  );
}

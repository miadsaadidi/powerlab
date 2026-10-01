import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { EvBreakerSizeCalculator } from "@/components/calculator/ev-breaker-size-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("ev-breaker-size");

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charger Breaker Size Calculator — Amps & Wire",
  description:
    "Calculate circuit breaker sizing, base-case copper wire gauge (AWG), and charging speed (kW) for your Level 2 EV charger following NEC continuous-load principles.",
  canonicalPath: "/ev/ev-charger-breaker-size-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "What size breaker do I need for a 48-Amp Level 2 EV charger?",
    answer: "Under NEC Article 625, EV charging is classified as a continuous load. Overcurrent protection devices must be sized for at least 125% of continuous current draw. For a 48-Amp charger: 48A × 1.25 = 60 Amps calculated minimum requirement. Therefore, a standard 60-Amp double-pole circuit breaker is selected. Hardwiring is required because standard residential receptacle plugs (like NEMA 14-50) are rated for a maximum of 50 Amps (40A continuous).",
  },
  {
    question: "What size breaker and wire is needed for a NEMA 14-50 outlet?",
    answer: "A NEMA 14-50 receptacle is typically supplied by a 50-Amp double-pole circuit breaker with 6 AWG copper wire (THHN in conduit or Romex NM-B base-case). Under NEC continuous-load rules, the maximum continuous charging rate on a 50A breaker is 40 Amps (9.6 kW).",
  },
  {
    question: "Why does Romex NM-B wire require a larger gauge than THHN in conduit for a 60A breaker?",
    answer: "NEC Section 334.80 mandates that non-metallic sheathed cable (Romex NM-B) must be evaluated using the 60°C ampacity column of NEC Table 310.16. At 60°C, 6 AWG copper is rated for 55 Amps (less than a 60A breaker rating), meaning Romex base-case installations require 4 AWG copper (rated 70A at 60°C). In contrast, THHN individual conductors in conduit use the 75°C terminal column, where 6 AWG copper is rated for 65 Amps (meeting the 60A breaker rating in base-case conditions).",
  },
  {
    question: "What wire size is required for a 48-Amp EV charger?",
    answer: "For a 48-Amp EV charger (requiring a 60A breaker), 6 AWG copper wire is the base-case requirement when pulled as individual THHN conductors through conduit (evaluated under the 75°C column of NEC Table 310.16, rated for 65 Amps). If using Romex NM-B cable, 4 AWG copper wire is the base-case requirement because NEC 334.80 restricts Romex to the 60°C column (where 6 AWG is 55A). Always verify terminal temperature ratings, conduit fill, and temperature correction factors.",
  },
  {
    question: "What is the 80% rule in electrical code for EV charging?",
    answer: "The 80% continuous load principle is the reciprocal of the 125% continuous load multiplier (1 / 1.25 = 0.80). Because standard overcurrent devices are continuous-load rated at 80% unless listed for 100% operation, branch circuit overcurrent protection must be sized so that continuous EV charging current does not exceed 80% of the breaker's nominal rating (e.g. 50A breaker × 0.80 = 40A maximum continuous load).",
  },
];

export default function EvBreakerSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Charger Breaker & Wire Sizing Calculator",
    description: "Calculate circuit breaker size and copper wire gauge for Level 2 EV chargers using the NEC 125% continuous load rule.",
    route: "/ev/ev-charger-breaker-size-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "NEC 125% continuous load circuit breaker sizing estimation",
      "Conductor ampacity modeling for Romex NM-B (60°C) vs THHN/Conduit (75°C)",
      "Standard commercial charger amperage matching (16A, 24A, 32A, 40A, 48A, 80A)",
      "Charging speed kW delivery and approximate miles of range gained per hour",
    ],
    standards: [
      "NFPA 70 / NEC Article 625 Reference (Electric Vehicle Power Transfer System)",
      "NEC Table 310.16 Reference (Allowable Ampacities of Insulated Conductors)",
      "UL 2594 Reference (Standard for Electric Vehicle Supply Equipment)",
      "SAE J1772 Reference Guidelines",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/ev">EV</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">EV Charger Breaker Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Level 2 Charging &amp; Electrical Planning</p>
        <h1>EV Charger Breaker &amp; Wire Sizing Calculator</h1>
        <p className="intro">
          Estimate double-pole circuit breaker ratings, base-case copper wire gauge (AWG), and charging speed (kW) for your home Level 2 EV charger based on NEC continuous-load principles.
        </p>
      </div>

      <div id="calculator-tool">
        <EvBreakerSizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="Level 2 EV charger breaker and wire sizing"
        answer="Under NEC Article 625, EV charging is classified as a continuous load requiring circuit breakers and branch conductors to be sized for at least 125% of continuous current. For a 48-Amp Level 2 charger, the calculated minimum OCPD is 60 Amps (48A × 1.25 = 60A), calling for a standard 60-Amp double-pole circuit breaker paired with 6 AWG copper THHN (in conduit) or 4 AWG Romex NM-B under base-case conditions."
        formula="Calculated Min OCPD = Continuous Current × 1.25  |  Selected Breaker = Standard OCPD Rating"
        standardExample="48A Charger: 48A × 1.25 = 60A Calculated OCPD (Selected 60A Breaker, 6 AWG THHN Cu in Conduit) · 40A Charger: 40A × 1.25 = 50A Calculated OCPD (Selected 50A Breaker, NEMA 14-50)"
        sourceAuthority="NFPA 70 / NEC Article 625 & Table 310.16 Reference Guidelines"
      />

      {/* Interactive Next-Step Planning Cards to reduce bounce rate */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent)" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📏 Long Cable Run (&gt;50 ft)?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Evaluate branch circuit voltage drop and determine if stepping up one conductor size is beneficial over longer cable distances.
          </p>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
            Calculate Voltage Drop &amp; Upsize Wire →
          </Link>
        </div>

        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid #10b981" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ How Fast Will This Circuit Charge?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Calculate exact hours and minutes to recharge your specific EV battery pack (10% to 80% and 100%) at this breaker amperage.
          </p>
          <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
            Calculate EV Charging Time →
          </Link>
        </div>

        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid #8b5cf6" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🚗 Daily Commute to Circuit Load?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Model your vehicle&apos;s real-world efficiency (Wh/mi) and daily commuting kWh demand with our EV driving range tools.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/ev/ev-range-calculator" className="button secondary-button" style={{ flex: 1, textAlign: "center", fontSize: "0.82rem" }}>
              EV Range Calculator →
            </Link>
            <Link href="/guides/how-to-calculate-ev-driving-range-and-efficiency-guide" className="button secondary-button" style={{ flex: 1, textAlign: "center", fontSize: "0.82rem" }}>
              Wh/mi Range Guide →
            </Link>
          </div>
        </div>
      </div>

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an EV Charger Circuit Breaker and Conductor Wire</h2>
        <ol>
          <li><strong>Identify Charger Continuous Amperage:</strong> Standard Level 2 residential EV supply equipment (EVSE) draws 16A, 24A, 32A, 40A, or 48A continuously.</li>
          <li><strong>Apply the NEC 125% Continuous Rule (NEC Article 625):</strong> Multiply continuous charging current by 1.25 to calculate the minimum overcurrent protection device (OCPD) requirement (e.g., 48A × 1.25 = 60A calculated minimum). Standard circuit breakers are rated for 80% continuous duty.</li>
          <li><strong>Check Conductor Insulation Temperature Rating (60°C vs 75°C):</strong> If using Non-Metallic Sheathed Cable (Romex NM-B), NEC Section 334.80 mandates ampacity must be evaluated under the 60°C column of NEC Table 310.16 (requiring 4 AWG copper for a 60A breaker). THHN individual conductors in conduit use the 75°C column (allowing 6 AWG copper).</li>
          <li><strong>Evaluate Branch Circuit Length &amp; Voltage Drop:</strong> For longer conductor runs, evaluate line resistance against the commonly used 3% branch-circuit voltage-drop planning target (per NEC 210.19(A) Informational Note).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Table 1: Base-Case Level 2 Charger Breaker &amp; Wire Sizing Matrix</h2>
        <p>National Electrical Code (NEC Article 625 &amp; Table 310.16) sizing specifications across standard residential Level 2 charging speeds (240V AC):</p>
        <div className="scenario-table" role="region" aria-label="Standard Level 2 charger breaker and wire sizing matrix">
          <table>
            <caption>Base-case Level 2 EV charger continuous amperage, selected double-pole breaker ratings, copper conductor gauges, and delivery speeds</caption>
            <thead>
              <tr>
                <th scope="col">Continuous Draw</th>
                <th scope="col">Calculated Min OCPD (125%)</th>
                <th scope="col">Selected Breaker</th>
                <th scope="col">THHN in Conduit (75°C)</th>
                <th scope="col">Romex NM-B (60°C)</th>
                <th scope="col">Power (240V)</th>
                <th scope="col">Connection Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps</strong></td>
                <td>20.0 Amps</td>
                <td>20 Amp Double-Pole</td>
                <td>12 AWG Cu (20A)</td>
                <td>12 AWG Cu (20A)</td>
                <td>3.84 kW</td>
                <td>NEMA 6-20 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>24 Amps</strong></td>
                <td>30.0 Amps</td>
                <td>30 Amp Double-Pole</td>
                <td>10 AWG Cu (35A)</td>
                <td>10 AWG Cu (30A)</td>
                <td>5.76 kW</td>
                <td>NEMA 14-30 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>32 Amps</strong></td>
                <td>40.0 Amps</td>
                <td>40 Amp Double-Pole</td>
                <td>8 AWG Cu (50A)</td>
                <td>8 AWG Cu (40A)</td>
                <td>7.68 kW</td>
                <td>NEMA 14-50 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>40 Amps</strong></td>
                <td>50.0 Amps</td>
                <td>50 Amp Double-Pole</td>
                <td>8 AWG Cu (50A)</td>
                <td>6 AWG Cu (55A)</td>
                <td>9.60 kW</td>
                <td>NEMA 14-50 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>48 Amps</strong></td>
                <td>60.0 Amps</td>
                <td>60 Amp Double-Pole</td>
                <td>6 AWG Cu (65A)</td>
                <td>4 AWG Cu (70A)</td>
                <td>11.52 kW</td>
                <td>Hardwired Only (Receptacles capped at 50A)</td>
              </tr>
              <tr>
                <td><strong>80 Amps</strong></td>
                <td>100.0 Amps</td>
                <td>100 Amp Double-Pole</td>
                <td>3 AWG Cu (100A)</td>
                <td>1 AWG Cu (110A)</td>
                <td>19.20 kW</td>
                <td>Hardwired High-Power EVSE</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          Conductor sizes shown are simplified base-case examples. Actual ampacity can require correction/adjustment factors, ambient-temperature corrections, conduit fill/bundling calculations, terminal temperature limitations, wiring-method rules and equipment-specific requirements.
        </p>
      </section>

      <section id="voltage-drop-matrix">
        <h2>Table 2: Estimated Level 2 Branch Circuit Distance to 3% Voltage Drop Target</h2>
        <p>Estimated one-way circuit distance (feet) before single-phase 240V branch circuit voltage drop reaches the 3.0% planning target (7.2V loss), based on NEC Chapter 9 Table 8 copper conductor resistance:</p>
        <div className="scenario-table" role="region" aria-label="EV branch circuit voltage drop by distance matrix">
          <table>
            <caption>Maximum one-way run distance (ft) to maintain &le;3% voltage drop at 240V single phase</caption>
            <thead>
              <tr>
                <th scope="col">Conductor Gauge (AWG)</th>
                <th scope="col">DC Resistance (Ω/kFT @ 75°C)</th>
                <th scope="col">Max Run @ 16A (3.8 kW)</th>
                <th scope="col">Max Run @ 32A (7.7 kW)</th>
                <th scope="col">Max Run @ 40A (9.6 kW)</th>
                <th scope="col">Max Run @ 48A (11.5 kW)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>12 AWG Copper</strong></td>
                <td>1.93 Ω/kFT</td>
                <td>116 ft</td>
                <td>58 ft (oversized breaker required)</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>10 AWG Copper</strong></td>
                <td>1.21 Ω/kFT</td>
                <td>186 ft</td>
                <td>93 ft</td>
                <td>74 ft</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>8 AWG Copper</strong></td>
                <td>0.764 Ω/kFT</td>
                <td>294 ft</td>
                <td>147 ft</td>
                <td>117 ft</td>
                <td>98 ft (exceeds ampacity)</td>
              </tr>
              <tr>
                <td><strong>6 AWG Copper</strong></td>
                <td>0.481 Ω/kFT</td>
                <td>468 ft</td>
                <td>234 ft</td>
                <td>187 ft</td>
                <td>156 ft</td>
              </tr>
              <tr>
                <td><strong>4 AWG Copper</strong></td>
                <td>0.302 Ω/kFT</td>
                <td>745 ft</td>
                <td>372 ft</td>
                <td>298 ft</td>
                <td>248 ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Continuous Branch Circuit Calculation Formulas"
          formula="Calculated_OCPD = I_continuous × 1.25  |  P_kW = (V_line × I_continuous) / 1000  |  V_drop = (2 × K × I × L) / CM"
          formulaDescription="Simplified NEC Article 625 continuous overcurrent protection sizing, 240V single-phase power delivery, and branch circuit voltage drop estimation."
          variables={[
            { symbol: "I_continuous", label: "Continuous Charging Current", description: "Sustained AC current drawn by onboard EV charger (e.g., 32A, 40A, 48A)", unit: "Amperes" },
            { symbol: "1.25", label: "Continuous Load Multiplier", description: "Safety multiplier under NEC 625.41 & 210.20 for continuous electrical loads", unit: "dimensionless" },
            { symbol: "Calculated_OCPD", label: "Calculated Minimum OCPD", description: "Minimum calculated overcurrent protection threshold (Amps)", unit: "Amperes" },
            { symbol: "P_kW", label: "Charging Power Delivered", description: "Nominal electrical power supplied to the EVSE at 240V single-phase", unit: "kW" },
            { symbol: "V_drop", label: "Branch Circuit Voltage Drop", description: "Estimated voltage lost along the two current-carrying circuit conductors", unit: "Volts" },
          ]}
          notes={[
            "Standard circuit breakers are 80% continuous rated; sizing for 125% of load ensures the breaker operates within its continuous-duty envelope.",
            "NEC 334.80 mandates that Romex NM-B cable must be evaluated from the 60°C column of NEC Table 310.16 (4 AWG Cu for a 60A circuit base-case).",
            "THHN individual conductors in conduit are evaluated under the 75°C terminal column (6 AWG Cu for a 60A circuit base-case).",
          ]}
        />
      </div>

      <section id="worked-example" style={{ marginTop: "2rem" }}>
        <h2>Step-by-Step Worked Electrical Example: Sizing a 48A Home EV Charger</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", lineHeight: 1.65 }}>
          <p><strong>Scenario:</strong> Sizing a 48-Amp Level 2 hardwired EV wall connector with a 65-foot conductor run from a 200A residential distribution panel.</p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
            <li>
              <strong>Step 1: Calculate Minimum Breaker Rating:</strong>
              <br />
              • <em>Stage 1 (Calculated OCPD Requirement):</em> <code>Minimum OCPD = 48A × 1.25 = 60.0 Amperes</code>
              <br />
              • <em>Stage 2 (Selected Standard Breaker):</em> Standard 60-Amp 240V double-pole circuit breaker.
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 2: Determine Base-Case Conductor Wire Gauge by Wiring Method:</strong>
              <br />
              • <em>Option A (THHN in EMT/PVC Conduit — 75°C Column):</em> 6 AWG copper has an allowable base-case ampacity of 65A at 75°C. <strong>6 AWG copper THHN</strong> is the base-case conductor result under the stated assumptions; verify terminal ratings and applicable correction/adjustment factors for the actual installation.
              <br />
              • <em>Option B (Romex NM-B Cable — 60°C Column):</em> 6 AWG copper is rated for 55A at 60°C (insufficient for a 60A breaker). Per NEC 334.80, <strong>4 AWG copper NM-B</strong> (rated 70A at 60°C) is the base-case conductor result; verify installation conditions.
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 3: Verify Voltage Drop over 65 ft Run (6 AWG THHN):</strong>
              <br />
              <code>V_drop = (2 × 12.9 × 48A × 65 ft) / 26,240 CM = 3.06 Volts</code>
              <br />
              <code>% Voltage Drop = (3.06V / 240V) × 100 = 1.28% (compared with the commonly used 3.0% branch-circuit planning target)</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 4: Compute Power &amp; Charging Delivery:</strong>
              <br />
              <code>Power = (240V × 48A) / 1,000 = 11.52 kW</code>
              <br />
              Recharging a 60 kWh battery from 20% to 80% (36 kWh added at ~90% efficiency) takes approximately: <code>36 kWh / (11.52 kW × 0.90) = 3.47 hours (3 hrs 28 min)</code>.
            </li>
          </ol>
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
        <h2>Connected EV Infrastructure &amp; Electrical Planning Cluster</h2>
        <p>
          Determining circuit breaker sizing is one component of residential EV charging planning. PowerLab interconnects branch circuit overcurrent protection with charge duration simulation, feeder run voltage drop, and open research data:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ EV Charging Time Simulator</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Model full and partial battery replenishment hours across Level 1 and Level 2 charging rates (1.4 kW to 19.2 kW) factoring in onboard AC converter limits.
            </p>
            <Link href="/ev/ev-charging-time-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EV Charging Time Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📐 Feeder Wire Gauge &amp; Voltage Drop</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Verify copper/aluminum conductor resistance over long cable distances (50–200 ft) against the commonly used 3% branch-circuit planning target.
            </p>
            <Link href="/battery/voltage-drop-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Voltage Drop &amp; Wire Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📖 Level 2 Breaker &amp; Ampacity Guide</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Explore engineering principles behind the NEC 80% continuous load rule, 60°C vs 75°C terminal temperature envelopes, and hardwired vs NEMA 14-50 trade-offs.
            </p>
            <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Level 2 Charging Speed &amp; Breaker Guide →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📊 EVSE Terminal Temperature Benchmark</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Access 120 continuous load empirical test records measuring conductor temperature rise, terminal lug heat dissipation, and contact resistance under NEC 625.42.
            </p>
            <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EVSE Terminal Benchmark Dataset (PL-DS-EVSE-01) →
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Also evaluate main service panel busbar limits with our <Link href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>NEC 705.12 120% Busbar Sizing Guide</Link>, evaluate real-world range efficiency in our <Link href="/ev/ev-range-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>EV Real-World Range Calculator</Link>, model home charging electricity tariffs with the <Link href="/ev/ev-charging-cost-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>EV Charging Cost Calculator</Link>, or read the research whitepaper <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ fontWeight: 600, color: "var(--accent)" }}>PL-TR-2026-EVSE01</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          This calculator provides a simplified NEC-based sizing estimate. Sizing methodology is based on NFPA 70 / National Electrical Code (NEC) Article 625 (Electric Vehicle Power Transfer Systems, including Sections 625.41 and 625.42), Section 210.20(A), and Table 310.16. Final conductor and overcurrent-protection selection must account for applicable installation conditions, equipment listings, terminal ratings, ambient temperature, adjustment/correction factors, conduit fill, wiring method and local code requirements. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="ev" />
    </article>
  );
}


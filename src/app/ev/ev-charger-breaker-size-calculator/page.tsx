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
    "Find the circuit breaker size, wire gauge (AWG), and charging speed (kW) for your Level 2 EV charger following the NEC 125% continuous load rule.",
  canonicalPath: "/ev/ev-charger-breaker-size-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "What size breaker do I need for a 48-Amp Level 2 EV charger?",
    answer: "Under NEC Article 625, EV charging is classified as a continuous load. Circuit breakers must be sized for 125% of the continuous draw. For a 48-Amp charger: 48A × 1.25 = 60 Amps. Therefore, a 60-Amp double-pole circuit breaker is required. Hardwiring is required because standard NEMA 14-50 receptacle plugs are rated for a maximum of 50 Amps (40A continuous).",
  },
  {
    question: "What size breaker and wire is needed for a NEMA 14-50 outlet?",
    answer: "A NEMA 14-50 outlet requires a 50-Amp double-pole circuit breaker and 6 AWG copper wire (THHN in conduit or Romex NM-B). The maximum continuous charging rate permitted by code on a 50A breaker is 40 Amps (9.6 kW).",
  },
  {
    question: "Why does Romex NM-B wire require a larger gauge than THHN in conduit for a 60A breaker?",
    answer: "NEC Section 334.80 mandates that non-metallic sheathed cable (Romex NM-B) must be sized using the 60°C ampacity column of NEC Table 310.16. At 60°C, 6 AWG copper is only rated for 55 Amps (too small for a 60A breaker), meaning Romex installations require 4 AWG copper. In contrast, THHN individual conductors in conduit use the 75°C column, where 6 AWG copper is rated for 65 Amps (legal for a 60A breaker).",
  },
  {
    question: "What wire size is required for a 48-Amp EV charger?",
    answer: "A 48-Amp EV charger requires 6 AWG copper wire when pulled as individual THHN conductors through conduit (evaluated under the 75°C column of NEC Table 310.16, rated for 65 Amps). If you are using Romex NM-B cable, you must upsize to 4 AWG copper wire because NEC 334.80 restricts Romex to the 60°C column (where 6 AWG is capped at 55A, which is illegal for a 60A breaker).",
  },
  {
    question: "What is the 80% rule in electrical code for EV charging?",
    answer: "The 80% rule is the reciprocal of the 125% continuous load requirement. Because electric vehicles draw sustained maximum power for many consecutive hours, breakers and branch circuit wiring must never be loaded beyond 80% of their nameplate rating (e.g. 50A breaker × 0.80 = 40A maximum continuous charging).",
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
      "NEC 125% continuous load circuit breaker sizing",
      "Conductor ampacity modeling for Romex NM-B (60°C) vs THHN/Conduit (75°C)",
      "Standard commercial charger amperage matching (16A, 24A, 32A, 40A, 48A, 80A)",
      "Charging speed kW delivery and approximate miles of range gained per hour",
    ],
    standards: [
      "NFPA 70 / NEC Article 625 (Electric Vehicle Power Transfer System)",
      "NEC Table 310.16 (Allowable Ampacities of Insulated Conductors)",
      "UL 2594 (Standard for Electric Vehicle Supply Equipment)",
      "SAE J1772 Standards",
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
        <p className="eyebrow">Level 2 Charging &amp; NEC Electrical Sizing</p>
        <h1>EV Charger Breaker &amp; Wire Sizing Calculator</h1>
        <p className="intro">
          Find the exact double-pole circuit breaker rating, copper wire gauge (AWG), and charging speed (kW) for your home Level 2 EV charger according to the NEC 125% continuous load rule.
        </p>
      </div>

      <div id="calculator-tool">
        <EvBreakerSizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="Level 2 EV charger breaker and wire sizing"
        answer="Under NEC Article 625, EV charging is a continuous electrical load requiring circuit breakers and wiring to be sized for 125% of the charger's continuous current draw. A standard 48-Amp Level 2 charger requires a 60-Amp double-pole circuit breaker and 6 AWG copper wire (in conduit) or 4 AWG Romex (NM-B), delivering up to 11.5 kW of power."
        formula="Breaker Size (Amps) = Charger Continuous Current (Amps) × 1.25 (NEC Continuous Load Multiplier)"
        standardExample="48A Charger: 48A × 1.25 = 60A Breaker (6 AWG THHN Copper in Conduit) · 40A Charger: 40A × 1.25 = 50A Breaker (NEMA 14-50)"
        sourceAuthority="NFPA 70-2026 / NEC Article 625 (Sections 625.41 & 625.42) & Table 310.16"
      />

      {/* Interactive Next-Step Planning Cards to reduce bounce rate */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent)" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📏 Long Cable Run (&gt;50 ft)?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Verify allowable 3% branch circuit voltage drop and determine if you must upsize conductors to prevent charging thermal throttling.
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
          <li><strong>Apply the NEC 125% Continuous Rule (NEC 625.41):</strong> Multiply charging amps by 1.25 to calculate the mandatory minimum overcurrent protection device (OCPD) rating (e.g., 48A × 1.25 = 60A breaker). Breakers are designed to carry only 80% of their rating under continuous duty (3+ hours).</li>
          <li><strong>Check Conductor Insulation Temperature Rating (60°C vs 75°C):</strong> If using Non-Metallic Sheathed Cable (Romex NM-B), NEC Section 334.80 mandates ampacity must be evaluated under the 60°C column of NEC Table 310.16 (requiring 4 AWG copper for a 60A breaker). THHN individual conductors in conduit use the 75°C column (allowing 6 AWG copper).</li>
          <li><strong>Verify Branch Circuit Length &amp; Voltage Drop:</strong> For runs exceeding 50 to 100 feet, evaluate conductor resistance to keep voltage drop under 3% per NEC 210.19(A) Informational Note No. 4, preventing EVSE thermal throttling.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Table 1: Standard Level 2 Charger Breaker &amp; Wire Sizing Matrix</h2>
        <p>National Electrical Code (NEC Article 625 &amp; Table 310.16) sizing specifications across standard residential Level 2 charging speeds (240V AC):</p>
        <div className="scenario-table" role="region" aria-label="Standard Level 2 charger breaker and wire sizing matrix">
          <table>
            <caption>Level 2 EV charger continuous amperage, double-pole breaker ratings, copper conductor gauges, and delivery speeds</caption>
            <thead>
              <tr>
                <th scope="col">Continuous Draw</th>
                <th scope="col">NEC Min Breaker (125%)</th>
                <th scope="col">THHN in Conduit (75°C)</th>
                <th scope="col">Romex NM-B (60°C)</th>
                <th scope="col">Power (240V)</th>
                <th scope="col">Typical Range Gained</th>
                <th scope="col">Connection Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps</strong></td>
                <td>20 Amp Double-Pole</td>
                <td>12 AWG Cu (20A)</td>
                <td>12 AWG Cu (20A)</td>
                <td>3.8 kW</td>
                <td>+12–15 mi/hr</td>
                <td>NEMA 6-20 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>24 Amps</strong></td>
                <td>30 Amp Double-Pole</td>
                <td>10 AWG Cu (35A)</td>
                <td>10 AWG Cu (30A)</td>
                <td>5.8 kW</td>
                <td>+18–22 mi/hr</td>
                <td>NEMA 14-30 Plug / Hardwired</td>
              </tr>
              <tr>
                <td><strong>32 Amps</strong></td>
                <td>40 Amp Double-Pole</td>
                <td>8 AWG Cu (50A)</td>
                <td>8 AWG Cu (40A)</td>
                <td>7.7 kW</td>
                <td>+25–30 mi/hr</td>
                <td>NEMA 14-50 Plug (Max 32A continuous on 40A)</td>
              </tr>
              <tr>
                <td><strong>40 Amps</strong></td>
                <td>50 Amp Double-Pole</td>
                <td>8 AWG Cu (50A)</td>
                <td>6 AWG Cu (55A)</td>
                <td>9.6 kW</td>
                <td>+30–36 mi/hr</td>
                <td>NEMA 14-50 Plug (Commercial duty receptacle)</td>
              </tr>
              <tr>
                <td><strong>48 Amps</strong></td>
                <td>60 Amp Double-Pole</td>
                <td>6 AWG Cu (65A)</td>
                <td>4 AWG Cu (70A)</td>
                <td>11.5 kW</td>
                <td>+40–48 mi/hr</td>
                <td>Hardwired Only (Receptacles capped at 50A)</td>
              </tr>
              <tr>
                <td><strong>80 Amps</strong></td>
                <td>100 Amp Double-Pole</td>
                <td>3 AWG Cu (100A)</td>
                <td>2 AWG Cu (95A)</td>
                <td>19.2 kW</td>
                <td>+65–75 mi/hr</td>
                <td>Hardwired High-Power EVSE (Dual Inverter)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="voltage-drop-matrix">
        <h2>Table 2: Level 2 EV Branch Circuit Voltage Drop &amp; Distance Limits</h2>
        <p>Estimated one-way circuit distance (feet) before single-phase 240V branch circuit voltage drop exceeds 3.0% (7.2V loss), based on NEC Chapter 9 Table 8 copper conductor resistance:</p>
        <div className="scenario-table" role="region" aria-label="EV branch circuit voltage drop by distance matrix">
          <table>
            <caption>Maximum one-way run distance (ft) to maintain &lt;3% voltage drop at 240V single phase</caption>
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
          title="EV Continuous Branch Circuit &amp; Power Formulas"
          formula="Breaker_Amps = I_continuous × 1.25  |  P_kW = (V_line × I_continuous) / 1000  |  V_drop = (2 × K × I × L) / CM"
          formulaDescription="NEC Article 625 continuous overcurrent protection sizing, 240V single-phase power delivery, and Ohm's law branch circuit voltage drop calculation."
          variables={[
            { symbol: "I_continuous", label: "Continuous Charging Current", description: "Sustained AC current drawn by onboard EV charger (e.g., 32A, 40A, 48A)", unit: "Amperes" },
            { symbol: "1.25", label: "NEC Continuous Load Multiplier", description: "Mandatory 25% safety margin under NEC 625.41 & 210.20 for loads lasting 3+ hours", unit: "dimensionless" },
            { symbol: "Breaker_Amps", label: "Minimum OCPD Breaker Rating", description: "Next standard commercial double-pole breaker size (e.g., 40A, 50A, 60A)", unit: "Amperes" },
            { symbol: "P_kW", label: "Charging Power Delivered", description: "Nominal electrical power supplied to the EVSE at 240V single-phase", unit: "kW" },
            { symbol: "V_drop", label: "Branch Circuit Voltage Drop", description: "Total voltage lost along the two current-carrying circuit conductors", unit: "Volts" },
          ]}
          notes={[
            "Standard circuit breakers are 80% continuous rated; sizing for 125% of load ensures the breaker never operates above its 80% thermal-trip threshold.",
            "NEC 334.80 mandates that Romex NM-B cable must be sized from the 60°C column of NEC Table 310.16, requiring 4 AWG Cu for a 60A circuit.",
            "THHN individual conductors in conduit (EMT, PVC, or MC cable) are evaluated under the 75°C terminal column, permitting 6 AWG Cu for a 60A circuit.",
          ]}
        />
      </div>

      <section id="worked-example" style={{ marginTop: "2rem" }}>
        <h2>Step-by-Step Worked Electrical Example: Sizing a 48A Home EV Charger</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", lineHeight: 1.65 }}>
          <p><strong>Scenario:</strong> A homeowner installs a 48-Amp Level 2 hardwired EV wall connector with a 65-foot conductor run from the main 200A distribution panel in the garage.</p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
            <li>
              <strong>Step 1: Calculate Minimum Breaker Rating:</strong>
              <br />
              <code>Minimum Breaker = 48A × 1.25 = 60.0 Amperes</code>
              <br />
              <em>Selection:</em> Standard 60-Amp 240V double-pole circuit breaker.
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 2: Determine Conductor Wire Gauge by Wiring Method:</strong>
              <br />
              • <em>Option A (THHN in EMT/PVC Conduit — 75°C Column):</em> 6 AWG copper has an allowable ampacity of 65A at 75°C. Since 65A &ge; 60A breaker, <strong>6 AWG THHN Copper</strong> is code-compliant.
              <br />
              • <em>Option B (Romex NM-B Cable — 60°C Column):</em> 6 AWG copper is rated for 55A at 60°C (insufficient for 60A breaker). Per NEC 334.80, you must upsize to <strong>4 AWG NM-B Copper</strong> (rated 70A at 60°C).
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 3: Verify Voltage Drop over 65 ft Run (6 AWG THHN):</strong>
              <br />
              <code>V_drop = (2 × 12.9 × 48A × 65 ft) / 26,240 CM = 3.06 Volts</code>
              <br />
              <code>% Voltage Drop = (3.06V / 240V) × 100 = 1.28% (&lt; 3.0% NEC maximum recommended limit)</code>
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
        <h2>Related EV Charging &amp; Electrical Planning</h2>
        <p>
          Calculate full battery charge durations with our <Link href="/ev/ev-charging-time-calculator">EV Charging Time Calculator</Link>, check feeder run length and cable loss with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, assess battery driving range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>, or project home charging electricity expenses with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Level 2 EV Charging Speed, Amperage &amp; Breaker Sizing Guide</Link> for detailed continuous load calculations, NEC 80% rule charts, and hardwired vs. plug-in comparisons.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          📊 <strong>Empirical Benchmark Dataset:</strong> Review our open research benchmark <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontWeight: 600, color: "var(--brand-strong)" }}>Continuous Duty EVSE Terminal Temperature Benchmark (PL-DS-EVSE-04)</Link> for thermal rise data across NEMA 14-50 receptacles vs hardwired lugs.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Circuit breaker and conductor sizing adhere strictly to NFPA 70-2026 / National Electrical Code (NEC) Article 625 (Electric Vehicle Power Transfer Systems, specifically Section 625.41 Overcurrent Protection and Section 625.42 Rating), NEC Section 210.20(A), and Table 310.16. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="ev" />
    </article>
  );
}

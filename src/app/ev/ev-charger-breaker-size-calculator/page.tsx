import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "EV Charger Breaker & Wire Size Calculator — Level 2 Sizing",
  description: "Find the exact circuit breaker size, wire gauge (AWG), and charging speed (kW) for your home Level 2 EV charger following the NEC 125% continuous load rule.",
  alternates: { canonical: "/ev/ev-charger-breaker-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "EV Charger Breaker & Wire Size Calculator — PowerLab",
    description: "Calculate required circuit breaker amperage, minimum copper wire gauge (AWG), and charging power for home Level 2 EV chargers.",
    url: `${siteConfig.url}/ev/ev-charger-breaker-size-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

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

      <DirectAnswerCard
        keyword="Level 2 EV charger breaker and wire sizing"
        answer="Under NEC Article 625, EV charging is a continuous electrical load requiring circuit breakers and wiring to be sized for 125% of the charger's continuous current draw. A standard 48-Amp Level 2 charger requires a 60-Amp double-pole circuit breaker and 6 AWG copper wire (in conduit) or 4 AWG Romex (NM-B), delivering up to 11.5 kW of power."
        formula="Breaker Size (Amps) = Charger Continuous Current (Amps) × 1.25 (NEC Continuous Load Multiplier)"
        standardExample="48A Charger: 48A × 1.25 = 60A Breaker (6 AWG THHN Copper in Conduit) · 40A Charger: 40A × 1.25 = 50A Breaker (NEMA 14-50)"
        sourceAuthority="NEC Article 625 (EV Power Transfer) & NEC Table 310.16"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <EvBreakerSizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an EV Charger Circuit Breaker and Wire</h2>
        <ol>
          <li><strong>Identify Charger Continuous Amperage:</strong> Standard Level 2 chargers draw 16A, 24A, 32A, 40A, or 48A continuously.</li>
          <li><strong>Apply the NEC 125% Continuous Rule:</strong> Multiply charging amps by 1.25 to calculate the mandatory minimum breaker rating (e.g., 48A × 1.25 = 60A breaker).</li>
          <li><strong>Check Wire Temperature Rating (60°C vs 75°C):</strong> If using Romex NM-B cable, size from the 60°C column (requiring 4 AWG copper for a 60A breaker); THHN in conduit allows 6 AWG copper.</li>
          <li><strong>Verify Circuit Run Length &amp; Voltage Drop:</strong> For long cable runs exceeding 50 to 100 feet, check wire gauge with the voltage drop calculator to prevent charging current throttles.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Standard Level 2 Charger Breaker &amp; Wire Sizing Matrix</h2>
        <p>National Electrical Code sizing specifications across popular residential Level 2 charging speeds:</p>
        <div className="scenario-table" role="region" aria-label="Standard Level 2 charger breaker and wire sizing matrix">
          <table>
            <caption>Level 2 EV charger continuous amperage, double-pole breaker ratings, and copper conductor gauges</caption>
            <thead>
              <tr>
                <th scope="col">Charger Output</th>
                <th scope="col">Required Breaker</th>
                <th scope="col">THHN in Conduit (75°C)</th>
                <th scope="col">Romex NM-B (60°C)</th>
                <th scope="col">Power (kW)</th>
                <th scope="col">Miles / Hour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps (NEMA 6-20)</strong></td>
                <td>20 Amp</td>
                <td>12 AWG</td>
                <td>12 AWG</td>
                <td>3.8 kW</td>
                <td>+12–15 mph</td>
              </tr>
              <tr>
                <td><strong>24 Amps (NEMA 14-30 / Dryer)</strong></td>
                <td>30 Amp</td>
                <td>10 AWG</td>
                <td>10 AWG</td>
                <td>5.8 kW</td>
                <td>+18–22 mph</td>
              </tr>
              <tr>
                <td><strong>32 Amps (NEMA 14-50 Plug-in)</strong></td>
                <td>40 Amp</td>
                <td>8 AWG</td>
                <td>8 AWG</td>
                <td>7.7 kW</td>
                <td>+25–30 mph</td>
              </tr>
              <tr>
                <td><strong>40 Amps (NEMA 14-50 Max)</strong></td>
                <td>50 Amp</td>
                <td>8 AWG</td>
                <td>6 AWG</td>
                <td>9.6 kW</td>
                <td>+30–36 mph</td>
              </tr>
              <tr>
                <td><strong>48 Amps (Hardwired Standard)</strong></td>
                <td>60 Amp</td>
                <td>6 AWG</td>
                <td>4 AWG</td>
                <td>11.5 kW</td>
                <td>+40–48 mph</td>
              </tr>
              <tr>
                <td><strong>80 Amps (Commercial)</strong></td>
                <td>100 Amp</td>
                <td>3 AWG</td>
                <td>2 AWG</td>
                <td>19.2 kW</td>
                <td>+75 mph</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Continuous Circuit Sizing Formulas"
          formula="Breaker_Amps = Continuous_Amps × 1.25  |  Charging_Power_kW = (Supply_Volts × Continuous_Amps) / 1000"
          formulaDescription="National Electrical Code (NEC Article 625) continuous duty circuit sizing and Level 2 AC power delivery formulas."
          variables={[
            { symbol: "Continuous_Amps", label: "Max Continuous Charging Current", description: "Maximum current drawn continuously by the onboard vehicle charger (e.g. 32A, 40A, 48A)", unit: "Amperes" },
            { symbol: "1.25", label: "NEC Continuous Load Factor", description: "Mandatory 25% safety multiplier for circuits operating continuously for 3+ hours", unit: "dimensionless" },
            { symbol: "Breaker_Amps", label: "Standard Double-Pole Breaker", description: "Nearest standard commercial breaker size (e.g. 40A, 50A, 60A, 100A)", unit: "Amperes" },
            { symbol: "Charging_Power_kW", label: "Level 2 Charging Delivery", description: "Nominal power delivered to the electric vehicle at 240V or 208V", unit: "kW" },
          ]}
          notes={[
            "Breakers are designed to carry only 80% of their nominal rating continuously without nuisance thermal tripping.",
            "Romex (NM-B) wire must be sized from the 60°C ampacity column of NEC Table 310.16 (requiring 4 AWG copper for a 60A breaker).",
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
        <h2>Related EV Charging &amp; Electrical Planning</h2>
        <p>
          Calculate full battery charge durations with our <Link href="/ev/ev-charging-time-calculator">EV Charging Time Calculator</Link>, check feeder run length and cable loss with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, or project home charging electricity expenses with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Circuit breaker and conductor sizing adhere strictly to National Electrical Code (NEC) Article 625 (Electric Vehicle Power Transfer Systems) and Table 310.16. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="ev" />
    </article>
  );
}

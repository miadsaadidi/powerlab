import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { NecBusbarCalculator } from "@/components/calculator/nec-busbar-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { MathFraction, MathVar } from "@/components/common/math-display";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "NEC 705.12 120% Rule: Solar & Battery Busbar Sizing Guide",
  description:
    "Understand the NEC 705.12 120% busbar rule for solar and battery backfeed. Includes 100A–400A busbar derating tables, continuous duty, and supply-side taps.",
  canonicalPath: "/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the NEC 705.12 120% Rule for electrical busbars?",
    answer:
      "Under NFPA 70 / National Electrical Code (NEC) Article 705.12(B), the 120% Rule allows the sum of the main utility overcurrent protection device (OCPD) rating plus 125% of the continuous output current from all interconnected power production sources (such as solar PV and battery inverters) to equal up to 120% of the electrical service panel busbar ampacity rating, provided the backfed breaker is located at the opposite end of the busbar from the utility main supply.",
  },
  {
    question: "What is the formula for calculating maximum solar backfeed under NEC 705.12?",
    answer:
      "The governing load-side busbar equation is: (1.25 × I_source,cont) + I_main ≤ 1.20 × I_busbar. To solve for the maximum allowable continuous source current: I_source,max = ((1.20 × I_busbar) − I_main) ÷ 1.25. The corresponding source-circuit OCPD (breaker) is selected separately based on standard ratings under NEC 240.6, conductor ampacity, and equipment listing.",
  },
  {
    question: "Does a 40A solar breaker allow 40A of continuous inverter output?",
    answer:
      "No. Because solar PV inverters and battery energy storage systems are classified as continuous power production sources, the National Electrical Code requires a 125% sizing multiplier (NEC 690.8 / 705.28). A 40A backfed breaker accommodates a maximum continuous inverter output current of 32A (40A ÷ 1.25 = 32A). At 240V single-phase, 32A translates to a maximum continuous AC power ceiling of 7.68 kW.",
  },
  {
    question: "Why must the solar backfeed breaker be installed at the opposite end of the busbar?",
    answer:
      "For this specific load-side 120% calculation method, the source connection is positioned at the opposite end of the busbar from the primary supply as required by the applicable configuration. The exact installation must satisfy the applicable NEC edition, panel construction, equipment listing, and manufacturer requirements.",
  },
  {
    question: "Can I derate my 200A main breaker to 175A or 150A to fit more solar?",
    answer:
      "A reduced main OCPD can increase the mathematical busbar allowance, but whether a 175 A or 150 A main is permissible requires an NEC Article 220 load calculation plus equipment, conductor, service, and installation verification. For example, on a 200 A busbar, replacing a 200 A main breaker with a 175 A main increases the mathematical calculation allowance from 40 A to 65 A, permitting up to 52 A of continuous source current (12.48 kW at 240 V single-phase).",
  },
  {
    question: "How do center-fed electrical panels handle the 120% rule?",
    answer:
      "Center-fed service panels—where the utility main breaker connects to the center of the busbar rather than at one end—have specific NEC requirements. Because load breakers exist on both sides of the main supply, backfed power from an end breaker could combine with utility current to overload the center bus section. Applicability of the 120% rule depends on exact busbar construction, manufacturer listing, and governing NEC edition requirements. Consult equipment documentation and the local AHJ.",
  },
  {
    question: "What is the difference between a Supply-Side Tap (NEC 705.11) and a Load-Side Connection (NEC 705.12)?",
    answer:
      "A load-side connection (NEC 705.12) installs a breaker directly on the main distribution panel busbar and is constrained by the 120% busbar calculation limit. A supply-side connection (NEC 705.11), often called a line-side tap, connects between the utility electric meter and the main service disconnect, avoiding the 120% busbar calculation entirely. However, supply-side taps remain subject to service entrance conductor ampacity, dedicated OCPD requirements, equipment listings, and utility interconnection approval.",
  },
];

export default function NecBusbarSizingGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "NEC 705.12 120% Rule: Solar & Battery Panel Busbar Sizing Guide",
    description:
      "Comprehensive electrical engineering guide to the NEC 705.12 120% busbar rule, 100A–400A panel derating lookup tables, 125% continuous duty inverter sizing, supply-side taps, and EMS power control.",
    route: "/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide",
    datePublished: "2026-09-30",
    dateModified: "2026-09-30",
    categoryName: "Solar Photovoltaics",
    categoryRoute: "/solar",
    standards: [
      "NFPA 70 / NEC Article 705.12(B) (Load-Side Interconnection & 120% Busbar Rule)",
      "NFPA 70 / NEC Article 705.11 (Supply-Side / Line-Side Interconnection)",
      "NFPA 70 / NEC Article 705.13 (Power Control Systems & Energy Management)",
      "NFPA 70 / NEC Article 690.8 (Circuit Sizing and Current Multipliers)",
      "NFPA 70 / NEC Article 240.6 (Standard Ampere Ratings for Overcurrent Devices)",
      "NFPA 70 / NEC Article 220 (Branch-Circuit, Feeder, and Service Load Calculations)",
      "UL 1741 / UL 9540 (Inverters, Converters, and Energy Storage Systems)",
      "IEEE 1547-2018 (Interconnection of Distributed Energy Resources)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">NEC 705.12 Busbar Sizing Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Electrical Engineering &amp; Solar Interconnection Guide</p>
        <h1>NEC 705.12 120% Rule: Solar &amp; Battery Panel Busbar Sizing Guide</h1>
        <p className="intro">
          A detailed engineering explainer on calculating load-side electrical service panel backfeed limits under
          NFPA 70 / NEC Article 705.12(B). Learn how to size solar and battery overcurrent devices, evaluate 100A to 400A
          busbar capacities, simulate main-breaker derating scenarios under NEC Article 220, and explore supply-side tap
          (NEC 705.11) and Power Control System (NEC 705.13) alternatives.
        </p>
      </header>

      {/* Code Basis Notice */}
      <div
        style={{
          background: "rgba(56, 189, 248, 0.08)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          borderRadius: "8px",
          padding: "0.85rem 1.15rem",
          margin: "1.5rem 0",
          fontSize: "0.88rem",
          lineHeight: 1.5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <span style={{ color: "#38bdf8", fontWeight: 700 }}>📜 Code Basis:</span>
          <span style={{ fontWeight: 600, color: "var(--foreground)" }}>
            NFPA 70 / National Electrical Code (NEC) 2023 Edition (with reference to 2020 and 2026 revisions)
          </span>
        </div>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.82rem" }}>
          Local jurisdictions (Authorities Having Jurisdiction / AHJs) adopt different NEC editions on independent cycles
          and may enforce local amendments or utility-specific interconnection requirements. Always verify local electrical
          codes before executing panel alterations.
        </p>
      </div>

      <DirectAnswerCard
        keyword="nec 705.12 120 percent rule formula and calculation"
        answer="Under NEC 705.12(B), the load-side 120% rule governs backfeed on panel busbars: (1.25 × I_source,cont) + I_main ≤ 1.20 × I_busbar. Solving for continuous capacity gives: I_source,max = ((1.20 × I_busbar) − I_main) ÷ 1.25. For a standard 200A busbar with a 200A main breaker, the 120% limit is 240A, leaving a 40A calculation allowance. Because power production sources require a 125% continuous duty multiplier, the maximum continuous source output is 32.0A (40A ÷ 1.25), corresponding to an illustrative 40A source OCPD and a continuous AC output ceiling of 7.68 kW at 240V."
        formula="(1.25 * I_source_cont) + I_main <= 1.20 * I_busbar --> I_source_max = ((1.20 * I_busbar) - I_main) / 1.25"
        formulaNode={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>
              (1.25 × <MathVar symbol="I" sub="source,cont" />) + <MathVar symbol="I" sub="main" /> ≤ 1.20 × <MathVar symbol="I" sub="busbar" />
            </span>
            <span style={{ color: "#f59e0b", margin: "0 0.35rem", fontWeight: 700 }}>⟹</span>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <span>
                <MathVar symbol="I" sub="source,max" /> ={" "}
              </span>
              <MathFraction
                numerator={
                  <span>
                    (1.20 × <MathVar symbol="I" sub="busbar" />) − <MathVar symbol="I" sub="main" />
                  </span>
                }
                denominator={<span>1.25</span>}
              />
            </div>
          </div>
        }
        standardExample="Standard 200A Service Panel: 200A Bus × 1.20 = 240A limit. 240A − 200A Main = 40A allowance. Max continuous inverter output = 40A ÷ 1.25 = 32.0A (7.68 kW @ 240V). 40A breaker installed at opposite end."
        sourceAuthority="NFPA 70 (NEC 2023) Article 705.12(B)(3)(b) / UL 1741 Interconnection Standard"
      />

      <PageJumpNav />

      {/* Embedded Interactive Calculator */}
      <section id="interactive-calculator" className="calculator-wrapper" style={{ marginTop: "2.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>
            Interactive NEC 705.12 Busbar &amp; Backfeed Sizing Workbench
          </h2>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.9rem" }}>
            Model your service panel busbar rating, main supply breaker, and system voltage to deterministically calculate
            continuous source current limits, example OCPD ratings, and main-breaker derating options.
          </p>
        </div>

        <NecBusbarCalculator />
      </section>

      {/* Section 1: Physical Principle & Current Superposition */}
      <section id="physical-principle" style={{ marginTop: "3rem" }}>
        <h2>1. The Physical Principle Behind the 120% Rule</h2>
        <p>
          In standard electrical service panels, electricity flows from the primary utility main breaker at the top of the
          panel downward through copper or aluminum busbars, supplying branch circuit breakers along the way. If all branch
          breakers simultaneously draw full current, the busbar experiences its highest current density near the top,
          tapering off toward the bottom.
        </p>
        <p>
          When a grid-tied solar photovoltaic inverter or AC-coupled battery energy storage system (BESS) is interconnected,
          it acts as an additional power supply. If a 40A solar breaker were installed directly next to a 200A main breaker
          at the top of a 200A busbar, the combined current entering that single section could reach 240A—exceeding the
          busbar&apos;s thermal rating and risking busbar overheating and fire.
        </p>

        <FormulaCard
          title="NEC 705.12(B) Load-Side Busbar Capacity Equation"
          formula="(1.25 * I_source_cont) + I_main <= 1.20 * I_busbar  -->  I_source_max = ((1.20 * I_busbar) - I_main) / 1.25"
          formulaDescription="Governing NEC 705.12(B) load-side busbar equation accounting for the 125% continuous duty multiplier on backfed sources."
          latexFormula="(1.25 \\times I_{\\text{source,cont}}) + I_{\\text{main}} \\le 1.20 \\times I_{\\text{busbar}} \\implies I_{\\text{source,max}} = \\frac{(1.20 \\times I_{\\text{busbar}}) - I_{\\text{main}}}{1.25}"
          variables={[
            { symbol: "I_busbar", label: "Busbar Rating", description: "Ampere rating of the panel busbar from manufacturer nameplate", unit: "Amperes" },
            { symbol: "I_main", label: "Main Supply OCPD", description: "Ampere rating of the primary utility overcurrent device", unit: "Amperes" },
            { symbol: "I_source", label: "Continuous Source Current", description: "Sum of continuous rated output currents from all interconnected generators/inverters", unit: "Amperes" },
            { symbol: "1.25", label: "Continuous Duty Factor", description: "Mandatory multiplier for continuous loads lasting 3+ hours (NEC 690.8 / 705.28)", unit: "dimensionless" },
            { symbol: "1.20", label: "Busbar Allowance Factor", description: "120% capacity allowance for opposite-end source interconnections", unit: "dimensionless" },
          ]}
          notes={[
            "Applies strictly when the backfed breaker is located at the opposite end of the busbar from the primary supply.",
            "Center-fed panels and alternate busbar configurations require separate evaluation under applicable NEC provisions.",
          ]}
        />

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "1.25rem",
            margin: "1.5rem 0",
          }}
        >
          <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem", color: "#38bdf8" }}>
            Why opposite-end placement matters for this calculation method
          </h3>
          <p style={{ fontSize: "0.88rem", margin: 0, lineHeight: 1.5, color: "var(--foreground)" }}>
            For this specific load-side 120% calculation method, the source connection is positioned at the opposite end
            of the busbar from the primary supply as required by the applicable configuration. The exact installation must
            satisfy the applicable NEC edition, panel construction, equipment listing, and manufacturer requirements.
          </p>
        </div>
      </section>

      {/* Section 2: Deterministic Panel Busbar Matrix (Table 1) */}
      <section id="busbar-matrix" style={{ marginTop: "3rem" }}>
        <h2>2. Deterministic Service Panel Busbar Calculation Matrix</h2>
        <p>
          The table below illustrates standard residential and light commercial single-phase 120/240V panel configurations,
          demonstrating the mathematical distinction between 120% calculation ceiling, allowable continuous source current,
          example source OCPD, and maximum AC power output.
        </p>

        <div
          style={{
            padding: "0.6rem 0.85rem",
            borderRadius: "6px",
            background: "rgba(234, 179, 8, 0.08)",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            fontSize: "0.82rem",
            color: "#fde047",
            marginBottom: "1rem",
          }}
        >
          ⚠️ <strong>Notice:</strong> Illustrative calculation examples — not a substitute for equipment-specific NEC
          verification, conductor ampacity calculations, or AHJ plan review.
        </div>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
                <th style={{ padding: "0.75rem 0.6rem" }}>Service Panel Rating</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Busbar Ampacity (<em>I</em><sub>bus</sub>)</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Main OCPD (<em>I</em><sub>main</sub>)</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>120% Calculation Limit</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Max Continuous Source Current</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Example Source OCPD</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Max Continuous AC Output (@ 240V)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>100A Standard</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>100 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>100 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>120 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>16.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>20 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>3.84 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>100A Service / 125A Bus</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>125 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>100 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>150 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>40.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>50 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>9.60 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>125A Standard</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>125 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>125 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>150 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>20.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>25 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>4.80 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>150A Standard</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>150 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>150 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>180 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>24.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>30 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>5.76 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>200A Standard</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>200 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>200 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>240 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>32.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>40 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>7.68 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>200A Service / 225A Bus (Solar-Ready)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>225 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>200 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>270 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>56.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>70 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>13.44 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>225A Standard</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>225 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>225 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>270 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>36.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>45 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>8.64 kW</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>400A (Class 320 Split Bus)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>400 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>400 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>480 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>64.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>80 A</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>15.36 kW</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Main-Breaker Derating Scenarios (Table 2) */}
      <section id="main-breaker-derate" style={{ marginTop: "3rem" }}>
        <h2>3. Main-Breaker Derating Scenarios &amp; Load Verification</h2>
        <p>
          When a homeowner requires a larger solar PV or battery storage capacity than the standard panel busbar permits
          (for example, installing an 11.5 kW inverter on a standard 200A panel with a 32A limit), installers often evaluate
          <strong> derating the main service breaker</strong>.
        </p>
        <p>
          Derating involves replacing the factory main breaker (e.g., 200A) with a lower standard rating (e.g., 175A or
          150A) while maintaining the original physical busbar rating (200A). This increases the mathematical difference
          between the 120% ceiling and the main supply.
        </p>

        <div
          style={{
            padding: "0.6rem 0.85rem",
            borderRadius: "6px",
            background: "rgba(234, 179, 8, 0.08)",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            fontSize: "0.82rem",
            color: "#fde047",
            marginBottom: "1rem",
          }}
        >
          ⚠️ <strong>Prerequisite Engineering Check:</strong> Main-breaker derating reduces the total electrical service
          capacity of the home. It is not an automatic solution and requires an NEC Article 220 dwelling load calculation.
        </div>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
                <th style={{ padding: "0.75rem 0.6rem" }}>Original Configuration</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Derated Main OCPD</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Busbar Rating</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>120% Bus Limit</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>New Max Continuous Current</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Illustrative Source OCPD</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Max Continuous AC Output</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Engineering Verification Requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>200A Main / 200A Bus</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#38bdf8", fontWeight: 600 }}>175 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>200 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>240 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>52.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>60 A illustrative source OCPD</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>12.48 kW (11.52 kW @ 60A)</td>
                <td style={{ padding: "0.65rem 0.6rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                  Requires NEC Article 220 load calculation and equipment/configuration verification
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>200A Main / 200A Bus</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#38bdf8", fontWeight: 600 }}>150 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>200 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>240 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>72.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>80 A illustrative source OCPD</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>17.28 kW (15.36 kW @ 80A)</td>
                <td style={{ padding: "0.65rem 0.6rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                  Requires NEC Article 220 load calculation and equipment/configuration verification
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>100A Main / 100A Bus</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#38bdf8", fontWeight: 600 }}>80 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>100 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>120 A</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "#4ade80", fontWeight: 600 }}>32.0 A</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>40 A illustrative source OCPD</td>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>7.68 kW</td>
                <td style={{ padding: "0.65rem 0.6rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                  Requires NEC Article 220 load calculation and equipment/configuration verification
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Interconnection Method Comparison (Table 3) */}
      <section id="interconnection-methods" style={{ marginTop: "3rem" }}>
        <h2>4. Electrical Interconnection Method Comparison</h2>
        <p>
          When the standard load-side 120% calculation cannot accommodate the planned solar PV array or battery storage
          system, electrical engineers and installers evaluate alternative interconnection architectures under the NEC.
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
                <th style={{ padding: "0.75rem 0.6rem" }}>Interconnection Method</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Governing Code</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Primary Capacity Constraints</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Panel Replacement Required?</th>
                <th style={{ padding: "0.75rem 0.6rem" }}>Typical Applications</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Load-Side 120% Connection</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC 705.12(B)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Busbar rating, main OCPD, opposite-end busbar positioning</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>No</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Systems sized within the busbar&apos;s remaining 120% calculation allowance (Example: 32 A continuous source at 240 V single-phase = 7.68 kW)
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Main-Breaker Derate</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC 705.12(B)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Busbar rating, derated main OCPD, NEC Article 220 load calculation</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>No (Breaker swap only)</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Moderate capacity expansion where dwelling load calculation supports a smaller main breaker
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Center-Fed Busbar Connection</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC 705.12(B)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Specific busbar layout rules, manufacturer listing, feeder/bus positioning</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Configuration dependent</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Service panels specifically listed or configured for center-fed interconnection architectures
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Supply-Side Connection (Line-Side Tap)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC 705.11</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Service entrance conductor ampacity, service equipment rating, utility rules</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>No (Avoids busbar calculation)</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Larger residential and commercial systems where busbar ampacity is heavily constrained
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Power Control System (PCS / EMS)</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC 705.13</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Controlled source output current, equipment listing, service limits, utility rules</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>No</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Co-located Solar PV + Battery Storage systems utilizing dynamic export power control
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(56, 189, 248, 0.03)" }}>
                <td style={{ padding: "0.65rem 0.6rem", fontWeight: 600 }}>Service Panel Upgrade</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>NEC Article 230 / 705</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Utility service ampacity, utility transformer capacity, service agreement</td>
                <td style={{ padding: "0.65rem 0.6rem" }}>Yes (Full panel replacement)</td>
                <td style={{ padding: "0.65rem 0.6rem", color: "var(--muted)" }}>
                  Older 100A panels undergoing whole-home electrification (EV charging, heat pumps, induction)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Complex Technical Nuances */}
      <section id="complex-configurations" style={{ marginTop: "3rem" }}>
        <h2>5. Complex Interconnection Configurations &amp; Code Nuances</h2>

        <div style={{ display: "grid", gap: "1.5rem", marginTop: "1rem" }}>
          {/* Center-Fed Panels */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "#38bdf8" }}>
              A. Center-Fed Service Panels
            </h3>
            <p style={{ fontSize: "0.88rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
              In center-fed panels, the primary utility main breaker feeds the middle of the busbar, with branch circuit
              breakers located both above and below it. Because load breakers draw current in both directions from the center,
              backfeeding power from an end breaker could cause current from the main breaker and the solar breaker to combine
              and overload the central busbar section.
            </p>
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--muted)", lineHeight: 1.5 }}>
              <strong>Code Application:</strong> Center-fed configurations have specific NEC requirements and limitations
              concerning where the source connection is made. Applicability of the 120% calculation depends on the exact
              busbar design, manufacturer listing instructions, and the governing NEC edition adopted by the AHJ.
            </p>
          </div>

          {/* Supply-Side Taps (NEC 705.11) */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "#38bdf8" }}>
              B. Supply-Side (Line-Side) Interconnection (NEC 705.11)
            </h3>
            <p style={{ fontSize: "0.88rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
              A supply-side connection taps the electrical service conductors between the utility meter base and the primary
              main service disconnect. Because power enters upstream of the service panel busbar, this method avoids the
              load-side 120% busbar calculation entirely.
            </p>
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--muted)", lineHeight: 1.5 }}>
              <strong>Code Application:</strong> A supply-side connection avoids the load-side busbar 120% calculation, but
              remains strictly subject to NEC 705.11 and applicable service equipment, conductor ampacity, overcurrent
              protection, equipment listing, and electric utility interconnection requirements.
            </p>
          </div>

          {/* Power Control Systems & EMS (NEC 705.13) */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "#38bdf8" }}>
              C. Power Control Systems &amp; Energy Management (NEC 705.13)
            </h3>
            <p style={{ fontSize: "0.88rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
              Modern clean energy installations frequently combine solar PV arrays with AC-coupled battery storage systems
              (such as Tesla Powerwall, Enphase IQ Battery, or SolarEdge Home Hub). If both systems export simultaneously at
              full capacity, their combined continuous currents could easily exceed standard 120% busbar limits.
            </p>
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--muted)", lineHeight: 1.5 }}>
              <strong>Code Application:</strong> Under NEC 705.13, certified Power Control Systems (PCS) and Energy Management
              Systems (EMS) actively monitor busbar current via current transformers (CTs) and dynamically throttle generation
              or battery discharge to ensure busbar and conductor ampacities are never exceeded. Dynamic source-current control
              is subject to applicable NEC 705.13 requirements, equipment listing (UL 9540 PCS), service limitations, and
              utility rules.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Cluster Mesh Cards */}
      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>6. Related Energy Planning Tools &amp; Calculators</h2>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
          Explore interconnected electrical, solar, battery, and EV charging calculation tools across PowerLab:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>☀️ Solar Panel Output Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate hourly and annual AC kilowatt-hour generation using NREL PVWatts V8 solar irradiance modeling.
            </p>
            <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Output Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>🚗 EV Charger Breaker Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Determine continuous-duty 125% breaker ampacity and copper wire gauge for Level 2 EV charging circuits.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Breaker Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>⚡ Voltage Drop &amp; Wire Size</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compute feeder voltage drop percentages and conductor resistance across residential circuit lengths.
            </p>
            <Link href="/battery/voltage-drop-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Voltage Drop Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>🔋 MPPT Charge Controller Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size charge controller ampacity, open-circuit voltage ceilings, and array temperature coefficients.
            </p>
            <Link href="/solar/solar-charge-controller-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Charge Controller Sizing →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" style={{ marginTop: "3.5rem" }}>
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1.25rem" }}>
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
              }}
            >
              <summary style={{ fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Disclaimer
        variant="safety"
        title="Busbar Sizing & Electrical Safety Notice"
        modelBasis="NFPA 70 (NEC) Article 705.12, 705.11, 705.13 & UL 1741"
      >
        This guide and its calculation models provide educational screening for solar and battery backfeed busbar ampacity.
        Model codes become legally enforceable when adopted or incorporated by the applicable jurisdiction, including applicable local amendments.
        Final system design, conductor sizing, overcurrent protection, and panel interconnections must be evaluated and
        verified against manufacturer listing instructions, formal NEC Article 220 load calculations, and utility interconnection rules, and be approved by the local Authority Having Jurisdiction (AHJ) and a licensed Professional Engineer.
      </Disclaimer>
    </article>
  );
}

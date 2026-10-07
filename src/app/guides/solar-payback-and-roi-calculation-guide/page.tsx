import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarPaybackCalculator } from "@/components/calculator/solar-payback-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { MathDisplay } from "@/components/common/math-display";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Payback Period & ROI Calculation Guide",
  description:
    "Engineering financial calculation guide: calculate solar payback periods, IRC Section 25D clean energy tax credit basis, utility tariff escalation, module degradation, and NEM 3.0 net billing cash flows.",
  canonicalPath: "/guides/solar-payback-and-roi-calculation-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the formula to calculate the simple and dynamic solar payback period?",
    answer: "Simple Payback Period (Years) = Net Capital Outlay ($) ÷ Year 1 Electricity Savings ($/Year), where Net Capital Outlay equals Gross Installation Cost minus eligible tax credits (such as the 30% IRC Section 25D credit) and local rebates. Dynamic Payback models annual solar production derated by panel degradation (~0.5%/year), compounding utility tariff escalation (~3.5%/year), and mid-life inverter replacement costs, identifying the point where cumulative net savings equals the initial net capital investment.",
  },
  {
    question: "What is a typical solar payback period in the United States?",
    answer: "In the United States, residential solar payback typically spans 6 to 9 years in regions with high retail utility rates ($0.22–$0.40/kWh) or 1:1 net metering policies (such as parts of the Northeast, Mid-Atlantic, and California when paired with battery storage). In areas with lower electricity rates ($0.11–$0.14/kWh) or net billing tariffs without storage, payback generally ranges from 9 to 13 years.",
  },
  {
    question: "How does the 30% Federal Clean Energy Tax Credit (IRC §25D) impact solar ROI?",
    answer: "Under the Inflation Reduction Act (Internal Revenue Code Section 25D), qualifying residential photovoltaic systems placed in service through 2032 are eligible for a 30% federal nonrefundable income tax credit on total equipment, permitting, and labor costs. On a $20,000 installation, a $6,000 tax credit reduces the net capital outlay to $14,000, shortening the modeled payback timeline by 2.5 to 4.0 years depending on local utility tariffs. Taxpayers must have sufficient tax liability to utilize the credit, with unused portions carrying forward under IRC §25D(c).",
  },
  {
    question: "How does California NEM 3.0 (Net Billing) impact solar payback without a battery?",
    answer: "Under legacy Net Energy Metering (NEM 1.0/2.0), exported solar electricity received full 1:1 retail rate credits. Under California's Net Billing Tariff (NEM 3.0 / CPUC Decision 22-12-056), daytime grid exports from new solar installations are compensated at wholesale avoided-cost rates averaging $0.04 to $0.08/kWh (roughly a 70%–80% reduction compared to retail rates). For standalone solar without energy storage, payback extends to 10–13 years. Pairing solar with a 10–15 kWh home battery enables self-consumption during expensive evening peak hours ($0.35–$0.55/kWh), bringing modeled payback back down to 6.5–8.5 years.",
  },
  {
    question: "How does solar panel degradation affect 25-year cumulative savings?",
    answer: "Tier-1 monocrystalline silicon photovoltaic modules exhibit typical degradation rates of approximately 0.4% to 0.5% per year after an initial year-one stabilization of 1.0% to 2.0% (guaranteeing ≥80% to 88% nameplate output at Year 25 per manufacturer linear performance warranties and IEC 61215 standards). Modeling 0.5% annual degradation reduces projected 25-year cumulative energy yield by approximately 6% compared to a static model, ensuring defensible financial projections.",
  },
  {
    question: "Are inverter replacement costs included in the 25-year financial model?",
    answer: "Yes. While photovoltaic modules carry 25-year warranties, central string inverters typically feature expected operating lifespans of 10 to 15 years. PowerLab's dynamic financial model includes an explicit mid-life inverter replacement reserve (defaulting to $1,800 at Year 13), deducting this capital expenditure from Year 13 cash flows to provide an accurate 25-year net benefit and ROI projection.",
  },
];

export default function SolarPaybackGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Solar Payback Period & Net Metering ROI Financial Guide",
    description: "Engineering financial calculation guide: calculate solar payback periods, IRC Section 25D clean energy tax credit basis, utility tariff escalation, photovoltaic module degradation, and NEM 3.0 cash flows.",
    route: "/guides/solar-payback-and-roi-calculation-guide",
    datePublished: "2026-08-31",
    dateModified: "2026-09-30",
    categoryName: "Solar Photovoltaics",
    categoryRoute: "/solar",
    standards: [
      "Internal Revenue Code (IRC) Section 25D: Residential Clean Energy Credit (Public Law 117-169)",
      "NREL System Advisor Model (SAM): Photovoltaic Financial and Performance Methodology",
      "California Public Utilities Commission (CPUC) Decision 22-12-056: Net Billing Tariff (NEM 3.0)",
      "U.S. Energy Information Administration (EIA): Electric Power Monthly Retail Tariff Data",
      "IEC 61215: Terrestrial Photovoltaic (PV) Modules Design Qualification and Type Approval",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Payback &amp; ROI Guide</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">Photovoltaic Financial Modeling &amp; ROI Engineering</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>Solar Payback Period &amp; Net Metering ROI Financial Guide</h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)" }}>
          An educational engineering and financial breakdown of residential photovoltaic investments. Learn how to calculate net capital basis under the 30% Federal Clean Energy Tax Credit (IRC §25D), project compound utility tariff escalation, incorporate ~0.5%/year panel degradation, evaluate net billing vs. 1:1 net metering, and project 25-year cumulative net benefits.
        </p>
      </header>

      <DirectAnswerCard
        keyword="solar payback period formula"
        answer="The solar payback period formula determines the number of years required for cumulative electricity bill savings to equal the net upfront cost of a solar installation. For a standard 8 kW system ($20,000 gross with a 30% tax credit = $14,000 net capital outlay) producing 9,600 kWh/yr at $0.18/kWh with 3.5% annual utility escalation and 0.5%/yr degradation, Year 1 savings is $1,728 and modeled dynamic payback is reached at 7.4 Years (7 Years, 4 Months), generating over $47,000 in 25-year net benefit."
        formula="Payback (years) = Time (t) where Cumulative_Net_Savings(t) ≥ C_net"
        condition="C_net = C_gross - Tax_Credits - Direct_Rebates"
        standardExample="8 kW System @ $20,000 gross - $6,000 (30% IRC §25D credit) = $14,000 net capital outlay. Year 1 generation of 9,600 kWh @ $0.18/kWh yields $1,728 savings. Cumulative savings reach $13,236 by Year 7, covering the remaining $764 in Month 4 of Year 8 (7.4 Years modeled dynamic payback)."
        sourceAuthority="IRS IRC §25D (Public Law 117-169), NREL SAM Financial Methodology & U.S. EIA Data"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Interactive Solar Payback &amp; 25-Year Cash Flow Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Input your gross system cost, federal/state tax incentives, estimated annual kWh yield, and local electricity rate to model 25-year cumulative cash flows and projected payback timing.
          </p>
        </div>
        <SolarPaybackCalculator />
      </section>

      {/* Section 1: The Financial Mechanics */}
      <section id="physics-and-formulas" style={{ marginTop: "2.5rem" }}>
        <div id="how-to-guide">
          <h2>1. The Financial Architecture of Residential Solar Photovoltaics</h2>
          <p>
            Evaluating a rooftop photovoltaic installation requires viewing solar panels not as an expense, but as a <strong>capital asset generating an inflation-hedged stream of avoided utility costs</strong>. Unlike consumer goods that depreciate immediately, grid-tied PV systems generate electricity that displaces utility grid purchases every hour the sun shines.
          </p>

          <h3>Net Installed Capital Outlay (<em>C</em><sub>net</sub>)</h3>
          <p>
            Gross turn-key installation pricing includes PV modules, racking, inverters, balance of system (BOS) wiring, permit fees, and electrical labor. The net basis is calculated after subtracting direct incentives:
          </p>
          <MathDisplay
            title="Net Installed Capital Cost"
            copyText="C_net = C_gross - (C_gross * ITC_rate) - Rebates_direct"
            benchmark="Gross turnkey cost minus 30% Federal Clean Energy Credit (IRC §25D) and direct rebates"
          >
            C_net = C_gross - (C_gross × Tax_Credit_Rate) - Rebates_direct
          </MathDisplay>
          <p>
            Under the <strong>Inflation Reduction Act (Internal Revenue Code Section 25D)</strong>, the Federal Residential Clean Energy Credit is set at <strong>30% for systems placed in service from 2022 through 2032</strong> (stepping down to 26% in 2033 and 22% in 2034). This is a nonrefundable federal income tax credit, not a point-of-sale instant cash rebate. Taxpayers must have sufficient federal tax liability to claim the credit, with unused portions carrying forward under IRC §25D(c).
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            <em>Tax Disclaimer:</em> This guide provides educational modeling based on federal statute. Individual eligibility depends on tax liability, filing status, and specific installation factors. Consult a qualified CPA or tax professional for individual tax advice.
          </p>
        </div>
      </section>

      {/* Section 2: Mathematical Formulas & Cash Flow Modeling */}
      <section id="formula-math" style={{ marginTop: "2.5rem" }}>
        <div id="mathematical-formulas">
          <h2>2. Mathematical Formulas: Simple Payback vs. Dynamic Cash Flow Modeling</h2>
          <p>
            While simple payback (<em>C</em><sub>net</sub> / <em>S</em><sub>1</sub>) provides a rough initial screening, dynamic engineering financial models account for three critical variables: <strong>annual panel degradation</strong>, <strong>compound utility tariff escalation</strong>, and <strong>mid-life inverter replacement</strong>.
          </p>

          <FormulaCard
            title="Dynamic Year-by-Year Solar Cash Flow Equation"
            formula="Net Savings (Year t) = [ Yield_0 × (1 - d)^(t-1) ] × [ Rate_0 × (1 + i)^(t-1) ] - Inverter_Expense(t)"
            latexFormula="S_t = \left[ Y_0 \cdot (1 - d)^{t-1} \right] \cdot \left[ R_0 \cdot (1 + i)^{t-1} \right] - E_{\text{inverter}}(t)"
            formulaDescription="Calculates net dollar savings generated in year t, factoring in exponential panel degradation, compound utility rate escalation, and scheduled inverter replacement."
            variables={[
              { symbol: "S_t", label: "Annual Net Savings", description: "Net financial savings generated in year t", unit: "$" },
              { symbol: "Y_0", label: "Year 1 Solar Yield", description: "First-year total array energy production", unit: "kWh/yr" },
              { symbol: "d", label: "Annual Degradation Rate", description: "Photovoltaic module power output loss per year (typically 0.005 / 0.5%)", unit: "% / 100" },
              { symbol: "R_0", label: "Baseline Electricity Rate", description: "Initial utility retail rate or effective displaced rate", unit: "$/kWh" },
              { symbol: "i", label: "Utility Escalation Rate", description: "Projected electricity tariff compound annual growth rate (typically 3.0%–4.5%)", unit: "% / 100" },
              { symbol: "E_inverter", label: "Inverter Replacement Reserve", description: "Mid-life inverter replacement cost at Year 10–15 ($0 in other years)", unit: "$" },
            ]}
            notes={[
              "Modeled Breakeven Year occurs when cumulative net savings Σ(S_t) from t=1 to n equals initial net capital outlay C_net.",
              "Module degradation is based on IEC 61215 and typical manufacturer linear warranties guaranteeing ≥80%–88% output at Year 25.",
              "Utility escalation reflects U.S. EIA historical 20-year retail price compound annual growth rate (CAGR).",
            ]}
            citationTitle="Deterministic Financial Modeling for Residential Distributed Energy Resources"
            standardAuthority="IRS IRC §25D / NREL SAM / U.S. EIA"
          />

          <h3>25-Year Net Benefit &amp; Simple Return on Investment (ROI)</h3>
          <p>
            Over a standard 25-year analysis horizon, the total modeled financial return is defined by comparing cumulative 25-year net savings (after all inverter expenses) against the net capital outlay:
          </p>
          <MathDisplay
            title="25-Year Net Benefit & ROI Formula"
            copyText="Net_Benefit_25yr = Cumulative_Savings_25yr - C_net | Simple_ROI = (Net_Benefit_25yr / C_net) * 100%"
            benchmark="Simple ROI is 25-year cumulative net benefit divided by initial net capital outlay"
          >
            {"25-Year Net Benefit = Σ(S_t for t=1..25) - C_net   |   Simple ROI = (25-Year Net Benefit / C_net) × 100%"}
          </MathDisplay>
        </div>
      </section>

      {/* Section 3: Net Metering Tariffs */}
      <section id="net-metering-tariffs" style={{ marginTop: "2.5rem" }}>
        <h2>3. Net Metering 1.0/2.0 vs. California NEM 3.0 Net Billing Economics</h2>
        <p>
          The regulatory framework governing how utilities credit solar electricity exported to the grid is a major driver of solar financial returns:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                <th style={{ padding: "0.75rem" }}>Tariff Structure</th>
                <th style={{ padding: "0.75rem" }}>Export Credit Valuation</th>
                <th style={{ padding: "0.75rem" }}>Standalone Solar Payback</th>
                <th style={{ padding: "0.75rem" }}>Solar + Battery Payback</th>
                <th style={{ padding: "0.75rem" }}>Recommended System Strategy</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>1:1 Retail Net Metering (Traditional NEM)</td>
                <td style={{ padding: "0.75rem" }}>Full 1:1 Retail Rate ($0.15–$0.35/kWh)</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.5 – 8.0 Years</td>
                <td style={{ padding: "0.75rem" }}>8.5 – 11.5 Years</td>
                <td style={{ padding: "0.75rem" }}>Size for 100% of annual household kWh consumption.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>California NEM 3.0 (Net Billing Tariff)</td>
                <td style={{ padding: "0.75rem" }}>Avoided Cost Wholesale ($0.04–$0.08/kWh)</td>
                <td style={{ padding: "0.75rem", color: "#ea580c", fontWeight: 700 }}>10.0 – 13.0 Years</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>6.5 – 8.5 Years</td>
                <td style={{ padding: "0.75rem" }}>Pair with 10–15 kWh storage; self-consume 80%+ of PV generation to avoid peak rates.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Zero-Export / Buy-All Sell-All</td>
                <td style={{ padding: "0.75rem" }}>$0.00 or Wholesale Capacity Rate</td>
                <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>12.0 – 16.0 Years</td>
                <td style={{ padding: "0.75rem" }}>7.5 – 10.0 Years</td>
                <td style={{ padding: "0.75rem" }}>Size array to match daytime baseload and buffer with BESS.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
          <em>Modeling Note:</em> PowerLab&apos;s baseline screening calculator models full electricity value displacement (representative of 1:1 net metering or high self-consumption solar + storage configurations). Under standalone solar on avoided-cost net billing tariffs without batteries, export savings will be lower.
        </p>
      </section>

      {/* Section 4: National State-by-State Solar Payback Matrix */}
      <section id="sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <div id="state-benchmarks">
          <h2>4. Representative Regional Sunlight &amp; Utility Tariff Benchmarks</h2>
          <p>
            Solar payback varies across regions due to two primary drivers: <strong>daily solar resource (Peak Sun Hours)</strong> and <strong>local utility retail electricity rates</strong>:
          </p>

          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                  <th style={{ padding: "0.75rem" }}>Representative Location</th>
                  <th style={{ padding: "0.75rem" }}>Avg. Daily Sun Hours*</th>
                  <th style={{ padding: "0.75rem" }}>Avg. Grid Rate**</th>
                  <th style={{ padding: "0.75rem" }}>Modeled 8 kW Yield</th>
                  <th style={{ padding: "0.75rem" }}>Net Cost (30% Credit)</th>
                  <th style={{ padding: "0.75rem" }}>Modeled Payback Range</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>California (Los Angeles Basin)</td>
                  <td style={{ padding: "0.75rem" }}>5.4 hrs/day</td>
                  <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.34 – $0.44/kWh</td>
                  <td style={{ padding: "0.75rem" }}>12,600 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.5 – 7.2 Years (with BESS)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Massachusetts (Greater Boston)</td>
                  <td style={{ padding: "0.75rem" }}>4.2 hrs/day</td>
                  <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.29 – $0.34/kWh</td>
                  <td style={{ padding: "0.75rem" }}>9,800 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.5 – 6.8 Years (SMART Incentives)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Texas (Houston / Dallas)</td>
                  <td style={{ padding: "0.75rem" }}>5.2 hrs/day</td>
                  <td style={{ padding: "0.75rem" }}>$0.14 – $0.17/kWh</td>
                  <td style={{ padding: "0.75rem" }}>12,100 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem" }}>7.5 – 9.2 Years</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Florida (Orlando / Tampa)</td>
                  <td style={{ padding: "0.75rem" }}>5.3 hrs/day</td>
                  <td style={{ padding: "0.75rem" }}>$0.15 – $0.18/kWh</td>
                  <td style={{ padding: "0.75rem" }}>12,400 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem" }}>7.0 – 8.8 Years</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Arizona (Phoenix Metro)</td>
                  <td style={{ padding: "0.75rem" }}>6.1 hrs/day</td>
                  <td style={{ padding: "0.75rem" }}>$0.13 – $0.16/kWh</td>
                  <td style={{ padding: "0.75rem" }}>14,200 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem" }}>6.8 – 8.2 Years</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>Washington (Seattle Metro)</td>
                  <td style={{ padding: "0.75rem" }}>3.7 hrs/day</td>
                  <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.10 – $0.12/kWh</td>
                  <td style={{ padding: "0.75rem" }}>8,600 kWh/yr</td>
                  <td style={{ padding: "0.75rem" }}>$14,000</td>
                  <td style={{ padding: "0.75rem", color: "#ea580c" }}>12.0 – 14.5 Years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
            *Peak Sun Hours (PSH, kWh/m²/day) represents the equivalent daily hours of standard test condition solar irradiance (1,000 W/m²), based on NREL National Solar Radiation Database averages. It is distinct from total daylight hours.<br />
            **Retail rates reflect U.S. EIA Electric Power Monthly state residential averages.
          </p>
        </div>
      </section>

      {/* Section 5: Step-by-Step Worked Example */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <div id="worked-examples">
          <h2>5. Step-by-Step Worked Case Study: 8.0 kW Residential PV System</h2>
          <p>
            The following progression illustrates the dynamic cash flow calculation for a representative 8.0 kW residential array ($20,000 gross cost @ $2.50/W, 30% tax credit = $14,000 net outlay):
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.25rem", margin: "1rem 0" }}>
            <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>Baseline Model Assumptions:</h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6, fontSize: "0.95rem" }}>
              <li><strong>Gross Installation Cost:</strong> $20,000 ($2.50/Watt turn-key)</li>
              <li><strong>Federal Tax Credit (30%):</strong> -$6,000 (IRC Section 25D)</li>
              <li><strong>Net Capital Outlay (<em>C</em><sub>net</sub>):</strong> $14,000</li>
              <li><strong>Year 1 Solar Generation:</strong> 9,600 kWh (1,200 kWh/kW specific yield)</li>
              <li><strong>Utility Electricity Tariff:</strong> $0.1800/kWh with 3.5% compound annual escalation</li>
              <li><strong>Annual Panel Degradation:</strong> 0.5%/year ($d = 0.005$)</li>
              <li><strong>Inverter Replacement Reserve:</strong> $1,800 at Year 13</li>
            </ul>
          </div>

          <h3>Year-by-Year Financial Progression:</h3>
          <div style={{ overflowX: "auto", margin: "1.25rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                  <th style={{ padding: "0.6rem" }}>Year</th>
                  <th style={{ padding: "0.6rem" }}>Solar Yield</th>
                  <th style={{ padding: "0.6rem" }}>Utility Rate</th>
                  <th style={{ padding: "0.6rem" }}>Gross Savings</th>
                  <th style={{ padding: "0.6rem" }}>Inverter Expense</th>
                  <th style={{ padding: "0.6rem" }}>Net Annual</th>
                  <th style={{ padding: "0.6rem" }}>Cumulative Net</th>
                  <th style={{ padding: "0.6rem" }}>Status vs. Net Outlay ($14k)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 1</td>
                  <td style={{ padding: "0.6rem" }}>9,600 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.1800/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$1,728</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$1,728</td>
                  <td style={{ padding: "0.6rem" }}>$1,728</td>
                  <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$12,272 remaining</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 3</td>
                  <td style={{ padding: "0.6rem" }}>9,504 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.1928/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$1,832</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$1,832</td>
                  <td style={{ padding: "0.6rem" }}>$5,340</td>
                  <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$8,660 remaining</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 5</td>
                  <td style={{ padding: "0.6rem" }}>9,409 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.2066/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$1,944</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$1,944</td>
                  <td style={{ padding: "0.6rem" }}>$9,172</td>
                  <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$4,828 remaining</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 7</td>
                  <td style={{ padding: "0.6rem" }}>9,316 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.2213/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$2,062</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$2,062</td>
                  <td style={{ padding: "0.6rem" }}>$13,236</td>
                  <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$764 remaining</td>
                </tr>
                <tr style={{ borderBottom: "2px solid #16a34a", background: "rgba(22, 163, 74, 0.08)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700, color: "#16a34a" }}>Year 8 (Breakeven 🎉)</td>
                  <td style={{ padding: "0.6rem" }}>9,269 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.2290/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$2,123</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$2,123</td>
                  <td style={{ padding: "0.6rem", fontWeight: 700, color: "#16a34a" }}>$15,359</td>
                  <td style={{ padding: "0.6rem", color: "#16a34a", fontWeight: 700 }}>+$1,359 Net Benefit (7.4 Years)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 13</td>
                  <td style={{ padding: "0.6rem" }}>9,040 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.2721/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$2,460</td>
                  <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$1,800</td>
                  <td style={{ padding: "0.6rem" }}>$660</td>
                  <td style={{ padding: "0.6rem" }}>$26,081</td>
                  <td style={{ padding: "0.6rem", color: "#16a34a" }}>+$12,081 Net Benefit</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 25 (Final)</td>
                  <td style={{ padding: "0.6rem" }}>8,514 kWh</td>
                  <td style={{ padding: "0.6rem" }}>$0.4111/kWh</td>
                  <td style={{ padding: "0.6rem" }}>$3,500</td>
                  <td style={{ padding: "0.6rem" }}>$0</td>
                  <td style={{ padding: "0.6rem" }}>$3,500</td>
                  <td style={{ padding: "0.6rem", fontWeight: 700 }}>$61,061</td>
                  <td style={{ padding: "0.6rem", color: "#16a34a", fontWeight: 700 }}>+$47,061 Net Benefit (336% ROI)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            <em>Reconciliation:</em> At the end of Year 7, cumulative net savings is $13,236. To reach the $14,000 net capital outlay, $764 is needed from Year 8 savings ($2,123). $764 ÷ $2,123 = 0.36 years (~4.3 months), establishing a modeled payback period of <strong>7.4 Years</strong> (7 Years, 4 Months). Total 25-year gross electric savings ($62,861) minus Year 13 inverter expense ($1,800) equals <strong>$61,061 in cumulative net savings</strong>, yielding <strong>+$47,061 in 25-year net benefit</strong> (336% simple ROI on the $14,000 net capital outlay).
          </p>
        </div>
      </section>

      {/* Section 6: Key Rules of Thumb */}
      <section id="rules-of-thumb" style={{ marginTop: "2.5rem" }}>
        <h2>6. Engineering &amp; Financial Considerations for Maximizing Solar ROI</h2>
        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Target Competitive Turn-Key Pricing:</strong> High upfront cost is the single largest factor lengthening payback periods. Bids exceeding $3.20/Watt for standard rooftop residential arrays extend payback timelines unnecessarily.</li>
          <li><strong>Prioritize True South-Facing Azimuth (180° in Northern Hemisphere):</strong> South-facing arrays optimize annual kWh production, whereas west-facing arrays can maximize late-afternoon generation under time-of-use (TOU) tariffs.</li>
          <li><strong>Optimize Tilt for Year-Round Yield:</strong> Aligning panel tilt to match latitude optimizes total annual energy harvest (see our <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide">Solar Panel Tilt Angle Guide</Link>).</li>
          <li><strong>Evaluate Storage Under Net Billing Tariffs:</strong> In jurisdictions with wholesale avoided-cost export compensation (such as California NEM 3.0), adding 10–15 kWh of battery storage allows storing daytime solar to offset high evening grid consumption, preserving favorable payback timelines.</li>
        </ul>

        <StandardsBadge category="solar" />
      </section>

      {/* Section 7: FAQs */}
      <section id="faq-section" style={{ marginTop: "3rem" }}>
        <div id="faqs">
          <h2>Frequently Asked Questions About Solar Payback &amp; ROI</h2>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {FAQS.map((faq, idx) => (
              <details key={idx} style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
                <summary style={{ fontWeight: 700, cursor: "pointer", color: "var(--brand-strong)", fontSize: "1.02rem" }}>
                  {faq.question}
                </summary>
                <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--ink)", fontSize: "0.95rem" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Related Calculators & Planning Paths */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Connected Solar Photovoltaic Engineering &amp; Financial Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Integrate your payback projections with PowerLab&apos;s connected clean energy calculation engines:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>☀️ Solar Panel Output Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model daily, monthly, and annual kilowatt-hour generation with regional peak sun hours and system derate factors.
            </p>
            <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Calculate Solar Output →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📐 Solar System Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size your DC kW array to offset target household electricity consumption based on monthly utility bills.
            </p>
            <Link href="/solar/solar-panel-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Panel Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Solar Battery Bank Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate usable battery storage capacity (kWh &amp; Ah) for off-grid autonomy or NEM 3.0 peak rate shifting.
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Battery Bank Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🌐 Optimal Solar Panel Tilt</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Determine seasonal and year-round tilt angles based on geographic latitude and solar irradiance geometry.
            </p>
            <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Panel Tilt Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Home Battery Size Calculator</Link>
          <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Electricity Usage Calculator</Link>
          <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Solar Tilt Angle Guide</Link>
          <Link href="/guides/mppt-solar-charge-controller-sizing-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>MPPT Controller Sizing Guide</Link>
        </div>
      </section>

      {/* Section 9: Methodology & Sources */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards References</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          The calculation models in this guide are derived from the following statutory tax codes, regulatory decisions, and reference models:
        </p>
        <ul style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)", paddingLeft: "1.25rem", margin: "0.75rem 0 1.25rem" }}>
          <li><strong>Internal Revenue Code (IRC) Section 25D:</strong> Governs the 30% Federal Residential Clean Energy Credit established under the Inflation Reduction Act of 2022 (Public Law 117-169).</li>
          <li><strong>NREL System Advisor Model (SAM):</strong> Provides the benchmark mathematical framework for cash flow discounting, panel degradation modeling, and energy yield calculation.</li>
          <li><strong>California Public Utilities Commission (CPUC) Decision 22-12-056:</strong> Defines the Net Billing Tariff (NEM 3.0) and hourly Avoided Cost Calculator (ACC) export compensation values for California IOUs.</li>
          <li><strong>U.S. Energy Information Administration (EIA):</strong> Source for state-by-state average residential retail electricity rates from the Electric Power Monthly.</li>
          <li><strong>IEC 61215:</strong> Design qualification standard establishing baseline reliability and performance criteria for terrestrial crystalline silicon photovoltaic modules.</li>
        </ul>

        <Disclaimer
          variant="standard"
          title="Solar Economic Screening Notice"
          modelBasis="IRC Section 25D, NREL SAM Framework & CPUC Decision 22-12-056"
        >
          This guide provides screening-level financial modeling calculations. Actual solar electricity savings, payback period, and return on investment depend on local solar resource, roof azimuth, shading, specific utility tariff rate structures, future electricity rate inflation, equipment degradation, and individual tax credit eligibility. Consult a qualified CPA or tax professional for tax determinations.
        </Disclaimer>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <AcademicCitationModal
          title="Solar Payback Period & Net Metering ROI Financial Guide"
          urlPath="/guides/solar-payback-and-roi-calculation-guide"
        />
      </div>
    </article>
  );
}


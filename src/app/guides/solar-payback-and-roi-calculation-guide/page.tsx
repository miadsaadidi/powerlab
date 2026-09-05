import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarPaybackCalculator } from "@/components/calculator/solar-payback-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Payback Period & ROI Calculation Guide",
  description: "Master solar payback period and ROI formulas. Learn how to calculate net system costs, 30% ITC tax credits, panel degradation, NEM 3.0, and 25-year cash flows.",
  canonicalPath: "/guides/solar-payback-and-roi-calculation-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the formula to calculate the simple solar payback period?",
    answer: "The simple solar payback period formula is: Payback Period (Years) = Net System Cost ($) ÷ Annual Electricity Savings ($/Year), where Net System Cost equals Gross Installed Cost minus the 30% Federal Investment Tax Credit (ITC) and local rebates. Annual Savings equals Annual Solar Yield (kWh) × Utility Electricity Rate ($/kWh).",
  },
  {
    question: "What is a good or average solar payback period in the United States?",
    answer: "In the United States, an average residential solar payback period ranges between 6 to 9 years for grid-tied systems under favorable net metering or high utility rates (such as California, Massachusetts, and New York). In regions with cheap grid electricity ($0.11–$0.13/kWh) or net billing policies without battery storage, payback spans 9 to 13 years.",
  },
  {
    question: "How does the 30% Federal Clean Energy Tax Credit (ITC) affect solar ROI?",
    answer: "Under the Inflation Reduction Act (IRC Section 25D), qualifying residential solar photovoltaic systems receive a 30% federal nonrefundable tax credit on total equipment and labor costs. On a $24,000 installation, the $7,200 tax credit reduces the out-of-pocket net basis to $16,800, shortening the payback period by 3.2 to 4.5 years.",
  },
  {
    question: "How does NEM 3.0 (Net Billing) impact solar payback without a battery?",
    answer: "Under legacy Net Energy Metering (NEM 1.0/2.0), solar exported to the grid received 1:1 retail rate credits ($0.30–$0.40/kWh). Under NEM 3.0 (California and similar net billing tariffs), daytime grid exports are compensated at wholesale 'avoided cost' rates averaging only $0.05 to $0.08/kWh (a ~75% reduction). Without a home battery to store daytime excess for evening consumption, solar payback extends from ~6 years to 10–12 years.",
  },
  {
    question: "How does solar panel degradation affect 25-year lifetime savings?",
    answer: "Tier-1 monocrystalline solar panels degrade at an average rate of 0.5% per year (with an initial first-year degradation of ~1.5% to 2.0%). Over a 25-year warrantied lifespan, the array produces approximately 88% to 90% of its initial year-one annual kWh output. Financial models that ignore degradation overestimate 25-year cumulative cash flows by 5% to 7%.",
  },
  {
    question: "Should inverter replacement costs be factored into the payback equation?",
    answer: "Yes. While solar panels carry 25-year power output warranties, central string inverters typically have an operating lifespan of 10 to 15 years and cost $1,500 to $2,500 to replace. Microinverters (like Enphase IQ8) carry 25-year warranties, eliminating this mid-life capital expense at the expense of higher upfront initial installation cost.",
  },
];

export default function SolarPaybackGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Solar Payback Period & Net Metering ROI Financial Guide",
    description: "Definitive financial engineering guide: calculate solar payback period, 30% ITC tax credits, compound utility escalation, panel degradation, and NEM 3.0 cash flows.",
    route: "/guides/solar-payback-and-roi-calculation-guide",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    categoryName: "Solar Photovoltaics",
    categoryRoute: "/solar",
    standards: [
      "NREL System Advisor Model (SAM) Financial Engine",
      "Internal Revenue Code (IRC) Section 25D (Residential Clean Energy Credit)",
      "IEEE Standard 1547 (Interconnection and Interoperability with Grid)",
      "IEC 61724-1 (Photovoltaic System Performance Monitoring)",
      "California Public Utilities Commission (CPUC) Decision 22-12-056 (NEM 3.0 / Net Billing)",
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
          A rigorous financial and engineering breakdown of residential photovoltaic investments. Learn how to calculate net capital basis after the 30% Federal ITC, project compound utility tariff inflation, account for 0.5%/year panel degradation, model NEM 3.0 avoided cost tariffs, and calculate exact breakeven timelines and 25-year net profit.
        </p>
      </header>

      <DirectAnswerCard
        keyword="solar payback period formula"
        answer="The solar payback period formula determines the number of years required for cumulative electricity bill savings to equal the net upfront cost of a solar installation. At the U.S. average electricity rate ($0.16/kWh) and typical $2.80/W turn-key pricing with the 30% Federal Tax Credit, average residential solar payback spans 6.5 to 8.5 years, generating 150% to 300% 25-year lifetime ROI."
        formula="Payback (Years) = Net System Cost ($) ÷ Annual Savings ($) · Net Cost = Gross Cost × (1 - ITC Tax Credit %)"
        standardExample="8 kW System @ $22,400 gross - $6,720 (30% ITC) = $15,680 net. Annual production of 11,200 kWh @ $0.17/kWh yields $1,904 Year 1 savings. Simple Payback = $15,680 ÷ $1,904 = 8.23 Years (7.4 Years with 3.5% annual utility rate escalation)."
        sourceAuthority="NREL System Advisor Model (SAM), IRS IRC Section 25D & CPUC NEM 3.0 Valuation"
      />

      <PageJumpNav />

      {/* Interactive Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Solar Payback &amp; 25-Year ROI Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Input your gross system cost, federal/state tax incentives, estimated annual kWh yield, and local electricity rate to generate an interactive 25-year cumulative cash flow matrix and exact month of breakeven.
          </p>
        </div>
        <SolarPaybackCalculator />
      </section>

      {/* Section 1: The Financial Mechanics */}
      <section id="physics-and-formulas" style={{ marginTop: "2.5rem" }}>
        <h2>1. The Financial Architecture of Residential Solar Photovoltaics</h2>
        <p>
          Evaluating a rooftop photovoltaic installation requires viewing solar panels not as an expense, but as a <strong>capital asset generating an inflation-hedged revenue stream</strong>. Unlike consumer electronics or automobiles that depreciate immediately, grid-tied PV systems generate electricity that displaces utility grid purchases every hour the sun shines.
        </p>

        <h3>Net Installed Capital Cost ($C_{`\\text{net}`}$)</h3>
        <p>
          Gross turn-key installation pricing includes PV modules, racking, inverters, balance of system (BOS) wiring, permit fees, and master electrician labor. The net basis is calculated after subtracting direct incentives:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`C_net = C_gross - (C_gross × ITC_rate) - Rebates_state - SREC_upfront`}</code>
        </pre>
        <p>
          Under the <strong>Inflation Reduction Act (IRC Section 25D)</strong>, the Federal Residential Clean Energy Credit is fixed at <strong>30% through 2032</strong> (stepping down to 26% in 2033 and 22% in 2034). This tax credit applies to the full gross cost of the solar hardware, electrical service panel upgrades required for interconnection, and installation labor.
        </p>
      </section>

      {/* Section 2: Mathematical Formulas & Cash Flow Modeling */}
      <section id="mathematical-formulas" style={{ marginTop: "2.5rem" }}>
        <h2>2. Mathematical Formulas: Simple Payback vs. Dynamic Discounted Cash Flow</h2>
        <p>
          While back-of-the-napkin estimates rely on Simple Payback, true engineering financial models account for three critical dynamic variables: <strong>annual panel degradation</strong>, <strong>compound utility tariff inflation</strong>, and <strong>mid-life inverter replacement</strong>.
        </p>

        <FormulaCard
          title="Dynamic Year-by-Year Solar Cash Flow Equation"
          formula="Net Savings (Year t) = [Yield_0 × (1 - d)^(t-1)] × [Rate_0 × (1 + i)^(t-1)] - Inverter_Expense(t)"
          latexFormula="S_t = \left[ Y_0 \cdot (1 - d)^{t-1} \right] \cdot \left[ R_0 \cdot (1 + i)^{t-1} \right] - E_{\text{inverter}}(t)"
          formulaDescription="Calculates the exact net dollar savings generated in year t, factoring in exponential panel degradation and compound utility rate escalation."
          variables={[
            { symbol: "S_t", label: "Annual Net Savings", description: "Net financial savings generated in year t", unit: "$" },
            { symbol: "Y_0", label: "Year 1 Solar Yield", description: "First-year total array energy production", unit: "kWh/yr" },
            { symbol: "d", label: "Annual Degradation Rate", description: "Silicon PV power output loss per year (typically 0.005)", unit: "% / 100" },
            { symbol: "R_0", label: "Baseline Electricity Rate", description: "Initial utility retail rate or avoided export value", unit: "$/kWh" },
            { symbol: "i", label: "Utility Inflation Rate", description: "Historical electricity tariff compound escalation (typically 3.0%–4.5%)", unit: "% / 100" },
            { symbol: "E_inverter", label: "Inverter Replacement Expense", description: "Mid-life inverter replacement cost at year 12–15 ($0 in other years)", unit: "$" },
          ]}
          notes={[
            "Exact Breakeven Year occurs when cumulative savings Σ(S_t) from t=1 to n equals C_net.",
            "Panel degradation standard according to IEC 61215 is ≤ 0.5% per annum for Tier-1 N-type TOPCon and heterojunction (HJT) panels.",
            "Utility escalation reflects U.S. EIA historical 20-year retail price compound annual growth rate (CAGR).",
          ]}
          citationTitle="Deterministic Financial Modeling for Residential Distributed Energy Resources"
          standardAuthority="NREL SAM / IRS IRC Section 25D / IEC 61724"
        />

        <h3>Lifetime Net Profit &amp; Simple Return on Investment (ROI)</h3>
        <p>
          Over a standard 25-year warranty period, total return on investment is defined by comparing cumulative net lifetime savings against the initial net capital investment:
        </p>
        <pre className="math-block" style={{ padding: "1rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto" }}>
          <code>{`Lifetime Net Profit ($) = Total 25-Year Cumulative Savings - Net Initial Cost
ROI (%) = (Lifetime Net Profit ÷ Net Initial Cost) × 100%`}</code>
        </pre>
      </section>

      {/* Section 3: Net Metering 1.0/2.0 vs. NEM 3.0 */}
      <section id="net-metering-tariffs" style={{ marginTop: "2.5rem" }}>
        <h2>3. Net Metering 1.0/2.0 vs. NEM 3.0 Net Billing Economics</h2>
        <p>
          The regulatory framework governing how your utility credits excess daytime solar production is the single largest external variable impacting financial ROI:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                <th style={{ padding: "0.75rem" }}>Tariff Structure</th>
                <th style={{ padding: "0.75rem" }}>Export Credit Valuation</th>
                <th style={{ padding: "0.75rem" }}>Standalone Solar Payback</th>
                <th style={{ padding: "0.75rem" }}>Solar + Battery Payback</th>
                <th style={{ padding: "0.75rem" }}>Optimal System Sizing Strategy</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>NEM 1.0 / 2.0 (Retail Net Metering)</td>
                <td style={{ padding: "0.75rem" }}>Full 1:1 Retail Rate ($0.15–$0.38/kWh)</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.5 – 7.5 Years</td>
                <td style={{ padding: "0.75rem" }}>8.5 – 11.0 Years</td>
                <td style={{ padding: "0.75rem" }}>Size for 100% to 110% of annual kWh consumption.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>NEM 3.0 / Net Billing Tariff</td>
                <td style={{ padding: "0.75rem" }}>Avoided Cost Wholesale ($0.04–$0.08/kWh)</td>
                <td style={{ padding: "0.75rem", color: "#ea580c", fontWeight: 700 }}>10.5 – 13.0 Years</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>6.5 – 8.5 Years</td>
                <td style={{ padding: "0.75rem" }}>Pair with 10–15 kWh storage; self-consume 80%+ of PV generation.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Zero-Export / Interconnection Limited</td>
                <td style={{ padding: "0.75rem" }}>$0.00 (Curtailed or blocked)</td>
                <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>12.0 – 16.0 Years</td>
                <td style={{ padding: "0.75rem" }}>7.5 – 9.5 Years</td>
                <td style={{ padding: "0.75rem" }}>Size solar array to match daytime baseload, buffer with BESS.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: National State-by-State Solar Payback Matrix */}
      <section id="state-benchmarks" style={{ marginTop: "2.5rem" }}>
        <h2>4. State-by-State Solar Payback &amp; Sunlight Hours Benchmark Matrix</h2>
        <p>
          Solar payback times vary significantly across states due to two inverse drivers: <strong>peak sun hours per day</strong> and <strong>utility retail electricity pricing</strong>:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--line)" }}>
                <th style={{ padding: "0.75rem" }}>State / Region</th>
                <th style={{ padding: "0.75rem" }}>Avg. Daily Sun Hours</th>
                <th style={{ padding: "0.75rem" }}>Grid Rate ($/kWh)</th>
                <th style={{ padding: "0.75rem" }}>8 kW 1st-Year Yield</th>
                <th style={{ padding: "0.75rem" }}>Typical Net Cost (After ITC)</th>
                <th style={{ padding: "0.75rem" }}>Average Payback Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>California (PG&amp;E / SCE)</td>
                <td style={{ padding: "0.75rem" }}>5.4 hrs/day</td>
                <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.34 – $0.44</td>
                <td style={{ padding: "0.75rem" }}>12,600 kWh</td>
                <td style={{ padding: "0.75rem" }}>$16,800</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.8 – 7.2 Years (with BESS)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Massachusetts (Eversource / National Grid)</td>
                <td style={{ padding: "0.75rem" }}>4.2 hrs/day</td>
                <td style={{ padding: "0.75rem", color: "#dc2626", fontWeight: 700 }}>$0.29 – $0.34</td>
                <td style={{ padding: "0.75rem" }}>9,800 kWh</td>
                <td style={{ padding: "0.75rem" }}>$17,500</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>5.5 – 6.8 Years (SMART Incentives)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Texas (ERCOT Competitive Areas)</td>
                <td style={{ padding: "0.75rem" }}>5.2 hrs/day</td>
                <td style={{ padding: "0.75rem" }}>$0.14 – $0.17</td>
                <td style={{ padding: "0.75rem" }}>12,100 kWh</td>
                <td style={{ padding: "0.75rem" }}>$15,400</td>
                <td style={{ padding: "0.75rem" }}>7.5 – 9.2 Years</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Florida (FPL / Duke)</td>
                <td style={{ padding: "0.75rem" }}>5.3 hrs/day</td>
                <td style={{ padding: "0.75rem" }}>$0.15 – $0.18</td>
                <td style={{ padding: "0.75rem" }}>12,400 kWh</td>
                <td style={{ padding: "0.75rem" }}>$15,680</td>
                <td style={{ padding: "0.75rem" }}>7.2 – 8.8 Years</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Arizona (APS / SRP)</td>
                <td style={{ padding: "0.75rem" }}>6.1 hrs/day</td>
                <td style={{ padding: "0.75rem" }}>$0.13 – $0.16</td>
                <td style={{ padding: "0.75rem" }}>14,200 kWh</td>
                <td style={{ padding: "0.75rem" }}>$15,120</td>
                <td style={{ padding: "0.75rem" }}>6.8 – 8.2 Years</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 700 }}>Washington State (Pacific Power / PSE)</td>
                <td style={{ padding: "0.75rem" }}>3.7 hrs/day</td>
                <td style={{ padding: "0.75rem", color: "#16a34a", fontWeight: 700 }}>$0.10 – $0.12</td>
                <td style={{ padding: "0.75rem" }}>8,600 kWh</td>
                <td style={{ padding: "0.75rem" }}>$16,800</td>
                <td style={{ padding: "0.75rem", color: "#ea580c" }}>12.5 – 15.0 Years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Real-World Step-by-Step Worked Case Study */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>5. Real-World Engineering Case Study: 8.0 kW Residential PV System</h2>
        <p>
          Consider a typical single-family home with an 8.0 kW DC monocrystalline array installed at a turn-key cost of $2.80/Watt:
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.25rem", margin: "1rem 0" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>Input Parameters:</h3>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6, fontSize: "0.95rem" }}>
            <li><strong>Nameplate Capacity:</strong> 8.0 kW DC (20 × 400W Monocrystalline PERC modules)</li>
            <li><strong>Gross Turn-Key Cost:</strong> $22,400 ($2.80/Watt installed)</li>
            <li><strong>Federal ITC (30%):</strong> -$6,720 (IRC Section 25D)</li>
            <li><strong>Net Capital Outlay ($C_{`\\text{net}`}$):</strong> $15,680</li>
            <li><strong>Year 1 Solar Generation:</strong> 11,500 kWh (1,437.5 kWh/kW specific yield)</li>
            <li><strong>Utility Electricity Tariff:</strong> $0.18/kWh with 3.5% compound annual inflation</li>
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
                <th style={{ padding: "0.6rem" }}>Annual Savings</th>
                <th style={{ padding: "0.6rem" }}>Inverter Cost</th>
                <th style={{ padding: "0.6rem" }}>Cumulative Net Savings</th>
                <th style={{ padding: "0.6rem" }}>Net Financial Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 1</td>
                <td style={{ padding: "0.6rem" }}>11,500 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.1800/kWh</td>
                <td style={{ padding: "0.6rem" }}>$2,070</td>
                <td style={{ padding: "0.6rem" }}>$0</td>
                <td style={{ padding: "0.6rem" }}>$2,070</td>
                <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$13,610 remaining</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 3</td>
                <td style={{ padding: "0.6rem" }}>11,385 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.1928/kWh</td>
                <td style={{ padding: "0.6rem" }}>$2,195</td>
                <td style={{ padding: "0.6rem" }}>$0</td>
                <td style={{ padding: "0.6rem" }}>$6,396</td>
                <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$9,284 remaining</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 5</td>
                <td style={{ padding: "0.6rem" }}>11,272 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.2066/kWh</td>
                <td style={{ padding: "0.6rem" }}>$2,329</td>
                <td style={{ padding: "0.6rem" }}>$0</td>
                <td style={{ padding: "0.6rem" }}>$10,986</td>
                <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$4,694 remaining</td>
              </tr>
              <tr style={{ borderBottom: "2px solid #16a34a", background: "rgba(22, 163, 74, 0.08)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700, color: "#16a34a" }}>Year 7 (Breakeven 🎉)</td>
                <td style={{ padding: "0.6rem" }}>11,159 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.2213/kWh</td>
                <td style={{ padding: "0.6rem" }}>$2,470</td>
                <td style={{ padding: "0.6rem" }}>$0</td>
                <td style={{ padding: "0.6rem", fontWeight: 700, color: "#16a34a" }}>$15,856</td>
                <td style={{ padding: "0.6rem", color: "#16a34a", fontWeight: 700 }}>+$176 Net Profit (7.0 Years)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 13</td>
                <td style={{ padding: "0.6rem" }}>10,828 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.2721/kWh</td>
                <td style={{ padding: "0.6rem" }}>$2,946</td>
                <td style={{ padding: "0.6rem", color: "#dc2626" }}>-$1,800</td>
                <td style={{ padding: "0.6rem" }}>$31,614</td>
                <td style={{ padding: "0.6rem", color: "#16a34a" }}>+$15,934 Net Profit</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-subtle, #fafafa)" }}>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>Year 25 (Final)</td>
                <td style={{ padding: "0.6rem" }}>10,197 kWh</td>
                <td style={{ padding: "0.6rem" }}>$0.4111/kWh</td>
                <td style={{ padding: "0.6rem" }}>$4,192</td>
                <td style={{ padding: "0.6rem" }}>$0</td>
                <td style={{ padding: "0.6rem", fontWeight: 700 }}>$73,842</td>
                <td style={{ padding: "0.6rem", color: "#16a34a", fontWeight: 700 }}>+$58,162 Net Profit (371% ROI)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Key Rules of Thumb */}
      <section id="rules-of-thumb" style={{ marginTop: "2.5rem" }}>
        <h2>6. Engineering &amp; Financial Rules of Thumb for Maximizing Solar ROI</h2>
        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Target $2.50 to $3.00/Watt Turn-Key:</strong> Avoid inflated sales bids exceeding $3.50/Watt ($28,000 for an 8 kW system). High upfront cost is the single most common reason for sub-par payback periods exceeding 12 years.</li>
          <li><strong>Prioritize South-Facing Azimuth (180°):</strong> In the Northern Hemisphere, south-facing arrays yield 15% to 22% more annual kilowatt-hours than east/west orientations, accelerating payback by 1.5 to 2.2 years.</li>
          <li><strong>Utilize Optimal Tilt (Latitude - 10° to Latitude):</strong> Aligning tilt to maximize annual irradiance rather than summer peak output increases annual dollar savings. (See our <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide">Solar Panel Tilt Angle Guide</Link>).</li>
          <li><strong>Pair with BESS Under Avoided-Cost Tariffs:</strong> If your utility does not offer 1:1 retail net metering, storing daytime generation in a home battery (like Tesla Powerwall or Enphase 5P) allows you to avoid peak evening grid purchases ($0.35+/kWh), preserving a 7- to 8-year payback.</li>
        </ul>

        <StandardsBadge category="solar" />
      </section>

      {/* Section 7: FAQs */}
      <section id="faqs" style={{ marginTop: "3rem" }}>
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
      </section>

      {/* Section 8: Related Calculators & Planning Paths */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Complete Your Solar Photovoltaic Design &amp; Financial Model</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Integrate your payback projections with PowerLab&apos;s connected deterministic clean energy calculation engines:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>☀️ Solar Panel Output Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate exact daily, monthly, and annual kilowatt-hour generation with peak sun hours and inverter derating.
            </p>
            <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Calculate Solar Panel Output →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>📐 Solar System Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size your DC kW array to offset 100% of your home electric bill based on monthly kWh utility usage.
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
              Calculate exact seasonal and year-round tilt angles based on your geographic latitude and local albedo.
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

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <AcademicCitationModal
          title="Solar Payback Period & Net Metering ROI Financial Guide"
          urlPath="/guides/solar-payback-and-roi-calculation-guide"
        />
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SolarPaybackCalculator } from "@/components/calculator/solar-payback-calculator";
import { calculateSolarPayback } from "@/lib/calculators/solar-payback/engine";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("solar-payback");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Payback Calculator — ROI & Break-Even Timeline",
  description:
    "Estimate solar payback period, cumulative cash flow, and 25-year net returns from installation cost, annual solar yield, and utility rates.",
  canonicalPath: "/solar/solar-payback-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "What is the typical residential solar payback period in the US?",
    answer: "Payback periods vary widely by location, sunlight resource, installation cost, and electricity tariffs. Under representative US electricity rates ($0.18 to $0.28/kWh) and typical turnkey installation costs ($2.80 to $3.20/W), simple payback for a 0% incentive baseline generally ranges from 7 to 12 years. In regions with higher electricity rates ($0.30+/kWh), payback can be shorter, while low-cost electricity regions or reduced export compensation regimes may see longer payback timelines.",
  },
  {
    question: "How did the 30% Federal Clean Energy Tax Credit (§25D) affect payback?",
    answer: "Historically, the Section 25D Residential Clean Energy Credit allowed qualifying homeowners to claim a 30% federal tax credit on eligible solar and battery expenditures placed in service through December 31, 2025. For a $24,000 installation, claiming this $7,200 credit reduced net capital cost to $16,800, shortening break-even by approximately 2.5 to 3.5 years. For expenditures after 2025, federal credit availability depends on current statutory authority.",
  },
  {
    question: "How do utility net metering policies affect solar financial returns?",
    answer: "Under traditional 1-to-1 retail net energy metering (NEM), exported solar kilowatt-hours earn full retail bill credit. Under modernized tariffs with reduced export compensation (such as California Net Billing / NEM 3.0), solar exported during midday receives wholesale-equivalent credit. In such rate environments, maximizing on-site self-consumption or pairing solar with a battery storage system preserves stronger financial returns.",
  },
  {
    question: "What is the 25-year financial return on a residential solar system?",
    answer: "Over a 25-year operating lifespan, Tier-1 solar modules with 0.5%/yr degradation continue generating clean electricity. After recovering initial capital and accounting for an illustrative midpoint inverter replacement (~Year 13), a representative 8 kW system can generate $25,000 to $50,000+ in cumulative net avoided electricity costs, depending on utility rate inflation.",
  },
];

// Generate matrix rows dynamically from the engine
const MATRIX_SCENARIOS = [
  { sizeKw: 6.0, label: "6.0 kW example", grossCost: 17400, annualKwh: 8400 },
  { sizeKw: 8.0, label: "8.0 kW example", grossCost: 23200, annualKwh: 11200 },
  { sizeKw: 10.0, label: "10.0 kW example", grossCost: 29000, annualKwh: 14000 },
  { sizeKw: 12.0, label: "12.0 kW example", grossCost: 34800, annualKwh: 16800 },
].map((sc) => {
  const res = calculateSolarPayback({
    grossCost: sc.grossCost,
    incentivePercent: 0,
    annualProductionKwh: sc.annualKwh,
    electricityRate: 0.18,
    utilityInflationPercent: 3.5,
    panelDegradationPercent: 0.5,
    annualOmCost: 0,
    inverterReplacementCost: 1800,
    inverterReplacementYear: 13,
    analysisYears: 25,
  });
  return {
    ...sc,
    netCost: res.result.netSystemCost,
    year1Avoided: res.result.year1Savings,
    paybackYears: res.result.paybackYears,
    lifetimeNetProfit: res.result.lifetimeNetProfit,
  };
});

export default function SolarPaybackPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Payback & Break-Even Calculator",
    description: "Estimate solar break-even timeline in years, 25-year cumulative cash flow, and simple return on investment without lead-generation forms.",
    route: "/solar/solar-payback-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    applicationCategory: "UtilitiesApplication",
    features: [
      "25-year cumulative cash-flow and simple payback modeling",
      "Avoided grid electricity cost calculation with annual tariff escalation",
      "Panel degradation modeling (0.5%/yr) and midpoint inverter replacement",
      "Representative regional solar resource and EIA electricity rate presets",
    ],
    standards: [
      "NREL System Advisor Model (SAM) Financial Methodology",
      "IEC 61215 / IEC 61730 Photovoltaic Standards",
      "DSIRE Policy & Incentive Database",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/solar">Solar</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Payback Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar Financial Analysis &amp; Cash Flow</p>
        <h1>Solar Payback &amp; Break-Even Calculator</h1>
        <p className="intro">
          Estimate your solar payback timeline in years, 25-year cumulative cash flow, and simple return on investment based on installation costs, annual solar output, and electricity rates.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarPaybackCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="solar payback period and break-even calculation"
        answer="Solar payback represents the timeline required for cumulative avoided electricity costs to equal net initial installation costs. Under a cumulative cash-flow model with representative utility rate inflation and panel degradation, residential solar systems typically reach break-even within 7 to 11 years depending on local electric rates, sunlight availability, and net-metering structures."
        formula="Payback_Year = min(t : Cumulative_Avoided_Cost(t) ≥ Net_Initial_Cost) · Cumulative_CashFlow(t) = Σ(Gross_Avoided_Cost_i − O&M_i − InverterExpense_i) − Net_Initial_Cost"
        formulaTitle="Calculation Formulas"
        standardExample="8 kW example @ $2.90/W ($23,200 gross / 0% credit basis) producing 11,200 kWh/yr @ $0.18/kWh: Year 1 avoided cost = $2,016 → Payback ≈ 9.6 years (or ≈ 7.0 years under historical 30% §25D credit)"
        sourceAuthority="NREL System Advisor Model (SAM) & Open Energy Modeling Principles"
        sourceAuthorityLabel="Technical References & Model Basis:"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Estimate Your Solar Payback Period</h2>
        <ol>
          <li><strong>Input System Size &amp; Turnkey Cost:</strong> Enter your installed DC solar array capacity and gross turnkey cost before incentives (US residential installations typically range from $2.80 to $3.20 per watt).</li>
          <li><strong>Account for Incentives &amp; Rebates:</strong> For expenditures after December 31, 2025, Section 25D is expired unless extending statutory authority applies; enter 0% for baseline or input applicable state, local, or utility rebates.</li>
          <li><strong>Set Electricity Tariff &amp; Rate Escalation:</strong> Factor in your utility&apos;s current $/kWh electricity rate and historical annual rate inflation (typically 3% to 4% per year).</li>
          <li><strong>Incorporate PV Degradation &amp; Inverter Replacement:</strong> Account for gradual module efficiency derating (typically ~0.5%/yr) and a planned midpoint string inverter replacement (~Year 12–15).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar System Size, Payback Period &amp; 25-Year Cash Flow Matrix</h2>
        <p>Illustrative scenario examples (0% current federal incentive basis, $0.18/kWh initial rate, 3.5% inflation, 0.5% degradation, $1,800 inverter replacement at Year 13):</p>
        <div className="scenario-table" role="region" aria-label="Solar payback and 25-year financial return matrix">
          <table>
            <caption>Illustrative solar payback timelines, avoided costs, and 25-year cumulative cash flows by system size</caption>
            <thead>
              <tr>
                <th scope="col">System Size</th>
                <th scope="col">Gross Cost ($2.90/W)</th>
                <th scope="col">Net Cost (0% Credit)</th>
                <th scope="col">Est. Annual Output</th>
                <th scope="col">Year 1 Avoided Cost</th>
                <th scope="col">Estimated Payback</th>
                <th scope="col">25-Yr Net Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_SCENARIOS.map((row) => (
                <tr key={row.sizeKw}>
                  <td><strong>{row.label}</strong></td>
                  <td>${row.grossCost.toLocaleString()}</td>
                  <td>${row.netCost.toLocaleString()}</td>
                  <td>~{row.annualKwh.toLocaleString()} kWh</td>
                  <td>${row.year1Avoided.toLocaleString()}</td>
                  <td><strong>{row.paybackYears.toFixed(1)} Years</strong></td>
                  <td><strong>+${row.lifetimeNetProfit.toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas"
          formula="Net_CashFlow_t = (Output_1 * (1 - Degradation)^(t-1) * Rate_1 * (1 + Escalation)^(t-1)) - OM_t - Inverter_t ; Payback = min(t : Cumulative_CashFlow_t >= 0)"
          formulaDescription="Cumulative cash flow and simple payback model integrating annual panel degradation, utility rate escalation, annual O&M, and midpoint inverter replacement."
          variables={[
            { symbol: "Net_Initial_Cost", label: "Net Upfront Capital Cost", description: "Gross installation cost minus upfront tax credits and rebates", unit: "Currency ($)" },
            { symbol: "Output_t", label: "Year-t Solar Output", description: "Annual generation derated by panel degradation: Output_1 × (1 - Degradation)^(t-1)", unit: "kWh/yr" },
            { symbol: "Electricity_Rate_t", label: "Year-t Electricity Tariff", description: "Retail rate escalating over time: Rate_1 × (1 + Escalation)^(t-1)", unit: "$/kWh" },
            { symbol: "Net_CashFlow_t", label: "Net Annual Cash Flow", description: "Gross avoided electricity purchase cost minus O&M and inverter replacement expenses", unit: "$/yr" },
            { symbol: "Cumulative_CashFlow_t", label: "Cumulative Cash Flow Position", description: "Running total of annual net savings minus initial net capital expenditure", unit: "Currency ($)" },
          ]}
          notes={[
            "Model basis: simplified avoided-cost valuation of solar generation. Values all solar production at the retail electricity rate (equivalent to 1-to-1 avoided grid purchases). It does not separately model TOU rate differentials, export compensation tariffs (such as California NEM 3.0), or utility fixed charges.",
            "The 30% Section 25D Residential Clean Energy Credit applied to qualifying expenditures placed in service through December 31, 2025; verify current statutory incentives for 2026+ installations.",
            "Illustrative planning assumptions: 0.5%/yr PV module degradation, 3.5%/yr utility tariff inflation, and $1,800 midpoint inverter replacement at Year 13.",
          ]}
        />
      </div>

      <section>
        <h2>Key Factors That Determine Solar Break-Even Timelines</h2>
        <ol>
          <li><strong>Local Electricity Rates ($/kWh):</strong> Higher retail electricity rates accelerate avoided-cost accumulation, resulting in shorter payback timelines.</li>
          <li><strong>Utility Compensation &amp; Export Tariffs:</strong> 1-to-1 net energy metering credits all solar at retail rate, whereas avoided-cost/wholesale export rates benefit from maximizing on-site self-consumption or adding battery storage.</li>
          <li><strong>Solar Resource (Peak Sun Hours):</strong> Sunbelt locations generate significantly higher annual kilowatt-hour yields per installed kilowatt than cloudy northern latitudes.</li>
        </ol>
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
        <h2>Related Solar Sizing &amp; Financial Planning</h2>
        <p>
          Estimate your annual solar production yield with our <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link> (using NREL PVWatts V8), size your roof array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, model battery backup storage with the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link>, or calculate your current electric bill baseline with the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Solar payback and cash flow calculations employ annual cash-flow modeling and standard engineering benchmarks. References are organized by role below:
        </p>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>1. Methodology &amp; Engineering Basis</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
              <li><strong>NREL System Advisor Model (SAM):</strong> Photovoltaic Cash Flow, Degradation &amp; LCOE Methodologies.</li>
              <li><strong>IEC 61215 / IEC 61730:</strong> Terrestrial Photovoltaic (PV) Modules — Design Qualification and Safety Standards.</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>2. Statutory &amp; Policy Context</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
              <li><strong>Internal Revenue Code Section 25D:</strong> Residential Clean Energy Credit (historical expenditures placed in service through December 31, 2025).</li>
              <li><strong>DSIRE:</strong> Database of State Incentives for Renewables &amp; Efficiency (state and local solar policy tracking).</li>
            </ul>
          </div>
        </div>
      </section>

      <StandardsBadge category="solar" />
    </article>
  );
}


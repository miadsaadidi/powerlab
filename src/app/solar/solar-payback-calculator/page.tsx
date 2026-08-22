import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SolarPaybackCalculator } from "@/components/calculator/solar-payback-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-payback");

export const metadata: Metadata = {
  title: "Solar Payback Calculator — Break-Even Period & ROI",
  description: "Calculate your solar payback period in years, return on investment (ROI), and 25-year lifetime savings based on system cost, annual production, and utility rates.",
  alternates: { canonical: "/solar/solar-payback-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Solar Payback Calculator — Break-Even Period & ROI",
    description: "Calculate break-even timeline in years and 25-year financial returns for residential solar with 30% Federal ITC.",
    url: `${siteConfig.url}/solar/solar-payback-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is the average solar payback period in the US?",
    answer: "For most US homeowners with average sunlight and electricity rates around $0.18/kWh, the average solar payback period ranges from 6.5 to 8.5 years after applying the 30% Federal Residential Clean Energy Credit (ITC). In states with high electric rates like California, New York, or Massachusetts, payback can be as short as 4 to 6 years.",
  },
  {
    question: "How does the 30% Federal Clean Energy Tax Credit (ITC) affect payback?",
    answer: "The Section 25D Residential Clean Energy Credit allows taxpayers to deduct 30% of the total turnkey solar installation cost directly from their federal taxes. For a typical $24,000 system, this reduces the net capital cost by $7,200 (to $16,800), shortening the break-even timeline by approximately 2.5 to 3.5 years.",
  },
  {
    question: "Do solar panels still save money if my utility changes net metering rules?",
    answer: "Yes, but your self-consumption strategy changes. Under traditional 1-to-1 Net Energy Metering (NEM 1.0/2.0), surplus solar exported to the grid earns full retail value. Under reduced export compensation policies (like California NEM 3.0), pairing solar panels with a home battery allows you to store daytime solar energy to avoid expensive peak evening grid rates, preserving high ROI.",
  },
  {
    question: "What is the 25-year return on investment (ROI) for solar?",
    answer: "Because Tier-1 monocrystalline solar panels are warrantied for 25 years and continue producing power for 30+ years, a typical 8 kW solar installation generates $35,000 to $55,000 in net profit over its lifespan, translating to an Internal Rate of Return (IRR) of 12% to 18% per year.",
  },
];

export default function SolarPaybackPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Payback & ROI Calculator",
    description: "Calculate solar break-even timeline in years, 25-year net profit, and return on investment without lead-generation forms.",
    route: "/solar/solar-payback-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "25-year cumulative cash-flow amortization modeling",
      "US Federal 30% Clean Energy Tax Credit (ITC) calculation",
      "Compound annual electricity tariff inflation (3.5% historical baseline)",
      "Tier-1 monocrystalline annual panel degradation (0.5%/yr) and inverter replacement",
    ],
    standards: [
      "NREL System Advisor Model (SAM) Financial & LCOE Methodology",
      "U.S. Internal Revenue Code Section 25D (Residential Clean Energy Credit)",
      "IEC 61215 / IEC 61730 (Terrestrial Photovoltaic Reliability)",
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
        <p className="eyebrow">Financial ROI &amp; Investment Economics</p>
        <h1>Solar Payback &amp; ROI Calculator</h1>
        <p className="intro">
          Calculate your exact solar break-even timeline in years, 25-year cumulative net profit, and return on investment (ROI) based on your system installation cost, annual solar yield, and local utility rates.
        </p>
      </div>

      <DirectAnswerCard
        keyword="solar payback period and ROI calculation"
        answer="The average residential solar payback period in the US is 6.5 to 8.5 years after applying the 30% Federal Clean Energy Tax Credit (ITC). Simple payback is calculated by dividing net installation cost by Year-1 electricity bill savings. An 8 kW system costing $22,400 ($15,680 after ITC) generating $2,100 in annual power achieves break-even in approximately 7.1 years."
        formula="Simple Payback (Years) = Net System Cost (after 30% Tax Credit) ÷ Year-1 Electricity Bill Savings"
        standardExample="8 kW system @ $2.80/W = $22,400 ($15,680 net) producing 11,600 kWh @ $0.18/kWh: $15,680 ÷ $2,088 = 7.5 years"
        sourceAuthority="NREL Annual Technology Baseline & US Dept. of Energy Solar Metrics"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarPaybackCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Solar Payback Period</h2>
        <ol>
          <li><strong>Input System Size (kW):</strong> Enter your planned or installed DC rooftop solar capacity (typical US homes range from 6 kW to 12 kW).</li>
          <li><strong>Enter Gross Installation Cost:</strong> Input the turnkey cost before incentives (US national average is approximately $2.80 to $3.20 per watt).</li>
          <li><strong>Apply 30% Federal Tax Credit (ITC):</strong> The calculator automatically deducts the 30% Residential Clean Energy Credit (Section 25D) plus any local utility rebates.</li>
          <li><strong>Set Electric Rate &amp; Escalation:</strong> Factor in your utility&apos;s $/kWh tariff and historical annual rate inflation (typically 3% to 4% per year).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar System Size, Payback Period &amp; 25-Year Profit Matrix</h2>
        <p>Representative financial return benchmarks for grid-tied rooftop solar systems with 30% Federal Tax Credit at $0.18/kWh:</p>
        <div className="scenario-table" role="region" aria-label="Solar payback and 25-year financial return matrix">
          <table>
            <caption>Solar payback timelines, cash flows, and 25-year cumulative return by system size</caption>
            <thead>
              <tr>
                <th scope="col">System Size (kW DC)</th>
                <th scope="col">Gross Cost ($2.90/W)</th>
                <th scope="col">Net Cost (after 30% ITC)</th>
                <th scope="col">Est. Annual Output</th>
                <th scope="col">Year 1 Savings</th>
                <th scope="col">Payback Period</th>
                <th scope="col">25-Yr Net Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>6.0 kW</strong> (Small Home)</td>
                <td>$17,400</td>
                <td>$12,180</td>
                <td>~8,400 kWh</td>
                <td>$1,512</td>
                <td><strong>7.1 Years</strong></td>
                <td><strong>+$31,200</strong></td>
              </tr>
              <tr>
                <td><strong>8.0 kW</strong> (Average US Home)</td>
                <td>$23,200</td>
                <td>$16,240</td>
                <td>~11,200 kWh</td>
                <td>$2,016</td>
                <td><strong>7.0 Years</strong></td>
                <td><strong>+$42,100</strong></td>
              </tr>
              <tr>
                <td><strong>10.0 kW</strong> (High Energy Home)</td>
                <td>$29,000</td>
                <td>$20,300</td>
                <td>~14,000 kWh</td>
                <td>$2,520</td>
                <td><strong>6.9 Years</strong></td>
                <td><strong>+$53,400</strong></td>
              </tr>
              <tr>
                <td><strong>12.0 kW</strong> (Solar + EV + Heat Pump)</td>
                <td>$34,800</td>
                <td>$24,360</td>
                <td>~16,800 kWh</td>
                <td>$3,024</td>
                <td><strong>6.8 Years</strong></td>
                <td><strong>+$64,800</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar Payback &amp; Cash Flow Formula"
          formula="Payback_Year = min(t : Cumulative_Savings(t) ≥ Net_Initial_Cost)"
          formulaDescription="Standard discounted cash flow amortization integrating utility rate escalation, annual panel output degradation, and federal tax incentives."
          variables={[
            { symbol: "Net_Initial_Cost", label: "Net System Cost", description: "Gross installation cost minus 30% Federal ITC and upfront state rebates", unit: "Currency ($)" },
            { symbol: "Annual_Savings(t)", label: "Yearly Avoided Electric Cost", description: "Solar Output(t) × Electricity_Rate(t) minus annual O&M maintenance", unit: "$/year" },
            { symbol: "Degradation_Rate", label: "PV Aging Factor", description: "Standard 0.5% annual loss in panel nameplate efficiency", unit: "%/year" },
            { symbol: "Rate_Inflation", label: "Utility Rate Escalation", description: "Compounding annual increase in retail grid electricity rates", unit: "%/year" },
          ]}
          notes={[
            "Assumes 1-to-1 net energy metering (NEM) or equivalent avoided grid purchase value for consumed solar kWh.",
            "Net profit over 25 years includes an optional midpoint inverter replacement around year 12–15.",
          ]}
        />
      </div>

      <section>
        <h2>Key Factors That Determine Your Solar Break-Even Timeline</h2>
        <ol>
          <li><strong>Local Electricity Rates ($/kWh):</strong> The higher your utility charges for grid power, the faster your solar panels pay for themselves.</li>
          <li><strong>Net Metering Policies:</strong> Full 1-to-1 retail net metering accelerates payback, while reduced wholesale feed-in tariffs (like California NEM 3.0) encourage pairing solar with battery storage.</li>
          <li><strong>Sunlight Availability (Peak Sun Hours):</strong> Systems in sunbelt regions generate up to 40% more kilowatt-hours per year per installed kilowatt than northern climates.</li>
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
          Estimate your exact annual solar production yield with our <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link> (using NREL PVWatts V8), size your roof array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, or calculate your current electric bill baseline with the <Link href="/home-energy/energy-bill-calculator">Energy Bill Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Payback timelines incorporate the 30% US Federal Residential Clean Energy Credit (Section 25D), standard NREL PV panel degradation curves, and historical utility rate inflation. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="solar" />
    </article>
  );
}

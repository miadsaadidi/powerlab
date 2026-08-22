import type { Metadata } from "next";
import Link from "next/link";
import { EnergyBillCalculator } from "@/components/calculator/energy-bill-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("energy-bill");

export const metadata: Metadata = {
  title: "Energy Bill Calculator — Estimate Electric Utility Costs",
  description: "Calculate your monthly and annual electric utility bill from kWh consumption or meter readings, tariff rates, fixed fees, and standing charges.",
  alternates: { canonical: "/home-energy/energy-bill-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Energy Bill Calculator — PowerLab",
    description: "Calculate electric utility bills from kWh usage or meter readings with fixed charges and taxes.",
    url: `${siteConfig.url}/home-energy/energy-bill-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you calculate an electric bill from kWh usage?",
    answer: "Multiply total kilowatt-hours (kWh) consumed by your utility company's price per kWh. Then add any monthly customer service fees, daily standing grid charges, and local sales tax: Total Bill = [(kWh × Rate) + Fixed Charge + (Daily Fee × Days)] × (1 + Tax Rate).",
  },
  {
    question: "How do I calculate electricity usage from two meter readings?",
    answer: "Subtract your previous meter reading from your current meter reading: kWh Consumed = Current Reading − Previous Reading. For example, if your current reading is 14,850 and previous reading was 14,100, you consumed 750 kWh.",
  },
  {
    question: "What is a standing charge / fixed customer fee?",
    answer: "A standing charge (or base connection fee) is a fixed daily or monthly fee charged by your electric utility company to maintain the power grid infrastructure, transmission wires, and meter reading services regardless of how much electricity you actually use.",
  },
  {
    question: "How much will my electricity bill increase if I buy an EV or Heat Pump?",
    answer: "Driving an EV 1,000 miles per month adds approximately 300 kWh (~$48/month at $0.16/kWh). Switching to a whole-home heat pump adds roughly 500 to 1,200 kWh per winter month depending on home insulation and regional climate.",
  },
];

export default function EnergyBillCalculatorPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Energy Bill Calculator",
    description: "Estimate electric utility bills from kWh usage or meter readings with transparent tariff and fixed charge calculations.",
    route: "/home-energy/energy-bill-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Calculates billing period total and annualized electricity run-rate costs",
      "Supports direct kWh usage and dual meter-reading modes",
      "Configurable fixed customer fees, daily standing charges, and local taxes",
      "Interactive what-if scenario comparison tools",
    ],
    standards: [
      "U.S. Energy Information Administration (EIA) Electric Power Monthly Rates",
      "Federal Energy Regulatory Commission (FERC) Tariff Accounting Guidelines",
      "National Association of Regulatory Utility Commissioners (NARUC)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/home-energy">Home Energy</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Energy Bill Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home energy planning</p>
        <h1>Energy Bill Calculator</h1>
        <p className="intro">
          Estimate your monthly and annual electric utility bill from kilowatt-hour (kWh) consumption or two meter readings, including fixed connection fees, standing charges, and taxes.
        </p>
      </div>

      <DirectAnswerCard
        keyword="electricity bill calculation"
        answer="An average US household consumes approximately 880 kWh per month, resulting in a monthly bill of roughly $145 to $160 at the national average electricity rate of $0.165/kWh (including standard monthly base connection fees). Total bill is calculated by multiplying total kWh by your price per kWh, then adding fixed charges and applicable local taxes."
        formula="Total Electric Bill = [(Electricity Usage_kWh × Rate_per_kWh) + Fixed Monthly Fee + (Daily Standing Charge × Days)] × (1 + Tax Rate)"
        standardExample="880 kWh @ $0.165/kWh + $15 base customer fee: (880 × 0.165) + 15 = $160.20 per month"
        sourceAuthority="US Energy Information Administration (EIA) Electricity Data"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <EnergyBillCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Electric Utility Bill</h2>
        <ol>
          <li><strong>Select Input Mode:</strong> Choose Direct kWh Usage or Enter Current &amp; Previous Meter Readings.</li>
          <li><strong>Enter Energy Price ($/kWh):</strong> Input your volumetric electricity rate from your latest utility statement.</li>
          <li><strong>Add Fixed &amp; Standing Charges:</strong> Include monthly customer connection fees and daily grid charges.</li>
          <li><strong>Review Annualized Projection:</strong> See both this billing cycle&apos;s total cost and estimated 12-month run-rate expenses.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Average Residential Electricity Cost Reference Matrix</h2>
        <p>Estimated monthly and annual electricity expense across different household consumption levels and average utility electricity tariffs:</p>
        <div className="scenario-table" role="region" aria-label="Electricity bill benchmark matrix">
          <table>
            <caption>Estimated monthly bill by household size &amp; average electricity rate ($0.12 to $0.32 per kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Household Profile &amp; Usage</th>
                <th scope="col">Low Rate ($0.12/kWh)</th>
                <th scope="col">US Avg ($0.16/kWh)</th>
                <th scope="col">High Rate ($0.24/kWh)</th>
                <th scope="col">Peak Rate ($0.32/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1-Bed Apartment</strong> (500 kWh/mo)</td>
                <td>$60 / mo ($720/yr)</td>
                <td>$80 / mo ($960/yr)</td>
                <td>$120 / mo ($1,440/yr)</td>
                <td>$160 / mo ($1,600/yr)</td>
              </tr>
              <tr>
                <td><strong>Average Home</strong> (900 kWh/mo)</td>
                <td>$108 / mo ($1,296/yr)</td>
                <td>$144 / mo ($1,728/yr)</td>
                <td>$216 / mo ($2,592/yr)</td>
                <td>$288 / mo ($3,456/yr)</td>
              </tr>
              <tr>
                <td><strong>Large Home + Central AC</strong> (1,500 kWh/mo)</td>
                <td>$180 / mo ($2,160/yr)</td>
                <td>$240 / mo ($2,880/yr)</td>
                <td>$360 / mo ($4,320/yr)</td>
                <td>$480 / mo ($5,760/yr)</td>
              </tr>
              <tr>
                <td><strong>All-Electric + EV + Heat Pump</strong> (2,200 kWh/mo)</td>
                <td>$264 / mo ($3,168/yr)</td>
                <td>$352 / mo ($4,224/yr)</td>
                <td>$528 / mo ($6,336/yr)</td>
                <td>$704 / mo ($8,448/yr)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Electricity Bill Calculation Formulas"
          formula="Total_Bill = [(kWh_Used × Rate_Per_kWh) + Fixed_Charge + (Daily_Standing_Fee × Billing_Days)] × (1 + Tax_Rate)"
          formulaDescription="Calculates total residential or commercial utility electric bill from volumetric energy consumption, baseline recurring standing charges, and effective tax rates."
          variables={[
            { symbol: "kWh_Used", label: "Billing Period Energy", description: "Meter reading difference or total kilowatt-hours consumed.", unit: "kWh" },
            { symbol: "Rate_Per_kWh", label: "Electricity Tariff Price", description: "Volumetric energy rate per kilowatt-hour ($/kWh, €/kWh, £/kWh).", unit: "currency/kWh" },
            { symbol: "Fixed_Charge", label: "Fixed Customer Fee", description: "Base flat connection fee per billing cycle.", unit: "currency" },
            { symbol: "Daily_Standing_Fee", label: "Daily Standing Charge", description: "Per-day grid infrastructure maintenance charge.", unit: "currency/day" },
            { symbol: "Tax_Rate", label: "Sales Tax / Value Added Tax (VAT)", description: "Local tax percentage applied to subtotal (e.g. 5%–20%).", unit: "fraction" },
          ]}
          notes={[
            "Annualized run-rate cost = (Total_Bill ÷ Billing_Days) × 365.25.",
            "To model tiered or Time-of-Use (TOU) rates, use weighted average price per kWh across all rate bands.",
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
        <h2>Related Energy &amp; Utility Calculators</h2>
        <p>
          Audit high-draw appliances with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>, check solar investment return with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>, or compare EV charging costs with the <Link href="/ev/ev-savings-calculator">EV Savings Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

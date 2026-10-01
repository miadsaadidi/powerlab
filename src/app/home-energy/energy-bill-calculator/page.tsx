import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EnergyBillCalculator } from "@/components/calculator/energy-bill-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("energy-bill");

export const metadata: Metadata = buildPageMetadata({
  title: "Electricity Bill Calculator — Monthly Power Cost",
  description: "Calculate your monthly and annual electricity bill from kWh consumption or meter readings, electric utility rates, fixed fees, and standing charges.",
  canonicalPath: "/home-energy/energy-bill-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How do you calculate an electric bill from kWh usage?",
    answer: "Multiply total kilowatt-hours (kWh) consumed by your utility company's price per kWh. Then add any monthly customer service fees, daily standing grid charges, and local sales tax: Total Bill = [(kWh × Rate) + Fixed Charge + (Daily Fee × Days)] × (1 + Tax Rate).",
  },
  {
    question: "How do I calculate electricity usage from two meter readings?",
    answer: "For standard cumulative kWh meters, subtract your previous meter reading from your current meter reading: kWh Consumed = Current Reading − Previous Reading. For example, if your current reading is 14,850 and previous reading was 14,100, you consumed 750 kWh. Meters with multipliers, CT ratios, multiple time registers, or mechanical rollovers require separate handling.",
  },
  {
    question: "What is a standing charge / fixed customer fee?",
    answer: "A standing charge is a fixed recurring charge specified by the applicable electricity tariff, independent of the amount of energy consumed. A fixed customer charge is typically assessed per monthly billing cycle, while a daily standing charge is assessed per day of active connection.",
  },
  {
    question: "How much will my electricity bill increase if I buy an EV or Heat Pump?",
    answer: "An EV driven 1,000 miles per month uses about 300 kWh/month at an illustrative efficiency of 3.33 mi/kWh (approx. $48/month at $0.16/kWh). Heat-pump electricity use varies substantially with climate, building envelope, equipment efficiency, heating load, and operating conditions. Use our dedicated EV and heat-pump calculators for precise scenario estimates.",
  },
];

export default function EnergyBillCalculatorPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Energy Bill Calculator",
    description: "Estimate electric utility bills from kWh usage or meter readings with transparent tariff and fixed charge calculations.",
    route: "/home-energy/energy-bill-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    applicationCategory: "UtilitiesApplication",
    features: [
      "Calculates billing period total and annualized electricity run-rate estimates",
      "Supports direct kWh usage and dual meter-reading modes",
      "Configurable fixed customer fees, daily standing charges, and local taxes",
      "Interactive what-if scenario comparison tools",
    ],
    standards: [
      "Technical references: U.S. Energy Information Administration (EIA) Electric Power Monthly & Form EIA-861 benchmarks",
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

      <div id="calculator-tool">
        <EnergyBillCalculator />
      </div>

      <DirectAnswerCard
        keyword="electricity bill calculation"
        answer="Illustrative U.S. reference scenario: 880 kWh/month at $0.165/kWh plus a $15 fixed charge = $160.20/month before any additional taxes or fees. Total electric bill is calculated by multiplying total kWh by your rate per kWh, adding fixed monthly and daily standing fees, and applying applicable local tax percentages."
        formula="Total Electric Bill = [(Electricity Usage_kWh × Rate_per_kWh) + Fixed Monthly Fee + (Daily Standing Charge × Days)] × (1 + Tax Rate)"
        standardExample="880 kWh @ $0.165/kWh + $15 base customer fee: (880 × 0.165) + 15 = $160.20 per month (before taxes)"
        sourceAuthority="Technical references: U.S. Energy Information Administration (EIA) Electricity Data"
      />

      {/* Next-Step Planning Pathways */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.15rem", margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>
          🧭 Connected Home Energy Planning Pathways
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.5 }}>
          Explore what is driving your power bill and evaluate storage and efficiency solutions:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>⚡ Audit Individual Appliance Loads</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Discover which specific appliances (HVAC, water heater, refrigeration) are driving your kilowatt-hour totals.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>📊 Benchmark Monthly Consumption</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compare your monthly kWh against the U.S. EIA national baseline (2022/2023 Form EIA-861 data of ~880–900 kWh/mo or 29–30 kWh/day).
            </p>
            <Link href="/guides/how-many-kwh-does-a-house-use-per-day" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Daily kWh Usage Guide →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>🔋 Size Battery Storage for Backup</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate home battery storage capacity (kWh) to protect against blackouts and shift power from peak tariff windows.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Home Battery Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Electric Utility Bill</h2>
        <ol>
          <li><strong>Select Input Mode:</strong> Choose Direct kWh Usage or Enter Current &amp; Previous Meter Readings (for standard cumulative meters).</li>
          <li><strong>Enter Energy Price ($/kWh):</strong> Input your volumetric electricity rate from your latest utility statement.</li>
          <li><strong>Add Fixed &amp; Standing Charges:</strong> Include recurring base customer fees per billing cycle and daily tariff charges.</li>
          <li><strong>Review Annualized Projection:</strong> See both this billing cycle&apos;s total cost and estimated 12-month run-rate expenses.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Illustrative Residential Electricity Cost Reference Matrix</h2>
        <p>
          Illustrative monthly electricity expense across different household consumption levels and average utility electricity tariffs (assumes volumetric energy charge only with zero fixed customer fees or taxes; values are illustrative rather than universal market prices):
        </p>
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
                <td>$160 / mo ($1,920/yr)</td>
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
          formulaDescription="Calculates total electric utility bill subtotal from volumetric energy consumption, fixed customer fees, and daily standing charges, then applies a simplified effective tax rate."
          variables={[
            { symbol: "kWh_Used", label: "Billing Period Energy", description: "Meter reading difference or total kilowatt-hours consumed.", unit: "kWh" },
            { symbol: "Rate_Per_kWh", label: "Electricity Tariff Price", description: "Volumetric energy rate per kilowatt-hour ($/kWh, €/kWh, £/kWh).", unit: "currency/kWh" },
            { symbol: "Fixed_Charge", label: "Fixed Customer Fee", description: "Base flat recurring fee per billing cycle.", unit: "currency" },
            { symbol: "Daily_Standing_Fee", label: "Daily Standing Charge", description: "Fixed recurring charge specified by tariff per day of connection.", unit: "currency/day" },
            { symbol: "Tax_Rate", label: "Effective Tax Rate", description: "Local tax percentage applied to subtotal (e.g. 5%–20%).", unit: "fraction" },
          ]}
          notes={[
            "Simplified effective-tax model: This model applies one effective tax percentage to the calculated subtotal. Actual utility bills may apply taxes, surcharges, credits, or fees to different bill components.",
            "Annualized run-rate estimate = (Total_Bill ÷ Billing_Days) × 365.25. This extrapolates the current billing period's daily usage and charges. It is not a forecast of actual annual utility costs.",
            "A weighted-average rate can approximate a known bill or blended tariff. It does not reproduce true tier thresholds or time-of-use billing logic. Use separate rate bands when exact tariff modeling is required.",
          ]}
        />
      </div>

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Bill modeling incorporates standard utility tariff structures and national average residential energy benchmarks:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "1.25rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>EIA Electric Power Monthly</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              U.S. Energy Information Administration (EIA) Form EIA-861 utility sales surveys and monthly residential electricity price benchmarks.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>Tariff Structure Architecture</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Standard utility accounting separating volumetric energy charges ($/kWh), recurring customer charges ($/month), and standing connection fees ($/day).
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>PowerLab Deterministic Run-Rate</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Deterministic daily normalization and annualized run-rate extrapolation (365.25-day mean year) with explicit input validation and zero currency conversion distortion.
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
        <h2>Related Energy &amp; Utility Calculators</h2>
        <p>
          Audit high-draw appliances with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>, understand baseline consumption benchmarks in the <Link href="/guides/how-many-kwh-does-a-house-use-per-day">Daily kWh Usage Guide</Link>, evaluate backup storage with the <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link>, or check solar investment return with the <Link href="/solar/solar-payback-calculator">Solar Payback Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

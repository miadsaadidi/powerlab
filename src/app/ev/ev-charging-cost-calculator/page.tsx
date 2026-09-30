import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvChargingCostCalculator } from "@/components/calculator/ev-charging-cost-calculator";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { calculateEvChargingCost } from "@/lib/calculators/ev-charging-cost/engine";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charging Cost Calculator — Cost per Charge & Mile",
  description: "Estimate EV charging cost from usable battery capacity, consumption, charging efficiency and your electricity price per kWh.",
  canonicalPath: "/ev/ev-charging-cost-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How much does it cost to fully charge an electric car at home?",
    answer: "Recharging a standard 65 kWh usable capacity EV battery from 10% to 100% (58.5 kWh battery energy added, drawing 65.0 kWh from the wall at 90% AC efficiency) at an illustrative U.S. residential benchmark rate of $0.16/kWh costs approximately $10.40, providing about 230 to 280 miles of driving range.",
  },
  {
    question: "How much does an EV cost per mile to drive?",
    answer: "At an illustrative electricity rate of $0.16/kWh and an average vehicle efficiency of 3.5 miles per kWh, driving an EV costs approximately $0.046 per mile. At off-peak rates of $0.10/kWh, driving costs drop to ~$0.029 per mile. In contrast, a 30 MPG gasoline car paying $3.50/gallon costs about $0.117 per mile — roughly 2.5× to 4× more expensive.",
  },
  {
    question: "Why does home charging cost less than public DC fast charging?",
    answer: "Home charging uses standard residential utility electric rates ($0.10–$0.20/kWh). Commercial DC fast charging networks typically charge $0.35 to $0.50/kWh to cover high capital equipment costs, commercial utility demand charges, and station operating margins.",
  },
  {
    question: "What is the overall source-to-battery charging efficiency?",
    answer: "During Level 1 and Level 2 AC charging, the vehicle's onboard rectifier converts AC grid electricity to DC battery chemistry while active cooling systems manage temperature. This process incurs an estimated 8% to 12% energy loss, modeled using an illustrative 90% wall-to-battery efficiency assumption.",
  },
];

const MATRIX_PACKS = [
  { label: "50 kWh Usable Pack", capacity: 50, efficiencyMiPerKwh: 3.5, examples: "e.g. Leaf, Kona EV" },
  { label: "65 kWh Usable Pack", capacity: 65, efficiencyMiPerKwh: 3.5, examples: "e.g. Model 3 RWD, Bolt EV" },
  { label: "75 kWh Usable Pack", capacity: 75, efficiencyMiPerKwh: 3.5, examples: "e.g. Model Y, Ioniq 5" },
  { label: "100 kWh Usable Pack", capacity: 100, efficiencyMiPerKwh: 2.5, examples: "e.g. Rivian R1T, F-150 Lightning" },
];

const ELECTRICITY_BENCHMARKS = [
  { label: "Off-Peak Home ($0.10/kWh)", rate: 0.10 },
  { label: "Illustrative Residential ($0.16/kWh)", rate: 0.16 },
  { label: "Illustrative DC Fast ($0.45/kWh)", rate: 0.45 },
];

export default function EvChargingCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Charging Cost Calculator",
    description: "Estimate how much an EV charging session or driving distance costs from usable battery capacity, charging efficiency, and electricity price per kWh.",
    route: "/ev/ev-charging-cost-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Calculates charging session cost and cost per mile / 100 miles",
      "Supports session charging mode and distance driving mode",
      "Explicit wall vs battery consumption measurement basis",
      "Configurable source-to-battery charging efficiency assumptions",
      "Multi-currency rate entry with zero unauthorized FX alteration",
    ],
    standards: [
      "U.S. Department of Energy (DOE) Alternative Fuels Data Center",
      "EPA Fuel Economy and Environment Standards (MPGe / kWh per 100 miles)",
      "SAE J1772 Standards for EV Charging",
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
        <span aria-current="page">EV Charging Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Charging Cost Calculator</h1>
        <p className="intro">
          Estimate how much an electric vehicle charging session or driving distance costs based on usable battery capacity, AC wall-to-battery charging losses, and your local electricity rate ($/kWh).
        </p>
      </div>

      <div id="calculator-tool">
        <EvChargingCostCalculator />
      </div>

      <DirectAnswerCard
        keyword="EV charging cost calculation"
        answer="Recharging an electric vehicle with a 65 kWh usable battery from 10% to 80% (a 70-percentage-point increase, 45.5 kWh battery energy added) costs approximately $8.34 at an illustrative U.S. residential electricity benchmark rate of $0.165/kWh with an illustrative 90% AC wall-to-battery charging efficiency assumption. Driving an EV costs roughly $0.029 to $0.046 per mile at home rates (3.5 mi/kWh), compared to $0.11 to $0.14 per mile for a 30 MPG gas car."
        formula="Session Cost ($) = {[Usable Capacity (kWh) × (Target SoC% − Start SoC%) / 100] ÷ Charging Efficiency} × Electricity Rate ($/kWh)"
        standardExample="65 kWh usable EV from 10% to 80% (45.5 kWh needed) with 90% efficiency @ $0.165/kWh: (45.5 ÷ 0.90) × $0.165 = $8.34"
        sourceAuthority="DOE Alternative Fuels Data Center & EPA Fuel Economy Guidelines"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Charging Costs</h2>
        <ol>
          <li>
            <strong>Select Calculation Mode:</strong> Choose Single Charging Session (recharge state-of-charge delta) or Driving Distance Cost (daily, weekly, or annual mileage).
          </li>
          <li>
            <strong>Enter Usable Battery Capacity (kWh):</strong> Input usable traction pack size (e.g. 60 kWh, 75 kWh, 100 kWh). Note that usable capacity may differ from the manufacturer&apos;s gross nominal rating.
          </li>
          <li>
            <strong>Specify Energy Consumption Basis:</strong> In driving mode, identify whether your consumption figure is from an onboard trip meter (battery-side, before charging losses) or an EPA window sticker label (wall-side, which already includes charging losses).
          </li>
          <li>
            <strong>Enter Electricity Rate ($/kWh):</strong> Input your home electricity tariff (e.g. $0.16/kWh) or commercial DC fast charge price (e.g. $0.45/kWh).
          </li>
          <li>
            <strong>Review Billed Grid Energy &amp; Cost:</strong> See total session monetary cost, billed grid kilowatt-hours (accounting for illustrative 90% wall-to-battery efficiency), and normalized cost per mile driven.
          </li>
        </ol>
      </section>

      <section id="sizing-matrix" style={{ marginTop: "2rem" }}>
        <h2>EV Charging Session &amp; Cost per Mile Reference Matrix</h2>
        <p>
          Calculated recharge costs for a standard 10% to 100% session (90-percentage-point state-of-charge increase, 90% illustrative AC efficiency) across popular battery capacities and electricity rates:
        </p>
        <div style={{ margin: "1rem 0", padding: "0.85rem 1.15rem", borderRadius: "0.5rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", fontSize: "0.85rem", lineHeight: 1.5 }}>
          <strong>Assumptions:</strong> 10% → 100% usable state-of-charge recharge window (90% net pack energy added). Wall energy drawn = (Usable Capacity &times; 0.90) &divide; 0.90 = Usable Capacity. Driving cost per mile assumes stated vehicle efficiency at residential rates ($0.10/kWh to $0.16/kWh).
        </div>
        <div className="scenario-table" role="region" aria-label="EV charging cost comparison table">
          <table>
            <caption>Estimated charging session cost &amp; cost-per-mile comparison calculated from canonical engine</caption>
            <thead>
              <tr>
                <th scope="col">Usable Battery Pack Size</th>
                <th scope="col">Off-Peak Home ($0.10/kWh)</th>
                <th scope="col">Illustrative Benchmark ($0.16/kWh)</th>
                <th scope="col">Commercial DC Fast ($0.45/kWh)</th>
                <th scope="col">Driving Cost per Mile</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_PACKS.map((pack) => {
                const offPeak = calculateEvChargingCost({
                  mode: "session",
                  batteryCapacityKwh: pack.capacity,
                  startSocPercent: 10,
                  targetSocPercent: 100,
                  sourceToBatteryEfficiency: 0.90,
                  pricePerKWh: 0.10,
                });
                const standardHome = calculateEvChargingCost({
                  mode: "session",
                  batteryCapacityKwh: pack.capacity,
                  startSocPercent: 10,
                  targetSocPercent: 100,
                  sourceToBatteryEfficiency: 0.90,
                  pricePerKWh: 0.16,
                });
                const dcFast = calculateEvChargingCost({
                  mode: "session",
                  batteryCapacityKwh: pack.capacity,
                  startSocPercent: 10,
                  targetSocPercent: 100,
                  sourceToBatteryEfficiency: 0.90,
                  pricePerKWh: 0.45,
                });

                const lowCostPerMile = (0.10 / pack.efficiencyMiPerKwh).toFixed(3);
                const highCostPerMile = (0.16 / pack.efficiencyMiPerKwh).toFixed(3);

                return (
                  <tr key={pack.label}>
                    <td>
                      <strong>{pack.label}</strong>
                      <br />
                      <small style={{ color: "var(--muted)" }}>{pack.examples}</small>
                    </td>
                    <td>${offPeak.sessionCost.toFixed(2)}</td>
                    <td>${standardHome.sessionCost.toFixed(2)}</td>
                    <td>${dcFast.sessionCost.toFixed(2)}</td>
                    <td>
                      <strong>${lowCostPerMile} – ${highCostPerMile} / mi</strong>
                      <br />
                      <small style={{ color: "var(--muted)" }}>({pack.efficiencyMiPerKwh} mi/kWh)</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          ⚠️ <strong>Public Charging Pricing Scope:</strong> This table models energy-priced ($/kWh) charging. Commercial DC fast charging networks may assess additional per-session connection fees, per-minute parking/idling charges, or subscription membership discounts.
        </p>
      </section>

      <section id="technical-references" style={{ marginTop: "2rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          PowerLab clearly distinguishes government energy accounting methodologies, electrical interface standards, and mathematical cost modeling:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>U.S. Department of Energy (DOE / AFDC)</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Provides national and state-level electricity price averages, public charging station registries, and residential fueling infrastructure research.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>U.S. EPA Fuel Economy Standards</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Establishes official EV electricity consumption ratings (kWh per 100 miles and MPGe). Note: EPA fuel-economy window sticker ratings measure total wall-to-wheel consumption (including charging losses).
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>SAE J1772 &amp; SAE J3400</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Define conductive AC/DC coupler physical interfaces and communication protocols. Standards govern physical connection and safety signaling rather than financial formulas.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>PowerLab Cost Model Basis</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Mathematical formulation dividing net battery-stored energy by overall wall-to-battery charging efficiency to obtain billed grid consumption. Models energy-based charging only.
            </p>
          </div>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Charging Cost &amp; Driving Expense Formulas"
          formula="Session Cost = [(Usable Capacity kWh × (Target SOC% − Start SOC%) / 100) / η_charging] × Rate_Per_kWh"
          formulaDescription="Calculates total monetary expense of an EV charging session by determining total wall-socket grid energy drawn, factoring in illustrative source-to-battery charging efficiency."
          variables={[
            { symbol: "Usable Capacity kWh", label: "Usable Battery Pack Size", description: "Usable energy storage available in the EV high-voltage traction battery pack (kWh).", unit: "kWh" },
            { symbol: "Target SOC% − Start SOC%", label: "Charge State Delta", description: "Target minus starting battery percentage (e.g. 10% to 80% = 70 percentage points = 0.70).", unit: "%" },
            { symbol: "η_charging", label: "Source-to-Battery Efficiency", description: "Overall source-to-battery charging efficiency — illustrative assumption (default 90% for AC charging).", unit: "dimensionless" },
            { symbol: "Rate_Per_kWh", label: "Electricity Rate", description: "Electricity tariff per billed kilowatt-hour in the entered rate currency.", unit: "currency/kWh" },
          ]}
          notes={[
            "Driving Cost (Battery Consumption Basis): Cost per 100 miles = [(Battery kWh/100 mi ÷ η_charging) × Rate_Per_kWh].",
            "Driving Cost (Wall/EPA Consumption Basis): Cost per 100 miles = [Wall kWh/100 mi × Rate_Per_kWh] (since EPA ratings already include wall-to-vehicle charging losses).",
            "Driving Cost per Mile = Cost per 100 miles ÷ 100.",
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
        <h2>Related EV Planning Tools</h2>
        <p>
          Compare annual savings versus gasoline with the <Link href="/ev/ev-savings-calculator">EV Savings Calculator</Link>, calculate session hours with the <Link href="/ev/ev-charging-time-calculator">EV Charging Time Calculator</Link>, size home charger electrical wiring with the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link>, or estimate trip range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

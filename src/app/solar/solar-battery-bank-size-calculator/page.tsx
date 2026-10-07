import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { SolarBatteryBankSizeCalculator } from "@/components/calculator/solar-battery-bank-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("solar-battery-bank-size");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Battery Bank Size Calculator — Storage kWh",
  description: "Calculate solar power battery bank size (kWh & Ah) from daily energy load, autonomy days, battery chemistry, and inverter efficiency.",
  canonicalPath: "/solar/solar-battery-bank-size-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "How do I calculate what size battery bank I need for solar?",
    answer: "Apply the canonical planning formula: Bank_kWh = (Daily_Load_kWh × Autonomy_Days × (1 + Margin)) / (Usable_SOC × Inverter_Eff × Available_Capacity_Factor). For example, a 5 kWh/day load with 1 day of autonomy, 80% usable SOC (LiFePO4), 90% inverter efficiency, 100% available capacity factor, and a 10% design margin requires: (5.0 × 1 × 1.10) / (0.80 × 0.90 × 1.00) = 7.64 kWh (approximately 159.2 Ah at 48V).",
  },
  {
    question: "Why is 48V preferred over 12V or 24V for solar battery banks?",
    answer: "Higher-voltage battery systems reduce DC current for a given power level (e.g., a 75% current reduction from 12V to 48V for equivalent wattage), which simplifies conductor sizing, reduces resistive voltage drop, and decreases thermal losses. Actual inverter power output depends on inverter rating, battery chemistry, BMS continuous current limits, protection hardware, wiring gauge, and overall system design.",
  },
  {
    question: "What is autonomy in solar battery sizing?",
    answer: "Autonomy refers to the duration (in days or hours) a battery storage system can support connected electrical loads without any charging input from solar panels, the grid, or a generator. A common planning exercise is to evaluate roughly 1–3 days of autonomy, but the appropriate target depends on local climate, solar irradiance patterns, backup generation availability, load criticality, and system reliability requirements.",
  },
  {
    question: "What is the difference between LiFePO4 and Lead-Acid for solar storage?",
    answer: "In standard planning models, Lithium Iron Phosphate (LiFePO4) commonly permits deeper usable depth of discharge (typically 80%–90% usable SOC) and can provide long service life (often modeled at 3,000–5,000 cycles), with high round-trip efficiency. Deep-cycle Lead-Acid (AGM/Gel/Flooded) is typically planned around 50% depth of discharge, yields 500–1,200 cycles, and experiences Peukert capacity reduction under heavy discharge rates. Actual cycle life, usable capacity, and efficiency depend on manufacturer specifications, cell chemistry, operating temperature, charge/discharge C-rates, operating SOC windows, BMS configuration, maintenance, and installation conditions.",
  },
];

export default function SolarBatteryBankSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Battery Bank Size Calculator",
    description: "Estimate stored-energy battery bank capacity in kWh and Ah from daily energy load and autonomy targets.",
    route: "/solar/solar-battery-bank-size-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates required stored-energy capacity in kWh and Ah (12V, 24V, 48V)",
      "Multi-day autonomy target modeling (1 to 5 days without sun)",
      "Chemistry-aware usable depth of discharge (LiFePO4, Lead-Acid, LTO)",
      "Accounts for depth-of-discharge reserve, inverter loss, available-capacity planning derating, and design margin",
    ],
    standards: [
      "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
      "IEEE Std 1013 (Recommended Practice for Sizing Lead-Acid Batteries for Stand-Alone Photovoltaic Systems)",
      "IEC 62619 (Secondary Lithium Cells and Batteries)",
      "NFPA 70 / NEC Article 706 (Energy Storage Systems)",
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
        <span aria-current="page">Solar Battery Bank Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar battery planning</p>
        <h1>Solar Battery Bank Size Calculator</h1>
        <p className="intro">
          Estimate the stored-energy capacity your off-grid solar battery bank needs based on daily appliance consumption, cloudy-day autonomy targets, and chemistry DOD limits.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarBatteryBankSizeCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="solar battery bank sizing calculation"
        answer="To size an off-grid solar battery bank, divide the total energy required during autonomy (daily load in kWh/day multiplied by autonomy days and a design margin) by the product of inverter efficiency, usable depth-of-discharge (DoD) fraction, and available capacity factor. A system with a 5 kWh/day load, 1 day of autonomy, 80% usable DoD, 90% inverter efficiency, 100% capacity factor, and a 10% design margin requires 7.64 kWh of nominal storage (~159.2 Ah at 48V)."
        formula="Bank_kWh = (Daily_Load_kWh × Autonomy_Days × (1 + Margin)) / (Usable_SOC × Inverter_Eff × Available_Capacity_Factor)"
        standardExample="Default Baseline: (5.0 kWh/day × 1 Day × 1.10 Margin) / (0.80 Usable SOC × 0.90 Inverter Eff × 1.00 Available Capacity) = 7.64 kWh nominal (159.2 Ah at 48V)"
        sourceAuthority="Technical Reference / Model Basis: IEEE Std 1013 (Sizing Lead-Acid Batteries for PV) & NFPA 70 / NEC Article 706"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an Off-Grid Solar Battery Bank</h2>
        <ol>
          <li><strong>Determine Daily Appliance Load (kWh/day):</strong> Daily load energy is the energy delivered to the loads. Inverter losses are modeled separately when inverter efficiency is below 100%.</li>
          <li><strong>Select Days of Autonomy:</strong> Choose how many consecutive sunless/cloudy days the battery must sustain without generator or solar recharge.</li>
          <li><strong>Choose Battery Chemistry:</strong> Select modern LiFePO4 (80%–90% usable DOD) or Lead-Acid/AGM (50% usable DOD).</li>
          <li><strong>Select System Voltage (12V / 24V / 48V):</strong> Review Amp-hour (Ah) requirements across voltage options to choose the right battery wiring layout.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Off-Grid Solar Battery Bank Sizing Guide</h2>
        <p>Recommended nominal battery bank capacity (kWh and 48V Ah) based on daily household electrical demand and days of autonomy without sun:</p>
        <div className="scenario-table" role="region" aria-label="Solar battery bank sizing matrix">
          <table>
            <caption>Recommended nominal LiFePO4 battery capacity (80% usable SOC, 90% inverter efficiency, 100% available capacity, 10% margin)</caption>
            <thead>
              <tr>
                <th scope="col">Daily Household Energy</th>
                <th scope="col">1 Day Autonomy</th>
                <th scope="col">2 Days Autonomy</th>
                <th scope="col">3 Days Autonomy (Cloud Buffer)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2.5 kWh / day</strong> (Small Off-Grid Cabin / RV)</td>
                <td>~3.8 kWh (79.6 Ah @ 48V)</td>
                <td>~7.6 kWh (159.2 Ah @ 48V)</td>
                <td>~11.5 kWh (238.7 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>5.0 kWh / day</strong> (Energy-Efficient Off-Grid Home)</td>
                <td>~7.6 kWh (159.2 Ah @ 48V)</td>
                <td>~15.3 kWh (318.3 Ah @ 48V)</td>
                <td>~22.9 kWh (477.5 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>10.0 kWh / day</strong> (Standard Off-Grid Family Home)</td>
                <td>~15.3 kWh (318.3 Ah @ 48V)</td>
                <td>~30.6 kWh (636.7 Ah @ 48V)</td>
                <td>~45.8 kWh (955.0 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>20.0 kWh / day</strong> (Large Home + Well Pump + Heat Pump)</td>
                <td>~30.6 kWh (636.7 Ah @ 48V)</td>
                <td>~61.1 kWh (1,273.3 Ah @ 48V)</td>
                <td>~91.7 kWh (1,910.0 Ah @ 48V)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas & Mathematical Methodology"
          formula="Bank_kWh = (Daily_Load_kWh * Autonomy_Days * (1 + Margin)) / (Usable_SOC * Inverter_Eff * Available_Capacity_Factor)"
          formulaDescription="Calculates nominal stored-energy capacity required for off-grid autonomy during sunless periods, accounting for Depth-of-Discharge (DOD) reserves, inverter efficiency, and available capacity factor."
          variables={[
            { symbol: "Daily_Load_kWh", label: "Load-Side Daily Energy", description: "Total energy delivered to connected AC/DC loads per day. Inverter losses are modeled separately.", unit: "kWh/day" },
            { symbol: "Autonomy_Days", label: "Days of Autonomy", description: "Continuous days of battery support required without meaningful solar or generator recharge.", unit: "days" },
            { symbol: "Margin", label: "Design Margin", description: "Planning safety buffer applied to total storage (e.g., 0.10 for 10%).", unit: "fraction" },
            { symbol: "Usable_SOC", label: "Usable DOD Window", description: "Nominal minus minimum reserve SOC (e.g. 0.80 for LiFePO4, 0.50 for Lead-Acid).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Inverter Efficiency (η)", description: "AC inverter DC-to-AC conversion efficiency (typically 0.88–0.94).", unit: "fraction" },
            { symbol: "Available_Capacity_Factor", label: "Available Capacity Factor", description: "Planning derating applied to nominal capacity. This is not a battery-aging prediction.", unit: "fraction" },
          ]}
          notes={[
            "Amp-Hour equivalent at nominal voltage V: Ah = (Bank_kWh × 1,000) / V.",
            "Higher-voltage battery systems (e.g., 48V vs 12V) reduce DC current by 75% for identical power, simplifying conductor sizing and reducing I²R resistive losses.",
            "Hardware configurations must arrange individual 12V or 24V battery units into balanced series strings matching nominal system voltage (e.g., 4S for 48V).",
          ]}
        />
      </div>

      <section id="technical-basis" style={{ marginTop: "2.5rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          PowerLab implements a calculation model based on the stated model and inputs designed for pre-engineering planning. The following technical references provide context for battery depth of discharge, string configuration, and safety criteria:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>IEEE Std 1013</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              Recommended practice for sizing lead-acid batteries in stand-alone photovoltaic (PV) systems, establishing depth-of-discharge and temperature derating methodologies.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>IEEE Std 485</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              Recommended practice for sizing stationary battery installations, addressing duty cycles, design margins, and capacity rating conventions.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>IEC 62619</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              Safety and operational requirements for secondary lithium cells and batteries used in industrial and stationary energy storage systems.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>NFPA 70 / NEC Article 706</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              National Electrical Code safety standards for Energy Storage Systems (ESS), including disconnecting means, overcurrent protection, and conductor sizing.
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
        <h2>Related Solar &amp; Battery Planning Tools</h2>
        <p>
          Calculate daily appliance watt-hours with our <Link href="/solar/solar-load-calculator">Solar Load Calculator</Link>, size your solar array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, match an MPPT controller with the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link>, or check battery discharge runtime with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { SolarLoadCalculator } from "@/components/calculator/solar-load-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("solar-load");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Load Calculator — Daily Wh & Connected Running Watts",
  description: "Calculate total daily electrical energy load (Wh/day and kWh/day) and connected running watts to plan off-grid solar panels and battery storage capacity.",
  canonicalPath: "/solar/solar-load-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "How do you calculate total solar electrical load?",
    answer: "Multiply each appliance's running wattage by its unit quantity, daily operating window (hours/day), and duty cycle (the fraction of time actively drawing power). Sum all appliances to find total daily energy in Watt-hours (Wh) or kilowatt-hours (kWh). This daily energy figure serves as the baseline input for downstream solar panel and battery bank sizing; complete system sizing also requires solar resource (peak sun hours), conversion losses, battery DoD, and autonomy margins.",
  },
  {
    question: "What is the difference between daily energy load (Wh) and connected running watts (W)?",
    answer: "Daily energy load (Watt-hours or kWh) measures total energy consumed over 24 hours and serves as the baseline input for solar array and battery storage sizing. Connected running watts (Watts) is the sum of listed running wattages if all selected appliances operate simultaneously. It does not measure actual peak demand, does not account for motor or compressor startup surge, and does not determine final inverter capacity on its own.",
  },
  {
    question: "Why do cycling appliances like refrigerators use duty cycles?",
    answer: "A refrigerator rated at 150 Watts does not draw 150W continuously for 24 hours. Once the interior reaches set temperature, the compressor cycles off. In typical room temperatures, a refrigerator has an active duty cycle of roughly 30% to 40% (~7 to 10 hours of active compressor run time per 24-hour window, yielding 150 W × 24 h × 35% = 1,260 Wh/day). Preset duty cycles are editable planning estimates, as actual energy consumption depends on ambient temperature, age, thermostat settings, and door openings. Plug-in meter measurements should be used whenever available.",
  },
  {
    question: "What is an essential versus non-essential load in solar planning?",
    answer: "Essential loads are specific appliances you designate to keep powered during grid outages or cloudy periods (e.g., refrigeration, medical devices, Wi-Fi router, LED lighting, water well pump). Non-essential loads (such as discretionary air conditioning, clothes dryers, or dishwashers) can be turned off to reduce the required battery storage and solar array capacity.",
  },
  {
    question: "How does connected running watts relate to inverter sizing?",
    answer: "Connected running watts indicates total simultaneous running power if all appliances run at once. Actual inverter selection also depends on startup inrush surge currents (e.g., inductive motor/compressor starting loads that can draw 3× to 6× rated watts for several seconds), power factor, continuous output derating at elevated ambient temperatures, and manufacturer surge specifications.",
  },
];

export default function SolarLoadPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Load Calculator",
    description: "Estimate daily appliance energy in Watt-hours and connected running watts in Watts for off-grid solar and battery storage planning.",
    route: "/solar/solar-load-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculates daily energy consumption in Wh/day and kWh/day",
      "Calculates total connected running watts for simultaneous load planning",
      "Appliance catalog with editable operating hours and cycling duty cycles",
      "One-click handoff to solar battery bank sizing",
    ],
    standards: [
      "IEEE Std 1562 (Array Sizing for Stand-Alone Photovoltaic Systems)",
      "NFPA 70 / NEC Article 220 (Branch-Circuit, Feeder, and Service Load Calculations Context)",
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
        <span aria-current="page">Solar Load Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar system sizing</p>
        <h1>Solar Load Calculator</h1>
        <p className="intro">
          Estimate your total daily appliance electrical energy consumption (Wh/day and kWh/day) and connected running watts to plan off-grid solar arrays and battery storage.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarLoadCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="solar load profile calculation"
        answer="Total daily solar load is the sum of every appliance's power draw multiplied by its unit quantity, operating hours per day, and duty cycle: Daily Energy (Wh/day) = Σ (Watts × Quantity × Hours/Day × Duty Cycle). For example, a refrigerator (150W × 1 × 24h × 35% = 1,260 Wh) + Wi-Fi router (12W × 1 × 24h × 100% = 288 Wh) + LED lighting (10W × 4 × 5h × 100% = 200 Wh) + TV (100W × 1 × 4h × 100% = 400 Wh) totals 2,148 Wh/day (2.148 kWh/day) with 302 W connected running watts."
        formula="Daily Energy (Wh/day) = Σ (Appliance Watts × Quantity × Daily Hours × Duty Cycle)"
        standardExample="Default Starter Load: Refrigerator (1.26 kWh) + Router (0.288 kWh) + Lights (0.20 kWh) + TV (0.40 kWh) = 2.148 kWh/day (302 W connected running watts)"
        sourceAuthority="Technical Reference / Model Basis: IEEE Std 1562 & NFPA 70 / NEC Article 220 Context"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Solar Load</h2>
        <ol>
          <li><strong>Select or Add Appliances:</strong> Choose common household appliances from the pre-populated catalog or enter custom wattages.</li>
          <li><strong>Set Daily Run Hours &amp; Quantity:</strong> Enter how many hours each device operates per day across its scheduled operating window.</li>
          <li><strong>Check Duty Cycles:</strong> Thermostatically cycled appliances (refrigerators, freezers) default to realistic 30%–40% duty cycles.</li>
          <li><strong>Filter Essential vs Total Load:</strong> Designate critical blackout loads to evaluate essential-only backup requirements.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar System Load Profiles &amp; Inverter Planning Guide</h2>
        <p>Illustrative daily watt-hour energy consumption profiles and continuous inverter power ranges for common off-grid and backup solar scenarios:</p>
        <div className="scenario-table" role="region" aria-label="Solar daily load sizing matrix">
          <table>
            <caption>Typical solar load profiles and illustrative continuous inverter power ranges</caption>
            <thead>
              <tr>
                <th scope="col">Application Scenario</th>
                <th scope="col">Representative Appliance Mix</th>
                <th scope="col">Daily Energy (Wh/day)</th>
                <th scope="col">Illustrative Continuous Inverter Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Overland / RV Setup</strong></td>
                <td>12V Fridge, LED lights, fan, phone/camera charging</td>
                <td>~600 – 1,000 Wh / day</td>
                <td>1,000 W – 1,500 W</td>
              </tr>
              <tr>
                <td><strong>Off-Grid Tiny House / Cabin</strong></td>
                <td>Energy-star fridge, Starlink, TV, laptops, lighting</td>
                <td>~2,500 – 4,500 Wh / day</td>
                <td>2,000 W – 3,000 W</td>
              </tr>
              <tr>
                <td><strong>Critical Home Backup</strong></td>
                <td>Fridge, deep freezer, well pump, router, security</td>
                <td>~5,000 – 8,000 Wh / day</td>
                <td>4,000 W – 6,000 W</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Off-Grid</strong></td>
                <td>All appliances, mini-split heat pump, induction cooktop</td>
                <td>~15,000 – 25,000 Wh / day</td>
                <td>8,000 W – 12,000 W</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="form-hint" style={{ marginTop: "0.5rem" }}>
          Inverter ranges are illustrative estimates. Final inverter sizing requires evaluating motor/compressor starting surge currents, power factor, and continuous power ratings.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Daily Solar Load &amp; Energy Demand Formulas"
          formula="Daily_Wh = ∑ (Watts_i * Quantity_i * Hours_i * Duty_Cycle_i)  |  Connected_Running_Watts = ∑ (Watts_i * Quantity_i)"
          formulaDescription="Calculates cumulative daily energy requirement (Wh/day) and connected running wattage (Watts) across all household AC/DC appliances."
          variables={[
            { symbol: "Watts_i", label: "Appliance Running Wattage", description: "Nominal electrical power drawn by appliance i.", unit: "W" },
            { symbol: "Quantity_i", label: "Unit Count", description: "Number of identical active appliances.", unit: "count" },
            { symbol: "Hours_i", label: "Operating Window", description: "Scheduled duration per day during which the appliance operates.", unit: "hours/day" },
            { symbol: "Duty_Cycle_i", label: "Duty Cycle Factor", description: "Fraction of the operating window during which the appliance actively draws rated power (e.g. 0.35 for refrigeration, 1.00 for lighting).", unit: "fraction" },
            { symbol: "Connected_Running_Watts", label: "Connected Running Watts", description: "Sum of listed running wattages if all selected appliances operate simultaneously (not a measured peak or surge calculation).", unit: "W" },
          ]}
          notes={[
            "Daily energy (Wh/day or kWh/day) is the baseline energy input for sizing solar arrays and battery banks.",
            "Connected running watts indicates simultaneous operating load; actual inverter sizing requires evaluating motor/compressor startup surge, continuous power ratings, power factor, and safety margins.",
            "Do not enter an already-derated runtime into Hours/day when a duty cycle is applied, to avoid double-counting the reduction.",
          ]}
        />
      </div>

      <section id="technical-basis" style={{ marginTop: "2.5rem" }}>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          PowerLab implements an appliance load aggregation model based on the stated model and inputs for pre-engineering solar planning. The following technical references provide context for array sizing and electrical load principles:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>IEEE Std 1562</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              IEEE Guide for Array and Battery Sizing in Stand-Alone Photovoltaic (PV) Systems, establishing the methodology of daily load profile summation as the foundation for system sizing.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--surface, #ffffff)" }}>
            <strong style={{ display: "block", color: "var(--brand-strong, #0284c7)", marginBottom: "0.25rem" }}>NFPA 70 / NEC Article 220 Context</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #64748b)", margin: 0 }}>
              National Electrical Code standards for branch-circuit and feeder load calculations, providing engineering background on continuous versus non-continuous load classifications.
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
        <h2>Related Solar &amp; Off-Grid Planning Tools</h2>
        <p>
          Size your battery storage with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, size your solar array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, or check inverter capacity with the <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

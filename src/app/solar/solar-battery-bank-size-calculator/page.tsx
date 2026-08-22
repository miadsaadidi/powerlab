import type { Metadata } from "next";
import Link from "next/link";
import { SolarBatteryBankSizeCalculator } from "@/components/calculator/solar-battery-bank-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


const isPublished = isCalculatorPublished("solar-battery-bank-size");

export const metadata: Metadata = {
  title: "Solar Battery Calculator — Size a Battery Bank",
  description: "Estimate solar battery bank size from daily load energy, autonomy, battery chemistry, SOC, inverter efficiency and planning margin. Get kWh and Ah capacity equivalents.",
  alternates: { canonical: "/solar/solar-battery-bank-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: { title: "Solar Battery Calculator — Size a Battery Bank", description: "Estimate stored-energy capacity for a solar battery bank with transparent, editable planning assumptions." },
};

const FAQS = [
  {
    question: "How do I calculate what size battery bank I need for solar?",
    answer: "Multiply your daily electricity load (kWh/day) by your desired days of autonomy (e.g. 1 to 3 sunless days). Then divide by the product of your inverter efficiency (~90%) and usable battery depth of discharge (80% for LiFePO4, 50% for Lead-Acid), plus a 10% design margin.",
  },
  {
    question: "Why is 48V preferred over 12V or 24V for solar battery banks?",
    answer: "48V battery systems reduce DC current draw by 75% compared to 12V systems for the same power load. Lower amperage allows for much thinner copper wiring, reduces resistive voltage drop, generates far less heat, and enables large 3,000W to 12,000W inverters.",
  },
  {
    question: "What is autonomy in solar battery sizing?",
    answer: "Autonomy refers to the number of consecutive days your battery bank can power your electrical loads without any solar generation or grid power (e.g., during severe rainstorms or winter overcast). Most off-grid setups design for 1.5 to 3 days of autonomy.",
  },
  {
    question: "What is the difference between LiFePO4 and Lead-Acid for solar storage?",
    answer: "LiFePO4 (Lithium Iron Phosphate) batteries offer 80% to 90% usable depth of discharge, 4,000+ cycle lifespan (10–15 years), and 95%+ round-trip efficiency. Lead-Acid (AGM/Gel) batteries only allow 50% depth of discharge, last 500 to 1,000 cycles (2–4 years), and suffer from significant Peukert capacity loss.",
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
      "Accounts for depth-of-discharge reserve, inverter loss, and battery degradation",
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

      <DirectAnswerCard
        keyword="solar battery bank sizing calculation"
        answer="To size an off-grid solar battery bank, multiply daily load (kWh/day) by days of autonomy (typically 1.5 to 2 days) and a 10% design buffer, then divide by inverter efficiency (90%) and usable battery depth of discharge (80% for LiFePO4). A home using 10 kWh/day with 1.5 days autonomy requires approximately 23 kWh of nominal LiFePO4 storage (480 Ah at 48V)."
        formula="Battery Capacity (kWh) = (Daily kWh × Autonomy Days × 1.10 Buffer) ÷ (Inverter Efficiency × Usable DoD Fraction)"
        standardExample="10 kWh/day with 1.5 days autonomy on LiFePO4: (10 × 1.5 × 1.10) ÷ (0.90 × 0.80) = 22.9 kWh (~477 Ah at 48V)"
        sourceAuthority="IEEE Std 1013 (Sizing Lead-Acid Batteries for PV) & NEC Article 706"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarBatteryBankSizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an Off-Grid Solar Battery Bank</h2>
        <ol>
          <li><strong>Determine Daily Appliance Load (kWh/day):</strong> Add up the daily energy consumption of all devices you need to power.</li>
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
            <caption>Recommended nominal LiFePO4 battery capacity (80% usable SOC, 90% inverter efficiency, 10% margin)</caption>
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
                <td>~3.8 kWh (79 Ah @ 48V)</td>
                <td>~7.6 kWh (158 Ah @ 48V)</td>
                <td>~11.5 kWh (239 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>5.0 kWh / day</strong> (Energy-Efficient Off-Grid Home)</td>
                <td>~7.6 kWh (159 Ah @ 48V)</td>
                <td>~15.3 kWh (318 Ah @ 48V)</td>
                <td>~22.9 kWh (477 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>10.0 kWh / day</strong> (Standard Off-Grid Family Home)</td>
                <td>~15.3 kWh (318 Ah @ 48V)</td>
                <td>~30.6 kWh (636 Ah @ 48V)</td>
                <td>~45.8 kWh (955 Ah @ 48V)</td>
              </tr>
              <tr>
                <td><strong>20.0 kWh / day</strong> (Large Home + Well Pump + Heat Pump)</td>
                <td>~30.6 kWh (636 Ah @ 48V)</td>
                <td>~61.1 kWh (1,273 Ah @ 48V)</td>
                <td>~91.7 kWh (1,910 Ah @ 48V)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar Battery Bank Sizing Formulas"
          formula="Bank_kWh = (Daily_Load_kWh × Autonomy_Days × (1 + Margin)) / (Usable_SOC × Inverter_Eff × Battery_Health)"
          formulaDescription="Calculates nominal stored-energy capacity required for off-grid autonomy during sunless periods, accounting for Depth-of-Discharge (DOD) reserves and power conversion losses."
          variables={[
            { symbol: "Daily_Load_kWh", label: "Load-Side Daily Energy", description: "Total AC/DC electricity required by your household appliances per day.", unit: "kWh/day" },
            { symbol: "Autonomy_Days", label: "Days of Autonomy", description: "Continuous days of battery support required without meaningful solar recharge.", unit: "days" },
            { symbol: "Usable_SOC", label: "Usable DOD Window", description: "Nominal minus minimum reserve SOC (e.g. 80% usable for LiFePO4, 50% for Lead-Acid).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Inverter Efficiency (η)", description: "AC inverter DC-to-AC conversion efficiency (typically 88%–93%).", unit: "fraction" },
            { symbol: "Margin", label: "Design Margin", description: "Planning safety buffer (typically 10%–15%).", unit: "fraction" },
          ]}
          notes={[
            "Amp-Hour equivalent at nominal voltage V: Ah = (Bank_kWh × 1,000) / V.",
            "48V battery systems require 1/4 the current (amperage) of 12V systems for the same power, significantly reducing wire gauge and resistive heat losses.",
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
        <h2>Related Solar &amp; Battery Planning Tools</h2>
        <p>
          Size your solar array with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>, match an MPPT controller with the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link>, or check battery discharge runtime with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

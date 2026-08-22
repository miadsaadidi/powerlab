import type { Metadata } from "next";
import Link from "next/link";
import { HomeBatterySizeCalculator } from "@/components/calculator/home-battery-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


const isPublished = isCalculatorPublished("home-battery-size");

export const metadata: Metadata = {
  title: "Home Battery Size Calculator — Backup kWh Estimate",
  description: "Estimate home battery size from household energy, backup scope, backup hours, reserve, inverter efficiency and planning margin.",
  alternates: { canonical: "/home-energy/home-battery-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: { title: "Home Battery Size Calculator — Backup kWh Estimate", description: "Estimate home backup battery capacity with transparent scope, duration and battery assumptions." },
};

const FAQS = [
  {
    question: "How many kWh of battery storage do I need to run a house during a power outage?",
    answer: "For critical essentials only (refrigeration, lights, Wi-Fi, phone charging: ~30% of normal energy), a 10 kWh to 13.5 kWh battery provides 12 to 24 hours of backup. For whole-home backup including central air conditioning and electric cooking, 20 kWh to 40 kWh (2 to 3 Powerwalls) is typically required.",
  },
  {
    question: "How many Tesla Powerwalls do I need for my home?",
    answer: "A single Tesla Powerwall 3 stores 13.5 kWh of usable energy with 11.5 kW continuous power output. Most homes need 1 Powerwall for essential circuit backup (12–24 hours), or 2 to 3 Powerwalls (27–40.5 kWh) to run heavy 240V loads like central AC, EV charging, and heat pumps.",
  },
  {
    question: "What is the difference between critical load backup and whole-home backup?",
    answer: "Critical load backup powers a dedicated sub-panel containing only essential circuits (fridge, lighting, medical gear, internet). Whole-home backup connects to your main electrical panel and powers every appliance, requiring higher battery capacity and surge wattage.",
  },
  {
    question: "Can home batteries recharge from rooftop solar during an outage?",
    answer: "Yes, grid-forming solar battery systems (such as Tesla Powerwall, Enphase IQ Battery, FranklinWH) can island from the grid and continue generating solar power during daylight hours to simultaneously power your home and recharge the battery bank.",
  },
];

export default function HomeBatterySizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Home Battery Size Calculator",
    description: "Estimate the home battery capacity in kWh needed for blackout backup and essential circuits.",
    route: "/home-energy/home-battery-size-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Calculates required home battery storage capacity in nominal kWh",
      "Configurable backup scopes: Critical (30%), Partial (50%), Whole Home (100%)",
      "Outage duration modeling from 4 hours to multi-day blackouts",
      "Transparent conversion loss, depth-of-discharge, and design margin modeling",
    ],
    standards: [
      "NFPA 70 / NEC Article 706 (Energy Storage Systems)",
      "UL 9540 (Standard for Energy Storage Systems and Equipment)",
      "IEEE 1547 (Interconnection and Interoperability of Distributed Energy Resources)",
      "IEC 62619 Secondary Lithium Cells",
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
        <span aria-current="page">Home Battery Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home energy planning</p>
        <h1>Home Battery Size Calculator</h1>
        <p className="intro">
          Estimate the total home battery storage capacity in kilowatt-hours (kWh) needed to protect your household during a blackout, from critical emergency circuits to whole-home backup.
        </p>
      </div>

      <DirectAnswerCard
        keyword="home battery backup sizing calculation"
        answer="To power critical home essentials (refrigerator, lighting, router, electronics: ~30% of normal consumption) for 24 hours during an outage, a typical home needs approximately 10 kWh to 13.5 kWh of usable battery storage (equivalent to 1 standard Tesla Powerwall 3). For whole-home backup including 240V central AC, 20 kWh to 40 kWh is recommended."
        formula="Required Capacity (kWh) = [(Daily Usage_kWh ÷ 24) × Scope_Fraction × Outage_Hours × 1.10 Margin] ÷ Inverter Efficiency"
        standardExample="900 kWh/mo home (~30 kWh/day), critical loads (30%) for 24h: [(30 ÷ 24) × 0.30 × 24 × 1.10] ÷ 0.90 = 11.0 kWh"
        sourceAuthority="NEC Article 706 & IEEE Std 2030.5 (Energy Storage Systems)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <HomeBatterySizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a Home Battery Backup System</h2>
        <ol>
          <li><strong>Enter Monthly Electricity Usage (kWh):</strong> Check your utility bill for average monthly consumption (US average is ~900 kWh/mo).</li>
          <li><strong>Select Backup Scope:</strong> Choose Critical Essentials (~30%), Partial Comfort (~50%), or Whole-Home (~100%).</li>
          <li><strong>Set Outage Duration Target:</strong> Select how many hours or days of blackout protection you require without grid power.</li>
          <li><strong>Review Battery Unit Recommendations:</strong> View required kWh capacity and equivalent standard home battery module counts (e.g. 13.5 kWh Powerwalls).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Home Backup Battery Sizing Reference Matrix</h2>
        <p>Recommended residential battery capacity (kWh) based on daily electricity consumption and desired blackout outage duration:</p>
        <div className="scenario-table" role="region" aria-label="Home battery sizing benchmark matrix">
          <table>
            <caption>Recommended nominal battery kWh (Critical 30% vs Whole-Home 100% scope, 80% usable DOD)</caption>
            <thead>
              <tr>
                <th scope="col">Daily Household Energy</th>
                <th scope="col">12-Hour Outage (Critical 30%)</th>
                <th scope="col">24-Hour Outage (Partial 50%)</th>
                <th scope="col">24-Hour Outage (Whole Home 100%)</th>
                <th scope="col">Typical Battery Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>15 kWh / day</strong> (Energy-Efficient Home)</td>
                <td>~3.2 kWh</td>
                <td>~10.6 kWh</td>
                <td>~21.2 kWh</td>
                <td>1× 10 kWh – 13.5 kWh unit</td>
              </tr>
              <tr>
                <td><strong>30 kWh / day</strong> (US National Average)</td>
                <td>~6.4 kWh</td>
                <td>~21.2 kWh</td>
                <td>~42.4 kWh</td>
                <td>2× 13.5 kWh units (e.g. Powerwall)</td>
              </tr>
              <tr>
                <td><strong>45 kWh / day</strong> (Large Home + Central AC)</td>
                <td>~9.5 kWh</td>
                <td>~31.8 kWh</td>
                <td>~63.5 kWh</td>
                <td>3× 13.5 kWh units</td>
              </tr>
              <tr>
                <td><strong>60 kWh / day</strong> (All-Electric + EV + Heat Pump)</td>
                <td>~12.7 kWh</td>
                <td>~42.4 kWh</td>
                <td>~84.7 kWh</td>
                <td>4× 13.5 kWh units or commercial stack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Home Battery Backup Capacity Formulas"
          formula="Battery_kWh = [(Daily_kWh × Scope × (Outage_Hours / 24)) / (Usable_SOC × Inverter_Eff × Health)] × (1 + Margin)"
          formulaDescription="Calculates residential energy storage required to maintain home electrical circuits during power grid outages based on backup scope percentage and outage duration."
          variables={[
            { symbol: "Daily_kWh", label: "Average Household Consumption", description: "Daily baseline electricity consumption (Monthly kWh ÷ 30.4375).", unit: "kWh/day" },
            { symbol: "Scope", label: "Backup Coverage Scope", description: "Share of normal loads backed up (30% Critical Essentials, 50% Partial, 100% Whole Home).", unit: "fraction" },
            { symbol: "Outage_Hours", label: "Target Autonomy Duration", description: "Continuous hours of grid blackout protection.", unit: "hours" },
            { symbol: "Usable_SOC", label: "Usable DOD Window", description: "Fraction of battery energy above reserve cutoff (typically 80%–90%).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Hybrid Inverter Efficiency", description: "DC-to-AC conversion efficiency (typically 88%–93%).", unit: "fraction" },
            { symbol: "Margin", label: "Design Buffer", description: "Safety margin for degradation and inverter standby tare power (typically 10%–15%).", unit: "fraction" },
          ]}
          notes={[
            "A typical residential home battery unit (e.g. Tesla Powerwall, Enphase 5P, FranklinWH) provides 5.0 to 13.5 kWh of nominal capacity.",
            "Whole-home backup for 240V HVAC or heat pumps requires checking the inverter continuous kW and peak surge LRA ratings.",
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
        <h2>Related Energy &amp; Storage Calculators</h2>
        <p>
          Size an emergency standby generator with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>, size off-grid solar storage with the <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, or calculate solar panel capacity with the <Link href="/solar/solar-panel-size-calculator">Solar Panel Size Calculator</Link>.
        </p>
      </section>
    </article>
  );
}

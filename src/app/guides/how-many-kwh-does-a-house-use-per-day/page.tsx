import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { ElectricityUsageCalculator } from "@/components/calculator/electricity-usage-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";

import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "How Many kWh Does a House Use Per Day? (2026)",
  description: "An average US home uses 29–30 kWh/day (900 kWh/mo). Calculate your exact daily power consumption by square footage, HVAC, and top household appliances.",
  canonicalPath: "/guides/how-many-kwh-does-a-house-use-per-day",
  category: "home-energy",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many kWh does an average house use per day?",
    answer: "According to data from the U.S. Energy Information Administration (EIA), the average American single-family household consumes approximately 29 to 30 kilowatt-hours (kWh) of electricity per day, totaling about 880 to 900 kWh per month or 10,600 to 10,800 kWh per year.",
  },
  {
    question: "How many kWh does an apartment use per day?",
    answer: "A typical 1-to-2 bedroom apartment or energy-efficient studio uses between 8 and 15 kWh per day (240 to 450 kWh per month), largely because shared walls reduce heating and cooling thermal losses compared to freestanding homes.",
  },
  {
    question: "Is 50 kWh a day a lot of electricity?",
    answer: "Yes, 50 kWh per day (1,500 kWh/month) is about 70% higher than the national average. Homes consuming 50+ kWh/day typically have large square footage (3,000+ sq ft), central air conditioning running in hot climates, electric resistance heat, pool pumps, or an electric vehicle charged daily.",
  },
  {
    question: "What appliance uses the most kWh in a house?",
    answer: "Central air conditioning and space heating are the largest electricity consumers, accounting for 35% to 45% of total household power (10 to 25 kWh/day in extreme seasons). Electric water heaters rank second, consuming 9 to 14 kWh/day (12% to 18% of the bill).",
  },
  {
    question: "How many solar panels do I need for 30 kWh per day?",
    answer: "To generate 30 kWh per day in a region receiving an average of 4.5 peak sun hours per day, you need approximately a 7.5 kW to 8.0 kW DC solar array (accounting for standard 15% to 20% system derating losses). This typically requires 18 to 20 modern 400-watt solar panels.",
  },
];

export default function HowManyKwhDoesAHouseUsePerDayPage() {
  const structuredData = buildGuideStructuredData({
    title: "How Many kWh Does a House Use Per Day? (Daily Electricity Calculator & Guide)",
    description: "Complete empirical breakdown of daily residential electricity consumption based on EIA utility benchmarks. Calculate your home's daily kilowatt-hour demand.",
    route: "/guides/how-many-kwh-does-a-house-use-per-day",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    standards: [
      "U.S. Energy Information Administration (EIA) RECS Benchmark Data",
      "NFPA 70 / National Electrical Code (NEC) Article 220 Branch Load Sizing",
      "NREL PVWatts Version 8 Generation Model",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">How Many kWh Does a House Use Per Day?</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Residential Energy Auditing &amp; Sizing Guide</p>
        <h1>How Many kWh Does a House Use Per Day?</h1>
        <p className="intro">
          A definitive empirical breakdown of daily residential electricity consumption based on U.S. Energy Information Administration (EIA) utility data, home square footage, and appliance duty cycles.
        </p>
      </header>

      <DirectAnswerCard
        keyword="how many kWh does a house use per day"
        answer="According to U.S. Energy Information Administration (EIA) data, the average American home consumes approximately 29 to 30 kWh of electricity per day (about 880–900 kWh per month). Actual daily demand ranges from 8–15 kWh/day for efficient apartments up to 45–65+ kWh/day for large homes with central air conditioning, electric heating, and EV charging."
        formula="Daily Energy (kWh) = ∑ [Appliance Rated Power (W) × Operating Hours (h) × Duty Cycle (%)] ÷ 1,000"
        standardExample="Typical 2,000 sq ft home: Central AC (12 kWh) + Water Heater (12 kWh) + Refrigerator (2.2 kWh) + Lighting & Electronics (3.8 kWh) = 30 kWh/day (~$4.80/day at $0.16/kWh)"
        sourceAuthority="U.S. Energy Information Administration (EIA) Residential Energy Survey"
      />

      <PageJumpNav />

      {/* Interactive Tool Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Calculate Your Home&apos;s Exact Daily kWh</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Select your household appliances, specify operating hours, and calculate your personalized daily and monthly kilowatt-hour consumption.
          </p>
        </div>
        <ElectricityUsageCalculator />
      </section>

      {/* Section 1: Benchmark Data Table */}
      <section id="benchmarks" style={{ marginTop: "2.5rem" }}>
        <h2>Daily Household Electricity Consumption by Home Size</h2>
        <p>
          Home electricity consumption scales primarily with conditioned floor area, climate zone, occupant count, and primary heating fuels. Below are empirical benchmarks across standard residential property types:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Daily and Monthly Electricity Usage by Home Size (US National Average Rates)</caption>
            <thead>
              <tr>
                <th scope="col">Home Type &amp; Size</th>
                <th scope="col">Daily Usage (kWh/day)</th>
                <th scope="col">Monthly Usage (kWh/mo)</th>
                <th scope="col">Annual Usage (kWh/yr)</th>
                <th scope="col">Est. Monthly Cost (@ $0.16/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Studio / 1-Bed Apartment</strong> (&lt;800 sq ft)</td>
                <td>8 – 14 kWh</td>
                <td>240 – 420 kWh</td>
                <td>2,900 – 5,100 kWh</td>
                <td>$38 – $67</td>
              </tr>
              <tr>
                <td><strong>Townhouse / Small Home</strong> (1,000 – 1,500 sq ft)</td>
                <td>15 – 24 kWh</td>
                <td>450 – 720 kWh</td>
                <td>5,400 – 8,600 kWh</td>
                <td>$72 – $115</td>
              </tr>
              <tr>
                <td><strong>Average Single-Family Home</strong> (1,800 – 2,400 sq ft)</td>
                <td><strong>28 – 32 kWh</strong></td>
                <td><strong>840 – 960 kWh</strong></td>
                <td><strong>10,200 – 11,500 kWh</strong></td>
                <td><strong>$134 – $154</strong></td>
              </tr>
              <tr>
                <td><strong>Large Home with Central AC</strong> (2,500 – 3,500 sq ft)</td>
                <td>35 – 48 kWh</td>
                <td>1,050 – 1,440 kWh</td>
                <td>12,600 – 17,200 kWh</td>
                <td>$168 – $230</td>
              </tr>
              <tr>
                <td><strong>All-Electric Home + EV Charger</strong> (3,000+ sq ft)</td>
                <td>50 – 75+ kWh</td>
                <td>1,500 – 2,250 kWh</td>
                <td>18,000 – 27,000 kWh</td>
                <td>$240 – $360</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Heavy Load Breakdown */}
      <section id="appliance-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>What Uses the Most Electricity in a House?</h2>
        <p>
          In a standard residential utility profile, over <strong>65% of total kilowatt-hours</strong> are consumed by just four heavy thermal and motor loads:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Central Air Conditioning &amp; Heat Pumps</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Power Draw:</strong> 2,500W to 5,000W (2.5 to 5.0 kW)<br />
              <strong>Daily Consumption:</strong> 10 to 25 kWh/day (35%–45% of total bill)<br />
              <strong>Duty Cycle:</strong> In peak summer or sub-zero winter, central compressors run 4 to 8 hours of cumulative runtime per day.
            </p>
            <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <Link href="/home-energy/air-conditioner-cost-calculator" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent)" }}>
                ⚡ Calculate Hourly &amp; Monthly AC Costs →
              </Link>
            </div>
          </article>

          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>2. Electric Water Heater (Standard Tank)</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Power Draw:</strong> 4,500W (4.5 kW standard dual element)<br />
              <strong>Daily Consumption:</strong> 9 to 14 kWh/day (14%–18% of total bill)<br />
              <strong>Duty Cycle:</strong> Cycles on for 2.5 to 3.5 cumulative hours daily maintaining 120°F to 140°F storage.
            </p>
            <Link href="/home-energy/appliance-wattage-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Audit Water Heater Wattage →
            </Link>
          </article>

          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>3. Electric Vehicle (Home Charging &amp; Range)</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Power Draw:</strong> 7,200W to 11,500W (32A to 48A @ 240V)<br />
              <strong>Daily Consumption:</strong> 10 to 30 kWh/day (for 35–90 miles of daily driving)<br />
              <strong>Efficiency:</strong> Typical EV consumes 0.28 to 0.35 kWh per mile driven.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
              <Link href="/ev/ev-charging-cost-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                EV Charging Costs →
              </Link>
              <Link href="/ev/ev-range-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                Highway &amp; Winter Range Calculator →
              </Link>
            </div>
          </article>

          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>4. Refrigerator &amp; Standby Base Loads</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Power Draw:</strong> 120W to 350W (compressor active)<br />
              <strong>Daily Consumption:</strong> 1.5 to 3.0 kWh/day<br />
              <strong>Duty Cycle:</strong> 30% to 40% duty cycle (active ~8 hours/day). Constant phantom standby loads add ~1 to 2 kWh/day.
            </p>
            <Link href="/battery/battery-runtime-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Check Refrigerator Backup Runtime →
            </Link>
          </article>
        </div>
      </section>

      {/* Section 3: Formula & Methodology */}
      <section id="formula-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>The Mathematical Formula for Calculating Daily kWh</h2>
        <p>
          Calculating true electrical energy consumption requires multiplying power demand (Watts) by operational duration (Hours) and dividing by 1,000 to convert to kilowatt-hours (kWh):
        </p>

        <FormulaCard
          title="Daily Kilowatt-Hour Calculation Model"
          formula="E_daily = ∑ [ (P_i × t_i × DC_i) ÷ 1,000 ]"
          formulaDescription="Empirical energy model calculating total cumulative active daily load across cycling and continuous appliances."
          variables={[
            { symbol: "E_daily", label: "Daily Energy Consumption", description: "Total daily electrical energy consumed by the home", unit: "kWh/day" },
            { symbol: "P_i", label: "Rated Appliance Power", description: "Nameplate electrical power draw of appliance i", unit: "Watts" },
            { symbol: "t_i", label: "Operating Time", description: "Powered window or active runtime duration per day", unit: "Hours" },
            { symbol: "DC_i", label: "Duty Cycle Fraction", description: "Percentage of time compressor/heating element actively draws power (1.0 for continuous, 0.35 for cycling refrigeration)", unit: "0.0 - 1.0" },
            { symbol: "1,000", label: "Metric Conversion Factor", description: "Conversion constant from Watts to Kilowatts (1 kW = 1,000 W)" },
          ]}
          notes={[
            "Conforms to NFPA 70 / NEC Article 220 general branch circuit demand factors.",
            "Cycling refrigeration loads assume nominal ambient baseline (70°F / 21°C).",
          ]}
        />

        <p style={{ marginTop: "1rem" }}>
          For an editable appliance-by-appliance estimate using this model, continue with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>

        <div style={{ padding: "1.25rem", borderRadius: "0.85rem", background: "rgba(198, 93, 36, 0.06)", border: "1px solid rgba(198, 93, 36, 0.2)", marginTop: "1.25rem" }}>
          <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Worked Example: 24-Hour Home Energy Audit</h3>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
            <li><strong>Central AC (3,500W @ 3.5h cumulative run):</strong> (3,500 × 3.5) ÷ 1,000 = <strong>12.25 kWh</strong></li>
            <li><strong>Water Heater (4,500W @ 2.5h active heating):</strong> (4,500 × 2.5) ÷ 1,000 = <strong>11.25 kWh</strong></li>
            <li><strong>Refrigerator (180W @ 35% duty cycle = 8.4h):</strong> (180 × 8.4) ÷ 1,000 = <strong>1.51 kWh</strong></li>
            <li><strong>LED Lighting, TVs, WiFi, Computers (~350W @ 12h combined):</strong> (350 × 12) ÷ 1,000 = <strong>4.20 kWh</strong></li>
            <li><strong>Total Daily Home Consumption:</strong> 12.25 + 11.25 + 1.51 + 4.20 = <strong>29.21 kWh/day</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 4: Connecting Daily kWh to Solar and Battery Sizing */}
      <section id="solar-battery-sizing" style={{ marginTop: "2.5rem" }}>
        <h2>How Daily kWh Translates into Solar &amp; Battery Sizing</h2>
        <p>
          Once you establish your baseline daily kilowatt-hour demand, you can accurately plan renewable energy equipment without under-sizing or over-paying:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.5rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)" }}>☀️ Sizing a Rooftop Solar PV System</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "var(--muted)" }}>
              To offset a <strong>30 kWh/day</strong> consumption in an area with <strong>4.5 peak sun hours</strong>:
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              Solar kW = 30 kWh ÷ (4.5 PSH × 0.85 Efficiency) = <strong>7.84 kW System</strong> (~20 × 400W panels)
            </p>
            <Link href="/solar/solar-panel-size-calculator" className="button" style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              Open Solar Panel Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)" }}>🔋 Sizing Home Battery Storage</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "var(--muted)" }}>
              To power critical blackout loads (refrigerator, lights, internet, medical: ~8 kWh/day) for <strong>2 days of autonomy</strong>:
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              Battery kWh = (8 kWh/day × 2 days) ÷ 0.90 DoD = <strong>17.7 kWh LiFePO4 Storage</strong>
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button" style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              Open Home Battery Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)" }}>❄️ Modeling Central AC &amp; Heat Pump Load</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "var(--muted)" }}>
              Because HVAC represents <strong>40% to 50%</strong> of daily summer kWh, model your exact cooling tonnage, SEER2 ratings, and cycling costs:
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              Cooling kWh = (36,000 BTU ÷ 15 SEER2 ÷ 1,000) × 10h = <strong>24.0 kWh/day</strong>
            </p>
            <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide" className="button" style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              Open Central AC &amp; Heat Pump Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: FAQs */}
      <section id="faqs" style={{ marginTop: "2.5rem" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              <summary style={{ fontWeight: 600, cursor: "pointer", color: "var(--brand-strong)" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 6: Methodology & Sources */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Data referenced in this guide is derived from the <strong>U.S. Energy Information Administration (EIA) Residential Energy Consumption Survey (RECS)</strong>, <strong>NFPA 70 / National Electrical Code (NEC 2023) Article 220</strong> branch circuit load calculation methods, and the <strong>National Renewable Energy Laboratory (NREL) PVWatts Version 8</strong> solar production performance standards.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>
    </article>
  );
}

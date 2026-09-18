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
    question: "Is 9 kWh or 12 kWh per day normal for a home or apartment?",
    answer: "Yes. 9 to 12 kWh per day (270 to 360 kWh per month) is a standard baseline for an energy-efficient apartment, a small townhouse, or a home utilizing natural gas for space heating, water heating, and cooking. In these setups, electricity is solely used for lighting, electronics, refrigeration, and light plug loads.",
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
    question: "How much does 30 kWh per day cost on an electric bill?",
    answer: "At the US national average residential electricity rate of $0.16 per kWh, 30 kWh per day costs approximately $4.80 per day, $144 per month, or $1,728 per year. In higher-rate states like California, Massachusetts, or New York ($0.25 to $0.35/kWh), 30 kWh/day costs $7.50 to $10.50/day ($225 to $315/month).",
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
    dateModified: "2026-09-18",
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
          A definitive empirical breakdown of daily residential electricity consumption based on U.S. Energy Information Administration (EIA) utility data, home square footage, climate zones, and major appliance duty cycles.
        </p>
      </header>

      <DirectAnswerCard
        keyword="how many kWh does a house use per day"
        answer="According to U.S. Energy Information Administration (EIA) data, the average American home consumes approximately 29 to 30 kWh of electricity per day (about 880–900 kWh per month). Actual daily demand ranges from 8–15 kWh/day for efficient apartments and gas-heated homes up to 45–65+ kWh/day for large all-electric homes with central air conditioning, heat pumps, and EV charging."
        formula="Daily Energy (kWh) = ∑ [Appliance Rated Power (W) × Operating Hours (h) × Duty Cycle (%)] ÷ 1,000"
        standardExample="Typical 2,000 sq ft home: Central AC (12 kWh) + Water Heater (12 kWh) + Refrigerator (2.2 kWh) + Lighting & Electronics (3.8 kWh) = 30 kWh/day (~$4.80/day at $0.16/kWh)"
        sourceAuthority="U.S. Energy Information Administration (EIA) Residential Energy Consumption Survey"
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

      {/* Section 1: Daily kWh Consumption Archetypes (9, 12, 20, 30, 50+ kWh/day) */}
      <section id="daily-kwh-archetypes" style={{ marginTop: "2.5rem" }}>
        <h2>What Does 9 kWh, 12 kWh, 20 kWh, 30 kWh, or 50 kWh Per Day Look Like?</h2>
        <p>
          Home electricity consumption varies dramatically depending on whether thermal loads (space heating, air conditioning, and water heating) are powered by electricity or natural gas. The table below illustrates the typical appliance configuration for common daily kilowatt-hour tiers:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Household Appliance Configurations Across Common Daily kWh Tiers</caption>
            <thead>
              <tr>
                <th scope="col">Daily kWh Tier</th>
                <th scope="col">Monthly Usage</th>
                <th scope="col">Typical Property &amp; Fuel Profile</th>
                <th scope="col">Primary Energy Loads Included</th>
                <th scope="col">Est. Cost (@ $0.16/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>9 kWh / day</strong></td>
                <td>270 kWh / mo</td>
                <td>1-Bed Apartment / Off-Grid Cabin (Gas HVAC &amp; Water)</td>
                <td>Efficient LED lighting, refrigerator (1.5 kWh), laptop/WiFi (0.8 kWh), TV (0.7 kWh), microwave/small plug loads (1.0 kWh), gas furnace blower (2.0 kWh), phantom base load (3.0 kWh).</td>
                <td>~$43 / month</td>
              </tr>
              <tr>
                <td><strong>12 kWh / day</strong></td>
                <td>360 kWh / mo</td>
                <td>2-Bed Condo / Energy-Efficient Townhouse (Gas Heating)</td>
                <td>Refrigerator &amp; freezer (2.2 kWh), mini-split AC 2h/day (3.0 kWh), LED lighting (1.0 kWh), home office &amp; TV (2.5 kWh), laundry/cooking (1.8 kWh), standby loads (1.5 kWh).</td>
                <td>~$58 / month</td>
              </tr>
              <tr>
                <td><strong>20 kWh / day</strong></td>
                <td>600 kWh / mo</td>
                <td>Small Single-Family (1,200–1,600 sq ft, Moderate Climate)</td>
                <td>Central AC or heat pump 4h/day (8.0 kWh), electric water heater moderate use (6.0 kWh), refrigerator (2.0 kWh), lighting &amp; appliances (4.0 kWh).</td>
                <td>~$96 / month</td>
              </tr>
              <tr>
                <td><strong>29–30 kWh / day</strong><br /><span style={{ fontSize: "0.8rem", color: "var(--brand-strong)" }}>★ US National Avg</span></td>
                <td><strong>880–900 kWh / mo</strong></td>
                <td><strong>Average US Home (2,000 sq ft, Mixed Fuel or Moderate AC)</strong></td>
                <td>Central AC 5h/day (12.0 kWh), electric water heater 3h active (11.0 kWh), refrigerator/freezers (2.5 kWh), washer/dryer/dishwasher (2.5 kWh), lighting &amp; electronics (2.0 kWh).</td>
                <td><strong>~$144 / month</strong></td>
              </tr>
              <tr>
                <td><strong>45–50 kWh / day</strong></td>
                <td>1,350–1,500 kWh / mo</td>
                <td>Large Home (2,500+ sq ft) or High Summer AC Usage</td>
                <td>Dual-zone Central AC 8h/day (22.0 kWh), electric water heater (12.0 kWh), refrigeration (3.5 kWh), home entertainment &amp; electronics (5.0 kWh), lighting &amp; plug loads (7.5 kWh).</td>
                <td>~$216–$240 / month</td>
              </tr>
              <tr>
                <td><strong>65–75+ kWh / day</strong></td>
                <td>1,950–2,250 kWh / mo</td>
                <td>All-Electric Modern Home + EV + Heat Pump + Pool Pump</td>
                <td>Heat pump space conditioning (25.0 kWh), Level 2 EV charging 40 mi/day (12.0 kWh), heat pump water heater (6.0 kWh), pool filtration pump (8.0 kWh), whole-house base loads (14.0 kWh).</td>
                <td>~$312–$360 / month</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Square Footage & Climate Zone Benchmarks */}
      <section id="benchmarks-sqft" style={{ marginTop: "2.5rem" }}>
        <h2>Daily Electricity Consumption by Square Footage &amp; Climate Zone</h2>
        <p>
          Conditioned floor area and outdoor climate dictate the thermal envelope load. Heating and cooling demand varies substantially between hot Southern climates (high cooling degree days), cold Northern climates (high heating degree days), and temperate coastal zones:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Estimated Daily kWh Usage by Square Footage and Regional Climate Zone</caption>
            <thead>
              <tr>
                <th scope="col">Home Size (Sq Ft)</th>
                <th scope="col">Moderate Climate (Coastal / Mild)</th>
                <th scope="col">Hot Climate (High Summer AC)</th>
                <th scope="col">Cold Climate (All-Electric Heat)</th>
                <th scope="col">Estimated Solar Array Size (4.5 PSH)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Under 1,000 sq ft</strong></td>
                <td>8 – 12 kWh/day</td>
                <td>14 – 20 kWh/day</td>
                <td>18 – 28 kWh/day</td>
                <td>2.5 – 4.0 kW (6–10 panels)</td>
              </tr>
              <tr>
                <td><strong>1,000 – 1,500 sq ft</strong></td>
                <td>15 – 22 kWh/day</td>
                <td>24 – 32 kWh/day</td>
                <td>30 – 42 kWh/day</td>
                <td>4.5 – 6.5 kW (11–16 panels)</td>
              </tr>
              <tr>
                <td><strong>1,500 – 2,200 sq ft</strong></td>
                <td>22 – 28 kWh/day</td>
                <td>32 – 44 kWh/day</td>
                <td>40 – 58 kWh/day</td>
                <td>6.5 – 9.0 kW (16–23 panels)</td>
              </tr>
              <tr>
                <td><strong>2,200 – 3,000 sq ft</strong></td>
                <td>28 – 38 kWh/day</td>
                <td>42 – 58 kWh/day</td>
                <td>55 – 75 kWh/day</td>
                <td>8.5 – 12.0 kW (21–30 panels)</td>
              </tr>
              <tr>
                <td><strong>3,000+ sq ft</strong></td>
                <td>38 – 50+ kWh/day</td>
                <td>55 – 80+ kWh/day</td>
                <td>70 – 100+ kWh/day</td>
                <td>12.0 – 18.0+ kW (30–45+ panels)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Comprehensive Appliance Wattage & Daily Energy Budget */}
      <section id="appliance-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>Complete Household Appliance Daily Electricity Breakdown</h2>
        <p>
          In a typical 30 kWh/day household, electrical demand is heavily concentrated in high-wattage heating and cooling elements. The table below breaks down the typical power draw, runtime, and daily energy contribution for standard residential appliances:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 3: Appliance Power Ratings, Operating Hours, and Daily Kilowatt-Hour Demands</caption>
            <thead>
              <tr>
                <th scope="col">Appliance / Electrical Load</th>
                <th scope="col">Average Power (Watts)</th>
                <th scope="col">Typical Daily Runtime</th>
                <th scope="col">Duty Cycle (%)</th>
                <th scope="col">Daily Energy (kWh/day)</th>
                <th scope="col">% of 30 kWh Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Central AC (3-Ton, 15 SEER2)</strong></td>
                <td>2,400 W</td>
                <td>8.0 hrs</td>
                <td>60% (4.8h compressor run)</td>
                <td><strong>11.52 kWh</strong></td>
                <td>38.4%</td>
              </tr>
              <tr>
                <td><strong>Electric Water Heater (50 Gal Tank)</strong></td>
                <td>4,500 W</td>
                <td>2.5 hrs active heating</td>
                <td>100% (when heating)</td>
                <td><strong>11.25 kWh</strong></td>
                <td>37.5%</td>
              </tr>
              <tr>
                <td><strong>Heat Pump Water Heater (Hybrid)</strong></td>
                <td>500 W</td>
                <td>6.0 hrs</td>
                <td>100% (compressor active)</td>
                <td><strong>3.00 kWh</strong></td>
                <td>10.0%</td>
              </tr>
              <tr>
                <td><strong>Level 2 EV Charger (32A @ 240V, 30 mi)</strong></td>
                <td>7,680 W</td>
                <td>1.2 hrs</td>
                <td>100%</td>
                <td><strong>9.22 kWh</strong></td>
                <td>30.7%</td>
              </tr>
              <tr>
                <td><strong>Electric Clothes Dryer</strong></td>
                <td>3,000 W</td>
                <td>0.8 hrs (1 standard cycle)</td>
                <td>100%</td>
                <td><strong>2.40 kWh</strong></td>
                <td>8.0%</td>
              </tr>
              <tr>
                <td><strong>Refrigerator &amp; Freezer (Energy Star)</strong></td>
                <td>180 W</td>
                <td>24.0 hrs</td>
                <td>35% (8.4h compressor run)</td>
                <td><strong>1.51 kWh</strong></td>
                <td>5.0%</td>
              </tr>
              <tr>
                <td><strong>Electric Range / Oven (Cooking)</strong></td>
                <td>2,500 W</td>
                <td>0.75 hrs</td>
                <td>70% (thermostat cycling)</td>
                <td><strong>1.31 kWh</strong></td>
                <td>4.4%</td>
              </tr>
              <tr>
                <td><strong>Dishwasher (Normal Heated Dry)</strong></td>
                <td>1,400 W</td>
                <td>1.0 hr (1 cycle)</td>
                <td>100%</td>
                <td><strong>1.40 kWh</strong></td>
                <td>4.7%</td>
              </tr>
              <tr>
                <td><strong>LED Lighting (15 Fixtures × 10W)</strong></td>
                <td>150 W</td>
                <td>5.0 hrs</td>
                <td>100%</td>
                <td><strong>0.75 kWh</strong></td>
                <td>2.5%</td>
              </tr>
              <tr>
                <td><strong>Home Office &amp; WiFi Router (Continuous)</strong></td>
                <td>80 W</td>
                <td>24.0 hrs</td>
                <td>100%</td>
                <td><strong>1.92 kWh</strong></td>
                <td>6.4%</td>
              </tr>
              <tr>
                <td><strong>Standby / Phantom Vampire Loads</strong></td>
                <td>60 W</td>
                <td>24.0 hrs</td>
                <td>100%</td>
                <td><strong>1.44 kWh</strong></td>
                <td>4.8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.5rem 0" }}>
          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Central Air Conditioning &amp; Heat Pumps</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Power Draw:</strong> 2,000W to 5,000W (2.0 to 5.0 kW)<br />
              <strong>Daily Consumption:</strong> 10 to 25 kWh/day (35%–45% of total bill)<br />
              <strong>Duty Cycle:</strong> In peak summer or sub-zero winter, central compressors run 4 to 8 hours of cumulative runtime per day.
            </p>
            <Link href="/home-energy/air-conditioner-cost-calculator" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent)" }}>
              ⚡ Calculate Hourly &amp; Monthly AC Costs →
            </Link>
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

      {/* Section 4: Formula & Methodology */}
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
          <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Worked Example: 24-Hour Home Energy Audit (29.2 kWh/day)</h3>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
            <li><strong>Central AC (3,500W @ 3.5h cumulative run):</strong> (3,500 × 3.5) ÷ 1,000 = <strong>12.25 kWh</strong></li>
            <li><strong>Water Heater (4,500W @ 2.5h active heating):</strong> (4,500 × 2.5) ÷ 1,000 = <strong>11.25 kWh</strong></li>
            <li><strong>Refrigerator (180W @ 35% duty cycle = 8.4h):</strong> (180 × 8.4) ÷ 1,000 = <strong>1.51 kWh</strong></li>
            <li><strong>LED Lighting, TVs, WiFi, Computers (~350W @ 12h combined):</strong> (350 × 12) ÷ 1,000 = <strong>4.20 kWh</strong></li>
            <li><strong>Total Daily Home Consumption:</strong> 12.25 + 11.25 + 1.51 + 4.20 = <strong>29.21 kWh/day</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 5: Connecting Daily kWh to Solar and Battery Sizing */}
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

      {/* Section 6: Connected Planning Tools */}
      <section id="connected-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Connected Residential Energy &amp; Utility Planning Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Audit your exact household electricity usage, estimate utility bills, and model clean energy offsets with PowerLab&apos;s calculation engines:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Electricity Usage Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Custom load audit: add specific household appliances, set operational hours, and calculate daily/monthly kilowatt-hours.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>❄️ Air Conditioner Cost Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compute cooling costs per hour and month for central AC, mini-splits, and window units with SEER2 efficiency.
            </p>
            <Link href="/home-energy/air-conditioner-cost-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Air Conditioner Cost Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>💡 Energy Bill Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model tiered utility rate structures, fixed customer charges, and calculate monthly power bill totals.
            </p>
            <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Energy Bill Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Home Battery Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size a whole-house battery backup system (kWh) for 1, 2, or 3 days of complete off-grid blackout resilience.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Home Battery Size Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/electricity-usage-calculator" className="button" style={{ fontSize: "0.85rem" }}>⚡ Electricity Usage Calculator →</Link>
          <Link href="/home-energy/appliance-wattage-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Appliance Wattage Calculator</Link>
          <Link href="/home-energy/space-heater-cost-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Space Heater Cost Calculator</Link>
          <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Solar Panel Output Calculator</Link>
        </div>
      </section>

      {/* Section 7: FAQs */}
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

      {/* Section 8: Methodology & Sources */}
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


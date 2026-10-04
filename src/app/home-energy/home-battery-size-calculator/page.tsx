import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { HomeBatterySizeCalculator } from "@/components/calculator/home-battery-size-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("home-battery-size");

export const metadata: Metadata = buildPageMetadata({
  title: "Home Battery Size Calculator — Backup kWh Sizing",
  description: "Estimate home battery capacity in kWh from household energy, backup scope, outage duration, reserve, inverter efficiency and planning margin.",
  canonicalPath: "/home-energy/home-battery-size-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How many kWh of battery storage do I need to run a house during a power outage?",
    answer:
      "Required battery capacity depends on average daily energy consumption, backed-up load fraction, outage duration, usable SOC window, inverter efficiency, battery health, and planning margin. For example, for an average 30 kWh/day home, critical loads (~30% illustrative estimate) for 12 hours require ~6.88 kWh of nominal battery capacity, while whole-home backup (100%) for 24 hours requires ~45.83 kWh (assuming 80% usable SOC, 90% inverter efficiency, 100% health, and a 10% design margin). Actual circuit-level loads can differ substantially from average daily energy percentages.",
  },
  {
    question: "How many 13.5 kWh battery units do I need for my home?",
    answer:
      "The required number of modular 13.5 kWh battery units is calculated by dividing total required battery storage by unit capacity: Required Units = ceil(Required_kWh / 13.5). For a 30 kWh/day home requiring 6.88 kWh for 12 hours of critical backup, 1 unit is sufficient. For 24 hours of whole-home backup requiring 45.83 kWh, 4 units (54 kWh nominal) are needed. In addition to energy storage (kWh), you must separately verify that total inverter continuous output (kW) and motor surge capacity (LRA) can start and run heavy 240V loads such as central AC, heat pumps, or well pumps.",
  },
  {
    question: "What is the difference between critical load backup and whole-home backup?",
    answer:
      "Critical load backup (~30% planning estimate) powers a dedicated critical loads sub-panel containing only essential circuits (refrigeration, lighting, networking, medical devices). Whole-home backup (100%) connects to your main electrical panel to back up all household branch circuits. Whole-home backup requires significantly higher energy storage (kWh) and high continuous/surge inverter power (kW) to handle concurrent large appliance starts.",
  },
  {
    question: "Can home batteries recharge from rooftop solar during an outage?",
    answer:
      "Yes, island-capable solar battery systems with a microgrid interconnect device (MID) or automatic transfer switch can form a local AC grid during utility blackouts. This allows rooftop solar panels to simultaneously power home circuits and replenish the battery bank during daylight hours.",
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
      "Transparent conversion loss, depth-of-discharge, and general planning margin modeling",
    ],
    standards: [
      "NFPA 70 / NEC Article 706 (Energy Storage Systems Reference)",
      "UL 9540 (Energy Storage Systems Technical Reference)",
      "IEEE 2030.5 / IEEE 1547 (Distributed Energy Resources Reference)",
      "IEC 62619 Secondary Lithium Cells Reference",
    ],
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821940",
    companionPaperUrl: "https://www.powelab.org/research/stationary-bess-peukert-derating-inverter-tare-loss",
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

      <div id="calculator-tool">
        <HomeBatterySizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="home battery backup sizing calculation"
        answer="To power critical home essentials (refrigerator, lighting, router, electronics: ~30% planning estimate of normal consumption) for 12 to 24 hours during an outage, a typical home needs approximately 6.9 kWh to 13.8 kWh of nominal battery storage (under 80% usable SOC, 90% inverter efficiency, and 10% margin). Whole-home backup (100% load) for 24 hours typically requires 40 kWh to 50+ kWh depending on baseline use. Note that battery energy (kWh) sizing is separate from inverter continuous and surge power (kW) requirements."
        formula="Battery_kWh = [(Daily_kWh × Scope × (Outage_Hours / 24)) / (Usable_SOC × Inverter_Eff × Health)] × (1 + Margin)"
        standardExample="300 kWh/mo home (~9.86 kWh/day), 50% partial scope for 12h: [(9.86 × 0.50 × (12 ÷ 24)) ÷ (0.80 × 0.90 × 1.00)] × 1.10 = 3.76 kWh"
        sourceAuthority="Technical Reference Basis: NEC Article 706 & IEEE 2030.5"
      />

      {/* Next-Step Planning Pathways */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ fontSize: "1.15rem", margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>
          🧭 Connected Home Energy Planning Pathways
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.5 }}>
          Integrate your battery storage sizing with appliance load audits and utility bill analysis:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>⚡ Itemize Appliance Running &amp; Surge Loads</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Audit specific watts and starting surge (LRA) to verify your inverter and battery continuous kW ratings.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>📊 Benchmark Daily kWh Baseline</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compare your baseline consumption against U.S. EIA national averages (~29–30 kWh/day) and seasonal demand profiles.
            </p>
            <Link href="/guides/how-many-kwh-does-a-house-use-per-day" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Daily kWh Usage Guide →
            </Link>
          </div>

          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "var(--brand-strong)" }}>💵 Project Electric Bill &amp; TOU Savings</h3>
            <p style={{ fontSize: "0.83rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model utility cost savings from rate arbitrage, peak shaving, and solar self-consumption during peak tariff periods.
            </p>
            <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.82rem" }}>
              Energy Bill Calculator →
            </Link>
          </div>
        </div>
      </section>

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a Home Battery Backup System</h2>
        <ol>
          <li><strong>Enter Monthly Electricity Usage (kWh):</strong> Check your utility bill for average monthly consumption (US EIA residential average is ~880–900 kWh/mo).</li>
          <li><strong>Select Backup Scope:</strong> Choose Critical Essentials (~30% planning estimate), Partial Home (~50%), or Whole-Home (100%).</li>
          <li><strong>Set Outage Duration Target:</strong> Select how many continuous hours of blackout protection you require without grid power.</li>
          <li><strong>Review Battery Unit Recommendations:</strong> View required nominal kWh capacity and illustrative module equivalents (e.g. 13.5 kWh units).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Home Backup Battery Sizing Reference Matrix</h2>
        <p>Recommended nominal residential battery capacity (kWh) based on daily electricity consumption and desired blackout outage duration:</p>
        <div className="scenario-table" role="region" aria-label="Home battery sizing benchmark matrix">
          <table>
            <caption>Recommended nominal battery kWh (Critical 30% vs Whole-Home 100% scope, 80% usable SOC, 90% inverter efficiency, 100% health, 10% margin)</caption>
            <thead>
              <tr>
                <th scope="col">Daily Household Energy</th>
                <th scope="col">12-Hour Outage (Critical 30%)</th>
                <th scope="col">24-Hour Outage (Partial 50%)</th>
                <th scope="col">24-Hour Outage (Whole Home 100%)</th>
                <th scope="col">Illustrative Battery Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>15 kWh / day</strong> (Energy-Efficient Home)</td>
                <td>~3.44 kWh</td>
                <td>~11.46 kWh</td>
                <td>~22.92 kWh</td>
                <td>1× 13.5 kWh unit (or 1× 5.12 kWh module for critical)</td>
              </tr>
              <tr>
                <td><strong>30 kWh / day</strong> (US EIA National Average)</td>
                <td>~6.88 kWh</td>
                <td>~22.92 kWh</td>
                <td>~45.83 kWh</td>
                <td>1× 13.5 kWh unit (critical) / 4× 13.5 kWh units (whole)</td>
              </tr>
              <tr>
                <td><strong>45 kWh / day</strong> (Large Home + Central AC)</td>
                <td>~10.31 kWh</td>
                <td>~34.38 kWh</td>
                <td>~68.75 kWh</td>
                <td>1× 13.5 kWh unit (critical) / 6× 13.5 kWh units (whole)</td>
              </tr>
              <tr>
                <td><strong>60 kWh / day</strong> (All-Electric + EV + Heat Pump)</td>
                <td>~13.75 kWh</td>
                <td>~45.83 kWh</td>
                <td>~91.67 kWh</td>
                <td>2× 13.5 kWh units (critical) / 7× 13.5 kWh units (whole)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          *Note: The 30 kWh/day baseline reflects the U.S. EIA national average for residential utility customers (~880–900 kWh/month). Values are calculated using the canonical formula with 80% usable SOC, 90% inverter efficiency, 100% health, and 10% general planning margin. Module counts are illustrative capacity approximations only and do not replace professional electrical engineering or inverter surge/power sizing.*
        </p>
      </section>

      {/* Dataset & Research Cross-Link Callout */}
      <section style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: "0.75rem", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", color: "#065f46" }}>
          📊 Open Empirical Benchmark Data &amp; Battery Storage Research
        </h3>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.6 }}>
          Need empirical discharge curves and Peukert derating coefficients for residential lithium iron phosphate (LiFePO4) storage systems? Explore our open <Link href="/datasets/bess-peukert-capacity-derating-tare-loss-benchmark" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>Residential BESS Peukert Derating Benchmark Dataset (PL-DS-BESS-05)</Link>, the <Link href="/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>Residential BESS Degradation &amp; Thermal Loss Benchmark (PL-DS-BESS-06)</Link>, and companion whitepaper on <Link href="/research/electrochemical-peukert-derating-bess" style={{ fontWeight: 700, color: "#059669", textDecoration: "underline" }}>High-Discharge C-Rate Capacity Derating in Residential BESS (PL-TR-2026-BESS01)</Link>.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Home Battery Backup Capacity Formulas"
          formula="Battery_kWh = [(Daily_kWh × Scope × (Outage_Hours / 24)) / (Usable_SOC × Inverter_Eff × Health)] × (1 + Margin)"
          formulaDescription="Calculates residential energy storage required to maintain home electrical circuits during power grid outages based on backup scope percentage and outage duration."
          variables={[
            { symbol: "Daily_kWh", label: "Average Household Consumption", description: "Daily baseline electricity consumption (Monthly kWh ÷ 30.4375).", unit: "kWh/day" },
            { symbol: "Scope", label: "Backup Coverage Scope", description: "Illustrative planning share of normal loads backed up (30% Critical Essentials, 50% Partial Home, 100% Whole Home).", unit: "fraction" },
            { symbol: "Outage_Hours", label: "Target Autonomy Duration", description: "Continuous hours of grid blackout protection.", unit: "hours" },
            { symbol: "Usable_SOC", label: "Usable DOD Window", description: "Fraction of battery energy above reserve cutoff (typically 80%–90%).", unit: "fraction" },
            { symbol: "Inverter_Eff", label: "Hybrid Inverter Efficiency", description: "DC-to-AC conversion efficiency (typically 88%–93%).", unit: "fraction" },
            { symbol: "Health", label: "Battery State of Health", description: "Available capacity fraction of battery (typically 80%–100%).", unit: "fraction" },
            { symbol: "Margin", label: "Planning Margin", description: "General planning margin applied to calculated battery capacity. It is not a separate degradation or standby-power model.", unit: "fraction" },
          ]}
          notes={[
            "A standard residential home battery unit provides 5.0 to 13.5 kWh of nominal capacity.",
            "Energy sizing (kWh) must be paired with power sizing (kW): whole-home backup for 240V HVAC, heat pumps, or compressors requires checking inverter continuous kW and peak motor starting (LRA) ratings.",
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

      <section id="related-tools" style={{ marginTop: "3rem" }}>
        <h2>Related Energy Storage, Appliance Auditing &amp; Resilience Planning</h2>
        <p>
          Sizing whole-house energy storage is one step in a complete residential energy resilience plan. PowerLab connects battery sizing directly into appliance auditing, Amp-Hour conversion, and alternative backup generation:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🔌 Audit Appliance Loads &amp; Duty Cycles</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Audit specific household devices (refrigerators, well pumps, Wi-Fi, HVAC) to tally exact continuous watts and duty cycles before sizing a battery bank.
            </p>
            <Link href="/home-energy/electricity-usage-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Electricity Usage Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⚡ Convert kWh to Amp-Hours (Ah)</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Translate your target battery kWh requirement into Amp-Hours (Ah) across 12V, 24V, and 48V stationary lithium battery systems.
            </p>
            <Link href="/battery/battery-capacity-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Battery Capacity Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⏱️ Model Battery Outage Runtime</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Calculate precise discharge hours under active loads with electrochemical Peukert derating and continuous inverter tare draw.
            </p>
            <Link href="/battery/battery-runtime-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Battery Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🚗 EV Bidirectional V2L / V2H Backup</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Explore using your electric vehicle&apos;s 77–131 kWh battery pack as a whole-home backup generator via manual or automatic transfer switches.
            </p>
            <Link href="/guides/ev-v2l-v2h-home-backup-power-guide" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EV V2L &amp; V2H Home Backup Guide →
            </Link>
          </div>
        </div>

        <p style={{ marginTop: "1rem" }}>
          📖 <strong>In-Depth Technical Guides &amp; Research:</strong> Benchmark your home&apos;s baseline with our <Link href="/guides/how-many-kwh-does-a-house-use-per-day" style={{ fontWeight: 600, color: "var(--accent)" }}>Daily Household kWh Usage Guide</Link>, examine our <Link href="/datasets/residential-bess-low-load-efficiency-and-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>Residential BESS Low-Load Efficiency Benchmark (PL-DS-BESS-07)</Link>, learn battery runtime formulas in the <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Battery Runtime Guide</Link>, or inspect empirical Peukert discharge data in our open <Link href="/datasets/bess-peukert-capacity-derating-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>Residential BESS Peukert Benchmark (PL-DS-BESS-05)</Link>.
        </p>
      </section>
    </article>
  );
}

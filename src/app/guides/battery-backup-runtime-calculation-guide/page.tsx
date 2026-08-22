import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { BatteryRuntimeCalculator } from "@/components/calculator/battery-runtime-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";

export const metadata: Metadata = {
  title: "Battery Backup Runtime Formula & Calculation Guide (Ah, Wh & Inverter Losses) — PowerLab",
  description: "Master the battery runtime formula for LiFePO4, AGM, and Lead-Acid systems. Calculate amp-hours to watt-hours, inverter efficiency losses, and Peukert capacity derating.",
  alternates: { canonical: "/guides/battery-backup-runtime-calculation-guide" },
  openGraph: {
    title: "Battery Backup Runtime Formula & Calculation Guide — PowerLab",
    description: "Complete engineering guide to calculating battery backup runtime. Includes Amp-Hour to Watt-Hour conversions, inverter efficiency derating, and Peukert's law.",
    url: `${siteConfig.url}/guides/battery-backup-runtime-calculation-guide`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
};

const FAQS = [
  {
    question: "What is the formula to calculate battery backup runtime?",
    answer: "The fundamental battery runtime formula is: Runtime (Hours) = (Battery Nominal Capacity in Watt-hours × Depth of Discharge × Inverter Efficiency) ÷ Total Load in Watts. If starting from Amp-hours, calculate Watt-hours first: Watt-hours = Amp-hours × Battery Voltage.",
  },
  {
    question: "How long will a 100Ah 12V battery run an appliance?",
    answer: "A 12V 100Ah battery contains 1,200 Watt-hours of nominal energy. On a LiFePO4 battery (90% usable DoD = 1,080Wh) powering a 100W appliance through a 90% efficient inverter, runtime is: (1,200 × 0.90 × 0.90) ÷ 100W = 9.72 Hours. On a Lead-Acid/AGM battery (50% recommended DoD = 600Wh), runtime is: (1,200 × 0.50 × 0.90) ÷ 100W = 5.40 Hours.",
  },
  {
    question: "How does inverter efficiency affect battery runtime?",
    answer: "DC-to-AC power inverters consume energy during the voltage conversion process, typically operating at 85% to 93% efficiency under moderate loads. In addition, inverters have an idle 'no-load tare draw' (typically 10W to 35W) that drains the battery continuously even when connected appliances are idling or cycling off.",
  },
  {
    question: "What is Peukert's Law and how does it impact high-power loads?",
    answer: "Peukert's Law dictates that the available capacity of lead-acid and AGM batteries decreases significantly at higher discharge rates (C-rate). A 100Ah AGM battery discharged at 50A (0.5C) may only deliver 65Ah to 70Ah before reaching cutoff voltage. Lithium Iron Phosphate (LiFePO4) has a Peukert exponent close to 1.02–1.05, meaning it retains almost 98%+ of its rated capacity regardless of discharge rate.",
  },
  {
    question: "Can I completely drain a lithium (LiFePO4) battery to 0%?",
    answer: "While modern LiFePO4 batteries feature an internal Battery Management System (BMS) with low-voltage cutoff protection, discharging to 80%–90% Depth of Discharge (DoD) yields 3,000 to 5,000+ charge cycles. Routine 100% deep discharge can accelerate cathode stress and reduce overall calendar cycle life.",
  },
];

export default function BatteryRuntimeGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Battery Backup Runtime Formula & Calculation Guide (Ah, Wh & Inverter Losses)",
    description: "Master the battery runtime formula for LiFePO4, AGM, and Lead-Acid systems. Calculate amp-hours to watt-hours, inverter efficiency losses, and Peukert capacity derating.",
    route: "/guides/battery-backup-runtime-calculation-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
    categoryName: "Battery Storage",
    categoryRoute: "/battery",
    standards: [
      "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
      "IEC 62619 (Secondary Lithium Cells and Batteries for Industrial Applications)",
      "UL 1973 (Standard for Batteries for Use in Stationary and Motive Applications)",
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
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Battery Backup Runtime Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Battery Storage &amp; Electrical Engineering Guide</p>
        <h1>Battery Backup Runtime Formula &amp; Calculation Guide</h1>
        <p className="intro">
          Learn how to accurately calculate battery backup duration for home emergency power, off-grid cabins, RVs, and UPS systems. Understand the mathematics of Amp-Hours, Watt-Hours, depth-of-discharge limits, inverter efficiency, and Peukert capacity loss.
        </p>
      </header>

      <DirectAnswerCard
        keyword="battery backup runtime formula"
        answer="To calculate battery backup runtime: Multiply battery Amp-hours by nominal Voltage to find total Watt-hours. Then apply the usable Depth of Discharge (DoD) and Inverter Efficiency (η_inv), and divide by the continuous electrical load (in Watts). For lead-acid/AGM batteries under rapid discharge (>0.2C), apply Peukert's law to adjust for high-current capacity loss."
        formula="Runtime (Hours) = (Battery_Ah × Voltage × DoD × η_inv) ÷ Load_Watts"
        standardExample="12V 100Ah LiFePO4 (1,200Wh @ 90% DoD) powering 150W refrigerator load via 90% inverter: (1,200 × 0.90 × 0.90) ÷ 150W = 6.48 Hours of continuous runtime."
        sourceAuthority="IEEE Std 485 Battery Sizing Standard / Wilhelm Peukert Equation (1897)"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Battery Runtime Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Use the deterministic calculation engine below to compute exact backup duration across various battery chemistries (LiFePO4, AGM, Gel, Flooded Lead-Acid) and custom appliance loads.
          </p>
        </div>
        <BatteryRuntimeCalculator />
      </section>

      {/* Section 1: Ah vs Wh */}
      <section id="ah-vs-wh" style={{ marginTop: "2.5rem" }}>
        <h2>Amp-Hours (Ah) vs. Watt-Hours (Wh): Why Voltage Changes Everything</h2>
        <p>
          One of the most frequent misconceptions in battery sizing is comparing batteries by <strong>Amp-hours (Ah)</strong> alone. Amp-hours measure electrical charge, but <strong>Watt-hours (Wh) measure actual stored energy</strong>.
        </p>
        <p>
          Energy is the product of electrical charge and voltage:
        </p>
        <div style={{ padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1rem 0", fontFamily: "var(--font-mono, monospace)", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
          Energy (Watt-hours) = Capacity (Amp-hours) × Nominal Voltage (Volts)
        </div>
        <p>
          Consider three batteries with identical Amp-hour ratings or identical energy ratings:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Comparison of Stored Energy Across Voltage Standards</caption>
            <thead>
              <tr>
                <th scope="col">Battery Configuration</th>
                <th scope="col">Rated Capacity</th>
                <th scope="col">Nominal Voltage</th>
                <th scope="col">Stored Energy (Wh)</th>
                <th scope="col">Runtime on 200W Load (90% Eff)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>12V 100Ah Battery</strong></td>
                <td>100 Ah</td>
                <td>12.8 V</td>
                <td><strong>1,280 Wh</strong></td>
                <td>5.18 Hours (@ 90% DoD)</td>
              </tr>
              <tr>
                <td><strong>24V 100Ah Battery</strong></td>
                <td>100 Ah</td>
                <td>25.6 V</td>
                <td><strong>2,560 Wh</strong> (2× Energy)</td>
                <td>10.36 Hours (@ 90% DoD)</td>
              </tr>
              <tr>
                <td><strong>48V 100Ah Server Rack</strong></td>
                <td>100 Ah</td>
                <td>51.2 V</td>
                <td><strong>5,120 Wh</strong> (4× Energy)</td>
                <td>20.73 Hours (@ 90% DoD)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: The Three Hidden Losses */}
      <section id="hidden-losses" style={{ marginTop: "2.5rem" }}>
        <h2>The 3 Inevitable Losses: DoD, Inverter Inefficiency, and Peukert&apos;s Law</h2>
        <p>
          A battery rated for 1,200Wh will never deliver 1,200Wh to an AC household appliance. Calculating real-world runtime requires accounting for three physical loss mechanisms:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Depth of Discharge (DoD)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Discharging lead-acid or AGM batteries below <strong>50% DoD</strong> causes irreversible plate sulfation and cuts cycle life from 800 cycles to under 200. LiFePO4 can safely utilize <strong>80% to 95% DoD</strong> for 3,500+ cycles.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>2. Inverter Conversion &amp; Tare Loss</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Converting 12V/24V/48V DC into 120V/240V AC dissipates <strong>7% to 15%</strong> of incoming power as heat. In addition, the inverter&apos;s internal electronics consume <strong>10W to 35W</strong> of constant standby power.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>3. Peukert&apos;s High-Current Penalty</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              In lead-acid chemistries, fast discharge rates impede chemical ion diffusion. Drawing 60A from a 100Ah AGM battery drops its effective capacity by up to <strong>35%</strong>. LiFePO4 has a near-perfect Peukert exponent (1.02).
            </p>
          </div>
        </div>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Battery Chemistry Performance, Usable DoD &amp; Peukert Exponent</caption>
            <thead>
              <tr>
                <th scope="col">Chemistry</th>
                <th scope="col">Recommended DoD</th>
                <th scope="col">Cycle Life (to 80% SoH)</th>
                <th scope="col">Peukert Exponent (k)</th>
                <th scope="col">Round-Trip Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Lithium Iron Phosphate (LiFePO4)</strong></td>
                <td><strong>85% – 95%</strong></td>
                <td><strong>3,500 – 6,000 cycles</strong></td>
                <td><strong>1.02 – 1.05</strong> (Minimal Loss)</td>
                <td><strong>95% – 98%</strong></td>
              </tr>
              <tr>
                <td><strong>Absorbent Glass Mat (AGM)</strong></td>
                <td>50%</td>
                <td>400 – 700 cycles</td>
                <td>1.12 – 1.20 (Moderate Loss)</td>
                <td>80% – 85%</td>
              </tr>
              <tr>
                <td><strong>Flooded Lead-Acid (FLA)</strong></td>
                <td>50%</td>
                <td>300 – 500 cycles</td>
                <td>1.20 – 1.35 (Severe Loss)</td>
                <td>70% – 80%</td>
              </tr>
              <tr>
                <td><strong>Lithium NMC (Powerwall / Portable Stations)</strong></td>
                <td>90% – 95%</td>
                <td>1,500 – 2,500 cycles</td>
                <td>1.03 – 1.06</td>
                <td>92% – 95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Formula Card Breakdown */}
      <section id="formula-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>Deterministic Mathematical Sizing Formulas</h2>

        <FormulaCard
          title="Battery Backup Runtime & Usable Energy Equation"
          formula="T_runtime = (C_nom_Wh × DoD × η_inv) ÷ (P_load + P_tare)   |   C_peukert = C_rated × (I_rated ÷ I_actual)^(k - 1)"
          formulaDescription="Comprehensive equation accounting for nominal capacity, chemistry-specific depth of discharge, power inverter conversion efficiency, tare idle draw, and Peukert high-rate discharge derating."
          variables={[
            { symbol: "T_runtime", label: "Estimated Backup Runtime", description: "Duration until battery reaches manufacturer low-voltage cutoff", unit: "Hours (h)" },
            { symbol: "C_nom_Wh", label: "Nominal Battery Energy", description: "Rated battery capacity in Watt-hours (Ah × Nominal Voltage)", unit: "Watt-hours (Wh)" },
            { symbol: "DoD", label: "Usable Depth of Discharge", description: "Maximum recommended discharge percentage (e.g. 0.90 for LiFePO4, 0.50 for AGM)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "η_inv", label: "Inverter Conversion Efficiency", description: "DC-to-AC conversion efficiency factor (typically 0.88 to 0.93)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "P_load", label: "Continuous Appliance Load", description: "Total average power drawn by connected equipment", unit: "Watts (W)" },
            { symbol: "P_tare", label: "Inverter Idle Tare Draw", description: "Continuous background power drawn by inverter standby circuitry", unit: "Watts (W)" },
            { symbol: "k", label: "Peukert Exponent", description: "Empirical rate-capacity coefficient (1.02 for LiFePO4, 1.25 for Lead-Acid)", unit: "Dimensionless" },
          ]}
          notes={[
            "For cycling loads like refrigerators or sump pumps, multiply nameplate power by the compressor duty cycle (e.g., 150W × 0.35 = 52.5W average).",
            "In sub-freezing ambient temperatures (<0°C / 32°F), apply an additional 15% to 25% temperature capacity derate.",
          ]}
        />
      </section>

      {/* Section 4: Worked Step-by-Step Problem */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Examples: Refrigerator, CPAP, &amp; Sump Pump</h2>
        <p>
          Here is how to calculate runtime step-by-step for three common emergency backup scenarios:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          {/* Example 1 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: 12V 100Ah LiFePO4 + Refrigerator</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 150W refrigerator running at 35% duty cycle (52.5W avg) + 10W inverter tare.<br />
              <strong>Battery Energy:</strong> 100Ah × 12.8V = 1,280 Wh.<br />
              <strong>Usable Energy:</strong> 1,280Wh × 0.90 DoD × 0.90 η_inv = <strong>1,036.8 Wh</strong>.<br />
              <strong>Total Load:</strong> 52.5W + 10W = <strong>62.5 Watts</strong>.<br />
              <strong>Runtime:</strong> 1,036.8 Wh ÷ 62.5W = <strong>16.59 Hours</strong>.
            </p>
            <Link href="/battery/battery-runtime-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Run Battery Runtime Calculator →
            </Link>
          </div>

          {/* Example 2 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: 12V 100Ah AGM + Heavy 800W Load</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 800W continuous pump load (~75A DC draw).<br />
              <strong>Battery Energy:</strong> 100Ah × 12V = 1,200 Wh.<br />
              <strong>Usable Energy:</strong> 1,200Wh × 0.50 DoD × 0.88 η_inv = 528 Wh.<br />
              <strong>Peukert Derate:</strong> Drawing 0.75C reduces effective capacity by 30% (369.6 Wh usable).<br />
              <strong>Runtime:</strong> 369.6 Wh ÷ 800W = <strong>0.46 Hours (28 Minutes)</strong>.
            </p>
            <Link href="/battery/inverter-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Inverter for 800W Load →
            </Link>
          </div>

          {/* Example 3 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: 1,000Wh Station + Laptop &amp; Starlink</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 65W Laptop + 50W Starlink terminal = 115W continuous.<br />
              <strong>Storage:</strong> 1,000Wh LiFePO4 power station.<br />
              <strong>Internal DC-to-AC Loss:</strong> 88% overall efficiency.<br />
              <strong>Usable Energy:</strong> 1,000Wh × 0.90 usable = 900 Wh.<br />
              <strong>Runtime:</strong> (900Wh × 0.88) ÷ 115W = <strong>6.88 Hours</strong>.
            </p>
            <Link href="/battery/portable-power-station-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Portable Power Station →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>Connected Battery Planning &amp; Electrical Tools</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Explore the full suite of deterministic battery, solar, and home energy sizing calculators:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/battery/battery-runtime-calculator" className="button secondary-button">Battery Runtime Calculator</Link>
          <Link href="/battery/battery-size-calculator" className="button secondary-button">Battery Size Calculator</Link>
          <Link href="/battery/battery-capacity-calculator" className="button secondary-button">Battery Capacity Calculator</Link>
          <Link href="/battery/ups-runtime-calculator" className="button secondary-button">UPS Runtime Calculator</Link>
          <Link href="/battery/voltage-drop-calculator" className="button secondary-button">DC Voltage Drop Calculator</Link>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button">Home Battery Size Calculator</Link>
        </div>
      </section>

      {/* Section 6: FAQs */}
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

      {/* Section 7: Standards & Citations */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations adhere to <strong>IEEE Std 485</strong> (Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications), <strong>IEC 62619</strong> (Safety requirements for secondary lithium cells), <strong>UL 1973</strong>, and <strong>NFPA 70 / NEC Article 706</strong> (Energy Storage Systems).
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

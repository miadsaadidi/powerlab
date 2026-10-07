import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { BatteryRuntimeCalculator } from "@/components/calculator/battery-runtime-calculator";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Backup Runtime Formula Guide",
  description: "Learn how to estimate battery backup runtime for LiFePO4, AGM, and Lead-Acid systems. Calculate Ah to Wh, depth of discharge, and inverter conversion efficiency.",
  canonicalPath: "/guides/battery-backup-runtime-calculation-guide",
  category: "battery",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the formula to calculate battery backup runtime?",
    answer: "The fundamental simplified battery runtime formula is: Runtime (Hours) = (Battery Nominal Capacity in Watt-hours × Depth of Discharge × Inverter Efficiency) ÷ Total Load in Watts. If starting from Amp-hours, calculate nominal Watt-hours first: Watt-hours = Amp-hours × Battery Nominal Voltage. If continuous inverter tare standby draw is modeled, add it to the total load in the denominator.",
  },
  {
    question: "How long will a 100Ah 12V battery run an appliance?",
    answer: "A 12.8V 100Ah LiFePO4 battery contains 1,280 Watt-hours of nominal energy. At 90% usable DoD (1,152Wh usable) powering a 100W appliance through a 90% efficient inverter with zero tare, estimated runtime is: (1,280 × 0.90 × 0.90) ÷ 100W = 10.37 Hours. On a 12.0V 100Ah Lead-Acid/AGM battery (1,200Wh nominal, 50% recommended DoD = 600Wh usable) with 90% inverter efficiency, estimated runtime is: (1,200 × 0.50 × 0.90) ÷ 100W = 5.40 Hours.",
  },
  {
    question: "How does inverter efficiency affect battery runtime?",
    answer: "DC-to-AC power inverters consume energy during conversion, typically operating at 85% to 93% efficiency under moderate loads. In addition, inverters draw continuous idle tare power (often 10W to 35W) that drains the battery whenever the inverter is turned on, even when connected appliances cycle off or idle.",
  },
  {
    question: "What is Peukert's Law and how does it impact high-power loads?",
    answer: "Peukert's Law describes how the deliverable capacity of lead-acid and AGM batteries decreases significantly at higher discharge rates (C-rate). For example, drawing high current from an AGM battery can reduce its deliverable capacity relative to its 20-hour rating. Lithium Iron Phosphate (LiFePO4) exhibits minimal rate-dependent capacity derating under typical residential discharge rates. Simplified planning models calculate energy-balance runtime without rate-curve integration.",
  },
  {
    question: "Can I completely drain a lithium (LiFePO4) battery to 0%?",
    answer: "While modern LiFePO4 batteries feature an internal Battery Management System (BMS) with low-voltage cutoff protection, typical manufacturer design guidance recommends operating within an 80%–90% Depth of Discharge (DoD) window for longevity. Operating parameters, cycle life expectations, and cutoff thresholds vary by manufacturer and operating temperature.",
  },
];

export default function BatteryRuntimeGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Battery Backup Runtime Formula & Calculation Guide (Ah, Wh & Inverter Losses)",
    description: "Learn the battery runtime formula for LiFePO4, AGM, and Lead-Acid systems. Calculate amp-hours to watt-hours, depth-of-discharge windows, and inverter efficiency losses.",
    route: "/guides/battery-backup-runtime-calculation-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
    categoryName: "Battery Storage",
    categoryRoute: "/battery",
    proficiencyLevel: "Beginner to Intermediate",
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
          Learn how to estimate battery backup duration for home emergency power, off-grid systems, RVs, and UPS applications. Understand the relationship between Amp-Hours, Watt-Hours, depth-of-discharge limits, inverter conversion efficiency, and standby losses.
        </p>
      </header>

      <DirectAnswerCard
        keyword="battery backup runtime formula"
        answer="To estimate battery backup runtime: Multiply battery Amp-hours by nominal pack Voltage to find total nominal Watt-hours. Then apply the usable Depth of Discharge (DoD) and Inverter Conversion Efficiency (η_inv), and divide by the total electrical load (in Watts, including any continuous inverter tare standby draw). Lead-acid batteries may experience additional capacity reduction at heavy discharge rates (Peukert effect)."
        formula="Runtime (Hours) = (Battery_Ah × Voltage × DoD × η_inv) ÷ (Load_Watts + Tare_Watts)"
        standardExample="12.8V 100Ah LiFePO4 (1,280Wh nominal @ 90% DoD = 1,152Wh usable) powering a 150W continuous load via a 90% efficient inverter (with zero tare assumed): (1,280 × 0.90 × 0.90) ÷ 150W = 6.91 Hours of continuous runtime."
        sourceAuthority="Technical References: IEEE Std 485 / Battery Sizing Engineering Principles"
      />

      <PageJumpNav hasMatrix hasHowTo hasFormula hasWorkedExample hasFaqs hasRelated />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive Battery Runtime Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Calculate an estimated battery runtime using the transparent, deterministic energy model below across various battery chemistries (LiFePO4, AGM, Gel, Flooded Lead-Acid) and custom appliance loads.
          </p>
        </div>
        <BatteryRuntimeCalculator />
      </section>

      {/* Section 1: Ah vs Wh */}
      <section id="how-to-guide" style={{ marginTop: "2.5rem" }}>
        <h2>Amp-Hours (Ah) vs. Watt-Hours (Wh): Why Voltage Changes Everything</h2>
        <p>
          One of the most frequent misconceptions in battery sizing is comparing batteries by <strong>Amp-hours (Ah)</strong> alone. Amp-hours measure electrical charge, but <strong>Watt-hours (Wh) measure stored energy</strong>.
        </p>
        <p>
          Energy is the product of electrical charge and nominal voltage:
        </p>
        <div style={{ padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1rem 0", fontFamily: "var(--font-mono, monospace)", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
          Energy (Watt-hours) = Capacity (Amp-hours) × Nominal Voltage (Volts)
        </div>
        <p>
          Consider three battery banks with identical 100Ah capacity ratings across different system nominal voltage standards:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Comparison of Stored Energy and Estimated Runtime Across Voltage Standards (90% DoD, 90% Inverter Efficiency, No Tare)</caption>
            <thead>
              <tr>
                <th scope="col">Battery Configuration</th>
                <th scope="col">Rated Capacity</th>
                <th scope="col">Nominal Voltage</th>
                <th scope="col">Stored Energy (Wh)</th>
                <th scope="col">Estimated Runtime on 200W Load</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>12.8V LiFePO4 (4S)</strong></td>
                <td>100 Ah</td>
                <td>12.8 V</td>
                <td><strong>1,280 Wh</strong></td>
                <td>5.18 Hours</td>
              </tr>
              <tr>
                <td><strong>25.6V LiFePO4 (8S)</strong></td>
                <td>100 Ah</td>
                <td>25.6 V</td>
                <td><strong>2,560 Wh</strong> (2× Energy)</td>
                <td>10.37 Hours</td>
              </tr>
              <tr>
                <td><strong>51.2V LiFePO4 (16S Server Rack)</strong></td>
                <td>100 Ah</td>
                <td>51.2 V</td>
                <td><strong>5,120 Wh</strong> (4× Energy)</td>
                <td>20.74 Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Real-World Loss Factors */}
      <section id="sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>Key Operating Factors: Depth of Discharge, Inverter Efficiency, and Rate Effects</h2>
        <p>
          A battery rated for 1,280Wh will not deliver 1,280Wh to an AC household appliance. Calculating realistic backup runtime requires accounting for conversion efficiencies and operating boundaries:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>1. Usable Depth of Discharge (DoD)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Operating lead-acid or AGM batteries below ~50% DoD accelerates plate degradation and significantly shortens cycle life. Modern LiFePO4 packs are typically planned around an 80% to 90% usable DoD window, depending on manufacturer specifications and desired cycle life.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>2. Inverter Conversion &amp; Tare Loss</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Converting DC battery voltage into 120V/240V AC power typically dissipates 7% to 15% of throughput power as heat (85%–93% efficiency). Additionally, inverters draw continuous idle tare power (often 10W to 35W) while powered on.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>3. Discharge Rate &amp; Peukert Effect</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
              Lead-acid batteries exhibit reduced deliverable capacity at higher discharge rates (described by Peukert&apos;s empirical equation). LiFePO4 chemistries maintain stable capacity across typical residential discharge rates. Simplified planning models calculate energy-balance runtime without rate-curve integration.
            </p>
          </div>
        </div>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Illustrative Battery Chemistry Planning Ranges (Varies by Manufacturer, Model, and Temperature)</caption>
            <thead>
              <tr>
                <th scope="col">Chemistry</th>
                <th scope="col">Typical Planned DoD</th>
                <th scope="col">Illustrative Cycle Life (to 80% SoH)</th>
                <th scope="col">Typical Peukert Exponent (k)</th>
                <th scope="col">Typical DC-DC Round-Trip Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Lithium Iron Phosphate (LiFePO4)</strong></td>
                <td>80% – 90%</td>
                <td>2,500 – 5,000+ cycles</td>
                <td>~1.02 – 1.05 (Minimal Rate Loss)</td>
                <td>92% – 98%</td>
              </tr>
              <tr>
                <td><strong>Absorbent Glass Mat (AGM)</strong></td>
                <td>50%</td>
                <td>300 – 700 cycles</td>
                <td>~1.12 – 1.25 (Moderate Rate Loss)</td>
                <td>80% – 85%</td>
              </tr>
              <tr>
                <td><strong>Flooded Lead-Acid (FLA)</strong></td>
                <td>50%</td>
                <td>250 – 500 cycles</td>
                <td>~1.20 – 1.35 (Significant Rate Loss)</td>
                <td>70% – 80%</td>
              </tr>
              <tr>
                <td><strong>Lithium NMC (Home Storage &amp; Power Stations)</strong></td>
                <td>80% – 90%</td>
                <td>1,000 – 2,500 cycles</td>
                <td>~1.03 – 1.06</td>
                <td>90% – 95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Calculation Formulas */}
      <section id="formula-math" style={{ marginTop: "2.5rem" }}>
        <h2>Calculation Formulas</h2>

        <FormulaCard
          title="Battery Backup Runtime & Usable Energy Equation"
          formula="T_{\text{runtime}} = \frac{C_{\text{nom\_Wh}} \times \text{DoD} \times \eta_{\text{inv}}}{P_{\text{load}} + P_{\text{tare}}}"
          formulaDescription="Simplified energy-balance planning equation accounting for nominal capacity, chemistry depth-of-discharge window, power inverter conversion efficiency, and continuous load plus tare standby draw."
          variables={[
            { symbol: "T_runtime", label: "Estimated Backup Runtime", description: "Estimated duration until battery reaches low-voltage reserve limit", unit: "Hours (h)" },
            { symbol: "C_nom_Wh", label: "Nominal Battery Energy", description: "Nominal battery capacity in Watt-hours (Ah × Nominal Pack Voltage)", unit: "Watt-hours (Wh)" },
            { symbol: "DoD", label: "Usable Depth of Discharge", description: "Planned usable fraction (e.g. 0.90 for LiFePO4, 0.50 for AGM)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "η_inv", label: "Inverter Conversion Efficiency", description: "DC-to-AC conversion efficiency factor (typically 0.85 to 0.93)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "P_load", label: "Continuous Appliance Load", description: "Average power drawn by connected equipment", unit: "Watts (W)" },
            { symbol: "P_tare", label: "Inverter Standby Tare Draw", description: "Continuous standby power drawn by inverter circuitry (if modeled)", unit: "Watts (W)" },
          ]}
          notes={[
            "For cycling loads such as refrigerators, calculate average power using the duty cycle (e.g. 150W peak × 0.35 duty = 52.5W average).",
            "Lead-acid batteries can exhibit additional capacity loss at high discharge rates (Peukert effect). This simplified equation models constant energy delivery.",
            "Sub-freezing ambient temperatures (<0°C / 32°F) can reduce available battery capacity and discharge voltage.",
          ]}
        />
      </section>

      {/* Section 4: Worked Step-by-Step Problem */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Examples: Refrigerator, High-Load Pump, &amp; Workstation</h2>
        <p>
          Step-by-step calculations for three illustrative backup scenarios showing all assumed parameters:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          {/* Example 1 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario A: 12.8V 100Ah LiFePO4 + Refrigerator</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 150W refrigerator at 35% duty cycle (52.5W average) + 10W inverter tare = 62.5W total.<br />
              <strong>Battery Energy:</strong> 100 Ah × 12.8 V = 1,280 Wh nominal.<br />
              <strong>Usable Delivered Energy:</strong> 1,280 Wh × 0.90 DoD × 0.90 η_inv = <strong>1,036.8 Wh</strong>.<br />
              <strong>Total Modeled Load:</strong> 52.5W + 10W = <strong>62.5 Watts</strong>.<br />
              <strong>Estimated Runtime:</strong> 1,036.8 Wh ÷ 62.5W = <strong>16.59 Hours</strong>.
            </p>
            <Link href="/battery/battery-runtime-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Run Battery Runtime Calculator →
            </Link>
          </div>

          {/* Example 2 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario B: 12.0V 100Ah AGM + Heavy 800W Load (Illustrative Rate Derate)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 800W continuous pump load (tare negligible relative to 800W).<br />
              <strong>Battery Energy:</strong> 100 Ah × 12.0 V = 1,200 Wh nominal.<br />
              <strong>Base Usable Energy:</strong> 1,200 Wh × 0.50 DoD × 0.88 η_inv = 528 Wh.<br />
              <strong>Illustrative Peukert Rate Derate:</strong> Rapid discharge (~0.7C) modeled with an illustrative 30% capacity reduction: 528 Wh × 0.70 = 369.6 Wh delivered.<br />
              <strong>Estimated Runtime:</strong> 369.6 Wh ÷ 800W = <strong>0.46 Hours (~28 Minutes)</strong>.
            </p>
            <Link href="/battery/inverter-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Inverter for 800W Load →
            </Link>
          </div>

          {/* Example 3 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Scenario C: 1,000Wh Station + Laptop &amp; Starlink</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Load:</strong> 65W Laptop + 50W Starlink terminal = 115W continuous (100% duty).<br />
              <strong>Storage:</strong> 1,000 Wh nominal LiFePO4 power station.<br />
              <strong>Usable Storage:</strong> 1,000 Wh × 0.90 usable DoD = 900 Wh.<br />
              <strong>Delivered AC Energy:</strong> 900 Wh × 0.88 η_inv = 792 Wh.<br />
              <strong>Estimated Runtime:</strong> 792 Wh ÷ 115W = <strong>6.89 Hours (~6.9 Hours)</strong>.
            </p>
            <Link href="/battery/portable-power-station-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Portable Power Station →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section id="related-tools" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
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
      <section id="faq-section" style={{ marginTop: "2.5rem" }}>
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

      {/* Section 7: Technical References & Model Basis */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Technical References &amp; Model Basis</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Technical references providing contextual background include <strong>IEEE Std 485</strong> (Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications), <strong>IEC 62619</strong> (Safety requirements for secondary lithium cells), <strong>UL 1973</strong>, and <strong>NFPA 70 / NEC Article 706</strong> (Energy Storage Systems). These references provide technical context; this calculator is a simplified planning model and does not determine standards compliance, battery suitability, or installation requirements.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
          <AcademicCitationModal
            title="Battery Backup Runtime Formula & Calculation Guide"
            urlPath="/guides/battery-backup-runtime-calculation-guide"
          />
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>

      <Disclaimer variant="standard" />
    </article>
  );
}

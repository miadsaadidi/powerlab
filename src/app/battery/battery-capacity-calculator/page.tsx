import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { BatteryCapacityCalculator } from "@/components/calculator/battery-capacity-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("battery-capacity");

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Capacity Calculator — Ah to kWh & Wh",
  description: "Convert battery capacity between Ah, mAh, Wh, and kWh across 12V, 24V, and 48V. Calculate usable storage with chemistry DoD and battery health.",
  canonicalPath: "/battery/battery-capacity-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How do you convert Amp-hours (Ah) to Kilowatt-hours (kWh)?",
    answer: "Multiply Amp-hours by nominal system voltage and divide by 1,000: kWh = (Ah × Volts) ÷ 1,000. For example, a 12V 100Ah battery contains (100 × 12) ÷ 1,000 = 1.20 kWh of nominal electrical energy.",
  },
  {
    question: "How many kWh is a 12V 100Ah battery?",
    answer: "A 12V 100Ah battery stores exactly 1.20 kWh (1,200 Watt-hours) of gross nominal energy. In real-world operation, a LiFePO4 lithium battery delivers ~1.08 kWh of usable energy at 90% Depth of Discharge (DoD), while a sealed AGM or Flooded lead-acid battery delivers ~0.60 kWh at 50% DoD.",
  },
  {
    question: "How many kWh is a 200Ah battery?",
    answer: "A 200Ah battery contains: 2.40 kWh at 12 Volts ((200 × 12) ÷ 1,000), 4.80 kWh at 24 Volts ((200 × 24) ÷ 1,000), and 9.60 kWh at 48 Volts ((200 × 48) ÷ 1,000).",
  },
  {
    question: "How do you convert mAh to kWh?",
    answer: "Multiply milliamp-hours by cell voltage and divide by 1,000,000: kWh = (mAh × Volts) ÷ 1,000,000. For example, a 20,000 mAh smartphone power bank operating at 3.7V nominal contains (20,000 × 3.7) ÷ 1,000,000 = 0.074 kWh (74 Watt-hours).",
  },
  {
    question: "How do you convert Watt-hours (Wh) to Amp-hours (Ah)?",
    answer: "Divide Watt-hours by nominal battery voltage: Ah = Wh ÷ Volts. For example, a 2,400 Wh battery bank equals 200 Ah at 12 Volts, 100 Ah at 24 Volts, or 50 Ah at 48 Volts.",
  },
  {
    question: "What is the difference between nominal and usable battery capacity?",
    answer: "Nominal capacity is the theoretical factory maximum energy stored when charged to 100%. Usable capacity is the actual net energy you can safely extract without causing rapid electrochemical degradation or triggering low-voltage BMS cutoff (typically 80%–90% for LiFePO4, 50% for Lead-Acid).",
  },
];

export default function BatteryCapacityPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Battery Capacity Calculator",
    description: "Convert battery capacity between Ah, mAh, Wh, and kWh using nominal system voltage and usable state-of-charge windows.",
    route: "/battery/battery-capacity-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Bidirectional conversion between Ah, mAh, Wh, and kWh",
      "Nominal voltage presets (3.7V, 12V, 24V, 36V, 48V)",
      "Usable energy calculations factoring in starting and minimum reserve SOC",
      "Accounts for battery State of Health (SOH) degradation",
    ],
    standards: [
      "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
      "IEC 62619 (Secondary Lithium Cells and Batteries for Industrial Applications)",
      "UL 1973 (Batteries for Use in Stationary Applications)",
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
        <Link href="/battery">Battery</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Battery Capacity Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Battery Planning &amp; Sizing Engine</p>
        <h1>Battery Capacity Calculator</h1>
        <p className="intro">
          Convert battery capacity between Amp-Hours (Ah), Milliamp-Hours (mAh), Watt-Hours (Wh), and Kilowatt-Hours (kWh) across DC voltages, and calculate net usable stored energy by chemistry Depth of Discharge (DoD).
        </p>
      </div>

      <div id="calculator-tool">
        <BatteryCapacityCalculator />
      </div>

      <DirectAnswerCard
        keyword="battery capacity Ah to kWh conversion formula"
        answer="To convert Amp-hours (Ah) to Kilowatt-hours (kWh), multiply capacity by nominal voltage and divide by 1,000: kWh = (Ah × Volts) ÷ 1,000. Net usable energy equals nominal kWh multiplied by the safe Depth of Discharge (DoD) fraction (90% for LiFePO4, 80% for NMC, 50% for Lead-Acid)."
        formula="Nominal Energy (kWh) = (Capacity_Ah × Voltage_V) ÷ 1,000  |  Usable_kWh = Nominal_kWh × DoD"
        standardExample="12V 100Ah LiFePO4: (100Ah × 12V) ÷ 1,000 = 1.20 kWh nominal · (1.20 kWh × 0.90 DoD) = 1.08 kWh usable"
        sourceAuthority="IEC 62619 & IEEE Std 485 Battery Sizing Standards"
      />

      <PageJumpNav />

      {/* Section 1: Chemistry DoD and Usable Energy Comparison */}
      <section id="chemistry-dod-matrix" style={{ marginTop: "3rem" }}>
        <h2>Battery Chemistry Depth of Discharge (DoD) &amp; Usable Energy Matrix</h2>
        <p>
          Nominal nameplate capacity does not reflect usable operational capacity. In real-world power system design, recommended Depth of Discharge (DoD) thresholds represent standard engineering operating baselines (governed by manufacturer warranties and standards like IEC 62619 and IEEE Std 485) to maximize cycle life and avoid low-voltage disconnects. The table below compares typical design baselines across primary battery chemistries:
        </p>

        <div className="scenario-table" role="region" aria-label="Battery chemistry DoD and usable energy comparison table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Benchmark Battery Chemistry Design DoD Windows, Usable Capacity, and Typical Operating Metrics</caption>
            <thead>
              <tr>
                <th scope="col">Battery Chemistry</th>
                <th scope="col">Nominal Cell Voltage</th>
                <th scope="col">Recommended Design DoD</th>
                <th scope="col">Usable Energy from 12V 100Ah (1.20 kWh Nominal)</th>
                <th scope="col">Usable Energy from 48V 100Ah (4.80 kWh Nominal)</th>
                <th scope="col">Typical Cycle Life (@ Design DoD, 0.2C / 25°C)</th>
                <th scope="col">Typical Round-Trip Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>LiFePO4 (Lithium Iron Phosphate)</strong></td>
                <td>3.20 V / cell</td>
                <td><strong>80% – 90%</strong> (Design baseline)</td>
                <td><strong>0.96 – 1.08 kWh</strong> (960 – 1,080 Wh)</td>
                <td><strong>3.84 – 4.32 kWh</strong> (3,840 – 4,320 Wh)</td>
                <td>3,000 – 6,000+ cycles</td>
                <td>92% – 98%</td>
              </tr>
              <tr>
                <td><strong>NMC Lithium (Nickel Manganese Cobalt)</strong></td>
                <td>3.65 – 3.70 V / cell</td>
                <td><strong>70% – 80%</strong> (Design baseline)</td>
                <td><strong>0.84 – 0.96 kWh</strong> (840 – 960 Wh)</td>
                <td><strong>3.36 – 3.84 kWh</strong> (3,360 – 3,840 Wh)</td>
                <td>1,500 – 2,500 cycles</td>
                <td>90% – 95%</td>
              </tr>
              <tr>
                <td><strong>AGM Sealed Lead-Acid (Deep Cycle)</strong></td>
                <td>2.00 V / cell</td>
                <td><strong>50%</strong> (Design baseline)</td>
                <td><strong>0.60 kWh</strong> (600 Wh)</td>
                <td><strong>2.40 kWh</strong> (2,400 Wh)</td>
                <td>400 – 700 cycles</td>
                <td>80% – 85%</td>
              </tr>
              <tr>
                <td><strong>Gel Lead-Acid (Deep Cycle)</strong></td>
                <td>2.00 V / cell</td>
                <td><strong>50%</strong> (Design baseline)</td>
                <td><strong>0.60 kWh</strong> (600 Wh)</td>
                <td><strong>2.40 kWh</strong> (2,400 Wh)</td>
                <td>500 – 900 cycles</td>
                <td>80% – 85%</td>
              </tr>
              <tr>
                <td><strong>Flooded Lead-Acid (FLA Deep Cycle)</strong></td>
                <td>2.00 V / cell</td>
                <td><strong>50%</strong> (Design baseline)</td>
                <td><strong>0.60 kWh</strong> (600 Wh)</td>
                <td><strong>2.40 kWh</strong> (2,400 Wh)</td>
                <td>300 – 600 cycles</td>
                <td>75% – 82%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
          *Note: Cycle life and round-trip efficiency figures represent typical published manufacturer benchmark ranges under nominal laboratory test conditions (25°C ambient, C/5 rate). Actual field lifespans vary depending on operating temperature, charge/discharge C-rates, and depth of cycling.
        </p>
      </section>

      {/* Section 2: Amp-Hour to Kilowatt-Hour Conversion Table */}
      <section id="sizing-matrix" style={{ marginTop: "2.5rem" }}>
        <h2>Amp-Hour (Ah) to Kilowatt-Hour (kWh) Quick Reference Matrix</h2>
        <p>
          Quick reference table converting common battery bank Amp-Hour (Ah) capacities into gross nominal energy (kWh) and net usable LiFePO4 energy (kWh @ 90% DoD design baseline) across standard DC system voltages:
        </p>

        <div className="scenario-table" role="region" aria-label="Battery capacity conversion reference table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Energy Equivalent (Nominal &amp; Usable LiFePO4 kWh @ 90% DoD) Across Standard DC Voltages</caption>
            <thead>
              <tr>
                <th scope="col">Capacity (Ah)</th>
                <th scope="col">12V System (Nom / Usable)</th>
                <th scope="col">24V System (Nom / Usable)</th>
                <th scope="col">48V System (Nom / Usable)</th>
                <th scope="col">Typical Sizing Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>20 Ah</strong></td>
                <td>0.24 kWh / <strong>0.22 kWh</strong></td>
                <td>0.48 kWh / <strong>0.43 kWh</strong></td>
                <td>0.96 kWh / <strong>0.86 kWh</strong></td>
                <td>Small UPS backup, kayak electronics, e-bikes</td>
              </tr>
              <tr>
                <td><strong>50 Ah</strong></td>
                <td>0.60 kWh / <strong>0.54 kWh</strong></td>
                <td>1.20 kWh / <strong>1.08 kWh</strong></td>
                <td>2.40 kWh / <strong>2.16 kWh</strong></td>
                <td>Trolling motors, portable camper power stations</td>
              </tr>
              <tr>
                <td><strong>100 Ah</strong></td>
                <td>1.20 kWh / <strong>1.08 kWh</strong></td>
                <td>2.40 kWh / <strong>2.16 kWh</strong></td>
                <td>4.80 kWh / <strong>4.32 kWh</strong></td>
                <td>RV house batteries, campervans, marine house banks</td>
              </tr>
              <tr>
                <td><strong>200 Ah</strong></td>
                <td>2.40 kWh / <strong>2.16 kWh</strong></td>
                <td>4.80 kWh / <strong>4.32 kWh</strong></td>
                <td>9.60 kWh / <strong>8.64 kWh</strong></td>
                <td>Off-grid cabins, liveaboard sailboats, solar workshops</td>
              </tr>
              <tr>
                <td><strong>300 Ah</strong></td>
                <td>3.60 kWh / <strong>3.24 kWh</strong></td>
                <td>7.20 kWh / <strong>6.48 kWh</strong></td>
                <td>14.40 kWh / <strong>12.96 kWh</strong></td>
                <td>High-demand off-grid homesteads, dual-inverter setups</td>
              </tr>
              <tr>
                <td><strong>400 Ah</strong></td>
                <td>4.80 kWh / <strong>4.32 kWh</strong></td>
                <td>9.60 kWh / <strong>8.64 kWh</strong></td>
                <td>19.20 kWh / <strong>17.28 kWh</strong></td>
                <td>Whole-home battery backup systems (Tesla Powerwall scale)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Milliamp-Hour (mAh) to Watt-Hour (Wh) Small Electronics Table */}
      <section id="mah-conversion" style={{ marginTop: "2.5rem" }}>
        <h2>Milliamp-Hour (mAh) to Watt-Hour (Wh) &amp; kWh Conversion</h2>
        <p>
          Portable power banks, drones, and smartphone batteries are rated in milliamp-hours (mAh). Because 1 Ah = 1,000 mAh, multiplying mAh by the single-cell lithium voltage (3.7V nominal) yields stored Watt-hours:
        </p>

        <div className="scenario-table" role="region" aria-label="mAh to Wh conversion table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 3: Common Portable Electronics Battery Capacities (3.7V Nominal Lithium-Ion Baseline) &amp; FAA Carry-On Status</caption>
            <thead>
              <tr>
                <th scope="col">Rating in mAh</th>
                <th scope="col">Equivalent in Ah</th>
                <th scope="col">Stored Energy (Wh @ 3.7V)</th>
                <th scope="col">Stored Energy (kWh)</th>
                <th scope="col">FAA Carry-On Status (49 CFR § 175.10(a)(18))</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3,000 mAh</strong></td>
                <td>3.0 Ah</td>
                <td>11.1 Wh</td>
                <td>0.011 kWh</td>
                <td>Allowed in Carry-On (≤ 100 Wh)</td>
              </tr>
              <tr>
                <td><strong>5,000 mAh</strong></td>
                <td>5.0 Ah</td>
                <td>18.5 Wh</td>
                <td>0.019 kWh</td>
                <td>Allowed in Carry-On (≤ 100 Wh)</td>
              </tr>
              <tr>
                <td><strong>10,000 mAh</strong></td>
                <td>10.0 Ah</td>
                <td>37.0 Wh</td>
                <td>0.037 kWh</td>
                <td>Allowed in Carry-On (≤ 100 Wh)</td>
              </tr>
              <tr>
                <td><strong>20,000 mAh</strong></td>
                <td>20.0 Ah</td>
                <td>74.0 Wh</td>
                <td>0.074 kWh</td>
                <td>Allowed in Carry-On (≤ 100 Wh)</td>
              </tr>
              <tr>
                <td><strong>27,000 mAh</strong></td>
                <td>27.0 Ah</td>
                <td>99.9 Wh</td>
                <td>0.099 kWh</td>
                <td>Allowed in Carry-On (Max standard limit: 100 Wh)</td>
              </tr>
              <tr>
                <td><strong>40,000 mAh</strong></td>
                <td>40.0 Ah</td>
                <td>148.0 Wh</td>
                <td>0.148 kWh</td>
                <td>Requires Airline Approval (101–160 Wh, max 2 spares)</td>
              </tr>
              <tr>
                <td><strong>50,000 mAh</strong></td>
                <td>50.0 Ah</td>
                <td>185.0 Wh</td>
                <td>0.185 kWh</td>
                <td>Forbidden in Passenger Baggage (&gt; 160 Wh)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
          *Regulatory Citation: Federal Aviation Administration (FAA) PackSafe and U.S. DOT Hazardous Materials Regulations (49 CFR § 175.10(a)(18)). Uninstalled spare lithium batteries are strictly prohibited in checked baggage.
        </p>
      </section>

      {/* Section 4: 4-Stage Step-by-Step Manual Mathematical Derivation */}
      <section id="manual-math-derivation" style={{ marginTop: "2.5rem" }}>
        <h2>4-Step Manual Calculation Derivation: Sizing Usable kWh &amp; Ah</h2>
        <p>
          Follow this 4-step engineering walkthrough to manually calculate the required battery capacity in Amp-hours and kilowatt-hours for any DC electrical load profile:
        </p>

        <div style={{ display: "grid", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Step 1: Calculate Total Daily Load Energy Demand (Wh)</h3>
            <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Multiply power draw in Watts by operating hours per day across all critical AC/DC circuits:
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              E_load (Wh) = ∑ (Power_Watts × Hours_Per_Day)  |  Example: 500W load × 8 hours = 4,000 Wh (4.0 kWh)
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Step 2: Adjust for Inverter &amp; Wiring Inefficiencies</h3>
            <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.5 }}>
              DC-to-AC inverters have tare parasitic losses and conversion efficiencies ranging from 88% to 94%:
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              E_required (Wh) = E_load (Wh) ÷ Inverter_Efficiency  |  Example: 4,000 Wh ÷ 0.90 = 4,444.4 Wh
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Step 3: Factor in Chemistry Depth of Discharge (DoD) &amp; Battery Health</h3>
            <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Apply safe discharge design bounds (90% for LiFePO4, 50% for Lead-Acid) and State of Health (SOH):
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              E_nominal (Wh) = E_required (Wh) ÷ (DoD × SOH)  |  LiFePO4: 4,444.4 Wh ÷ (0.90 × 1.0) = 4,938.3 Wh (~4.94 kWh nominal)
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.05rem" }}>Step 4: Convert Required Nominal Energy to Amp-Hours (Ah)</h3>
            <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Divide nominal Watt-hours by system voltage (or multiply nominal kWh by 1,000 before dividing by voltage):
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem" }}>
              Capacity (Ah) = (E_nominal_kWh × 1,000) ÷ System_Voltage = E_nominal_Wh ÷ System_Voltage
            </p>
            <p style={{ fontFamily: "var(--font-mono, monospace)", background: "#eee5d7", padding: "0.5rem 0.75rem", borderRadius: "0.4rem", fontSize: "0.9rem", marginTop: "0.35rem" }}>
              12V Bank: (4.938 kWh × 1,000) ÷ 12V = 4,938.3 Wh ÷ 12V = 411.5 Ah  |  48V Bank: 4,938.3 Wh ÷ 48V = 102.9 Ah
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Formula Card */}
      <div id="formula-math" style={{ marginTop: "2.5rem" }}>
        <FormulaCard
          title="Battery Capacity &amp; Energy Conversion Formulas"
          formula="Nominal_kWh = (Ah × Voltage_V) ÷ 1,000  |  Capacity_Ah = (Nominal_kWh × 1,000) ÷ Voltage_V  |  Usable_kWh = Nominal_kWh × (Start_SOC - Reserve_SOC) × SOH"
          formulaDescription="Converts electrical charge capacity (Ah) to stored kilowatt-hours (kWh) and calculates real usable energy based on operating state-of-charge boundaries."
          variables={[
            { symbol: "Ah", label: "Battery Charge Capacity", description: "Rated charge capacity at standard discharge rate (C/20 or C/5).", unit: "Ah" },
            { symbol: "Voltage_V", label: "Nominal System Voltage", description: "Nominal terminal voltage (3.7V, 12V, 24V, 48V).", unit: "V" },
            { symbol: "Nominal_kWh", label: "Gross Rated Energy", description: "Theoretical maximum stored electrical energy.", unit: "kWh" },
            { symbol: "DoD Window", label: "Depth of Discharge", description: "Operating SOC window (Start_SOC minus minimum reserve cutoff).", unit: "fraction" },
            { symbol: "SOH", label: "State of Health", description: "Current retention capacity relative to factory original.", unit: "fraction" },
          ]}
          notes={[
            "1,000 milliamp-hours (mAh) = 1 Amp-Hour (Ah).",
            "1 Kilowatt-Hour (kWh) = 1,000 Watt-Hours (Wh).",
            "Lead-Acid batteries exhibit capacity derating at high discharge rates per Peukert's Law (k = 1.15 to 1.30).",
          ]}
        />
      </div>

      {/* Section 6: FAQs */}
      <section id="faq-section" className="faq-section" style={{ marginTop: "2.5rem" }}>
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

      {/* Section 7: Connected Battery Planning Cluster */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Connected Battery Energy Planning Tools &amp; Research</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Expand your power system design with PowerLab&apos;s verified calculation engines, open datasets, and electrochemical research:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⏱️ Battery Runtime Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model continuous &amp; surge electrical loads with dynamic Peukert derating and inverter tare losses.
            </p>
            <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Battery Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Home Battery Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size a whole-house backup battery bank (kWh) for 1 to 3 days of complete grid-outage resilience.
            </p>
            <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Home Battery Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>☀️ Solar Battery Bank Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate battery bank capacity required to store daily solar PV yield across seasonal insolation hours.
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Battery Bank Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Battery Charging Time</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compute bulk &amp; absorption charge duration (hours) across AC chargers, solar MPPT, and alternator current.
            </p>
            <Link href="/battery/battery-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Battery Charging Time Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <Link href="/guides/battery-backup-runtime-calculation-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>
            📖 Read Battery Runtime Math Guide →
          </Link>
          <Link href="/datasets/bess-peukert-capacity-derating-tare-loss-benchmark" style={{ fontWeight: 600, color: "var(--accent)" }}>
            📊 Open BESS Peukert Benchmark Dataset (PL-DS-BESS-05) →
          </Link>
          <Link href="/research/electrochemical-peukert-derating-bess" style={{ fontWeight: 600, color: "var(--accent)" }}>
            🔬 Read BESS Peukert Research Paper (PL-TR-2026-BESS01) →
          </Link>
        </div>
      </section>
    </article>
  );
}


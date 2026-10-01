import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { BatteryCapacityCalculator } from "@/components/calculator/battery-capacity-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { MathDisplay } from "@/components/common/math-display";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Residential Battery Storage Lifespan & Degradation Guide",
  description: "Calculate home battery lifespan, cycle-life degradation, calendar aging, and thermal derating. Compare LiFePO4 vs NMC capacity retention and multi-year sizing margins.",
  canonicalPath: "/guides/residential-battery-storage-lifespan-and-degradation-guide",
  category: "battery",
  isArticle: true,
});

const FAQS = [
  {
    question: "How many years does a residential lithium battery storage system last?",
    answer: "A typical residential lithium iron phosphate (LiFePO4 / LFP) battery system delivers approximately 3,500 to 6,000+ equivalent full cycles (EFC) under standard 25°C laboratory test conditions, representing roughly 10 to 15+ years of routine daily cycling before reaching a 70%–80% warranty capacity retention threshold. In comparison, residential NMC batteries typically achieve 1,500 to 3,000 cycles (roughly 8 to 12 years) under comparable depth-of-discharge and temperature profiles. Actual lifespan varies based on ambient temperature, average state of charge, depth of discharge, and charge/discharge C-rates.",
  },
  {
    question: "What is the difference between battery cycle aging and calendar aging?",
    answer: "Cycle aging refers to the mechanical and electrochemical degradation that occurs during active charging and discharging (lithium intercalation/de-intercalation strain, electrode micro-cracking, and mechanical stress). Calendar aging is the time-dependent degradation that occurs even when the battery is idle, driven by parasitic side reactions, electrolyte decomposition, and solid electrolyte interphase (SEI) growth, accelerated by elevated temperatures (>30°C) and sustained high states of charge (>80%–90% SoC).",
  },
  {
    question: "Does cold weather permanently degrade a home solar battery?",
    answer: "Cold temperatures cause a temporary reduction in accessible capacity due to increased internal charge-transfer resistance (Rct) and slower lithium diffusion. At 0°C (32°F), available instantaneous discharge capacity typically drops by ~15%–20%. However, permanent irreversible damage occurs if an unheated lithium battery is charged at high current below freezing (0°C), which causes metallic lithium plating on the graphite anode, permanently consuming usable lithium inventory and creating internal short-circuit risks. Modern residential battery systems incorporate BMS low-temperature charge cutoffs or internal heating elements.",
  },
  {
    question: "Why is 70% or 80% capacity retention considered the End-of-Life (EOL) boundary?",
    answer: "In stationary battery standards and manufacturer warranties (referencing frameworks such as IEEE Std 485), 70% or 80% retention is an industry convention for battery replacement or warranty termination. This threshold does not mean the battery abruptly ceases to function; rather, beyond this point, cell internal resistance (ESR) and voltage drop under peak loads increase, and some cell chemistries may approach non-linear degradation knee points where capacity fade accelerates.",
  },
  {
    question: "Can I extend home battery life by limiting charge to 80% state of charge?",
    answer: "For NMC chemistries, resting below 80% SoC significantly slows calendar degradation and cathode transition metal dissolution. For LiFePO4 (LFP) chemistries, resting at 100% SoC causes much lower calendar fade rates than NMC; however, periodic 100% charging is recommended by many LFP battery management systems (BMS) to perform cell balancing and recalibrate State of Charge, as LFP's flat voltage plateau makes mid-range voltage-based SoC estimation difficult.",
  },
];

export default function BatteryDegradationGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Residential Battery Storage Lifespan, Cycle Degradation & Thermal Loss Guide",
    description: "Engineering guide to residential energy storage lifespan, cycle-life degradation mechanics, calendar aging kinetics, and ambient temperature derating for LiFePO4 vs NMC.",
    route: "/guides/residential-battery-storage-lifespan-and-degradation-guide",
    datePublished: "2026-09-22",
    dateModified: "2026-09-30",
    categoryName: "Battery Storage",
    categoryRoute: "/battery",
    standards: [
      "IEEE Std 485: IEEE Recommended Practice for Sizing Lead-Acid and Stationary Batteries",
      "UL 1973: Standard for Batteries for Use in Stationary and Motive Auxiliary Power Applications",
      "IEC 62619: Safety Requirements for Secondary Lithium Cells and Batteries in Industrial and Stationary Applications",
      "NREL BLAST-BESS: Battery Lifetime Analysis and Simulation Tool Suite",
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
        <span aria-current="page">Battery Lifespan &amp; Degradation Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Battery Energy Storage &amp; Electrochemistry Guide</p>
        <h1>Residential Battery Storage Lifespan, Cycle Degradation &amp; Thermal Loss Guide</h1>
        <p className="intro">
          An engineering guide to stationary battery storage degradation. Learn how to model cycle-life fade, calendar aging, depth-of-discharge kinetics, and ambient temperature derating across lithium iron phosphate (LiFePO4) and nickel-manganese-cobalt (NMC) chemistries.
        </p>
      </header>

      <DirectAnswerCard
        keyword="residential battery storage lifespan degradation formula"
        answer="Under an illustrative linear screening model, a stationary battery's retained capacity at year t is modeled as: Q_rem(t) = Q_0 × [1 - (EFC × δ_cycle) - (t_yr × δ_cal)] × k_temp. Modern residential LiFePO4 systems deliver approximately 3,500 to 6,000+ equivalent full cycles to an 80% capacity retention threshold under standard 25°C conditions, compared to 1,500 to 3,000 cycles for NMC chemistry. Sizing must account for operational Depth of Discharge (DoD) to ensure required usable emergency energy at End of Life."
        formula="Q_rem(t) = Q_0 × [1 - (EFC × δ_cycle) - (t_yr × δ_cal)] × k_temp   |   Usable Year-10 Energy = Q_rem(t) × DoD"
        standardExample="13.5 kWh LFP Battery at Year 10 (3,650 daily cycles @ 80% DoD = 2,920 EFC @ 25°C): 10.22% cycle fade + 10.50% calendar fade = 20.72% loss (79.28% retention = 10.70 kWh retained nominal capacity). Usable energy at 80% DoD = 8.56 kWh. Sizing for 10 kWh usable energy at Year 10 requires ≥15.76 kWh initial nominal capacity."
        sourceAuthority="Sizing & Safety Reference Standards: IEEE Std 485, UL 1973, IEC 62619 & NREL BLAST-BESS Modeling Tools"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Battery Capacity &amp; Usable Energy Sizing Engine</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Calculate nominal and usable battery energy across voltage baselines, depth-of-discharge boundaries, and amp-hour ratings, and test multi-year State of Health (SoH %) retention derating.
          </p>
        </div>
        <BatteryCapacityCalculator />
      </section>

      {/* Section 1: Electrochemistry Foundations */}
      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <div id="degradation-mechanics">
          <h2>1. Electrochemistry Foundations: LiFePO4 vs. NMC Degradation Mechanics</h2>
          <p>
            Residential stationary battery energy storage systems (BESS) experience two concurrent, irreversible degradation phenomena: <strong>Cycle-Life Fade</strong> (mechanical and chemical wear from active lithium-ion movement) and <strong>Calendar Aging</strong> (passive thermodynamic degradation occurring over elapsed time).
          </p>
          <p>
            The rates and mechanisms of degradation are governed by electrode materials, electrolyte stability, and operating conditions:
          </p>
          <ul>
            <li>
              <strong>Lithium Iron Phosphate (LiFePO4 / LFP):</strong> Features an olivine crystal lattice with high structural stability during lithium insertion and extraction. Volumetric expansion during full charge/discharge is modest (~6.5% in typical cell studies), reducing micro-cracking of active particles. LFP exhibits high thermal runaway onset temperatures (&gt;270°C in standard adiabatic tests) and commonly delivers approximately 3,500 to 6,000+ equivalent full cycles (EFC) under 25°C laboratory conditions before reaching 80% capacity retention.
            </li>
            <li>
              <strong>Nickel Manganese Cobalt (NMC):</strong> Utilizes a layered oxide crystal structure providing higher gravimetric energy density (typically 180–250 Wh/kg at pack level vs. 120–160 Wh/kg for LFP). However, repeated lithium de-intercalation induces anisotropic lattice strain (~8%–10% volumetric swing). At elevated states of charge (&gt;80%–90% SoC) and temperatures, transition metal dissolution into the electrolyte accelerates Solid Electrolyte Interphase (SEI) growth, typically resulting in 1,500 to 3,000 cycles under comparable laboratory conditions.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Depth of Discharge (DoD) & Cycling Tradeoffs */}
      <section id="formula-math" style={{ marginTop: "3rem" }}>
        <div id="formula-breakdown">
          <div id="dod-cycling-kinetics">
            <h2>2. Depth of Discharge (DoD) &amp; Equivalent Full Cycle (EFC) Kinetics</h2>
            <p>
              Battery warranties and sizing analyses quantify usage in terms of <strong>Equivalent Full Cycles (EFC)</strong>. One EFC represents cumulative energy throughput equal to 100% of nameplate battery capacity:
            </p>
            <div style={{ padding: "1rem 1.25rem", background: "var(--surface)", borderLeft: "4px solid var(--accent)", borderRadius: "0.5rem", margin: "1.25rem 0", fontFamily: "var(--font-mono, monospace)", fontSize: "0.95rem" }}>
              EFC = Cumulative Energy Throughput (kWh) ÷ Nameplate Battery Capacity (kWh) = Total Cycles × Depth of Discharge (DoD)
            </div>

            <FormulaCard
              title="Illustrative Linear Battery Degradation Screening Model"
              formula="Q_rem(t) = Q_0 × [1 - (EFC × δ_cycle) - (t_yr × δ_cal)] × k_temp   |   Usable Energy = Q_rem(t) × DoD"
              formulaDescription="An illustrative engineering screening model that approximates retained nominal battery capacity from cumulative cycling throughput and elapsed calendar time under moderate operating conditions. Not a substitute for manufacturer warranty specifications or multi-physics electrochemical modeling."
              variables={[
                { symbol: "Q_rem(t)", label: "Retained Nominal Capacity", description: "Remaining nameplate capacity at year t", unit: "kWh" },
                { symbol: "Q_0", label: "Initial Nameplate Capacity", description: "Beginning-of-life nameplate rated capacity", unit: "kWh" },
                { symbol: "EFC", label: "Equivalent Full Cycles", description: "Cumulative throughput normalized to full nameplate cycles (Cycles × DoD)", unit: "Cycles" },
                { symbol: "δ_cycle", label: "Cycle Fade Coefficient", description: "Illustrative capacity fade per EFC (e.g., ~0.0035%/EFC for LFP at 80% DoD, 25°C)", unit: "% / EFC" },
                { symbol: "t_yr", label: "Calendar Elapsed Time", description: "Operating life duration", unit: "Years" },
                { symbol: "δ_cal", label: "Calendar Aging Coefficient", description: "Illustrative annual calendar capacity loss (e.g., ~1.05%/year at 25°C, 50% SoC)", unit: "% / Year" },
                { symbol: "k_temp", label: "Temperature Factor", description: "Arrhenius thermal acceleration factor for non-standard temperatures", unit: "Dimensionless (1.0 @ 25°C)" },
                { symbol: "DoD", label: "Operational Depth of Discharge", description: "Programmed daily cycling window (e.g., 80% = 0.80)", unit: "Fraction" },
              ]}
              notes={[
                "Retained nominal capacity is the total cell capacity at year t. Daily usable energy requires multiplying by the operational DoD window (e.g., 10.70 kWh nominal × 80% DoD = 8.56 kWh usable).",
                "Real-world calendar aging exhibits non-linear kinetics (often approximating square-root-of-time √t in stable SEI regimes), and high temperatures accelerate side reactions exponentially via Arrhenius kinetics.",
                "To guarantee a target usable energy E_usable in Year 10, required initial nominal capacity = E_usable ÷ (Retention_fraction × DoD).",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Thermal Kinetics & Ambient Operating Limits */}
      <section id="sizing-matrix" style={{ marginTop: "3rem" }}>
        <div id="thermal-kinetics">
          <h2>3. Ambient Temperature Effects: Temporary Derating vs. Irreversible Aging</h2>
          <p>
            Temperature impacts stationary batteries across three distinct physical regimes: immediate available capacity (reversible), irreversible calendar aging (Arrhenius-accelerated), and Battery Management System (BMS) operating safety thresholds:
          </p>
          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <caption>Table 1: Ambient Temperature Operating Regimes for Residential Lithium Storage</caption>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)" }}>
                  <th scope="col" style={{ padding: "0.75rem" }}>Ambient Temp (°C / °F)</th>
                  <th scope="col" style={{ padding: "0.75rem" }}>Temporary Available Capacity*</th>
                  <th scope="col" style={{ padding: "0.75rem" }}>Irreversible Calendar Aging Rate</th>
                  <th scope="col" style={{ padding: "0.75rem" }}>Typical BMS Safety &amp; Charging Control</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>-10°C (14°F)</td>
                  <td style={{ padding: "0.75rem" }}>~70%–75% of rated kWh</td>
                  <td style={{ padding: "0.75rem" }}>Very Low (Electrochemical kinetics slowed)</td>
                  <td style={{ padding: "0.75rem", color: "#b91c1c" }}><strong>Charging restricted/prohibited:</strong> Prevents metallic lithium plating on graphite anode. Internal heaters warm pack before charging.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>0°C (32°F)</td>
                  <td style={{ padding: "0.75rem" }}>~82%–85% of rated kWh</td>
                  <td style={{ padding: "0.75rem" }}>Low (~0.6%–0.8% / year)</td>
                  <td style={{ padding: "0.75rem", color: "#d97706" }}>Charge rate derated to low C-rates (e.g. ≤0.1C–0.2C) unless internal heating is activated.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(16, 185, 129, 0.05)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>25°C (77°F) — Standard</td>
                  <td style={{ padding: "0.75rem" }}>100% (Nameplate rated baseline)</td>
                  <td style={{ padding: "0.75rem" }}>Nominal (~1.0%–1.5% / year)</td>
                  <td style={{ padding: "0.75rem", color: "#059669" }}>Standard operational window. Full rated charge/discharge current permitted.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>35°C (95°F)</td>
                  <td style={{ padding: "0.75rem" }}>~100%–101% (Slight ionic mobility increase)</td>
                  <td style={{ padding: "0.75rem" }}>Accelerated (~1.8%–2.4% / year)</td>
                  <td style={{ padding: "0.75rem" }}>Arrhenius SEI growth rate increases ~1.5× to 2.0×. Active fan or liquid cooling engagement.</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>45°C (113°F)</td>
                  <td style={{ padding: "0.75rem" }}>~101%–102%</td>
                  <td style={{ padding: "0.75rem" }}>Severe (&gt;2.5%–3.5%+ / year)</td>
                  <td style={{ padding: "0.75rem", color: "#b91c1c" }}>Thermal protection: Inverter and BMS throttle charge/discharge power to manage cell temperatures.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0.5rem 0 0 0" }}>
            *<em>Note on Temporary Available Capacity:</em> Reductions at low temperatures are reversible upon re-warming to 25°C. Irreversible capacity loss occurs via calendar aging and cyclic degradation.
          </p>
        </div>
      </section>

      {/* Section 4: Empirical Benchmark Matrix */}
      <section id="empirical-benchmark-matrix" style={{ marginTop: "3rem" }}>
        <h2>4. Empirical Sizing Benchmark Reference Matrix (PL-DS-BESS-06)</h2>
        <p>
          Derived from our open benchmark dataset <Link href="/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark" style={{ fontWeight: 700, color: "var(--accent)" }}>Residential BESS Degradation &amp; Thermal Loss Benchmark (PL-DS-BESS-06)</Link>, this matrix tabulates empirical capacity retention and internal resistance growth across equivalent full cycles:
        </p>
        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <caption>Table 2: Empirical Degradation and Resistance Benchmarks</caption>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)" }}>
                <th scope="col" style={{ padding: "0.75rem" }}>Battery Chemistry</th>
                <th scope="col" style={{ padding: "0.75rem" }}>EFC Throughput</th>
                <th scope="col" style={{ padding: "0.75rem" }}>Routine DoD</th>
                <th scope="col" style={{ padding: "0.75rem" }}>Cell Temp (°C)</th>
                <th scope="col" style={{ padding: "0.75rem" }}>Capacity Retention</th>
                <th scope="col" style={{ padding: "0.75rem" }}>Internal Resistance (R/R₀)</th>
                <th scope="col" style={{ padding: "0.75rem" }}>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>LiFePO4 (LFP)</td>
                <td style={{ padding: "0.75rem" }}>1,000 cycles (~2.7 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#059669", fontWeight: 600 }}>96.2%</td>
                <td style={{ padding: "0.75rem" }}>1.06×</td>
                <td style={{ padding: "0.75rem" }}>Active — Normal Operation</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>LiFePO4 (LFP)</td>
                <td style={{ padding: "0.75rem" }}>3,000 cycles (~8.2 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#059669", fontWeight: 600 }}>88.5%</td>
                <td style={{ padding: "0.75rem" }}>1.22×</td>
                <td style={{ padding: "0.75rem" }}>Active — Normal Wear</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>LiFePO4 (LFP)</td>
                <td style={{ padding: "0.75rem" }}>5,000 cycles (~13.7 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#d97706", fontWeight: 600 }}>81.4%</td>
                <td style={{ padding: "0.75rem" }}>1.38×</td>
                <td style={{ padding: "0.75rem" }}>Active — Approaching 80% Threshold</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(239, 68, 68, 0.04)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>LiFePO4 (LFP)</td>
                <td style={{ padding: "0.75rem" }}>3,000 cycles</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>45°C</td>
                <td style={{ padding: "0.75rem", color: "#b91c1c", fontWeight: 600 }}>82.1%</td>
                <td style={{ padding: "0.75rem" }}>1.34×</td>
                <td style={{ padding: "0.75rem" }}>Accelerated Thermal Aging</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>NMC</td>
                <td style={{ padding: "0.75rem" }}>1,000 cycles (~2.7 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#059669", fontWeight: 600 }}>91.8%</td>
                <td style={{ padding: "0.75rem" }}>1.15×</td>
                <td style={{ padding: "0.75rem" }}>Active — Normal Operation</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>NMC</td>
                <td style={{ padding: "0.75rem" }}>2,000 cycles (~5.5 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#d97706", fontWeight: 600 }}>82.4%</td>
                <td style={{ padding: "0.75rem" }}>1.36×</td>
                <td style={{ padding: "0.75rem" }}>Active — Approaching 80% Threshold</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", fontWeight: 600 }}>NMC</td>
                <td style={{ padding: "0.75rem" }}>3,000 cycles (~8.2 yrs)</td>
                <td style={{ padding: "0.75rem" }}>80%</td>
                <td style={{ padding: "0.75rem" }}>25°C</td>
                <td style={{ padding: "0.75rem", color: "#b91c1c", fontWeight: 600 }}>73.1%</td>
                <td style={{ padding: "0.75rem" }}>1.62×</td>
                <td style={{ padding: "0.75rem", color: "#b91c1c" }}>Below 80% Warranty Threshold</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Step-by-Step Worked Derivation */}
      <section id="worked-example" style={{ marginTop: "3rem" }}>
        <div id="worked-derivation">
          <h2>5. Step-by-Step Worked Engineering Degradation Calculation</h2>
          <p>
            Consider a typical residential solar-plus-storage installation evaluating a <strong>13.5 kWh LiFePO4 battery</strong> operating for <strong>10 years</strong> in an attached garage with 1 daily charge/discharge cycle:
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", marginTop: "1rem" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem" }}>Worked Example Design Inputs:</h3>
            <ul style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", lineHeight: 1.6 }}>
              <li><strong>Initial Nominal Capacity (Q₀):</strong> 13.5 kWh DC</li>
              <li><strong>Operating Depth of Discharge (DoD):</strong> 80% (10.8 kWh daily cycling throughput)</li>
              <li><strong>Operating Duration (t):</strong> 10 years (3,650 calendar days)</li>
              <li><strong>Cycle Throughput:</strong> 1.0 cycle per day (3,650 cycles × 0.80 DoD = <strong>2,920 EFC</strong>)</li>
              <li><strong>Average Ambient Temperature:</strong> 22°C (71.6°F)</li>
            </ul>

            <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)" }}>Step 1: Calculate Cycle Degradation (Fade_cycle)</h4>
            <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6 }}>
              For high-quality residential LiFePO4 cells, empirical cycle fade averages ~0.0035% per EFC at 80% DoD:
            </p>
            <MathDisplay
              title="Step 1: Cycling Capacity Loss"
              copyText="Fade_cycle = 2920 * 0.0035% = 10.22%"
              benchmark="2,920 EFC × 0.0035% / EFC = 10.22% cumulative cycling loss"
            >
              Fade_cycle = 2920 × 0.0035% = 10.22%
            </MathDisplay>

            <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)" }}>Step 2: Calculate Calendar Aging (Fade_cal)</h4>
            <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6 }}>
              At 22°C and a typical ~50% average resting State of Charge, calendar fade averages ~1.05% annually:
            </p>
            <MathDisplay
              title="Step 2: Passive Calendar Aging"
              copyText="Fade_cal = 10 * 1.05% = 10.50%"
              benchmark="10 years × 1.05% / year = 10.50% cumulative calendar loss"
            >
              Fade_cal = 10 × 1.05% = 10.50%
            </MathDisplay>

            <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)" }}>Step 3: Total Cumulative Capacity Loss &amp; Retention</h4>
            <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6 }}>
              Combining cycling loss and calendar aging under the linear screening model:
            </p>
            <MathDisplay
              title="Step 3: Combined Degradation Retention"
              copyText="Loss_total = 10.22% + 10.50% = 20.72% (Retention = 79.28%)"
              benchmark="10.22% cycle fade + 10.50% calendar aging = 20.72% total loss (79.28% retention)"
            >
              Loss_total = 10.22% + 10.50% = 20.72%   |   Retention = 100% - 20.72% = 79.28%
            </MathDisplay>

            <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)" }}>Step 4: Year-10 Retained Nominal vs. Usable Capacity</h4>
            <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6 }}>
              Applying the 79.28% retention factor to the initial 13.5 kWh nameplate capacity yields:
            </p>
            <MathDisplay
              title="Step 4: Retained Nominal Capacity"
              copyText="Q_rem(10 yr) = 13.5 kWh * 0.7928 = 10.70 kWh nominal"
              benchmark="13.5 kWh initial capacity × 0.7928 retention = 10.70 kWh retained nominal capacity"
            >
              Q_rem(10 yr) = 13.5 kWh × 0.7928 = 10.70 kWh (Retained Nominal Capacity)
            </MathDisplay>
            <p style={{ margin: "0.5rem 0", lineHeight: 1.6 }}>
              When operating within the standard 80% DoD window to preserve remaining cell health, the <strong>usable energy</strong> in Year 10 is:
            </p>
            <MathDisplay
              title="Step 4b: Year 10 Usable Energy (80% DoD Window)"
              copyText="E_usable(10 yr) = 10.70 kWh * 0.80 = 8.56 kWh usable"
              benchmark="10.70 kWh retained nominal × 80% DoD = 8.56 kWh usable energy"
            >
              E_usable(10 yr) = 10.70 kWh × 0.80 = 8.56 kWh (Usable Emergency Energy)
            </MathDisplay>

            <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)" }}>Step 5: Engineering Conclusion &amp; Year-10 Autonomy Sizing</h4>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              At 10 years, the 13.5 kWh system retains <strong>10.70 kWh nominal capacity (79.28%)</strong>, satisfying standard 70% 10-year manufacturer warranty boundaries and delivering <strong>8.56 kWh of usable energy</strong> at 80% DoD.
              <br /><br />
              <strong>Sizing Takeaway:</strong> If a homeowner requires a full <strong>10.0 kWh of usable energy</strong> during an emergency outage in Year 10 under an 80% DoD operating window:
              <br />
              <code style={{ display: "block", padding: "0.6rem", background: "var(--soft)", borderRadius: "0.4rem", margin: "0.5rem 0" }}>
                Required Initial Nominal Battery Size = 10.0 kWh ÷ (0.7928 Retention × 0.80 DoD) ≈ 15.76 kWh
              </code>
              (If emergency protocol permits 100% DoD cycling of remaining capacity during an active grid blackout, initial required capacity is <code>10.0 ÷ 0.7928 ≈ 12.61 kWh</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Connected Energy Planning Mesh Pathways */}
      <section id="related-tools" style={{ marginTop: "3.5rem" }}>
        <div id="cluster-mesh-pathways">
          <h2>6. Connected Battery Energy Planning Pathways</h2>
          <p>
            Longevity modeling connects directly to upstream load auditing, amp-hour capacity conversion, and empirical research benchmarks:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1.25rem" }}>
            <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>⚡ Battery Capacity &amp; Ah/kWh</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
                Convert Amp-Hours (Ah) to kilowatt-hours (kWh) across 12V, 24V, and 48V banks with chemistry-specific DoD windows.
              </p>
              <Link href="/battery/battery-capacity-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
                Battery Capacity Calculator →
              </Link>
            </div>

            <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>🏠 Whole-Home Storage Sizing</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
                Size a residential battery storage system for 12h, 24h, or multi-day grid blackout autonomy factoring degradation reserves.
              </p>
              <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
                Home Battery Size Calculator →
              </Link>
            </div>

            <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>⏱️ Battery Backup Runtime</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
                Model continuous backup operating hours under specific appliance running watts and inverter quiescent tare losses.
              </p>
              <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
                Battery Runtime Calculator →
              </Link>
            </div>

            <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>📊 Empirical Benchmark Dataset</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
                Explore our open research dataset tabulating empirical cycling and ambient temperature degradation data points.
              </p>
              <Link href="/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
                BESS Degradation Dataset (PL-DS-BESS-06) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Standards & Methodology Citations */}
      <section id="sources-methodology" style={{ marginTop: "3rem" }}>
        <div id="standards-citations">
          <h2>7. Standards, Research Citations &amp; Testing Authorities</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
            The degradation principles, sizing methodologies, and thermal criteria discussed in this guide reference published international testing standards and national laboratory research:
          </p>
          <ul style={{ lineHeight: 1.7, fontSize: "0.92rem", color: "var(--muted)", paddingLeft: "1.25rem" }}>
            <li>
              <strong>IEEE Std 485:</strong> <em>IEEE Recommended Practice for Sizing Lead-Acid and Stationary Batteries for Generating Stations and Substations</em> (incorporating aging margin practices such as sizing for 80% EOL capacity retention).
            </li>
            <li>
              <strong>UL 1973:</strong> <em>Standard for Batteries for Use in Stationary, Vehicle Auxiliary Power and Light Electric Rail Applications</em> (mandating safety construction, thermal runaway containment, and environmental testing).
            </li>
            <li>
              <strong>IEC 62619:</strong> <em>Secondary cells and batteries containing alkaline or other non-acid electrolytes - Safety requirements for secondary lithium cells and batteries in industrial and stationary applications</em>.
            </li>
            <li>
              <strong>NREL BLAST-BESS:</strong> <em>National Renewable Energy Laboratory Battery Lifetime Analysis and Simulation Tool Suite</em> (empirical and semi-empirical life prediction models for stationary storage).
            </li>
            <li>
              <strong>Sandia National Laboratories:</strong> <em>Energy Storage Systems (ESS) Safety and Reliability Research</em> (empirical capacity fade and solid electrolyte interphase kinetics).
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="faq-section" style={{ marginTop: "3.5rem" }}>
        <div id="faqs">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className="faq-grid" style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {FAQS.map((faq) => (
              <details
                className="faq-item"
                key={faq.question}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <summary style={{ fontWeight: 600, cursor: "pointer", color: "var(--brand-strong)" }}>{faq.question}</summary>
                <div className="faq-answer" style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--muted)" }}>{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}


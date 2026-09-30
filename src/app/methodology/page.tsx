import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";

export const metadata = buildPageMetadata({
  title: "Engineering Methodology & Physical Formulas",
  description:
    "Explore the mathematical models, loss factors, and deterministic calculation methods powering PowerLab clean energy planning tools.",
  canonicalPath: "/methodology",
});

export default function MethodologyPage() {
  return (
    <article className="page reading-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Engineering Methodology</span>
      </nav>

      <p className="eyebrow">Engineering Standards &amp; Methodology</p>
      <h1>Engineering Calculation Methodology</h1>
      <p className="intro">
        PowerLab implements <strong>deterministic mathematical calculations</strong> combining physics-based equations, empirical datasets, and established engineering standards. Every calculator explicitly exposes its loss factors, component efficiencies, and environmental parameters so calculation steps can be inspected and reproduced.
      </p>

      <div style={{ margin: "1rem 0 1.5rem 0", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <a
          href="/whitepapers/deterministic-mathematical-modeling-distributed-energy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          style={{ fontSize: "0.84rem", padding: "0.45rem 0.9rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
        >
          📄 Download Framework Technical Paper PDF
        </a>
        <AcademicCitationModal
          title="PowerLab Engineering Calculation Methodology & Loss Models"
          urlPath="/methodology"
          buttonLabel="🎓 Cite Methodology (BibTeX / APA / IEEE)"
        />
        <Link
          href="/datasets"
          className="button secondary-button"
          style={{ fontSize: "0.84rem", padding: "0.45rem 0.9rem" }}
        >
          📊 View Open Benchmark Datasets
        </Link>
      </div>

      {/* Core Principles */}
      <section>
        <h2>Core Engineering Principles</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            margin: "1.25rem 0",
          }}
        >
          <div
            className="flow-node-card"
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #f59e0b",
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>
              1. Deterministic &amp; Reproducible
            </strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Given the exact same electrical, thermal, and geographic inputs, calculation engines consistently produce the same reproducible result without hidden non-deterministic state.
            </p>
          </div>

          <div
            className="flow-node-card"
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #10b981",
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>
              2. Explicit Loss Parameterization
            </strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Calculators avoid idealized assumptions by explicitly modeling inverter tare draw, thermal derating, wiring resistance drop, and depth-of-discharge limits.
            </p>
          </div>

          <div
            className="flow-node-card"
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: "4px solid #0284c7",
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.35rem", color: "var(--brand-strong)" }}>
              3. Double-Precision Arithmetic
            </strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              Numeric calculations execute in standard 64-bit floating-point precision (IEEE 754), with unit rounding applied strictly at the presentation layer.
            </p>
          </div>
        </div>
      </section>

      {/* Model Classification */}
      <section>
        <h2>Model Classification Framework</h2>
        <p>
          To maintain scientific and engineering rigor, calculations across PowerLab are classified by their underlying mathematical foundation:
        </p>
        <ul style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
          <li><strong>Physics-Based Models:</strong> Deterministic relationships derived from fundamental electrical and thermodynamic laws (e.g., Ohm&apos;s law $V = IR$, Joule heating dissipation $P = I^2R$, inrush apparent power $S = \sqrt{3} V I$).</li>
          <li><strong>Empirical &amp; Benchmark References:</strong> Sourced from published national laboratory datasets and standards (e.g., ASHRAE 99%/1% climatic design temperatures, NREL NSRDB solar irradiance, U.S. EIA electricity tariff data).</li>
          <li><strong>Heuristic Sizing Rules:</strong> Established engineering rules of thumb used for initial planning estimates (e.g., latitude-based solar tilt rules, typical appliance load approximations).</li>
          <li><strong>Deterministic Numerical Algorithms:</strong> Multi-variable mathematical methods implemented in pure TypeScript (e.g., battery discharge integration, seasonal heat pump COP curves).</li>
        </ul>
      </section>

      {/* Battery Modeling */}
      <section>
        <h2>1. Battery Storage &amp; Runtime Modeling</h2>
        <p>
          Battery storage calculations evaluate the interaction between nominal capacity, terminal voltage, chemistry-specific Depth of Discharge (DoD), State of Health (SoH), inverter power conversion efficiency, and continuous idle power.
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            Usable Battery Runtime Equation:
          </strong>
          <code style={{ fontSize: "0.95rem", color: "var(--accent)" }}>
            Runtime (hours) = [ Capacity (Ah) × Voltage (V) × DoD (decimal) × SoH (decimal) × η_discharge ] ÷ [ Connected Load (W) + Inverter Idle Tare (W) ]
          </code>
        </div>

        <h3>Battery Chemistry &amp; Operating Characteristics:</h3>
        <ul style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
          <li>
            <strong>Lithium Iron Phosphate (LiFePO4):</strong> Typical usable DoD range of 80%–95%, one-way discharge-path efficiency of approx. 95%–98% (full round-trip efficiency ~90%–95%). Peukert capacity derating is minimal (k ≈ 1.01–1.05) under standard discharge rates (≤ 0.5C).
          </li>
          <li>
            <strong>Lithium Nickel Manganese Cobalt (NMC):</strong> Typical usable DoD range of 80%–90%, one-way discharge-path efficiency of approx. 94%–97% (round-trip efficiency ~88%–94%). Widely used in residential storage and EV traction packs for high volumetric energy density.
          </li>
          <li>
            <strong>Lead-Acid (AGM / Gel / Flooded):</strong> 50% DoD is a common design guideline to protect cycle life; deeper discharges accelerate capacity degradation. Lead-acid exhibits pronounced Peukert capacity loss (k ≈ 1.10–1.30) when operated at elevated discharge rates.
          </li>
          <li>
            <strong>Operating Qualifications:</strong> Delivered runtime depends on ambient cell temperature, discharge C-rate, battery age (State of Health), BMS low-voltage cutoffs, and inverter tare draw.
          </li>
        </ul>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Battery Runtime Calculator →
          </Link>
          <Link href="/battery/battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Battery Size Calculator →
          </Link>
          <Link href="/battery/ups-runtime-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            UPS Runtime Calculator →
          </Link>
        </div>
      </section>

      {/* Solar Modeling */}
      <section>
        <h2>2. Solar PV Geometry &amp; Yield Estimation</h2>
        <p>
          Solar array sizing integrates astronomical solar geometry, empirical irradiance data, and explicit balance-of-system loss factors.
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            Latitude-Based Solar Tilt Reference Heuristics:
          </strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", fontSize: "0.92rem", lineHeight: 1.55 }}>
            <li><strong>Annual Yield Reference Tilt:</strong> Tilt ≈ |Latitude| × 0.9 (heuristic approximation for fixed south-facing modules to maximize annual cumulative solar capture).</li>
            <li><strong>Winter Seasonal Bias:</strong> Tilt ≈ |Latitude| + 15° (steeper tilt angle optimized for low winter sun angles and improved snow shedding).</li>
            <li><strong>Summer Seasonal Bias:</strong> Tilt ≈ |Latitude| - 15° (shallower tilt angle aligned with high summer solar elevation).</li>
          </ul>
        </div>

        <h3>Solar Loss Modeling &amp; Benchmark References:</h3>
        <p style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
          Rather than applying an arbitrary lump-sum derating, PowerLab calculation models parameterize loss mechanisms individually: module temperature coefficients (derating maximum power based on ambient temperature and NOCT), soiling, snow coverage, module mismatch, DC/AC wiring resistance, and inverter conversion efficiency curves. Inverter clipping is evaluated when modeled DC power exceeds the inverter&apos;s rated AC continuous output. Regional solar insolation values reference empirical datasets from the <strong>NREL National Solar Radiation Database (NSRDB)</strong> and NREL PVWatts V8 model calculations.
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Solar Panel Tilt Calculator →
          </Link>
          <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Solar Panel Output Calculator →
          </Link>
          <Link href="/solar/regional-climate-data" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            50-State Climate &amp; Solar DB →
          </Link>
          <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Snow Albedo &amp; Tilt Paper →
          </Link>
        </div>
      </section>

      {/* EV Modeling */}
      <section>
        <h2>3. Electric Vehicle (EV) Charging &amp; Energy Dynamics</h2>
        <p>
          EV charging models calculate the duration, energy delivered, and electricity costs associated with replenishing a traction battery pack:
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            EV Charging Duration Formula:
          </strong>
          <code style={{ fontSize: "0.95rem", color: "var(--accent)" }}>
            Time (hours) = [ Usable Pack Capacity (kWh) × (Target SoC - Start SoC) ] ÷ [ Supply Power (kW) × η_charging ]
          </code>
        </div>

        <p style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
          <strong>Formula Definitions &amp; Dimensional Units:</strong>
        </p>
        <ul style={{ margin: "0.5rem 0 1rem 1.25rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
          <li><strong>Usable Pack Capacity (kWh):</strong> Net usable battery energy capacity (from 0% to 100% displayed state of charge).</li>
          <li><strong>Target SoC &amp; Start SoC:</strong> Desired and initial charge levels expressed as decimal fractions (e.g., 0.80 and 0.20 for 80% and 20%).</li>
          <li><strong>Supply Power (kW):</strong> Electrical power delivered to the vehicle EVSE inlet (V × I × phases / 1000).</li>
          <li><strong>Charging Efficiency (η_charging):</strong> Decimal one-way efficiency accounting for onboard rectification, thermal management, and baseline vehicle computing overhead (kWh ÷ kW = hours).</li>
        </ul>

        <h3>Representative Charging Level Parameters:</h3>
        <ul style={{ margin: "0.5rem 0 1rem 1.25rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
          <li><strong>Level 1 (120V AC / 12–16A):</strong> Representative efficiency ~78%–83%. At low input power (~1.4–1.9 kW), continuous vehicle auxiliary loads (150W–300W for BMS, battery coolant pumps, and electronics) constitute a substantial percentage of total energy draw.</li>
          <li><strong>Level 2 (208/240V AC / 16–48A):</strong> Representative efficiency ~88%–92%. Higher power throughput (3.3–11.5 kW) reduces relative parasitic overhead, with losses dominated by onboard AC/DC rectification. (Electrical branch circuits are sized per NEC 625 continuous load requirements).</li>
          <li><strong>DC Fast Charging (400V–800V DC):</strong> Off-board rectification delivers direct DC power to the battery pack. Vehicle battery management systems typically implement non-linear charging taper curves (commonly above ~80% SoC) to prevent lithium plating, mitigate thermal stress, and manage individual cell voltage thresholds.</li>
          <li><strong>Low-Temperature Effects (&lt;0°C / 32°F):</strong> Effective charging throughput is reduced by elevated cell internal resistance and energy diverted to active battery heating systems.</li>
        </ul>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EV Charging Time Calculator →
          </Link>
          <Link href="/ev/ev-charging-cost-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EV Charging Cost Calculator →
          </Link>
          <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EVSE Continuous Duty Paper →
          </Link>
        </div>
      </section>

      {/* Home Energy Modeling */}
      <section>
        <h2>4. Household Electrical Load &amp; Tariff Modeling</h2>
        <p>
          Appliance wattage calculations distinguish between <strong>continuous running power (W)</strong> and <strong>inductive starting surge (apparent kVA / inrush current)</strong>, referencing NEMA MG-1 locked-rotor motor codes and ISO 8528-5 generator transient load acceptance limits (see our <Link href="/research/deterministic-inrush-load-stacking-generator-sizing">Motor Inrush Technical Report</Link>).
        </p>
        <p>
          HVAC and heating models evaluate seasonal efficiency metrics (SEER2 for cooling, HSPF2 / COP for heat pumps), ambient temperature-dependent COP degradation, auxiliary strip heat staging, and tiered volumetric electricity rates published by the U.S. EIA.
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Electricity Usage Calculator →
          </Link>
          <Link href="/home-energy/heat-pump-cost-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Heat Pump Cost Calculator →
          </Link>
          <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Heat Pump COP Paper →
          </Link>
          <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Motor Inrush &amp; Generator Paper →
          </Link>
        </div>
      </section>

      {/* Methodology Summary Table */}
      <section>
        <h2>5. Methodology &amp; Provenance Summary Table</h2>
        <div style={{ overflowX: "auto", margin: "1.25rem 0", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.6rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--surface-header, #0f172a)", color: "#ffffff", borderBottom: "2px solid #334155" }}>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Domain</th>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Model Classification</th>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Core Equation / Method</th>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Key Units</th>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Primary References</th>
                <th style={{ padding: "0.65rem 0.8rem", fontWeight: 700 }}>Key Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--line-subtle, #f1f5f9)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>Battery Runtime</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Deterministic Numerical</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>t = (Ah × V × DoD × SoH × η) / (P_load + P_tare)</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Ah, V, W, hours</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>IEEE 485, UL 9540</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Assumes steady load; C-rate Peukert loss qualified by chemistry.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line-subtle, #f1f5f9)", background: "var(--bg-secondary, #f8fafc)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>Solar PV Output</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Empirical &amp; Parametric</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>E_ac = P_dc × PSH × (1 - Losses) × η_inv</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>kW, h/day, kWh</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>NREL NSRDB, PVWatts V8 Model</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Uses regional monthly averages; local microclimate and soiling vary.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line-subtle, #f1f5f9)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>Solar Panel Tilt</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Heuristic / Geometric</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>Tilt ≈ |Latitude| × 0.9 (annual reference)</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>degrees (°)</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>ASHRAE Fundamentals, NREL</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Fixed orientation guide; real roofs are constrained by pitch/azimuth.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line-subtle, #f1f5f9)", background: "var(--bg-secondary, #f8fafc)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>EV Charging</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Deterministic Numerical</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>t = [Cap × (SoC_target - SoC_start)] / (P_supply × η)</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>kWh, kW, hours</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>SAE J1772, NEC 625</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>DC fast charging taper curves vary by vehicle BMS and temperature.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line-subtle, #f1f5f9)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>Voltage Drop</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Physics-Based</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>VD = (2 × L × I × R) / 1000</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>ft, A, Ω/kft, V</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>NEC Chapter 9 Table 8, NEC 210.19</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Applies DC/single-phase resistance; power factor affects AC reactance.</td>
              </tr>
              <tr style={{ background: "var(--bg-secondary, #f8fafc)" }}>
                <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>Motor Inrush Surge</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Standards &amp; Physics</td>
                <td style={{ padding: "0.6rem 0.8rem", fontFamily: "var(--font-mono, monospace)" }}>S_start = HP × (kVA/HP)_code</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>HP, kVA, kW</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>NEMA MG-1, ISO 8528-5</td>
                <td style={{ padding: "0.6rem 0.8rem" }}>Soft-starters and VFDs alter the physical starting envelope.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Verification */}
      <section>
        <h2>6. Continuous Model Verification</h2>
        <p>
          Every calculator engine is implemented in pure TypeScript and verified through automated Vitest test suites. The test pipeline validates:
        </p>
        <ul style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
          <li><strong>Boundary Invariants:</strong> Confirming mathematical outputs remain non-negative, finite, and strictly within physical constraints under extreme input values.</li>
          <li><strong>Dimensional Consistency:</strong> Checking that electrical unit transformations (e.g., Ah to kWh, kVA to kW, BTU/h to watts) maintain exact conservation of energy.</li>
          <li><strong>Regression Prevention:</strong> Ensuring mathematical engine refactorings preserve identical numerical outputs for baseline test vectors.</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>
          To explore further technical documentation, review our <Link href="/standards">Standards &amp; Technical References</Link>, inspect our <Link href="/research">Research Papers</Link>, look up terms in the <Link href="/glossary">Engineering Glossary</Link>, or browse our <Link href="/sources">Laboratory Sources Directory</Link>.
        </p>
      </section>
    </article>
  );
}


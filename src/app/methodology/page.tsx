import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";

export const metadata = buildPageMetadata({
  title: "Engineering Methodology & Formulas",
  description: "Explore the first-principles mathematical formulas, visible physical loss models, and deterministic standards powering PowerLab energy planning tools.",
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

      <p className="eyebrow">Engineering Standards &amp; Physics</p>
      <h1>Engineering Calculation Methodology</h1>
      <p className="intro">
        PowerLab uses <strong>deterministic mathematical modeling</strong> rooted in first-principles physics. Every calculator exposes the physical loss factors, component efficiencies, and environmental coefficients that materially affect system performance.
      </p>

      <div style={{ margin: "1rem 0 1.5rem 0", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <AcademicCitationModal
          title="PowerLab Engineering Calculation Methodology & Loss Models"
          urlPath="/methodology"
          buttonLabel="🎓 Cite Methodology (BibTeX / APA / IEEE)"
        />
        <a
          href="https://doi.org/10.6084/m9.figshare.33321774"
          target="_blank"
          rel="noopener noreferrer"
          className="button secondary-button"
          style={{ fontSize: "0.84rem", padding: "0.45rem 0.9rem" }}
        >
          📄 View Figshare Working Paper (DOI)
        </a>
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
              Given the exact same electrical and geographic inputs, our calculation engines will always produce the exact same authoritative result.
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
              2. Visible Physical Losses
            </strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              We never assume 100% ideal efficiency. Inverter tare draw, thermal derating, wiring drop, and depth-of-discharge limits are explicitly modeled.
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
              3. Discrete Floating-Point Precision
            </strong>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              All internal calculations retain IEEE 754 64-bit double precision and round cleanly only at final presentation to avoid compounding errors.
            </p>
          </div>
        </div>
      </section>

      {/* Battery Modeling */}
      <section>
        <h2>1. Battery Storage &amp; Runtime Modeling</h2>
        <p>
          Battery storage calculations model the interaction between electrical energy, nominal voltage, chemistry-specific Depth of Discharge (DoD), and power conversion losses.
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            General Usable Runtime Equation:
          </strong>
          <code style={{ fontSize: "1rem", color: "var(--accent)" }}>
            Runtime (hours) = [ Capacity (Ah) × Voltage (V) × DoD × Health (%) × Inverter Efficiency (%) ] ÷ [ Connected Load (W) + Inverter Idle Tare (W) ]
          </code>
        </div>

        <h3>Key Chemistry Parameters:</h3>
        <ul>
          <li><strong>Lithium Iron Phosphate (LiFePO4):</strong> Recommended DoD 85%–95%, round-trip efficiency ~95%, negligible Peukert loss (k ≈ 1.02). Ideal for solar storage and camper vans.</li>
          <li><strong>Lithium Nickel Manganese Cobalt (NMC):</strong> Recommended DoD 80%–90%, round-trip efficiency ~92%–95%. High volumetric energy density for EVs and residential powerwalls.</li>
          <li><strong>Lead-Acid (AGM / Gel / Flooded):</strong> Recommended DoD 50% max to prevent sulfation and premature cycle degradation; significant Peukert effect (k = 1.15–1.30) at high discharge C-rates.</li>
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
          Solar array sizing and tilt optimization combine astronomical solar position geometry with empirical insolation models.
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            Seasonal Tilt Optimization Heuristics:
          </strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
            <li><strong>Year-Round Optimal Tilt:</strong> Tilt ≈ |Latitude| × 0.9 + 29° (adjusted for latitude bands)</li>
            <li><strong>Winter Solar Boost:</strong> Tilt ≈ |Latitude| × 0.9 + 29° + 15° (steep angle to capture low winter sun and shed snow)</li>
            <li><strong>Summer Solar Peak:</strong> Tilt ≈ |Latitude| × 0.9 - 15°</li>
          </ul>
        </div>

        <p>
          When modeling annual kilowatt-hour yields, PowerLab integrates the <strong>PVWatts V8</strong> algorithm from the National Renewable Energy Laboratory (NREL), accounting for standard system derating losses (~14.08% nominal covering soiling, shading, snow, mismatch, wiring, and inverter clipping).
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Solar Panel Tilt Calculator →
          </Link>
          <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Solar Panel Output Calculator →
          </Link>
          <Link href="/solar/solar-battery-bank-size-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Solar Battery Bank Calculator →
          </Link>
        </div>
      </section>

      {/* EV Modeling */}
      <section>
        <h2>3. Electric Vehicle (EV) Charging &amp; Energy Dynamics</h2>
        <p>
          EV charging duration and cost models calculate effective grid-to-battery energy transfer:
        </p>

        <div className="formula-box" style={{ padding: "1.25rem", margin: "1rem 0", borderRadius: "0.5rem" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-strong)" }}>
            EV Charging Duration Formula:
          </strong>
          <code style={{ fontSize: "1rem", color: "var(--accent)" }}>
            Time (hours) = [ Usable Pack Capacity (kWh) × (Target SoC% - Start SoC%) ] ÷ [ Supply Power (kW) × Charger Onboard Efficiency (%) ]
          </code>
        </div>

        <p>
          PowerLab applies empirical level efficiencies rooted in AC recharge energy modeling:
        </p>
        <ul style={{ margin: "0.5rem 0 1rem 1.25rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
          <li><strong>Level 1 (120V / 12–16A AC):</strong> ~78%–83% efficiency. At low charging throughput (~1.4 kW), fixed continuous parasitic loads from vehicle computers, coolant pumps, and BMS (~150W–300W) consume 15%–20% of supplied energy.</li>
          <li><strong>Level 2 (240V / 32–48A AC):</strong> ~88%–92% efficiency. Higher delivery rates (7.7–11.5 kW) reduce the relative parasitic overhead to &lt;4%, with losses dominated by onboard charger (OBC) rectification.</li>
          <li><strong>Cold Weather Thermal Conditioning (&lt;0°C / 32°F):</strong> ~80%–84% effective grid-to-battery efficiency due to increased internal electrochemical cell impedance and power diversion to active PTC battery heaters, as empirically quantified by <em>Archsmith, Kendall, &amp; Rapson (2015)</em>.</li>
          <li><strong>DC Fast Charging (400V–800V DC):</strong> Off-board rectification delivers ~90%–95% direct-to-battery efficiency, modeled with non-linear saturation tapering beyond 80% State of Charge.</li>
        </ul>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EV Charging Time Calculator →
          </Link>
          <Link href="/ev/ev-charging-cost-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EV Charging Cost Calculator →
          </Link>
          <Link href="/ev/ev-savings-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            EV Fuel Savings Calculator →
          </Link>
        </div>
      </section>

      {/* Home Energy Modeling */}
      <section>
        <h2>4. Household Electrical Load &amp; Tariff Modeling</h2>
        <p>
          Appliance wattage audits differentiate between <strong>continuous running power</strong> and <strong>inductive inrush surge power</strong> (e.g., compressor start on refrigerators and HVAC heat pumps).
        </p>
        <p>
          Energy bill estimations support tiered pricing, fixed meter connection charges, and seasonal volumetric kilowatt-hour utility rates.
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/electricity-usage-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Electricity Usage Calculator →
          </Link>
          <Link href="/home-energy/appliance-wattage-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Appliance Wattage Audit →
          </Link>
          <Link href="/home-energy/energy-bill-calculator" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>
            Energy Bill Calculator →
          </Link>
        </div>
      </section>

      {/* Continuous Verification */}
      <section>
        <h2>5. Continuous Model Verification</h2>
        <p>
          Every calculator engine is governed by strict Vitest unit test suites testing edge cases, boundary invariants, unit conversions, and known bench-test measurements before deployment.
        </p>
        <p>
          For full references and technical literature citations, visit our <Link href="/sources">Authoritative Data Sources</Link> page or review our <Link href="/privacy">Zero-Database Privacy Policy</Link>.
        </p>
      </section>
    </article>
  );
}

import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Terms of Use & Calculator Disclaimers",
  description: "Review terms of use and planning disclaimers for PowerLab deterministic mathematical models, physical loss formulas, and energy calculators.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  return (
    <article className="page reading-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Terms of Use</span>
      </nav>

      <p className="eyebrow">Engineering Disclaimers &amp; Terms of Service</p>
      <h1>Terms of Use &amp; Engineering Disclaimers</h1>
      <p className="intro">
        Welcome to PowerLab. By accessing our deterministic mathematical modeling engines, educational guides, scientific preprints, and energy planning calculators, you acknowledge and agree to the following terms, conditions, and engineering disclaimers.
      </p>

      {/* Highlights Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          margin: "1.75rem 0 2.5rem",
        }}
      >
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
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📐</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Preliminary Modeling Only</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Outputs are preliminary physical estimations for planning, feasibility, and educational analysis.
          </p>
        </div>

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
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚡</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Not Certified Electrical Advice</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            All electrical branch circuits, service panels, and ESS installations require licensed Master Electricians.
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
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔓</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Open Educational Access</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Published research whitepapers, LaTeX equations, and source code are open under Creative Commons CC BY 4.0.
          </p>
        </div>
      </div>

      <section>
        <h2>1. Scope &amp; Educational Intent</h2>
        <p>
          PowerLab provides deterministic computational engines designed to model electrical loads, battery storage runtime, solar photovoltaic yields, heat pump thermodynamic degradation, and electric vehicle charging mechanics.
        </p>
        <p>
          All calculations, interactive graphs, tabular datasets, and technical reports are developed as <strong>Open Educational Resources (OER)</strong> and preliminary engineering planning tools. They are intended for homeowners, engineering students, electricians, solar designers, and researchers to understand governing physical laws and first-principles mathematical relationships.
        </p>
      </section>

      <section>
        <h2>2. No Professional Engineering, Permitting, or Certified Installation Advice</h2>
        <p>
          The computational models and estimates generated on PowerLab <strong>do not constitute professional engineering advice, certified architectural drawings, structural loading sign-offs, official utility interconnection filings, or local building code certifications</strong>.
        </p>
        <ul>
          <li><strong>Jurisdictional Compliance (AHJ):</strong> Physical installations must strictly adhere to local electrical codes (NFPA 70 / National Electrical Code, Canadian Electrical Code CSA C22.1, or IEC standards) and the specific requirements of your local Authority Having Jurisdiction (AHJ).</li>
          <li><strong>Licensed Professional Requirement:</strong> Sizing calculations for circuit breakers, continuous duty EVSE wiring (NEC Article 625), battery energy storage systems (NEC Article 706), generator transfer switches (NEC Article 702), and rooftop solar interconnection (NEC Article 690 / IEEE 1547) must be verified and executed by a certified Master Electrician or licensed Professional Engineer (PE).</li>
          <li><strong>Structural &amp; Wind Loading:</strong> Sizing arrays using solar tilt or roof orientation models does not replace structural engineering analysis for roof load bearing, wind uplift forces, or seismic bracing.</li>
        </ul>
      </section>

      <section>
        <h2>3. Accuracy of Inputs, Mathematical Assumptions &amp; Physical Variations</h2>
        <p>
          All computational results produced by PowerLab are deterministic outputs derived strictly from user-supplied inputs, visible system presets, and documented physical equations. Real-world clean energy systems are subject to operational variables that may cause actual performance to diverge from simulated results:
        </p>
        <ul>
          <li><strong>Temperature &amp; Thermal Losses:</strong> Conductor resistance (I²R Joule heating), battery electrochemical capacity derating in freezing temperatures, and solar photovoltaic temperature coefficient voltage expansion (Voc) vary based on dynamic ambient conditions.</li>
          <li><strong>Equipment Wear &amp; Degradation:</strong> SOH (State of Health) decline, annual photovoltaic module degradation (~0.5%/year), and inverter efficiency non-linearities across low loading fractions impact long-term yield.</li>
          <li><strong>Appliance Duty Cycles:</strong> Actual household power draw depends on compressor cycling frequencies, thermostat setpoints, standby phantom loads, and non-coincident starting surges.</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Meteorological Models &amp; Utility Tariff Benchmarks</h2>
        <p>
          Certain tools on PowerLab integrate external standardized datasets, including:
        </p>
        <ul>
          <li><strong>NREL PVWatts V8:</strong> Solar production simulations utilize historical normalized meteorological irradiance data provided by the National Renewable Energy Laboratory. PowerLab does not guarantee future solar irradiance or weather patterns.</li>
          <li><strong>EIA Regional Electricity Rates:</strong> Electricity tariffs and utility escalation rates are based on published benchmarks from the U.S. Energy Information Administration (EIA) and state regulatory filings. Actual utility bills may include tiered peak-demand charges, fixed meter fees, and time-of-use (TOU) multipliers not captured in generic baseline rates.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property &amp; Creative Commons Attribution (CC BY 4.0)</h2>
        <p>
          PowerLab is dedicated to open science, computational reproducibility, and open-access educational literature:
        </p>
        <ul>
          <li><strong>Research Whitepapers &amp; Preprints:</strong> All technical reports published under the PowerLab Open Energy Research series are licensed under <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>. You are free to share, adapt, and cite them in academic syllabi, courseware, or technical publications with appropriate attribution and DOI citation.</li>
          <li><strong>TypeScript Engine Logic:</strong> The underlying mathematical calculation engines are open-source and free from proprietary black-box algorithms.</li>
        </ul>
      </section>

      <section>
        <h2>6. Limitation of Liability &amp; Warranty Disclaimer</h2>
        <p>
          PowerLab, its developers, researchers, and contributors provide this website and all calculation engines on an <strong>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis</strong>, without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or mathematical precision for certified applications.
        </p>
        <p>
          In no event shall PowerLab or its contributors be liable for any direct, indirect, incidental, special, consequential, or exemplary damages (including, without limitation, loss of electricity savings, equipment damage, electrical fires, permitting penalties, structural failures, or personal injury) arising out of or in connection with the use of or inability to use the tools or data on this site.
        </p>
      </section>

      <section>
        <h2>7. Revisions, Methodology &amp; Engineering Inquiries</h2>
        <p>
          We periodically update our deterministic formulas, efficiency standards, and physical loss models to reflect updated editions of IEEE, NFPA, ASHRAE, and IEC standards. For detailed mathematical derivations and standard citations, please consult our <Link href="/methodology">Engineering Methodology</Link> and <Link href="/sources">Authoritative Sources</Link>.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Last terms revision: <time dateTime="2026-09-03">September 3, 2026</time>.
        </p>
      </section>
    </article>
  );
}


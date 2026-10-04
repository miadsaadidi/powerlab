import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Terms of Use & Planning Disclaimers — PowerLab",
  description: "Review terms of use, calculation disclaimers, licensing terms, and engineering assumptions for PowerLab energy planning tools and models.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PowerLab Terms of Use & Engineering Disclaimers",
    url: `${siteConfig.url}/terms`,
    description: "Terms of use, preliminary planning disclaimers, licensing terms, and engineering assumptions for PowerLab calculators and research.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
    },
  };

  return (
    <article className="page reading-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Terms of Use</span>
      </nav>

      <p className="eyebrow">Engineering Disclaimers &amp; Terms of Service</p>
      <h1>Terms of Use &amp; Engineering Disclaimers</h1>
      <p className="intro">
        Welcome to PowerLab. By accessing our engineering calculation engines, educational guides, research reports, and energy planning tools, you acknowledge and agree to the following terms, conditions, licensing provisions, and engineering disclaimers.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Preliminary Screening Only</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Outputs are preliminary computational estimates for educational analysis, screening, and system planning.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Professional Review Required</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Physical installations, electrical circuits, and utility interconnections require licensed professionals and AHJ approval.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Open Research Licensing</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Designated research whitepapers and open datasets are licensed under Creative Commons CC BY 4.0.
          </p>
        </div>
      </div>

      <section>
        <h2>1. Scope &amp; Educational Intent</h2>
        <p>
          PowerLab provides computational engines designed to model electrical loads, battery storage runtime, solar photovoltaic yields, heat pump performance, and electric vehicle charging mechanics.
        </p>
        <p>
          Our calculation models comprise physics-based formulas, empirical relationships, engineering heuristics, reference lookup tables, and dataset-driven simulations. These tools are provided for educational, feasibility screening, and preliminary planning purposes to help users understand physical relationships and modeling trade-offs.
        </p>
      </section>

      <section>
        <h2>2. No Professional Engineering, Permitting, or Certified Installation Advice</h2>
        <p>
          Estimates and outputs generated by PowerLab <strong>do not constitute professional engineering advice, stamped architectural designs, structural load sign-offs, official utility interconnection approvals, or building code certifications</strong>.
        </p>
        <ul>
          <li><strong>Jurisdictional Compliance &amp; AHJ:</strong> Physical installations must comply with the electrical, building, fire, and mechanical codes legally adopted in your specific jurisdiction (such as NFPA 70 / NEC, Canadian Electrical Code CSA C22.1, or applicable IEC/EN standards) and the requirements of the local Authority Having Jurisdiction (AHJ). Standards have differing scopes, legal adoption mechanisms, and published editions.</li>
          <li><strong>Qualified Professional Requirement:</strong> Sizing calculations for overcurrent protection, continuous EVSE circuits, battery energy storage systems (BESS), generator transfer equipment, and solar interconnection must be reviewed, engineered, and installed by a properly licensed electrician, electrical contractor, or Professional Engineer as required by the applicable jurisdiction.</li>
          <li><strong>Structural &amp; Environmental Loading:</strong> Solar tilt, orientation, and mounting calculations do not replace structural engineering assessments for roof weight capacity, wind uplift forces, snow loads, or seismic bracing.</li>
        </ul>
      </section>

      <section>
        <h2>3. Nature of Deterministic Calculations &amp; Physical Variations</h2>
        <p>
          PowerLab engines are <em>deterministic</em> in the computational sense: given identical numerical inputs and model assumptions, the software produces repeatable mathematical outputs. Computational repeatability is distinct from real-world physical prediction accuracy:
        </p>
        <ul>
          <li><strong>Thermal &amp; Operating Variations:</strong> Conductor resistance (I²R losses), battery electrochemical capacity derating at extreme temperatures, and PV voltage temperature coefficients (Voc) fluctuate dynamically with ambient environmental conditions.</li>
          <li><strong>Equipment Wear &amp; Degradation:</strong> Battery State of Health (SOH) decline, solar module degradation (modeled with an illustrative default assumption such as ~0.5%/year, which varies by cell technology, climate, and manufacturer warranty), and inverter partial-load efficiency non-linearities affect long-term system output.</li>
          <li><strong>Appliance &amp; Load Dynamics:</strong> Real-world household electrical power varies with thermostat setpoints, compressor cycling duty fractions, standby parasitic loads, and non-coincident starting inrush surges.</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Meteorological Models &amp; Benchmark Utility Rates</h2>
        <p>
          Certain PowerLab tools incorporate external data sources and third-party modeling references:
        </p>
        <ul>
          <li><strong>NREL PVWatts V8:</strong> Solar production simulations utilize photovoltaic modeling methodology and solar resource datasets from the National Renewable Energy Laboratory (NREL). Future solar irradiance, weather conditions, and actual system yields cannot be guaranteed.</li>
          <li><strong>EIA Benchmark Electricity Rates:</strong> Electricity rates and escalation factors use published regional averages from the U.S. Energy Information Administration (EIA). These values serve as reference benchmarks and do not reflect specific utility tariffs, tiered structures, time-of-use (TOU) schedules, demand charges, fixed customer fees, or local taxes.</li>
          <li><strong>Third-Party Providers:</strong> External organizations (including NREL, EIA, and standards bodies) maintain their own independent terms of use, update cadences, and data limitations. PowerLab does not control or certify third-party services.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property &amp; Licensing Framework</h2>
        <p>
          PowerLab applies distinct licensing terms across different platform materials:
        </p>
        <ul>
          <li><strong>Research Publications &amp; Datasets:</strong> Technical whitepapers and structured benchmark datasets published under the PowerLab Open Energy Research series are licensed under the <strong>Creative Commons Attribution 4.0 International License (CC BY 4.0)</strong>, allowing sharing and adaptation with appropriate attribution.</li>
          <li><strong>Calculation Engines:</strong> Platform calculation logic is implemented in transparent, deterministic TypeScript in the public project repository under its applicable open-source license.</li>
          <li><strong>Website Content &amp; Design:</strong> Website branding, UI layout, graphics, text, and compilation are protected by applicable copyright laws.</li>
        </ul>
      </section>

      <section>
        <h2>6. Limitation of Liability &amp; Warranty Disclaimer</h2>
        <p>
          PowerLab and its contributors provide this website, documentation, and all calculation tools on an <strong>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis</strong>, without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or suitability for certified or safety-critical applications.
        </p>
        <p>
          To the maximum extent permitted by applicable law, in no event shall PowerLab or its contributors be liable for any direct, indirect, incidental, special, consequential, or exemplary damages (including, without limitation, loss of energy savings, equipment damage, electrical failures, permitting delays, or personal injury) arising from or relating to the use of or reliance on the tools, estimates, or data on this site.
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Some jurisdictions do not allow certain warranty exclusions or liability limitations; in such jurisdictions, liability is limited to the greatest extent permitted by applicable law.
        </p>
      </section>

      <section>
        <h2>7. Updates, References &amp; Engineering Inquiries</h2>
        <p>
          We periodically update our mathematical algorithms, reference lookup values, and default assumptions as applicable engineering standards (such as IEEE, NFPA, ASHRAE, and IEC) or source datasets are revised. For detailed mathematical derivations and source documentation, please consult our <Link href="/methodology">Engineering Methodology</Link>, <Link href="/standards">Standards Matrix</Link>, and <Link href="/sources">Authoritative Sources</Link>.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>
          Last terms update: <time dateTime="2026-09-30">September 30, 2026</time>.
        </p>
      </section>
    </article>
  );
}

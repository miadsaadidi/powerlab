import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering & Technical Planning Disclaimer — PowerLab",
  description:
    "Comprehensive technical disclaimer detailing engineering calculation limitations, jurisdictional code applicability, manufacturer hierarchy, and safety.",
  canonicalPath: "/disclaimer",
});

export default function DisclaimerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PowerLab Technical Planning & Engineering Disclaimer",
    url: `${siteConfig.url}/disclaimer`,
    description:
      "Technical governance, engineering limitations, jurisdictional code enforcement rules, manufacturer documentation hierarchy, and calculation assumptions for PowerLab tools.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
    },
  };

  return (
    <article className="page reading-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem 5rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted, #64748b)", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>/</li>
          <li style={{ color: "var(--ink, #0f172a)", fontWeight: 600 }} aria-current="page">
            Technical Disclaimer
          </li>
        </ol>
      </nav>

      <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color, #cbd5e1)", paddingBottom: "1.75rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            background: "rgba(38, 68, 53, 0.08)",
            border: "1px solid rgba(38, 68, 53, 0.2)",
            color: "var(--brand-strong, #264435)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.85rem",
          }}
        >
          <span>⚖️</span>
          <span>Technical Governance &amp; Engineering Notice</span>
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, color: "var(--ink, #0f172a)", letterSpacing: "-0.02em", margin: "0 0 0.85rem", lineHeight: 1.2 }}>
          Technical &amp; Engineering Disclaimer
        </h1>

        <p style={{ fontSize: "1.08rem", color: "var(--text-muted, #64748b)", maxWidth: "840px", lineHeight: 1.6, margin: 0 }}>
          PowerLab provides transparent, client-side calculation engines, empirical benchmark datasets, and technical guides for educational and preliminary screening purposes. This document outlines the technical governance, jurisdictional applicability, and professional limitations governing all content on this platform.
        </p>
      </header>

      {/* CORE HIGHLIGHT BOX */}
      <div
        style={{
          background: "linear-gradient(145deg, var(--surface, #ffffff) 0%, rgba(55, 94, 75, 0.04) 100%)",
          border: "1px solid var(--border-color, #cbd5e1)",
          borderLeft: "5px solid #0284c7",
          borderRadius: "0.75rem",
          padding: "1.5rem 1.75rem",
          marginBottom: "3rem",
        }}
      >
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--ink, #0f172a)" }}>
          Summary of Key Limitations
        </h2>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--ink, #0f172a)" }}>
          <li>
            <strong>Educational Screening:</strong> Outputs are preliminary estimates based on documented mathematical formulas, user inputs, and reference baselines.
          </li>
          <li>
            <strong>Not Stamped Engineering:</strong> PowerLab does not provide certified electrical engineering drawings, construction documents, or permitting submittals.
          </li>
          <li>
            <strong>Model Codes vs Enforceability:</strong> Model codes (such as NFPA 70 / National Electrical Code) become legally enforceable only when adopted or incorporated by the applicable jurisdiction, including local amendments.
          </li>
          <li>
            <strong>Manufacturer Hierarchy:</strong> Manufacturer manuals, approved ratings, and installation instructions are essential for equipment-specific requirements, while applicable codes, regulations, and professional engineering oversight remain applicable.
          </li>
          <li>
            <strong>Professional Review Required:</strong> Certain electrical installations, system designs, circuit sizing, and utility interconnections may require review, permitting, or approval by a licensed professional or qualified contractor depending on the applicable jurisdiction and project requirements.
          </li>
        </ul>
      </div>

      <div className="disclaimer-content" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* 1. Purpose and Educational/Reference Nature */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            1. Purpose and Educational/Reference Nature
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            PowerLab is an open-access technical research, modeling, and educational resource. The interactive calculators, benchmark datasets, technical whitepapers, and engineering guides are developed to clarify energy system mathematics, illustrate standard engineering methodologies, and assist with preliminary system screening. The platform is not intended to replace formal engineering analysis, architectural drafting, or site-specific construction documentation.
          </p>
        </section>

        {/* 2. Engineering Decision Limitations */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            2. Engineering Decision Limitations
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            No information or computational result presented on PowerLab should be relied upon as the sole basis for real-world engineering, construction, procurement, or operational decisions. Power systems, solar photovoltaic arrays, energy storage systems (BESS), and electric vehicle supply equipment (EVSE) involve complex multi-variable interactions—including fault current levels, thermal dissipation, mechanical structural loads, and utility grid constraints—that require comprehensive site-specific engineering evaluation.
          </p>
        </section>

        {/* 3. Codes, Regulations, and Jurisdictional Requirements */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            3. Codes, Regulations, and Jurisdictional Requirements
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Electrical, building, and fire regulations vary substantially across states, provinces, municipalities, and local Authorities Having Jurisdiction (AHJ).
          </p>
          <div style={{ background: "var(--surface-subtle, #f8fafc)", borderLeft: "4px solid #f59e0b", padding: "0.85rem 1.25rem", margin: "1rem 0", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <strong>Jurisdictional Enforcement Principle:</strong> Model codes become legally enforceable when adopted or incorporated by the applicable jurisdiction, including applicable local amendments. References on PowerLab to national model codes (e.g., NFPA 70 / NEC, NFPA 855, International Building Code) reflect published technical provisions that may not yet be adopted or may be amended by your specific local jurisdiction.
          </div>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Users must verify the specific code edition currently adopted by their local AHJ, any regional administrative amendments, and local utility interconnection rules before finalizing any design or submitting permit applications.
          </p>
        </section>

        {/* 4. Standards and Consensus Publications */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            4. Standards and Consensus Publications
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            PowerLab references consensus engineering standards and technical publications developed by organizations such as IEEE, NFPA, UL, IEC, SAE, NEMA, ASHRAE, and AHRI. Standards are applicable where adopted or incorporated by the relevant jurisdiction or specified by project contracts. Standards and recommended practices do not automatically possess statutory force of law unless formally adopted by a governmental authority having jurisdiction.
          </p>
        </section>

        {/* 5. Manufacturer Documentation and Hierarchy */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            5. Manufacturer Documentation and Technical Hierarchy
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Component specifications, internal terminal ratings, charge voltage curves, temperature coefficients, inverter efficiencies, and overcurrent protection requirements differ across equipment models.
          </p>
          <div style={{ background: "var(--surface-subtle, #f8fafc)", borderLeft: "4px solid #10b981", padding: "0.85rem 1.25rem", margin: "1rem 0", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <strong>Documentation Hierarchy:</strong> Manufacturer manuals, installation instructions, approved ratings, submittals, and equipment-specific documentation are essential for equipment-specific requirements, while applicable codes, regulations, adopted standards, and professional engineering requirements remain applicable.
          </div>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Where manufacturer installation instructions impose more restrictive requirements than general code provisions (per NEC 110.3(B)), the listed manufacturer instructions must be followed. Conversely, manufacturer recommendations cannot authorize deviations from mandatory safety provisions of adopted local codes without explicit AHJ approval.
          </p>
        </section>

        {/* 6. Professional Engineer and Design Responsibility */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            6. Professional Engineer &amp; Design Responsibility
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Use of PowerLab does not establish an engineer-client, consultant-client, or advisory relationship. PowerLab and its authors do not provide professional engineering services. Projects involving construction, permitting, utility interconnection, or physical implementation may require preparation, review, approval, or certification by a licensed Professional Engineer or other qualified professional, depending on the applicable jurisdiction, project scope, and regulatory requirements.
          </p>
        </section>

        {/* 7. Calculator Limitations */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            7. Calculator Limitations &amp; Input Sensitivity
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            PowerLab calculator engines execute client-side in your web browser based on stated mathematical models and user-supplied parameters. Sizing calculators produce numerical results within the boundaries of their simplified models. Results are highly sensitive to user inputs, including ambient temperatures, conductor lengths, power factor, inrush surge multipliers, and continuous load factors. Failure to enter accurate real-world values will yield results that deviate significantly from physical reality.
          </p>
        </section>

        {/* 8. Formula & Mathematical Model Assumptions */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            8. Formula &amp; Mathematical Model Assumptions
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            All mathematical models employ simplifying assumptions to balance computational speed with engineering fidelity. For instance:
          </p>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.25rem", fontSize: "0.92rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            <li>Voltage drop formulas use standard DC resistive or simplified single-phase AC approximations referencing NEC Chapter 9 Table 8, omitting higher-order reactance calculations on short branch runs.</li>
            <li>Solar output modeling incorporates NREL PVWatts V8 hourly simulation assumptions with standardized default loss derates (14.08%) that may differ from site-specific soiling, snow, or micro-inverter topology.</li>
            <li>Battery runtime estimations model continuous discharge rates and inverter tare power, while complex electrochemical temperature degradation requires lab-level impedance modeling.</li>
          </ul>
        </section>

        {/* 9. Dataset Limitations */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            9. Dataset Limitations &amp; Benchmark Scenarios
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            The benchmark datasets published on PowerLab (e.g., PL-DS series) provide standardized reference matrices compiled from published laboratory literature, government databases, and physical models. Benchmark datasets represent standardized reference scenarios and are not certified manufacturer dynamometer or cell test results for any individual commercial product.
          </p>
        </section>

        {/* 10. Research and Reference Limitations */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            10. Research Reports &amp; Technical Whitepapers
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Technical whitepapers and preprints (e.g., PL-TR series) present academic and engineering analyses exploring thermal kinetics, motor inrush dynamics, and Peukert derating. These papers reflect the specific investigative conditions, test envelopes, and mathematical assumptions detailed in each publication and should be cited accordingly in academic literature.
          </p>
        </section>

        {/* 11. Data Currency and Revision Cycles */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            11. Data Currency &amp; Regulatory Revision Cycles
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Engineering standards, electrical codes, and government utility rate benchmarks are revised periodically (e.g., triennial National Electrical Code revision cycles, annual EIA tariff surveys). While PowerLab makes reasonable efforts to maintain current models, older code references or historical utility rates may not reflect the latest published revisions or state amendments.
          </p>
        </section>

        {/* 12. Real-World Conditions and Field Verification */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            12. Real-World Environmental Conditions &amp; Field Verification
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Real-world operating conditions inevitably differ from standardized modeling assumptions. Conductor conduit bundling, rooftop thermal radiant gain, harmonic distortion, utility voltage fluctuations, battery aging, and unmodeled motor starting surges can alter physical system performance. Field measurement, inspection, testing, and verification may be required before commissioning depending on the equipment, installation, applicable codes, utility requirements, and project procedures.
          </p>
        </section>

        {/* 13. Safety-Related Information */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            13. Safety-Related Information &amp; Electrical Hazards
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            Electrical systems carry inherent hazards of electrical shock, electrocution, arc flash, thermal burns, and fire. Working on live panels, installing high-voltage DC photovoltaic strings (up to 600V or 1,000V DC), handling high-current lithium battery banks, or backfeeding electrical panels involves life-threatening hazards. All electrical work must be performed by qualified, licensed electricians following OSHA safety protocols, NFPA 70E electrical safety requirements, and appropriate personal protective equipment (PPE).
          </p>
        </section>

        {/* 14. No Certification or Approval Claims */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            14. No Certification, Endorsement, or Official Approval Claims
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            PowerLab is an independent engineering education platform. Use of standard names, code identifiers, or organizational acronyms (e.g., IEEE, NFPA, NEC, NREL, UL, SAE, ASHRAE, AHRI, DOE, EIA) does not imply endorsement, accreditation, sponsorship, certification, or affiliation by those organizations.
          </p>
        </section>

        {/* 15. Third-Party Sources */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            15. Third-Party Data Sources &amp; External Links
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            PowerLab incorporates data from external third-party sources, including government agencies (NREL, EIA, DOE) and standards publishers. External links are provided for informational and citation convenience. PowerLab does not control, guarantee, or assume liability for the availability, accuracy, or content of external third-party resources.
          </p>
        </section>

        {/* 16. Accuracy and Correction Policy */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            16. Accuracy &amp; Correction Policy
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            While PowerLab strives for mathematical and technical rigor across all open-source calculation engines, errors, omissions, or algorithmic limitations may occur. If you discover a mathematical discrepancy, incorrect code citation, or data inconsistency, please submit a detailed technical issue via our public GitHub repository or contact the engineering team. Discrepancies are reviewed and addressed promptly in accordance with our transparent version control history.
          </p>
        </section>

        {/* 17. Relationship to Terms of Service */}
        <section>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong, #1e293b)", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "0.4rem", marginBottom: "0.85rem" }}>
            17. Relationship to Terms of Service
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink, #1e293b)" }}>
            This Technical Disclaimer supplements and operates in conjunction with the PowerLab <Link href="/terms" style={{ color: "var(--accent, #c65d24)", fontWeight: 600 }}>Terms of Service</Link>. In the event of any conflict between this Technical Disclaimer and the Terms of Service, the Terms of Service remain the governing contractual document. Use of PowerLab constitutes acceptance of all terms, disclaimers, and liability limitations set forth herein and in the governing Terms of Service.
          </p>
        </section>
      </div>

      {/* FOOTER CROSS-LINKS */}
      <footer style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color, #cbd5e1)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.9rem" }}>
          <Link href="/terms" style={{ color: "var(--brand-strong, #1e293b)", fontWeight: 600 }}>
            ⚖️ Terms of Service →
          </Link>
          <Link href="/privacy" style={{ color: "var(--brand-strong, #1e293b)", fontWeight: 600 }}>
            🔒 Privacy Policy →
          </Link>
          <Link href="/standards" style={{ color: "var(--brand-strong, #1e293b)", fontWeight: 600 }}>
            🛡️ Standards Directory →
          </Link>
          <Link href="/sources" style={{ color: "var(--brand-strong, #1e293b)", fontWeight: 600 }}>
            🧪 Sources &amp; Citations →
          </Link>
          <Link href="/methodology" style={{ color: "var(--brand-strong, #1e293b)", fontWeight: 600 }}>
            📐 Calculation Methodology →
          </Link>
        </div>
      </footer>
    </article>
  );
}

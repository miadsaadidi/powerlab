import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS } from "@/data/research-papers";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Engineering Research & Technical Whitepapers",
    description: "Open access technical whitepapers and mathematical models for solar photovoltaics, BESS storage, EVSE infrastructure, and heat pump thermodynamics.",
    canonicalPath: "/research",
    ogImageUrlOverride: `${siteConfig.url}/clean_energy_educational_model.jpg`,
    ogImageAlt: "PowerLab Engineering Research & Technical Whitepapers",
  }),
  other: {
    // Highwire Press / Google Scholar Metadata for Open Educational Research
    "citation_publisher": "PowerLab Open Energy Research",
    "citation_journal_title": "PowerLab Technical Reports and Working Papers Series",
    "citation_language": "en",
    "DC.Publisher": "PowerLab Open Energy Research",
    "DC.Type": "Technical Report",
    "DC.Rights": "Creative Commons Attribution 4.0 International (CC BY 4.0)",
  },
};

export default function ResearchHubPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PowerLab Open Energy Engineering Research & Technical Whitepapers",
    description: "Peer-referenced open access research papers, preprints, and mathematical models for distributed energy resources.",
    url: `${siteConfig.url}/research`,
    publisher: {
      "@type": "Organization",
      name: "PowerLab Open Energy Research",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/powerlab-publisher-logo-1000x1000.png`,
      },
    },
    hasPart: RESEARCH_PAPERS.map((paper) => ({
      "@type": "ScholarlyArticle",
      headline: paper.title,
      name: paper.title,
      description: paper.abstract,
      url: `${siteConfig.url}/research/${paper.slug}`,
      datePublished: paper.datePublished,
      dateModified: paper.dateModified,
      sameAs: paper.doi ? `https://doi.org/${paper.doi}` : undefined,
      author: paper.authors.map((author) => ({
        "@type": "Organization",
        name: author,
      })),
      publisher: {
        "@type": "Organization",
        name: "PowerLab Open Energy Research",
      },
    })),
  };

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Research &amp; Whitepapers</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.75rem", marginBottom: "1.5rem" }}>
        <p className="eyebrow">Academic Preprints &amp; Open Educational Resources (OER)</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", lineHeight: 1.15, margin: "0.25rem 0 0.75rem" }}>
          Engineering Research &amp; Technical Whitepapers
        </h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1.6 }}>
          Peer-referenced technical reports, mathematical modeling frameworks, and continuous-duty electrical engineering preprints published by the PowerLab Open Energy Research Group. All papers are open-access under <strong>Creative Commons CC BY 4.0</strong> and indexed with official DOIs for academic courseware and syllabus citation.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", background: "rgba(2, 132, 199, 0.1)", color: "var(--accent)", border: "1px solid rgba(2, 132, 199, 0.25)" }}>
            🎓 Google Scholar &amp; Harvard Dataverse Indexed
          </span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
            🔓 100% Open Access (CC BY 4.0)
          </span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", background: "rgba(245, 158, 11, 0.1)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.25)" }}>
            📐 Zero Proprietary Black-Boxes
          </span>
        </div>
      </header>

      {/* Roster of Published Papers */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "1.75rem" }}>
        {RESEARCH_PAPERS.map((paper, idx) => (
          <div
            key={paper.id}
            style={{
              padding: "1.75rem",
              borderRadius: "0.95rem",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", background: "var(--surface-subtle, #f1f5f9)", color: "var(--brand-strong)", border: "1px solid var(--line)" }}>
                    {paper.reportNumber}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--muted)" }}>
                    {paper.category}
                  </span>
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  Published {paper.datePublished}
                </span>
              </div>

              <h2 style={{ fontSize: "1.28rem", lineHeight: 1.3, margin: "0.25rem 0 0.75rem", color: "var(--brand-strong)" }}>
                <Link href={`/research/${paper.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {paper.title}
                </Link>
              </h2>

              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink)", marginBottom: "1.25rem" }}>
                {paper.abstract}
              </p>

              {/* Standards Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {paper.standards.map((std, sIdx) => (
                  <span key={sIdx} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "4px", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)", color: "var(--muted)" }}>
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar: PDF, Read Online, DOI, Cite */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                  style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  📄 Download PDF Whitepaper
                </a>
                <Link
                  href={`/research/${paper.slug}`}
                  className="button secondary-button"
                  style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem" }}
                >
                  Read Paper Online →
                </Link>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                {paper.academiaUrl && (
                  <a
                    href={paper.academiaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary-button"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    🎓 Read on Academia
                  </a>
                )}
                {paper.archiveUrl && (
                  <a
                    href={paper.archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary-button"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    🏛️ Archive.org
                  </a>
                )}
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary-button"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    📊 DOI: {paper.doi}
                  </a>
                )}
                <AcademicCitationModal
                  title={paper.title}
                  urlPath={`/research/${paper.slug}`}
                  doi={paper.doi}
                  buttonLabel="🎓 Cite"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Academic Syndication & OER Trust Section */}
      <section style={{ marginTop: "3.5rem", padding: "1.75rem", borderRadius: "0.95rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>
          Academic Courseware Adoption &amp; Syllabus Integration
        </h2>
        <p style={{ color: "var(--ink)", lineHeight: 1.6, fontSize: "0.95rem" }}>
          PowerLab whitepapers and computational models are specifically designed for direct adoption into undergraduate engineering curricula, vocational electrical apprenticeship training (IBEW/NECA/NJATC), and graduate research:
        </p>
        <ul style={{ color: "var(--ink)", lineHeight: 1.65, fontSize: "0.95rem", paddingLeft: "1.25rem", margin: "0.75rem 0 1.25rem" }}>
          <li><strong>Zero Paywalls or Student Logins:</strong> All formulas, source code, and whitepaper datasets are available without student registration or paywall gating.</li>
          <li><strong>Permanent DOI Archiving:</strong> Preprints and benchmark datasets are mirrored across Harvard Dataverse, Zenodo, and the Internet Archive with permanent Digital Object Identifiers.</li>
          <li><strong>Interactive Syllabus Companion:</strong> Every technical report links directly to its companion browser-local simulation engine for class assignments and lab exercises.</li>
        </ul>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/guides" className="button secondary-button">Explore Educational Guides</Link>
          <Link href="/developers" className="button secondary-button">Developer API &amp; TypeScript Engines</Link>
          <Link href="/methodology" className="button secondary-button">Mathematical Methodology</Link>
        </div>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS, BENCHMARK_DATASETS } from "@/data/research-papers";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Engineering Research & Technical Whitepapers",
    description: "Open access technical whitepapers, empirical benchmark datasets, and mathematical models for solar PV, BESS storage, EVSE infrastructure, and heat pumps.",
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

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.75rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.25)", color: "var(--accent)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <span>🎓</span><span>Academic Preprints &amp; Open Educational Resources (OER)</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#10b981", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <span>🛡️</span><span>CC BY 4.0 Open Access</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: "9999px", background: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.25)", color: "#9333ea", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <span>📊</span><span>Figshare &amp; Harvard Dataverse DOIs</span>
          </div>
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", fontWeight: 800, lineHeight: 1.15, margin: "0.25rem 0 0.75rem", color: "var(--brand-strong)" }}>
          Engineering Research &amp; Technical Whitepapers
        </h1>
        <p className="intro" style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1.6, maxWidth: "900px" }}>
          Peer-referenced technical reports, mathematical modeling frameworks, and continuous-duty electrical engineering preprints published by the PowerLab Open Energy Research Group. All papers are open-access under <strong>Creative Commons CC BY 4.0</strong> and registered with persistent DOIs for academic courseware, syllabus citation, and laboratory benchmarking.
        </p>
      </header>

      {/* Roster of Published Papers */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "1.75rem", marginBottom: "3.5rem" }}>
        {RESEARCH_PAPERS.map((paper) => (
          <article
            key={paper.id}
            style={{
              padding: "1.75rem 2rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderTop: "4px solid var(--accent, #0284c7)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Card Metadata Header with Monospace Report Number, DOI Badge, & Date */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
                <span style={{ background: "var(--surface-subtle, #f1f5f9)", color: "var(--accent, #0284c7)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: "4px", border: "1px solid var(--line)", fontFamily: "monospace" }}>
                  {paper.reportNumber}
                </span>

                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(167, 139, 250, 0.12)",
                      color: "#9333ea",
                      border: "1px solid rgba(167, 139, 250, 0.3)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                    title={`View official DataCite DOI: ${paper.doi}`}
                  >
                    <span>DOI:</span>
                    <span>{paper.doi}</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}

                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)" }}>
                  {paper.category}
                </span>

                <span style={{ fontSize: "0.78rem", color: "var(--muted)", marginLeft: "auto" }}>
                  {paper.datePublished}
                </span>
              </div>

              <h2 style={{ fontSize: "1.32rem", fontWeight: 700, lineHeight: 1.35, margin: "0.25rem 0 0.75rem", color: "var(--brand-strong)" }}>
                <Link href={`/research/${paper.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {paper.title}
                </Link>
              </h2>

              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink)", marginBottom: "1.25rem" }}>
                {paper.abstract}
              </p>

              {/* Standards Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                {paper.standards.map((std, sIdx) => (
                  <span key={sIdx} style={{ fontSize: "0.74rem", padding: "2px 8px", borderRadius: "4px", background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)", color: "var(--muted)" }}>
                    🏛️ {std}
                  </span>
                ))}
              </div>
            </div>

            {/* HVACLogic-Style Action Bar: Read Online, Download PDF, Academia, Data Repositories */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
              <Link
                href={`/research/${paper.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#0284c7",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  padding: "0.55rem 1.15rem",
                  borderRadius: "0.45rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 4px rgba(2, 132, 199, 0.3)",
                  minHeight: "40px",
                }}
              >
                Read Paper Online →
              </Link>

              <a
                href={paper.pdfUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--line)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0.55rem 1.15rem",
                  borderRadius: "0.45rem",
                  textDecoration: "none",
                  minHeight: "40px",
                }}
              >
                <span>📄</span>
                <span>Download PDF</span>
              </a>

              {paper.academiaUrl && (
                <a
                  href={paper.academiaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(185, 28, 28, 0.08)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "0.45rem",
                    textDecoration: "none",
                    minHeight: "40px",
                  }}
                  title="Read Preprint on Academia.edu"
                >
                  <span>🎓</span>
                  <span>Academia.edu</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>↗</span>
                </a>
              )}

              {paper.doi && (
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(14, 165, 233, 0.08)",
                    color: "var(--accent, #0284c7)",
                    border: "1px solid rgba(2, 132, 199, 0.25)",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "0.45rem",
                    textDecoration: "none",
                    minHeight: "40px",
                  }}
                  title={`View Replication Dataset on ${paper.datasetRepository || "Figshare"}`}
                >
                  <span>📊</span>
                  <span>{paper.datasetRepository || "Figshare"}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>↗</span>
                </a>
              )}

              {paper.datasetStatus === "accession_pending" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    padding: "0.5rem 0.8rem",
                    borderRadius: "0.45rem",
                    border: "1px solid var(--line)",
                    background: "var(--surface-subtle, #f8fafc)",
                    color: "var(--muted)",
                    minHeight: "40px",
                  }}
                  title="Replication dataset deposit registered with repository. Awaiting public accession minting."
                >
                  <span>🔒</span>
                  <span>{paper.datasetRepository || "Dataverse"} Accession Pending</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Dedicated Section: Open Benchmark Datasets & Replication Repositories */}
      <section style={{ marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "1.35rem" }}>📊</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--brand-strong)", letterSpacing: "-0.01em", margin: 0 }}>
            Open Benchmark Datasets &amp; Replication Repositories
          </h2>
        </div>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", maxWidth: "850px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Verified empirical tabular datasets and reproducible calculation packages registered with persistent DataCite DOIs across Harvard Dataverse and Figshare. Freely accessible for university electrical engineering courseware, lab validation, and DER infrastructure modeling.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "1.5rem" }}>
          {BENCHMARK_DATASETS.map((ds) => (
            <div
              key={ds.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "4px solid #10b981",
                borderRadius: "0.75rem",
                padding: "1.5rem 1.75rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "4px", textTransform: "uppercase" }}>
                    {ds.repository}
                  </span>
                  {ds.doi && (
                    <a
                      href={`https://doi.org/${ds.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--surface-subtle, #f1f5f9)",
                        color: "var(--ink-secondary)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                        border: "1px solid var(--line)",
                        fontFamily: "monospace",
                        textDecoration: "none",
                      }}
                    >
                      DOI: {ds.doi}
                    </a>
                  )}
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)", marginLeft: "auto" }}>
                    {ds.recordCount} &bull; {ds.format}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "0.45rem", lineHeight: 1.35 }}>
                  <Link href={`/research/${ds.paperSlug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {ds.title}
                  </Link>
                </h3>

                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "0.85rem" }}>
                  {ds.subtitle}
                </p>

                <p style={{ fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
                  {ds.description}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", paddingTop: "0.85rem", borderTop: "1px solid var(--line)" }}>
                {ds.status === "published" ? (
                  <>
                    <a
                      href={ds.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "#10b981",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.4rem",
                        textDecoration: "none",
                        minHeight: "38px",
                      }}
                    >
                      <span>View Repository on {ds.repository} →</span>
                    </a>
                    <a
                      href={ds.downloadUrl || ds.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "transparent",
                        color: "var(--ink)",
                        border: "1px solid var(--line)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.4rem",
                        textDecoration: "none",
                        minHeight: "38px",
                      }}
                    >
                      <span>📥 Download {ds.format.split("/")[0].trim()}</span>
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/research/${ds.paperSlug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "var(--surface-subtle, #f1f5f9)",
                        color: "var(--ink)",
                        border: "1px solid var(--line)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.4rem",
                        textDecoration: "none",
                        minHeight: "38px",
                      }}
                    >
                      <span>Read Paper &amp; Mathematical Model →</span>
                    </Link>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--muted)",
                        padding: "0.45rem 0.75rem",
                        borderRadius: "0.4rem",
                        border: "1px dashed var(--line)",
                        minHeight: "38px",
                      }}
                    >
                      <span>🔒 Accession Pending ({ds.repository})</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Syndication & OER Trust Section */}
      <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>
          Academic Courseware Adoption &amp; Syllabus Integration
        </h2>
        <p style={{ color: "var(--ink)", lineHeight: 1.6, fontSize: "0.95rem" }}>
          PowerLab whitepapers and computational models are specifically designed for direct adoption into undergraduate engineering curricula, vocational electrical apprenticeship training (IBEW/NECA/NJATC), and graduate research:
        </p>
        <ul style={{ color: "var(--ink)", lineHeight: 1.65, fontSize: "0.95rem", paddingLeft: "1.25rem", margin: "0.75rem 0 1.25rem" }}>
          <li><strong>Zero Paywalls or Student Logins:</strong> All formulas, source code, and whitepaper datasets are available without student registration or paywall gating.</li>
          <li><strong>Permanent DOI Archiving:</strong> Preprints and benchmark datasets are mirrored across Harvard Dataverse and Figshare with permanent Digital Object Identifiers.</li>
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

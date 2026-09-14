import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS, BENCHMARK_DATASETS, STUDENT_LAB_EXERCISES } from "@/data/research-papers";
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

// Helper: Strip bulky parenthetical descriptions from standard identifiers
const formatStandard = (std: string) => std.replace(/\s*\([^)]*\)/g, "").trim();

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
    <article className="page reading-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Research &amp; Whitepapers</span>
      </nav>

      {/* Header Banner */}
      <header
        className="calculator-header"
        style={{
          border: "1px solid var(--line)",
          borderRadius: "0.75rem",
          background: "rgb(255 253 249 / 0.85)",
          padding: "1.5rem 1.75rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.65rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.25)", color: "var(--accent)", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>🎓</span><span>Academic Preprints &amp; OER Lab</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#10b981", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>🛡️</span><span>CC BY 4.0 Open Access</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.25)", color: "#9333ea", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>📊</span><span>DataCite &amp; Hugging Face DOIs</span>
          </div>
        </div>

        <h1 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)", fontWeight: 800, lineHeight: 1.2, margin: "0.2rem 0 0.5rem", color: "var(--brand-strong)" }}>
          Engineering Research &amp; Technical Whitepapers
        </h1>
        <p className="intro" style={{ margin: 0, fontSize: "0.96rem", color: "var(--ink)", lineHeight: 1.55, maxWidth: "980px" }}>
          Peer-referenced technical reports, mathematical modeling frameworks, and continuous-duty electrical engineering preprints published by the PowerLab Open Energy Research Group. Open-access under <strong>Creative Commons CC BY 4.0</strong> and registered with persistent DOIs for academic courseware, syllabus citation, and laboratory benchmarking.
        </p>
      </header>

      {/* Section 1: 3-Column Responsive Grid of Technical Whitepapers */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📑</span>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--brand-strong)", margin: 0 }}>
            Technical Reports &amp; Whitepapers
          </h2>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "var(--surface-subtle, #f1f5f9)", color: "var(--muted)", padding: "0.15rem 0.5rem", borderRadius: "9999px", border: "1px solid var(--line)", marginLeft: "0.25rem" }}>
            {RESEARCH_PAPERS.length} Papers
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {RESEARCH_PAPERS.map((paper) => (
            <article
              key={paper.id}
              style={{
                padding: "1.25rem",
                borderRadius: "0.65rem",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #0284c7",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Header: Monospace Report ID + Category + Date */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.65rem" }}>
                  <span style={{ background: "var(--surface-subtle, #f1f5f9)", color: "#0284c7", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px", border: "1px solid var(--line)", fontFamily: "monospace" }}>
                    {paper.reportNumber}
                  </span>
                  <span style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--muted)" }}>
                    {paper.category}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginLeft: "auto" }}>
                    {paper.datePublished}
                  </span>
                </div>

                {/* Clamped Paper Title (2 Lines) */}
                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    margin: "0 0 0.5rem",
                    color: "var(--brand-strong)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.7rem",
                  }}
                >
                  <Link href={`/research/${paper.slug}`} style={{ textDecoration: "none", color: "inherit" }} title={paper.title}>
                    {paper.title}
                  </Link>
                </h3>

                {/* Clamped Abstract (3 Lines) */}
                <p
                  style={{
                    fontSize: "0.84rem",
                    lineHeight: 1.45,
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.65rem",
                  }}
                  title={paper.abstract}
                >
                  {paper.abstract}
                </p>

                {/* Standards Micro-Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.85rem" }}>
                  {paper.standards.slice(0, 3).map((std, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: "0.67rem",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "4px",
                        background: "var(--surface-subtle, #f8fafc)",
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                        whiteSpace: "nowrap",
                      }}
                      title={std}
                    >
                      🏛️ {formatStandard(std)}
                    </span>
                  ))}
                  {paper.standards.length > 3 && (
                    <span
                      style={{
                        fontSize: "0.67rem",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "4px",
                        background: "var(--surface-subtle, #f8fafc)",
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +{paper.standards.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Micro Action Button Bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.4rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <Link
                  href={`/research/${paper.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "#0284c7",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.32rem 0.65rem",
                    borderRadius: "0.35rem",
                    textDecoration: "none",
                  }}
                >
                  Read →
                </Link>

                <a
                  href={paper.pdfUrl}
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "rgba(239, 68, 68, 0.08)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.32rem 0.65rem",
                    borderRadius: "0.35rem",
                    textDecoration: "none",
                  }}
                >
                  📥 PDF
                </a>

                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(147, 51, 234, 0.08)",
                      color: "#9333ea",
                      border: "1px solid rgba(147, 51, 234, 0.25)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title={`DataCite DOI: ${paper.doi}`}
                  >
                    <span>📊 Figshare</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}

                {paper.academiaUrl && (
                  <a
                    href={paper.academiaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(185, 28, 28, 0.08)",
                      color: "#dc2626",
                      border: "1px solid rgba(220, 38, 38, 0.25)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title="Read on Academia.edu"
                  >
                    <span>🎓 Academia</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Student Laboratory Exercises & Open Courseware */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🔬</span>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--brand-strong)", margin: 0 }}>
            Student Laboratory Exercises &amp; Courseware
          </h2>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "rgba(139, 92, 246, 0.1)", color: "#7c3aed", padding: "0.15rem 0.5rem", borderRadius: "9999px", border: "1px solid rgba(139, 92, 246, 0.25)", marginLeft: "0.25rem" }}>
            {STUDENT_LAB_EXERCISES.length} Modules
          </span>
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "900px", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          Turnkey computational laboratory exercises and problem sets designed for undergraduate electrical engineering courses and vocational apprenticeships.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {STUDENT_LAB_EXERCISES.map((lab) => (
            <div
              key={lab.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #8b5cf6",
                borderRadius: "0.65rem",
                padding: "1.25rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.65rem" }}>
                  <span style={{ background: "rgba(139, 92, 246, 0.1)", color: "#7c3aed", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px", border: "1px solid rgba(139, 92, 246, 0.25)", fontFamily: "monospace" }}>
                    {lab.labNumber}
                  </span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)" }}>
                    {lab.targetCourse}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600, marginLeft: "auto", background: "rgba(16, 185, 129, 0.08)", padding: "0.15rem 0.45rem", borderRadius: "4px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                    {lab.level}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    margin: "0 0 0.35rem",
                    color: "var(--brand-strong)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.7rem",
                  }}
                >
                  {lab.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.84rem",
                    lineHeight: 1.45,
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.65rem",
                  }}
                  title={lab.description}
                >
                  {lab.description}
                </p>

                {/* Standards Micro-Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.85rem" }}>
                  {lab.standards.map((std, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: "0.67rem",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "4px",
                        background: "var(--surface-subtle, #f8fafc)",
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📐 {formatStandard(std)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lab Actions */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.4rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <Link
                  href={lab.calculatorRoute}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "#7c3aed",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.32rem 0.65rem",
                    borderRadius: "0.35rem",
                    textDecoration: "none",
                  }}
                >
                  Launch Model →
                </Link>

                {lab.pdfUrl && (
                  <a
                    href={lab.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(239, 68, 68, 0.08)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                  >
                    📥 PDF
                  </a>
                )}

                {lab.academiaUrl && (
                  <a
                    href={lab.academiaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(185, 28, 28, 0.08)",
                      color: "#dc2626",
                      border: "1px solid rgba(220, 38, 38, 0.25)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title="Read on Academia.edu"
                  >
                    <span>🎓 Academia</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}

                {lab.archiveUrl && (
                  <a
                    href={lab.archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(100, 116, 139, 0.08)",
                      color: "#475569",
                      border: "1px solid rgba(100, 116, 139, 0.25)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title="View on Internet Archive"
                  >
                    <span>🏛️ Archive</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Open Benchmark Datasets Grid */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📊</span>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--brand-strong)", margin: 0 }}>
            Open Benchmark Datasets &amp; Hugging Face Repositories
          </h2>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "0.15rem 0.5rem", borderRadius: "9999px", border: "1px solid rgba(16, 185, 129, 0.25)", marginLeft: "0.25rem" }}>
            {BENCHMARK_DATASETS.length} Repositories
          </span>
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "900px", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          Empirical matrices and reproducible packages registered with persistent DataCite DOIs across Figshare and Hugging Face.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {BENCHMARK_DATASETS.map((ds) => (
            <div
              key={ds.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #10b981",
                borderRadius: "0.65rem",
                padding: "1.25rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.65rem" }}>
                  <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px", textTransform: "uppercase" }}>
                    📊 {ds.repository}
                  </span>
                  {ds.doi && (
                    <a
                      href={`https://doi.org/${ds.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--surface-subtle, #f1f5f9)",
                        color: "var(--ink-secondary)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        border: "1px solid var(--line)",
                        fontFamily: "monospace",
                        textDecoration: "none",
                      }}
                    >
                      DOI: {ds.doi}
                    </a>
                  )}
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginLeft: "auto" }}>
                    {ds.recordCount}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    color: "var(--brand-strong)",
                    marginBottom: "0.35rem",
                    lineHeight: 1.35,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.7rem",
                  }}
                >
                  <Link href={`/research/${ds.paperSlug}`} style={{ color: "inherit", textDecoration: "none" }} title={ds.title}>
                    {ds.title}
                  </Link>
                </h3>

                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--ink)",
                    lineHeight: 1.45,
                    marginBottom: "0.75rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.65rem",
                  }}
                  title={ds.description}
                >
                  {ds.description}
                </p>
              </div>

              {/* Dataset Action Bar: Dedicated Figshare & Hugging Face Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.4rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <Link
                  href={`/research/${ds.paperSlug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "#0284c7",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.32rem 0.65rem",
                    borderRadius: "0.35rem",
                    textDecoration: "none",
                  }}
                >
                  Read →
                </Link>

                {ds.doi && (
                  <a
                    href={`https://doi.org/${ds.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(147, 51, 234, 0.08)",
                      color: "#9333ea",
                      border: "1px solid rgba(147, 51, 234, 0.25)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title={`DataCite Figshare DOI: ${ds.doi}`}
                  >
                    <span>📊 Figshare</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}

                {(ds.huggingFaceDoi || ds.huggingFaceUrl) && (
                  <a
                    href={ds.huggingFaceDoi ? `https://doi.org/${ds.huggingFaceDoi}` : ds.huggingFaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(234, 179, 8, 0.08)",
                      color: "#b45309",
                      border: "1px solid rgba(234, 179, 8, 0.3)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.35rem",
                      textDecoration: "none",
                    }}
                    title="Open on Hugging Face"
                  >
                    <span>🤗 Hugging Face</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Syndication & OER Trust Section */}
      <section
        style={{
          padding: "1.5rem",
          borderRadius: "0.75rem",
          background: "var(--surface)",
          border: "1px solid var(--line)",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: "1.25rem", color: "var(--brand-strong)", marginBottom: "0.5rem" }}>
          Academic Courseware Adoption &amp; Syllabus Integration
        </h2>
        <p style={{ color: "var(--ink)", lineHeight: 1.55, fontSize: "0.9rem", margin: "0 0 0.75rem" }}>
          PowerLab whitepapers and computational models are specifically designed for direct adoption into undergraduate engineering curricula, vocational electrical apprenticeship training (IBEW/NECA/NJATC), and graduate research:
        </p>
        <ul style={{ color: "var(--ink)", lineHeight: 1.55, fontSize: "0.88rem", paddingLeft: "1.25rem", margin: "0.5rem 0 1rem" }}>
          <li><strong>Zero Paywalls or Student Logins:</strong> All formulas, source code, and whitepaper datasets are accessible without registration or paywall gating.</li>
          <li><strong>Permanent DOI Archiving:</strong> Preprints and benchmark datasets are mirrored across Harvard Dataverse, Figshare, and Hugging Face with permanent Digital Object Identifiers.</li>
          <li><strong>Interactive Syllabus Companion:</strong> Every technical report links directly to its companion browser-local simulation engine for class assignments and lab exercises.</li>
        </ul>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link href="/guides" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem" }}>Explore Educational Guides</Link>
          <Link href="/developers" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem" }}>Developer API &amp; TypeScript Engines</Link>
          <Link href="/methodology" className="button secondary-button" style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem" }}>Mathematical Methodology</Link>
        </div>
      </section>
    </article>
  );
}

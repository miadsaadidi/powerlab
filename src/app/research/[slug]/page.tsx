import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS, type ResearchPaper } from "@/data/research-papers";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESEARCH_PAPERS.map((paper) => ({
    slug: paper.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = RESEARCH_PAPERS.find((p) => p.slug === slug);

  if (!paper) {
    return buildPageMetadata({
      title: "Research Paper Not Found",
      description: "The requested technical whitepaper does not exist.",
      canonicalPath: "/research",
    });
  }

  const baseMeta = buildPageMetadata({
    title: `${paper.shortTitle} — Technical Report`,
    description: paper.abstract,
    canonicalPath: `/research/${paper.slug}`,
    category: paper.categorySlug,
    isArticle: true,
  });

  return {
    ...baseMeta,
    other: {
      // Highwire Press Google Scholar indexing tags
      "citation_title": paper.title,
      "citation_author": paper.authors[0] || "PowerLab Clean Energy Engineering Group",
      "citation_publication_date": paper.datePublished.replace(/-/g, "/"),
      "citation_pdf_url": `${siteConfig.url}${paper.pdfUrl}`,
      "citation_technical_report_number": paper.reportNumber,
      "citation_publisher": "PowerLab Open Energy Research",
      ...(paper.doi ? { "citation_doi": paper.doi } : {}),
      "DC.Title": paper.title,
      "DC.Creator": paper.authors[0] || "PowerLab Clean Energy Engineering Group",
      "DC.Date": paper.datePublished,
      "DC.Type": "Technical Report",
      "DC.Identifier": paper.doi ? `doi:${paper.doi}` : `${siteConfig.url}/research/${paper.slug}`,
    },
  };
}

export default async function ResearchPaperPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = RESEARCH_PAPERS.find((p) => p.slug === slug);

  if (!paper) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
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
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/powerlab-publisher-logo-1000x1000.png`,
      },
    },
    about: paper.keywords.map((kw) => ({
      "@type": "Thing",
      name: kw,
    })),
  };

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/research">Research</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{paper.reportNumber}</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.75rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", background: "var(--surface-subtle, #f1f5f9)", color: "var(--brand-strong)", border: "1px solid var(--line)" }}>
            {paper.reportNumber}
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
            Published {paper.datePublished} &bull; Open Access CC BY 4.0
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", lineHeight: 1.2, margin: "0.5rem 0 0.75rem" }}>
          {paper.title}
        </h1>

        <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: "0 0 1.25rem" }}>
          By <strong>{paper.authors.join(", ")}</strong> &bull; {paper.institution}
        </p>

        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{ fontSize: "0.9rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            📄 Download Official PDF Whitepaper
          </a>
          <AcademicCitationModal
            title={paper.title}
            urlPath={`/research/${paper.slug}`}
            doi={paper.doi}
            buttonLabel="🎓 Export Citation"
          />
          {paper.doi && (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary-button"
              style={{ fontSize: "0.85rem", padding: "0.5rem 0.85rem" }}
            >
              DOI: {paper.doi}
            </a>
          )}
        </div>
      </header>

      {/* Section 1: Abstract */}
      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--brand-strong)", borderBottom: "1px solid var(--line)", paddingBottom: "0.35rem" }}>
          Abstract
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink)" }}>
          {paper.abstract}
        </p>
      </section>

      {/* Section 2: Key Engineering Findings */}
      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--brand-strong)", borderBottom: "1px solid var(--line)", paddingBottom: "0.35rem" }}>
          Key Technical Findings &amp; Code Rule Impacts
        </h2>
        <ul style={{ lineHeight: 1.7, color: "var(--ink)", paddingLeft: "1.25rem", margin: "1rem 0" }}>
          {paper.keyFindings.map((finding, idx) => (
            <li key={idx} style={{ marginBottom: "0.75rem" }}>
              {finding}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3: Core Mathematical Formulas */}
      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--brand-strong)", borderBottom: "1px solid var(--line)", paddingBottom: "0.35rem" }}>
          Governing Mathematical Equations
        </h2>
        <div style={{ display: "grid", gap: "1rem", margin: "1rem 0" }}>
          {paper.equations.map((eq, idx) => (
            <div key={idx} style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
                {eq.name}
              </h3>
              <pre className="math-block" style={{ padding: "0.75rem", background: "var(--surface-subtle, #f8fafc)", borderRadius: "0.5rem", border: "1px solid var(--line)", overflowX: "auto", margin: "0.5rem 0" }}>
                <code>{eq.latex}</code>
              </pre>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)" }}>
                {eq.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Engineering Standards Enforced */}
      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--brand-strong)", borderBottom: "1px solid var(--line)", paddingBottom: "0.35rem" }}>
          Referenced Electrical &amp; Engineering Standards
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
          {paper.standards.map((std, idx) => (
            <div key={idx} style={{ padding: "0.6rem 1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", fontSize: "0.9rem", color: "var(--ink)", fontWeight: 600 }}>
              📌 {std}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Companion Planning Tools & Guides */}
      <section style={{ margin: "2.5rem 0", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.25rem", color: "var(--brand-strong)" }}>
          Companion Calculation Engines &amp; Educational Guides
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Interact with the live, browser-local simulation models derived from this technical report:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {paper.relatedCalculators.map((calc, idx) => (
            <Link key={idx} href={calc.route} className="button secondary-button" style={{ textAlign: "center" }}>
              ⚡ {calc.name}
            </Link>
          ))}
          {paper.relatedGuides.map((guide, idx) => (
            <Link key={idx} href={guide.route} className="button secondary-button" style={{ textAlign: "center" }}>
              📖 {guide.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Section 6: Full Citable Formats */}
      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--brand-strong)", borderBottom: "1px solid var(--line)", paddingBottom: "0.35rem" }}>
          Academic Citations
        </h2>
        
        <div style={{ margin: "1rem 0" }}>
          <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.9rem", color: "var(--muted)" }}>APA Format:</h4>
          <pre style={{ padding: "0.75rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", fontSize: "0.85rem", overflowX: "auto", whiteSpace: "pre-wrap" }}>
            {paper.apaCitation}
          </pre>
        </div>

        <div style={{ margin: "1rem 0" }}>
          <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.9rem", color: "var(--muted)" }}>BibTeX Entry:</h4>
          <pre style={{ padding: "0.75rem", background: "var(--surface)", borderRadius: "0.5rem", border: "1px solid var(--line)", fontSize: "0.82rem", overflowX: "auto" }}>
            {paper.bibtex}
          </pre>
        </div>
      </section>
    </article>
  );
}

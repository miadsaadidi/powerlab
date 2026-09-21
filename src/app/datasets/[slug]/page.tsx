import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { BENCHMARK_DATASETS } from "@/data/research-papers";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BENCHMARK_DATASETS.map((ds) => ({
    slug: ds.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ds = BENCHMARK_DATASETS.find((d) => d.slug === slug);

  if (!ds) {
    return buildPageMetadata({
      title: "Dataset Not Found",
      description: "The requested benchmark dataset does not exist.",
      canonicalPath: "/datasets",
    });
  }

  const baseMeta = buildPageMetadata({
    title: ds.shortTitle || ds.title,
    description: ds.metaDescription || ds.description,
    canonicalPath: `/datasets/${ds.slug}`,
    category: ds.categorySlug,
    isArticle: true,
  });

  return {
    ...baseMeta,
    other: {
      "DC.Title": ds.title,
      "DC.Creator": ds.creator,
      "DC.Date": ds.datePublished,
      "DC.Type": "Dataset",
      "DC.Identifier": ds.doi ? `doi:${ds.doi}` : `${siteConfig.url}/datasets/${ds.slug}`,
      "DC.Publisher": "PowerLab Open Energy Research",
      "DC.Rights": ds.license,
      ...(ds.doi ? { "citation_doi": ds.doi } : {}),
      "citation_title": ds.title,
      "citation_author": ds.creator,
      "citation_publication_date": ds.datePublished.replace(/-/g, "/"),
      "citation_publisher": "PowerLab Open Energy Research",
    },
  };
}

export default async function DatasetDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ds = BENCHMARK_DATASETS.find((d) => d.slug === slug);

  if (!ds) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: ds.title,
    description: ds.abstract || ds.description,
    url: `${siteConfig.url}/datasets/${ds.slug}`,
    identifier: ds.doi ? `https://doi.org/${ds.doi}` : `${siteConfig.url}/datasets/${ds.slug}`,
    version: ds.version,
    datePublished: ds.datePublished,
    dateModified: ds.dateModified,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: ds.creator,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "PowerLab Open Energy Research",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/powerlab-publisher-logo-1000x1000.png`,
      },
    },
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: "PowerLab Open Benchmark Data Repository",
      url: `${siteConfig.url}/datasets`,
    },
    keywords: ds.keywords,
    variableMeasured: ds.variables.map((v) => ({
      "@type": "PropertyValue",
      name: v.name,
      unitText: v.unit,
      description: v.description,
    })),
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: ds.downloadUrl || ds.repositoryUrl,
      },
    ],
    sameAs: [
      ds.doi ? `https://doi.org/${ds.doi}` : null,
      ds.huggingFaceUrl || null,
      ds.repositoryUrl !== ds.downloadUrl ? ds.repositoryUrl : null,
    ].filter(Boolean),
    isAccessibleForFree: true,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Open Datasets",
        item: `${siteConfig.url}/datasets`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ds.shortTitle || ds.title,
        item: `${siteConfig.url}/datasets/${ds.slug}`,
      },
    ],
  };

  return (
    <article className="page reading-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/datasets">Open Datasets</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{ds.shortTitle || ds.title}</span>
      </nav>

      {/* Dataset Header Card */}
      <header
        style={{
          border: "1px solid var(--line)",
          borderRadius: "0.75rem",
          background: "rgb(255 253 249 / 0.9)",
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
          <span style={{ background: "rgba(16, 185, 129, 0.12)", color: "#059669", fontSize: "0.76rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase" }}>
            📊 {ds.category} Dataset
          </span>
          <span style={{ background: "rgba(2, 132, 199, 0.1)", color: "var(--accent)", fontSize: "0.76rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
            Version {ds.version}
          </span>
          <span style={{ background: "rgba(167, 139, 250, 0.12)", color: "#7c3aed", fontSize: "0.76rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
            CC BY 4.0 Open Access
          </span>
          {ds.doi && (
            <span style={{ fontFamily: "monospace", fontSize: "0.76rem", color: "var(--ink-secondary)", background: "var(--surface-subtle, #f1f5f9)", padding: "0.2rem 0.6rem", borderRadius: "9999px", border: "1px solid var(--line)" }}>
              DOI: {ds.doi}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)", fontWeight: 800, lineHeight: 1.25, color: "var(--brand-strong)", margin: "0.2rem 0 0.75rem" }}>
          {ds.title}
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1.55, maxWidth: "980px", margin: "0 0 1.5rem" }}>
          {ds.subtitle}
        </p>

        {/* Dataset Metadata Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.5rem", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>Record Count</span>
            <strong style={{ fontSize: "0.95rem", color: "var(--brand-strong)" }}>{ds.recordCount}</strong>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>File Format &amp; Size</span>
            <strong style={{ fontSize: "0.95rem", color: "var(--brand-strong)" }}>{ds.format} ({ds.fileSize})</strong>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>Published Date</span>
            <strong style={{ fontSize: "0.95rem", color: "var(--brand-strong)" }}>{ds.datePublished}</strong>
          </div>
          <div>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>Primary Repository</span>
            <strong style={{ fontSize: "0.95rem", color: "#059669" }}>{ds.repository}</strong>
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
          {ds.downloadUrl && (
            <a
              href={ds.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#059669",
                color: "#ffffff",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.4rem",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)",
              }}
            >
              📥 Download CSV Dataset (Direct DOI)
            </a>
          )}
          {ds.huggingFaceUrl && (
            <a
              href={ds.huggingFaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--surface)",
                color: "var(--brand-strong)",
                border: "1px solid var(--line)",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.4rem",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              🤗 Hugging Face Repository ↗
            </a>
          )}
          {ds.relatedWhitepaper && (
            <Link
              href={ds.relatedWhitepaper.route}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(2, 132, 199, 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(2, 132, 199, 0.3)",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.4rem",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              📄 Read Whitepaper ({ds.relatedWhitepaper.reportNumber}) →
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
        
        {/* Abstract & Scope */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", marginTop: 0, marginBottom: "0.75rem" }}>
            1. Abstract &amp; Dataset Scope
          </h2>
          <p style={{ fontSize: "0.96rem", color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
            {ds.abstract}
          </p>
        </section>

        {/* Methodology */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", marginTop: 0, marginBottom: "0.75rem" }}>
            2. Experimental &amp; Simulation Methodology
          </h2>
          <p style={{ fontSize: "0.96rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            {ds.methodology}
          </p>
          <div style={{ background: "var(--surface-subtle, #f8fafc)", borderLeft: "4px solid var(--accent)", padding: "0.85rem 1.25rem", fontSize: "0.88rem", color: "var(--ink)" }}>
            <strong>Reproducibility Standard:</strong> All values are generated deterministically in compliance with applicable standards (NEC, IEEE, AHRI, NREL, ISO) and can be audited directly through our TypeScript engines.
          </div>
        </section>

        {/* Data Dictionary & Variables */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", marginTop: 0, marginBottom: "0.75rem" }}>
            3. Data Dictionary &amp; Variable Definitions
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--surface-subtle, #f1f5f9)", borderBottom: "2px solid var(--line)" }}>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Variable Name</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Symbol</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Unit</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Type</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Description</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--brand-strong)", fontWeight: 700 }}>Example</th>
                </tr>
              </thead>
              <tbody>
                {ds.variables.map((v, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--brand-strong)" }}>{v.name}</td>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "var(--accent)" }}>{v.symbol}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>{v.unit}</td>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--muted)" }}>{v.type}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink)", lineHeight: 1.4 }}>{v.description}</td>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontWeight: 600 }}>{String(v.example)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sample Data Preview Table */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", margin: 0 }}>
              4. Sample Data Records Preview
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              Displaying 6 representative rows (Full dataset contains {ds.recordCount})
            </span>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--surface-subtle, #f1f5f9)", borderBottom: "2px solid var(--line)" }}>
                  {Object.keys(ds.sampleData[0] || {}).map((col, idx) => (
                    <th key={idx} style={{ padding: "0.65rem 0.85rem", color: "var(--brand-strong)", fontWeight: 700, textTransform: "capitalize", fontFamily: "monospace" }}>
                      {col.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ds.sampleData.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: "1px solid var(--line)" }}>
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} style={{ padding: "0.65rem 0.85rem", fontFamily: typeof val === "number" ? "monospace" : "inherit", color: "var(--ink)" }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Citation Block */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", marginTop: 0, marginBottom: "0.75rem" }}>
            5. Dataset Citation (BibTeX / APA / IEEE)
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1rem" }}>
            When referencing this dataset in academic preprints, technical reports, or computational tooling, please cite using the standard DataCite DOI reference below:
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "0.35rem" }}>APA Style</h3>
            <div style={{ background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)", borderRadius: "0.35rem", padding: "0.75rem 1rem", fontSize: "0.85rem", fontFamily: "sans-serif", color: "var(--ink)", lineHeight: 1.5 }}>
              {ds.apaCitation}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "0.35rem" }}>IEEE Style</h3>
            <div style={{ background: "var(--surface-subtle, #f8fafc)", border: "1px solid var(--line)", borderRadius: "0.35rem", padding: "0.75rem 1rem", fontSize: "0.85rem", fontFamily: "sans-serif", color: "var(--ink)", lineHeight: 1.5 }}>
              {ds.ieeeCitation}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "0.35rem" }}>BibTeX Record</h3>
            <pre style={{ background: "#0f172a", color: "#f8fafc", borderRadius: "0.35rem", padding: "1rem", fontSize: "0.82rem", overflowX: "auto", margin: 0 }}>
              <code>{ds.bibtex}</code>
            </pre>
          </div>
        </section>

        {/* Connected Calculators & Internal Linking */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--brand-strong)", marginTop: 0, marginBottom: "0.75rem" }}>
            6. Connected Calculators &amp; Research Whitepapers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {ds.relatedWhitepaper && (
              <Link
                href={ds.relatedWhitepaper.route}
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-subtle, #f8fafc)",
                  border: "1px solid var(--line)",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Companion Whitepaper ({ds.relatedWhitepaper.reportNumber})
                </div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem", lineHeight: 1.35 }}>
                  {ds.relatedWhitepaper.title}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 600 }}>
                  Read Full Technical Report →
                </span>
              </Link>
            )}

            {ds.relatedCalculators.map((calc, cIdx) => (
              <Link
                key={cIdx}
                href={calc.route}
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-subtle, #f8fafc)",
                  border: "1px solid var(--line)",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Interactive Calculation Engine
                </div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem" }}>
                  {calc.name}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 600 }}>
                  Open Computational Tool →
                </span>
              </Link>
            ))}

            {ds.relatedGuides?.map((guide, gIdx) => (
              <Link
                key={gIdx}
                href={guide.route}
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-subtle, #f8fafc)",
                  border: "1px solid var(--line)",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d97706", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Authoritative Engineering Guide
                </div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem" }}>
                  {guide.name}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#d97706", fontWeight: 600 }}>
                  Read Technical Guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}

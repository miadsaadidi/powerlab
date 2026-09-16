import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { BENCHMARK_DATASETS } from "@/data/research-papers";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Open Benchmark Datasets & Engineering Data Repository",
    description: "Open access benchmark scientific datasets, empirical matrices, and reproducible data packages for solar PV, BESS storage, EVSE infrastructure, and heat pumps.",
    canonicalPath: "/datasets",
    ogImageUrlOverride: `${siteConfig.url}/clean_energy_educational_model.jpg`,
    ogImageAlt: "PowerLab Open Benchmark Datasets",
  }),
  other: {
    "DC.Publisher": "PowerLab Open Energy Research",
    "DC.Type": "DataCatalog",
    "DC.Rights": "Creative Commons Attribution 4.0 International (CC BY 4.0)",
  },
};

export default function DatasetsIndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    name: "PowerLab Open Energy Benchmark Datasets",
    description: "Open access scientific benchmark datasets and reproducible data packages for clean energy engineering, battery storage, solar resource modeling, EV infrastructure, and heat pumps.",
    url: `${siteConfig.url}/datasets`,
    publisher: {
      "@type": "Organization",
      name: "PowerLab Open Energy Research",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/powerlab-publisher-logo-1000x1000.png`,
      },
    },
    dataset: BENCHMARK_DATASETS.map((ds) => ({
      "@type": "Dataset",
      name: ds.title,
      description: ds.description,
      url: `${siteConfig.url}/datasets/${ds.slug}`,
      identifier: ds.doi ? `https://doi.org/${ds.doi}` : `${siteConfig.url}/datasets/${ds.slug}`,
      license: "https://creativecommons.org/licenses/by/4.0/",
      datePublished: ds.datePublished,
      creator: {
        "@type": "Organization",
        name: ds.creator,
      },
    })),
  };

  return (
    <article className="page reading-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Open Datasets</span>
      </nav>

      {/* Header Banner */}
      <header
        className="calculator-header"
        style={{
          border: "1px solid var(--line)",
          borderRadius: "0.75rem",
          background: "rgb(255 253 249 / 0.85)",
          padding: "1.75rem 2rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.65rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#10b981", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>📊</span><span>DataCite &amp; Hugging Face DOIs</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.25)", color: "var(--accent)", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>🛡️</span><span>CC BY 4.0 Open Access</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.25)", color: "#9333ea", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>⚡</span><span>Empirical &amp; Deterministic Matrices</span>
          </div>
        </div>

        <h1 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)", fontWeight: 800, lineHeight: 1.2, margin: "0.2rem 0 0.5rem", color: "var(--brand-strong)" }}>
          Open Benchmark Datasets &amp; Engineering Matrices
        </h1>

        <p style={{ fontSize: "1.02rem", color: "var(--ink)", maxWidth: "980px", lineHeight: 1.5, margin: "0 0 1rem" }}>
          PowerLab publishes reproducible open benchmark datasets supporting our deterministic calculation engines and peer preprints. Every dataset includes full data dictionaries, experimental variable definitions, sample records, and persistent DataCite DOIs.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "var(--muted)" }}>
          <span>📦 <strong>{BENCHMARK_DATASETS.length}</strong> Registered Datasets</span>
          <span>•</span>
          <span>📈 Formats: <strong>CSV / Tabular Matrix / Parquet</strong></span>
          <span>•</span>
          <span>🔗 Fully Integrated with <Link href="/research" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Technical Whitepapers</Link></span>
        </div>
      </header>

      {/* Dataset Grid */}
      <section aria-labelledby="datasets-grid-heading">
        <h2 id="datasets-grid-heading" style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "1.25rem" }}>
          All Benchmark Datasets
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {BENCHMARK_DATASETS.map((ds) => (
            <div
              key={ds.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #10b981",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "4px", textTransform: "uppercase" }}>
                    📊 {ds.category}
                  </span>
                  <span style={{ background: "var(--surface-subtle, #f1f5f9)", color: "var(--ink-secondary)", fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.45rem", borderRadius: "4px", border: "1px solid var(--line)", fontFamily: "monospace" }}>
                    v{ds.version}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginLeft: "auto" }}>
                    {ds.recordCount} ({ds.fileSize})
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "0.45rem", lineHeight: 1.35 }}>
                  <Link href={`/datasets/${ds.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {ds.title}
                  </Link>
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.45, marginBottom: "0.85rem" }}>
                  {ds.subtitle}
                </p>

                {ds.doi && (
                  <div style={{ marginBottom: "0.85rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                    <strong>DOI:</strong> <span style={{ fontFamily: "monospace", color: "var(--accent)" }}>{ds.doi}</span>
                  </div>
                )}
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.85rem", marginTop: "0.85rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link
                  href={`/datasets/${ds.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  Explore Dataset &amp; Data Dictionary →
                </Link>
                {ds.downloadUrl && (
                  <a
                    href={ds.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#10b981",
                      background: "rgba(16, 185, 129, 0.1)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    CSV Download ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Link Hub Section */}
      <section style={{ marginTop: "3rem", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-strong)", marginBottom: "1rem" }}>
          Related Engineering Resources
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <Link href="/research" style={{ display: "block", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.5rem", textDecoration: "none" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem" }}>📄 Technical Whitepapers</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: 0 }}>Explore theoretical frameworks and peer-grade mathematical formulations.</p>
          </Link>
          <Link href="/battery/battery-runtime-calculator" style={{ display: "block", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.5rem", textDecoration: "none" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem" }}>🔋 Battery Runtime Engine</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: 0 }}>Interactive calculator executing deterministic Peukert derating and tare losses.</p>
          </Link>
          <Link href="/solar/solar-panel-tilt-calculator" style={{ display: "block", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.5rem", textDecoration: "none" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 0.35rem" }}>☀️ Solar Tilt Engine</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: 0 }}>Model Perez anisotropic transposition and ground albedo reflection.</p>
          </Link>
        </div>
      </section>
    </article>
  );
}

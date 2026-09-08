import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { COMPREHENSIVE_STANDARDS_LIST } from "@/data/standards-registry";
import { FormulaCopyButton } from "@/components/standards/formula-copy-button";

export const metadata: Metadata = {
  title: "Standards & Code Compliance Matrix | PowerLab",
  description:
    "Cross-reference index linking IEEE, NFPA 70 (NEC), NREL PVWatts, SAE, and UL engineering standards directly to PowerLab deterministic calculation engines and mathematical equations.",
  alternates: { canonical: "/standards" },
  openGraph: {
    title: "Standards & Code Compliance Matrix | PowerLab",
    description:
      "Direct bidirectional mapping connecting IEEE, NFPA 70 NEC, NREL, SAE, and UL codes to deterministic physical calculations.",
    url: `${siteConfig.url}/standards`,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function StandardsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Energy Engineering Standards & Code Compliance Matrix",
    description:
      "Direct bidirectional mapping connecting IEEE, NFPA 70 (NEC), NREL, SAE, and UL engineering codes directly to PowerLab calculation engines.",
    url: `${siteConfig.url}/standards`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <article className="page reading-page" style={{ maxWidth: "1140px", margin: "0 auto", padding: "2rem 1rem 4rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          </li>
          <li>/</li>
          <li style={{ color: "var(--ink)", fontWeight: 600 }} aria-current="page">Standards &amp; Codes</li>
        </ol>
      </nav>

      {/* Header Banner */}
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
          <span>📜</span>
          <span>Regulatory Codes &amp; Physics Specification Matrix</span>
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", margin: "0 0 0.75rem", lineHeight: 1.2 }}>
          Energy Engineering Standards Cross-Reference
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "880px", lineHeight: 1.6, margin: 0 }}>
          Direct bidirectional mapping connecting American National Standards (ANSI), IEEE, NFPA 70 (National Electrical Code), NREL PVWatts V8, SAE International, and UL/IEC ratings to the exact deterministic algorithms and interactive calculators that enforce them.
        </p>
      </header>

      {/* Standards Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {COMPREHENSIVE_STANDARDS_LIST.map((std) => (
          <section
            key={std.id}
            id={std.id}
            style={{
              background: "var(--surface, #ffffff)",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderTop: `4px solid ${std.color}`,
              borderRadius: "0.85rem",
              padding: "1.75rem 2rem",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Top row: Standard Code badge + Edition */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  style={{
                    background: "var(--bg-secondary, #f8fafc)",
                    color: std.color,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color, #cbd5e1)",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {std.code}
                </span>
                <span
                  style={{
                    background: `${std.color}15`,
                    color: std.color,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.55rem",
                    borderRadius: "4px",
                  }}
                >
                  {std.authority}
                </span>
              </div>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{std.edition}</span>
            </div>

            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.5rem" }}>
              {std.title}
            </h2>

            <p style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6, marginBottom: "0.6rem" }}>
              <strong>Scope:</strong> {std.scope}
            </p>

            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              💡 <strong>Regulatory Authority:</strong> {std.regulatoryAuthority}
            </p>

            {/* Clauses */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: 0,
                  paddingBottom: "0.4rem",
                  borderBottom: "1px solid var(--border-color, #e2e8f0)",
                }}
              >
                Governing Clauses &amp; Enforced Mathematical Models
              </h3>

              {std.clauses.map((clause, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-secondary, #f8fafc)",
                    border: "1px solid var(--border-color, #cbd5e1)",
                    borderRadius: "0.55rem",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: std.color,
                        fontFamily: "var(--font-mono, monospace)",
                      }}
                    >
                      [{clause.clauseNumber}]
                    </span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{clause.title}</strong>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "0.75rem" }}>
                    {clause.description}
                  </p>

                  {/* Formula Code Box with Copy Button */}
                  <div
                    style={{
                      background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
                      border: "1px solid #334155",
                      borderTop: `3px solid ${std.color}`,
                      borderRadius: "0.6rem",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      margin: "0.6rem 0 1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.35rem 0.75rem",
                        background: "rgba(0, 0, 0, 0.35)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                        </div>
                        <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.03em" }}>
                          {std.code.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_{clause.clauseNumber.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.math
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            color: std.color,
                            background: `${std.color}20`,
                            padding: "0.12rem 0.4rem",
                            borderRadius: "3px",
                          }}
                        >
                          {std.code}
                        </span>
                        <FormulaCopyButton formula={clause.latexFormula} />
                      </div>
                    </div>

                    <div style={{ padding: "0.75rem 1rem", fontSize: "0.82rem", lineHeight: 1.5, color: "#f8fafc", overflowX: "auto" }}>
                      <code>{clause.latexFormula}</code>
                    </div>
                  </div>

                  {/* Enforcing Calculators */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)" }}>
                      Enforcing Calculators:
                    </span>
                    {clause.enforcingCalculators.map((calc) => (
                      <Link
                        key={calc.id}
                        href={calc.route}
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          background: "var(--surface, #ffffff)",
                          border: "1px solid var(--border-color, #cbd5e1)",
                          color: std.color,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <span>⚡</span>
                        <span>{calc.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Reciprocal Links & Methodology Footer Section */}
      <footer style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color, #cbd5e1)" }}>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          For formal academic preprints and downloadable PDFs, visit our <Link href="/research">Technical Research Hub</Link>. To inspect pure TypeScript loss algorithms and unit invariant verification, explore our <Link href="/methodology">Calculation Methodology</Link> or the <Link href="/sources">Laboratory Sources &amp; Standards Directory</Link>.
        </p>
      </footer>
    </article>
  );
}

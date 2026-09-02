import type { Metadata } from "next";
import { ENGINEERING_GLOSSARY_TERMS } from "@/data/engineering-glossary";
import { buildDefinedTermSetStructuredData } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Clean Energy & Electrical Engineering Glossary | PowerLab",
  description: "Verified engineering terminology, governing equations, SI units, and standards for solar PV, battery storage, HVAC heat pumps, and EV charging.",
  canonicalPath: "/glossary",
});

export default function GlossaryPage() {
  const structuredData = buildDefinedTermSetStructuredData({
    name: "PowerLab Clean Energy & Electrical Engineering Terminology Glossary",
    description: "Authoritative engineering definitions, mathematical formulas, SI units, and Wikidata knowledge graph entities for clean energy planning.",
    route: "/glossary",
    terms: ENGINEERING_GLOSSARY_TERMS.map((t) => ({
      term: t.term,
      definition: t.fullDefinition,
      category: t.category,
      symbol: t.symbol,
      unit: t.unit,
      sameAsWikidata: t.sameAsWikidata,
    })),
  });

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted, #64748b)" }}>
          <Link href="/" style={{ color: "var(--primary, #0284c7)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span aria-current="page" style={{ color: "var(--text-main, #0f172a)", fontWeight: 600 }}>Glossary</span>
        </nav>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(2, 132, 199, 0.1)", color: "var(--primary, #0284c7)", padding: "0.3rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          <span>📚</span> Engineering Terminology &amp; Equations
        </div>

        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text-main, #0f172a)", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
          Clean Energy &amp; Electrical Engineering Glossary
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-muted, #64748b)", maxWidth: "850px", lineHeight: 1.6 }}>
          Authoritative definitions, governing physical equations, SI units, and international standards 
          (<strong>IEEE, NFPA 70 NEC, NREL, ANSI/ASHRAE, and AHRI</strong>) used across PowerLab&apos;s deterministic planning engines.
        </p>
      </header>

      {/* Glossary Term Grid */}
      <section aria-labelledby="terms-heading">
        <h2 id="terms-heading" style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1.25rem" }}>
          Standardized Concepts ({ENGINEERING_GLOSSARY_TERMS.length} Terms)
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {ENGINEERING_GLOSSARY_TERMS.map((item) => (
            <article
              key={item.slug}
              id={item.slug}
              style={{
                padding: "1.35rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--line, #e2e8f0)",
                background: "var(--surface-card, #ffffff)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "0.25rem",
                      background:
                        item.category === "solar"
                          ? "#fef3c7"
                          : item.category === "battery"
                          ? "#dbeafe"
                          : item.category === "hvac"
                          ? "#fee2e2"
                          : item.category === "ev"
                          ? "#dcfce7"
                          : "#f3e8ff",
                      color:
                        item.category === "solar"
                          ? "#92400e"
                          : item.category === "battery"
                          ? "#1e40af"
                          : item.category === "hvac"
                          ? "#991b1b"
                          : item.category === "ev"
                          ? "#166534"
                          : "#6b21a8",
                    }}
                  >
                    {item.category.toUpperCase()}
                  </span>
                  {item.symbol && (
                    <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary, #0284c7)" }}>
                      {item.symbol} {item.unit ? `(${item.unit})` : ""}
                    </span>
                  )}
                </div>

                <h3 style={{ margin: "0.25rem 0 0.5rem", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-main, #0f172a)" }}>
                  {item.term}
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--text-muted, #475569)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  {item.fullDefinition}
                </p>

                {item.formula && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.82rem",
                      padding: "0.4rem 0.75rem",
                      background: "var(--surface-code, #0f172a)",
                      color: "#38bdf8",
                      borderRadius: "0.35rem",
                      margin: "0.5rem 0 0.75rem",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.formula}
                  </div>
                )}
              </div>

              <div style={{ borderTop: "1px solid var(--line-subtle, #f1f5f9)", paddingTop: "0.75rem", marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted, #64748b)" }}>
                <span>Standard: <strong>{item.standardReference}</strong></span>
                {item.sameAsWikidata && (
                  <a
                    href={item.sameAsWikidata}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--primary, #0284c7)", textDecoration: "none", fontWeight: 600 }}
                  >
                    Wikidata ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

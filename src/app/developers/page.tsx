"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { calculatorRegistry, type CalculatorRegistryItem } from "@/lib/calculator-registry";

const CATEGORY_NAMES: Record<string, string> = {
  battery: "🔋 Battery & Storage",
  solar: "☀️ Solar PV & Array",
  "home-energy": "⚡ Home Energy & Bills",
  ev: "🚗 EV & Mobility",
};

export default function DevelopersPage() {
  const publishedCalculators = calculatorRegistry.filter((c) => c.status === "published");
  const [selectedRoute, setSelectedRoute] = useState("/battery/battery-runtime-calculator");
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState("580");

  const currentCalc = publishedCalculators.find((c) => c.route === selectedRoute) || publishedCalculators[0];
  const origin = typeof window !== "undefined" ? window.location.origin : siteConfig.url;
  const canonicalUrl = `${origin}${selectedRoute}`;
  const embedUrl = `${canonicalUrl}?embed=true`;

  const calcName = currentCalc ? currentCalc.name : "PowerLab Energy Calculator";
  const embedHtml = `<div style="max-width:100%; width:720px; margin:1rem auto; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
  <iframe src="${embedUrl}" width="100%" height="${height}" style="border:none;" title="${calcName} — ${siteConfig.name}" loading="lazy"></iframe>
  <div style="padding:8px 16px; background:#f8fafc; font-size:12px; font-family:system-ui,-apple-system,sans-serif; text-align:right; border-top:1px solid #e2e8f0;">
    <a href="${canonicalUrl}" target="_blank" rel="noopener" style="color:#c65d24; text-decoration:none; font-weight:600;">⚡ Powered by ${siteConfig.name} Energy Planning</a>
  </div>
</div>`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(embedHtml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      prompt("Copy HTML Embed Code:", embedHtml);
    }
  };

  return (
    <article className="page" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Developers &amp; Embed Widgets</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Developer &amp; Publisher Tools</p>
        <h1>Embeddable Energy Calculators</h1>
        <p className="intro">
          Easily embed any of PowerLab&apos;s 30 deterministic energy planning tools into your website, blog, client portal, or contractor proposal with responsive HTML iframes.
        </p>
      </div>

      {/* Interactive Widget Builder */}
      <section
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border-color, #cbd5e1)",
          borderRadius: "1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", margin: "0 0 1rem" }}>1. Select a Calculator to Embed</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Calculator Tool
            </label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color, #cbd5e1)",
                fontSize: "0.9rem",
              }}
            >
              {Object.entries(CATEGORY_NAMES).map(([catKey, catName]) => (
                <optgroup label={catName} key={catKey}>
                  {publishedCalculators
                    .filter((c: CalculatorRegistryItem) => c.category === catKey)
                    .map((calc: CalculatorRegistryItem) => (
                      <option value={calc.route} key={calc.route}>
                        {calc.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Iframe Height (Pixels)
            </label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color, #cbd5e1)",
                fontSize: "0.9rem",
              }}
            >
              <option value="480">Compact (480px)</option>
              <option value="580">Standard (580px - Recommended)</option>
              <option value="680">Tall with Matrices (680px)</option>
            </select>
          </div>
        </div>

        {/* HTML Code Block */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>2. Copy HTML Embed Snippet</span>
            <button
              type="button"
              onClick={handleCopy}
              className="button secondary-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.85rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                borderRadius: "0.45rem",
                cursor: "pointer",
              }}
            >
              <span>{copied ? "✅ Copied to Clipboard!" : "📋 Copy Embed HTML"}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={embedHtml}
            rows={5}
            style={{
              width: "100%",
              fontFamily: "monospace",
              fontSize: "0.8rem",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color, #cbd5e1)",
              background: "var(--bg-secondary, #f8fafc)",
              color: "var(--text-color, #0f172a)",
              resize: "none",
              boxSizing: "border-box",
            }}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>

        {/* Live Interactive Preview */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
            Live Widget Preview ({calcName})
          </h3>
          <div
            style={{
              maxWidth: "100%",
              width: "720px",
              margin: "0 auto",
              border: "1px solid var(--border-color, #cbd5e1)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <iframe
              src={embedUrl}
              width="100%"
              height={height}
              style={{ border: "none" }}
              title={calcName}
            />
            <div
              style={{
                padding: "8px 16px",
                background: "var(--bg-secondary, #f8fafc)",
                fontSize: "12px",
                textAlign: "right",
                borderTop: "1px solid var(--border-color, #e2e8f0)",
              }}
            >
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener"
                style={{ color: "var(--accent, #c65d24)", textDecoration: "none", fontWeight: 600 }}
              >
                ⚡ Powered by {siteConfig.name} Energy Planning
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Installation Guides */}
      <section style={{ marginTop: "3rem" }}>
        <h2>How to Install on Popular CMS Platforms</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <article style={{ padding: "1.2rem", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", background: "var(--surface, #ffffff)" }}>
            <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem" }}>WordPress</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
              In the block editor, click <strong>+ Add Block</strong>, search for <strong>Custom HTML</strong>, and paste the embed snippet.
            </p>
          </article>

          <article style={{ padding: "1.2rem", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", background: "var(--surface, #ffffff)" }}>
            <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem" }}>Webflow &amp; Squarespace</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
              Add an <strong>Embed / Code block</strong> onto your canvas, paste the HTML code, and publish your changes.
            </p>
          </article>

          <article style={{ padding: "1.2rem", border: "1px solid var(--border-color, #cbd5e1)", borderRadius: "0.75rem", background: "var(--surface, #ffffff)" }}>
            <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem" }}>Notion &amp; Ghost</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
              Type <code>/embed</code>, paste the calculator URL directly, and resize the block to your desired width.
            </p>
          </article>
        </div>
      </section>
    </article>
  );
}

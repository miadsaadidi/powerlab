import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy & Zero-Database Architecture",
  description: "Learn how PowerLab protects your privacy with 100% client-side computation, zero user-account databases, and browser-local localStorage isolation.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — PowerLab",
    description: "Learn how PowerLab protects your privacy with 100% client-side computation and zero database tracking.",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <article className="page reading-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>

      <p className="eyebrow">Zero-Database Architecture</p>
      <h1>Privacy Policy</h1>
      <p className="intro">
        PowerLab was engineered from day one with a strict <strong>zero-database, privacy-by-design architecture</strong>. We do not require accounts, we do not store your household energy data on our servers, and all calculations execute directly in your browser.
      </p>

      {/* Highlights Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          margin: "1.75rem 0 2.5rem",
        }}
      >
        <div
          className="flow-node-card"
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border-color, #cbd5e1)",
            borderTop: "4px solid #10b981",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛡️</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Zero Database Tracking</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            We have no user database, no cloud customer accounts, and no marketing tracking profiles.
          </p>
        </div>

        <div
          className="flow-node-card"
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border-color, #cbd5e1)",
            borderTop: "4px solid #0284c7",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💻</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>100% Client-Side Math</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            All engineering formulas execute locally in pure TypeScript inside your browser engine.
          </p>
        </div>

        <div
          className="flow-node-card"
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border-color, #cbd5e1)",
            borderTop: "4px solid #f59e0b",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔒</div>
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Local-Only Storage</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Your Energy Profile and scenario presets stay isolated in your browser&apos;s localStorage.
          </p>
        </div>
      </div>

      <section>
        <h2>1. Information We Do Not Collect</h2>
        <p>
          Unlike traditional energy auditing websites, PowerLab does not harvest personal identifying information:
        </p>
        <ul>
          <li><strong>No User Accounts:</strong> You never need to provide your name, email address, password, or phone number to unlock full calculator functionality.</li>
          <li><strong>No Utility Bill Uploads:</strong> We never request access to your utility account or store your monthly electric bill records on server disks.</li>
          <li><strong>No Financial or Credit Information:</strong> We do not sell solar leases, financing loans, or collect credit information.</li>
          <li><strong>No Invasive Advertising Pixels:</strong> We do not load third-party ad retargeting pixels (e.g., Meta Pixel, TikTok tracking tags).</li>
        </ul>
      </section>

      <section>
        <h2>2. How Your Energy Profile &amp; Data Are Handled</h2>
        <p>
          PowerLab features an optional <strong>Energy Profile Drawer</strong> that allows you to carry your system specifications (such as battery capacity, appliance lists, solar array size, and electricity rates) seamlessly between calculators.
        </p>
        <p>
          This profile is stored <strong>exclusively in your browser&apos;s <code>localStorage</code></strong>:
        </p>
        <ul>
          <li>The data never leaves your device and is never uploaded to an analytics database.</li>
          <li>You have 100% control: you can clear your stored Energy Profile at any moment with a single click inside the drawer.</li>
          <li>If you use Private/Incognito browsing, all stored local data is automatically erased when you close your window.</li>
        </ul>
      </section>

      <section>
        <h2>3. External Solar Irradiance Requests (PVWatts Proxy)</h2>
        <p>
          When you request a location-aware solar output simulation in the <em>Solar Panel Output Calculator</em>, our server queries the public <strong>NREL PVWatts V8</strong> meteorological API.
        </p>
        <ul>
          <li><strong>Payload:</strong> Only the geographic coordinates (latitude and longitude) and system nameplate DC capacity are transmitted to retrieve solar irradiance datasets.</li>
          <li><strong>Zero Tracking:</strong> No IP addresses, device identifiers, or session tokens are stored or shared with external model providers.</li>
        </ul>
      </section>

      <section>
        <h2>4. Shareable Calculation Permalinks</h2>
        <p>
          When you click <strong>&quot;Share Calculation&quot;</strong>, PowerLab encodes your active numeric parameters directly into the URL query parameters (e.g. <code>?watts=1500&amp;voltage=12</code>).
        </p>
        <p>
          These links allow you to share engineering scenarios with colleagues or forum communities without generating a database record. The recipient&apos;s browser simply decodes the query parameters into form state locally upon page load.
        </p>
      </section>

      <section>
        <h2>5. GDPR, CCPA &amp; Global Privacy Compliance</h2>
        <p>
          Because PowerLab does not store personal identifying data on server infrastructure:
        </p>
        <ul>
          <li><strong>Right to Access &amp; Portability:</strong> Your complete data model resides in your browser and can be exported as a clean Markdown or CSV specification at any time via the <em>Export Spec</em> feature.</li>
          <li><strong>Right to Erasure:</strong> Clicking <em>&quot;Clear All Stored Scenarios&quot;</em> in your Energy Profile drawer instantly wipes all locally stored values from your device.</li>
        </ul>
      </section>

      <section>
        <h2>6. Contact &amp; Transparency Inquiries</h2>
        <p>
          If you have questions regarding our privacy architecture, open engineering models, or methodology, please review our <Link href="/methodology">Engineering Methodology</Link> and <Link href="/sources">Authoritative Data Sources</Link>.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Last policy review: <time dateTime="2026-08-17">August 17, 2026</time>.
        </p>
      </section>
    </article>
  );
}

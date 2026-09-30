import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Privacy Policy & Data Architecture — PowerLab",
  description: "Understand the PowerLab privacy model: browser-local storage for calculation profiles, no user account database, and transparent external requests.",
  canonicalPath: "/privacy",
});

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PowerLab Privacy Policy",
    url: `${siteConfig.url}/privacy`,
    description: "PowerLab privacy architecture, browser-local data storage, analytics disclosures, and external solar API requests.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
    },
  };

  return (
    <article className="page reading-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>

      <p className="eyebrow">Data Architecture &amp; Privacy</p>
      <h1>Privacy Policy</h1>
      <p className="intro">
        PowerLab is designed with a <strong>privacy-first, zero-database architecture</strong> for calculation data. We do not require user accounts, we do not store your household energy profiles in a server database, and core calculations run locally in your browser.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>No Account Database</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            We do not maintain user accounts or cloud databases storing your calculation inputs or energy scenarios.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Client-Side Calculations</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Deterministic engineering formulas execute directly in your browser using pure TypeScript engines.
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
          <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--brand-strong)" }}>Browser-Local Storage</strong>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            Your Energy Profile and scenario presets remain stored locally on your device in <code>localStorage</code>.
          </p>
        </div>
      </div>

      <section>
        <h2>1. Information We Do Not Collect in Calculator Workflows</h2>
        <p>
          Unlike conventional lead-generation or utility-brokering websites, PowerLab does not harvest personal identifying information for calculation features:
        </p>
        <ul>
          <li><strong>No User Accounts:</strong> You do not need to provide a name, email address, password, or phone number to access calculators or save local scenarios.</li>
          <li><strong>No Utility Bill Uploads:</strong> We do not request utility account credentials or store electric utility bills in server databases.</li>
          <li><strong>No Financial or Credit Information:</strong> We do not sell financing, solar leases, or collect financial credentials.</li>
          <li><strong>Analytics &amp; Performance Metrics:</strong> We use Google Analytics to measure aggregate website traffic, popular calculation workflows, and technical performance. Analytics data is subject to Google&apos;s standard data processing and privacy practices.</li>
        </ul>
      </section>

      <section>
        <h2>2. How Your Energy Profile &amp; Scenario Data Are Handled</h2>
        <p>
          PowerLab provides an optional <strong>Energy Profile Drawer</strong> that allows you to persist system parameters (such as battery capacity, appliance lists, solar array size, and electricity rates) between tools.
        </p>
        <p>
          This profile data is stored <strong>exclusively in your browser&apos;s <code>localStorage</code></strong>:
        </p>
        <ul>
          <li>Your stored Energy Profile data resides locally on your device and is not synchronized to a central user database.</li>
          <li>You retain direct control: you can reset or clear your stored profile data at any time via the <em>&quot;Clear Stored Profile&quot;</em> button in the drawer.</li>
          <li>In Private or Incognito browsing modes, local storage is generally not persisted after the private browsing session ends, subject to your specific browser settings.</li>
        </ul>
      </section>

      <section>
        <h2>3. External Solar Irradiance Requests (PVWatts Proxy)</h2>
        <p>
          While most calculations run entirely client-side, certain location-aware solar simulations (such as the <em>Solar Panel Output Calculator</em>) request meteorological data from the <strong>NREL PVWatts V8</strong> API via a server proxy:
        </p>
        <ul>
          <li><strong>Application Payload:</strong> The request transmits geographic coordinates (latitude and longitude) and system configuration parameters (such as DC nameplate capacity, tilt angle, and azimuth) to retrieve solar insolation profiles.</li>
          <li><strong>Network Metadata:</strong> Like all standard HTTP internet communications, requests include standard network headers (such as IP addresses and user agents) processed through hosting and API infrastructure. Third-party providers such as NREL maintain their own independent server logging and data retention policies.</li>
        </ul>
      </section>

      <section>
        <h2>4. Shareable Calculation Permalinks &amp; Query Parameters</h2>
        <p>
          When you click <strong>&quot;Share Calculation&quot;</strong>, PowerLab encodes active numeric inputs directly into URL query parameters (for example, <code>?watts=1500&amp;voltage=12</code>).
        </p>
        <p>
          This provides database-free permalinks that allow you to bookmark or share engineering configurations. The recipient&apos;s browser parses the URL parameters to restore calculator inputs on load.
        </p>
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "rgba(234, 179, 8, 0.1)",
            borderLeft: "4px solid #eab308",
            borderRadius: "0.5rem",
            margin: "1rem 0",
            fontSize: "0.88rem",
            lineHeight: 1.5,
          }}
        >
          <strong>⚠️ Shareable URL Privacy Warning:</strong> Anyone who has access to a shareable link can view the parameters encoded in the URL. Do not include confidential, proprietary, financial, household security, or sensitive personal details in shareable calculation URLs. Note that URLs may also appear in your browser history, bookmarks, and standard server or referrer logs.
        </div>
      </section>

      <section>
        <h2>5. Technical Data Controls (GDPR / CCPA Considerations)</h2>
        <p>
          Because PowerLab operates without a user account database for calculator entries:
        </p>
        <ul>
          <li><strong>Access &amp; Portability:</strong> All active calculation parameters reside in your browser and can be exported as structured Markdown specifications using the <em>Export Spec</em> feature.</li>
          <li><strong>Erasure &amp; Deletion:</strong> Clicking <em>&quot;Clear All Stored Scenarios&quot;</em> in your Energy Profile drawer or clearing your browser cookies and site data immediately deletes all locally stored values from your machine.</li>
          <li><strong>Data Inquiries:</strong> Because calculation data is not linked to user accounts or identities on our servers, there are no remote user-profile records to retrieve or modify. For general privacy inquiries or website feedback, please use the contact resources below.</li>
        </ul>
      </section>

      <section>
        <h2>6. Transparency &amp; Governance</h2>
        <p>
          For additional details regarding our engineering assumptions, references, and calculation methods, please consult our <Link href="/methodology">Engineering Methodology</Link>, <Link href="/standards">Standards Matrix</Link>, <Link href="/glossary">Engineering Glossary</Link>, or <Link href="/terms">Terms of Service</Link>.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>
          Last policy update: <time dateTime="2026-09-30">September 30, 2026</time>.
        </p>
      </section>
    </article>
  );
}

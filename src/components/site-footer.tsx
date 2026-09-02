import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";
import { getFooterNavigation } from "@/lib/navigation";

export function SiteFooter() {
  const footerItems = getFooterNavigation();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        {/* Brand & Purpose Column */}
        <div className="footer-brand-col">
          <Link className="brand" href="/" aria-label={`${siteConfig.name} Home`}>
            <EnergyLogo />
            <span className="brand-name">{siteConfig.name}</span>
          </Link>
          <p className="footer-tagline">
            Deterministic, transparent energy calculators with physical loss models for solar, storage, homes, and electric vehicles.
          </p>
          <p className="footer-privacy-note">
            🛡️ Zero user-account databases • 100% browser-local computation
          </p>
          <div style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://www.trustpilot.com/review/powelab.org"
              target="_blank"
              rel="noopener noreferrer"
              className="trustpilot-footer-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: "0.82rem",
                color: "var(--brand-strong, #0f172a)",
                textDecoration: "none",
                padding: "0.35rem 0.65rem",
                borderRadius: "0.4rem",
                border: "1px solid var(--line, #cbd5e1)",
                background: "var(--surface, #ffffff)",
                fontWeight: 600,
              }}
              title="Review PowerLab on Trustpilot"
            >
              <span style={{ color: "#00b67a", fontSize: "0.95rem" }}>★</span>
              <span>Review on Trustpilot</span>
            </a>
            <a
              href="https://www.google.com/preferences/source?q=powelab.org"
              target="_blank"
              rel="noopener noreferrer"
              className="google-preferred-footer-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: "0.82rem",
                color: "var(--brand-strong, #0f172a)",
                textDecoration: "none",
                padding: "0.35rem 0.65rem",
                borderRadius: "0.4rem",
                border: "1px solid var(--line, #cbd5e1)",
                background: "var(--surface, #ffffff)",
                fontWeight: 600,
              }}
              title="Pin PowerLab to your Google preferences"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Pin on Google</span>
            </a>
          </div>
        </div>

        {/* Navigation Links Column */}
        <div className="footer-nav-col">
          <span className="footer-col-title">Navigation &amp; Engineering Hubs</span>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerItems.map((item) => {
              const label =
                item.label === "Battery"
                  ? "Battery Calculators"
                  : item.label === "Solar"
                  ? "Solar Calculators"
                  : item.label === "Home Energy"
                  ? "Home Energy Calculators"
                  : item.label === "EV"
                  ? "EV Calculators"
                  : item.label === "About"
                  ? "About PowerLab"
                  : item.label === "Privacy"
                  ? "Privacy Policy"
                  : item.label === "Terms"
                  ? "Terms of Use"
                  : item.label;

              return (
                <Link className="footer-link" href={item.href} key={item.href}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}. Deterministic mathematical models for energy planning.</p>
      </div>
    </footer>
  );
}

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
          <div style={{ marginTop: "0.85rem" }}>
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

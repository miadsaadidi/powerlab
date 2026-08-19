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

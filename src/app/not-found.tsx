import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { EnergyLogo } from "@/components/energy-logo";

export default function NotFound() {
  return (
    <article className="page reading-page" style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <div style={{ display: "inline-flex", marginBottom: "1rem" }}>
        <EnergyLogo />
      </div>
      <p className="eyebrow">404 — Page Not Found</p>
      <h1>Calculator Not Found</h1>
      <p className="intro" style={{ maxWidth: "540px", margin: "0 auto 2rem" }}>
        The energy planning tool or page you requested does not exist or has been moved.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" className="button">
          Return to {siteConfig.name} Home
        </Link>
        <Link href="/solar" className="button secondary-button">
          Explore Solar Tools
        </Link>
      </div>
    </article>
  );
}

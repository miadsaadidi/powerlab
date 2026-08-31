import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Terms of Use & Calculator Disclaimers",
  description: "Review terms of use and planning disclaimers for PowerLab deterministic mathematical models, physical loss formulas, and energy calculators.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  return (
    <article className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Terms</span>
      </nav>
      <h1>Terms</h1>
      <p>Calculator outputs are planning estimates, not electrical-installation, structural, permitting or product-certification advice.</p>
    </article>
  );
}

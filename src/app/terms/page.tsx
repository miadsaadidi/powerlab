import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using Energy Planning Tools calculator estimates.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms", description: "Terms for using Energy Planning Tools calculator estimates." },
};

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

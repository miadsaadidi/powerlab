import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using Energy Planning Tools calculator estimates.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms", description: "Terms for using Energy Planning Tools calculator estimates." },
};

export default function TermsPage() { return <article className="page"><h1>Terms</h1><p>Calculator outputs are planning estimates, not electrical-installation, structural, permitting or product-certification advice.</p></article>; }

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Energy Planning Tools",
  description: "Learn about Energy Planning Tools and its approach to practical, transparent energy planning estimates.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Energy Planning Tools", description: "Practical, transparent energy planning estimates." },
};

export default function AboutPage() { return <article className="page"><h1>About</h1><p>Energy Planning Tools helps people make practical planning estimates across batteries, solar, home energy and EVs.</p></article>; }

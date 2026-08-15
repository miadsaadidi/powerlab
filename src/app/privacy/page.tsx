import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Learn how Energy Planning Tools handles calculator inputs and local browser preferences.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy", description: "How Energy Planning Tools handles calculator inputs and local browser preferences." },
};

export default function PrivacyPage() { return <article className="page"><h1>Privacy</h1><p>This site does not require an account. Calculator inputs remain in your browser unless a calculator uses an explicitly described server-side model request.</p></article>; }

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Embeddable Energy Calculators | PowerLab",
  description: "Embed PowerLab's deterministic energy calculators in websites, blogs, client portals, and contractor proposals.",
  alternates: { canonical: "/developers" },
  openGraph: {
    title: "Embeddable Energy Calculators | PowerLab",
    description: "Embed PowerLab's deterministic energy calculators in websites, blogs, client portals, and contractor proposals.",
    url: "https://www.powelab.org/developers",
  },
};

export default function DevelopersLayout({ children }: { children: ReactNode }) {
  return children;
}

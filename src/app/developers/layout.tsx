import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Embeddable Energy Calculators & Widgets",
  description: "Embed PowerLab's responsive, deterministic energy calculators for solar, battery, and home energy directly in websites, portals, and proposals.",
  canonicalPath: "/developers",
});

export default function DevelopersLayout({ children }: { children: ReactNode }) {
  return children;
}

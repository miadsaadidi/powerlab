import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "PowerLab",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d14",
    theme_color: "#0284c7",
    categories: ["utilities", "productivity", "energy", "calculators"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

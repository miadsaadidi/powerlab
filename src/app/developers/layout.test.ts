import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

import { siteConfig } from "@/lib/site-config";

describe("developers metadata", () => {
  it("declares the canonical developers URL", () => {
    expect(metadata.alternates).toEqual({ canonical: `${siteConfig.url}/developers` });
  });
});

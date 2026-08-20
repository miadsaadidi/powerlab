import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("does not emit a generated lastmod timestamp for every URL", () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);
  });
});

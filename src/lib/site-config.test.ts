import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site-config";

describe("resolveSiteUrl", () => {
  it("uses an explicitly configured canonical URL", () => {
    expect(resolveSiteUrl({ configuredUrl: "https://powerlab-amber.vercel.app" })).toBe(
      "https://powerlab-amber.vercel.app/",
    );
  });

  it("uses Vercel's stable production URL before a deployment URL", () => {
    expect(resolveSiteUrl({ projectProductionUrl: "powerlab.example.com", deploymentUrl: "preview-123.vercel.app" })).toBe(
      "https://powerlab.example.com/",
    );
  });

  it("uses localhost only when no deployment URL is available", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000/");
  });
});

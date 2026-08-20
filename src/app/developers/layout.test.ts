import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("developers metadata", () => {
  it("declares the canonical developers URL", () => {
    expect(metadata.alternates).toEqual({ canonical: "/developers" });
  });
});

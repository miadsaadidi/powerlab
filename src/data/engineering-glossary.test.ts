import { describe, expect, it } from "vitest";
import { ENGINEERING_GLOSSARY_TERMS } from "./engineering-glossary";

describe("Engineering Glossary Dataset", () => {
  it("contains valid terms across all 5 core electrification categories", () => {
    expect(ENGINEERING_GLOSSARY_TERMS.length).toBeGreaterThanOrEqual(15);

    const categories = new Set(ENGINEERING_GLOSSARY_TERMS.map((t) => t.category));
    expect(categories.has("solar")).toBe(true);
    expect(categories.has("battery")).toBe(true);
    expect(categories.has("hvac")).toBe(true);
    expect(categories.has("ev")).toBe(true);
    expect(categories.has("electrical")).toBe(true);
  });

  it("validates that all glossary items have required fields and non-empty definitions", () => {
    for (const item of ENGINEERING_GLOSSARY_TERMS) {
      expect(item.slug).toBeTruthy();
      expect(item.term.length).toBeGreaterThan(2);
      expect(item.shortDefinition.length).toBeGreaterThan(15);
      expect(item.fullDefinition.length).toBeGreaterThan(40);
      expect(item.standardReference).toBeTruthy();

      if (item.sameAsWikidata) {
        expect(item.sameAsWikidata).toMatch(/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/);
      }
    }
  });

  it("ensures all slugs are unique", () => {
    const slugs = ENGINEERING_GLOSSARY_TERMS.map((t) => t.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});

import { describe, expect, it } from "vitest";
import { resolveChemistryReserve } from "./battery-defaults";

describe("battery chemistry defaults", () => {
  it("updates an untouched reserve when chemistry changes", () => {
    expect(resolveChemistryReserve("agm", 0.2, false)).toBe(0.5);
  });

  it("preserves a manually edited reserve", () => {
    expect(resolveChemistryReserve("agm", 0.25, true)).toBe(0.25);
  });
});

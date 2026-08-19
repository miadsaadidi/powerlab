import { describe, expect, it } from "vitest";
import { energyProvenanceAfterChange, type EnergyProvenance } from "./provenance";

describe("home battery energy provenance", () => {
  it("starts as profile-derived when initialized from the profile", () => {
    const provenance: EnergyProvenance = "profile-derived";
    expect(provenance).toBe("profile-derived");
  });

  it("becomes user-edited after an energy edit", () => {
    expect(energyProvenanceAfterChange("profile-derived", "value")).toBe("user-edited");
  });

  it("stays profile-derived after a display-unit conversion", () => {
    expect(energyProvenanceAfterChange("profile-derived", "unit")).toBe("profile-derived");
  });
});

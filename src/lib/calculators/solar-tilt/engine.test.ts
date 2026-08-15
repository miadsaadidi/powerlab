import { describe, expect, it } from "vitest";
import {
  calculateSeasonalTilts,
  getEquatorFacingAzimuth,
  validateLatitude,
} from "./engine";

describe("solar tilt engine", () => {
  it("calculates northern hemisphere seasonal starting tilts", () => {
    expect(calculateSeasonalTilts(34)).toEqual({ summer: 19, yearRound: 34, winter: 49 });
    expect(getEquatorFacingAzimuth(34)).toEqual({ label: "South", degrees: 180 });
  });

  it("calculates southern hemisphere seasonal starting tilts", () => {
    expect(calculateSeasonalTilts(-33)).toEqual({ summer: 18, yearRound: 33, winter: 48 });
    expect(getEquatorFacingAzimuth(-33)).toEqual({ label: "North", degrees: 0 });
  });

  it("handles equator and polar boundaries", () => {
    expect(calculateSeasonalTilts(0)).toEqual({ summer: 0, yearRound: 0, winter: 15 });
    expect(calculateSeasonalTilts(90)).toEqual({ summer: 75, yearRound: 90, winter: 90 });
    expect(getEquatorFacingAzimuth(0)).toEqual({ label: "Equator", degrees: null });
  });

  it("rejects invalid latitude values", () => {
    expect(validateLatitude(91)).toBe("Latitude must be between -90° and 90°.");
    expect(validateLatitude(-91)).toBe("Latitude must be between -90° and 90°.");
    expect(validateLatitude(Number.NaN)).toBe("Enter a valid latitude.");
    expect(validateLatitude(Number.POSITIVE_INFINITY)).toBe("Enter a valid latitude.");
    expect(validateLatitude(34)).toBeNull();
  });
});

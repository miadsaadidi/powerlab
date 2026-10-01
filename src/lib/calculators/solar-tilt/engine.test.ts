import { describe, expect, it } from "vitest";
import {
  calculateGroundAlbedoGain,
  calculateSeasonalTilts,
  getEquatorFacingAzimuth,
  validateLatitude,
} from "./engine";

describe("solar tilt engine", () => {
  it("calculates 34° N (Test A) canonical tilt angles", () => {
    expect(calculateSeasonalTilts(34)).toEqual({ summer: 19, yearRound: 29, winter: 49 });
    expect(getEquatorFacingAzimuth(34)).toEqual({ label: "South", degrees: 180 });
  });

  it("calculates 35° N (Test B) canonical tilt angles", () => {
    expect(calculateSeasonalTilts(35)).toEqual({ summer: 20, yearRound: 30, winter: 50 });
    expect(getEquatorFacingAzimuth(35)).toEqual({ label: "South", degrees: 180 });
  });

  it("calculates Southern Hemisphere (Test C: -34° S) canonical tilt angles", () => {
    expect(calculateSeasonalTilts(-34)).toEqual({ summer: 19, yearRound: 29, winter: 49 });
    expect(getEquatorFacingAzimuth(-34)).toEqual({ label: "North", degrees: 0 });
  });

  it("handles extreme latitude boundaries (Test D: -90, -45, 0, 45, 90)", () => {
    expect(calculateSeasonalTilts(0)).toEqual({ summer: 0, yearRound: 3, winter: 15 });
    expect(getEquatorFacingAzimuth(0)).toEqual({ label: "Equator", degrees: null });

    expect(calculateSeasonalTilts(45)).toEqual({ summer: 30, yearRound: 37, winter: 60 });
    expect(calculateSeasonalTilts(-45)).toEqual({ summer: 30, yearRound: 37, winter: 60 });

    expect(calculateSeasonalTilts(90)).toEqual({ summer: 75, yearRound: 72, winter: 90 });
    expect(calculateSeasonalTilts(-90)).toEqual({ summer: 75, yearRound: 72, winter: 90 });
  });

  it("calculates ground albedo view factor and snow reflection gain (Test F)", () => {
    const flatStandard = calculateGroundAlbedoGain(0, "standard");
    expect(flatStandard.groundViewFactor).toBe(0);
    expect(flatStandard.reflectedIrradianceGainPct).toBe(0);
    expect(flatStandard.snowSheddingEffectiveness).toBe("Low (Risk of Snow Accumulation)");

    const steepWinterSnow = calculateGroundAlbedoGain(50, "snow");
    expect(steepWinterSnow.groundViewFactor).toBeCloseTo(0.1786, 2);
    expect(steepWinterSnow.reflectedIrradianceGainPct).toBeGreaterThan(10);
    expect(steepWinterSnow.snowSheddingEffectiveness).toBe("Optimal (Natural Snow Shedding)");
  });

  it("rejects invalid latitude values", () => {
    expect(validateLatitude(91)).toBe("Latitude must be between -90° and 90°.");
    expect(validateLatitude(-91)).toBe("Latitude must be between -90° and 90°.");
    expect(validateLatitude(Number.NaN)).toBe("Enter a valid latitude.");
    expect(validateLatitude(Number.POSITIVE_INFINITY)).toBe("Enter a valid latitude.");
    expect(validateLatitude(34)).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import {
  calculateAnnualTilt,
  calculateGroundAlbedoGain,
  calculateSeasonalTilts,
  getEquatorFacingAzimuth,
  validateLatitude,
} from "./engine";

describe("solar tilt engine", () => {
  it("calculates northern hemisphere seasonal starting tilts at latitude 34°", () => {
    expect(calculateSeasonalTilts(34)).toEqual({ summer: 10.6, yearRound: 29.6, winter: 54.3, springFall: 31.5 });
    expect(calculateAnnualTilt(34)).toBe(29.6);
    expect(getEquatorFacingAzimuth(34)).toEqual({ label: "South", degrees: 180 });
  });

  it("calculates northern hemisphere seasonal starting tilts at latitude 33° (Phoenix)", () => {
    expect(calculateSeasonalTilts(33)).toEqual({ summer: 9.7, yearRound: 28.7, winter: 53.4, springFall: 30.5 });
    expect(calculateAnnualTilt(33)).toBe(28.7);
  });

  it("calculates northern hemisphere seasonal starting tilts at latitude 44° (Maine)", () => {
    expect(calculateSeasonalTilts(44)).toEqual({ summer: 19.9, yearRound: 38.3, winter: 63.2, springFall: 41.5 });
    expect(calculateAnnualTilt(44)).toBe(38.3);
  });

  it("calculates southern hemisphere seasonal starting tilts at latitude -34° (Sydney)", () => {
    expect(calculateSeasonalTilts(-34)).toEqual({ summer: 10.6, yearRound: 29.6, winter: 54.3, springFall: 31.5 });
    expect(getEquatorFacingAzimuth(-34)).toEqual({ label: "North", degrees: 0 });
  });

  it("handles equator and polar boundaries", () => {
    expect(calculateSeasonalTilts(0)).toEqual({ summer: 0, yearRound: 0, winter: 24, springFall: 0 });
    expect(calculateSeasonalTilts(90)).toEqual({ summer: 62.7, yearRound: 78.3, winter: 90, springFall: 87.5 });
    expect(getEquatorFacingAzimuth(0)).toEqual({ label: "Equator", degrees: null });
  });

  it("calculates ground albedo view factor and snow reflection gain", () => {
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


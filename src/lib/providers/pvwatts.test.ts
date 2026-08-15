import { describe, expect, it } from "vitest";
import { buildPvWattsParams, normalizePvWattsResponse, PVWATTS_DEFAULT_API_URL, type SolarProductionRequest } from "./pvwatts";

const request: SolarProductionRequest = {
  latitude: 34,
  longitude: -6.84,
  systemCapacityKw: 1,
  tiltDeg: 34,
  azimuthDeg: 180,
  moduleType: 0,
  arrayType: 1,
  lossesPercent: 14,
  dcAcRatio: 1.2,
  inverterEfficiencyPercent: 96,
};

describe("PVWatts normalization", () => {
  it("uses the current official PVWatts developer host", () => {
    expect(PVWATTS_DEFAULT_API_URL).toContain("developer.nlr.gov");
    expect(PVWATTS_DEFAULT_API_URL).not.toContain("developer.nrel.gov");
  });

  it("sends explicit coordinates and the documented NSRDB dataset", () => {
    const params = buildPvWattsParams(request);
    expect(params.get("lat")).toBe("34");
    expect(params.get("lon")).toBe("-6.84");
    expect(params.get("dataset")).toBe("nsrdb");
    expect(params.get("address")).toBeNull();
  });
  it("normalizes annual and monthly AC output", () => {
    const result = normalizePvWattsResponse({ outputs: { ac_annual: 7_500, ac_monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], capacity_factor: 17.1 } }, request);
    expect(result).toMatchObject({ provider: "pvwatts-v8", annualAcKwh: 7_500, capacityFactorPercent: 17.1 });
    expect(result.monthlyAcKwh).toHaveLength(12);
    expect(result.monthlyAcKwh.slice(0, 3)).toEqual([1, 2, 3]);
    expect(result.assumptions).toMatchObject({ latitude: 34, systemCapacityKw: 1, lossesPercent: 14 });
  });

  it("rejects incomplete provider output", () => {
    expect(() => normalizePvWattsResponse({ outputs: { ac_monthly: [1, 2] } }, request)).toThrow("PVWatts returned an incomplete production result.");
  });

  it("accepts a valid zero-production provider result", () => {
    const result = normalizePvWattsResponse({ outputs: { ac_annual: 0, ac_monthly: Array(12).fill(0), capacity_factor: 0 } }, request);
    expect(result.annualAcKwh).toBe(0);
  });

  it("rejects negative provider production", () => {
    expect(() => normalizePvWattsResponse({ outputs: { ac_annual: -1, ac_monthly: Array(12).fill(0) } }, request)).toThrow();
    expect(() => normalizePvWattsResponse({ outputs: { ac_annual: 1, ac_monthly: [-1, ...Array(11).fill(0)] } }, request)).toThrow();
  });
});

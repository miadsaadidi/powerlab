import { describe, expect, it } from "vitest";
import {
  US_REGIONAL_CLIMATE_DATA,
  getRegionalDataByState,
  searchRegionalData,
} from "./regional-climate-solar-data";

describe("US_REGIONAL_CLIMATE_DATA", () => {
  it("contains at least 50 state entries", () => {
    expect(US_REGIONAL_CLIMATE_DATA.length).toBeGreaterThanOrEqual(50);
  });

  it("contains valid and bounded physical values for all entries", () => {
    for (const item of US_REGIONAL_CLIMATE_DATA) {
      expect(item.state).toBeTruthy();
      expect(item.stateCode).toBeTruthy();
      expect(item.metro).toBeTruthy();
      expect(item.ashraeClimateZone).toBeTruthy();

      // Bounded solar parameters
      expect(item.peakSunHours).toBeGreaterThan(2.5);
      expect(item.peakSunHours).toBeLessThan(8.0);
      expect(item.optimalTiltDeg).toBeGreaterThanOrEqual(15);
      expect(item.optimalTiltDeg).toBeLessThanOrEqual(60);

      // Bounded ASHRAE temperatures (°F)
      expect(item.winterDesignTempF).toBeGreaterThanOrEqual(-35);
      expect(item.winterDesignTempF).toBeLessThanOrEqual(75);
      expect(item.summerDesignTempF).toBeGreaterThan(65);
      expect(item.summerDesignTempF).toBeLessThan(125);

      // Bounded EIA electricity rate ($/kWh)
      expect(item.electricityRateKwh).toBeGreaterThan(0.05);
      expect(item.electricityRateKwh).toBeLessThan(0.60);

      // Bounded coordinates
      expect(item.latitude).toBeGreaterThan(18);
      expect(item.latitude).toBeLessThan(72);
      expect(item.longitude).toBeLessThan(-65);
      expect(item.longitude).toBeGreaterThan(-180);
    }
  });

  it("looks up regional data by state name or code accurately", () => {
    const california = getRegionalDataByState("CA");
    expect(california).toBeDefined();
    expect(california?.state).toContain("California");
    expect(california?.peakSunHours).toBeGreaterThan(5.0);

    const texas = getRegionalDataByState("Texas (North)");
    expect(texas).toBeDefined();
    expect(texas?.metro).toContain("Dallas");

    const newYork = getRegionalDataByState("ny");
    expect(newYork).toBeDefined();
    expect(newYork?.metro).toContain("New York City");
  });

  it("filters regional entries by query search", () => {
    const results = searchRegionalData("chicago");
    expect(results.length).toBe(1);
    expect(results[0].state).toBe("Illinois");
    expect(results[0].winterDesignTempF).toBeLessThan(0);

    const floridaResults = searchRegionalData("florida");
    expect(floridaResults.length).toBe(2);
  });
});

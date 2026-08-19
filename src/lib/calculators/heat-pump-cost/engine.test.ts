import { describe, it, expect } from "vitest";
import { calculateHeatPumpCost } from "./engine";

describe("calculateHeatPumpCost Engine", () => {
  it("calculates propane heating replacement savings accurately", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 50,
      heatPumpScop: 3.2,
      electricityRate: 0.18,
      existingFuelType: "propane",
      furnaceAfuePercent: 80,
      propanePricePerGallon: 3.20,
    });

    // Delivered BTU = 50,000,000 BTU
    // Heat pump kWh = 50,000,000 / (3412.14 * 3.2) = 4,579 kWh
    // Heat pump cost = 4579 * 0.18 = ~$824/yr
    expect(res.result.heatPumpAnnualCost).toBeCloseTo(824, -1);

    // Propane delivered = 91,500 * 0.8 = 73,200 BTU/gal -> 50,000,000 / 73200 = 683.06 gallons
    // Propane cost = 683 * 3.20 = $2,185/yr
    expect(res.result.existingSystemAnnualCost).toBeGreaterThan(2100);

    // Heat pump should save over $1,300/yr vs propane
    expect(res.result.isHeatPumpCheaper).toBe(true);
    expect(res.result.annualCostDifference).toBeGreaterThan(1200);
  });

  it("calculates heating oil replacement savings correctly", () => {
    const res = calculateHeatPumpCost({
      annualHeatingDemandMmbtu: 60,
      heatPumpScop: 3.0,
      electricityRate: 0.18,
      existingFuelType: "heating_oil",
      furnaceAfuePercent: 80,
      oilPricePerGallon: 4.10,
    });

    expect(res.result.isHeatPumpCheaper).toBe(true);
    expect(res.result.annualCostDifference).toBeGreaterThan(1000);
  });

  it("throws error for zero heating demand or invalid AFUE", () => {
    expect(() =>
      calculateHeatPumpCost({
        annualHeatingDemandMmbtu: 0,
        heatPumpScop: 3.0,
        electricityRate: 0.18,
        existingFuelType: "natural_gas",
        furnaceAfuePercent: 80,
      })
    ).toThrow();
  });
});

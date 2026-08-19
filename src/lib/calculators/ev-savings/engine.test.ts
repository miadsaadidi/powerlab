import { describe, expect, it } from "vitest";
import { calculateEvSavings, type EvSavingsInput } from "./engine";

const base: EvSavingsInput = {
  annualDistance: 15000,
  distanceUnit: "km",
  evConsumption: 18,
  evConsumptionUnit: "kwh-per-100-km",
  electricityPricePerKWh: 0.2,
  chargingEfficiency: 0.9,
  fuelConsumption: 7,
  fuelConsumptionUnit: "l-per-100-km",
  fuelPrice: 1.5,
  fuelPriceUnit: "per-liter",
};

describe("EV Savings engine", () => {
  it("calculates the documented operating-cost fixture", () => {
    const result = calculateEvSavings(base);
    expect(result.evBatteryEnergyKWh).toBeCloseTo(2700);
    expect(result.evGridEnergyKWh).toBeCloseTo(3000);
    expect(result.evEnergyCost).toBeCloseTo(600);
    expect(result.fuelLiters).toBeCloseTo(1050);
    expect(result.fuelCost).toBeCloseTo(1575);
    expect(result.operatingSavings).toBeCloseTo(975);
    expect(result.monthlyOperatingSavings).toBeCloseTo(81.25);
  });

  it("uses maintenance only when both values are supplied", () => {
    const result = calculateEvSavings({ ...base, annualEvMaintenance: 300, annualIceMaintenance: 700 });
    expect(result.maintenanceDifference).toBe(400);
    expect(result.totalComparedSavings).toBeCloseTo(1375);
    expect(result.primarySavings).toBeCloseTo(1375);
    expect(result.primaryScope).toBe("maintenance-adjusted");
    expect(calculateEvSavings({ ...base, annualEvMaintenance: 300 }).primarySavings).toBeCloseTo(975);
  });

  it("normalizes equivalent consumption, economy and price units", () => {
    const km = calculateEvSavings(base);
    const equivalent = calculateEvSavings({
      ...base,
      distanceUnit: "mi",
      annualDistance: 15000 / 1.609344,
      evConsumption: 28.968192,
      evConsumptionUnit: "kwh-per-100-mi",
      fuelConsumption: 33.6020833,
      fuelConsumptionUnit: "us-mpg",
      fuelPrice: 1.5 * 3.785411784,
      fuelPriceUnit: "per-us-gallon",
    });
    expect(equivalent.evBatteryEnergyKWh).toBeCloseTo(km.evBatteryEnergyKWh, 5);
    expect(equivalent.fuelLiters).toBeCloseTo(km.fuelLiters, 5);
    expect(equivalent.fuelPricePerLiter).toBeCloseTo(1.5, 5);
  });

  it("uses the corrected US MPG reference conversion", () => {
    const result = calculateEvSavings(base);
    expect(result.fuelEconomy.usMpg).toBeCloseTo(33.6020833, 6);
    const roundTrip = calculateEvSavings({ ...base, fuelConsumption: result.fuelEconomy.usMpg, fuelConsumptionUnit: "us-mpg" });
    expect(roundTrip.fuelLitersPerKm).toBeCloseTo(0.07, 10);
  });

  it("rejects percentage points passed directly to the engine", () => {
    expect(() => calculateEvSavings({ ...base, chargingEfficiency: 90 })).toThrow();
  });

  it("keeps sensitivity scope aligned with maintenance scope", () => {
    const operating = calculateEvSavings(base);
    const adjusted = calculateEvSavings({ ...base, annualEvMaintenance: 300, annualIceMaintenance: 700 });
    expect(operating.scenarios[0].savings).toBeCloseTo(1575 - 450);
    expect(adjusted.scenarios[0].savings).toBeCloseTo(1575 - 450 + 400);
  });

  it("allows zero prices but rejects negative prices", () => {
    expect(calculateEvSavings({ ...base, electricityPricePerKWh: 0 }).evEnergyCost).toBe(0);
    expect(calculateEvSavings({ ...base, fuelPrice: 0 }).fuelCost).toBe(0);
    expect(() => calculateEvSavings({ ...base, fuelPrice: -0.01 })).toThrow();
  });
});

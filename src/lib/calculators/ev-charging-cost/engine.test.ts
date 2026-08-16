import { describe, expect, it } from "vitest";
import { calculateEvChargingCost, type EvChargingCostInput } from "./engine";

const session: EvChargingCostInput = {
  mode: "session",
  batteryCapacityKWh: 60,
  startSoc: 0.2,
  targetSoc: 0.8,
  pricePerKWh: 0.2,
  sourceToBatteryEfficiency: 0.9,
};

const driving: EvChargingCostInput = {
  mode: "driving",
  consumption: 18,
  consumptionUnit: "kwh-per-100-km",
  distance: 100,
  distanceUnit: "km",
  distancePeriod: "day",
  pricePerKWh: 0.2,
  sourceToBatteryEfficiency: 0.9,
};

describe("EV charging cost engine", () => {
  it("calculates a SOC-aligned usable session capacity", () => {
    const result = calculateEvChargingCost(session);
    expect(result.batteryEnergyKWh).toBeCloseTo(36);
    expect(result.sourceEnergyKWh).toBeCloseTo(40);
    expect(result.selectedPeriodCost).toBeCloseTo(8);
  });

  it("calculates battery-side driving consumption and source cost", () => {
    const result = calculateEvChargingCost(driving);
    expect(result.batteryEnergyKWh).toBe(18);
    expect(result.sourceEnergyKWh).toBe(20);
    expect(result.costPer100Km).toBe(4);
    expect(result.costPer100Mi).toBeCloseTo(6.437376);
  });

  it("normalizes miles and kWh per 100 miles independently", () => {
    const result = calculateEvChargingCost({ ...driving, consumption: 28.968192, consumptionUnit: "kwh-per-100-mi", distance: 100, distanceUnit: "mi" });
    expect(result.batteryConsumptionKWhPerKm).toBeCloseTo(0.18);
    expect(result.batteryEnergyKWh).toBeCloseTo(28.968192);
  });

  it("normalizes equivalent day, week, month and year periods consistently", () => {
    const fromDay = calculateEvChargingCost({ ...driving, distance: 40 });
    const fromWeek = calculateEvChargingCost({ ...driving, distance: 280, distancePeriod: "week" });
    const fromMonth = calculateEvChargingCost({ ...driving, distance: 1217.5, distancePeriod: "month" });
    const fromYear = calculateEvChargingCost({ ...driving, distance: 14610, distancePeriod: "year" });
    expect(fromWeek.dailyCost).toBeCloseTo(fromDay.dailyCost);
    expect(fromMonth.dailyCost).toBeCloseTo(fromDay.dailyCost);
    expect(fromYear.dailyCost).toBeCloseTo(fromDay.dailyCost);
    expect(fromWeek.selectedPeriodCost).toBeCloseTo(11.2);
    expect(fromWeek.selectedPeriodLabel).toBe("week");
  });

  it("allows zero distance while retaining normalized unit costs", () => {
    const result = calculateEvChargingCost({ ...driving, distance: 0 });
    expect(result.batteryEnergyKWh).toBe(0);
    expect(result.selectedPeriodCost).toBe(0);
    expect(result.costPer100Km).toBe(4);
    expect(result.costPer100Mi).toBeCloseTo(6.437376);
  });

  it("supports source or wall consumption figures with 100 percent efficiency", () => {
    const result = calculateEvChargingCost({ ...driving, sourceToBatteryEfficiency: 1 });
    expect(result.sourceEnergyKWh).toBe(18);
    expect(result.costPer100Km).toBe(3.6);
  });

  it("changes only electricity price in scenarios", () => {
    const result = calculateEvChargingCost(session);
    expect(result.scenarios.map((scenario) => scenario.pricePerKWh)).toEqual([0.15, 0.2, 0.25].map((value) => expect.closeTo(value, 10)));
    expect(result.scenarios.map((scenario) => scenario.cost)).toEqual([6, 8, 10].map((value) => expect.closeTo(value, 10)));
  });

  it("rejects invalid values and SOC relationships", () => {
    expect(() => calculateEvChargingCost({ ...session, targetSoc: 0.2 })).toThrow();
    expect(() => calculateEvChargingCost({ ...driving, distance: -1 })).toThrow();
    expect(() => calculateEvChargingCost({ ...driving, consumption: 0 })).toThrow();
    expect(() => calculateEvChargingCost({ ...driving, pricePerKWh: -0.01 })).toThrow();
  });
});

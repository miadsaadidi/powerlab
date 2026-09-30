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
  consumptionBasis: "battery-consumption",
};

describe("EV charging cost engine", () => {
  describe("Canonical session cost arithmetic", () => {
    it("calculates 60 kWh, 20% -> 80%, 90% efficiency @ $0.20/kWh = $8.00", () => {
      const result = calculateEvChargingCost({
        mode: "session",
        batteryCapacityKwh: 60,
        startSocPercent: 20,
        targetSocPercent: 80,
        sourceToBatteryEfficiency: 0.90,
        pricePerKWh: 0.20,
      });

      expect(result.batteryEnergyAddedKwh).toBeCloseTo(36.0, 5);
      expect(result.sourceEnergyKwh).toBeCloseTo(40.0, 5);
      expect(result.sessionCost).toBeCloseTo(8.00, 5);
      expect(result.selectedPeriodCost).toBeCloseTo(8.00, 5);
    });

    it("calculates 65 kWh, 10% -> 80%, 90% efficiency @ $0.165/kWh = $8.34", () => {
      const result = calculateEvChargingCost({
        mode: "session",
        batteryCapacityKwh: 65,
        startSocPercent: 10,
        targetSocPercent: 80,
        sourceToBatteryEfficiency: 0.90,
        pricePerKWh: 0.165,
      });

      expect(result.batteryEnergyAddedKwh).toBeCloseTo(45.5, 5);
      expect(result.sourceEnergyKwh).toBeCloseTo(45.5 / 0.90, 5); // 50.5555... kWh
      expect(result.sessionCost).toBeCloseTo(8.341666, 4); // ~$8.34
      expect(Number(result.sessionCost.toFixed(2))).toBe(8.34);
    });

    it("calculates 50 kWh, 10% -> 100% (90% delta), 90% efficiency @ $0.10/kWh = $5.00", () => {
      const result = calculateEvChargingCost({
        mode: "session",
        batteryCapacityKwh: 50,
        startSocPercent: 10,
        targetSocPercent: 100,
        sourceToBatteryEfficiency: 0.90,
        pricePerKWh: 0.10,
      });

      expect(result.batteryEnergyAddedKwh).toBeCloseTo(45.0, 5);
      expect(result.sourceEnergyKwh).toBeCloseTo(50.0, 5);
      expect(result.sessionCost).toBeCloseTo(5.00, 5);
    });

    it("returns zero cost when start SOC equals target SOC", () => {
      const result = calculateEvChargingCost({
        mode: "session",
        batteryCapacityKwh: 60,
        startSocPercent: 50,
        targetSocPercent: 50,
        sourceToBatteryEfficiency: 0.90,
        pricePerKWh: 0.20,
      });

      expect(result.batteryEnergyAddedKwh).toBe(0);
      expect(result.sourceEnergyKwh).toBe(0);
      expect(result.sessionCost).toBe(0);
    });
  });

  describe("Driving cost & consumption basis (wall vs battery)", () => {
    it("calculates battery-side driving consumption with one efficiency conversion", () => {
      const result = calculateEvChargingCost(driving);
      expect(result.batteryEnergyKWh).toBe(18);
      expect(result.sourceEnergyKWh).toBeCloseTo(20);
      expect(result.costPer100Km).toBeCloseTo(4.0);
      expect(result.costPer100Mi).toBeCloseTo(6.437376, 5);
      expect(result.costPerKm).toBeCloseTo(0.04);
      expect(result.costPerMile).toBeCloseTo(0.06437376, 5);
    });

    it("calculates wall/source consumption (EPA label) with NO additional efficiency division", () => {
      const result = calculateEvChargingCost({
        ...driving,
        consumption: 20, // 20 kWh/100 km at the wall
        consumptionBasis: "wall-consumption",
        sourceToBatteryEfficiency: 0.90,
        pricePerKWh: 0.20,
      });

      // Cost per 100 km should be 20 kWh * $0.20 = $4.00 (not divided by 0.90 again!)
      expect(result.sourceEnergyKWh).toBe(20);
      expect(result.costPer100Km).toBeCloseTo(4.0);
      expect(result.batteryEnergyKWh).toBeCloseTo(18); // 20 * 0.90
    });

    it("normalizes miles and kWh per 100 miles independently", () => {
      const result = calculateEvChargingCost({
        ...driving,
        consumption: 28.968192,
        consumptionUnit: "kwh-per-100-mi",
        distance: 100,
        distanceUnit: "mi",
      });
      expect(result.batteryConsumptionKWhPerKm).toBeCloseTo(0.18);
      expect(result.batteryEnergyKWh).toBeCloseTo(28.968192);
    });

    it("evaluates cost per mile for 3.5 mi/kWh at $0.16/kWh as ~$0.046/mi", () => {
      // 3.5 mi/kWh = 100 / 3.5 = 28.5714 kWh / 100 mi (wall consumption)
      const result = calculateEvChargingCost({
        mode: "driving",
        consumption: 100 / 3.5,
        consumptionUnit: "kwh-per-100-mi",
        consumptionBasis: "wall-consumption",
        distance: 1,
        distanceUnit: "mi",
        distancePeriod: "day",
        pricePerKWh: 0.16,
      });

      expect(result.costPerMile).toBeCloseTo(0.16 / 3.5, 5); // 0.045714
      expect(Number(result.costPerMile?.toFixed(3))).toBe(0.046);
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
  });

  describe("Validation & error handling", () => {
    it("rejects invalid target SOC < start SOC", () => {
      expect(() =>
        calculateEvChargingCost({
          ...session,
          startSoc: 0.8,
          targetSoc: 0.2,
        })
      ).toThrow("Target charge must be greater than or equal to starting charge");
    });

    it("rejects zero or negative battery capacity", () => {
      expect(() =>
        calculateEvChargingCost({
          ...session,
          batteryCapacityKwh: 0,
        })
      ).toThrow("usable battery capacity greater than zero");
      expect(() =>
        calculateEvChargingCost({
          ...session,
          batteryCapacityKwh: -50,
        })
      ).toThrow("usable battery capacity greater than zero");
    });

    it("rejects efficiency <= 0 or > 100%", () => {
      expect(() =>
        calculateEvChargingCost({
          ...session,
          sourceToBatteryEfficiency: 0,
        })
      ).toThrow("Source-to-battery efficiency must be greater than 0%");
      expect(() =>
        calculateEvChargingCost({
          ...session,
          sourceToBatteryEfficiency: 1.05,
        })
      ).toThrow("Source-to-battery efficiency must be greater than 0%");
    });

    it("rejects negative electricity prices", () => {
      expect(() =>
        calculateEvChargingCost({
          ...session,
          pricePerKWh: -0.05,
        })
      ).toThrow("Electricity price must be zero or greater");
    });

    it("changes only electricity price in price scenarios", () => {
      const result = calculateEvChargingCost(session);
      expect(result.scenarios.map((s) => s.pricePerKWh)).toEqual([0.15, 0.2, 0.25].map((v) => expect.closeTo(v, 10)));
      expect(result.scenarios.map((s) => s.cost)).toEqual([6, 8, 10].map((v) => expect.closeTo(v, 10)));
    });
  });
});

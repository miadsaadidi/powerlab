import { describe, expect, it } from "vitest";
import { calculateEvSavings, type EvSavingsInput } from "./engine";

const canonicalCase: EvSavingsInput = {
  annualDistance: 12000,
  distanceUnit: "mi",
  evConsumption: 3.5,
  evConsumptionUnit: "mi-per-kwh",
  electricityPricePerKWh: 0.16,
  chargingEfficiency: 0.90,
  fuelConsumption: 28,
  fuelConsumptionUnit: "us-mpg",
  fuelPrice: 3.50,
  fuelPriceUnit: "per-us-gallon",
};

describe("EV Savings engine", () => {
  describe("Item 11 Required Validation Tests", () => {
    it("Test A: 12,000 mi, 3.5 mi/kWh, 90% eff, $0.16/kWh, 28 MPG, $3.50/gal -> EV ~$609.52, Gas $1,500, Savings ~$890.48", () => {
      const result = calculateEvSavings(canonicalCase);

      expect(result.fuelGallons).toBeCloseTo(12000 / 28, 5); // 428.5714 gal
      expect(result.fuelCost).toBeCloseTo(1500.0, 5); // $1,500.00
      expect(result.evBatteryEnergyKWh).toBeCloseTo(12000 / 3.5, 5); // 3,428.5714 kWh
      expect(result.evGridEnergyKWh).toBeCloseTo(12000 / 3.5 / 0.90, 5); // 3,809.5238 kWh
      expect(result.evEnergyCost).toBeCloseTo((12000 / 3.5 / 0.90) * 0.16, 5); // $609.5238
      expect(result.operatingSavings).toBeCloseTo(1500 - (12000 / 3.5 / 0.90) * 0.16, 5); // $890.47619
      expect(Number(result.evEnergyCost.toFixed(2))).toBe(609.52);
      expect(Number(result.operatingSavings.toFixed(2))).toBe(890.48);
    });

    it("Test B: Efficiency = 100% -> EV = 12,000 / 3.5 * $0.16 = ~$548.57", () => {
      const result = calculateEvSavings({
        ...canonicalCase,
        chargingEfficiency: 1.0,
      });

      expect(result.evGridEnergyKWh).toBeCloseTo(12000 / 3.5, 5);
      expect(result.evEnergyCost).toBeCloseTo((12000 / 3.5) * 0.16, 5);
      expect(Number(result.evEnergyCost.toFixed(2))).toBe(548.57);
    });

    it("Test C: Efficiency = 80% -> EV = 12,000 / 3.5 / 0.80 * $0.16 = $685.71", () => {
      const result = calculateEvSavings({
        ...canonicalCase,
        chargingEfficiency: 0.80,
      });

      expect(result.evGridEnergyKWh).toBeCloseTo(12000 / 3.5 / 0.80, 5);
      expect(result.evEnergyCost).toBeCloseTo((12000 / 3.5 / 0.80) * 0.16, 5);
      expect(Number(result.evEnergyCost.toFixed(2))).toBe(685.71);
    });

    it("Test D: 8,000 miles -> Gas $1,000, EV ~$406.35, Savings ~$593.65", () => {
      const result = calculateEvSavings({
        ...canonicalCase,
        annualDistance: 8000,
      });

      expect(result.fuelCost).toBeCloseTo((8000 / 28) * 3.50, 5); // $1,000.00
      expect(result.evEnergyCost).toBeCloseTo((8000 / 3.5 / 0.90) * 0.16, 5); // ~$406.35
      expect(result.operatingSavings).toBeCloseTo(1000 - (8000 / 3.5 / 0.90) * 0.16, 5); // ~$593.65
      expect(Number(result.fuelCost.toFixed(2))).toBe(1000.00);
      expect(Number(result.evEnergyCost.toFixed(2))).toBe(406.35);
      expect(Number(result.operatingSavings.toFixed(2))).toBe(593.65);
    });

    it("Test E: Unit conversions produce equivalent physical energies", () => {
      // 3.5 mi/kWh in kWh/100 mi = 100 / 3.5 = 28.571428... kWh/100 mi
      const fromMiPerKwh = calculateEvSavings(canonicalCase);
      const fromKwhPer100Mi = calculateEvSavings({
        ...canonicalCase,
        evConsumption: 100 / 3.5,
        evConsumptionUnit: "kwh-per-100-mi",
      });
      const fromKwhPer100Km = calculateEvSavings({
        ...canonicalCase,
        evConsumption: (100 / 3.5) / 1.609344,
        evConsumptionUnit: "kwh-per-100-km",
      });

      expect(fromKwhPer100Mi.evBatteryEnergyKWh).toBeCloseTo(fromMiPerKwh.evBatteryEnergyKWh, 5);
      expect(fromKwhPer100Km.evBatteryEnergyKWh).toBeCloseTo(fromMiPerKwh.evBatteryEnergyKWh, 5);
      expect(fromKwhPer100Mi.evEnergyCost).toBeCloseTo(fromMiPerKwh.evEnergyCost, 5);
      expect(fromKwhPer100Km.evEnergyCost).toBeCloseTo(fromMiPerKwh.evEnergyCost, 5);
    });

    it("Test G: Validation boundaries rejection", () => {
      // distance <= 0
      expect(() => calculateEvSavings({ ...canonicalCase, annualDistance: 0 })).toThrow("Annual distance must be greater than zero");
      expect(() => calculateEvSavings({ ...canonicalCase, annualDistance: -100 })).toThrow("Annual distance must be greater than zero");

      // EV consumption <= 0
      expect(() => calculateEvSavings({ ...canonicalCase, evConsumption: 0 })).toThrow("EV battery consumption must be greater than zero");
      expect(() => calculateEvSavings({ ...canonicalCase, evConsumption: -5 })).toThrow("EV battery consumption must be greater than zero");

      // Fuel consumption <= 0
      expect(() => calculateEvSavings({ ...canonicalCase, fuelConsumption: 0 })).toThrow("Fuel consumption must be greater than zero");

      // Negative prices
      expect(() => calculateEvSavings({ ...canonicalCase, electricityPricePerKWh: -0.01 })).toThrow("Electricity price must be zero or greater");
      expect(() => calculateEvSavings({ ...canonicalCase, fuelPrice: -0.5 })).toThrow("Fuel price must be zero or greater");

      // Efficiency <= 0 or > 100%
      expect(() => calculateEvSavings({ ...canonicalCase, chargingEfficiency: 0 })).toThrow("Charging efficiency must be greater than 0");
      expect(() => calculateEvSavings({ ...canonicalCase, chargingEfficiency: 1.05 })).toThrow("Charging efficiency must be no more than 100%");
      expect(() => calculateEvSavings({ ...canonicalCase, chargingEfficiency: 105 })).toThrow("Charging efficiency must be no more than 100%");
    });
  });

  describe("Maintenance comparison features", () => {
    it("incorporates maintenance when both values are provided", () => {
      const result = calculateEvSavings({
        ...canonicalCase,
        annualEvMaintenance: 300,
        annualIceMaintenance: 700,
      });

      expect(result.maintenanceDifference).toBe(400);
      expect(result.primaryScope).toBe("maintenance-adjusted");
      expect(result.totalComparedSavings).toBeCloseTo(result.operatingSavings + 400, 5);
      expect(result.primarySavings).toBeCloseTo(result.operatingSavings + 400, 5);
    });
  });
});

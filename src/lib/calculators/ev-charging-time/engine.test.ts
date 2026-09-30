import { describe, expect, it } from "vitest";
import { calculateEvChargingTime } from "./engine";
import { EV_CHARGERS, resolveChargerPreset } from "@/data/ev-charging-defaults";

const base = {
  batteryCapacityKwh: 60,
  startSoc: 0.2,
  targetSoc: 0.8,
  chargerPowerKw: 7.68,
  chargingType: "AC" as const,
  acEfficiency: 0.90,
  dcEfficiency: 0.93,
  dcTaperMode: "generic" as const,
};

describe("EV charging time engine", () => {
  describe("AC arithmetic requirements", () => {
    it("calculates 60 kWh, 20% -> 80%, 7.68 kW @ 90% efficiency", () => {
      const result = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 20,
        targetSocPercent: 80,
        chargerPowerKw: 7.68,
        chargingType: "AC",
        acEfficiency: 0.90,
      }).result;

      expect(result.batteryEnergyAddedKWh).toBeCloseTo(36.0, 5);
      expect(result.effectiveAcInputPowerKw).toBe(7.68);
      expect(result.averageBatteryChargingPowerKw).toBeCloseTo(7.68 * 0.90, 5); // 6.912 kW
      expect(result.timeHours).toBeCloseTo(36 / (7.68 * 0.90), 5); // ~5.20833 hrs (5h 12.5m)
      expect(result.gridEnergyKWh).toBeCloseTo(36 / 0.90, 5); // 40 kWh
    });

    it("calculates 75 kWh, 20% -> 80%, 11.52 kW @ 90% efficiency", () => {
      const result = calculateEvChargingTime({
        batteryCapacityKwh: 75,
        startSocPercent: 20,
        targetSocPercent: 80,
        chargerPowerKw: 11.52,
        chargingType: "AC",
        acEfficiency: 0.90,
      }).result;

      expect(result.batteryEnergyAddedKWh).toBeCloseTo(45.0, 5);
      expect(result.effectiveAcInputPowerKw).toBe(11.52);
      expect(result.averageBatteryChargingPowerKw).toBeCloseTo(11.52 * 0.90, 5); // 10.368 kW
      expect(result.timeHours).toBeCloseTo(45 / (11.52 * 0.90), 5); // ~4.34028 hrs (4h 20.4m)
      expect(result.gridEnergyKWh).toBeCloseTo(45 / 0.90, 5); // 50 kWh
    });

    it("verifies standard voltage and current electrical power math", () => {
      expect((120 * 12) / 1000).toBe(1.44); // 120V / 12A = 1.44 kW
      expect((120 * 16) / 1000).toBe(1.92); // 120V / 16A = 1.92 kW
      expect((240 * 16) / 1000).toBe(3.84); // 240V / 16A = 3.84 kW
      expect((240 * 24) / 1000).toBe(5.76); // 240V / 24A = 5.76 kW
      expect((240 * 32) / 1000).toBe(7.68); // 240V / 32A = 7.68 kW
      expect((240 * 40) / 1000).toBe(9.60); // 240V / 40A = 9.60 kW
      expect((240 * 48) / 1000).toBe(11.52); // 240V / 48A = 11.52 kW
    });
  });

  describe("SOC validation & normalization", () => {
    it("handles start === target cleanly without division by zero", () => {
      const result = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 20,
        targetSocPercent: 20,
        chargerPowerKw: 7.68,
        chargingType: "AC",
      }).result;

      expect(result.batteryEnergyAddedKWh).toBe(0);
      expect(result.timeHours).toBe(0);
      expect(result.gridEnergyKWh).toBe(0);
    });

    it("throws error when target < start", () => {
      expect(() =>
        calculateEvChargingTime({
          ...base,
          startSocPercent: 80,
          targetSocPercent: 20,
        })
      ).toThrow("Target charge must be greater than or equal to starting charge");
    });

    it("handles full range boundary start = 0 and target = 100", () => {
      const result = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 0,
        targetSocPercent: 100,
        chargerPowerKw: 7.68,
        chargingType: "AC",
        acEfficiency: 0.90,
      }).result;

      expect(result.batteryEnergyAddedKWh).toBe(60);
      expect(result.timeHours).toBeCloseTo(60 / (7.68 * 0.90), 5);
    });

    it("rejects invalid negative SOC values", () => {
      expect(() =>
        calculateEvChargingTime({ ...base, startSoc: -5, targetSoc: 80 })
      ).toThrow("between 0% and 100%");
      expect(() =>
        calculateEvChargingTime({ ...base, startSocPercent: 20, targetSocPercent: -10 })
      ).toThrow("between 0% and 100%");
    });

    it("rejects invalid SOC values greater than 100%", () => {
      expect(() =>
        calculateEvChargingTime({ ...base, startSoc: 105, targetSoc: 80 })
      ).toThrow("between 0% and 100%");
      expect(() =>
        calculateEvChargingTime({ ...base, startSocPercent: 20, targetSocPercent: 110 })
      ).toThrow("between 0% and 100%");
    });
  });

  describe("Vehicle acceptance limits", () => {
    it("caps AC input power when EVSE power > vehicle acceptance", () => {
      const result = calculateEvChargingTime({
        ...base,
        chargerPowerKw: 11.52,
        vehicleMaxAcPowerKw: 7.68,
      }).result;

      expect(result.effectiveAcInputPowerKw).toBe(7.68);
      expect(result.limitingFactor).toBe("vehicle-ac-charging-limit");
      expect(result.averageBatteryChargingPowerKw).toBeCloseTo(7.68 * 0.90);
    });

    it("uses EVSE power when vehicle acceptance > EVSE power", () => {
      const result = calculateEvChargingTime({
        ...base,
        chargerPowerKw: 7.68,
        vehicleMaxAcPowerKw: 11.52,
      }).result;

      expect(result.effectiveAcInputPowerKw).toBe(7.68);
      expect(result.limitingFactor).toBe("vehicle-limit-unknown");
    });

    it("handles EVSE power equal to vehicle acceptance", () => {
      const result = calculateEvChargingTime({
        ...base,
        chargerPowerKw: 7.68,
        vehicleMaxAcPowerKw: 7.68,
      }).result;

      expect(result.effectiveAcInputPowerKw).toBe(7.68);
      expect(result.limitingFactor).toBe("vehicle-limit-unknown");
    });
  });

  describe("DC charging model & taper behavior", () => {
    it("does not treat charger power as guaranteed constant battery power under generic taper", () => {
      const result = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 150,
      }).result;

      expect(result.averageBatteryChargingPowerKw).toBeLessThan(150);
      expect(result.taperMode).toBe("generic");
    });

    it("applies taper when target SOC enters taper region (>50%)", () => {
      // 0% to 50% (no taper penalty, factor 1.0)
      const lowSoc = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 10,
        targetSocPercent: 50,
        chargerPowerKw: 100,
        chargingType: "DC",
        dcTaperMode: "generic",
      }).result;

      const lowSocConstant = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 10,
        targetSocPercent: 50,
        chargerPowerKw: 100,
        chargingType: "DC",
        dcTaperMode: "constant",
      }).result;

      // Below taper threshold (<= 50%), generic taper must match constant power exactly!
      expect(lowSoc.timeHours).toBeCloseTo(lowSocConstant.timeHours, 5);
      expect(lowSoc.averageBatteryChargingPowerKw).toBeCloseTo(100, 5);

      // But entering 50% to 80% introduces taper
      const highSoc = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 10,
        targetSocPercent: 80,
        chargerPowerKw: 100,
        chargingType: "DC",
        dcTaperMode: "generic",
      }).result;

      const highSocConstant = calculateEvChargingTime({
        batteryCapacityKwh: 60,
        startSocPercent: 10,
        targetSocPercent: 80,
        chargerPowerKw: 100,
        chargingType: "DC",
        dcTaperMode: "constant",
      }).result;

      expect(highSoc.timeHours).toBeGreaterThan(highSocConstant.timeHours);
      expect(highSoc.averageBatteryChargingPowerKw).toBeLessThan(100);
    });

    it("changing vehicle DC acceptance changes result when vehicle is the bottleneck", () => {
      const limitedVehicle = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 150,
        vehicleMaxDcPowerKw: 50,
      }).result;

      const capableVehicle = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 150,
        vehicleMaxDcPowerKw: 150,
      }).result;

      expect(limitedVehicle.timeHours).toBeGreaterThan(capableVehicle.timeHours);
      expect(limitedVehicle.limitingFactor).toBe("vehicle-dc-charging-limit");
      expect(capableVehicle.limitingFactor).toBe("vehicle-limit-unknown");
    });

    it("changing charger power above vehicle DC limit does NOT change result", () => {
      const atVehicleLimit = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 50,
        vehicleMaxDcPowerKw: 50,
      }).result;

      const aboveVehicleLimit = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 350,
        vehicleMaxDcPowerKw: 50,
      }).result;

      expect(aboveVehicleLimit.timeHours).toBeCloseTo(atVehicleLimit.timeHours, 5);
      expect(aboveVehicleLimit.averageBatteryChargingPowerKw).toBeCloseTo(atVehicleLimit.averageBatteryChargingPowerKw, 5);
    });

    it("does not let DC source efficiency alter battery charging time", () => {
      const lowEff = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 50,
        dcEfficiency: 0.90,
      }).result;

      const highEff = calculateEvChargingTime({
        ...base,
        chargingType: "DC",
        chargerPowerKw: 50,
        dcEfficiency: 0.95,
      }).result;

      expect(lowEff.timeHours).toBe(highEff.timeHours);
      expect(lowEff.gridEnergyKWh).toBeGreaterThan(highEff.gridEnergyKWh);
    });
  });

  describe("Canonical presets consistency", () => {
    it("ensures canonical presets have matching power and voltage configurations", () => {
      expect(EV_CHARGERS.length).toBe(10);
      const l1_12a = resolveChargerPreset("l1-12a");
      expect(l1_12a).toBeDefined();
      expect(l1_12a?.powerKw).toBe(1.44);

      const l2_32a = resolveChargerPreset("l2-32a");
      expect(l2_32a).toBeDefined();
      expect(l2_32a?.powerKw).toBe(7.68);

      const l2_48a = resolveChargerPreset("l2-48a");
      expect(l2_48a).toBeDefined();
      expect(l2_48a?.powerKw).toBe(11.52);

      const dc150 = resolveChargerPreset("dc-150");
      expect(dc150).toBeDefined();
      expect(dc150?.powerKw).toBe(150);
    });

    it("resolves legacy preset IDs cleanly", () => {
      expect(resolveChargerPreset("ac-7.2")?.id).toBe("l2-32a");
      expect(resolveChargerPreset("ac-11")?.id).toBe("l2-48a");
      expect(resolveChargerPreset("ac-1.4")?.id).toBe("l1-12a");
    });
  });
});

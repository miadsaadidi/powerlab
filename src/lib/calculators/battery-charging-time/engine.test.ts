import { describe, expect, it } from "vitest";
import { calculateBatteryChargingTime, type BatteryChargingTimeInput } from "./engine";

const shared = {
  startSoc: 0.2,
  targetSoc: 1,
  batteryChargeEfficiency: 0.99,
  planningOverheadEnabled: true,
  planningOverheadFactor: 1.05,
  chemistry: "LiFePO4 / LFP",
};

const ahInput = (overrides: Partial<Extract<BatteryChargingTimeInput, { mode: "ah-amps" }>> = {}): BatteryChargingTimeInput => ({
  mode: "ah-amps",
  capacityAh: 100,
  chargerCurrentA: 20,
  ...shared,
  ...overrides,
});

const powerInput = (overrides: Partial<Extract<BatteryChargingTimeInput, { mode: "energy-power" }>> = {}): BatteryChargingTimeInput => ({
  mode: "energy-power",
  capacity: 1_200,
  capacityUnit: "wh",
  chargerOutputPower: 300,
  chargerPowerUnit: "w",
  ...shared,
  ...overrides,
});

describe("calculateBatteryChargingTime", () => {
  it("calculates the documented Ah default fixture", () => {
    const result = calculateBatteryChargingTime(ahInput());

    expect(result.result.chargeAh).toBe(80);
    expect(result.result.selectedChargerRate).toBe(20);
    expect(result.result.effectiveChargerRate).toBe(20);
    expect(result.result.idealHours).toBe(4);
    expect(result.result.adjustedHours).toBeCloseTo(4.242424, 6);
    expect(result.result.limitingFactor).toBe("charger-output");
  });

  it("caps effective current at the known battery maximum", () => {
    const result = calculateBatteryChargingTime(ahInput({ chargerCurrentA: 20, batteryMaxChargeCurrentA: 10 }));

    expect(result.result.selectedChargerRate).toBe(20);
    expect(result.result.effectiveChargerRate).toBe(10);
    expect(result.result.limitingFactor).toBe("battery-charge-limit");
    expect(result.result.batteryLimit).toBe(10);
  });

  it("reports charger output when the battery maximum is unknown", () => {
    const result = calculateBatteryChargingTime(ahInput({ chargerCurrentA: 20 }));

    expect(result.result.limitingFactor).toBe("charger-output");
    expect(result.warnings.map((warning) => warning.code)).toContain("UNKNOWN_BATTERY_CHARGE_LIMIT");
  });

  it("normalizes power mode and caps effective output power", () => {
    const result = calculateBatteryChargingTime(powerInput({ capacity: 1.2, capacityUnit: "kwh", chargerOutputPower: 1_000, chargerPowerUnit: "w", batteryMaxChargePowerW: 600 }));

    expect(result.result.energyToAddWh).toBe(960);
    expect(result.result.selectedChargerRate).toBe(1_000);
    expect(result.result.effectiveChargerRate).toBe(600);
    expect(result.result.limitingFactor).toBe("battery-charge-limit");
    expect(result.result.idealHours).toBeCloseTo(1.6);
  });

  it("keeps voltage independent from charging time", () => {
    const twelve = calculateBatteryChargingTime(ahInput({ voltage: 12 }));
    const twelveEight = calculateBatteryChargingTime(ahInput({ voltage: 12.8 }));
    const fortyEight = calculateBatteryChargingTime(ahInput({ voltage: 48 }));

    expect(twelve.result.idealHours).toBe(twelveEight.result.idealHours);
    expect(twelve.result.adjustedHours).toBe(twelveEight.result.adjustedHours);
    expect(twelve.result.adjustedHours).toBe(fortyEight.result.adjustedHours);
  });

  it("applies efficiency and planning overhead independently", () => {
    expect(calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 1, planningOverheadFactor: 1, planningOverheadEnabled: true })).result.adjustedHours).toBe(4);
    expect(calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 0.8, planningOverheadFactor: 1, planningOverheadEnabled: true })).result.adjustedHours).toBe(5);
    expect(calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 1, planningOverheadFactor: 1.1, planningOverheadEnabled: true })).result.adjustedHours).toBeCloseTo(4.4);
    expect(calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 0.8, planningOverheadFactor: 1.1, planningOverheadEnabled: true })).result.adjustedHours).toBeCloseTo(5.5);
    expect(calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 0.8, planningOverheadFactor: 1.1, planningOverheadEnabled: false })).result.adjustedHours).toBeCloseTo(5);
  });

  it("rejects invalid SOC, capacity, rate and efficiency values", () => {
    expect(() => calculateBatteryChargingTime(ahInput({ targetSoc: 0.2 }))).toThrow("Target charge must be above starting charge");
    expect(() => calculateBatteryChargingTime(ahInput({ targetSoc: 1.1 }))).toThrow("Target charge must be between 0% and 100%");
    expect(() => calculateBatteryChargingTime(ahInput({ capacityAh: 0 }))).toThrow("Battery capacity must be greater than zero");
    expect(() => calculateBatteryChargingTime(ahInput({ chargerCurrentA: -1 }))).toThrow("Charger current must be greater than zero");
    expect(() => calculateBatteryChargingTime(ahInput({ batteryChargeEfficiency: 0 }))).toThrow("Battery charge efficiency must be greater than 0%");
  });

  it("keeps full precision for normalized values", () => {
    const result = calculateBatteryChargingTime(powerInput({ capacity: 1.2345, capacityUnit: "kwh", chargerOutputPower: 123.45, chargerPowerUnit: "w", startSoc: 0.1, targetSoc: 0.9, batteryChargeEfficiency: 1, planningOverheadEnabled: false, planningOverheadFactor: 1 }));

    expect(result.result.energyToAddWh).toBeCloseTo(987.6, 10);
    expect(result.result.idealHours).toBeCloseTo(8, 10);
  });
});

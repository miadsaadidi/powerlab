import { describe, expect, it } from "vitest";
import { calculateEvChargingTime } from "./engine";

const base = { batteryCapacityKwh: 60, startSoc: 0.2, targetSoc: 0.8, chargerPowerKw: 7.2, chargingType: "AC" as const, acEfficiency: 0.9, dcEfficiency: 0.93, dcTaperMode: "generic" as const };

describe("EV charging time engine", () => {
  it("calculates the default AC fixture using input power and efficiency", () => {
    const result = calculateEvChargingTime(base).result;
    expect(result.batteryEnergyAddedKWh).toBeCloseTo(36);
    expect(result.effectiveAcInputPowerKw).toBe(7.2);
    expect(result.averageBatteryChargingPowerKw).toBeCloseTo(6.48);
    expect(result.timeHours).toBeCloseTo(5.5555556);
    expect(result.gridEnergyKWh).toBeCloseTo(40);
  });

  it("caps AC input power at the vehicle AC limit", () => {
    const result = calculateEvChargingTime({ ...base, chargerPowerKw: 11, vehicleMaxAcPowerKw: 7.2 }).result;
    expect(result.effectiveAcInputPowerKw).toBe(7.2);
    expect(result.limitingFactor).toBe("vehicle-ac-charging-limit");
  });

  it("caps DC battery power at the vehicle DC limit", () => {
    const result = calculateEvChargingTime({ ...base, chargingType: "DC", chargerPowerKw: 150, vehicleMaxDcPowerKw: 50 }).result;
    expect(result.baseDcBatteryPowerKw).toBe(50);
    expect(result.limitingFactor).toBe("vehicle-dc-charging-limit");
  });

  it("calculates the documented generic DC taper", () => {
    const result = calculateEvChargingTime({ ...base, chargingType: "DC", chargerPowerKw: 50 }).result;
    expect(result.batteryEnergyAddedKWh).toBeCloseTo(36);
    expect(result.timeHours).toBeCloseTo(0.81);
    expect(result.averageBatteryChargingPowerKw).toBeCloseTo(44.444444);
    expect(result.gridEnergyKWh).toBeCloseTo(36 / 0.93);
  });

  it("does not let DC efficiency change charging time", () => {
    const low = calculateEvChargingTime({ ...base, chargingType: "DC", chargerPowerKw: 50, dcEfficiency: 0.9 }).result;
    const high = calculateEvChargingTime({ ...base, chargingType: "DC", chargerPowerKw: 50, dcEfficiency: 0.95 }).result;
    expect(high.timeHours).toBe(low.timeHours);
    expect(low.gridEnergyKWh).toBeCloseTo(40);
    expect(high.gridEnergyKWh).toBeCloseTo(36 / 0.95);
  });

  it("uses idealized constant DC power when selected", () => {
    const result = calculateEvChargingTime({ ...base, chargingType: "DC", chargerPowerKw: 50, dcTaperMode: "constant" }).result;
    expect(result.timeHours).toBeCloseTo(36 / 50);
    expect(result.taperMode).toBe("constant");
  });

  it("returns an honest unknown vehicle-limit state", () => {
    expect(calculateEvChargingTime(base).result.limitingFactor).toBe("vehicle-limit-unknown");
  });

  it("rejects invalid SOC, power and charging types", () => {
    expect(() => calculateEvChargingTime({ ...base, chargerPowerKw: 0 })).toThrow("charger power");
    expect(() => calculateEvChargingTime({ ...base, targetSoc: 0.2 })).toThrow("Target charge");
    expect(() => calculateEvChargingTime({ ...base, chargingType: "ACX" as "AC" })).toThrow("Choose AC or DC");
  });

  it("keeps AC monotonic with charger power and efficiency", () => {
    const slower = calculateEvChargingTime({ ...base, chargerPowerKw: 7.2, acEfficiency: 0.9 }).result;
    const faster = calculateEvChargingTime({ ...base, chargerPowerKw: 11, acEfficiency: 0.95 }).result;
    expect(faster.timeHours).toBeLessThan(slower.timeHours);
  });
});

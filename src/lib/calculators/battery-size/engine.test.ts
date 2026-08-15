import { describe, expect, it } from "vitest";
import { calculateBatterySize } from "./engine";

const defaults = { loadWatts: 500, loadType: "ac" as const, runtimeHours: 4, startingSoc: 1, reserveSoc: 0.2, batteryHealth: 1, acInverterEfficiency: 0.9, dcConversionEfficiency: 1, designMargin: 0.1, voltage: 24 };

describe("battery size engine", () => {
  it("calculates the documented default AC scenario", () => {
    const result = calculateBatterySize(defaults).result;
    expect(result.deviceLoadEnergyWh).toBeCloseTo(2000);
    expect(result.minimumNominalWh).toBeCloseTo(2777.7778);
    expect(result.recommendedNominalWh).toBeCloseTo(3055.5556);
    expect(result.selectedVoltageAh).toBeCloseTo(127.3148);
  });

  it("does not apply inverter loss to direct DC", () => {
    const result = calculateBatterySize({ ...defaults, loadType: "dc" }).result;
    expect(result.conversionAdjustedWh).toBeCloseTo(2000);
    expect(result.recommendedNominalWh).toBeCloseTo(2750);
  });

  it("converts mixed AC and DC appliance rows independently", () => {
    const result = calculateBatterySize({ ...defaults, appliances: [
      { label: "TV", watts: 100, quantity: 1, loadType: "ac", dutyCycle: 1 },
      { label: "Router", watts: 12, quantity: 1, loadType: "dc", dutyCycle: 1 },
      { label: "LED lights", watts: 10, quantity: 3, loadType: "dc", dutyCycle: 1 },
    ] }).result;
    expect(result.totalAverageDeviceW).toBeCloseTo(142);
    expect(result.totalBatterySideAverageW).toBeCloseTo(153.111111);
    expect(result.conversionAdjustedWh).toBeCloseTo(612.444444);
    expect(result.minimumNominalWh).toBeCloseTo(765.555555);
    expect(result.recommendedNominalWh).toBeCloseTo(842.111111);
    expect(result.peakConnectedLoadW).toBeCloseTo(142);
  });

  it("keeps peak connected watts separate from duty-cycle energy", () => {
    const result = calculateBatterySize({ ...defaults, appliances: [{ label: "Refrigerator", watts: 150, quantity: 1, loadType: "ac", dutyCycle: 0.35 }] }).result;
    expect(result.totalAverageDeviceW).toBeCloseTo(52.5);
    expect(result.peakConnectedLoadW).toBe(150);
  });

  it("changes Ah but not recommended kWh when voltage changes", () => {
    const values = [12, 24, 48].map((voltage) => calculateBatterySize({ ...defaults, voltage }).result);
    expect(values[0].recommendedNominalWh).toBeCloseTo(values[1].recommendedNominalWh);
    expect(values[1].recommendedNominalWh).toBeCloseTo(values[2].recommendedNominalWh);
    expect(values[0].selectedVoltageAh).toBeCloseTo(254.6296);
    expect(values[1].selectedVoltageAh).toBeCloseTo(127.3148);
    expect(values[2].selectedVoltageAh).toBeCloseTo(63.6574);
  });

  it("scales capacity with exact runtime multipliers", () => {
    const values = [2, 4, 8].map((runtimeHours) => calculateBatterySize({ ...defaults, runtimeHours }).result.recommendedNominalWh);
    expect(values[0]).toBeCloseTo(1527.7778);
    expect(values[1]).toBeCloseTo(3055.5556);
    expect(values[2]).toBeCloseTo(6111.1111);
  });

  it("rejects invalid inputs", () => {
    expect(() => calculateBatterySize({ ...defaults, loadWatts: 0 })).toThrow("Enter a load greater than zero.");
    expect(() => calculateBatterySize({ ...defaults, runtimeHours: 0 })).toThrow("Enter a runtime greater than zero.");
    expect(() => calculateBatterySize({ ...defaults, startingSoc: 0.2 })).toThrow("Starting charge must be above");
    expect(() => calculateBatterySize({ ...defaults, voltage: 0 })).toThrow("system voltage");
  });
});

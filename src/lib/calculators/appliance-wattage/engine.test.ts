import { describe, expect, it } from "vitest";
import { calculateApplianceWattage, type ApplianceWattageInput } from "./engine";

const base = (overrides: Partial<ApplianceWattageInput> = {}): ApplianceWattageInput => ({
  source: { sourceMode: "label-watts", unitRunningWatts: 100 },
  quantity: 1,
  runtimeHours: 4,
  dutyCycle: 1,
  startupSource: "unknown",
  costEnabled: false,
  ...overrides,
});

describe("Appliance Wattage Calculator engine", () => {
  it("calculates separate unit and total watts and energy", () => {
    const result = calculateApplianceWattage(base({ quantity: 3 }));
    expect(result.unitRunningWatts).toBe(100);
    expect(result.totalRunningWatts).toBe(300);
    expect(result.energyWh).toBe(1200);
    expect(result.energyKWh).toBe(1.2);
  });

  it("calculates watts from volts, amps, and power factor", () => {
    const result = calculateApplianceWattage(base({ source: { sourceMode: "label-volts-amps", volts: 230, amps: 0.5, powerFactor: 0.8 } }));
    expect(result.apparentVA).toBe(115);
    expect(result.unitRunningWatts).toBe(92);
    expect(result.totalRunningWatts).toBe(92);
  });

  it("applies duty cycle to energy but not connected running watts", () => {
    const result = calculateApplianceWattage(base({ source: { sourceMode: "label-watts", unitRunningWatts: 150 }, runtimeHours: 24, dutyCycle: 0.35 }));
    expect(result.totalRunningWatts).toBe(150);
    expect(result.energyKWh).toBeCloseTo(1.26);
  });

  it("keeps blank runtime distinct from zero runtime", () => {
    const blank = calculateApplianceWattage(base({ runtimeHours: undefined, costEnabled: true, pricePerKWh: 0.2 }));
    expect(blank.energyWh).toBeNull();
    expect(blank.energyKWh).toBeNull();
    expect(blank.optionalCost).toBeNull();

    const zero = calculateApplianceWattage(base({ runtimeHours: 0, costEnabled: true, pricePerKWh: 0.2 }));
    expect(zero.energyWh).toBe(0);
    expect(zero.energyKWh).toBe(0);
    expect(zero.optionalCost).toBe(0);
  });

  it("calculates optional cost and accepts a zero price", () => {
    const result = calculateApplianceWattage(base({ costEnabled: true, pricePerKWh: 0.2 }));
    expect(result.optionalCost).toBeCloseTo(0.08);
    expect(calculateApplianceWattage(base({ costEnabled: true, pricePerKWh: 0 })).optionalCost).toBe(0);
  });

  it("calculates explicit and user-multiplied startup watts", () => {
    const explicit = calculateApplianceWattage(base({ quantity: 3, startupSource: "explicit-watts", startupWatts: 600 }));
    expect(explicit.unitStartupWatts).toBe(600);
    expect(explicit.totalStartupWatts).toBe(1800);
    expect(explicit.startupDataSource).toBe("explicit-watts");

    const multiplied = calculateApplianceWattage(base({ startupSource: "user-multiplier", startupMultiplier: 2 }));
    expect(multiplied.unitStartupWatts).toBe(200);
    expect(multiplied.totalStartupWatts).toBe(200);
    expect(multiplied.startupDataSource).toBe("user-multiplier");
  });

  it("returns unknown startup values when startup is not estimated", () => {
    const result = calculateApplianceWattage(base());
    expect(result.unitStartupWatts).toBeNull();
    expect(result.totalStartupWatts).toBeNull();
    expect(result.startupDataSource).toBe("unknown");
  });

  it("rejects invalid active inputs", () => {
    expect(() => calculateApplianceWattage(base({ source: { sourceMode: "label-volts-amps", volts: 230, amps: 0.5, powerFactor: 0 } }))).toThrow();
    expect(() => calculateApplianceWattage(base({ quantity: 1.5 }))).toThrow();
    expect(() => calculateApplianceWattage(base({ startupSource: "explicit-watts", startupWatts: 50 }))).toThrow();
    expect(() => calculateApplianceWattage(base({ costEnabled: true, pricePerKWh: -1 }))).toThrow();
  });

  it("uses preset source values without requiring inactive label fields", () => {
    const result = calculateApplianceWattage(base({ source: { sourceMode: "preset", presetId: "led-tv", unitRunningWatts: 100 } }));
    expect(result.sourceMode).toBe("preset");
    expect(result.unitRunningWatts).toBe(100);
  });
});

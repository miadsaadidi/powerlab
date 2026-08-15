import { describe, expect, it } from "vitest";
import { resolveBatteryCapacityInitialization } from "./initialization";

describe("resolveBatteryCapacityInitialization", () => {
  it("prefers saved profile assumptions over chemistry and hardcoded defaults", () => {
    expect(resolveBatteryCapacityInitialization({
      profile: { chemistry: "lifepo4", minimumSoc: 0.25, batteryHealth: 0.9, voltage: 24, capacityAh: 80 },
      defaultChemistry: "lifepo4",
      defaultMinimumSoc: 0.2,
      defaultBatteryHealth: 1,
      defaultVoltage: 12,
      defaultCapacityAh: 100,
    })).toEqual({ chemistry: "lifepo4", minimumSoc: 0.25, batteryHealth: 0.9, voltage: 24, capacityAh: 80, minimumSocCustomized: true });
  });

  it("uses the chemistry preset when no saved minimum SOC exists", () => {
    expect(resolveBatteryCapacityInitialization({
      profile: { chemistry: "agm", minimumSoc: null, batteryHealth: null, voltage: null, capacityAh: null },
      defaultChemistry: "lifepo4",
      defaultMinimumSoc: 0.2,
      defaultBatteryHealth: 1,
      defaultVoltage: 12,
      defaultCapacityAh: 100,
      chemistryMinimumSoc: 0.5,
    })).toMatchObject({ chemistry: "agm", minimumSoc: 0.5, minimumSocCustomized: false });
  });
});

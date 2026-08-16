import { describe, expect, it } from "vitest";
import { resolveBatteryChargingInitialization } from "./initialization";

describe("resolveBatteryChargingInitialization", () => {
  it("prefers saved explicit values over chemistry and hardcoded defaults", () => {
    expect(resolveBatteryChargingInitialization({
      saved: { chemistry: "lifepo4", batteryChargeEfficiency: 0.96, planningOverheadFactor: 1.08, planningOverheadEnabled: true },
      chemistryDefaults: { batteryChargeEfficiency: 0.99, planningOverheadFactor: 1.05 },
      hardcoded: { chemistry: "lifepo4", batteryChargeEfficiency: 0.99, planningOverheadFactor: 1.05, planningOverheadEnabled: true },
    })).toEqual({ chemistry: "lifepo4", batteryChargeEfficiency: 0.96, planningOverheadFactor: 1.08, planningOverheadEnabled: true, planningOverheadCustomized: true, efficiencyCustomized: true });
  });

  it("uses chemistry planning defaults when saved values are absent", () => {
    expect(resolveBatteryChargingInitialization({
      saved: { chemistry: "agm", batteryChargeEfficiency: null, planningOverheadFactor: null, planningOverheadEnabled: null },
      chemistryDefaults: { batteryChargeEfficiency: 0.99, planningOverheadFactor: 1.15 },
      hardcoded: { chemistry: "lifepo4", batteryChargeEfficiency: 0.99, planningOverheadFactor: 1.05, planningOverheadEnabled: true },
    })).toEqual({ chemistry: "agm", batteryChargeEfficiency: 0.99, planningOverheadFactor: 1.15, planningOverheadEnabled: true, planningOverheadCustomized: false, efficiencyCustomized: false });
  });
});

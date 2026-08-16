import { describe, expect, it } from "vitest";
import { createBatteryChargingRuntimeHandoff } from "./handoff";

describe("createBatteryChargingRuntimeHandoff", () => {
  it("maps charging target SOC to runtime starting SOC", () => {
    const handoff = createBatteryChargingRuntimeHandoff({
      capacityAh: 100,
      targetSoc: 0.8,
      voltage: 12.8,
      chemistry: "lifepo4",
      batteryHealth: null,
      minimumSoc: null,
    });

    expect(handoff.startingSoc).toBe(0.8);
    expect(handoff.capacityAh).toBe(100);
    expect(handoff.nominalWh).toBe(1_280);
    expect(handoff.batteryHealth).toBeUndefined();
    expect(handoff.reserveSoc).toBeUndefined();
  });

  it("does not fabricate nominal energy without voltage", () => {
    const handoff = createBatteryChargingRuntimeHandoff({
      capacityAh: 100,
      targetSoc: 1,
      voltage: null,
      chemistry: null,
      batteryHealth: null,
      minimumSoc: null,
    });

    expect(handoff.capacityAh).toBe(100);
    expect(handoff.nominalWh).toBeUndefined();
    expect(handoff.batteryHealth).toBeUndefined();
    expect(handoff.reserveSoc).toBeUndefined();
  });
});

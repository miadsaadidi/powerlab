import { describe, expect, it } from "vitest";
import { calculateBatteryRuntime } from "./engine";

const baseInput = {
  capacityWh: 1_000,
  loadWatts: 100,
  loadType: "ac" as const,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  acInverterEfficiency: 0.9,
  dcConversionEfficiency: 1,
  dutyCycle: 1,
};

describe("calculateBatteryRuntime", () => {
  it("calculates the default 1000 Wh AC scenario (80% usable, 90% inverter efficiency) -> 7.2 h", () => {
    const result = calculateBatteryRuntime(baseInput);

    expect(result.result.nominalEnergyWh).toBe(1_000);
    expect(result.result.usableBatteryWh).toBe(800);
    expect(result.result.batterySideLoadWatts).toBeCloseTo(111.111111);
    expect(result.result.runtimeHours).toBeCloseTo(7.2);
  });

  it("normalizes kWh before applying the charge window (1 kWh -> 1,000 Wh -> 7.2 h)", () => {
    const result = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityKwh: 1 });

    expect(result.result.nominalEnergyWh).toBe(1_000);
    expect(result.result.runtimeHours).toBeCloseTo(7.2);
  });

  it("converts 100 Ah across various nominal voltages accurately", () => {
    // 12V nominal -> 1,200 Wh
    const res12V = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100, voltage: 12 });
    expect(res12V.result.nominalEnergyWh).toBe(1_200);
    expect(res12V.result.usableBatteryWh).toBe(960);
    expect(res12V.result.runtimeHours).toBeCloseTo(8.64); // 960 / (100 / 0.9) = 8.64 h

    // 12.8V nominal (LiFePO4) -> 1,280 Wh
    const res128V = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100, voltage: 12.8 });
    expect(res128V.result.nominalEnergyWh).toBe(1_280);
    expect(res128V.result.usableBatteryWh).toBe(1_024);
    expect(res128V.result.runtimeHours).toBeCloseTo(9.216); // 1024 / (100 / 0.9) = 9.216 h

    // 24V nominal -> 2,400 Wh
    const res24V = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100, voltage: 24 });
    expect(res24V.result.nominalEnergyWh).toBe(2_400);
    expect(res24V.result.usableBatteryWh).toBe(1_920);
    expect(res24V.result.runtimeHours).toBeCloseTo(17.28);

    // 48V nominal -> 4,800 Wh
    const res48V = calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100, voltage: 48 });
    expect(res48V.result.nominalEnergyWh).toBe(4_800);
    expect(res48V.result.usableBatteryWh).toBe(3_840);
    expect(res48V.result.runtimeHours).toBeCloseTo(34.56);
  });

  it("does not apply inverter losses to a direct DC load", () => {
    const result = calculateBatteryRuntime({ ...baseInput, loadType: "dc", dcConversionEfficiency: 1 });

    expect(result.result.batterySideLoadWatts).toBe(100);
    expect(result.result.runtimeHours).toBe(8); // 800 Wh / 100 W = 8 h
  });

  it("calculates 12.8V LiFePO4 matrix values (90% DoD, 90% inverter eff) reproducibly", () => {
    // 50Ah (640 Wh nominal, 576 Wh usable DoD 90%)
    const b50 = calculateBatteryRuntime({
      capacityAh: 50,
      voltage: 12.8,
      loadWatts: 100,
      startingSoc: 1,
      reserveSoc: 0.1,
      batteryHealth: 1,
      acInverterEfficiency: 0.9,
      dutyCycle: 1,
    });
    expect(b50.result.nominalEnergyWh).toBe(640);
    expect(b50.result.usableBatteryWh).toBe(576);
    expect(b50.result.runtimeHours).toBeCloseTo(5.184); // 576 / (100 / 0.9) = 5.184 h

    // 100Ah (1,280 Wh nominal, 1,152 Wh usable DoD 90%)
    const b100 = calculateBatteryRuntime({
      capacityAh: 100,
      voltage: 12.8,
      loadWatts: 100,
      startingSoc: 1,
      reserveSoc: 0.1,
      batteryHealth: 1,
      acInverterEfficiency: 0.9,
      dutyCycle: 1,
    });
    expect(b100.result.nominalEnergyWh).toBe(1_280);
    expect(b100.result.usableBatteryWh).toBe(1_152);
    expect(b100.result.runtimeHours).toBeCloseTo(10.368); // 1152 / (100 / 0.9) = 10.368 h

    // 200Ah (2,560 Wh nominal, 2,304 Wh usable DoD 90%)
    const b200 = calculateBatteryRuntime({
      capacityAh: 200,
      voltage: 12.8,
      loadWatts: 100,
      startingSoc: 1,
      reserveSoc: 0.1,
      batteryHealth: 1,
      acInverterEfficiency: 0.9,
      dutyCycle: 1,
    });
    expect(b200.result.nominalEnergyWh).toBe(2_560);
    expect(b200.result.usableBatteryWh).toBe(2_304);
    expect(b200.result.runtimeHours).toBeCloseTo(20.736);

    // 300Ah (3,840 Wh nominal, 3,456 Wh usable DoD 90%)
    const b300 = calculateBatteryRuntime({
      capacityAh: 300,
      voltage: 12.8,
      loadWatts: 100,
      startingSoc: 1,
      reserveSoc: 0.1,
      batteryHealth: 1,
      acInverterEfficiency: 0.9,
      dutyCycle: 1,
    });
    expect(b300.result.nominalEnergyWh).toBe(3_840);
    expect(b300.result.usableBatteryWh).toBe(3_456);
    expect(b300.result.runtimeHours).toBeCloseTo(31.104);
  });

  it("calculates refrigerator runtime with duty-cycle averaging", () => {
    // 150W refrigerator at 35% duty cycle = 52.5W average
    const result = calculateBatteryRuntime({
      ...baseInput,
      capacityAh: 100,
      voltage: 12,
      capacityWh: undefined,
      loadWatts: 0,
      appliances: [{ label: "Refrigerator", watts: 150, quantity: 1, loadType: "ac", dutyCycle: 0.35 }],
    });

    expect(result.result.nominalEnergyWh).toBe(1_200);
    expect(result.result.usableBatteryWh).toBe(960); // 80% usable DoD
    expect(result.result.averageLoadWatts).toBe(52.5);
    expect(result.result.peakConnectedLoadWatts).toBe(150);
    expect(result.result.batterySideLoadWatts).toBeCloseTo(58.333333); // 52.5 / 0.9
    expect(result.result.runtimeHours).toBeCloseTo(16.4571428); // 960 / 58.3333 = 16.457 h
  });

  it("scales available capacity and runtime with State of Health (SOH) < 100%", () => {
    const fresh = calculateBatteryRuntime({ ...baseInput, batteryHealth: 1.0 });
    const degraded = calculateBatteryRuntime({ ...baseInput, batteryHealth: 0.8 });

    expect(degraded.result.usableBatteryWh).toBe(640); // 1000 * 0.8 DoD * 0.8 SOH
    expect(degraded.result.runtimeHours).toBeCloseTo(fresh.result.runtimeHours * 0.8);
    expect(degraded.result.runtimeHours).toBeCloseTo(5.76); // 640 / (100 / 0.9) = 5.76 h
  });

  it("handles different chemistry depth-of-discharge defaults", () => {
    // LiFePO4 (20% reserve / 80% usable)
    const lifepo4 = calculateBatteryRuntime({ ...baseInput, startingSoc: 1, reserveSoc: 0.2 });
    expect(lifepo4.result.usableBatteryWh).toBe(800);
    expect(lifepo4.result.runtimeHours).toBeCloseTo(7.2);

    // AGM / Lead-Acid (50% reserve / 50% usable)
    const agm = calculateBatteryRuntime({ ...baseInput, startingSoc: 1, reserveSoc: 0.5 });
    expect(agm.result.usableBatteryWh).toBe(500);
    expect(agm.result.runtimeHours).toBeCloseTo(4.5);
  });

  it("calculates mixed appliance loads using average watts but preserves peak load", () => {
    const result = calculateBatteryRuntime({
      ...baseInput,
      loadWatts: 0,
      appliances: [
        { label: "TV", watts: 100, quantity: 1, loadType: "ac", dutyCycle: 1 },
        { label: "Router", watts: 12, quantity: 1, loadType: "ac", dutyCycle: 1 },
        { label: "LED bulb", watts: 10, quantity: 3, loadType: "ac", dutyCycle: 1 },
      ],
    });

    expect(result.result.averageLoadWatts).toBe(142);
    expect(result.result.peakConnectedLoadWatts).toBe(142);
    expect(result.result.batterySideLoadWatts).toBeCloseTo(157.777778);
    expect(result.result.runtimeHours).toBeCloseTo(5.0704225);
  });

  it("rejects invalid charge windows and non-positive inputs", () => {
    expect(() => calculateBatteryRuntime({ ...baseInput, startingSoc: 0.2, reserveSoc: 0.2 })).toThrow(
      "Starting charge must be above your minimum remaining charge.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, capacityWh: 0 })).toThrow(
      "Enter a battery capacity greater than zero.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, loadWatts: -1 })).toThrow(
      "Enter a load greater than zero.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, capacityWh: undefined, capacityAh: 100 })).toThrow(
      "Choose a battery voltage when capacity is entered in Ah.",
    );
    expect(() => calculateBatteryRuntime({ ...baseInput, acInverterEfficiency: 1.01 })).toThrow(
      "Efficiency must be greater than 0% and no more than 100%.",
    );
  });
});

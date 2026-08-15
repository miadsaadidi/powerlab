import { describe, expect, it } from "vitest";
import { createEnergyProfileStore } from "./store";

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

describe("Energy Profile store", () => {
  it("persists a valid local battery preference", () => {
    const store = createEnergyProfileStore(new MemoryStorage());
    store.patchBattery({ capacityWh: 1_000, reserveSoc: 0.2 });

    expect(store.read().battery.capacityWh).toBe(1_000);
    expect(store.read().battery.reserveSoc).toBe(0.2);
  });

  it("keeps existing profiles valid while storing optional solar fields", () => {
    const storage = new MemoryStorage();
    storage.setItem("energy-tools:profile:v1", JSON.stringify({ version: 1, battery: { capacityWh: 1_000 }, runtimeHandoff: { loadWatts: 100 } }));
    const store = createEnergyProfileStore(storage);

    expect(store.read().solar.latitude).toBeNull();
    store.patchSolar({ latitude: 34, longitude: -6.84, tiltDeg: 34, azimuthDeg: 180 });
    expect(store.read().solar).toMatchObject({ latitude: 34, longitude: -6.84, tiltDeg: 34, azimuthDeg: 180 });
  });

  it("adds usage rows and one shared electricity price without breaking old profiles", () => {
    const storage = new MemoryStorage();
    storage.setItem("energy-tools:profile:v1", JSON.stringify({ version: 1, battery: { capacityWh: 500 } }));
    const store = createEnergyProfileStore(storage);
    expect(store.read().usageRows).toEqual([]);
    expect(store.read().electricityPricePerKwh).toBeNull();
    store.patchElectricityPricePerKwh(0.2);
    store.patchUsageRows([{ id: "tv", label: "LED TV", presetId: "led-tv", mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1, kWhPerCycle: null, cyclesPerWeek: null, labelKWh: null, labelPeriod: null, origin: "preset" }]);
    expect(store.read().electricityPricePerKwh).toBe(0.2);
    expect(store.read().usageRows[0].presetId).toBe("led-tv");
  });
});

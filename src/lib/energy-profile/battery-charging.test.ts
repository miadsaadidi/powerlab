import { describe, expect, it } from "vitest";
import { createEnergyProfileStore, ENERGY_PROFILE_STORAGE_KEY } from "./store";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe("battery charging Energy Profile values", () => {
  it("stores only when explicitly requested through the charging patch", () => {
    const storage = new MemoryStorage();
    const store = createEnergyProfileStore(storage);

    expect(store.read().batteryCharging).toBeNull();
    store.patchBatteryCharging({ mode: "ah-amps", capacityAh: 100, chargerCurrentA: 20, targetSoc: 0.8 });

    expect(store.read().batteryCharging).toMatchObject({ capacityAh: 100, chargerCurrentA: 20, targetSoc: 0.8 });
    expect(storage.getItem(ENERGY_PROFILE_STORAGE_KEY)).toContain("batteryCharging");
  });
});

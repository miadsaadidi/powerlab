import { describe, expect, it } from "vitest";
import { createStarterSolarLoadRows, importSolarLoadRows } from "./initialization";

describe("solar load initialization", () => {
  it("creates the documented starter assumptions", () => {
    const rows = createStarterSolarLoadRows();
    expect(rows.map((row) => [row.id, row.essential])).toEqual([
      ["refrigerator", true],
      ["wifi-router", true],
      ["led-bulbs", true],
      ["led-tv", false],
    ]);
    expect(rows.find((row) => row.id === "refrigerator")).toMatchObject({ watts: 150, hoursPerDay: 24, dutyCycle: 0.35 });
  });

  it("imports compatible profile rows as not marked essential", () => {
    const rows = importSolarLoadRows([{ id: "tv-1", label: "TV", presetId: "led-tv", mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 3, dutyCycle: 1, kWhPerCycle: null, cyclesPerWeek: null, labelKWh: null, labelPeriod: null, origin: "user-edited" }]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ label: "TV", hoursPerDay: 12 / 7, essential: false });
  });

  it("ignores incompatible profile modes and falls back to starters when needed", () => {
    const rows = importSolarLoadRows([{ id: "label-1", label: "Label appliance", mode: "label-energy", watts: null, quantity: 1, hoursPerDay: null, daysPerWeek: null, dutyCycle: 1, kWhPerCycle: 1, cyclesPerWeek: 2, labelKWh: 100, labelPeriod: "year", origin: "label-value" }]);
    expect(rows).toEqual([]);
    expect(createStarterSolarLoadRows()).toHaveLength(4);
  });
});

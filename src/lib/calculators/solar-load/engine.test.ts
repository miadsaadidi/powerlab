import { describe, expect, it } from "vitest";
import { calculateSolarLoad } from "./engine";

const starterRows = [
  { id: "refrigerator", label: "Refrigerator", watts: 150, quantity: 1, hoursPerDay: 24, dutyCycle: 0.35, essential: true },
  { id: "wifi-router", label: "Wi-Fi Router", watts: 12, quantity: 1, hoursPerDay: 24, dutyCycle: 1, essential: true },
  { id: "led-bulbs", label: "LED bulbs", watts: 10, quantity: 4, hoursPerDay: 5, dutyCycle: 1, essential: true },
  { id: "led-tv", label: "LED TV", watts: 100, quantity: 1, hoursPerDay: 4, dutyCycle: 1, essential: false },
];

describe("solar load engine", () => {
  it("calculates the documented starter fixture", () => {
    const result = calculateSolarLoad({ rows: starterRows }).result;
    expect(result.totalDailyKWh).toBeCloseTo(2.148);
    expect(result.essentialDailyKWh).toBeCloseTo(1.748);
    expect(result.otherDailyKWh).toBeCloseTo(0.4);
    expect(result.connectedRunningW).toBe(302);
  });

  it("applies refrigerator duty cycle to energy but not listed watts", () => {
    const result = calculateSolarLoad({ rows: [starterRows[0]] }).result;
    expect(result.rows[0]?.dailyWh).toBeCloseTo(1260);
    expect(result.rows[0]?.connectedW).toBe(150);
  });

  it("allows a zero-hour row while retaining its listed watts", () => {
    const result = calculateSolarLoad({ rows: [{ ...starterRows[3], hoursPerDay: 0 }] }).result;
    expect(result.totalDailyKWh).toBe(0);
    expect(result.rows[0]?.dailyWh).toBe(0);
    expect(result.connectedRunningW).toBe(100);
    expect(result.topContributors).toEqual([]);
  });

  it("handles an all-zero-hour profile without invalid numbers", () => {
    const result = calculateSolarLoad({ rows: starterRows.map((row) => ({ ...row, hoursPerDay: 0 })) }).result;
    expect(result.totalDailyKWh).toBe(0);
    expect(result.essentialDailyKWh).toBe(0);
    expect(result.otherDailyKWh).toBe(0);
    expect(result.topContributors).toEqual([]);
    expect(JSON.stringify(result)).not.toMatch(/NaN|Infinity/);
  });

  it("moves energy between essential and other without changing total energy", () => {
    const row = { ...starterRows[3], watts: 25, hoursPerDay: 4 };
    const other = calculateSolarLoad({ rows: [row] }).result;
    const essential = calculateSolarLoad({ rows: [{ ...row, essential: true }] }).result;
    expect(other.totalDailyKWh).toBe(essential.totalDailyKWh);
    expect(other.essentialDailyKWh).toBe(0.0);
    expect(other.otherDailyKWh).toBeCloseTo(0.1);
    expect(essential.essentialDailyKWh).toBeCloseTo(0.1);
    expect(essential.otherDailyKWh).toBe(0);
  });

  it("orders positive-energy contributors from largest to smallest", () => {
    const result = calculateSolarLoad({ rows: starterRows }).result;
    expect(result.topContributors.map((row) => row.id)).toEqual(["refrigerator", "led-tv", "wifi-router", "led-bulbs"]);
  });

  it("rejects invalid values but accepts 24-hour and zero-hour schedules", () => {
    expect(() => calculateSolarLoad({ rows: [{ ...starterRows[0], watts: 0 }] })).toThrow();
    expect(() => calculateSolarLoad({ rows: [{ ...starterRows[0], quantity: 1.5 }] })).toThrow();
    expect(() => calculateSolarLoad({ rows: [{ ...starterRows[0], hoursPerDay: 24.1 }] })).toThrow();
    expect(() => calculateSolarLoad({ rows: [{ ...starterRows[0], dutyCycle: 0 }] })).toThrow();
    expect(calculateSolarLoad({ rows: [{ ...starterRows[0], hoursPerDay: 24 }] }).result.totalDailyKWh).toBeCloseTo(1.26);
    expect(calculateSolarLoad({ rows: [{ ...starterRows[0], hoursPerDay: 0 }] }).result.totalDailyKWh).toBe(0);
  });
});

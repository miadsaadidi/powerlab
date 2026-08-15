import { describe, expect, it } from "vitest";
import { calculateUsage, calculateUsageProfile, calculateOneHourLess } from "./engine";

describe("electricity usage engine", () => {
  it("calculates watts and time using days per week", () => {
    const result = calculateUsage({ mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1 });
    expect(result.weeklyKWh).toBeCloseTo(2.8);
    expect(result.averageDailyKWh).toBeCloseTo(0.4);
    expect(result.annualKWh).toBeCloseTo(146.1);
    expect(result.monthlyKWh).toBeCloseTo(12.175);
  });

  it("reduces watts and time usage when days per week is five", () => {
    const result = calculateUsage({ mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 5, dutyCycle: 1 });
    expect(result.weeklyKWh).toBeCloseTo(2);
    expect(result.averageDailyKWh).toBeCloseTo(2 / 7);
    expect(result.annualKWh).toBeCloseTo(104.3571428);
  });

  it("normalizes cycle energy using 365.25 days", () => {
    const result = calculateUsage({ mode: "kwh-cycle", kWhPerCycle: 1.2, quantity: 1, cyclesPerWeek: 4 });
    expect(result.weeklyKWh).toBeCloseTo(4.8);
    expect(result.annualKWh).toBeCloseTo(250.4571428);
    expect(result.averageDailyKWh).toBeCloseTo(250.4571428 / 365.25);
  });

  it("multiplies authoritative label energy by quantity only", () => {
    const result = calculateUsage({ mode: "label-energy", labelKWh: 365, labelPeriod: "year", quantity: 2, watts: 999, hoursPerDay: 24, daysPerWeek: 1, dutyCycle: 0.1 });
    expect(result.annualKWh).toBeCloseTo(730);
    expect(result.monthlyKWh).toBeCloseTo(730 / 12);
    expect(result.averageDailyKWh).toBeCloseTo(730 / 365.25);
  });

  it("leaves quantity-one label energy unchanged", () => {
    expect(calculateUsage({ mode: "label-energy", labelKWh: 365, labelPeriod: "year", quantity: 1 }).annualKWh).toBe(365);
  });

  it("multiplies monthly label energy by quantity", () => {
    const result = calculateUsage({ mode: "label-energy", labelKWh: 30, labelPeriod: "month", quantity: 2 });
    expect(result.monthlyKWh).toBeCloseTo(60);
    expect(result.annualKWh).toBeCloseTo(720);
  });

  it("calculates optional costs", () => {
    const result = calculateUsage({ mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1, pricePerKWh: 0.2 });
    expect(result.annualCost).toBeCloseTo(29.22);
    expect(result.monthlyCost).toBeCloseTo(2.435);
  });

  it("calculates the one-hour-less scenario", () => {
    const result = calculateOneHourLess({ mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1 });
    expect(result).not.toBeNull();
    expect(result?.annualKWh).toBeCloseTo(109.575);
    expect(result?.reductionKWh).toBeCloseTo(36.525);
  });

  it("sums profile rows and contributor shares", () => {
    const profile = calculateUsageProfile([
      { id: "tv", label: "TV", input: { mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1 } },
      { id: "router", label: "Router", input: { mode: "watts-time", watts: 12, quantity: 1, hoursPerDay: 24, daysPerWeek: 7, dutyCycle: 1 } },
    ]);
    expect(profile.totalAnnualKWh).toBeCloseTo(251.292);
    expect(profile.rows[0].sharePercent).toBeGreaterThan(profile.rows[1].sharePercent);
    expect(profile.rows.reduce((sum, row) => sum + row.sharePercent, 0)).toBeCloseTo(100);
  });

  it("rejects invalid values", () => {
    expect(() => calculateUsage({ mode: "watts-time", watts: 0, quantity: 1, hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1 })).toThrow("Enter watts greater than zero.");
    expect(() => calculateUsage({ mode: "watts-time", watts: 100, quantity: 1, hoursPerDay: 4, daysPerWeek: 8, dutyCycle: 1 })).toThrow("Days per week must be between 1 and 7.");
    expect(() => calculateUsage({ mode: "label-energy", labelKWh: 365, labelPeriod: "year", quantity: 0 })).toThrow("Enter a quantity greater than zero.");
  });
});

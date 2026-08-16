import { describe, expect, it } from "vitest";
import { calculateEnergyBill, type EnergyBillInput } from "./engine";

const base: EnergyBillInput = {
  mode: "usage-for-period",
  energyKWh: 300,
  billingDays: 30,
  pricePerKWh: 0.2,
  fixedChargeForPeriod: 0,
  dailyStandingCharge: 0,
  taxPercent: 0,
};

describe("energy bill engine", () => {
  it("calculates the default bill and annualized run-rate", () => {
    const result = calculateEnergyBill(base);
    expect(result.energyCharge).toBe(60);
    expect(result.total).toBe(60);
    expect(result.averageDailyKWh).toBe(10);
    expect(result.annualizedEnergyKWh).toBe(3650);
    expect(result.annualizedTotal).toBe(730);
  });

  it("allows zero usage with fixed and standing charges", () => {
    const result = calculateEnergyBill({ ...base, energyKWh: 0, fixedChargeForPeriod: 10, dailyStandingCharge: 0.5 });
    expect(result.energyCharge).toBe(0);
    expect(result.standingCharge).toBe(15);
    expect(result.total).toBe(25);
    expect(result.averageDailyKWh).toBe(0);
    expect(result.annualizedTotal).toBeCloseTo(304.1666667);
  });

  it("allows equal meter readings and calculates zero usage", () => {
    const result = calculateEnergyBill({ ...base, mode: "meter-readings", previousReading: 12300, currentReading: 12300 });
    expect(result.energyKWh).toBe(0);
  });

  it("rejects negative meter differences and invalid billing days", () => {
    expect(() => calculateEnergyBill({ ...base, mode: "meter-readings", previousReading: 12300, currentReading: 12299 })).toThrow();
    expect(() => calculateEnergyBill({ ...base, billingDays: 30.5 })).toThrow();
  });

  it("allows a zero energy price without creating credits", () => {
    const result = calculateEnergyBill({ ...base, pricePerKWh: 0, fixedChargeForPeriod: 10, dailyStandingCharge: 0.5 });
    expect(result.energyCharge).toBe(0);
    expect(result.total).toBe(25);
  });

  it("reduces usage only in what-if scenarios", () => {
    const result = calculateEnergyBill({ ...base, fixedChargeForPeriod: 10, dailyStandingCharge: 0.5, taxPercent: 0.1 });
    expect(result.scenarios.map((scenario) => scenario.energyKWh)).toEqual([300, 270, 240]);
    expect(result.scenarios[1].fixedChargeForPeriod).toBe(10);
    expect(result.scenarios[1].standingCharge).toBe(15);
    expect(result.scenarios[1].total).toBeCloseTo(86.9);
  });
});

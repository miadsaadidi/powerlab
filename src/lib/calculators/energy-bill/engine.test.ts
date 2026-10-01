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

  it("calculates 300 kWh with $15 fixed charge", () => {
    const result = calculateEnergyBill({ ...base, fixedChargeForPeriod: 15 });
    expect(result.energyCharge).toBe(60);
    expect(result.subtotal).toBe(75);
    expect(result.total).toBe(75);
    expect(result.annualizedTotal).toBeCloseTo(912.5);
  });

  it("calculates 300 kWh with fixed charge, daily standing charge, and 10% tax", () => {
    const result = calculateEnergyBill({
      ...base,
      fixedChargeForPeriod: 15,
      dailyStandingCharge: 0.1,
      taxPercent: 0.1,
    });
    expect(result.energyCharge).toBe(60);
    expect(result.fixedChargeForPeriod).toBe(15);
    expect(result.standingCharge).toBe(3.0);
    expect(result.subtotal).toBe(78);
    expect(result.tax).toBeCloseTo(7.8);
    expect(result.total).toBeCloseTo(85.8);
  });

  it("calculates meter mode consumption: current 14,850 - previous 14,100 = 750 kWh", () => {
    const result = calculateEnergyBill({
      mode: "meter-readings",
      previousReading: 14100,
      currentReading: 14850,
      billingDays: 30,
      pricePerKWh: 0.2,
      fixedChargeForPeriod: 0,
      dailyStandingCharge: 0,
      taxPercent: 0,
    });
    expect(result.energyKWh).toBe(750);
    expect(result.energyCharge).toBe(150);
  });

  it("rejects invalid meter reading where current < previous", () => {
    expect(() =>
      calculateEnergyBill({
        mode: "meter-readings",
        previousReading: 14100,
        currentReading: 14000,
        billingDays: 30,
        pricePerKWh: 0.2,
        fixedChargeForPeriod: 0,
        dailyStandingCharge: 0,
        taxPercent: 0,
      })
    ).toThrow();
  });
});

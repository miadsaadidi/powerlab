import { describe, it, expect } from "vitest";
import { calculateSpaceHeaterCost } from "./engine";
import { QUICK_HEATER_PRESETS, SPACE_HEATER_DEFAULTS } from "@/data/space-heater-defaults";

describe("calculateSpaceHeaterCost Engine & Canonical Precision", () => {
  it("1. calculates 1500W × 70% × $0.18 → $0.189/hour", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
      winterMonths: 3,
    });
    expect(res.result.costPerHour).toBe(0.189);
    expect(res.result.costPerHour.toFixed(2)).toBe("0.19");
  });

  it("2. calculates 8 hours scheduled cost → $1.512 ($1.51 formatted)", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
    });
    expect(res.result.costPerNight8h).toBe(1.512);
    expect(res.result.costPerNight8h.toFixed(2)).toBe("1.51");
  });

  it("3. calculates 30-day month (8h/day) → $45.36", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
    });
    expect(res.result.costPerMonth).toBe(45.36);
  });

  it("4. calculates 3-month winter season → $136.08", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
      winterMonths: 3,
    });
    expect(res.result.costPerWinterSeason).toBe(136.08);
  });

  it("5. calculates 1500W × 100% × $0.18 → $0.27/hour, $2.16/8h, $64.80/month", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 100,
      electricityRate: 0.18,
    });
    expect(res.result.costPerHour).toBe(0.27);
    expect(res.result.costPerNight8h).toBe(2.16);
    expect(res.result.costPerMonth).toBe(64.8);
  });

  it("6. calculates 1000W × 70% × $0.18 → $0.126/hour ($0.13 formatted), $1.008/8h ($1.01), $30.24/month", () => {
    const res = calculateSpaceHeaterCost({
      heaterWatts: 1000,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
    });
    expect(res.result.costPerHour).toBe(0.126);
    expect(res.result.costPerHour.toFixed(2)).toBe("0.13");
    expect(res.result.costPerNight8h).toBe(1.008);
    expect(res.result.costPerNight8h.toFixed(2)).toBe("1.01");
    expect(res.result.costPerMonth).toBe(30.24);
  });

  it("7. verifies all presets have labels matching their defined watts and duty cycle values", () => {
    for (const preset of QUICK_HEATER_PRESETS) {
      expect(preset.label).toContain(`${preset.watts}W`);
      expect(preset.label).toContain(`${preset.duty}%`);
    }

    // Default preset match
    const defaultMatch = QUICK_HEATER_PRESETS.find(
      (p) =>
        p.watts === SPACE_HEATER_DEFAULTS.heaterWatts &&
        p.hours === SPACE_HEATER_DEFAULTS.dailyHours &&
        p.duty === SPACE_HEATER_DEFAULTS.dutyCyclePercent
    );
    expect(defaultMatch).toBeDefined();
    expect(defaultMatch?.duty).toBe(70);
  });

  it("8. changing duty cycle immediately changes all dependent outputs", () => {
    const lowDuty = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 50,
      electricityRate: 0.18,
    });
    const highDuty = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 85,
      electricityRate: 0.18,
    });

    expect(lowDuty.result.costPerHour).toBe(0.135);
    expect(highDuty.result.costPerHour).toBe(0.2295);
    expect(lowDuty.result.costPerMonth).toBeLessThan(highDuty.result.costPerMonth);
  });

  it("9. changing electricity rate updates all cost outputs proportionally", () => {
    const baseRate = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
    });
    const doubleRate = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.36,
    });

    expect(doubleRate.result.costPerHour).toBeCloseTo(baseRate.result.costPerHour * 2, 4);
    expect(doubleRate.result.costPerMonth).toBeCloseTo(baseRate.result.costPerMonth * 2, 2);
  });

  it("10. changing season duration updates winter total directly (Season_Cost = Monthly_Cost × Season_Months)", () => {
    const res2 = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
      winterMonths: 2,
    });
    const res5 = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      dailyHours: 8,
      dutyCyclePercent: 70,
      electricityRate: 0.18,
      winterMonths: 5,
    });

    expect(res2.result.costPerWinterSeason).toBe(Number((45.36 * 2).toFixed(2)));
    expect(res5.result.costPerWinterSeason).toBe(Number((45.36 * 5).toFixed(2)));
  });

  it("11. reference-table calculations match canonical engine values", () => {
    // 500W @ 100%, 8h/day, $0.18
    const r500 = calculateSpaceHeaterCost({ heaterWatts: 500, dailyHours: 8, dutyCyclePercent: 100, electricityRate: 0.18 });
    expect(r500.result.costPerHour.toFixed(2)).toBe("0.09");
    expect(r500.result.costPerNight8h.toFixed(2)).toBe("0.72");
    expect(r500.result.costPerMonth.toFixed(2)).toBe("21.60");

    // 1000W @ 70%, 8h/day, $0.18
    const r1000 = calculateSpaceHeaterCost({ heaterWatts: 1000, dailyHours: 8, dutyCyclePercent: 70, electricityRate: 0.18 });
    expect(r1000.result.costPerHour.toFixed(2)).toBe("0.13");
    expect(r1000.result.costPerNight8h.toFixed(2)).toBe("1.01");
    expect(r1000.result.costPerMonth.toFixed(2)).toBe("30.24");

    // 1500W @ 70%, 8h/day, $0.18
    const r1500_70 = calculateSpaceHeaterCost({ heaterWatts: 1500, dailyHours: 8, dutyCyclePercent: 70, electricityRate: 0.18 });
    expect(r1500_70.result.costPerHour.toFixed(2)).toBe("0.19");
    expect(r1500_70.result.costPerNight8h.toFixed(2)).toBe("1.51");
    expect(r1500_70.result.costPerMonth.toFixed(2)).toBe("45.36");

    // 1500W @ 100%, 8h/day, $0.18
    const r1500_100 = calculateSpaceHeaterCost({ heaterWatts: 1500, dailyHours: 8, dutyCyclePercent: 100, electricityRate: 0.18 });
    expect(r1500_100.result.costPerHour.toFixed(2)).toBe("0.27");
    expect(r1500_100.result.costPerNight8h.toFixed(2)).toBe("2.16");
    expect(r1500_100.result.costPerMonth.toFixed(2)).toBe("64.80");
  });

  it("12. validates error boundaries on non-positive numbers", () => {
    expect(() => calculateSpaceHeaterCost({ heaterWatts: 0, dailyHours: 8, electricityRate: 0.18 })).toThrow();
    expect(() => calculateSpaceHeaterCost({ heaterWatts: 1500, dailyHours: 0, electricityRate: 0.18 })).toThrow();
    expect(() => calculateSpaceHeaterCost({ heaterWatts: 1500, dailyHours: 8, electricityRate: 0 })).toThrow();
  });
});


import { describe, it, expect } from "vitest";
import { calculateGeneratorSize } from "./engine";

describe("calculateGeneratorSize Engine", () => {
  // Test 1: No motor loads -> peak equals running load
  it("Test 1: No motor loads -> calculated peak equals total running load", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "light1", label: "LED Lights", runningWatts: 100, startingWatts: 100, quantity: 1 },
        { id: "heater", label: "Space Heater (Resistive)", runningWatts: 1500, startingWatts: 1500, quantity: 1 },
        { id: "tv", label: "Television", runningWatts: 120, startingWatts: 120, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Total running = 100 + 1500 + 120 = 1720W
    expect(res.result.totalRunningWatts).toBe(1720);
    // Surge delta = 0
    expect(res.result.maxInductiveSurgeDelta).toBe(0);
    // Peak starting surge equals running load
    expect(res.result.totalStartingSurgeWatts).toBe(1720);
    // Continuous target = 1720 * 1.2 = 2064W
    expect(res.result.targetContinuousWatts).toBe(2064);
    // Peak target = 1720 * 1.2 = 2064W
    expect(res.result.targetPeakSurgeWatts).toBe(2064);
  });

  // Test 2: One motor -> peak equals running load + largest surge delta
  it("Test 2: One motor -> peak equals running load + surge delta", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "fridge", label: "Refrigerator", runningWatts: 150, startingWatts: 1200, quantity: 1 },
        { id: "lights", label: "LED Lights", runningWatts: 100, startingWatts: 100, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Total running = 150 + 100 = 250W
    expect(res.result.totalRunningWatts).toBe(250);
    // Motor surge delta = 1200 - 150 = 1050W
    expect(res.result.maxInductiveSurgeDelta).toBe(1050);
    // Peak starting surge = 250 + 1050 = 1300W
    expect(res.result.totalStartingSurgeWatts).toBe(1300);
  });

  // Test 3: Multiple motors -> only the largest surge delta is added under sequential start
  it("Test 3: Multiple motors -> only the largest surge delta is added under the sequential-start model", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "fridge", label: "Refrigerator", runningWatts: 150, startingWatts: 1200, quantity: 1 }, // delta = 1050
        { id: "sump", label: "Sump Pump", runningWatts: 800, startingWatts: 2400, quantity: 1 }, // delta = 1600
        { id: "furnace", label: "Furnace Fan", runningWatts: 600, startingWatts: 1800, quantity: 1 }, // delta = 1200
      ],
      safetyMarginFraction: 0.20,
    });

    // Total running = 150 + 800 + 600 = 1550W
    expect(res.result.totalRunningWatts).toBe(1550);
    // Max surge delta must strictly be the sump pump's 1600W (not the sum of all motor surges)
    expect(res.result.maxInductiveSurgeDelta).toBe(1600);
    // Peak starting surge = 1550 + 1600 = 3150W
    expect(res.result.totalStartingSurgeWatts).toBe(3150);
  });

  // Test 4: Continuous target uses documented margin
  it("Test 4: Continuous target strictly applies the specified planning headroom margin", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "load", label: "Continuous Load", runningWatts: 2000, startingWatts: 2000, quantity: 1 },
      ],
      safetyMarginFraction: 0.25, // 25% margin
    });

    expect(res.result.totalRunningWatts).toBe(2000);
    expect(res.result.targetContinuousWatts).toBe(2500);
    expect(res.result.planningMarginPercent).toBe(25);
  });

  // Test 5: Peak target uses documented margin
  it("Test 5: Peak target strictly applies the specified planning headroom margin", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "motor", label: "Motor Load", runningWatts: 1000, startingWatts: 3000, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Running = 1000, Delta = 2000, Peak = 3000
    // Target Peak = 3000 * 1.20 = 3600W
    expect(res.result.totalStartingSurgeWatts).toBe(3000);
    expect(res.result.targetPeakSurgeWatts).toBe(3600);
  });

  // Test 6: Generator class matching advances when continuous rating is insufficient
  it("Test 6: Generator class fails/advances when continuous rating is insufficient", () => {
    const res = calculateGeneratorSize({
      appliances: [
        // 4000W continuous resistive load (no surge)
        { id: "heaters", label: "Heater Banks", runningWatts: 4000, startingWatts: 4000, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Continuous target = 4000 * 1.20 = 4800W
    // 3,500W-4,500W class max continuous is 3600W < 4800W -> must advance to 7,500W-9,500W class
    expect(res.result.targetContinuousWatts).toBe(4800);
    expect(res.result.recommendedPortableClass).toContain("7,500W");
  });

  // Test 7: Generator class matching advances when surge rating is insufficient
  it("Test 7: Generator class fails/advances when surge rating is insufficient even if continuous fits", () => {
    const res = calculateGeneratorSize({
      appliances: [
        // Small continuous running load (1000W) with extreme motor surge (7000W)
        { id: "compressor", label: "Heavy Compressor", runningWatts: 1000, startingWatts: 7000, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Continuous target = 1000 * 1.20 = 1200W (fits in 2000W inverter)
    // Surge delta = 6000W -> Calculated peak = 7000W -> Target peak = 7000 * 1.20 = 8400W
    // 2000W and 3500W classes cannot handle 8400W peak -> must advance to 7,500W class (maxPeak 9500W)
    expect(res.result.targetContinuousWatts).toBe(1200);
    expect(res.result.targetPeakSurgeWatts).toBe(8400);
    expect(res.result.recommendedPortableClass).toContain("7,500W");
  });

  // Test 8: Connector guidance does not make rigid prescriptive assumptions from wattage alone
  it("Test 8: Connector recommendation provides neutral verification guidance without rigid breaker prescription", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "fridge", label: "Fridge", runningWatts: 150, startingWatts: 1200, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    expect(res.result.recommendedCordGauge).toContain("Verify");
    expect(res.result.recommendedCordGauge).not.toContain("30-Amp double-pole");
  });

  // Test 9: Missing manufacturer surge data produces a clear uncertainty warning
  it("Test 9: Missing manufacturer surge data produces an informative warning", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "custom", label: "Custom Device", runningWatts: 500, startingWatts: (null as unknown as number), quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    expect(res.warnings.some((w) => w.code === "SURGE_DATA_ESTIMATED")).toBe(true);
  });

  // Test 10: Default visible example numerical verification
  it("Test 10: Default UI benchmark example produces exact verified values", () => {
    const res = calculateGeneratorSize({
      appliances: [
        { id: "refrigerator", label: "Refrigerator / Freezer", runningWatts: 150, startingWatts: 1200, quantity: 1 },
        { id: "sump-pump-half", label: "Sump Pump (1/2 HP Heavy)", runningWatts: 800, startingWatts: 2400, quantity: 1 },
        { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, startingWatts: 1000, quantity: 1 },
        { id: "wifi-modem", label: "Wi-Fi Router & Fiber Modem", runningWatts: 25, startingWatts: 25, quantity: 1 },
        { id: "led-lighting", label: "LED Home Lighting (10 Rooms)", runningWatts: 100, startingWatts: 100, quantity: 1 },
      ],
      safetyMarginFraction: 0.20,
    });

    // Running load = 150 + 800 + 1000 + 25 + 100 = 2075W
    expect(res.result.totalRunningWatts).toBe(2075);
    // Sump pump surge delta = 2400 - 800 = 1600W (vs fridge delta 1050W)
    expect(res.result.maxInductiveSurgeDelta).toBe(1600);
    // Calculated peak = 2075 + 1600 = 3675W
    expect(res.result.totalStartingSurgeWatts).toBe(3675);
    // Target continuous with 20% margin = 2075 * 1.20 = 2490W
    expect(res.result.targetContinuousWatts).toBe(2490);
    // Target peak with 20% margin = 3675 * 1.20 = 4410W
    expect(res.result.targetPeakSurgeWatts).toBe(4410);
    // Matches 3,500W–4,500W Portable Generator class (continuous max 3600 >= 2490, peak max 4800 >= 4410)
    expect(res.result.recommendedPortableClass).toContain("3,500W – 4,500W");
  });
});


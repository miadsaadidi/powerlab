import { describe, it, expect } from "vitest";
import { calculateEvBreakerSize } from "./engine";

describe("calculateEvBreakerSize Engine", () => {
  it("sizes 48A hardwired charger (60A breaker, 6 AWG THHN, 11.5 kW) correctly", () => {
    const res = calculateEvBreakerSize({
      chargingAmps: 48,
      voltage: 240,
      conductorType: "thhn_conduit",
      distanceFeet: 25,
    });

    // 48A * 1.25 = 60A breaker
    expect(res.result.minimumContinuousBreakerAmps).toBe(60);
    expect(res.result.recommendedBreakerAmps).toBe(60);
    expect(res.result.chargingPowerKw).toBe(11.5);
    // 6 AWG THHN in conduit is 75C rated (65A safe for 60A breaker)
    expect(res.result.minimumWireGaugeAwg).toBe("6 AWG");
    expect(res.result.milesPerHourAdded).toBeGreaterThan(40);
    expect(res.result.voltageDropPercentAtDistance).toBeLessThan(2.0);
  });

  it("identifies 4 AWG requirement for Romex NM-B on 60A breaker", () => {
    const res = calculateEvBreakerSize({
      chargingAmps: 48,
      voltage: 240,
      conductorType: "romex_nmb", // 6 AWG Romex is only 55A rated (60C), so 4 AWG is required for 60A breaker
    });

    expect(res.result.recommendedBreakerAmps).toBe(60);
    expect(res.result.minimumWireGaugeAwg).toBe("4 AWG");
    expect(res.warnings.some((w) => w.code === "ROMEX_60A_RESTRICTION")).toBe(true);
  });

  it("sizes 32A NEMA 14-50 plug (40A breaker, 8 AWG) accurately", () => {
    const res = calculateEvBreakerSize({
      chargingAmps: 32,
      voltage: 240,
      conductorType: "romex_nmb",
    });

    // 32A * 1.25 = 40A breaker
    expect(res.result.recommendedBreakerAmps).toBe(40);
    expect(res.result.minimumWireGaugeAwg).toBe("8 AWG");
    expect(res.result.chargingPowerKw).toBe(7.7);
    expect(res.result.milesPerHourAdded).toBeGreaterThan(25);
  });

  it("throws error for zero or negative charging amps", () => {
    expect(() =>
      calculateEvBreakerSize({
        chargingAmps: 0,
        voltage: 240,
        conductorType: "thhn_conduit",
      })
    ).toThrow();
  });
});

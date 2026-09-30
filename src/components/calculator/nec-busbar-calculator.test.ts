import { describe, it, expect } from "vitest";

// Mathematical model validation for NEC 705.12 120% Busbar Rule
function calculateNecBusbarModel(params: {
  busbarRating: number;
  mainOcpd: number;
  voltageType: "240v_split" | "208v_3phase" | "120v_single";
}) {
  const busLimit120 = params.busbarRating * 1.20;
  const rawRemainingAllowance = busLimit120 - params.mainOcpd;
  const remainingBusAllowance = Math.max(0, rawRemainingAllowance);
  const maxContinuousSourceCurrent = remainingBusAllowance / 1.25;

  const STANDARD_OCPD_RATINGS = [
    15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800,
  ];
  const eligibleOcpds = STANDARD_OCPD_RATINGS.filter((r) => r <= remainingBusAllowance);
  const exampleSourceOcpd = eligibleOcpds.length > 0 ? eligibleOcpds[eligibleOcpds.length - 1] : null;

  let maxContinuousAcPowerKw = 0;
  if (params.voltageType === "208v_3phase") {
    maxContinuousAcPowerKw = (Math.sqrt(3) * 208 * maxContinuousSourceCurrent) / 1000;
  } else if (params.voltageType === "120v_single") {
    maxContinuousAcPowerKw = (120 * maxContinuousSourceCurrent) / 1000;
  } else {
    maxContinuousAcPowerKw = (240 * maxContinuousSourceCurrent) / 1000;
  }

  return {
    busLimit120,
    remainingBusAllowance,
    maxContinuousSourceCurrent,
    exampleSourceOcpd,
    maxContinuousAcPowerKw,
  };
}

describe("NEC 705.12 120% Busbar Calculation Engine", () => {
  it("verifies 50A Bus / 50A Main lower boundary panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 50, mainOcpd: 50, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(60);
    expect(res.remainingBusAllowance).toBe(10);
    expect(res.maxContinuousSourceCurrent).toBe(8.0);
    expect(res.exampleSourceOcpd).toBe(null); // No standard breaker <= 10A in 240.6 list (min is 15A)
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(1.92, 2);
  });

  it("verifies 100A Bus / 100A Main standard panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 100, mainOcpd: 100, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(120);
    expect(res.remainingBusAllowance).toBe(20);
    expect(res.maxContinuousSourceCurrent).toBe(16.0);
    expect(res.exampleSourceOcpd).toBe(20);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(3.84, 2);
  });

  it("verifies 125A Bus / 100A Main high-capacity bus panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 125, mainOcpd: 100, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(150);
    expect(res.remainingBusAllowance).toBe(50);
    expect(res.maxContinuousSourceCurrent).toBe(40.0);
    expect(res.exampleSourceOcpd).toBe(50);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(9.60, 2);
  });

  it("verifies 125A Bus / 125A Main standard panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 125, mainOcpd: 125, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(150);
    expect(res.remainingBusAllowance).toBe(25);
    expect(res.maxContinuousSourceCurrent).toBe(20.0);
    expect(res.exampleSourceOcpd).toBe(25);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(4.80, 2);
  });

  it("verifies 150A Bus / 150A Main standard panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 150, mainOcpd: 150, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(180);
    expect(res.remainingBusAllowance).toBe(30);
    expect(res.maxContinuousSourceCurrent).toBe(24.0);
    expect(res.exampleSourceOcpd).toBe(30);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(5.76, 2);
  });

  it("verifies 200A Bus / 200A Main standard residential panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 200, mainOcpd: 200, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(240);
    expect(res.remainingBusAllowance).toBe(40);
    expect(res.maxContinuousSourceCurrent).toBe(32.0);
    expect(res.exampleSourceOcpd).toBe(40);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(7.68, 2);
  });

  it("verifies 225A Bus / 200A Main solar-ready panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 225, mainOcpd: 200, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(270);
    expect(res.remainingBusAllowance).toBe(70);
    expect(res.maxContinuousSourceCurrent).toBe(56.0);
    expect(res.exampleSourceOcpd).toBe(70);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(13.44, 2);
  });

  it("verifies 225A Bus / 225A Main standard panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 225, mainOcpd: 225, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(270);
    expect(res.remainingBusAllowance).toBe(45);
    expect(res.maxContinuousSourceCurrent).toBe(36.0);
    expect(res.exampleSourceOcpd).toBe(45);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(8.64, 2);
  });

  it("verifies 400A Bus / 400A Main commercial/large dwelling panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 400, mainOcpd: 400, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(480);
    expect(res.remainingBusAllowance).toBe(80);
    expect(res.maxContinuousSourceCurrent).toBe(64.0);
    expect(res.exampleSourceOcpd).toBe(80);
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(15.36, 2);
  });

  it("verifies 800A Bus / 800A Main upper boundary panel", () => {
    const res = calculateNecBusbarModel({ busbarRating: 800, mainOcpd: 800, voltageType: "240v_split" });
    expect(res.busLimit120).toBe(960);
    expect(res.remainingBusAllowance).toBe(160);
    expect(res.maxContinuousSourceCurrent).toBe(128.0);
    expect(res.exampleSourceOcpd).toBe(150); // 150A standard OCPD <= 160A
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(30.72, 2);
  });

  it("verifies 800A Bus / 600A Main commercial setup", () => {
    const res = calculateNecBusbarModel({ busbarRating: 800, mainOcpd: 600, voltageType: "208v_3phase" });
    expect(res.busLimit120).toBe(960);
    expect(res.remainingBusAllowance).toBe(360);
    expect(res.maxContinuousSourceCurrent).toBe(288.0);
    expect(res.exampleSourceOcpd).toBe(350); // 350A standard OCPD <= 360A
    // sqrt(3) * 208 * 288 / 1000 ≈ 103.75 kW
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(103.75, 1);
  });

  it("verifies 208V 3-Phase power calculation for 200A/200A setup", () => {
    const res = calculateNecBusbarModel({ busbarRating: 200, mainOcpd: 200, voltageType: "208v_3phase" });
    expect(res.maxContinuousSourceCurrent).toBe(32.0);
    // sqrt(3) * 208 * 32 / 1000 = 1.73205 * 208 * 32 / 1000 = 11.5285 kW
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(11.53, 2);
  });

  it("verifies 120V single-leg power calculation for 200A/200A setup", () => {
    const res = calculateNecBusbarModel({ busbarRating: 200, mainOcpd: 200, voltageType: "120v_single" });
    expect(res.maxContinuousSourceCurrent).toBe(32.0);
    // 120 * 32 / 1000 = 3.84 kW
    expect(res.maxContinuousAcPowerKw).toBeCloseTo(3.84, 2);
  });

  it("verifies main breaker derating scenarios on 200A busbar", () => {
    // 175A derate
    const derate175 = calculateNecBusbarModel({ busbarRating: 200, mainOcpd: 175, voltageType: "240v_split" });
    expect(derate175.remainingBusAllowance).toBe(65);
    expect(derate175.maxContinuousSourceCurrent).toBe(52.0);
    expect(derate175.exampleSourceOcpd).toBe(60); // 60A is the nearest standard OCPD <= 65A
    expect(derate175.maxContinuousAcPowerKw).toBeCloseTo(12.48, 2);

    // 150A derate
    const derate150 = calculateNecBusbarModel({ busbarRating: 200, mainOcpd: 150, voltageType: "240v_split" });
    expect(derate150.remainingBusAllowance).toBe(90);
    expect(derate150.maxContinuousSourceCurrent).toBe(72.0);
    expect(derate150.exampleSourceOcpd).toBe(90); // 90A is standard OCPD <= 90A
    expect(derate150.maxContinuousAcPowerKw).toBeCloseTo(17.28, 2);
  });
});

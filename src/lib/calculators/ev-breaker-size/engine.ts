import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface EvBreakerSizeInput {
  chargingAmps: number;
  voltage: 240 | 208 | 120;
  conductorType: "thhn_conduit" | "romex_nmb";
  conductorMaterial?: "copper" | "aluminum";
  distanceFeet?: number; // default 25 ft
}

export interface EvBreakerSizeResultData {
  chargingAmps: number;
  supplyVoltage: number;
  chargingPowerKw: number;
  milesPerHourAdded: number;
  
  // Breaker Requirements (NEC 125% continuous rule)
  minimumContinuousBreakerAmps: number;
  recommendedBreakerAmps: number;
  recommendedBreakerType: string;
  
  // Conductor Sizing
  conductorType: "thhn_conduit" | "romex_nmb";
  conductorMaterial: "copper" | "aluminum";
  minimumWireGaugeAwg: string;
  maxContinuousLoadAmps: number; // 80% of breaker
  
  voltageDropPercentAtDistance: number;
  distanceFeet: number;
}

export type EvBreakerSizeResult = CalculationResult<EvBreakerSizeResultData>;

export function calculateEvBreakerSize(input: EvBreakerSizeInput): EvBreakerSizeResult {
  const {
    chargingAmps,
    voltage,
    conductorType,
    conductorMaterial = "copper",
    distanceFeet = 25,
  } = input;

  if (!Number.isFinite(chargingAmps) || chargingAmps <= 0) {
    throw new Error("EV charging current (Amps) must be greater than zero.");
  }

  const chargingPowerKw = Number(((voltage * chargingAmps) / 1000).toFixed(1));
  // Average EV efficiency: ~3.8 miles per kWh added at Level 2 charging
  const milesPerHourAdded = Math.round(chargingPowerKw * 3.8);

  // NEC Article 625.41 / 210.20 Continuous Duty Rule: Breaker = 125% of Continuous Load
  const minimumContinuousBreakerAmps = Number((chargingAmps * 1.25).toFixed(1));
  const standardBreakers = [15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 125];
  const recommendedBreakerAmps = standardBreakers.find((b) => b >= minimumContinuousBreakerAmps) ?? Math.ceil(minimumContinuousBreakerAmps / 10) * 10;

  const recommendedBreakerType = `${recommendedBreakerAmps} Amp Double-Pole 240V Breaker`;
  const maxContinuousLoadAmps = Number((recommendedBreakerAmps * 0.8).toFixed(1));

  // Wire Sizing (NEC Table 310.16)
  let minimumWireGaugeAwg = "10 AWG";
  if (conductorType === "thhn_conduit") {
    // 75°C Column for THHN
    if (recommendedBreakerAmps <= 20) minimumWireGaugeAwg = "12 AWG";
    else if (recommendedBreakerAmps <= 30) minimumWireGaugeAwg = "10 AWG";
    else if (recommendedBreakerAmps <= 50) minimumWireGaugeAwg = "8 AWG";
    else if (recommendedBreakerAmps <= 65) minimumWireGaugeAwg = "6 AWG";
    else if (recommendedBreakerAmps <= 85) minimumWireGaugeAwg = "4 AWG";
    else if (recommendedBreakerAmps <= 100) minimumWireGaugeAwg = "3 AWG";
    else minimumWireGaugeAwg = "2 AWG";
  } else {
    // 60°C Column for Romex NM-B
    if (recommendedBreakerAmps <= 20) minimumWireGaugeAwg = "12 AWG";
    else if (recommendedBreakerAmps <= 30) minimumWireGaugeAwg = "10 AWG";
    else if (recommendedBreakerAmps <= 40) minimumWireGaugeAwg = "8 AWG";
    else if (recommendedBreakerAmps <= 55) minimumWireGaugeAwg = "6 AWG";
    else if (recommendedBreakerAmps <= 70) minimumWireGaugeAwg = "4 AWG";
    else if (recommendedBreakerAmps <= 85) minimumWireGaugeAwg = "3 AWG";
    else minimumWireGaugeAwg = "2 AWG";
  }

  // Voltage Drop Estimation for the run (assuming 2-wire 240V single phase)
  const circularMilsMap: Record<string, number> = {
    "12 AWG": 6530,
    "10 AWG": 10380,
    "8 AWG": 16510,
    "6 AWG": 26240,
    "4 AWG": 41740,
    "3 AWG": 52620,
    "2 AWG": 66360,
  };
  const cMils = circularMilsMap[minimumWireGaugeAwg] || 26240;
  const kConstant = conductorMaterial === "aluminum" ? 21.2 : 12.9;
  const vDropVolts = (2 * kConstant * chargingAmps * distanceFeet) / cMils;
  const voltageDropPercentAtDistance = Number(((vDropVolts / voltage) * 100).toFixed(2));

  const assumptions: AssumptionUsed[] = [
    {
      key: "nec_continuous_rule",
      value: "125% (Article 625)",
      provenance: "preset",
      description: "NEC requirement that EV charging branch circuits must be sized for 125% of continuous current",
    },
    {
      key: "ev_efficiency_mph",
      value: "3.8 mi/kWh",
      provenance: "preset",
      description: "Typical Level 2 charging efficiency and vehicle consumption benchmark",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (chargingAmps === 48 && conductorType === "romex_nmb") {
    warnings.push({
      code: "ROMEX_60A_RESTRICTION",
      severity: "caution",
      message: "For a 48A charger requiring a 60A breaker, Romex (NM-B) requires 4 AWG wire (60°C rated at 70A). 6 AWG Romex is only rated for 55A and violates NEC code on a 60A breaker. THHN in conduit allows 6 AWG.",
    });
  }

  if (voltageDropPercentAtDistance > 3.0) {
    warnings.push({
      code: "DISTANCE_VOLTAGE_DROP",
      severity: "info",
      message: `Voltage drop over ${distanceFeet} ft run is ${voltageDropPercentAtDistance}%. Consider stepping up one wire gauge size for runs over 60 feet.`,
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      chargingAmps,
      supplyVoltage: voltage,
      chargingPowerKw,
      milesPerHourAdded,
      minimumContinuousBreakerAmps,
      recommendedBreakerAmps,
      recommendedBreakerType,
      conductorType,
      conductorMaterial,
      minimumWireGaugeAwg,
      maxContinuousLoadAmps,
      voltageDropPercentAtDistance,
      distanceFeet,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

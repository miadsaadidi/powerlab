import { WIRE_GAUGES, type WireGauge } from "../../../data/wire-gauges";
import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export type CircuitType = "dc" | "ac_single_phase" | "ac_three_phase";
export type ConductorMaterial = "copper" | "aluminum";

export interface VoltageDropInput {
  circuitType: CircuitType;
  voltage: number;
  currentAmps: number;
  distanceFeet: number;
  conductorMaterial: ConductorMaterial;
  targetMaxDropPercent?: number;
  customAwg?: string;
}

export interface WireGaugeEvaluation {
  gauge: WireGauge;
  voltageDropVolts: number;
  voltageDropPercent: number;
  endVoltage: number;
  powerLostWatts: number;
  isAmpacitySafe: boolean;
  meetsTargetDrop: boolean;
}

export interface VoltageDropResultData {
  circuitType: CircuitType;
  nominalVoltage: number;
  currentAmps: number;
  distanceFeet: number;
  conductorMaterial: ConductorMaterial;
  targetMaxDropPercent: number;
  
  // Selected / Optimal Gauge
  recommendedGauge: WireGauge;
  voltageDropVolts: number;
  voltageDropPercent: number;
  endVoltage: number;
  powerLostWatts: number;
  isAmpacitySafe: boolean;
  necComplianceStatus: "pass" | "marginal" | "fail";
  
  // Table of all available gauges evaluated
  evaluations: WireGaugeEvaluation[];
}

export type VoltageDropResult = CalculationResult<VoltageDropResultData>;

const COPPER_K = 12.9; // ohms-cmil/ft at 75°C
const ALUMINUM_K = 21.2; // ohms-cmil/ft at 75°C

export function calculateVoltageDrop(input: VoltageDropInput): VoltageDropResult {
  const {
    circuitType,
    voltage,
    currentAmps,
    distanceFeet,
    conductorMaterial,
    targetMaxDropPercent = 3.0,
    customAwg,
  } = input;

  if (!Number.isFinite(voltage) || voltage <= 0) {
    throw new Error("Nominal voltage must be greater than zero.");
  }
  if (!Number.isFinite(currentAmps) || currentAmps <= 0) {
    throw new Error("Current (Amps) must be greater than zero.");
  }
  if (!Number.isFinite(distanceFeet) || distanceFeet <= 0) {
    throw new Error("Distance must be greater than zero.");
  }

  const kConstant = conductorMaterial === "aluminum" ? ALUMINUM_K : COPPER_K;
  const circuitMultiplier = circuitType === "ac_three_phase" ? 1.732 : 2.0;

  // Evaluate all wire gauges
  const evaluations: WireGaugeEvaluation[] = WIRE_GAUGES.map((gauge) => {
    const vDropVolts = (circuitMultiplier * kConstant * currentAmps * distanceFeet) / gauge.circularMils;
    const vDropPercent = (vDropVolts / voltage) * 100;
    const endV = Math.max(0, voltage - vDropVolts);
    const pLossWatts = vDropVolts * currentAmps;
    const maxAmpacity = conductorMaterial === "aluminum" ? gauge.maxAmpacityAluminum75C : gauge.maxAmpacityCopper75C;
    const isAmpacitySafe = currentAmps <= maxAmpacity;
    const meetsTargetDrop = vDropPercent <= targetMaxDropPercent;

    return {
      gauge,
      voltageDropVolts: Number(vDropVolts.toFixed(3)),
      voltageDropPercent: Number(vDropPercent.toFixed(2)),
      endVoltage: Number(endV.toFixed(2)),
      powerLostWatts: Number(pLossWatts.toFixed(2)),
      isAmpacitySafe,
      meetsTargetDrop,
    };
  });

  // Determine recommended gauge: smallest gauge that is ampacity safe AND meets target drop
  let recommendedEval = evaluations.find((e) => e.isAmpacitySafe && e.meetsTargetDrop);
  if (!recommendedEval) {
    // If none meet target drop, pick the largest available safe gauge
    recommendedEval = [...evaluations].reverse().find((e) => e.isAmpacitySafe) ?? evaluations[evaluations.length - 1];
  }

  // If user specifically requested customAwg, use that for primary display
  let selectedEval = recommendedEval;
  if (customAwg) {
    const found = evaluations.find((e) => e.gauge.awg === customAwg);
    if (found) selectedEval = found;
  }

  let necComplianceStatus: "pass" | "marginal" | "fail" = "pass";
  if (selectedEval.voltageDropPercent > 5.0 || !selectedEval.isAmpacitySafe) {
    necComplianceStatus = "fail";
  } else if (selectedEval.voltageDropPercent > 3.0) {
    necComplianceStatus = "marginal";
  }

  const assumptions: AssumptionUsed[] = [
    {
      key: "k_constant",
      value: kConstant,
      unit: "ohms-cmil/ft",
      provenance: "preset",
      description: `${conductorMaterial === "aluminum" ? "Aluminum" : "Copper"} conductor resistivity at 75°C standard operating temperature`,
    },
    {
      key: "circuit_multiplier",
      value: circuitMultiplier,
      provenance: "preset",
      description: circuitType === "ac_three_phase" ? "3-Phase multiplier (1.732)" : "2-Wire round-trip multiplier (2.0)",
    },
    {
      key: "target_max_drop",
      value: targetMaxDropPercent,
      unit: "%",
      provenance: "user-entered",
      description: "Maximum allowable voltage drop threshold based on NEC recommendations",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (!selectedEval.isAmpacitySafe) {
    warnings.push({
      code: "AMPACITY_EXCEEDED",
      severity: "caution",
      message: `Selected ${selectedEval.gauge.awg} wire exceeds safe NEC current capacity (${conductorMaterial === "aluminum" ? selectedEval.gauge.maxAmpacityAluminum75C : selectedEval.gauge.maxAmpacityCopper75C}A max vs ${currentAmps}A load). Fire hazard!`,
    });
  } else if (selectedEval.voltageDropPercent > 5.0) {
    warnings.push({
      code: "EXCESSIVE_VOLTAGE_DROP",
      severity: "caution",
      message: `Voltage drop of ${selectedEval.voltageDropPercent}% exceeds 5% critical limit. Inverters, electronics, and LED drivers may malfunction.`,
    });
  } else if (selectedEval.voltageDropPercent > 3.0) {
    warnings.push({
      code: "MARGINAL_VOLTAGE_DROP",
      severity: "info",
      message: `Voltage drop of ${selectedEval.voltageDropPercent}% is between 3% and 5%. Acceptable for general lighting, but 3% or lower is recommended for sensitive DC equipment.`,
    });
  }

  return {
    formulaVersion: "1.0.0",
    result: {
      circuitType,
      nominalVoltage: voltage,
      currentAmps,
      distanceFeet,
      conductorMaterial,
      targetMaxDropPercent,
      recommendedGauge: selectedEval.gauge,
      voltageDropVolts: selectedEval.voltageDropVolts,
      voltageDropPercent: selectedEval.voltageDropPercent,
      endVoltage: selectedEval.endVoltage,
      powerLostWatts: selectedEval.powerLostWatts,
      isAmpacitySafe: selectedEval.isAmpacitySafe,
      necComplianceStatus,
      evaluations,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

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
  meetsTargetDrop: boolean;
  designTargetStatus: "pass" | "marginal" | "fail";
  necComplianceStatus: "pass" | "marginal" | "fail"; // Backwards compatibility
  
  // Table of all available gauges evaluated
  evaluations: WireGaugeEvaluation[];
}

export type VoltageDropResult = CalculationResult<VoltageDropResultData>;

const COPPER_K = 12.9; // ohms-cmil/ft at 75°C (NEC Chapter 9, Table 8 basis)
const ALUMINUM_K = 21.2; // ohms-cmil/ft at 75°C (NEC Chapter 9, Table 8 basis)

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
    // For aluminum, small gauges (<12 AWG) have maxAmpacity 0 and are not valid
    const isAmpacitySafe = maxAmpacity > 0 && currentAmps <= maxAmpacity;
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

  // Determine recommended gauge: smallest gauge satisfying target drop and valid for material
  let recommendedEval = evaluations.find((e) => {
    const maxAmp = conductorMaterial === "aluminum" ? e.gauge.maxAmpacityAluminum75C : e.gauge.maxAmpacityCopper75C;
    return maxAmp > 0 && e.isAmpacitySafe && e.meetsTargetDrop;
  });

  if (!recommendedEval) {
    // If none meet both ampacity and target drop, pick smallest gauge meeting target drop
    recommendedEval = evaluations.find((e) => {
      const maxAmp = conductorMaterial === "aluminum" ? e.gauge.maxAmpacityAluminum75C : e.gauge.maxAmpacityCopper75C;
      return maxAmp > 0 && e.meetsTargetDrop;
    });
  }

  if (!recommendedEval) {
    // If no available gauge in table meets target drop, pick largest available gauge
    const validMaterialGauges = evaluations.filter((e) => {
      const maxAmp = conductorMaterial === "aluminum" ? e.gauge.maxAmpacityAluminum75C : e.gauge.maxAmpacityCopper75C;
      return maxAmp > 0;
    });
    recommendedEval = validMaterialGauges[validMaterialGauges.length - 1] ?? evaluations[evaluations.length - 1];
  }

  // If user specifically requested customAwg, use that for primary display
  let selectedEval = recommendedEval;
  if (customAwg) {
    const found = evaluations.find((e) => e.gauge.awg === customAwg);
    if (found) selectedEval = found;
  }

  let designTargetStatus: "pass" | "marginal" | "fail" = "pass";
  if (selectedEval.voltageDropPercent > 5.0 || !selectedEval.isAmpacitySafe) {
    designTargetStatus = "fail";
  } else if (selectedEval.voltageDropPercent > targetMaxDropPercent) {
    designTargetStatus = "marginal";
  }

  const assumptions: AssumptionUsed[] = [
    {
      key: "k_constant",
      value: kConstant,
      unit: "ohms-cmil/ft",
      provenance: "preset",
      description: `${conductorMaterial === "aluminum" ? "Aluminum" : "Copper"} conductor resistivity at 75°C operating temperature basis (NEC Chapter 9, Table 8)`,
    },
    {
      key: "circuit_multiplier",
      value: circuitMultiplier,
      provenance: "preset",
      description: circuitType === "ac_three_phase" ? "Simplified balanced 3-Phase multiplier (1.732) line-to-line" : "2-Wire round-trip loop multiplier (2.0)",
    },
    {
      key: "target_max_drop",
      value: targetMaxDropPercent,
      unit: "%",
      provenance: "user-entered",
      description: "Selected engineering design target threshold (e.g. 3.0% branch circuit guideline per NEC Informational Notes)",
    },
  ];

  const warnings: CalculationWarning[] = [];
  const refAmpacity = conductorMaterial === "aluminum" ? selectedEval.gauge.maxAmpacityAluminum75C : selectedEval.gauge.maxAmpacityCopper75C;
  if (!selectedEval.isAmpacitySafe) {
    warnings.push({
      code: "AMPACITY_EXCEEDED",
      severity: "caution",
      message: `Selected ${selectedEval.gauge.awg} wire exceeds 75°C reference ampacity (${refAmpacity}A reference vs ${currentAmps}A load). Verify conductor thermal ampacity, terminal ratings, and applicable code rules.`,
    });
  } else if (selectedEval.voltageDropPercent > 5.0) {
    warnings.push({
      code: "EXCESSIVE_VOLTAGE_DROP",
      severity: "caution",
      message: `Voltage drop of ${selectedEval.voltageDropPercent}% exceeds the 5.0% threshold. Connected equipment or inverters may experience undervoltage.`,
    });
  } else if (selectedEval.voltageDropPercent > targetMaxDropPercent) {
    warnings.push({
      code: "MARGINAL_VOLTAGE_DROP",
      severity: "info",
      message: `Voltage drop of ${selectedEval.voltageDropPercent}% exceeds the selected ${targetMaxDropPercent}% design target. Consider upsizing conductor for improved efficiency.`,
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
      meetsTargetDrop: selectedEval.meetsTargetDrop,
      designTargetStatus,
      necComplianceStatus: designTargetStatus,
      evaluations,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

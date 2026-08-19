import type { CalculationResult } from "@/types/calculation";

export type PortablePowerMode = "runtime" | "capacity";
export type PortableLoadMode = "direct-watts" | "equipment";
export type ContinuousCapability = "valid" | "overload" | "unknown";
export type SurgeCheck = "passes" | "confirmed-overload" | "incomplete" | "unknown";

export interface PortableEquipmentInput {
  label: string;
  watts: number;
  quantity: number;
  dutyCycle: number;
  surgeWatts: number | null;
}

export interface PortableDirectLoadInput {
  loadMode: "direct-watts";
  directLoadW: number;
  peakLoadW: number | null;
}

export interface PortableEquipmentLoadInput {
  loadMode: "equipment";
  equipment: PortableEquipmentInput[];
}

export type PortableLoadInput = PortableDirectLoadInput | PortableEquipmentLoadInput;

export interface PortableRuntimeInput {
  mode: "runtime";
  capacityWh: number;
  load: PortableLoadInput;
  continuousOutputW: number | null;
  surgeOutputW: number | null;
  acEfficiency: number;
  reserveFraction: number;
  batteryHealth: number;
}

export interface PortableCapacityInput {
  mode: "capacity";
  desiredRuntimeHours: number;
  load: PortableLoadInput;
  continuousOutputW: number | null;
  surgeOutputW: number | null;
  acEfficiency: number;
  reserveFraction: number;
  batteryHealth: number;
}

export type PortablePowerStationInput = PortableRuntimeInput | PortableCapacityInput;

export interface PortableRuntimeComparison {
  multiplier: number;
  averageLoadW: number;
  connectedRunningW: number;
  runtimeHours: number;
  continuousCapability: ContinuousCapability;
  current: boolean;
}

export interface PortableRuntimeTargetComparison {
  multiplier: number;
  runtimeHours: number;
  requiredNominalWh: number;
  current: boolean;
}

export type PortablePowerStationResult = CalculationResult<{
  mode: PortablePowerMode;
  averageLoadW: number;
  connectedRunningW: number;
  startupLoadW: number | null;
  minimumKnownStartupW: number | null;
  startupDataComplete: boolean;
  usableStoredWh: number | null;
  deliveredAcWh: number | null;
  runtimeHours: number | null;
  requiredDeliveredWh: number | null;
  requiredNominalWh: number | null;
  continuousCapability: ContinuousCapability;
  surgeCheck: SurgeCheck;
  runtimeComparisons: PortableRuntimeComparison[];
  runtimeTargetComparisons: PortableRuntimeTargetComparison[];
}>;

const positive = (value: number) => Number.isFinite(value) && value > 0;
const fraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;
const optionalPositive = (value: number | null) => value === null || positive(value);

function resolveLoad(load: PortableLoadInput) {
  if (load.loadMode === "direct-watts") {
    if (!positive(load.directLoadW)) throw new Error("Enter an average AC load greater than zero.");
    if (load.peakLoadW !== null && (!positive(load.peakLoadW) || load.peakLoadW < load.directLoadW)) throw new Error("Peak load must be at least the direct running load.");
    return {
      averageLoadW: load.directLoadW,
      connectedRunningW: load.directLoadW,
      startupLoadW: load.peakLoadW,
      minimumKnownStartupW: load.peakLoadW,
      startupDataComplete: load.peakLoadW !== null,
    };
  }

  if (load.equipment.length === 0 || !load.equipment.every((row) => positive(row.watts) && Number.isInteger(row.quantity) && row.quantity >= 1 && Number.isFinite(row.dutyCycle) && row.dutyCycle > 0 && row.dutyCycle <= 1 && (row.surgeWatts === null || (positive(row.surgeWatts) && row.surgeWatts >= row.watts)))) {
    throw new Error("Add equipment with valid watts, quantity and duty-cycle values.");
  }
  const averageLoadW = load.equipment.reduce((sum, row) => sum + row.watts * row.quantity * row.dutyCycle, 0);
  const connectedRunningW = load.equipment.reduce((sum, row) => sum + row.watts * row.quantity, 0);
  const startupDataComplete = load.equipment.every((row) => row.surgeWatts !== null);
  const minimumKnownStartupW = load.equipment.reduce((sum, row) => sum + (row.surgeWatts ?? row.watts) * row.quantity, 0);
  const startupLoadW = startupDataComplete ? minimumKnownStartupW : null;
  return { averageLoadW, connectedRunningW, startupLoadW, minimumKnownStartupW, startupDataComplete };
}

function capability(connectedRunningW: number, continuousOutputW: number | null): ContinuousCapability {
  if (continuousOutputW === null) return "unknown";
  return connectedRunningW > continuousOutputW ? "overload" : "valid";
}

function surgeCheck(load: ReturnType<typeof resolveLoad>, surgeOutputW: number | null): SurgeCheck {
  if (surgeOutputW === null) return "unknown";
  if (!load.startupDataComplete) return load.minimumKnownStartupW! > surgeOutputW ? "confirmed-overload" : "incomplete";
  return load.startupLoadW! > surgeOutputW ? "confirmed-overload" : "passes";
}

export function calculatePortablePowerStation(input: PortablePowerStationInput): PortablePowerStationResult {
  if (!optionalPositive(input.continuousOutputW) || !optionalPositive(input.surgeOutputW)) throw new Error("Output ratings must be greater than zero when supplied.");
  if (!fraction(input.acEfficiency) || !Number.isFinite(input.reserveFraction) || input.reserveFraction < 0 || input.reserveFraction >= 1 || !fraction(input.batteryHealth)) throw new Error("Efficiency, reserve and battery health values must be valid percentages.");
  const load = resolveLoad(input.load);
  const continuousCapability = capability(load.connectedRunningW, input.continuousOutputW);
  const checkedSurge = surgeCheck(load, input.surgeOutputW);
  const warnings: PortablePowerStationResult["warnings"] = [{ code: "SIMPLIFIED_MODEL", severity: "info", message: "This is a planning estimate; actual station behavior and manufacturer limits may differ." }];
  if (continuousCapability === "overload") warnings.push({ code: "CONTINUOUS_OUTPUT_OVERLOAD", severity: "caution", message: "The listed running load exceeds the station's continuous AC output." });
  if (continuousCapability === "unknown") warnings.push({ code: "UNKNOWN_CONTINUOUS_OUTPUT", severity: "info", message: "Continuous output not checked; confirm the station's rated continuous AC output." });
  if (checkedSurge === "confirmed-overload") warnings.push({ code: "SURGE_OVERLOAD", severity: "caution", message: "Known startup demand exceeds the station's surge output." });
  if (checkedSurge === "incomplete") warnings.push({ code: "INCOMPLETE_STARTUP_DATA", severity: "info", message: "Startup capability not fully checked because startup watts are missing for one or more appliances." });
  if (checkedSurge === "unknown") warnings.push({ code: "UNKNOWN_SURGE_OUTPUT", severity: "info", message: "Startup capability not fully checked; confirm the station's surge or peak output rating." });

  const usableStoredWh = input.mode === "runtime" ? input.capacityWh * (1 - input.reserveFraction) * input.batteryHealth : null;
  const deliveredAcWh = usableStoredWh === null ? null : usableStoredWh * input.acEfficiency;
  const runtimeHours = input.mode === "runtime" ? deliveredAcWh! / load.averageLoadW : null;
  const requiredDeliveredWh = input.mode === "capacity" ? load.averageLoadW * input.desiredRuntimeHours : null;
  const requiredNominalWh = requiredDeliveredWh === null ? null : requiredDeliveredWh / input.acEfficiency / ((1 - input.reserveFraction) * input.batteryHealth);
  if (input.mode === "runtime" && !positive(input.capacityWh)) throw new Error("Enter a rated battery capacity greater than zero.");
  if (input.mode === "capacity" && !positive(input.desiredRuntimeHours)) throw new Error("Enter a desired runtime greater than zero.");

  const runtimeComparisons = input.mode === "runtime" ? [0.5, 1, 1.5].map((multiplier) => ({ multiplier, averageLoadW: load.averageLoadW * multiplier, connectedRunningW: load.connectedRunningW * multiplier, runtimeHours: runtimeHours! / multiplier, continuousCapability: capability(load.connectedRunningW * multiplier, input.continuousOutputW), current: multiplier === 1 })) : [];
  const runtimeTargetComparisons = input.mode === "capacity" ? [0.5, 1, 2].map((multiplier) => ({ multiplier, runtimeHours: input.desiredRuntimeHours * multiplier, requiredNominalWh: requiredNominalWh! * multiplier, current: multiplier === 1 })) : [];

  return {
    formulaVersion: "1.0.0",
    result: { mode: input.mode, averageLoadW: load.averageLoadW, connectedRunningW: load.connectedRunningW, startupLoadW: load.startupLoadW, minimumKnownStartupW: load.minimumKnownStartupW, startupDataComplete: load.startupDataComplete, usableStoredWh, deliveredAcWh, runtimeHours, requiredDeliveredWh, requiredNominalWh, continuousCapability, surgeCheck: checkedSurge, runtimeComparisons, runtimeTargetComparisons },
    assumptions: [
      { key: "acEfficiency", value: input.acEfficiency, unit: "%", provenance: "user-entered", description: "AC conversion efficiency" },
      { key: "reserveFraction", value: input.reserveFraction, unit: "%", provenance: "user-entered", description: "Reserved battery fraction" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Available battery capacity relative to nominal" },
    ],
    warnings,
    qualityLabel: input.load.loadMode === "equipment" ? "preset-assisted" : "specific-inputs",
  };
}

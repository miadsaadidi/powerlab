import type { CalculationResult } from "@/types/calculation";

export type BatteryCapacityMode = "direct-wh" | "battery-bank";
export type LoadMode = "direct-watts" | "equipment";
export type UpsMaxWattsSource = "rated-watts" | "estimated-from-va" | "unknown";
export type OverloadState = "none" | "confirmed-overload" | "estimated-overload" | "unknown";

export interface UpsEquipmentInput { label: string; watts: number; quantity: number; }

export interface UpsRuntimeInput {
  batteryCapacityMode: BatteryCapacityMode;
  directWh: number;
  batteryVoltage: number;
  batteryAh: number;
  batteryCount: number;
  loadMode: LoadMode;
  directLoadW: number;
  equipment: UpsEquipmentInput[];
  usableFraction: number;
  batteryHealth: number;
  upsEfficiency: number;
  ratedUpsMaxWatts: number | null;
  upsVA: number | null;
  assumedUpsOutputPowerFactor: number;
  batteryChemistry?: string;
}

export type UpsRuntimeResult = CalculationResult<{
  nominalWh: number;
  usableWh: number;
  loadW: number;
  batterySideLoadW: number;
  runtimeHours: number;
  upsCapabilityWatts: number | null;
  upsCapabilitySource: UpsMaxWattsSource;
  loadPercent: number | null;
  overloadState: OverloadState;
}>;

const positive = (value: number) => Number.isFinite(value) && value > 0;
const fraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;

export function calculateUpsRuntime(input: UpsRuntimeInput): UpsRuntimeResult {
  const nominalWh = input.batteryCapacityMode === "direct-wh"
    ? input.directWh
    : input.batteryVoltage * input.batteryAh * input.batteryCount;
  if (input.batteryCapacityMode === "direct-wh" && !positive(input.directWh)) throw new Error("Enter battery energy greater than zero.");
  if (input.batteryCapacityMode === "battery-bank") {
    if (!positive(input.batteryVoltage) || !positive(input.batteryAh)) throw new Error("Enter a battery voltage and Ah capacity greater than zero.");
    if (!Number.isFinite(input.batteryCount) || input.batteryCount < 1 || !Number.isInteger(input.batteryCount)) throw new Error("Battery count must be a whole number of at least 1.");
  }
  if (!positive(nominalWh)) throw new Error("Enter a battery capacity greater than zero.");
  const loadW = input.loadMode === "direct-watts"
    ? input.directLoadW
    : input.equipment.reduce((sum, row) => sum + row.watts * row.quantity, 0);
  if (input.loadMode === "direct-watts" && !positive(input.directLoadW)) throw new Error("Enter a load greater than zero.");
  if (input.loadMode === "equipment" && (input.equipment.length === 0 || !input.equipment.every((row) => positive(row.watts) && Number.isInteger(row.quantity) && row.quantity >= 1))) throw new Error("Add equipment with watts and a whole-number quantity of at least 1.");
  if (!fraction(input.usableFraction) || !fraction(input.batteryHealth) || !fraction(input.upsEfficiency)) throw new Error("Usable fraction, health and efficiency must be greater than 0% and no more than 100%.");
  if (input.ratedUpsMaxWatts !== null && !positive(input.ratedUpsMaxWatts)) throw new Error("Rated UPS maximum watts must be greater than zero.");
  if (input.ratedUpsMaxWatts === null && input.upsVA !== null && (!positive(input.upsVA) || !fraction(input.assumedUpsOutputPowerFactor))) throw new Error("UPS VA and assumed power factor must be valid before estimating watt capability.");
  if (!positive(loadW)) throw new Error("Enter a load greater than zero.");
  const capabilitySource: UpsMaxWattsSource = positive(input.ratedUpsMaxWatts ?? 0) ? "rated-watts" : positive(input.upsVA ?? 0) ? "estimated-from-va" : "unknown";
  const capabilityWatts = capabilitySource === "rated-watts" ? input.ratedUpsMaxWatts! : capabilitySource === "estimated-from-va" ? input.upsVA! * input.assumedUpsOutputPowerFactor : null;
  const overloadState: OverloadState = capabilityWatts === null ? "unknown" : loadW > capabilityWatts ? capabilitySource === "rated-watts" ? "confirmed-overload" : "estimated-overload" : "none";
  const usableWh = nominalWh * input.usableFraction * input.batteryHealth;
  const batterySideLoadW = loadW / input.upsEfficiency;
  const warnings: UpsRuntimeResult["warnings"] = [{ code: "SIMPLIFIED_MODEL", severity: "info", message: "This is a simplified usable-energy estimate; manufacturer runtime curves are preferred for a specific UPS model." }];
  if (overloadState === "confirmed-overload") warnings.push({ code: "CONFIRMED_OVERLOAD", severity: "caution", message: "Load exceeds the UPS rated watt capacity." });
  if (overloadState === "estimated-overload") warnings.push({ code: "ESTIMATED_OVERLOAD", severity: "caution", message: "Load exceeds the estimated watt capability based on VA and assumed power factor. Check the UPS manufacturer's watt rating." });
  if (overloadState === "unknown") warnings.push({ code: "UNKNOWN_CAPABILITY", severity: "info", message: "UPS power capability is unknown; confirm that the UPS watt rating supports this load." });
  return { formulaVersion: "1.0.0", result: { nominalWh, usableWh, loadW, batterySideLoadW, runtimeHours: usableWh / batterySideLoadW, upsCapabilityWatts: capabilityWatts, upsCapabilitySource: capabilitySource, loadPercent: capabilityWatts ? loadW / capabilityWatts : null, overloadState }, assumptions: [{ key: "usableFraction", value: input.usableFraction, unit: "%", provenance: "user-entered", description: "Usable battery fraction; editable planning assumption" }, { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Battery health" }, { key: "upsEfficiency", value: input.upsEfficiency, unit: "%", provenance: "user-entered", description: "UPS efficiency" }, ...(capabilitySource === "estimated-from-va" ? [{ key: "assumedUpsOutputPowerFactor", value: input.assumedUpsOutputPowerFactor, provenance: "preset" as const, description: "Assumed UPS output power factor" }] : [])], warnings, qualityLabel: "preset-assisted" };
}

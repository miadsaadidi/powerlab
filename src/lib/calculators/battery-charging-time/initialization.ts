export interface BatteryChargingInitializationInput {
  saved: {
    chemistry: string | null;
    batteryChargeEfficiency: number | null;
    planningOverheadFactor: number | null;
    planningOverheadEnabled: boolean | null;
  };
  chemistryDefaults: { batteryChargeEfficiency: number; planningOverheadFactor: number };
  hardcoded: { chemistry: string; batteryChargeEfficiency: number; planningOverheadFactor: number; planningOverheadEnabled: boolean };
}

export interface BatteryChargingInitialization {
  chemistry: string;
  batteryChargeEfficiency: number;
  planningOverheadFactor: number;
  planningOverheadEnabled: boolean;
  planningOverheadCustomized: boolean;
  efficiencyCustomized: boolean;
}

export function resolveBatteryChargingInitialization(input: BatteryChargingInitializationInput): BatteryChargingInitialization {
  return {
    chemistry: input.saved.chemistry ?? input.hardcoded.chemistry,
    batteryChargeEfficiency: input.saved.batteryChargeEfficiency ?? input.chemistryDefaults.batteryChargeEfficiency ?? input.hardcoded.batteryChargeEfficiency,
    planningOverheadFactor: input.saved.planningOverheadFactor ?? input.chemistryDefaults.planningOverheadFactor ?? input.hardcoded.planningOverheadFactor,
    planningOverheadEnabled: input.saved.planningOverheadEnabled ?? input.hardcoded.planningOverheadEnabled,
    planningOverheadCustomized: input.saved.planningOverheadFactor !== null,
    efficiencyCustomized: input.saved.batteryChargeEfficiency !== null,
  };
}

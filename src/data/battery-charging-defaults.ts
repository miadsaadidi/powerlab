export type BatteryChargingMode = "ah-amps" | "energy-power";

export const BATTERY_CHARGING_TIME_DEFAULTS = {
  mode: "ah-amps" as const,
  capacityAh: 100,
  capacityWh: 1_200,
  voltage: 12.8,
  startSoc: 0.2,
  targetSoc: 1,
  chargerCurrentA: 20,
  chargerOutputPowerW: 300,
  batteryChargeEfficiency: 0.99,
  planningOverheadEnabled: true,
  planningOverheadFactor: 1.05,
  chemistry: "lifepo4",
} as const;

export interface ChemistryChargingDefaults {
  batteryChargeEfficiency: number;
  planningOverheadFactor: number;
}

export function getChemistryChargingDefaults(chemistry: string): ChemistryChargingDefaults {
  const leadAcid = ["agm", "gel", "flooded-lead-acid"].includes(chemistry);
  return {
    batteryChargeEfficiency: 0.99,
    planningOverheadFactor: leadAcid ? 1.15 : 1.05,
  };
}

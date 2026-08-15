export interface BatteryCapacityInitializationInput {
  profile: {
    chemistry: string | null;
    minimumSoc: number | null;
    batteryHealth: number | null;
    voltage: number | null;
    capacityAh: number | null;
  };
  defaultChemistry: string;
  defaultMinimumSoc: number;
  defaultBatteryHealth: number;
  defaultVoltage: number;
  defaultCapacityAh: number;
  chemistryMinimumSoc?: number;
}

export interface BatteryCapacityInitialization {
  chemistry: string;
  minimumSoc: number;
  batteryHealth: number;
  voltage: number;
  capacityAh: number;
  minimumSocCustomized: boolean;
}

export function resolveBatteryCapacityInitialization(input: BatteryCapacityInitializationInput): BatteryCapacityInitialization {
  return {
    chemistry: input.profile.chemistry ?? input.defaultChemistry,
    minimumSoc: input.profile.minimumSoc ?? input.chemistryMinimumSoc ?? input.defaultMinimumSoc,
    batteryHealth: input.profile.batteryHealth ?? input.defaultBatteryHealth,
    voltage: input.profile.voltage ?? input.defaultVoltage,
    capacityAh: input.profile.capacityAh ?? input.defaultCapacityAh,
    minimumSocCustomized: input.profile.minimumSoc !== null,
  };
}

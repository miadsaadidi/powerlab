export interface BatteryChargingRuntimeHandoffInput {
  capacityAh?: number | null;
  capacityWh?: number | null;
  targetSoc: number;
  voltage?: number | null;
  chemistry?: string | null;
  batteryHealth?: number | null;
  minimumSoc?: number | null;
}

export interface BatteryChargingRuntimeHandoff {
  capacityAh?: number;
  nominalWh?: number;
  voltage?: number;
  chemistry?: string;
  startingSoc: number;
  batteryHealth?: number;
  reserveSoc?: number;
}

export function createBatteryChargingRuntimeHandoff(input: BatteryChargingRuntimeHandoffInput): BatteryChargingRuntimeHandoff {
  const output: BatteryChargingRuntimeHandoff = { startingSoc: input.targetSoc };
  if (input.capacityAh !== null && input.capacityAh !== undefined) output.capacityAh = input.capacityAh;
  if (input.capacityWh !== null && input.capacityWh !== undefined) output.nominalWh = input.capacityWh;
  else if (input.capacityAh !== null && input.capacityAh !== undefined && input.voltage !== null && input.voltage !== undefined) output.nominalWh = input.capacityAh * input.voltage;
  if (input.voltage !== null && input.voltage !== undefined) output.voltage = input.voltage;
  if (input.chemistry) output.chemistry = input.chemistry;
  if (input.batteryHealth !== null && input.batteryHealth !== undefined) output.batteryHealth = input.batteryHealth;
  if (input.minimumSoc !== null && input.minimumSoc !== undefined) output.reserveSoc = input.minimumSoc;
  return output;
}

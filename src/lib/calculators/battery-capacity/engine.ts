import type { CalculationResult } from "@/types/calculation";

export type ChargeUnit = "ah" | "mah";
export type EnergyUnit = "wh" | "kwh";

interface SharedBatteryCapacityInput {
  startingSoc: number;
  minimumSoc: number;
  batteryHealth: number;
  chemistry: string;
}

export type BatteryCapacityInput = SharedBatteryCapacityInput & (
  | {
      mode: "charge-to-energy";
      charge: number;
      chargeUnit: ChargeUnit;
      voltage: number;
    }
  | {
      mode: "energy-to-charge";
      energy: number;
      energyUnit: EnergyUnit;
      voltage: number;
    }
  | {
      mode: "find-voltage";
      energy: number;
      energyUnit: EnergyUnit;
      charge: number;
      chargeUnit: ChargeUnit;
    }
);

export type BatteryCapacityResult = CalculationResult<{
  capacityAh: number;
  capacityMah: number;
  nominalWh: number;
  nominalKWh: number;
  voltage: number;
  usableWh: number;
  usableKWh: number;
  usableSocWindow: number;
  equivalentAh: Array<{ voltage: number; capacityAh: number }>;
}>;

const isFinitePositive = (value: number) => Number.isFinite(value) && value > 0;

function normalizeCharge(value: number, unit: ChargeUnit) {
  if (!isFinitePositive(value)) throw new Error("Charge capacity must be greater than zero.");
  if (unit === "ah") return value;
  if (unit === "mah") return value / 1_000;
  throw new Error("Choose a supported charge capacity unit.");
}

function normalizeEnergy(value: number, unit: EnergyUnit) {
  if (!isFinitePositive(value)) throw new Error("Energy must be greater than zero.");
  if (unit === "wh") return value;
  if (unit === "kwh") return value * 1_000;
  throw new Error("Choose a supported energy unit.");
}

function validateSoc(input: SharedBatteryCapacityInput) {
  if (!Number.isFinite(input.startingSoc) || input.startingSoc < 0 || input.startingSoc > 1) {
    throw new Error("Starting charge must be between 0% and 100%.");
  }
  if (!Number.isFinite(input.minimumSoc) || input.minimumSoc < 0 || input.minimumSoc > 1) {
    throw new Error("Minimum charge must be between 0% and 100%.");
  }
  if (input.startingSoc <= input.minimumSoc) {
    throw new Error("Starting charge must be above minimum charge.");
  }
  if (!Number.isFinite(input.batteryHealth) || input.batteryHealth <= 0 || input.batteryHealth > 1) {
    throw new Error("Battery health must be greater than 0% and no more than 100%.");
  }
}

function validateVoltage(voltage: number) {
  if (!isFinitePositive(voltage)) throw new Error("Voltage must be greater than zero.");
}

export function calculateBatteryCapacity(input: BatteryCapacityInput): BatteryCapacityResult {
  validateSoc(input);

  let capacityAh: number;
  let nominalWh: number;
  let voltage: number;
  let equivalentAh: Array<{ voltage: number; capacityAh: number }> = [];

  if (input.mode === "charge-to-energy") {
    validateVoltage(input.voltage);
    capacityAh = normalizeCharge(input.charge, input.chargeUnit);
    voltage = input.voltage;
    nominalWh = capacityAh * voltage;
  } else if (input.mode === "energy-to-charge") {
    validateVoltage(input.voltage);
    nominalWh = normalizeEnergy(input.energy, input.energyUnit);
    voltage = input.voltage;
    capacityAh = nominalWh / voltage;
    equivalentAh = [12, 24, 48].map((comparisonVoltage) => ({
      voltage: comparisonVoltage,
      capacityAh: nominalWh / comparisonVoltage,
    }));
  } else {
    const energyWh = normalizeEnergy(input.energy, input.energyUnit);
    capacityAh = normalizeCharge(input.charge, input.chargeUnit);
    voltage = energyWh / capacityAh;
    nominalWh = energyWh;
  }

  const usableSocWindow = input.startingSoc - input.minimumSoc;
  const usableWh = nominalWh * usableSocWindow * input.batteryHealth;

  return {
    formulaVersion: "1.0.0",
    result: {
      capacityAh,
      capacityMah: capacityAh * 1_000,
      nominalWh,
      nominalKWh: nominalWh / 1_000,
      voltage,
      usableWh,
      usableKWh: usableWh / 1_000,
      usableSocWindow,
      equivalentAh,
    },
    assumptions: [
      { key: "voltage", value: voltage, unit: "V", provenance: "derived", description: "Battery voltage used for the conversion" },
      { key: "startingSoc", value: input.startingSoc, unit: "%", provenance: "user-entered", description: "Starting charge" },
      { key: "minimumSoc", value: input.minimumSoc, unit: "%", provenance: "user-entered", description: "Minimum remaining charge" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Battery health" },
      { key: "batteryChemistry", value: input.chemistry, provenance: "preset", description: "Battery chemistry used to initialize planning assumptions" },
    ],
    warnings: [],
    qualityLabel: "preset-assisted",
  };
}

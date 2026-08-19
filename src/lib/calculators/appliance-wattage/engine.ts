export type ApplianceSource =
  | { sourceMode: "preset"; presetId: string; unitRunningWatts: number }
  | { sourceMode: "label-watts"; unitRunningWatts: number }
  | { sourceMode: "label-volts-amps"; volts: number; amps: number; powerFactor: number };

export interface ApplianceWattageInput {
  source: ApplianceSource;
  quantity: number;
  runtimeHours?: number;
  dutyCycle: number;
  startupSource: "unknown" | "explicit-watts" | "user-multiplier";
  startupWatts?: number;
  startupMultiplier?: number;
  costEnabled: boolean;
  pricePerKWh?: number;
}

export interface ApplianceWattageResult {
  sourceMode: ApplianceSource["sourceMode"];
  unitRunningWatts: number;
  totalRunningWatts: number;
  unitRunningKilowatts: number;
  totalRunningKilowatts: number;
  apparentVA: number | null;
  powerFactor: number | null;
  quantity: number;
  runtimeHours: number | null;
  dutyCycle: number;
  energyWh: number | null;
  energyKWh: number | null;
  optionalCost: number | null;
  unitStartupWatts: number | null;
  totalStartupWatts: number | null;
  startupDataSource: "explicit-watts" | "user-multiplier" | "unknown";
}

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function validateSource(source: ApplianceSource) {
  if (source.sourceMode === "label-volts-amps") {
    if (!finite(source.volts) || source.volts <= 0) throw new Error("Voltage must be greater than zero.");
    if (!finite(source.amps) || source.amps <= 0) throw new Error("Current must be greater than zero.");
    if (!finite(source.powerFactor) || source.powerFactor <= 0 || source.powerFactor > 1) throw new Error("Power factor must be greater than zero and no more than 1.");
    return;
  }
  if (!finite(source.unitRunningWatts) || source.unitRunningWatts <= 0) throw new Error("Running watts must be greater than zero.");
}

export function calculateApplianceWattage(input: ApplianceWattageInput): ApplianceWattageResult {
  validateSource(input.source);
  if (!finite(input.quantity) || input.quantity <= 0 || !Number.isInteger(input.quantity)) throw new Error("Quantity must be a positive whole number.");
  if (input.runtimeHours !== undefined && (!finite(input.runtimeHours) || input.runtimeHours < 0 || input.runtimeHours > 24)) throw new Error("Runtime must be between 0 and 24 hours per day.");
  if (!finite(input.dutyCycle) || input.dutyCycle <= 0 || input.dutyCycle > 1) throw new Error("Duty cycle must be greater than zero and no more than 100%.");

  const apparentVA = input.source.sourceMode === "label-volts-amps" ? input.source.volts * input.source.amps : null;
  const powerFactor = input.source.sourceMode === "label-volts-amps" ? input.source.powerFactor : null;
  const unitRunningWatts = input.source.sourceMode === "label-volts-amps"
    ? (apparentVA ?? 0) * (powerFactor ?? 0)
    : input.source.unitRunningWatts;
  const totalRunningWatts = unitRunningWatts * input.quantity;

  let energyWh: number | null = null;
  let energyKWh: number | null = null;
  let optionalCost: number | null = null;
  if (input.runtimeHours !== undefined) {
    energyWh = totalRunningWatts * input.runtimeHours * input.dutyCycle;
    energyKWh = energyWh / 1000;
    if (input.costEnabled) {
      if (!finite(input.pricePerKWh) || input.pricePerKWh < 0) throw new Error("Enter an electricity price of zero or more.");
      optionalCost = energyKWh * input.pricePerKWh;
    }
  }

  let unitStartupWatts: number | null = null;
  let totalStartupWatts: number | null = null;
  let startupDataSource: ApplianceWattageResult["startupDataSource"] = "unknown";
  if (input.startupSource === "explicit-watts") {
    if (!finite(input.startupWatts) || input.startupWatts < unitRunningWatts) throw new Error("Startup watts must be at least the running watts per appliance.");
    unitStartupWatts = input.startupWatts;
    totalStartupWatts = unitStartupWatts * input.quantity;
    startupDataSource = "explicit-watts";
  } else if (input.startupSource === "user-multiplier") {
    if (!finite(input.startupMultiplier) || input.startupMultiplier < 1) throw new Error("Startup multiplier must be at least 1.");
    unitStartupWatts = unitRunningWatts * input.startupMultiplier;
    totalStartupWatts = unitStartupWatts * input.quantity;
    startupDataSource = "user-multiplier";
  }

  return {
    sourceMode: input.source.sourceMode,
    unitRunningWatts,
    totalRunningWatts,
    unitRunningKilowatts: unitRunningWatts / 1000,
    totalRunningKilowatts: totalRunningWatts / 1000,
    apparentVA,
    powerFactor,
    quantity: input.quantity,
    runtimeHours: input.runtimeHours ?? null,
    dutyCycle: input.dutyCycle,
    energyWh,
    energyKWh,
    optionalCost,
    unitStartupWatts,
    totalStartupWatts,
    startupDataSource,
  };
}

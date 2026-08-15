import type { CalculationResult } from "@/types/calculation";

export type LoadType = "ac" | "dc";

export interface RuntimeApplianceInput {
  label: string;
  watts: number;
  quantity: number;
  loadType: LoadType;
  dutyCycle: number;
}

export interface BatteryRuntimeInput {
  /** One of capacityWh, capacityKwh, or capacityAh + voltage is required. */
  capacityWh?: number;
  capacityKwh?: number;
  capacityAh?: number;
  voltage?: number;
  loadWatts: number;
  loadType?: LoadType;
  appliances?: RuntimeApplianceInput[];
  startingSoc: number;
  reserveSoc: number;
  batteryHealth: number;
  /** Legacy alias retained for existing callers. It is used as AC efficiency. */
  conversionEfficiency?: number;
  acInverterEfficiency?: number;
  dcConversionEfficiency?: number;
  dutyCycle: number;
  batteryChemistry?: string;
  peukertEnabled?: boolean;
}

export type BatteryRuntimeResult = CalculationResult<{
  nominalEnergyWh: number;
  usableBatteryWh: number;
  /** Kept for existing content consumers; represents usable battery energy before load-side losses. */
  deliveredEnergyWh: number;
  averageLoadWatts: number;
  peakConnectedLoadWatts: number;
  batterySideLoadWatts: number;
  runtimeHours: number;
}>;

const validFraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;

function capacityInWh(input: BatteryRuntimeInput) {
  if (input.capacityWh !== undefined) return input.capacityWh;
  if (input.capacityKwh !== undefined) return input.capacityKwh * 1_000;
  if (input.capacityAh !== undefined) return input.capacityAh * (input.voltage ?? 0);
  return 0;
}

function validateAppliance(appliance: RuntimeApplianceInput) {
  if (!Number.isFinite(appliance.watts) || appliance.watts <= 0) {
    throw new Error("Enter appliance watts greater than zero.");
  }
  if (!Number.isFinite(appliance.quantity) || appliance.quantity <= 0) {
    throw new Error("Enter an appliance quantity greater than zero.");
  }
  if (!validFraction(appliance.dutyCycle)) {
    throw new Error("Appliance duty cycle must be between 1% and 100%.");
  }
}

export function calculateBatteryRuntime(input: BatteryRuntimeInput): BatteryRuntimeResult {
  const nominalEnergyWh = capacityInWh(input);
  const acInverterEfficiency = input.acInverterEfficiency ?? input.conversionEfficiency ?? 0.9;
  const dcConversionEfficiency = input.dcConversionEfficiency ?? 1;

  if (input.capacityAh !== undefined && input.capacityWh === undefined && input.capacityKwh === undefined && (!Number.isFinite(input.voltage) || (input.voltage ?? 0) <= 0)) {
    throw new Error("Choose a battery voltage when capacity is entered in Ah.");
  }
  if (!Number.isFinite(nominalEnergyWh) || nominalEnergyWh <= 0) {
    throw new Error("Enter a battery capacity greater than zero.");
  }
  const appliances = input.appliances ?? [];
  if (appliances.length === 0 && (!Number.isFinite(input.loadWatts) || input.loadWatts <= 0)) {
    throw new Error("Enter a load greater than zero.");
  }
  if (!Number.isFinite(input.startingSoc) || !Number.isFinite(input.reserveSoc) || input.startingSoc <= input.reserveSoc) {
    throw new Error("Starting charge must be above your minimum remaining charge.");
  }
  if (input.startingSoc > 1 || input.reserveSoc < 0 || !validFraction(input.batteryHealth)) {
    throw new Error("Battery health and charge values must be between 0% and 100%.");
  }
  if (!validFraction(acInverterEfficiency) || !validFraction(dcConversionEfficiency)) {
    throw new Error("Efficiency must be greater than 0% and no more than 100%.");
  }
  if (!validFraction(input.dutyCycle)) {
    throw new Error("Load duty cycle must be between 1% and 100%.");
  }

  appliances.forEach(validateAppliance);

  const applianceMode = appliances.length > 0;
  const averageLoadWatts = applianceMode
    ? appliances.reduce((total, appliance) => total + appliance.watts * appliance.quantity * appliance.dutyCycle, 0)
    : input.loadWatts * input.dutyCycle;
  const peakConnectedLoadWatts = applianceMode
    ? appliances.reduce((total, appliance) => total + appliance.watts * appliance.quantity, 0)
    : input.loadWatts;
  const batterySideLoadWatts = applianceMode
    ? appliances.reduce((total, appliance) => {
      const averageWatts = appliance.watts * appliance.quantity * appliance.dutyCycle;
      return total + averageWatts / (appliance.loadType === "ac" ? acInverterEfficiency : dcConversionEfficiency);
    }, 0)
    : averageLoadWatts / ((input.loadType ?? "ac") === "ac" ? acInverterEfficiency : dcConversionEfficiency);

  if (!Number.isFinite(batterySideLoadWatts) || batterySideLoadWatts <= 0) {
    throw new Error("Enter a load greater than zero.");
  }

  const usableSocFraction = Math.max(0, input.startingSoc - input.reserveSoc);
  const usableBatteryWh = nominalEnergyWh * input.batteryHealth * usableSocFraction;
  const warnings = [] as BatteryRuntimeResult["warnings"];

  if (input.dutyCycle < 1 || appliances.some((appliance) => appliance.dutyCycle < 1)) {
    warnings.push({ code: "DUTY_CYCLE", severity: "info", message: "Runtime uses the entered average duty cycle." });
  }
  if (input.peukertEnabled) {
    warnings.push({ code: "PEUKERT_NOT_APPLIED", severity: "info", message: "Peukert correction is not applied because a precise correction needs the battery's rated discharge current or time." });
  }
  if (usableBatteryWh / batterySideLoadWatts < 0.5) {
    warnings.push({ code: "HIGH_LOAD", severity: "caution", message: "High loads reduce battery runtime quickly." });
  }

  return {
    formulaVersion: "2.0.0",
    result: {
      nominalEnergyWh,
      usableBatteryWh,
      deliveredEnergyWh: usableBatteryWh,
      averageLoadWatts,
      peakConnectedLoadWatts,
      batterySideLoadWatts,
      runtimeHours: usableBatteryWh / batterySideLoadWatts,
    },
    assumptions: [
      { key: "batteryChemistry", value: input.batteryChemistry ?? "LiFePO4 / LFP", provenance: input.batteryChemistry ? "user-entered" : "preset", description: "Battery type" },
      { key: "startingSoc", value: input.startingSoc, unit: "%", provenance: "user-entered", description: "Starting charge" },
      { key: "reserveSoc", value: input.reserveSoc, unit: "%", provenance: "user-entered", description: "Minimum remaining charge" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Battery health" },
      { key: "acInverterEfficiency", value: acInverterEfficiency, unit: "%", provenance: "user-entered", description: "AC inverter efficiency" },
      { key: "dcConversionEfficiency", value: dcConversionEfficiency, unit: "%", provenance: "user-entered", description: "DC conversion efficiency" },
    ],
    warnings,
    qualityLabel: input.batteryChemistry ? "preset-assisted" : "specific-inputs",
  };
}

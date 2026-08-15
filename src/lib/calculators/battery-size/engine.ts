import type { CalculationResult } from "@/types/calculation";

export type BatterySizeLoadType = "ac" | "dc";

export interface BatterySizeApplianceInput {
  label: string;
  watts: number;
  quantity: number;
  loadType: BatterySizeLoadType;
  dutyCycle: number;
}

export interface BatterySizeInput {
  loadWatts: number;
  loadType: BatterySizeLoadType;
  runtimeHours: number;
  startingSoc: number;
  reserveSoc: number;
  batteryHealth: number;
  acInverterEfficiency: number;
  dcConversionEfficiency: number;
  designMargin: number;
  voltage: number;
  appliances?: BatterySizeApplianceInput[];
}

export type BatterySizeResult = CalculationResult<{
  runtimeHours: number;
  totalAverageDeviceW: number;
  totalBatterySideAverageW: number;
  deviceLoadEnergyWh: number;
  conversionAdjustedWh: number;
  usableSocWindow: number;
  minimumNominalWh: number;
  recommendedNominalWh: number;
  selectedVoltage: number;
  selectedVoltageAh: number;
  equivalentAh: Array<{ voltage: number; ampHours: number }>;
  peakConnectedLoadW: number;
}>;

const fraction = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;

export function calculateBatterySize(input: BatterySizeInput): BatterySizeResult {
  if (!Number.isFinite(input.loadWatts) || input.loadWatts <= 0) throw new Error("Enter a load greater than zero.");
  if (!Number.isFinite(input.runtimeHours) || input.runtimeHours <= 0) throw new Error("Enter a runtime greater than zero.");
  if (!fraction(input.startingSoc) || input.startingSoc <= input.reserveSoc) throw new Error("Starting charge must be above your minimum remaining charge.");
  if (!Number.isFinite(input.reserveSoc) || input.reserveSoc < 0 || input.reserveSoc >= 1) throw new Error("Minimum remaining charge must be between 0% and 99%.");
  if (!fraction(input.batteryHealth) || !fraction(input.acInverterEfficiency) || !fraction(input.dcConversionEfficiency)) throw new Error("Health and conversion efficiencies must be greater than 0% and no more than 100%.");
  if (!Number.isFinite(input.designMargin) || input.designMargin < 0 || input.designMargin > 1) throw new Error("Planning margin must be between 0% and 100%.");
  if (!Number.isFinite(input.voltage) || input.voltage <= 0) throw new Error("Enter a system voltage greater than zero.");

  const appliances = input.appliances ?? [];
  if (appliances.length > 0) {
    appliances.forEach((appliance) => {
      if (!Number.isFinite(appliance.watts) || appliance.watts <= 0) throw new Error("Enter appliance watts greater than zero.");
      if (!Number.isFinite(appliance.quantity) || appliance.quantity <= 0) throw new Error("Enter an appliance quantity greater than zero.");
      if (!fraction(appliance.dutyCycle)) throw new Error("Appliance duty cycle must be between 1% and 100%.");
    });
  }

  const totalAverageDeviceW = appliances.length > 0
    ? appliances.reduce((sum, appliance) => sum + appliance.watts * appliance.quantity * appliance.dutyCycle, 0)
    : input.loadWatts;
  const totalBatterySideAverageW = appliances.length > 0
    ? appliances.reduce((sum, appliance) => {
      const averageDeviceW = appliance.watts * appliance.quantity * appliance.dutyCycle;
      return sum + averageDeviceW / (appliance.loadType === "ac" ? input.acInverterEfficiency : input.dcConversionEfficiency);
    }, 0)
    : input.loadWatts / (input.loadType === "ac" ? input.acInverterEfficiency : input.dcConversionEfficiency);
  const peakConnectedLoadW = appliances.length > 0
    ? appliances.reduce((sum, appliance) => sum + appliance.watts * appliance.quantity, 0)
    : input.loadWatts;
  const deviceLoadEnergyWh = totalAverageDeviceW * input.runtimeHours;
  const conversionAdjustedWh = totalBatterySideAverageW * input.runtimeHours;
  const usableSocWindow = Math.max(0, input.startingSoc - input.reserveSoc);
  const minimumNominalWh = conversionAdjustedWh / (usableSocWindow * input.batteryHealth);
  const recommendedNominalWh = minimumNominalWh * (1 + input.designMargin);
  const equivalentAh = [12, 24, 48].map((voltage) => ({ voltage, ampHours: recommendedNominalWh / voltage }));

  return {
    formulaVersion: "1.0.0",
    result: {
      runtimeHours: input.runtimeHours,
      totalAverageDeviceW,
      totalBatterySideAverageW,
      deviceLoadEnergyWh,
      conversionAdjustedWh,
      usableSocWindow,
      minimumNominalWh,
      recommendedNominalWh,
      selectedVoltage: input.voltage,
      selectedVoltageAh: recommendedNominalWh / input.voltage,
      equivalentAh,
      peakConnectedLoadW,
    },
    assumptions: [
      { key: "startingSoc", value: input.startingSoc, unit: "%", provenance: "user-entered", description: "Starting charge" },
      { key: "reserveSoc", value: input.reserveSoc, unit: "%", provenance: "user-entered", description: "Minimum remaining charge" },
      { key: "batteryHealth", value: input.batteryHealth, unit: "%", provenance: "user-entered", description: "Battery health" },
      { key: "conversionEfficiency", value: input.loadType === "ac" ? input.acInverterEfficiency : input.dcConversionEfficiency, unit: "%", provenance: "user-entered", description: "Applicable conversion efficiency" },
      { key: "designMargin", value: input.designMargin, unit: "%", provenance: "user-entered", description: "Planning margin" },
      { key: "voltage", value: input.voltage, unit: "V", provenance: "user-entered", description: "Selected system voltage" },
    ],
    warnings: [],
    qualityLabel: appliances.length > 0 ? "preset-assisted" : "specific-inputs",
  };
}

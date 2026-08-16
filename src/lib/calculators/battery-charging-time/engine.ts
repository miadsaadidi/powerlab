import type { CalculationResult } from "@/types/calculation";

export type BatteryChargingTimeInput = {
  startSoc: number;
  targetSoc: number;
  batteryChargeEfficiency: number;
  planningOverheadEnabled: boolean;
  planningOverheadFactor: number;
  chemistry: string;
  voltage?: number;
} & (
  | {
      mode: "ah-amps";
      capacityAh: number;
      chargerCurrentA: number;
      batteryMaxChargeCurrentA?: number;
    }
  | {
      mode: "energy-power";
      capacity: number;
      capacityUnit: "wh" | "kwh";
      chargerOutputPower: number;
      chargerPowerUnit: "w" | "kw";
      batteryMaxChargePowerW?: number;
    }
);

export type BatteryChargingTimeResult = CalculationResult<{
  mode: BatteryChargingTimeInput["mode"];
  chargeAh?: number;
  energyToAddWh?: number;
  selectedChargerRate: number;
  effectiveChargerRate: number;
  rateUnit: "A" | "W";
  idealHours: number;
  adjustedHours: number;
  batteryLimit?: number;
  limitingFactor: "charger-output" | "battery-charge-limit";
  batteryChargeEfficiency: number;
  planningOverheadFactor: number;
  nominalCapacityAh?: number;
  nominalCapacityWh?: number;
  voltage?: number;
}>;

const finitePositive = (value: number) => Number.isFinite(value) && value > 0;

function validateShared(input: BatteryChargingTimeInput) {
  if (!Number.isFinite(input.startSoc) || input.startSoc < 0 || input.startSoc > 1) throw new Error("Starting charge must be between 0% and 100%.");
  if (!Number.isFinite(input.targetSoc) || input.targetSoc < 0 || input.targetSoc > 1) throw new Error("Target charge must be between 0% and 100%.");
  if (input.targetSoc <= input.startSoc) throw new Error("Target charge must be above starting charge.");
  if (!finitePositive(input.batteryChargeEfficiency) || input.batteryChargeEfficiency > 1) throw new Error("Battery charge efficiency must be greater than 0% and no more than 100%.");
  if (!finitePositive(input.planningOverheadFactor)) throw new Error("Planning overhead factor must be greater than zero.");
  if (input.voltage !== undefined && !finitePositive(input.voltage)) throw new Error("Battery nominal voltage must be greater than zero when supplied.");
}

function normalizeCapacity(value: number, unit: "wh" | "kwh") {
  if (!finitePositive(value)) throw new Error("Battery capacity must be greater than zero.");
  if (unit === "wh") return value;
  if (unit === "kwh") return value * 1_000;
  throw new Error("Choose a supported battery energy unit.");
}

function normalizePower(value: number, unit: "w" | "kw") {
  if (!finitePositive(value)) throw new Error("Charger output power must be greater than zero.");
  if (unit === "w") return value;
  if (unit === "kw") return value * 1_000;
  throw new Error("Choose a supported charger power unit.");
}

function validateOptionalLimit(value: number | undefined, message: string) {
  if (value !== undefined && !finitePositive(value)) throw new Error(message);
}

export function calculateBatteryChargingTime(input: BatteryChargingTimeInput): BatteryChargingTimeResult {
  validateShared(input);

  let chargeAmount: number;
  let selectedChargerRate: number;
  let effectiveChargerRate: number;
  let batteryLimit: number | undefined;
  let rateUnit: "A" | "W";
  let nominalCapacityAh: number | undefined;
  let nominalCapacityWh: number | undefined;

  if (input.mode === "ah-amps") {
    if (!finitePositive(input.capacityAh)) throw new Error("Battery capacity must be greater than zero.");
    if (!finitePositive(input.chargerCurrentA)) throw new Error("Charger current must be greater than zero.");
    validateOptionalLimit(input.batteryMaxChargeCurrentA, "Battery maximum charge current must be greater than zero.");
    chargeAmount = input.capacityAh * (input.targetSoc - input.startSoc);
    selectedChargerRate = input.chargerCurrentA;
    batteryLimit = input.batteryMaxChargeCurrentA;
    effectiveChargerRate = batteryLimit === undefined ? selectedChargerRate : Math.min(selectedChargerRate, batteryLimit);
    rateUnit = "A";
    nominalCapacityAh = input.capacityAh;
    nominalCapacityWh = input.voltage === undefined ? undefined : input.capacityAh * input.voltage;
  } else {
    nominalCapacityWh = normalizeCapacity(input.capacity, input.capacityUnit);
    const chargerPowerW = normalizePower(input.chargerOutputPower, input.chargerPowerUnit);
    validateOptionalLimit(input.batteryMaxChargePowerW, "Battery maximum charge power must be greater than zero.");
    chargeAmount = nominalCapacityWh * (input.targetSoc - input.startSoc);
    selectedChargerRate = chargerPowerW;
    batteryLimit = input.batteryMaxChargePowerW;
    effectiveChargerRate = batteryLimit === undefined ? selectedChargerRate : Math.min(selectedChargerRate, batteryLimit);
    rateUnit = "W";
  }

  const idealHours = chargeAmount / effectiveChargerRate;
  const planningOverheadFactor = input.planningOverheadEnabled ? input.planningOverheadFactor : 1;
  const adjustedHours = idealHours / input.batteryChargeEfficiency * planningOverheadFactor;
  const limitingFactor = batteryLimit !== undefined && batteryLimit < selectedChargerRate ? "battery-charge-limit" : "charger-output";

  return {
    formulaVersion: "1.0.0",
    result: {
      mode: input.mode,
      ...(input.mode === "ah-amps" ? { chargeAh: chargeAmount } : { energyToAddWh: chargeAmount }),
      selectedChargerRate,
      effectiveChargerRate,
      rateUnit,
      idealHours,
      adjustedHours,
      ...(batteryLimit === undefined ? {} : { batteryLimit }),
      limitingFactor,
      batteryChargeEfficiency: input.batteryChargeEfficiency,
      planningOverheadFactor,
      ...(nominalCapacityAh === undefined ? {} : { nominalCapacityAh }),
      ...(nominalCapacityWh === undefined ? {} : { nominalCapacityWh }),
      ...(input.voltage === undefined ? {} : { voltage: input.voltage }),
    },
    assumptions: [
      { key: "startSoc", value: input.startSoc, unit: "%", provenance: "user-entered", description: "Starting charge" },
      { key: "targetSoc", value: input.targetSoc, unit: "%", provenance: "user-entered", description: "Target charge" },
      { key: "batteryChargeEfficiency", value: input.batteryChargeEfficiency, unit: "%", provenance: "user-entered", description: "Battery charge efficiency planning assumption" },
      { key: "planningOverheadFactor", value: planningOverheadFactor, provenance: input.planningOverheadEnabled ? "preset" : "derived", description: "Planning estimate for charging behavior beyond the constant-rate formula" },
      { key: "chemistry", value: input.chemistry, provenance: "preset", description: "Battery chemistry used for planning defaults" },
    ],
    warnings: batteryLimit === undefined ? [{ code: "UNKNOWN_BATTERY_CHARGE_LIMIT", severity: "info", message: "Battery maximum charge rate is unknown — confirm the manufacturer's charging specification." }] : [],
    qualityLabel: "preset-assisted",
  };
}

import { GENERIC_DC_TAPER, type DcTaperMode, type EvChargingType } from "../../../data/ev-charging-defaults";
import type { CalculationResult } from "@/types/calculation";

export type LimitingFactor = "vehicle-ac-charging-limit" | "vehicle-dc-charging-limit" | "vehicle-limit-unknown";

export interface EvChargingTimeInput {
  batteryCapacityKwh: number;
  startSoc?: number; // 0..1 fraction or 0..100 percentage
  targetSoc?: number; // 0..1 fraction or 0..100 percentage
  startSocPercent?: number; // explicit 0..100 percentage
  targetSocPercent?: number; // explicit 0..100 percentage
  chargerPowerKw: number;
  chargingType: EvChargingType;
  vehicleMaxAcPowerKw?: number;
  vehicleMaxDcPowerKw?: number;
  acEfficiency?: number;
  dcEfficiency?: number;
  dcTaperMode?: DcTaperMode;
}

export type EvChargingTimeResult = CalculationResult<{
  batteryEnergyAddedKWh: number;
  gridEnergyKWh: number;
  timeHours: number;
  chargingType: EvChargingType;
  limitingFactor: LimitingFactor;
  taperMode: DcTaperMode | "none";
  effectiveAcInputPowerKw?: number;
  effectiveDcBatteryPowerKw?: number;
  baseDcBatteryPowerKw?: number;
  averageBatteryChargingPowerKw: number;
  startSocPercent: number;
  targetSocPercent: number;
  usableCapacityKwh: number;
  evseMaxPowerKw: number;
  vehicleAcceptanceLimitKw?: number;
  efficiencyAssumption: number;
}> & { timeHours: number };

const validEfficiency = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;
const validOptionalPower = (value: number | undefined) => value === undefined || (Number.isFinite(value) && value > 0);

function resolveSocPercent(value: number | undefined, percentValue: number | undefined): number {
  if (percentValue !== undefined) return percentValue;
  if (value === undefined) return NaN;
  // If value is between 0 and 1 (inclusive), treat as decimal fraction (0.2 -> 20%)
  // If value is > 1, treat as already in percentage form (20 -> 20%)
  if (value >= 0 && value <= 1) {
    return value * 100;
  }
  return value;
}

export function calculateEvChargingTime(input: EvChargingTimeInput): EvChargingTimeResult {
  if (!Number.isFinite(input.batteryCapacityKwh) || input.batteryCapacityKwh <= 0) {
    throw new Error("Enter a usable battery capacity greater than zero.");
  }
  if (!Number.isFinite(input.chargerPowerKw) || input.chargerPowerKw <= 0) {
    throw new Error("Enter an EVSE maximum charger power greater than zero.");
  }

  const startPercent = resolveSocPercent(input.startSoc, input.startSocPercent);
  const targetPercent = resolveSocPercent(input.targetSoc, input.targetSocPercent);

  if (!Number.isFinite(startPercent) || !Number.isFinite(targetPercent)) {
    throw new Error("State of charge must be a valid number.");
  }
  if (startPercent < 0 || startPercent > 100 || targetPercent < 0 || targetPercent > 100) {
    throw new Error("State of charge must be between 0% and 100%.");
  }
  if (targetPercent < startPercent) {
    throw new Error("Target charge must be greater than or equal to starting charge.");
  }

  const acEfficiency = input.acEfficiency ?? 0.90;
  const dcEfficiency = input.dcEfficiency ?? 0.93;

  if (!validEfficiency(acEfficiency) || !validEfficiency(dcEfficiency)) {
    throw new Error("Charging efficiency must be greater than 0% and no more than 100%.");
  }
  if (!validOptionalPower(input.vehicleMaxAcPowerKw) || !validOptionalPower(input.vehicleMaxDcPowerKw)) {
    throw new Error("Vehicle charging limits must be greater than zero.");
  }
  if (input.chargingType !== "AC" && input.chargingType !== "DC") {
    throw new Error("Choose AC or DC charging.");
  }

  const deltaSoc = (targetPercent - startPercent) / 100;
  const batteryEnergyAddedKWh = input.batteryCapacityKwh * deltaSoc;

  if (input.chargingType === "AC") {
    const effectiveAcInputPowerKw = input.vehicleMaxAcPowerKw === undefined
      ? input.chargerPowerKw
      : Math.min(input.chargerPowerKw, input.vehicleMaxAcPowerKw);

    const limitingFactor: LimitingFactor = input.vehicleMaxAcPowerKw === undefined
      ? "vehicle-limit-unknown"
      : input.vehicleMaxAcPowerKw < input.chargerPowerKw
        ? "vehicle-ac-charging-limit"
        : "vehicle-limit-unknown";

    // Battery-side effective charging power:
    const batteryChargingPowerKw = effectiveAcInputPowerKw * acEfficiency;
    const timeHours = batteryEnergyAddedKWh === 0 ? 0 : batteryEnergyAddedKWh / batteryChargingPowerKw;
    const gridEnergyKWh = batteryEnergyAddedKWh / acEfficiency;
    const averageBatteryChargingPowerKw = timeHours === 0 ? batteryChargingPowerKw : batteryEnergyAddedKWh / timeHours;

    return {
      timeHours,
      formulaVersion: "2.0.0",
      result: {
        batteryEnergyAddedKWh,
        gridEnergyKWh,
        timeHours,
        chargingType: "AC",
        limitingFactor,
        taperMode: "none",
        effectiveAcInputPowerKw,
        averageBatteryChargingPowerKw,
        startSocPercent: startPercent,
        targetSocPercent: targetPercent,
        usableCapacityKwh: input.batteryCapacityKwh,
        evseMaxPowerKw: input.chargerPowerKw,
        vehicleAcceptanceLimitKw: input.vehicleMaxAcPowerKw,
        efficiencyAssumption: acEfficiency,
      },
      assumptions: [
        {
          key: "acEfficiency",
          value: acEfficiency,
          unit: "%",
          provenance: "preset",
          description: "Overall wall-to-battery charging efficiency — illustrative assumption",
        },
        {
          key: "chargerPower",
          value: input.chargerPowerKw,
          unit: "kW",
          provenance: "user-entered",
          description: "EVSE maximum supply power",
        },
      ],
      warnings: [],
      qualityLabel: "specific-inputs",
    };
  }

  // DC Fast Charging
  const baseDcBatteryPowerKw = input.vehicleMaxDcPowerKw === undefined
    ? input.chargerPowerKw
    : Math.min(input.chargerPowerKw, input.vehicleMaxDcPowerKw);

  const limitingFactor: LimitingFactor = input.vehicleMaxDcPowerKw === undefined
    ? "vehicle-limit-unknown"
    : input.vehicleMaxDcPowerKw < input.chargerPowerKw
      ? "vehicle-dc-charging-limit"
      : "vehicle-limit-unknown";

  let timeHours: number;
  const taperMode = input.dcTaperMode ?? "generic";

  if (batteryEnergyAddedKWh === 0) {
    timeHours = 0;
  } else if (taperMode === "constant") {
    timeHours = batteryEnergyAddedKWh / baseDcBatteryPowerKw;
  } else {
    // Explicit DC charging curve integration across SOC segments
    const startFrac = startPercent / 100;
    const targetFrac = targetPercent / 100;

    timeHours = GENERIC_DC_TAPER.reduce((total, segment) => {
      const overlapStart = Math.max(startFrac, segment.startSoc);
      const overlapEnd = Math.min(targetFrac, segment.endSoc);
      if (overlapEnd <= overlapStart) return total;
      const segmentEnergy = input.batteryCapacityKwh * (overlapEnd - overlapStart);
      const segmentPower = baseDcBatteryPowerKw * segment.powerFactor;
      return total + segmentEnergy / segmentPower;
    }, 0);
  }

  const averageBatteryChargingPowerKw = timeHours === 0 ? baseDcBatteryPowerKw : batteryEnergyAddedKWh / timeHours;
  const gridEnergyKWh = batteryEnergyAddedKWh / dcEfficiency;

  return {
    timeHours,
    formulaVersion: "2.0.0",
    result: {
      batteryEnergyAddedKWh,
      gridEnergyKWh,
      timeHours,
      chargingType: "DC",
      limitingFactor,
      taperMode,
      baseDcBatteryPowerKw,
      averageBatteryChargingPowerKw,
      effectiveDcBatteryPowerKw: averageBatteryChargingPowerKw,
      startSocPercent: startPercent,
      targetSocPercent: targetPercent,
      usableCapacityKwh: input.batteryCapacityKwh,
      evseMaxPowerKw: input.chargerPowerKw,
      vehicleAcceptanceLimitKw: input.vehicleMaxDcPowerKw,
      efficiencyAssumption: dcEfficiency,
    },
    assumptions: [
      {
        key: "dcEfficiency",
        value: dcEfficiency,
        unit: "%",
        provenance: "preset",
        description: "DC charger grid-to-vehicle source efficiency",
      },
      {
        key: "dcTaperMode",
        value: taperMode,
        provenance: "preset",
        description: "DC charging curve model",
      },
    ],
    warnings: [
      {
        code: "DC_ESTIMATE_UNCERTAINTY",
        severity: "info",
        message: "Vehicle-specific charging curve not supplied — result is an estimate. Actual DC charging time varies with vehicle charging curve, battery temperature, SOC and charger conditions.",
      },
    ],
    qualityLabel: "preset-assisted",
  };
}

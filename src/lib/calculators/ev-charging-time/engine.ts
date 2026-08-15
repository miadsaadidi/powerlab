import { GENERIC_DC_TAPER, type DcTaperMode, type EvChargingType } from "../../../data/ev-charging-defaults";
import type { CalculationResult } from "@/types/calculation";

export type LimitingFactor = "vehicle-ac-charging-limit" | "vehicle-dc-charging-limit" | "vehicle-limit-unknown";

export interface EvChargingTimeInput {
  batteryCapacityKwh: number;
  startSoc: number;
  targetSoc: number;
  chargerPowerKw: number;
  chargingType: EvChargingType;
  vehicleMaxAcPowerKw?: number;
  vehicleMaxDcPowerKw?: number;
  acEfficiency: number;
  dcEfficiency: number;
  dcTaperMode: DcTaperMode;
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
}> & { timeHours: number };

const validEfficiency = (value: number) => Number.isFinite(value) && value > 0 && value <= 1;
const validOptionalPower = (value: number | undefined) => value === undefined || (Number.isFinite(value) && value > 0);

export function calculateEvChargingTime(input: EvChargingTimeInput): EvChargingTimeResult {
  if (!Number.isFinite(input.batteryCapacityKwh) || input.batteryCapacityKwh <= 0) throw new Error("Enter a battery capacity greater than zero.");
  if (!Number.isFinite(input.chargerPowerKw) || input.chargerPowerKw <= 0) throw new Error("Enter a charger power greater than zero.");
  if (!Number.isFinite(input.startSoc) || !Number.isFinite(input.targetSoc) || input.startSoc < 0 || input.startSoc > 1 || input.targetSoc <= input.startSoc || input.targetSoc > 1) throw new Error("Target charge must be above starting charge and no more than 100%.");
  if (!validEfficiency(input.acEfficiency) || !validEfficiency(input.dcEfficiency)) throw new Error("Charging efficiency must be greater than 0% and no more than 100%.");
  if (!validOptionalPower(input.vehicleMaxAcPowerKw) || !validOptionalPower(input.vehicleMaxDcPowerKw)) throw new Error("Vehicle charging limits must be greater than zero.");
  if (input.chargingType !== "AC" && input.chargingType !== "DC") throw new Error("Choose AC or DC charging.");
  const batteryEnergyAddedKWh = input.batteryCapacityKwh * (input.targetSoc - input.startSoc);

  if (input.chargingType === "AC") {
    const effectiveAcInputPowerKw = input.vehicleMaxAcPowerKw === undefined ? input.chargerPowerKw : Math.min(input.chargerPowerKw, input.vehicleMaxAcPowerKw);
    const limitingFactor: LimitingFactor = input.vehicleMaxAcPowerKw === undefined ? "vehicle-limit-unknown" : input.vehicleMaxAcPowerKw < input.chargerPowerKw ? "vehicle-ac-charging-limit" : "vehicle-limit-unknown";
    const batteryChargingPowerKw = effectiveAcInputPowerKw * input.acEfficiency;
    const timeHours = batteryEnergyAddedKWh / batteryChargingPowerKw;
    return {
      timeHours,
      formulaVersion: "1.0.0",
      result: { batteryEnergyAddedKWh, gridEnergyKWh: batteryEnergyAddedKWh / input.acEfficiency, timeHours, chargingType: "AC", limitingFactor, taperMode: "none", effectiveAcInputPowerKw, averageBatteryChargingPowerKw: batteryEnergyAddedKWh / timeHours },
      assumptions: [{ key: "acEfficiency", value: input.acEfficiency, unit: "%", provenance: "user-entered", description: "AC charging efficiency" }, { key: "chargerPower", value: input.chargerPowerKw, unit: "kW", provenance: "user-entered", description: "AC charger input power" }],
      warnings: [],
      qualityLabel: "specific-inputs",
    };
  }

  const baseDcBatteryPowerKw = input.vehicleMaxDcPowerKw === undefined ? input.chargerPowerKw : Math.min(input.chargerPowerKw, input.vehicleMaxDcPowerKw);
  const limitingFactor: LimitingFactor = input.vehicleMaxDcPowerKw === undefined ? "vehicle-limit-unknown" : input.vehicleMaxDcPowerKw < input.chargerPowerKw ? "vehicle-dc-charging-limit" : "vehicle-limit-unknown";
  let timeHours: number;
  if (input.dcTaperMode === "constant") {
    timeHours = batteryEnergyAddedKWh / baseDcBatteryPowerKw;
  } else {
    timeHours = GENERIC_DC_TAPER.reduce((total, segment) => {
      const overlapStart = Math.max(input.startSoc, segment.startSoc);
      const overlapEnd = Math.min(input.targetSoc, segment.endSoc);
      if (overlapEnd <= overlapStart) return total;
      const segmentEnergy = input.batteryCapacityKwh * (overlapEnd - overlapStart);
      return total + segmentEnergy / (baseDcBatteryPowerKw * segment.powerFactor);
    }, 0);
  }
  return {
    timeHours,
    formulaVersion: "1.0.0",
    result: { batteryEnergyAddedKWh, gridEnergyKWh: batteryEnergyAddedKWh / input.dcEfficiency, timeHours, chargingType: "DC", limitingFactor, taperMode: input.dcTaperMode, baseDcBatteryPowerKw, averageBatteryChargingPowerKw: batteryEnergyAddedKWh / timeHours, effectiveDcBatteryPowerKw: baseDcBatteryPowerKw },
    assumptions: [{ key: "dcEfficiency", value: input.dcEfficiency, unit: "%", provenance: "user-entered", description: "DC source-energy efficiency" }, { key: "dcTaperMode", value: input.dcTaperMode, provenance: "preset", description: "DC charging model" }],
    warnings: input.dcTaperMode === "generic" ? [{ code: "GENERIC_DC_TAPER", severity: "info", message: "Generic planning curve — actual charging behavior varies by vehicle, battery temperature and battery management system." }] : [],
    qualityLabel: "preset-assisted",
  };
}

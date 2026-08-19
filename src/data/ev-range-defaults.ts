import type { EvRangeConsumptionUnit, EvRangeDistanceUnit } from "@/lib/calculators/ev-range/engine";

export const EV_RANGE_DEFAULTS: {
  batteryCapacityKWh: number;
  currentSoc: number;
  reserveSoc: number;
  batteryHealth: number;
  consumption: number;
  consumptionUnit: EvRangeConsumptionUnit;
  distanceUnit: EvRangeDistanceUnit;
} = {
  batteryCapacityKWh: 60,
  currentSoc: 80,
  reserveSoc: 10,
  batteryHealth: 100,
  consumption: 18,
  consumptionUnit: "kwh-per-100-km",
  distanceUnit: "km",
};

export const EV_RANGE_STANDARD_CONSUMPTION = [15, 18, 22] as const;

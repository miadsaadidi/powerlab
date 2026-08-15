export type EvChargingType = "AC" | "DC";
export type DcTaperMode = "generic" | "constant";

export const EV_CHARGERS = [
  { id: "ac-1.9", label: "1.9 kW", detail: "Level 1 AC", powerKw: 1.9, chargingType: "AC" as const },
  { id: "ac-7.2", label: "7.2 kW", detail: "Level 2 AC", powerKw: 7.2, chargingType: "AC" as const },
  { id: "ac-11", label: "11 kW", detail: "Level 2 AC", powerKw: 11, chargingType: "AC" as const },
  { id: "dc-50", label: "50 kW", detail: "DC Fast", powerKw: 50, chargingType: "DC" as const },
  { id: "dc-150", label: "150 kW", detail: "DC Fast", powerKw: 150, chargingType: "DC" as const },
  { id: "dc-350", label: "350 kW", detail: "DC Fast", powerKw: 350, chargingType: "DC" as const },
] as const;

export const EV_CHARGING_TIME_DEFAULTS = {
  batteryCapacityKwh: 60,
  startSoc: 0.2,
  targetSoc: 0.8,
  chargerPowerKw: 7.2,
  chargingType: "AC" as const,
  acEfficiency: 0.9,
  dcEfficiency: 0.93,
  dcTaperMode: "generic" as const,
} as const;

export const EV_CHARGING_EFFICIENCIES = { level1: 0.85, level2: 0.9, dcFast: 0.93 } as const;

export const GENERIC_DC_TAPER = [
  { startSoc: 0, endSoc: 0.5, powerFactor: 1 },
  { startSoc: 0.5, endSoc: 0.8, powerFactor: 0.8 },
  { startSoc: 0.8, endSoc: 0.9, powerFactor: 0.55 },
  { startSoc: 0.9, endSoc: 1, powerFactor: 0.3 },
] as const;

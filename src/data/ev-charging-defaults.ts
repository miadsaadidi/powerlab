export type EvChargingType = "AC" | "DC";
export type DcTaperMode = "generic" | "constant";

export interface ChargerPreset {
  id: string;
  label: string;
  detail: string;
  powerKw: number;
  voltage?: number;
  currentAmps?: number;
  chargingType: EvChargingType;
}

export const EV_CHARGERS: readonly ChargerPreset[] = [
  { id: "l1-12a", label: "1.44 kW", detail: "Level 1 (120V / 12A)", powerKw: 1.44, voltage: 120, currentAmps: 12, chargingType: "AC" },
  { id: "l1-16a", label: "1.92 kW", detail: "Level 1 (120V / 16A)", powerKw: 1.92, voltage: 120, currentAmps: 16, chargingType: "AC" },
  { id: "l2-16a", label: "3.84 kW", detail: "Level 2 (240V / 16A)", powerKw: 3.84, voltage: 240, currentAmps: 16, chargingType: "AC" },
  { id: "l2-24a", label: "5.76 kW", detail: "Level 2 (240V / 24A)", powerKw: 5.76, voltage: 240, currentAmps: 24, chargingType: "AC" },
  { id: "l2-32a", label: "7.68 kW", detail: "Level 2 (240V / 32A)", powerKw: 7.68, voltage: 240, currentAmps: 32, chargingType: "AC" },
  { id: "l2-40a", label: "9.60 kW", detail: "Level 2 (240V / 40A)", powerKw: 9.60, voltage: 240, currentAmps: 40, chargingType: "AC" },
  { id: "l2-48a", label: "11.52 kW", detail: "Level 2 (240V / 48A)", powerKw: 11.52, voltage: 240, currentAmps: 48, chargingType: "AC" },
  { id: "dc-50", label: "50 kW", detail: "DC Fast (50 kW)", powerKw: 50, chargingType: "DC" },
  { id: "dc-150", label: "150 kW", detail: "DC Fast (150 kW)", powerKw: 150, chargingType: "DC" },
  { id: "dc-350", label: "350 kW", detail: "DC Fast (350 kW)", powerKw: 350, chargingType: "DC" },
] as const;

export function resolveChargerPreset(idOrLegacy: string): ChargerPreset | undefined {
  const direct = EV_CHARGERS.find((c) => c.id === idOrLegacy);
  if (direct) return direct;
  // Legacy aliases for backward compatibility
  if (idOrLegacy === "ac-1.4") return EV_CHARGERS.find((c) => c.id === "l1-12a");
  if (idOrLegacy === "ac-1.9") return EV_CHARGERS.find((c) => c.id === "l1-16a");
  if (idOrLegacy === "ac-7.2" || idOrLegacy === "ac-7.7") return EV_CHARGERS.find((c) => c.id === "l2-32a");
  if (idOrLegacy === "ac-11" || idOrLegacy === "ac-11.5") return EV_CHARGERS.find((c) => c.id === "l2-48a");
  return undefined;
}

export const EV_CHARGING_TIME_DEFAULTS = {
  batteryCapacityKwh: 60,
  startSoc: 0.2, // 20%
  targetSoc: 0.8, // 80%
  chargerId: "l2-32a",
  chargerPowerKw: 7.68,
  chargingType: "AC" as const,
  acEfficiency: 0.90, // Overall wall-to-battery charging efficiency — illustrative assumption
  dcEfficiency: 0.93,
  dcTaperMode: "generic" as const,
} as const;

export const EV_CHARGING_EFFICIENCIES = { level1: 0.85, level2: 0.90, dcFast: 0.93 } as const;

export const GENERIC_DC_TAPER = [
  { startSoc: 0.0, endSoc: 0.5, powerFactor: 1.0 },
  { startSoc: 0.5, endSoc: 0.8, powerFactor: 0.80 },
  { startSoc: 0.8, endSoc: 0.9, powerFactor: 0.55 },
  { startSoc: 0.9, endSoc: 1.0, powerFactor: 0.30 },
] as const;

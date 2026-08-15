import { APPLIANCES } from "./appliances";

export interface ApplianceUsagePreset {
  hoursPerDay: number;
  daysPerWeek: number;
  dutyCycle: number;
}

const schedules: Record<string, ApplianceUsagePreset> = {
  "led-tv": { hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 1 },
  "wifi-router": { hoursPerDay: 24, daysPerWeek: 7, dutyCycle: 1 },
  "internet-modem": { hoursPerDay: 24, daysPerWeek: 7, dutyCycle: 1 },
  laptop: { hoursPerDay: 5, daysPerWeek: 7, dutyCycle: 1 },
  desktop: { hoursPerDay: 5, daysPerWeek: 7, dutyCycle: 1 },
  "led-bulb": { hoursPerDay: 5, daysPerWeek: 7, dutyCycle: 1 },
  "ceiling-fan": { hoursPerDay: 8, daysPerWeek: 7, dutyCycle: 1 },
  refrigerator: { hoursPerDay: 24, daysPerWeek: 7, dutyCycle: 0.35 },
  freezer: { hoursPerDay: 24, daysPerWeek: 7, dutyCycle: 0.4 },
  "phone-charger": { hoursPerDay: 2, daysPerWeek: 7, dutyCycle: 1 },
  "game-console": { hoursPerDay: 2, daysPerWeek: 7, dutyCycle: 1 },
  microwave: { hoursPerDay: 0.25, daysPerWeek: 7, dutyCycle: 1 },
  "electric-kettle": { hoursPerDay: 0.15, daysPerWeek: 7, dutyCycle: 1 },
  "coffee-maker": { hoursPerDay: 0.25, daysPerWeek: 7, dutyCycle: 1 },
  "air-fryer": { hoursPerDay: 0.5, daysPerWeek: 4, dutyCycle: 1 },
  "space-heater": { hoursPerDay: 4, daysPerWeek: 7, dutyCycle: 0.7 },
  "window-ac": { hoursPerDay: 6, daysPerWeek: 7, dutyCycle: 0.7 },
  "split-ac": { hoursPerDay: 6, daysPerWeek: 7, dutyCycle: 0.65 },
  custom: { hoursPerDay: 1, daysPerWeek: 7, dutyCycle: 1 },
};

export const APPLIANCE_USAGE_PRESETS: Record<string, ApplianceUsagePreset> = Object.fromEntries(
  APPLIANCES.map((appliance) => [appliance.id, schedules[appliance.id] ?? schedules.custom]),
);

export const getApplianceUsagePreset = (id: string) => APPLIANCE_USAGE_PRESETS[id] ?? schedules.custom;

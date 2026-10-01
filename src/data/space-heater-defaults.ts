export const SPACE_HEATER_DEFAULTS = {
  heaterWatts: 1500, // standard maximum plug-in portable heater
  dailyHours: 8, // overnight or standard work shift
  dutyCyclePercent: 70, // 70% illustrative moderate-duty assumption
  electricityRate: 0.18, // $/kWh
  winterMonths: 3, // December, January, February
} as const;

export interface HeaterPreset {
  label: string;
  watts: number;
  hours: number;
  duty: number;
}

export const QUICK_HEATER_PRESETS: readonly HeaterPreset[] = [
  { label: "🪑 Under-Desk Personal Heater (500W · 100% continuous)", watts: 500, hours: 8, duty: 100 },
  { label: "🛏️ Ceramic Bedroom Heater (1500W · 70% duty)", watts: 1500, hours: 8, duty: 70 },
  { label: "🧱 Oil-Filled Radiator (1500W · 50% duty)", watts: 1500, hours: 12, duty: 50 },
  { label: "☀️ High-Duty Room Heater (1500W · 85% duty)", watts: 1500, hours: 8, duty: 85 },
  { label: "👶 Low-Watt Nursery Heater (750W · 70% duty)", watts: 750, hours: 10, duty: 70 },
] as const;

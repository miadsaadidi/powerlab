export const CHARGE_CONTROLLER_DEFAULTS = {
  technology: "mppt" as "mppt" | "pwm",
  panelWatts: 200,
  panelCount: 4, // 800W total
  batteryVoltage: 12 as 12 | 24 | 48,
  panelVoc: 24.3, // V
  panelIsc: 10.5, // A
  seriesCount: 2,
  parallelCount: 2,
  minWinterTempCelsius: -10, // -10°C (14°F)
  tempCoeffPercentPerCelsius: -0.33, // -0.33%/°C
} as const;

export const QUICK_CHARGE_CONTROLLER_PRESETS = [
  { label: "🚐 Vanlife 400W Array (2S · 12V Battery · MPPT)", watts: 200, count: 2, series: 2, parallel: 1, voc: 24.3, isc: 10.5, battV: 12 as const, minTemp: -10, tech: "mppt" as const },
  { label: "🏕️ Cabin 800W Array (2S2P · 24V Battery · MPPT)", watts: 200, count: 4, series: 2, parallel: 2, voc: 24.3, isc: 10.5, battV: 24 as const, minTemp: -10, tech: "mppt" as const },
  { label: "🏡 Homestead 1600W (4S2P · 48V Battery · MPPT)", watts: 400, count: 4, series: 4, parallel: 1, voc: 49.5, isc: 10.2, battV: 48 as const, minTemp: -20, tech: "mppt" as const },
  { label: "⛵ Sailboat 200W PWM Setup (1S2P · 12V Battery)", watts: 100, count: 2, series: 1, parallel: 2, voc: 21.6, isc: 6.1, battV: 12 as const, minTemp: 0, tech: "pwm" as const },
  { label: "🔋 Ground Mount 3200W (4S2P ×2 · 48V Battery)", watts: 400, count: 8, series: 4, parallel: 2, voc: 49.5, isc: 10.2, battV: 48 as const, minTemp: -20, tech: "mppt" as const },
];

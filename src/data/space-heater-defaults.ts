export const SPACE_HEATER_DEFAULTS = {
  heaterWatts: 1500, // standard maximum plug-in portable heater
  dailyHours: 8, // overnight or standard work shift
  dutyCyclePercent: 70, // 70% thermostat cycling
  electricityRate: 0.18, // $/kWh
  winterMonths: 3, // December, January, February
} as const;

export const QUICK_HEATER_PRESETS = [
  { label: "🪑 Under-Desk Personal Heater (500W · 100% duty)", watts: 500, hours: 8, duty: 100 },
  { label: "🛏️ Ceramic Bedroom Heater (1500W · 60% thermostat)", watts: 1500, hours: 8, duty: 60 },
  { label: "🧱 Oil-Filled Radiator (1500W High · 50% cycle)", watts: 1500, hours: 12, duty: 50 },
  { label: "☀️ Infrared Garage Heater (1500W · 100% continuous)", watts: 1500, hours: 4, duty: 100 },
  { label: "👶 Low-Watt Nursery Heater (750W · 70% cycle)", watts: 750, hours: 10, duty: 70 },
];

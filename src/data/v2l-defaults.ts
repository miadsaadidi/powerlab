export const V2L_DEFAULTS = {
  batteryCapacityKwh: 77.4, // Hyundai Ioniq 5 / Kia EV6 standard pack
  startingSocPercent: 90,
  drivingReservePercent: 20, // 20% protected driving buffer (~50 mi)
  averageLoadWatts: 350, // Refrigerator, Wi-Fi, LED lights, TV, Phone chargers
  v2lMaxOutputWatts: 3600, // 3.6 kW max socket output
  inverterEfficiencyPercent: 92,
} as const;

export const QUICK_V2L_PRESETS = [
  { label: "⚡ Critical Wi-Fi & Fridge (200W · 77.4 kWh EV)", load: 200, cap: 77.4, soc: 90, reserve: 20, maxOutput: 3600 },
  { label: "🍲 Comfort Essentials + Microwave (450W · 77.4 kWh EV)", load: 450, cap: 77.4, soc: 90, reserve: 20, maxOutput: 3600 },
  { label: "❄️ Winter Storm + Furnace Blower (750W · 77.4 kWh EV)", load: 750, cap: 77.4, soc: 90, reserve: 25, maxOutput: 3600 },
  { label: "🏡 Heavy Whole-Home Backup (1800W · 131 kWh F-150)", load: 1800, cap: 131, soc: 95, reserve: 20, maxOutput: 9600 },
  { label: "⛺ Camping & Tailgate (300W · 58 kWh Standard EV)", load: 300, cap: 58, soc: 80, reserve: 30, maxOutput: 1900 },
];

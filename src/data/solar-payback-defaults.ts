export const SOLAR_PAYBACK_DEFAULTS = {
  grossCost: 20000,
  incentivePercent: 30, // 30% Federal ITC
  annualProductionKwh: 9600, // standard 8kW system in moderate sun
  electricityRate: 0.18, // $/kWh
  utilityInflationPercent: 3.5, // %/yr
  panelDegradationPercent: 0.5, // %/yr
  inverterReplacementCost: 1800,
  inverterReplacementYear: 13,
  analysisYears: 25,
} as const;

export const QUICK_PAYBACK_PRESETS = [
  { label: "🏡 Townhouse 4kW ($11k Gross · 4.8k kWh/yr)", grossCost: 11000, incentivePercent: 30, annualKwh: 4800, rate: 0.18 },
  { label: "🏠 Suburban 8kW ($20k Gross · 9.6k kWh/yr)", grossCost: 20000, incentivePercent: 30, annualKwh: 9600, rate: 0.18 },
  { label: "☀️ Sunbelt High-Yield 8kW ($19k · 12.8k kWh/yr)", grossCost: 19000, incentivePercent: 30, annualKwh: 12800, rate: 0.22 },
  { label: "⚡ Large All-Electric 12kW ($30k · 14.4k kWh/yr)", grossCost: 30000, incentivePercent: 30, annualKwh: 14400, rate: 0.18 },
  { label: "🌾 Rural Homestead 16kW ($38k · 20k kWh/yr)", grossCost: 38000, incentivePercent: 30, annualKwh: 20000, rate: 0.17 },
];

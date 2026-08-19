export const VOLTAGE_DROP_DEFAULTS = {
  circuitType: "dc" as "dc" | "ac_single_phase" | "ac_three_phase",
  voltage: 12,
  currentAmps: 20,
  distanceFeet: 15,
  conductorMaterial: "copper" as "copper" | "aluminum",
  targetDropPercent: 3.0,
  selectedAwg: "10 AWG",
} as const;

export const QUICK_VOLTAGE_DROP_PRESETS = [
  { label: "🚐 Vanlife 12V Fridge Line (12V · 6A · 15 ft)", voltage: 12, current: 6, distanceFeet: 15, type: "dc" as const, material: "copper" as const, targetDrop: 3 },
  { label: "🔋 12V 2000W Inverter Battery Cable (12V · 175A · 4 ft)", voltage: 12, current: 175, distanceFeet: 4, type: "dc" as const, material: "copper" as const, targetDrop: 2 },
  { label: "☀️ Solar Array to MPPT (60V · 25A · 30 ft)", voltage: 60, current: 25, distanceFeet: 30, type: "dc" as const, material: "copper" as const, targetDrop: 2 },
  { label: "🔌 48V Server Rack Battery (48V · 100A · 6 ft)", voltage: 48, current: 100, distanceFeet: 6, type: "dc" as const, material: "copper" as const, targetDrop: 1.5 },
  { label: "⚡ 120V Workshop Extension (120V · 15A · 50 ft)", voltage: 120, current: 15, distanceFeet: 50, type: "ac_single_phase" as const, material: "copper" as const, targetDrop: 3 },
];

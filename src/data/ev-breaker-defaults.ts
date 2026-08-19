export const EV_BREAKER_DEFAULTS = {
  chargingAmps: 48, // 48A hardwired Level 2 station
  voltage: 240 as 240 | 208 | 120,
  conductorType: "thhn_conduit" as "thhn_conduit" | "romex_nmb",
  conductorMaterial: "copper" as "copper" | "aluminum",
  distanceFeet: 25,
} as const;

export const QUICK_EV_BREAKER_PRESETS = [
  { label: "🔌 32A NEMA 14-50 Plug (40A Breaker · 7.7 kW)", amps: 32, voltage: 240 as const, condType: "romex_nmb" as const, dist: 25 },
  { label: "⚡ 40A NEMA 14-50 Plug (50A Breaker · 9.6 kW)", amps: 40, voltage: 240 as const, condType: "romex_nmb" as const, dist: 25 },
  { label: "🏎️ 48A Max Hardwired (60A Breaker · 11.5 kW)", amps: 48, voltage: 240 as const, condType: "thhn_conduit" as const, dist: 30 },
  { label: "🔋 16A Dedicated Circuit (20A Breaker · 3.8 kW)", amps: 16, voltage: 240 as const, condType: "romex_nmb" as const, dist: 20 },
  { label: "🚚 80A Commercial Station (100A Breaker · 19.2 kW)", amps: 80, voltage: 240 as const, condType: "thhn_conduit" as const, dist: 40 },
];

export function buildSolarBatteryHandoffUrl(dailyLoadKWh: number, published: boolean): string | null {
  if (!published || !Number.isFinite(dailyLoadKWh) || dailyLoadKWh <= 0) return null;
  const params = new URLSearchParams({ dailyLoadKWh: String(dailyLoadKWh), source: "home-battery-size" });
  return `/solar/solar-battery-bank-size-calculator?${params.toString()}`;
}

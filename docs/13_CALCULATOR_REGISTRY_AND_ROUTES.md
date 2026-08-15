# 13 — Calculator Registry and Routes

## Registry is the source of truth

Codex should maintain a typed registry and use it for navigation, category cards, related calculators, sitemap and metadata tests. Documentation and code must agree.

## Final calculator registry

| # | Phase | Category | Calculator | Canonical route | Primary keyword | Volume/mo | External model | Price input |
|---:|---:|---|---|---|---|---:|---|---|
| 1 | 1 | Battery | Battery Runtime Calculator | `/battery/battery-runtime-calculator` | battery runtime calculator | 5,000 | No | No |
| 2 | 1 | Solar | Solar Panel Tilt Calculator | `/solar/solar-panel-tilt-calculator` | solar panel tilt calculator | 5,000 | PVWatts | No |
| 3 | 1 | Home Energy | Electricity Usage Calculator | `/home-energy/electricity-usage-calculator` | electricity usage calculator | 50,000 | No | Optional flat-rate mode |
| 4 | 1 | Battery | Battery Size Calculator | `/battery/battery-size-calculator` | battery size calculator | 500 | No | No |
| 5 | 1 | EV | EV Charging Time Calculator | `/ev/ev-charging-time-calculator` | ev charging time calculator | 5,000 | No | No |
| 6 | 2 | Solar | Solar Panel Output Calculator | `/solar/solar-panel-output-calculator` | solar panel output calculator | 5,000 | PVWatts | No |
| 7 | 2 | Battery | UPS Runtime Calculator | `/battery/ups-runtime-calculator` | ups runtime calculator | 5,000 | No | No |
| 8 | 2 | Battery | Battery Capacity Calculator | `/battery/battery-capacity-calculator` | battery capacity calculator | 5,000 | No | No |
| 9 | 2 | Battery | Battery Charging Time Calculator | `/battery/battery-charging-time-calculator` | battery charging time calculator | 5,000 | No | No |
| 10 | 2 | Solar | Solar Panel Size Calculator | `/solar/solar-panel-size-calculator` | solar panel size calculator | 5,000 | PVWatts | No |
| 11 | 2 | Battery | UPS Battery Size Calculator | `/battery/ups-battery-size-calculator` | ups battery size calculator | 500 | No | No |
| 12 | 3 | Home Energy | Energy Bill Calculator | `/home-energy/energy-bill-calculator` | energy bill calculator | 50,000 | No | Required |
| 13 | 3 | EV | EV Charging Cost Calculator | `/ev/ev-charging-cost-calculator` | ev charging cost calculator | 5,000 | No | Required |
| 14 | 3 | Battery | Home Battery Size Calculator | `/battery/home-battery-size-calculator` | home battery size calculator | 500 | No | No |
| 15 | 3 | Solar | Solar Battery Bank Size Calculator | `/solar/solar-battery-bank-size-calculator` | solar battery calculator | 5,000 | Optional handoff | No |
| 16 | 3 | Solar | Solar Load Calculator | `/solar/solar-load-calculator` | solar load calculator | 5,000 | No | No |
| 17 | 4 | Battery | Portable Power Station Calculator | `/battery/portable-power-station-calculator` | portable power station calculator | 500 | No | No |
| 18 | 4 | EV | EV Range Calculator | `/ev/ev-range-calculator` | ev range calculator | 500 | No | No |
| 19 | 4 | EV | EV Savings Calculator | `/ev/ev-savings-calculator` | ev savings calculator | 500 | No | Required |
| 20 | 4 | Home Energy | Appliance Wattage Calculator | `/home-energy/appliance-wattage-calculator` | appliance wattage calculator | 500 | No | No |

## Suggested TypeScript shape

```ts
export type CalculatorStatus = "planned" | "building" | "published";

export interface CalculatorRegistryItem {
  id: string;
  name: string;
  category: "solar" | "battery" | "home-energy" | "ev";
  route: string;
  phase: 1 | 2 | 3 | 4;
  status: CalculatorStatus;
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  requiresSolarApi: boolean;
  acceptsPriceInput: "no" | "optional" | "required";
  relatedCalculatorIds: string[];
}
```

## Publication behavior

- `planned`: no public placeholder page; not in sitemap/navigation.
- `building`: accessible only through dev/preview implementation as appropriate; not production sitemap.
- `published`: production route, category listing, related links, sitemap and SEO tests enabled.

## Category hub registry targets

- `/solar/` — support broad `solar calculator` / `solar panel calculator` mixed intent without creating a duplicate generic tool.
- `/battery/` — descriptive hub; no unvalidated volume claim for a broad head term.
- `/home-energy/` — supports `home energy calculator` broad intent.
- `/ev/` — supports broad `ev charging calculator` / `ev charge calculator` / `electric car charging calculator` intent while routing users to time or cost tools.

## Canonical migration note

The old research artifact used `/battery/solar-battery-bank-size-calculator`. The **final canonical architecture** is `/solar/solar-battery-bank-size-calculator`. Do not implement the old path. If it was ever publicly deployed, 301 redirect it to the final path; otherwise no redirect is needed.

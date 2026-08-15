# 10 — Testing and Acceptance

## Test layers

### Unit

- unit conversions;
- formula engines;
- validation;
- scenario helpers;
- provider normalization.

### Component

- input/unit interactions;
- Quick/Advanced behavior;
- appliance builder;
- result rendering;
- warnings/assumptions;
- storage opt-in/reset.

### E2E

- at least one happy path per published calculator;
- invalid input recovery;
- cross-calculator handoff;
- mobile viewport smoke;
- solar provider failure mock;
- optional AI failure mock if enabled.

## Shared acceptance checklist

Every published calculator:

- [ ] has one canonical route;
- [ ] H1/title/meta match documented intent;
- [ ] page returns indexable 200;
- [ ] supporting content server-renders;
- [ ] Quick Mode is usable without account/network unless the calculation inherently requires the solar external model;
- [ ] Advanced assumptions are visible/editable;
- [ ] engine is pure and versioned;
- [ ] result exposes assumptions/provenance;
- [ ] no fake confidence percentage;
- [ ] no hidden tariff/product/model database;
- [ ] localStorage failure does not crash;
- [ ] keyboard and mobile operation pass;
- [ ] no console errors;
- [ ] related-tool CTA works;
- [ ] sitemap only includes published status;
- [ ] production build passes.

## Mathematical invariants

### Battery Runtime

- higher average load cannot increase runtime;
- higher delivered energy cannot decrease runtime;
- zero/negative load rejected;
- Ah requires voltage for energy conversion;
- reserve SOC must be below start SOC;
- efficiency/health within valid range.

### Battery Size / UPS Battery Size / Home Battery / Solar Battery Bank

- longer required runtime/autonomy cannot reduce required capacity;
- lower efficiency cannot reduce capacity;
- lower usable fraction cannot reduce capacity;
- planning margin cannot reduce recommended capacity;
- Ah conversion uses selected voltage.

### Battery Capacity

- `Wh = V × Ah` round-trip conversions remain within numeric tolerance;
- no Ah→Wh conversion without voltage.

### Battery Charging Time

- greater energy to add cannot reduce ideal time at fixed charger power;
- greater effective charger power cannot increase ideal time;
- target SOC must exceed start SOC.

### UPS Runtime / Portable Power Station

- load above known output maximum produces warning/error state;
- increasing load cannot increase runtime;
- VA is not treated as watts without PF assumption.

### Electricity Usage / Solar Load / Appliance Wattage

- quantity scales energy linearly;
- runtime scales energy linearly in watts/time mode;
- cycle mode normalizes correctly;
- annual label kWh remains authoritative when selected;
- essential subset excludes unselected loads.

### Energy Bill

- flat energy charge = kWh × price;
- optional fixed charge added once;
- tax application matches documented subtotal convention;
- no price means no total bill result.

### Solar Tilt

- latitude/longitude bounds enforced;
- quick tilt in 0–90°;
- azimuth in 0–<360°;
- PVWatts failure preserves local starting estimate;
- modeled gain computed from provider outputs correctly;
- “best” only means best among evaluated candidates.

### Solar Output

- normalized provider arrays expected length 12 for monthly output;
- annual output consistent with provider result;
- positive system capacity required;
- no fabricated production on provider failure.

### Solar Panel Size

- higher energy target cannot reduce required array size at fixed yield;
- panel count always rounds upward;
- installed kW reflects rounded panel count.

### EV Charging Time

- start SOC < target SOC;
- higher charger nameplate above vehicle maximum does not reduce simple effective-power time;
- AC/DC efficiency valid;
- generic DC taper visibly labeled;
- ready-at uses calculated duration correctly.

### EV Charging Cost

- higher user price cannot reduce cost;
- source energy >= battery energy when efficiency <= 100%;
- no price means no cost result.

### EV Range

- higher available battery energy cannot reduce range;
- higher consumption cannot increase range;
- reserve cannot increase range.

### EV Savings

- same distance used for EV and fuel comparison;
- unit conversions for L/100 km, km/L and US mpg tested;
- maintenance remains excluded unless explicitly entered.

## SEO tests

Automated where practical:

- unique route/title/meta/H1 across registry;
- exactly one canonical;
- no planned route in sitemap;
- all published calculators linked from category hub;
- no orphan published calculator;
- canonical has no calculator state query;
- structured-data JSON parses;
- breadcrumb URLs valid.

## Performance acceptance

Aim for field-good thresholds:

```text
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
```

Development checks should also guard against:

- blocking PVWatts on initial render;
- giant client bundles;
- chart-induced layout shift;
- excessive hydration work.

## Accessibility

- keyboard completes calculation;
- visible focus;
- error association;
- sufficient contrast;
- no color-only meaning;
- result updates accessible;
- charts have textual/table equivalents.

# 12 — Sources and Methodology

**Documentation review date:** 2026-08-13.

This file records primary/reference sources used for external model behavior, technical defaults and SEO/GEO implementation rules. Generic application presets remain clearly labeled as estimates.

## Solar production model

### PVWatts V8 — National Laboratory of the Rockies Developer Network

https://developer.nlr.gov/docs/solar/pvwatts/v8/

Use for:

- current PVWatts V8 API contract;
- location/system production modeling;
- module/array type mappings;
- provider-supported tilt/azimuth/system inputs;
- documented provider defaults/output fields;
- API usage constraints.

Implementation rule: provider response is normalized through our internal adapter. Calculator pages identify PVWatts V8 when model output is used.

## Battery behavior/default references

### Victron SmartShunt configuration / features

https://www.victronenergy.com/media/pg/SmartShunt/en/configuration.html

https://www.victronenergy.com/media/pg/SmartShunt/en/all-features-and-settings.html

Use as reference for generic Peukert/charge-efficiency/discharge-floor planning assumptions documented in the static-data file.

### Trojan Battery maintenance guidance

https://www.trojanbattery.com/resources/battery-maintenance

Use for lead-acid depth-of-discharge/longevity context.

Important: these sources do not turn generic chemistry presets into product-specific specifications. User/device documentation overrides presets.

## EV charging range/efficiency references

### U.S. Department of Energy Alternative Fuels Data Center

https://afdc.energy.gov/fuels/electricity-stations

Use for broad Level 1 / Level 2 / DC fast charger-power context.

### ENERGY STAR EV Chargers

https://www.energystar.gov/products/ev_chargers

Use for general charging-efficiency context. Do not claim one efficiency value applies to every charger/vehicle.

## Appliance energy references

### U.S. Energy Information Administration

https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php

### ENERGY STAR Product Finder

https://www.energystar.gov/productfinder/

Use to support the methodology principle that real appliance consumption varies and label/measured energy is preferable to a generic wattage preset.

The individual appliance preset values are application-maintained generic estimates and remain editable.

## Search / SEO / generative search

### Google Search Essentials

https://developers.google.com/search/docs/essentials

Use for crawlability, people-first content, descriptive words in titles/headings/link text, and general search eligibility.

### Google — optimizing for generative AI features

https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Current guidance (reviewed 2026-08-13) confirms that foundational SEO remains the basis for generative-search visibility and specifically says Google does not require special `llms.txt` or AI-only markup for this purpose.

### Google sitemap guidance

https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Use for canonical-only sitemap entries and meaningful `lastmod`; Google ignores sitemap `priority` and `changefreq`.

### Google canonicalization

https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

Use for clean canonical calculator URLs and state/query variants.

### Google structured data overview / policies

https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

https://developers.google.com/search/docs/appearance/structured-data/sd-policies

Use only accurate visible-page markup.

## Core Web Vitals

https://web.dev/articles/vitals

Current target thresholds:

- LCP <= 2.5 seconds;
- INP <= 200 ms;
- CLS <= 0.1;
- evaluate at 75th percentile where field data is available.

## Keyword research provenance

Source file supplied with the project:

```text
Energy_Calculator_Keyword_Master_Consolidated.csv
```

It records:

- Google Keyword Planner volume;
- advertiser competition/index;
- CPC range;
- source export;
- manual organic competition;
- canonical merge/build decision.

The final route normalization in this documentation moves the solar battery calculator from the older draft battery path to:

```text
/solar/solar-battery-bank-size-calculator
```

## Review policy

Re-review when:

- PVWatts API version/contract changes;
- Google Search guidance materially changes;
- calculator methodology changes;
- a Phase 2–4 route is about to be published;
- Search Console shows a materially different intent than the current mapping.

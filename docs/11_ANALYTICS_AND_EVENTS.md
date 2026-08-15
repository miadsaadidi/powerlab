# 11 — Analytics and Events

## Goal

Measure whether people discover, complete and connect calculators without collecting unnecessary energy/profile data.

Use a provider-agnostic adapter so analytics vendor choice can change.

## Privacy principle

Do not send:

- full appliance lists;
- precise latitude/longitude;
- full Energy Profile;
- raw user prices;
- battery/EV values that are not needed for event analysis;
- anything resembling account identity (there are no accounts).

Prefer coarse event context.

## Core events

```text
calculator_view
calculator_calculate
calculator_result
calculator_validation_error
calculator_advanced_open
calculator_preset_used
calculator_handoff_click
calculator_scenario_compare
solar_model_request
solar_model_success
solar_model_error
energy_profile_save_local
energy_profile_clear_local
```

## Suggested properties

### calculator_view

```text
calculator_id
category
phase
```

### calculator_calculate / result

```text
calculator_id
input_mode
used_preset: boolean
used_advanced: boolean
```

Do not send raw input values by default.

### calculator_handoff_click

```text
from_calculator_id
to_calculator_id
```

### solar model

```text
calculator_id
provider = pvwatts-v8
request_kind = single | comparison
status
```

Do not include coordinates.

## SEO measurement

Search Console remains source of truth for:

- queries;
- impressions;
- clicks;
- CTR;
- average position;
- indexation/coverage;
- generative-search reporting when available in the property.

## Product KPIs

Useful:

```text
calculator completion rate
Advanced Mode open rate
cross-calculator handoff rate
solar model success/error rate
repeat local-profile usage (only if measurable without invasive identity)
```

Avoid vanity metrics that do not improve the product.

## No analytics dependency

Analytics failure/blocking must never affect calculation or page rendering.

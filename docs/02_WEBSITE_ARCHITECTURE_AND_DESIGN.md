# 02 — Website Architecture and Design

## Information architecture

```text
/
├── /solar/
│   ├── /solar/solar-panel-tilt-calculator
│   ├── /solar/solar-panel-output-calculator
│   ├── /solar/solar-panel-size-calculator
│   ├── /solar/solar-battery-bank-size-calculator
│   └── /solar/solar-load-calculator
├── /battery/
│   ├── /battery/battery-runtime-calculator
│   ├── /battery/battery-size-calculator
│   ├── /battery/battery-capacity-calculator
│   ├── /battery/battery-charging-time-calculator
│   ├── /battery/ups-runtime-calculator
│   ├── /battery/ups-battery-size-calculator
│   ├── /home-energy/home-battery-size-calculator
│   └── /battery/portable-power-station-calculator
├── /home-energy/
│   ├── /home-energy/electricity-usage-calculator
│   ├── /home-energy/energy-bill-calculator
│   └── /home-energy/appliance-wattage-calculator
└── /ev/
    ├── /ev/ev-charging-time-calculator
    ├── /ev/ev-charging-cost-calculator
    ├── /ev/ev-range-calculator
    └── /ev/ev-savings-calculator
```

Utility/company pages:

```text
/methodology
/sources
/about
/privacy
/terms
```

## Homepage

### Hero

- H1: `Energy Calculators for Solar, Batteries, Home Energy & EVs`
- Short promise: practical calculators with transparent assumptions that work together.
- Primary CTA: browse calculators.
- No forced signup.

### Popular calculators

Phase 1 cards:

- Battery Runtime
- Solar Panel Tilt
- Electricity Usage
- Battery Size
- EV Charging Time

### Four category blocks

Each block explains the planning job and links only to **published** calculators.

### Connected workflow

Show a simple flow such as:

```text
Usage → Battery Size → Runtime
Usage → Solar Size → Output
EV Time → EV Cost
```

### Trust/methodology

Explain:

- formulas are deterministic;
- defaults are editable;
- solar production uses an external model where needed;
- user-specific data stays local unless a server API is explicitly required.

## Category hubs

Each category hub is an indexable content page, not a card dump.

Required:

1. one H1;
2. direct category explanation;
3. published calculator cards;
4. “Which tool should I use?” guidance;
5. connected workflow;
6. methodology/source link;
7. no keyword-stuffed filler.

Planned tools may be omitted entirely until published. Do not create crawlable “coming soon” pages.

## Calculator-page layout

Desktop:

```text
Breadcrumb
H1 + one-paragraph direct answer/value proposition

┌────────────────────────────────────────────────────────────┐
│ Calculator                                                  │
│ ┌─────────────────────┐ ┌────────────────────────────────┐ │
│ │ Inputs              │ │ Result                         │ │
│ │                     │ │ Primary number                 │ │
│ │ Quick / Advanced    │ │ Breakdown                      │ │
│ │                     │ │ Assumptions / warning          │ │
│ └─────────────────────┘ └────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘

Worked example / scenario comparison
How it works
Inputs & assumptions
Interpretation
Limitations
Related calculators
Methodology & sources
```

Mobile:

```text
Breadcrumb
H1
Direct intro
Inputs
Calculate / live result
Primary result
Breakdown
Assumptions
Scenario comparison
Supporting content
Related tools
```

Never make the result inaccessible below a huge SEO essay.

## Design direction

Professional utility/product aesthetic:

- light neutral background;
- white/elevated calculator surfaces;
- high contrast text;
- one primary action color;
- restrained category accents;
- large numeric result typography;
- minimal decoration;
- charts only when they improve a decision.

Suggested starter tokens (brand can be changed centrally later):

```css
--bg: #f7f9fc;
--surface: #ffffff;
--text: #0f172a;
--muted: #64748b;
--border: #dbe2ea;
--primary: #0f766e;
--primary-strong: #115e59;
--solar: #b45309;
--battery: #1d4ed8;
--home-energy: #6d28d9;
--ev: #047857;
--danger: #b91c1c;
--warning: #a16207;
```

Do not hard-code colors inside calculator components; use tokens.

## Typography

Use the project’s chosen optimized web/system font. Requirements:

- body 16px minimum on mobile;
- clear 1.5-ish body line height;
- input text at least 16px to avoid mobile zoom behavior;
- result number visually dominant;
- tables remain readable on small screens via responsive layout rather than microscopic text.

## Component system

Shared components should include:

```text
CalculatorShell
CalculatorHeader
QuickAdvancedToggle
NumberField
UnitSelect
PercentField
PresetSelect
ApplianceLoadBuilder
LocationInput
ResultHero
ResultMetric
ResultBreakdown
AssumptionList
WarningCallout
ScenarioTable
SimpleLineChart / BarChart when necessary
RelatedCalculatorCTA
MethodologyBlock
SourceList
```

Do not build a separate visual system for each calculator.

## Form behavior

- labels always visible;
- units attached to the field, not hidden in placeholder text;
- support decimal keyboard on mobile;
- preserve user-entered precision in state;
- calculate on explicit action or debounced change depending complexity;
- PVWatts calls must be explicit/debounced and never fire per keystroke;
- Advanced fields collapse by default;
- presets say “estimate” when appropriate;
- custom value is always available.

## Result design

Order:

1. primary answer;
2. plain-language interpretation;
3. key breakdown;
4. assumptions/provenance;
5. scenario comparison;
6. next action.

Example:

```text
Estimated runtime
6 h 24 min

Based on 640 Wh estimated delivered energy at a 100 W average load.

Nominal energy       1,000 Wh
Usable after reserve   800 Wh
After health            760 Wh
After conversion        684 Wh
Average load            107 W
```

## Charts

Use only where useful:

- Battery Runtime: runtime vs load.
- Electricity Usage: appliance/category energy contribution.
- Solar Tilt: current vs candidate annual/monthly production.
- Solar Output: monthly production.
- EV Charging Time: charger comparison or SOC segments.

Charts need:

- accessible text/table equivalent;
- units on axes;
- no fake precision;
- no 3D decoration.

## Accessibility

Minimum:

- WCAG-oriented semantic markup;
- keyboard usable;
- visible focus states;
- input errors linked via `aria-describedby`;
- no meaning conveyed by color alone;
- chart data available in text/table form;
- buttons describe action;
- sufficient contrast;
- reduced-motion respect;
- result updates announced politely when appropriate.

## Responsive targets

Design for:

- ~320px narrow mobile upward;
- common phone/tablet widths;
- desktop content max-width approximately 1200–1280px;
- calculator two-column layout only when it remains comfortable.

## No dark-pattern conversion

Do not:

- require email to calculate;
- block results behind signup;
- insert misleading “best product” recommendations without evidence;
- imitate system warnings;
- use fake scarcity.

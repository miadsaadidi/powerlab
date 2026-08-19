# Solar Payback & ROI Calculator — Build Specification

## Route

`/solar/solar-payback-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Calculate the break-even payback period (years), lifetime net savings, and return on investment (ROI) for a residential or commercial grid-tied solar installation without lead-capture forms.

## User intent

> How many years will it take for my solar panel investment to pay for itself through electric bill savings?

## SEO target

- **Primary:** `solar payback calculator`
- **Planner volume:** ~18,100/month
- **Planner advertiser competition:** Low (index 14)
- **Organic competition:** Medium–High
- **Validated secondary keywords:**
  - `solar roi calculator` (~5,000/mo)
  - `solar panel payback period calculator` (~1,000/mo)
  - `solar break even calculator` (~500/mo)
  - `how long for solar to pay for itself calculator` (~500/mo)

### Search metadata

- **SEO title:** `Solar Payback Calculator — Break-Even Period & ROI`
- **Meta description:** `Calculate your solar payback period in years, return on investment (ROI), and 25-year lifetime savings based on system cost, annual production, and utility rates.`
- **H1:** `Solar Payback Calculator`
- **Canonical:** self-canonical to `/solar/solar-payback-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **EnergySage (Solar Calculator):** Comprehensive marketplace, but requires address input, estimates are gated behind partner quotes, and forces lead capture.
2. **SolarReviews (Solar Savings Estimator):** High-traffic AI model, but heavily promotes specific installer networks with aggressive sponsored listings.
3. **Unbound Solar (Solar ROI Payback Calculator):** Simple DIY calculator, but assumes flat electricity prices without utility inflation or panel degradation.

### How PowerLab Beats Competitors
- **100% Private & Instant:** No address, email, or phone number required. Calculations run client-side on page load.
- **Realistic Economic Modeling:** Models utility rate inflation ($2\%\text{--}6\%/\text{yr}$), panel degradation ($0.5\%/\text{yr}$), and optional inverter replacement at year 12–15.
- **⚡ 1-Click Top 5 Presets:** Instant autofill for 4kW, 6kW, 8kW, 12kW, and 16kW systems.
- **Interactive 25-Year Cash Flow Visual:** Dynamic area chart showing the exact year cumulative solar savings surpass net installation cost.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Gross System Cost: **$20,000**
- Tax Credits / Rebates: **30% (Federal ITC)** $\rightarrow$ Net Cost: **$14,000**
- Annual Solar Production: **9,600 kWh / year** (8 kW system @ 1,200 kWh/kW/yr)
- Current Electricity Rate: **$0.18 / kWh**
- Utility Rate Annual Escalation: **3.5% / year**
- Solar Panel Annual Degradation: **0.5% / year**
- Inverter Replacement Cost (Year 13): **$1,800**
- Analysis Period: **25 Years**

### ⚡ 1-Click Top 5 Presets
1. 🏡 *Townhouse 4kW ($11,000 Gross · 4,800 kWh/yr · 30% ITC)* $\rightarrow$ ~6.8 yr payback
2. 🏠 *Suburban 8kW ($20,000 Gross · 9,600 kWh/yr · 30% ITC)* $\rightarrow$ ~7.4 yr payback
3. ☀️ *Sunbelt High-Yield 8kW ($19,000 Gross · 12,800 kWh/yr · $0.22/kWh)* $\rightarrow$ ~5.2 yr payback
4. ⚡ *Large All-Electric 12kW ($30,000 Gross · 14,400 kWh/yr · 30% ITC)* $\rightarrow$ ~7.8 yr payback
5. 🌾 *Rural Homestead 16kW ($38,000 Gross · 20,000 kWh/yr · 30% ITC)* $\rightarrow$ ~6.9 yr payback

---

## 📊 Visual Graphs & Data Representations

- **25-Year Cumulative Cash Flow Area Chart:**
  - Blue line: Cumulative grid electricity cost if staying on utility power.
  - Green area: Cumulative net savings from solar.
  - **Intersection Badge:** Highlights the exact break-even year (e.g. `🎯 Break-Even: Year 7, Month 5`).
- **Year-by-Year Financial Amortization Table:**
  - Year, Production (kWh), Utility Rate ($/kWh), Annual Savings ($), Net Cash Flow ($), ROI (%).

---

## Calculation model

```text
NetSystemCost = GrossCost × (1 - IncentiveFraction)
CumulativeSavings = 0
PaybackYears = null

For year = 1 to 25:
  AnnualProduction_yr = BaseAnnualProduction_kWh × (1 - DegradationFraction)^(year - 1)
  UtilityRate_yr = BaseElectricityRate × (1 + InflationFraction)^(year - 1)
  YearSavings = AnnualProduction_yr × UtilityRate_yr
  
  If year == InverterReplacementYear:
    YearSavings -= InverterReplacementCost
    
  CumulativeSavings += YearSavings
  
  If CumulativeSavings >= NetSystemCost and PaybackYears == null:
    FractionalYear = (NetSystemCost - (CumulativeSavings - YearSavings)) / YearSavings
    PaybackYears = (year - 1) + FractionalYear

ROI_25Year = ((CumulativeSavings - NetSystemCost) / NetSystemCost) × 100
```

## Required outputs

- **Primary:** Solar Payback Period (years & months).
- **25-Year Financial Summary:** Total 25-Year Net Profit ($) and Lifetime ROI (%).
- **Interactive Chart:** Cumulative Cash Flow vs. Grid Electricity Spend.
- **Handoffs:** Link to `/home-energy/energy-bill-calculator` and `/solar/solar-battery-bank-size-calculator`.

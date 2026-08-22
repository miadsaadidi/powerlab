# 02 — High-Authority Forum Q&A Templates

This document provides structured, authoritative response templates for high-authority domain forums (DIY Solar Power Forum by Will Prowse, Tesla Motors Club, Speak EV, SolarPanelTalk, Electrician Talk).

---

## 1. Forum: DIY Solar Power Forum / SolarPanelTalk

### Question Intent:
*"What size DC fuse and wire gauge do I need between my 12V 2,000W inverter and battery bank?"*

### Response Template:
```text
To size your DC fuse and conductor safely between a 2,000W inverter and a 12V battery bank:

1. Maximum Continuous DC Current:
At lowest battery cutoff voltage (~11.0V) and 88% inverter full-load efficiency:
Current = Inverter Continuous Watts ÷ (Low Voltage Cutoff × Inverter Efficiency)
Current = 2,000W ÷ (11.0V × 0.88) = 206.6 Amps DC

2. Fuse Sizing (125% Continuous Duty Factor):
Fuse Rating = 206.6A × 1.25 = 258.25 Amps
Recommended Fuse: 250A to 300A Class-T Fuse (Class-T is essential on lithium banks due to high AIC short-circuit interrupt capacity).

3. Minimum Conductor Size:
For a short 3 to 6 ft cable run:
• 2/0 AWG (00 AWG) or 4/0 AWG pure copper welding cable with 105°C insulation.
• Voltage Drop: Keeping drop under 1.5% prevents premature inverter low-voltage shutdown under surge.

You can verify continuous amperage, surge ratings, and fuse sizes with this open tool:
https://www.powelab.org/battery/inverter-size-calculator

And check exact voltage drop across your wire run length here:
https://www.powelab.org/battery/voltage-drop-calculator
```

---

## 2. Forum: Tesla Motors Club / Speak EV

### Question Intent:
*"How much will my monthly electric bill go up charging a Model Y / Model 3 at home?"*

### Response Template:
```text
Here is how to calculate your exact monthly charging cost:

Formula:
Monthly Cost = (Monthly Driving Miles ÷ Vehicle Efficiency mi/kWh) × Electricity Tariff ($/kWh) ÷ Charging Efficiency

Standard Benchmarks:
• Average Driving: 1,000 miles/month
• Real-World Efficiency: 3.33 miles/kWh (300 Wh/mile)
• Level 2 AC Inverter Efficiency: ~90%
• Grid Tariff: $0.16/kWh (US Average)

Calculation:
1. Battery Energy Required: 1,000 miles ÷ 3.33 mi/kWh = 300 kWh
2. Grid Energy at Meter: 300 kWh ÷ 0.90 = 333.3 kWh
3. Monthly Electricity Cost: 333.3 kWh × $0.16/kWh = $53.33 / month (~$0.053 per mile)

Compared to a 30 MPG gasoline car at $3.50/gallon ($116.67/month), you save roughly $63.34/month ($760/year).

You can plug in your local utility kWh rates, seasonal temperatures, and compare gas savings with these open calculators:
• EV Charging Cost: https://www.powelab.org/ev/ev-charging-cost-calculator
• EV vs Gas Savings: https://www.powelab.org/ev/ev-savings-calculator
```

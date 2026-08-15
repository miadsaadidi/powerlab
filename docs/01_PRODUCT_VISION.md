# 01 — Product Vision

## Product definition

A calculator-led energy planning website for four connected domains:

- Solar
- Battery / backup power
- Home energy
- EV charging and operating energy

The differentiator is **connected planning**, not the number of pages.

```text
Electricity Usage
      ↓
Home / Battery Sizing
      ↓
Battery Runtime
      ↕
Solar Load → Solar Panel Size → Solar Output
      ↓
EV charging/cost tools reuse local energy preferences where useful
```

## Product promise

> Enter the important energy facts once, reuse them across related calculators, and always see the assumptions behind the estimate.

## Principles

### Utility first

A page exists because it solves a distinct user task, not because a keyword variation exists.

### Quick first, Advanced second

Beginners get a useful result with minimal inputs. Advanced users can reveal and modify assumptions.

### Deterministic core

Calculation engines are testable code. AI may explain a result but is never the numeric authority.

### Transparent estimates

Every meaningful default shows:

- value;
- unit;
- provenance;
- editability;
- limitation where relevant.

### Decision-oriented output

Do not stop at one number. Explain what the number means, what input dominates it, and which related calculator is the logical next step.

### Local-first

No account is required. Preferences and the shared Energy Profile remain in the browser.

### No unnecessary data infrastructure

No tariff store, user DB, product catalog or vehicle catalog. Specific prices/specifications come from the user. Solar production comes from the external model.

## Audience

Primary audience:

- homeowners and renters planning energy use or backup;
- solar-curious users estimating tilt/output/system size;
- battery/UPS users estimating capacity/runtime;
- EV owners estimating time, cost, range and energy savings;
- technically curious users who want transparent formulas instead of opaque answers.

## Scope boundaries

The product provides planning estimates. It does not provide:

- electrical installation instructions;
- structural roof advice;
- permitting/inspection advice;
- product certification;
- live utility tariffs;
- live fuel prices;
- vehicle-specific charge curves/specifications unless a future approved source is added.

## Full calculator portfolio

### Solar

1. Solar Panel Tilt Calculator
2. Solar Panel Output Calculator
3. Solar Panel Size Calculator
4. Solar Battery Bank Size Calculator
5. Solar Load Calculator

### Battery

6. Battery Runtime Calculator
7. Battery Size Calculator
8. Battery Capacity Calculator
9. Battery Charging Time Calculator
10. UPS Runtime Calculator
11. UPS Battery Size Calculator
12. Home Battery Size Calculator
13. Portable Power Station Calculator

### Home Energy

14. Electricity Usage Calculator
15. Energy Bill Calculator
16. Appliance Wattage Calculator

### EV

17. EV Charging Time Calculator
18. EV Charging Cost Calculator
19. EV Range Calculator
20. EV Savings Calculator

## Launch model

No traditional blog at launch.

Primary search assets:

```text
Homepage
→ category hubs
→ calculator pages with supporting methodology/content
```

Supporting informational content can be added later only after Search Console and live SERP review identify a distinct user task that the calculator page cannot satisfy cleanly.

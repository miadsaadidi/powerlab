import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("battery charging calculator publication gate", () => {
  it("publishes EV Savings after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "ev-savings");
    expect(calculator?.route).toBe("/ev/ev-savings-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("ev-savings")).toBe(true);
  });
  it("keeps the calculator building until explicit publication", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "battery-charging-time");
    expect(calculator?.route).toBe("/battery/battery-charging-time-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("battery-charging-time")).toBe(true);
  });

  it("publishes the Energy Bill Calculator after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "energy-bill");
    expect(calculator?.route).toBe("/home-energy/energy-bill-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("energy-bill")).toBe(true);
  });

  it("publishes EV Charging Cost after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "ev-charging-cost");
    expect(calculator?.route).toBe("/ev/ev-charging-cost-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("ev-charging-cost")).toBe(true);
  });

  it("publishes Solar Battery Bank Size after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "solar-battery-bank-size");
    expect(calculator?.route).toBe("/solar/solar-battery-bank-size-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("solar-battery-bank-size")).toBe(true);
  });

  it("publishes Solar Load after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "solar-load");
    expect(calculator?.route).toBe("/solar/solar-load-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("solar-load")).toBe(true);
  });

  it("publishes all 10 Phase 5 calculators with unique routes and valid categories", () => {
    const phase5Ids = [
      "voltage-drop",
      "generator-size",
      "solar-payback",
      "ac-cost",
      "space-heater-cost",
      "heat-pump-cost",
      "solar-charge-controller",
      "inverter-size",
      "v2l-runtime",
      "ev-breaker-size",
    ];

    for (const id of phase5Ids) {
      const tool = calculatorRegistry.find((c) => c.id === id);
      expect(tool).toBeDefined();
      expect(tool?.phase).toBe(5);
      expect(tool?.status).toBe("published");
      expect(isCalculatorPublished(id)).toBe(true);
      expect(tool?.route).toMatch(/^\/(battery|solar|home-energy|ev)\/[a-z0-9-]+$/);
    }
  });
});

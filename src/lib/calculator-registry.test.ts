import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("battery charging calculator publication gate", () => {
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
});

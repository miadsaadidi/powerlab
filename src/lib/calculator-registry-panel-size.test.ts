import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("Solar Panel Size publication gate", () => {
  it("publishes the route after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "solar-panel-size");
    expect(calculator?.route).toBe("/solar/solar-panel-size-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("solar-panel-size")).toBe(true);
  });
});

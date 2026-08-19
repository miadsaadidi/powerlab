import { describe, expect, it } from "vitest";
import { calculatorRegistry, isCalculatorPublished } from "./calculator-registry";

describe("Portable Power Station publication gate", () => {
  it("is published after explicit approval", () => {
    const calculator = calculatorRegistry.find((item) => item.id === "portable-power-station");

    expect(calculator?.category).toBe("battery");
    expect(calculator?.route).toBe("/battery/portable-power-station-calculator");
    expect(calculator?.status).toBe("published");
    expect(isCalculatorPublished("portable-power-station")).toBe(true);
  });
});

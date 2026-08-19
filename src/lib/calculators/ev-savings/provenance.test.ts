import { describe, expect, it } from "vitest";
import { resolveElectricityPriceProvenance } from "./provenance";

describe("EV Savings electricity price provenance", () => {
  it("keeps a matching saved price and currency profile-derived", () => {
    expect(resolveElectricityPriceProvenance({ price: 0.2, currency: "USD", savedPrice: 0.2, savedCurrency: "USD", current: "profile-derived" })).toBe("profile-derived");
  });

  it("marks a currency-only change as calculator-local without converting the number", () => {
    expect(resolveElectricityPriceProvenance({ price: 0.2, currency: "EUR", savedPrice: 0.2, savedCurrency: "USD", current: "profile-derived" })).toBe("user-currency-changed");
  });

  it("does not restore profile provenance after a user edits the price", () => {
    expect(resolveElectricityPriceProvenance({ price: 0.25, currency: "USD", savedPrice: 0.2, savedCurrency: "USD", current: "user-entered" })).toBe("user-entered");
  });
});

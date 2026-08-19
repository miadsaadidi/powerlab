export type ElectricityPriceProvenance = "example" | "profile-derived" | "user-currency-changed" | "user-entered";

export function resolveElectricityPriceProvenance(input: {
  price: number;
  currency: string;
  savedPrice: number | null;
  savedCurrency: string | null;
  current: ElectricityPriceProvenance;
}): ElectricityPriceProvenance {
  if (input.savedPrice !== null && input.savedCurrency !== null && input.price === input.savedPrice) {
    return input.currency === input.savedCurrency ? "profile-derived" : "user-currency-changed";
  }
  return input.current === "profile-derived" || input.current === "user-currency-changed" ? "user-entered" : input.current;
}

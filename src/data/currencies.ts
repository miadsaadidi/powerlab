export interface CurrencyOption {
  code: string;
  label: string;
}

export const DISPLAY_CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "USD" },
  { code: "EUR", label: "EUR" },
  { code: "GBP", label: "GBP" },
  { code: "CAD", label: "CAD" },
  { code: "AUD", label: "AUD" },
  { code: "MAD", label: "MAD" },
];

export const DEFAULT_DISPLAY_CURRENCY = "USD";

export function isSupportedCurrency(value: string): boolean {
  return DISPLAY_CURRENCIES.some((currency) => currency.code === value);
}

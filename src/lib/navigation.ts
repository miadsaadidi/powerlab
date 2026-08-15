import { calculatorRegistry, type CalculatorRegistryItem } from "./calculator-registry";

export interface NavigationItem {
  label: string;
  href: string;
}

const categoryNavigation: Record<string, NavigationItem> = {
  battery: { label: "Battery", href: "/battery" },
  solar: { label: "Solar", href: "/solar" },
  "home-energy": { label: "Home Energy", href: "/home-energy" },
  ev: { label: "EV", href: "/ev" },
};

const orderedCategories = ["battery", "solar", "home-energy", "ev"] as const;

export type PublishedCategory = (typeof orderedCategories)[number];

export function getPublishedCategories(registry: CalculatorRegistryItem[] = calculatorRegistry): PublishedCategory[] {
  return orderedCategories.filter((category) => registry.some((calculator) => calculator.status === "published" && calculator.category === category));
}

export function getPublishedCalculatorsForCategory(category: PublishedCategory, registry: CalculatorRegistryItem[] = calculatorRegistry) {
  return registry.filter((calculator) => calculator.status === "published" && calculator.category === category);
}

export function getPrimaryNavigation(): NavigationItem[] {
  return [
    { label: "Home", href: "/" },
    ...getPublishedCategories().map((category) => categoryNavigation[category]),
    { label: "Methodology", href: "/methodology" },
    { label: "Sources", href: "/sources" },
  ];
}

export function isCategoryPublished(category: PublishedCategory) {
  return getPublishedCalculatorsForCategory(category).length > 0;
}

export function getFooterNavigation(): NavigationItem[] {
  return [...getPrimaryNavigation(), { label: "Privacy", href: "/privacy" }];
}

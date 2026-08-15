export type ApplianceCategory = "Common" | "Kitchen" | "Cooling" | "Electronics" | "Lighting" | "Other";

export interface AppliancePreset {
  id: string;
  label: string;
  watts: number;
  typicalRange: string;
  category: ApplianceCategory;
  defaultDutyCycle: number;
  loadType: "ac" | "dc";
}

/** Generic planning estimates. Device-label or measured watts should replace these when available. */
export const APPLIANCES: AppliancePreset[] = [
  { id: "wifi-router", label: "Wi-Fi Router", watts: 12, typicalRange: "5–25 W", category: "Common", defaultDutyCycle: 1, loadType: "ac" },
  { id: "internet-modem", label: "Internet Modem / ONT", watts: 10, typicalRange: "4–20 W", category: "Common", defaultDutyCycle: 1, loadType: "ac" },
  { id: "laptop", label: "Laptop", watts: 65, typicalRange: "20–150 W", category: "Electronics", defaultDutyCycle: 1, loadType: "ac" },
  { id: "desktop", label: "Desktop Computer", watts: 200, typicalRange: "80–500 W", category: "Electronics", defaultDutyCycle: 1, loadType: "ac" },
  { id: "led-tv", label: "LED TV", watts: 100, typicalRange: "30–200 W", category: "Electronics", defaultDutyCycle: 1, loadType: "ac" },
  { id: "large-tv", label: "Large TV", watts: 150, typicalRange: "80–300 W", category: "Electronics", defaultDutyCycle: 1, loadType: "ac" },
  { id: "led-bulb", label: "LED Light Bulb", watts: 10, typicalRange: "5–20 W", category: "Lighting", defaultDutyCycle: 1, loadType: "ac" },
  { id: "ceiling-fan", label: "Ceiling Fan", watts: 50, typicalRange: "20–100 W", category: "Common", defaultDutyCycle: 1, loadType: "ac" },
  { id: "refrigerator", label: "Refrigerator", watts: 150, typicalRange: "80–300 W", category: "Cooling", defaultDutyCycle: 0.35, loadType: "ac" },
  { id: "freezer", label: "Freezer", watts: 120, typicalRange: "70–250 W", category: "Cooling", defaultDutyCycle: 0.4, loadType: "ac" },
  { id: "microwave", label: "Microwave", watts: 1200, typicalRange: "700–1800 W", category: "Kitchen", defaultDutyCycle: 1, loadType: "ac" },
  { id: "electric-kettle", label: "Electric Kettle", watts: 1800, typicalRange: "1000–3000 W", category: "Kitchen", defaultDutyCycle: 1, loadType: "ac" },
  { id: "coffee-maker", label: "Coffee Maker", watts: 1000, typicalRange: "600–1500 W", category: "Kitchen", defaultDutyCycle: 1, loadType: "ac" },
  { id: "air-fryer", label: "Air Fryer", watts: 1500, typicalRange: "1000–2000 W", category: "Kitchen", defaultDutyCycle: 1, loadType: "ac" },
  { id: "space-heater", label: "Electric Space Heater", watts: 1500, typicalRange: "500–2000 W", category: "Other", defaultDutyCycle: 1, loadType: "ac" },
  { id: "window-ac", label: "Window AC", watts: 1200, typicalRange: "500–2000 W", category: "Cooling", defaultDutyCycle: 1, loadType: "ac" },
  { id: "split-ac", label: "Split AC", watts: 1500, typicalRange: "500–3500 W", category: "Cooling", defaultDutyCycle: 1, loadType: "ac" },
  { id: "phone-charger", label: "Phone Charger", watts: 10, typicalRange: "5–30 W", category: "Common", defaultDutyCycle: 1, loadType: "ac" },
  { id: "game-console", label: "Game Console", watts: 150, typicalRange: "50–250 W", category: "Electronics", defaultDutyCycle: 1, loadType: "ac" },
  { id: "custom", label: "Custom Appliance", watts: 100, typicalRange: "Enter your device rating", category: "Other", defaultDutyCycle: 1, loadType: "ac" },
];

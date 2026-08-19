export interface GeneratorAppliancePreset {
  id: string;
  label: string;
  category: "Kitchen" | "Climate" | "Pumps & Utilities" | "Electronics & Work" | "Heavy Equipment";
  runningWatts: number;
  startingWatts: number;
  typicalDuty: string;
}

export const GENERATOR_APPLIANCES: GeneratorAppliancePreset[] = [
  { id: "refrigerator", label: "Refrigerator / Freezer", category: "Kitchen", runningWatts: 150, startingWatts: 1200, typicalDuty: "Cycling motor (30-50%)" },
  { id: "microwave", label: "Microwave Oven (1000W)", category: "Kitchen", runningWatts: 1000, startingWatts: 1000, typicalDuty: "Manual intermittent" },
  { id: "coffee-maker", label: "Coffee Maker / Espresso", category: "Kitchen", runningWatts: 1200, startingWatts: 1200, typicalDuty: "Intermittent" },
  { id: "electric-kettle", label: "Electric Kettle", category: "Kitchen", runningWatts: 1500, startingWatts: 1500, typicalDuty: "Intermittent" },
  { id: "toaster", label: "Toaster", category: "Kitchen", runningWatts: 850, startingWatts: 850, typicalDuty: "Intermittent" },
  
  { id: "window-ac-small", label: "Window AC (5,000 BTU)", category: "Climate", runningWatts: 450, startingWatts: 1500, typicalDuty: "Compressor cycling" },
  { id: "window-ac-med", label: "Window AC (10,000 BTU)", category: "Climate", runningWatts: 900, startingWatts: 2800, typicalDuty: "Compressor cycling" },
  { id: "central-ac-3ton", label: "Central AC (3.0 Ton / 36k BTU)", category: "Climate", runningWatts: 3500, startingWatts: 9000, typicalDuty: "Heavy compressor cycling" },
  { id: "furnace-blower", label: "Gas Furnace Blower Fan (1/2 HP)", category: "Climate", runningWatts: 600, startingWatts: 1800, typicalDuty: "Thermostat cycling" },
  { id: "space-heater", label: "Portable Space Heater", category: "Climate", runningWatts: 1500, startingWatts: 1500, typicalDuty: "Continuous / thermostat" },
  { id: "ceiling-fan", label: "Ceiling Fan", category: "Climate", runningWatts: 60, startingWatts: 120, typicalDuty: "Continuous" },
  
  { id: "sump-pump-third", label: "Sump Pump (1/3 HP)", category: "Pumps & Utilities", runningWatts: 600, startingWatts: 1800, typicalDuty: "Intermittent storm float" },
  { id: "sump-pump-half", label: "Sump Pump (1/2 HP Heavy)", category: "Pumps & Utilities", runningWatts: 800, startingWatts: 2400, typicalDuty: "Intermittent storm float" },
  { id: "well-pump-half", label: "Deep Well Pump (1/2 HP 240V)", category: "Pumps & Utilities", runningWatts: 1000, startingWatts: 3000, typicalDuty: "Pressure tank cycling" },
  { id: "well-pump-one", label: "Deep Well Pump (1.0 HP 240V)", category: "Pumps & Utilities", runningWatts: 1800, startingWatts: 5000, typicalDuty: "Pressure tank cycling" },
  { id: "water-heater-electric", label: "Electric Water Heater (50 Gal)", category: "Pumps & Utilities", runningWatts: 4500, startingWatts: 4500, typicalDuty: "Thermostat recovery" },
  
  { id: "wifi-modem", label: "Wi-Fi Router & Fiber Modem", category: "Electronics & Work", runningWatts: 25, startingWatts: 25, typicalDuty: "Continuous 24/7" },
  { id: "laptop-work", label: "Laptop & Dual Monitors", category: "Electronics & Work", runningWatts: 90, startingWatts: 90, typicalDuty: "Work hours" },
  { id: "led-tv", label: "LED TV (55-inch) & Cable Box", category: "Electronics & Work", runningWatts: 110, startingWatts: 110, typicalDuty: "Evening hours" },
  { id: "phone-chargers", label: "Smartphone & Tablet Chargers (×4)", category: "Electronics & Work", runningWatts: 40, startingWatts: 40, typicalDuty: "Intermittent" },
  { id: "led-lighting", label: "LED Home Lighting (10 Rooms)", category: "Electronics & Work", runningWatts: 100, startingWatts: 100, typicalDuty: "Evening continuous" },
  
  { id: "air-compressor", label: "Air Compressor (2 HP)", category: "Heavy Equipment", runningWatts: 1800, startingWatts: 4500, typicalDuty: "Intermittent tank fill" },
  { id: "circular-saw", label: "Circular Saw (15 Amp)", category: "Heavy Equipment", runningWatts: 1800, startingWatts: 3600, typicalDuty: "Trigger burst" },
  { id: "garage-door", label: "Garage Door Opener (1/2 HP)", category: "Heavy Equipment", runningWatts: 550, startingWatts: 1400, typicalDuty: "Intermittent" },
];

export const QUICK_GENERATOR_PRESETS = [
  {
    label: "⚡ Storm Essentials (1,200W Run · 2,400W Surge)",
    appliances: [
      { id: "refrigerator", qty: 1 },
      { id: "wifi-modem", qty: 1 },
      { id: "led-lighting", qty: 1 },
      { id: "phone-chargers", qty: 1 },
      { id: "laptop-work", qty: 1 },
    ],
  },
  {
    label: "🏠 Suburban Storm + Sump Pump (2,850W Run · 5,500W Surge)",
    appliances: [
      { id: "refrigerator", qty: 1 },
      { id: "sump-pump-half", qty: 1 },
      { id: "microwave", qty: 1 },
      { id: "led-tv", qty: 1 },
      { id: "wifi-modem", qty: 1 },
      { id: "led-lighting", qty: 1 },
    ],
  },
  {
    label: "❄️ Summer Emergency + Window AC (3,600W Run · 7,000W Surge)",
    appliances: [
      { id: "refrigerator", qty: 1 },
      { id: "window-ac-med", qty: 1 },
      { id: "microwave", qty: 1 },
      { id: "led-tv", qty: 1 },
      { id: "wifi-modem", qty: 1 },
      { id: "led-lighting", qty: 1 },
    ],
  },
  {
    label: "🏡 Whole Home Partial + Well Pump (5,500W Run · 9,500W Surge)",
    appliances: [
      { id: "refrigerator", qty: 1 },
      { id: "well-pump-one", qty: 1 },
      { id: "furnace-blower", qty: 1 },
      { id: "microwave", qty: 1 },
      { id: "led-tv", qty: 1 },
      { id: "wifi-modem", qty: 1 },
      { id: "led-lighting", qty: 1 },
    ],
  },
  {
    label: "🌾 Rural Homestead Heavy (11,500W Run · 19,000W Surge)",
    appliances: [
      { id: "central-ac-3ton", qty: 1 },
      { id: "well-pump-one", qty: 1 },
      { id: "refrigerator", qty: 1 },
      { id: "electric-kettle", qty: 1 },
      { id: "water-heater-electric", qty: 1 },
      { id: "wifi-modem", qty: 1 },
      { id: "led-lighting", qty: 1 },
    ],
  },
];

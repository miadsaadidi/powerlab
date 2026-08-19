export interface InverterAppliancePreset {
  id: string;
  label: string;
  runningWatts: number;
  surgeWatts: number;
  category: "Kitchen" | "Electronics" | "Tools & Pumps" | "Comfort";
}

export const INVERTER_APPLIANCES: InverterAppliancePreset[] = [
  { id: "laptop", label: "Laptop & Monitors", runningWatts: 90, surgeWatts: 90, category: "Electronics" },
  { id: "starlink", label: "Starlink Satellite & Router", runningWatts: 65, surgeWatts: 95, category: "Electronics" },
  { id: "led-tv", label: "55-inch LED TV & Soundbar", runningWatts: 120, surgeWatts: 120, category: "Electronics" },
  { id: "phone-chargers", label: "USB Phone & Drone Chargers", runningWatts: 45, surgeWatts: 45, category: "Electronics" },
  
  { id: "fridge-120v", label: "Residential Refrigerator", runningWatts: 150, surgeWatts: 1200, category: "Kitchen" },
  { id: "microwave", label: "Microwave Oven (1000W)", runningWatts: 1000, surgeWatts: 1000, category: "Kitchen" },
  { id: "coffee-maker", label: "Coffee Maker / Espresso Machine", runningWatts: 1200, surgeWatts: 1200, category: "Kitchen" },
  { id: "blender", label: "Kitchen Blender", runningWatts: 600, surgeWatts: 1200, category: "Kitchen" },
  { id: "induction-cooktop", label: "Single Induction Cooktop", runningWatts: 1800, surgeWatts: 1800, category: "Kitchen" },
  
  { id: "cpap", label: "CPAP Medical Machine (with Humidifier)", runningWatts: 60, surgeWatts: 60, category: "Comfort" },
  { id: "space-heater", label: "Portable Space Heater (Low/High)", runningWatts: 1500, surgeWatts: 1500, category: "Comfort" },
  { id: "window-ac", label: "Window AC Unit (5,000 BTU)", runningWatts: 450, surgeWatts: 1500, category: "Comfort" },
  
  { id: "sump-pump", label: "Sump Pump (1/3 HP)", runningWatts: 600, surgeWatts: 1800, category: "Tools & Pumps" },
  { id: "circular-saw", label: "Circular Saw (15A)", runningWatts: 1800, surgeWatts: 3600, category: "Tools & Pumps" },
  { id: "drill", label: "Corded Power Drill", runningWatts: 700, surgeWatts: 1400, category: "Tools & Pumps" },
];

export const QUICK_INVERTER_PRESETS = [
  { label: "💻 Road Trip / Laptop Workstation (150W · 12V)", running: 150, surge: 150, battV: 12 as const },
  { label: "🚐 Camper Van Essentials (600W · 1500W Surge · 12V)", running: 600, surge: 1500, battV: 12 as const },
  { label: "☕ Off-Grid Kitchen (1800W · 3200W Surge · 12V/24V)", running: 1800, surge: 3200, battV: 24 as const },
  { label: "🏡 Cabin / Tiny House (2500W · 5000W Surge · 24V)", running: 2500, surge: 5000, battV: 24 as const },
  { label: "⚡ Whole-House Off-Grid (4800W · 9600W Surge · 48V)", running: 4800, surge: 9600, battV: 48 as const },
];

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { calculatorRegistry } from "@/lib/calculator-registry";
import { track } from "@/lib/analytics/analytics";

interface SearchItem {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  route: string;
  description: string;
  keywords: string[];
}

const CATEGORY_NAMES: Record<string, string> = {
  solar: "Solar Energy",
  battery: "Battery Storage",
  "home-energy": "Home Energy",
  ev: "Electric Vehicle",
};

const EXTRA_KEYWORDS: Record<string, string[]> = {
  "battery-runtime": ["ups", "power station", "backup time", "hours", "fridge", "cpap", "van life"],
  "battery-size": ["ah to wh", "battery bank", "off grid", "amp hours", "watt hours"],
  "battery-charging-time": ["charge time", "charger amps", "lifepo4", "lead acid", "c rate"],
  "home-battery-size": ["powerwall", "enphase", "whole home", "outage backup", "grid tie"],
  "solar-panel-tilt": ["solar angle", "sun path", "winter tilt", "latitude", "optimal tilt"],
  "solar-panel-output": ["kwh production", "pvwatts", "solar output", "sun hours", "roof solar"],
  "solar-panel-size": ["how many panels", "solar kw", "roof area", "panel count"],
  "solar-battery-bank-size": ["off grid solar", "autonomy days", "48v battery", "solar storage"],
  "solar-load": ["daily load", "watt hours per day", "essential load", "solar sizing"],
  "electricity-usage": ["appliance wattage", "power consumption", "kwh per month", "kill a watt"],
  "energy-bill": ["electric bill", "kwh cost", "meter reading", "standing charge", "utility rate"],
  "appliance-wattage": ["volts to amps", "power factor", "surge watts", "refrigerator watts"],
  "ev-charging-time": ["tesla", "level 2", "dc fast charge", "nema 14-50", "charging speed"],
  "ev-charging-cost": ["cost per mile", "home charging cost", "supercharger cost"],
  "ev-range": ["mi/kwh", "kwh/100km", "winter range", "battery degradation", "usable capacity"],
  "ev-savings": ["gas vs electric", "fuel savings", "ice comparison", "annual savings"],
  "ups-runtime": ["apc", "cyberpower", "server backup", "va to watts", "desktop pc backup"],
  "portable-power-station": ["jackery", "ecoflow", "bluetti", "anker", "solar generator", "camping"],
  "solar-payback": ["solar roi", "payback period", "break even", "25 year savings", "federal tax credit", "itc"],
  "generator-size": ["whole house generator", "starting watts", "surge watts", "portable generator", "standby generator", "outage power", "dual fuel"],
  "ac-cost": ["air conditioner cost", "seer2", "cooling cost", "window ac", "mini split cost", "central ac electricity"],
  "heat-pump-cost": ["heat pump vs gas", "hspf2", "cop", "heating bill", "heat pump savings", "furnace vs heat pump"],
  "space-heater-cost": ["space heater wattage", "1500 watt heater", "heater electricity cost", "nightly heating cost", "ceramic heater"],
  "voltage-drop": ["wire size", "dc voltage drop", "awg", "12v wire gauge", "cable size", "nec 3 percent", "thhn", "romex"],
  "solar-charge-controller": ["mppt", "pwm", "charge controller sizing", "voc cold weather", "victron", "solar regulator"],
  "inverter-size": ["power inverter", "pure sine wave", "surge watts", "12v to 120v", "dc fuse size", "inverter cables"],
  "v2l-runtime": ["vehicle to load", "ev backup", "bidirectional charging", "ioniq 5 v2l", "f150 lightning pro power", "ev generator"],
  "ev-breaker-size": ["level 2 breaker", "60 amp breaker", "ev wire size", "nema 14-50", "48 amp charger", "nec 125 percent"],
};

const EXTRA_PRESET_ITEMS: SearchItem[] = [
  {
    id: "preset-refrigerator",
    name: "Refrigerator & Freezer (~150W / 1.2–1.8 kWh/day)",
    category: "home-energy",
    categoryName: "Appliance Preset",
    route: "/home-energy/appliance-wattage-calculator",
    description: "Look up running watts, surge current, and backup battery requirements for home refrigeration.",
    keywords: ["refrigerator", "fridge", "freezer", "kitchen", "compressor", "appliance", "150w"],
  },
  {
    id: "preset-tesla-m3",
    name: "Tesla Model 3 / Y (75 kWh Traction Battery)",
    category: "ev",
    categoryName: "Vehicle Preset",
    route: "/ev/ev-charging-time-calculator",
    description: "Calculate Level 1, Level 2 (240V), and Supercharger DC fast charging hours and miles added per hour.",
    keywords: ["tesla", "model 3", "model y", "75 kwh", "ev", "charging time", "supercharger", "nacs"],
  },
  {
    id: "preset-lifepo4-100ah",
    name: "LiFePO4 12V 100Ah (1,280 Wh Lithium Battery)",
    category: "battery",
    categoryName: "Battery Preset",
    route: "/battery/battery-runtime-calculator",
    description: "Calculate runtime hours for camping fridges, CPAP machines, and off-grid inverters at 80% DOD.",
    keywords: ["100ah", "lifepo4", "lithium", "12v battery", "drop in", "trolling motor", "van life"],
  },
  {
    id: "preset-central-ac",
    name: "Central Air Conditioner (3,500W / 3-Ton / 14 SEER2)",
    category: "home-energy",
    categoryName: "HVAC Preset",
    route: "/home-energy/air-conditioner-cost-calculator",
    description: "Estimate hourly, monthly, and seasonal electric utility cooling bills and LRA surge amps.",
    keywords: ["ac", "air conditioner", "central ac", "cooling", "seer2", "hvac", "compressor"],
  },
  {
    id: "preset-space-heater",
    name: "Portable Space Heater (1,500W Electric Radiator)",
    category: "home-energy",
    categoryName: "Heating Preset",
    route: "/home-energy/space-heater-cost-calculator",
    description: "Calculate cost per hour, overnight 8-hour sleeping cost, and winter monthly heating impact.",
    keywords: ["space heater", "heater", "1500w", "radiator", "ceramic heater", "electric heat"],
  },
  {
    id: "preset-solar-400w",
    name: "400W Monocrystalline Rooftop Solar Panel",
    category: "solar",
    categoryName: "Solar Preset",
    route: "/solar/solar-panel-size-calculator",
    description: "Calculate panel counts, roof square footage, and annual kilowatt-hour electricity yield.",
    keywords: ["400w", "solar panel", "monocrystalline", "pv module", "roof solar", "array size"],
  },
  {
    id: "preset-ev-50a-breaker",
    name: "50-Amp NEMA 14-50 Level 2 EV Charger Circuit",
    category: "ev",
    categoryName: "Electrical Preset",
    route: "/ev/ev-charger-breaker-size-calculator",
    description: "Size breaker amperage (50A for 40A continuous charging) and 6 AWG copper wire gauge under NEC 80% rule.",
    keywords: ["nema 14-50", "50 amp", "40 amp", "level 2", "breaker size", "6 awg", "ev circuit"],
  },
  {
    id: "preset-ups-desktop",
    name: "Desktop PC + Dual Monitors Backup (~180W Load)",
    category: "battery",
    categoryName: "UPS Preset",
    route: "/battery/ups-runtime-calculator",
    description: "Calculate blackout runtime on 1000VA / 1500VA battery backup units before graceful shutdown.",
    keywords: ["pc", "desktop", "computer", "gaming pc", "workstation", "ups", "1500va", "cyberpower", "apc"],
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchItems: SearchItem[] = useMemo(() => {
    const calculators: SearchItem[] = calculatorRegistry
      .filter((item) => item.status === "published")
      .map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        categoryName: CATEGORY_NAMES[item.category] || item.category,
        route: item.route,
        description: item.metaDescription,
        keywords: [
          item.name.toLowerCase(),
          item.primaryKeyword.toLowerCase(),
          item.category.toLowerCase(),
          ...(EXTRA_KEYWORDS[item.id] || []),
        ],
      }));

    return [...calculators, ...EXTRA_PRESET_ITEMS];
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems.slice(0, 7); // Default top items

    return searchItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      );
    });
  }, [query, searchItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    track("calculator_calculate", { calculator: item.id, action: "command_palette_nav" });
    setIsOpen(false);
    router.push(item.route);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <>
      <button
        type="button"
        className="cmd-palette-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Search all calculators (Press Cmd + K)"
        title="Search calculators (⌘K or Ctrl+K)"
      >
        <svg
          className="cmd-search-icon"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
        </svg>
        <span className="cmd-trigger-text">Search calculators...</span>
        <kbd className="cmd-kbd">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="cmd-backdrop" onClick={() => setIsOpen(false)} role="presentation">
          <div
            className="cmd-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette Calculator Search"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-input-wrapper">
              <svg
                className="cmd-input-icon"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Search by keyword (e.g., 'Tesla charging', 'solar tilt', 'fridge wattage')..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-results-list"
                aria-autocomplete="list"
              />
              <button
                type="button"
                className="cmd-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            <div className="cmd-results" id="cmd-results-list" role="listbox">
              {filteredItems.length === 0 ? (
                <div className="cmd-no-results">
                  <p>No matching calculators found for &ldquo;{query}&rdquo;.</p>
                  <span className="cmd-hint">Try searching &ldquo;battery&rdquo;, &ldquo;solar&rdquo;, &ldquo;ev&rdquo;, or &ldquo;bill&rdquo;.</span>
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={index === selectedIndex}
                    className={`cmd-result-item ${index === selectedIndex ? "selected" : ""}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="cmd-item-header">
                      <span className="cmd-item-title">{item.name}</span>
                      <span className={`cmd-category-tag cat-${item.category}`}>{item.categoryName}</span>
                    </div>
                    <p className="cmd-item-desc">{item.description}</p>
                  </div>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <span className="cmd-footer-tip">
                <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>↵</kbd> to select · <kbd>esc</kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

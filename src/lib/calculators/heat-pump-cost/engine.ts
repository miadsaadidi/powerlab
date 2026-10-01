import type { HeatingFuelType } from "@/data/heat-pump-defaults";
import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface HeatPumpCostInput {
  annualHeatingDemandMmbtu: number;
  heatPumpScop: number; // Simplified seasonal COP e.g. 3.2
  electricityRate: number; // $/kWh
  existingFuelType: HeatingFuelType;
  furnaceAfuePercent: number; // e.g. 80% or 96%
  gasPricePerTherm?: number; // $/Therm
  propanePricePerGallon?: number; // $/gal
  oilPricePerGallon?: number; // $/gal
}

export interface HeatPumpCostResultData {
  annualHeatingDemandMmbtu: number;
  heatPumpTotalKwh: number;
  heatPumpAnnualCost: number;
  
  existingFuelType: HeatingFuelType;
  existingFuelUnitsConsumed: number;
  existingFuelUnitLabel: string;
  existingSystemAnnualCost: number;
  
  annualCostDifference: number; // positive = heat pump saves money
  isHeatPumpCheaper: boolean;
  breakEvenElectricityRate: number; // $/kWh where heat pump matches fossil fuel
}

export type HeatPumpCostResult = CalculationResult<HeatPumpCostResultData>;

// Thermodynamic Constants (Higher Heating Value / Point-of-Use Equivalency)
export const BTU_PER_KWH = 3412.142;
export const BTU_PER_THERM_GAS = 100000;
export const BTU_PER_GALLON_PROPANE = 91500;
export const BTU_PER_GALLON_OIL = 138500;

export function calculateHeatPumpCost(input: HeatPumpCostInput): HeatPumpCostResult {
  const {
    annualHeatingDemandMmbtu,
    heatPumpScop,
    electricityRate,
    existingFuelType,
    furnaceAfuePercent,
    gasPricePerTherm = 1.45,
    propanePricePerGallon = 3.20,
    oilPricePerGallon = 4.10,
  } = input;

  if (!Number.isFinite(annualHeatingDemandMmbtu) || annualHeatingDemandMmbtu <= 0) {
    throw new Error("Annual heating demand (MMBTU) must be greater than zero.");
  }
  if (!Number.isFinite(heatPumpScop) || heatPumpScop <= 0) {
    throw new Error("Heat pump seasonal COP must be greater than zero.");
  }
  if (!Number.isFinite(electricityRate) || electricityRate <= 0) {
    throw new Error("Electricity rate ($/kWh) must be greater than zero.");
  }
  if (!Number.isFinite(furnaceAfuePercent) || furnaceAfuePercent <= 0 || furnaceAfuePercent > 100) {
    throw new Error("Furnace AFUE efficiency must be between 50% and 100%.");
  }

  const totalDeliveredBtu = annualHeatingDemandMmbtu * 1000000;

  // 1. Electric Heat Pump Calculation (Full Precision)
  const heatPumpDeliveredBtuPerKwh = BTU_PER_KWH * heatPumpScop;
  const rawHeatPumpKwh = totalDeliveredBtu / heatPumpDeliveredBtuPerKwh;
  const heatPumpTotalKwh = Math.round(rawHeatPumpKwh);
  const heatPumpAnnualCost = Number((rawHeatPumpKwh * electricityRate).toFixed(2));

  // 2. Existing Baseline Heating System Calculation
  let rawFuelUnits = 0;
  let existingFuelUnitLabel = "";
  let fuelPrice = 0;
  let fuelEnergyDensity = 0;
  let breakEvenElectricityRate = 0;
  const afueFraction = furnaceAfuePercent / 100;

  if (existingFuelType === "natural_gas") {
    existingFuelUnitLabel = "Therms";
    fuelPrice = gasPricePerTherm;
    fuelEnergyDensity = BTU_PER_THERM_GAS;
    rawFuelUnits = totalDeliveredBtu / (fuelEnergyDensity * afueFraction);
    // Break-Even ($/kWh) = (Gas_Price_per_Therm * 3412.142 * COP) / (100,000 * AFUE)
    breakEvenElectricityRate = (fuelPrice * BTU_PER_KWH * heatPumpScop) / (fuelEnergyDensity * afueFraction);
  } else if (existingFuelType === "propane") {
    existingFuelUnitLabel = "Gallons";
    fuelPrice = propanePricePerGallon;
    fuelEnergyDensity = BTU_PER_GALLON_PROPANE;
    rawFuelUnits = totalDeliveredBtu / (fuelEnergyDensity * afueFraction);
    // Break-Even ($/kWh) = (Propane_Price_per_Gallon * 3412.142 * COP) / (91,500 * AFUE)
    breakEvenElectricityRate = (fuelPrice * BTU_PER_KWH * heatPumpScop) / (fuelEnergyDensity * afueFraction);
  } else if (existingFuelType === "heating_oil") {
    existingFuelUnitLabel = "Gallons";
    fuelPrice = oilPricePerGallon;
    fuelEnergyDensity = BTU_PER_GALLON_OIL;
    rawFuelUnits = totalDeliveredBtu / (fuelEnergyDensity * afueFraction);
    // Break-Even ($/kWh) = (Oil_Price_per_Gallon * 3412.142 * COP) / (138,500 * AFUE)
    breakEvenElectricityRate = (fuelPrice * BTU_PER_KWH * heatPumpScop) / (fuelEnergyDensity * afueFraction);
  } else {
    // Electric Resistance Baseboard (COP = 1.0, 100% resistance conversion)
    existingFuelUnitLabel = "kWh";
    fuelPrice = electricityRate;
    fuelEnergyDensity = BTU_PER_KWH;
    rawFuelUnits = totalDeliveredBtu / BTU_PER_KWH;
    // Break-Even ($/kWh) = Baseboard Electricity Rate * Heat Pump COP
    breakEvenElectricityRate = electricityRate * heatPumpScop;
  }

  const existingFuelUnitsConsumed = Number(rawFuelUnits.toFixed(1));
  const existingSystemAnnualCost = Number((rawFuelUnits * fuelPrice).toFixed(2));
  const annualCostDifference = Number((existingSystemAnnualCost - heatPumpAnnualCost).toFixed(2));
  const isHeatPumpCheaper = annualCostDifference >= 0;

  const assumptions: AssumptionUsed[] = [
    {
      key: "btu_per_kwh",
      value: 3412.142,
      unit: "BTU/kWh",
      provenance: "preset",
      description: "Standard electrical-to-thermal energy conversion constant",
    },
    {
      key: "fuel_heat_content",
      value:
        existingFuelType === "natural_gas"
          ? "100,000 BTU/Therm"
          : existingFuelType === "propane"
          ? "91,500 BTU/Gal"
          : existingFuelType === "heating_oil"
          ? "138,500 BTU/Gal"
          : "3,412.14 BTU/kWh",
      provenance: "preset",
      description: "Higher Heating Value (HHV) of baseline heating fuels",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (!isHeatPumpCheaper) {
    warnings.push({
      code: "FOSSIL_PRICE_PARITY",
      severity: "info",
      message: `At your current electricity rate ($${electricityRate}/kWh) and fuel price ($${fuelPrice.toFixed(2)}/${existingFuelUnitLabel}), your baseline heating system is currently estimated to cost less per year under this simplified seasonal model.`,
    });
  }

  return {
    formulaVersion: "1.1.0",
    result: {
      annualHeatingDemandMmbtu,
      heatPumpTotalKwh,
      heatPumpAnnualCost,
      existingFuelType,
      existingFuelUnitsConsumed,
      existingFuelUnitLabel,
      existingSystemAnnualCost,
      annualCostDifference,
      isHeatPumpCheaper,
      breakEvenElectricityRate: Number(breakEvenElectricityRate.toFixed(4)),
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

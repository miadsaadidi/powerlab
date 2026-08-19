import type { HeatingFuelType } from "@/data/heat-pump-defaults";
import type { CalculationResult, AssumptionUsed, CalculationWarning } from "@/types/calculation";

export interface HeatPumpCostInput {
  annualHeatingDemandMmbtu: number;
  heatPumpScop: number; // Seasonal COP e.g. 3.2
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

// Constants
const BTU_PER_KWH = 3412.142;
const BTU_PER_THERM_GAS = 100000;
const BTU_PER_GALLON_PROPANE = 91500;
const BTU_PER_GALLON_OIL = 138500;

export function calculateHeatPumpCost(input: HeatPumpCostInput): HeatPumpCostResult {
  const {
    annualHeatingDemandMmbtu,
    heatPumpScop,
    electricityRate,
    existingFuelType,
    furnaceAfuePercent,
    gasPricePerTherm = 1.40,
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

  // 1. Electric Heat Pump Calculation
  const heatPumpDeliveredBtuPerKwh = BTU_PER_KWH * heatPumpScop;
  const heatPumpTotalKwh = Math.round(totalDeliveredBtu / heatPumpDeliveredBtuPerKwh);
  const heatPumpAnnualCost = Number((heatPumpTotalKwh * electricityRate).toFixed(2));

  // 2. Existing Heating System Calculation
  let existingFuelUnitsConsumed = 0;
  let existingFuelUnitLabel = "";
  let existingSystemAnnualCost = 0;
  const afueFraction = furnaceAfuePercent / 100;

  if (existingFuelType === "natural_gas") {
    existingFuelUnitLabel = "Therms";
    const deliveredBtuPerTherm = BTU_PER_THERM_GAS * afueFraction;
    existingFuelUnitsConsumed = Number((totalDeliveredBtu / deliveredBtuPerTherm).toFixed(1));
    existingSystemAnnualCost = Number((existingFuelUnitsConsumed * gasPricePerTherm).toFixed(2));
  } else if (existingFuelType === "propane") {
    existingFuelUnitLabel = "Gallons";
    const deliveredBtuPerGallon = BTU_PER_GALLON_PROPANE * afueFraction;
    existingFuelUnitsConsumed = Number((totalDeliveredBtu / deliveredBtuPerGallon).toFixed(1));
    existingSystemAnnualCost = Number((existingFuelUnitsConsumed * propanePricePerGallon).toFixed(2));
  } else if (existingFuelType === "heating_oil") {
    existingFuelUnitLabel = "Gallons";
    const deliveredBtuPerGallon = BTU_PER_GALLON_OIL * afueFraction;
    existingFuelUnitsConsumed = Number((totalDeliveredBtu / deliveredBtuPerGallon).toFixed(1));
    existingSystemAnnualCost = Number((existingFuelUnitsConsumed * oilPricePerGallon).toFixed(2));
  } else {
    // Electric Resistance Baseboard (COP = 1.0)
    existingFuelUnitLabel = "kWh";
    existingFuelUnitsConsumed = Math.round(totalDeliveredBtu / BTU_PER_KWH);
    existingSystemAnnualCost = Number((existingFuelUnitsConsumed * electricityRate).toFixed(2));
  }

  const annualCostDifference = Number((existingSystemAnnualCost - heatPumpAnnualCost).toFixed(2));
  const isHeatPumpCheaper = annualCostDifference >= 0;

  // Break-even electric rate ($/kWh)
  const breakEvenElectricityRate = heatPumpTotalKwh > 0 ? Number((existingSystemAnnualCost / heatPumpTotalKwh).toFixed(3)) : 0;

  const assumptions: AssumptionUsed[] = [
    {
      key: "btu_per_kwh",
      value: 3412.14,
      unit: "BTU/kWh",
      provenance: "preset",
      description: "Standard physical energy conversion constant",
    },
    {
      key: "fuel_heat_content",
      value: existingFuelType === "natural_gas" ? "100,000 BTU/Therm" : existingFuelType === "propane" ? "91,500 BTU/Gal" : "138,500 BTU/Gal",
      provenance: "preset",
      description: "Higher Heating Value (HHV) of standard heating fuels",
    },
  ];

  const warnings: CalculationWarning[] = [];
  if (!isHeatPumpCheaper) {
    warnings.push({
      code: "FOSSIL_PRICE_PARITY",
      severity: "info",
      message: `At your current electricity rate ($${electricityRate}/kWh) and gas price, natural gas is currently slightly cheaper per year. A dual-fuel hybrid system or pairing with solar maximizes savings.`,
    });
  }

  return {
    formulaVersion: "1.0.0",
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
      breakEvenElectricityRate,
    },
    assumptions,
    warnings,
    qualityLabel: "specific-inputs",
  };
}

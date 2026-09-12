import { US_REGIONAL_CLIMATE_DATA } from '../src/data/regional-climate-solar-data';
import * as fs from 'fs';
import * as path from 'path';

const headers = [
  'state',
  'state_code',
  'primary_metro',
  'latitude',
  'longitude',
  'ashrae_climate_zone',
  'winter_design_temp_f',
  'summer_design_temp_f',
  'peak_sun_hours_kwh_m2_day',
  'optimal_solar_tilt_deg',
  'residential_electricity_rate_usd_per_kwh'
];

const rows = US_REGIONAL_CLIMATE_DATA.map(d => [
  `"${d.state}"`,
  `"${d.stateCode}"`,
  `"${d.metro}"`,
  d.latitude,
  d.longitude,
  `"${d.ashraeClimateZone}"`,
  d.winterDesignTempF,
  d.summerDesignTempF,
  d.peakSunHours,
  d.optimalTiltDeg,
  d.electricityRateKwh
].join(','));

const csvContent = [headers.join(','), ...rows].join('\n');
const outPath = path.resolve(__dirname, '../public/datasets/50-state-solar-insolation-climate-matrix.csv');

fs.writeFileSync(outPath, csvContent, 'utf-8');
console.log(`CSV successfully written to ${outPath} (${US_REGIONAL_CLIMATE_DATA.length} states)`);

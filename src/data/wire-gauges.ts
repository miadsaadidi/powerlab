export interface WireGauge {
  awg: string;
  metricMm2: number;
  circularMils: number;
  maxAmpacityCopper75C: number;
  maxAmpacityCopper60C: number;
  maxAmpacityAluminum75C: number;
  resistanceOhmPer1000FtCopper: number;
  resistanceOhmPer1000FtAluminum: number;
}

export const WIRE_GAUGES: WireGauge[] = [
  { awg: "18 AWG", metricMm2: 0.82, circularMils: 1624, maxAmpacityCopper75C: 10, maxAmpacityCopper60C: 10, maxAmpacityAluminum75C: 0, resistanceOhmPer1000FtCopper: 6.385, resistanceOhmPer1000FtAluminum: 10.49 },
  { awg: "16 AWG", metricMm2: 1.31, circularMils: 2583, maxAmpacityCopper75C: 13, maxAmpacityCopper60C: 10, maxAmpacityAluminum75C: 0, resistanceOhmPer1000FtCopper: 4.016, resistanceOhmPer1000FtAluminum: 6.59 },
  { awg: "14 AWG", metricMm2: 2.08, circularMils: 4110, maxAmpacityCopper75C: 20, maxAmpacityCopper60C: 15, maxAmpacityAluminum75C: 0, resistanceOhmPer1000FtCopper: 2.525, resistanceOhmPer1000FtAluminum: 4.14 },
  { awg: "12 AWG", metricMm2: 3.31, circularMils: 6530, maxAmpacityCopper75C: 25, maxAmpacityCopper60C: 20, maxAmpacityAluminum75C: 20, resistanceOhmPer1000FtCopper: 1.588, resistanceOhmPer1000FtAluminum: 2.60 },
  { awg: "10 AWG", metricMm2: 5.26, circularMils: 10380, maxAmpacityCopper75C: 35, maxAmpacityCopper60C: 30, maxAmpacityAluminum75C: 30, resistanceOhmPer1000FtCopper: 0.9989, resistanceOhmPer1000FtAluminum: 1.64 },
  { awg: "8 AWG", metricMm2: 8.37, circularMils: 16510, maxAmpacityCopper75C: 50, maxAmpacityCopper60C: 40, maxAmpacityAluminum75C: 40, resistanceOhmPer1000FtCopper: 0.6282, resistanceOhmPer1000FtAluminum: 1.03 },
  { awg: "6 AWG", metricMm2: 13.3, circularMils: 26240, maxAmpacityCopper75C: 65, maxAmpacityCopper60C: 55, maxAmpacityAluminum75C: 50, resistanceOhmPer1000FtCopper: 0.3951, resistanceOhmPer1000FtAluminum: 0.648 },
  { awg: "4 AWG", metricMm2: 21.2, circularMils: 41740, maxAmpacityCopper75C: 85, maxAmpacityCopper60C: 70, maxAmpacityAluminum75C: 65, resistanceOhmPer1000FtCopper: 0.2485, resistanceOhmPer1000FtAluminum: 0.408 },
  { awg: "3 AWG", metricMm2: 26.7, circularMils: 52620, maxAmpacityCopper75C: 100, maxAmpacityCopper60C: 85, maxAmpacityAluminum75C: 75, resistanceOhmPer1000FtCopper: 0.1970, resistanceOhmPer1000FtAluminum: 0.323 },
  { awg: "2 AWG", metricMm2: 33.6, circularMils: 66360, maxAmpacityCopper75C: 115, maxAmpacityCopper60C: 95, maxAmpacityAluminum75C: 90, resistanceOhmPer1000FtCopper: 0.1563, resistanceOhmPer1000FtAluminum: 0.256 },
  { awg: "1 AWG", metricMm2: 42.4, circularMils: 83690, maxAmpacityCopper75C: 130, maxAmpacityCopper60C: 110, maxAmpacityAluminum75C: 100, resistanceOhmPer1000FtCopper: 0.1239, resistanceOhmPer1000FtAluminum: 0.203 },
  { awg: "1/0 AWG", metricMm2: 53.5, circularMils: 105600, maxAmpacityCopper75C: 150, maxAmpacityCopper60C: 125, maxAmpacityAluminum75C: 120, resistanceOhmPer1000FtCopper: 0.0983, resistanceOhmPer1000FtAluminum: 0.161 },
  { awg: "2/0 AWG", metricMm2: 67.4, circularMils: 133100, maxAmpacityCopper75C: 175, maxAmpacityCopper60C: 145, maxAmpacityAluminum75C: 135, resistanceOhmPer1000FtCopper: 0.0779, resistanceOhmPer1000FtAluminum: 0.128 },
  { awg: "3/0 AWG", metricMm2: 85.0, circularMils: 167800, maxAmpacityCopper75C: 200, maxAmpacityCopper60C: 165, maxAmpacityAluminum75C: 155, resistanceOhmPer1000FtCopper: 0.0618, resistanceOhmPer1000FtAluminum: 0.101 },
  { awg: "4/0 AWG", metricMm2: 107.0, circularMils: 211600, maxAmpacityCopper75C: 230, maxAmpacityCopper60C: 195, maxAmpacityAluminum75C: 180, resistanceOhmPer1000FtCopper: 0.0490, resistanceOhmPer1000FtAluminum: 0.0804 },
  { awg: "250 kcmil", metricMm2: 127.0, circularMils: 250000, maxAmpacityCopper75C: 255, maxAmpacityCopper60C: 215, maxAmpacityAluminum75C: 205, resistanceOhmPer1000FtCopper: 0.0415, resistanceOhmPer1000FtAluminum: 0.0681 },
  { awg: "300 kcmil", metricMm2: 152.0, circularMils: 300000, maxAmpacityCopper75C: 285, maxAmpacityCopper60C: 240, maxAmpacityAluminum75C: 230, resistanceOhmPer1000FtCopper: 0.0346, resistanceOhmPer1000FtAluminum: 0.0567 },
  { awg: "350 kcmil", metricMm2: 177.0, circularMils: 350000, maxAmpacityCopper75C: 310, maxAmpacityCopper60C: 260, maxAmpacityAluminum75C: 250, resistanceOhmPer1000FtCopper: 0.0297, resistanceOhmPer1000FtAluminum: 0.0486 },
  { awg: "500 kcmil", metricMm2: 253.0, circularMils: 500000, maxAmpacityCopper75C: 380, maxAmpacityCopper60C: 320, maxAmpacityAluminum75C: 310, resistanceOhmPer1000FtCopper: 0.0208, resistanceOhmPer1000FtAluminum: 0.0340 },
];

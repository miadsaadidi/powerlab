# Harvard Dataverse Dataset Deposit Package (Release 1: September 4, 2026)

**Repository Platform:** Harvard Dataverse (`https://dataverse.harvard.edu/`)  
**Dataverse Collection:** PowerLab Applied Energy & Building Decarbonization Dataverse  
**Deposit Date:** September 4, 2026  
**Persistent Identifier (Target DOI):** `doi:10.7910/DVN/POWERLAB-SOLAR-CLIMATE-50STATE`  
**License:** Creative Commons Zero (CC0 1.0 Universal — Public Domain Dedication)

---

## 1. Complete Harvard Dataverse Metadata Submission Form

### 1.1 Citation Metadata

* **Dataset Title:**  
  *Replication Data for: 50-State NREL Photovoltaic Solar Irradiance, Optimal Fixed-Tilt Angles, and ASHRAE Climatic Design Conditions (1991–2020)*

* **Principal Investigator / Author:**  
  * **Name:** Sami, miad  
  * **Affiliation:** PowerLab Applied Energy Modeling Research Initiative  
  * **Identifier / ORCID:** PowerLab Open Modeling Group (`https://www.powelab.org`)

* **Contact:**  
  * **Name:** PowerLab Open Data Curators  
  * **Email:** `miad@powelab.org`

* **Description (Abstract):**  
  > This dataset provides a standardized, state-by-state reference matrix of photovoltaic solar resource potentials, optimal surface tilt orientations, seasonal angle adjustments, and ASHRAE climatic design conditions across all 50 United States. Compiled from the National Renewable Energy Laboratory (NREL) National Solar Radiation Database (NSRDB 1991–2020 Physical Solar Model) and ASHRAE Standard 90.1/169 Climatic Data for Building Design Standards (2021), this dataset standardizes: (1) mean annual Global Horizontal Irradiance (GHI, kWh/m²/day); (2) annual peak sun hours (PSH); (3) optimal annual fixed tilt angles ($\beta_{opt}$); (4) winter and summer seasonal tilt offsets ($\beta_{winter} = \text{Lat} + 15^\circ$, $\beta_{summer} = \text{Lat} - 15^\circ$); (5) ASHRAE 99.6% extreme winter design dry-bulb temperatures ($T_{cold}$); (6) ASHRAE 1.0% summer design cooling temperatures ($T_{hot}$); and (7) mean ground snow albedo reflectance factors ($\rho_{ground}$).
  >
  > The dataset is designed for computational energy modeling, photovoltaic string voltage temperature corrections under NEC 690.7, building heat loss sizing, and air-source heat pump cold-weather derating. Open computational calculators and interactive tools utilizing this dataset are deployed at https://www.powelab.org/solar/regional-climate-data and https://www.powelab.org/solar/solar-panel-output-calculator.

* **Subject:**  
  * Engineering  
  * Earth and Environmental Sciences  
  * Computer and Information Science

* **Keyword / Index Terms:**  
  * Solar Irradiance  
  * Photovoltaics (PV)  
  * Peak Sun Hours (PSH)  
  * Fixed-Tilt Optimization  
  * ASHRAE Climatic Design Conditions  
  * Global Horizontal Irradiance (GHI)  
  * Cold Temperature Open-Circuit Voltage ($V_{oc}$)  
  * Ground Albedo Snow Reflectance

* **Related Publications & Authoritative Resources:**  
  * Primary Canonical Hub: `https://www.powelab.org/solar/regional-climate-data`  
  * Interactive Sizing Tool: `https://www.powelab.org/solar/solar-panel-output-calculator`  
  * Technical Guide: `https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide`  
  * NREL NSRDB: Sengupta et al. (2018), *The National Solar Radiation Data Base*, Renewable and Sustainable Energy Reviews.  
  * ASHRAE Handbook of Fundamentals (2021), Chapter 14: *Climatic Design Information*.

---

## 2. Data Dictionary (`README.md` for Deposit Archive)

| Column Header | Data Type | Units | Description & Provenance |
| :--- | :--- | :--- | :--- |
| `state_code` | String (2) | — | Two-letter ISO 3166-2:US postal code abbreviation (e.g. `CA`, `TX`, `NY`). |
| `state_name` | String | — | Full name of the U.S. State. |
| `latitude_deg` | Float | Degrees North | Representative population-weighted geographic centroid latitude. |
| `longitude_deg` | Float | Degrees West | Representative population-weighted geographic centroid longitude. |
| `annual_peak_sun_hours`| Float | Hours/day | Mean annual Peak Sun Hours at $1,000\text{ W/m}^2$ standard test intensity (NREL NSRDB). |
| `annual_ghi_kwh_m2_day`| Float | $\text{kWh/m}^2/\text{day}$| Mean annual Global Horizontal Irradiance on a horizontal surface. |
| `optimal_fixed_tilt_deg`| Float | Degrees | Annual energy yield maximizing panel tilt angle ($\beta \approx 0.87 \times \text{Lat} + 3.1^\circ$). |
| `winter_tilt_deg` | Float | Degrees | Optimal winter solar capture tilt angle ($\beta_{winter} = \text{Lat} + 15^\circ$, bounded $\le 65^\circ$). |
| `summer_tilt_deg` | Float | Degrees | Optimal summer solar capture tilt angle ($\beta_{summer} = \text{Lat} - 15^\circ$, bounded $\ge 10^\circ$). |
| `ashrae_cold_design_f` | Float | °F | ASHRAE 99.6% annual extreme minimum design dry-bulb temperature. |
| `ashrae_hot_design_f` | Float | °F | ASHRAE 1.0% annual summer design dry-bulb temperature. |
| `snow_albedo_factor` | Float | Dimensionless (0–1) | Mean winter diffuse ground reflectance gain factor under Perez transposition models. |

---

## 3. CSV Dataset Structure Excerpt (`50_state_solar_ashrae_climatic_matrix.csv`)

```csv
state_code,state_name,latitude_deg,longitude_deg,annual_peak_sun_hours,annual_ghi_kwh_m2_day,optimal_fixed_tilt_deg,winter_tilt_deg,summer_tilt_deg,ashrae_cold_design_f,ashrae_hot_design_f,snow_albedo_factor
AL,Alabama,32.8067,-86.7911,4.60,4.60,31.6,47.8,17.8,20.0,94.0,0.20
AK,Alaska,61.3707,-152.4044,3.20,3.20,56.5,65.0,46.4,-15.0,75.0,0.65
AZ,Arizona,33.7298,-111.4312,6.50,6.50,32.4,48.7,18.7,35.0,108.0,0.20
AR,Arkansas,34.9697,-92.3731,4.70,4.70,33.5,50.0,20.0,18.0,95.0,0.20
CA,California,36.1162,-119.6816,5.80,5.80,34.5,51.1,21.1,38.0,98.0,0.20
CO,Colorado,39.0598,-105.3111,5.60,5.60,37.1,54.1,24.1,3.0,91.0,0.50
CT,Connecticut,41.5978,-72.7554,4.20,4.20,39.3,56.6,26.6,5.0,88.0,0.40
DE,Delaware,39.3185,-75.5071,4.40,4.40,37.3,54.3,24.3,14.0,90.0,0.25
FL,Florida,27.7663,-81.6868,5.40,5.40,27.3,42.8,12.8,38.0,93.0,0.20
GA,Georgia,33.0406,-83.6431,4.80,4.80,31.8,48.0,18.0,22.0,93.0,0.20
HI,Hawaii,21.0943,-157.4983,5.80,5.80,21.5,36.1,10.0,60.0,88.0,0.20
ID,Idaho,44.2405,-114.4788,4.90,4.90,41.6,59.2,29.2,-2.0,94.0,0.55
IL,Illinois,40.3495,-88.9861,4.30,4.30,38.2,55.3,25.3,-3.0,90.0,0.45
IN,Indiana,39.8494,-86.2583,4.30,4.30,37.8,54.8,24.8,0.0,89.0,0.40
IA,Iowa,42.0115,-93.2105,4.40,4.40,39.7,57.0,27.0,-8.0,90.0,0.55
KS,Kansas,38.5266,-96.7265,5.10,5.10,36.6,53.5,23.5,4.0,96.0,0.35
KY,Kentucky,37.6681,-84.6701,4.40,4.40,35.9,52.7,22.7,10.0,90.0,0.30
LA,Louisiana,31.1695,-91.8678,4.70,4.70,30.2,46.2,16.2,28.0,94.0,0.20
ME,Maine,44.6939,-69.3819,4.20,4.20,42.0,59.7,29.7,-7.0,85.0,0.60
MD,Maryland,39.0639,-76.8021,4.40,4.40,37.1,54.1,24.1,14.0,91.0,0.25
MA,Massachusetts,42.2302,-71.5301,4.20,4.20,39.8,57.2,27.2,4.0,87.0,0.45
MI,Michigan,43.3266,-84.5361,4.00,4.00,40.8,58.3,28.3,-1.0,87.0,0.55
MN,Minnesota,45.6945,-93.9002,4.30,4.30,42.9,60.7,30.7,-14.0,88.0,0.65
MS,Mississippi,32.7416,-89.6787,4.70,4.70,31.6,47.7,17.7,22.0,94.0,0.20
MO,Missouri,38.4561,-92.2884,4.70,4.70,36.6,53.5,23.5,4.0,93.0,0.35
MT,Montana,46.9219,-110.4544,4.60,4.60,43.9,61.9,31.9,-16.0,89.0,0.60
NE,Nebraska,41.1254,-98.2681,4.90,4.90,38.9,56.1,26.1,-4.0,93.0,0.45
NV,Nevada,38.3135,-117.0554,6.00,6.00,36.4,53.3,23.3,16.0,101.0,0.30
NH,New Hampshire,43.4525,-71.5639,4.20,4.20,40.9,58.5,28.5,-3.0,86.0,0.55
NJ,New Jersey,40.2989,-74.5210,4.40,4.40,38.2,55.3,25.3,11.0,89.0,0.30
NM,New Mexico,34.8405,-106.2485,6.40,6.40,33.4,49.8,19.8,15.0,96.0,0.25
NY,New York,42.1657,-74.9481,4.10,4.10,39.8,57.2,27.2,3.0,87.0,0.50
NC,North Carolina,35.6301,-79.8064,4.70,4.70,34.1,50.6,20.6,19.0,91.0,0.20
ND,North Dakota,47.5289,-99.7840,4.40,4.40,44.4,62.5,32.5,-20.0,88.0,0.65
OH,Ohio,40.3888,-82.7649,4.20,4.20,38.2,55.4,25.4,4.0,88.0,0.40
OK,Oklahoma,35.5653,-96.9289,5.20,5.20,34.0,50.6,20.6,12.0,98.0,0.20
OR,Oregon,44.5720,-122.0709,4.40,4.40,41.9,59.6,29.6,19.0,90.0,0.35
PA,Pennsylvania,40.5908,-77.2098,4.20,4.20,38.4,55.6,25.6,6.0,87.0,0.40
RI,Rhode Island,41.6809,-71.5118,4.20,4.20,39.4,56.7,26.7,8.0,86.0,0.35
SC,South Carolina,33.8569,-80.9450,4.80,4.80,32.6,48.9,18.9,23.0,93.0,0.20
SD,South Dakota,44.2998,-99.4388,4.70,4.70,41.6,59.3,29.3,-12.0,91.0,0.55
TN,Tennessee,35.7478,-86.6923,4.60,4.60,34.2,50.7,20.7,16.0,91.0,0.20
TX,Texas,31.0545,-97.5635,5.30,5.30,30.1,46.1,16.1,25.0,99.0,0.20
UT,Utah,40.1500,-111.8624,5.60,5.60,38.0,55.2,25.2,10.0,96.0,0.45
VT,Vermont,44.0459,-72.7107,4.10,4.10,41.4,59.0,29.0,-10.0,84.0,0.60
VA,Virginia,37.7693,-78.1699,4.50,4.50,36.0,52.8,22.8,17.0,90.0,0.20
WA,Washington,47.4009,-121.4905,3.90,3.90,44.3,62.4,32.4,18.0,86.0,0.35
WV,West Virginia,38.4912,-80.9545,4.20,4.20,36.6,53.5,23.5,8.0,87.0,0.35
WI,Wisconsin,44.2685,-89.6165,4.20,4.20,41.6,59.3,29.3,-10.0,86.0,0.60
WY,Wyoming,42.7560,-107.3025,5.40,5.40,40.3,57.8,27.8,-8.0,89.0,0.55
```

---

## 4. Harvard Dataverse Direct Upload Checklist

When executing deposit in the Harvard Dataverse web console:
1. Log in to [dataverse.harvard.edu](https://dataverse.harvard.edu/).
2. Navigate to `/dataverse/powerlab`.
3. Click **Add Data** → **New Dataset**.
4. Paste the Citation Metadata from Section 1.
5. Upload:
   - `50_state_solar_ashrae_climatic_matrix.csv`
   - `README.md`
6. Click **Save Dataset** and then **Publish Dataset** to mint the permanent DOI.

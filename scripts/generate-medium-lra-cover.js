const sharp = require("sharp");
const path = require("path");

const width = 1200;
const height = 675;

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c14" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="surgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
      <stop offset="15%" stop-color="#f59e0b" />
      <stop offset="25%" stop-color="#ef4444" />
      <stop offset="35%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>

    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.6" />
    </pattern>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Ambient Glow Orbs -->
  <circle cx="850" cy="300" r="280" fill="#ef4444" fill-opacity="0.08" filter="url(#glow)" />
  <circle cx="200" cy="150" r="220" fill="#38bdf8" fill-opacity="0.06" filter="url(#glow)" />

  <!-- Technical HUD Borders -->
  <rect x="30" y="30" width="${width - 60}" height="${height - 60}" fill="none" stroke="#334155" stroke-width="1.5" rx="16" stroke-dasharray="10 5 2 5" />
  
  <!-- Category Badge -->
  <g transform="translate(60, 65)">
    <rect width="210" height="34" rx="17" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
    <text x="105" y="22" fill="#fbbf24" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" text-anchor="middle">PHYSICS &amp; ELECTRICAL</text>
  </g>

  <!-- Header Text -->
  <text x="60" y="160" fill="url(#textGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-1">
    THE LOCKED ROTOR AMPS (LRA) AMBUSH
  </text>
  
  <text x="60" y="205" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600">
    Why a 3.5-Ton Central AC Stalls a 10,000-Watt Backup Generator
  </text>

  <!-- Inrush Oscilloscope Diagram Box -->
  <g transform="translate(60, 245)">
    <rect width="660" height="310" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="2" />
    
    <!-- Internal Scope Grid -->
    <line x1="0" y1="155" x2="660" y2="155" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" />
    <line x1="200" y1="0" x2="200" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" />
    <line x1="450" y1="0" x2="450" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" />

    <!-- Waveform: Steady -> Inrush Spike (LRA) -> Running (RLA) -->
    <!-- Path maps: baseline 155 -> spike up to 25 -> decay back to 110-120 steady -->
    <path d="M 20 155 
             Q 80 155, 120 155 
             L 140 155 
             C 150 155, 155 25, 175 25
             C 195 25, 205 285, 225 285
             C 245 285, 255 55, 275 55
             C 295 55, 310 240, 330 240
             C 350 240, 370 90, 390 90
             C 410 90, 430 200, 450 200
             C 480 200, 500 125, 520 125
             C 540 125, 560 185, 580 185
             C 600 185, 620 155, 640 155" 
          fill="none" stroke="url(#surgeGrad)" stroke-width="4.5" stroke-linecap="round" filter="url(#glow)" />

    <!-- Annotations on Scope -->
    <!-- Peak LRA Spike Callout -->
    <g transform="translate(175, 20)">
      <circle cx="0" cy="0" r="5" fill="#ef4444" />
      <rect x="15" y="-18" width="170" height="42" rx="6" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5" />
      <text x="25" y="0" fill="#f87171" font-family="monospace" font-size="12" font-weight="700">LRA PEAK: 88 AMPS</text>
      <text x="25" y="16" fill="#cbd5e1" font-family="monospace" font-size="11">Surge = 21,120 Watts</text>
    </g>

    <!-- Steady RLA Callout -->
    <g transform="translate(480, 160)">
      <rect x="0" y="0" width="160" height="38" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
      <text x="10" y="16" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">RLA STEADY: 16 AMPS</text>
      <text x="10" y="30" fill="#94a3b8" font-family="monospace" font-size="10">Running = 3,840 Watts</text>
    </g>

    <!-- Time Duration Label -->
    <text x="175" y="300" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">
      ← 80ms to 150ms Transient Inrush →
    </text>
  </g>

  <!-- Right Side Stat / Spec Matrix Panel -->
  <g transform="translate(750, 245)">
    <!-- Card 1: The Problem -->
    <rect width="390" height="95" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.2" stroke-opacity="0.8" />
    <text x="20" y="30" fill="#ef4444" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1">THE TRANSIENT SPIKE (LRA)</text>
    <text x="20" y="58" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="800">5.5× to 7× Running Current</text>
    <text x="20" y="80" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Stalls 10kW Generator via Voltage Collapse</text>

    <!-- Card 2: The Solution -->
    <g transform="translate(0, 110)">
      <rect width="390" height="95" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.8" />
      <text x="20" y="30" fill="#10b981" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1">THE MICROPROCESSOR SOFT START</text>
      <text x="20" y="58" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="800">65% Inrush Current Reduction</text>
      <text x="20" y="80" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Slashing 88A surge down to &lt;30A smoothly</text>
    </g>

    <!-- Card 3: Standards Citation -->
    <g transform="translate(0, 220)">
      <rect width="390" height="90" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1" />
      <text x="20" y="30" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="12" font-weight="700">STANDARDS APPLIED:</text>
      <text x="20" y="52" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="13" font-weight="600">NEMA MG-1 • IEEE Std 399 • NEC 702</text>
      <text x="20" y="74" fill="#64748b" font-family="system-ui, sans-serif" font-size="11">Deterministic Inrush Modeling • PowerLab</text>
    </g>
  </g>

  <!-- Footer Brand Signature -->
  <g transform="translate(60, 595)">
    <text x="0" y="16" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">
      PowerLab Applied Energy Research Initiative
    </text>
    <text x="${width - 120}" y="16" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="end">
      powelab.org/home-energy/generator-size-calculator
    </text>
  </g>
</svg>
`;

const outputPath = path.join(__dirname, "../public/images/medium-locked-rotor-amps-lra-cover.jpg");

sharp(Buffer.from(svgContent))
  .resize(width, height)
  .jpeg({ quality: 95 })
  .toFile(outputPath)
  .then(() => {
    console.log("Medium cover image successfully created at:", outputPath);
  })
  .catch((err) => {
    console.error("Error creating cover image:", err);
    process.exit(1);
  });

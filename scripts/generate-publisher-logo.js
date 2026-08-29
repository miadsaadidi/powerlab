const sharp = require("sharp");
const path = require("path");

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" fill="#ffffff" />
  <g transform="translate(150, 150) scale(14.5833)">
    <circle cx="24" cy="24" r="20" fill="none" stroke="#375e4b" stroke-width="3" />
    <path d="M27.5 8.5 15 25h9l-2.5 14.5L34 22h-9l2.5-13.5Z" fill="#c65d24" />
    <path d="M8.5 29.5c4.5 5.2 10 7.8 15.5 7.8 6.2 0 11.3-3.2 15.5-8.8" fill="none" stroke="#375e4b" stroke-linecap="round" stroke-width="2.5" />
  </g>
</svg>
`;

const outputPath = path.join(__dirname, "../public/powerlab-publisher-logo-1000x1000.png");

sharp(Buffer.from(svgContent))
  .resize(1000, 1000)
  .png()
  .toFile(outputPath)
  .then(() => {
    console.log("Logo successfully created at:", outputPath);
  })
  .catch((err) => {
    console.error("Error creating logo:", err);
    process.exit(1);
  });

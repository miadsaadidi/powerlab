const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  console.log('Launching browser to render Heat Pump Technical Paper PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, '../public/whitepapers/heat-pump-cop-degradation-auxiliary-heat.html');
  const pdfPublicPath = path.resolve(__dirname, '../public/whitepapers/heat-pump-cop-degradation-auxiliary-heat.pdf');
  const pdfDocsPath = path.resolve(__dirname, '../docs/papers/PowerLab_Heat_Pump_COP_Degradation_Technical_Paper.pdf');

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  // Wait for KaTeX math and fonts to render cleanly
  await page.waitForTimeout(2500);

  await page.pdf({
    path: pdfPublicPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '12mm',
      right: '12mm'
    }
  });

  // Copy to docs/papers/ directory
  fs.copyFileSync(pdfPublicPath, pdfDocsPath);

  console.log(`PDF successfully generated at:`);
  console.log(`  1. ${pdfPublicPath}`);
  console.log(`  2. ${pdfDocsPath}`);
  await browser.close();
}

generatePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

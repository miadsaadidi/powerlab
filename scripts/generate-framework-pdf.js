const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  console.log('Launching browser to render Deterministic Energy Modeling Framework Technical Paper PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, '../public/whitepapers/deterministic-energy-modeling-framework.html');
  const pdfPublicPath = path.resolve(__dirname, '../public/whitepapers/deterministic-mathematical-modeling-distributed-energy.pdf');
  const pdfDocsPath = path.resolve(__dirname, '../docs/papers/PowerLab_Deterministic_Mathematical_Modeling_Technical_Paper.pdf');

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  // Wait for KaTeX math and fonts to render cleanly
  await page.waitForTimeout(3000);

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

  // Ensure docs/papers directory exists and copy
  const docsPapersDir = path.dirname(pdfDocsPath);
  if (!fs.existsSync(docsPapersDir)) {
    fs.mkdirSync(docsPapersDir, { recursive: true });
  }
  fs.copyFileSync(pdfPublicPath, pdfDocsPath);

  const stats = fs.statSync(pdfPublicPath);
  console.log(`PDF successfully generated (${(stats.size / 1024).toFixed(1)} KB):`);
  console.log(`  1. ${pdfPublicPath}`);
  console.log(`  2. ${pdfDocsPath}`);
  await browser.close();
}

generatePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

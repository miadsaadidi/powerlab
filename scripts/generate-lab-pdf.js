const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  console.log('Rendering Student Lab Unit 2 PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, '../public/whitepapers/student-lab-02-solar-pv-tilt-psh.html');
  const pdfPublicPath = path.resolve(__dirname, '../public/whitepapers/student-lab-02-solar-pv-tilt-psh.pdf');

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
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

  const stats = fs.statSync(pdfPublicPath);
  console.log(`PDF successfully generated (${(stats.size / 1024).toFixed(1)} KB): ${pdfPublicPath}`);
  await browser.close();
}

generatePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

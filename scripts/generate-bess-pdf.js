const { chromium } = require('@playwright/test');
const path = require('path');

async function generatePdf() {
  console.log('Launching browser to render BESS Academic Paper PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, '../public/whitepapers/electrochemical-peukert-derating-bess.html');
  const pdfPath = path.resolve(__dirname, '../public/whitepapers/electrochemical-peukert-derating-bess.pdf');

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  // Wait a bit for KaTeX and Google Fonts to render
  await page.waitForTimeout(2000);

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    }
  });

  console.log(`PDF successfully generated at: ${pdfPath}`);
  await browser.close();
}

generatePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

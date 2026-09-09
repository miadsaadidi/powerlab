const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await chromium.launch({
    channel: 'msedge', // use installed Edge browser on Windows
    headless: true
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2 // Crisp 2x retina
  });

  const targets = [
    {
      url: 'https://powelab.org/solar/solar-panel-tilt-calculator',
      output: path.join(__dirname, '../public/images/powerlab-solar-tilt-calculator.png')
    },
    {
      url: 'https://powelab.org/battery/battery-runtime-calculator',
      output: path.join(__dirname, '../public/images/powerlab-battery-runtime-calculator.png')
    },
    {
      url: 'https://powelab.org/battery/inverter-size-calculator',
      output: path.join(__dirname, '../public/images/powerlab-inverter-size-calculator.png')
    }
  ];

  for (const target of targets) {
    console.log(`Navigating to ${target.url}...`);
    const page = await context.newPage();
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait an extra 1s for any chart/canvas renders
    await page.waitForTimeout(1000);
    await page.screenshot({ path: target.output, fullPage: false });
    console.log(`Saved screenshot to ${target.output}`);
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});

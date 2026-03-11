const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 2000 });
  await page.goto('https://www.behance.net/gallery/175541271/Childrens-bookstore-Fumayo-E-commerce-2023');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'behance_fumayo.png', fullPage: false });
  await browser.close();
})();

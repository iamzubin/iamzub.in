const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto('https://www.behance.net/gallery/175541271/Childrens-bookstore-Fumayo-E-commerce-2023');

  // Scroll down to trigger lazy loading of all project images
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 800;
          const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 200);
      });
  });

  // Wait a bit for images to load
  await page.waitForTimeout(3000);

  // Extract all high-res project image URLs
  const images = await page.$$eval('img', imgs => {
      return [...new Set(imgs
        .map(img => img.src)
        .filter(src => src.includes('project_modules/fs') || src.includes('project_modules/1400')))]
  });

  fs.writeFileSync('behance_images.json', JSON.stringify(images, null, 2));

  await browser.close();
})();

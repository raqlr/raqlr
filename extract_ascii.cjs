const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  // Read your photo and convert it to a data URL
  const imgPath   = path.join(__dirname, 'public/profile.png');
  const imgBuffer = fs.readFileSync(imgPath);
  const dataUrl   = `data:image/png;base64,${imgBuffer.toString('base64')}`;

  // This runs inside the headless browser — it has full canvas access
  const results = await page.evaluate(async (dataUrl) => {
    const chars = " .:-=+*#%@".split("");
    const sizes = [400, 280, 220]; // desktop, tablet, mobile
    const data  = {};

    const img = new Image();
    img.src = dataUrl;
    await new Promise(resolve => (img.onload = resolve));

    for (const size of sizes) {
      const W = size, H = size;
      const off    = document.createElement("canvas");
      const offCtx = off.getContext("2d");
      off.width = W; off.height = H;

      // Draw the image centered and slightly padded
      const scale     = 0.8;
      const imgAspect = img.width / img.height;
      let drawH = H * scale;
      let drawW = drawH * imgAspect;
      if (drawW > W * scale) { drawW = W * scale; drawH = drawW / imgAspect; }
      const offsetX = (W - drawW) / 2;
      const offsetY = (H - drawH) / 2;
      offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

      // Read every pixel and convert brightness to a character
      const pixels    = offCtx.getImageData(0, 0, W, H).data;
      const isMobile  = size <= 280;
      const fontSize  = isMobile ? 5 : 7;
      const colGap    = fontSize * 0.7;
      const rowGap    = fontSize * 1.1;
      const particles = [];

      for (let y = 0; y < H; y += rowGap) {
        for (let x = 0; x < W; x += colGap) {
          const i = (Math.floor(y) * W + Math.floor(x)) * 4;
          if (pixels[i + 3] < 128) continue; // skip transparent pixels

          const brightness = (pixels[i] + pixels[i+1] + pixels[i+2]) / (3 * 255);
          particles.push({
            x:     +x.toFixed(1),
            y:     +y.toFixed(1),
            char:  chars[Math.floor(brightness * (chars.length - 1))],
            alpha: +(0.4 + brightness * 0.6).toFixed(2)
          });
        }
      }
      data[size] = particles;
    }
    return data;
  }, dataUrl);

  // Write the result as a static JS file your React component can import
  fs.writeFileSync(
    path.join(__dirname, 'src/assets/asciiData.js'),
    `export const asciiData = ${JSON.stringify(results)};`
  );

  console.log('Done!', Object.entries(results)
    .map(([k, v]) => `${k}px → ${v.length} particles`).join(', '));

  await browser.close();
})();
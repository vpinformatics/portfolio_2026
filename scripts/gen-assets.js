const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LOGO_PATH = 'D:/work/github-vpinformatics/portfolio_2026/public/VPInformatics-logo.png';
const APP_DIR = 'D:/work/github-vpinformatics/portfolio_2026/app';

async function main() {
  console.log('App dir:', APP_DIR, fs.existsSync(APP_DIR));
  const logoBuf = fs.readFileSync(LOGO_PATH);
  console.log('Loaded logo, bytes:', logoBuf.length);

  const meta = await sharp(logoBuf).metadata();
  console.log('Logo metadata:', meta.width, meta.height, meta.format);

  // Crop just the "VP" monogram (left portion, before the divider + wordmark) and trim whitespace.
  // Chaining .extract().trim() directly errors in this sharp version, so materialize the extract first.
  const extracted = await sharp(logoBuf)
    .extract({ left: 0, top: 0, width: 460, height: meta.height })
    .toBuffer();
  const monogram = await sharp(extracted).trim().toBuffer();
  const monoMeta = await sharp(monogram).metadata();
  console.log('Monogram cropped:', monoMeta.width, monoMeta.height);
  fs.writeFileSync(path.join(__dirname, 'logo-monogram.png'), monogram);

  // --- icon.png (32x32): white rounded tile with monogram centered ---
  const iconBg = Buffer.from(
    `<svg width="32" height="32"><rect width="32" height="32" rx="6" fill="#ffffff"/></svg>`
  );
  const logoForIcon = await sharp(monogram).resize(24, 24, { fit: 'inside' }).toBuffer();
  await sharp(iconBg)
    .composite([{ input: logoForIcon, gravity: 'center' }])
    .png()
    .toFile(path.join(APP_DIR, 'icon.png'));

  // --- apple-icon.png (180x180): white tile with monogram centered ---
  const appleBg = Buffer.from(
    `<svg width="180" height="180"><rect width="180" height="180" fill="#ffffff"/></svg>`
  );
  const logoForApple = await sharp(monogram).resize(130, 130, { fit: 'inside' }).toBuffer();
  await sharp(appleBg)
    .composite([{ input: logoForApple, gravity: 'center' }])
    .png()
    .toFile(path.join(APP_DIR, 'apple-icon.png'));

  // --- opengraph-image.png (1200x630): dark gradient background, white logo chip, headline ---
  const ogSvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B1220"/>
          <stop offset="60%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#0B1220"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="0" y="0" width="14" height="630" fill="#DC2626"/>
      <rect x="90" y="80" width="220" height="90" rx="16" fill="#ffffff"/>
      <text x="340" y="140" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">VP Informatics</text>
      <text x="90" y="310" font-family="Arial, sans-serif" font-size="50" font-weight="900" fill="#ffffff">Eliminate Production Bottlenecks</text>
      <text x="90" y="372" font-family="Arial, sans-serif" font-size="50" font-weight="900" fill="#ffffff">With Custom Software Systems</text>
      <text x="90" y="432" font-family="Arial, sans-serif" font-size="26" fill="#CBD5E1">Manufacturing software, ERP gap assessment &amp; industrial IoT</text>
    </svg>
  `);
  const logoForOg = await sharp(monogram).resize(180, 70, { fit: 'inside' }).toBuffer();
  const logoForOgMeta = await sharp(logoForOg).metadata();
  await sharp(ogSvg)
    .composite([{
      input: logoForOg,
      left: 90 + Math.round((220 - logoForOgMeta.width) / 2),
      top: 80 + Math.round((90 - logoForOgMeta.height) / 2),
    }])
    .png()
    .toFile(path.join(APP_DIR, 'opengraph-image.png'));

  console.log('done');
}

main().catch((err) => {
  console.error('FAILED', err);
  process.exit(1);
});

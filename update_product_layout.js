const fs = require('fs');

// 1. ayus-product-main.liquid changes
let liquidFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid';
let liquid = fs.readFileSync(liquidFile, 'utf8');

// Change review section wrapper to have white background and proper padding
liquid = liquid.replace(/<!-- Customer Reviews Horizontal Section -->\n<div style="border-top: 1px solid var\(--color-border\); width: 100%; margin-top: 60px;">\n<div class="ayus-container" style="max-width: 1440px; margin: 0 auto 100px auto; padding: 60px 40px 0 40px;">/, 
`<!-- Customer Reviews Horizontal Section -->
<div style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); width: 100%; background-color: #ffffff; padding: 60px 0;">
<div class="ayus-container" style="max-width: 1440px; margin: 0 auto; padding: 0 40px;">`);

// Replace the closing div of reviews to remove the margin-top: 60px above recommendations
// Because it was `<div style="border-top... margin-top: 60px;">`, wait, no, the margin-top was inside the reviews section.

// The space at the bottom of the product information section:
// The `ayus-product-wrapper` ends right before `<section class="tt-recommendations">`.
// Let's remove any massive margin-bottom from `.tt-commerce-controls` or `.tt-meta-grid`.
liquid = liquid.replace(/margin-bottom: 40px; padding: 20px;/, 'margin-bottom: 0px; padding: 20px;'); // tt-meta-grid margin bottom
// Add a clean 60px margin to the bottom of the main flex container
liquid = liquid.replace(/<div class="ayus-product-wrapper">/, '<div class="ayus-product-wrapper" style="margin-bottom: 60px;">');

fs.writeFileSync(liquidFile, liquid);

// 2. ayus-styles.css changes
let cssFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

// Brand Name margin bottom
css = css.replace(/\.ayus-brand-name\s*\{\s*font-size:\s*11px\s*!important;\s*margin-bottom:\s*5px\s*!important;\s*\}/, 
`.ayus-brand-name {
    font-size: 11px !important;
    margin-bottom: 10px !important;
  }`);
css = css.replace(/\.ayus-brand-name\s*\{\s*text-transform:\s*uppercase;\s*letter-spacing:\s*0\.15em;\s*font-size:\s*12px;\s*color:\s*var\(--color-accent\);\s*margin-bottom:\s*8px;\s*\}/,
`.ayus-brand-name {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 12px;
  color: var(--color-accent);
  margin-bottom: 10px;
}`);

// Product Title margin bottom
css = css.replace(/\.ayus-product-title\s*\{\s*font-size:\s*36px;\s*line-height:\s*1\.2;\s*margin-bottom:\s*5px;\s*\}/,
`.ayus-product-title {
  font-size: 36px;
  line-height: 1.2;
  margin-bottom: 10px;
}`);
css = css.replace(/\.ayus-product-title\s*\{\s*font-size:\s*22px\s*!important;\s*margin-bottom:\s*8px\s*!important;\s*\}/,
`.ayus-product-title {
    font-size: 22px !important;
    margin-bottom: 10px !important;
  }`);

// Product Subtitle font weight normal
css = css.replace(/\.ayus-product-subtitle\s*\{[^}]*\}/g, (match) => {
    return match.replace(/font-weight:\s*600;/, 'font-weight: 400;');
});

fs.writeFileSync(cssFile, css);

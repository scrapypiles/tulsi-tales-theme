const fs = require('fs');

// 1. ayus-product-main.liquid
let liquidFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid';
let liquid = fs.readFileSync(liquidFile, 'utf8');

// Change onclick to onmouseenter for hover functionality
liquid = liquid.replace(/onclick="changeMainImage/g, 'onmouseenter="changeMainImage');

// Remove borders and adjust padding on reviews section
// Removing the 1px solid border-top and border-bottom, and resetting padding back down to a more reasonable 60px top / 80px bottom
liquid = liquid.replace(/<div style="border-top: 1px solid var\(--color-border\); border-bottom: 1px solid var\(--color-border\); width: 100%; background-color: #ffffff; padding: 100px 0;">/, 
  '<div style="width: 100%; background-color: #ffffff; padding: 60px 0 80px 0;">');

fs.writeFileSync(liquidFile, liquid);

// 2. ayus-styles.css
let cssFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

// Remove borders and standardize recommendations padding
css = css.replace(/\.tt-recommendations\s*\{[^}]*\}/, `.tt-recommendations {
  border: none;
  padding: 80px 0;
  margin-top: 0;
  background-color: var(--color-background);
}`);

fs.writeFileSync(cssFile, css);

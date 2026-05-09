const fs = require('fs');

// 1. Update CSS
let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Thumbnails scrolling
css = css.replace(/\.tt-thumbnail-strip\s*\{[^}]*\}/, `.tt-thumbnail-strip {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80px;
  flex-shrink: 0;
  max-height: 550px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.tt-thumbnail-strip::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}`);

// Recommendations padding
css = css.replace(/\.tt-recommendations\s*\{[^}]*\}/, `.tt-recommendations {
  border-top: none;
  padding: 100px 0;
  margin-top: 0;
  background-color: var(--color-background);
}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);

// 2. Update Liquid
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// Reviews padding
liquid = liquid.replace(/<div style="border-top: 1px solid var\(--color-border\); border-bottom: 1px solid var\(--color-border\); width: 100%; background-color: #ffffff; padding: 60px 0;">/, 
  '<div style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); width: 100%; background-color: #ffffff; padding: 100px 0;">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);

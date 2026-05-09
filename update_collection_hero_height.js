const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// The contact banner is hardcoded to 350px in ayus-contact.liquid
// The collection hero uses padding: 80px 20px or min-height
// Let's force it to exactly 350px to match.

css = css.replace(/\.tt-collection-hero \{\n  position: relative;\n  background-color: var\(--color-accent\);\n  padding: 80px 20px;\n  text-align: center;\n  color: #fff;/g, 
`.tt-collection-hero {
  position: relative;
  background-color: var(--color-accent);
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);

const putData = JSON.stringify({ asset: { key: "assets/ayus-styles.css", value: css } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Hero height fixed and deployed.'));
});
req.write(putData);
req.end();

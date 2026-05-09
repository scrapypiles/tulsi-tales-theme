const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Fix description
css = css.replace(/\.ayus-product-description \{\n  font-size: 15px;\n  line-height: 2\.0; letter-spacing: 0\.03em;\n  margin-bottom: 40px;\n  color: #4a4a4a;\n\}/g, 
`.ayus-product-description {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #4a4a4a;
}`);

// Add missing tt-filter-content class to the override block
css += `
.tt-filter-content, 
.tt-filter-content *, 
.tt-filter-content p, 
.tt-filter-content div, 
.tt-filter-content span, 
.tt-filter-content ul, 
.tt-filter-content li {
  line-height: 1.8 !important;
  letter-spacing: 0.03em !important;
}
`;

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
  res.on('end', () => console.log('Typography fixed and deployed.'));
});
req.write(putData);
req.end();

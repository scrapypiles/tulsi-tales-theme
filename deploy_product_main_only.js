const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const file = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid';
const key = 'sections/ayus-product-main.liquid';
const value = fs.readFileSync(file, 'utf8');
const payload = JSON.stringify({ asset: { key, value } });

const req = https.request({
  hostname: SHOP,
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(res.statusCode, body);
    if (res.statusCode < 200 || res.statusCode >= 300) process.exit(1);
  });
});

req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

req.write(payload);
req.end();

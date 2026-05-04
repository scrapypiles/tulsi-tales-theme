const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const key = 'assets/ayus-styles.css';

https.request({
  hostname: SHOP,
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${encodeURIComponent(key)}`,
  method: 'GET',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      console.error(res.statusCode, body);
      process.exit(1);
    }
    const value = JSON.parse(body).asset.value || '';
    const checks = [
      '.tt-announcement-bar a[x-apple-data-detectors]',
      'font-size: 34px !important;',
      'max-height: 40px !important;'
    ];
    for (const check of checks) {
      if (!value.includes(check)) {
        console.error('Missing:', check);
        process.exit(1);
      }
    }
    console.log('Verified mobile header tweaks in remote CSS.');
  });
}).end();

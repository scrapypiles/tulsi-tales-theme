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
      'width: 84px;',
      '.ayus-nav-right .tt-desktop-search-toggle,',
      '.ayus-nav-right .ayus-account-link,',
      '.tt-mobile-header-left .tt-mobile-search-toggle,'
    ];
    for (const check of checks) {
      if (!value.includes(check)) {
        console.error('Missing:', check);
        process.exit(1);
      }
    }
    console.log('Verified mobile header visibility fix in remote CSS.');
  });
}).end();

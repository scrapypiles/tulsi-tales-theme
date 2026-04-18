const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const assetKey = 'sections/ayus-product-main.liquid';
const assetValue = fs.readFileSync('ayus-product-main.liquid', 'utf8');

const data = JSON.stringify({ asset: { key: assetKey, value: assetValue } });

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.parse(body)));
});

req.on('error', console.error);
req.write(data);
req.end();
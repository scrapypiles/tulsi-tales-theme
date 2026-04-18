const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const asset = {
  key: 'sections/ayus-product-main.liquid',
  value: fs.readFileSync('ayus-product-main.liquid', 'utf8')
};

const data = JSON.stringify({ asset });
const opt = {
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(opt, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Successfully uploaded ' + asset.key));
});

req.on('error', console.error);
req.write(data);
req.end();

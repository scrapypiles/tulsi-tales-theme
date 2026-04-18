const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/products.json?handle=' + encodeURIComponent('aimil-memtone-syrup-200-ml'),
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (data.products && data.products.length > 0) {
      console.log('Found product ID:', data.products[0].id);
      console.log('Handle:', data.products[0].handle);
    } else {
      console.log('Not found by handle.', data);
    }
  });
});
req.end();

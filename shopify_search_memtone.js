const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/products.json?limit=250',
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
};

https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (data.products) {
      const found = data.products.filter(p => p.title.toLowerCase().includes('memtone'));
      console.log('Found:', found.map(p => ({id: p.id, title: p.title, handle: p.handle})));
    }
  });
}).end();
